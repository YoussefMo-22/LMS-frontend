import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/lessonApi';
import type { LessonResponse, LessonListResponse } from '../types/lesson';

export const useLesson = (lessonId: string) =>
  useQuery<LessonResponse, Error>({
    queryKey: ['lesson', lessonId],
    queryFn: () => api.getLesson(lessonId),
    enabled: !!lessonId,
  });

export const useLessonsByCourse = (courseId: string) =>
  useQuery<LessonListResponse, Error>({
    queryKey: ['lessonsByCourse', courseId],
    queryFn: () => api.getCourseLessons(courseId),
    enabled: !!courseId,
  });

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => api.createLesson(formData),
    onSuccess: (_data, variables) => {
      // Invalidate lessons for the course
      const courseId = variables.get('course_id');
      if (courseId) {
        queryClient.invalidateQueries({ queryKey: ['lessonsByCourse', courseId] });
      }
    },
  });
};

export const useUpdateLesson = (lessonId: string, courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => api.updateLesson(lessonId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesson', lessonId] });
      queryClient.invalidateQueries({ queryKey: ['lessonsByCourse', courseId] });
    },
  });
};

export const useDeleteLesson = (lessonId: string, courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.deleteLesson(lessonId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessonsByCourse', courseId] });
    },
  });
}; 