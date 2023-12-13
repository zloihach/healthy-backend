import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ChildController } from './child/child.controller';
import { ChildService } from './child/child.service';
import { ChildModule } from './child/child.module';
@Module({
  imports: [AuthModule, DbModule, UsersModule, ChildModule],
  controllers: [AppController, ChildController],
  providers: [AppService, UsersService, ChildService],
})
export class AppModule {}
