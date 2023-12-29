import React from 'react';
import SearchBar from './SearchBar';
import Notification from './Notification';
import './Header.css';
import Sidebar from './SideBar';

type HeaderProps = {
    isWelcomePage: boolean;
};

const Header = ({ isWelcomePage }: HeaderProps) => {
    return (
        <div className={`header ${isWelcomePage ? 'welcome-header' : ''}`}>
        {!isWelcomePage && (
            <>
                <div className="right-section">
                    <Sidebar />
                </div>
                <SearchBar />
                <Notification />
            </>
        )}
        </div>
  );
};

export default Header;
