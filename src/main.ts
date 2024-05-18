import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { setupSwagger } from './swagger';
import { ConfigService } from '@nestjs/config';
import * as csurf from 'csurf';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  logger.log('Nest application created');

  app.use(cookieParser());
  logger.log('Cookie parser initialized');

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  logger.log('Global validation pipe set up');

  app.use(
    cors({
      origin: 'http://localhost:4200',
      credentials: true,
    }),
  );
  logger.log('CORS enabled for http://localhost:4200');

  // app.use(
  //   csurf({
  //     cookie: {
  //       httpOnly: true,
  //       sameSite: 'strict',
  //       secure: process.env.NODE_ENV === 'production',
  //     },
  //   }),
  // );
  // logger.log('CSURF setup completed');

  await setupSwagger(app);
  logger.log('Swagger setup completed');

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);

  logger.log(`Server is running on port ${port}`);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Error during bootstrap', error.stack);
});
