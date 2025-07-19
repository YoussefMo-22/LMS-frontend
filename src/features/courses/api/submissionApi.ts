import { axiosInstance } from '../../../api/axiosInstance';
import type { 
  SubmissionsResponse, 
  SubmissionResponse, 
  MySubmissionResponse,
  CreateSubmissionRequest, 
  UpdateSubmissionRequest,
  SubmissionsQueryParams
} from '../types/submission';

export const submissionApi = {
  // Create submission for an assignment
  createSubmission: async (assignmentId: string, data: CreateSubmissionRequest): Promise<SubmissionResponse> => {
    const response = await axiosInstance.post(`/api/v1/submission/assignment/${assignmentId}`, data);
    return response.data;
  },

  // Get all submissions for an assignment (instructor view)
  getSubmissionsByAssignment: async (assignmentId: string, params?: SubmissionsQueryParams): Promise<SubmissionsResponse> => {
    const queryString = new URLSearchParams();
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.limit) queryString.append('limit', params.limit.toString());
    if (params?.sort) queryString.append('sort', params.sort);
    if (params?.graded) queryString.append('graded', params.graded);
    if (params?.ungraded) queryString.append('ungraded', params.ungraded);
    if (params?.search) queryString.append('search', params.search);

    const url = `/api/v1/submission/assignment/${assignmentId}${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    const response = await axiosInstance.get(url);
    return response.data;
  },

  // Get single submission
  getSubmission: async (submissionId: string): Promise<SubmissionResponse> => {
    const response = await axiosInstance.get(`/api/v1/submission/${submissionId}`);
    return response.data;
  },

  // Update submission
  updateSubmission: async (submissionId: string, data: UpdateSubmissionRequest): Promise<SubmissionResponse> => {
    const response = await axiosInstance.patch(`/api/v1/submission/${submissionId}`, data);
    return response.data;
  },

  // Delete submission
  deleteSubmission: async (submissionId: string): Promise<{ status: string; data: null }> => {
    const response = await axiosInstance.delete(`/api/v1/submission/${submissionId}`);
    return response.data;
  },

  // Get my submission for a specific assignment
  getMySubmissionForAssignment: async (assignmentId: string): Promise<MySubmissionResponse> => {
    const response = await axiosInstance.get(`/api/v1/submission/getmysubmission/assignment/${assignmentId}`);
    return response.data;
  },

  // Get all my submissions
  getMySubmissions: async (params?: SubmissionsQueryParams): Promise<SubmissionsResponse> => {
    const queryString = new URLSearchParams();
    if (params?.page) queryString.append('page', params.page.toString());
    if (params?.limit) queryString.append('limit', params.limit.toString());
    if (params?.sort) queryString.append('sort', params.sort);
    if (params?.graded) queryString.append('graded', params.graded);
    if (params?.ungraded) queryString.append('ungraded', params.ungraded);
    if (params?.assignmentId) queryString.append('assignmentId', params.assignmentId);

    const url = `/api/v1/submission/get/my-submissions${queryString.toString() ? `?${queryString.toString()}` : ''}`;
    const response = await axiosInstance.get(url);
    return response.data;
  },
}; 