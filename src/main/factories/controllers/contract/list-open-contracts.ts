import ListOpenContractsUseCase from '@/application/use-cases/contract/list-open-contracts';
import Contract from '@/domain/entities/contract';
import ContractMapping from '@/infra/db/mappings/contract';
import ContractRepository from '@/infra/db/repositories/contracts';
import Controller from '@/presentation/contracts/controller';
import ListOpenContractsController from '@/presentation/controllers/contract/list-open-contracts';
import { getRepository } from 'typeorm';

function makeListOpenContractsController() : Controller<any> {
  const ormRepository = getRepository<Contract>(ContractMapping);

  const contractRepository = new ContractRepository(ormRepository);

  const useCase = new ListOpenContractsUseCase(contractRepository);

  return new ListOpenContractsController(useCase);
}

export default makeListOpenContractsController;
