import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quizApi } from '../api/quizApi';
import type { CreateQuizRequest, UpdateQuizRequest, QuizzesQueryParams } from '../types/quiz';

export const useQuizzes = (params?: QuizzesQueryParams) => {
  return useQuery({
    queryKey: ['quizzes', params],
    queryFn: () => quizApi.getQuizzes(params),
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useQuiz = (id: string) => {
  return useQuery({
    queryKey: ['quiz', id],
    queryFn: () => quizApi.getQuiz(id),
    enabled: !!id,
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateQuizRequest) => quizApi.createQuiz(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });
};

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateQuizRequest }) => 
      quizApi.updateQuiz(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      queryClient.invalidateQueries({ queryKey: ['quiz', id] });
    },
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => quizApi.deleteQuiz(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });
}; 