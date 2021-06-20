import AddPilotRepository from '@/application/contracts/repositories/pilot/add-pilot-repository';
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

export {
  AddPilotRepositoryMock,
};
