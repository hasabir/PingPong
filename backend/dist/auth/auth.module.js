"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const strategy_1 = require("../strategy");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const auth_service_2 = require("./auth.service");
const user_service_1 = require("./user_service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const prisma_module_1 = require("./prisma/prisma.module");
const process_1 = require("process");
const game_module_1 = require("../game/game.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [game_module_1.GameModule, prisma_module_1.PrismaModule, config_1.ConfigModule, jwt_1.JwtModule.register({
                global: true,
                secret: process_1.env.secretkey,
                signOptions: { expiresIn: '864000s' },
            })],
        controllers: [auth_controller_1.AuthController, auth_controller_1.ApiController],
        providers: [auth_service_1.AuthService, user_service_1.UserService, auth_service_2.Token_Service, strategy_1.FortyTwoStrategy],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map