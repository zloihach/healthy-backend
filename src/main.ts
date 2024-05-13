import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Healthy API')
    .setDescription('Ny vrode workaet s bogom!')
    .setVersion('0.0.1')
    .addTag('Healthy')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(
    cors({
      origin: 'http://localhost:4200',
      credentials: true,
    }),
  );

  await app.listen(3010);
}
bootstrap().then(() => console.log('Server is running'));
