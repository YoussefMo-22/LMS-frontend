import { axiosInstance } from '../../../api/axiosInstance';
import type { 
  QuestionsResponse, 
  QuestionResponse, 
  CreateQuestionRequest, 
  UpdateQuestionRequest, 
  QuestionsQueryParams 
} from '../types/question';

export const questionApi = {
  // Create new question
  createQuestion: async (data: CreateQuestionRequest): Promise<QuestionResponse> => {
    const response = await axiosInstance.post('api/v1/questions', data);
    return response.data;
  },

  // Get questions by quiz ID
  getQuestionsByQuiz: async (quizId: string, params?: QuestionsQueryParams): Promise<QuestionsResponse> => {
    const queryString = new URLSearchParams();
    if (params?.question_type) queryString.append('question_type', params.question_type);
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.limit) queryString.append('limit', params.limit.toString());

    const url = `api/v1/questions/quizId/${quizId}${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    const response = await axiosInstance.get(url);
    return response.data;
  },

  // Get single question
  getQuestion: async (questionId: string): Promise<QuestionResponse> => {
    const response = await axiosInstance.get(`api/v1/questions/${questionId}`);
    return response.data;
  },

  // Update question
  updateQuestion: async (questionId: string, data: UpdateQuestionRequest): Promise<QuestionResponse> => {
    const response = await axiosInstance.patch(`api/v1/questions/${questionId}`, data);
    return response.data;
  },

  // Delete question
  deleteQuestion: async (questionId: string): Promise<{ status: string; data: null }> => {
    const response = await axiosInstance.delete(`api/v1/questions/${questionId}`);
    return response.data;
  },
}; 