import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/courseApi';

const defaultStaleTime = 1000 * 60 * 5; // 5 minutes
const defaultGcTime = 1000 * 60 * 30; // 30 minutes

export const useCourseDetails = (courseId: string) =>
  useQuery({
    queryKey: ['course', courseId],
    queryFn: () => api.getCourseDetails(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useCourseLessons = (courseId: string) =>
  useQuery({
    queryKey: ['lessons', courseId],
    queryFn: () => api.getCourseLessons(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useLesson = (lessonId: string) =>
  useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => api.getLesson(lessonId),
    enabled: !!lessonId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useMarkLessonComplete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: string) => api.markLessonComplete(lessonId),
    onSuccess: (_, lessonId) => {
      queryClient.invalidateQueries({ queryKey: ['lesson', lessonId] });
      // Optionally invalidate course progress
    },
  });
};

export const useEnrollInCourse = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.enrollInCourse(courseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
      // Optionally invalidate enrollment/progress
    },
  });
};

export const useApplyCoupon = () => useMutation({ mutationFn: api.applyCoupon });

export const useCourseQuizzes = (courseId: string) =>
  useQuery({
    queryKey: ['quizzes', courseId],
    queryFn: () => api.getCourseQuizzes(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useQuiz = (quizId: string) =>
  useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => api.getQuiz(quizId),
    enabled: !!quizId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useSubmitQuizAttempt = () => useMutation({ mutationFn: api.submitQuizAttempt });
export const useQuizAttempts = (quizId: string) =>
  useQuery({
    queryKey: ['quizAttempts', quizId],
    queryFn: () => api.getQuizAttempts(quizId),
    enabled: !!quizId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useCourseAssignments = (courseId: string) =>
  useQuery({
    queryKey: ['assignments', courseId],
    queryFn: () => api.getCourseAssignments(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useSubmitAssignment = () => useMutation({ mutationFn: ({ assignmentId, data }: { assignmentId: string, data: any }) => api.submitAssignment(assignmentId, data) });
export const useAssignmentSubmissions = (assignmentId: string) =>
  useQuery({
    queryKey: ['assignmentSubmissions', assignmentId],
    queryFn: () => api.getAssignmentSubmissions(assignmentId),
    enabled: !!assignmentId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useSubmission = (submissionId: string) =>
  useQuery({
    queryKey: ['submission', submissionId],
    queryFn: () => api.getSubmission(submissionId),
    enabled: !!submissionId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useMySubmission = (assignmentId: string) =>
  useQuery({
    queryKey: ['mySubmission', assignmentId],
    queryFn: () => api.getMySubmission(assignmentId),
    enabled: !!assignmentId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useCertificate = (courseId: string) =>
  useQuery({
    queryKey: ['certificate', courseId],
    queryFn: () => api.getCertificate(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useViewCertificate = (certificateId: string) =>
  useQuery({
    queryKey: ['viewCertificate', certificateId],
    queryFn: () => api.viewCertificate(certificateId),
    enabled: !!certificateId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useDownloadCertificatePdf = (certificateId: string) =>
  useQuery({
    queryKey: ['certificatePdf', certificateId],
    queryFn: () => api.downloadCertificatePdf(certificateId),
    enabled: !!certificateId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useCourseReviews = (courseId: string) =>
  useQuery({
    queryKey: ['reviews', courseId],
    queryFn: () => api.getCourseReviews(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useCourseAverageRating = (courseId: string) =>
  useQuery({
    queryKey: ['averageRating', courseId],
    queryFn: () => api.getCourseAverageRating(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useSubmitReview = (courseId: string) => useMutation({ mutationFn: (data: any) => api.submitReview(courseId, data) }); 