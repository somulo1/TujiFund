import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './button';
import { useAuthStore } from '../../store/auth';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (href: string) => {
    if (href.startsWith('/#')) {
      // For hash navigation on home page
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href.replace('/', ''));
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.querySelector(href.replace('/', ''));
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    setIsOpen(false);
  };

  const menuItems = [
    { label: 'Our Services', href: '/#services' },
    { label: 'About Us', href: '/about' },
    { label: 'Log In', href: '/login' },
    { label: 'Register as Member', href: '/register-member' },
    { label: 'Register Group', href: '/register-chairperson' },
  ];

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Button variant="ghost" onClick={() => handleNavigation('/')}>
              <span className="text-xl font-bold text-blue-600">TujiFund</span>
            </Button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/dashboard')}
                  className="text-lg font-semibold text-white hover:text-[#2c583e] transition-colors"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/profile')}
                  className="text-lg font-semibold text-white hover:text-[#2c583e] transition-colors"
                >
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    useAuthStore.getState().logout();
                    navigate('/');
                  }}
                  className="text-lg font-semibold text-white hover:text-[#2c583e] transition-colors"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/login')}
                  className="text-lg font-semibold text-white hover:text-[#2c583e] transition-colors"
                >
                  Log In
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/register-member')}
                  className="text-lg font-semibold text-white hover:text-[#2c583e] transition-colors"
                >
                  Register as Member
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/register-chairperson')}
                  className="px-6 py-2 text-lg font-semibold text-white bg-[#2c583e] rounded-md hover:bg-[#1e3c2a] transition-colors"
                >
                  Register Group
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={toggleMenu} className="p-2">
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/dashboard')}
                  className="block w-full text-left px-3 py-2 text-lg font-semibold text-white hover:text-[#2c583e] transition-colors"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/profile')}
                  className="block w-full text-left px-3 py-2 text-lg font-semibold text-white hover:text-[#2c583e] transition-colors"
                >
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    useAuthStore.getState().logout();
                    navigate('/');
                  }}
                  className="block w-full text-left px-3 py-2 text-lg font-semibold text-white hover:text-[#2c583e] transition-colors"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/login')}
                  className="block w-full text-left px-3 py-2 text-lg font-semibold text-white hover:text-[#2c583e] transition-colors"
                >
                  Log In
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/register-member')}
                  className="block w-full text-left px-3 py-2 text-lg font-semibold text-white hover:text-[#2c583e] transition-colors"
                >
                  Register as Member
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation('/register-chairperson')}
                  className="block w-full text-left px-3 py-2 text-lg font-semibold text-white bg-[#2c583e] rounded-md hover:bg-[#1e3c2a] transition-colors"
                >
                  Register Group
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
