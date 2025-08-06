import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../api/instructorApi';
import LoadingSpinner from '../../../shared/components/UI/LoadingSpinner';

interface CourseEditorProps {
  mode: 'create' | 'edit';
}

export default function InstructorCourseEditor({ mode }: CourseEditorProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    status: 'draft',
    language: '',
    category: '',
    discount: '',
  });
  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && id) {
      setLoading(true);
      api.getInstructorCourses(id)
        .then(res => {
          const c = res.data;
          setForm({
            title: c.title || '',
            description: c.description || '',
            price: c.price?.toString() || '',
            status: c.status || 'draft',
            language: c.language || '',
            category: c.category || '',
            discount: c.discount?.toString() || '',
          });
        })
        .catch(() => setError('Error loading course'))
        .finally(() => setLoading(false));
    }
  }, [mode, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'create') {
        await api.createInstructorCourse(form);
      } else {
        await api.updateInstructorCourse(id!, form);
      }
      navigate('/instructor/courses');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error saving course');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner text={mode === 'edit' ? 'Loading course...' : 'Saving...'} />;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4">{mode === 'create' ? 'Create New Course' : 'Edit Course'}</h1>
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
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Discount</label>
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="published">Published</option>
          </select>
        </div>
        {error && <div className="text-red-500 font-medium">{error}</div>}
        <button
          type="submit"
          className="bg-primary-400 text-white px-4 py-2 rounded font-semibold hover:bg-primary-500 transition w-full"
          disabled={loading}
        >
          {loading ? 'Saving...' : mode === 'create' ? 'Create Course' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
} 