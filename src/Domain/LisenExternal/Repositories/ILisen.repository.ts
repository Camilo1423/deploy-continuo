import { RespEntity } from "../../RespEntity/resp.entity";
import { DeployEntity } from "../Entities/deploy.entity";
import { ProyectEntity } from '../Entities/proyects.entity';
import { UrlEntity } from "../Entities/url.entity";

export interface ILisenRepository { 
    coreProcess(proyect: ProyectEntity): Promise<void>;
    createProyect(proyect: ProyectEntity): Promise<RespEntity<string>>;
    createDeploy(proyect: ProyectEntity, commit: string): Promise<void>;
    deleteProyect(uuid: string): Promise<RespEntity<string>>;
    getProyects(): Promise<RespEntity<ProyectEntity[]>>;
    getDeploys(uuid: string): Promise<RespEntity<DeployEntity[]>>;
    getUrlGithub(proyect: ProyectEntity): Promise<string>;
    getUrlAzure(proyect: ProyectEntity): Promise<UrlEntity>;
    start(): Promise<void>;
    validateDeploy(project: ProyectEntity, commit: string): boolean;
};