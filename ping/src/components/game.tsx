import { useContext, useEffect, useState } from 'react';
import { useWebSocketContext } from '../contexts/Websocket';

// import sketch from './sketch';
// import p5 from 'p5';


export const Game = () => {

	// const [room, setRoom] = useState('');
	const socket = useWebSocketContext();
	

	// useEffect(() => {
		
	// 	socket.on('connect', () => {
	// 		console.log('connected !');
	// 	});

	// 	// socket.on('joined', (room) => {
	// 	// 	console.log(`I am joined in ${room}`);
	// 	// });
		
	// 	socket.on('joined', () => {
	// 		console.log(`I am joined in`);
	// 	});

	// 	return () => {
	// 		socket.off('joined');
	// 		socket.off('connect');
	// 	};
	// }, [socket])

	useEffect(() => {
		
		// socket.on('joined', (room) => {
		// 	console.log(`I am joined in ${room}`);
		// });
		

		return () => {
			socket.webSocket.off('joined');
			socket.webSocket.off('connect');
		};
	}, [socket])

	socket.webSocket.on('connect', () => {
		console.log('connected !');
	});

	socket.webSocket.on('joined', ({data, socketId}) => {
		console.log(`I am joined in ${data} sicket ID : ${socketId}`);
	});

	let data = 'test';

	const handleJoinRoom = () => {
		socket.webSocket.emit('JoinRoom', data);
		// socket.emit('JoinRoom', room);
	}

	// new p5(sketch);

	return(
		<div>
			<center>
			<h1>GAME</h1>
      		<button onClick={handleJoinRoom}>Join Room</button>
    		{/* <p>{playerJoinedMessage}</p> */}
			</center>
		</div>
	);
}