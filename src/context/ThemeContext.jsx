import { createContext, useContext, useEffect, useState } from 'react';

const themes = ['theme-default', 'theme-light', 'theme-dark'];
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('theme-default');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved && themes.includes(saved)) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);