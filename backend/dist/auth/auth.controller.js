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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const auth_service_2 = require("./auth.service");
const prisma_service_1 = require("./prisma/prisma.service");
const auth_guard_1 = require("./auth.guard");
const jwt_1 = require("@nestjs/jwt");
let AuthController = class AuthController {
    constructor(Token_Service, authService, prisma) {
        this.Token_Service = Token_Service;
        this.authService = authService;
        this.prisma = prisma;
    }
    async handleUserAction(action, req) {
        try {
            const dto = {
                nickname: req.cookies.nickname || 'default_nickname_value',
                avatar: req.cookies.avatar || 'default_avatar_value',
                jwt: req.cookies.jwt
            };
            if (action === 'nickname') {
                return this.authService.nickname(dto);
            }
            else if (action === 'avatar') {
                return this.authService.avatar(dto);
            }
            else {
                throw new common_1.HttpException('Invalid action', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new common_1.HttpException('Failed to perform action', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async auth42() {
    }
    async auth42Callback(req, res) {
        try {
            const payload = req.user;
            if (!payload) {
                throw new Error('User data not found');
            }
            const { user } = payload;
            const jwtToken = await this.Token_Service.get_Token(payload);
            console.log("++++++++++++++++++++++++> ", jwtToken);
            res.cookie('jwt', jwtToken, { httpOnly: true, secure: true });
            res.redirect(`http://localhost:3005/welcome`);
        }
        catch (error) {
            res.status(500).send('Error generating token');
        }
    }
    getHello() {
        return 'Hello World!';
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)(':action'),
    (0, common_1.UseGuards)(auth_guard_1.Auth_Guard),
    __param(0, (0, common_1.Param)('action')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleUserAction", null);
__decorate([
    (0, common_1.Get)('42'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('42')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "auth42", null);
__decorate([
    (0, common_1.Get)('42/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('42')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "auth42Callback", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AuthController.prototype, "getHello", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_2.Token_Service,
        auth_service_1.AuthService,
        prisma_service_1.PrismaService])
], AuthController);
let ApiController = class ApiController {
    constructor(Token_Service, authService, jwtService, prisma) {
        this.Token_Service = Token_Service;
        this.authService = authService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async getData(req, res, action) {
        try {
            const dto = {
                nickname: req.cookies.nickname || 'default_nickname_value',
                avatar: req.cookies.avatar || 'default_avatar_value',
                jwt: req.cookies.jwt
            };
            if (!dto.jwt) {
                throw new Error('jwt not found in cookies');
            }
            const payload = this.jwtService.decode(dto.jwt);
            const { user } = payload;
            let resultData;
            if (action === 'profile') {
                resultData = await this.authService.getProfileData(parseInt(user.id, 10));
            }
            else if (action === 'nickname') {
                const userRecord = await this.prisma.user.findUnique({ where: { id: parseInt(user.id, 10) } });
                const nickname = userRecord?.nickname || 'DefaultNickname';
                resultData = { nickname };
            }
            else if (action === 'laderboard') {
                const laderboardData = await this.authService.getDataLaderboard();
                resultData = laderboardData;
                resultData = await this.authService.getDataLaderboard();
            }
            else if (action === 'search') {
                resultData = await this.authService.getProfileSearch(user.nickname);
            }
            else {
                throw new Error('Invalid data type');
            }
            res.json(resultData);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
exports.ApiController = ApiController;
__decorate([
    (0, common_1.Get)(':action(profile|search|nickname|laderboard)'),
    (0, common_1.UseGuards)(auth_guard_1.Auth_Guard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)('action')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "getData", null);
exports.ApiController = ApiController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [auth_service_2.Token_Service,
        auth_service_1.AuthService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], ApiController);
//# sourceMappingURL=auth.controller.js.map