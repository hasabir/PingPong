import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WebSocketContextProvider } from './contexts/Websocket';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
//   <React.StrictMode>
	<WebSocketContextProvider>
	<App />
	</WebSocketContextProvider>
 //   </React.StrictMode>
);
