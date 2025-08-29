// router.tsx
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import React from "react";
import RoleBasedRouter from "./RoleBasedRouter";
import LoadingSpinner from "../shared/components/UI/LoadingSpinner";

// Lazy-loaded pages
const RootLayout = lazy(() => import("../app/RootLayout"));
const DashboardRedirector = lazy(() => import("../components/DashboardRedirector"));
const RoleTestComponent = lazy(() => import("../components/RoleTestComponent"));
const FlowTestComponent = lazy(() => import("../components/FlowTestComponent"));
const AuthDebugComponent = lazy(() => import("../components/AuthDebugComponent"));
const ProfilePage = lazy(() => import("../components/ProfilePage"));

// Student Dashboard
const StudentDashboardLayout = lazy(() => import("../features/student/layout/StudentDashboardLayout"));
const StudentOverview = lazy(() => import("../features/student/pages/StudentOverview"));
const StudentSettings = lazy(() => import("../features/student/pages/StudentSettings"));

// Instructor Dashboard
const InstructorDashboardLayout = lazy(() => import("../features/instructor/layout/InstructorDashboardLayout"));
const InstructorOverview = lazy(() => import("../features/instructor/pages/InstructorOverview"));
const InstructorCourses = lazy(() => import("../features/instructor/pages/InstructorCourses"));
const InstructorCourseEditor = lazy(() => import("../features/instructor/pages/InstructorCourseEditor"));
const InstructorAssignments = lazy(() => import("../features/instructor/pages/InstructorAssignments"));
const InstructorQuizzes = lazy(() => import("../features/instructor/pages/InstructorQuizzes"));
const InstructorQuestions = lazy(() => import("../features/instructor/pages/InstructorQuestions"));
const InstructorCoupons = lazy(() => import("../features/instructor/pages/InstructorCoupons"));
const InstructorAnalytics = lazy(() => import("../features/instructor/pages/InstructorAnalytics"));
const InstructorLessons = lazy(() => import("../features/instructor/pages/InstructorLessons"));
const InstructorLiveSessions = lazy(() => import("../features/instructor/pages/InstructorLiveSessions"));
const InstructorEarnings = lazy(() => import("../features/instructor/pages/InstructorEarnings"));
const InstructorPayments = lazy(() => import("../features/instructor/pages/InstructorPayments"));
const InstructorUserEnrollments = lazy(() => import("../features/instructor/pages/InstructorUserEnrollments"));

// Admin Dashboard
const AdminDashboardLayout = lazy(() => import("../features/admin/layout/AdminDashboardLayout"));
const AdminOverview = lazy(() => import("../features/admin/pages/AdminOverview"));
const AdminUsers = lazy(() => import("../features/admin/pages/AdminUsers"));
const AdminCourses = lazy(() => import("../features/admin/pages/AdminCourses"));
const AdminEnrollments = lazy(() => import("../features/admin/pages/AdminEnrollments"));
const AdminCourseEnrollments = lazy(() => import("../features/admin/pages/AdminCourseEnrollments"));
const AdminCoupons = lazy(() => import("../features/admin/pages/AdminCoupons"));
const AdminPayments = lazy(() => import("../features/admin/pages/AdminPayments"));
const AdminEarnings = lazy(() => import("../features/admin/pages/AdminEarnings"));
const AdminQuizzes = lazy(() => import("../features/admin/pages/AdminQuizzes"));
const AdminQuestions = lazy(() => import("../features/admin/pages/AdminQuestions"));
const AdminReviews = lazy(() => import("../features/admin/pages/AdminReviews"));
const AdminCertificates = lazy(() => import("../features/admin/pages/AdminCertificates"));

// Public Pages
const LandingPage = lazy(() => import("../features/landing/LandingPage"));
const HomePage = lazy(() => import("../features/Home/HomePage"));
const CourseDetails = lazy(() => import("../features/courses/pages/CourseDetails"));
const CourseVideoPage = lazy(() => import("../features/courses/pages/CourseVideoPage"));
const QuizPage = lazy(() => import("../features/courses/pages/QuizPage"));
const Checkout = lazy(() => import("../features/courses/pages/Checkout"));
const CourseLivePage = lazy(() => import("../features/courses/pages/CourseLivePage"));
const Courses = lazy(() => import("../features/courses/pages/Courses"));
const SearchPage = lazy(() => import("../shared/components/SearchPage"));
const EnrollSuccess = lazy(() => import("../features/courses/pages/EnrollSuccess"));
const EnrollCancel = lazy(() => import("../features/courses/pages/EnrollCancel"));

