import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ThemeProp {
    children: React.ReactNode;
}

interface ThemeContext {
    themeMode: string;
    setThemeMode: Dispatch<SetStateAction<string>>;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

export const ThemeProvider = ({ children }: ThemeProp) => {
  const [themeMode, setThemeMode] = useState("light");

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
