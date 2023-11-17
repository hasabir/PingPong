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
}


