/* eslint-disable max-classes-per-file */
import AddPilotRepository from '@/application/contracts/repositories/pilot/add-pilot-repository';
import GetPilotRepository from '@/application/contracts/repositories/pilot/get-pilot-repository';
import Pilot from '@/domain/entities/pilot';

class AddPilotRepositoryMock implements AddPilotRepository {
  private result : boolean;

  async add(pilot: Pilot): Promise<boolean> {
    return this.result;
  }

  setResult(result : boolean) : void {
    this.result = result;
  }
}

class GetPilotRepositoryMock implements GetPilotRepository {
  async get(pilotId: number): Promise<Pilot> {
    return Pilot.create({
      id: pilotId,
      age: 21,
      name: 'Pedro',
      certification: '1234567',
    }).data;
  }
}

export {
  AddPilotRepositoryMock,
  GetPilotRepositoryMock,
};
