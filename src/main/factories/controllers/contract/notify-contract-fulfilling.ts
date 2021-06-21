import { getRepository } from 'typeorm';

import Pilot from '@/domain/entities/pilot';
import PilotMapping from '@/infra/db/mappings/pilot';
import PilotRepository from '@/infra/db/repositories/pilot';
import Controller from '@/presentation/contracts/controller';
import Contract from '@/domain/entities/contract';
import ContractMapping from '@/infra/db/mappings/contract';
import ContractRepository from '@/infra/db/repositories/contracts';
import NotifyContractFulfillingController, { NotifyContractFulfillingRequestData } from '@/presentation/controllers/contract/notify-contract-fulfilling';
import NotifyContractFulfillingUseCase from '@/application/use-cases/contract/notify-contract-fulfilling';

function makeNotifyContractFulfillingController() :
  Controller<NotifyContractFulfillingRequestData> {
  const typeOrmPilotRepository = getRepository<Pilot>(PilotMapping);
  const typeOrmShipRepository = getRepository<Contract>(ContractMapping);

  const pilotRepository = new PilotRepository(typeOrmPilotRepository);
  const contractRepository = new ContractRepository(typeOrmShipRepository);

  const fuelShipUseCase = new NotifyContractFulfillingUseCase(
    contractRepository,
    contractRepository,
    pilotRepository,
    pilotRepository,
  );

  return new NotifyContractFulfillingController(fuelShipUseCase);
}

export default makeNotifyContractFulfillingController;
