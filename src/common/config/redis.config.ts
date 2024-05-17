import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => {
  return {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
    db: process.env.REDIS_DATABASE
      ? parseInt(process.env.REDIS_DATABASE, 10)
      : 0,
    keyPrefix: process.env.REDIS_KEY_PREFIX
      ? process.env.REDIS_KEY_PREFIX + ':'
      : '',
    ...(process.env.REDIS_USERNAME && {
      username: process.env.REDIS_USERNAME,
    }),
    ...(process.env.REDIS_PASSWORD && {
      password: process.env.REDIS_PASSWORD,
    }),
  };
});
