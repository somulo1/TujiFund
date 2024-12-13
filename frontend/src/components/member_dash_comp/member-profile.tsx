import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { members } from '../../lib/api';
import { formatCurrency } from '../../lib/utils/date';

interface MemberProfileProps {
  memberId: string;
}

export function MemberProfile({ memberId }: MemberProfileProps) {
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [contactPreference, setContactPreference] = useState('email');
  const [settings, setSettings] = useState({
    notifications: true,
    twoFactorAuth: false,
    darkMode: false,
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await members.getById(memberId);
        setMember(data);
        setContactPreference(data.contactPreference || 'email'); // Default to email
        setSettings(data.settings || settings); // Use saved settings or defaults
      } catch (err) {
        console.error('Failed to fetch member:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [memberId]);

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    try {
      // Save settings to the backend
      await members.updateSettings(memberId, { contactPreference, settings });
      alert('Settings updated successfully!');
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('Failed to save settings. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!member) {
    return <div>Member not found</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Profile Header */}
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center">
          <div className="p-2 bg-gray-100 rounded-full">
            <User className="h-8 w-8 text-gray-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Total Contributions</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatCurrency(member.totalContributions)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Member Since</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {new Date(member.joinedAt).toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900">
              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {member.status}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Last Contribution</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {member.lastContribution
                ? new Date(member.lastContribution).toLocaleDateString()
                : 'No contributions yet'}
            </dd>
          </div>
        </dl>
      </div>

      {/* Contact Preference */}
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <h4 className="text-lg font-medium text-gray-900">Contact Preference</h4>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Preferred method to receive information:
          </label>
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={contactPreference}
            onChange={(e) => setContactPreference(e.target.value)}
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
        </div>
      </div>

      {/* Settings */}
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <h4 className="text-lg font-medium text-gray-900">Settings</h4>
        <div className="mt-4 space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">Enable Notifications</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                checked={settings.twoFactorAuth}
                onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">Enable Two-Factor Authentication</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                checked={settings.darkMode}
                onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
              />
              <span className="ml-2 text-sm text-gray-700">Enable Dark Mode</span>
            </label>
          </div>
        </div>
      </div>

      {/* Save Settings Button */}
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <Button onClick={handleSaveSettings} className="w-full">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
