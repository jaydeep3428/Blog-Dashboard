// app/components/ThemeSwitcher.tsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export function SwitchThemes() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center">
      {theme === "dark" ? (
        <FiSun
          size={20}
          onClick={() => setTheme("light")}
          className="cursor-pointer"
          aria-label="Switch to light mode"
        />
      ) : (
        <FiMoon
          size={20}
          onClick={() => setTheme("dark")}
          className="cursor-pointer"
          aria-label="Switch to dark mode"
        />
      )}
    </div>
  );
}
