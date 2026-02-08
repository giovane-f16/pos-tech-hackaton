import { Entrega } from "@/providers/entrega";
import { Brain } from "lucide-react"
import { useState, useEffect } from "react";
import { formatarData } from "@/providers/utils";

const AvaliarTrabalho = (): React.ReactElement => {
    const [entregaSelecionada, setEntregaSelecionada] = useState<Entrega | null>(null);
    const [nota, setNota] = useState<number>(0);
    const [comentarios, setComentarios] = useState<string>("");
    const [entregas, setEntregas] = useState<Entrega[]>([]);

    const getEntregas = async () => {
        try {
            const response = await fetch("/api/entregas", { method: "GET" });
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setEntregas(data);
        } catch (error) {
            console.error("Erro ao buscar entregas:", error);
        }
    }

    useEffect(() => {
        getEntregas();
        if (entregaSelecionada) {
            setNota(entregaSelecionada.nota || 0);
            setComentarios(entregaSelecionada.feedback || "");
        } else {
            setNota(0);
            setComentarios("");
        }
    }, [entregaSelecionada]);

    const handleSelecionarEntrega = (entrega: Entrega) => {
        setEntregaSelecionada(entrega);
    }

    const avaliarEntrega = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/entregas/${entregaSelecionada?._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nota,
                    feedback: comentarios,
                    dataAvaliado: new Date(),
                    porcentagemIa: 75, // Exemplo fixo, idealmente isso viria da análise de IA real
                    analiseIa: "Alta probabilidade de conteúdo gerado por IA", // Exemplo fixo, idealmente isso viria da análise de IA real
                }),
            });

            if (!response.ok) {
                alert("Erro ao enviar avaliação");
                return;
            }

            alert("Avaliação enviada com sucesso!");
            return;
        } catch (error) {
            alert("Erro ao enviar avaliação");
            return;
        } finally {
            setEntregaSelecionada(null);
            getEntregas();
        }
    }

    return (
        <div className="flex w-full justify-between gap-x-6 mt-4">
            <div className="w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Avaliar Trabalhos</h2>
                <p className="dark:text-gray-300">{entregas.length} trabalho(s) aguardando avaliação</p>
                <ul className="mt-4">
                    {entregas.length === 0 ? (
                        <li className="text-gray-500 dark:text-gray-400">Nenhum trabalho para avaliar no momento.</li>
                    ) : (
                        entregas.map((entrega) => (
                            <li
                                key={entrega._id}
                                className={`mb-4 border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                                    entregaSelecionada?._id === entrega._id
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 shadow-md'
                                        : 'border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                                onClick={() => handleSelecionarEntrega(entrega)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h2 className="text-[18px] font-medium dark:text-white">{entrega.trabalhoTitulo}</h2>
                                        <p className="text-gray-700 dark:text-gray-300">Aluno: {entrega.alunoNome}</p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Data limite: {formatarData(entrega.dataLimiteDaEntrega)}</p>
                                        {entrega.nota && entrega.dataAvaliado && (
                                            <>
                                            <p className="text-green-600 dark:text-green-400 text-sm font-medium mt-1">
                                                ✓ Avaliado - Nota: {entrega.nota} <span className="text-black dark:text-white">Avaliado em {formatarData(entrega.dataAvaliado)}</span>
                                            </p>
                                            </>
                                        )}
                                    </div>
                                    {entregaSelecionada?._id === entrega._id && (
                                        <div className="ml-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-x-2 mt-3">
                                    <button
                                        className={`px-4 py-0.5 rounded transition-colors ${
                                            entregaSelecionada?._id === entrega._id
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'bg-black text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600'
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelecionarEntrega(entrega);
                                        }}
                                    >
                                        {entrega.nota ? "Reavaliar" : "Avaliar"}
                                    </button>
                                    <button
                                        className="px-2 py-0.5 rounded flex items-center hover:bg-gray-200 border border-gray-200 font-medium dark:hover:bg-gray-600 dark:border-gray-600 dark:text-gray-300"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Brain size={16} className="inline-block mr-2" />
                                        Análise IA
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className="w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Avaliar Trabalhos</h2>
                {!entregaSelecionada ? (
                    <p className="dark:text-gray-300">Selecione um trabalho para avaliar.</p>
                ) : (
                    <>
                    <p className="mb-2">{entregaSelecionada.trabalhoTitulo}</p>
                    <p className="mb-6">Título: {entregaSelecionada.titulo}</p>
                    <div className="bg-gray-200 p-2 rounded dark:bg-gray-800">
                        <p><strong>Aluno:</strong> {entregaSelecionada.alunoNome}</p>
                        <p><strong>Data Recebida:</strong> {formatarData(entregaSelecionada.dataRecebimento)}</p>
                    </div>
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <Brain size={20} className="dark:text-white" />
                            <p className="font-semibold dark:text-white">Análise de IA</p>
                        </div>
                        <p className="text-sm mb-2 dark:text-gray-300">Uso de IA detectado</p>
                        <div className="relative w-full bg-gray-300 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-linear-to-r from-yellow-400 to-orange-500 transition-all duration-500 flex items-center justify-center"
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
                        <form onSubmit={avaliarEntrega}>
                            <label className="block mt-6 mb-2 font-medium dark:text-white">Nota (0-10):</label>
                            <input type="number" min="0" max="10" step="0.1" value={nota} onChange={(e) => setNota(e.target.value ? parseFloat(e.target.value) : 0)} className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500" />

                            <label className="block mt-4 mb-2 font-medium dark:text-white">Comentários:</label>
                            <textarea value={comentarios} onChange={(e) => setComentarios(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>

                            <div className="flex gap-x-2">
                                <button type="submit" className="mt-4 bg-black text-white px-4 py-1 rounded hover:bg-gray-800 w-3/4 dark:bg-gray-800 dark:hover:bg-gray-600">
                                    Enviar Avaliação
                                </button>

                                <button onClick={() => {setEntregaSelecionada(null)}} className="mt-4 px-2 py-1 rounded hover:bg-gray-200 w-1/4 border border-gray-300 dark:border-gray-600  dark:hover:bg-gray-600 font-medium" type="button">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AvaliarTrabalho;