type AddShipParams = {
  fuelCapacity : number,
  weightCapacity: number,
  pilotId : number
}

interface AddShip{
  handle(shipDat : AddShipParams) : Promise<void>;
}

export default AddShip;

export { AddShipParams };
