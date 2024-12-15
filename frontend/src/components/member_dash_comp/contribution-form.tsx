import React, { useState, useEffect } from 'react';
import { Trophy, Medal, LineChart } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  points: number;
}

const ContributionForm: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Mock achievements data
    const mockAchievements: Achievement[] = [
      { id: '1', title: 'Top Contributor', description: 'Contributed the most this month', icon: <Trophy className="h-6 w-6 text-yellow-500" />, points: 50 },
      { id: '2', title: 'Regular Saver', description: 'Contributed regularly for 6 months', icon: <Medal className="h-6 w-6 text-blue-500" />, points: 30 },
      { id: '3', title: 'Early Bird', description: 'Made early contributions', icon: <LineChart className="h-6 w-6 text-green-500" />, points: 40 },
    ];
    setAchievements(mockAchievements);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Achievements</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-800">Your Achievements</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-600">Celebrate your contribution milestones.</p>
        </div>
        <div className="border-t border-gray-200">
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
      <div>
        {/* Form implementation goes here */}
      </div>
    </div>
  );
};

export default ContributionForm;