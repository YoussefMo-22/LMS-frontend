import { useState } from 'react';
import { useCreateEnrollment } from '../hooks/useEnrollment';
import { useApplyCoupon } from '../hooks/useCoupon';
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
  const [finalPrice, setFinalPrice] = useState<number | null>(null);
  const [couponError, setCouponError] = useState('');
  const [enrollError, setEnrollError] = useState('');
  const [enrolling, setEnrolling] = useState(false);

  const enrollMutation = useCreateEnrollment(courseId);
  const applyCouponMutation = useApplyCoupon();

  const handleApplyCoupon = async () => {
    setCouponError('');
    setDiscount(0);
    setFinalPrice(null);
    if (!coupon) return;
    try {
      const res = await applyCouponMutation.mutateAsync({ couponCode: coupon, courseId });
      setDiscount(res.data.discount || 0);
      setFinalPrice(res.data.finalPrice);
    } catch (err: any) {
      setCouponError(err?.response?.data?.message || 'Invalid coupon');
      setDiscount(0);
      setFinalPrice(null);
    }
  };

const handleEnroll = async () => {
  setEnrollError('');
  setEnrolling(true);

  try {
    const isPaid = (finalPrice ?? price) > 0;
    const params = isPaid
      ? {
          success_url: 'http://localhost:5173/enroll-success',
          cancel_url: 'http://localhost:5173/enroll-cancel', // fixed typo from 'cencel'
        }
      : {};

    const res = await enrollMutation.mutateAsync({
      couponCode: coupon,
      ...params
    });

    if (res.data?.url) {
      window.location.href = res.data.url;
      return;
    }
    if (res.status === 'success') {
      onEnrolled();
    } else {
      setEnrollError(res.message || 'Enrollment failed.');
    }
  } catch (err: any) {
    setEnrollError(err?.response?.data?.message || 'Enrollment failed.');
  } finally {
    setEnrolling(false);
  }
};
  // If already enrolled, show message and button to continue

  if (isEnrolled) {
    return (
      <div className="space-y-4">
        <div className="text-green-600 font-semibold">You are enrolled in this course!</div>
        <button className="w-full bg-primary-400 text-white py-2 rounded font-semibold hover:bg-primary-500 transition">
          Continue Course
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold text-primary-400">
        ${finalPrice !== null ? finalPrice.toFixed(2) : (discount ? (price - discount).toFixed(2) : price.toFixed(2))}
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
      {enrollError && <div className="text-red-500 text-sm">{enrollError}</div>}
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
