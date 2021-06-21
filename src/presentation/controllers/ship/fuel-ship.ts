import FuelShip from '@/domain/contracts/use-cases/ship/fuel-ship';
import Controller from '@/presentation/contracts/controller';
import { HttpResponse } from '@/presentation/contracts/http';
import { badRequest, ok, serverError } from '@/presentation/utils/http';

type FuelShipRequestData = {
  shipId : number,
  fuelAmount : number
}

class FuelShipController implements Controller<FuelShipRequestData> {
  private readonly _useCase : FuelShip;

  constructor(useCase: FuelShip) {
    this._useCase = useCase;
  }

  async handle(request: FuelShipRequestData): Promise<HttpResponse> {
    try {
      await this._useCase.handle(request);

      return ok('Ship fueled successfully');
    } catch (error) {
      if (error.name === 'BusinessError') { return badRequest(error.message); }

      return serverError(error.message);
    }
  }
}

export { FuelShipRequestData };

export default FuelShipController;
