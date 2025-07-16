// router.tsx
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import React from "react";

// Lazy-loaded pages
const RootLayout = lazy(() => import("../app/RootLayout"));
const DashboardLayout = lazy(() => import("../features/dashboard/layout/DashboardLayout"));
const InstructorDashboardLayout = lazy(() => import("../features/instructor/layout/InstructorDashboardLayout"));
const InstructorCourses = lazy(() => import("../features/instructor/pages/InstructorCourses"));
const InstructorCourseEditor = lazy(() => import("../features/instructor/pages/InstructorCourseEditor"));
const InstructorAssignments = lazy(() => import("../features/instructor/pages/InstructorAssignments"));
const InstructorQuizzes = lazy(() => import("../features/instructor/pages/InstructorQuizzes"));
const InstructorCoupons = lazy(() => import("../features/instructor/pages/InstructorCoupons"));
const InstructorAnalytics = lazy(() => import("../features/instructor/pages/InstructorAnalytics"));

const LandingPage = lazy(() => import("../features/landing/LandingPage"));
const HomePage = lazy(() => import("../features/Home/HomePage"));
const CourseDetails = lazy(() => import("../features/courses/pages/CourseDetails"));
const CourseVideoPage = lazy(() => import("../features/courses/pages/CourseVideoPage"));
const QuizPage = lazy(() => import("../features/courses/pages/QuizPage"));
const Checkout = lazy(() => import("../features/courses/pages/Checkout"));
const CourseLivePage = lazy(() => import("../features/courses/pages/CourseLivePage"));
const Courses = lazy(() => import("../features/courses/pages/Courses"));
const SearchPage = lazy(() => import("../shared/components/SearchPage"));

const LoginPage = lazy(() => import("../features/auth/Login"));
const RegisterPage = lazy(() => import("../features/auth/register"));
const ForgetPassword = lazy(() => import("../features/auth/ForgetPassword"));
const ResetPassword = lazy(() => import("../features/auth/ResetPassword"));
const VerifyAccount = lazy(() => import("../features/auth/VerifyAccount"));
const VerifyCode = lazy(() => import("../features/auth/VerifyCode"));

// Dashboard Pages
const Overview = lazy(() => import("../features/dashboard/pages/Overview"));
const MyCourses = lazy(() => import("../features/dashboard/pages/MyCourses"));
const Assignments = lazy(() => import("../features/dashboard/pages/Assignments"));
const Messages = lazy(() => import("../features/dashboard/pages/Messages"));

// Auth & Guards
import PrivateRoute from "./PrivateRoute";
import PrivateInstructorRoute from "./PrivateInstructorRoute";

const NotFound = lazy(() => import("../shared/components/NotFound"));

const Load = (Component: React.LazyExoticComponent<any>) => (
  <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
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
      { path: "course/1", element: Load(CourseDetails) },
      { path: "course/lesson/1", element: Load(CourseVideoPage) },
      { path: "quiz/1", element: Load(QuizPage) },
      { path: "checkout", element: Load(Checkout) },
      { path: "live", element: Load(CourseLivePage) },
      { path: "courses", element: Load(Courses) },
      { path: "search", element: Load(SearchPage) },
    ],
  },
{
  path: "/dashboard",
  element: <PrivateRoute />,
  children: [
    {
      element: Load(DashboardLayout),
      children: [
        { index: true, element: Load(Overview) },
        { path: "courses", element: Load(MyCourses) },
        { path: "assignments", element: Load(Assignments) },
        { path: "messages", element: Load(Messages) },
      ],
    },
  ],
},
  { path: "/login", element: Load(LoginPage) },
  { path: "/register", element: Load(RegisterPage) },
  { path: "/forgot-password", element: Load(ForgetPassword) },
  { path: "/reset-password", element: Load(ResetPassword) },
  { path: "/verify-account", element: Load(VerifyAccount) },
  { path: "/verify-code", element: Load(VerifyCode) },
  // Instructor Dashboard
  {
    path: "/instructor",
    element: <PrivateInstructorRoute />, // Protect instructor routes
    children: [
      {
        element: Load(InstructorDashboardLayout),
        children: [
          { index: true, element: Load(InstructorCourses) },
          { path: "courses", element: Load(InstructorCourses) },
          { path: "courses/create", element: Load(InstructorCourseEditor) },
          { path: "courses/:id/edit", element: Load(InstructorCourseEditor) },
          { path: "assignments", element: Load(InstructorAssignments) },
          { path: "quizzes", element: Load(InstructorQuizzes) },
          { path: "coupons", element: Load(InstructorCoupons) },
          { path: "analytics", element: Load(InstructorAnalytics) },
        ],
      },
    ],
  },
  { path: "*", element: Load(NotFound) },
]);

export default router;
