import { useState } from "react";

export default function CTABanner() {
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setEnviado(true);
  }

  return (
    <section id="inscreva-se" className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-2xl bg-green px-8 py-12 sm:px-14 sm:py-14 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-display font-bold text-3xl text-navy mb-3">
            Fale com a Central do Candidato
          </h2>
          <p className="text-navy/70 max-w-sm">
            Deixe seu contato e um consultor de admissão te ajuda a escolher o curso e a forma de ingresso certa.
          </p>
        </div>

        {enviado ? (
          <div className="bg-white rounded-xl p-6">
            <p className="font-display font-semibold text-navy">Recebemos seu contato.</p>
            <p className="text-slate text-sm mt-1">Um consultor fala com você em até um dia útil.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 grid gap-3">
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                required
                type="text"
                placeholder="Nome completo"
                className="rounded-lg border border-line px-4 py-3 text-sm focus:border-navy outline-none"
              />
              <input
                required
                type="tel"
                placeholder="WhatsApp"
                className="rounded-lg border border-line px-4 py-3 text-sm focus:border-navy outline-none"
              />
            </div>
            <select
              required
              defaultValue=""
              className="rounded-lg border border-line px-4 py-3 text-sm focus:border-navy outline-none text-slate"
            >
              <option value="" disabled>
                Curso de interesse
              </option>
              <option>Medicina</option>
              <option>Direito</option>
              <option>Odontologia</option>
              <option>Enfermagem</option>
              <option>Ciências Contábeis</option>
            </select>
            <button
              type="submit"
              className="rounded-lg bg-navy text-paper font-semibold py-3 text-sm hover:bg-navy-soft transition-colors"
            >
              Quero ser contatado
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
