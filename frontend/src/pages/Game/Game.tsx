import React,  { useCallback, useEffect, useState } from 'react';
import { IWebSocketContext, useWebSocketContext } from '../../contexts/Websocket';
import GameSketch from './sketch';
import { Message } from './Message';
import { LeaveGame } from './LeaveGame';
import { useLocation, useParams } from 'react-router-dom';
import DeviceSelection from './DeviceSelection';

let startGame = 0;
let stock:  string | null = null;
const Game = () => {

	const [data, setData] = useState({});
	const socket = useWebSocketContext();
	
	const { search } = useLocation();
	const params = new URLSearchParams(search);
	let gameTheme = params.get('gameTheme');
	let user_id = params.get('user_id');


	
	if (gameTheme === 'Solo' && gameTheme != stock)
	{
		console.log('i am solo');
		stock = gameTheme;
		socket.webSocket.emit('PlaySolo', user_id);
	}
	if (gameTheme === 'Room' && gameTheme != stock)
    {
		console.log('i am room');
		stock = gameTheme;
		socket.webSocket.emit('JoinRoom', user_id);
	}
	
	useEffect(() => {
		socket.webSocket.on('connect', () => {
			console.log('connected !');
		});
		
		socket.webSocket.on('joined', ({ data }) => {			
			setData(data);
			console.log(data);
		});
		
		socket.webSocket.on('initCanvas', (data) => {
			if (!data.start)
				data.start = true;	
			setData(data);
		});
		
		socket.webSocket.on('Play', (ball) => {
			setData(prevData => ({
				...prevData,
				ball: ball
			  }));	
		});


		socket.webSocket.on('mv', (data) =>{
			setData(data);
		});

		// socket.webSocket.on('mvComputerPaddle', (user2) => {
		// 	setData(prevData => ({
		// 		...prevData,
		// 		user2: user2
		// 	  }));	
		// });

		socket.webSocket.on('UpScore_user1', (user1) => {
			setData(prevData => ({
				...prevData,
				user1: user1
			  }));	
		});

		socket.webSocket.on('UpScore_user2', (user2) => {
			setData(prevData => ({
				...prevData,
				user2: user2
			  }));	
		});

		// socket.webSocket.on('upScore', (paddle_1) =>{
		// 	setData(prevData =>({
		// 		...prevData,
		// 		paddle_1: paddle_1
		// 	  }));
		// } );

		socket.webSocket.on('setWayToPlay', (data) => {
			setData(data);
		});


		// socket.webSocket.on('deleted', (data) => {
		// 	setData(data);
		// });


		socket.webSocket.on('StopPlaying', (data) => {
			setData(data);
			socket.webSocket.disconnect();
		});
	
	return () => {
		socket.webSocket.off('joined');
		// socket.webSocket.off('upScore');
		socket.webSocket.off('connect');
		socket.webSocket.off('initCanvas');
		socket.webSocket.off('setWayToPlay');
		socket.webSocket.off('Play');
		// socket.webSocket.off('mv');
	};
}, [socket, data]);

return (
	<div>
		<div >
			{/* <DeviceSelection /> */}
			<Message data={data} socket={socket} user_id={user_id}/>
		</div>
		<center>
			<GameSketch data={data} socket={socket} user_id={user_id}/>
		</center>
	</div>
);
};


export default Game;