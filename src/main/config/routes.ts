import { FastifyInstance } from 'fastify';

import registerPilotRoutes from '@/main/routes/pilot';

export default (app: FastifyInstance) : void => {
  registerPilotRoutes(app);
};
