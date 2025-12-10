// src/components/ui/ThemeToggle.jsx

import React from "react";
import { Sun, Moon } from "lucide-react";
import useTheme from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 transition-all shadow-lg hover:scale-110 border border-gray-300 dark:border-slate-700"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;