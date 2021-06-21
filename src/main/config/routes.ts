import { FastifyInstance } from 'fastify';

import registerPilotRoutes from '@/main/routes/pilot';
import registerShipRoutes from '@/main/routes/ship';
import registerContractRoutes from '@/main/routes/contract';

export default (app: FastifyInstance) : void => {
  registerPilotRoutes(app);
  registerShipRoutes(app);
  registerContractRoutes(app);
};
