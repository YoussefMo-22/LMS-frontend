import AuthLayout from "./components/AuthLayout";
import AuthFormField from "./components/AuthFormField";
import Button from "../../shared/components/UI/Button";
import { Heading } from "../../shared/components/UI/Typography";
// import AuthFooterLink from "./components/AuthFooterLink";
import sms from "../../assets/sms.svg";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/password.json";

export default function ForgetPassword() {
    const navigate = useNavigate();
    return (
        <AuthLayout imageVector={<Lottie animationData={animationData} loop={false}/>}>
            <div className="w-full max-w-md">
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-col justify-between">
                        <Heading>Forgot your password?</Heading>
                        <p>Already have an account?<Link className="font-bold text-primary-400" to={'/login'}>Login</Link></p>
                    </div>
                    <p className="text-primary-400">Please enter your email address. We will send you a link to reset your password</p>
                </div>
                <form className="mt-6 space-y-4">
                    <AuthFormField type="email" placeholder="Enter Your Email" icon={sms} />
                    <Button className="w-full flex items-center justify-center gap-2 text-white" type="submit" onClick={() => {
                        navigate('/reset-password');}
                    }>
                        <span>Send New Password</span>
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
