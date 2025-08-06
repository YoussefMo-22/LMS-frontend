import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuizzes, useCreateQuiz, useUpdateQuiz, useDeleteQuiz } from '../../courses/hooks/useQuiz';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { Quiz } from '../../courses/types/quiz';

interface QuizFormData {
  course_id: string;
  title: string;
  time_limit: number;
}

const InstructorQuizzes: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>('');

  const { data, isLoading, error } = useQuizzes({ course_id: selectedCourse || undefined });
  const createQuizMutation = useCreateQuiz();
  const updateQuizMutation = useUpdateQuiz();
  const deleteQuizMutation = useDeleteQuiz();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuizFormData>();

  const quizzes = data?.data || [];

  const onSubmit = async (data: QuizFormData) => {
    try {
      if (editingQuiz) {
        await updateQuizMutation.mutateAsync({
          id: editingQuiz._id,
          data: { title: data.title, time_limit: data.time_limit }
        });
        setEditingQuiz(null);
      } else {
        await createQuizMutation.mutateAsync(data);
      }
      reset();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  const handleEdit = (quiz: Quiz) => {
    setEditingQuiz(quiz);
    reset({
      course_id: quiz.course_id,
      title: quiz.title,
      time_limit: quiz.time_limit
    });
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      try {
        await deleteQuizMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting quiz:', error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingQuiz(null);
    reset();
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setEditingQuiz(null);
    reset();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <h2 className="text-xl font-bold mb-2">Error Loading Quizzes</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Quizzes | Instructor Dashboard</title>
        <meta name="description" content="Manage your course quizzes" />
      </Helmet>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Quizzes</h1>
            <p className="text-gray-600">Create and manage quizzes for your courses</p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 transition"
          >
            + New Quiz
          </button>
        </div>

        {/* Course Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Course</h2>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            <option value="">All Courses</option>
            {/* In a real app, you'd fetch courses here */}
            <option value="course1">Course 1</option>
            <option value="course2">Course 2</option>
          </select>
        </div>

        {/* Quizzes Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quizzes ({quizzes.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time Limit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quizzes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No quizzes found. Create your first quiz!
                    </td>
                  </tr>
                ) : (
                  quizzes.map((quiz: Quiz) => (
                    <tr key={quiz._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {quiz.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {quiz.course_id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {quiz.time_limit} minutes
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(quiz)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <Link
                            to={`/instructor/quizzes/${quiz._id}/questions`}
                            className="text-green-600 hover:text-green-900"
                          >
                            Manage Questions
                          </Link>
                          <button
                            onClick={() => handleDelete(quiz._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create/Edit Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                {editingQuiz ? 'Edit Quiz' : 'Create New Quiz'}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course ID
                  </label>
                  <input
                    {...register('course_id', { required: 'Course ID is required' })}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    placeholder="Enter course ID"
                  />
                  {errors.course_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.course_id.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quiz Title
                  </label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    placeholder="Enter quiz title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Limit (minutes)
                  </label>
                  <input
                    {...register('time_limit', { 
                      required: 'Time limit is required',
                      min: { value: 1, message: 'Time limit must be at least 1 minute' }
                    })}
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    placeholder="30"
                  />
                  {errors.time_limit && (
                    <p className="text-red-500 text-sm mt-1">{errors.time_limit.message}</p>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={createQuizMutation.isPending || updateQuizMutation.isPending}
                    className="flex-1 bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 disabled:bg-gray-300 transition"
                  >
                    {createQuizMutation.isPending || updateQuizMutation.isPending ? 'Saving...' : 'Save Quiz'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default InstructorQuizzes; 