"use client"
import AuthForm from "@/components/auth/AuthForm";
import { toast } from "react-toastify";

const SignUp: React.FC = () => {
  const handleSignUpSubmit = (email: string, password: string) => {
    toast.success("Sign Up Successful!");
  };

  return <AuthForm  title="Sign Up" onSubmit={handleSignUpSubmit}  isLogin={false} />;
};

export default SignUp;
