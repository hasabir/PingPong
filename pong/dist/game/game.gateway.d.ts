import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
export declare class GameGateway implements OnModuleInit {
    private gameService;
    constructor(gameService: GameService);
    server: Server;
    private logger;
    socketId: string;
    onModuleInit(): void;
    afterInit(server: Server): void;
    handleJoinRoom(socket: Socket, data: any): void;
}
