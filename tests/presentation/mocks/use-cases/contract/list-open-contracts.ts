import ListOpenContracts from '@/domain/contracts/use-cases/contract/list-open-contracts';
import Contract from '@/domain/entities/contract';

class ListOpenContractsUseCaseMock implements ListOpenContracts {
  async handle(): Promise<Contract[]> {
    return [];
  }
}

export default ListOpenContractsUseCaseMock;
