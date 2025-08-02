import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { courseApi } from '../api/courseApi';
import type {
  CreateCourseData,
  UpdateCourseData,
  CourseFilters,
  CoursesResponse,
  SingleCourseResponse,
} from '../types';

const defaultStaleTime = 1000 * 60 * 5; // 5 minutes
const defaultGcTime = 1000 * 60 * 30; // 30 minutes

// ===== PUBLIC HOOKS =====
export const useCourseDetails = (courseId: string) =>
  useQuery({
    queryKey: ['course', courseId],
    queryFn: () => courseApi.getCourseDetails(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

// ===== INSTRUCTOR HOOKS =====
export const useInstructorCourses = (filters: CourseFilters = { page: 1, limit: 12 }) =>
  useQuery<CoursesResponse, Error>({
    queryKey: ['instructorCourses', filters],
    queryFn: () => courseApi.getInstructorCourses(filters),
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useInstructorCourse = (courseId: string) =>
  useQuery<SingleCourseResponse, Error>({
    queryKey: ['instructorCourse', courseId],
    queryFn: () => courseApi.getInstructorCourse(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCourseData) => courseApi.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructorCourses'] });
    },
  });
};

export const useUpdateInstructorCourse = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCourseData) => courseApi.updateInstructorCourse(courseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructorCourse', courseId] });
      queryClient.invalidateQueries({ queryKey: ['instructorCourses'] });
    },
  });
};

export const useDeleteInstructorCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => courseApi.deleteInstructorCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructorCourses'] });
    },
  });
};

// ===== ADMIN HOOKS =====
export const useAdminCourses = (filters: CourseFilters = { page: 1, limit: 12 }) =>
  useQuery<CoursesResponse, Error>({
    queryKey: ['adminCourses', filters],
    queryFn: () => courseApi.getAdminCourses(filters),
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useAdminCourse = (courseId: string) =>
  useQuery<SingleCourseResponse, Error>({
    queryKey: ['adminCourse', courseId],
    queryFn: () => courseApi.getAdminCourse(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useUpdateAdminCourse = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateCourseData) => courseApi.updateAdminCourse(courseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCourse', courseId] });
      queryClient.invalidateQueries({ queryKey: ['adminCourses'] });
    },
  });
};

export const useDeleteAdminCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) => courseApi.deleteAdminCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCourses'] });
    },
  });
};

// ===== REMAINING HOOKS (LESSONS, QUIZZES, ASSIGNMENTS, ETC.) =====
export const useCourseLessons = (courseId: string) =>
  useQuery({
    queryKey: ['lessons', courseId],
    queryFn: () => courseApi.getCourseLessons(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useLesson = (lessonId: string) =>
  useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => courseApi.getLesson(lessonId),
    enabled: !!lessonId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useMarkLessonComplete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: string) => courseApi.markLessonComplete(lessonId),
    onSuccess: (_, lessonId) => {
      queryClient.invalidateQueries({ queryKey: ['lesson', lessonId] });
      // Optionally invalidate course progress
    },
  });
};

export const useEnrollInCourse = (courseId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => courseApi.enrollInCourse(courseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
      // Optionally invalidate enrollment/progress
    },
  });
};

export const useApplyCoupon = () => useMutation({ mutationFn: courseApi.applyCoupon });

export const useCourseQuizzes = (courseId: string) =>
  useQuery({
    queryKey: ['quizzes', courseId],
    queryFn: () => courseApi.getCourseQuizzes(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useQuiz = (quizId: string) =>
  useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => courseApi.getQuiz(quizId),
    enabled: !!quizId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useSubmitQuizAttempt = () => useMutation({ mutationFn: courseApi.submitQuizAttempt });
export const useQuizAttempts = (quizId: string) =>
  useQuery({
    queryKey: ['quizAttempts', quizId],
    queryFn: () => courseApi.getQuizAttempts(quizId),
    enabled: !!quizId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useCourseAssignments = (courseId: string) =>
  useQuery({
    queryKey: ['assignments', courseId],
    queryFn: () => courseApi.getCourseAssignments(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useSubmitAssignment = () => useMutation({ mutationFn: ({ assignmentId, data }: { assignmentId: string, data: any }) => courseApi.submitAssignment(assignmentId, data) });
export const useAssignmentSubmissions = (assignmentId: string) =>
  useQuery({
    queryKey: ['assignmentSubmissions', assignmentId],
    queryFn: () => courseApi.getAssignmentSubmissions(assignmentId),
    enabled: !!assignmentId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useSubmission = (submissionId: string) =>
  useQuery({
    queryKey: ['submission', submissionId],
    queryFn: () => courseApi.getSubmission(submissionId),
    enabled: !!submissionId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useMySubmission = (assignmentId: string) =>
  useQuery({
    queryKey: ['mySubmission', assignmentId],
    queryFn: () => courseApi.getMySubmission(assignmentId),
    enabled: !!assignmentId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useCertificate = (courseId: string) =>
  useQuery({
    queryKey: ['certificate', courseId],
    queryFn: () => courseApi.getCertificate(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useViewCertificate = (certificateId: string) =>
  useQuery({
    queryKey: ['viewCertificate', certificateId],
    queryFn: () => courseApi.viewCertificate(certificateId),
    enabled: !!certificateId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useDownloadCertificatePdf = (certificateId: string) =>
  useQuery({
    queryKey: ['certificatePdf', certificateId],
    queryFn: () => courseApi.downloadCertificatePdf(certificateId),
    enabled: !!certificateId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });

export const useCourseReviews = (courseId: string) =>
  useQuery({
    queryKey: ['reviews', courseId],
    queryFn: () => courseApi.getCourseReviews(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useCourseAverageRating = (courseId: string) =>
  useQuery({
    queryKey: ['averageRating', courseId],
    queryFn: () => courseApi.getCourseAverageRating(courseId),
    enabled: !!courseId,
    staleTime: defaultStaleTime,
    gcTime: defaultGcTime,
  });
export const useSubmitReview = (courseId: string) => useMutation({ mutationFn: (data: any) => courseApi.submitReview(courseId, data) }); 