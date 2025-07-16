import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../api/instructorApi';
import LoadingSpinner from '../../../shared/components/UI/LoadingSpinner';

interface AssignmentEditorProps {
  mode: 'create' | 'edit';
}

export default function InstructorAssignmentEditor({ mode }: AssignmentEditorProps) {
  const { id, courseId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    maxScore: '',
  });
  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && id && courseId) {
      setLoading(true);
      api.getAssignment(id, courseId)
        .then(res => {
          const a = res.data[0] || res.data;
          setForm({
            title: a.title || '',
            description: a.description || '',
            dueDate: a.dueDate ? a.dueDate.slice(0, 10) : '',
            maxScore: a.maxScore?.toString() || '',
          });
        })
        .catch(() => setError('Error loading assignment'))
        .finally(() => setLoading(false));
    }
  }, [mode, id, courseId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'create') {
        await api.createAssignment(courseId!, form);
      } else {
        await api.updateAssignment(id!, courseId!, form);
      }
      navigate('/instructor/assignments');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error saving assignment');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text={mode === 'edit' ? 'Loading assignment...' : 'Saving...'} />;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create Assignment' : 'Edit Assignment'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
            required
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Max Score</label>
            <input
              type="number"
              name="maxScore"
              value={form.maxScore}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        {error && <div className="text-red-500 font-medium">{error}</div>}
        <button
          type="submit"
          className="bg-primary-400 text-white px-4 py-2 rounded font-semibold hover:bg-primary-500 transition w-full"
          disabled={loading}
        >
          {loading ? 'Saving...' : mode === 'create' ? 'Create Assignment' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
} 