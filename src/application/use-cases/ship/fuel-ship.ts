import UpdatePilotRepository from '@/application/contracts/repositories/pilot/update-pilot-repository';
import GetShipRepository from '@/application/contracts/repositories/ship/get-ship-repository';
import UpdateShipRepository from '@/application/contracts/repositories/ship/update-ship-repository';
import FuelShip, { FuelShipParams } from '@/domain/contracts/use-cases/ship/fuel-ship';
import BusinessError from '@/shared/errors/business-error';
import NotFoundError from '@/shared/errors/not-found-error';

type FuelShipValues = {
  amountToFuel : number,
  fuelCost : number
}

class FuelShipUseCase implements FuelShip {
  private readonly _updateShipRepository : UpdateShipRepository;

  private readonly _getShipRepository : GetShipRepository;

  private readonly _updatePilotRepository : UpdatePilotRepository

  constructor(
    updateShipRepository : UpdateShipRepository,
    getShipRepository : GetShipRepository,
    updatePilotRepository : UpdatePilotRepository,
  ) {
    this._updateShipRepository = updateShipRepository;
    this._getShipRepository = getShipRepository;
    this._updatePilotRepository = updatePilotRepository;
  }

  async handle(params: FuelShipParams): Promise<void> {
    const ship = await this._getShipRepository.get(params.shipId);
    if (!ship) { throw new NotFoundError('Ship not found'); }

    const {
      amountToFuel,
      fuelCost,
    } = this.calculateFuelCost(ship.fuelLevel, ship.fuelCapacity, params.fuelAmount);

    if (ship.pilot.locationPlanet == null) { throw new BusinessError('Pilot need to be in a planet in order to fuel the ship'); }

    if (ship.pilot.credits < fuelCost) { throw new BusinessError('Pilot do not have enough credits to fuel the ship'); }

    ship.fuelLevel += amountToFuel;

    ship.pilot.credits -= fuelCost;

    await this._updateShipRepository.update(ship);

    await this._updatePilotRepository.update(ship.pilot);
  }

  private calculateFuelCost(
    shipFuelLevel : number,
    shipFuelCapacity : number,
    fuelAmount : number,
  ) : FuelShipValues {
    const maxAmountToFuel = shipFuelCapacity - shipFuelLevel;

    let amountToFuel = fuelAmount;

    if (fuelAmount > maxAmountToFuel) { amountToFuel = maxAmountToFuel; }

    // Fuel unit value = 7
    return {
      amountToFuel,
      fuelCost: amountToFuel * 7,
    };
  }
}

export default FuelShipUseCase;
