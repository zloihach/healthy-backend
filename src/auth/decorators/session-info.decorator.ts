import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const SessionInfo = createParamDecorator(
  (_, ctx: ExecutionContextHost) => ctx.switchToHttp().getRequest().session,
);
