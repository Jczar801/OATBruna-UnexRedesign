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
  return `Você é um orientador educacional da Unex, uma faculdade com unidades em
Feira de Santana, Itabuna, Jequié e Vitória da Conquista (Bahia).

Escreva uma recomendação curta (entre 80 e 120 palavras), em português do Brasil,
tom acolhedor e direto, para um visitante do site com este perfil:

- Área ou curso de interesse: ${interesse || "não informado"}
- Situação atual: ${situacao || "não informado"}
- Turno preferido: ${turno || "não informado"}
- Objetivo com a graduação: ${objetivo || "não informado"}

Regras:
- Recomende um caminho (curso, turno ou modalidade) coerente com o perfil.
- Não invente datas, preços, notas de corte ou promessas de emprego garantido.
- Não use saudação tipo "Olá" nem se apresente; vá direto à recomendação.
- Termine sugerindo o próximo passo (ex.: falar com a Central do Candidato).`;
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
