import avatarCamila from "../assets/illustrations/avatar-camila.svg";
import avatarDiego from "../assets/illustrations/avatar-diego.svg";
import avatarLarissa from "../assets/illustrations/avatar-larissa.svg";

const DEPOIMENTOS = [
  {
    nome: "Camila Freitas",
    curso: "3º semestre de Medicina — Vitória da Conquista",
    texto:
      "Escolhi a Unex pela clínica-escola: já estou em contato com pacientes reais desde o segundo semestre.",
    avatar: avatarCamila,
  },
  {
    nome: "Diego Almeida",
    curso: "Formado em Direito — Feira de Santana",
    texto:
      "Trabalhava de manhã e estudava à noite. A grade flexível foi o que tornou a faculdade possível pra mim.",
    avatar: avatarDiego,
  },
  {
    nome: "Larissa Souza",
    curso: "2º semestre de Odontologia — Itabuna",
    texto:
      "Os professores conhecem cada aluno pelo nome. Isso muda completamente como você aprende.",
    avatar: avatarLarissa,
  },
];

export default function Depoimentos() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-display font-bold text-3xl text-navy mb-10">Quem estuda, recomenda</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {DEPOIMENTOS.map((d) => (
          <figure key={d.nome} className="rounded-xl bg-white border border-line p-7 flex flex-col">
            <blockquote className="text-ink leading-relaxed mb-6 flex-1">"{d.texto}"</blockquote>
            <figcaption className="flex items-center gap-3">
              <img
                src={d.avatar}
                alt={`Ilustração representando ${d.nome}`}
                className="w-11 h-11 rounded-full object-cover shrink-0"
              />
              <div>
                <p className="font-semibold text-navy text-sm">{d.nome}</p>
                <p className="text-slate text-xs mt-0.5">{d.curso}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
