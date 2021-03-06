import { FastifyInstance } from 'fastify';

import registerPilotRoutes from '@/main/routes/pilot';
import registerShipRoutes from '@/main/routes/ship';
import registerContractRoutes from '@/main/routes/contract';
import registerTravelDestinationRoutes from '@/main/routes/travel-destination';
import registerReportRoutes from '@/main/routes/report';

export default (app: FastifyInstance) : void => {
  registerPilotRoutes(app);
  registerShipRoutes(app);
  registerContractRoutes(app);
  registerTravelDestinationRoutes(app);
  registerReportRoutes(app);
};
