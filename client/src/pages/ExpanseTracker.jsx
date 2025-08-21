import { useState } from "react";
import TotalExpanse from "../components/ExpanseData/TotalExpanse";
import ExpanseHistory from "../components/ExpanseData/ExpanseHistory";
import ExpanseModal from "../components/ExpanseData/ExpanseModal";
import { useSelector } from "react-redux";

const ExpanseTracker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useSelector((state) => state.Theme);

  return (
    <div
      className={`px-4 sm:px-10 py-6 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-[#e1eaf3] text-gray-900"
      }`}
    >
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2
          className={`text-2xl font-bold text-center sm:text-left ${
            theme === "dark" ? "text-gray-100" : "text-slate-800"
          }`}
        >
          Expanse Tracker
        </h2>
        <button
          className={`px-4 py-2 rounded-xl font-semibold shadow-md transition mt-4 sm:mt-0 ${
            theme === "dark"
              ? "bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white hover:opacity-90"
              : "bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:opacity-90"
          }`}
          onClick={() => setIsOpen(true)}
        >
          + Add Transaction
        </button>
      </header>

      {isOpen && <ExpanseModal onClose={() => setIsOpen(false)} />}

      <main className="space-y-8">
        <section
          className={`rounded-2xl shadow-md hover:shadow-lg px-2 sm:px-5 transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <TotalExpanse />
        </section>

        <section
          className={`rounded-2xl shadow-md hover:shadow-lg px-2 sm:px-5 transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          <ExpanseHistory />
        </section>
      </main>
    </div>
  );
};

export default ExpanseTracker;
