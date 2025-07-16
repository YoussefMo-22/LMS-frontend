import AuthLayout from "./components/AuthLayout";
import AuthFormField from "./components/AuthFormField";
import { Heading, SubHeading, SubText } from "../../shared/components/UI/Typography";
import sms from "../../assets/sms.svg";
import lock from "../../assets/lock.svg";
import loginIcon from "../../assets/login.svg";
import microsoft from "../../assets/microsoft.svg";
import google from "../../assets/google.svg";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/login.json";
import ButtonUI from "../../shared/components/UI/Button";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./hooks/useAuth";


export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const result = await login(email, password);

  if (result?.twoFARequired) {
    toast("2FA required. Please verify your account.");
    navigate("/verify-account", {
      state: { userId: result.userId },
    });
  } else if (result?.user) {
    toast.success("Login successful!");
    navigate("/home");
  } else if (error) {
    toast.error(error);
  }
};

  return (
        <AuthLayout slogan="Level up your skills. Learn anytime, anywhere" imageVector={<Lottie animationData={animationData} loop={true} />}>
            <div className="w-full max-w-md mx-auto px-4">
                <div className="flex flex-col space-y-6">
                    <div className="flex justify-between items-center">
                        <Heading>Log In</Heading>
                        <p>Don't have an account? <Link className="font-bold text-primary-400" to={'/register'}>SignUp</Link></p>
                    </div>
                    <SubHeading>Welcome back to LevelUp!</SubHeading>
                    <SubText>Log in to continue your learning journey.</SubText>
                </div>
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    <AuthFormField type="email" placeholder="Enter Your Email" icon={sms} value={email} onChange={(e) => setEmail(e.target.value)} />
                    <AuthFormField type="password" placeholder="Enter Your Password" icon={lock} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="text-right text-sm text-blue-800">
                        <Link to="/forgot-password">Forget Password</Link>
                    </div>
                    <button className="w-full py-2 bg-primary-400 rounded-lg flex items-center justify-center gap-2 text-white" type="submit" data-testid="main-login-btn" disabled={loading}>
                        <span>{loading ? "Logining..." : "Login"}</span>
                        <img src={loginIcon} alt="login icon" className="w-5 h-5" />
                    </button>
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
