import Travel from '@/domain/contracts/use-cases/travel-destination/travel';
import Planets from '@/domain/enums/planet';
import Controller from '@/presentation/contracts/controller';
import { HttpResponse } from '@/presentation/contracts/http';
import {
  badRequest, notFound, ok, serverError,
} from '@/presentation/utils/http';

type TravelRequestData = {
  shipId : number,
  destinationPlanet : Planets
}

class TravelController implements Controller<TravelRequestData> {
  private readonly _useCase : Travel;

  constructor(useCase: Travel) {
    this._useCase = useCase;
  }

  async handle(request: TravelRequestData) : Promise<HttpResponse> {
    try {
      await this._useCase.handle(request);

      return ok(null);
    } catch (error) {
      if (error.name === 'BusinessError') { return badRequest(error.message); }

      if (error.name === 'NotFoundError') { return notFound(error.message); }

      return serverError(error.message);
    }
  }
}

export { TravelRequestData };

export default TravelController;
