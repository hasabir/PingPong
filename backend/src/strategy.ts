import { Injectable } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
// import { user as PrismaUser } from '@prisma/client';
// import { PrismaService } from 'src/prisma/prisma.service';
import  Strategy  from "passport-42";
import { user } from '@prisma/client'; // Assuming your Prisma model is named 'User'
// import { info } from "console";
import { UserService } from './auth/user_service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, "42")
{
  constructor(private readonly userService: UserService) {
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
    // Assuming 'user' contains the OAuth data retrieved during authentication
    const newUser = await this.userService.createUserFromOAuth(user);
    // Assuming you want to pass the newly created user back for further handling
    const payload = {
      user: newUser,
      accessToken,
    };
    // Pass the payload to the callback function
    done(null, payload);
    return(payload);
    }
    catch (error) {
    done(error, null);
    }
    }
  }
  