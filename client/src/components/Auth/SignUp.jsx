import { useDispatch } from "react-redux";
import { registerUser } from "../../features/AuthSlice/AuthSlice";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const dispatch = useDispatch();
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
    } catch (error) {
      setError(error.message);
    }
    reset();
    navigate("/");
  };
  return (
    <>
      <div className="grid place-items-center min-h-screen bg-[#E7ECEF]">
        <form
          className="max-w-[500px] sm:w-[25rem] bg-white shadow p-5 rounded-lg"
          onSubmit={handleSubmit(formSubmit)}
        >
          <p className="text-red-700 font-medium text-center">
            {error && error}
          </p>
          <h2 className="font-medium mb-5 text-xl text-center text-slate-700">
            Register
          </h2>
          <div className="grid gap-1 my-5">
            <label className="text-slate-700">Username</label>
            <input
              type="text"
              className="bg-sky-100 px-3 py-2 rounded outline-sky-200"
              {...register("userName", { required: "username is required" })}
            />
            {errors.name && (
              <p className="text-red-700 text-sm font-medium">
                {errors.userName.message}
              </p>
            )}
          </div>
          <div className="grid gap-1 my-5">
            <label className="text-slate-700">Email</label>
            <input
              type="email"
              className="bg-sky-100 px-3 py-2 rounded outline-sky-200"
              {...register("email", { required: "email is required" })}
            />
            {errors.email && (
              <p className="text-red-700 text-sm font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-1 my-5">
            <label className="text-slate-700">Password</label>
            <input
              type="password"
              className="bg-sky-100 px-3 py-2 rounded outline-sky-200"
              {...register("password", { required: "password is required" })}
            />
            {errors.password && (
              <p className="text-red-700 text-sm font-medium">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className="bg-[#10B981] w-full px-3 py-2 rounded my-2 font-medium text-white">
            Register
          </button>
          <p className="text-sm my-2">
            Already have an account{" "}
            <Link to="/">
              <span className="text-blue-600 font-medium">click here</span>
            </Link>{" "}
            to login.
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
