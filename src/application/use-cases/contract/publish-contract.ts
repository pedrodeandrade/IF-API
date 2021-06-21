import AddContractResourcesRepository from '@/application/contracts/repositories/contract-resources/add-resources-repository';
import PublishContractRepository from '@/application/contracts/repositories/contract/publish-contract-repository';
import PublishContract, { PublishContractParams } from '@/domain/contracts/use-cases/contract/pubish-contract';
import Contract from '@/domain/entities/contract';

class PublishContractUseCase implements PublishContract {
  private readonly _publishContractRepository : PublishContractRepository

  private readonly _addContractResourcesRepository : AddContractResourcesRepository

  constructor(
    publishContractRepository: PublishContractRepository,
    addContractResourcesRepository: AddContractResourcesRepository,
  ) {
    this._publishContractRepository = publishContractRepository;

    this._addContractResourcesRepository = addContractResourcesRepository;
  }

  async handle(contractParams: PublishContractParams): Promise<number> {
    const contract = new Contract({
      description: contractParams.description,
      originPlanet: contractParams.originPlanet,
      destinationPlanet: contractParams.destinationPlanet,
      value: contractParams.value,
    });

    const contractId = await this._publishContractRepository.publish(contract);

    const payload = contractParams.resources.map((resource) => {
      // eslint-disable-next-line no-param-reassign
      resource.contract = { ...contract, id: contractId };

      return resource;
    });

    await this._addContractResourcesRepository.add(payload);

    return contractId;
  }
}

export default PublishContractUseCase;
