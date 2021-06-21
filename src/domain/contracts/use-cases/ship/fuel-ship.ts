type FuelShipParams = {
  shipId : number,
  fuelAmount : number
}

interface FuelShip {
  handle(params : FuelShipParams) : Promise<void>;
}

export { FuelShipParams };

export default FuelShip;
