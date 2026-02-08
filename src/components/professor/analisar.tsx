import { CircleAlert, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { formatarData } from "@/providers/utils";

interface EntregaComAnalise {
    _id: string;
    trabalhoTitulo: string;
    alunoNome: string;
    porcentagemIa?: number;
    analiseIa?: string;
    dataAvaliado?: Date;
    dataRecebimento: Date;
}

const AnalisarComIA = (): React.ReactElement => {
    const [entregas, setEntregas] = useState<EntregaComAnalise[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [reanalisando, setReanalisando] = useState<string | null>(null);

    const carregarEntregas = async () => {
        try {
            const response = await fetch("/api/entregas", { method: "GET" });
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            // Filtra apenas entregas que já foram analisadas
            const entregasAnalisadas = data.filter((e: EntregaComAnalise) => e.porcentagemIa !== undefined);
            setEntregas(entregasAnalisadas);
        } catch (error) {
            console.error("Erro ao buscar entregas:", error);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregarEntregas();
    }, []);

    const reanalisar = async (entregaId: string) => {
        setReanalisando(entregaId);
        try {
            // Busca os dados completos da entrega
            const responseEntrega = await fetch(`/api/entregas/${entregaId}`, {
                method: "GET",
            });

            if (!responseEntrega.ok) {
                throw new Error("Erro ao buscar entrega");
            }

            const entregaCompleta = await responseEntrega.json();

            // Realiza nova análise
            const responseAnalise = await fetch("/api/analisar-ia", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ conteudo: entregaCompleta.conteudo }),
            });

            if (!responseAnalise.ok) {
                throw new Error("Erro ao analisar");
            }

            const analise = await responseAnalise.json();

            // Atualiza a entrega com nova análise
            await fetch(`/api/entregas/${entregaId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    porcentagemIa: analise.porcentagemIa,
                    analiseIa: analise.analiseIa,
                }),
            });

            // Recarrega lista
            await carregarEntregas();
        } catch (error) {
            console.error("Erro ao reanalisar:", error);
            alert("Erro ao reanalisar trabalho");
        } finally {
            setReanalisando(null);
        }
    };

    return (
        <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Ferramenta de Análise de IA</h2>
            <p className="dark:text-gray-300">Análise de uso de IA nos trabalhos dos alunos</p>
            <div className="p-4 mt-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 flex gap-x-2 dark:bg-blue-200">
                <CircleAlert className="" />
                <div>
                    <h2 className="flex items-center gap-2 mb-2 font-semibold">
                        Como funciona a análise de IA
                    </h2>
                    <p>Nossa ferramenta analisa o texto do trabalho e identifica padrões característicos de conteúdo gerado por IA, fornecendo uma estimativa percentual do uso de IA.</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-[18px] font-medium dark:text-white">Trabalhos analisados</h3>
                <div className="mt-4">
                    {carregando ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="animate-spin dark:text-gray-400" size={24} />
                            <span className="ml-2 text-gray-600 dark:text-gray-400">Carregando...</span>
                        </div>
                    ) : entregas.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                            Nenhum trabalho analisado ainda. Avalie trabalhos para ver as análises aqui.
                        </p>
                    ) : (
                        <ul>
                            {entregas.map((entrega) => (
                                <li key={entrega._id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-[18px] dark:text-white">{entrega.trabalhoTitulo}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Aluno: {entrega.alunoNome}
                                            </p>
                                            {entrega.dataAvaliado && (
                                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                                    Avaliado em: {formatarData(entrega.dataAvaliado)}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            className="border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px] dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                            onClick={() => reanalisar(entrega._id)}
                                            disabled={reanalisando === entrega._id}
                                        >
                                            {reanalisando === entrega._id ? (
                                                <>
                                                    <Loader2 size={14} className="animate-spin" />
                                                    Analisando...
                                                </>
                                            ) : (
                                                "Reanalisar"
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-sm dark:text-gray-300">Uso de IA detectado</p>
                                    <div className="relative w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                                        <div
                                            className={`absolute top-0 left-0 h-full transition-all duration-500 flex items-center justify-center ${
                                                (entrega.porcentagemIa || 0) < 30 ? 'bg-green-500' :
                                                (entrega.porcentagemIa || 0) < 60 ? 'bg-yellow-500' :
                                                'bg-linear-to-r from-yellow-400 to-orange-500'
                                            }`}
                                            style={{ width: `${entrega.porcentagemIa || 0}%` }}
                                        >
                                            <span className="text-white font-semibold text-sm">{entrega.porcentagemIa || 0}%</span>
                                        </div>
                                    </div>
                                    {entrega.analiseIa && (
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            {entrega.analiseIa}
                                        </p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
export default AnalisarComIA;