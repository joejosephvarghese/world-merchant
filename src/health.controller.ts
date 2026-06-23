import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  root() {
    return { status: 'ok', service: 'world-merchant' };
  }

  @Get('health')
  health() {
    return { status: 'ok', uptime: process.uptime() };
  }
}
