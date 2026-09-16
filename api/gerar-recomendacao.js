// api/gerar-recomendacao.js
//
// Vercel Serverless Function — roda no backend (Node.js), nunca no navegador.
// A chave GEMINI_API_KEY fica só em variável de ambiente do servidor: o
// frontend nunca vê essa chave, apenas manda o perfil do visitante e recebe
// de volta o texto já pronto.

import { GoogleGenerativeAI } from "@google/generative-ai";

const MAX_CAMPO = 300; // limite simples contra prompts gigantes / abuso de tokens

function sanitizar(valor) {
  if (typeof valor !== "string") return "";
  return valor.trim().slice(0, MAX_CAMPO);
}

function montarPrompt({ interesse, situacao, turno, objetivo }) {
  return `Você é um orientador educacional da Unex, faculdade com unidades em Feira de
Santana, Itabuna, Jequié e Vitória da Conquista (Bahia).

TAREFA
Antes de escrever, analise internamente em 3 passos (não mostre esses passos na
resposta):
1. Que curso/área da Unex melhor combina com o interesse e o objetivo informados?
2. Que modalidade/turno é coerente com a situação atual e o turno preferido?
3. Qual é o próximo passo mais natural para esse perfil dar (ex.: falar com a
   Central do Candidato, se inscrever, fazer uma visita)?
Depois desse raciocínio interno, escreva SOMENTE a recomendação final ao visitante,
sem listar os passos acima.

FORMATO DE SAÍDA
- Um único parágrafo corrido, entre 80 e 120 palavras.
- Português do Brasil, tom acolhedor e direto (como um orientador falando com o
  candidato, não um anúncio publicitário).
- Sem saudação ("Olá") nem autoapresentação — vá direto à recomendação.
- Termine sugerindo um próximo passo concreto.

EXEMPLOS (formato e tom esperados — não copie o conteúdo, adapte ao perfil informado)

Exemplo 1
Perfil: interesse em Enfermagem; já trabalha durante o dia; prefere turno noturno;
objetivo é conseguir estabilidade profissional.
Recomendação ideal: "Enfermagem noturno é um caminho sólido para quem já trabalha
durante o dia e busca estabilidade: a Unex oferece a grade nesse turno, com estágio
supervisionado em unidades parceiras da região. Como o mercado de saúde tem demanda
constante, é uma área que costuma abrir portas relativamente rápido após a formatura.
Para confirmar vagas e horários da turma noturna na sua unidade, vale falar direto com
a Central do Candidato."

Exemplo 2
Perfil: interesse em Direito; terminou o ensino médio há pouco tempo; prefere turno
matutino; objetivo é fazer concurso público.
Recomendação ideal: "Para quem quer concurso público, Direito no turno matutino é uma
escolha coerente: a formação cobre boa parte do conteúdo cobrado em editais da área
jurídica e administrativa, e o período matutino ajuda a organizar rotina de estudos
extra à tarde. Vale já começar a acompanhar editais da região para entender prazos.
Fale com a Central do Candidato para saber datas de matrícula e grade da turma
matutina."

PERFIL REAL A SER ATENDIDO
- Área ou curso de interesse: ${interesse || "não informado"}
- Situação atual: ${situacao || "não informado"}
- Turno preferido: ${turno || "não informado"}
- Objetivo com a graduação: ${objetivo || "não informado"}

REGRAS (não violar)
- Recomende um caminho (curso, turno ou modalidade) coerente com o perfil real acima.
- Não invente datas, preços, notas de corte ou promessas de emprego garantido.
- Não use saudação tipo "Olá" nem se apresente; vá direto à recomendação.
- Responda apenas com o parágrafo final — nunca com os passos de raciocínio nem com
  os exemplos.`;
}

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ehErroTemporario(err) {
  // 503 = modelo sobrecarregado, 429 = limite de requisições atingido —
  // ambos costumam se resolver sozinhos em segundos.
  return err?.status === 503 || err?.status === 429;
}

async function gerarComRetentativa(model, prompt, tentativas = 3) {
  for (let i = 1; i <= tentativas; i++) {
    try {
      const resultado = await model.generateContent(prompt);
      return resultado.response.text();
    } catch (err) {
      const ultimaTentativa = i === tentativas;
      if (!ehErroTemporario(err) || ultimaTentativa) throw err;

      // espera crescente entre tentativas (backoff): 600ms, depois 1200ms
      await esperar(600 * i);
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ erro: "Método não permitido." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ erro: "Serviço de IA não configurado." });
  }

  try {
    const body = req.body || {};
    const perfil = {
      interesse: sanitizar(body.interesse),
      situacao: sanitizar(body.situacao),
      turno: sanitizar(body.turno),
      objetivo: sanitizar(body.objetivo),
    };

    if (!perfil.interesse && !perfil.objetivo) {
      return res.status(400).json({ erro: "Conte pelo menos seu interesse ou objetivo." });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

    const prompt = montarPrompt(perfil);
    const texto = await gerarComRetentativa(model, prompt);

    return res.status(200).json({ texto });
  } catch (err) {
    console.error("Erro ao chamar o Gemini:", err);
    const sobrecarregado = ehErroTemporario(err);
    return res.status(502).json({
      erro: sobrecarregado
        ? "O serviço de IA está com muita procura no momento. Tentamos algumas vezes automaticamente — tente de novo em instantes."
        : "Não foi possível gerar a recomendação agora. Tente novamente em instantes.",
    });
  }
}
