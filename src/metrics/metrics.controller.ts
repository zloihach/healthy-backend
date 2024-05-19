import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { collectDefaultMetrics, Registry } from 'prom-client';

@Controller('metrics')
export class MetricsController {
  private readonly register: Registry;

  constructor() {
    this.register = new Registry();
    collectDefaultMetrics({ register: this.register });
  }

  @Get()
  async getMetrics(@Res() res: Response) {
    res.set('Content-Type', this.register.contentType);
    res.end(await this.register.metrics());
  }
}
