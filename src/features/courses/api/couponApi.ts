import { axiosInstance } from '../../../api/axiosInstance';
import type {
  Coupon,
  CouponResponse,
  CouponListResponse,
  ApplyCouponResponse,
} from '../types/coupon';

// Create coupon
export const createCoupon = (data: any) =>
  axiosInstance.post('coupons/', data).then(res => res.data);

// Apply coupon
export const applyCoupon = (data: any) =>
  axiosInstance.post('coupons/apply', data).then(res => res.data);

// Get coupons
export const getCoupons = () =>
  axiosInstance.get('coupons/').then(res => res.data);

// 4. Get My Coupons (User)
export const getMyCoupons = (id: string): Promise<CouponListResponse> =>
  axiosInstance.get(`/coupons/${id}`).then(res => res.data);

// 5. Get One Coupon (Admin/Instructor)
export const getCoupon = (id: string): Promise<CouponResponse> =>
  axiosInstance.get(`/coupons/${id}`).then(res => res.data);

// 6. Update Coupon (Admin)
export const updateCoupon = (id: string, data: Partial<Coupon>): Promise<CouponResponse> =>
  axiosInstance.patch(`/coupons/${id}`, data).then(res => res.data);

// 7. Delete Coupon (Admin)
export const deleteCoupon = (id: string): Promise<CouponResponse> =>
  axiosInstance.delete(`/coupons/${id}`).then(res => res.data); 