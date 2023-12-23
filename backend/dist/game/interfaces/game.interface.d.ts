export interface UserData {
    id: string;
    socket_id: string;
    isWaiting: boolean;
    score: number;
    status?: Status;
    paddle?: Paddle;
    input_device?: string;
}
export interface Room {
    name: string;
    user1?: UserData;
    user2?: UserData;
    start?: boolean;
    end: boolean;
    canvas?: Canvas;
    ball?: Ball;
    net?: Net;
    gameOver: boolean;
}
export declare enum Status {
    Win = "win",
    Lose = "lose"
}
export declare enum State {
    WAITING = 0,
    SETTING_UP = 1
}
export interface Canvas {
    width: number;
    height: number;
    x: number;
    y: number;
}
export interface Paddle {
    width: number;
    height: number;
    strock_width: number;
    color: number[];
    score: number;
    x: number;
    y: number;
}
export interface Net {
    width: number;
    height: number;
    x: number;
    y: number;
    color: number[];
}
export interface Ball {
    x: number;
    y: number;
    radius: number;
    speed: number;
    velocityX: number;
    velocityY: number;
    color: number[];
}
