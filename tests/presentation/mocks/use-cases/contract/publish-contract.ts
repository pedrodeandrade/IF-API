import PublishContract, { PublishContractParams } from '@/domain/contracts/use-cases/contract/pubish-contract';

class PublishContractMock implements PublishContract {
  private returnValue: number;

  async handle(contractParams: PublishContractParams): Promise<number> {
    return this.returnValue;
  }

  setReturnValue(value: number) {
    this.returnValue = value;
  }
}

export { PublishContractMock };
