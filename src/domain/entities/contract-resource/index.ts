import Resource from '@/domain/enums/resouce';
import Contract from '@/domain/entities/contract';

type CreateContractResourceData = {
  id? : number,
  name : Resource,
  weight : number,
  contract : Contract
}

class ContractResource {
  public readonly id : number;

  public readonly name : Resource;

  public readonly weight : number;

  public contract? : Contract;

  constructor(resourceData : CreateContractResourceData) {
    this.id = resourceData.id ?? 0;

    this.name = resourceData.name;

    this.weight = resourceData.weight;

    this.contract = resourceData.contract;
  }
}

export { CreateContractResourceData };

export default ContractResource;
