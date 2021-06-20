import 'dotenv/config';

import env from '@/shared/env';
import { typeOrmConnectionFactory } from '@/infra/db/config';

typeOrmConnectionFactory().then(async () => {
  const getServer = (await (import('@/main/config/app'))).default;

  getServer().listen(env.serverPort);
})
  .catch(console.error);
