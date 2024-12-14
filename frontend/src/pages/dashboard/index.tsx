import { useAuthStore } from '../../store/auth';
import { MemberDashboard } from './member-dashboard';
import { AdminDashboard } from './admin-dashboard';
import { SecretaryDashboardPage } from '../secretary-dashboard';
import { Navigate } from 'react-router-dom';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'member':
      return <MemberDashboard />;
    case 'secretary':
      return <SecretaryDashboardPage />;
    case 'chairman':
    case 'treasurer':
      return <AdminDashboard />;
    default:
      return <Navigate to="/login" />;
  }
}