import AddPilot, { AddPilotParams } from '@/domain/contracts/use-cases/pilot/add-pilot';
import OperationResult from '@/shared/responses/operation-result';

class AddPilotMock implements AddPilot {
  private _operationResult : OperationResult<string>

  async handle(pilotData: AddPilotParams): Promise<OperationResult<string>> {
    return this._operationResult;
  }

  setOperationResult(operationResult : OperationResult<string>) : void {
    this._operationResult = operationResult;
  }
}

export { AddPilotMock };
