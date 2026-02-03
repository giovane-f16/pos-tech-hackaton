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
                    <div className="border-gray-200 border-2 rounded-lg p-6">
                        <h2 className="text-[18x] font-semibold mb-1.5">Enviar novo Trabalho</h2>
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
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Histórico</h2>
                        <p>Conteúdo do histórico de trabalhos enviados.</p>
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