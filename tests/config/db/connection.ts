import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const connectionOptionsTesting : SqliteConnectionOptions = {
  type: 'sqlite',
  logger: 'advanced-console',
  logging: false,
  database: 'tests/config/testing-db.sqlite',
  entities: ['src/infra/db/mappings/*.ts'],
  migrations: ['src/infra/db/migrations/*.ts'],
  busyErrorRetry: 500,
};

export default connectionOptionsTesting;
