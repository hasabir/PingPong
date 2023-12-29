import React, { useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import CardFlip from '../../components/CardFlip';
// import { stdout } from 'process';
// import Cookies from 'universal-cookie';

const Home = () => {

  // const extractTokenFromCookies = () => {
  //   const cookies = new Cookies();
  //   const token = cookies.get('jwt');
  //   return token;
  // };

  // useEffect(() => {
  //   const token = extractTokenFromCookies(); // Extract the token when the component mounts
  //   console.log('JWT Token:', token);
  //   // You can use the token here for further operations, such as sending it in requests to the backend
  // }, []);


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
        <div className='left_paper'> 
            <h1>Versus Vibes</h1>
            <p>1 vs 1 Duel</p>
            <Link to="/Game?gameTheme=Room&nickname=">
                <img src={process.env.PUBLIC_URL + '/vs.png'} alt="Versus Vibes" />
            </Link>
        </div>
        <div className='middle_paper'> 
          <h1>AI Showdown</h1>
          <p>1 vs Robot</p>
          <Link to="/Game?gameTheme=Solo&nickname=">
            <img src={process.env.PUBLIC_URL + '/bot.png'} alt="AI Vibes"/>
          </Link>
      </div>
        <div className='right_paper'> 
          {/* <CardFlip title="Random Vibes" description1="Randomized Chaos" description2="Dive into the unpredictable world of Random mode. Expect the unexpected, adapt on the fly, and enjoy the chaotic fun of ping pong with a twist" imageSrc="dice.png" linkto="/Game?gameTheme=Solo" />  */}
          <h1>Random Vibes</h1>
          <p>Randomized Chaos</p>
          <Link to="/Game?gameTheme=Solo">
            <img src={process.env.PUBLIC_URL + '/dice.gif'} alt="Random Vibes"/>
          </Link>
        </div>
    </>
  );
};

export default Home;
