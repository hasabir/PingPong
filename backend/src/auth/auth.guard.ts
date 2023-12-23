import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { env } from 'process';

@Injectable()
export class Auth_Guard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // console.log("++++++++++++++> {", request);
    // console.log("++++++++++++++> ", request.cookies['jwt']);
    const token = this.extractTokenFromCookies(request);
    // console.log("++++++++++++++> ", token);
    
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, { secret: env.secretkey });
      // console.log("++++++++++++++> ", payload);

      // Assign the decoded payload to the request object
      // This allows you to access the payload in your route handlers
      request['user'] = payload;
    } catch(error) {
      console.error("Token verification error: ", error.message);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    const token = request.cookies['jwt'];
    return token;
  }
}