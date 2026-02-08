import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Entrega } from "@/providers/entrega";
import { formatarData } from "@/providers/utils";

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
        <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Histórico de Envios</h2>
            <p className="dark:text-gray-300">
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
                            <li key={entrega._id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg mb-4 flex flex-col gap-2 dark:bg-gray-900">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-[18px] dark:text-white">{entrega.trabalhoTitulo}</h3>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">Título: {entrega.titulo}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Enviado em: {formatarData(entrega.dataRecebimento)}</p>
                                <p className="flex items-center gap-2">
                                    {entrega.nota ? (
                                        <>
                                            <span className="bg-green-100 dark:bg-green-900 px-1.5 py-1 text-[12px] rounded-xl text-green-900 dark:text-green-100">Avaliado</span>
                                            <span className="font-medium text-green-600 dark:text-green-400 text-[14px]">Nota: {entrega.nota}/10</span>
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