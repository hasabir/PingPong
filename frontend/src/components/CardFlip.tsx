import React, { useState } from 'react';
import './CardFlip.css';
import Header from './header';
import { Link } from 'react-router-dom';

const CardFlip = ({ title, description1, description2, imageSrc , linkto }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleCardFlip}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <Header title={title} description={description1} />
          <img src={process.env.PUBLIC_URL + `/${imageSrc}`} alt="Avatar" />
        </div>
        <div className="flip-card-back">
          <label className='description_game'> {description2}</label>
          <Link to={linkto}><button className="Play_button">Play</button></Link>
          
        </div>
      </div>
    </div>
  );
};

export default CardFlip;
