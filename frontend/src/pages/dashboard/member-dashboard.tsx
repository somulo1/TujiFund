import { BarChart, DollarSign, PieChart, TrendingUp, Trophy, Medal, LineChart, Users, Star } from 'lucide-react';
import { ContributionChart } from '../../components/charts/contribution-chart';
import { StatCard } from '../../components/ui/stat-card';
import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/layout/sidebar';

interface Reminder {
  id: string;
  type: string;
  message: string;
  date: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  points: number;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
}

export function MemberDashboard() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebarVisibility = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Mock reminders data
    const mockReminders: Reminder[] = [
      { id: '1', type: 'Meeting', message: 'Monthly meeting on savings strategies', date: '2024-12-20' },
      { id: '2', type: 'Loan Repayment', message: 'Loan repayment due', date: '2024-12-25' },
      { id: '3', type: 'Contribution', message: 'Monthly contribution due', date: '2024-12-28' },
      { id: '4', type: 'Dividend', message: 'Dividend distribution announcement', date: '2024-12-30' },
      { id: '5', type: 'Savings Goal', message: 'Reach your savings goal by end of month', date: '2024-12-31' },
    ];
    setReminders(mockReminders);

    // Mock achievements data
    const mockAchievements: Achievement[] = [
      { id: '1', title: 'Top Saver', description: 'Achieved the highest savings this month', icon: <Trophy className="h-6 w-6 text-yellow-500" />, points: 50 },
      { id: '2', title: 'Consistent Contributor', description: 'Contributed consistently for 6 months', icon: <Medal className="h-6 w-6 text-blue-500" />, points: 30 },
      { id: '3', title: 'Early Bird', description: 'Paid off a loan ahead of schedule', icon: <LineChart className="h-6 w-6 text-green-500" />, points: 40 },
    ];
    setAchievements(mockAchievements);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebarVisibility={toggleSidebarVisibility} />
      
      <main className={`flex-1 overflow-y-auto transition-margin duration-200 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard title="Total Chama Contributions" value="KES 150,000" icon={DollarSign} trend="+12.5%" />
            <StatCard title="Your Expected Dividend" value="KES 15,000" icon={TrendingUp} trend="+5.2%" />
            <StatCard title="Your Shares" value="250 Units" value2="KES 15,000.00" icon={PieChart} trend="+8.3%" />
            <StatCard title="Savings" value="Ksh 25,000.00" icon={DollarSign} trend="updated on last meeting" />
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">Transaction Overview</h2>
            <ContributionChart />
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">Reminders</h2>
            <dl>
              {reminders.map((reminder) => (
                <div key={reminder.id} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">{reminder.type}</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {reminder.message} - <span className="text-gray-500">{new Date(reminder.date).toLocaleDateString()}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">Achievements</h2>
            <dl>
              {achievements.map((achievement) => (
                <div key={achievement.id} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700 flex items-center">
                    {achievement.icon}
                    <span className="ml-2">{achievement.title}</span>
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {achievement.description} - <span className="text-yellow-500">+{achievement.points} points</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}