export interface UserData {
	id : number; //! need to be converted to int
	socket_id: string; //! not sure if i need it anymore
	isWaiting: boolean;
	score: number;
	status?: Status;
	paddle?: Paddle;
	input_device?: string;
}


export interface Room{
	name: string;
	user1?: UserData;
	user2?: UserData;
	start?: boolean;//? initialize it with false?
	end: boolean;
	canvas?: Canvas;
	ball?: Ball;
	net?: Net;
	gameOver: boolean;
}

export enum Status {
	Win = 'win',
	Lose = 'lose',
}

export enum State {
	WAITING,
	SETTING_UP
}



// export interface SharedData {
// }



export interface Canvas{
	width: number;
	height: number;
	x: number;
	y: number;
}

export interface Paddle{
	width : number;
	height : number;
	strock_width : number;
	color : number[];
	score: number;
	x :  number;
	y :  number;
	// mouseX? : number;
	// mouseY? : number;

	// overBox : boolean;
	// locked : boolean;
	// xOffset = 0.0;
	// yOffset = number;
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