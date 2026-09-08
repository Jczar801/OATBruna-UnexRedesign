# Integração de IA à landing page da Unex

Estudo dirigido: aplicação prática de LLMs, integrando uma funcionalidade real de
Inteligência Artificial à landing page da Unex desenvolvida na atividade anterior.

## 1. Opção escolhida

**Opção B — Gerador de conteúdo personalizado.**

O visitante preenche um formulário curto (curso de interesse, situação atual, turno
preferido e objetivo com a graduação) e a IA gera, na hora, um parágrafo de
recomendação personalizado.

Justificativa da escolha:
- É a funcionalidade que melhor se encaixa no objetivo da landing page (captação de
  candidatos): em vez de um chat aberto (Opção A), que exige tratar qualquer pergunta
  possível, o gerador de conteúdo trabalha com uma entrada estruturada e uma saída
  única e curta — mais fácil de controlar o prompt e de manter a resposta relevante.
- Comparado à Opção C (FAQ com RAG), não exige montar uma base de conhecimento
  (embeddings, busca semântica) — o escopo fica compatível com o tempo da atividade,
  sem abrir mão de uma integração real com LLM.

## 2. Provedor de LLM utilizado

**Google AI Studio (Gemini)**, modelo `gemini-2.0-flash`.

Justificativa da escolha:
- **Camada gratuita generosa** para uso educacional/experimental, sem necessidade de
  cartão de crédito para gerar a chave.
- **SDK oficial para Node.js** (`@google/generative-ai`), o que atende diretamente à
  exigência da atividade de instalar o SDK do provedor.
- `gemini-2.0-flash` é um modelo rápido e barato em tokens, adequado para uma resposta
  curta (80–120 palavras) gerada em tempo real na página.
- Chave de API gerada em [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey),
  sem custo.

## 3. Arquitetura da integração

```
Navegador (React)                Vercel Serverless Function            Google AI Studio
┌────────────────────┐           ┌─────────────────────────┐           ┌────────────────┐
│ RecomendacaoIA.jsx  │  POST     │ api/gerar-recomendacao.js│  SDK      │ Gemini 2.0     │
│ (formulário)        │ ───────▶  │ (Node.js, roda no       │ ───────▶  │ Flash          │
│                     │  JSON     │  servidor da Vercel)     │           │                │
│                     │ ◀───────  │ usa GEMINI_API_KEY       │ ◀───────  │                │
└────────────────────┘  { texto }└─────────────────────────┘  texto    └────────────────┘
```

A chave `GEMINI_API_KEY` fica **apenas** em variável de ambiente do servidor
(configurada no painel da Vercel, nunca commitada). O componente React só conhece a
rota `/api/gerar-recomendacao` — nunca a chave.

## 4. Trecho do código da integração

### Backend — `api/gerar-recomendacao.js` (Vercel Serverless Function)

```js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ erro: "Método não permitido." });
  }

  const apiKey = process.env.GEMINI_API_KEY; // nunca exposta ao frontend
  if (!apiKey) {
    return res.status(500).json({ erro: "Serviço de IA não configurado." });
  }

  const { interesse, situacao, turno, objetivo } = req.body || {};
  if (!interesse && !objetivo) {
    return res.status(400).json({ erro: "Conte pelo menos seu interesse ou objetivo." });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `Você é um orientador educacional da Unex...
  - Área de interesse: ${interesse}
  - Situação atual: ${situacao}
  - Turno preferido: ${turno}
  - Objetivo: ${objetivo}`;

  const resultado = await model.generateContent(prompt);
  return res.status(200).json({ texto: resultado.response.text() });
}
```

(código completo, com sanitização de entrada e tratamento de erro, em
`api/gerar-recomendacao.js`)

### Frontend — `src/components/RecomendacaoIA.jsx` (consumo do endpoint)

```jsx
async function handleSubmit(e) {
  e.preventDefault();
  setCarregando(true);

  const resp = await fetch("/api/gerar-recomendacao", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form), // { interesse, situacao, turno, objetivo }
  });
  const data = await resp.json();

  if (resp.ok) setTexto(data.texto);
  else setErro(data.erro);

  setCarregando(false);
}
```

A resposta é exibida em um card com o aviso **"Gerado por IA — revise antes de
decidir"**, e o formulário já abre com o selo **"Assistente automatizado — conteúdo
gerado por IA"**, atendendo à exigência de transparência com o usuário final.

## 5. Print da funcionalidade em funcionamento

> ⚠️ Espaço reservado — inserir aqui um print da seção "Descubra o curso ideal para
> você" em funcionamento (formulário preenchido + recomendação gerada), depois de
> configurar a `GEMINI_API_KEY` e testar localmente com `vercel dev` ou no ambiente
> publicado.

## 6. Dificuldades encontradas e soluções aplicadas

- **Vite não roda backend por padrão**: `npm run dev` sobe só o frontend, então a
  rota `/api/gerar-recomendacao` não existe nesse modo. Solução: usar o comando
  `vercel dev` (Vercel CLI) para desenvolvimento local, que emula as Serverless
  Functions junto com o frontend na mesma porta.
- **Custo de tokens / respostas longas demais**: o primeiro teste do prompt gerava
  textos de parágrafos inteiros, inconsistentes em tamanho. Solução: fixar no próprio
  prompt um intervalo de palavras (80–120) e cortar o texto de entrada do usuário em
  no máximo 300 caracteres por campo, reduzindo tanto o custo em tokens quanto o risco
  de prompt injection via formulário.
- **Chave de API vazando para o repositório**: para evitar isso, a chave nunca é lida
  no componente React — só existe como variável de ambiente do servidor, e o arquivo
  `.env.local` (onde ela fica em desenvolvimento) está no `.gitignore`. Só o
  `.env.example`, sem valores reais, é versionado.

## 7. Possíveis melhorias futuras

- Adicionar um limite de requisições por IP/sessão para conter custo de tokens em caso
  de uso abusivo do formulário.
- Registrar (de forma anonimizada) quais perfis geram quais recomendações, para depois
  comparar com o curso realmente escolhido pelo candidato e refinar o prompt.
- Adicionar cache simples para perfis idênticos ou muito parecidos, evitando chamar a
  API do zero toda vez.
- Migrar para streaming da resposta (token a token) para reduzir a percepção de espera
  em conexões mais lentas.
