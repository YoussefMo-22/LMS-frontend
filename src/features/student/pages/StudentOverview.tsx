import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../auth/context/AuthContext';
import { useMyEnrollments } from '../../courses/hooks/useEnrollment';
import { useMySubmissions } from '../../courses/hooks/useSubmission';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner, { GridSkeleton } from '../../../shared/components/UI/LoadingSpinner';
import {
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Mock API functions - replace with actual API calls
const fetchStudentStats = async () => {
  // Replace with actual API call
  const response = await fetch('/api/student/stats');
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};

const fetchStudentActivity = async () => {
  // Replace with actual API call
  const response = await fetch('/api/student/activity');
  if (!response.ok) throw new Error('Failed to fetch activity');
  return response.json();
};

const StudentOverview: React.FC = () => {
  const { user } = useAuth();
  const { data: enrollmentsData, isLoading: enrollmentsLoading, error: enrollmentsError } = useMyEnrollments();
  const { data: submissionsData, isLoading: submissionsLoading, error: submissionsError } = useMySubmissions();

  // Fetch additional data from APIs
  const { data: statsData, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['studentStats'],
    queryFn: fetchStudentStats,
  });

  const { data: activityData, isLoading: activityLoading, error: activityError } = useQuery({
    queryKey: ['studentActivity'],
    queryFn: fetchStudentActivity,
  });

  const enrollments = enrollmentsData?.data ? 
    ('enrollments' in enrollmentsData.data ? enrollmentsData.data.enrollments : enrollmentsData.data) 
    : [];
  
  const submissions = submissionsData?.data ? 
    ('submissions' in submissionsData.data ? submissionsData.data.submissions : submissionsData.data) 
    : [];

  // Calculate statistics
  const totalCourses = enrollments.length;
  const completedCourses = enrollments.filter((enrollment: any) => 
    enrollment.progress >= 100
  ).length;
  const inProgressCourses = totalCourses - completedCourses;
  const pendingAssignments = submissions.filter((submission: any) => 
    submission.status === 'pending'
  ).length;

  const recentCourses = enrollments.slice(0, 3);
  // const recentSubmissions = submissions.slice(0, 5);

  // Handle loading states
  if (enrollmentsLoading || submissionsLoading || statsLoading || activityLoading) {
    return (
      <>
        <Helmet>
          <title>Student Dashboard | LevelUp LMS</title>
          <meta name="description" content="Student dashboard overview" />
        </Helmet>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-primary-100">Continue your learning journey and track your progress</p>
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
  if (enrollmentsError || submissionsError || statsError || activityError) {
    return (
      <>
        <Helmet>
          <title>Student Dashboard | LevelUp LMS</title>
          <meta name="description" content="Student dashboard overview" />
        </Helmet>
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-primary-100">Continue your learning journey and track your progress</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">Error Loading Data</h3>
                <p className="text-red-700 mt-1">
                  {enrollmentsError?.message || submissionsError?.message || statsError?.message || activityError?.message || 'Failed to load dashboard data'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const stats = statsData?.stats || [
    {
      name: 'Total Courses',
      value: totalCourses,
      icon: BookOpen,
      color: 'bg-blue-500',
      change: '+2 this month',
      changeType: 'increase'
    },
    {
      name: 'Completed',
      value: completedCourses,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: `${Math.round((completedCourses / totalCourses) * 100) || 0}% completion rate`,
      changeType: 'increase'
    },
    {
      name: 'In Progress',
      value: inProgressCourses,
      icon: Clock,
      color: 'bg-yellow-500',
      change: 'Active learning',
      changeType: 'increase'
    },
    {
      name: 'Pending Assignments',
      value: pendingAssignments,
      icon: AlertCircle,
      color: 'bg-red-500',
      change: 'Need attention',
      changeType: pendingAssignments > 0 ? 'decrease' : 'increase'
    },
  ];

  const recentActivity = activityData?.activity || [];

  return (
    <>
      <Helmet>
        <title>Student Dashboard | LevelUp LMS</title>
        <meta name="description" content="Student dashboard overview" />
      </Helmet>

      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-primary-100">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat: any) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${stat.color} rounded-md p-3`}>
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
                    {stat.changeType === 'increase' ? (
                      <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="self-center flex-shrink-0 h-4 w-4 text-red-500 mr-1" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Courses */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Courses</h3>
            </div>
            <div className="p-6">
              {recentCourses.length > 0 ? (
                <div className="space-y-4">
                  {recentCourses.map((enrollment: any) => {
                    const course = typeof enrollment.course_id === 'object' ? enrollment.course_id : null;
                    return (
                      <div key={enrollment._id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={course?.image || '/placeholder-course.jpg'}
                            alt={course?.title || 'Course'}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {course?.title || 'Course Title'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Progress: {enrollment.progress || 0}%
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                            Continue
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No courses yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start by enrolling in your first course
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              {recentActivity.length > 0 ? (
                <div className="flow-root">
                  <ul className="-mb-8">
                    {recentActivity.map((activity: any, activityIdx: number) => (
                      <li key={activity.id}>
                        <div className="relative pb-8">
                          {activityIdx !== recentActivity.length - 1 ? (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className={`inline-flex h-8 w-8 rounded-full items-center justify-center ring-8 ring-white ${activity.color}`}>
                                <activity.icon className="h-5 w-5 text-white" />
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {activity.description}
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time dateTime={activity.time}>{activity.time}</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Your learning activity will appear here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentOverview; 