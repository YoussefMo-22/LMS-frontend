import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useInstructorEarningsByInstructor } from '../../courses/hooks/useEarning';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

const AdminEarnings: React.FC = () => {
  const [courseId, setCourseId] = useState<string>('');
  const [instructorId, setInstructorId] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useInstructorEarningsByInstructor(courseId, instructorId);

  const handleSearch = () => {
    if (courseId && instructorId) {
      setIsSearching(true);
      refetch();
    }
  };

  const earnings = data?.data || [];
  const totalEarnings = data?.totalEarnings || 0;
  const results = data?.results || 0;

  return (
    <>
      <Helmet>
        <title>Instructor Earnings | Admin Dashboard</title>
        <meta name="description" content="View instructor earnings and revenue analytics" />
      </Helmet>

      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Instructor Earnings</h1>
          <p className="text-gray-600">View earnings for specific instructors and courses</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Earnings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course ID
              </label>
              <input
                type="text"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                placeholder="Enter course ID"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructor ID
              </label>
              <input
                type="text"
                value={instructorId}
                onChange={(e) => setInstructorId(e.target.value)}
                placeholder="Enter instructor ID"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={!courseId || !instructorId}
                className="w-full bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {isSearching && (
          <>
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600 p-8 bg-red-50 rounded-lg">
                <h2 className="text-xl font-bold mb-2">Error Loading Earnings</h2>
                <p>{error.message}</p>
              </div>
            ) : (
              <>
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalEarnings)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                        <p className="text-2xl font-bold text-gray-900">{results}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Earnings Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Earnings Details</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Course
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Instructor
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {earnings.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                              No earnings found for this instructor and course
                            </td>
                          </tr>
                        ) : (
                          earnings.map((earning) => (
                            <tr key={earning._id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {earning.course_id.title}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {earning.instructor_id?.name || 'Unknown Instructor'}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-semibold text-green-600">
                                  {formatCurrency(earning.amount)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(earning.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AdminEarnings; 