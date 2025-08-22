import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const { theme } = useSelector((state) => state.Theme);
  const navigate = useNavigate();

  return (
    <div
      className={`px-4 sm:px-10 py-6 min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-[#e1eaf3] text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-md px-6 py-10 text-center transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-gray-100" : "text-slate-800"}`}>
          404 – Not Found
        </h2>

        <p className="text-base md:text-lg mb-6">The page you are looking for doesn’t exist or has been moved.</p>

        <img
          src="https://www.vizion.com/wp-content/smush-webp/2018/09/shutterstock_479042983.jpg.webp"
          alt="404 illustration"
          className="w-full max-w-md mx-auto rounded-xl shadow mb-6 border dark:border-gray-700"
        />

        <button
          onClick={() => navigate(-1, { replace: true })}
          className={`px-6 py-2 rounded-xl font-semibold shadow-md transition ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white hover:opacity-90"
              : "bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:opacity-90"
          }`}
        >
          ⬅ Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
