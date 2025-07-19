import { axiosInstance } from '../../../api/axiosInstance';
import type { PaymentListResponse, InstructorEnrollmentResponse } from '../types/payment';

// Get payments with filters
export const getPayments = (params?: any) =>
  axiosInstance.get('payments/', { params }).then(res => res.data);

// Get enrollments for instructor
export const getEnrollmentsForInstructor = () =>
  axiosInstance.get('payments/enrollments-for-instructor').then(res => res.data); 