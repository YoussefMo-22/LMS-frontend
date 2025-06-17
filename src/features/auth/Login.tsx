import AuthLayout from "./components/AuthLayout";
import AuthFormField from "./components/AuthFormField";
import { Heading, SubHeading, SubText } from "../../shared/components/UI/Typography";
// import AuthFooterLink from "./components/AuthFooterLink";
import sms from "../../assets/sms.svg";
import lock from "../../assets/lock.svg";
import login from "../../assets/login.svg";
import microsoft from "../../assets/microsoft.svg";
import google from "../../assets/google.svg";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/login.json";
import ButtonUI from "../../shared/components/UI/Button";

export default function LoginPage() {
    return (
        <AuthLayout slogan="Level up your skills. Learn anytime, anywhere" imageVector={<Lottie animationData={animationData} loop={true}/>}>
            <div className="w-full max-w-md mx-auto px-4">
                <div className="flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <Heading>Log In</Heading>
                        <p>Don't have an account? <Link className="font-bold text-primary-400" to={'/register'}>SignUp</Link></p>
                    </div>
                    <SubHeading>Welcome back to LevelUp!</SubHeading>
                    <SubText>Log in to continue your learning journey.</SubText>
                </div>
                <form className="mt-6 space-y-4">
                    <AuthFormField type="email" placeholder="Enter Your Email" icon={sms} />
                    <AuthFormField type="password" placeholder="Enter Your Password" icon={lock} />
                    <div className="text-right text-sm text-blue-800">
                        <Link to="/forgot-password">Forget Password</Link>
                    </div>
                    <ButtonUI className="w-full flex items-center justify-center gap-2 text-white" type="submit">
                        <span>Login</span>
                        <img src={login} alt="login icon" className="w-5 h-5" />
                    </ButtonUI>
                </form>
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-gray-500 text-sm">Or with</span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>

                <div className="mt-6 flex flex-col space-y-2">
                    <ButtonUI className="w-full flex items-center justify-center gap-2 text-primary-400 font-medium bg-transparent border-2 border-primary-400 hover:bg-transparent" type="submit">
                        <img src={google} alt="login icon" className="w-5 h-5" />
                        <span>Log in with Google</span>
                    </ButtonUI>
                    <ButtonUI className="w-full flex items-center justify-center gap-2 text-primary-400 font-medium bg-transparent border-2 border-primary-400 hover:bg-transparent" type="submit">
                        <img src={microsoft} alt="login icon" className="w-5 h-5" />
                        <span>Log in with Microsoft</span>
                    </ButtonUI>
                </div>
                {/* <AuthFooterLink text="Don't have an account?" to="/signup" linkText="Sign Up" /> */}
            </div>
        </AuthLayout>
    );
}
