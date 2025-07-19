import { useQuery } from '@tanstack/react-query';
import * as api from '../api/paymentApi';
import type { PaymentListResponse, InstructorEnrollmentResponse } from '../types/payment';

export const useAllPayments = (params?: any) =>
  useQuery<PaymentListResponse, Error>({
    queryKey: ['allPayments', params],
    queryFn: () => api.getAllPayments(params),
  });

export const useInstructorEnrollments = () =>
  useQuery<InstructorEnrollmentResponse, Error>({
    queryKey: ['instructorEnrollments'],
    queryFn: api.getInstructorEnrollments,
  }); 