import { Module } from '@nestjs/common';
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
import { S3Module } from './s3/s3.module';
import { ChildsService } from './childs/childs.service';
import { ChildsModule } from './childs/childs.module';
@Module({
  imports: [
    DbModule,
    AuthModule,
    UsersModule,
    VaccineModule,
    VaccinationModule,
    PublicationModule,
    FileModule,
    ConfigModule,
    S3Module,
    ChildsModule,
  ],
  controllers: [
    AppController,
    UsersController,
    VaccineController,
    VaccinationController,
  ],
  providers: [
    AppService,
    UsersService,
    VaccineService,
    AccessControlService,
    VaccinationService,
    ChildsService,
  ],
})
export class AppModule {}
