import { axiosInstance } from '../../../api/axiosInstance';

// Course Details
export const getCourseDetails = (courseId: string) =>
  axiosInstance.get(`/courses/${courseId}`).then(res => res.data);

// Lessons for a course
export const getCourseLessons = (courseId: string) =>
  axiosInstance.get(`/lessons/course/${courseId}`).then(res => res.data);

// Single lesson
export const getLesson = (lessonId: string) =>
  axiosInstance.get(`/lessons/${lessonId}`).then(res => res.data);

// Mark lesson as complete
export const markLessonComplete = (lessonId: string) =>
  axiosInstance.post(`/lessons/${lessonId}/mark`).then(res => res.data);

// Enroll in course
export const enrollInCourse = (courseId: string, data: any) =>
  axiosInstance.post(`/enrollments/${courseId}`, data).then(res => res.data);

// Apply coupon
export const applyCoupon = (data: any) =>
  axiosInstance.post('/coupons/apply', data).then(res => res.data);

// Quizzes
export const getCourseQuizzes = (courseId: string) =>
  axiosInstance.get(`/quizzes/${courseId}`).then(res => res.data);
export const getQuiz = (quizId: string) =>
  axiosInstance.get(`/quizzes/${quizId}`).then(res => res.data);
export const submitQuizAttempt = (data: any) =>
  axiosInstance.post('/quiz-attemp', data).then(res => res.data);
export const getQuizAttempts = (quizId: string) =>
  axiosInstance.get(`/quiz-attemp/quiz/${quizId}`).then(res => res.data);

// Assignments
export const getCourseAssignments = (courseId: string) =>
  axiosInstance.get(`/assignment/${courseId}/course/${courseId}`).then(res => res.data);
export const submitAssignment = (assignmentId: string, data: any) =>
  axiosInstance.post(`/submission/assignment/${assignmentId}`, data).then(res => res.data);
export const getAssignmentSubmissions = (assignmentId: string) =>
  axiosInstance.get(`/submission/assignment/${assignmentId}`).then(res => res.data);
export const getSubmission = (submissionId: string) =>
  axiosInstance.get(`/submission/${submissionId}`).then(res => res.data);
export const getMySubmission = (assignmentId: string) =>
  axiosInstance.get(`/submission/getmysubmission/assignment/${assignmentId}`).then(res => res.data);

// Certificates
export const getCertificate = (courseId: string) =>
  axiosInstance.get(`/certificates/${courseId}`).then(res => res.data);
export const viewCertificate = (certificateId: string) =>
  axiosInstance.get(`/certificates/view/${certificateId}`).then(res => res.data);
export const downloadCertificatePdf = (certificateId: string) =>
  axiosInstance.get(`/certificates/pdf/${certificateId}`, { responseType: 'blob' });

// Reviews
export const getCourseReviews = (courseId: string) =>
  axiosInstance.get(`/review/course/${courseId}`).then(res => res.data);
export const getCourseAverageRating = (courseId: string) =>
  axiosInstance.get(`/review/course/${courseId}/average`).then(res => res.data);
export const submitReview = (courseId: string, data: any) =>
  axiosInstance.post(`/review/course/${courseId}`, data).then(res => res.data); 