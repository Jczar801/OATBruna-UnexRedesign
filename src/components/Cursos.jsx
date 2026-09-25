import { useState } from "react";
import {
  Stethoscope,
  Scale,
  Smile,
  HeartPulse,
  Calculator,
  Briefcase,
  Microscope,
  Dumbbell,
  Building2,
  Pill,
  Activity,
  PawPrint,
  Apple,
  Brain,
  Laptop,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import imgMedicina from "../assets/illustrations/course-medicina.svg";
import imgDireito from "../assets/illustrations/course-direito.svg";
import imgOdontologia from "../assets/illustrations/course-odontologia.svg";
import imgEnfermagem from "../assets/illustrations/course-enfermagem.svg";
import imgContabeis from "../assets/illustrations/course-contabeis.svg";

const CURSOS = [
  { nome: "Medicina", duracao: "6 anos", icon: Stethoscope, img: imgMedicina },
  { nome: "Direito", duracao: "5 anos", icon: Scale, img: imgDireito },
  { nome: "Odontologia", duracao: "4 anos", icon: Smile, img: imgOdontologia },
  { nome: "Enfermagem", duracao: "4 anos", icon: HeartPulse, img: imgEnfermagem },
  { nome: "Ciências Contábeis", duracao: "4 anos", icon: Calculator, img: imgContabeis },
  { nome: "Administração", duracao: "4 anos", icon: Briefcase },
  { nome: "Biomedicina", duracao: "4 anos", icon: Microscope },
  { nome: "Educação Física", duracao: "4 anos", icon: Dumbbell },
  { nome: "Engenharia Civil", duracao: "5 anos", icon: Building2 },
  { nome: "Farmácia", duracao: "5 anos", icon: Pill },
  { nome: "Fisioterapia", duracao: "5 anos", icon: Activity },
  { nome: "Medicina Veterinária", duracao: "5 anos", icon: PawPrint },
  { nome: "Nutrição", duracao: "4 anos", icon: Apple },
  { nome: "Psicologia", duracao: "5 anos", icon: Brain },
  { nome: "Sistemas de Informação", duracao: "4 anos", icon: Laptop },
];

const VISIVEIS_INICIALMENTE = 5;

export default function Cursos() {
  const [expandido, setExpandido] = useState(false);
  const cursosExibidos = expandido ? CURSOS : CURSOS.slice(0, VISIVEIS_INICIALMENTE);
  const temMais = CURSOS.length > VISIVEIS_INICIALMENTE;

  return (
    <section id="cursos" className="bg-white border-y border-line">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <h2 className="font-display font-bold text-3xl text-navy">Nossos cursos</h2>
          <a href="#servicos" className="text-sm font-semibold text-green-deep hover:text-navy">
            Fale com a Central do Candidato
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {cursosExibidos.map(({ nome, duracao, icon: Icon, img }) => (
            <a
              href="#servicos"
              key={nome}
              className="group rounded-xl border border-line overflow-hidden hover:border-navy hover:shadow-sm transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden bg-paper flex items-center justify-center">
                {img ? (
                  <img
                    src={img}
                    alt={`Ilustração representando o curso de ${nome}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <Icon
                    size={40}
                    className="text-green-deep group-hover:scale-110 transition-transform duration-300"
                    strokeWidth={1.5}
                  />
                )}
              </div>
              <div className="p-5">
                <Icon size={20} className="text-green-deep mb-3" strokeWidth={1.5} />
                <p className="font-display font-semibold text-ink mb-1">{nome}</p>
                <p className="text-sm text-slate">{duracao}</p>
              </div>
            </a>
          ))}
        </div>

        {temMais && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setExpandido((v) => !v)}
              aria-expanded={expandido}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-navy hover:border-navy transition-colors"
            >
              {expandido ? (
                <>
                  Ver menos
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Ver mais cursos
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
