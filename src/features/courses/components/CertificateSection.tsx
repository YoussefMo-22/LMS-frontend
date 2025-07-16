import { useCertificate, useDownloadCertificatePdf } from '../hooks/useCourseFlow';

interface CertificateSectionProps {
  courseId: string;
  progress: number;
  isEnrolled: boolean;
}

export default function CertificateSection({ courseId, progress, isEnrolled }: CertificateSectionProps) {
  const { data: certData, isLoading } = useCertificate(courseId);
  const downloadPdf = useDownloadCertificatePdf(certData?.data?._id);

  if (!isEnrolled || progress < 100) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Certificate of Completion</h2>
      {isLoading ? (
        <div>Loading certificate...</div>
      ) : certData?.data ? (
        <div className="flex flex-col gap-2">
          <a
            href={`/certificates/view/${certData.data._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 underline font-semibold"
          >
            View Certificate
          </a>
          <button
            className="bg-primary-400 text-white px-4 py-2 rounded font-semibold hover:bg-primary-500 transition w-fit"
            onClick={() => {
              if (downloadPdf.data) {
                const url = window.URL.createObjectURL(new Blob([downloadPdf.data.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'certificate.pdf');
                document.body.appendChild(link);
                link.click();
                link.parentNode?.removeChild(link);
              }
            }}
            disabled={downloadPdf.isLoading}
          >
            {downloadPdf.isLoading ? 'Downloading...' : 'Download PDF'}
          </button>
        </div>
      ) : (
        <div>No certificate available yet.</div>
      )}
    </div>
  );
} 