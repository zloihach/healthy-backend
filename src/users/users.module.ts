import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ChildsController } from './childs/childs.controller';
import { ChildsModule } from './childs/childs.module';
import { AccessControlService } from '../auth/shared/access-control.service';

@Module({
  imports: [DbModule, ChildsModule],
  providers: [UsersService, AccessControlService],
  exports: [UsersService],
  controllers: [UsersController, ChildsController],
})
export class UsersModule {}
