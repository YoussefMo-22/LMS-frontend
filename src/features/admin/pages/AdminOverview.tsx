import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  UserCheck,
  UserX,
  Award,
  Clock,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Calendar,
  Activity,
  Eye,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner, { GridSkeleton } from '../../../shared/components/UI/LoadingSpinner';

// Mock API functions - replace with actual API calls
const fetchAdminStats = async () => {
  // Replace with actual API call
  const response = await fetch('/api/admin/stats');
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};

const fetchRecentActivity = async () => {
  // Replace with actual API call
  const response = await fetch('/api/admin/activity');
  if (!response.ok) throw new Error('Failed to fetch activity');
  return response.json();
};

const fetchSystemStatus = async () => {
  // Replace with actual API call
  const response = await fetch('/api/admin/system-status');
  if (!response.ok) throw new Error('Failed to fetch system status');
  return response.json();
};

const AdminOverview: React.FC = () => {
  // Fetch data from APIs
  const { data: statsData, isLoading: statsLoading, error: statsError } = useQuery({
    queryKey: ['adminStats'],
    queryFn: fetchAdminStats,
  });

  const { data: activityData, isLoading: activityLoading, error: activityError } = useQuery({
    queryKey: ['adminActivity'],
    queryFn: fetchRecentActivity,
  });

  const { data: systemData, isLoading: systemLoading, error: systemError } = useQuery({
    queryKey: ['adminSystemStatus'],
    queryFn: fetchSystemStatus,
  });

  // Handle loading states
  if (statsLoading || activityLoading || systemLoading) {
    return (
      <>
        <Helmet>
          <title>Admin Overview | LevelUp LMS</title>
          <meta name="description" content="Admin dashboard overview with key metrics and recent activity" />
        </Helmet>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
            </div>
          </div>
          <GridSkeleton />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <LoadingSpinner variant="skeleton" className="h-64" />
            </div>
            <div className="lg:col-span-2">
              <LoadingSpinner variant="skeleton" className="h-64" />
            </div>
          </div>
        </div>
      </>
    );
  }

  // Handle errors
  if (statsError || activityError || systemError) {
    return (
      <>
        <Helmet>
          <title>Admin Overview | LevelUp LMS</title>
          <meta name="description" content="Admin dashboard overview with key metrics and recent activity" />
        </Helmet>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-medium text-red-800">Error Loading Data</h3>
                <p className="text-red-700 mt-1">
                  {statsError?.message || activityError?.message || systemError?.message || 'Failed to load dashboard data'}
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
  const systemStatus = systemData?.status || [];

  const quickActions = [
    {
      name: 'Add New User',
      description: 'Create a new user account',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Create Course',
      description: 'Add a new course to the platform',
      icon: BookOpen,
      href: '/admin/courses',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'View Analytics',
      description: 'Check platform analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      name: 'System Health',
      description: 'Monitor system status',
      icon: Activity,
      href: '/admin/system',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Overview | LevelUp LMS</title>
        <meta name="description" content="Admin dashboard overview with key metrics and recent activity" />
      </Helmet>

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your platform today.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
            <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </button>
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
                <a
                  key={action.name}
                  href={action.href}
                  className="group relative rounded-lg p-6 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <span className={`inline-flex p-3 rounded-lg ${action.color} text-white`}>
                      <action.icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary-600">
                      {action.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {action.description}
                    </p>
                  </div>
                  <span className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400">
                    <ArrowUpRight className="h-6 w-6" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-1">
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
          </div>

          {/* System Status */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-xl">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">System Status</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {systemStatus.map((status: any) => (
                    <div key={status.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          status.status === 'online' ? 'bg-green-400' : 
                          status.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{status.name}</p>
                          <p className="text-sm text-gray-500">{status.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{status.value}</p>
                        <p className="text-xs text-gray-500">{status.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOverview; 