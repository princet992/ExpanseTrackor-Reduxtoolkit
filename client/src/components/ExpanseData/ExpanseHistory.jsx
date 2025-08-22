import { useDispatch, useSelector } from "react-redux";
import { deleteExpanseData } from "../../features/ExpanseSlice/ExpanseSlice";
import { Trash2 } from "lucide-react";

const ExpanseHistory = () => {
  const dispatch = useDispatch();
  const { incomeHistory, expanseHistory } = useSelector((state) => state.expanseData);

  const { theme } = useSelector((state) => state.Theme);

  const incomeHeaderBg = theme === "dark" ? "bg-blue-700" : "bg-blue-500";
  const expenseHeaderBg = theme === "dark" ? "bg-purple-700" : "bg-violet-500";
  const cardBg = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const oddRowBg = theme === "dark" ? "odd:bg-gray-700" : "odd:bg-slate-50";
  const evenRowBg = theme === "dark" ? "even:bg-gray-800" : "even:bg-white";
  const incomeHover = theme === "dark" ? "hover:bg-blue-600" : "hover:bg-blue-50";
  const expenseHover = theme === "dark" ? "hover:bg-purple-600" : "hover:bg-violet-50";

  const handleRemoveExpanseData = (tx) => {
    if (confirm("Are you sure")) {
      dispatch(deleteExpanseData({Id:tx._id,userId:tx.userId._id}));
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-5">
      <div className={`shadow-md  overflow-hidden ${cardBg}`}>
        <h2
          className={`text-lg sm:text-xl font-semibold text-center py-3 border-b ${
            theme === "dark" ? "text-blue-300" : "text-blue-600"
          }`}
        >
          Income Transactions
        </h2>
        {incomeHistory && incomeHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-xs sm:text-sm">
              <thead className={`${incomeHeaderBg} text-white`}>
                <tr>
                  <th className="py-2 px-3 border border-slate-200">Description</th>
                  <th className="py-2 px-3 border border-slate-200">Amount</th>
                  <th className="py-2 px-3 border border-slate-200">Deposited on</th>
                  <th className="py-2 px-3 border border-slate-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {incomeHistory.map((tx) => (
                  <tr key={tx._id} className={`${oddRowBg} ${evenRowBg} ${incomeHover} transition `}>
                    <td className="py-2 px-3 border border-slate-200">{tx.description}</td>
                    <td
                      className={`py-2 px-3 border border-slate-200 font-medium ${
                        theme === "dark" ? "text-white" : "text-blue-600"
                      }`}
                    >
                      ₹ {tx.amount}
                    </td>
                    <td className="py-2 px-3 border border-slate-200">{new Date(tx.updatedAt).toLocaleString()}</td>
                    <td className="py-2 px-3 border border-slate-200 text-center ">
                      <button
                        onClick={() => handleRemoveExpanseData(tx)}
                        className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-800 transition"
                        title="Delete"
                      >
                        <Trash2 size={18} className="text-red-600 dark:text-red-400 hover:text-white" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={`${theme === "dark" ? "text-blue-300" : "text-blue-500"} text-center py-4`}>
            No transactions to display
          </p>
        )}
      </div>

      <div className={`shadow-md  overflow-hidden ${cardBg}`}>
        <h2
          className={`text-lg sm:text-xl font-semibold text-center py-3 border-b ${
            theme === "dark" ? "text-purple-300" : "text-violet-600"
          }`}
        >
          Expense Transactions
        </h2>
        {expanseHistory && expanseHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-slate-200 text-xs sm:text-sm">
              <thead className={`${expenseHeaderBg} text-white`}>
                <tr>
                  <th className="py-2 px-3 border border-slate-200">Description</th>
                  <th className="py-2 px-3 border border-slate-200">Amount</th>
                  <th className="py-2 px-3 border border-slate-200">Withdrawn on</th>
                  <th className="py-2 px-3 border border-slate-200">Action</th>
                </tr>
              </thead>
              <tbody>
                {expanseHistory.map((tx) => (
                  <tr key={tx._id} className={`${oddRowBg} ${evenRowBg} ${expenseHover} transition`}>
                    <td className="py-2 px-3 border border-slate-200">{tx.description}</td>
                    <td
                      className={`py-2 px-3 border border-slate-200 font-medium ${
                        theme === "dark" ? "text-white" : "text-violet-600"
                      }`}
                    >
                      ₹ {tx.amount}
                    </td>
                    <td className="py-2 px-3 border border-slate-200">{new Date(tx.updatedAt).toLocaleString()}</td>
                    <td className="py-2 px-3 border border-slate-200 text-center ">
                      <button
                        onClick={() => handleRemoveExpanseData(tx)}
                        className="p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-800 transition"
                        title="Delete"
                      >
                        <Trash2 size={18} className="text-red-600 dark:text-red-400 hover:text-white" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className={`${theme === "dark" ? "text-purple-300" : "text-violet-500"} text-center py-4`}>
            No transactions to display
          </p>
        )}
      </div>
    </section>
  );
};

export default ExpanseHistory;
