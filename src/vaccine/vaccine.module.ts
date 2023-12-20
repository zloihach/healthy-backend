import { Module } from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { DbModule } from '../db/db.module';
import { VaccineController } from './vaccine.controller';
import { AccessControlService } from '../auth/shared/access-control.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DbModule, UsersModule],
  providers: [VaccineService, AccessControlService],
  exports: [VaccineService],
  controllers: [VaccineController],
})
export class VaccineModule {}
