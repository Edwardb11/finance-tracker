"use client";
import { useFormik } from "formik";
import OAuth from "./OAuth";
import Link from "next/link";
import { validationSchema } from "./validation";
import CustomInput from "../input/CustomInput";

interface AuthFormProps {
  title: string;
  onSubmit: (email: string, password: string, username?: string) => void;
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, isLogin }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validationSchema: validationSchema(isLogin),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      const { email, password, username } = values;
      onSubmit(email, password, username);
      formik.resetForm();
    },
  });

  return (
    <div className="bg-white sm:bg-gray-200 min-h-screen w-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-none sm:shadow-lg px-8 sm:px-12 w-full xs:w-full sm:w-8/12 md:w-7/12 lg:w-7/12 xl:w-2/6 h-screen sm:h-auto py-8">
        <div className="text-center w-full font-bold text-3xl text-gray-600 p-4">
          {title}
        </div>
        <div
          className="w-full bg-gray-200 my-3 m-8"
          style={{ height: "1px" }}
        ></div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4 px-0 py-4">
            <CustomInput
              formik={formik}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
            />
            <CustomInput
              formik={formik}
              id="password"
              type="password"
              name="password"
              placeholder="Password"
            />
            {!isLogin && (
              <CustomInput
                formik={formik}
                id="username"
                type="text"
                name="username"
                placeholder="Username"
              />
            )}
            <div className="w-full flex flex-row">
              <button
                className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
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
