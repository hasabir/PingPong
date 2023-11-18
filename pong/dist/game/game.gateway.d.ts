import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { GameLogicService } from './game-logic.service';
export declare class GameGateway implements OnModuleInit {
    private gameService;
    private gameLogicService;
    constructor(gameService: GameService, gameLogicService: GameLogicService);
    server: Server;
    private logger;
    socketId: string;
    onModuleInit(): void;
    afterInit(server: Server): void;
    handleJoinRoom(socket: Socket, data: any): void;
    initGame(socket: Socket, data: any): void;
}