// Auth Pages
const LoginPage = lazy(() => import("../features/auth/Login"));
const RegisterPage = lazy(() => import("../features/auth/register"));
const ForgetPassword = lazy(() => import("../features/auth/ForgetPassword"));
const ResetPassword = lazy(() => import("../features/auth/ResetPassword"));
// const ResetPasswordForm = lazy(() => import("../features/auth/components/ResetPasswordForm"));
const VerifyAccount = lazy(() => import("../features/auth/VerifyAccount"));
const VerifyCode = lazy(() => import("../features/auth/VerifyCode"));

// Legacy Dashboard Pages (for backward compatibility)
// const Overview = lazy(() => import("../features/dashboard/pages/Overview"));
const MyCourses = lazy(() => import("../features/dashboard/pages/MyCourses"));
const Assignments = lazy(() => import("../features/dashboard/pages/Assignments"));
const Messages = lazy(() => import("../features/dashboard/pages/Messages"));
const Certificates = lazy(() => import("../features/dashboard/pages/Certificates"));
const MySubmissions = lazy(() => import("../features/dashboard/pages/MySubmissions"));

// Error Pages
const NotFound = lazy(() => import("../shared/components/NotFound"));
const NotAuthorized = lazy(() => import("../shared/components/NotAuthorized"));

// Account Status Pages
const AccountSuspended = lazy(() => Promise.resolve({
  default: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Suspended</h2>
        <p className="text-gray-600 mb-4">Your account has been suspended. Please contact support for assistance.</p>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
          Contact Support
        </button>
      </div>
    </div>
  )
}));

const AccountPending = lazy(() => Promise.resolve({
  default: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Pending</h2>
        <p className="text-gray-600 mb-4">Your account is pending verification. Please check your email for verification instructions.</p>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
          Resend Verification
        </button>
      </div>
    </div>
  )
}));

const AccountInactive = lazy(() => Promise.resolve({
  default: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Inactive</h2>
        <p className="text-gray-600 mb-4">Your account is currently inactive. Please contact support to reactivate your account.</p>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
          Contact Support
        </button>
      </div>
    </div>
  )
}));

