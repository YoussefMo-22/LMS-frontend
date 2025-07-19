import React, { useState } from 'react';
import { useSubmissionsByAssignment, useDeleteSubmission } from '../hooks/useSubmission';
import GradingForm from './GradingForm';
import type { Submission } from '../types/submission';

interface SubmissionsListProps {
  assignmentId: string;
}

const SubmissionsList: React.FC<SubmissionsListProps> = ({ assignmentId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    graded: '',
    ungraded: '',
    search: ''
  });
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showGradingForm, setShowGradingForm] = useState(false);

  const { data, isLoading, error } = useSubmissionsByAssignment(assignmentId, {
    page: currentPage,
    limit: 10,
    sort: '-createdAt',
    ...filters
  });

  const deleteSubmissionMutation = useDeleteSubmission();

  const submissions = data?.data?.submissions || [];
  const stats = data?.stats;
  const pagination = data?.pagination;

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleDelete = async (submissionId: string) => {
    if (window.confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
      try {
        await deleteSubmissionMutation.mutateAsync(submissionId);
      } catch (error) {
        console.error('Error deleting submission:', error);
      }
    }
  };

  const handleGrade = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowGradingForm(true);
  };

  const handleGradingSuccess = () => {
    setShowGradingForm(false);
    setSelectedSubmission(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getGradeColor = (grade: number | null, maxPoints: number) => {
    if (grade === null) return 'text-gray-500';
    const percentage = (grade / maxPoints) * 100;
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>Error loading submissions: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">
              Submissions ({stats?.total || 0})
            </h3>
            <div className="flex items-center space-x-4">
              <select
                value={filters.graded}
                onChange={(e) => handleFilterChange('graded', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="">All Submissions</option>
                <option value="true">Graded Only</option>
                <option value="false">Ungraded Only</option>
              </select>
              <input
                type="text"
                placeholder="Search feedback..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total:</span>
                <span className="ml-2 font-semibold">{stats.total}</span>
              </div>
              <div>
                <span className="text-gray-600">Graded:</span>
                <span className="ml-2 font-semibold text-green-600">{stats.graded}</span>
              </div>
              <div>
                <span className="text-gray-600">Ungraded:</span>
                <span className="ml-2 font-semibold text-yellow-600">{stats.ungraded}</span>
              </div>
              <div>
                <span className="text-gray-600">Avg Grade:</span>
                <span className="ml-2 font-semibold">{stats.averageGrade.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Submissions List */}
        <div className="divide-y divide-gray-200">
          {submissions.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions yet</h3>
              <p className="mt-1 text-sm text-gray-500">Students haven't submitted any assignments yet.</p>
            </div>
          ) : (
            submissions.map((submission) => (
              <div key={submission._id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Student Avatar */}
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      {submission.user_id.photo && submission.user_id.photo !== 'default.jpg' ? (
                        <img
                          src={submission.user_id.photo}
                          alt={submission.user_id.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>

                    {/* Submission Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {submission.user_id.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {submission.user_id.email}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-gray-500">
                              Submitted: {formatDate(submission.createdAt)}
                            </span>
                            {submission.grade !== null && (
                              <span className={`text-sm font-semibold ${getGradeColor(submission.grade, submission.assignment_id.max_points)}`}>
                                Grade: {submission.grade}/{submission.assignment_id.max_points}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Submission URL */}
                      <div className="mt-2">
                        <a
                          href={submission.submission_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:text-primary-800 underline"
                        >
                          View Submission
                        </a>
                      </div>

                      {/* Feedback */}
                      {submission.feedback && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                          <strong>Feedback:</strong> {submission.feedback}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {submission.grade === null ? (
                      <button
                        onClick={() => handleGrade(submission)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-green-700 transition"
                      >
                        Grade
                      </button>
                    ) : (
                      <button
                        onClick={() => handleGrade(submission)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 transition"
                      >
                        Edit Grade
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(submission._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} submissions
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm text-gray-700">
                  Page {currentPage} of {pagination.pages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === pagination.pages}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grading Modal */}
      {showGradingForm && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <GradingForm
              submission={selectedSubmission}
              onSuccess={handleGradingSuccess}
              onCancel={() => setShowGradingForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SubmissionsList; 