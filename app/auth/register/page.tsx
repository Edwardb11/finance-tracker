"use client";
import AuthForm from "@/components/auth/AuthForm";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/store/auth-context";

const SignUp: React.FC = () => {
  const { emailRegisterHandler } = useAuth();

  const handleSignUpSubmit = async (
    email: string,
    password: string,
    username: string = ""
  ) => {
    try {
      await emailRegisterHandler(email, password, username);
      toast.success("Sign Up Successful!");
    } catch (error) {
      toast.error("Error signing up with email and password");
    }
  };

  return (
    <AuthForm title="Sign Up" onSubmit={handleSignUpSubmit} isLogin={false} />
  );
};

export default SignUp;
