import { useQuizzes } from '../hooks/useQuiz';
import { Link } from 'react-router-dom';

interface QuizzesListProps {
  courseId: string;
}

const QuizzesList: React.FC<QuizzesListProps> = ({ courseId }) => {
  const { data, isLoading, error } = useQuizzes({ course_id: courseId });
  const quizzes = data?.data || [];

  if (isLoading) return <div>Loading quizzes...</div>;
  if (error) return <div className="text-red-500">Error loading quizzes: {error.message}</div>;
  if (quizzes.length === 0) return <div className="text-gray-500">No quizzes available for this course.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-primary-400">Course Quizzes</h2>
      <div className="space-y-4">
        {quizzes.map((quiz: any) => (
          <div key={quiz._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{quiz.title}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {quiz.time_limit} minutes
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Created {new Date(quiz.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Link
                to={`/quiz/${quiz._id}`}
                className="bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 transition"
              >
                Start Quiz
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizzesList; 