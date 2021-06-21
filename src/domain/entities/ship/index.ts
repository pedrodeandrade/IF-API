import Pilot from '@/domain/entities/pilot';

type CreateShipData = {
  id? : number,
  fuelCapacity : number,
  weightCapacity: number,
  pilot : Pilot,
  fuelLevel?: number
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
    let fuelLevelValue = value > this.fuelCapacity ? this.fuelCapacity : value;

    if (fuelLevelValue < 0) { fuelLevelValue = 0; }

    this._fuelLevel = fuelLevelValue;
  }

  public constructor(shipData : CreateShipData) {
    this.id = shipData.id ?? 0;

    this.fuelCapacity = shipData.fuelCapacity < 0 ? 0 : shipData.fuelCapacity;

    this.fuelLevel = shipData.fuelLevel || 0;

    this.weightCapacity = shipData.weightCapacity < 0 ? 0 : shipData.weightCapacity;

    this.pilot = shipData.pilot;
  }
}

export { CreateShipData };

export default Ship;
