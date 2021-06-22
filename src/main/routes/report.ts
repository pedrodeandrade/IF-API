import { FastifyInstance } from 'fastify';

import adaptRoute from '@/main/adapters/fastify-route-adapter';
import makeGenerateLedgerReportController from '@/main/factories/controllers/report/ledger';

export default (app : FastifyInstance) : void => {
  app.get('/reports/ledger', adaptRoute(makeGenerateLedgerReportController()));
};
