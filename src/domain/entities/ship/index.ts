import Pilot from '@/domain/entities/pilot';

type CreateShipData = {
  id? : number,
  fuelCapacity : number,
  weightCapacity: number,
  pilot : Pilot
};

class Ship {
  public readonly id : number;

  public readonly fuelCapacity : number;

  private _fuelLevel : number;

  public readonly weightCapacity : number;

  public readonly pilot : Pilot;

  get fuelLevel() : number {
    return this._fuelLevel;
  }

  set fuelLevel(value : number) {
    this._fuelLevel = value < 0 ? 0 : value;
  }

  public constructor(shipData : CreateShipData) {
    this.id = shipData.id ?? 0;

    this.fuelCapacity = shipData.fuelCapacity < 0 ? 0 : shipData.fuelCapacity;

    this.fuelLevel = 100;

    this.weightCapacity = shipData.weightCapacity < 0 ? 0 : shipData.weightCapacity;

    this.pilot = shipData.pilot;
  }
}

export { CreateShipData };

export default Ship;
