import { useState } from "react";
import QuizQuestionBox from "./QuizQuestionBox";
import QuestionPagination from "./QuestionPagination";
import ProgressBar from "./ProgressBar";

const quizData = [
  {
    question: "What is a React component?",
    answers: [
      "A JavaScript function that returns HTML",
      "An HTML file that links JS",
      "A Node.js method",
      "None of the above",
    ],
    correctAnswer: 0,
  },
  {
    question: "What does JSX stand for?",
    answers: [
      "Java Syntax Extension",
      "JavaScript XML",
      "JSON Extended",
      "None of the above",
    ],
    correctAnswer: 1,
  },
  // More questions...
];

export default function QuizLayout() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(quizData.length).fill(-1));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerSelect = (selected: number) => {
    const updated = [...answers];
    updated[currentIndex] = selected;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // optionally: send to API here
  };

  const totalAnswered = answers.filter((a) => a !== -1).length;

  if (isSubmitted) {
    return (
      <div className="bg-white h-96 flex flex-col items-center justify-center p-6 rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Quiz Submitted!</h2>
        <p className="text-gray-700">
          You’ve completed the quiz. Great job! You answered {totalAnswered} of {quizData.length} questions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <QuizQuestionBox
        question={quizData[currentIndex].question}
        options={quizData[currentIndex].answers}
        selectedAnswer={answers[currentIndex]}
        onSelect={handleAnswerSelect}
      />

      <QuestionPagination
        total={quizData.length}
        current={currentIndex}
        onChange={setCurrentIndex}
        onSubmit={handleSubmit}
      />

      <ProgressBar current={totalAnswered} total={quizData.length} />
    </div>
  );
}
