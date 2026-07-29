import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EditorSection from "./components/EditoreSection";
import ScrollToTop from "./components/ScrollToTop";

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

      <Hero />

      <EditorSection
        darkMode={darkMode}
      />

      <ScrollToTop />
    </div>
  );
}

export default App;