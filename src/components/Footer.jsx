const COLUNAS = [
  {
    titulo: "Unex",
    links: ["A Unex", "Graduação", "Unidades", "Notícias"],
  },
  {
    titulo: "Estude na Unex",
    links: ["Vestibular online", "Vestibular Medicina", "Nota do Enem", "Transferência"],
  },
  {
    titulo: "Legal",
    links: ["Política de privacidade", "Política de cookies"],
  },
];

export default function Footer() {
  return (
    <footer id="servicos" className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <span className="font-display font-extrabold text-xl text-navy">unex</span>
          <p className="text-slate text-sm mt-3 max-w-[220px]">
            Faculdade com unidades em Feira de Santana, Itabuna, Jequié e Vitória da Conquista.
          </p>
        </div>
        {COLUNAS.map((c) => (
          <div key={c.titulo}>
            <p className="font-display font-semibold text-navy text-sm mb-4">{c.titulo}</p>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#topo" className="text-slate text-sm hover:text-green-deep transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-slate/70">
          © {new Date().getFullYear()} Unex — conteúdo produzido para fins didáticos.
        </p>
      </div>
    </footer>
  );
}
