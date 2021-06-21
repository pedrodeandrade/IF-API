import Planets from '@/domain/enums/planet';
import ContractResource from '@/domain/entities/contract-resource';
import Pilot from '@/domain/entities/pilot';
import ContractStatus from '@/domain/enums/contract-status';

type CreateContractData = {
  id? : number,

  description : string,

  originPlanet : Planets,

  destinationPlanet : Planets,

  value : number,

  status? : ContractStatus,

  payload? : ContractResource[]
}

class Contract {
  public readonly id : number;

  public readonly description : string;

  public readonly originPlanet : Planets;

  public readonly destinationPlanet : Planets;

  public readonly value : number;

  public payload : ContractResource[];

  public pilot : Pilot;

  public status : ContractStatus

  constructor(contractData : CreateContractData) {
    this.id = contractData.id ?? 0;

    this.description = contractData.description;

    this.originPlanet = contractData.originPlanet;

    this.destinationPlanet = contractData.destinationPlanet;

    this.value = contractData.value < 0 ? 0 : contractData.value;

    this.payload = contractData.payload;

    this.status = contractData.status ?? ContractStatus.Open;
  }
}

export { CreateContractData };

export default Contract;
