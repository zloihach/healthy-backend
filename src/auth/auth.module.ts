import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordService } from './password/password.service';
import { CookieService } from './shared/cookie.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { AuthController } from './auth.controller';
import { SharedModule } from './shared/shared.module';
import { AccessControlService } from './shared/access-control.service';
import { RedisModule } from '../../redis/redis.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    SharedModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    CookieService,
    AccessControlService,
  ],
})
export class AuthModule {}
