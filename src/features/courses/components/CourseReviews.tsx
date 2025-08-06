import ReviewsSection from './ReviewsSection';

interface CourseReviewsProps {
  courseId: string;
  isEnrolled: boolean;
}

export default function CourseReviews({ courseId, isEnrolled }: CourseReviewsProps) {
  return (
    <div className="mb-8">
      <ReviewsSection 
        courseId={courseId} 
        isEnrolled={isEnrolled}
      />
    </div>
  );
} 