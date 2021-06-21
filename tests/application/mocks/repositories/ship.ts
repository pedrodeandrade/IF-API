import AddShipRepository from '@/application/contracts/repositories/ship/add-ship-repository';
import GetShipRepository from '@/application/contracts/repositories/ship/get-ship-repository';
import UpdateShipRepository from '@/application/contracts/repositories/ship/update-ship-repository';
import Pilot from '@/domain/entities/pilot';
import Ship from '@/domain/entities/ship';

class AddShipRepositoryMock implements AddShipRepository {
  async add(ship: Ship): Promise<void> {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

class UpdateShipRepositoryMock implements UpdateShipRepository {
  async update(ship: Ship): Promise<void> {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

class GetShipRepositoryMock implements GetShipRepository {
  private pilot : Pilot;

  private fuelLevel : number;

  public ship : Ship;

  async get(id: number): Promise<Ship> {
    const ship = new Ship({
      weightCapacity: 10,
      fuelCapacity: 10,
      id,
      pilot: this.pilot,
    });

    ship.fuelLevel = this.fuelLevel ?? ship.fuelLevel;

    this.ship = ship;

    return ship;
  }

  setPilot(value : Pilot) : void {
    this.pilot = value;
  }

  setFuelLevel(value : number) : void {
    this.fuelLevel = value;
  }
}

export {
  AddShipRepositoryMock,
  UpdateShipRepositoryMock,
  GetShipRepositoryMock,
};
