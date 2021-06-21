import AcceptContract from '@/domain/contracts/use-cases/contract/accept-contract';
import Controller from '@/presentation/contracts/controller';
import { HttpResponse } from '@/presentation/contracts/http';
import {
  badRequest, notFound, ok, serverError,
} from '@/presentation/utils/http';

type AcceptContractRequestData = {
  pilotId : number,
  contractId : number
}

class AcceptContractController implements Controller<AcceptContractRequestData> {
  private readonly _useCase : AcceptContract;

  constructor(useCase : AcceptContract) {
    this._useCase = useCase;
  }

  async handle(request: AcceptContractRequestData) : Promise<HttpResponse> {
    try {
      await this._useCase.handle(request);

      return ok('Contract Accepted');
    } catch (error) {
      if (error.name === 'BusinessError') { return badRequest(error.message); }

      if (error.name === 'NotFoundError') { return notFound(error.message); }

      return serverError(error.message);
    }
  }
}

export { AcceptContractRequestData };

export default AcceptContractController;
