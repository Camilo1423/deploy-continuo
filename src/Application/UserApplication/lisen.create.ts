import { ILisenRepository } from '../../Domain/LisenExternal/Repositories/ILisen.repository';
import { ProyectValue, Props } from '../../Domain/LisenExternal/ValueObject/proyects.value';
import { ProyectEntity } from '../../Domain/LisenExternal/Entities/proyects.entity';
import { RespValues } from '../../Domain/RespValue/resp.value';
import { RespEntity } from '../../Domain/RespEntity/resp.entity';
import { DeployEntity } from '../../Domain/LisenExternal/Entities/deploy.entity';

export class LisenCreate {
  private LisenDependency: ILisenRepository;

  constructor(dependency: ILisenRepository) {
    this.LisenDependency = dependency;
  }
  async createProjectCtrl(project: Props): Promise<RespEntity<string>> {
    const resp: RespValues<string> = await this.LisenDependency.createProyect(new ProyectValue({...project}));
    return resp;
  }

  async getProyectsCtrl(): Promise<RespEntity<ProyectEntity[]>> {
    const resp: RespValues<ProyectEntity[]> = await this.LisenDependency.getProyects();
    return resp;
  }

  async getDeploysCtrl(uuid: string): Promise<RespEntity<DeployEntity[]>> {
    const resp: RespValues<DeployEntity[]> = await this.LisenDependency.getDeploys(uuid);
    return resp;
  }

  async deleteProyectCtrl(uuid: string): Promise<RespEntity<string>> {
    const resp: RespValues<string> = await this.LisenDependency.deleteProyect(uuid);
    return resp;
  }
}
