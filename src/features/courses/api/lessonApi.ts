import { axiosInstance } from '../../../api/axiosInstance';

// ===== LESSON MANAGEMENT =====

// Create Lesson
export const createLesson = ( data: FormData): Promise<any> =>
  axiosInstance.post('api/v1/lessons/', data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => res.data);

// Get Lessons for Course
export const getCourseLessons = (courseId: string): Promise<any> =>
  axiosInstance.get(`api/v1/lessons/course/${courseId}`).then(res => res.data);

// Get Single Lesson
export const getLesson = (lessonId: string): Promise<any> =>
  axiosInstance.get(`api/v1/lessons/${lessonId}`).then(res => res.data);

// Update Lesson
export const updateLesson = (lessonId: string, data: FormData): Promise<any> =>
  axiosInstance.put(`api/v1/lessons/${lessonId}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then(res => res.data);

// Delete Lesson
export const deleteLesson = (lessonId: string): Promise<any> =>
  axiosInstance.delete(`api/v1/lessons/${lessonId}`).then(res => res.data);

// Mark Lesson as Complete
export const markLessonComplete = (lessonId: string): Promise<any> =>
  axiosInstance.post(`api/v1/lessons/${lessonId}/mark`).then(res => res.data);

// Get Lesson Progress
export const getLessonProgress = (lessonId: string): Promise<any> =>
  axiosInstance.get(`api/v1/lessons/${lessonId}/progress`).then(res => res.data);

// Update Lesson Progress
export const updateLessonProgress = (lessonId: string, data: { completed: boolean; timeSpent?: number }): Promise<any> =>
  axiosInstance.patch(`api/v1/lessons/${lessonId}/progress`, data).then(res => res.data);

// Get Lesson Notes
export const getLessonNotes = (lessonId: string): Promise<any> =>
  axiosInstance.get(`api/v1/lessons/${lessonId}/notes`).then(res => res.data);

// Add Lesson Note
export const addLessonNote = (lessonId: string, data: { content: string }): Promise<any> =>
  axiosInstance.post(`api/v1/lessons/${lessonId}/notes`, data).then(res => res.data);

// Update Lesson Note
export const updateLessonNote = (lessonId: string, noteId: string, data: { content: string }): Promise<any> =>
  axiosInstance.put(`api/v1/lessons/${lessonId}/notes/${noteId}`, data).then(res => res.data);

// Delete Lesson Note
export const deleteLessonNote = (lessonId: string, noteId: string): Promise<any> =>
  axiosInstance.delete(`api/v1/lessons/${lessonId}/notes/${noteId}`).then(res => res.data); 
