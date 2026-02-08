# Assistente de IA - Configuração

## Visão Geral

O Assistente de IA é uma funcionalidade que permite aos alunos fazerem perguntas sobre tecnologia, programação e desenvolvimento de software, recebendo respostas em tempo real através de um modelo de linguagem.

## Arquitetura

- **Provider**: `src/providers/assistente-ia.ts` - Gerencia a comunicação com a API de IA
- **API Route**: `src/app/api/assistente/route.ts` - Endpoint para processar mensagens
- **Componente UI**: `src/components/aluno/assistente-ia.tsx` - Interface de chat

## Configuração

### 1. Variáveis de Ambiente

Adicione as seguintes variáveis ao seu arquivo `.env`:

```env
# Modo de operação (true = produção com API real, false = desenvolvimento com respostas simuladas)
ASSISTENTE_IA_PROD=false

# API Key do serviço de IA (necessário apenas se ASSISTENTE_IA_PROD=true)
IA_API_KEY=sua_chave_api_aqui

# Modelo de linguagem
IA_MODEL=gpt-3.5-turbo

# Endpoint da API
IA_ENDPOINT=https://api.openai.com/v1/chat/completions
```

### 2. Modo Desenvolvimento vs Produção

O Assistente de IA suporta dois modos de operação controlados pela variável `ASSISTENTE_IA_PROD`:

#### 🧪 Modo Desenvolvimento (`ASSISTENTE_IA_PROD=false`)

**Recomendado para desenvolvimento local e testes**

```env
ASSISTENTE_IA_PROD=false
```

**Características:**
- ✅ Usa respostas simuladas inteligentes
- ✅ Não faz requisições HTTP para APIs externas
- ✅ Não consome créditos ou limites de API
- ✅ Funciona offline
- ✅ Não requer API key configurada
- ✅ Respostas instantâneas (com delay simulado de 500-1500ms)
- ✅ Respostas contextualizadas baseadas em palavras-chave

**Quando usar:**
- Durante desenvolvimento local
- Em ambientes de teste/staging
- Para demonstrações sem custos
- Quando não tem API key disponível

**Exemplo de respostas simuladas:**
- Perguntas sobre JavaScript, Python, React, etc. recebem respostas específicas
- Perguntas genéricas recebem respostas educacionais encorajadoras
- Sistema detecta palavras-chave para gerar respostas contextualizadas

#### 🚀 Modo Produção (`ASSISTENTE_IA_PROD=true`)

**Para ambientes de produção com API real**

```env
ASSISTENTE_IA_PROD=true
IA_API_KEY=sua_chave_real_aqui
IA_MODEL=gpt-3.5-turbo
IA_ENDPOINT=https://api.openai.com/v1/chat/completions
```

**Características:**
- ✅ Faz requisições reais à API de IA configurada
- ✅ Respostas geradas por modelos de linguagem reais
- ✅ Qualidade superior de respostas
- ⚠️ Consome créditos/limites da API
- ⚠️ Requer API key válida
- ⚠️ Requer conexão com internet

**Quando usar:**
- Em ambiente de produção
- Quando precisa de respostas reais de IA

### 3. Opções de Provedores de IA (Modo Produção)

#### OpenAI
```env
IA_API_KEY=sk-proj-...
IA_MODEL=gpt-3.5-turbo
IA_ENDPOINT=https://api.openai.com/v1/chat/completions
```

