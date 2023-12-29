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
          <div className="nickname-cmp">
            <Header title="Welcome Please login !"/>
            <button className="login-button" onClick={handleLogin}>
              <span className="button-text">42 Login</span>
            </button>
          </div>
    </div>
  );
};

export default Landing;
