import { MapPin } from "lucide-react";

const UNIDADES = [
  { cidade: "Feira de Santana", cursos: 12 },
  { cidade: "Itabuna", cursos: 11 },
  { cidade: "Jequié", cursos: 8 },
  { cidade: "Vitória da Conquista", cursos: 11 },
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
              className="rounded-xl bg-navy-soft border border-white/10 p-6 hover:border-green transition-colors group"
            >
              <MapPin size={20} className="text-green mb-8" />
              <p className="font-display font-semibold mb-1">{u.cidade}</p>
              <p className="text-white/50 text-sm">{u.cursos} cursos disponíveis</p>
              <span className="block mt-6 text-sm text-green/0 group-hover:text-green transition-colors">
                Conhecer a unidade →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
