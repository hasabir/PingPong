import { Module } from '@nestjs/common';
import { FortyTwoStrategy } from '../strategy';
import { ApiController, AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Token_Service } from './auth.service';
// import {UserService } from './auth/user_service'';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {PrismaModule } from 'src/auth/prisma/prisma.module';
import { env } from 'process';
import { GameModule } from 'src/game/game.module';
import { UserService } from './user_service';
// import { AuthModule } from './auth.module';
// import { AuthModule } from './auth.module'; // Import the AuthModuauth
@Module({
//   imports: [AuthModule], // Include AuthModule in imports  
  imports: [GameModule,PrismaModule, ConfigModule, JwtModule.register({
    global: true,
    secret: env.secretkey,
    signOptions: { expiresIn: '864000s' },
  })], 
  controllers: [AuthController,ApiController],
  providers: [AuthService,UserService,Token_Service, FortyTwoStrategy],
})
export class AuthModule {}





