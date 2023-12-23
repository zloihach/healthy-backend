import { Module } from '@nestjs/common';
import { VaccineService } from './vaccine.service';
import { DbModule } from '../db/db.module';
import { VaccineController } from './vaccine.controller';
import { AccessControlService } from '../auth/shared/access-control.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DbModule],
  providers: [VaccineService, AccessControlService, JwtService],
  exports: [VaccineService],
  controllers: [VaccineController],
})
export class VaccineModule {}
