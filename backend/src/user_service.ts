//   import { Injectable } from '@nestjs/common';
// import { PrismaService } from './prisma/prisma.service'; // Assuming your Prisma service is named PrismaService

// @Injectable()
// export class UserService {
//   constructor(private readonly prisma: PrismaService) {}

//   async createUserFromOAuth(user: any): Promise<any> {
//     const { id, name, login, image } = user;

//     // Extract relevant data from the OAuth user object
//     const prismaUser = {
//       id: id || 0, // Assuming id is present in the user object
//       FirstName: name?.givenName || '', // Extract givenName as FirstName
//       LastName: name?.familyName || '', // Extract familyName as LastName
//       nickname: name?.nickname || '',
//       login: login || '', // Extract login
//       photo: image?.link || '', // Extract photo link from the image object
//     };

//     try {
//       // Create a new user in the database using Prisma
//       const newUser = await this.prisma.user.create({
//         data: prismaUser,
//       });

//       return newUser; // Return the newly created user
//     } catch (error) {
//       throw new Error(`Failed to create user: ${error.message}`);
//     }
//   }
// }