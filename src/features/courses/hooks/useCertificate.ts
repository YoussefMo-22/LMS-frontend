import { useQuery, useMutation } from '@tanstack/react-query';
import { certificateApi } from '../api/certificateApi';

export const useMyCertificates = () => {
  return useQuery({
    queryKey: ['certificates', 'me'],
    queryFn: () => certificateApi.getMyCertificates(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useMyCertificateForCourse = (courseId: string) => {
  return useQuery({
    queryKey: ['certificate', courseId],
    queryFn: () => certificateApi.getMyCertificateForCourse(courseId),
    enabled: !!courseId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useViewCertificate = () => {
  return useMutation({
    mutationFn: (certificateId: string) => certificateApi.viewCertificate(certificateId),
  });
};

export const useDownloadCertificate = () => {
  return useMutation({
    mutationFn: async (certificateId: string) => {
      const blob = await certificateApi.downloadCertificatePDF(certificateId);
      return { certificateId, blob };
    },
  });
}; 