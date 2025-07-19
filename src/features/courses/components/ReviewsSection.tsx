import React, { useState } from 'react';
import { useReviewsByCourse, useCourseAverageRating } from '../hooks/useReview';
import ReviewsList from './ReviewsList';
import ReviewForm from './ReviewForm';
import type { Review } from '../types/review';

interface ReviewsSectionProps {
  courseId: string;
  userReview?: Review;
  isEnrolled?: boolean;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ 
  courseId, 
  userReview, 
  isEnrolled = false 
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const { data: averageRatingData } = useCourseAverageRating(courseId);
  const { data: reviewsData } = useReviewsByCourse(courseId, { limit: 5 });

  const averageRating = averageRatingData?.data;
  const reviews = reviewsData?.data || [];

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const getRatingText = (rating: number) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Very Good';
    if (rating >= 3.5) return 'Good';
    if (rating >= 3.0) return 'Fair';
    if (rating >= 2.0) return 'Poor';
    return 'No ratings yet';
  };

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    setEditingReview(null);
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
    setEditingReview(null);
  };

  return (
    <div className="space-y-6">
      {/* Average Rating Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {averageRating?.avgRating ? averageRating.avgRating.toFixed(1) : '0.0'}
            </div>
            <div className="flex justify-center mb-2">
              {renderStars(averageRating?.avgRating || 0, 'lg')}
            </div>
            <p className="text-sm text-gray-600">
              {getRatingText(averageRating?.avgRating || 0)}
            </p>
            <p className="text-sm text-gray-500">
              {averageRating?.numReviews || 0} reviews
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="md:col-span-2">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = averageRating?.numReviews 
                  ? (count / averageRating.numReviews) * 100 
                  : 0;
                
                return (
                  <div key={rating} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 w-8">{rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Review Action Button */}
        {isEnrolled && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            {userReview ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">You reviewed this course</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {renderStars(userReview.rating)}
                    <span className="text-sm text-gray-500">
                      {new Date(userReview.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleEditReview(userReview)}
                  className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                >
                  Edit Review
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 transition"
              >
                Write a Review
              </button>
            )}
          </div>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm
          courseId={courseId}
          existingReview={editingReview || undefined}
          onSuccess={handleReviewSuccess}
          onCancel={handleCancelReview}
        />
      )}

      {/* Reviews List */}
      <ReviewsList courseId={courseId} />
    </div>
  );
};

export default ReviewsSection; 