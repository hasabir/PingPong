
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
import { PrismaClient } from '@prisma/client';
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

  async getprofileData(userId: number) {
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
      // Query data from Prisma by joining profile and User tables
      const profilesWithUser = await this.prisma.profile.findMany({
        select: {
          img: true,
          xp: true,
          WinsCount: true,
          LoseCount: true,
          // Achivements: true,
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
        // Achivements: profile.Achivements,
        // nickname: profile.user?.nickname || 'DefaultNickname', // Assuming nickname exists
      }));

      formattedData.sort((a, b) => b.xp - a.xp);
      return formattedData;
      // Send the formatted data as a JSON response to the frontend
      
    } catch (error) {
      // Handle errors and send an error response
      throw new Error('Failed to fetch profile data');
      }
  }
  async getprofileSearch(nickname: string): Promise<any> {
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


// @Injectable()
// export class DatabaseInitializationService {
//   private readonly prisma: PrismaClient;

//   constructor() {
//     this.prisma = new PrismaClient();
//   }

//   async initializeDescription(): Promise<void> {
//     try {
//       await this.prisma.description.create({
//         data: {
//           description: 'Congratulations! You have won your first game.',
//           descriptionAchiv: 'win_first_game',
//         },
//       });

//       await this.prisma.description.create({
//         data: {
//           description: 'Oh! Congratulations! You have won three successive matches!',
//           descriptionAchiv: 'win_three_successive_matchs',
//         },
//       });

//       await this.prisma.description.create({
//         data: {
//           description: 'Congratulations! You have reached 500 in your XP!',
//           descriptionAchiv: 'reach_500_xp',
//         },
//       });

//       await this.prisma.achivName.create({
//         data: {
//           name :  'ping pong junior',
//           achivName: 'ping_pong_junior',
//         },
//       });
  
//       await this.prisma.achivName.create({
//         data: {
//           name : 'ping pong senior',
//           achivName: 'ping_pong_senior',
//         },
//       });
  
//       await this.prisma.achivName.create({
//         data: {
//           name : 'ping pong master',
//           achivName: 'ping_pong_master',
//         },
//       });
  

//       console.log('Description inserted successfully!');
//     } catch (error) {
//       console.error('Failed to insert description :', error);
//     } finally {
//       await this.prisma.$disconnect();
//     }
//   }
// }



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



























// import { Request } from 'express'; // Import Request type from Express
// import { Injectable } from '@nestjs/common';
// // import { user as PrismaUser } from '@prisma/client';
// import { PrismaService } from './prisma/prisma.service';
// import { AuthDto } from '../dto';
// // import { tockens} from 'src/types';
// import { env } from 'process';
// import { JwtService } from '@nestjs/jwt';
// import { user } from '@prisma/client';
// import { use } from 'passport';
// // import { JwtPayload } from '@nestjs/jwt';
// // import { ConfigService } from '@nestjs/config';
// // import { PrismaClient } from '@prisma/client';
// // import { id } from 'date-fns/locale'; // Update the path accordingly


// @Injectable()
// export class UserService {
//   constructor(private readonly prisma: PrismaService) {}

//   async createUserFromOAuth(user: any): Promise<any> {
//     try {
//       const existingUser = await this.prisma.user.findUnique({
//         where: {
//           login: user._json.login || '', // Use the login from the incoming user data
//         },
//       });

//       if (!existingUser)
//       { 
//         const {name, login, avatar } = user;
//         // console.log("------------------>", user);
        
//         // Extract relevant data from the OAuth user object
//         const prismaUser = {
//           // id: id || 0, // Assuming id is present in the user object
//           FirstName: name?.givenName || '', // Extract givenName as FirstName
//           LastName: name?.familyName || '', // Extract familyName as LastName
//           // nickname: name?.nickname ||'',
//           nickname: '',
//           // avatar: '',
//           firstLogin: false,
//           login:  user._json.login|| '', // Extract login
//           avatar: user._json.image.link|| '', // Extract photo link from the image object
//         };
        
//         // Create a new user in the database using Prisma
//         const newUser = await this.prisma.user.create({
//           data: prismaUser,
//         });
//         console.log("++++++++++++++++++++++++++", newUser);
//         await this.createprofile(newUser.id);
//         await this.assignAvatarToprofile(newUser.id, prismaUser.avatar)        
//         // console.log('New User:', newUser);
        
//         return newUser; // Return the newly created user
//       }else {
//         // console.log('User already exists:', existingUser);
//         return existingUser;         // throw new Error('User with this login already exists.');
//       }
//     } catch (error) {
//       throw new Error(`Failed to create user: ${error.message}`);
//     }
//   }

//   async createprofile(userId: number) {
//     try {
//       // Create a new profile
//       const newprofile = await this.prisma.profile.create({
//         data: {
//           img: '',
//           WinsCount: 0,
//           LoseCount: 0,
//           rank: 0,
//           points: 0,
//           profileCreator: userId, // Replace with the appropriate user ID
//         },
//       });
//       console.log("+++++++++++++++++++++> ", newprofile);
      
//       console.log('Created profile:', newprofile);
//     } catch (error) {
//       console.error('Error creating profile:', error);
//     } finally {
//       await this.prisma.$disconnect(); // Disconnect Prisma Client
//     }
//   }

//   async assignAvatarToprofile(userId: number, avatarLink: string): Promise<any> {
//     try {
//       const user = await this.prisma.user.findUnique({
//         where: { id: userId },
//         include: { profile: true },
//       });

//       if (!user) {
//         throw new Error('User not found');
//       }

//       if (!user.profile) {
//         throw new Error('User profile not found');
//       }

//       const updatedprofile = await this.prisma.profile.update({
//         where: { profileId: user.profile.profileId },
//         data: { img: avatarLink }, // Use the passed avatar link here
//       });
//       console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ", updatedprofile);
//       return updatedprofile;
//     } catch (error) {
//       throw new Error(`Failed to assign avatar to profile: ${error.message}`);
//     }
//   }

//   async getAllUsers(): Promise<user[]> {
//     return await this.prisma.getAllUsers();
//   } 
  
//   async getUserById(id: number): Promise<any> {
//     try {
//       return await this.prisma.getUserById(id);
//     } catch (error) {
//       throw new Error(`Failed to retrieve user: ${error.message}`);
//     }
//   }

//   async updateUser(id: number, userData: any): Promise<user> {
//     try {
//       return await this.prisma.updateUser(id, userData);
//     } catch (error) {
//       throw new Error(`Failed to update user: ${error.message}`);
//     }
//   }

//   async deleteUser(id: number): Promise<user> {
//     try {
//       return await this.prisma.deleteUser(id);
//     } catch (error) {
//       throw new Error(`Failed to delete user: ${error.message}`);
//     }
//   }
// }

// @Injectable()
// export class Token_Service {
//   constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

//   async get_Token(user: any): Promise<string> {
//     try {
//       // const create_User = await this.userService.createUserFromOAuth(user);
//       // const { accessToken } = user; // Assuming the accessToken is available in createdUser object
//       // console.log("haaaaaaaaaaaaaaaadi 2 ", user);

//       // Generate JWT token using the accessToken
//       const jwt_Token = await this.jwtService.signAsync(user);
//       // user.firstLogin = true;
//       // const jwt_Token = await this.jwtService.signAsync({ accessToken });
//       // console.log("haaaaaaaaaaaaaaaadi 111 ",jwt_Token);
//       return jwt_Token;
//     } catch (error) {
//       throw new Error(`Failed to generate token: ${error.message}`);
//     }
//   }
// }

// @Injectable()
// export class AuthService {
//   constructor(private prisma: PrismaService,
//     private jwtService:JwtService) {}
  
//   async nickname(dto: AuthDto): Promise<any> {
//     try {
      
//       // Example: Check if the received data is valid
//       if (!dto.nickname || !dto.jwt) {
//         throw new Error('Invalid data received');
//       }
//       const payload = await this.jwtService.verifyAsync(dto.jwt, { secret: env.secretkey });

//       const { user } = payload;

      
//       // Example: Perform an update in the database using Prisma or other ORM
//       const updatedUser = await this.prisma.user.update({
//         where: { id: user.id },
//         data: { nickname: dto.nickname },
//       });
      
//       console.log("Updated User: ", updatedUser);
//       return updatedUser;
//     } catch (error) {
//       throw new Error(`Failed to update nickname: ${error.message}`);
//     }
//   }
  
//   async avatar(dto: AuthDto): Promise<any> {
//     try {
//       // Example: Check if the received data is valid
//       if (!dto.avatar || !dto.jwt) {
//         throw new Error('Invalid data received');
//       }
//       const payload = await this.jwtService.verifyAsync(dto.jwt, { secret: env.secretkey });

//       const { user } = payload;
      
//       // Example: Perform an update in the database using Prisma or other ORM
//       const updatedUser = await this.prisma.user.update({
//         where: { id: user.id },
//         data: { avatar: dto.avatar },
//       });
//       return updatedUser;
//     } catch (error) {
//       throw new Error(`Failed to update avatar: ${error.message}`);
//     }
//   }
// }





// //   async nickname(dto :AuthDto): Promise< any > 
// //   {
// //     try{
// //       const newUser = await this.prisma.user.update({
// //         where:{
// //           id: dto.id
// //         },
// //         data : {
// //           nickname: dto.nickname,
// //         }
// //       });
// //       console.log(newUser);
// //     }
// //     catch(err){
// //       console.log(err);
// //     }
// //   }
// // }
// // auth.service.ts














