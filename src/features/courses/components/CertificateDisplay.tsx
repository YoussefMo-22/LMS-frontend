import React, { useState } from 'react';
import { useViewCertificate, useDownloadCertificate } from '../hooks/useCertificate';
import type { Certificate } from '../types/certificate';

interface CertificateDisplayProps {
  certificate: Certificate;
  onClose?: () => void;
}

const CertificateDisplay: React.FC<CertificateDisplayProps> = ({ certificate, onClose }) => {
  const [showWebView, setShowWebView] = useState(false);
  const [webViewContent, setWebViewContent] = useState<string>('');

  const viewCertificateMutation = useViewCertificate();
  const downloadCertificateMutation = useDownloadCertificate();

  const handleViewCertificate = async () => {
    try {
      const htmlContent = await viewCertificateMutation.mutateAsync(certificate._id);
      setWebViewContent(htmlContent);
      setShowWebView(true);
    } catch (error) {
      console.error('Error viewing certificate:', error);
    }
  };

  const handleDownloadCertificate = async () => {
    try {
      const { blob } = await downloadCertificateMutation.mutateAsync(certificate._id);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificate-${certificate.course_id.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (showWebView) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Certificate View</h2>
            <button
              onClick={() => setShowWebView(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div 
            className="border border-gray-200 rounded-lg p-4"
            dangerouslySetInnerHTML={{ __html: webViewContent }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Certificate of Completion</h2>
        <p className="text-gray-600">This is to certify that you have successfully completed</p>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {certificate.course_id.title}
        </h3>
        <p className="text-gray-600">
          Issued by {certificate.sender_id.name}
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Issued on {formatDate(certificate.issuedAt)}
        </p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleViewCertificate}
            disabled={viewCertificateMutation.isPending}
            className="bg-primary-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-500 disabled:bg-gray-300 transition"
          >
            {viewCertificateMutation.isPending ? 'Loading...' : 'View Certificate'}
          </button>
          <button
            onClick={handleDownloadCertificate}
            disabled={downloadCertificateMutation.isPending}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 transition"
          >
            {downloadCertificateMutation.isPending ? 'Downloading...' : 'Download PDF'}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateDisplay; 