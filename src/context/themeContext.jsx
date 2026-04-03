import React, { createContext, useContext, useState, useEffect } from 'react';

// Dark theme colors
const darkTheme = {
  bg: "#0e0e0e",
  surface: "#161616",
  card: "#1c1c1c",
  border: "#2a2a2a",
  copper: "#c87941",
  copperLight: "#e8935a",
  copperDim: "#8a5229",
  text: "#e8e8e8",
  textSecondary: "#a0a0a0",
  muted: "#777777",
  mutedLight: "#888888",
  mono: "'JetBrains Mono', 'Courier New', monospace",
  sans: "'Inter', system-ui, sans-serif",
  shadow: "0 4px 0 #080808",
  shadowHover: "0 12px 40px rgba(0,0,0,0.3)",
  gradient: "linear-gradient(135deg, #1e1e1e, #252525)",
};

// Light theme colors
const lightTheme = {
  bg: "#f5f5f5",
  surface: "#ffffff",
  card: "#ffffff",
  border: "#e0e0e0",
  copper: "#c87941",
  copperLight: "#e8935a",
  copperDim: "#a0623a",
  text: "#1a1a1a",
  textSecondary: "#555555",
  muted: "#888888",
  mutedLight: "#999999",
  mono: "'JetBrains Mono', 'Courier New', monospace",
  sans: "'Inter', system-ui, sans-serif",
  shadow: "0 4px 0 #d0d0d0",
  shadowHover: "0 12px 40px rgba(0,0,0,0.1)",
  gradient: "linear-gradient(135deg, #f0f0f0, #ffffff)",
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) return savedTheme;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    localStorage.setItem('portfolio-theme', theme);
    
    // Apply theme to body
    if (theme === 'dark') {
      document.body.style.backgroundColor = darkTheme.bg;
      document.body.style.color = darkTheme.text;
    } else {
      document.body.style.backgroundColor = lightTheme.bg;
      document.body.style.color = lightTheme.text;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const colors = theme === 'dark' ? darkTheme : lightTheme;

  if (!mounted) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};