import { Injectable } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
// import { user as PrismaUser } from '@prisma/client';
// import { PrismaService } from 'src/prisma/prisma.service';
import  Strategy  from "passport-42";
import { user } from '@prisma/client'; // Assuming your Prisma model is named 'User'
// import { info } from "console";
import {UserService } from './auth/user_service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, "42")
{
  constructor(private readonly userService: UserService ) {
    super({
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "http://localhost:3000/auth/42/callback",
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    user: any, // Adjust the type if needed
    done: (err: any, user: any, info?: any) => void): Promise<any> {
    try {
      // console.log("//////////////////////////// ", user);
    // Assuming 'user' contains the OAuth data retrieved during authentication
    const newUser = await this.userService.createUserFromOAuth(user);
    // Assuming you want to pass the newly created user back for further handling
    const payload = {
      user: newUser,
      accessToken,
    };
    // console.log("********************>", payload);
    // Pass the payload to the callback function
    done(null, payload);
    return(payload);////////!
    }
    catch (error) {
    done(error, null);
    }
    }
  }
    // Assuming 'profile' has the structure provided by Passport-42
    
    
    // console.log("----------------------------------->",accessToken);
    // const { id, name, photo } = user;
    // // Create a 'user' object based on your Prisma model
    // const prismaUser: user = {
    //   id: id || 0, // You may need to adjust this based on your logic
    //   FirstName: name?.givenName || '',
    //   LastName: name?.familyName || '', // Adjust based on your logic or data from the 'profile' object
    //   nickname: name?.nickname || '',
    //   login:  user._json.login|| '',// Adjust based on your logic or data from the 'profile' object
    //   photo: user._json.image.link || [], // Extract photo from 'profile' object
    // };
    // console.log("----------------------------------->",prismaUser);
    // const payload = {
    //   user: prismaUser,
    //   accessToken,
    // };
  //   try {
  //     // Create a new user in the database using Prisma
  //     const newUser = await this.prisma.user.create({
  //       data: prismaUser,
  //     });

  //     return newUser; // Return the newly created user
  //   } catch (error) {    // const payload = {
  //     //   user: prismaUser,
  //     //   accessToken,
  //     // };
  //     throw new Error(`Failed to create user: ${error.message}`);
  //   }

  //   done(null, payload);
  // }
