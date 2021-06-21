import Contract from '@/domain/entities/contract';

interface PublishContractRepository {
  publish(contract : Contract) : Promise<number>;
}

export default PublishContractRepository;
