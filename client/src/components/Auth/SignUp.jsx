import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/AuthSlice/AuthSlice";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useId, useState } from "react";

const SignUp = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.Theme);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      reset();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 text-gray-900"
        }`}
      >
        <form
          onSubmit={handleSubmit(formSubmit)}
          className={`w-full max-w-md p-8 rounded-xl shadow-2xl transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white bg-opacity-90 text-gray-900 backdrop-blur-md"
          }`}
        >
          {error && <p className="text-red-500 text-center mb-3">{error}</p>}

          <h2 className="text-2xl font-bold mb-5 text-center drop-shadow-sm">Register</h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className={`w-full px-3 py-2 rounded-lg transition outline-none shadow-sm ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-300"
                  : "bg-gray-100 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400"
              }`}
              {...register("userName", { required: "Username is required" })}
            />
            {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-3 py-2 rounded-lg transition outline-none shadow-sm ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-300"
                  : "bg-gray-100 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400"
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className={`w-full px-3 py-2 rounded-lg transition outline-none shadow-sm ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-300"
                  : "bg-gray-100 text-gray-900 placeholder-gray-600 focus:ring-2 focus:ring-indigo-400"
              }`}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-3 rounded-lg font-semibold transition shadow-md ${
              theme === "dark"
                ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            Register
          </button>

          <p className="text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-indigo-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
