import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const connectionOptionsTesting : SqliteConnectionOptions = {
  type: 'sqlite',
  logger: 'advanced-console',
  logging: false,
  database: ':memory:',
  entities: ['src/infra/db/mappings/*.ts'],
  dropSchema: true,
  migrations: ['src/infra/db/migrations/*.ts'],
};

export default connectionOptionsTesting;
