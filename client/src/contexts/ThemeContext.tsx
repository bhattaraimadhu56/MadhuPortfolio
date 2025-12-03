import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

/**
 * ThemeProvider - Manages light/dark theme switching
 * All CSS variables automatically update when theme changes
 * No hardcoding - purely dynamic CSS variable system
 */
export function ThemeProvider({
  children,
   defaultTheme = "dark",
 switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  // Apply theme changes to DOM - updates all CSS variables instantly
  useEffect(() => {
    const root = document.documentElement;
    
    // Add or remove 'dark' class from html element
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save preference to localStorage
    if (switchable) {
      localStorage.setItem("theme", theme);
    }
    
    // Force repaint to ensure CSS variables update immediately
    root.style.colorScheme = theme;
  }, [theme, switchable]);

  // Toggle between light and dark theme
  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme Hook - Access theme context in any component
 * Returns current theme and toggleTheme function
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
