import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Entrega } from "@/providers/entrega";
import { formatarData } from "@/providers/utils";
import { FileText, ExternalLink } from "lucide-react";

const Historico = () => {
    const { data: session } = useSession();
    const [entregas, setEntregas] = useState<Entrega[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEntregas = async () => {
            if (!session?.user?.id) return;

            try {
                setLoading(true);
                const response = await fetch(`/api/entregas/aluno/${session.user.id}`);
                if (!response.ok) {
                    console.error("Erro ao buscar entregas");
                    return;
                }
                const data = await response.json();
                setEntregas(data);
            } catch (error) {
                console.error("Erro ao buscar entregas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntregas();
    }, [session]);

    return (
        <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-4 md:p-6 dark:bg-gray-800">
            <h2 className="text-[16px] md:text-[18px] font-semibold mb-1.5 dark:text-white">Histórico de Envios</h2>
            <p className="dark:text-gray-300 text-sm md:text-base">
                {entregas.length} trabalho(s) enviado(s)
            </p>
            <div className="mt-4">
                {loading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
                    </div>
                ) : entregas.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                        Nenhum trabalho enviado ainda.
                    </p>
                ) : (
                    <ul>
                        {entregas.map((entrega) => (
                            <li key={entrega._id} className="border border-gray-200 dark:border-gray-700 p-3 md:p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                                    <h3 className="font-medium text-[16px] md:text-[18px] dark:text-white flex items-center gap-2">
                                        {entrega.trabalhoTitulo}
                                        {entrega.arquivoUrl && (
                                            <FileText size={16} className="text-blue-600 dark:text-blue-400" />
                                        )}
                                    </h3>
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
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">Título: {entrega.titulo}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Enviado em: {formatarData(entrega.dataRecebimento)}</p>
                                <p className="flex items-center gap-2">
                                    {entrega.nota ? (
                                        <>
                                            <span className="bg-green-100 dark:bg-green-900 px-1.5 py-1 text-[12px] rounded-xl text-green-900 dark:text-green-100">Avaliado</span>
                                            <span className={`font-medium text-[14px] ${
                                                entrega.nota >= 7
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : entrega.nota >= 5
                                                    ? 'text-yellow-600 dark:text-yellow-400'
                                                    : 'text-red-600 dark:text-red-400'
                                            }`}>
                                                Nota: {entrega.nota}/10
                                            </span>
                                        </>
                                    ) : (
                                        <span className="bg-yellow-100 dark:bg-yellow-900 px-1.5 py-1 text-[12px] rounded-xl text-yellow-900 dark:text-yellow-100">
                                            Aguardando Avaliação
                                        </span>
                                    )}
                                </p>
                                {entrega.feedback && (
                                    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                                        <p className="text-sm font-medium dark:text-gray-300 mb-1">Feedback do Professor:</p>
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
export default Historico;