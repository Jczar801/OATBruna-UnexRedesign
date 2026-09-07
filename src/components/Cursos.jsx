import { Stethoscope, Scale, Smile, HeartPulse, Calculator } from "lucide-react";

const CURSOS = [
  { nome: "Medicina", duracao: "6 anos", icon: Stethoscope },
  { nome: "Direito", duracao: "5 anos", icon: Scale },
  { nome: "Odontologia", duracao: "4 anos", icon: Smile },
  { nome: "Enfermagem", duracao: "4 anos", icon: HeartPulse },
  { nome: "Ciências Contábeis", duracao: "4 anos", icon: Calculator },
];

export default function Cursos() {
  return (
    <section id="cursos" className="bg-white border-y border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <h2 className="font-display font-bold text-3xl text-navy">Nossos cursos</h2>
          <a href="#servicos" className="text-sm font-semibold text-green-deep hover:text-navy">
            Ver catálogo completo de graduação
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {CURSOS.map(({ nome, duracao, icon: Icon }) => (
            <div
              key={nome}
              className="rounded-xl border border-line p-6 hover:border-navy hover:shadow-sm transition-all"
            >
              <Icon size={26} className="text-green-deep mb-6" strokeWidth={1.5} />
              <p className="font-display font-semibold text-ink mb-1">{nome}</p>
              <p className="text-sm text-slate">{duracao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
