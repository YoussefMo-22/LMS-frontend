import { axiosInstance } from '../../../api/axiosInstance';
import type { 
  ReviewsResponse, 
  ReviewResponse, 
  CreateReviewRequest, 
  UpdateReviewRequest, 
  ReviewsQueryParams,
  CourseAverageRatingResponse
} from '../types/review';

export const reviewApi = {
  // Create review for a course
  createReview: async (courseId: string, data: CreateReviewRequest): Promise<ReviewResponse> => {
    const response = await axiosInstance.post(`/api/v1/reviews/course/${courseId}`, data);
    return response.data;
  },

  // Get all reviews for a course
  getReviewsByCourse: async (courseId: string, params?: ReviewsQueryParams): Promise<ReviewsResponse> => {
    const queryString = new URLSearchParams();
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.limit) queryString.append('limit', params.limit.toString());
    if (params?.sort) queryString.append('sort', params.sort);

    const url = `/api/v1/reviews/course/${courseId}${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    const response = await axiosInstance.get(url);
    return response.data;
  },

  // Get single review
  getReview: async (reviewId: string): Promise<ReviewResponse> => {
    const response = await axiosInstance.get(`/api/v1/reviews/${reviewId}`);
    return response.data;
  },

  // Update review
  updateReview: async (reviewId: string, data: UpdateReviewRequest): Promise<ReviewResponse> => {
    const response = await axiosInstance.patch(`/api/v1/reviews/${reviewId}`, data);
    return response.data;
  },

  // Delete review
  deleteReview: async (reviewId: string): Promise<{ status: string; data: null }> => {
    const response = await axiosInstance.delete(`/api/v1/reviews/${reviewId}`);
    return response.data;
  },

  // Get average rating for a course
  getCourseAverageRating: async (courseId: string): Promise<CourseAverageRatingResponse> => {
    const response = await axiosInstance.get(`/api/v1/review/course/${courseId}/average`);
    return response.data;
  },
}; 