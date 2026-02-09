import { CloudUpload, CalendarDays, Send, Trash2, Edit } from "lucide-react"
import { useState, useEffect } from "react";
import { formatarData } from "@/providers/utils";
import { interfaceTrabalho }from "@/providers/trabalho";

const CriarTrabalho = (): React.ReactElement => {
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataEntrega, setDataEntrega] = useState("");
    const [trabalhos, setTrabalhos] = useState<interfaceTrabalho[]>([]);
    const [loading, setLoading] = useState(true);
    const [editandoId, setEditandoId] = useState<string | null>(null);

    const carregarTrabalhos = async () => {
        try {
            const response = await fetch("/api/trabalhos");
            if (response.ok) {
                const data = await response.json();
                setTrabalhos(data);
            }
        } catch (error) {
            console.error("Erro ao carregar trabalhos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarTrabalhos();
    }, []);

    const handleCriarTrabalho = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (editandoId) {
                // Atualizar trabalho existente
                const response = await fetch(`/api/trabalhos/${editandoId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ titulo, descricao, dataEntrega }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "Erro ao atualizar trabalho");
                }

                alert("Trabalho atualizado com sucesso!");
                setEditandoId(null);
            } else {
                // Criar novo trabalho
                const response = await fetch("/api/trabalhos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ titulo, descricao, dataEntrega }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || "Erro ao criar trabalho");
                }

                alert("Trabalho criado com sucesso!");
            }

            setTitulo("");
            setDescricao("");
            setDataEntrega("");
            carregarTrabalhos();
        } catch (error) {
            alert(`Erro ao processar trabalho: ${error}`);
        }
    }

    const handleDeletarTrabalho = async (id: string, titulo: string) => {
        if (!confirm(`Tem certeza que deseja deletar o trabalho "${titulo}"?`)) {
            return;
        }

        try {
            const response = await fetch(`/api/trabalhos/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Erro ao deletar trabalho");
            }

            alert("Trabalho deletado com sucesso!");
            carregarTrabalhos();
        } catch (error) {
            alert(`Erro ao deletar trabalho: ${error}`);
        }
    };

    const handleEditarTrabalho = (trabalho: interfaceTrabalho) => {
        setTitulo(trabalho.titulo);
        setDescricao(trabalho.descricao);
        setDataEntrega(trabalho.dataEntrega);
        setEditandoId(trabalho._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelarEdicao = () => {
        setTitulo("");
        setDescricao("");
        setDataEntrega("");
        setEditandoId(null);
    };

    return (
        <div className="flex flex-col md:flex-row w-full justify-between gap-6 mt-4">
            <div className="w-full md:w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                <h2 className="text-[16px] md:text-[18px] font-semibold mb-1.5 dark:text-white">
                    {editandoId ? "Editar Trabalho" : "Criar Novo Trabalho"}
                </h2>
                <p className="dark:text-gray-300 text-sm md:text-base">
                    {editandoId ? "Atualize as informações do trabalho" : "Crie e encaminhe um trabalho para seus alunos"}
                </p>
                <form onSubmit={handleCriarTrabalho} className="mt-4">
                    <label className="block mb-2 font-medium dark:text-white">
                        Título do Trabalho:
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: Hackaton - Fase 5"
                        className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-0.5 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />

                    <label className="block mt-4 mb-2 font-medium dark:text-white">
                        Descrição e Instruções:
                    </label>
                    <textarea
                        placeholder="Descreva o que os alunos devem fazer, requisitos, formato, etc.."
                        className="w-full border border-gray-300 rounded px-3 py-2 h-24 resize-none bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    ></textarea>

                    <label className="block mt-4 mb-2 font-medium dark:text-white">
                        Data de Entrega:
                    </label>
                    <input
                        type="date"
                        className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                        value={dataEntrega}
                        onChange={(e) => setDataEntrega(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full dark:bg-gray-800 dark:hover:bg-gray-600 flex items-center justify-center gap-x-2"
                    >
                        <Send size={16} />
                        {editandoId ? "Atualizar Trabalho" : "Criar Trabalho"}
                    </button>
                    {editandoId && (
                        <button
                            type="button"
                            onClick={handleCancelarEdicao}
                            className="mt-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 w-full dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                        >
                            Cancelar Edição
                        </button>
                    )}
                </form>
            </div>
            <div className="w-full md:w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-900 dark:border-gray-700">
                <h2 className="text-[16px] md:text-[18px] font-semibold mb-1.5 dark:text-white">
                    Trabalhos Criados
                </h2>
                <p className="mb-6 dark:text-gray-300 text-sm md:text-base">
                    {loading ? "Carregando..." : `${trabalhos.length} trabalho(s) encaminhado(s) para os alunos`}
                </p>
                <ul className="mt-4 max-h-125 overflow-y-auto">
                    {trabalhos.length === 0 && !loading ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                            Nenhum trabalho criado ainda
                        </p>
                    ) : (
                        trabalhos.map((trabalho) => (
                            <li key={trabalho._id} className="mb-4 border border-gray-200 rounded-lg p-3 md:p-4 dark:bg-gray-800 dark:border-gray-700">
                                <h2 className="text-[16px] md:text-[18px] font-medium mb-2 dark:text-white">
                                    {trabalho.titulo}
                                </h2>
                                <p className="mb-4 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                                    {trabalho.descricao}
                                </p>
                                <div className="flex flex-col md:flex-row mb-4 text-[13px] md:text-[14px] gap-2 md:gap-x-4 text-gray-600 dark:text-gray-400">
                                    <p className="flex items-center gap-x-2">
                                        <CloudUpload size={16} />
                                        Criado: {formatarData(trabalho.dataCriacao)}
                                    </p>
                                    <p className="flex items-center gap-x-2">
                                        <CalendarDays size={16} />
                                        Entrega: {formatarData(trabalho.dataEntrega)}
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={() => handleEditarTrabalho(trabalho)}
                                        className="flex-1 px-4 py-0.5 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 font-medium dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 flex items-center justify-center gap-x-2"
                                    >
                                        <Edit size={16} />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeletarTrabalho(trabalho._id, trabalho.titulo)}
                                        className="flex-1 px-4 py-0.5 border border-red-500 text-red-500 rounded hover:bg-red-50 font-medium dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20 flex items-center justify-center gap-x-2"
                                    >
                                        <Trash2 size={16} />
                                        Deletar
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CriarTrabalho;