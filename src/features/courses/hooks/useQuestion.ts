import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { questionApi } from '../api/questionApi';
import type { CreateQuestionRequest, UpdateQuestionRequest, QuestionsQueryParams } from '../types/question';

export const useQuestionsByQuiz = (quizId: string, params?: QuestionsQueryParams) => {
  return useQuery({
    queryKey: ['questions', quizId, params],
    queryFn: () => questionApi.getQuestionsByQuiz(quizId, params),
    enabled: !!quizId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useQuestion = (questionId: string) => {
  return useQuery({
    queryKey: ['question', questionId],
    queryFn: () => questionApi.getQuestion(questionId),
    enabled: !!questionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateQuestionRequest) => questionApi.createQuestion(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['questions', variables.quiz_id] });
    },
  });
};

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ questionId, data }: { questionId: string; data: UpdateQuestionRequest }) => 
      questionApi.updateQuestion(questionId, data),
    onSuccess: (_, { questionId }) => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      queryClient.invalidateQueries({ queryKey: ['question', questionId] });
    },
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (questionId: string) => questionApi.deleteQuestion(questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}; 