const Load = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<div className="p-10 text-center"><LoadingSpinner /></div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: Load(RootLayout),
    children: [
      { path: "", element: Load(LandingPage) },
      { path: "home", element: Load(HomePage) },
      { path: "test-roles", element: Load(RoleTestComponent) },
      { path: "test-flow", element: Load(FlowTestComponent) },
      { path: "auth-debug", element: Load(AuthDebugComponent) },
      { path: "course/:id", element: Load(CourseDetails) },
      { path: "course/lesson/1", element: Load(CourseVideoPage) },
      { path: "quiz/:quizId", element: Load(QuizPage) },
      { path: "checkout", element: Load(Checkout) },
      { path: "live", element: Load(CourseLivePage) },
      { path: "courses", element: Load(Courses) },
      { path: "search", element: Load(SearchPage) },
      { path: "enroll-success", element: Load(EnrollSuccess) },
      { path: "enroll-cancel", element: Load(EnrollCancel) },
    ],
  },

  // Dashboard redirector - automatically routes users to their appropriate dashboard
  {
    path: "/dashboard",
    element: Load(DashboardRedirector),
  },

  // Student Dashboard (for 'student' role)
  {
    path: "/student-dashboard",
    element: <RoleBasedRouter allowedRoles={['student']} />,
    children: [
      {
        element: Load(StudentDashboardLayout),
        children: [
          { index: true, element: Load(StudentOverview) },
          { path: "courses", element: Load(MyCourses) },
          { path: "assignments", element: Load(Assignments) },
          { path: "messages", element: Load(Messages) },
          { path: "certificates", element: Load(Certificates) },
          { path: "submissions", element: Load(MySubmissions) },
          { path: "progress", element: Load(StudentOverview) }, // Use overview as placeholder
          { path: "calendar", element: Load(StudentOverview) }, // Use overview as placeholder
          { path: "settings", element: Load(StudentSettings) },
          { path: "profile", element: Load(ProfilePage) },
          { path: "enrolled-courses", element: Load(MyCourses) },
          { path: "completed-courses", element: Load(Certificates) },
          { path: "learning-path", element: Load(StudentOverview) },
          { path: "achievements", element: Load(StudentOverview) },
        ],
      },
    ],
  },

  // Instructor Dashboard (for 'instructor' role)
  {
    path: "/instructor",
    element: <RoleBasedRouter allowedRoles={['instructor']} />,
    children: [
      {
        element: Load(InstructorDashboardLayout),
        children: [
          { index: true, element: Load(InstructorOverview) },
          { path: "overview", element: Load(InstructorOverview) },
          { path: "courses", element: Load(InstructorCourses) },
          { path: "courses/create", element: Load(InstructorCourseEditor) },
          { path: "courses/:id/edit", element: Load(InstructorCourseEditor) },
          { path: "courses/:courseId/lessons", element: Load(InstructorLessons) },
          { path: "courses/:courseId/live-sessions", element: Load(InstructorLiveSessions) },
          { path: "assignments", element: Load(InstructorAssignments) },
          { path: "quizzes", element: Load(InstructorQuizzes) },
          { path: "quizzes/:quizId/questions", element: Load(InstructorQuestions) },
          { path: "coupons", element: Load(InstructorCoupons) },
          { path: "payments", element: Load(InstructorPayments) },
          { path: "earnings", element: Load(InstructorEarnings) },
          { path: "analytics", element: Load(InstructorAnalytics) },
          { path: "users/:userId/enrollments", element: Load(InstructorUserEnrollments) },
          { path: "students", element: Load(InstructorUserEnrollments) }, // Alias
          { path: "messages", element: Load(Messages) }, // Use existing messages component
          { path: "settings", element: Load(InstructorOverview) }, // Use overview as placeholder
          { path: "profile", element: Load(ProfilePage) },
          { path: "onboarding", element: Load(InstructorOverview) }, // Instructor onboarding
          { path: "live-sessions", element: Load(InstructorLiveSessions) },
          { path: "reviews", element: Load(InstructorOverview) },
          { path: "certificates", element: Load(InstructorOverview) },
        ],
      },
    ],
  },

  // Admin Dashboard (for 'admin' role)
  {
    path: "/admin",
    element: <RoleBasedRouter allowedRoles={['admin']} />,
    children: [
      {
        element: Load(AdminDashboardLayout),
        children: [
          { index: true, element: Load(AdminOverview) },
          { path: "overview", element: Load(AdminOverview) },
          { path: "users", element: Load(AdminUsers) },
          { path: "courses", element: Load(AdminCourses) },
          { path: "enrollments", element: Load(AdminEnrollments) },
          { path: "courses/:courseId/enrollments", element: Load(AdminCourseEnrollments) },
          { path: "coupons", element: Load(AdminCoupons) },
          { path: "payments", element: Load(AdminPayments) },
          { path: "earnings", element: Load(AdminEarnings) },
          { path: "quizzes", element: Load(AdminQuizzes) },
          { path: "quizzes/:quizId/questions", element: Load(AdminQuestions) },
          { path: "reviews", element: Load(AdminReviews) },
          { path: "certificates", element: Load(AdminCertificates) },
          { path: "assignments", element: Load(AdminEnrollments) }, // Use enrollments as placeholder
          { path: "analytics", element: Load(AdminEarnings) }, // Use earnings as placeholder
          { path: "system", element: Load(AdminEarnings) }, // Use earnings as placeholder
          { path: "security", element: Load(AdminEarnings) }, // Use earnings as placeholder
          { path: "database", element: Load(AdminEarnings) }, // Use earnings as placeholder
          { path: "logs", element: Load(AdminEarnings) }, // Use earnings as placeholder
          { path: "settings", element: Load(AdminEarnings) }, // Use earnings as placeholder
          { path: "profile", element: Load(ProfilePage) },
          { path: "user-management", element: Load(AdminUsers) },
          { path: "course-management", element: Load(AdminCourses) },
          { path: "revenue-analytics", element: Load(AdminEarnings) },
          { path: "platform-analytics", element: Load(AdminEarnings) },
        ],
      },
    ],
  },

  // Auth routes
  {
    path: "/login",
    element: Load(LoginPage),
  },
  {
    path: "/register",
    element: Load(RegisterPage),
  },
  {
    path: "/forgot-password",
    element: Load(ForgetPassword),
  },
  {
    path: "/reset-password",
    element: Load(ResetPassword),
  },
  {
    path: "/verify-account",
    element: Load(VerifyAccount),
  },
  {
    path: "/verify-code",
    element: Load(VerifyCode),
  },

  // Account status pages
  {
    path: "/account-suspended",
    element: Load(AccountSuspended),
  },
  {
    path: "/account-pending",
    element: Load(AccountPending),
  },
  {
    path: "/account-inactive",
    element: Load(AccountInactive),
  },

  // Error routes
  {
    path: "/not-authorized",
    element: Load(NotAuthorized),
  },
  {
    path: "*",
    element: Load(NotFound),
  },
]);

export default router;
