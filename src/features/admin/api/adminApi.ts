import { axiosInstance } from '../../../api/axiosInstance';

// Get all users
export const getUsers = (params?: any) =>
  axiosInstance.get('/users/', { params }).then(res => res.data);

// Get all courses for admin
export const getCourses = (params?: any) =>
  axiosInstance.get('/courses/foradmin', { params }).then(res => res.data);

// Get one course for admin
export const getCourse = (courseId: string) =>
  axiosInstance.get(`/courses/${courseId}/foradmin`).then(res => res.data);

// Update course status (admin only)
export const updateCourseStatus = (courseId: string, status: string) =>
  axiosInstance.patch(`/courses/${courseId}/foradmin`, { status }).then(res => res.data);

// Reject course (admin only)
export const rejectCourse = (courseId: string) =>
  axiosInstance.delete(`/courses/${courseId}/foradmin`).then(res => res.data); 