import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const connectionOptionsTesting : SqliteConnectionOptions = {
  type: 'sqlite',
  logger: 'advanced-console',
  logging: true,
  database: 'tests/configs/in-memory-db.sqlite',
  entities: ['src/infra/db/mappings/*.ts'],
  migrations: ['src/infra/db/migrations/*.ts'],
};

export default connectionOptionsTesting;
