"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface UserClientProps {
    nome: string;
}

export default function User({ nome }: UserClientProps) {
    const logout = () => {
        let confirm = window.confirm("Tem certeza que deseja sair?");
        if (confirm) {
            signOut({
                callbackUrl: "/"
            });
        }
    }

    return (
        <div className="flex items-center gap-4">
            <p className="text-gray-900 dark:text-gray-100">Bem vindo, {nome}!</p>
            <button className="px-4 py-1 bg-gray-50 rounded hover:bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500 cursor-pointer flex items-center gap-2 border border-gray-200" onClick={logout}>
                <LogOut size={16} />
                Sair
            </button>
        </div>
    );
}