import React, { useState } from 'react';
import { useMyCertificateForCourse } from '../hooks/useCertificate';
import CertificateDisplay from './CertificateDisplay';
import type { Certificate } from '../types/certificate';

interface CertificateSectionProps {
  courseId: string;
  progress: number;
  isEnrolled: boolean;
}

const CertificateSection: React.FC<CertificateSectionProps> = ({ 
  courseId, 
  progress, 
  isEnrolled 
}) => {
  const [showCertificate, setShowCertificate] = useState(false);
  
  const { data: certificateData, isLoading, error } = useMyCertificateForCourse(courseId);
  const certificate = certificateData?.data?.certificate;

  const isCourseCompleted = progress >= 100;
  const hasCertificate = !!certificate;

  if (!isEnrolled) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="text-center text-red-600 py-8">
          <p>Error loading certificate information</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Course Certificate</h2>
          {hasCertificate && (
            <div className="flex items-center text-green-600">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Certificate Available</span>
            </div>
          )}
        </div>

        <div className="text-center">
          {!isCourseCompleted ? (
            <div className="py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Complete the Course
              </h3>
              <p className="text-gray-600 mb-4">
                You need to complete 100% of the course to earn your certificate.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-primary-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                {progress}% Complete
              </p>
            </div>
          ) : hasCertificate ? (
            <div className="py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Congratulations!
              </h3>
              <p className="text-gray-600 mb-6">
                You have successfully completed the course and earned your certificate.
              </p>
              <button
                onClick={() => setShowCertificate(true)}
                className="bg-primary-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-500 transition"
              >
                View Certificate
              </button>
            </div>
          ) : (
            <div className="py-8">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Certificate Processing
              </h3>
              <p className="text-gray-600">
                Your certificate is being generated. Please check back later.
              </p>
            </div>
          )}
        </div>
      </div>

      {showCertificate && certificate && (
        <CertificateDisplay 
          certificate={certificate} 
          onClose={() => setShowCertificate(false)}
        />
      )}
    </>
  );
};

export default CertificateSection; 