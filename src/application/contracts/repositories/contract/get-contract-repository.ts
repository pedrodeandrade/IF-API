import Contract from '@/domain/entities/contract';

interface GetContractRepository {
  get(id: number) : Promise<Contract>;
}

export default GetContractRepository;
