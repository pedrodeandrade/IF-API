import GetTravelDestinationRepository from '@/application/contracts/repositories/travel-destination/get-travel-destination-repository';
import TravelDestination from '@/domain/entities/travel-destinations';
import Planets from '@/domain/enums/planet';

class GetTravelDestinationRepositoryMock implements GetTravelDestinationRepository {
  private fuelCost : number;

  private availableRoute : boolean;

  public travelDestination : TravelDestination;

  get(originPlanet: Planets, destinationPlanet: Planets): TravelDestination {
    const travelDestination = new TravelDestination({
      originPlanet,
      destinationPlanet,
      fuelCost: 10,
      travelRouteAvailable: true,
    });

    travelDestination.fuelCost = this.fuelCost || 10;
    travelDestination.travelRouteAvailable = !!this.availableRoute || true;

    this.travelDestination = travelDestination;

    return travelDestination;
  }

  public setFuelCost(value: number) : void {
    this.fuelCost = value;
  }

  public setAvailableRoute(value: boolean) : void {
    this.availableRoute = value;
  }
}

export { GetTravelDestinationRepositoryMock };
