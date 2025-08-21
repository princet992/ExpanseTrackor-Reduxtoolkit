import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

const ExpanseSkelton = () => {
  const { theme } = useSelector((state) => state.Theme);
  return (
    <div
      className={`px-4 sm:px-10 py-6 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-[#e1eaf3] text-gray-900"
      }`}
    >
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <Skeleton
          height={28}
          width={200}
          className="mb-4 sm:mb-0"
          baseColor={theme === "dark" ? "#374151" : "#e5e7eb"}
          highlightColor={theme === "dark" ? "#4b5563" : "#f3f4f6"}
        />
        <Skeleton
          height={40}
          width={160}
          borderRadius={12}
          baseColor={theme === "dark" ? "#374151" : "#e5e7eb"}
          highlightColor={theme === "dark" ? "#4b5563" : "#f3f4f6"}
        />
      </header>

      <main className="space-y-8">
        <section className={`rounded-2xl shadow-md px-4 sm:px-6 py-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <Skeleton
            height={24}
            width={150}
            className="mb-4"
            baseColor={theme === "dark" ? "#374151" : "#e5e7eb"}
            highlightColor={theme === "dark" ? "#4b5563" : "#f3f4f6"}
          />
          <Skeleton
            height={32}
            width={220}
            baseColor={theme === "dark" ? "#374151" : "#e5e7eb"}
            highlightColor={theme === "dark" ? "#4b5563" : "#f3f4f6"}
          />
        </section>

        <section className={`rounded-2xl shadow-md px-4 sm:px-6 py-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <Skeleton
            height={24}
            width={180}
            className="mb-4"
            baseColor={theme === "dark" ? "#374151" : "#e5e7eb"}
            highlightColor={theme === "dark" ? "#4b5563" : "#f3f4f6"}
          />
          <Skeleton
            count={4}
            height={20}
            className="mb-3"
            baseColor={theme === "dark" ? "#374151" : "#e5e7eb"}
            highlightColor={theme === "dark" ? "#4b5563" : "#f3f4f6"}
          />

          <div className="flex items-center flex-wrap gap-3">
            <Skeleton
              height={24}
              width={100}
              baseColor={theme === "dark" ? "#374151" : "#e5e7eb"}
              highlightColor={theme === "dark" ? "#4b5563" : "#f3f4f6"}
            />
            <Skeleton
              height={24}
              width={100}
              baseColor={theme === "dark" ? "#374151" : "#e5e7eb"}
              highlightColor={theme === "dark" ? "#4b5563" : "#f3f4f6"}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ExpanseSkelton;
