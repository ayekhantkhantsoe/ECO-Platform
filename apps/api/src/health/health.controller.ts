import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';

import { Public } from '../common/auth/decorators.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Public()
@Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  /** Liveness — Render health check path: /api/health */
  @Get()
  live() {
    return { status: 'ok' };
  }

  /** Readiness — also checks the database connection. */
  @Get('ready')
  async ready() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', database: 'up' };
    } catch {
      throw new ServiceUnavailableException({
        status: 'error',
        database: 'down',
      });
    }
  }
}
