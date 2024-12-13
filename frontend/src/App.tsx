import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/header';
import { Sidebar } from './components/layout/sidebar';
import { LoginPage } from './pages/auth/login';
import { DashboardPage } from './pages/dashboard';
import { ContributionsPage } from './pages/contributions';
import { MembersPage } from './pages/members';
import { DividendsPage } from './pages/dividends';
import { useAuthStore } from './store/auth';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/contributions"
          element={
            <PrivateRoute>
              <AppLayout>
                <ContributionsPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/members"
          element={
            <PrivateRoute>
              <AppLayout>
                <MembersPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/dividends"
          element={
            <PrivateRoute>
              <AppLayout>
                <DividendsPage />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}