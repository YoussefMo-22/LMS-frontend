import { axiosInstance } from '../../../api/axiosInstance';
// import type { PaymentListResponse, InstructorEnrollmentResponse } from '../types/payment';

// Get payments with filters
export const getPayments = (params?: any) =>
  axiosInstance.get('api/v1/payments/', { params }).then(res => res.data);

// Get enrollments for instructor
export const getEnrollmentsForInstructor = () =>
  axiosInstance.get('api/v1/payments/enrollments-for-instructor').then(res => res.data); 