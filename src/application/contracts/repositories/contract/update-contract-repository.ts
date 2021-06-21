import Contract from '@/domain/entities/contract';

interface UpdateContractRepository {
  update(contract: Contract) : Promise<void>
}

export default UpdateContractRepository;
