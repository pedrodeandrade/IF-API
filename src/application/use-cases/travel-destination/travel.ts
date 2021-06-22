import UpdatePilotRepository from '@/application/contracts/repositories/pilot/update-pilot-repository';
import GetShipRepository from '@/application/contracts/repositories/ship/get-ship-repository';
import UpdateShipRepository from '@/application/contracts/repositories/ship/update-ship-repository';
import GetTravelDestinationRepository from '@/application/contracts/repositories/travel-destination/get-travel-destination-repository';
import Travel, { TravelParams } from '@/domain/contracts/use-cases/travel-destination/travel';
import BusinessError from '@/shared/errors/business-error';
import NotFoundError from '@/shared/errors/not-found-error';

class TravelUseCase implements Travel {
  private readonly _getShipRepository : GetShipRepository;

  private readonly _updateShipRepository : UpdateShipRepository;

  private readonly _updatePilotRepository : UpdatePilotRepository;

  private readonly _getTravelDestinationRepository : GetTravelDestinationRepository;

  constructor(
    getShipRepository : GetShipRepository,
    updateShipRepository : UpdateShipRepository,
    updatePilotRepository : UpdatePilotRepository,
    getTravelDestinationRepository : GetTravelDestinationRepository,
  ) {
    this._getShipRepository = getShipRepository;
    this._updateShipRepository = updateShipRepository;
    this._updatePilotRepository = updatePilotRepository;
    this._getTravelDestinationRepository = getTravelDestinationRepository;
  }

  async handle(params: TravelParams): Promise<void> {
    const ship = await this._getShipRepository.get(params.shipId);

    if (!ship) { throw new NotFoundError('Ship not found'); }

    const { pilot } = ship;

    if (pilot.locationPlanet === params.destinationPlanet) { throw new BusinessError('You cannot travel to the same planet that you are'); }

    const travelDestination = this._getTravelDestinationRepository
      .get(pilot.locationPlanet, params.destinationPlanet);

    if (!travelDestination.travelRouteAvailable) { throw new BusinessError('Route blocked!'); }

    if (ship.fuelLevel < travelDestination.fuelCost) { throw new BusinessError('Ship does not have enough fuel to travel this route'); }

    pilot.locationPlanet = params.destinationPlanet;

    ship.fuelLevel -= travelDestination.fuelCost;

    await this._updateShipRepository.update(ship);

    await this._updatePilotRepository.update(pilot);
  }
}

export default TravelUseCase;
