import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMyCertificates } from '../../courses/hooks/useCertificate';
import CertificateDisplay from '../../courses/components/CertificateDisplay';
import type { Certificate } from '../../courses/types/certificate';

const Certificates: React.FC = () => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  
  const { data, isLoading, error } = useMyCertificates();
  const certificates = data?.data?.certificates || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-8">
        <h2 className="text-xl font-bold mb-2">Error Loading Certificates</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Certificates | Student Dashboard</title>
        <meta name="description" content="View and download your course completion certificates" />
      </Helmet>

      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Certificates</h1>
          <p className="text-gray-600">
            View and download your course completion certificates
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Certificates</p>
              <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
            </div>
          </div>
        </div>

        {/* Certificates List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Certificates List</h2>
          </div>
          
          {certificates.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No certificates yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Complete courses to earn your certificates.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {certificates.map((certificate) => (
                <div key={certificate._id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {certificate.course_id.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Issued by {certificate.sender_id.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(certificate.issuedAt)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCertificate(certificate)}
                      className="bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 transition"
                    >
                      View Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <CertificateDisplay 
          certificate={selectedCertificate} 
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </>
  );
};

export default Certificates; 