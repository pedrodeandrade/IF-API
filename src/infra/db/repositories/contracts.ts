import GetContractRepository from '@/application/contracts/repositories/contract/get-contract-repository';
import ListFinishedContractsRepository from '@/application/contracts/repositories/contract/list-finished-contracts-repository';
import ListOpenContractsRepository from '@/application/contracts/repositories/contract/list-open-contracts-repository';
import PublishContractRepository from '@/application/contracts/repositories/contract/publish-contract-repository';
import UpdateContractRepository from '@/application/contracts/repositories/contract/update-contract-repository';
import Contract from '@/domain/entities/contract';
import ContractStatus from '@/domain/enums/contract-status';
import { Repository } from 'typeorm';

class ContractRepository implements
  PublishContractRepository,
  ListOpenContractsRepository,
  GetContractRepository,
  UpdateContractRepository,
  ListFinishedContractsRepository {
  private readonly _ormRepository : Repository<Contract>

  constructor(ormRepository : Repository<Contract>) {
    this._ormRepository = ormRepository;
  }

  async listFinishedContracts(): Promise<Contract[]> {
    return this._ormRepository.find({ status: ContractStatus.Finished });
  }

  async update(contract: Contract): Promise<void> {
    await this._ormRepository.save(contract);
  }

  async get(id: number): Promise<Contract> {
    const contract = await this._ormRepository.findOne(id);

    return contract || null;
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
