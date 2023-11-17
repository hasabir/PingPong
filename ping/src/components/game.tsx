import { useEffect, useState } from 'react';
import { useWebSocketContext } from '../contexts/Websocket';

import sketch from './sketch';
import p5 from 'p5';

interface MessageProps {
	data: any;
	socket: any; 
}//?

function Message({ data, socket }: MessageProps) {
	if (data.status_user1 && !data.status_user2) {
	  return <h1><center>Waiting for user 2 to join .....</center></h1>;
	}
  
	if (data.status_user2) {
	  new p5(sketch); 
	  socket.webSocket.emit('Init', data);
	  return null;
	}
  
	return <h2><center>Click join to join the room</center></h2>;
  }


export const Game = () => {
	
	// const [room, setRoom] = useState('');
	const [data, setData] = useState({});
	const socket = useWebSocketContext();
	
	
	useEffect(() => {
		socket.webSocket.on('connect', () => {
			console.log('connected !');
		});
		socket.webSocket.on('joined', ({data}) => {
			console.log(`I am ${JSON.stringify(data)}`);
			setData(data);
		});
		
		return () => {
			socket.webSocket.off('joined');
			socket.webSocket.off('connect');
		};
	}, [socket])
	

	const handleJoinRoom = () => {
		socket.webSocket.emit('JoinRoom', data);
	}

	const initGame = () => {
		// if (data.user)
	}

	return(
		<div>
			<center>
			<h1>GAME</h1>
      		<button onClick={handleJoinRoom}>Join Room</button>
			
			<Message data={data} socket={socket}/>
			</center>
		</div>
	);
}



















// import { useContext, useEffect, useState } from 'react';
// import { useWebSocketContext } from '../contexts/Websocket';

// // import sketch from './sketch';
// // import p5 from 'p5';


// export const Game = () => {

// 	// const [room, setRoom] = useState('');
// 	const [joined, setJoined] = useState(false);
// 	const socket = useWebSocketContext();
	

// 	// useEffect(() => {
		
// 	// 	socket.on('connect', () => {
// 	// 		console.log('connected !');
// 	// 	});

// 	// 	// socket.on('joined', (room) => {
// 	// 	// 	console.log(`I am joined in ${room}`);
// 	// 	// });
		
// 	// 	socket.on('joined', () => {
// 	// 		console.log(`I am joined in`);
// 	// 	});

// 	// 	return () => {
// 	// 		socket.off('joined');
// 	// 		socket.off('connect');
// 	// 	};
// 	// }, [socket])

// 	useEffect(() => {
		
// 		// socket.on('joined', (room) => {
// 		// 	console.log(`I am joined in ${room}`);
// 		// });
		

// 		return () => {
// 			socket.webSocket.off('joined');
// 			socket.webSocket.off('connect');
// 		};
// 	}, [socket])

// 	socket.webSocket.on('connect', () => {
// 		console.log('connected !');
// 	});

// 	socket.webSocket.on('joined', ({data, socketId}) => {
// 		console.log(`I am joined in ${data} sicket ID : ${socketId}`);
// 	});

// 	let data = 'test';

// 	const handleJoinRoom = (e) => {
// 		socket.webSocket.emit('JoinRoom', data);
// 		setJoined(!f)
// 		// socket.emit('JoinRoom', room);
// 	}

// 	// new p5(sketch);

// 	return(
// 		<div>
// 			<center>
// 			<h1>GAME</h1>
//       		<button onClick={handleJoinRoom}>Join Room</button>
//     		{/* <p>{playerJoinedMessage}</p> */}
// 			</center>
// 		</div>
// 	);
// }