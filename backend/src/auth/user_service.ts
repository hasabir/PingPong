// import { Injectable } from '@nestjs/common';
// // import { user as PrismaUser } from '@prisma/client';
// import { PrismaService } from './prisma/prisma.service';
// import { AuthDto } from '../dto';
// // import { tockens} from 'src/types';
// import { env } from 'process';
// import { JwtService } from '@nestjs/jwt';


// @Injectable()
// export class UserService {
//   constructor(private readonly prisma: PrismaService) {}

//   async createUserFromOAuth(user: any): Promise<any> {
//     // console.log("//////////////////////////// ", user._json.login);
//     try {
//       const existingUser = await this.prisma.user.findUnique({
//         where:  {
//           login: user._json.login || '',  // Use the login from the incoming user data
//         },
//       });
      
//       if (!existingUser)
//       { 
//         const {name, login, avatar } = user;
        
//         const prismaUser = {
//           FirstName: name?.givenName || '',
//           LastName: name?.familyName || '',
//           login: user._json.login|| '',
//           firstLogin: false,
//           nickname: user._json.login,
//           avatar: user._json.image.link|| '', 
//         };
//         const newUser = await this.prisma.user.create({
//           data: prismaUser,
//         });
//         await this.createprofile(newUser.id);
//         await this.assignAvatarToprofile(newUser.id, prismaUser.avatar)        
        
//         return newUser;
//       }else {
//         return existingUser; 
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
//           xp: 0,
//           // Achivements : '',
//           profileCreator: userId, // Replace with the appropriate user ID
//         },
//       });
   
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
//       return updatedprofile;
//     } catch (error) {
//       throw new Error(`Failed to assign avatar to profile: ${error.message}`);
//     }
//   }

// }



