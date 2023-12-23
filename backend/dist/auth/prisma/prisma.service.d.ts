import { PrismaClient, user } from '.prisma/client';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    prisma: PrismaClient;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    cleanDatabase(): Promise<[import(".prisma/client").Prisma.BatchPayload]>;
    getAllUsers(): Promise<user[]>;
    getUserById(id: number): Promise<user>;
    updateUser(id: number, userData: any): Promise<user>;
    deleteUser(id: number): Promise<user>;
}
