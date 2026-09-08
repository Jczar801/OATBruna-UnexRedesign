import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

const CURSOS_INTERESSE = [
  "Medicina",
  "Direito",
  "Odontologia",
  "Enfermagem",
  "Ciências Contábeis",
  "Ainda não sei",
];

const SITUACOES = [
  "Termino o ensino médio este ano",
  "Já trabalho e quero estudar à noite",
  "Quero transferir de outra faculdade",
  "Já tenho graduação e quero uma segunda",
];

const TURNOS = ["Manhã", "Noite", "Educação a distância (EAD)", "Tanto faz"];

export default function RecomendacaoIA() {
  const [form, setForm] = useState({
    interesse: "",
    situacao: "",
    turno: "",
    objetivo: "",
  });
  const [texto, setTexto] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  function atualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setCarregando(true);
    setErro("");
    setTexto("");

    try {
      const resp = await fetch("/api/gerar-recomendacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await resp.json();

      if (!resp.ok) {
        setErro(data.erro || "Não foi possível gerar a recomendação agora.");
      } else {
        setTexto(data.texto);
      }
    } catch {
      setErro("Falha de conexão. Verifique sua internet e tente de novo.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section id="recomendacao" className="bg-white border-y border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-deep bg-green/10 rounded-full px-3 py-1 mb-4">
            <Sparkles size={13} />
            Assistente automatizado — conteúdo gerado por IA
          </p>
          <h2 className="font-display font-bold text-3xl text-navy mb-3">
            Descubra o curso ideal para o seu momento
          </h2>
          <p className="text-slate leading-relaxed max-w-md">
            Conte um pouco sobre você e um assistente automatizado monta, na hora, uma
            recomendação personalizada. É um ponto de partida para conversar — não substitui
            o atendimento humano da Central do Candidato.
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="rounded-xl border border-line p-6 grid gap-4">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-ink">Área ou curso de interesse</span>
              <select
                value={form.interesse}
                onChange={(e) => atualizar("interesse", e.target.value)}
                className="rounded-lg border border-line px-3 py-2.5 text-sm text-ink focus:border-navy outline-none"
              >
                <option value="">Selecione...</option>
                {CURSOS_INTERESSE.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-ink">Sua situação hoje</span>
              <select
                value={form.situacao}
                onChange={(e) => atualizar("situacao", e.target.value)}
                className="rounded-lg border border-line px-3 py-2.5 text-sm text-ink focus:border-navy outline-none"
              >
                <option value="">Selecione...</option>
                {SITUACOES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-ink">Turno preferido</span>
              <select
                value={form.turno}
                onChange={(e) => atualizar("turno", e.target.value)}
                className="rounded-lg border border-line px-3 py-2.5 text-sm text-ink focus:border-navy outline-none"
              >
                <option value="">Selecione...</option>
                {TURNOS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-ink">O que você busca com a graduação?</span>
              <textarea
                value={form.objetivo}
                onChange={(e) => atualizar("objetivo", e.target.value)}
                rows={3}
                maxLength={300}
                placeholder="Ex.: quero mudar de área e trabalhar com saúde, sem parar de trabalhar durante o dia"
                className="rounded-lg border border-line px-3 py-2.5 text-sm text-ink focus:border-navy outline-none resize-none"
              />
            </label>

            <button
              type="submit"
              disabled={carregando}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-navy text-paper font-semibold py-3 text-sm hover:bg-navy-soft transition-colors disabled:opacity-60"
            >
              {carregando ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Gerando recomendação...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Gerar recomendação personalizada
                </>
              )}
            </button>

            {erro && <p className="text-sm text-red-600">{erro}</p>}
          </form>

          {texto && (
            <div className="mt-4 rounded-xl bg-paper border border-line p-6">
              <p className="text-xs font-semibold text-green-deep mb-2 flex items-center gap-1.5">
                <Sparkles size={13} />
                Gerado por IA — revise antes de decidir
              </p>
              <p className="text-ink leading-relaxed whitespace-pre-line">{texto}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