import { Injectable } from '@nestjs/common';
// import { user as PrismaUser } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { AuthDto } from '../dto';
// import { tockens} from 'src/types';
// import { DatabaseInitializatio58yhgnService } from './auth.service';
import { env } from 'process';
import { JwtService } from '@nestjs/jwt';
import { achivements } from '@prisma/client';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService/*,
    private init : DatabaseInitializationService*/,
 /*private profileServices:profileServices*/) {
      // this.profileServices = profileServices;
    }

    async createUserFromOAuth(user: any){
      // console.log("//////////////////////////// ", user._json.login);
      try {
        const existingUser = await this.prisma.user.findUnique({
          where:  {
            login: user._json.login || '',
          },
        });
        
        if (!existingUser)
        { 
          const {name, login, avatar } = user;
          
          const prismaUser = {
            FirstName: name?.givenName || '',
            LastName: name?.familyName || '',
            login: user._json.login|| '',
            firstLogin: false,
            nickname: user._json.login,
            avatar: user._json.image.link|| '', 
          };
          const newUser = await this.prisma.user.create({
            data: prismaUser,
          });
          await this.createprofile(newUser.id);
          // this.profileServices.FirstGameAchievement(profile.profileId);
          await this.assignAvatarToprofile(newUser.id, prismaUser.avatar)        
          
          return newUser;
        }else {
          return existingUser; 
        }
      } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
      }
    }
    // }
    
    async createprofile(userId: number): Promise<any>  {
      try {
      const newprofile = await this.prisma.profile.create({
        data: {
          img: '',
          WinsCount: 0,
          LoseCount: 0,
          rank: 0,
          xp: 0,
          profileCreator: userId,
        },
        });
        return newprofile;
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

@Injectable()
export class profileServices {
  constructor(private readonly prisma: PrismaService) {}
  
  async FirstGameAchievement(ProfileId:number): Promise<any> {
    try {
      const firstGameDescription = await this.prisma.description.create({
        data: {
          description: 'Congratulations! You have won your first game.',
          descriptionAchiv: 'win_first_game',
        },
      });
      
      const pingPongJunior = await this.prisma.achivName.create({
        data: {
          name: 'ping pong junior',
          achivName: 'ping_pong_junior',
        },
      });
      
      // Assuming you have a specific profile to update
      const existingProfileToUpdate = await this.prisma.profile.findUnique({
        where: {
          profileId: ProfileId,
        },
      });

      const achievement = await this.prisma.achivements.create({
        data: {
          description: {
            connect: {
              id: firstGameDescription.id,
            },
          },
          achivName: {
            connect: {
              id: pingPongJunior.id,
            },
          },
          // descriptionId:firstGameDescription.id,
          // achivNameId :pingPongJunior.id
        },
      });
      if (existingProfileToUpdate) {
        const updatedProfile = await this.prisma.profile.update({
          where: {
            profileId: existingProfileToUpdate.profileId,
          },
          data: {
            // WinsCount: 1, // Update the WinsCount field
            achivementId: achievement.achivId// Assign the achievement ID
          },
        });
        console.log("update profile === ", updatedProfile);        
        console.log('Profile updated successfully with achievement!');
      } else {
        console.log('Profile not found.');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  }

  async ThreeSuccessiveAchiev(ProfileId:number): Promise<any> {
    try {
      const threeGameDescription = await this.prisma.description.create({
        data: {
          description: 'Oh! Congratulations! You have won three successive matches!',
          descriptionAchiv: 'win_three_successive_matchs',
        },
      });
      
      const pingPongSenior = await this.prisma.achivName.create({
        data: {
          name: 'ping pong senior',
        achivName: 'ping_pong_senior',
        },
      });
      
      // Assuming you have a specific profile to update
      const existingProfileToUpdate = await this.prisma.profile.findUnique({
        where: {
          profileId: ProfileId,
        },
      });

      const achievement = await this.prisma.achivements.create({
        data: {
          description: {
            connect: {
              id: threeGameDescription.id,
            },
          },
          achivName: {
            connect: {
              id: pingPongSenior.id,
            },
          },
          // descriptionId:firstGameDescription.id,
          // achivNameId :pingPongJunior.id
        },
      });
      if (existingProfileToUpdate) {
        const updatedProfile = await this.prisma.profile.update({
          where: {
            profileId: existingProfileToUpdate.profileId,
          },
          data: {
            // WinsCount: 1, // Update the WinsCount field
            achivementId: achievement.achivId// Assign the achievement ID
          },
        });
        console.log("update profile === ", updatedProfile);        
        console.log('Profile updated successfully with achievement!');
      } else {
        console.log('Profile not found.');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  }

  async XpAchiev(ProfileId:number): Promise<any> {
    try {
      const XpDescription = await this.prisma.description.create({
        data: {
          description: 'Congratulations! You have reached 500 in your XP!',
          descriptionAchiv: 'reach_500_xp',
        },
      });
      
      const pingPongMaster = await this.prisma.achivName.create({
        data: {
          name: 'ping pong master',
          achivName: 'ping_pong_master',
        },
      });
      
      // Assuming you have a specific profile to update
      const existingProfileToUpdate = await this.prisma.profile.findUnique({
        where: {
          profileId: ProfileId,
        },
      });

      const achievement = await this.prisma.achivements.create({
        data: {
          description: {
            connect: {
              id: XpDescription.id,
            },
          },
          achivName: {
            connect: {
              id: pingPongMaster.id,
            },
          },
          // descriptionId:firstGameDescription.id,
          // achivNameId :pingPongJunior.id
        },
      });
      if (existingProfileToUpdate) {
        const updatedProfile = await this.prisma.profile.update({
          where: {
            profileId: existingProfileToUpdate.profileId,
          },
          data: {
            // WinsCount: 1, // Update the WinsCount field
            achivementId: achievement.achivId// Assign the achievement ID
          },
        });
        console.log("update profile === ", updatedProfile);        
        console.log('Profile updated successfully with achievement!');
      } else {
        console.log('Profile not found.');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  }
}
