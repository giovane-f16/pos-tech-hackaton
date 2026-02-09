"use client";

import { GraduationCap } from "lucide-react";
import User from "@/components/user";
import ThemeToggle from "@/components/theme-toggle";
import { useEffect, useState } from "react";

interface HeaderProps {
    nome: string | null;
    tipoUsuario: string | null;
    theme: string;
}

const Header = ({ nome, tipoUsuario, theme }: HeaderProps) => {
    const [link, setLink] = useState("/");

    const atualizarLink = () => {
        if (!tipoUsuario) {
            setLink("/");
        }

        if (window.location.pathname === "/") {
            setLink(`/${tipoUsuario}`);
        }

        if (window.location.pathname !== "/") {
            setLink("/");
        }
    }

    useEffect(() => {
        atualizarLink();
    }, [tipoUsuario]);

    return (
        <header className="w-full bg-white-200 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="p-2 flex items-center justify-between container mx-auto">
                <div className="flex-row items-center gap-2">
                    <a href={link} className="flex items-center gap-2">
                        <GraduationCap className={`size-12 ${tipoUsuario === "professor" ? "text-green-600" : "text-blue-600"}`} />
                        <h1 className="text-2xl font-bold text-start text-gray-900 dark:text-gray-100">
                            Aprendia
                            {tipoUsuario && (
                                <p className="text-[12px] font-normal">Área do <span className="capitalize">{tipoUsuario}</span></p>
                            )}
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