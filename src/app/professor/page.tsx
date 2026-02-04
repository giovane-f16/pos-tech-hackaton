"use client";

import { CircleCheckBig, History, Brain, Send } from "lucide-react";
import { useState } from "react";

const ProfessorPage = () => {
    const [tab, setTab] = useState("avaliar");

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="flex justify-between px-4 py-1.5 rounded-4xl bg-gray-200 dark:bg-gray-800">
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
                                        <button className="px-2 py-0.5 rounded flex items-center hover:bg-gray-200 border border-gray-200 font-medium">
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
                                        <button className="px-2 py-0.5 rounded flex items-center hover:bg-gray-200 border border-gray-200 font-medium">
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
                            <div className="bg-gray-200 p-2 rounded">
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
                                        <button type="submit" className="mt-4 bg-black text-white px-6 py-1 rounded hover:bg-gray-800 w-3/4">
                                            Enviar Avaliação
                                        </button>

                                        <button className="mt-4 px-2 py-1 rounded hover:bg-gray-200 w-1/4 border border-gray-300 dark:border-gray-600 font-medium" type="button">
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
                        <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Histórico de Envios</h2>
                        <p className="dark:text-gray-300">Conteúdo do histórico de trabalhos enviados.</p>
                        <div className="mt-4">
                            <ul>
                                <li className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-[18px] dark:text-white">Tech Challenge Fase 1</h3>
                                        <button className="border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px] dark:text-gray-200">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Enviado em: 10 de Janeiro de 2024</p>
                                    <p className="flex items-center gap-2">
                                        <span className="bg-green-100 dark:bg-green-900 px-1.5 py-1 text-[12px] rounded-xl text-green-900 dark:text-green-100">Avaliado</span>
                                        <span className="font-medium text-green-600 dark:text-green-400 text-[14px]">Nota: 9.5/10</span>
                                    </p>
                                </li>
                                <li className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-[18px] dark:text-white">Relatório de Pesquisa</h3>
                                        <button className="border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px] dark:text-gray-200">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Enviado em: 22 de Fevereiro de 2024</p>
                                    <p className="flex items-center gap-2">
                                        <span className="bg-yellow-100 dark:bg-yellow-900 px-1.5 py-1 text-[12px] rounded-xl text-yellow-900 dark:text-yellow-100">
                                            Aguardando Avaliação
                                        </span>
                                    </p>
                                </li>
                                <li className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-[18px] dark:text-white">Trabalho Final de Curso</h3>
                                        <button className="border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px] dark:text-gray-200">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Enviado em: 15 de Março de 2024</p>
                                    <p className="flex items-center gap-2">
                                        <span className="bg-green-100 dark:bg-green-900 px-1.5 py-1 text-[12px] rounded-xl text-green-900 dark:text-green-100">Avaliado</span>
                                        <span className="font-medium text-green-600 dark:text-green-400 text-[14px]">Nota: 9.5/10</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {tab == "analise" && (
                    <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800">
                        <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Análise de IA</h2>
                        <p className="dark:text-gray-300">Converse com a IA para obter ajuda com seus trabalhos</p>
                        <div className="mt-6 border border-gray-300 dark:border-gray-700 rounded-md p-4 h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                            <p className="text-gray-500 dark:text-gray-400">Área de chat com a IA (em desenvolvimento)</p>
                        </div>
                        <form className="mt-4 flex gap-2">
                            <input type="text" placeholder="Digite sua pergunta..." className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500" />
                            <button type="submit" className="bg-black dark:bg-gray-700 text-white rounded-lg px-4 py-1.0 hover:bg-gray-800 dark:hover:bg-gray-600 cursor-pointer flex items-center justify-center gap-2">
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                )}
            </section>
        </main>
    );
}
export default ProfessorPage;