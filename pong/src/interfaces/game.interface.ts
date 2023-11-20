export interface Data {
	id : string;
	status: boolean;
}

export interface Room{
	name: string;
	user1?: Data;
	user2?: Data;
	status_user1: boolean;
	status_user2: boolean;
	canvas?: Canvas;
	paddle_1?: Paddle;
	paddle_2?: Paddle;
	net?: Net;
	ball?: Ball;
}


export interface Canvas{
	width: number;
	height: number;
	color?: number[] | undefined;
	stroke_width?: number;
}

export interface Paddle{
	width : number;
	height : number;
	strock_width : number;
	color : number[];
	score: number;
	x :  number;
	y :  number;
}

export interface Net{
	width: number;
	height: number;
	x: number;
	y: number;
	color: number[];
}

export interface Ball{
	x : number,
	y : number,
	radius :number , 
	speed : number,
	velocityX :number,
	velocityY :number,
	color: number[],
}