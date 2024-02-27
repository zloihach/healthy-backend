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
    const sessionInfo: GetSessionInfoDto = request['session'];

    if (requiredRoles && sessionInfo && sessionInfo.role) {
      // Проверка на существование requiredRoles
      for (const role of requiredRoles) {
        const result = this.accessControlService.isAuthorized({
          requiredRole: role,
          currentRole: sessionInfo.role,
        });
        if (result) {
          return true;
        }
      }
    }

    return false;
  }
}
