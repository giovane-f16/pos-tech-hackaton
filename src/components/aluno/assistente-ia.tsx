import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const AssistenteIa = () => {
    const [mensagens, setMensagens] = useState<Message[]>([]);
    const [inputMensagem, setInputMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Auto-scroll para a última mensagem
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [mensagens]);

    const enviarMensagem = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputMensagem.trim() || carregando) return;

        const novaMensagem: Message = {
            role: "user",
            content: inputMensagem.trim()
        };

        setMensagens(prev => [...prev, novaMensagem]);
        setInputMensagem("");
        setCarregando(true);

        try {
            const response = await fetch("/api/assistente", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    mensagens: [...mensagens, novaMensagem]
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erro ao enviar mensagem");
            }

            const data = await response.json();

            const respostaIA: Message = {
                role: "assistant",
                content: data.resposta
            };

            setMensagens(prev => [...prev, respostaIA]);
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            const mensagemErro: Message = {
                role: "assistant",
                content: error instanceof Error ? error.message : "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente."
            };
            setMensagens(prev => [...prev, mensagemErro]);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="border-gray-200 dark:border-gray-700 border rounded-lg p-6 dark:bg-gray-800">
            <h2 className="text-[18px] font-semibold mb-1.5 dark:text-white">Assistente de IA</h2>
            <p className="dark:text-gray-300">Converse com a IA para obter ajuda com seus trabalhos</p>

            <div
                ref={chatContainerRef}
                className="mt-6 border border-gray-300 dark:border-gray-700 rounded-md p-4 h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900 space-y-4"
            >
                {mensagens.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            Olá! Sou seu assistente de IA. Como posso ajudá-lo hoje?<br/>
                            <span className="text-sm">Pergunte sobre tecnologia, programação ou conceitos de desenvolvimento.</span>
                        </p>
                    </div>
                ) : (
                    mensagens.map((mensagem, index) => (
                        <div
                            key={index}
                            className={`flex ${mensagem.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                    mensagem.role === "user"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                }`}
                            >
                                <p className="text-sm whitespace-pre-wrap">{mensagem.content}</p>
                            </div>
                        </div>
                    ))
                )}

                {carregando && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={enviarMensagem} className="mt-4 flex gap-2">
                <input
                    type="text"
                    value={inputMensagem}
                    onChange={(e) => setInputMensagem(e.target.value)}
                    disabled={carregando}
                    placeholder="Digite sua pergunta..."
                    className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full border-input bg-gray-50 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    type="submit"
                    disabled={carregando || !inputMensagem.trim()}
                    className="bg-blue-600 dark:bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 dark:hover:bg-blue-700 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
export default AssistenteIa;