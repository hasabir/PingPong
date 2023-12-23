import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import CardFlip from '../../components/CardFlip';

const Home = (user_id: any) => {

	let id = user_id;

    return (
    <>
        <div className="header_section">
          <img className="Animated_gif" src={process.env.PUBLIC_URL + '/ping.gif'} alt="Animated GIF" />
        </div>
    
        <div className="header_left">
            <label className='top_Players_title'> Top Players</label>
            <div className="player_images">
                    <div className='first_player_info'>
                        {/* <img  src={process.env.PUBLIC_URL + '/aheddak.jpg'} alt="Player_1"/> */}
                        {/* <label> aheddak </label> */}
                    </div>
    
                    <div className='second_player_info'>
                        {/* <img src={process.env.PUBLIC_URL + '/kadjane.jpg'} alt="Player_2"/> */}
                        {/* <label> kadjane </label> */}
                    </div>


                    <div className='last_player_info'>
                        {/* <img  src={process.env.PUBLIC_URL + '/hasabir.jpg'} alt="Player_3"/> */}
                        {/* <label> hasabir</label> */}
                    </div>
            </div>
            <div className="link-container">
              <Link to="/leaderboard " className="link-style"> See LeaderBoard&nbsp;&gt; </Link>
            </div>

        </div>

        <div className="header_right">
        </div>
        <div className='first_sec'> 
          <CardFlip title="Versus Vibes" 
			description1="1 vs 1 Duel" 
			description2="Challenge a friend for an exciting one-on-one ping\
				pong duel. Compete, laugh, and see who emerges as the true paddle\
				champion" 
			imageSrc="avatar1.png"
			linkto={`/Game?gameTheme=Room&user_id=${id.user_id}`} />
        </div>
        <div className='second_sec'> 
          <CardFlip title="AI Showdown"
		  	description1="1 vs Robot" 
			description2="Take on the ultimate ping pong challenge against a \
			formidable robot opponent. Can you outplay \
			the machine and become the ping pong master?" 
			imageSrc="robot3.gif" 
			linkto={`/Game?gameTheme=Solo&user_id=${id.user_id}`} />
        </div>
        <div className='last_sec'> 
          <CardFlip title="Random Vibes" description1="Randomized Chaos" description2="Dive into the unpredictable world of Random mode. Expect the unexpected, adapt on the fly, and enjoy the chaotic fun of ping pong with a twist" imageSrc="random.png" linkto="/Game?gameTheme=Solo" /> 
        </div>
    </>
  );
};

export default Home;
