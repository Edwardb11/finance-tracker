import { useState } from "react";
import OAuth from "./OAuth";
import Link from "next/link";

interface AuthFormProps {
  title: string;
  onSubmit: (email: string, password: string) => void;
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, isLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="bg-white sm:bg-gray-200 min-h-screen w-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-none sm:shadow-lg px-8 sm:px-12 w-full xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 h-screen sm:h-auto py-8">
        <div className="text-center w-full font-bold text-3xl text-gray-600 p-4">
          {title}
        </div>
        <div
          className="w-full bg-gray-200 my-3 m-8"
          style={{ height: "1px" }}></div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 px-0 py-4">
            <div>
              <label className="text-gray-700">Email address</label>
              <input
                className="py-2 pl-10 border border-gray-200 w-full text-black bg-white"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-gray-700">Password</label>
              <input
                className="py-2 pl-10 border border-gray-200 w-full text-black bg-white"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-row">
              <button className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded">
                {title}
              </button>
            </div>
            <div className="w-full flex flex-row justify-center text-indigo-900">
              {isLogin ? (
                <p>
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/register">Register</Link>
                </p>
              ) : (
                <p>
                  Already have an account? <Link href="/auth/login">Login</Link>
                </p>
              )}
            </div>
          </div>
        </form>
        <OAuth />
      </div>
    </div>
  );
};

export default AuthForm;
