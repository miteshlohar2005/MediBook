"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { C } from "./PastChecksList";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button 
        style={{ width: 36, height: 36, borderRadius: 50, background: "transparent", border: `1px solid ${C.borderSubtleHeavy}`, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <span style={{ width: 18, height: 18 }} />
      </button>
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      style={{ 
        width: 36, height: 36, 
        borderRadius: 50, 
        background: isDark ? "rgba(255,255,255,0.1)" : "transparent", 
        border: `1px solid ${C.borderSubtleHeavy}`, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        cursor: "pointer",
        color: C.textLight,
        transition: "all 0.2s"
      }}
      aria-label="Toggle Theme"
      title="Toggle Theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
