// import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
// // import RootLayout from "../app/RootLayout";
// // import Home from "../pages/Home";

import { createBrowserRouter} from "react-router-dom";
import LoginPage from "../features/auth/Login";
import RegisterPage from "../features/auth/register";
import ForgetPassword from "../features/auth/ForgetPassword";
import ResetPassword from "../features/auth/ResetPassword";
import RootLayout from "../app/RootLayout";
import LandingPage from "../features/landing/LandingPage";
import HomePage from "../features/Home/HomePage";
import CourseDetails from "../features/courses/pages/CourseDetails";
import CourseVideoPage from "../features/courses/pages/CourseVideoPage";
import QuizPage from "../features/courses/pages/QuizPage";
import Checkout from "../features/courses/pages/Checkout";
import CourseLivePage from "../features/courses/pages/CourseLivePage";
import Courses from "../features/courses/pages/Courses";
import SearchPage from "../shared/components/SearchPage";

const router =

    createBrowserRouter([
        {
            path: "/",
            element: <RootLayout />,
            children: [
                {
                    path: "/",
                    element: <LandingPage />,
                },
                {
                    path: "/home",
                    element: <HomePage />,
                },
                {
                    path: "course/1",
                    element: <CourseDetails />,
                },
                {
                    path: "course/lesson/1",
                    element: <CourseVideoPage />,
                },
                {
                    path: "quiz/1",
                    element: <QuizPage />,
                },
                {
                    path: "checkout",
                    element: <Checkout />,
                },
                {
                    path: "live",
                    element: <CourseLivePage />,
                },
                {
                    path: "courses",
                    element: <Courses />,
                },
                {
                    path: "search",
                    element: <SearchPage />,
                }
            ]
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/forgot-password",
            element: <ForgetPassword />,
        },
        {
            path: "/reset-password",
            element: <ResetPassword />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        }
        ])

export default router