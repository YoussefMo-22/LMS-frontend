import React from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateSubmission } from '../hooks/useSubmission';
import type { UpdateSubmissionRequest, Submission } from '../types/submission';

interface GradingFormProps {
  submission: Submission;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface GradingFormData {
  grade: number;
  feedback: string;
}

const GradingForm: React.FC<GradingFormProps> = ({ 
  submission, 
  onSuccess, 
  onCancel 
}) => {
  const updateSubmissionMutation = useUpdateSubmission();

  const { register, handleSubmit, formState: { errors } } = useForm<GradingFormData>({
    defaultValues: {
      grade: submission.grade || 0,
      feedback: submission.feedback || ''
    }
  });

  const onSubmit = async (data: GradingFormData) => {
    try {
      await updateSubmissionMutation.mutateAsync({
        submissionId: submission._id,
        data: { 
          grade: data.grade, 
          feedback: data.feedback 
        }
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error grading submission:', error);
    }
  };

  const maxPoints = submission.assignment_id.max_points;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Grade Submission
      </h3>
      
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Student:</strong> {submission.user_id.name}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Assignment:</strong> {submission.assignment_id.title}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Max Points:</strong> {maxPoints}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Submitted:</strong> {new Date(submission.createdAt).toLocaleDateString()}
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Grade (0 - {maxPoints}) *
          </label>
          <input
            type="number"
            min="0"
            max={maxPoints}
            step="0.1"
            {...register('grade', { 
              required: 'Grade is required',
              min: { value: 0, message: 'Grade must be at least 0' },
              max: { value: maxPoints, message: `Grade cannot exceed ${maxPoints}` }
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.grade && (
            <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Feedback
          </label>
          <textarea
            {...register('feedback', { 
              maxLength: { value: 1000, message: 'Feedback must be less than 1000 characters' }
            })}
            rows={4}
            placeholder="Provide constructive feedback for the student..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.feedback && (
            <p className="text-red-500 text-sm mt-1">{errors.feedback.message}</p>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={updateSubmissionMutation.isPending}
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {updateSubmissionMutation.isPending ? 'Saving...' : 'Save Grade'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GradingForm; 