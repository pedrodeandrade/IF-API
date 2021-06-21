/* eslint-disable max-classes-per-file */
import ListOpenContractsRepository from '@/application/contracts/repositories/contract/list-open-contracts-repository';
import PublishContractRepository from '@/application/contracts/repositories/contract/publish-contract-repository';
import Contract from '@/domain/entities/contract';
import ContractStatus from '@/domain/enums/contract-status';

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

export { PublishContractRepositoryMock, ListOpenContractsRepositoryMock };
