export default {
  dbName: process.env.DB_NAME || 'cm_dev',
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || '12345',
  dbHost: process.env.DB_HOST || '127.0.0.1',
  dbPort: Number(process.env.DB_PORT) || 5432,
  serverPort: Number(process.env.PORT) || 3333,
};
