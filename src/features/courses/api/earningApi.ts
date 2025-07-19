import { axiosInstance } from '../../../api/axiosInstance';
import type { EarningsResponse, EarningsByCourseParams, EarningsByInstructorParams } from '../types/earning';

export const earningApi = {
  // Get all instructor earnings
  getAllInstructorEarnings: async (): Promise<EarningsResponse> => {
    const response = await axiosInstance.get('api/v1/instructor-earnings/');
    return response.data;
  },

  // Get instructor earnings by course
  getInstructorEarningsByCourse: async ({ courseId }: EarningsByCourseParams): Promise<EarningsResponse> => {
    const response = await axiosInstance.get(`api/v1/instructor-earnings/${courseId}`);
    return response.data;
  },

  // Get specific instructor earnings in specific course (admin only)
  getInstructorEarningsByInstructor: async ({ courseId, instructorId }: EarningsByInstructorParams): Promise<EarningsResponse> => {
    const response = await axiosInstance.get(`api/v1/instructor-earnings/course/${courseId}/instructor/${instructorId}`);
    return response.data;
  },
}; 