import { axiosInstance } from '../../../api/axiosInstance';
import type { EnrollmentListResponse } from '../types/enrollment';

// ===== ADMIN ENROLLMENT ENDPOINTS =====

// Get All Enrollments (Admin)
export const getAllEnrollmentsAdmin = (): Promise<EnrollmentListResponse> =>
  axiosInstance.get('enrollments/admin').then(res => res.data);

// Get Enrollments for a Course (Admin)
export const getCourseEnrollmentsAdmin = (courseId: string): Promise<EnrollmentListResponse> =>
  axiosInstance.get(`enrollments/course/${courseId}`).then(res => res.data);

// ===== INSTRUCTOR ENROLLMENT ENDPOINTS =====

// Get Enrollments for a User (Instructor)
export const getUserEnrollmentsInstructor = (userId: string): Promise<EnrollmentListResponse> =>
  axiosInstance.get(`enrollments/user/${userId}`).then(res => res.data);

// ===== STUDENT ENROLLMENT ENDPOINTS =====

// Get My Enrollments (Student)
export const getMyEnrollments = (): Promise<EnrollmentListResponse> =>
  axiosInstance.get('enrollments/me').then(res => res.data);

// ===== ENROLLMENT MANAGEMENT =====

// Create Enrollment (Student)
export const createEnrollment = (courseId: string, data?: { couponCode?: string; success_url?: string; cancel_url?: string }): Promise<any> =>
  axiosInstance.post(`enrollments/${courseId}`, data).then(res => res.data);

// Cancel Enrollment (Student)
export const cancelEnrollment = (courseId: string): Promise<any> =>
  axiosInstance.delete(`enrollments/${courseId}`).then(res => res.data);

// Get Enrollment Details
export const getEnrollmentDetails = (enrollmentId: string): Promise<any> =>
  axiosInstance.get(`enrollments/${enrollmentId}`).then(res => res.data);

// Update Enrollment Progress
export const updateEnrollmentProgress = (enrollmentId: string, data: { progress: number }): Promise<any> =>
  axiosInstance.patch(`enrollments/${enrollmentId}/progress`, data).then(res => res.data);

// Mark Course as Complete
export const markCourseComplete = (enrollmentId: string): Promise<any> =>
  axiosInstance.post(`enrollments/${enrollmentId}/complete`).then(res => res.data); 