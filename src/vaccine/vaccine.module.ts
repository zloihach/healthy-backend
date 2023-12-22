import { Module } from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { DbModule } from '../db/db.module';
import { VaccineController } from './vaccine.controller';
import { AccessControlService } from '../auth/shared/access-control.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DbModule],
  providers: [VaccineService, AccessControlService, UsersService],
  exports: [VaccineService],
  controllers: [VaccineController],
})
export class VaccineModule {}
