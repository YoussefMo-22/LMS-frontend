import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/couponApi';
import type { Coupon, CouponResponse, CouponListResponse, ApplyCouponResponse } from '../types/coupon';

export const useCreateCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Coupon>) => api.createCoupon(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allCoupons'] });
    },
  });
};

export const useApplyCoupon = () =>
  useMutation({
    mutationFn: (data: { couponCode: string; courseId: string }) => api.applyCoupon(data),
  });

export const useAllCoupons = () =>
  useQuery<CouponListResponse, Error>({
    queryKey: ['allCoupons'],
    queryFn: api.getAllCoupons,
  });

export const useMyCoupons = (id: string) =>
  useQuery<CouponListResponse, Error>({
    queryKey: ['myCoupons', id],
    queryFn: () => api.getMyCoupons(id),
    enabled: !!id,
  });

export const useCoupon = (id: string) =>
  useQuery<CouponResponse, Error>({
    queryKey: ['coupon', id],
    queryFn: () => api.getCoupon(id),
    enabled: !!id,
  });

export const useUpdateCoupon = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Coupon>) => api.updateCoupon(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allCoupons'] });
      queryClient.invalidateQueries({ queryKey: ['coupon', id] });
    },
  });
};

export const useDeleteCoupon = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.deleteCoupon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allCoupons'] });
    },
  });
}; 