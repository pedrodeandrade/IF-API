import ContractResource from '@/domain/entities/contract-resource';
import Planets from '@/domain/enums/planet';

type PublishContractParams = {
  description : string,

  originPlanet : Planets,

  destinationPlanet : Planets,

  value : number,

  resources : ContractResource[]
}

interface PublishContract {
  handle(contractParams : PublishContractParams) : Promise<number>
}

export { PublishContractParams };

export default PublishContract;
