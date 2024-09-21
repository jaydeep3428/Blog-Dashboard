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
    <div className="flex items-center bg-gray-700 rounded-xl p-2">
      {theme === "dark" ? (
        <FiSun
          size={22}
          onClick={() => setTheme("light")}
          className="cursor-pointer"
          aria-label="Switch to light mode"
        />
      ) : (
        <FiMoon
          size={22}
          onClick={() => setTheme("dark")}
          className="cursor-pointer"
          aria-label="Switch to dark mode"
        />
      )}
    </div>
  );
}
