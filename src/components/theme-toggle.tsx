"use client";

import { useEffect, useState, useTransition } from "react";
import { setTheme } from "@/providers/theme";

interface ThemeToggleProps {
    initialTheme: string;
}

export default function ThemeToggle({ initialTheme }: ThemeToggleProps) {
    const [isDark, setIsDark] = useState(initialTheme === "dark");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDark]);

    const handleToggle = () => {
        const newTheme = !isDark ? "dark" : "light";
        setIsDark(!isDark);

        startTransition(async () => {
            await setTheme(newTheme);
        });
    };

    return (
        <label className="inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                checked={isDark}
                onChange={handleToggle}
                className="sr-only peer"
                disabled={isPending}
            />
            <div className="relative w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="select-none ms-3 text-sm font-medium text-gray-900 dark:text-gray-100">Dark Mode</span>
        </label>
    );
}
