import AddPilotRepository from '@/application/contracts/repositories/pilot/add-pilot-repository';
import Pilot from '@/domain/entities/pilot';

class AddPilotRepositoryMock implements AddPilotRepository {
  async add(pilot: Pilot): Promise<boolean> {
    return true;
  }
}

export {
  AddPilotRepositoryMock,
};
