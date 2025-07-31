import { axiosInstance } from '../../../api/axiosInstance';
import type { Course, CourseFilters, CreateCourseData, UpdateCourseData } from '../types';

export const courseApi = {
  // Get all courses with filters
  getAllCourses: (filters: CourseFilters) =>
    axiosInstance.get('api/v1/courses/', { params: filters }).then(res => res.data),

  // Get course by ID
  getCourseById: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}`).then(res => res.data),

  // Get course details (alias for getCourseById)
  getCourseDetails: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}`).then(res => res.data),

  // Get courses for instructor
  getInstructorCourses: (filters: CourseFilters) =>
    axiosInstance.get('api/v1/courses/', { params: filters }).then(res => res.data),

  // Get single instructor course
  getInstructorCourse: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}/forinstructor`).then(res => res.data),

  // Create new course
  createCourse: (data: CreateCourseData) =>
    axiosInstance.post('api/v1/courses/', data).then(res => res.data),

  // Update course
  updateCourse: (id: string, data: UpdateCourseData) =>
    axiosInstance.put(`api/v1/courses/${id}`, data).then(res => res.data),

  // Update instructor course
  updateInstructorCourse: (id: string, data: UpdateCourseData) =>
    axiosInstance.patch(`api/v1/courses/${id}`, data).then(res => res.data),

  // Delete course
  deleteCourse: (id: string) =>
    axiosInstance.delete(`api/v1/courses/${id}`).then(res => res.data),

  // Delete instructor course
  deleteInstructorCourse: (id: string) =>
    axiosInstance.delete(`api/v1/courses/${id}`).then(res => res.data),

  // Get courses for admin
  getAdminCourses: (filters: CourseFilters) =>
    axiosInstance.get('api/v1/courses/foradmin', { params: filters }).then(res => res.data),

  // Get single admin course
  getAdminCourse: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}/foradmin`).then(res => res.data),

  // Update admin course
  updateAdminCourse: (id: string, data: UpdateCourseData) =>
    axiosInstance.patch(`api/v1/courses/${id}/foradmin`, data).then(res => res.data),

  // Delete admin course
  deleteAdminCourse: (id: string) =>
    axiosInstance.delete(`api/v1/courses/${id}/foradmin`).then(res => res.data),

  // Get course statistics
  getCourseStats: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}/stats`).then(res => res.data),

  // Get course enrollments
  getCourseEnrollments: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}/enrollments`).then(res => res.data),

  // Get course reviews
  getCourseReviews: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}/reviews`).then(res => res.data),

  // Get course average rating
  getCourseAverageRating: (id: string) =>
    axiosInstance.get(`api/v1/review/course/${id}/average`).then(res => res.data),

  // Add course review
  addCourseReview: (id: string, data: { rating: number; comment: string }) =>
    axiosInstance.post(`api/v1/courses/${id}/reviews`, data).then(res => res.data),

  // Update course review
  updateCourseReview: (courseId: string, reviewId: string, data: { rating: number; comment: string }) =>
    axiosInstance.put(`api/v1/courses/${courseId}/reviews/${reviewId}`, data).then(res => res.data),

  // Delete course review
  deleteCourseReview: (courseId: string, reviewId: string) =>
    axiosInstance.delete(`api/v1/courses/${courseId}/reviews/${reviewId}`).then(res => res.data),

  // Get course lessons
  getCourseLessons: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}/lessons`).then(res => res.data),

  // Get single lesson
  getLesson: (id: string) =>
    axiosInstance.get(`api/v1/lessons/${id}`).then(res => res.data),

  // Mark lesson as complete
  markLessonComplete: (id: string) =>
    axiosInstance.post(`api/v1/lessons/${id}/mark`).then(res => res.data),

  // Get course assignments
  getCourseAssignments: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}/assignments`).then(res => res.data),

  // Submit assignment
  submitAssignment: (assignmentId: string, data: any) =>
    axiosInstance.post(`api/v1/submission/assignment/${assignmentId}`, data).then(res => res.data),

  // Get assignment submissions
  getAssignmentSubmissions: (assignmentId: string) =>
    axiosInstance.get(`api/v1/submission/assignment/${assignmentId}`).then(res => res.data),

  // Get submission
  getSubmission: (submissionId: string) =>
    axiosInstance.get(`api/v1/submission/${submissionId}`).then(res => res.data),

  // Get my submission
  getMySubmission: (assignmentId: string) =>
    axiosInstance.get(`api/v1/submission/getmysubmission/assignment/${assignmentId}`).then(res => res.data),

  // Get course quizzes
  getCourseQuizzes: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}/quizzes`).then(res => res.data),

  // Get single quiz
  getQuiz: (id: string) =>
    axiosInstance.get(`quizzes/${id}`).then(res => res.data),

  // Get quiz attempts
  getQuizAttempts: (quizId: string) =>
    axiosInstance.get(`api/v1/quiz-attemp/quiz/${quizId}`).then(res => res.data),

  // Get course live sessions
  getCourseLiveSessions: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}/live-sessions`).then(res => res.data),

  // Enroll in course
  enrollInCourse: (id: string, data?: { couponCode?: string }) =>
    axiosInstance.post(`api/v1/courses/${id}/enroll`, data).then(res => res.data),

  // Unenroll from course
  unenrollFromCourse: (id: string) =>
    axiosInstance.delete(`api/v1/courses/${id}/enroll`).then(res => res.data),

  // Get course progress
  getCourseProgress: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}/progress`).then(res => res.data),

  // Update course progress
  updateCourseProgress: (id: string, data: { lessonId: string; completed: boolean }) =>
    axiosInstance.post(`api/v1/courses/${id}/progress`, data).then(res => res.data),

  // Get course certificate
  getCourseCertificate: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}/certificate`).then(res => res.data),

  // Get certificate
  getCertificate: (courseId: string) =>
    axiosInstance.get(`api/v1/certificates/${courseId}`).then(res => res.data),

  // View certificate
  viewCertificate: (certificateId: string) =>
    axiosInstance.get(`api/v1/certificates/view/${certificateId}`).then(res => res.data),

  // Download certificate PDF
  downloadCertificatePdf: (certificateId: string) =>
    axiosInstance.get(`api/v1/certificates/pdf/${certificateId}`, { responseType: 'blob' }),

  // Apply coupon
  applyCoupon: (data: { courseId: string; couponCode: string }) =>
    axiosInstance.post('api/v1/coupons/apply', data).then(res => res.data),

  // Get course recommendations
  getCourseRecommendations: (id: string) =>
    axiosInstance.get(`api/v1/courses/${id}/recommendations`).then(res => res.data),

  // Search courses
  searchCourses: (query: string, filters?: CourseFilters) =>
    axiosInstance.get('api/v1/courses/search', { params: { q: query, ...filters } }).then(res => res.data),

  // Get popular courses
  getPopularCourses: () =>
    axiosInstance.get('api/v1/courses/popular').then(res => res.data),

  // Get featured courses
  getFeaturedCourses: () =>
    axiosInstance.get('api/v1/courses/featured').then(res => res.data),

  // Get new courses
  getNewCourses: () =>
    axiosInstance.get('api/v1/courses/new').then(res => res.data),

  // Submit quiz attempt
  submitQuizAttempt: (data: { quizId: string; answers: any[] }) =>
    axiosInstance.post('api/v1/quiz-attemp', data).then(res => res.data),

  // Submit review
  submitReview: (courseId: string, data: any) =>
    axiosInstance.post(`api/v1/review/course/${courseId}`, data).then(res => res.data),
}; 