import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app).then((r) => console.log('setupSwagger', r));
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port, () => {
    console.log(`Application running at ${port}`);
  });
}
bootstrap().then(() => console.log('Server is running'));
