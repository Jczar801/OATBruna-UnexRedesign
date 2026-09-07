import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "A Unex", href: "#sobre" },
  { label: "Graduação", href: "#cursos" },
  { label: "Unidades", href: "#unidades" },
  { label: "Notícias", href: "#noticias" },
  { label: "Serviços", href: "#servicos" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between py-4">
        <a href="#topo" className="flex items-center gap-2 shrink-0">
          <svg width="34" height="30" viewBox="0 0 34 30" fill="none" aria-hidden="true">
            <path d="M2 2 L17 28 L32 2" stroke="#2FBD6B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
          <span className="font-display font-extrabold text-xl tracking-tight text-navy">unex</span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 font-medium text-[15px] text-slate">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-navy transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#inscreva-se"
            className="rounded-full bg-navy text-paper px-5 py-2.5 text-sm font-semibold hover:bg-navy-soft transition-colors"
          >
            Inscreva-se
          </a>
        </div>

        <button
          className="lg:hidden text-navy"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line bg-paper px-6 py-4 flex flex-col gap-4">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-slate font-medium">
              {l.label}
            </a>
          ))}
          <a
            href="#inscreva-se"
            onClick={() => setOpen(false)}
            className="rounded-full bg-navy text-paper px-5 py-2.5 text-sm font-semibold text-center"
          >
            Inscreva-se
          </a>
        </nav>
      )}
    </header>
  );
}
