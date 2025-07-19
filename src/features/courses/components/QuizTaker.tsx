import React, { useState } from 'react';
import { useQuestionsByQuiz } from '../hooks/useQuestion';
import type { Question } from '../types/question';

interface QuizTakerProps {
  quizId: string;
  onComplete?: (score: number, totalPoints: number) => void;
}

interface Answer {
  questionId: string;
  answer: string;
}

const QuizTaker: React.FC<QuizTakerProps> = ({ quizId, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const { data, isLoading, error } = useQuestionsByQuiz(quizId);
  const questions = data?.data || [];

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { ...a, answer } : a);
      } else {
        return [...prev, { questionId, answer }];
      }
    });
  };

  const getCurrentAnswer = (questionId: string) => {
    return answers.find(a => a.questionId === questionId)?.answer || '';
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let earnedPoints = 0;
    let totalPossiblePoints = 0;

    questions.forEach(question => {
      totalPossiblePoints += question.points;
      const userAnswer = answers.find(a => a.questionId === question._id)?.answer;
      
      if (userAnswer && userAnswer.toLowerCase() === question.correct_answer.toLowerCase()) {
        earnedPoints += question.points;
      }
    });

    setScore(earnedPoints);
    setTotalPoints(totalPossiblePoints);
    setIsSubmitted(true);
    
    if (onComplete) {
      onComplete(earnedPoints, totalPossiblePoints);
    }
  };

  const renderQuestion = (question: Question) => {
    const currentAnswer = getCurrentAnswer(question._id);

    switch (question.question_type) {
      case 'multiple_choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  className="text-primary-400 focus:ring-primary-400"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'true_false':
        return (
          <div className="space-y-3">
            {['true', 'false'].map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  value={option}
                  checked={currentAnswer === option}
                  onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  className="text-primary-400 focus:ring-primary-400"
                />
                <span className="text-gray-700 capitalize">{option}</span>
              </label>
            ))}
          </div>
        );

      case 'short_answer':
        return (
          <div>
            <textarea
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(question._id, e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
              rows={3}
              placeholder="Enter your answer..."
            />
          </div>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;
    const isPassing = percentage >= 70; // 70% passing threshold

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quiz Results</h2>
        
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {score}/{totalPoints}
          </div>
          <div className="text-lg text-gray-600 mb-4">
            {percentage}%
          </div>
          <div className={`text-lg font-semibold ${isPassing ? 'text-green-600' : 'text-red-600'}`}>
            {isPassing ? 'Passed!' : 'Failed'}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Question Review</h3>
          {questions.map((question, index) => {
            const userAnswer = answers.find(a => a.questionId === question._id)?.answer || '';
            const isCorrect = userAnswer.toLowerCase() === question.correct_answer.toLowerCase();
            
            return (
              <div key={question._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Question {index + 1}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                
                <p className="text-gray-900 mb-3">{question.question_text}</p>
                
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Your answer:</span>
                    <span className={`ml-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {userAnswer || 'No answer provided'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-700">Correct answer:</span>
                      <span className="ml-2 text-green-600">{question.correct_answer}</span>
                    </div>
                  )}
                  <div className="text-sm text-gray-500">
                    Points: {isCorrect ? question.points : 0}/{question.points}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
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

  if (questions.length === 0) {
    return (
      <div className="text-center text-gray-500 p-8">
        <h2 className="text-xl font-bold mb-2">No Questions Available</h2>
        <p>This quiz doesn't have any questions yet.</p>
      </div>
    );
  }

  if (isSubmitted) {
    return renderResults();
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Question {currentQuestionIndex + 1}
          </h3>
          <span className="text-sm text-gray-500">
            {currentQuestion.points} point{currentQuestion.points !== 1 ? 's' : ''}
          </span>
        </div>
        
        <p className="text-gray-900 mb-6 text-lg">{currentQuestion.question_text}</p>
        
        {renderQuestion(currentQuestion)}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="flex space-x-3">
          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-primary-400 text-white rounded-lg hover:bg-primary-500 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizTaker; 