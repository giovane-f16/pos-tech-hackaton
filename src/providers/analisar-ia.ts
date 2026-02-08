export interface AnaliseIA {
    porcentagemIa: number;
    analiseIa: string;
    confianca: 'baixa' | 'media' | 'alta';
}

class AnalisarIaProvider {
    private isProd: boolean;

    constructor() {
        this.isProd = process.env.ASSISTENTE_IA_PROD === "true";
    }

    /**
     * Gera uma análise simulada para modo de desenvolvimento
     */
    private gerarAnaliseSimulada(conteudo: string): AnaliseIA {
        // Análise baseada em características do texto
        const tamanho = conteudo.length;
        const palavras = conteudo.split(/\s+/).length;
        const frasesCurtas = conteudo.split(/[.!?]+/).filter(f => f.trim().length > 0);

        // Calcula uma "porcentagem" baseada em heurísticas simples
        let porcentagem = 0;

        // Textos muito estruturados e formais tendem a ser de IA
        const palavrasFormais = ['outrossim', 'destarte', 'portanto', 'todavia', 'consoante', 'entretanto'];
        const contemPalavrasFormais = palavrasFormais.some(p => conteudo.toLowerCase().includes(p));
        if (contemPalavrasFormais) porcentagem += 20;

        // Frases muito uniformes
        const tamanhosFramento = frasesCurtas.map(f => f.trim().length);
        const mediaComprimento = tamanhosFramento.reduce((a, b) => a + b, 0) / tamanhosFramento.length;
        const variacao = tamanhosFramento.reduce((sum, len) => sum + Math.abs(len - mediaComprimento), 0) / tamanhosFramento.length;
        if (variacao < 50) porcentagem += 25; // Baixa variação = possivelmente IA

        // Densidade de informação (muitas palavras longas)
        const palavrasLongas = conteudo.split(/\s+/).filter(p => p.length > 8).length;
        if (palavrasLongas / palavras > 0.3) porcentagem += 20;

        // Estrutura muito organizada (parágrafos regulares)
        const paragrafos = conteudo.split('\n\n').filter(p => p.trim().length > 0);
        if (paragrafos.length > 3) {
            const tamanhoParagrafos = paragrafos.map(p => p.length);
            const mediaParagrafos = tamanhoParagrafos.reduce((a, b) => a + b, 0) / tamanhoParagrafos.length;
            const variacaoParagrafos = tamanhoParagrafos.reduce((sum, len) => sum + Math.abs(len - mediaParagrafos), 0) / tamanhoParagrafos.length;
            if (variacaoParagrafos < mediaParagrafos * 0.3) porcentagem += 15;
        }

        // Adiciona alguma aleatoriedade baseada no conteúdo
        const seed = conteudo.length % 20;
        porcentagem += seed;

        // Garante que está entre 0 e 100
        porcentagem = Math.min(100, Math.max(0, porcentagem));

        // Determina confiança e descrição
        let confianca: 'baixa' | 'media' | 'alta';
        let analiseIa: string;

        if (porcentagem < 30) {
            confianca = 'baixa';
            analiseIa = 'Baixa probabilidade de conteúdo gerado por IA. O texto apresenta características naturais de escrita humana, com variações estilísticas e estrutura orgânica.';
        } else if (porcentagem < 60) {
            confianca = 'media';
            analiseIa = 'Probabilidade moderada de uso de IA. O texto apresenta algumas características de conteúdo gerado por IA, mas também elementos de escrita humana. Pode ter sido editado ou parcialmente escrito com auxílio de IA.';
        } else if (porcentagem < 80) {
            confianca = 'alta';
            analiseIa = 'Alta probabilidade de conteúdo gerado por IA. O texto apresenta padrões típicos de modelos de linguagem, como estrutura muito uniforme, vocabulário formal e organização consistente.';
        } else {
            confianca = 'alta';
            analiseIa = 'Probabilidade muito alta de conteúdo gerado por IA. O texto apresenta forte evidência de geração automatizada, com padrões característicos de modelos de linguagem artificial.';
        }

        return {
            porcentagemIa: Math.round(porcentagem),
            analiseIa,
            confianca
        };
    }

    /**
     * Analisa o conteúdo usando API real de IA
     */
    private async analisarComApiReal(conteudo: string): Promise<AnaliseIA> {
        const apiKey = process.env.IA_API_KEY || "";
        const model = process.env.IA_MODEL || "";
        const endpoint = process.env.IA_ENDPOINT || "";

        if (!apiKey || !model || !endpoint) {
            throw new Error("Configurações de IA não encontradas para modo produção");
        }

        const prompt = `Analise o seguinte texto e determine a probabilidade (em porcentagem de 0 a 100) de ter sido gerado por uma IA (como ChatGPT, Claude, etc).
        Considere:
        - Padrões de escrita típicos de IA (vocabulário formal, estrutura muito uniforme)
        - Falta de erros naturais ou imperfeições humanas
        - Organização muito consistente e estruturada
        - Uso de frases longas e complexas de forma repetitiva
        - Tom muito neutro e impessoal

        Responda APENAS no seguinte formato JSON:
        {
        "porcentagem": <número de 0 a 100>,
        "analise": "<descrição breve da análise em português>",
        "confianca": "<baixa|media|alta>"
        }

        Texto a analisar:
        """
        ${conteudo.substring(0, 3000)}
        """

        Resposta (apenas JSON):`;

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: "system",
                            content: "Você é um especialista em detectar conteúdo gerado por IA. Responda sempre em formato JSON válido."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.3,
                    max_tokens: 500,
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro na API: ${response.statusText}`);
            }

            const data = await response.json();
            const respostaTexto = data.choices[0]?.message?.content || "{}";

            // Tenta extrair JSON da resposta
            const jsonMatch = respostaTexto.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error("Resposta da API não está em formato JSON válido");
            }

            const resultado = JSON.parse(jsonMatch[0]);

            return {
                porcentagemIa: Math.min(100, Math.max(0, resultado.porcentagem || 50)),
                analiseIa: resultado.analise || "Análise não disponível",
                confianca: resultado.confianca || "media"
            };
        } catch (error) {
            console.error("Erro ao analisar com API real:", error);
            // Fallback para análise simulada se a API falhar
            console.log("[Analisar IA] Erro na API, usando análise simulada como fallback");
            return this.gerarAnaliseSimulada(conteudo);
        }
    }

    /**
     * Analisa um texto e retorna a probabilidade de uso de IA
     */
    public async analisar(conteudo: string): Promise<AnaliseIA> {
        if (!conteudo || conteudo.trim().length < 50) {
            return {
                porcentagemIa: 0,
                analiseIa: "Texto muito curto para análise confiável",
                confianca: "baixa"
            };
        }

        if (this.isProd) {
            console.log("[Analisar IA] Modo PRODUÇÃO - Usando API real");
            return await this.analisarComApiReal(conteudo);
        } else {
            console.log("[Analisar IA] Modo DESENVOLVIMENTO - Usando análise simulada");
            // Simula delay para parecer mais real
            await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));
            return this.gerarAnaliseSimulada(conteudo);
        }
    }
}

const analisarIaInstance = new AnalisarIaProvider();
export default analisarIaInstance;
