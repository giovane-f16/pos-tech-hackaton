# Análise de IA - Documentação

## 📋 Visão Geral

O sistema de análise de IA detecta a probabilidade de conteúdo ter sido gerado por inteligência artificial (como ChatGPT, Claude, Gemini, etc.) nos trabalhos dos alunos.

## 🎯 Funcionalidades

### 1. Análise Automática
Quando um professor seleciona um trabalho para avaliar, o sistema automaticamente analisa o conteúdo e gera:
- **Porcentagem de uso de IA** (0-100%)
- **Descrição da análise** com justificativa
- **Nível de confiança** (baixa, média, alta)

### 2. Reanálise Manual
Professores podem reanalisar trabalhos a qualquer momento para obter uma nova avaliação.

### 3. Visualização
- Barra de progresso com código de cores
- Histórico de todas as análises realizadas
- Integração com o sistema de avaliação

## ⚙️ Modo Desenvolvimento vs Produção

O sistema suporta dois modos de operação controlados pela variável `ASSISTENTE_IA_PROD`:

### 🧪 Modo Desenvolvimento (`ASSISTENTE_IA_PROD=false`)

**Análise Simulada - Baseada em Heurísticas**

```env
ASSISTENTE_IA_PROD=false
```

**Como funciona:**
O sistema analisa o texto usando heurísticas programáticas:

1. **Vocabulário Formal**
   - Detecta palavras típicas de IA: "outrossim", "destarte", "portanto", "todavia"
   - +20 pontos se encontradas

2. **Uniformidade de Frases**
   - Analisa variação no comprimento das frases
   - Frases muito uniformes indicam IA
   - +25 pontos se variação < 50 caracteres

3. **Densidade de Informação**
   - Conta palavras longas (>8 caracteres)
   - Alta densidade = possível IA
   - +20 pontos se >30% das palavras

4. **Estrutura de Parágrafos**
   - Verifica regularidade dos parágrafos
   - Parágrafos muito uniformes = IA
   - +15 pontos se variação < 30%

5. **Aleatoriedade**
   - Adiciona variação baseada no tamanho do texto
   - Garante resultados diferentes mas reproduzíveis

**Vantagens:**
- ✅ Instantâneo (1-2 segundos)
- ✅ Sem custos
- ✅ Funciona offline
- ✅ Resultados consistentes
- ✅ Lógica transparente

**Limitações:**
- ⚠️ Menos preciso que IA real
- ⚠️ Baseado em padrões simples
- ⚠️ Pode ter falsos positivos/negativos

### 🚀 Modo Produção (`ASSISTENTE_IA_PROD=true`)

**Análise com IA Real**

```env
ASSISTENTE_IA_PROD=true
IA_API_KEY=sua_chave_aqui
IA_MODEL=llama-3.3-70b-versatile
IA_ENDPOINT=https://api.groq.com/openai/v1/chat/completions
```

**Como funciona:**
O sistema envia o texto para um modelo de IA (Groq, OpenAI, etc.) que analisa:

1. **Padrões de Escrita**
   - Identifica características típicas de IA
   - Analisa tom, estrutura e fluidez

2. **Contexto Semântico**
   - Entende o significado do texto
   - Detecta padrões sutis de geração

3. **Comparação com Conhecimento**
   - Compara com milhares de exemplos
   - Identifica "assinaturas" de modelos

**Vantagens:**
- ✅ Alta precisão
- ✅ Análise contextual profunda
- ✅ Detecta padrões sutis
- ✅ Atualizado com novos modelos

**Limitações:**
- ⚠️ Requer API key
- ⚠️ Consome créditos (se pago)
- ⚠️ Requer internet
- ⚠️ Mais lento (3-5 segundos)

**Fallback Automático:**
Se a API falhar, o sistema automaticamente usa a análise simulada como backup.

## 🎨 Interpretação dos Resultados

### Porcentagem de IA

| Faixa | Cor | Interpretação | Ação Recomendada |
|-------|-----|---------------|------------------|
| 0-29% | 🟢 Verde | Baixa probabilidade | Provável autoria humana |
| 30-59% | 🟡 Amarelo | Probabilidade moderada | Revisar com atenção |
| 60-79% | 🟠 Laranja | Alta probabilidade | Investigar mais |
| 80-100% | 🔴 Vermelho | Muito alta probabilidade | Conversar com aluno |

### Nível de Confiança

- **Baixa**: Resultado incerto, considere outros fatores
- **Média**: Resultado razoável, mas não conclusivo
- **Alta**: Resultado confiável, forte evidência

## 📍 Onde Usar

### 1. Avaliar Trabalhos (professor/avaliar.tsx)
- Análise automática ao selecionar trabalho
- Barra de progresso visual
- Botão "Reanalisar" para nova análise
- Resultado salvo junto com a avaliação

### 2. Ferramenta de Análise (professor/analisar.tsx)
- Lista todos os trabalhos já analisados
- Histórico completo de análises
- Botão individual de reanálise
- Filtro por porcentagem

