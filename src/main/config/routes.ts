import { FastifyInstance } from 'fastify';

import registerPilotRoutes from '@/main/routes/pilot';
import registerShipRoutes from '@/main/routes/ship';

export default (app: FastifyInstance) : void => {
  registerPilotRoutes(app);
  registerShipRoutes(app);
};
