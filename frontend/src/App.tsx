// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from './pages/Settings/Settings';
import Hdr from './components/Sidebar/Header';
import Home from './pages/Home/Home';
import Welcome from './pages/InformationsPage/Welcome';
import NotFoundComponent from './components/notFound';
import Authentification from './pages/Settings/Authentification/Authentification';
import Landing from './pages/Landing/Landing';
import LeaderBord from './pages/LeaderBord/LeaderBord';
import Game from './pages/Game/Game';
import ChangeNickname from './pages/InformationsPage/Welcome';



const App = () => {
	return (
			<Router>
				<Routes>


					<Route
						path="/welcome"
						element={
							<>
								<Hdr isWelcomePage={true} />
								<ChangeNickname />
								{/* <Welcome /> */}
							</>
						}
					/>


					<Route
						path="/settings"
						element={
							<>
								<Hdr isWelcomePage={false} />
								<Settings />
							</>
						}
					/>


					<Route
						path="/auth"
						element={
							<>
								<Hdr isWelcomePage={false} />
								<Authentification />
							</>
						}
					/>

					<Route
						path="/leaderboard"
						element={
							<>
								<Hdr isWelcomePage={false} />
								<LeaderBord />
							</>
						}
					/>


					<Route
						path="/home"
						element={
							<>
								<Hdr isWelcomePage={false} />
								<Home />
								{/* </WebSocketContextProvider> */}

							</>
						}
					/>

					<Route
						path="/game"
						element={
							<>
								<Hdr isWelcomePage={true} />
							
								<Game />
							</>
						}
					/>

					<Route
						path="/"
						element={
							<>
								{/* <Hdr isWelcomePage={false} /> */}
								<Landing />
							</>
						}
					/>


					<Route path="/*" element={<NotFoundComponent />} />
				</Routes>
			</Router>
	);
};

export default App;
