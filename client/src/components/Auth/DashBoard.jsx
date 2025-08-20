import { useSelector } from "react-redux";
import ExpanseTracker from "../../pages/ExpanseTracker";
import ExpanseSkelton from "../ExpanseSkelton";

const DashBoard = () => {
  const { isLoading } = useSelector((state) => state.expanseData);

  if (isLoading) {
    return <ExpanseSkelton />;
  }
  return (
    <>
      <ExpanseTracker />
    </>
  );
};

export default DashBoard;
