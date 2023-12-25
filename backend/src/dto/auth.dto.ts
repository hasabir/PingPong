import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthDto {
  
  @IsNotEmpty()
  @IsString()
  nickname: string;
  
  @IsNotEmpty()
  @IsString()
  avatar: string;
  
  @IsString()
  jwt: string;
  // @IsNumber()
  // id: number;
}