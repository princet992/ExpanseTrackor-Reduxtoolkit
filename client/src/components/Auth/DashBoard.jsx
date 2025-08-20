import { useSelector } from "react-redux";
import ExpanseTracker from "../../pages/ExpanseTracker";

const DashBoard = () => {
  const { isLoading } = useSelector((state) => state.Auth);

  
  if (isLoading) {
    return <div className="text-center py-4 text-red-800 font-bold">Loading,Please wait...</div>;
  }
  return (
    <>
      <ExpanseTracker />
    </>
  );
};

export default DashBoard;
