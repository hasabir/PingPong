import { Server, Socket } from 'socket.io';
import { GameService } from './game.service';
import { RoomService } from '../room/room.service';
export declare class GameGateway {
    private gameService;
    private roomService;
    constructor(gameService: GameService, roomService: RoomService);
    private logger;
    server: Server;
    initGame(socket: Socket, data: any): void;
    PlaySolo(socket: Socket, nickname: any): void;
    playGame(socket: Socket, data: any): void;
    puddleUp(socket: Socket, data: any): void;
    puddleDown(socket: Socket, data: any): void;
}
