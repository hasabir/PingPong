import React from "react";



export function LeaveGame({ data, socket }: any)
{

	const handleLeaveGame = () =>{
		const userConfirmed = window.confirm("Are you sure you want to leave the game?");
		
		if (userConfirmed) {
			socket.webSocket.emit('LeaveGame', data);
		} 
		
	}
	  

	return <button onClick={handleLeaveGame}>Leave Game</button>
}