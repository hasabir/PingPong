import { PrismaService } from './prisma/prisma.service';
import { AuthDto } from '../dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user_service';
export declare class Token_Service {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    get_Token(user: any): Promise<string>;
}
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    nickname(dto: AuthDto): Promise<any>;
    avatar(dto: AuthDto): Promise<any>;
    getProfileData(userId: number): Promise<{
        user: {
            id: number;
            FirstName: string;
            LastName: string;
            nickname: string;
            firstLogin: boolean;
            avatar: string;
        };
    } & {
        profileId: number;
        img: string;
        WinsCount: number;
        LoseCount: number;
        rank: number;
        xp: number;
        Achivements: string;
        profileCreator: number;
    }>;
    getDataLaderboard(): Promise<any>;
    getProfileSearch(nickname: string): Promise<any>;
}
