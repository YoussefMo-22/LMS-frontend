// import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
// // import RootLayout from "../app/RootLayout";
// // import Home from "../pages/Home";

import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import LoginPage from "../features/auth/Login";
import RegisterPage from "../features/auth/register";
import ForgetPassword from "../features/auth/ForgetPassword";
import ResetPassword from "../features/auth/ResetPassword";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/forgot-password" element={<ForgetPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route path="/register" element={<RegisterPage />}/>
        </>
    )
)

export default router