import { FastifyInstance } from 'fastify';

import makePublishContractController from '@/main/factories/controllers/contract/publish-contract';
import makeListOpenContractsController from '@/main/factories/controllers/contract/list-open-contracts';

import adaptRoute from '@/main/adapters/fastify-route-adapter';

export default (app : FastifyInstance) : void => {
  app.post('/contracts', adaptRoute(makePublishContractController()));
  app.get('/contracts/open', adaptRoute(makeListOpenContractsController()));
};
