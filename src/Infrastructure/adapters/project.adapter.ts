import { ProyectEntity } from '../../Domain/LisenExternal/Entities/proyects.entity';

export const AdapterProject = (item: any): ProyectEntity => {
    return {
      uuid: item.uuid ? item.uuid : "",
      pathProyect: item.pathProyect ? item.pathProyect : "",
      nameImage: item.nameImage ? item.nameImage : "",
      nameContainer: item.nameContainer ? item.nameContainer : "",
      publishContainer: item.publishContainer ? item.publishContainer : "",
      repoProvider: item.repoProvider ? item.repoProvider : "",
      owner: item.owner ? item.owner : "",
      proyecto: item.proyecto ? item.proyecto : "",
      repository: item.repository ? item.repository : "",
      tokenAuthentication: item.tokenAuthentication ? item.tokenAuthentication : "",
      isNewProject: item.isNewProject,
      latestCommit: item.latestCommit
    };
  };
  
export const AdapterProjects = (items: any): ProyectEntity[] => {
  const arrayFinal: ProyectEntity[] = [];
  for (const item of items) {
    arrayFinal.push({...AdapterProject(item)});
  }
  return arrayFinal
}