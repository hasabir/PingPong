import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
export declare class AppController {
    private readonly appService;
    private prisma;
    constructor(appService: AppService, prisma: PrismaClient);
    getHello(): string;
}
