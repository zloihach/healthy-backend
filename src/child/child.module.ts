import { Module } from '@nestjs/common';
import { ChildService } from './child.service';
import { ChildController } from './child.controller';
import { AccessControlService } from '../auth/shared/access-control.service';
import { DbModule } from '../db/db.module';
import { UsersModule } from '../users/users.module';

@Module({})
export class ChildModule {
  imports: [DbModule, UsersModule];
  exports: [ChildService];
  controllers: [ChildController];
  provides: [AccessControlService];
}
