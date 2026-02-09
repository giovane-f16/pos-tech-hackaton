import { useEffect, useState } from "react";
import { Entrega } from "@/providers/entrega";
import { formatarData } from "@/providers/utils";
import { FileText, ExternalLink } from "lucide-react";

const HistoricoTrabalhos = (): React.ReactElement => {
    const [entregas, setEntregas] = useState<Entrega[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntregas = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/entregas");
                if (!response.ok) {
                    console.error("Erro ao buscar entregas");
                    return;
                }
                const data = await response.json();
                const entregasAvaliadas = data.filter((entrega: Entrega) => entrega.nota !== null && entrega.nota !== undefined);
                setEntregas(entregasAvaliadas);
            } catch (error) {
                console.error("Erro ao buscar entregas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntregas();
    }, []);

    return (
        <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Histórico de Avaliações</h2>
            <p className="dark:text-gray-300">
                {entregas.length} trabalho(s) avaliado(s) por você.
            </p>
            <div className="mt-4">
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                ) : entregas.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                        Nenhum trabalho avaliado ainda.
                    </p>
                ) : (
                    <ul>
                        {entregas.map((entrega) => (
                            <li key={entrega._id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-[18px] dark:text-white flex items-center gap-2">
                                        {entrega.trabalhoTitulo}
                                        {entrega.arquivoUrl && (
                                            <FileText size={16} className="text-blue-600 dark:text-blue-400" />
                                        )}
                                    </h3>
                                    <div className="flex gap-2">
                                        {entrega.arquivoUrl && (
                                            <a
                                                href={entrega.arquivoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="border border-blue-500 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded px-3 py-1 cursor-pointer flex items-center justify-center gap-1.5 font-medium text-[12px] text-blue-600 dark:text-blue-400"
                                            >
                                                <FileText size={14} />
                                                Ver Arquivo
                                                <ExternalLink size={12} />
                                            </a>
                                        )}
                                        <button className="border border-gray-200 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-4 py-1 cursor-pointer flex items-center justify-center gap-2 font-medium text-[12px] dark:text-gray-200">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">Título da entrega: {entrega.titulo}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Aluno: {entrega.alunoNome}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Avaliado em: {entrega.dataAvaliado ? formatarData(entrega.dataAvaliado) : 'Não avaliado'}</p>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-green-600 dark:text-green-400 text-[14px]">Nota: {entrega.nota}/10</span>
                                    {entrega.porcentagemIa !== null && entrega.porcentagemIa !== undefined && (
                                        <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded text-[12px] font-medium">
                                            IA: {entrega.porcentagemIa}%
                                        </span>
                                    )}
                                </div>
                                {entrega.feedback && (
                                    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                                        <p className="text-sm font-medium dark:text-gray-300 mb-1">Seu feedback:</p>
                                        <p className="text-sm text-gray-700 dark:text-gray-400">{entrega.feedback}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default HistoricoTrabalhos;