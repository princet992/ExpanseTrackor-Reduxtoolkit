import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ExpanseSkelton from "../loading Skelton/ExpanseSkelton";

const ProtectedRoute = ({ children }) => {
  const { token, isLoading } = useSelector((state) => state.Auth);
  if (isLoading) {
    return <ExpanseSkelton />;
  }
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
