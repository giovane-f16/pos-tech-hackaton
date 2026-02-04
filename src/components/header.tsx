"use client";

import { GraduationCap } from "lucide-react";
import User from "@/components/user";
import ThemeToggle from "@/components/theme-toggle";

interface HeaderProps {
    nome: string | null;
    theme: string;
}

const Header = ({ nome, theme }: HeaderProps) => {
    return (
        <header className="w-full bg-white-200 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 flex items-center justify-between container mx-auto">
                <div className="flex-row items-center gap-2">
                    <a href="/" className="flex items-center gap-2">
                        <GraduationCap className="size-12 text-blue-600" />
                        <h1 className="text-2xl font-bold text-start text-gray-900 dark:text-gray-100">
                            Aprendia
                        </h1>
                    </a>
                </div>
                <div className="flex gap-x-6">
                    {nome && <User nome={nome} />}
                    <ThemeToggle initialTheme={theme} />
                </div>
            </div>
        </header>
    );
}

export default Header;