import React from 'react';
import './Landing.css';

const Landing = () => {

  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/42';
  };

  return (
    <div className='background'>
      <div className="logo-container">
        <img className="logo_image" src={require('../../images/logo.png')} alt="ping_pong_logo" />
        <button className="login-button" onClick={handleLogin}>
          <span className="button-text">42 Login</span>
        </button>
      </div>
      <img className="shadow-logo" src={require('../../images/shadow.png')} alt="_shadow" />
    </div>
  );
};

export default Landing;
