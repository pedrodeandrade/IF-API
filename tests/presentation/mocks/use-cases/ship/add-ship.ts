import AddShip, { AddShipParams } from '@/domain/contracts/use-cases/ship/add-ship';

class AddShipMock implements AddShip {
  async handle(shipData: AddShipParams): Promise<void> {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

export { AddShipMock };
