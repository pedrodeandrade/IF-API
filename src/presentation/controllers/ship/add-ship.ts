import AddShip from '@/domain/contracts/use-cases/ship/add-ship';
import Controller from '@/presentation/contracts/controller';
import { HttpResponse } from '@/presentation/contracts/http';
import { created, notFound, serverError } from '@/presentation/utils/http';

type AddShipRequestData = {
  fuelCapacity : number,
  weightCapacity: number,
  pilotId : number
}

class AddShipController implements Controller<AddShipRequestData> {
  private readonly _useCase : AddShip;

  constructor(useCase : AddShip) {
    this._useCase = useCase;
  }

  async handle(request?: AddShipRequestData) : Promise<HttpResponse> {
    try {
      await this._useCase.handle(request);

      return created('Ship added successfully');
    } catch (error) {
      if (error.name === 'NotFoundError') { return notFound(error.message); }

      return serverError(error.message);
    }
  }
}

export { AddShipRequestData };

export default AddShipController;
