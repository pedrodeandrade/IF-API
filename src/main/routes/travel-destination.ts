import { FastifyInstance } from 'fastify';

import adaptRoute from '@/main/adapters/fastify-route-adapter';
import makeTravelController from '@/main/factories/controllers/travel-destination/travel';

export default (app : FastifyInstance) : void => {
  app.post('/travel', adaptRoute(makeTravelController()));
};
