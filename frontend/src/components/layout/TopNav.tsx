import React from 'react';
import './TopNav.css';

const TopNav: React.FC = () => {
    return (
        <header className="topnav">
            <h1>Secretary Dashboard</h1>
            <div className="user-actions">
                <button>Logout</button>
            </div>
        </header>
    );
};

export default TopNav;
