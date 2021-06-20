import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import env from '@/shared/env';

const connectionOptions : ConnectionOptions = {
  type: 'postgres',
  host: env.dbHost,
  port: env.dbPort,
  username: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
  entities: ['src/infra/db/mappings/*.ts'],
  migrations: ['src/infra/db/migrations/*.ts'],
  logging: process.env.NODE_ENV === 'development' ? ['query', 'error'] : false,
  logger: 'advanced-console',
  synchronize: false,
};

/**
 * Create TypeOrm connection with the database
 */
function typeOrmConnectionFactory(options? : ConnectionOptions) : Promise<Connection> {
  return createConnection(options ?? connectionOptions);
}

export { typeOrmConnectionFactory };

export default connectionOptions;
