// import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
// // import RootLayout from "../app/RootLayout";
// // import Home from "../pages/Home";

import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../app/RootLayout";
import LoginPage from "../features/auth/Login";
import RegisterPage from "../features/auth/register";
import ForgetPassword from "../features/auth/ForgetPassword";
import ResetPassword from "../features/auth/ResetPassword";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route index path="/login" element={<LoginPage />}/>
        <Route index path="/forgot-password" element={<ForgetPassword />}/>
        <Route index path="/reset-password" element={<ResetPassword />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/" element={<RootLayout />}>
        </Route>
        </>
    )
)

export default router