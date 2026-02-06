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
            <section className="flex justify-between px-4 py-1.5 rounded-4xl bg-gray-200 dark:bg-gray-800">
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center dark:text-gray-200 ${tab == "upload" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("upload")}}>
                    <Upload size={18} />
                    Enviar Trabalho
                </button>
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center dark:text-gray-200 ${tab == "historico" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("historico")}}>
                    <History size={18} />
                    Histórico
                </button>
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center dark:text-gray-200 ${tab == "assistente-ia" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("assistente-ia")}}>
                    <Brain size={18} />
                    Assistente de IA
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