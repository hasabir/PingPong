import React from 'react';

import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { createContext, useContext, useState } from "react";

export interface IWebSocketContext {
	webSocket: Socket<DefaultEventsMap, DefaultEventsMap>;
	setWebSocket: React.Dispatch<React.SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap>>>;
}

const socket = io("http://192.168.1.24:3001/game", {
	// const socket = io("https://shiny-barnacle-wqr75p9pqgxf7q4-3001.app.github.dev/game", {
	transports: ['websocket'], //! Force the use of WebSocket
});

//create context
const WebSocketContext = createContext<IWebSocketContext | undefined>(undefined);

//use context0
function useWebSocketContext() {

	const context = useContext(WebSocketContext)

	if (context === undefined) {
		throw new Error("context not defined");
	}

	return (context)
}

function WebSocketContextProvider({ children }: { children: any }) {
	const [webSocket, setWebSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>(socket);

	const contextValue: IWebSocketContext = {
		webSocket,
		setWebSocket
	}

	return (
		<WebSocketContext.Provider value={contextValue}>
			{children}
		</WebSocketContext.Provider>
	);
};

export {
	useWebSocketContext,
	WebSocketContextProvider
}



