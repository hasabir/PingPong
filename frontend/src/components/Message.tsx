import React from 'react';


// import { JSXElementConstructor, useEffect } from 'react';

// export function Message({ data, socket }: any) {


// 	let JSX : any; 
//   useEffect(() => {
//     if (data.status_user1 && !data.status_user2) {
// 		JSX = <h1><center>Waiting for user 2 to join .....</center></h1>;
// 	} else if (data.status_user2 && !data.user1.status) {
//       console.log(`user status = ${data.user1.status}`);
//       data.user1.status = true;
// 	  	JSX = <h6>Let's play :)</h6>;
//       // Use a setTimeout to make sure the state update occurs after rendering
//       setTimeout(() => {
//         socket.switchNamespace('game');
//       }, 0);
//       console.log(socket);

//       // socket.webSocket.emit('Init', data);
//       // Render logic for "Let's play :)"
//     } else {
// 		JSX = <h2><center>Click join to join the room</center></h2>;
// 	}
//   }, [data.status_user1, data.status_user2, data.user1.status, socket]);

//   return (JSX);
// }





export function Message({ data, socket }: any) {
	if (data.status_user1 && !data.status_user2) {
	  return <h1><center>Waiting for user 2 to join .....</center></h1>;
	}
  
	if (data.status_user2 && !data.user1.status) {
		console.log(`user status = ${data.user1.status}`)
		data.user1.status = true;
		// console.log(socket);
		socket.webSocket.emit('Init', data);
	  return <h6>Let's play :)</h6>;
	}
  
	return <h2><center>Click join to join the room</center></h2>;
}