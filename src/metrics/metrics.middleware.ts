import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { collectDefaultMetrics, Registry } from 'prom-client';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  private readonly register: Registry;

  constructor() {
    this.register = new Registry();
    collectDefaultMetrics({ register: this.register });
  }

  use(req: Request, res: Response, next: () => void) {
    if (req.path === '/metrics') {
      res.set('Content-Type', this.register.contentType);
      res.end(this.register.metrics());
    } else {
      next();
    }
  }
}
