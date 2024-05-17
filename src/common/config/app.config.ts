import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: port,
  };
});
