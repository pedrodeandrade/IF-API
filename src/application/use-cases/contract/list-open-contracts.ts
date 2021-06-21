import ListOpenContractsRepository from '@/application/contracts/repositories/contract/list-open-contracts-repository';
import ListOpenContracts from '@/domain/contracts/use-cases/contract/list-open-contracts';
import Contract from '@/domain/entities/contract';

class ListOpenContractsUseCase implements ListOpenContracts {
  private readonly _listOpenContractsRepository : ListOpenContractsRepository;

  constructor(listOpenContractsRepository : ListOpenContractsRepository) {
    this._listOpenContractsRepository = listOpenContractsRepository;
  }

  async handle(): Promise<Contract[]> {
    return this._listOpenContractsRepository.listOpenContracts();
  }
}

export default ListOpenContractsUseCase;
