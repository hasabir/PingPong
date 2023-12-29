import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import SmsIcon from '@mui/icons-material/Sms';
import RoofingRoundedIcon from '@mui/icons-material/RoofingRounded';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
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
          <Avatar
              src={'https://randomuser.me/api/portraits/women/79.jpg'}
              onClick={() => handleIconClick('profile')}
          />
        </Link>
        <Link to="/home">
        <RoofingRoundedIcon
            style={{ fontSize: 40, color: selectedIcon === 'home' ? 'rgba(45, 206, 148, 0.2)' : '#2DCE94' }}
            onClick={() => handleIconClick('home')}
          />
        </Link>
        <Link to="/chat">
          <SmsIcon
            style={{ fontSize: 40, color: selectedIcon === 'chat' ? 'rgba(45, 206, 148, 0.2)' : '#2DCE94' }}
            onClick={() => handleIconClick('chat')}
          />
        </Link>
        <Link to="/leaderboard">
          <LeaderboardOutlinedIcon
            style={{ fontSize: 40, color: selectedIcon === 'leaderboard' ? 'rgba(45, 206, 148, 0.2)' : '#2DCE94' }}
            onClick={() => handleIconClick('leaderboard')}
          />
        </Link>

        <Link to="/settings">
        <SettingsOutlinedIcon
            style={{ fontSize: 40, color: selectedIcon === 'settings' ? 'rgba(45, 206, 148, 0.2)' : '#2DCE94' }}
            onClick={() => handleIconClick('settings')}
          />
        </Link>

        <Link to="/logout">
        <LogoutOutlinedIcon
            style={{ fontSize: 40, color: selectedIcon === 'logout' ? 'rgba(45, 206, 148, 0.2)' : '#2DCE94' }}
            onClick={() => handleIconClick('logout')}
          />
        </Link>
      </div>

    </div>
  );
}

export default Sidebar;