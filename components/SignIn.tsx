"use client"
import { useAuth } from "@/lib/store/auth-context";
import React from "react";
import { FcGoogle } from "react-icons/fc";

function SignIn() {
  const { googleLoginHandler } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await googleLoginHandler();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <h1 className="mb-6 text-6xl font-bold text-center">Welcome 👋</h1>

      <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl">
        <div className="h-52">
          <img
            className="object-cover w-full h-full"
            src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg"
            alt="Welcome Image"
          />
        </div>

        <div className="px-4 py-4">
          <h3 className="text-2xl text-center">Please sign in to continue</h3>

          <button
            onClick={handleGoogleLogin}
            className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg">
            <FcGoogle className="text-2xl" /> Google
          </button>
        </div>
      </div>
    </main>
  );
}

export default SignIn;
