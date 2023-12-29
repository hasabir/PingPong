import { PrismaClient, user } from '.prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
  {
    prisma: PrismaClient;
    constructor() {
      super({
        datasources: {
          db: {
              // url : "postgres://postgres:postgres@localhost:5432/mydb",
              url : "postgres://postgres:postgres@postgres:5432/mydb",
          },
        },
      }),
      this.prisma = new PrismaClient();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;

    // teardown logic
    return Promise.all([this.user.deleteMany()]);
  }

  async getAllUsers(): Promise<user[]> {
    try {
      const users = await this.prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error(`Failed to retrieve users: ${error.message}`);
    }
  }
  
  async getUserById(id: number): Promise<user> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new Error(`Failed to retrieve user: ${error.message}`);
    }
  }

  async updateUser(id: number, userData: any): Promise<user> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: userData,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async deleteUser(id: number): Promise<user> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: { id },
      });
      return deletedUser;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}
  // getClient(): PrismaClient {
  //   return this;
  // }

