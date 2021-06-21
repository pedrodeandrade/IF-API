import { getRepository } from 'typeorm';

import FuelShipUseCase from '@/application/use-cases/ship/fuel-ship';
import Pilot from '@/domain/entities/pilot';
import Ship from '@/domain/entities/ship';
import PilotMapping from '@/infra/db/mappings/pilot';
import ShipMapping from '@/infra/db/mappings/ship';
import PilotRepository from '@/infra/db/repositories/pilot';
import ShipRepository from '@/infra/db/repositories/ship';
import Controller from '@/presentation/contracts/controller';
import FuelShipController, { FuelShipRequestData } from '@/presentation/controllers/ship/fuel-ship';

function makeFuelShipController() : Controller<FuelShipRequestData> {
  const typeOrmPilotRepository = getRepository<Pilot>(PilotMapping);
  const typeOrmShipRepository = getRepository<Ship>(ShipMapping);

  const pilotRepository = new PilotRepository(typeOrmPilotRepository);
  const shipRepository = new ShipRepository(typeOrmShipRepository);

  const fuelShipUseCase = new FuelShipUseCase(shipRepository, shipRepository, pilotRepository);
  return new FuelShipController(fuelShipUseCase);
}

export default makeFuelShipController;