**Como obter:**
1. Acesse [platform.openai.com](https://platform.openai.com)
2. Crie uma conta e gere uma API Key

#### Azure OpenAI
```env
IA_API_KEY=sua_chave_azure
IA_MODEL=gpt-35-turbo
IA_ENDPOINT=https://seu-recurso.openai.azure.com/openai/deployments/seu-deployment/chat/completions?api-version=2023-05-15
```

#### Outros Provedores Compatíveis
- Groq (gratuito)
- Google Gemini (gratuito)
- Anthropic Claude
- Serviços auto-hospedados (LM Studio, Ollama)

### 4. System Prompt

O assistente usa um prompt educacional especializado em tecnologia e programação. Para personalizar, edite `src/providers/assistente-ia.ts`.

## Testes

### Testando em Modo Desenvolvimento

1. Configure o `.env`:
   ```env
   ASSISTENTE_IA_PROD=false
   ```

2. Inicie o servidor:
   ```bash
   npm run dev
   ```

3. Acesse `http://localhost:3000/aluno`

4. Navegue até a aba "Assistente de IA"

5. Envie mensagens de teste:
   - "Olá, tudo bem?"
   - "O que é JavaScript?"
   - "Explique Python"
   - "Como usar React?"

6. Você receberá respostas simuladas instantâneas

7. Verifique o console do servidor - deve mostrar:
   ```
   [Assistente IA] Modo DESENVOLVIMENTO - Usando resposta simulada
   ```

### Testando em Modo Produção

1. Configure o `.env`:
   ```env
   ASSISTENTE_IA_PROD=true
   IA_API_KEY=sua_chave_real
   IA_MODEL=gpt-3.5-turbo
   IA_ENDPOINT=https://api.openai.com/v1/chat/completions
   ```

2. Reinicie o servidor:
   ```bash
   npm run dev
   ```

3. Acesse a página do aluno e envie uma mensagem

4. Você receberá uma resposta real da API de IA

5. Verifique o console do servidor - deve mostrar:
   ```
   [Assistente IA] Modo PRODUÇÃO - Usando API real
   ```

## Recursos

- ✅ Modo desenvolvimento/produção configurável
- ✅ Chat em tempo real com histórico de sessão
- ✅ Indicador de digitação e auto-scroll
- ✅ Respostas simuladas inteligentes (modo dev)
- ✅ Suporte a múltiplos provedores de IA
- ✅ Design responsivo com dark mode

## Custos

### 💰 Modo Produção (ASSISTENTE_IA_PROD=true)

⚠️ **Importante**: O uso de APIs de IA em produção tem custos associados:

- **OpenAI GPT-3.5-turbo**: ~$0.002 por 1K tokens
- **OpenAI GPT-4**: ~$0.03 por 1K tokens
- **Groq**: Gratuito (modelos Llama, Mixtral, Gemma)
- **Google Gemini**: Gratuito até 15 req/min

**Recomendações:**
- Monitore seu uso no painel do provedor escolhido
- Configure limites de gastos quando disponível
- Considere usar Groq ou Gemini para reduzir custos
- Implemente rate limiting para controlar uso

### 🆓 Modo Desenvolvimento (ASSISTENTE_IA_PROD=false)

✅ **Sem custos**: O modo desenvolvimento é 100% gratuito:
- Não faz requisições HTTP
- Não consome créditos de API
- Perfeito para desenvolvimento e testes
- Funciona offline

**Recomendação**: Use modo desenvolvimento durante todo o ciclo de desenvolvimento e ative modo produção apenas em ambiente de produção.

## Troubleshooting

### Sempre recebo respostas simuladas
**Solução**:
- Verifique se `ASSISTENTE_IA_PROD=true` no arquivo `.env`
- Reinicie o servidor após alterar a variável
- Confirme no console do servidor qual modo está ativo

### Erro: "API Key não configurada"
**Solução**:
- Certifique-se que `ASSISTENTE_IA_PROD=true`
- Verifique se `IA_API_KEY` está definida no `.env`
- Reinicie o servidor após adicionar a variável
- **Alternativa**: Use `ASSISTENTE_IA_PROD=false` para desenvolvimento sem API key

### Erro: "Erro na API de IA"
**Solução**:
- Verifique se a API key é válida
- Confirme se há saldo/créditos disponíveis
- Verifique a conectividade com a internet
- Teste primeiro em modo desenvolvimento (`ASSISTENTE_IA_PROD=false`)

### Respostas muito genéricas (modo desenvolvimento)
**Solução**:
- Use palavras-chave específicas: JavaScript, Python, React, API, Git, etc.
- O sistema detecta palavras-chave para gerar respostas contextualizadas
- Para respostas mais sofisticadas, use modo produção com API real

### Respostas lentas (modo produção)
**Solução**:
- Considere usar um modelo mais leve (gpt-3.5-turbo)
- Ajuste o parâmetro `max_tokens` no provider
- Verifique a latência da rede
- Use modo desenvolvimento para testes locais

## Melhorias Futuras

- [x] Modo desenvolvimento/produção configurável
- [ ] Salvar histórico de conversas no banco de dados
- [ ] Limitar número de mensagens por sessão
- [ ] Adicionar sistema de moderação de conteúdo
- [ ] Implementar rate limiting
- [ ] Adicionar suporte a anexos/código
- [ ] Permitir seleção de diferentes modelos
- [ ] Adicionar análise de sentimento
- [ ] Expandir respostas simuladas com mais contextos
- [ ] Cache de respostas frequentes (modo produção)
