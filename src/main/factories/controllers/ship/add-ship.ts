import { getRepository } from 'typeorm';

import AddShipUseCase from '@/application/use-cases/ship/add-ship';
import Pilot from '@/domain/entities/pilot';
import Ship from '@/domain/entities/ship';
import PilotMapping from '@/infra/db/mappings/pilot';
import ShipMapping from '@/infra/db/mappings/ship';
import PilotRepository from '@/infra/db/repositories/pilot';
import ShipRepository from '@/infra/db/repositories/ship';
import Controller from '@/presentation/contracts/controller';
import AddShipController, { AddShipRequestData } from '@/presentation/controllers/ship/add-ship';

function makeAddShipController() : Controller<AddShipRequestData> {
  const typeOrmPilotRepository = getRepository<Pilot>(PilotMapping);
  const typeOrmShipRepository = getRepository<Ship>(ShipMapping);

  const pilotRepository = new PilotRepository(typeOrmPilotRepository);
  const shipRepository = new ShipRepository(typeOrmShipRepository);

  const addShipUseCase = new AddShipUseCase(pilotRepository, shipRepository);
  return new AddShipController(addShipUseCase);
}

export default makeAddShipController;
