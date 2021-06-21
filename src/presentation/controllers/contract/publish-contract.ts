import PublishContract from '@/domain/contracts/use-cases/contract/pubish-contract';
import ContractResource from '@/domain/entities/contract-resource';
import Planets from '@/domain/enums/planet';
import Controller from '@/presentation/contracts/controller';
import { HttpResponse } from '@/presentation/contracts/http';
import { created, serverError } from '@/presentation/utils/http';

type PublishContractRequestData = {
  description : string,

  originPlanet : Planets,

  destinationPlanet : Planets,

  value : number,

  resources : ContractResource[]
}

class PublishContractController implements Controller<PublishContractRequestData> {
  private readonly _useCase : PublishContract

  constructor(useCase: PublishContract) {
    this._useCase = useCase;
  }

  async handle(request?: PublishContractRequestData) : Promise<HttpResponse> {
    try {
      const contractId = await this._useCase.handle(request);

      return created({
        contractId,
      });
    } catch (error) {
      return serverError(error.message);
    }
  }
}

export { PublishContractRequestData };
export default PublishContractController;
