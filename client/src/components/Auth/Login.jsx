import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/AuthSlice/AuthSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.Auth);
  const { theme } = useSelector((state) => state.Theme);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const formSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (error) {
      setError(error.message || "somwthing went wrong");
    }
    reset();
  };
  useEffect(() => {
    if (token) {
      navigate("/dashBoard", { replace: true });
    }
  }, [token]);
  return (
    <>
      {/* <div className="grid place-items-center min-h-screen bg-[#E7ECEF]">
        <form className="max-w-[500px] sm:w-[25rem] bg-white shadow p-5 rounded-lg" onSubmit={handleSubmit(formSubmit)}>
          <p className="text-red-700 font-medium text-center">{error && error}</p>
          <h2 className="font-medium mb-5 text-xl text-center text-slate-700">Login</h2>
          <div className="grid gap-1 my-5">
            <label className="text-slate-700">Email</label>
            <input
              type="email"
              className="bg-sky-100 px-3 py-2 rounded outline-sky-200"
              {...register("email", { required: "email is required" })}
            />
            {errors.email && <p className="text-red-700 text-sm font-medium">{errors.email.message}</p>}
          </div>
          <div className="grid gap-1 my-5">
            <label className="text-slate-700">Password</label>
            <input
              type="password"
              className="bg-sky-100 px-3 py-2 rounded outline-sky-200"
              {...register("password", { required: "password is required" })}
            />
            {errors.password && <p className="text-red-700 text-sm font-medium">{errors.password.message}</p>}
          </div>
          <button className="bg-[#10B981] w-full px-3 py-2 rounded my-2 font-medium text-white">Login</button>
          <p className="text-sm my-2">
            Don't have an account{" "}
            <Link to="/signUp">
              <span className="text-blue-600 font-medium">click here</span>
            </Link>{" "}
            to register.
          </p>
        </form>
      </div> */}
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
      theme === "dark"
        ? "bg-gray-800 text-white"
        : "bg-white bg-opacity-90 text-gray-900 backdrop-blur-md"
    }`}
  >
    {error && <p className="text-red-500 text-center mb-3">{error}</p>}

    <h2 className="text-2xl font-bold mb-5 text-center drop-shadow-sm">Login</h2>

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
      Login
    </button>

    <p className="text-sm mt-4 text-center">
      Don't have an account?{" "}
      <Link to="/signUp" className="font-medium text-indigo-600 hover:underline">
        Register here
      </Link>
    </p>
  </form>
</div>
    </>
  );
};

export default Login;
