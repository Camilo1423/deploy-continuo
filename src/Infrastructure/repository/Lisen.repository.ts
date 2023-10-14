import { ProyectEntity } from "../../Domain/LisenExternal/Entities/proyects.entity";
import { UrlEntity } from "../../Domain/LisenExternal/Entities/url.entity";
import { ILisenRepository } from "../../Domain/LisenExternal/Repositories/ILisen.repository";
import { RespEntity } from "../../Domain/RespEntity/resp.entity";
import { RespValues } from "../../Domain/RespValue/resp.value";
import { AdapterProject, AdapterProjects, AdapterDeploys } from "../adapters";
import { ProjectModel, DeployModel } from "../mongo/models";
import { DockerMethods } from "./Docker.repository";
import util from "util";
import axios from "axios";
import { DeployEntity } from "../../Domain/LisenExternal/Entities/deploy.entity";
import { DeployValue } from "../../Domain/LisenExternal/ValueObject/deploy.value";

export class LisenRepository implements ILisenRepository {
  private processDocker: DockerMethods;
  private setTimeoutPromise = util.promisify(setTimeout);
  private providers: any = {
    github: this.getUrlGithub,
    azure: this.getUrlAzure,
  };

  constructor(process: DockerMethods) {
    this.processDocker = process;
    this.start();
  }

  async coreProcess(proyect: ProyectEntity): Promise<void> {
    const methodsDocker = this.processDocker;
    const provider = this.providers[proyect.repoProvider];
    const msgCommit: string = await provider(proyect);
    const isDeploy: boolean = this.validateDeploy(proyect, msgCommit);
    if (isDeploy) {
      const haveImage = await methodsDocker.existImage(proyect.nameImage);
      const haveContainer = await methodsDocker.existContainer(
        proyect.nameContainer
      );
      if (!haveImage && !haveContainer) {
        const pullRepo = await methodsDocker.pullRepository(
          proyect.pathProyect
        );
        if (pullRepo) {
          const createImg = await methodsDocker.createImage(
            proyect.nameImage,
            proyect.pathProyect
          );
          if (createImg) {
            const containerImg = await methodsDocker.createContainer(
              proyect.publishContainer
            );
            if (containerImg) {
              await this.createDeploy(proyect, msgCommit);
            }
          }
        }
      } else {
        const deleteContainer = await methodsDocker.deleteContainer(
          proyect.nameContainer
        );
        if (!deleteContainer) {
          return;
        }
        const deleteImage = await methodsDocker.deleteImage(proyect.nameImage);
        if (deleteImage) {
          const pullRepo = await methodsDocker.pullRepository(
            proyect.pathProyect
          );
          if (pullRepo) {
            const createImg = await methodsDocker.createImage(
              proyect.nameImage,
              proyect.pathProyect
            );
            if (createImg) {
              const containerImg = await methodsDocker.createContainer(
                proyect.publishContainer
              );
              if (containerImg) {
                await this.createDeploy(proyect, msgCommit);
              }
            }
          }
        }
      }
      await ProjectModel.updateOne(
        { uuid: { $eq: proyect.uuid } },
        { latestCommit: msgCommit, isNewProject: false }
      );
    }
  }

  async createProyect(proyect: ProyectEntity): Promise<RespEntity<string>> {
    try {
      console.log(proyect)
      await ProjectModel.create({ ...proyect });
      return new RespValues<string>("Proyecto creado :D", "", 200);
    } catch (error) {
      console.log(error)
      return new RespValues<string>("Error en el servidor :S", "", 500);
    }
  }

  async createDeploy(proyect: ProyectEntity, commit: string): Promise<void> {
    try {
      const deployValue = new DeployValue({
        projectDeploy: proyect.uuid,
        timeDeploy: new Date().toISOString(),
        commitDeploy: commit,
        branchDeploy: "main",
      });
      await DeployModel.create({ ...deployValue });
    } catch (error) {
      console.log(`FALLO EL GUARDADO DEL DESPLOEGUE CON ERROR: ${error}`);
    }
  }

  async deleteProyect(uuid: string): Promise<RespEntity<string>> {
    try {
      const methodsDocker = this.processDocker;
      const projectFind = await ProjectModel.findOne({ uuid: { $eq: uuid } });
      const projectParse: ProyectEntity = AdapterProject(projectFind);
      const deleteContainer = await methodsDocker.deleteContainer(
        projectParse.nameContainer
      );
      const deleteImage = await methodsDocker.deleteImage(
        projectParse.nameImage
      );
      if (deleteContainer && deleteImage) {
        await ProjectModel.deleteOne({ uuid: { $eq: uuid } });
        return new RespValues<string>("Proyecto borrado :D", "", 200);
      } else {
        return new RespValues<string>(
          "Ocurrió un fallo en la transacción :S",
          "",
          400
        );
      }
    } catch (error) {
      return new RespValues<string>("Error en el servidor :S", "", 500);
    }
  }
  async getProyects(): Promise<RespEntity<ProyectEntity[]>> {
    try {
      const allProyects = await ProjectModel.find();
      const projects: ProyectEntity[] = AdapterProjects(allProyects);
      return new RespValues<ProyectEntity[]>("", projects, 200);
    } catch (error) {
      return new RespValues<ProyectEntity[]>(
        "Error en el servidor :S",
        [],
        500
      );
    }
  }

  async getDeploys(uuid: string): Promise<RespEntity<DeployEntity[]>> {
    try {
      const allDeploys = await DeployModel.find({projectDeploy: {$eq: uuid}});
      const deploys: DeployEntity[] = AdapterDeploys(allDeploys);
      return new RespValues<DeployEntity[]>("", deploys, 200);
    } catch (error) {
      return new RespValues<DeployEntity[]>(
        "Error en el servidor :S",
        [],
        500
      );
    }
  }

  async getUrlGithub(proyect: ProyectEntity): Promise<string> {
    const urlCommitBase =
      "https://api.github.com/repos/{owner}/{repo}/commits?sha=main&per_page=1";
    const urlCommit = urlCommitBase
      .replace("{owner}", proyect.owner)
      .replace("{repo}", proyect.repository);

    const { data } = await axios.get(urlCommit, {
      headers: {
        Authorization: `Bearer ${proyect.tokenAuthentication}`,
      },
    });
    const msgCommit = data[0].commit.message;
    return msgCommit;
  }
  async getUrlAzure(proyect: ProyectEntity): Promise<UrlEntity> {
    throw new Error("Method not implemented.");
  }

  async start(): Promise<void> {
    const intervalTime = 5000;
    while (true) {
      const projects = await ProjectModel.find();
      for (const project of projects) {
        const projectParse: ProyectEntity = AdapterProject(project);
        await this.coreProcess(projectParse);
        await this.setTimeoutPromise(intervalTime);
      }
    }
  }

  validateDeploy(project: ProyectEntity, commit: string): boolean {
    if (project.isNewProject) {
      return true;
    }
    if (project.latestCommit !== commit && commit.includes("-deploy")) {
      return true;
    }
    return false;
  }
}
