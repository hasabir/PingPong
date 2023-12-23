
import { Request } from 'express'; // Import Request type from Express
import { Injectable, Res } from '@nestjs/common';
// import { user as PrismaUser } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { AuthDto } from '../dto';
// import { tockens} from 'src/types';
import { env } from 'process';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';
import { use } from 'passport';
import { UserService } from './user_service';
// import { JwtPayload } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import { PrismaClient } from '@prisma/client';
// import { id } from 'date-fns/locale'; // Update the path accordingly

@Injectable()
export class Token_Service {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async get_Token(user: any): Promise<string> {
    try {
      // const create_User = await this.userService.createUserFromOAuth(user);
      // const { accessToken } = user; // Assuming the accessToken is available in createdUser object
      // console.log("haaaaaaaaaaaaaaaadi 2 ", user);

      // Generate JWT token using the accessToken
      const jwt_Token = await this.jwtService.signAsync(user);
      // user.firstLogin = true;
      // const jwt_Token = await this.jwtService.signAsync({ accessToken });
      // console.log("haaaaaaaaaaaaaaaadi 111 ",jwt_Token);
      return jwt_Token;
    } catch (error) {
      throw new Error(`Failed to generate token: ${error.message}`);
    }
  }
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
    private jwtService:JwtService) {}
  
  async nickname(dto: AuthDto): Promise<any> {
    try {
      
      // Example: Check if the received data is valid
      if (!dto.nickname || !dto.jwt) {
        throw new Error('Invalid data received');
      }
      const payload = await this.jwtService.verifyAsync(dto.jwt, { secret: env.secretkey });

      const { user } = payload;

      
      // Example: Perform an update in the database using Prisma or other ORM
      const updatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: { nickname: dto.nickname },
      });
      
      console.log("Updated User: ", updatedUser);
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update nickname: ${error.message}`);
    }
  }
  
  async avatar(dto: AuthDto): Promise<any> {
    try {
      // Example: Check if the received data is valid
      if (!dto.avatar || !dto.jwt) {
        throw new Error('Invalid data received');
      }
      // const payload = await this.jwtService.verifyAsync(dto.jwt, { secret: env.secretkey });
      const payload = this.jwtService.decode(dto.jwt); 
      const { user } = payload;
      
      // Example: Perform an update in the database using Prisma or other ORM
      const updatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: { avatar: dto.avatar },
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update avatar: ${error.message}`);
    }
  }

  async getProfileData(userId: number) {
    try {
      const profile = await this.prisma.profile.findUnique({
        where: { profileCreator: userId },
        include: { user: true }, 
      });
      return profile;
    } catch (error) {
      throw new Error(`Failed to retrieve profile data: ${error.message}`);
    }
  }

  async getDataLaderboard(): Promise<any> {
    try {
      // Query data from Prisma by joining Profile and User tables
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

      // Process and format the data as needed for the frontend
      const formattedData = profilesWithUser.map((profile) => ({
        img: profile.img,
        xp: profile.xp,
        winsCount: profile.WinsCount,
        loseCount: profile.LoseCount,
        Achivements: profile.Achivements,
        nickname: profile.user?.nickname || 'DefaultNickname', // Assuming nickname exists
      }));

      formattedData.sort((a, b) => b.xp - a.xp);
      return formattedData;
      // Send the formatted data as a JSON response to the frontend
      
    } catch (error) {
      // Handle errors and send an error response
      throw new Error('Failed to fetch profile data');
      }
  }
  async getProfileSearch(nickname: string): Promise<any> {
    try {
      const profile = await this.prisma.profile.findFirst({
        where: {
          user: {
            nickname: nickname,
          },
        },
      });
      return profile;
    } catch (error) {
      throw new Error(`Failed to retrieve profile data: ${error.message}`);
    }
  }
}




//   async nickname(dto :AuthDto): Promise< any > 
//   {
//     try{
//       const newUser = await this.prisma.user.update({
//         where:{
//           id: dto.id
//         },
//         data : {
//           nickname: dto.nickname,
//         }
//       });
//       console.log(newUser);
//     }
//     catch(err){
//       console.log(err);
//     }
//   }
// }
// auth.service.ts














