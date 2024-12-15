import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '../../components/common/button';
import { useAuthStore } from '../../store/auth';
import { ROUTES, USER_ROLES, COLORS } from '../../config/constants';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.user?.role);
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

  const getDashboardPath = () => {
    switch (userRole) {
      case USER_ROLES.MEMBER:
        return '/dashboard/member';
      case USER_ROLES.CHAIRPERSON:
        return '/dashboard/chairperson';
      case USER_ROLES.TREASURER:
        return '/dashboard/treasurer';
      case USER_ROLES.SECRETARY:
        return '/dashboard/secretary';
      default:
        return ROUTES.DASHBOARD;
    }
  };

  const menuItems = [
    { label: 'Our Services', href: ROUTES.SERVICES },
    { label: 'About Us', href: ROUTES.ABOUT },
  ];

  const authMenuItems = isAuthenticated
    ? [
        { label: 'Dashboard', href: getDashboardPath() },
        { label: 'Profile', href: ROUTES.PROFILE },
      ]
    : [
        { label: 'Log In', href: ROUTES.LOGIN },
        { label: 'Register as Member', href: ROUTES.REGISTER_MEMBER },
        { label: 'Register Group', href: ROUTES.REGISTER_GROUP },
      ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Button variant="ghost" onClick={() => handleNavigation(ROUTES.HOME)}>
              <span className="text-xl font-bold text-white">TujiFund</span>
            </Button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {[...menuItems, ...authMenuItems].map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleNavigation(item.href)}
                className={`text-lg font-semibold text-white hover:text-[${COLORS.PRIMARY}] transition-colors ${
                  item.label === 'Register Group'
                    ? `px-6 py-2 bg-[${COLORS.PRIMARY}] rounded-md hover:bg-[${COLORS.PRIMARY_DARK}]`
                    : ''
                }`}
              >
                {item.label}
              </Button>
            ))}
            {isAuthenticated && (
              <Button
                variant="ghost"
                onClick={() => {
                  useAuthStore.getState().logout();
                  navigate(ROUTES.HOME);
                }}
                className="text-lg font-semibold text-white hover:text-[${COLORS.PRIMARY}] transition-colors"
              >
                Logout
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={toggleMenu} className="p-2">
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[...menuItems, ...authMenuItems].map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleNavigation(item.href)}
                className={`block w-full text-left px-3 py-2 text-lg font-semibold text-white hover:text-[${COLORS.PRIMARY}] transition-colors ${
                  item.label === 'Register Group'
                    ? `bg-[${COLORS.PRIMARY}] rounded-md hover:bg-[${COLORS.PRIMARY_DARK}]`
                    : ''
                }`}
              >
                {item.label}
              </Button>
            ))}
            {isAuthenticated && (
              <Button
                variant="ghost"
                onClick={() => {
                  useAuthStore.getState().logout();
                  navigate(ROUTES.HOME);
                }}
                className="block w-full text-left px-3 py-2 text-lg font-semibold text-white hover:text-[${COLORS.PRIMARY}] transition-colors"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
