import { FastifyInstance } from 'fastify';

import makeAddPilotController from '@/main/factories/controllers/pilot/add-pilot';
import adaptRoute from '@/main/adapters/fastify-route-adapter';

export default (app : FastifyInstance) : void => {
  app.post('/pilots', adaptRoute(makeAddPilotController()));
};
