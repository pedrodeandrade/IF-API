import GetPilotRepository from '@/application/contracts/repositories/pilot/get-pilot-repository';
import AddShipRepository from '@/application/contracts/repositories/ship/add-ship-repository';
import AddShip, { AddShipParams } from '@/domain/contracts/use-cases/ship/add-ship';
import Ship from '@/domain/entities/ship';
import NotFoundError from '@/shared/errors/not-found-error';

class AddShipUseCase implements AddShip {
  private readonly _getPilotRepository : GetPilotRepository;

  private readonly _shipRepository : AddShipRepository;

  constructor(getPilotRepository : GetPilotRepository, shipRepository : AddShipRepository) {
    this._getPilotRepository = getPilotRepository;
    this._shipRepository = shipRepository;
  }

  async handle(shipData: AddShipParams): Promise<void> {
    const pilot = await this._getPilotRepository.get(shipData.pilotId);

    if (!pilot) { throw new NotFoundError('Pilot not found'); }

    const ship = new Ship({
      fuelCapacity: shipData.fuelCapacity,
      pilot,
      weightCapacity: shipData.weightCapacity,
      fuelLevel: shipData.fuelCapacity,
    });

    await this._shipRepository.add(ship);
  }
}

export default AddShipUseCase;
