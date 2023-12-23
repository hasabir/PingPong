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
exports.Auth_Guard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const process_1 = require("process");
let Auth_Guard = class Auth_Guard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromCookies(request);
        if (!token) {
            throw new common_1.UnauthorizedException('Missing token');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, { secret: process_1.env.secretkey });
            request['user'] = payload;
        }
        catch (error) {
            console.error("Token verification error: ", error.message);
            throw new common_1.UnauthorizedException('Invalid token');
        }
        return true;
    }
    extractTokenFromCookies(request) {
        const token = request.cookies['jwt'];
        return token;
    }
};
exports.Auth_Guard = Auth_Guard;
exports.Auth_Guard = Auth_Guard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], Auth_Guard);
//# sourceMappingURL=auth.guard.js.map