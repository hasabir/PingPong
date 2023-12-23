import { AuthService } from './auth.service';
import { Token_Service } from './auth.service';
import { PrismaService } from './prisma/prisma.service';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly Token_Service;
    private authService;
    private prisma;
    constructor(Token_Service: Token_Service, authService: AuthService, prisma: PrismaService);
    handleUserAction(action: string, req: Request): Promise<any>;
    auth42(): Promise<void>;
    auth42Callback(req: any, res: any): Promise<void>;
    getHello(): string;
}
export declare class ApiController {
    private readonly Token_Service;
    private authService;
    private readonly jwtService;
    private prisma;
    constructor(Token_Service: Token_Service, authService: AuthService, jwtService: JwtService, prisma: PrismaService);
    getData(req: Request, res: Response, action: string): Promise<any>;
}
