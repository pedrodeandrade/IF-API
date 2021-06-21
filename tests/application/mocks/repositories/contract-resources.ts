import AddContractResourcesRepository from '@/application/contracts/repositories/contract-resources/add-resources-repository';
import ContractResource from '@/domain/entities/contract-resource';

class AddContractResourcesRepositoryMock implements AddContractResourcesRepository {
  async add(resources: ContractResource[]): Promise<void> {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

export { AddContractResourcesRepositoryMock };
