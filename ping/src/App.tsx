import React from 'react';
import './App.css';
import { WebSocketContextProvider } from './contexts/Websocket';
import { Game } from './components/game';

function App() {
  return (
      <WebSocketContextProvider>
        <Game />
      </WebSocketContextProvider>
  );
}

export default App;
