import { useDispatch, useSelector } from "react-redux";
import { postExpanseData } from "../../features/ExpanseSlice/ExpanseSlice";
import { useForm } from "react-hook-form";
import { X, FileText, DollarSign, TrendingUp, TrendingDown } from "lucide-react";

const ExpanseModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.Auth);
  const { theme } = useSelector((state) => state.Theme);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const formSubmit = (data) => {
    const newData = { ...data, userId };
    dispatch(postExpanseData(newData));
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className={`absolute inset-0 backdrop-blur-sm ${theme === "dark" ? "bg-black/50" : "bg-gray-200/40"}`} />

      <form
        onSubmit={handleSubmit(formSubmit)}
        className={`relative z-10 w-[90vw] sm:w-[500px] rounded-2xl shadow-2xl p-8 
          animate-fadeIn transform scale-95 transition-all duration-300
          ${
            theme === "dark"
              ? "bg-gray-900/90 text-white border border-gray-700"
              : "bg-white/80 backdrop-blur-lg text-gray-800 border border-gray-200"
          }
        `}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-4 h-9 w-9 flex items-center justify-center rounded-full font-bold transition
            ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }
          `}
        >
          <X size={18} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center tracking-wide">Add Transaction</h2>

        <div className="mb-5 relative">
          <label className="block text-sm font-semibold mb-1">Description</label>
          <FileText className="absolute left-3 top-9  text-gray-400" size={18} />
          <input
            type="text"
            {...register("description", { required: "Description is required" })}
            placeholder="e.g. Salary, Rent, Shopping"
            className={`px-4 pl-10 py-2 rounded-lg w-full border focus:outline-none focus:ring-2 placeholder-gray-400 transition
              ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 focus:ring-yellow-400 text-white"
                  : "bg-gray-50 border-gray-300 focus:ring-blue-400 text-gray-900"
              }
            `}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div className="mb-5 relative">
          <label className="block text-sm font-semibold mb-1">Amount</label>
          <DollarSign className="absolute left-3 top-9  text-green-500" size={20} />
          <input
            type="number"
            {...register("amount", { required: "Amount is required" })}
            placeholder="Enter amount"
            className={`px-4 pl-10 py-2 rounded-lg w-full border focus:outline-none focus:ring-2 placeholder-gray-400 transition
              ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 focus:ring-yellow-400 text-white"
                  : "bg-gray-50 border-gray-300 focus:ring-blue-400 text-gray-900"
              }
            `}
          />

          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Type</label>
          <div className="flex sm:gap-6 gap-3 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="income"
                {...register("types", { required: "Type is required" })}
                className="h-4 w-4 text-green-600"
              />
              <TrendingUp size={20} className="text-green-500" />
              <span className="font-medium">Income</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="expanse"
                {...register("types", { required: "Type is required" })}
                className="h-4 w-4 text-red-600"
              />
              <TrendingDown size={20} className="text-red-500" />
              <span className="font-medium">Expense</span>
            </label>
          </div>
          {errors.types && <p className="text-red-500 text-sm mt-1">{errors.types.message}</p>}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`px-5 py-2 rounded-lg font-medium transition
              ${
                theme === "dark"
                  ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }
            `}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpanseModal;
