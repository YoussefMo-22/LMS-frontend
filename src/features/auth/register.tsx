import AuthLayout from "./components/AuthLayout";
import AuthFormField from "./components/AuthFormField";
import { Heading, SubHeading, SubText } from "../../shared/components/UI/Typography";
// import AuthFooterLink from "./components/AuthFooterLink";
import sms from "../../assets/sms.svg";
import lock from "../../assets/lock.svg";
import profile from "../../assets/profile.svg";
import signup from "../../assets/export.svg";
import microsoft from "../../assets/microsoft.svg";
import google from "../../assets/google.svg";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/login.json";
import RoleSelect from "./components/RoleSelect";
import { useState } from "react";
import ButtonUI from "../../shared/components/UI/Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSignup } from "./hooks/useAuth";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const registerMutation = useSignup();
  const { isPending: loading } = registerMutation;
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const [role] = useState<"student" | "instructor" | "admin">("student");

  const onSubmit = async (data: any) => {
    const { name, email, password, confirmPassword } = data;

    if (!name || !email || !password || !confirmPassword || !role) {
      toast.error("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await registerMutation.mutateAsync({ name, email, password, role });

    if (result && result.data?.user?._id) {
      // Success: now go to QR code step
      navigate("/verify-account", {
        state: {
          userId: result.data.user._id,
        },
      });
    } else {
      toast.error(registerMutation.error?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout slogan="Unlock your potential with every lesson" imageVector={<Lottie animationData={animationData} loop={true} />}>
      <div className="w-full max-w-md mx-auto px-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <Heading>Sign Up</Heading>
            <p>Already have an account?<Link className="font-bold text-primary-400" to={'/login'}>Login</Link></p>
          </div>
          <SubHeading>Join LevelUp Today!</SubHeading>
          <SubText>Create your account and start learning.</SubText>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <RoleSelect register={register("role")} />
          <AuthFormField type="text" placeholder="Full Name" icon={profile} {...register("name")} />
          <AuthFormField type="email" placeholder="Enter Your Email" icon={sms} {...register("email")} />
          <AuthFormField type="password" placeholder="Enter Your Password" icon={lock} {...register("password")} />
          <AuthFormField type="password" placeholder="Confirm Password" icon={lock} {...register("confirmPassword")} />
          <button className="w-full bg-primary-400 rounded-lg py-2 flex items-center justify-center gap-2 text-white" type="submit" disabled={loading}>
            <span>{loading ? "Signing Up..." : "Sign Up"}</span>
            <img src={signup} alt="login icon" className="w-5 h-5" />
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
