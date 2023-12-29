import React from 'react';
import Header from '../../components/header';
import './Landing.css';

const Landing = () => {

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/42';
  };

  return (
    <div>
        <img
          className='overlay-image'
          src={process.env.PUBLIC_URL + 'pngtree.jpg'}
          alt='Overlay'
        />
          <div>
            <img className='right_img' src={process.env.PUBLIC_URL + '/avatar1.png'} alt="Avatar 1" />
            <img className='left_img' src={process.env.PUBLIC_URL + '/random.png'} alt="Avatar 1" />
            <button className="login-button" onClick={handleLogin}>
              <span className="button-text">Sign in with intra 42</span>
            </button>
          </div>
    </div>
  );
};

export default Landing;
