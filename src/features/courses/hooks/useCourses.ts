import { useQuery, useQueryClient } from '@tanstack/react-query';
import { courseApi } from '../api/courseApi';
import type { CourseFilters, CoursesResponse } from '../types';

export const useCourses = (filters: CourseFilters = { page: 1, limit: 12 }) => {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading: loading,
    isError,
    error,
    refetch,
  } = useQuery<CoursesResponse, Error>({
    queryKey: ['courses', filters],
    queryFn: () => courseApi.getAllCourses(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  // Prefetch next page
  const prefetchNextPage = () => {
    if (data && data.pagination && data.pagination.hasNextPage) {
      const nextFilters = { ...filters, page: (filters.page || 1) + 1 };
      queryClient.prefetchQuery({
        queryKey: ['courses', nextFilters],
        queryFn: () => courseApi.getAllCourses(nextFilters),
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
      currentPage: filters.page || 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: filters.limit || 12,
      hasNextPage: false,
      hasPrevPage: false,
    },
    refetch,
    prefetchNextPage,
  };
}; 