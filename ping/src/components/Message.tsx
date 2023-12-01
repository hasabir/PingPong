

export function Message({ data, socket }: any) {
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