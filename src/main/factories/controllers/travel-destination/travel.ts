import { getRepository } from 'typeorm';

import Pilot from '@/domain/entities/pilot';
import Ship from '@/domain/entities/ship';
import PilotMapping from '@/infra/db/mappings/pilot';
import ShipMapping from '@/infra/db/mappings/ship';
import PilotRepository from '@/infra/db/repositories/pilot';
import ShipRepository from '@/infra/db/repositories/ship';
import Controller from '@/presentation/contracts/controller';
import TravelController, { TravelRequestData } from '@/presentation/controllers/travel-destination/travel';
import TravelUseCase from '@/application/use-cases/travel-destination/travel';
import TravelDestinationRepository from '@/infra/db/repositories/travel-destination';

function makeTravelController() : Controller<TravelRequestData> {
  const typeOrmPilotRepository = getRepository<Pilot>(PilotMapping);
  const typeOrmShipRepository = getRepository<Ship>(ShipMapping);

  const pilotRepository = new PilotRepository(typeOrmPilotRepository);
  const shipRepository = new ShipRepository(typeOrmShipRepository);
  const travelDestinationRepository = new TravelDestinationRepository();

  const travelUseCase = new TravelUseCase(
    shipRepository, shipRepository, pilotRepository, travelDestinationRepository,
  );

  return new TravelController(travelUseCase);
}

export default makeTravelController;
