import { FastifyInstance } from 'fastify';

import makeAddShipController from '@/main/factories/controllers/ship/add-ship';
import adaptRoute from '@/main/adapters/fastify-route-adapter';
import makeFuelShipController from '@/main/factories/controllers/ship/fuel-ship';

export default (app : FastifyInstance) : void => {
  app.post('/ships', adaptRoute(makeAddShipController()));
  app.post('/ships/:shipId/fuel', adaptRoute(makeFuelShipController()));
};
