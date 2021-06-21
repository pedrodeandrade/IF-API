import GetContractRepository from '@/application/contracts/repositories/contract/get-contract-repository';
import UpdateContractRepository from '@/application/contracts/repositories/contract/update-contract-repository';
import GetPilotRepository from '@/application/contracts/repositories/pilot/get-pilot-repository';
import AcceptContract, { AcceptContractParams } from '@/domain/contracts/use-cases/contract/accept-contract';
import ContractStatus from '@/domain/enums/contract-status';
import BusinessError from '@/shared/errors/business-error';
import NotFoundError from '@/shared/errors/not-found-error';

class AcceptContractUseCase implements AcceptContract {
  private readonly _getContractRepository : GetContractRepository;

  private readonly _updateContractRepository : UpdateContractRepository;

  private readonly _getPilotRepository : GetPilotRepository;

  constructor(
    getContractRepository : GetContractRepository,
    updateContractRepository : UpdateContractRepository,
    getPilotRepository : GetPilotRepository,
  ) {
    this._getContractRepository = getContractRepository;
    this._updateContractRepository = updateContractRepository;
    this._getPilotRepository = getPilotRepository;
  }

  async handle(params: AcceptContractParams): Promise<void> {
    const contract = await this._getContractRepository.get(params.contractId);

    if (!contract) { throw new NotFoundError('Contract not found'); }

    if (contract.status !== ContractStatus.Open) { throw new BusinessError('Contracts can only be accepted if their status is "Open"'); }

    const pilot = await this._getPilotRepository.get(params.pilotId);
    if (!pilot) { throw new NotFoundError('Pilot not found'); }

    contract.status = ContractStatus.InExecution;
    contract.pilot = pilot;

    await this._updateContractRepository.update(contract);
  }
}

export default AcceptContractUseCase;
