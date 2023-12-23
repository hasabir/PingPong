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
exports.AuthService = exports.Token_Service = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const process_1 = require("process");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("./user_service");
let Token_Service = class Token_Service {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async get_Token(user) {
        try {
            const jwt_Token = await this.jwtService.signAsync(user);
            return jwt_Token;
        }
        catch (error) {
            throw new Error(`Failed to generate token: ${error.message}`);
        }
    }
};
exports.Token_Service = Token_Service;
exports.Token_Service = Token_Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService, user_service_1.UserService])
], Token_Service);
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async nickname(dto) {
        try {
            if (!dto.nickname || !dto.jwt) {
                throw new Error('Invalid data received');
            }
            const payload = await this.jwtService.verifyAsync(dto.jwt, { secret: process_1.env.secretkey });
            const { user } = payload;
            const updatedUser = await this.prisma.user.update({
                where: { id: user.id },
                data: { nickname: dto.nickname },
            });
            console.log("Updated User: ", updatedUser);
            return updatedUser;
        }
        catch (error) {
            throw new Error(`Failed to update nickname: ${error.message}`);
        }
    }
    async avatar(dto) {
        try {
            if (!dto.avatar || !dto.jwt) {
                throw new Error('Invalid data received');
            }
            const payload = this.jwtService.decode(dto.jwt);
            const { user } = payload;
            const updatedUser = await this.prisma.user.update({
                where: { id: user.id },
                data: { avatar: dto.avatar },
            });
            return updatedUser;
        }
        catch (error) {
            throw new Error(`Failed to update avatar: ${error.message}`);
        }
    }
    async getProfileData(userId) {
        try {
            const profile = await this.prisma.profile.findUnique({
                where: { profileCreator: userId },
                include: { user: true },
            });
            return profile;
        }
        catch (error) {
            throw new Error(`Failed to retrieve profile data: ${error.message}`);
        }
    }
    async getDataLaderboard() {
        try {
            const profilesWithUser = await this.prisma.profile.findMany({
                select: {
                    img: true,
                    xp: true,
                    WinsCount: true,
                    LoseCount: true,
                    Achivements: true,
                    user: {
                        select: {
                            nickname: true,
                        },
                    },
                },
            });
            const formattedData = profilesWithUser.map((profile) => ({
                img: profile.img,
                xp: profile.xp,
                winsCount: profile.WinsCount,
                loseCount: profile.LoseCount,
                Achivements: profile.Achivements,
                nickname: profile.user?.nickname || 'DefaultNickname',
            }));
            formattedData.sort((a, b) => b.xp - a.xp);
            return formattedData;
        }
        catch (error) {
            throw new Error('Failed to fetch profile data');
        }
    }
    async getProfileSearch(nickname) {
        try {
            const profile = await this.prisma.profile.findFirst({
                where: {
                    user: {
                        nickname: nickname,
                    },
                },
            });
            return profile;
        }
        catch (error) {
            throw new Error(`Failed to retrieve profile data: ${error.message}`);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map