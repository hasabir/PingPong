import React, { useState } from 'react';
import './SearchBar.css';

function  SearchBar()  {

const [searchQuery, setSearchQuery] = useState('');
const handleClearClick = () => 
{
    setSearchQuery('');
};

return (
    <form className="search-bar">
        <input  type="search"  placeholder="Search"  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        {searchQuery && (
        <div className="clear-button" onClick={handleClearClick}>
        </div>
        )}
    </form>
    );
};

export default SearchBar;
