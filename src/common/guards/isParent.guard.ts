import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { ChildrenService } from '../../users/children/children/children.service';
import { GetSessionInfoDto } from '../../auth/dto/sessioninfo';

@Injectable()
export class IsParentGuard implements CanActivate {
  constructor(private readonly childrenService: ChildrenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session: GetSessionInfoDto = request.session;
    const childId = +request.params.childId;

    if (!session || !session.id) {
      throw new ForbiddenException('Session is invalid');
    }

    const isParent = await this.childrenService.isParentOfChild(
      session.id,
      childId,
    );
    if (!isParent) {
      throw new ForbiddenException('You are not the parent of this child');
    }

    return true;
  }
}
