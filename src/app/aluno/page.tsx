'use client';

import { Upload, History, Brain } from "lucide-react";
import { useState } from "react";

const AlunoPage = () => {
    const [tab, setTab] = useState("upload");

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="flex justify-between px-4 py-1.5 rounded-4xl bg-gray-200">
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center ${tab == "upload" ? "bg-white" : ""}`} onClick={() => {setTab("upload")}}>
                    <Upload size={18} />
                    Enviar Trabalho
                </button>
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center ${tab == "history" ? "bg-white" : ""}`} onClick={() => {setTab("history")}}>
                    <History size={18} />
                    Histórico
                </button>
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center ${tab == "assistant" ? "bg-white" : ""}`} onClick={() => {setTab("assistant")}}>
                    <Brain size={18} />
                    Assistente de IA
                </button>
            </section>
        </main>
    );
}
export default AlunoPage;