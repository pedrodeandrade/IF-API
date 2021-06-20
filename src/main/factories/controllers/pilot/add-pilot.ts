import { getRepository } from 'typeorm';

import AddPilotUseCase from '@/application/use-cases/pilot/add-pilot';
import AddPilot from '@/domain/contracts/use-cases/pilot/add-pilot';
import Pilot from '@/domain/entities/pilot';
import PilotMapping from '@/infra/db/mappings/pilot';
import PilotRepository from '@/infra/db/repositories/pilot';
import Controller from '@/presentation/contracts/controller';
import AddPilotController, { AddPilotRequestBody } from '@/presentation/controllers/pilot/add-pilot';

function makeAddPilotController() : Controller<AddPilotRequestBody> {
  const pilotRepository : PilotRepository = new PilotRepository(getRepository<Pilot>(PilotMapping));
  const addPilotUseCase : AddPilot = new AddPilotUseCase(pilotRepository);

  return new AddPilotController(addPilotUseCase);
}

export default makeAddPilotController;
