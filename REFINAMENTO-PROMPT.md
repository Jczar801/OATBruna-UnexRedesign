# Refinamento do prompt — Gerador de recomendação personalizada (Unex)

Atividade de prompt engineering aplicada sobre a integração de IA já entregue
(ver [`DOCUMENTACAO-IA.md`](./DOCUMENTACAO-IA.md)). Não houve alteração de código/lógica —
apenas do conteúdo do prompt em `api/gerar-recomendacao.js`, função `montarPrompt`.

## 1. Prompt original (antes)

```
Você é um orientador educacional da Unex, uma faculdade com unidades em
Feira de Santana, Itabuna, Jequié e Vitória da Conquista (Bahia).

Escreva uma recomendação curta (entre 80 e 120 palavras), em português do Brasil,
tom acolhedor e direto, para um visitante do site com este perfil:

- Área ou curso de interesse: {interesse}
- Situação atual: {situacao}
- Turno preferido: {turno}
- Objetivo com a graduação: {objetivo}

Regras:
- Recomende um caminho (curso, turno ou modalidade) coerente com o perfil.
- Não invente datas, preços, notas de corte ou promessas de emprego garantido.
- Não use saudação tipo "Olá" nem se apresente; vá direto à recomendação.
- Termine sugerindo o próximo passo (ex.: falar com a Central do Candidato).
```

Esse prompt já usava, de forma básica, **instruções claras** (papel, tom, tamanho,
regras). O ponto fraco: sem exemplo do resultado esperado, o modelo variava a
estrutura do texto e às vezes generalizava demais (recomendava só "a área de Saúde",
sem cravar um curso e um motivo específico ligado ao perfil).

## 2. Prompt revisado (depois)

```
Você é um orientador educacional da Unex, faculdade com unidades em Feira de
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
- Área ou curso de interesse: {interesse}
- Situação atual: {situacao}
- Turno preferido: {turno}
- Objetivo com a graduação: {objetivo}

REGRAS (não violar)
- Recomende um caminho (curso, turno ou modalidade) coerente com o perfil real acima.
- Não invente datas, preços, notas de corte ou promessas de emprego garantido.
- Não use saudação tipo "Olá" nem se apresente; vá direto à recomendação.
- Responda apenas com o parágrafo final — nunca com os passos de raciocínio nem com
  os exemplos.
```

### Técnicas aplicadas e onde

1. **Instruções claras (contexto, tom, formato de saída) — reforçadas.**
   A seção `FORMATO DE SAÍDA` deixa explícito o que antes estava misturado no meio
   do texto (tamanho, tom, estrutura em parágrafo único, o que não fazer). Também
   separa visualmente `TAREFA` / `FORMATO` / `PERFIL` / `REGRAS`, reduzindo ambiguidade
   sobre o que é instrução e o que é dado de entrada.

2. **Few-shot (exemplos de entrada/saída ideal).**
   Bloco `EXEMPLOS`, com dois pares perfil → recomendação already prontos, mostrando
   a estrutura esperada (curso + motivo ligado ao perfil + próximo passo concreto).
   Isso ancora tamanho, tom e nível de especificidade do texto gerado.

3. **Chain-of-thought (oculto).**
   Bloco `TAREFA`, pedindo para o modelo raciocinar em 3 passos (curso ideal → turno
   coerente → próximo passo) **antes** de escrever, mas sem expor esse raciocínio na
   resposta final (reforçado de novo em `REGRAS`). O objetivo é forçar o modelo a
   decidir a recomendação por etapas — em vez de gerar texto genérico de primeira —
   sem gastar tokens extras devolvendo o raciocínio ao usuário final.

## 3. Comparação de respostas (mesmas entradas, antes x depois)

Testado com o mesmo provedor (Gemini) e as mesmas duas entradas — a primeira é
exatamente o perfil usado no print da entrega anterior
([`print-recomendacao-ia.png`](./print-recomendacao-ia.png)).

Ver print completo em [`comparacao-prompt-antes-depois.png`](./comparacao-prompt-antes-depois.png).

**Perfil 1** — Interesse: *Ainda não sei* · Situação: *Termino o ensino médio este ano*
· Turno: *Manhã* · Objetivo: *Gosto de cuidar de pessoas*

- **Antes:** recomendação genérica de "área de Saúde", cita três cursos ao mesmo tempo
  (Enfermagem, Psicologia, Fisioterapia) sem se comprometer com um caminho único.
- **Depois:** também reconhece a indecisão do perfil, mas resolve de forma mais concreta
  — sugere visitar a unidade para decidir entre os cursos, em vez de só listar opções,
  e amarra a recomendação ao dado "ainda não sei" de forma mais natural.

**Perfil 2** — Interesse: *Direito* · Situação: *Já trabalho durante o dia* · Turno:
*Noite* · Objetivo: *Quero prestar concurso público*

- **Antes:** recomendação correta, mas com linguagem mais genérica ("sonhos",
  "grandes bancas examinadoras") e estrutura em 3 parágrafos curtos, fugindo do "único
  parágrafo" pedido.
- **Depois:** manteve-se dentro do formato de parágrafo único pedido, foi mais direto ao
  ligar "trabalha durante o dia" + "concurso público" à escolha do turno e da área, e
  fechou com o próximo passo concreto de checar vagas e grade.

## 4. Conclusão

A técnica que trouxe **mais ganho perceptível** foi o **few-shot**: os exemplos
fixaram a estrutura do parágrafo (motivo do curso → benefício prático → próximo passo)
de um jeito que instrução em texto livre não garantia sozinha — no prompt antigo, o
formato de saída variava mais (às vezes 1 parágrafo, às vezes 3, como no Perfil 2). O
chain-of-thought oculto ajudou principalmente no Perfil 1 (perfil indeciso), tornando a
recomendação menos genérica ao forçar o modelo a decidir um caminho antes de escrever,
mas seu efeito é mais sutil e depende do perfil ser ambíguo. As instruções reforçadas,
por si só, tiveram o menor impacto isolado — o prompt antigo já era razoavelmente claro
— mas ajudaram a manter as outras duas técnicas organizadas e sem conflito.

## 5. Links da entrega

- Repositório: https://github.com/Jczar801/OATBruna-UnexRedesign
- Commit com o refinamento do prompt: _(preenchido após o push — ver mensagem de commit
  "refactor(prompt): aplica few-shot e chain-of-thought oculto na recomendação de IA")_
