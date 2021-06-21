import Contract from '@/domain/entities/contract';

interface ListOpenContracts {
  handle() : Promise<Contract[]>;
}

export default ListOpenContracts;
