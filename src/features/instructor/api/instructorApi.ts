import { axiosInstance } from '../../../api/axiosInstance';

// Get instructor courses
export const getInstructorCourses = (params?: any) =>
  axiosInstance.get('courses', { params }).then(res => res.data);

// Create instructor course
export const createInstructorCourse = (data: any) =>
  axiosInstance.post('api/v1/courses', data).then(res => res.data);

// update instructor course
export const updateInstructorCourse = (courseId: string, data: any) =>
  axiosInstance.patch(`/courses/${courseId}`, data).then(res => res.data);

// get instructor course
export const getInstructorCourse = (courseId: string) =>
  axiosInstance.get(`/courses/${courseId}/forinstructor`).then(res => res.data);

// delete instructor course
export const deleteInstructorCourse = (courseId: string) =>
  axiosInstance.delete(`/courses/${courseId}`).then(res => res.data);

// Assignments
export const getAssignments = (courseId?: string) =>
  axiosInstance.get(`/assignment${courseId ? `/${courseId}/course/${courseId}` : ''}`).then(res => res.data);
export const createAssignment = (courseId: string, data: any) =>
  axiosInstance.post(`/assignment/${courseId}/course/${courseId}`, data).then(res => res.data);
export const updateAssignment = (assignmentId: string, courseId: string, data: any) =>
  axiosInstance.patch(`/assignment/${assignmentId}/course/${courseId}`, data).then(res => res.data);
export const deleteAssignment = (assignmentId: string, courseId: string) =>
  axiosInstance.delete(`/assignment/${assignmentId}/course/${courseId}`).then(res => res.data);
export const getAssignment = (assignmentId: string, courseId: string) =>
  axiosInstance.get(`/assignment/${assignmentId}/course/${courseId}`).then(res => res.data);
export const getAssignmentSubmissions = (assignmentId: string) =>
  axiosInstance.get(`/submission/assignment/${assignmentId}`).then(res => res.data); 