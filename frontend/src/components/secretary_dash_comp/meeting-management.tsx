import React, { useState } from 'react';
import { CalendarIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  agenda: string;
}

export const MeetingManagement: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Monthly General Meeting',
      date: '2024-12-20',
      time: '14:00',
      location: 'Main Hall',
      agenda: 'Monthly progress review and loan applications'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newMeeting, setNewMeeting] = useState<Partial<Meeting>>({
    title: '',
    date: '',
    time: '',
    location: '',
    agenda: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const meetingId = (meetings.length + 1).toString();
    setMeetings([...meetings, { ...newMeeting, id: meetingId } as Meeting]);
    setShowForm(false);
    setNewMeeting({
      title: '',
      date: '',
      time: '',
      location: '',
      agenda: ''
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Meeting Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Schedule Meeting
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Meeting Title
            </label>
            <input
              type="text"
              id="title"
              value={newMeeting.title}
              onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={newMeeting.date}
                onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                id="time"
                value={newMeeting.time}
                onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={newMeeting.location}
              onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="agenda" className="block text-sm font-medium text-gray-700">
              Agenda
            </label>
            <textarea
              id="agenda"
              value={newMeeting.agenda}
              onChange={(e) => setNewMeeting({ ...newMeeting, agenda: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Schedule Meeting
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <CalendarIcon className="h-5 w-5 text-indigo-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{meeting.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(`${meeting.date}T${meeting.time}`).toLocaleString()}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                {meeting.location}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500">{meeting.agenda}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
