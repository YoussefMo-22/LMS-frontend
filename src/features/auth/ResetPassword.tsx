import AuthLayout from "./components/AuthLayout";
import AuthFormField from "./components/AuthFormField";
import Button from "../../shared/components/UI/Button";
import { Heading } from "../../shared/components/UI/Typography";
// import AuthFooterLink from "./components/AuthFooterLink";
import lock from "../../assets/lock.svg";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/passwordAnimation.json";

export default function ResetPassword() {
    return (
        <AuthLayout imageVector={<Lottie animationData={animationData} loop={false}/>}>
            <div className="w-full max-w-md">
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-col justify-between">
                        <Heading>Reset Your Password</Heading>
                        <p>Already have an account?<Link className="font-bold text-primary-400" to={'/login'}>Login</Link></p>
                    </div>
                    <p className="text-primary-400">Please enter a new password to access your account</p>
                </div>
                <form className="mt-6 space-y-4">
                    <AuthFormField type="password" placeholder="Enter Your Password" icon={lock} />
                    <AuthFormField type="password" placeholder="Confirm Password" icon={lock} />
                    <Button className="w-full flex items-center justify-center gap-2" type="submit">
                        <span>Update Password</span>
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
