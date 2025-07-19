import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuiz';
import QuizTaker from '../components/QuizTaker';
import ButtonUI from '../../../shared/components/UI/Button';

export default function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const { data: quizData, isLoading, error } = useQuiz(quizId!);
  const quiz = quizData?.data;

  const handleQuizComplete = (score: number, total: number) => {
    setFinalScore(score);
    setTotalPoints(total);
    setQuizCompleted(true);
  };

  const handleBackToCourse = () => {
    // Navigate back to the course details page
    navigate(-1);
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
        <h2 className="text-xl font-bold mb-2">Error Loading Quiz</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center text-gray-500 p-8">
        <h2 className="text-xl font-bold mb-2">Quiz Not Found</h2>
        <p>The quiz you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{quiz.title} | Quiz</title>
        <meta name="description" content={`Take the ${quiz.title} quiz`} />
      </Helmet>

      <div className="container mx-auto px-4 py-6">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
              <p className="text-gray-600">Test your knowledge with this quiz</p>
            </div>
            {!quizCompleted && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Time Limit</div>
                <div className="text-lg font-semibold text-gray-900">
                  {quiz.time_limit ? `${quiz.time_limit} minutes` : 'No time limit'}
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Instructions</h3>
            <p className="text-blue-800">Read each question carefully and select the best answer. You can navigate between questions using the Previous and Next buttons.</p>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="max-w-4xl mx-auto">
          {quizCompleted ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Completed!</h2>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {finalScore}/{totalPoints}
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  {Math.round((finalScore / totalPoints) * 100)}%
                </div>
                <div className={`text-lg font-semibold ${
                  (finalScore / totalPoints) >= 0.7 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {(finalScore / totalPoints) >= 0.7 ? 'Congratulations! You passed!' : 'Keep studying and try again!'}
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <ButtonUI 
                  onClick={handleBackToCourse}
                  className="bg-primary-400 text-white px-6 py-2 rounded-lg hover:bg-primary-500 transition"
                >
                  Back to Course
                </ButtonUI>
                <ButtonUI 
                  onClick={() => window.location.reload()}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Retake Quiz
                </ButtonUI>
              </div>
            </div>
          ) : (
            <QuizTaker 
              quizId={quizId!} 
              onComplete={handleQuizComplete}
            />
          )}
        </div>
      </div>
    </>
  );
}
