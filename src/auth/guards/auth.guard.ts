import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CookieService } from '../shared/cookie.service';
import { GetSessionInfoDto } from '../dto/sessioninfo';
import { SessionInfo } from '../decorators/session-info.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies[CookieService.tokenKey];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const sessionInfo = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      if (!this.validateSession(sessionInfo)) {
        return false;
      }
      req['session'] = sessionInfo;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private validateSession(@SessionInfo() session: GetSessionInfoDto): Role {
    return session && session.role;
  }
}
