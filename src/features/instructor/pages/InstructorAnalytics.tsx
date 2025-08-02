import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {  
  TrendingUp, 
  Users, 
  DollarSign, 
  BookOpen, 
  Award,
  Download,
  AlertCircle,
  Star
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner, { GridSkeleton } from '../../../shared/components/UI/LoadingSpinner';

// Mock API functions - replace with actual API calls
const fetchAnalyticsData = async () => {
  // Replace with actual API call
  const response = await fetch('/api/instructor/analytics');
  if (!response.ok) throw new Error('Failed to fetch analytics');
  return response.json();
};

const fetchCoursePerformance = async () => {
  // Replace with actual API call
  const response = await fetch('/api/instructor/course-performance');
  if (!response.ok) throw new Error('Failed to fetch course performance');
  return response.json();
};

const fetchStudentEngagement = async () => {
  // Replace with actual API call
  const response = await fetch('/api/instructor/student-engagement');
  if (!response.ok) throw new Error('Failed to fetch student engagement');
  return response.json();
};

const InstructorAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Fetch analytics data from APIs
  const { data: analyticsData, isLoading: analyticsLoading, error: analyticsError } = useQuery({
    queryKey: ['instructorAnalytics', timeRange],
    queryFn: fetchAnalyticsData,
  });

  const { data: performanceData, isLoading: performanceLoading, error: performanceError } = useQuery({
    queryKey: ['instructorCoursePerformance', timeRange],
    queryFn: fetchCoursePerformance,
  });

  const { data: engagementData, isLoading: engagementLoading, error: engagementError } = useQuery({
    queryKey: ['instructorStudentEngagement', timeRange],
    queryFn: fetchStudentEngagement,
  });

  // Handle loading states
  if (analyticsLoading || performanceLoading || engagementLoading) {
    return (
      <>
        <Helmet>
          <title>Instructor Analytics | LevelUp LMS</title>
          <meta name="description" content="Instructor analytics and performance metrics" />
        </Helmet>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your course performance and student engagement</p>
            </div>
          </div>
          <GridSkeleton />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <LoadingSpinner variant="skeleton" className="h-64" />
            <LoadingSpinner variant="skeleton" className="h-64" />
          </div>
        </div>
      </>
    );
  }

  // Handle errors
  if (analyticsError || performanceError || engagementError) {
    return (
      <>
        <Helmet>
          <title>Instructor Analytics | LevelUp LMS</title>
          <meta name="description" content="Instructor analytics and performance metrics" />
        </Helmet>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your course performance and student engagement</p>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">Error Loading Analytics</h3>
                <p className="text-red-700 mt-1">
                  {analyticsError?.message || performanceError?.message || engagementError?.message || 'Failed to load analytics data'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const analytics = analyticsData?.analytics || {};
  const coursePerformance = performanceData?.performance || [];
  const studentEngagement = engagementData?.engagement || [];

  const overviewStats = [
    {
      name: 'Total Revenue',
      value: analytics.totalRevenue || '$0',
      change: analytics.revenueChange || '+0%',
      changeType: analytics.revenueChange?.startsWith('+') ? 'increase' : 'decrease',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Total Students',
      value: analytics.totalStudents || '0',
      change: analytics.studentsChange || '+0%',
      changeType: analytics.studentsChange?.startsWith('+') ? 'increase' : 'decrease',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Course Completion Rate',
      value: analytics.completionRate || '0%',
      change: analytics.completionChange || '+0%',
      changeType: analytics.completionChange?.startsWith('+') ? 'increase' : 'decrease',
      icon: Award,
      color: 'bg-purple-500'
    },
    {
      name: 'Average Rating',
      value: analytics.averageRating || '0.0',
      change: analytics.ratingChange || '+0%',
      changeType: analytics.ratingChange?.startsWith('+') ? 'increase' : 'decrease',
      icon: Star,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Instructor Analytics | LevelUp LMS</title>
        <meta name="description" content="Instructor analytics and performance metrics" />
      </Helmet>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your course performance and student engagement</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {overviewStats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-xl">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} rounded-lg p-3`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <span className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium ${
                    stat.changeType === 'increase' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    <TrendingUp className="self-center flex-shrink-0 h-4 w-4 mr-1" />
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Course Performance */}
          <div className="bg-white shadow rounded-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Course Performance</h3>
            </div>
            <div className="p-6">
              {coursePerformance.length > 0 ? (
                <div className="space-y-4">
                  {coursePerformance.map((course: any) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={course.image}
                          alt={course.title}
                        />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{course.title}</h4>
                          <p className="text-sm text-gray-500">{course.students} students</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{course.revenue}</p>
                        <p className="text-xs text-gray-500">{course.completionRate}% completion</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No course data</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Course performance data will appear here
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Student Engagement */}
          <div className="bg-white shadow rounded-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Student Engagement</h3>
            </div>
            <div className="p-6">
              {studentEngagement.length > 0 ? (
                <div className="space-y-4">
                  {studentEngagement.map((metric: any) => (
                    <div key={metric.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          metric.status === 'high' ? 'bg-green-400' :
                          metric.status === 'medium' ? 'bg-yellow-400' : 'bg-red-400'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{metric.name}</p>
                          <p className="text-sm text-gray-500">{metric.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{metric.value}</p>
                        <p className="text-xs text-gray-500">{metric.change}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No engagement data</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Student engagement metrics will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="bg-white shadow rounded-xl">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Detailed Metrics</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{analytics.totalCourses || '0'}</div>
                <div className="text-sm text-gray-500">Total Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{analytics.activeStudents || '0'}</div>
                <div className="text-sm text-gray-500">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{analytics.totalLessons || '0'}</div>
                <div className="text-sm text-gray-500">Total Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{analytics.totalAssignments || '0'}</div>
                <div className="text-sm text-gray-500">Total Assignments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{analytics.totalQuizzes || '0'}</div>
                <div className="text-sm text-gray-500">Total Quizzes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{analytics.totalReviews || '0'}</div>
                <div className="text-sm text-gray-500">Total Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorAnalytics; 