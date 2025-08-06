import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateSubmission, useUpdateSubmission } from '../hooks/useSubmission';
import type { Submission } from '../types/submission';

interface SubmissionFormProps {
  assignmentId: string;
  existingSubmission?: Submission;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface SubmissionFormData {
  submission_url: string;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ 
  assignmentId, 
  existingSubmission, 
  onSuccess, 
  onCancel 
}) => {
  const createSubmissionMutation = useCreateSubmission();
  const updateSubmissionMutation = useUpdateSubmission();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SubmissionFormData>({
    defaultValues: {
      submission_url: existingSubmission?.submission_url || ''
    }
  });

  const onSubmit = async (data: SubmissionFormData) => {
    try {
      if (existingSubmission) {
        await updateSubmissionMutation.mutateAsync({
          submissionId: existingSubmission._id,
          data: { submission_url: data.submission_url }
        });
      } else {
        await createSubmissionMutation.mutateAsync({
          assignmentId,
          data: { submission_url: data.submission_url }
        });
      }
      
      reset();
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  const isPastDue = existingSubmission?.assignment_id.due_date 
    ? new Date(existingSubmission.assignment_id.due_date) < new Date()
    : false;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {existingSubmission ? 'Update Submission' : 'Submit Assignment'}
      </h3>
      
      {isPastDue && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-yellow-800">
              This assignment is past due. Late submissions may not be accepted.
            </span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Submission URL *
          </label>
          <input
            type="url"
            {...register('submission_url', { 
              required: 'Submission URL is required',
              pattern: {
                value: /^https?:\/\/.+/,
                message: 'Please enter a valid URL starting with http:// or https://'
              }
            })}
            placeholder="https://example.com/your-assignment.pdf"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.submission_url && (
            <p className="text-red-500 text-sm mt-1">{errors.submission_url.message}</p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            Upload your assignment to a file sharing service (Google Drive, Dropbox, etc.) and paste the public link here.
          </p>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={
              createSubmissionMutation.isPending || 
              updateSubmissionMutation.isPending
            }
            className="flex-1 bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {createSubmissionMutation.isPending || updateSubmissionMutation.isPending 
              ? 'Submitting...' 
              : existingSubmission 
                ? 'Update Submission' 
                : 'Submit Assignment'
            }
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

export default SubmissionForm; 