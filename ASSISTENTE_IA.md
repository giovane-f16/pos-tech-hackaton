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
# API Key do serviço de IA
IA_API_KEY=sua_chave_api_aqui

# Modelo de linguagem (opcional - padrão: gpt-3.5-turbo)
IA_MODEL=gpt-3.5-turbo

# Endpoint da API (opcional - padrão: OpenAI)
IA_ENDPOINT=https://api.openai.com/v1/chat/completions
```

### 2. Opções de Provedores de IA

#### OpenAI (Recomendado)
```env
IA_API_KEY=sk-proj-...
IA_MODEL=gpt-3.5-turbo
IA_ENDPOINT=https://api.openai.com/v1/chat/completions
```

**Como obter:**
1. Acesse [platform.openai.com](https://platform.openai.com)
2. Crie uma conta ou faça login
3. Vá em "API Keys" e crie uma nova chave
4. Cole a chave no arquivo `.env`

#### Azure OpenAI
```env
IA_API_KEY=sua_chave_azure
IA_MODEL=gpt-35-turbo
IA_ENDPOINT=https://seu-recurso.openai.azure.com/openai/deployments/seu-deployment/chat/completions?api-version=2023-05-15
```

#### Outros Provedores Compatíveis
Qualquer provedor compatível com a API de chat completion da OpenAI pode ser usado, como:
- Anthropic Claude (via adaptador)
- Google PaLM
- Serviços auto-hospedados (LM Studio, Ollama, etc)

### 3. System Prompt

O assistente é configurado com o seguinte prompt de sistema:

> "Você é um assistente educacional especializado em tecnologia e programação. Seu papel é ajudar alunos com dúvidas sobre tecnologia, programação, desenvolvimento de software e conceitos relacionados. Seja claro, didático e encorajador. Forneça exemplos práticos quando apropriado e sempre incentive o aprendizado."

Para personalizar, edite o arquivo `src/providers/assistente-ia.ts`.

## Recursos

- ✅ Chat em tempo real
- ✅ Histórico de conversação mantido durante a sessão
- ✅ Indicador de digitação
- ✅ Auto-scroll para novas mensagens
- ✅ Tratamento de erros
- ✅ Design responsivo com dark mode
- ✅ Desabilitação de input durante processamento

## Custos

⚠️ **Importante**: O uso de APIs de IA geralmente tem custos associados:

- **OpenAI GPT-3.5-turbo**: ~$0.002 por 1K tokens
- **OpenAI GPT-4**: ~$0.03 por 1K tokens

Monitore seu uso no painel do provedor escolhido.

## Testes

Para testar o assistente:

1. Configure as variáveis de ambiente
2. Reinicie o servidor de desenvolvimento
3. Acesse a página do aluno
4. Navegue até a aba "Assistente de IA"
5. Envie uma mensagem de teste

## Troubleshooting

### Erro: "API Key não configurada"
- Verifique se `IA_API_KEY` está definida no `.env`
- Reinicie o servidor após adicionar a variável

### Erro: "Erro na API de IA"
- Verifique se a API key é válida
- Confirme se há saldo/créditos disponíveis
- Verifique a conectividade com a internet

### Respostas lentas
- Considere usar um modelo mais leve (gpt-3.5-turbo)
- Ajuste o parâmetro `max_tokens` no provider
- Verifique a latência da rede

## Melhorias Futuras

- [ ] Salvar histórico de conversas no banco de dados
- [ ] Limitar número de mensagens por sessão
- [ ] Adicionar sistema de moderação de conteúdo
- [ ] Implementar rate limiting
- [ ] Adicionar suporte a anexos/código
- [ ] Permitir seleção de diferentes modelos
- [ ] Adicionar análise de sentimento
