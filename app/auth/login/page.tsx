"use client";
import AuthForm from "@/components/auth/AuthForm";

const Login: React.FC = () => {
  const handleLogin = async (email: string, password: string) => {
    try {
      console.log(email,password);
    } catch (error) {
    }
  };

  return (
    <div>
      <AuthForm onSubmit={handleLogin} title="Login" isLogin={true} />
    </div>
  );
};

export default Login;
