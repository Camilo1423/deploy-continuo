import { v4 as uuid } from "uuid";
import { ProyectEntity } from "../Entities/proyects.entity";

export type Props = {
    pathProyect: string;
    nameImage: string;
    nameContainer: string;
    publishContainer: string;
    repoProvider: string;
    owner: string;
    proyecto: string;
    repository: string;
    tokenAuthentication: string;
}

export class ProyectValue implements ProyectEntity {
    uuid: string;
    pathProyect: string;
    nameImage: string;
    nameContainer: string;
    publishContainer: string;
    repoProvider: string;
    owner: string;
    proyecto: string;
    repository: string;
    tokenAuthentication: string;
    isNewProject: boolean;
    latestCommit: string;

    constructor(body: Props){
        this.uuid = uuid();
        this.pathProyect = body.pathProyect;
        this.nameImage = body.nameImage;
        this.nameContainer = body.nameContainer;
        this.publishContainer = body.publishContainer;
        this.repoProvider = body.repoProvider;
        this.owner = body.owner;
        this.proyecto = body.proyecto.length > 0 ? body.proyecto : '';
        this.repository = body.repository;
        this.tokenAuthentication = body.tokenAuthentication;
        this.isNewProject = true;
        this.latestCommit = "-deploy"
    }
}