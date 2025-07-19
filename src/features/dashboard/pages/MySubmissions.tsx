import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMySubmissions } from '../../courses/hooks/useSubmission';
import SubmissionForm from '../../courses/components/SubmissionForm';
import type { Submission } from '../../courses/types/submission';

const MySubmissions: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    graded: '',
    ungraded: '',
    assignmentId: ''
  });
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);

  const { data, isLoading, error } = useMySubmissions();

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

  const handleEditSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowSubmissionForm(true);
  };

  const handleSubmissionSuccess = () => {
    setShowSubmissionForm(false);
    setSelectedSubmission(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  const isPastDue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
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
        <h2 className="text-xl font-bold mb-2">Error Loading Submissions</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Submissions | Student Dashboard</title>
        <meta name="description" content="View and manage your assignment submissions" />
      </Helmet>

      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Submissions</h1>
          <p className="text-gray-600">
            View and manage your assignment submissions
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.graded}
                onChange={(e) => handleFilterChange('graded', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <option value="">All Submissions</option>
                <option value="true">Graded Only</option>
                <option value="false">Ungraded Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assignment ID
              </label>
              <input
                type="text"
                value={filters.assignmentId}
                onChange={(e) => handleFilterChange('assignmentId', e.target.value)}
                placeholder="Filter by assignment ID"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Graded</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.graded || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.ungraded || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.averageGrade ? `${stats.averageGrade.toFixed(1)}%` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Submissions List</h2>
          </div>
          
          {submissions.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No submissions yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't submitted any assignments yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {submissions.map((submission: Submission) => (
                <div key={submission._id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {submission.assignment_id.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Course: {submission.assignment_id.course_id?.title || 'N/A'}
                          </p>
                        </div>
                        <div className="text-right">
                          {submission.grade !== null ? (
                            <span className={`text-lg font-bold ${getGradeColor(submission.grade, submission.assignment_id.max_points)}`}>
                              {submission.grade}/{submission.assignment_id.max_points}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">Not graded</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <strong>Submitted:</strong> {formatDate(submission.createdAt)}
                        </div>
                        <div>
                          <strong>Due Date:</strong> {formatDate(submission.assignment_id.due_date)}
                          {isPastDue(submission.assignment_id.due_date) && (
                            <span className="ml-2 text-red-600 text-xs">(Past Due)</span>
                          )}
                        </div>
                        <div>
                          <strong>Max Points:</strong> {submission.assignment_id.max_points}
                        </div>
                      </div>

                      <div className="mb-3">
                        <a
                          href={submission.submission_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-800 underline text-sm"
                        >
                          View Submission
                        </a>
                      </div>

                      {submission.feedback && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <strong className="text-sm text-gray-700">Feedback:</strong>
                          <p className="text-sm text-gray-700 mt-1">{submission.feedback}</p>
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      {!isPastDue(submission.assignment_id.due_date) && (
                        <button
                          onClick={() => handleEditSubmission(submission)}
                          className="bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 transition"
                        >
                          Edit Submission
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="px-3 py-2 text-gray-700">
                Page {currentPage} of {pagination.pages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Submission Form Modal */}
      {showSubmissionForm && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <SubmissionForm
              assignmentId={selectedSubmission.assignment_id._id}
              existingSubmission={selectedSubmission}
              onSuccess={handleSubmissionSuccess}
              onCancel={() => setShowSubmissionForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MySubmissions; 