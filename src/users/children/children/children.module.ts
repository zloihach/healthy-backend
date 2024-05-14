import { Module } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { DbModule } from '../../../db/db.module';
import { VaccineModule } from '../../../vaccine/vaccine.module';
import { AccessControlService } from '../../../auth/shared/access-control.service';
import { VaccinationService } from '../../../vaccination/vaccination.service';
import { ChildrenController } from './children.controller';
import { UsersService } from '../../users.service';

@Module({
  imports: [DbModule, VaccineModule],
  providers: [
    ChildrenService,
    AccessControlService,
    VaccinationService,
    UsersService,
  ],
  exports: [ChildrenService],
  controllers: [ChildrenController],
})
export class ChildrenModule {}