## 🔧 API

### POST /api/analisar-ia

Analisa um texto e retorna a probabilidade de uso de IA.

**Request:**
```json
{
  "conteudo": "Texto a ser analisado..."
}
```

**Response:**
```json
{
  "porcentagemIa": 75,
  "analiseIa": "Alta probabilidade de conteúdo gerado por IA. O texto apresenta padrões típicos...",
  "confianca": "alta"
}
```

**Validações:**
- Conteúdo mínimo: 50 caracteres
- Retorna 0% se texto muito curto

## 💡 Boas Práticas

### Para Desenvolvimento
1. Use modo desenvolvimento (`ASSISTENTE_IA_PROD=false`)
2. Teste com diferentes tipos de texto
3. Verifique se as heurísticas fazem sentido
4. Ajuste thresholds conforme necessário

### Para Produção
1. Configure API key válida
2. Use Groq (gratuito) ou OpenAI
3. Monitore custos se usar API paga
4. Configure fallback para análise simulada

### Para Professores
1. **Não use como única evidência**
   - Análise de IA é uma ferramenta, não prova
   - Combine com observação do aluno
   - Considere o contexto da disciplina

2. **Interprete com contexto**
   - Textos técnicos naturalmente parecem mais formais
   - Tutoriais e documentação têm padrões similares
   - Considere o nível do aluno

3. **Dialogue com o aluno**
   - Use resultado como ponto de partida para conversa
   - Pergunte sobre o processo de criação
   - Avalie compreensão do conteúdo

## 🔬 Exemplos de Análise

### Exemplo 1: Texto Humano Natural (15%)
```
Olá! Hoje vou falar sobre JavaScript. É uma linguagem bem legal que uso
bastante. Às vezes dá problema mas aí eu pesquiso e consigo resolver.
```

**Análise:** Baixa uniformidade, erros naturais, tom informal
**Resultado:** 15% - Provável autoria humana

### Exemplo 2: Texto Possivelmente IA (65%)
```
JavaScript é uma linguagem de programação versátil e amplamente utilizada
no desenvolvimento web moderno. Caracteriza-se pela sua capacidade de
executar tanto no cliente quanto no servidor, proporcionando assim uma
experiência de desenvolvimento unificada e consistente.
```

**Análise:** Muito formal, estrutura uniforme, vocabulário sofisticado
**Resultado:** 65% - Provável uso de IA

### Exemplo 3: Texto Provavelmente IA (85%)
```
A linguagem JavaScript, destarte, configura-se como um paradigma
fundamental no desenvolvimento de aplicações web contemporâneas.
Outrossim, sua versatilidade permite a implementação de soluções
robustas e escaláveis, consoante as melhores práticas de engenharia
de software. Todavia, é imperativo considerar as nuances inerentes...
```

**Análise:** Vocabulário muito formal, estrutura artificial, uso excessivo de conectivos
**Resultado:** 85% - Forte evidência de IA

## 🐛 Troubleshooting

### Análise sempre retorna 0%
**Solução:**
- Verifique se o texto tem mais de 50 caracteres
- Confirme que o conteúdo não está vazio

### Erro ao analisar em produção
**Solução:**
- Verifique variáveis de ambiente (IA_API_KEY, IA_MODEL, IA_ENDPOINT)
- Confirme que `ASSISTENTE_IA_PROD=true`
- Sistema usa fallback automático para análise simulada

### Resultados inconsistentes
**Solução:**
- Em modo dev: Normal, baseado em heurísticas
- Em modo prod: API pode dar respostas ligeiramente diferentes
- Use modo prod para maior consistência

### Análise muito lenta
**Solução:**
- Modo dev: 1-2 segundos (normal)
- Modo prod: 3-5 segundos (normal)
- Se >10 segundos: verifique conexão com API

## 📊 Estatísticas

O sistema analisa:
- ✅ Estrutura do texto
- ✅ Vocabulário utilizado
- ✅ Uniformidade de frases
- ✅ Densidade de informação
- ✅ Organização de parágrafos
- ✅ Padrões semânticos (modo prod)

## 🔐 Privacidade e Ética

**Modo Desenvolvimento:**
- Análise local, texto não sai do servidor
- Nenhum dado compartilhado

**Modo Produção:**
- Texto enviado para API de IA
- Seguir políticas de privacidade do provedor
- Não enviar informações sensíveis

**Uso Ético:**
- Ferramenta de apoio, não substitui julgamento pedagógico
- Conversa com aluno é essencial
- Considere contexto e circunstâncias
- Foco no aprendizado, não na punição

## 📚 Recursos

- [analisar-ia.ts](src/providers/analisar-ia.ts) - Provider de análise
- [route.ts](src/app/api/analisar-ia/route.ts) - API endpoint
- [avaliar.tsx](src/components/professor/avaliar.tsx) - Interface de avaliação
- [analisar.tsx](src/components/professor/analisar.tsx) - Ferramenta de análise

---

**Última atualização**: Fevereiro de 2026
