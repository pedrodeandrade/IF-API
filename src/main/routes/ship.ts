import { FastifyInstance } from 'fastify';

import makeAddShipController from '@/main/factories/controllers/ship/add-ship';
import adaptRoute from '@/main/adapters/fastify-route-adapter';

export default (app : FastifyInstance) : void => {
  app.post('/ships/:pilotId', adaptRoute(makeAddShipController()));
};
