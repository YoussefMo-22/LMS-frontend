import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/instructorApi';
import { useInstructorEarnings } from '../../courses/hooks/useEarning';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../../shared/components/UI/LoadingSpinner';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

export default function InstructorCourses() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['instructorCourses'],
    queryFn: () => api.getCourses(),
  });

  const { data: earningsData } = useInstructorEarnings();
  const totalEarnings = earningsData?.totalEarnings || 0;

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
    await api.deleteCourse(id);
    refetch();
    queryClient.invalidateQueries({ queryKey: ['instructorCourses'] });
  };

  if (isLoading) return <LoadingSpinner text="Loading courses..." />;
  if (isError || !data) return <div className="text-red-500">Error loading courses.</div>;

  const courses = data.data.courses || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-400">My Courses</h1>
        <Link
          to="/instructor/courses/create"
          className="bg-primary-400 text-white px-4 py-2 rounded font-semibold hover:bg-primary-500 transition"
        >
          + New Course
        </Link>
      </div>

      {/* Earnings Summary Card */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Total Earnings</h2>
            <p className="text-3xl font-bold">{formatCurrency(totalEarnings)}</p>
            <p className="text-green-100 text-sm mt-1">From all your courses</p>
          </div>
          <Link
            to="/instructor/earnings"
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            View Details
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Title</th>
              <th className="py-2">Status</th>
              <th className="py-2">Price</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course: any) => (
              <tr key={course._id} className="border-b hover:bg-gray-50">
                <td className="py-2 font-medium">{course.title}</td>
                <td className="py-2">
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700">
                    {course.status}
                  </span>
                </td>
                <td className="py-2">${course.price}</td>
                <td className="py-2 flex gap-2">
                  <Link
                    to={`/instructor/courses/${course._id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    to="/instructor/quizzes"
                    className="text-green-600 hover:underline"
                  >
                    Manage Quizzes
                  </Link>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(course._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 