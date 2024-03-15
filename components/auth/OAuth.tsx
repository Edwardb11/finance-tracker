import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import { useAuth } from "@/lib/store/auth-context";

function OAuth() {
  const { googleLoginHandler, githubLoginHandler, facebookLoginHandler } =
    useAuth();

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
  const handleFacbookbLogin = () => {
    try {
      facebookLoginHandler();
    } catch (error) {
      console.error("Error signing in with Github:", error);
    }
  };
  return (
    <>
      <div className="my-2 flex flex-row justify-center">
        <span className="absolute bg-white text-black px-4 mt-2">or</span>
        <div
          className="w-full bg-gray-200 mt-8"
          style={{ height: "1px" }}></div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white w-full p-2 flex flex-row justify-center gap-2 items-center hover:bg-red-600 duration-100 ease-in-out">
          <FaGoogle /> Continue with Google
        </button>
        <button
          onClick={handleFacbookbLogin}
          className="bg-blue-600 text-white w-full p-2 flex flex-row justify-center gap-2 items-center hover:bg-blue-700 duration-100 ease-in-out">
          <FaFacebook /> Continue with Facebook
        </button>
        <button
          onClick={handleGithubLogin}
          className="bg-gray-700 text-white w-full p-2 flex flex-row justify-center gap-2 items-center hover:bg-gray-800 duration-100 ease-in-out">
          <FaGithub /> Continue with Github
        </button>{" "}
      </div>
    </>
  );
}

export default OAuth;
