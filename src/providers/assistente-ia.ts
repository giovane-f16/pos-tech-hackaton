export interface Message {
    role: "user" | "assistant" | "system";
    content: string;
}

class AssistenteIaProvider {
    private apiKey: string;
    private model: string;
    private endpoint: string;
    private isProd: boolean;

    constructor() {
        this.apiKey   = process.env.IA_API_KEY  || "";
        this.model    = process.env.IA_MODEL    || "";
        this.endpoint = process.env.IA_ENDPOINT || "";
        this.isProd   = process.env.ASSISTENTE_IA_PROD === "true";
    }

    public async enviarMensagem(mensagens: Message[]): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
                if (!this.isProd) {
                    console.log("[Assistente IA] Modo DESENVOLVIMENTO - Usando resposta simulada");
                    await new Promise(r => setTimeout(r, 500 + Math.random() * 1000));
                    const respostaSimulada = this.gerarRespostaSimulada(mensagens);
                    resolve(respostaSimulada);
                    return;
                }

                console.log("[Assistente IA] Modo PRODUÇÃO - Usando API real");
                if (!this.apiKey) {
                    reject("API Key não configurada. Configure a variável IA_API_KEY no arquivo .env");
                    return;
                }

                if (!this.model) {
                    reject("Modelo de IA não configurado. Configure a variável IA_MODEL no arquivo .env");
                    return;
                }

                if (!this.endpoint) {
                    reject("Endpoint da API de IA não configurado. Configure a variável IA_ENDPOINT no arquivo .env");
                    return;
                }

                const systemMessage: Message = {
                    role: "system",
                    content: "Você é um assistente educacional especializado em tecnologia e programação. Seu papel é ajudar alunos com dúvidas sobre tecnologia, programação, desenvolvimento de software e conceitos relacionados. Seja claro, didático e encorajador. Forneça exemplos práticos quando apropriado e sempre incentive o aprendizado."
                };

                const response = await fetch(this.endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.apiKey}`,
                    },
                    body: JSON.stringify({
                        model: this.model,
                        messages: [systemMessage, ...mensagens],
                        temperature: 0.7,
                        max_tokens: 1000,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    reject(`Erro na API de IA: ${errorData.error?.message || response.statusText}`);
                    return;
                }

                const data = await response.json();
                const resposta = data.choices[0]?.message?.content || "Desculpe, não consegui gerar uma resposta.";
                resolve(resposta);
            } catch (error) {
                reject(`Erro ao comunicar com a IA: ${error}`);
            }
        });
    }

    /**
     * Gera uma resposta simulada para modo de desenvolvimento
     */
    private gerarRespostaSimulada(mensagens: Message[]): string {
        const ultimaMensagem = mensagens[mensagens.length - 1]?.content?.toLowerCase() || "";

        // Respostas contextualizadas baseadas em palavras-chave
        if (ultimaMensagem.includes("olá") || ultimaMensagem.includes("oi") || ultimaMensagem.includes("hello")) {
            return "Olá! Sou o Assistente de IA (modo desenvolvimento). Como posso ajudar você hoje com suas dúvidas sobre tecnologia e programação?";
        }

        if (ultimaMensagem.includes("javascript") || ultimaMensagem.includes("js")) {
            return "JavaScript é uma linguagem de programação versátil, muito usada no desenvolvimento web. É executada no navegador e também no servidor com Node.js. Você tem alguma dúvida específica sobre JavaScript?";
        }

        if (ultimaMensagem.includes("python")) {
            return "Python é uma linguagem de programação de alto nível, conhecida pela sua sintaxe clara e legível. É muito usada em ciência de dados, automação, desenvolvimento web e inteligência artificial. O que você gostaria de saber sobre Python?";
        }

        if (ultimaMensagem.includes("react") || ultimaMensagem.includes("next")) {
            return "React e Next.js são ferramentas poderosas para desenvolvimento web moderno! React é uma biblioteca para criar interfaces, enquanto Next.js é um framework que adiciona recursos como renderização server-side e roteamento. Precisa de ajuda com algum conceito específico?";
        }

        if (ultimaMensagem.includes("banco de dados") || ultimaMensagem.includes("database") || ultimaMensagem.includes("sql") || ultimaMensagem.includes("mongodb")) {
            return "Bancos de dados são fundamentais para armazenar e gerenciar informações. Existem bancos relacionais (SQL) e não-relacionais (NoSQL). Cada tipo tem suas vantagens dependendo do caso de uso. Sobre qual tipo você quer aprender mais?";
        }

        if (ultimaMensagem.includes("api") || ultimaMensagem.includes("rest") || ultimaMensagem.includes("endpoint")) {
            return "APIs (Application Programming Interfaces) permitem que diferentes sistemas se comuniquem. APIs REST são muito comuns, usando métodos HTTP como GET, POST, PUT e DELETE. Quer saber mais sobre como criar ou consumir APIs?";
        }

        if (ultimaMensagem.includes("git") || ultimaMensagem.includes("github") || ultimaMensagem.includes("versão")) {
            return "Git é um sistema de controle de versão essencial para desenvolvedores. Permite rastrear mudanças no código, trabalhar em equipe e gerenciar diferentes versões do projeto. GitHub é uma plataforma popular para hospedar repositórios Git. Tem alguma dúvida sobre comandos ou conceitos?";
        }

        if (ultimaMensagem.includes("algoritmo") || ultimaMensagem.includes("lógica")) {
            return "Algoritmos são sequências de passos lógicos para resolver problemas. A lógica de programação é fundamental: envolve estruturas como condicionais (if/else), loops (for/while) e funções.Quer praticar algum conceito específico?";
        }

        if (ultimaMensagem.includes("orientação a objetos") || ultimaMensagem.includes("oop") || ultimaMensagem.includes("classe")) {
            return "Programação Orientada a Objetos (POO) organiza código em objetos que têm propriedades e métodos. Conceitos principais incluem: classes, objetos, herança, encapsulamento e polimorfismo. É um paradigma muito usado em linguagens como Java, Python e JavaScript. Quer que eu explique algum desses conceitos?";
        }

        if (ultimaMensagem.includes("obrigado") || ultimaMensagem.includes("valeu") || ultimaMensagem.includes("thanks")) {
            return "Por nada! Estou aqui para ajudar sempre que precisar. Bons estudos! 📚✨";
        }

        // Resposta genérica padrão
        const respostasGenericas = [
            "Interessante pergunta! Como assistente educacional (em modo desenvolvimento), posso ajudar com dúvidas sobre programação, tecnologia e desenvolvimento de software. Pode reformular sua pergunta para que eu possa te ajudar melhor?",
            "Entendo sua dúvida! No modo desenvolvimento, estou configurado para responder sobre conceitos de programação e tecnologia. Pode dar mais detalhes sobre o que você gostaria de aprender?",
            "Ótima questão! Estou aqui para auxiliar com seus estudos em tecnologia. Pode especificar um pouco mais sobre o tema que você quer explorar?",
            "Legal ver seu interesse em aprender! Como assistente educacional, posso explicar conceitos de programação, linguagens, frameworks e boas práticas. O que você gostaria de saber especificamente?"
        ];

        // Seleciona uma resposta aleatória baseada no tamanho da mensagem (pseudo-random determinístico)
        const index = ultimaMensagem.length % respostasGenericas.length;
        return respostasGenericas[index];
    }
}

const assistenteIaInstance = new AssistenteIaProvider();
export default assistenteIaInstance;
