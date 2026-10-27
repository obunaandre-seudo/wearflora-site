"use client";

import { createContext, useContext } from "react";

/**
 * Wearflora is a single light theme. The provider is kept so existing imports keep working,
 * but it no longer toggles a dark class or hides the page until hydration.
 */
type Theme = "light";
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {} }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
