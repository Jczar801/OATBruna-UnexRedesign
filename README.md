# Redesign da Landing Page — Unex

Estudo dirigido de front-end/UX-UI: análise crítica da landing page institucional da
[Unex](https://unex.edu.br) e proposta de redesign implementada em React.

> Conteúdo textual e imagens desta versão são de autoria própria, produzidos para fins
> didáticos. Nenhum texto ou arquivo de mídia foi copiado do site original.

## 1. Diagnóstico do site original

### Pontos fortes identificados
- **Menu institucional completo**: o header cobre tudo que uma faculdade multi-campus
  precisa (A Unex, Graduação, Estude na Unex, Unidades, Notícias, Serviços).
- **Multicanal de contato bem exposto**: WhatsApp, Messenger, 0800 e horário de
  atendimento aparecem logo na primeira dobra — relevante porque o público
  (candidato a vestibular) tende a preferir contato direto a formulário.
- **Acessibilidade nativa**: barra com aumentar/diminuir texto, escala de cinza, alto
  contraste e fonte para leitura — recurso que boa parte das landing pages comerciais
  não oferece.
- **Filtro de cursos na página de Graduação**: filtragem por área, unidade e duração é
  boa prática de UX para um catálogo de ~15 cursos.
- **Prova social presente**: depoimentos de alunos na home, no formato certo
  (nome + curso + citação).

### Pontos fracos identificados
- **Excesso de CTAs concorrentes**: pelo menos 7 links de "call to action" disputando a
  primeira tela, somados ao WhatsApp flutuante e a um letreiro rolante no rodapé
  repetindo "FALE CONOSCO E USE A SUA NOTA DO ENEM" dezenas de vezes — ruído visual e
  potencial ruído para leitores de tela.
- **Componente de Unidades inconsistente**: três unidades aparecem expandidas com foto
  e lista de cursos, enquanto Feira de Santana aparece apenas como link "+" recolhido.
- **Paleta de cores com problema de contraste**: no modo claro, a logo, as bordas dos
  botões e alguns textos praticamente desaparecem sobre o fundo.

## 2. Decisões de redesign

| Seção mantida/reformulada | Decisão |
|---|---|
| Header/Navbar | Mantido, com menos itens e um único CTA principal (Inscreva-se) |
| Hero | Reformulado: um headline, um subtítulo e **um** CTA primário; atalhos (nota do Enem, vestibular, etc.) viram links secundários abaixo, não botões concorrentes |
| Sobre a Unex | Nova seção curta, institucional, sem jargão de vendas |
| Cursos | Cards padronizados (ícone, nome, duração), com link único para o catálogo completo |
| Depoimentos | Mantido o formato nome + curso + citação |
| Unidades | Os 4 cards agora usam o **mesmo componente**, corrigindo a inconsistência do original |
| Notícias | Grade de 3 notícias, sem carrossel automático |
| Formulário de contato | Novo formulário de captação de lead (nome, WhatsApp, curso de interesse) |
| Footer | Sem letreiro rolante; links organizados em colunas |

Princípio geral aplicado: **um CTA de destaque por tela** — o restante das ações vira
link secundário discreto, reduzindo a concorrência de chamadas identificada no
diagnóstico.

O wireframe da proposta guiou a estrutura de seções: Header → Hero → Atalhos →
Nossos cursos → Depoimentos → Sobre a Unex → Unidades → Últimas notícias →
Inscreva-se → Footer.

## 3. Estrutura de componentes

```
src/
├── App.jsx                 # composição das seções da página
├── main.jsx                # bootstrap do React
├── index.css               # tokens de design (cor, tipografia) e Tailwind
└── components/
    ├── Navbar.jsx           # cabeçalho fixo, menu responsivo (mobile drawer)
    ├── Hero.jsx             # chamada principal + atalhos de vestibular/Enem
    ├── Sobre.jsx            # missão institucional
    ├── Cursos.jsx           # grade de cursos de graduação
    ├── Depoimentos.jsx      # prova social
    ├── Unidades.jsx         # as 4 unidades, componente único e consistente
    ├── Noticias.jsx         # últimas notícias
    ├── CTABanner.jsx        # formulário de captação de lead
    └── Footer.jsx           # rodapé com colunas de links
```

Cada seção é um componente isolado e sem estado compartilhado, exceto `Navbar`
(estado do menu mobile) e `CTABanner` (estado de formulário enviado/não enviado).

## 4. Tecnologias escolhidas

- **React + Vite**: build rápido, HMR e menor curva de configuração que Next.js para
  uma landing page sem necessidade de SSR/rotas.
- **Tailwind CSS v4** (via plugin `@tailwindcss/vite`): estilização utilitária,
  tokens de cor/tipografia centralizados em `@theme` no `index.css`, evitando CSS
  solto por componente.
- **lucide-react**: ícones leves em SVG, sem dependência de imagens externas.

## 5. Comparativo antes x depois

| Aspecto | Antes | Depois |
|---|---|---|
| CTAs na primeira tela | 7+ concorrendo entre si | 1 CTA primário + atalhos secundários |
| Rodapé | Letreiro rolante repetitivo | Estático, organizado em colunas |
| Unidades | 3 expandidas + 1 recolhida (inconsistente) | 4 cards idênticos |
| Contraste no modo claro | Logo/bordas/texto sumindo | Paleta com contraste testado (grafite/navy sobre branco-gelo) |

## 6. Dificuldades encontradas e soluções

- **Tailwind v4 mudou a forma de configuração** (sem `tailwind.config.js` por padrão):
  resolvido usando o plugin oficial `@tailwindcss/vite` e declarando os tokens de cor
  e fonte diretamente em `@theme` no `index.css`.
- **Ordem do `@import` de fontes do Google Fonts**: o build acusava aviso porque o
  `@import "tailwindcss"` vinha antes do import da fonte; corrigido invertendo a ordem
  (imports externos sempre antes do `@import "tailwindcss"`).
- **Evitar o padrão genérico de cards uniformes**: optei por variar o tratamento visual
  entre a seção de Cursos (cards claros) e Unidades (cards escuros, fundo navy) para dar
  hierarquia visual às seções, em vez de repetir o mesmo componente de card em toda a
  página.

## 7. Possíveis melhorias futuras

- Integrar o formulário de captação a um serviço real de CRM/e-mail.
- Adicionar filtro por área/unidade/duração na seção de cursos, como no site original.
- Criar página interna de cada unidade e de cada curso (roteamento com React Router
  ou migração para Next.js caso o SEO de páginas internas se torne prioridade).
- Testes automatizados de acessibilidade (axe-core) e testes de regressão visual.

## Rodando o projeto

```bash
npm install
npm run dev       # ambiente de desenvolvimento (só frontend)
npm run build     # build de produção em /dist
```

## Funcionalidade de IA (recomendação personalizada)

O projeto inclui uma seção "Descubra o curso ideal para você" com recomendação
gerada por IA (Google Gemini), via uma Serverless Function em `api/gerar-recomendacao.js`.
Detalhes completos (opção escolhida, provedor, arquitetura, trechos de código,
dificuldades e melhorias futuras) estão em [`DOCUMENTACAO-IA.md`](./DOCUMENTACAO-IA.md).

Para testar essa parte localmente (o `npm run dev` sozinho não sobe a função de
backend):

```bash
npm install -g vercel   # se ainda não tiver a CLI da Vercel
cp .env.example .env.local
# edite .env.local e cole sua chave gratuita gerada em
# https://aistudio.google.com/app/apikey
vercel dev
```

## Deploy

``` Site publicado: https://oat-bruna-unex-redesign.vercel.app/ Build gerado em `dist/`, pronto para publicar em Vercel, Netlify ou GitHub Pages. Para a funcionalidade de IA funcionar em produção, configure a variável de ambiente `GEMINI_API_KEY` no painel do projeto na Vercel (Settings → Environment Variables) — nunca no código-fonte. ``` 
