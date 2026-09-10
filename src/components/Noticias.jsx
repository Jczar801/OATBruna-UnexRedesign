import imgBolsas from "../assets/illustrations/news-bolsas.svg";
import imgClinica from "../assets/illustrations/news-clinica.svg";
import imgVestibular from "../assets/illustrations/news-vestibular.svg";

const NOTICIAS = [
  {
    data: "28 ago",
    titulo: "Unex abre inscrições para bolsas de iniciação científica",
    resumo: "Alunos de todos os cursos podem submeter projetos até o fim do mês.",
    img: imgBolsas,
  },
  {
    data: "14 ago",
    titulo: "Nova clínica-escola de Odontologia abre em Itabuna",
    resumo: "Espaço amplia o atendimento gratuito à comunidade e a carga prática do curso.",
    img: imgClinica,
  },
  {
    data: "02 ago",
    titulo: "Calendário do vestibular de verão já está disponível",
    resumo: "Provas presenciais e online em todas as quatro unidades da Unex.",
    img: imgVestibular,
  },
];

export default function Noticias() {
  return (
    <section id="noticias" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="font-display font-bold text-3xl text-navy mb-10">Últimas notícias</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {NOTICIAS.map((n) => (
          <article key={n.titulo} className="group cursor-pointer">
            <div className="aspect-[4/3] rounded-xl bg-white border border-line overflow-hidden mb-4">
              <img
                src={n.img}
                alt={`Ilustração da notícia: ${n.titulo}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-xs text-clay font-semibold mb-2">{n.data}</p>
            <h3 className="font-display font-semibold text-ink mb-1.5 group-hover:text-green-deep transition-colors">
              {n.titulo}
            </h3>
            <p className="text-slate text-sm">{n.resumo}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
