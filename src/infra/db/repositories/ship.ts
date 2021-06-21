import AddShipRepository from '@/application/contracts/repositories/ship/add-ship-repository';
import GetShipRepository from '@/application/contracts/repositories/ship/get-ship-repository';
import UpdateShipRepository from '@/application/contracts/repositories/ship/update-ship-repository';
import Ship from '@/domain/entities/ship';
import { Repository } from 'typeorm';

class ShipRepository implements AddShipRepository, GetShipRepository, UpdateShipRepository {
  private readonly _ormRepository : Repository<Ship>;

  constructor(ormRepository : Repository<Ship>) {
    this._ormRepository = ormRepository;
  }

  async update(ship: Ship): Promise<void> {
    await this._ormRepository.save(ship);
  }

  async get(id: number): Promise<Ship> {
    const ship = await this._ormRepository.findOne(id);

    return ship || null;
  }

  async add(ship: Ship): Promise<void> {
    await this._ormRepository.insert(ship);
  }
}

export default ShipRepository;
