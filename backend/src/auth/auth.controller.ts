// import jwt from 'jsonwebtoken';
import { Body, Controller, Get,Post,  Req, Res, UseGuards, HttpException, HttpStatus, Param} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Token_Service } from './auth.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthDto } from 'src/dto';
// import { Request } from 'express';
import { Response, Request } from 'express'; 
import { Auth_Guard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
// import { AuthDto } from '../dto';
// import { tockens } from 'src/types';
// import { env } from 'process';

@Controller('auth')
export class AuthController {

  // private authService: AuthService,
  //     private readonly jwtService: JwtService,
  constructor(private readonly Token_Service: Token_Service,
    private authService: AuthService,
    private prisma: PrismaService,
    ) {}

  // @Post('nickname')
  // nickname(@Body() dto :AuthDto): Promise< any > 
  // {
  //   return this.authService.nickname(dto);
  // }
  @Post(':action')
  @UseGuards(Auth_Guard)
  async handleUserAction(@Param('action') action: string, @Req() req: Request): Promise<any> {
    try {
      const dto: AuthDto = {
        nickname: req.cookies.nickname || 'default_nickname_value',
        avatar: req.cookies.avatar || 'default_avatar_value',
       jwt: req.cookies.jwt
      };
      
      if (action === 'nickname') {
        // Perform action related to the nickname
        return this.authService.nickname(dto);
      } else if (action === 'avatar') {
        // Perform action related to the avatar
        return this.authService.avatar(dto);
      } else {
        throw new HttpException('Invalid action', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw new HttpException('Failed to perform action', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Get('42')
  @UseGuards(AuthGuard('42'))
  async auth42() {
    // The actual authentication is handled by the passport-42 strategy
    // This method will not be reached if authentication fails
  }

  @Get('42/callback')
  @UseGuards(AuthGuard('42')) 
  // @UseGuards(Auth_Guard)
  async auth42Callback(@Req() req, @Res() res) {
    // Successful authentication, redirect home.
    //here generate the jwt token and send it in a query to the front so aya can store it
      // Generate JWT token using the access token

      try {
        const payload = req.user; 
        if (!payload) {
          throw new Error('User data not found');
        }
        const { user } = payload;
        // console.log("!!!!!!!!!!!!!!!!!!!11 ", payload);
      // if(!user.firstLogin)
      // {

        // Generate JWT token using TokenService
        const jwtToken = await this.Token_Service.get_Token(payload);
            
        console.log("++++++++++++++++++++++++> ", jwtToken);
        res.cookie('jwt', jwtToken, { httpOnly: true, secure: true }); // Add options as needed
        res.redirect(`http://localhost:3005/welcome`);
        // });
      // }

    } catch (error) {
      // Handle errors appropriately
      res.status(500).send('Error generating token');
      }
  }

  
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
  //here add a /me
}

@Controller('api')
export class ApiController {
  
  
  // private authService: AuthService,
  constructor(private readonly Token_Service: Token_Service,
    private authService: AuthService,
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
    ) {}

    // @Get('profile')
    @Get(':action(profile|search|nickname|laderboard)')
    @UseGuards(Auth_Guard)
    async getData(@Req() req: Request, @Res() res: Response, @Param('action') action: string): Promise<any> {
      try {
        const dto: AuthDto = {
          nickname: req.cookies.nickname || 'default_nickname_value',
          avatar: req.cookies.avatar || 'default_avatar_value',
          jwt: req.cookies.jwt
        };
  
        if (!dto.jwt) {
          throw new Error('jwt not found in cookies');
        }
  
        const payload = this.jwtService.decode(dto.jwt);
        const { user } = payload;
  
        let resultData;
  
        if (action === 'profile'){
          // const profile = await this.authService.getProfileData(parseInt(user.id, 10));
          // resultData = profile;
          resultData = await this.authService.getProfileData(parseInt(user.id, 10));
        } else if (action === 'nickname') {
          const userRecord = await this.prisma.user.findUnique({ where: { id: parseInt(user.id, 10) } }); // Replace with your user fetching logic
          const nickname = userRecord?.nickname || 'DefaultNickname'; // Assuming nickname exists in the user object
          resultData = { nickname };}
        else if(action === 'laderboard')
        {      
          // try{
          // await this.prisma.profile.update({
          //  where:{
          //    profileId: 1
          //  },
          //  data : {
          //    xp: 100,
          //  }
          //   });

          //   await this.prisma.profile.update({
          //     where:{
          //       profileId: 2
          //     },
          //     data : {
          //       xp: 500,
          //     }
          //   });
          // }
          // catch(err){
          //   console.log(err);
          // }
              
          const laderboardData= await this.authService.getDataLaderboard();
          resultData = laderboardData;  
          resultData =await this.authService.getDataLaderboard();
        }
        else if(action === 'search')
        {
          resultData = await this.authService.getProfileSearch(user.nickname);
        }
        else {
          throw new Error('Invalid data type');
        } 
        res.json(resultData);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }

  }