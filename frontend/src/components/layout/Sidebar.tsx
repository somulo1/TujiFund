import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <nav className="sidebar">
            <ul>
                <li><Link to="/secretary/dashboard">Dashboard</Link></li>
                <li><Link to="/secretary/manage-meetings">Manage Meetings</Link></li>
                <li><Link to="/secretary/document-management">Document Management</Link></li>
                <li><Link to="/secretary/communication-tools">Communication Tools</Link></li>
                <li><Link to="/secretary/reports">Reports</Link></li>
            </ul>
        </nav>
    );
};

export default Sidebar;
