import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator
} from "@nestjs/terminus";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly healthCheck: HealthCheckService,
              private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
              private memoryHealthIndicator: MemoryHealthIndicator,
              private diskHealthIndicator: DiskHealthIndicator) {}

  @Get()
  @HealthCheck()
  getHello() {
    return this.healthCheck.check([
        //database
      () => this.typeOrmHealthIndicator.pingCheck('database'),
      () => this.memoryHealthIndicator.checkHeap('memory heap', 300 * 1024 * 1024),
      () => this.memoryHealthIndicator.checkRSS('memory RSS', 300 * 1024 * 1024),
      () => this.diskHealthIndicator.checkStorage('disk health', {
        thresholdPercent: 0.5,
        path: '/',
      })
    ]);
  }
}
