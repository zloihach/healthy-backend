import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { VaccineController } from './vaccine/vaccine.controller';
import { VaccineModule } from './vaccine/vaccine.module';
import { VaccineService } from './vaccine/vaccine.service';
import { AccessControlService } from './auth/shared/access-control.service';
import { VaccinationController } from './vaccination/vaccination.controller';
import { VaccinationService } from './vaccination/vaccination.service';
import { VaccinationModule } from './vaccination/vaccination.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { PublicationModule } from './publication/publication.module';
import { FileModule } from './files/file.module';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './files/s3/s3.module';
import { ChildrenModule } from './users/children/children/children.module';
import { ChildrenController } from './users/children/children/children.controller';
import { ChildrenService } from './users/children/children/children.service';
import redisConfig from './common/config/redis.config';
import swaggerConfig from './common/config/swagger.config';
import appConfig from './common/config/app.config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { WinstonModule } from 'nest-winston';
import { createLoggerOptions } from './common/config/logger.config';
import s3Config from './common/config/s3.config';
import { MetricsMiddleware } from './metrics/metrics.middleware';
import { MetricsController } from './metrics/metrics.controller';
import { MailController } from './notification/mailer/mailer.controller';
import { MailService } from './common/config/mail-service.config';
import { MailModule } from './notification/mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, redisConfig, swaggerConfig, s3Config],
    }),
    WinstonModule.forRoot(createLoggerOptions()),
    DbModule,
    AuthModule,
    UsersModule,
    ChildrenModule,
    VaccineModule,
    VaccinationModule,
    PublicationModule,
    FileModule,
    ConfigModule,
    S3Module,
    RedisModule,
    MailModule,
  ],
  controllers: [
    AppController,
    UsersController,
    ChildrenController,
    VaccineController,
    VaccinationController,
    MetricsController,
    MailController,
  ],
  providers: [
    AppService,
    UsersService,
    ChildrenService,
    VaccineService,
    AccessControlService,
    VaccinationService,
    MailService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
