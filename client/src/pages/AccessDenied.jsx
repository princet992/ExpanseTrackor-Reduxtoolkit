import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {
  const { theme } = useSelector((state) => state.Theme);
  const navigate = useNavigate();
  return (
    <div className={`grid place-items-center min-h-[calc(100vh-62px)] ${theme === "dark" && "bg-[#191a19]"}`}>
      <p className="text-[#ec2112]">Only admin can access this page</p>
      <img src="error.gif" alt="access-denied" className="w-[80vw] mx-auto rounded-xl" />

      <button
        variant="contained"
        color="success"
        sx={{ fontSize: "10px" }}
        onClick={() => navigate(-1, { replace: true })}
      >
        Go Back
      </button>
    </div>
  );
};

export default AccessDenied;
