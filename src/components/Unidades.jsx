import { MapPin } from "lucide-react";
import imgFeira from "../assets/illustrations/unidade-feira-de-santana.svg";
import imgItabuna from "../assets/illustrations/unidade-itabuna.svg";
import imgJequie from "../assets/illustrations/unidade-jequie.svg";
import imgConquista from "../assets/illustrations/unidade-vitoria-da-conquista.svg";

const UNIDADES = [
  { cidade: "Feira de Santana", cursos: 12, img: imgFeira },
  { cidade: "Itabuna", cursos: 11, img: imgItabuna },
  { cidade: "Jequié", cursos: 8, img: imgJequie },
  { cidade: "Vitória da Conquista", cursos: 11, img: imgConquista },
];

export default function Unidades() {
  return (
    <section id="unidades" className="bg-navy text-paper">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display font-bold text-3xl mb-10">Unidades na Bahia</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {UNIDADES.map((u) => (
            <a
              key={u.cidade}
              href="#servicos"
              className="group rounded-xl bg-navy-soft border border-white/10 overflow-hidden hover:border-green transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={u.img}
                  alt={`Ilustração representando a unidade de ${u.cidade}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <MapPin size={18} className="text-green mb-3" />
                <p className="font-display font-semibold mb-1">{u.cidade}</p>
                <p className="text-white/50 text-sm">{u.cursos} cursos disponíveis</p>
                <span className="block mt-4 text-sm text-green/0 group-hover:text-green transition-colors">
                  Conhecer a unidade →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
