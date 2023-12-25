import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

function Sidebar() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handleIconClick = (iconName: string) => {
    setSelectedIcon(iconName);
  };

  return (
    <div className="sidebar">

      <div className='menu'>

        <Link to="/profile">
          <img className={selectedIcon === 'profile' ? 'profile-pic selected' : 'profile-pic'}
              src={process.env.PUBLIC_URL + '/profile.png'}
              alt="profile-pic"
              onClick={() => handleIconClick('profile')}
          />
        </Link>
        <Link to="/">
          <img className={selectedIcon === 'home' ? 'home-icon selected' : 'home-icon'}
              src={process.env.PUBLIC_URL + '/home.svg'}
              alt="Home-icon"
              onClick={() => handleIconClick('home')}
          />
        </Link>
        <Link to="/chat">
          <img className={selectedIcon === 'chat' ? 'chat-icon selected' : 'chat-icon'}
              src={process.env.PUBLIC_URL + '/messages.svg'}
              alt="chat-icon"
              onClick={() => handleIconClick('chat')}
          />
        </Link>
        <Link to="/leaderboard">
          <img className={selectedIcon === 'leaderboard' ? 'leaderboard-icon selected' : 'leaderboard-icon'}
              src={process.env.PUBLIC_URL + '/trophy.svg'}
              alt="leaderboard-icon"
              onClick={() => handleIconClick('leaderboard')}
          />
          </Link>

        <Link to="/settings">
          <img className={selectedIcon === 'settings' ? 'setting-icon selected' : 'setting-icon'}
              src={process.env.PUBLIC_URL + '/user-gear.svg'}
              alt="setting-icon"
              onClick={() => handleIconClick('settings')}
          />
        </Link>

        <Link to="/logout">
          <img className={selectedIcon === 'logout' ? 'logout-icon selected' : 'logout-icon'}
              src={process.env.PUBLIC_URL + '/sign-out-alt.svg'}
              alt="logout-icon"
              onClick={() => handleIconClick('logout')}
          />
        </Link>
      </div>

    </div>
  );
}

export default Sidebar;