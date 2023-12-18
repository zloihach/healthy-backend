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
import { VaccineController } from './vaccine/vaccine.controller';
import { VaccineModule } from './vaccine/vaccine.module';
import { VaccineService } from './vaccine/vaccine.service';
import { AccessControlService } from './auth/shared/access-control.service';
@Module({
  imports: [AuthModule, DbModule, UsersModule, ChildModule, VaccineModule],
  controllers: [AppController, ChildController, VaccineController],
  providers: [
    AppService,
    UsersService,
    ChildService,
    VaccineService,
    AccessControlService,
  ],
})
export class AppModule {}
