import React,  { useCallback, useEffect, useState } from 'react';
import { useWebSocketContext } from '../contexts/Websocket';

// import sketch from './sketch';
// import p5 from 'p5';
// import SketchComponent from './sketch';
// import P5Sketch from './sketch';
import GameSketch from './sketch';


export interface Room {
	data: any;
	socket: any; 
}//?

function Message({ data, socket }: Room) {
	if (data.status_user1 && !data.status_user2) {
	  return <h1><center>Waiting for user 2 to join .....</center></h1>;
	}
  
	if (data.status_user2 && !data.user1.status) {
		console.log(`user status = ${data.user1.status}`)
		data.user1.status = true;
		socket.webSocket.emit('Init', data);
	  return null;
	//   return <GameSketch data={data}/>;
	}
  
	return <h2><center>Click join to join the room</center></h2>;
  }

type GameData = {
    gameInitialized: boolean;
    // Add other properties as needed
};

// const LazyGameSketch = React.lazy(() => import('./sketch'));

export const Game = () => {

	const [data, setData] = useState<GameData>({
        gameInitialized: false,
        // Initialize other properties if needed
    });

	// const [data, setData] = useState({});
	// const [canvas, setCanvas] = useState<p5 | null>(null);

	// const [canvas, setCanvas] = useState(null);
	const socket = useWebSocketContext();
  
	const handleJoinRoom = () => {
	  socket.webSocket.emit('JoinRoom', data);
	};

	const initGame = useCallback (
		(data : any) => {
			// console.log(`I am ${JSON.stringify(data)}`);
			
			// setCanvas(new p5((p) => sketch(p, data)));
			// canvas = new p5((p) => sketch(p, data));
			// setData(data);
			socket.webSocket.emit('keydown', data);
		}, [socket.webSocket]
	);
	
	// const initGame = (data: any) => {
	// 	// setData(data);
	// 	socket.webSocket.emit('keydown', data);

	// }
	
	// const handlePlayGame = (event : any) => {
	// 	if (event.key === 'p')
	// 	{
	// 		socket.webSocket.emit('keydown', data);
			
	// 	}
	// };
	
	// const handleKeyDown = useCallback(handlePlayGame, [socket, data]);
	
	
	useEffect(() => {
	  socket.webSocket.on('connect', () => {
		console.log('connected !');
	});
	
	socket.webSocket.on('joined', ({ data }) => {
		setData(data);
	});
	
	socket.webSocket.on('initCanvas', (data) => {
		console.log(`from init canvas`);
		// data.init = true;
		setData(data);
		if (!data.gameInitialized) {
		  setData((prevData) => ({
			...prevData,
			gameInitialized: true,
		}));
			initGame(data);
		}
	});


	// window.addEventListener('keydown', handleKeyDown);
	
	return () => {
		socket.webSocket.off('joined');
		socket.webSocket.off('connect');
		socket.webSocket.off('initCanvas');
		// window.removeEventListener('keydown', handleKeyDown);
	};
}, [socket, data, initGame]);

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
  