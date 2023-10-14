import { DeployEntity } from "../../Domain/LisenExternal/Entities/deploy.entity";

export const AdapterDeploys = (items: any): DeployEntity[] => {
  const arrayFinal: DeployEntity[] = [];
  for (const item of items) {
    arrayFinal.push({
      uuid: item.uuid,
      projectDeploy: item.projectDeploy,
      timeDeploy: item.timeDeploy,
      commitDeploy: item.commitDeploy,
      branchDeploy: item.branchDeploy
    });
  }
  return arrayFinal;
};
