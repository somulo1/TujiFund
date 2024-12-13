import { useAuthStore } from '../../store/auth';
import { MemberDashboard } from './member-dashboard';
import { AdminDashboard } from './admin-dashboard';

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return user.role === 'member' ? <MemberDashboard /> : <AdminDashboard />;
}