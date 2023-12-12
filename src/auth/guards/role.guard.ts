import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { Reflector } from '@nestjs/core';
import { AccessControlService } from '../shared/access-control.service';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { GetSessionInfoDto } from '../dto/sessioninfo';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessControlService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const token = request['token'] as GetSessionInfoDto;

    if (token && token.role) {
      for (const role of requiredRoles) {
        const result = this.accessControlService.isAuthorized({
          requiredRole: role,
          currentRole: token.role,
        });
        if (result) {
          return true;
        }
      }
    }

    return false;
  }
}

// async canActivate(context: ExecutionContext): Promise<boolean> {
//   const req = context.switchToHttp().getRequest() as Request;
//   const token = req.cookies[CookieService.tokenKey];
//
//   if (!token) {
//     throw new UnauthorizedException();
//   }
//
//   try {
//     const sessionInfo = await this.jwtService.verifyAsync(token, {
//       secret: process.env.JWT_SECRET,
//     });
//
//     if (!this.validateSession(sessionInfo)) {
//       return false;
//     }
//     req['session'] = sessionInfo;
//     return true;
//   } catch {
//     throw new UnauthorizedException();
//   }
// }
//
// private validateSession(@SessionInfo() session: GetSessionInfoDto): Role {
//   return session && session.role;
// }
