import { ArrowRight } from "lucide-react";
import heroImg from "../assets/illustrations/hero.svg";

const ATALHOS = [
  { label: "Usar nota do Enem", href: "#servicos" },
  { label: "Vestibular Medicina", href: "#cursos" },
  { label: "Vestibular online", href: "#servicos" },
  { label: "Cursos de graduação", href: "#cursos" },
];

export default function Hero() {
  return (
    <section id="topo" className="bg-navy text-paper">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-14 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-green font-semibold text-sm tracking-wide mb-4">
            Inscrições abertas — Feira de Santana, Itabuna, Jequié e Vitória da Conquista
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl leading-[1.08] mb-5">
            Sua próxima aula começa com uma decisão de hoje.
          </h1>
          <p className="text-white/70 text-lg mb-2 max-w-md">
            Mais de 15 cursos de graduação, corpo docente presente e estrutura própria em quatro cidades da Bahia.
          </p>
          <p className="text-white/50 text-sm mb-8 max-w-md">
            Use sua nota do Enem, transfira sua graduação ou comece do zero — o processo seletivo leva poucos minutos.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#inscreva-se"
              className="inline-flex items-center gap-2 rounded-full bg-green text-navy font-semibold px-6 py-3.5 hover:bg-white transition-colors"
            >
              Inscreva-se no vestibular
              <ArrowRight size={18} />
            </a>
            <a href="#cursos" className="text-white/70 text-sm font-medium hover:text-white underline underline-offset-4">
              Conhecer os cursos
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] rounded-2xl bg-navy-soft border border-white/10 overflow-hidden">
            <img
              src={heroImg}
              alt="Ilustração de formatura na Unex, com estudantes em beca em frente ao campus"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 bg-paper text-ink rounded-xl px-5 py-4 shadow-lg border border-line hidden sm:block">
            <p className="font-display font-bold text-2xl text-navy leading-none">4.200+</p>
            <p className="text-slate text-xs mt-1">alunos matriculados nas 4 unidades</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-wrap gap-x-8 gap-y-3 justify-between">
          {ATALHOS.map((a) => (
            <a key={a.label} href={a.href} className="text-sm text-white/70 hover:text-green transition-colors font-medium">
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
