"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const client_1 = require(".prisma/client");
const common_1 = require("@nestjs/common");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: "postgres://postgres:postgres@localhost:5432/mydb",
                },
            },
        }),
            this.prisma = new client_1.PrismaClient();
    }
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async cleanDatabase() {
        if (process.env.NODE_ENV === 'production')
            return;
        return Promise.all([this.user.deleteMany()]);
    }
    async getAllUsers() {
        try {
            const users = await this.prisma.user.findMany();
            return users;
        }
        catch (error) {
            throw new Error(`Failed to retrieve users: ${error.message}`);
        }
    }
    async getUserById(id) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
            });
            return user;
        }
        catch (error) {
            throw new Error(`Failed to retrieve user: ${error.message}`);
        }
    }
    async updateUser(id, userData) {
        try {
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: userData,
            });
            return updatedUser;
        }
        catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    }
    async deleteUser(id) {
        try {
            const deletedUser = await this.prisma.user.delete({
                where: { id },
            });
            return deletedUser;
        }
        catch (error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map