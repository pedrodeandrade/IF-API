import AddPilot from '@/domain/contracts/use-cases/pilot/add-pilot';
import Controller from '@/presentation/contracts/controller';
import { HttpResponse } from '@/presentation/contracts/http';
import { badRequest, created, serverError } from '@/presentation/utils/http';

type AddPilotRequestBody = {
  name : string,
  certification : string,
  age : number
}

class AddPilotController implements Controller<AddPilotRequestBody> {
  private readonly _useCase : AddPilot;

  constructor(useCase : AddPilot) {
    this._useCase = useCase;
  }

  async handle(request?: AddPilotRequestBody) : Promise<HttpResponse> {
    try {
      const result = await this._useCase.handle(request);

      if (!result.success) { return badRequest(result.message); }

      return created(result.data);
    } catch (error) {
      return serverError(error.message);
    }
  }
}

export {
  AddPilotRequestBody,
};

export default AddPilotController;
