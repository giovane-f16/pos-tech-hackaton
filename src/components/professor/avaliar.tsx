import { Entrega } from "@/providers/entrega";
import { Brain, Loader2, FileText, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react";
import { formatarData } from "@/providers/utils";

interface AnaliseIA {
    porcentagemIa: number;
    analiseIa: string;
    confianca: 'baixa' | 'media' | 'alta';
}

const AvaliarTrabalho = (): React.ReactElement => {
    const [entregaSelecionada, setEntregaSelecionada] = useState<Entrega | null>(null);
    const [nota, setNota] = useState<number>(0);
    const [comentarios, setComentarios] = useState<string>("");
    const [entregas, setEntregas] = useState<Entrega[]>([]);
    const [analiseIA, setAnaliseIA] = useState<AnaliseIA | null>(null);
    const [analisando, setAnalisando] = useState<boolean>(false);

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

            // Carrega análise existente ou realiza nova análise
            if (entregaSelecionada.porcentagemIa !== undefined && entregaSelecionada.analiseIa) {
                setAnaliseIA({
                    porcentagemIa: entregaSelecionada.porcentagemIa,
                    analiseIa: entregaSelecionada.analiseIa,
                    confianca: entregaSelecionada.porcentagemIa < 30 ? 'baixa' : entregaSelecionada.porcentagemIa < 60 ? 'media' : 'alta'
                });
            } else {
                // Realiza análise automaticamente
                analisarConteudo(entregaSelecionada.conteudo);
            }
        } else {
            setNota(0);
            setComentarios("");
            setAnaliseIA(null);
        }
    }, [entregaSelecionada]);

    const handleSelecionarEntrega = (entrega: Entrega) => {
        setEntregaSelecionada(entrega);
    }

    const analisarConteudo = async (conteudo: string) => {
        setAnalisando(true);
        try {
            const response = await fetch("/api/analisar-ia", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ conteudo }),
            });

            if (!response.ok) {
                throw new Error("Erro ao analisar conteúdo");
            }

            const data = await response.json();
            setAnaliseIA(data);
        } catch (error) {
            console.error("Erro ao analisar IA:", error);
            setAnaliseIA({
                porcentagemIa: 0,
                analiseIa: "Erro ao analisar conteúdo. Tente novamente.",
                confianca: 'baixa'
            });
        } finally {
            setAnalisando(false);
        }
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
                    porcentagemIa: analiseIA?.porcentagemIa || 0,
                    analiseIa: analiseIA?.analiseIa || "Análise não realizada",
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
        <div className="flex flex-col md:flex-row w-full justify-between gap-6 mt-4">
            <div className="w-full md:w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                <h2 className="text-[16px] md:text-[18px] font-semibold mb-1.5 dark:text-white">Avaliar Trabalhos</h2>
                <p className="dark:text-gray-300 text-sm md:text-base">{entregas.length} trabalho(s) aguardando avaliação</p>
                <ul className="mt-4">
                    {entregas.length === 0 ? (
                        <li className="text-gray-500 dark:text-gray-400">Nenhum trabalho para avaliar no momento.</li>
                    ) : (
                        entregas.map((entrega) => (
                            <li
                                key={entrega._id}
                                className={`mb-4 border rounded-lg p-3 md:p-4 transition-all duration-200 cursor-pointer ${
                                    entregaSelecionada?._id === entrega._id
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 shadow-md'
                                        : 'border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                                onClick={() => handleSelecionarEntrega(entrega)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h2 className="text-[16px] md:text-[18px] font-medium dark:text-white flex items-center gap-2">
                                            {entrega.trabalhoTitulo}
                                            {entrega.arquivoUrl && (
                                                <FileText size={16} className="text-blue-600 dark:text-blue-400" />
                                            )}
                                        </h2>
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelecionarEntrega(entrega);
                                        }}
                                    >
                                        <Brain size={16} className="inline-block mr-2" />
                                        {entrega.porcentagemIa !== null ? `${entrega.porcentagemIa}% IA` : "Analisar"}
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className="w-full md:w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                <h2 className="text-[16px] md:text-[18px] font-semibold mb-1.5 dark:text-white">Avaliar Trabalhos</h2>
                {!entregaSelecionada ? (
                    <p className="dark:text-gray-300 text-sm md:text-base">Selecione um trabalho para avaliar.</p>
                ) : (
                    <>
                    <p className="mb-2 text-sm md:text-base">{entregaSelecionada.trabalhoTitulo}</p>
                    <p className="mb-6 text-sm md:text-base">Título: {entregaSelecionada.titulo}</p>
                    <div className="bg-gray-200 p-2 rounded dark:bg-gray-800">
                        <p><strong>Aluno:</strong> {entregaSelecionada.alunoNome}</p>
                        <p><strong>Data Recebida:</strong> {formatarData(entregaSelecionada.dataRecebimento)}</p>
                        {entregaSelecionada.arquivoUrl && (
                            <div className="mt-2 pt-2 border-t border-gray-300 dark:border-gray-700">
                                <p className="mb-2"><strong>Arquivo Enviado:</strong></p>
                                <a
                                    href={entregaSelecionada.arquivoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                    <FileText size={16} />
                                    Visualizar Arquivo
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                            {analisando ? (
                                <Loader2 size={20} className="dark:text-white animate-spin" />
                            ) : (
                                <Brain size={20} className="dark:text-white" />
                            )}
                            <p className="font-semibold dark:text-white">Análise de IA</p>
                            {!analisando && analiseIA && (
                                <button
                                    onClick={() => analisarConteudo(entregaSelecionada.conteudo)}
                                    className="ml-auto text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                                >
                                    Reanalisar
                                </button>
                            )}
                        </div>
                        {analisando ? (
                            <p className="text-sm text-gray-600 dark:text-gray-400">Analisando conteúdo...</p>
                        ) : analiseIA ? (
                            <>
                                <p className="text-sm mb-2 dark:text-gray-300">Uso de IA detectado</p>
                                <div className="relative w-full bg-gray-300 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                                    <div
                                        className={`absolute top-0 left-0 h-full transition-all duration-500 flex items-center justify-center ${
                                            analiseIA.porcentagemIa < 30 ? 'bg-green-500' :
                                            analiseIA.porcentagemIa < 60 ? 'bg-yellow-500' :
                                            'bg-linear-to-r from-yellow-400 to-orange-500'
                                        }`}
                                        style={{ width: `${analiseIA.porcentagemIa}%` }}
                                    >
                                        <span className="text-white font-semibold text-sm">{analiseIA.porcentagemIa}%</span>
                                    </div>
                                </div>
                                <p className="text-[12px] md:text-[14px] text-gray-600 dark:text-gray-400 mt-2">
                                    {analiseIA.analiseIa}
                                </p>
                                <div className="mt-2">
                                    <span className={`text-xs px-2 py-1 rounded ${
                                        analiseIA.confianca === 'baixa' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                        analiseIA.confianca === 'media' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                        'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                    }`}>
                                        Confiança: {analiseIA.confianca}
                                    </span>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400">Análise não disponível</p>
                        )}
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