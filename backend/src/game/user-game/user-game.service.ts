import { Injectable } from '@nestjs/common';
// import { PrismaService } from '..//prisma/prisma.service';
import { createUserGame } from './createGame.dto';
import { PrismaService } from 'src/auth/prisma/prisma.service';

@Injectable()
export class UserGameService {

    constructor(private prisma: PrismaService) {}

    async getprofileId(userId : number){
        try{
            const profile = await this.prisma.profile.findFirst({
                where:{
                    user:{
                        id: userId,
                    }
                },
                select:{
                    profileId: true,
                }
            });
            return profile.profileId;
        }
        catch(err){
            console.log(err.message);
        }
    }

    async updateUserStatus(userId: number, st: 'online' | 'offline' | 'inGame'){ //!id status inGame
        try {
            const id = await this.getprofileId(userId);

            await this.prisma.profile.update({
                where:{
                    profileId: id,
                },
                data :{
                    status: st,
                }
            })
        }
        catch(err){
            console.log(err.message);
        }
    }

    async check_user_status(userId: number){
        try{
            const user = await this.prisma.user.findUnique({
                where:{
                    id: userId,
                },
                select : {
                    profile:{
                        select:{
                            status: true,
                        }
                    }
                }
            });
            return (user.profile.status);
        }
        catch(err){
            console.log(err.message);
        }
    }

    async createuserGame(id: number, createUserGame: createUserGame){
        try{
            await this.prisma.userGame.create({
                data:{
                    GameId: id,
                    playerId: createUserGame.userId,
                    status: createUserGame.status,
                }
            })
        }
        catch(err){
            console.log(err.message);
        }
    }

    async setData(createUserGame: createUserGame){
        try{
            const game = await this.prisma.game.create({
                data: {
                    startDate : createUserGame.startDate,
                },
                select:{
                    GameId: true,
                }
            });
            const userGame = await this.createuserGame(game.GameId, createUserGame);
            // const usergame2 = await this.createuserGame(game.GameId, createUserGame2);
            // console.log(usergame1);
            console.log(userGame);
        }
        catch(err){
            console.log(err.message);
        }
    }
    
}
