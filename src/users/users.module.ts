import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AccessControlService } from '../auth/shared/access-control.service';

@Module({
  imports: [DbModule, ],
  providers: [UsersService, AccessControlService],
  exports: [UsersService],
  controllers: [UsersController, ],
})
export class UsersModule {}
