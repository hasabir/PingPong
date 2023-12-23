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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUserFromOAuth(user) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    nickname: user._json.login || '',
                },
            });
            if (!existingUser) {
                const { name, login, avatar } = user;
                const prismaUser = {
                    FirstName: name?.givenName || '',
                    LastName: name?.familyName || '',
                    nickname: user._json.login || '',
                    firstLogin: false,
                    avatar: user._json.image.link || '',
                };
                const newUser = await this.prisma.user.create({
                    data: prismaUser,
                });
                await this.createProfile(newUser.id);
                await this.assignAvatarToProfile(newUser.id, prismaUser.avatar);
                return newUser;
            }
            else {
                return existingUser;
            }
        }
        catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    }
    async createProfile(userId) {
        try {
            const newProfile = await this.prisma.profile.create({
                data: {
                    img: '',
                    WinsCount: 0,
                    LoseCount: 0,
                    rank: 0,
                    xp: 0,
                    Achivements: '',
                    profileCreator: userId,
                },
            });
            console.log('Created profile:', newProfile);
        }
        catch (error) {
            console.error('Error creating profile:', error);
        }
        finally {
            await this.prisma.$disconnect();
        }
    }
    async assignAvatarToProfile(userId, avatarLink) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: { profile: true },
            });
            if (!user) {
                throw new Error('User not found');
            }
            if (!user.profile) {
                throw new Error('User profile not found');
            }
            const updatedProfile = await this.prisma.profile.update({
                where: { profileId: user.profile.profileId },
                data: { img: avatarLink },
            });
            return updatedProfile;
        }
        catch (error) {
            throw new Error(`Failed to assign avatar to profile: ${error.message}`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user_service.js.map