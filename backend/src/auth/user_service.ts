import { Injectable } from '@nestjs/common';
// import { user as PrismaUser } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { AuthDto } from '../dto';
// import { tockens} from 'src/types';
import { env } from 'process';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserFromOAuth(user: any): Promise<any> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          nickname: user._json.login || '', // Use the login from the incoming user data
        },
      });

      if (!existingUser)
      { 
        const {name, login, avatar } = user;
        
        const prismaUser = {
          FirstName: name?.givenName || '',
          LastName: name?.familyName || '',
          nickname: user._json.login|| '',
          firstLogin: false,
          avatar: user._json.image.link|| '', 
        };
        const newUser = await this.prisma.user.create({
          data: prismaUser,
        });
        await this.createprofile(newUser.id);
        await this.assignAvatarToprofile(newUser.id, prismaUser.avatar)        
        
        return newUser;
      }else {
        return existingUser; 
      }
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async createprofile(userId: number) {
    try {
      // Create a new profile
      const newprofile = await this.prisma.profile.create({
        data: {
          img: '',
          WinsCount: 0,
          LoseCount: 0,
          rank: 0,
          xp: 0,
          // Achivements : '',
          profileCreator: userId, // Replace with the appropriate user ID
        },
      });
   
      console.log('Created profile:', newprofile);
    } catch (error) {
      console.error('Error creating profile:', error);
    } finally {
      await this.prisma.$disconnect(); // Disconnect Prisma Client
    }
  }

  async assignAvatarToprofile(userId: number, avatarLink: string): Promise<any> {
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

      const updatedprofile = await this.prisma.profile.update({
        where: { profileId: user.profile.profileId },
        data: { img: avatarLink }, // Use the passed avatar link here
      });
      return updatedprofile;
    } catch (error) {
      throw new Error(`Failed to assign avatar to profile: ${error.message}`);
    }
  }

}