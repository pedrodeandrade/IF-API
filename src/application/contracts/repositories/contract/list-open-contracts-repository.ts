import Contract from '@/domain/entities/contract';

interface ListOpenContractsRepository {
  listOpenContracts() : Promise<Contract[]>
}

export default ListOpenContractsRepository;
