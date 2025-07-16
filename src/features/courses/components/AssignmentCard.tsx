import { useState } from 'react';
import { useCourseAssignments, useSubmitAssignment, useMySubmission } from '../hooks/useCourseFlow';
import LoadingSpinner from '../../../shared/components/UI/LoadingSpinner';

interface AssignmentCardProps {
  assignmentId: string;
}

export default function AssignmentCard({ assignmentId }: AssignmentCardProps) {
  const { data: assignmentData, isLoading, isError } = useCourseAssignments(assignmentId);
  const { data: mySubmission } = useMySubmission(assignmentId);
  const submitAssignment = useSubmitAssignment();
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (isLoading) return <LoadingSpinner text="Loading assignment..." />;
  if (isError || !assignmentData) return <div className="text-red-500">Error loading assignment.</div>;

  const assignment = assignmentData.data[0] || assignmentData.data; // handle array or object

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setSubmitting(true);
    const formData = new FormData();
    formData.append('file', file);
    await submitAssignment.mutateAsync({ assignmentId, data: formData });
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-yellow-50 p-4 rounded mb-4">
      <h3 className="font-semibold mb-2">Assignment: {assignment.title}</h3>
      <div className="mb-2">{assignment.description}</div>
      {mySubmission && mySubmission.data && (
        <div className="mb-2 text-green-700 font-medium">You have submitted this assignment.</div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="file" onChange={handleFileChange} className="mb-2" />
        <button
          type="submit"
          className="bg-primary-400 text-white px-4 py-2 rounded font-semibold hover:bg-primary-500 transition"
          disabled={submitting || submitted}
        >
          {submitting ? 'Submitting...' : submitted ? 'Submitted' : 'Submit Assignment'}
        </button>
      </form>
      {/* Optionally show feedback/grade */}
    </div>
  );
} 