'use client';

import { Upload, History, Brain, Send } from "lucide-react";
import { useState } from "react";

const AlunoPage = () => {
    const [tab, setTab] = useState("upload");

    return (
        <main className="container mx-auto px-4 py-8">
            <section className="flex justify-between px-4 py-1.5 rounded-4xl bg-gray-200 dark:bg-gray-800">
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center dark:text-gray-200 ${tab == "upload" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("upload")}}>
                    <Upload size={18} />
                    Enviar Trabalho
                </button>
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center dark:text-gray-200 ${tab == "history" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("history")}}>
                    <History size={18} />
                    Histórico
                </button>
                <button className={`flex items-center cursor-pointer gap-x-3 font-medium px-4 rounded-2xl w-1/3 justify-center dark:text-gray-200 ${tab == "assistant" ? "bg-white dark:bg-gray-700 dark:text-white" : ""}`} onClick={() => {setTab("assistant")}}>
                    <Brain size={18} />
                    Assistente de IA
                </button>
            </section>

            <section className="mt-8">
                {tab == "upload" && (
                    <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800">
                        <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Enviar novo Trabalho</h2>
                        <p className="dark:text-gray-300">Preencha os dados e faça o upload do seu trabalho acadêmico</p>
                        <form className="mt-6 flex flex-col gap-y-2.5">
                            <label htmlFor="titulo" className="mb-0 font-medium dark:text-gray-200">Título do Trabalho</label>
                            <input type="text" placeholder="Ex: Tech Challenge Fase 2" className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500" />
                            <label htmlFor="descricao" className="font-medium dark:text-gray-200">Descrição</label>
                            <textarea placeholder="Descreva brevemente o conteúdo do trabalho" className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 h-20"></textarea>
                            <label htmlFor="upload" className="font-medium dark:text-gray-200">Arquivo do Trabalho</label>
                            <input type="file" name="" id="" className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 cursor-pointer" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Formatos aceitos: PDF, DOC, DOCX, TXT (máx. 10MB)</p>
                            <button type="submit" className="bg-black dark:bg-gray-700 text-white rounded-lg px-4 py-1.5 w-full hover:bg-gray-800 dark:hover:bg-gray-600 cursor-pointer flex items-center justify-center gap-2 mt-2">
                                <Upload size={18} />
                                Enviar
                            </button>
                        </form>
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
                {tab == "assistant" && (
                    <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800">
                        <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Assistente de IA</h2>
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
export default AlunoPage;