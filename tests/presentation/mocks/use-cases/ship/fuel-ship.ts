import FuelShip, { FuelShipParams } from '@/domain/contracts/use-cases/ship/fuel-ship';

class FuelShipMock implements FuelShip {
  async handle(shipData: FuelShipParams): Promise<void> {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

export { FuelShipMock };
