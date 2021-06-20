import fastify, { FastifyInstance } from 'fastify';

import setupRoutes from '@/main/config/routes';

const app : FastifyInstance = fastify();

setupRoutes(app);

export default () : FastifyInstance => app;
