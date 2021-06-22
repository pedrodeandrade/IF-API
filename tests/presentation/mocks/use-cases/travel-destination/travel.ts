import Travel, { TravelParams } from '@/domain/contracts/use-cases/travel-destination/travel';

class TravelMock implements Travel {
  async handle(shipData: TravelParams): Promise<void> {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

export { TravelMock };
