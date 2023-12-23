import { Ball, Canvas, Net, Paddle, Room } from '../interfaces/game.interface';
export declare class GameService {
    createNewPaddle(canvas: Canvas, x: number): Paddle;
    createNewCanvas(): Canvas;
    createNewNets(canvas: Canvas): Net;
    createNewBall(canvas: Canvas): Ball;
    initCanvas(room: Room): Room;
    collision(player: any, room: any): boolean;
    reset(data: Room): void;
    game(room: Room): Room;
    paddleCollision(data: any, player: Paddle, direction: number, isKey: boolean): Paddle;
    movePaddles(data: Room, id: string, direction: number): Room;
    computerPlaying(data: any): any;
    GameOver(room: Room, winner: number): Room;
}
