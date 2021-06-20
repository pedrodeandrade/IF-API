import AddShipRepository from '@/application/contracts/repositories/ship/add-ship-repository';
import Ship from '@/domain/entities/ship';
import { Repository } from 'typeorm';

class ShipRepository implements AddShipRepository {
  private readonly _ormRepository : Repository<Ship>;

  constructor(ormRepository : Repository<Ship>) {
    this._ormRepository = ormRepository;
  }

  async add(ship: Ship): Promise<void> {
    await this._ormRepository.insert(ship);
  }
}

export default ShipRepository;
