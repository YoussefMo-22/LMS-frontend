import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../../api/axiosInstance';
import type { Course, CoursesResponse } from '../types';

const fetchCourses = async (page: number = 1, limit: number = 12): Promise<CoursesResponse> => {
  const response = await axiosInstance.get<CoursesResponse>('/courses/', {
    params: { page, limit },
  });
  return response.data;
};

export const useCourses = (page: number = 1, limit: number = 12) => {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading: loading,
    isError,
    error,
    refetch,
  } = useQuery<CoursesResponse, Error>({
    queryKey: ['courses', page, limit],
    queryFn: () => fetchCourses(page, limit),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  // Prefetch next page
  const prefetchNextPage = () => {
    if (data && data.pagination && data.pagination.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: ['courses', page + 1, limit],
        queryFn: () => fetchCourses(page + 1, limit),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
      });
    }
  };

  return {
    courses: data && data.data && data.data.courses ? data.data.courses : [],
    loading,
    error: isError ? (error as Error).message : null,
    pagination: data && data.pagination ? data.pagination : {
      currentPage: page,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: limit,
      hasNextPage: false,
      hasPrevPage: false,
    },
    refetch,
    prefetchNextPage,
  };
}; 