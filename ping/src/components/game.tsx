import React,  { useCallback, useEffect, useState } from 'react';
import { useWebSocketContext } from '../contexts/Websocket';

import GameSketch from './sketch';


function Message({ data, socket }: any) {
	if (data.status_user1 && !data.status_user2) {
	  return <h1><center>Waiting for user 2 to join .....</center></h1>;
	}
  
	if (data.status_user2 && !data.user1.status) {
		console.log(`user status = ${data.user1.status}`)
		data.user1.status = true;
		socket.webSocket.emit('Init', data);
	  return null;
	}
  
	return <h2><center>Click join to join the room</center></h2>;
  }

type GameData = {
    gameInitialized: boolean;
};

export const Game = () => {

	const [data, setData] = useState<GameData>({
        gameInitialized: false,
    });

	const socket = useWebSocketContext();
  
	const handleJoinRoom = () => {
	  socket.webSocket.emit('JoinRoom', data);
	};

	const initGame = useCallback (
		(data : any) => {
			socket.webSocket.emit('play', data);
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
			setData(data);
			if (!data.gameInitialized) {
			setData((prevData) => ({
				...prevData,
				gameInitialized: true,
			}));
				initGame(data);
			}
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
			{!data.gameInitialized ? (
				<div>
					<button onClick={handleJoinRoom}>Join Room</button>
					<Message data={data} socket={socket}/> 
				</div>
			) : (
				<div>
					<GameSketch data={data} socket={socket}/>
				</div>
			)}
		</center>
	</div>
);
  };
  
//   const initGame = useCallback (
// 	(data : any) => {
// 		console.log(`I am ${JSON.stringify(data)}`);
// 		canvas = new p5((p) => sketch(p, data));
// 		setData(data);
// 	}, [data, canvas]
// );



	// socket.webSocket.on('Play', (data) => {
	// 	// canvas;
	// });
  