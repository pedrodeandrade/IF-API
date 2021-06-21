import { FastifyInstance } from 'fastify';

import makePublishContractController from '@/main/factories/controllers/contract/publish-contract';
import makeListOpenContractsController from '@/main/factories/controllers/contract/list-open-contracts';
import makeAcceptContractContractsController from '@/main/factories/controllers/contract/accept-contract';
import makeNotifyContractFulfillingController from '@/main/factories/controllers/contract/notify-contract-fulfilling';

import adaptRoute from '@/main/adapters/fastify-route-adapter';

export default (app : FastifyInstance) : void => {
  app.post('/contracts', adaptRoute(makePublishContractController()));
  app.post('/contracts/accept', adaptRoute(makeAcceptContractContractsController()));
  app.post('/contracts/fulfill', adaptRoute(makeNotifyContractFulfillingController()));
  app.get('/contracts/open', adaptRoute(makeListOpenContractsController()));
};
