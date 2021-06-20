import AddShipRepository from '@/application/contracts/repositories/ship/add-ship-repository';
import Ship from '@/domain/entities/ship';

class AddShipRepositoryMock implements AddShipRepository {
  async add(ship: Ship): Promise<void> {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

export {
  AddShipRepositoryMock,
};
