import { Server, Socket } from 'socket.io';
export declare class GameGateway {
    server: Server;
    private logger;
    socketId: string;
    onModuleInit(): void;
    afterInit(server: Server): void;
    handleJoinRoom(client: Socket, data: string): void;
}
