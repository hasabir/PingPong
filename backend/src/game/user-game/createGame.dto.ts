import { IsNumber, IsString } from "class-validator";

enum GameStatus{
    winner = 'winner',

    looser = 'loser',
}

export class createUserGame{
    @IsNumber()
    userId : number;

    @IsNumber()
    score : number;

    @IsNumber()
    xp: number;

    @IsString()
    startDate: string;

    status : GameStatus;
}