import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useLiveSessionsByCourse, useCreateLiveSession } from '../../courses/hooks/useLiveSession';
import type { LiveSession } from '../../courses/types/liveSession';
import { Helmet } from 'react-helmet-async';

const emptySession: Partial<LiveSession> = {
  title: '',
  description: '',
  duration_minutes: 60,
  scheduled_at: '',
  password: '',
};

const InstructorLiveSessions = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { data, isLoading, error } = useLiveSessionsByCourse(courseId!);
  const createSession = useCreateLiveSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<LiveSession>>({ ...emptySession, course_id: courseId });

  const sessions = data?.data || [];

  const openCreate = () => {
    setForm({ ...emptySession, course_id: courseId });
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setForm({ ...emptySession, course_id: courseId });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSession.mutateAsync(form);
    closeModal();
  };

  return (
    <>
      <Helmet>
        <title>Live Sessions | Instructor | LevelUp LMS</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Live Sessions</h1>
          <button className="bg-primary-500 text-white px-4 py-2 rounded" onClick={openCreate}>Create Live Session</button>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error loading sessions: {error.message}</div>
        ) : (
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Title</th>
                <th className="p-2 text-left">Scheduled At</th>
                <th className="p-2 text-left">Duration</th>
                <th className="p-2 text-left">Link</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session._id} className="border-b">
                  <td className="p-2">{session.title}</td>
                  <td className="p-2">{session.scheduled_at?.slice(0, 16).replace('T', ' ')}</td>
                  <td className="p-2">{session.duration_minutes} min</td>
                  <td className="p-2">
                    <a href={session.session_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Join</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
              <h2 className="text-xl font-bold mb-2">Create Live Session</h2>
              <input name="title" value={form.title || ''} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
              <textarea name="description" value={form.description || ''} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" required />
              <input name="duration_minutes" type="number" value={form.duration_minutes || 60} onChange={handleChange} placeholder="Duration (minutes)" className="w-full border p-2 rounded" required />
              <input name="scheduled_at" type="datetime-local" value={form.scheduled_at ? form.scheduled_at.slice(0, 16) : ''} onChange={handleChange} className="w-full border p-2 rounded" required />
              <input name="password" value={form.password || ''} onChange={handleChange} placeholder="Password (optional)" className="w-full border p-2 rounded" />
              <div className="flex gap-2 justify-end">
                <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={closeModal}>Cancel</button>
                <button type="submit" className="bg-primary-500 text-white px-4 py-2 rounded">Create</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default InstructorLiveSessions; 