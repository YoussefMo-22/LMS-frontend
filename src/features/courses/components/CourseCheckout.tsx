import { useState } from 'react';
import { useEnrollInCourse, useApplyCoupon } from '../hooks/useCourseFlow';
import LoadingSpinner from '../../../shared/components/UI/LoadingSpinner';

interface CourseCheckoutProps {
  courseId: string;
  price: number;
  isEnrolled: boolean;
  onEnrolled: () => void;
}

export default function CourseCheckout({ courseId, price, isEnrolled, onEnrolled }: CourseCheckoutProps) {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [enrolling, setEnrolling] = useState(false);

  const enrollMutation = useEnrollInCourse(courseId);
  const applyCouponMutation = useApplyCoupon();

  const handleApplyCoupon = async () => {
    setCouponError('');
    try {
      const res = await applyCouponMutation.mutateAsync({ courseId, coupon });
      setDiscount(res.discount || 0);
    } catch (err: any) {
      setCouponError(err?.response?.data?.message || 'Invalid coupon');
    }
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await enrollMutation.mutateAsync({ coupon });
      onEnrolled();
    } catch (err) {
      // handle error (toast, etc.)
    } finally {
      setEnrolling(false);
    }
  };

  if (isEnrolled) {
    return (
      <div className="space-y-4">
        <div className="text-green-600 font-semibold">You are enrolled in this course!</div>
        <button className="w-full bg-primary-400 text-white py-2 rounded font-semibold hover:bg-primary-500 transition">
          Continue Course
        </button>
        {/* TODO: Show progress bar, certificate, etc. */}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold text-primary-400">
        ${discount ? (price - discount).toFixed(2) : price.toFixed(2)}
        {discount > 0 && (
          <span className="ml-2 text-gray-400 line-through text-lg">${price.toFixed(2)}</span>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Coupon code"
          value={coupon}
          onChange={e => setCoupon(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          type="button"
          onClick={handleApplyCoupon}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          disabled={applyCouponMutation.isPending}
        >
          {applyCouponMutation.isPending ? 'Applying...' : 'Apply'}
        </button>
      </div>
      {couponError && <div className="text-red-500 text-sm">{couponError}</div>}
      <button
        className="w-full bg-primary-400 text-white py-2 rounded font-semibold hover:bg-primary-500 transition"
        onClick={handleEnroll}
        disabled={enrolling || enrollMutation.isPending}
      >
        {enrolling || enrollMutation.isPending ? <LoadingSpinner size="sm" text="Enrolling..." /> : 'Enroll Now'}
      </button>
    </div>
  );
}
