import PublishContractUseCase from '@/application/use-cases/contract/publish-contract';
import Contract from '@/domain/entities/contract';
import ContractResource from '@/domain/entities/contract-resource';
import ContractMapping from '@/infra/db/mappings/contract';
import ContractResourceMapping from '@/infra/db/mappings/contract-resource';
import ContractResourceRepository from '@/infra/db/repositories/contract-resouce';
import ContractRepository from '@/infra/db/repositories/contracts';
import Controller from '@/presentation/contracts/controller';
import PublishContractController, { PublishContractRequestData } from '@/presentation/controllers/contract/publish-contract';
import { getRepository } from 'typeorm';

function makePublishContractController() : Controller<PublishContractRequestData> {
  const ormContractRepository = getRepository<Contract>(ContractMapping);
  const ormContractResourceRepository = getRepository<ContractResource>(ContractResourceMapping);

  const contractRepository = new ContractRepository(ormContractRepository);
  const contractResourceRepository = new ContractResourceRepository(ormContractResourceRepository);

  const useCase = new PublishContractUseCase(contractRepository, contractResourceRepository);

  return new PublishContractController(useCase);
}

export default makePublishContractController;
