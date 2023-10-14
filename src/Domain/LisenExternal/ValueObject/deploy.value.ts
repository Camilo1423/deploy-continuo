import { DeployEntity } from "../Entities/deploy.entity";
import { v4 as uuid } from 'uuid';

type Props = {
  projectDeploy: string;
  timeDeploy: string;
  commitDeploy: string;
  branchDeploy: string;
};

export class DeployValue implements DeployEntity {
  uuid: string;
  projectDeploy: string;
  timeDeploy: string;
  commitDeploy: string;
  branchDeploy: string;

  constructor(deploy: Props) {
    this.uuid = uuid();
    this.projectDeploy = deploy.projectDeploy;
    this.timeDeploy = deploy.timeDeploy;
    this.commitDeploy = deploy.commitDeploy;
    this.branchDeploy = deploy.branchDeploy;
  }
}
