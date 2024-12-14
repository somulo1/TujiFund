import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="layout">
            <Header />
            <div className="content">
                <Sidebar />
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
