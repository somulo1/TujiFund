import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/navbar';
import { HomePage } from './pages/home';
import { AboutPage } from './pages/about';
import { LoginPage } from './pages/auth/login';
import { MemberRegistrationPage } from './pages/auth/register-member';
import { GroupRegistrationPage } from './pages/auth/register-chairperson';
import { DashboardPage } from './pages/dashboard/index';
import { MemberDashboardPage } from './pages/dashboard/member';
import { ChairpersonDashboardPage } from './pages/dashboard/chairperson';
import { TreasurerDashboardPage } from './pages/dashboard/treasurer';
import { SecretaryDashboardPage } from './pages/dashboard/secretary';
import { ProfilePage } from './pages/dashboard/profile';
import { ContributionsPage } from './pages/group/contributions';
import { MembersPage } from './pages/group/members';
import { DividendsPage } from './pages/group/dividends';
import { MakeDepositPage } from './pages/group/make-deposit';
import { useAuthStore } from './store/auth';
import { USER_ROLES, ROUTES } from './config/constants';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

function PrivateRoute({ children, allowedRoles = Object.values(USER_ROLES) }: PrivateRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.user?.role);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }

  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a472a] to-[#2c583e]">
      <Navbar />
      <main className="pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER_MEMBER} element={<MemberRegistrationPage />} />
        <Route path={ROUTES.REGISTER_GROUP} element={<GroupRegistrationPage />} />

        {/* Protected Routes */}
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <PrivateRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/member"
          element={
            <PrivateRoute allowedRoles={[USER_ROLES.MEMBER]}>
              <AppLayout>
                <MemberDashboardPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/chairperson"
          element={
            <PrivateRoute allowedRoles={[USER_ROLES.CHAIRPERSON]}>
              <AppLayout>
                <ChairpersonDashboardPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/treasurer"
          element={
            <PrivateRoute allowedRoles={[USER_ROLES.TREASURER]}>
              <AppLayout>
                <TreasurerDashboardPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/secretary"
          element={
            <PrivateRoute allowedRoles={[USER_ROLES.SECRETARY]}>
              <AppLayout>
                <SecretaryDashboardPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path={ROUTES.PROFILE}
          element={
            <PrivateRoute>
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/group/contributions"
          element={
            <PrivateRoute>
              <AppLayout>
                <ContributionsPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/group/members"
          element={
            <PrivateRoute>
              <AppLayout>
                <MembersPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/group/dividends"
          element={
            <PrivateRoute>
              <AppLayout>
                <DividendsPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        <Route
          path="/group/make-deposit"
          element={
            <PrivateRoute>
              <AppLayout>
                <MakeDepositPage />
              </AppLayout>
            </PrivateRoute>
          }
        />

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
