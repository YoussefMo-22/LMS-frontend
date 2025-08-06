import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {  
  Users, 
  AlertCircle,
  BarChart3,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Video,
  Star
} from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner, { GridSkeleton } from '../../../shared/components/UI/LoadingSpinner';

// Mock API functions - replace with actual API calls
const fetchInstructorStats = async () => {
  // Replace with actual API call
  const response = await fetch('/api/instructor/stats');
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};

const fetchInstructorActivity = async () => {
  // Replace with actual API call
  const response = await fetch('/api/instructor/activity');
  if (!response.ok) throw new Error('Failed to fetch activity');
  return response.json();
};

const fetchTopCourses = async () => {
  // Replace with actual API call
  const response = await fetch('/api/instructor/top-courses');
  if (!response.ok) throw new Error('Failed to fetch top courses');
  return response.json();
};

const InstructorOverview: React.FC = () => {
  const { user } = useAuth();

  // Fetch data from APIs
  const { data: statsData, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['instructorStats'],
    queryFn: fetchInstructorStats,
  });

  const { data: activityData, isLoading: activityLoading, error: activityError } = useQuery({
    queryKey: ['instructorActivity'],
    queryFn: fetchInstructorActivity,
  });

  const { data: coursesData, isLoading: coursesLoading, error: coursesError } = useQuery({
    queryKey: ['instructorTopCourses'],
    queryFn: fetchTopCourses,
  });

  // Handle loading states
  if (statsLoading || activityLoading || coursesLoading) {
    return (
      <>
        <Helmet>
          <title>Instructor Overview | LevelUp LMS</title>
          <meta name="description" content="Instructor dashboard overview with key metrics and recent activity" />
        </Helmet>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
              <p className="text-gray-600">Here's what's happening with your courses today.</p>
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
  if (statsError || activityError || coursesError) {
    return (
      <>
        <Helmet>
          <title>Instructor Overview | LevelUp LMS</title>
          <meta name="description" content="Instructor dashboard overview with key metrics and recent activity" />
        </Helmet>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
              <p className="text-gray-600">Here's what's happening with your courses today.</p>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">Error Loading Data</h3>
                <p className="text-red-700 mt-1">
                  {statsError?.message || activityError?.message || coursesError?.message || 'Failed to load dashboard data'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const stats = statsData?.stats || [];
  const recentActivity = activityData?.activity || [];
  const topCourses = coursesData?.courses || [];

  const quickActions = [
    {
      name: 'Create New Course',
      description: 'Start building a new course',
      icon: Plus,
      href: '/instructor/courses/create',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Schedule Live Session',
      description: 'Plan a live teaching session',
      icon: Video,
      href: '/instructor/live-sessions',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'View Analytics',
      description: 'Check your course performance',
      icon: BarChart3,
      href: '/instructor/analytics',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      name: 'Manage Students',
      description: 'View and manage your students',
      icon: Users,
      href: '/instructor/students',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Instructor Overview | LevelUp LMS</title>
        <meta name="description" content="Instructor dashboard overview with key metrics and recent activity" />
      </Helmet>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-gray-600">Here's what's happening with your courses today.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
            <Link
              to="/instructor/courses/create"
              className="flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Link>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat: any) => (
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
                    {stat.changeType === 'increase' ? (
                      <ArrowUpRight className="self-center flex-shrink-0 h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="self-center flex-shrink-0 h-4 w-4 text-red-500 mr-1" />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-gray-500 ml-2">{stat.description}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-xl">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className="group relative rounded-lg p-6 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <span className={`inline-flex p-3 rounded-lg ${action.color} text-white`}>
                      <action.icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-secondary-600">
                      {action.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                  <span className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400">
                    <ArrowUpRight className="h-6 w-6" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <div className="bg-white shadow rounded-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
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
            </div>
          </div>

          {/* Top Courses */}
          <div className="bg-white shadow rounded-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Top Performing Courses</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topCourses.map((course: any) => (
                  <div key={course.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-lg object-cover"
                        src={course.image}
                        alt={course.title}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {course.title}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{course.students} students</span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          {course.rating}
                        </span>
                        <span className="font-medium text-green-600">{course.revenue}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Link
                        to={`/instructor/courses/${course.id}`}
                        className="text-secondary-600 hover:text-secondary-800 text-sm font-medium"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorOverview; 