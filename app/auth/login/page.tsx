"use client";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/lib/store/auth-context";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const { emailLoginHandler } = useAuth();
  const handleLogin = async (email: string, password: string) => {
    try {
      await emailLoginHandler(email, password);
      toast.success("Login Successful!");
    } catch (error) {
      toast.error("Error signing in with email and password");
    }
  };

  return (
    <div>
      <AuthForm onSubmit={handleLogin} title="Login" isLogin={true} />
    </div>
  );
};

export default Login;
