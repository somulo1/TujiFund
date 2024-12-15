import { BarChart3, Users, Wallet, DollarSign, AlertCircle, CreditCard, PieChart, Coins, Award, MessageSquare } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../store/auth';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebarVisibility: () => void;
}

const memberNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Contributions', href: '/member_dash_comp/contribution-list', icon: Wallet },
  { name: 'Achievements', href: '/member_dash_comp/contribution-form', icon: Award },
  { name: 'Savings', href: '/member_dash_comp/savings', icon: PieChart },
  { name: 'Mary-go-round', href: '/member_dash_comp/member-list', icon: Users },
  { name: 'Shares', href: '/member_dash_comp/shares', icon: PieChart },
  { name: 'Profile', href: '/member_dash_comp/member-profile', icon: Users },
];

const adminNavItems = [
  ...memberNavItems,
  { name: 'Members', href: '/members', icon: Users },
];

export function Sidebar({ isSidebarOpen, toggleSidebarVisibility }: SidebarProps) {
  const { user } = useAuthStore();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (itemName: string) => {
    setActiveItem((prevItem) => (prevItem === itemName ? null : itemName));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      if (typeof toggleSidebarVisibility === 'function') {
        toggleSidebarVisibility();
      } else {
        console.error('toggleSidebarVisibility is not a function');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleSidebarVisibility]);

  const { pathname } = useLocation();
  const navItems = user?.role === 'member' ? memberNavItems : adminNavItems;

  return (
    <div ref={sidebarRef} className={`fixed inset-y-0 flex w-64 flex-col transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <img className="h-8 w-auto" src="/logo.svg" alt="Welcome to TujiFund" />
        </div>
        <nav className="flex flex-1 flex-col pt-8">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => handleItemClick(item.name)}
                      className={cn(
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                        pathname === item.href ? 'bg-gray-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}