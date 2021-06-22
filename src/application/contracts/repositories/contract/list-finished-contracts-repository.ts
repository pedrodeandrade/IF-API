import Contract from '@/domain/entities/contract';

interface ListFinishedContractsRepository {
  listFinishedContracts() : Promise<Contract[]>
}

export default ListFinishedContractsRepository;
