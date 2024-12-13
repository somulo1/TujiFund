import { Bell, Menu, User } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuthStore } from '../../store/auth';

export function Header() {
  const { user } = useAuthStore();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-4 lg:ml-0">
            <h1 className="text-xl font-bold text-gray-900">Chama App</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="hidden text-sm font-medium text-gray-700 lg:block">
              {user?.name}
            </span>
            <Button variant="ghost" size="sm" className="rounded-full">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}