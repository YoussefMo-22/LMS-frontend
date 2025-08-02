import { useQuery } from '@tanstack/react-query';
import { earningApi } from '../api/earningApi';

export const useInstructorEarnings = () => {
  return useQuery({
    queryKey: ['instructor-earnings'],
    queryFn: earningApi.getAllInstructorEarnings,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useInstructorEarningsByCourse = (courseId: string) => {
  return useQuery({
    queryKey: ['instructor-earnings', courseId],
    queryFn: () => earningApi.getInstructorEarningsByCourse({ courseId }),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useInstructorEarningsByInstructor = (courseId: string, instructorId: string) => {
  return useQuery({
    queryKey: ['instructor-earnings', courseId, instructorId],
    queryFn: () => earningApi.getInstructorEarningsByInstructor({ courseId, instructorId }),
    enabled: !!courseId && !!instructorId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}; 