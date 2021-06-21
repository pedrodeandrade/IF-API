import AddContractResourcesRepository from '@/application/contracts/repositories/contract-resources/add-resources-repository';
import ContractResource from '@/domain/entities/contract-resource';
import { Repository } from 'typeorm';

class ContractResourceRepository implements AddContractResourcesRepository {
  private readonly _ormRepository : Repository<ContractResource>;

  constructor(ormRepository : Repository<ContractResource>) {
    this._ormRepository = ormRepository;
  }

  async add(resources: ContractResource[]): Promise<void> {
    await this._ormRepository.insert(resources);
  }
}

export default ContractResourceRepository;
