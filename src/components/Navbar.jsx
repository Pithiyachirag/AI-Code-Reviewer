
import { useEffect, useState } from "react";
function Navbar({ darkMode, setDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
  const handleScroll = () => {
    const home = document.getElementById("home");
    const editor = document.getElementById("editor");
    const history = document.getElementById("history");

    const scrollY = window.scrollY + 120;

    if (
      history &&
      scrollY >= history.offsetTop
    ) {
      setActive("history");
    } else if (
      editor &&
      scrollY >= editor.offsetTop
    ) {
      setActive("editor");
    } else {
      setActive("home");
    }
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 dark:bg-gray-800/90 dark:border-gray-700 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

        {/* Logo */}
        <h1
          onClick={() =>
            document.getElementById("home")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="text-2xl font-bold text-black dark:text-white cursor-pointer transition-all duration-300 hover:scale-105"
        >
          AI<span className="text-blue-600"> Reviewer</span>
        </h1>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-black dark:text-white"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        {/* Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 dark:text-gray-200 font-medium">
          <button
            onClick={() => {
              
              document.getElementById("home")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className={`px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg ${active === "home"
              ? "bg-blue-600 text-white shadow-lg"
              : ""
              }`}
          >
            Home
          </button>

          <button
            onClick={() =>
              document.getElementById("editor")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className={`px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg ${active === "editor"
              ? "bg-blue-600 text-white shadow-lg"
              : ""
              }`}
          >
            Editor
          </button>

          <button
            onClick={() =>
              document.getElementById("history")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className={`px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg ${active === "history"
              ? "bg-blue-600 text-white shadow-lg"
              : ""
              }`}
          >
            History
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${darkMode
              ? "bg-yellow-400 text-black hover:bg-yellow-500"
              : "bg-gray-800 text-white hover:bg-gray-900"
              }`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-4 animate-[fadeIn_.3s_ease-in-out]">

          <button
            onClick={() => {
             
              document.getElementById("home")?.scrollIntoView({

                behavior: "smooth",
              });
              setMenuOpen(false);
            }}
            className={`block w-full text-center text-lg font-medium rounded-xl py-3 transition-all duration-300 ${active === "home"
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-600 hover:text-white"
              }`}
          >
            🏠 Home
          </button>

          <button
            onClick={() => {
            
              document.getElementById("editor")?.scrollIntoView({
                behavior: "smooth",
              });
              setMenuOpen(false);
            }}
            className={`block w-full text-center text-lg font-medium rounded-xl py-3 transition-all duration-300 ${active === "editor"
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-600 hover:text-white"
              }`}
          >
            💻 Editor
          </button>

          <button
            onClick={() => {
              
              document.getElementById("history")?.scrollIntoView({
                behavior: "smooth",
              });
              setMenuOpen(false);
            }}
            className={`block w-full text-center text-lg font-medium rounded-xl py-3 transition-all duration-300 ${active === "history"
              ? "bg-blue-600 text-white"
              : "hover:bg-blue-600 hover:text-white"
              }`}
          >
            📜 History
          </button>

          <button
            onClick={() => {
              setDarkMode(!darkMode);
            }}
            className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-95 ${darkMode
              ? "bg-yellow-400 text-black"
              : "bg-gray-800 text-white"
              }`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

        </div>
      )}
    </nav>
  );
}

export default Navbar;