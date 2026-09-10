import { Stethoscope, Scale, Smile, HeartPulse, Calculator } from "lucide-react";
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
          {CURSOS.map(({ nome, duracao, icon: Icon, img }) => (
            <a
              href="#servicos"
              key={nome}
              className="group rounded-xl border border-line overflow-hidden hover:border-navy hover:shadow-sm transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden bg-paper">
                <img
                  src={img}
                  alt={`Ilustração representando o curso de ${nome}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <Icon size={20} className="text-green-deep mb-3" strokeWidth={1.5} />
                <p className="font-display font-semibold text-ink mb-1">{nome}</p>
                <p className="text-sm text-slate">{duracao}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
