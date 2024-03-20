import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { SpelunkerModule } from 'nestjs-spelunker';

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
      origin: 'http://localhost:4200', // Allow requests from this origin
      credentials: true, // Allow cookies to be sent along with the request
    }),
  );

  const tree = SpelunkerModule.explore(app);
  const root = SpelunkerModule.graph(tree);
  const edges = SpelunkerModule.findGraphEdges(root);
  const mermaidEdges = edges
    .filter(
      ({ from, to }) =>
        !(
          from.module.name === 'ConfigHostModule' ||
          from.module.name === 'LoggerModule' ||
          to.module.name === 'ConfigHostModule' ||
          to.module.name === 'LoggerModule'
        ),
    )
    .map(({ from, to }) => `${from.module.name}-->${to.module.name}`);
  console.log(`graph TD\n\t${mermaidEdges.join('\n\t')}`);

  await app.listen(3010);
}
bootstrap().then(() => console.log('Server is running'));
