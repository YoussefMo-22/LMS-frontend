import React from "react";
import { useLiveSessionsByCourse } from '../hooks/useLiveSession';

interface LiveSessionsListProps {
  courseId: string;
}

const LiveSessionsList: React.FC<LiveSessionsListProps> = ({ courseId }) => {
  const { data, isLoading, error } = useLiveSessionsByCourse(courseId, true);
  const sessions = data?.data || [];

  if (isLoading) return <div>Loading live sessions...</div>;
  if (error) return <div className="text-red-500">Error loading live sessions: {error.message}</div>;
  if (sessions.length === 0) return <div className="text-gray-500">No upcoming live sessions.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-primary-400">Upcoming Live Sessions</h2>
      <ul className="space-y-4">
        {sessions.map(session => (
          <li key={session._id} className="border-b pb-4 last:border-b-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <div className="font-semibold text-lg">{session.title}</div>
                <div className="text-gray-600 text-sm">{session.scheduled_at?.slice(0, 16).replace('T', ' ')}</div>
                <div className="text-gray-500 text-xs">Instructor: {typeof session.instructor_id === 'object' ? session.instructor_id.name : session.instructor_id}</div>
              </div>
              <a
                href={session.session_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition"
              >
                Join Session
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveSessionsList; 