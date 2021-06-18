import OperationResult from '@/shared/responses/operation-result';

type AddPilotParams = {
  name : string,
  certification : string,
  age : number
}

interface AddPilot {
  handle(pilotData : AddPilotParams) : Promise<OperationResult<string>>;
}

export default AddPilot;

export { AddPilotParams };
