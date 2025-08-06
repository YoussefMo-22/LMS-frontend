import { axiosInstance } from '../../../api/axiosInstance';
import type { LiveSessionListResponse } from '../types/liveSession';

// Create live session
export const createLiveSession = (data: any) =>
  axiosInstance.post('/api/v1/live-sessions/', data).then(res => res.data);

// 2. Get Live Sessions by Course
export const getLiveSessionsByCourse = (courseId: string, upcoming?: boolean): Promise<LiveSessionListResponse> =>
  axiosInstance.get(`/api/v1/live-sessions/${courseId}`, { params: upcoming !== undefined ? { upcoming } : {} }).then(res => res.data); 