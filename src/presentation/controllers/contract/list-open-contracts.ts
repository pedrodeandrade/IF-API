import ListOpenContracts from '@/domain/contracts/use-cases/contract/list-open-contracts';
import Controller from '@/presentation/contracts/controller';
import { HttpResponse } from '@/presentation/contracts/http';
import { ok, serverError } from '@/presentation/utils/http';

class ListOpenContractsController implements Controller<any> {
  private readonly _useCase : ListOpenContracts;

  constructor(useCase : ListOpenContracts) {
    this._useCase = useCase;
  }

  async handle() : Promise<HttpResponse> {
    try {
      const openContracts = await this._useCase.handle();

      return ok(openContracts);
    } catch (error) {
      return serverError(error.message);
    }
  }
}

export default ListOpenContractsController;
