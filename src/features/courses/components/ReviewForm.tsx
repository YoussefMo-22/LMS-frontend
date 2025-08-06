import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateReview, useUpdateReview } from '../hooks/useReview';
import type { Review } from '../types/review';

interface ReviewFormProps {
  courseId: string;
  existingReview?: Review;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ReviewFormData {
  rating: number;
  comment: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ 
  courseId, 
  existingReview, 
  onSuccess, 
  onCancel 
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(existingReview?.rating || 0);

  const createReviewMutation = useCreateReview();
  const updateReviewMutation = useUpdateReview();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ReviewFormData>({
    defaultValues: {
      rating: existingReview?.rating || 0,
      comment: existingReview?.comment || ''
    }
  });

  const onSubmit = async (data: ReviewFormData) => {
    try {
      if (existingReview) {
        await updateReviewMutation.mutateAsync({
          reviewId: existingReview._id,
          data: { rating: selectedRating, comment: data.comment }
        });
      } else {
        await createReviewMutation.mutateAsync({
          courseId,
          data: { rating: selectedRating, comment: data.comment }
        });
      }
      
      reset();
      setSelectedRating(0);
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setSelectedRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none"
          >
            <svg
              className={`w-8 h-8 ${
                star <= (hoveredRating || selectedRating) ? 'text-yellow-400' : 'text-gray-300'
              } transition-colors duration-200`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {selectedRating > 0 ? `${selectedRating}/5` : 'Select rating'}
        </span>
      </div>
    );
  };

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1: return 'Poor';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Very Good';
      case 5: return 'Excellent';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {existingReview ? 'Edit Your Review' : 'Write a Review'}
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="space-y-2">
            {renderStars()}
            {selectedRating > 0 && (
              <p className="text-sm text-gray-600">
                {getRatingText(selectedRating)}
              </p>
            )}
            {errors.rating && (
              <p className="text-red-500 text-sm">Please select a rating</p>
            )}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Review *
          </label>
          <textarea
            {...register('comment', { 
              required: 'Review comment is required',
              minLength: { value: 10, message: 'Review must be at least 10 characters' },
              maxLength: { value: 1000, message: 'Review must be less than 1000 characters' }
            })}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
            placeholder="Share your experience with this course..."
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={
              selectedRating === 0 || 
              createReviewMutation.isPending || 
              updateReviewMutation.isPending
            }
            className="flex-1 bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {createReviewMutation.isPending || updateReviewMutation.isPending 
              ? 'Submitting...' 
              : existingReview 
                ? 'Update Review' 
                : 'Submit Review'
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

export default ReviewForm; 