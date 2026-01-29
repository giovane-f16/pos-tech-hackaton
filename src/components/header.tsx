'use client';

import { GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

const Header = () => {
    const [value, setValue] = useState(false);

    const handleActiveDarkMode = () => {
        if (!value) {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setValue(true);
        } else {
            document.documentElement.classList.remove("dark");
            setValue(false);
        }
    },[value]);

    return (
        <header className="w-full bg-blue-200 dark:bg-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <GraduationCap className="size-12 text-blue-600" />
                <h1 className="text-2xl font-bold text-start text-gray-900 dark:text-gray-100">
                    EduPlataforma
                </h1>
            </div>
            <div>
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={value} onChange={(e) => setValue(e.target.checked)} className="sr-only peer" onClick={handleActiveDarkMode}/>
                    <div className="relative w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="select-none ms-3 text-sm font-medium text-gray-900 dark:text-gray-100">Dark Mode</span>
                </label>
            </div>
        </header>
    );
}

export default Header;