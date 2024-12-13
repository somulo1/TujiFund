import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminDashboard from '../components/AdminDashboard';
import MemberDashboard from '../components/MemberDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      {user.role === 'admin' ? <AdminDashboard /> : <MemberDashboard />}
    </div>
  );
};

export default Dashboard;

