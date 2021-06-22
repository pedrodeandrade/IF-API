import { getRepository } from 'typeorm';

import Controller from '@/presentation/contracts/controller';
import ContractMapping from '@/infra/db/mappings/contract';
import Contract from '@/domain/entities/contract';
import ContractRepository from '@/infra/db/repositories/contracts';
import GenerateLedgerReportUseCase from '@/application/use-cases/report/ledger';
import GenerateLedgerReportController from '@/presentation/controllers/report/ledger';

function makeGenerateLedgerReportController() : Controller<any> {
  const typeOrmContractRepository = getRepository<Contract>(ContractMapping);

  const contractRepository = new ContractRepository(typeOrmContractRepository);

  const generateLedgerReportUseCase = new GenerateLedgerReportUseCase(contractRepository);

  return new GenerateLedgerReportController(generateLedgerReportUseCase);
}

export default makeGenerateLedgerReportController;
