import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/AuthSlice/AuthSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.Auth);
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
      <div className="grid place-items-center min-h-screen bg-[#E7ECEF]">
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
      </div>
    </>
  );
};

export default Login;
