import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { collectDefaultMetrics, Registry } from 'prom-client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('metrics')
@ApiTags('Metrics')
export class MetricsController {
  private readonly register: Registry;

  constructor() {
    this.register = new Registry();
    collectDefaultMetrics({ register: this.register });
  }

  @Get()
  @ApiOperation({ summary: 'Get Prometheus metrics' })
  @ApiResponse({ status: 200, description: 'Metrics fetched successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getMetrics(@Res() res: Response): Promise<void> {
    try {
      res.set('Content-Type', this.register.contentType);
      res.end(await this.register.metrics());
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }
}
