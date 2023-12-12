import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { ChildsService } from './users/childs/childs.service';
import { ChildsModule } from './users/childs/childs.module';
@Module({
  imports: [AuthModule, DbModule, UsersModule, ChildsModule],
  controllers: [AppController],
  providers: [AppService, UsersService, ChildsService],
})
export class AppModule {}
