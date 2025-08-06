import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/enrollmentApi';
import type { EnrollmentListResponse } from '../types/enrollment';
import { axiosInstance } from '../../../api/axiosInstance';

export interface Enrollment {
  _id: string;
  user_id: string;
  course_id: any; // Course object or ID
  progress: number;
  status: 'active' | 'completed' | 'cancelled';
  enrolled_at: string;
  completed_at?: string;
}

// 1. Create Enrollment (for students)
export const useCreateEnrollment = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ couponCode, success_url, cancel_url }: { couponCode?: string; success_url?: string; cancel_url?: string }) =>
      api.createEnrollment(courseId, { couponCode, success_url, cancel_url }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myEnrollments'] });
    },
  });
};

// 2. Get Enrollments for a Course (Admin)
export const useCourseEnrollmentsAdmin = (courseId: string) =>
  useQuery<EnrollmentListResponse, Error>({
    queryKey: ['adminCourseEnrollments', courseId],
    queryFn: () => api.getCourseEnrollmentsAdmin(courseId),
    enabled: !!courseId,
  });

// 3. Get All Enrollments (Admin)
export const useAllEnrollmentsAdmin = () =>
  useQuery<EnrollmentListResponse, Error>({
    queryKey: ['adminAllEnrollments'],
    queryFn: api.getAllEnrollmentsAdmin,
  });

// 4. Get All Enrollments for a User (Instructor)
export const useUserEnrollmentsInstructor = (userId: string) =>
  useQuery<EnrollmentListResponse, Error>({
    queryKey: ['instructorUserEnrollments', userId],
    queryFn: () => api.getUserEnrollmentsInstructor(userId),
    enabled: !!userId,
  });

export const useMyEnrollments = () => {
  return useQuery({
    queryKey: ['my-enrollments'],
    queryFn: async () => {
      const response = await axiosInstance.get('enrollments/my');
      return response.data;
    },
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 