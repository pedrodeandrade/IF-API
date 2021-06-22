import TravelDestination from '@/domain/entities/travel-destinations';
import Planets from '@/domain/enums/planet';

interface GetTravelDestinationRepository {
  get(originPlanet: Planets, destinationPlanet: Planets) : TravelDestination
}

export default GetTravelDestinationRepository;
