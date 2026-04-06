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
  githubHover: "#ffffff",
};

// Light theme — Palette #1: Midnight Navy + Electric Blue
// 🤍 Pure White + 🌑 Navy Midnight + ⚡ Electric Blue
const lightTheme = {
  bg: "#ffffff",
  surface: "#f8fafc",           // slate-50
  card: "#ffffff",
  border: "#e2e8f0",            // slate-200
  // Electric Blue accent (primary)
  copper: "#2563eb",            // blue-600
  copperLight: "#3b82f6",       // blue-500
  copperDim: "#1d4ed8",         // blue-700
  // Secondary accent (sky)
  sky: "#0ea5e9",
  skyDim: "#0284c7",
  // Text — slate dark
  text: "#0f172a",              // slate-900
  textSecondary: "#1e293b",     // slate-800
  muted: "#64748b",             // slate-500
  mutedLight: "#94a3b8",        // slate-400
  mono: "'JetBrains Mono', 'Courier New', monospace",
  sans: "'Outfit', 'Inter', system-ui, sans-serif",
  shadow: "0 4px 0 #cbd5e1",    // slate-300
  shadowHover: "0 12px 40px rgba(37,99,235,0.12)",
  gradient: "linear-gradient(135deg, #eff6ff, #f0f9ff)", // blue-50 to sky-50
  heroOverlay: "rgba(255,255,255,0.55)",
  githubHover: "#0f172a",
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