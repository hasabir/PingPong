import { useContext, useEffect, useState } from 'react';
import { useWebSocketContext } from '../contexts/Websocket';

// import sketch from './sketch';
// import p5 from 'p5';

function Message({data}: {data :any})
{
	if (data.status)
		return <h1><center>You joined the room</center></h1>
	return <h2><center>click join to join the room</center></h2>
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
		// const updatedData = { value: 'test' };
		// setData(updatedData);
		socket.webSocket.emit('JoinRoom', data);
	}

	return(
		<div>
			<center>
			<h1>GAME</h1>
      		<button onClick={handleJoinRoom}>Join Room</button>
			
			<Message data={data}/>
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