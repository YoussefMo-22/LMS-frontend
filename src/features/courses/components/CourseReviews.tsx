import { useState } from 'react';
import { useCourseReviews, useCourseAverageRating, useSubmitReview } from '../hooks/useCourseFlow';
import LoadingSpinner from '../../../shared/components/UI/LoadingSpinner';

interface CourseReviewsProps {
  courseId: string;
  isEnrolled: boolean;
}

export default function CourseReviews({ courseId, isEnrolled }: CourseReviewsProps) {
  const { data: reviewsData, isLoading, isError, refetch } = useCourseReviews(courseId);
  const { data: avgData } = useCourseAverageRating(courseId);
  const submitReview = useSubmitReview(courseId);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (isLoading) return <LoadingSpinner text="Loading reviews..." />;
  if (isError || !reviewsData) return <div className="text-red-500">Error loading reviews.</div>;

  const reviews = reviewsData.data;
  const average = avgData?.data?.average || 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitReview.mutateAsync({ rating, comment });
    setSubmitted(true);
    setRating(0);
    setComment('');
    refetch();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Course Reviews</h2>
      <div className="mb-4 flex items-center gap-4">
        <span className="text-2xl font-bold text-yellow-500">★ {average.toFixed(1)}</span>
        <span className="text-gray-500">({reviews.length} reviews)</span>
      </div>
      <ul className="mb-6 space-y-2">
        {reviews.map((r: any) => (
          <li key={r._id} className="border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-primary-400">{r.user?.name || 'Student'}</span>
              <span className="text-yellow-500">{'★'.repeat(r.rating)}</span>
            </div>
            <div className="text-gray-700">{r.comment}</div>
          </li>
        ))}
      </ul>
      {isEnrolled && !submitted && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block font-medium mb-1">Your Rating</label>
            <select
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
              className="border rounded px-2 py-1"
              required
            >
              <option value={0}>Select rating</option>
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              rows={2}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary-400 text-white px-4 py-2 rounded font-semibold hover:bg-primary-500 transition"
            disabled={submitReview.isPending}
          >
            {submitReview.isPending ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
      {submitted && <div className="text-green-600 font-semibold mt-2">Thank you for your review!</div>}
    </div>
  );
} 