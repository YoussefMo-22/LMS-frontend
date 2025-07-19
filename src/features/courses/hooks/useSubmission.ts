import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { submissionApi } from '../api/submissionApi';
import type { CreateSubmissionRequest, UpdateSubmissionRequest, SubmissionsQueryParams } from '../types/submission';
import { axiosInstance } from '../../../api/axiosInstance';

export interface Submission {
  _id: string;
  user_id: string;
  assignment_id: any; // Assignment object or ID
  course_id: any; // Course object or ID
  content: string;
  file_url?: string;
  status: 'pending' | 'approved' | 'rejected';
  grade?: number;
  feedback?: string;
  submitted_at: string;
  graded_at?: string;
}

export const useSubmissionsByAssignment = (assignmentId: string, params?: SubmissionsQueryParams) => {
  return useQuery({
    queryKey: ['submissions', assignmentId, params],
    queryFn: () => submissionApi.getSubmissionsByAssignment(assignmentId, params),
    enabled: !!assignmentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSubmission = (submissionId: string) => {
  return useQuery({
    queryKey: ['submission', submissionId],
    queryFn: () => submissionApi.getSubmission(submissionId),
    enabled: !!submissionId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMySubmissionForAssignment = (assignmentId: string) => {
  return useQuery({
    queryKey: ['mySubmission', assignmentId],
    queryFn: () => submissionApi.getMySubmissionForAssignment(assignmentId),
    enabled: !!assignmentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMySubmissions = () => {
  return useQuery({
    queryKey: ['my-submissions'],
    queryFn: async () => {
      const response = await axiosInstance.get('submissions/my');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ assignmentId, data }: { assignmentId: string; data: CreateSubmissionRequest }) => 
      submissionApi.createSubmission(assignmentId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['submissions', variables.assignmentId] });
      queryClient.invalidateQueries({ queryKey: ['mySubmission', variables.assignmentId] });
      queryClient.invalidateQueries({ queryKey: ['mySubmissions'] });
    },
  });
};

export const useUpdateSubmission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ submissionId, data }: { submissionId: string; data: UpdateSubmissionRequest }) => 
      submissionApi.updateSubmission(submissionId, data),
    onSuccess: (_, { submissionId }) => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['submission', submissionId] });
      queryClient.invalidateQueries({ queryKey: ['mySubmissions'] });
    },
  });
};

export const useDeleteSubmission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (submissionId: string) => submissionApi.deleteSubmission(submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      queryClient.invalidateQueries({ queryKey: ['mySubmissions'] });
    },
  });
}; 