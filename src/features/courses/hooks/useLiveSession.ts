import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/liveSessionApi';
import type { LiveSessionResponse, LiveSessionListResponse } from '../types/liveSession';

export const useCreateLiveSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.createLiveSession(data),
    onSuccess: (_data, variables) => {
      if (variables.course_id) {
        queryClient.invalidateQueries({ queryKey: ['liveSessionsByCourse', variables.course_id] });
      }
    },
  });
};

export const useLiveSessionsByCourse = (courseId: string, upcoming?: boolean) =>
  useQuery<LiveSessionListResponse, Error>({
    queryKey: ['liveSessionsByCourse', courseId, upcoming],
    queryFn: () => api.getLiveSessionsByCourse(courseId, upcoming),
    enabled: !!courseId,
  }); 