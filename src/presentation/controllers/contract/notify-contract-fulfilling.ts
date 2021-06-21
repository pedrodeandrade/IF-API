import NotifyContractFulfilling from '@/domain/contracts/use-cases/contract/notify-contract-fulfilling';
import Controller from '@/presentation/contracts/controller';
import { HttpResponse } from '@/presentation/contracts/http';
import {
  badRequest, notFound, ok, serverError,
} from '@/presentation/utils/http';

type NotifyContractFulfillingRequestData = {
  contractId : number,
  pilotId: number
}

class NotifyContractFulfillingController implements
  Controller<NotifyContractFulfillingRequestData> {
  private readonly _useCase : NotifyContractFulfilling;

  constructor(useCase : NotifyContractFulfilling) {
    this._useCase = useCase;
  }

  async handle(request: NotifyContractFulfillingRequestData) : Promise<HttpResponse> {
    try {
      await this._useCase.handle(request);

      return ok('Contract fulfilled!');
    } catch (error) {
      if (error.name === 'NotFoundError') { return notFound(error.message); }

      if (error.name === 'BusinessError') { return badRequest(error.message); }

      return serverError(error.message);
    }
  }
}

export { NotifyContractFulfillingRequestData };

export default NotifyContractFulfillingController;
