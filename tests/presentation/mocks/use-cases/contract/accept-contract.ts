import AcceptContract, { AcceptContractParams } from '@/domain/contracts/use-cases/contract/accept-contract';

class AcceptContractMock implements AcceptContract {
  async handle(shipData: AcceptContractParams): Promise<void> {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

export { AcceptContractMock };
