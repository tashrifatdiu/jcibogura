import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: isDark ? {
      // Dark theme
      background: '#0f0f23',
      surface: '#1a1a2e',
      surfaceHover: '#252540',
      primary: '#2197cd',
      primaryHover: '#1b7aa8',
      secondary: '#7cc7d0',
      accent: '#9b59b6',
      accentHover: '#8e44ad',
      text: '#e4e4e7',
      textSecondary: '#a1a1aa',
      border: '#27272a',
      success: '#10b981',
      error: '#ef4444',
      cardBg: '#1a1a2e',
      inputBg: '#252540',
      headerBg: '#1a1a2e',
    } : {
      // Light theme
      background: '#f3fafd',
      surface: '#ffffff',
      surfaceHover: '#f8f9fa',
      primary: '#2197cd',
      primaryHover: '#1b7aa8',
      secondary: '#7cc7d0',
      accent: '#9b59b6',
      accentHover: '#8e44ad',
      text: '#1d1a36',
      textSecondary: '#64748b',
      border: '#e2e8f0',
      success: '#10b981',
      error: '#ef4444',
      cardBg: '#ffffff',
      inputBg: '#ffffff',
      headerBg: '#2197cd',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
