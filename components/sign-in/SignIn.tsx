"use client";
import { useAuth } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function SignIn() {
  const { googleLoginHandler, githubLoginHandler } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await googleLoginHandler();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleGithubLogin = () => {
    try {
      githubLoginHandler();
    } catch (error) {
      console.error("Error signing in with Github:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 lg:flex hidden bg-gradient-to-r bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1
            className="text-4xl font-bold mb-4 text-center"
            style={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            Finance tracker app
          </h1>
          <p className="text-xl">Expenses | Income</p>
        </div>
      </div>

      <div className="flex-1 bg-gray-200 flex justify-center items-center p-8">
        <div className="max-w-md w-full shadow-2xl p-12 ">
          <h1 className="text-4xl font-bold mb-4 text-center text-slate-600">
            Welcome👋
          </h1>
          <div className="space-y-4 ">
            <button
              onClick={handleGoogleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg flex items-center justify-center space-x-2 w-full">
              <FcGoogle className="text-2xl" />
              <span>Continue with Google</span>
            </button>
            <button
              onClick={handleGithubLogin}
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-8 py-3 rounded-lg flex items-center justify-center space-x-2 w-full">
              <FaGithub className="text-2xl" />
              <span>Continue with GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
