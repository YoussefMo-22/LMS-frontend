import { axiosInstance } from '../../../api/axiosInstance';
import type { CertificatesResponse, CertificateResponse } from '../types/certificate';

export const certificateApi = {
  // Get all certificates for the authenticated user
  getMyCertificates: async (): Promise<CertificatesResponse> => {
    const response = await axiosInstance.get('api/v1/certificates/me');
    return response.data;
  },

  // Get certificate for a specific course
  getMyCertificateForCourse: async (courseId: string): Promise<CertificateResponse> => {
    const response = await axiosInstance.get(`api/v1/certificates/${courseId}`);
    return response.data;
  },

  // View certificate as web page
  viewCertificate: async (certificateId: string): Promise<string> => {
    const response = await axiosInstance.get(`api/v1/certificates/view/${certificateId}`, {
      responseType: 'text'
    });
    return response.data;
  },

  // Download certificate as PDF
  downloadCertificatePDF: async (certificateId: string): Promise<Blob> => {
    const response = await axiosInstance.get(`api/v1/certificates/pdf/${certificateId}`, {
      responseType: 'blob'
    });
    return response.data;
  },
}; 