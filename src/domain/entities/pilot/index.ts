import Planets from '@/domain/enums/planet';
import OperationResult from '@/shared/responses/operation-result';
import Ship from '@/domain/entities/ship';
import Contract from '@/domain/entities/contract';

type CreatePilotData = {
  id? : number;

  name :string;

  certification : string;

  age : number;
}

class Pilot {
  public readonly id : number;

  public readonly name :string;

  public locationPlanet : Planets;

  public readonly certification : string;

  public readonly age : number;

  public ships : Ship[]

  public contracts : Contract[]

  private _credits : number;

  get credits() : number {
    return this._credits;
  }

  set credits(value : number) {
    if (value < 0) {
      this._credits = 0;

      return;
    }

    this._credits = value;
  }

  private constructor(pilotData : CreatePilotData) {
    this.id = pilotData.id ?? 0;
    this.name = pilotData.name;
    this.age = pilotData.age;
    this.certification = pilotData.certification;
    this.credits = 100;
  }

  public static create(pilotData : CreatePilotData) : OperationResult<Pilot> {
    const result = new OperationResult<Pilot>(true);

    const validCertification = this._validateCertification(pilotData.certification);
    if (!validCertification) {
      result.success = false;
      result.message = 'Invalid pilot certification';

      return result;
    }

    const validAge = this._validateAge(pilotData.age);
    if (!validAge) {
      result.success = false;
      result.message = 'Pilot need to be older than 18';

      return result;
    }

    result.data = new this(pilotData);

    return result;
  }

  private static _validateCertification(pilotCertification : string) : boolean {
    // TODO Validate properly
    return pilotCertification.length === 7;
  }

  private static _validateAge(age: number) : boolean {
    return age >= 18;
  }
}

export default Pilot;
