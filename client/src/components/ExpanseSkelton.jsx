import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ExpanseSkelton = () => {
  return (
    <div className="rounded-2xl shadow-md px-4 py-6 min-h-screen">
      <Skeleton height={24} width={150} className="mb-4" />

      <Skeleton count={3} height={20} className="mb-2" />
      <div className="flex items-center flex-wrap">
        <Skeleton height={24} width={150} className="mb-4" />
        <Skeleton height={24} width={150} className="mb-4" />
      </div>
    </div>
  );
};

export default ExpanseSkelton;
