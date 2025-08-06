import { useState } from 'react';
import { useQuiz, useSubmitQuizAttempt, useQuizAttempts } from '../hooks/useCourseFlow';
import LoadingSpinner from '../../../shared/components/UI/LoadingSpinner';

interface QuizCardProps {
  quizId: string;
}

export default function QuizCard({ quizId }: QuizCardProps) {
  const { data: quizData, isLoading, isError } = useQuiz(quizId);
  const { data: attemptsData } = useQuizAttempts(quizId);
  const submitQuiz = useSubmitQuizAttempt();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (isLoading) return <LoadingSpinner text="Loading quiz..." />;
  if (isError || !quizData) return <div className="text-red-500">Error loading quiz.</div>;

  const quiz = quizData.data;

  const handleChange = (questionId: string, value: string) => {
    setAnswers(a => ({ ...a, [questionId]: value }));
  };

  const handleSubmit = async () => {
    await submitQuiz.mutateAsync({ quizId, answers: Object.values(answers) });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 p-4 rounded mb-4">
        <div className="font-semibold text-green-700 mb-2">Quiz submitted!</div>
        {/* Optionally show results/feedback */}
      </div>
    );
  }

  return (
    <div className="bg-blue-50 p-4 rounded mb-4">
      <h3 className="font-semibold mb-2">Quiz: {quiz.title}</h3>
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        {quiz.questions?.map((q: any) => (
          <div key={q._id} className="mb-4">
            <div className="font-medium mb-1">{q.text}</div>
            {q.options?.map((opt: string, idx: number) => (
              <label key={idx} className="block">
                <input
                  type="radio"
                  name={q._id}
                  value={opt}
                  checked={answers[q._id] === opt}
                  onChange={() => handleChange(q._id, opt)}
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="bg-primary-400 text-white px-4 py-2 rounded font-semibold hover:bg-primary-500 transition"
          disabled={submitQuiz.isPending}
        >
          {submitQuiz.isPending ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </form>
      {attemptsData && attemptsData.data && attemptsData.data.length > 0 && (
        <div className="mt-4 text-sm text-gray-600">
          <div>Previous Attempts:</div>
          {attemptsData.data.map((att: any, idx: number) => (
            <div key={att._id} className="mb-1">Attempt {idx + 1}: Score {att.score}</div>
          ))}
        </div>
      )}
    </div>
  );
} 