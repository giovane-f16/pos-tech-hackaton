"use client";

import { CircleCheckBig, History, Brain } from "lucide-react";
import { useState } from "react";
import CriarTrabalho from "@/components/professor/criar";
import AvaliarTrabalho from "@/components/professor/avaliar";
import HistoricoTrabalhos from "@/components/professor/historico";
import AnalisarComIa from "@/components/professor/analisar";

const ProfessorPage = () => {
    const [tab, setTab] = useState("criar");

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="flex justify-between px-4 py-1.5 rounded-4xl bg-gray-200 dark:bg-gray-800">
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center dark:text-gray-200 ${tab == "criar" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("criar")}}>
                    <CircleCheckBig size={18} />
                    Criar Trabalho
                </button>
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center dark:text-gray-200 ${tab == "avaliar" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("avaliar")}}>
                    <CircleCheckBig size={18} />
                    Avaliar Trabalhos
                </button>
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center dark:text-gray-200 ${tab == "history" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("history")}}>
                    <History size={18} />
                    Histórico
                </button>
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center dark:text-gray-200 ${tab == "analise" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("analise")}}>
                    <Brain size={18} />
                    Análise de IA
                </button>
            </section>

            <section className="mt-8">
                {tab == "criar" && (
                    <CriarTrabalho />
                )}
                {tab == "avaliar" && (
                    <AvaliarTrabalho />
                )}
                {tab == "history" && (
                    <HistoricoTrabalhos />
                )}
                {tab == "analise" && (
                    <AnalisarComIa />
                )}
            </section>
        </main>
    );
}
export default ProfessorPage;