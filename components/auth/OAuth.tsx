import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa"; 

function OAuth() {
  return (
    <>
      <div className="my-2 flex flex-row justify-center">
        <span className="absolute bg-white text-black px-4 mt-2">or</span>
        <div
          className="w-full bg-gray-200 mt-8"
          style={{ height: "1px" }}></div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <button className="bg-red-500 text-white w-full p-2 flex flex-row justify-center gap-2 items-center hover:bg-red-600 duration-100 ease-in-out">
          <FaGoogle /> Sign-in with Google
        </button>
        <button className="bg-blue-600 text-white w-full p-2 flex flex-row justify-center gap-2 items-center hover:bg-blue-700 duration-100 ease-in-out">
          <FaFacebook /> Sign-in with Facebook
        </button>
        <button className="bg-gray-700 text-white w-full p-2 flex flex-row justify-center gap-2 items-center hover:bg-gray-800 duration-100 ease-in-out">
          <FaGithub /> Sign-in with Github
        </button>{" "}
      </div>
    </>
  );
}

export default OAuth;
