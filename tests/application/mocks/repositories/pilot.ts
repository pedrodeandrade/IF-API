import AddPilotRepository from '@/application/contracts/repositories/pilot/add-pilot-repository';
import GetPilotRepository from '@/application/contracts/repositories/pilot/get-pilot-repository';
import UpdatePilotRepository from '@/application/contracts/repositories/pilot/update-pilot-repository';
import Pilot from '@/domain/entities/pilot';
import Planets from '@/domain/enums/planet';

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
  public pilot : Pilot

  private pilotPlanet : Planets;

  private pilotCredits : number;

  async get(pilotId: number): Promise<Pilot> {
    this.pilot = Pilot.create({
      id: pilotId,
      age: 21,
      name: 'Pedro',
      certification: '1234567',
    }).data;

    this.pilot.locationPlanet = this.pilotPlanet;

    return this.pilot;
  }

  public setPilotPlanet(value: Planets) : void {
    this.pilotPlanet = value;
  }

  public setPilotCredits(value: number) : void {
    this.pilotCredits = value;
  }
}

class UpdatePilotRepositoryMock implements UpdatePilotRepository {
  async update(pilot: Pilot): Promise<void> {
    // eslint-disable-next-line no-useless-return
    return;
  }
}

export {
  AddPilotRepositoryMock,
  GetPilotRepositoryMock,
  UpdatePilotRepositoryMock,
};
