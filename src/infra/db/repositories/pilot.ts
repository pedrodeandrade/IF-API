import {
  Repository,
} from 'typeorm';

import Pilot from '@/domain/entities/pilot';
import AddPilotRepository from '@/application/contracts/repositories/pilot/add-pilot-repository';

class PilotRepository implements AddPilotRepository {
  private readonly _ormRepository : Repository<Pilot>;

  public constructor(ormRepository : Repository<Pilot>) {
    this._ormRepository = ormRepository;
  }

  async add(pilot: Pilot): Promise<boolean> {
    try {
      await this._ormRepository.insert(pilot);

      return true;
    } catch (error) {
      // TODO Logging
      return false;
    }
  }
}

export default PilotRepository;
