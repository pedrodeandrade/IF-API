import ListOpenContractsRepository from '@/application/contracts/repositories/contract/list-open-contracts-repository';
import PublishContractRepository from '@/application/contracts/repositories/contract/publish-contract-repository';
import Contract from '@/domain/entities/contract';
import ContractStatus from '@/domain/enums/contract-status';
import { Repository } from 'typeorm';

class ContractRepository implements PublishContractRepository, ListOpenContractsRepository {
  private readonly _ormRepository : Repository<Contract>

  constructor(ormRepository : Repository<Contract>) {
    this._ormRepository = ormRepository;
  }

  async listOpenContracts(): Promise<Contract[]> {
    return this._ormRepository.find({ status: ContractStatus.Open });
  }

  async publish(contract: Contract): Promise<number> {
    const result = await this._ormRepository.insert(contract);

    return result.identifiers[0].id;
  }
}

export default ContractRepository;
