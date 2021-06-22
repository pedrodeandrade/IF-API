import Planets from '@/domain/enums/planet';

type TravelParams = {
  shipId : number,
  destinationPlanet : Planets
}

interface Travel {
  handle(params : TravelParams) : Promise<void>
}

export { TravelParams };

export default Travel;
