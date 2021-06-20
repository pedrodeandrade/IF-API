import AddPilotRepository from '@/application/contracts/repositories/pilot/add-pilot-repository';
import Pilot from '@/domain/entities/pilot';
import AddPilot, { AddPilotParams } from '@/domain/contracts/use-cases/pilot/add-pilot';
import OperationResult from '@/shared/responses/operation-result';

class AddPilotUseCase implements AddPilot {
  private readonly _repository : AddPilotRepository;

  constructor(repository : AddPilotRepository) {
    this._repository = repository;
  }

  async handle(pilotData: AddPilotParams): Promise<OperationResult<string>> {
    try {
      const createPilot = Pilot.create(pilotData);

      if (!createPilot.success) { throw new Error(createPilot.message); }

      const persistPilot = await this._repository.add(createPilot.data);

      if (!persistPilot) { throw new Error('Error creating pilot'); }

      return new OperationResult<string>(true, 'Pilot successfully created');
    } catch (error) {
      return new OperationResult<string>(false, null, error.message);
    }
  }
}

export default AddPilotUseCase;
