import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/navbar';
import { LoginPage } from './pages/auth/login';
import { DashboardPage } from './pages/dashboard';
import { ContributionsPage } from './pages/contributions';
import { MembersPage } from './pages/members';
import { DividendsPage } from './pages/dividends';
import { SecretaryDashboardPage } from './pages/secretary-dashboard';
import { TreasurerDashboardPage } from './pages/treasurer-dashboard';
import { LandingPage } from './pages/landing';
import { GroupRegistrationPage } from './pages/group/register';
import { RegistrationSuccessPage } from './pages/group/registration-success';
import { MemberRegistrationPage } from './pages/auth/register-member';
import { ChairpersonRegistrationPage } from './pages/auth/register-chairperson';
import { useAuthStore } from './store/auth';
import ContributionList from './components/member_dash_comp/contribution-list';
import ContributionForm from './components/member_dash_comp/contribution-form';
import { DividendDistribution } from './components/dividends/dividend-distribution';

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
      <Navbar />
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Registration Routes */}
        <Route path="/register" element={<Navigate to="/register/member" />} />
        <Route path="/register/member" element={<MemberRegistrationPage />} />
        <Route path="/register/admin" element={<ChairpersonRegistrationPage />} />
        <Route path="/group/register" element={<GroupRegistrationPage />} />
        <Route path="/group/registration-success" element={<RegistrationSuccessPage />} />
        
        <Route
          path="/treasurer-dashboard"
          element={
            <PrivateRoute allowedRoles={['treasurer']}>
              <AppLayout>
                <TreasurerDashboardPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

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
          path="/dividends"
          element={
            <PrivateRoute>
              <AppLayout>
                <DividendsPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dividends/distribution"
          element={
            <PrivateRoute allowedRoles={['treasurer']}>
              <AppLayout>
                <DividendDistribution />
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
      </Routes>
    </BrowserRouter>
  );
}