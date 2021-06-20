import Controller from '@/presentation/contracts/controller';

import { FastifyRequest, FastifyReply } from 'fastify';

function adaptRoute(controller : Controller<any>) {
  return async function (request : FastifyRequest, reply: FastifyReply) {
    const requestData = {
      ...request.body as any || {},
      ...request.params as any || {},
      ...request.query as any || {},
    };

    const response = await controller.handle(requestData);

    reply.status(response.statusCode).send(response);
  };
}

export default adaptRoute;
