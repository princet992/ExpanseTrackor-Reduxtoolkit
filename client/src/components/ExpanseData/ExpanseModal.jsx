import { useDispatch, useSelector } from "react-redux";
import { postExpanseData } from "../../features/ExpanseSlice/ExpanseSlice";
import { useForm } from "react-hook-form";

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
      <div className={`absolute inset-0 backdrop-blur-sm ${theme === "dark" ? "bg-black/40" : "bg-gray-200/30"}`} />

      <form
        onSubmit={handleSubmit(formSubmit)}
        className={`relative z-10 w-[90vw] sm:w-[500px] rounded-3xl shadow-xl p-6 animate-fadeIn transition-colors duration-300
          ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 text-gray-800"
          }
        `}
      >
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full font-bold transition
            ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-300"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }
          `}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Add Transaction</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Description</label>
          <input
            type="text"
            {...register("description", { required: "Description is required" })}
            className={`px-4 py-2 rounded-lg w-full border focus:outline-none focus:ring-2 transition
              ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 focus:ring-yellow-400 text-white"
                  : "bg-indigo-100/50 border-blue-200 focus:ring-blue-400 text-gray-800"
              }
            `}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Amount</label>
          <input
            type="number"
            {...register("amount", { required: "Amount is required" })}
            className={`px-4 py-2 rounded-lg w-full border focus:outline-none focus:ring-2 transition
              ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 focus:ring-yellow-400 text-white"
                  : "bg-indigo-100/50 border-blue-200 focus:ring-blue-400 text-gray-800"
              }
            `}
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="income"
                {...register("types", { required: "Type is required" })}
                className="h-4 w-4 text-green-600"
              />
              <span className="font-medium">Income</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="expanse"
                {...register("types", { required: "Type is required" })}
                className="h-4 w-4 text-red-600"
              />
              <span className="font-medium">Expense</span>
            </label>
          </div>
          {errors.types && <p className="text-red-500 text-sm mt-1">{errors.types.message}</p>}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-medium transition
              ${
                theme === "dark"
                  ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
                  : "bg-indigo-200 text-indigo-800 hover:bg-indigo-300"
              }
            `}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpanseModal;
