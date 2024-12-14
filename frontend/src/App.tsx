import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/header';
import { Sidebar } from './components/layout/sidebar';
import { LoginPage } from './pages/auth/login';
import { DashboardPage } from './pages/dashboard';
import { ContributionsPage } from './pages/contributions';
import { MembersPage } from './pages/members';
import { DividendsPage } from './pages/dividends';
import { SecretaryDashboardPage } from './pages/secretary-dashboard';
import { useAuthStore } from './store/auth';
import ContributionList from './components/member_dash_comp/contribution-list';
import ContributionForm from './components/member_dash_comp/contribution-form';
import { MemberList } from './components/members/member-list';
import {MemberProfile} from "./components/member_dash_comp/member-profile";

function PrivateRoute({ children, allowedRoles = ['member', 'secretary', 'chairman', 'treasurer'] }: { 
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.user?.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
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
  const members = [
    { 
      id: '1', 
      name: 'John Doe',
      email: 'john@example.com',
      role: 'member' as const,
      joinedAt: new Date().toISOString()
    },
    { 
      id: '2', 
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'member' as const,
      joinedAt: new Date().toISOString()
    }
    // Add more members as needed
  ];

  const onSelectMember = (memberId: string) => {
    console.log(`Selected member ID: ${memberId}`);
    // Add your logic for handling member selection here
  };

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
          path="/member_dash_comp/contribution-list"
          element={
            <PrivateRoute>
              <AppLayout>
                <ContributionList />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/member_dash_comp/contribution-form"
          element={
            <PrivateRoute>
              <AppLayout>
                <ContributionForm />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/member_dash_comp/member-list"
          element={
            <PrivateRoute>
              <AppLayout>
                <MemberList members={members} onSelectMember={onSelectMember} />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/member_dash_comp/member-profile"
          element={
            <PrivateRoute>
              <AppLayout>
                <MemberProfile />
              </AppLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/secretary-dashboard"
          element={
            <PrivateRoute allowedRoles={['secretary']}>
              <AppLayout>
                <SecretaryDashboardPage />
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