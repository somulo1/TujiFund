import { createBrowserRouter } from 'react-router-dom';
import { MemberDashboard } from './pages/dashboard/member-dashboard';
import { ContributionList } from './components/member_dash_comp/contribution-list';
import { ContributionForm } from './components/member_dash_comp/contribution-form';
import { Savings } from './components/member_dash_comp/savings';
import { Fines } from './components/member_dash_comp/fines';
import { Dividends } from './components/member_dash_comp/dividends';
import { Loans } from './components/member_dash_comp/loans';
import { MemberList } from './components/member_dash_comp/member-list';
import { Share } from './components/member_dash_comp/share';
import { MemberProfile } from './components/member_dash_comp/member-profile';
import { Layout } from './components/layout/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'dashboard',
        element: <MemberDashboard />,
      },
      {
        path: 'member_dash_comp/contribution-list',
        element: <ContributionList />,
      },
      {
        path: 'member_dash_comp/contribution-form',
        element: <ContributionForm />,
      },
      {
        path: 'member_dash_comp/savings',
        element: <Savings />,
      },
      {
        path: 'member_dash_comp/fines',
        element: <Fines />,
      },
      {
        path: 'member_dash_comp/dividends',
        element: <Dividends />,
      },
      {
        path: 'member_dash_comp/loans',
        element: <Loans />,
      },
      {
        path: 'member_dash_comp/member-list',
        element: <MemberList />,
      },
      {
        path: 'member_dash_comp/shares',
        element: <Share />,
      },
      {
        path: 'member_dash_comp/member-profile',
        element: <MemberProfile />,
      },
    ],
  },
]);
