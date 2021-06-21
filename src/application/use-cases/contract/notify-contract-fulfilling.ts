import GetContractRepository from '@/application/contracts/repositories/contract/get-contract-repository';
import UpdateContractRepository from '@/application/contracts/repositories/contract/update-contract-repository';
import GetPilotRepository from '@/application/contracts/repositories/pilot/get-pilot-repository';
import UpdatePilotRepository from '@/application/contracts/repositories/pilot/update-pilot-repository';
import NotifyContractFulfilling, { NotifyContractFulfillingParams } from '@/domain/contracts/use-cases/contract/notify-contract-fulfilling';
import ContractStatus from '@/domain/enums/contract-status';
import BusinessError from '@/shared/errors/business-error';
import NotFoundError from '@/shared/errors/not-found-error';

class NotifyContractFulfillingUseCase implements NotifyContractFulfilling {
  private readonly _getContractRepository : GetContractRepository;

  private readonly _updateContractRepository : UpdateContractRepository;

  private readonly _getPilotRepository : GetPilotRepository;

  private readonly _updatePilotRepository : UpdatePilotRepository;

  constructor(
    getContractRepository : GetContractRepository,
    updateContractRepository : UpdateContractRepository,
    getPilotRepository : GetPilotRepository,
    updatePilotRepository : UpdatePilotRepository,
  ) {
    this._getContractRepository = getContractRepository;
    this._updateContractRepository = updateContractRepository;
    this._getPilotRepository = getPilotRepository;
    this._updatePilotRepository = updatePilotRepository;
  }

  async handle(params: NotifyContractFulfillingParams): Promise<void> {
    const contract = await this._getContractRepository.get(params.contractId);

    if (!contract) { throw new NotFoundError('Contract not found'); }

    if (contract.status !== ContractStatus.InExecution) { throw new BusinessError('Only contracts in execution can be fulfilled'); }

    const pilot = await this._getPilotRepository.get(params.pilotId);

    if (!pilot) { throw new NotFoundError('Pilot not found'); }

    if (pilot.locationPlanet !== contract.destinationPlanet) { throw new BusinessError('A pilot can only fulfill a contract when it is in the same planet as the contract destination'); }

    pilot.credits += contract.value;

    contract.status = ContractStatus.Finished;

    await this._updateContractRepository.update(contract);

    await this._updatePilotRepository.update(pilot);
  }
}

export default NotifyContractFulfillingUseCase;
