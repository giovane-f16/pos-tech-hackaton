"use client";

import { CircleCheckBig, History, Brain, Send, CircleAlert, CloudUpload, CalendarDays } from "lucide-react";
import { useState } from "react";

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
                    <div className="flex w-full justify-between gap-x-6 mt-4">
                        <div className="w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                            <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Criar Novo Trabalho</h2>
                            <p className="dark:text-gray-300">Crie e encaminhe um trabalho para seus alunos</p>
                            <form action="" className="mt-4">
                                <label className="block mb-2 font-medium dark:text-white">Título do Trabalho:</label>
                                <input type="text" placeholder="Ex: Hackaton - Fase 5" className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-0.5 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500" />

                                <label className="block mt-4 mb-2 font-medium dark:text-white">Descrição e Instruções:</label>
                                <textarea placeholder="Descreva o que os alunos devem fazer, requisitos, formato, etc.." className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>

                                <label className="block mt-4 mb-2 font-medium dark:text-white">Data de Entrega:</label>
                                <input type="date" className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500" />

                                <button type="submit" className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full dark:bg-gray-800 dark:hover:bg-gray-600 flex items-center justify-center gap-x-2">
                                    <Send size={16} />
                                    Criar Trabalho
                                </button>
                            </form>
                        </div>
                        <div className="w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                            <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Trabalhos Criados</h2>
                            <p className="mb-6">1 Trabalhos encaminhados para os alunos</p>
                            <ul className="mt-4">
                                <li className="mb-4 border border-gray-200 rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700">
                                    <h2 className="text-[18px] font-medium mb-2">Redação - Tecnologia e Saude</h2>
                                    <p className="mb-4">Escrever uma redação sobre os impactos da tecnologia na saúde.</p>
                                    <div className="flex mb-6 text-[14px] gap-x-4">
                                        <p className="flex items-center gap-x-2">
                                            <CloudUpload /> Criado: 29/01/2026
                                        </p>
                                        <p className="flex items-center gap-x-2">
                                            <CalendarDays />
                                            Entrega: 14/02/2026
                                        </p>
                                    </div>
                                    <button className="px-4 py-0.5 border border-gray-200 rounded hover:bg-gray-200 w-full font-medium dark:hover:bg-gray-600">Ver detalhes</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {tab == "avaliar" && (
                    <div className="flex w-full justify-between gap-x-6 mt-4">
                        <div className="w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                            <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Avaliar Trabalhos</h2>
                            <p className="dark:text-gray-300">2 trabalhos aguardando avaliação</p>
                            <ul className="mt-4">
                                <li className="mb-4 border border-gray-200 rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700">
                                    <h2 className="text-[18px] font-medium">Redação - Tecnologia e Saude</h2>
                                    <p>Aluno: Maria Santos</p>
                                    <p>Enviado em: 24/01/2026</p>
                                    <div className="flex gap-x-2 mt-2">
                                        <button className="bg-black text-white px-4 py-0.5 rounded hover:bg-gray-800">Avaliar</button>
                                        <button className="px-2 py-0.5 rounded flex items-center hover:bg-gray-200 border border-gray-200 font-medium dark:hover:bg-gray-600">
                                            <Brain size={16} className="inline-block mr-2" />
                                            Análise IA
                                        </button>
                                    </div>
                                </li>
                                <li className="mb-4 border border-gray-200 rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700">
                                    <h2 className="text-[18px] font-medium">Redação - Tecnologia e Saude</h2>
                                    <p>Aluno: Maria Santos</p>
                                    <p>Enviado em: 24/01/2026</p>
                                    <div className="flex gap-x-2 mt-2">
                                        <button className="bg-black text-white px-4 py-0.5 rounded hover:bg-gray-800">Avaliar</button>
                                        <button className="px-2 py-0.5 rounded flex items-center hover:bg-gray-200 border border-gray-200 font-medium dark:hover:bg-gray-600">
                                            <Brain size={16} className="inline-block mr-2" />
                                            Análise IA
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                            <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Avaliar Trabalhos</h2>
                            <p className="mb-6">Redação - Tecnologia e Saude</p>
                            <div className="bg-gray-200 p-2 rounded dark:bg-gray-800">
                                <p><strong>Aluno:</strong> Maria Santos</p>
                                <p><strong>Data:</strong> 24/01/2026</p>
                            </div>
                            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                    <Brain size={20} className="dark:text-white" />
                                    <p className="font-semibold dark:text-white">Análise de IA</p>
                                </div>
                                <p className="text-sm mb-2 dark:text-gray-300">Uso de IA detectado</p>
                                <div className="relative w-full bg-gray-300 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 flex items-center justify-center"
                                        style={{ width: '75%' }}
                                    >
                                        <span className="text-white font-semibold text-sm">75%</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                    Alta probabilidade de conteúdo gerado por IA
                                </p>
                            </div>

                            <div>
                                <form action="">
                                    <label className="block mt-6 mb-2 font-medium dark:text-white">Nota (0-10):</label>
                                    <input type="number" min="0" max="10" step="0.1" className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500" />

                                    <label className="block mt-4 mb-2 font-medium dark:text-white">Comentários:</label>
                                    <textarea className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>

                                    <div className="flex gap-x-2">
                                        <button type="submit" className="mt-4 bg-black text-white px-4 py-1 rounded hover:bg-gray-800 w-3/4 dark:bg-gray-800 dark:hover:bg-gray-600">
                                            Enviar Avaliação
                                        </button>

                                        <button className="mt-4 px-2 py-1 rounded hover:bg-gray-200 w-1/4 border border-gray-300 dark:border-gray-600  dark:hover:bg-gray-600 font-medium" type="button">
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {tab == "history" && (
                    <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800">
                        <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Histórico de Avaliações</h2>
                        <p className="dark:text-gray-300">Trabalhos já avaliados por você.</p>
                        <div className="mt-4">
                            <ul>
                                <li className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-[18px] dark:text-white">Tech Challenge Fase 1</h3>
                                        <button className="border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px] dark:text-gray-200">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Aluno: João Silva</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Avaliado em: 10 de Janeiro de 2024</p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-medium text-[14px]">Nota: 9.5/10</span>
                                        <span className="px-2 py-0.5 bg-gray-200 rounded text-[12px] dark:bg-gray-600">IA: 15%</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {tab == "analise" && (
                    <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800">
                        <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Ferramenta de Análise de IA</h2>
                        <p className="dark:text-gray-300">Análise de uso de IA nos trabalhos dos alunos</p>
                        <div className="p-4 mt-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 flex gap-x-2 dark:bg-blue-200">
                            <CircleAlert className=""/>
                            <div>
                                <h2 className="flex items-center gap-2 mb-2 font-semibold">
                                    Como funciona a análise de IA
                                </h2>
                                <p>Nossa ferramenta analisa o texto do trabalho e identifica padrões característicos de conteúdo gerado por IA, fornecendo uma estimativa percentual do uso de IA.</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-[18px] font-medium">Trabalhos recentes</h3>
                            <div className="mt-4">
                                <ul>
                                    <li className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-medium text-[18px] dark:text-white">Tech Challenge Fase 1</h3>
                                            <button className="border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px] dark:text-gray-200">
                                                Reanalisar
                                            </button>
                                        </div>
                                        <p className="text-sm">Uso de IA detectado</p>
                                        <div className="relative w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 flex items-center justify-center"
                                                style={{ width: '75%' }}
                                            >
                                                <span className="text-white font-semibold text-sm">75%</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
export default ProfessorPage;