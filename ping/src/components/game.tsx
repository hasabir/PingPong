import React,  { useCallback, useEffect, useState } from 'react';
import { useWebSocketContext } from '../contexts/Websocket';

import GameSketch from './sketch';
import { Message } from './Message';



export const Game = () => {

	const [data, setData] = useState({});
	const socket = useWebSocketContext();
  
	const handleJoinRoom = () => {
	  socket.webSocket.emit('JoinRoom', data);
	};

	const initGame = useCallback (
		(data : any) => {
			socket.webSocket.emit('Init', data);
		}, [socket.webSocket]
	);
	
	const handlePlayGame = (event : any) => {
		if (event.key === 'p')
		{
			socket.webSocket.emit('keydown', data);
			
		}
	};
	
	const handleKeyDown = useCallback(handlePlayGame, [socket, data]);
	
	
	useEffect(() => {
		socket.webSocket.on('connect', () => {
			console.log('connected !');
		});
		
		socket.webSocket.on('joined', ({ data }) => {
			setData(data);

		});
		
		// socket.webSocket.on('Play', (data) => {
		// 	console.log("data = ", data);
		// 	// setData(data);	
		// });

		socket.webSocket.on('initCanvas', (data) => {
			console.log(`from init canvas`);

			if (!data.init)
				data.init = true;	
			setData(data);
			initGame(data);
		});

		window.addEventListener('keydown', handleKeyDown);
	
	return () => {
		socket.webSocket.off('Play');
		socket.webSocket.off('joined');
		socket.webSocket.off('connect');
		socket.webSocket.off('initCanvas');
		window.removeEventListener('keydown', handleKeyDown);

	};
}, [socket, data, initGame, handleKeyDown]);

return (
	<div>
		<center>
			<h1>GAME</h1>
			<button onClick={handleJoinRoom}>Join Room</button>
			<Message data={data} socket={socket}/> 
			<GameSketch data={data} socket={socket}/>
		</center>
	</div>
);
};
  