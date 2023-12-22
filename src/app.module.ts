import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
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
@Module({
  imports: [
    AuthModule,
    DbModule,
    UsersModule,
    VaccineModule,
    VaccinationModule,
  ],
  controllers: [AppController, VaccineController, VaccinationController],
  providers: [
    AppService,
    UsersService,
    VaccineService,
    AccessControlService,
    VaccinationService,
  ],
})
export class AppModule {}
