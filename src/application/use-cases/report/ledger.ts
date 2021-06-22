import ListFinishedContractsRepository from '@/application/contracts/repositories/contract/list-finished-contracts-repository';
import GenerateLedgerReport from '@/domain/contracts/use-cases/report/ledger';

class GenerateLedgerReportUseCase implements GenerateLedgerReport {
  private readonly _listFinishedContractsRepository : ListFinishedContractsRepository

  constructor(listFinishedContractsRepository : ListFinishedContractsRepository) {
    this._listFinishedContractsRepository = listFinishedContractsRepository;
  }

  async handle(): Promise<string[]> {
    const finishedContracts = await this._listFinishedContractsRepository.listFinishedContracts();

    return finishedContracts.map((contract) => `${contract.description}: -₭${contract.value}`);
  }
}

export default GenerateLedgerReportUseCase;
