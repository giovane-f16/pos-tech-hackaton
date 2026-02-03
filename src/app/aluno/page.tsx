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

            <section className="mt-8">
                {tab == "upload" && (
                    <div className="border-gray-200 border rounded-lg p-6">
                        <h2 className="text-[18px] font-semibold mb-1.5">Enviar novo Trabalho</h2>
                        <p>Preencha os dados e faça o upload do seu trabalho acadêmico</p>
                        <form className="mt-6 flex flex-col gap-y-2.5">
                            <label htmlFor="titulo" className="mb-0 font-medium">Título do Trabalho</label>
                            <input type="text" placeholder="Ex: Tech Challenge Fase 2" className="border border-gray-300 rounded-md p-2 w-full border-input bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300" />
                            <label htmlFor="descricao" className="font-medium">Descrição</label>
                            <textarea placeholder="Descreva brevemente o conteúdo do trabalho" className="border border-gray-300 rounded-md p-2 w-full border-input bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 h-20"></textarea>
                            <label htmlFor="upload" className="font-medium">Arquivo do Trabalho</label>
                            <input type="file" name="" id="" className="border border-gray-300 rounded-md p-2 w-full border-input bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer" />
                            <p className="text-sm text-gray-500">Formatos aceitos: PDF, DOC, DOCX, TXT (máx. 10MB)</p>
                            <button type="submit" className="bg-black text-white rounded-lg px-4 py-1.5 w-full hover:bg-gray-800 cursor-pointer flex items-center justify-center gap-2 mt-2">
                                <Upload size={18} />
                                Enviar
                            </button>
                        </form>
                    </div>
                )}
                {tab == "history" && (
                    <div className="border-gray-200 border rounded-lg p-6">
                        <h2 className="text-[18px] font-semibold mb-1.5">Histórico de Envios</h2>
                        <p>Conteúdo do histórico de trabalhos enviados.</p>
                        <div className="mt-4">
                            <ul>
                                <li className="border border-gray-200 p-4 rounded-lg mb-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-[18px]">Tech Challenge Fase 1</h3>
                                        <button className="border border-gray-200 hover:border-gray-400 hover:bg-gray-100 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px]">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600">Enviado em: 10 de Janeiro de 2024</p>
                                    <p className="flex items-center gap-2">
                                        <span className="bg-green-100 px-1.5 py-1 text-[12px] rounded-xl text-green-900">Avaliado</span>
                                        <span className="font-medium text-green-600 text-[14px]">Nota: 9.5/10</span>
                                    </p>
                                </li>
                                <li className="border border-gray-200 p-4 rounded-lg mb-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-[18px]">Relatório de Pesquisa</h3>
                                        <button className="border border-gray-200 hover:border-gray-400 hover:bg-gray-100 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px]">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600">Enviado em: 22 de Fevereiro de 2024</p>
                                    <p className="flex items-center gap-2">
                                        <span className="bg-yellow-100 px-1.5 py-1 text-[12px] rounded-xl text-yellow-900">
                                            Aguardando Avaliação
                                        </span>
                                    </p>
                                </li>
                                <li className="border border-gray-200 p-4 rounded-lg mb-4 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-[18px]">Trabalho Final de Curso</h3>
                                        <button className="border border-gray-200 hover:border-gray-400 hover:bg-gray-100 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px]">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600">Enviado em: 15 de Março de 2024</p>
                                    <p className="flex items-center gap-2">
                                        <span className="bg-green-100 px-1.5 py-1 text-[12px] rounded-xl text-green-900">Avaliado</span>
                                        <span className="font-medium text-green-600 text-[14px]">Nota: 9.5/10</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                {tab == "assistant" && (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Assistente de IA</h2>
                        <p>Conteúdo do assistente de IA para ajudar os alunos.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
export default AlunoPage;