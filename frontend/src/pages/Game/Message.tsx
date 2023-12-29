



import React from "react";
import './Message.css';
import DeviceSelection from "./DeviceSelection";
import { Link } from "react-router-dom";




export function Message({ data, socket, id }: any) {
	
	if(data.gameOver)
	{
		if (data.user1 !== undefined && id == data.user1.id)
			return	(<div className="Animated_gife">
						<h1>You {data.user1.status}</h1>
					</div>)

		if (data.user2 !== undefined && id == data.user2.id)
		return	(<div className="Animated_gife">
					<h1>You {data.user2.status}</h1>
				</div>)
		// console.log(data.user1.status)
	}

	if (data.end)
	{
		console.log('data ended');
		if (data.user1 !== undefined && id == data.user1.id)
		{
			// if (data.user1.status == 'lose')
			// 	return (<div className="Animated_gife">
			// 	<h1>You {data.user1.status}</h1>
			// 	</div>)
			// 	return (<div className="link-container">
			// 			<Link to="/Home"></Link>
			//  			 </div>)
			if (data.user1.status == 'win')
				return	(<div className="Animated_gife">
					<h1>Other User Left The game</h1>
					</div>)
		}
		if (data.user2 !== undefined && id == data.user2.id)
		{
			// if (data.user2.status == 'lose')
			// 	return (<div className="Animated_gife">
			// 				<h1>You {data.user2.status}</h1>
			// 			</div>)
				// return (<div className="link-container">
				// 		<Link to="/Home"></Link>
			 	// 		 </div>)
			if (data.user2.status == 'win')
				return	(<div className="Animated_gife">
					<h1>Other User Left The game</h1>
					</div>)
		}
	}
	
	
	if (data.user1 !== undefined && data.user2 === undefined) {
	//   console.log('i am waiting');
	  return(
				<div className="Animated_gife">
				<img src={process.env.PUBLIC_URL + '/ping.gif'} alt="Animated GIF" />
				</div>
			);
	}
  
	if (data.user2 !== undefined && !data.user1.isWaiting) {
		data.user1.isWaiting = true;
		socket.webSocket.emit('Init', data);
	  return null;
	}
	


	return null;
}


// function UserHasInput(data, id)
// {
// 	if (data.user1 !== undefined 
// 		&& data.user1.input_device === undefined 
// 		&& data.user1.id === id)
// 		return false;
// 	if (data.user2 !== undefined 
// 		&& data.user2.input_device === undefined 
// 		&& data.user2.id === id)
// 		return false;
// 	return true;
// }


// export function Message({ data, socket, id }: any) {
// //   const isUserWaiting = UserIsWaiting(data);

// 	// let user = witchUser(id, data);
	
// 	// let user: any;
// 	// if (!UserHasInput(data, id))
// 	// 	return <DeviceSelection data={data} socket={socket} id={id}/>;
	
// 	// if (data.user1 != undefined && data.user1.isWaiting === true
// 	// 		&& data.user2 != undefined && data.user2.isWaiting === true
// 	// 		&& !data.start)
// 	// 	socket.webSocket.emit('Init', data);
	
// 	// if (!data.start)
// 	// 	return (
// 	// 		<div className="Animated_gife">
// 	// 		<img src={process.env.PUBLIC_URL + '/ping.gif'} alt="Animated GIF" />
// 	// 		</div>
// 	// 	);
// 	// user = data.user1;
// 	// else if (data.user2 !== undefined && data.user2.id === id)
// 	// 	user = data.user2;

// 	// if (user.input_device === undefined)
// 	// if (user.isWaiting === true)
	
// 	return null;
// }


















// import React from "react";
// import './Message.css';
// import DeviceSelection from "./DeviceSelection";

// function UserIsWaiting(data: any)
// {
// 	if ((data.user1 !== undefined && data.user1.input_device !== undefined
// 		&& (data.user2 === undefined
// 		|| (data.user2 !== undefined && data.user2.input_device === undefined))))
// 		return true;

// 	if ((data.user2 !== undefined && data.user2.input_device !== undefined
// 		&& (data.user2 === undefined 
// 		|| (data.user1 !== undefined && data.user1.input_device === undefined))))
// 		return true;
// 	return false;
// }



// export function Message({ data, socket }: any) {
//   const isUserWaiting = UserIsWaiting(data);

//   if (data.status_user1 && data.user1.input_device === undefined) {
//     data.user = 1;
//   } else if (isUserWaiting) {
//     return (
//       <div className="Animated_gife">
//         <img src={process.env.PUBLIC_URL + '/ping.gif'} alt="Animated GIF" />
//       </div>
//     );
//   }

//   if (data.status_user2 && !data.user1.status) {
//     if (data.user2.input_device === undefined) {
//       data.user = 2;
//       return <DeviceSelection data={data} socket={socket} />;
//     } else if (data.user2.status && data.user1.input_device !== undefined) {
//       data.user1.status = true;
//       socket.webSocket.emit('Init', data);
//     }
//     return null;
//   }

//   return null;
// }
