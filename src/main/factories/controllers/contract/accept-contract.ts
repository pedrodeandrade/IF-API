import { getRepository } from 'typeorm';

import Pilot from '@/domain/entities/pilot';
import PilotMapping from '@/infra/db/mappings/pilot';
import PilotRepository from '@/infra/db/repositories/pilot';
import Controller from '@/presentation/contracts/controller';
import Contract from '@/domain/entities/contract';
import ContractMapping from '@/infra/db/mappings/contract';
import ContractRepository from '@/infra/db/repositories/contracts';
import AcceptContractUseCase from '@/application/use-cases/contract/accept-contract';
import AcceptContractController, { AcceptContractRequestData } from '@/presentation/controllers/contract/accept-contract';

function makeAcceptContractController() : Controller<AcceptContractRequestData> {
  const typeOrmPilotRepository = getRepository<Pilot>(PilotMapping);
  const typeOrmShipRepository = getRepository<Contract>(ContractMapping);

  const pilotRepository = new PilotRepository(typeOrmPilotRepository);
  const contractRepository = new ContractRepository(typeOrmShipRepository);

  const fuelShipUseCase = new AcceptContractUseCase(
    contractRepository,
    contractRepository,
    pilotRepository,
  );

  return new AcceptContractController(fuelShipUseCase);
}

export default makeAcceptContractController;
