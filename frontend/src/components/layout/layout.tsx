import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { useState } from 'react';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebarVisibility = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebarVisibility} />
      <div className="flex-1 lg:pl-64">
        <Header toggleSidebar={toggleSidebarVisibility} />
        <main className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
