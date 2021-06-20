import {
  Repository,
} from 'typeorm';

import Pilot from '@/domain/entities/pilot';
import AddPilotRepository from '@/application/contracts/repositories/pilot/add-pilot-repository';
import GetPilotRepository from '@/application/contracts/repositories/pilot/get-pilot-repository';

class PilotRepository implements AddPilotRepository, GetPilotRepository {
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

  async get(pilotId: number): Promise<Pilot> {
    const pilot = await this._ormRepository.findOne(pilotId);

    return pilot || null;
  }
}

export default PilotRepository;
