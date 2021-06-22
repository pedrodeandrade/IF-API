import Planets from '@/domain/enums/planet';

type CreateTravelDestination = {
  originPlanet : Planets

  destinationPlanet : Planets

  fuelCost : number

  travelRouteAvailable : boolean
}

class TravelDestination {
  public originPlanet : Planets

  public destinationPlanet : Planets

  public fuelCost : number

  public travelRouteAvailable : boolean

  constructor(params : CreateTravelDestination) {
    this.originPlanet = params.originPlanet;
    this.destinationPlanet = params.destinationPlanet;
    this.fuelCost = params.fuelCost;
    this.travelRouteAvailable = params.travelRouteAvailable;
  }
}

export default TravelDestination;
