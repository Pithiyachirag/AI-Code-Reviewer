import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EditorSection from "./components/EditoreSection";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Routes>
                <Route
                  path="/"
                  element={<Home darkMode={darkMode} />}
                />

                <Route
                  path="/history"
                  element={<History />}
                />
              </Routes>
            </>
          }
        />

        <Route
          path="/history"
          element={<History />}
        />
      </Routes>

      <ScrollToTop />
    </div>
  );
}

export default App;