import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 2);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleNotificationClick = () => {
    console.log('Notification clicked!');
  };

  return (
    <button className={`notification ${isVisible ? 'visible' : 'hidden'}`} onClick={handleNotificationClick}>
      <img src={process.env.PUBLIC_URL + '/notification.svg'} alt="Notification-icon" />
    </button>
  );
};

export default Notification;
