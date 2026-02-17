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
            <section className="flex flex-wrap justify-between gap-2 px-2 md:px-4 py-1.5 rounded-4xl bg-gray-200 dark:bg-gray-800">
                <button className={`flex items-center cursor-pointer gap-x-2 font-medium px-2 md:px-4 py-2 rounded-2xl flex-1 min-w-[90px] justify-center dark:text-gray-200 text-sm md:text-base ${tab == "criar" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("criar")}}>
                    <CircleCheckBig size={16} className="md:w-[18px] md:h-[18px]" />
                    <span className="hidden sm:inline">Criar Trabalho</span>
                    <span className="sm:hidden">Criar</span>
                </button>
                <button className={`flex items-center cursor-pointer gap-x-2 font-medium px-2 md:px-4 py-2 rounded-2xl flex-1 min-w-[90px] justify-center dark:text-gray-200 text-sm md:text-base ${tab == "avaliar" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("avaliar")}}>
                    <CircleCheckBig size={16} className="md:w-[18px] md:h-[18px]" />
                    <span className="hidden sm:inline">Avaliar Trabalhos</span>
                    <span className="sm:hidden">Avaliar</span>
                </button>
                <button className={`flex items-center cursor-pointer gap-x-2 font-medium px-2 md:px-4 py-2 rounded-2xl flex-1 min-w-[90px] justify-center dark:text-gray-200 text-sm md:text-base ${tab == "history" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("history")}}>
                    <History size={16} className="md:w-[18px] md:h-[18px]" />
                    Histórico
                </button>
                <button className={`flex items-center cursor-pointer gap-x-2 font-medium px-2 md:px-4 py-2 rounded-2xl flex-1 min-w-[90px] justify-center dark:text-gray-200 text-sm md:text-base ${tab == "analise" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("analise")}}>
                    <Brain size={16} className="md:w-[18px] md:h-[18px]" />
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