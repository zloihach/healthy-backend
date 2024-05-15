import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const UserIdFromSession = createParamDecorator(
  (_, ctx: ExecutionContextHost) => ctx.switchToHttp().getRequest().session.id,
);
