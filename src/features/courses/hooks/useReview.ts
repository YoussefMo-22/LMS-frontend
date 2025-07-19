import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewApi } from '../api/reviewApi';
import type { CreateReviewRequest, UpdateReviewRequest, ReviewsQueryParams } from '../types/review';

export const useReviewsByCourse = (courseId: string, params?: ReviewsQueryParams) => {
  return useQuery({
    queryKey: ['reviews', courseId, params],
    queryFn: () => reviewApi.getReviewsByCourse(courseId, params),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useReview = (reviewId: string) => {
  return useQuery({
    queryKey: ['review', reviewId],
    queryFn: () => reviewApi.getReview(reviewId),
    enabled: !!reviewId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCourseAverageRating = (courseId: string) => {
  return useQuery({
    queryKey: ['courseAverageRating', courseId],
    queryFn: () => reviewApi.getCourseAverageRating(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ courseId, data }: { courseId: string; data: CreateReviewRequest }) => 
      reviewApi.createReview(courseId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ['courseAverageRating', variables.courseId] });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: string; data: UpdateReviewRequest }) => 
      reviewApi.updateReview(reviewId, data),
    onSuccess: (_, { reviewId }) => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['review', reviewId] });
      queryClient.invalidateQueries({ queryKey: ['courseAverageRating'] });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (reviewId: string) => reviewApi.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['courseAverageRating'] });
    },
  });
}; 