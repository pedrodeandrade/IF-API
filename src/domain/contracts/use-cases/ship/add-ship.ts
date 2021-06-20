type AddShipParams = {
  fuelCapacity : number,
  weightCapacity: number,
  pilotId : number
}

interface AddShip{
  handle(shipData : AddShipParams) : Promise<void>;
}

export default AddShip;

export { AddShipParams };
