# <div style="display: flex; align-items: center; gap: 8px;"><img src="./public/logo.svg" alt="Logo" width="32"/> **Aprendia** </div>

Plataforma Educacional de criação, entrega e avaliação de Trabalhos com base em **Inteligência Artificial** para Alunos e Professores.

## 📑 Sobre o projeto
Plataforma desenvolvida em **Next.js** com **React**, possui os recursos de:
* Autenticação de Alunos e Professores
* Criação, Entrega e Avaliação de Trabalhos
* Integração com Inteligência Artificial
* Layout responsivo e Dark Mode para todos os dispositivos
* Persistência dos dados enviados

## 📋 Requisitos
1. Instância do MongoDB Atlas para armazenamento dos dados
  >  https://www.mongodb.com/products/platform/atlas-database
2. Chave Auth Secret do NextAuth para autenticação
  > https://next-auth.js.org/configuration/options#secret
3. Chave de API do OpenAI (ou qualquer outra plataforma) para integração com a Inteligência Artificial
  > https://platform.openai.com/account/api-keys
4. Docker para rodar a aplicação em ambiente de desenvolvimento
  > https://www.docker.com/get-started

## 🚀 Como rodar o projeto
1. Clone o repositório:
```bash
git clone https://github.com/giovane-f16/pos-tech-hackaton.git
```
2. Crie o arquivo **.env** e configure as variáveis de ambiente com base no arquivo [.env.example](./.env.example)

3. Suba a aplicação usando Docker:
```bash
docker-compose up -d --build
```
4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

---

## 📂 Estrutura

```
src/
├── app/
│   ├── layout.tsx     # Layout principal
│   ├── page.tsx       # Página inicial (Home)
│   ├── globals.css    # Estilos globais
│   ├── aluno/         # Área do aluno
│   ├── api/           # Rotas da API
│   ├── auth/          # Autenticação
│   └── professor/     # Área do professor
├── components/        # Componentes reutilizáveis
├── providers/         # Lógica de negócio e contextos
└── types/             # Definições de tipos TypeScript
```
---

## 🤖 Inteligência Artificial
Para saber detalhadamente sobre o **Assistente de Correção de Trabalhos**, acesse a [documentação da IA.](./ANALISE_IA.md)

Para saber detalhadamente sobre a **Assistente para auxílio de alunos**, acesse a [documentação da IA.](./ASSISTENTE_IA.md)
