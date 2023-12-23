import { PrismaService } from './prisma/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUserFromOAuth(user: any): Promise<any>;
    createProfile(userId: number): Promise<void>;
    assignAvatarToProfile(userId: number, avatarLink: string): Promise<any>;
}
