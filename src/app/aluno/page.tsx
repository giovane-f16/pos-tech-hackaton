"use client";

import { Upload, History, Brain, Send, CalendarDays, CloudUpload } from "lucide-react";
import { useState } from "react";
import UploadDeTrabalho from "@/components/aluno/upload";
import Historico from "@/components/aluno/historico";
import AssistenteIa from "@/components/aluno/assistente-ia";

const AlunoPage = () => {
    const [tab, setTab] = useState("upload");

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="flex flex-wrap justify-between gap-2 px-2 md:px-4 py-1.5 rounded-4xl bg-gray-200 dark:bg-gray-800">
                <button className={`flex items-center cursor-pointer gap-x-2 font-medium px-2 md:px-4 py-2 rounded-2xl flex-1 min-w-25 justify-center dark:text-gray-200 text-sm md:text-base ${tab == "upload" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("upload")}}>
                    <Upload size={16} className="md:w-4.5 md:h-4.5" />
                    <span className="hidden sm:inline">Enviar Trabalho</span>
                    <span className="sm:hidden">Enviar</span>
                </button>
                <button className={`flex items-center cursor-pointer gap-x-2 font-medium px-2 md:px-4 py-2 rounded-2xl flex-1 min-w-25 justify-center dark:text-gray-200 text-sm md:text-base ${tab == "historico" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("historico")}}>
                    <History size={16} className="md:w-4.5 md:h-4.5" />
                    Histórico
                </button>
                <button className={`flex items-center cursor-pointer gap-x-2 font-medium px-2 md:px-4 py-2 rounded-2xl flex-1 min-w-25 justify-center dark:text-gray-200 text-sm md:text-base ${tab == "assistente-ia" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("assistente-ia")}}>
                    <Brain size={16} className="md:w-4.5 md:h-4.5" />
                    <span className="hidden sm:inline">Assistente de IA</span>
                    <span className="sm:hidden">IA</span>
                </button>
            </section>

            <section className="mt-8">
                {tab == "upload" && (
                    <UploadDeTrabalho />
                )}
                {tab == "historico" && (
                    <Historico />
                )}
                {tab == "assistente-ia" && (
                    <AssistenteIa />
                )}
            </section>
        </main>
    );
}
export default AlunoPage;