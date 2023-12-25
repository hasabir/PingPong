import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private prisma: PrismaClient) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
