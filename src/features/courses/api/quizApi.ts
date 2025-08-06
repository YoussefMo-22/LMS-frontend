import { axiosInstance } from '../../../api/axiosInstance';
import type { CreateQuizRequest } from '../types/quiz';

export const quizApi = {
  // Create Quiz
  createQuiz: async (data: CreateQuizRequest): Promise<any> => {
    const response = await axiosInstance.post('api/v1/quizzes', data);
    return response.data;
  },

  // Get Quizzes for Course
  getCourseQuizzes: (courseId: string): Promise<any> =>
    axiosInstance.get(`api/v1/quizzes/course/${courseId}`).then(res => res.data),

  // Get Single Quiz
  getQuiz: (quizId: string): Promise<any> =>
    axiosInstance.get(`api/v1/quizzes/${quizId}`).then(res => res.data),

  // Get Quizzes with filters
  getQuizzes: (params?: any): Promise<any> =>
    axiosInstance.get('api/v1/quizzes', { params }).then(res => res.data),

  // Update Quiz
  updateQuiz: (quizId: string, data: any): Promise<any> =>
    axiosInstance.put(`api/v1/quizzes/${quizId}`, data).then(res => res.data),

  // Delete Quiz
  deleteQuiz: (quizId: string): Promise<any> =>
    axiosInstance.delete(`api/v1/quizzes/${quizId}`).then(res => res.data),

  // Get Quiz Questions
  getQuizQuestions: (quizId: string): Promise<any> =>
    axiosInstance.get(`api/v1/quizzes/${quizId}/questions`).then(res => res.data),

  // Add Question to Quiz
  addQuizQuestion: (quizId: string, data: any): Promise<any> =>
    axiosInstance.post(`api/v1/quizzes/${quizId}/questions`, data).then(res => res.data),

  // Update Quiz Question
  updateQuizQuestion: (quizId: string, questionId: string, data: any): Promise<any> =>
    axiosInstance.put(`api/v1/quizzes/${quizId}/questions/${questionId}`, data).then(res => res.data),

  // Delete Quiz Question
  deleteQuizQuestion: (quizId: string, questionId: string): Promise<any> =>
    axiosInstance.delete(`api/v1/quizzes/${quizId}/questions/${questionId}`).then(res => res.data),

  // Submit Quiz Attempt
  submitQuizAttempt: (quizId: string, data: any): Promise<any> =>
    axiosInstance.post(`api/v1/quizzes/${quizId}/attempt`, data).then(res => res.data),

  // Get Quiz Attempts
  getQuizAttempts: (quizId: string): Promise<any> =>
    axiosInstance.get(`api/v1/quizzes/${quizId}/attempts`).then(res => res.data),

  // Get My Quiz Attempts
  getMyQuizAttempts: (quizId: string): Promise<any> =>
    axiosInstance.get(`api/v1/quizzes/${quizId}/my-attempts`).then(res => res.data),

  // Get Quiz Results
  getQuizResults: (attemptId: string): Promise<any> =>
    axiosInstance.get(`api/v1/quiz-attempts/${attemptId}/results`).then(res => res.data),
};

// Also export individual functions for backward compatibility
export const createQuiz = quizApi.createQuiz;
export const getCourseQuizzes = quizApi.getCourseQuizzes;
export const getQuiz = quizApi.getQuiz;
export const updateQuiz = quizApi.updateQuiz;
export const deleteQuiz = quizApi.deleteQuiz;
export const getQuizQuestions = quizApi.getQuizQuestions;
export const addQuizQuestion = quizApi.addQuizQuestion;
export const updateQuizQuestion = quizApi.updateQuizQuestion;
export const deleteQuizQuestion = quizApi.deleteQuizQuestion;
export const submitQuizAttempt = quizApi.submitQuizAttempt;
export const getQuizAttempts = quizApi.getQuizAttempts;
export const getMyQuizAttempts = quizApi.getMyQuizAttempts;
export const getQuizResults = quizApi.getQuizResults; 