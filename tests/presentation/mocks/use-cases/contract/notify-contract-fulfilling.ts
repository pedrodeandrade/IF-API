import NotifyContractFulfilling, { NotifyContractFulfillingParams } from '@/domain/contracts/use-cases/contract/notify-contract-fulfilling';

class NotifyContractFulfillingMock implements NotifyContractFulfilling {
  async handle(shipData: NotifyContractFulfillingParams): Promise<void> {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

export { NotifyContractFulfillingMock };
