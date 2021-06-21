import ContractResource from '@/domain/entities/contract-resource';

interface AddContractResourcesRepository {
  add(resources : ContractResource[]) : Promise<void>
}

export default AddContractResourcesRepository;
