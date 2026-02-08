export interface Message {
    role: "user" | "assistant" | "system";
    content: string;
}

class AssistenteIaProvider {
    private apiKey: string;
    private model: string;
    private endpoint: string;

    constructor() {
        this.apiKey = process.env.IA_API_KEY    || "";
        this.model = process.env.IA_MODEL       || "";
        this.endpoint = process.env.IA_ENDPOINT || "";
    }

    public async enviarMensagem(mensagens: Message[]): Promise<string> {
        return new Promise(async (resolve, reject) => {
            try {
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
}

const assistenteIaInstance = new AssistenteIaProvider();
export default assistenteIaInstance;
