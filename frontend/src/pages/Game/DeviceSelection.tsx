import React, { useState } from 'react';

import './Message'

const DeviceSelection = ({ data, socket, user_id }: any) => {
	
	// let user: any;

	// if (data.user1 !== undefined && data.user1.id === user_id)
	// 	user = data.user1;
	// else if (data.user2 !== undefined && data.user2.id === user_id)
	// 	user = data.user2;
	
	const handleSelection = (selectedDevice) => {
		// if (data.user === 1)
		// if (data.user1 !== undefined && data.user1.id === user_id)
		if (data.user1 !== undefined 
			&& data.user1.input_device === undefined 
			&& data.user1.id === user_id)
		{
			data.user1.input_device = selectedDevice;
			data.user1.isWaiting = true;
			console.log('i am user 1');
			// console.log('user 1 has mouse');
		}
		else if (data.user2 !== undefined 
			&& data.user2.input_device === undefined 
			&& data.user2.id === user_id)
			{
				// data.user2.status = true;
				data.user2.input_device = selectedDevice;
				data.user2.isWaiting = true;
				console.log('i am user 2');
		}
		console.log(`Selected Device: ${selectedDevice}`);
		socket.webSocket.emit('InputDevice', data);
	};
  
	return (
	  <div className="ChooseInput">
		<h1>Choose Your Input Device</h1>
		<div>
		  <img
			src={process.env.PUBLIC_URL + "ke.png" }
			alt="Keyboard"
			onClick={() => handleSelection('keyboard')}
			style={{ cursor: 'pointer' }}
			/>
		  <img
			src={process.env.PUBLIC_URL + "flat-click-icon-png-design-5692103.png" }
			alt="Mouse"
			onClick={() => handleSelection('mouse')}
			style={{ cursor: 'pointer' }}
		  />
		</div>
	  </div>
	);
  };
  
  export default DeviceSelection;
  
  