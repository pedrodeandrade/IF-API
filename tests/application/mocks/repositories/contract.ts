/* eslint-disable max-classes-per-file */
import GetContractRepository from '@/application/contracts/repositories/contract/get-contract-repository';
import ListOpenContractsRepository from '@/application/contracts/repositories/contract/list-open-contracts-repository';
import PublishContractRepository from '@/application/contracts/repositories/contract/publish-contract-repository';
import UpdateContractRepository from '@/application/contracts/repositories/contract/update-contract-repository';
import Contract from '@/domain/entities/contract';
import ContractStatus from '@/domain/enums/contract-status';
import Planets from '@/domain/enums/planet';

class PublishContractRepositoryMock implements PublishContractRepository {
  async publish(contract: Contract): Promise<number> {
    return contract.id;
  }
}

class ListOpenContractsRepositoryMock implements ListOpenContractsRepository {
  private _contractsToList : Contract[];

  async listOpenContracts(): Promise<Contract[]> {
    return this._contractsToList.filter((contract) => contract.status === ContractStatus.Open);
  }

  setContractsToList(contracts : Contract[]) : void {
    this._contractsToList = contracts;
  }
}

class GetContractRepositoryMock implements GetContractRepository {
  private _contractStatus : ContractStatus

  private _value : number;

  public contract : Contract;

  async get(id: number): Promise<Contract> {
    this.contract = new Contract({
      id,
      description: 'travel',
      originPlanet: Planets.Aqua,
      destinationPlanet: Planets.Andvari,
      value: this._value || 10,
      status: this._contractStatus || ContractStatus.Open,
    });

    return this.contract;
  }

  public setContractStatus(value: ContractStatus) : void {
    this._contractStatus = value;
  }

  public setContractValue(value: number) : void {
    this._value = value;
  }
}

class UpdateContractRepositoryMock implements UpdateContractRepository {
  async update(contract: Contract): Promise<void> {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

export {
  PublishContractRepositoryMock,
  ListOpenContractsRepositoryMock,
  GetContractRepositoryMock,
  UpdateContractRepositoryMock,
};
