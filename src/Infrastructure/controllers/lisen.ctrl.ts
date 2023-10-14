import { Request, Response } from "express";
import { RespValues } from "../../Domain/RespValue/resp.value";
import { LisenCreate } from "../../Application/UserApplication/lisen.create";
import { ProyectEntity } from "../../Domain/LisenExternal/Entities/proyects.entity";
import { DeployEntity } from "../../Domain/LisenExternal/Entities/deploy.entity";

export class LisenCtrl {
  constructor(private readonly LisenCreator: LisenCreate) {}

  public createProject = async ({ body }: Request, res: Response) => {
    const response: RespValues<string> =
      await this.LisenCreator.createProjectCtrl({
        ...body,
      });
    res.json({ ...response }).status(response.status);
  };

  public deleteProject = async ({ body }: Request, res: Response) => {
    const response: RespValues<string> =
      await this.LisenCreator.deleteProyectCtrl(body.uuid);
    res.json({ ...response }).status(response.status);
  };

  public getProjects = async (_: Request, res: Response) => {
    const response: RespValues<ProyectEntity[]> =
      await this.LisenCreator.getProyectsCtrl();
    res.json({ ...response }).status(response.status);
  };

  public getDeploys = async ({ body }: Request, res: Response) => {
    const response: RespValues<DeployEntity[]> =
      await this.LisenCreator.getDeploysCtrl(body.uuid);
    res.json({ ...response }).status(response.status);
  };
}
