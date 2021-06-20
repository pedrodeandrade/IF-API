import { Connection, ConnectionOptions, createConnection } from 'typeorm';

// TODO Move dotenv to appropriate layer
import dotenv from 'dotenv';

dotenv.config();

const connectionOptions : ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
