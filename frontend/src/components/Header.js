import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Chama App</Link>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li><Link to={user.role === 'member' ? '/member-dashboard' : '/admin-dashboard'} className="hover:text-accent">Dashboard</Link></li>
                <li><Link to="/profile" className="hover:text-accent">Profile</Link></li>
                {['admin', 'secretary', 'chairman', 'treasurer'].includes(user.role) && (
                  <li><Link to="/reports" className="hover:text-accent">Reports</Link></li>
                )}
                <li><Link to="/chat" className="hover:text-accent">Chat</Link></li>
                <li><button onClick={logout} className="hover:text-accent">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-accent">Login</Link></li>
                <li><Link to="/register" className="hover:text-accent">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

