import React from 'react';
import SearchBar from './SearchBar';
import Notification from './Notification';
import './Hdr.css';
import Sidebar from './SideBar';

type HdrProps = {
    isWelcomePage: boolean;
};

const Hdr = ({ isWelcomePage }: HdrProps) => {
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

export default Hdr;
