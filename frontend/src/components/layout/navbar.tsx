import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';
import { useState, useRef, useEffect } from 'react';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', roles: ['member', 'secretary', 'chairman', 'treasurer'] },
    { label: 'Members', path: '/members', roles: ['member', 'secretary', 'chairman', 'treasurer'] },
    { label: 'Contributions', path: '/contributions', roles: ['member', 'secretary', 'chairman', 'treasurer'] },
    { label: 'Dividends', path: '/dividends', roles: ['member', 'secretary', 'chairman', 'treasurer'] },
    { label: 'Treasurer Panel', path: '/treasurer-dashboard', roles: ['treasurer'] },
    { label: 'Secretary Panel', path: '/secretary-dashboard', roles: ['secretary'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <nav className="bg-[#2c583e] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span 
              className="text-white text-xl font-bold cursor-pointer hover:text-gray-200 transition-colors"
              onClick={() => navigate('/')}
            >
              TujiFund
            </span>
          </div>

          {/* Right-aligned items */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-white hidden sm:block">{user?.name}</span>
                {/* Hamburger Menu Button */}
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md text-white hover:bg-[#1e3c2a] transition-colors focus:outline-none"
                    aria-label="Menu"
                  >
                    <div className="flex flex-col space-y-1.5 w-6">
                      <div className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`} />
                      <div className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                      <div className={`h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`} />
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100">
                      <div className="py-1">
                        {filteredMenuItems.map((item) => (
                          <button
                            key={item.path}
                            onClick={() => {
                              navigate(item.path);
                              setIsMenuOpen(false);
                            }}
                            className={`group flex items-center w-full px-4 py-2 text-sm ${
                              isActive(item.path)
                                ? 'bg-gray-100 text-[#2c583e]'
                                : 'text-gray-700 hover:bg-gray-50 hover:text-[#2c583e]'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2c583e]"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
  <></>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
