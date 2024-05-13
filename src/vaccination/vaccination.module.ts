import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { VaccinationController } from './vaccination.controller';
import { VaccineService } from '../vaccine/vaccine.service';
import { UsersService } from '../users/users.service';
import { VaccinationService } from './vaccination.service';
import { ChildrenService } from '../users/children/children/children.service';

@Module({})
export class VaccinationModule {
  imports: [DbModule];
  controllers: [VaccinationController];
  providers: [
    VaccinationService,
    VaccineService,
    UsersService,
    ChildrenService,
  ];
  exports: [VaccinationService];
}
