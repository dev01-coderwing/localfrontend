import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
  const root = document.documentElement;

  root.className = theme; // 🔥 best

  localStorage.setItem("theme", theme);
}, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      
      {/*  IMPORTANT WRAPPER */}
      <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen transition-all duration-300">
        {children}
      </div>

    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);