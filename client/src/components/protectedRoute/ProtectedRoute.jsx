import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useSelector((state) => state.Auth);

  if (!token) {
    return <Navigate to="/" />;
  }
  if (isLoading) {
    return <div className="text-center py-4 text-red-800 font-bold">Loading,Please wait...</div>;
  }
  return children;
};

export default ProtectedRoute;
