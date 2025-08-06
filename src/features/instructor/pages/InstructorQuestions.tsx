import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuestionsByQuiz, useCreateQuestion, useUpdateQuestion, useDeleteQuestion } from '../../courses/hooks/useQuestion';
import { useQuiz } from '../../courses/hooks/useQuiz';
import { useForm, useFieldArray } from 'react-hook-form';
import type { QuestionType } from '../../courses/types/question';

interface QuestionFormData {
  quiz_id: string;
  question_text: string;
  question_type: QuestionType;
  options: string[];
  correct_answer: string;
  points: number;
}

const InstructorQuestions: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<QuestionType>('multiple_choice');

  const { data: quizData } = useQuiz(quizId!);
  const { data, isLoading, error } = useQuestionsByQuiz(quizId!);
  const createQuestionMutation = useCreateQuestion();
  const updateQuestionMutation = useUpdateQuestion();
  const deleteQuestionMutation = useDeleteQuestion();

  const { register, handleSubmit, reset, control, watch, formState: { errors } } = useForm<QuestionFormData>({
    defaultValues: {
      quiz_id: quizId || '',
      question_text: '',
      question_type: 'multiple_choice',
      options: ['', '', '', ''],
      correct_answer: '',
      points: 1
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options' as any
  });

  const questions = data?.data || [];
  const quiz = quizData?.data;

  const onSubmit = async (data: QuestionFormData) => {
    try {
      const questionData = {
        ...data,
        options: data.question_type === 'multiple_choice' ? data.options.filter(opt => opt.trim()) : undefined
      };

      if (editingQuestion) {
        await updateQuestionMutation.mutateAsync({
          questionId: editingQuestion._id,
          data: questionData
        });
        setEditingQuestion(null);
      } else {
        await createQuestionMutation.mutateAsync(questionData);
      }
      reset();
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  const handleEdit = (question: any) => {
    setEditingQuestion(question);
    setSelectedType(question.question_type);
    reset({
      quiz_id: quizId || '',
      question_text: question.question_text,
      question_type: question.question_type,
      options: question.options || ['', '', '', ''],
      correct_answer: question.correct_answer,
      points: question.points
    });
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
      try {
        await deleteQuestionMutation.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingQuestion(null);
    setSelectedType('multiple_choice');
    reset({
      quiz_id: quizId || '',
      question_text: '',
      question_type: 'multiple_choice',
      options: ['', '', '', ''],
      correct_answer: '',
      points: 1
    });
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setEditingQuestion(null);
    reset();
  };

  const addOption = () => {
    append('');
  };

  const removeOption = (index: number) => {
    if (fields.length > 2) {
      remove(index);
    }
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
        <h2 className="text-xl font-bold mb-2">Error Loading Questions</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Quiz Questions | Instructor Dashboard</title>
        <meta name="description" content="Manage quiz questions" />
      </Helmet>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Quiz Questions
            </h1>
            <p className="text-gray-600">
              {quiz ? `Managing questions for: ${quiz.title}` : 'Loading quiz...'}
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 transition"
          >
            + Add Question
          </button>
        </div>

        {/* Questions List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Questions ({questions.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Question
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {questions.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No questions found. Add your first question!
                    </td>
                  </tr>
                ) : (
                  questions.map((question) => (
                    <tr key={question._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900 max-w-md truncate">
                          {question.question_text}
                        </div>
                        {question.question_type === 'multiple_choice' && question.options && (
                          <div className="text-xs text-gray-500 mt-1">
                            Options: {question.options.join(', ')}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {question.question_type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {question.points} point{question.points !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(question)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(question._id)}
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
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Text
                  </label>
                  <textarea
                    {...register('question_text', { required: 'Question text is required' })}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    placeholder="Enter your question..."
                  />
                  {errors.question_text && (
                    <p className="text-red-500 text-sm mt-1">{errors.question_text.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question Type
                  </label>
                  <select
                    {...register('question_type')}
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as QuestionType)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="multiple_choice">Multiple Choice</option>
                    <option value="true_false">True/False</option>
                    <option value="short_answer">Short Answer</option>
                  </select>
                </div>

                {selectedType === 'multiple_choice' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Options
                    </label>
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-center space-x-2 mb-2">
                        <input
                          {...register(`options.${index}` as const, { required: 'Option is required' })}
                          type="text"
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                          placeholder={`Option ${index + 1}`}
                        />
                        {fields.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addOption}
                      className="text-primary-600 hover:text-primary-800 text-sm"
                    >
                      + Add Option
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correct Answer
                  </label>
                  {selectedType === 'multiple_choice' ? (
                    <select
                      {...register('correct_answer', { required: 'Correct answer is required' })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      <option value="">Select correct answer</option>
                      {watch('options')?.map((option, index) => (
                        <option key={index} value={option}>
                          {option || `Option ${index + 1}`}
                        </option>
                      ))}
                    </select>
                  ) : selectedType === 'true_false' ? (
                    <select
                      {...register('correct_answer', { required: 'Correct answer is required' })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                    >
                      <option value="">Select correct answer</option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                  ) : (
                    <input
                      {...register('correct_answer', { required: 'Correct answer is required' })}
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                      placeholder="Enter correct answer"
                    />
                  )}
                  {errors.correct_answer && (
                    <p className="text-red-500 text-sm mt-1">{errors.correct_answer.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Points
                  </label>
                  <input
                    {...register('points', { 
                      required: 'Points are required',
                      min: { value: 1, message: 'Points must be at least 1' }
                    })}
                    type="number"
                    min="1"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                  {errors.points && (
                    <p className="text-red-500 text-sm mt-1">{errors.points.message}</p>
                  )}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={createQuestionMutation.isPending || updateQuestionMutation.isPending}
                    className="flex-1 bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 disabled:bg-gray-300 transition"
                  >
                    {createQuestionMutation.isPending || updateQuestionMutation.isPending ? 'Saving...' : 'Save Question'}
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

export default InstructorQuestions; 