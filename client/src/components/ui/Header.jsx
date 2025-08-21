import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/AuthSlice/AuthSlice";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { toggleTheme } from "../../features/themeSlice/ThemeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { userName } = useSelector((state) => state.Auth);
  const { theme } = useSelector((state) => state.Theme);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOutUser = () => {
    dispatch(logOut());
    setIsOpen(false);
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <header
      className={`shadow-lg transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white"
          : "bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-600 text-white"
      }`}
    >
      <nav className="flex justify-between items-center px-5 sm:px-10 h-16 font-medium relative">
        <h2 className="text-xl sm:text-2xl font-bold tracking-wide drop-shadow-sm">
          Expanse<span className={`${theme === "dark" ? "text-yellow-300" : "text-yellow-300"}`}>Tracker</span>
        </h2>

        <ul className="hidden md:flex items-center gap-6">
          <li className="hover:text-yellow-400 cursor-pointer transition">Dashboard</li>
        </ul>

        <div className="flex items-center gap-4">
          {userName && (
            <div className="hidden md:flex items-center gap-4">
              <h2 className="text-sm sm:text-base">
                Welcome <span className="font-bold text-yellow-300">{userName}</span>
              </h2>
              <button
                onClick={handleLogOutUser}
                className={`px-3 py-1 rounded-lg font-semibold transition shadow-md ${
                  theme === "dark"
                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:text-black"
                    : "bg-white text-blue-600 hover:bg-yellow-300 hover:text-black"
                }`}
              >
                Log Out
              </button>
            </div>
          )}

          <button
            onClick={handleToggleTheme}
            className={`p-1 rounded-full transition shadow-md group ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-yellow-300 hover:text-black"
                : "bg-gray-100 hover:bg-yellow-300 hover:text-black"
            }`}
            title="Toggle Theme"
          >
            {theme === "dark" ? (
              <Sun className="text-yellow-300 group-hover:text-black" size={20} />
            ) : (
              <Moon className="text-gray-900 hover:bg-yellow-300 hover:text-black" size={20} />
            )}
          </button>

          <button className="md:hidden flex items-center" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {isOpen && (
          <div
            className={`absolute top-16 left-0 w-full flex flex-col items-center gap-5 py-5 shadow-md md:hidden z-50 transition-all duration-300 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 pointer-events-none"
            } ${theme === "dark" ? "bg-gray-900 text-white" : "bg-indigo-600 text-white"}`}
          >
            <ul className="flex flex-col gap-4 text-sm">
              <li onClick={() => setIsOpen(false)} className="hover:text-yellow-400 cursor-pointer transition">
                Dashboard
              </li>
            </ul>

            {userName && (
              <div className="flex flex-col items-center gap-3">
                <h2 className="text-sm">
                  Welcome <span className="font-bold text-yellow-300">{userName}</span>
                </h2>
                <button
                  onClick={handleLogOutUser}
                  className={`px-3 py-1 rounded-lg font-semibold transition shadow-md ${
                    theme === "dark"
                      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300 hover:text-black"
                      : "bg-white text-blue-600 hover:bg-yellow-300 hover:text-black"
                  }`}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
