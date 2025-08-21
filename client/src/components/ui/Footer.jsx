import { GithubIcon, Instagram, MailIcon } from "lucide-react";
import { useSelector } from "react-redux";

const Footer = () => {
  const { theme } = useSelector((state) => state.Theme);

  return (
    <footer
      className={` shadow-lg transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold tracking-wide drop-shadow-sm">
            Expanse
            <span className={theme === "dark" ? "text-yellow-400" : "text-yellow-300"}>Tracker</span>
          </h2>
          <p className={theme === "dark" ? "text-gray-400" : "text-indigo-100"}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <p className={theme === "dark" ? "text-gray-300" : "text-sm"}>
            Built with ❤️ by <span className="font-bold text-yellow-300">Prince Thakur</span>
          </p>

          <div className="flex gap-4">
            <a
              href="https://github.com/princet992"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition ${theme === "dark" ? "hover:text-yellow-400" : "hover:text-yellow-300"}`}
            >
              <GithubIcon size={22} />
            </a>
            <a
              href="https://www.instagram.com/mprincet992/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition ${theme === "dark" ? "hover:text-yellow-400" : "hover:text-yellow-300"}`}
            >
              <Instagram size={22} />
            </a>
            <a
              href="mailto:your@email.com"
              className={`transition ${theme === "dark" ? "hover:text-yellow-400" : "hover:text-yellow-300"}`}
            >
              <MailIcon size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
