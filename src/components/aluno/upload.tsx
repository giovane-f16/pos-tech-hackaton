import { Upload, CalendarDays, CloudUpload } from "lucide-react";
import { useEffect, useState } from "react";
import { formatarData } from "@/providers/utils";
import { interfaceTrabalho }from "@/providers/trabalho";
import { useSession } from "next-auth/react";

const UploadDeTrabalho = () => {
    const { data: session } = useSession();
    const [trabalhos, setTrabalhos] = useState<interfaceTrabalho[]>([]);
    const [loading, setLoading] = useState(true);
    const [trabalhoSelecionado, setTrabalhoSelecionado] = useState<interfaceTrabalho | null>(null);
    const [titulo, setTitulo] = useState("");
    const [conteudo, setConteudo] = useState("");
    const [arquivo, setArquivo] = useState<File | null>(null);
    const [enviando, setEnviando] = useState(false);
    const [trabalhosPendentesIds, setTrabalhosPendentesIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (session?.user?.id) {
            carregarTrabalhosPendentes();
        }
        carregarTrabalhos();
    }, [session?.user?.id]);

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

    const carregarTrabalhosPendentes = async () => {
        try {
            const response = await fetch(`/api/entregas/aluno/${session?.user?.id}/pendentes`);
            if (response.ok) {
                const trabalhosPendentes = await response.json();
                const ids = new Set(trabalhosPendentes.map((t: interfaceTrabalho) => t._id) as string[]);
                setTrabalhosPendentesIds(ids);
            }
        } catch (error) {
            console.error("Erro ao carregar trabalhos pendentes:", error);
        }
    };

    const handleSelecionarTrabalho = (trabalho: interfaceTrabalho) => {
        setTrabalhoSelecionado(trabalho);
        setTitulo(trabalho.titulo);
        setConteudo("");
        setArquivo(null);
    };

    const handleCriarEntrega = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!trabalhoSelecionado) {
            alert("Selecione um trabalho antes de enviar");
            return;
        }

        if (!session?.user?.id) {
            alert("Você precisa estar logado para enviar uma entrega");
            return;
        }

        if (!titulo || !conteudo || !arquivo) {
            alert("Preencha todos os campos obrigatórios");
            return;
        }

        setEnviando(true);

        try {
            const uploadFormData = new FormData();
            uploadFormData.append("file", arquivo);

            const uploadResponse = await fetch("/api/files", {
                method: "POST",
                body: uploadFormData,
            });

            if (!uploadResponse.ok) {
                const uploadError = await uploadResponse.json();
                alert(`Erro ao fazer upload do arquivo: ${uploadError.error}`);
                return;
            }

            const uploadData = await uploadResponse.json();
            const arquivoUrl = `/api/files/${uploadData.fileId}`;

            const entregaData = {
                trabalhoId: trabalhoSelecionado._id,
                trabalhoTitulo: trabalhoSelecionado.titulo,
                alunoId: session.user.id,
                alunoNome: session.user.name,
                titulo,
                conteudo,
                arquivoUrl,
                dataLimiteDaEntrega: trabalhoSelecionado.dataEntrega,
                dataRecebimento: new Date(),
            };

            const response = await fetch("/api/entregas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(entregaData),
            });

            if (response.ok) {
                alert("Entrega enviada com sucesso!");
                setTitulo("");
                setConteudo("");
                setArquivo(null);
                setTrabalhoSelecionado(null);
                await carregarTrabalhosPendentes();
            } else {
                const error = await response.json();
                alert(`Erro ao enviar entrega: ${error.error}`);
            }
        } catch (error) {
            console.error("Erro ao criar entrega:", error);
            alert("Erro ao enviar entrega");
        } finally {
            setEnviando(false);
        }
    };

    const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setArquivo(e.target.files[0]);
        }
    };

    const validaEntregasPendentes = (trabalhoId: string): boolean => {
        return trabalhosPendentesIds.has(trabalhoId);
    };

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 border border-gray-200 rounded-lg p-4 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-[16px] md:text-[18px] font-semibold mb-1.5 dark:text-white">Trabalhos Pendentes/Realizados</h2>
                <p className="mb-6 text-sm md:text-base">{trabalhos.length} Trabalhos disponíveis</p>
                <ul className="mt-4">
                    {trabalhos.length === 0 && !loading ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                            Nenhum trabalho criado ainda
                        </p>
                    ) : (
                        trabalhos.map((trabalho) => (
                            <li
                                key={trabalho._id}
                                className={`mb-4 border rounded-lg p-3 md:p-4 dark:bg-gray-900 ${
                                    trabalhoSelecionado?._id === trabalho._id
                                        ? 'border-blue-500 dark:border-blue-400'
                                        : 'border-gray-200 dark:border-gray-700'
                                }`}
                            >
                                <h2 className="text-[16px] md:text-[18px] font-medium mb-2">{trabalho.titulo}</h2>
                                <p className="mb-4 text-sm md:text-base">{trabalho.descricao}</p>
                                <div className="flex flex-col md:flex-row mb-4 md:mb-6 text-[13px] md:text-[14px] gap-2 md:gap-x-4">
                                    <p className="flex items-center gap-x-2">
                                        <CloudUpload /> Criado: {formatarData(trabalho.dataCriacao)}
                                    </p>
                                    <p className="flex items-center gap-x-2">
                                        <CalendarDays />
                                        Entrega: {formatarData(trabalho.dataEntrega)}
                                    </p>
                                    <p className="flex items-center gap-x-2 font-bold">
                                        Status:
                                        {validaEntregasPendentes(trabalho._id) ? (
                                            <span className="text-yellow-600 dark:text-yellow-400 font-medium">Pendente</span>
                                        ) : (
                                            <span className="text-green-600 dark:text-green-400 font-medium flex items-center">Entregue</span>
                                        )}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleSelecionarTrabalho(trabalho)}
                                    className={`px-4 py-0.5 border rounded w-full font-medium transition-all ${
                                        trabalhoSelecionado?._id === trabalho._id
                                            ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
                                            : 'border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    } disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:border-gray-300 dark:disabled:border-gray-600`}
                                    disabled={!validaEntregasPendentes(trabalho._id)}
                                >
                                    {!validaEntregasPendentes(trabalho._id)
                                        ? 'Entregue'
                                        : trabalhoSelecionado?._id === trabalho._id
                                        ? 'Selecionado'
                                        : 'Selecionar'}
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className="w-full md:w-1/2 border-gray-200 dark:border-gray-700 border rounded-lg p-4 md:p-6 dark:bg-gray-800">
                <h2 className="text-[16px] md:text-[18px] font-semibold mb-1.5 dark:text-white">Enviar novo Trabalho</h2>
                <p className="dark:text-gray-300 text-sm md:text-base">Preencha os dados e faça o upload do seu trabalho acadêmico</p>
                {!trabalhoSelecionado && (
                    <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                            Selecione um trabalho na lista ao lado para enviar sua entrega
                        </p>
                    </div>
                )}
                {trabalhoSelecionado && (
                    <form onSubmit={handleCriarEntrega} className="mt-6 flex flex-col gap-y-2.5">
                        <label htmlFor="titulo" className="mb-0 font-medium dark:text-gray-200 text-sm md:text-base">Título do Trabalho</label>
                        <input
                            type="text"
                            id="titulo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Ex: Tech Challenge Fase 2"
                            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500"
                            disabled={!trabalhoSelecionado}
                            required
                        />
                        <label htmlFor="descricao" className="font-medium dark:text-gray-200 text-sm md:text-base">Descrição</label>
                        <textarea
                            id="descricao"
                            value={conteudo}
                            onChange={(e) => setConteudo(e.target.value)}
                            placeholder="Descreva brevemente o conteúdo do trabalho"
                            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 h-20"
                            disabled={!trabalhoSelecionado}
                            required
                        ></textarea>
                        <label htmlFor="upload" className="font-medium dark:text-gray-200 text-sm md:text-base">Arquivo do Trabalho</label>
                        <input
                            type="file"
                            id="upload"
                            onChange={handleArquivoChange}
                            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-100 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 cursor-pointer"
                            disabled={!trabalhoSelecionado}
                            required
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Formatos aceitos: PDF, DOC, DOCX, TXT (máx. 10MB)
                            {arquivo && <span className="text-green-600 dark:text-green-400 ml-2">✓ {arquivo.name}</span>}
                        </p>
                        <button
                            type="submit"
                            disabled={!trabalhoSelecionado || enviando}
                            className="bg-black dark:bg-gray-700 text-white rounded-lg px-4 py-1.5 w-full hover:bg-gray-800 dark:hover:bg-gray-600 cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Upload size={18} />
                            {enviando ? "Enviando..." : "Enviar"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
export default UploadDeTrabalho;