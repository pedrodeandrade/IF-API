/* eslint-disable no-use-before-define */
import GetTravelDestinationRepository from '@/application/contracts/repositories/travel-destination/get-travel-destination-repository';
import TravelDestination from '@/domain/entities/travel-destinations';
import Planets from '@/domain/enums/planet';

class TravelDestinationRepository implements GetTravelDestinationRepository {
  get(originPlanet: Planets, destinationPlanet: Planets): TravelDestination {
    return travelDestination.find((destination) => destination.originPlanet === originPlanet
    && destination.destinationPlanet === destinationPlanet);
  }
}

const travelDestination = [
  // Origin Andvari
  new TravelDestination({
    originPlanet: Planets.Andvari,
    destinationPlanet: Planets.Andvari,
    fuelCost: 0,
    travelRouteAvailable: false,
  }),
  new TravelDestination({
    originPlanet: Planets.Andvari,
    destinationPlanet: Planets.Demeter,
    fuelCost: 0,
    travelRouteAvailable: false,
  }),
  new TravelDestination({
    originPlanet: Planets.Andvari,
    destinationPlanet: Planets.Aqua,
    fuelCost: 13,
    travelRouteAvailable: true,
  }),
  new TravelDestination({
    originPlanet: Planets.Andvari,
    destinationPlanet: Planets.Calas,
    fuelCost: 23,
    travelRouteAvailable: false,
  }),
  // Origin Demeter
  new TravelDestination({
    originPlanet: Planets.Andvari,
    destinationPlanet: Planets.Andvari,
    fuelCost: 0,
    travelRouteAvailable: false,
  }),
  new TravelDestination({
    originPlanet: Planets.Andvari,
    destinationPlanet: Planets.Demeter,
    fuelCost: 0,
    travelRouteAvailable: false,
  }),
  new TravelDestination({
    originPlanet: Planets.Andvari,
    destinationPlanet: Planets.Aqua,
    fuelCost: 13,
    travelRouteAvailable: true,
  }),
  new TravelDestination({
    originPlanet: Planets.Demeter,
    destinationPlanet: Planets.Andvari,
    fuelCost: 0,
    travelRouteAvailable: false,
  }),
  new TravelDestination({
    originPlanet: Planets.Demeter,
    destinationPlanet: Planets.Demeter,
    fuelCost: 0,
    travelRouteAvailable: false,
  }),
  new TravelDestination({
    originPlanet: Planets.Demeter,
    destinationPlanet: Planets.Aqua,
    fuelCost: 22,
    travelRouteAvailable: true,
  }),
  new TravelDestination({
    originPlanet: Planets.Demeter,
    destinationPlanet: Planets.Calas,
    fuelCost: 25,
    travelRouteAvailable: true,
  }),
  // Origin Aqua
  new TravelDestination({
    originPlanet: Planets.Aqua,
    destinationPlanet: Planets.Andvari,
    fuelCost: 0,
    travelRouteAvailable: false,
  }),
  new TravelDestination({
    originPlanet: Planets.Aqua,
    destinationPlanet: Planets.Demeter,
    fuelCost: 30,
    travelRouteAvailable: true,
  }),
  new TravelDestination({
    originPlanet: Planets.Aqua,
    destinationPlanet: Planets.Aqua,
    fuelCost: 0,
    travelRouteAvailable: false,
  }),
  new TravelDestination({
    originPlanet: Planets.Aqua,
    destinationPlanet: Planets.Calas,
    fuelCost: 12,
    travelRouteAvailable: true,
  }),
  // Origin Calas
  new TravelDestination({
    originPlanet: Planets.Calas,
    destinationPlanet: Planets.Andvari,
    fuelCost: 20,
    travelRouteAvailable: true,
  }),
  new TravelDestination({
    originPlanet: Planets.Calas,
    destinationPlanet: Planets.Demeter,
    fuelCost: 25,
    travelRouteAvailable: true,
  }),
  new TravelDestination({
    originPlanet: Planets.Calas,
    destinationPlanet: Planets.Aqua,
    fuelCost: 15,
    travelRouteAvailable: true,
  }),
  new TravelDestination({
    originPlanet: Planets.Calas,
    destinationPlanet: Planets.Calas,
    fuelCost: 0,
    travelRouteAvailable: false,
  }),
];

export default TravelDestinationRepository;
