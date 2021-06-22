import GenerateLedgerReport from '@/domain/contracts/use-cases/report/ledger';
import Controller from '@/presentation/contracts/controller';
import { HttpResponse } from '@/presentation/contracts/http';
import { ok, serverError } from '@/presentation/utils/http';

class GenerateLedgerReportController implements Controller<any> {
  private readonly _useCase : GenerateLedgerReport

  constructor(useCase : GenerateLedgerReport) {
    this._useCase = useCase;
  }

  async handle() : Promise<HttpResponse> {
    try {
      const report = await this._useCase.handle();

      return ok(report);
    } catch (error) {
      return serverError(error.message);
    }
  }
}

export default GenerateLedgerReportController;
