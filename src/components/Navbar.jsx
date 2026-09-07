import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "A Unex", href: "#sobre" },
  { label: "Graduação", href: "#cursos" },
  { label: "Unidades", href: "#unidades" },
  { label: "Notícias", href: "#noticias" },
  { label: "Serviços", href: "#servicos" },
];

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M15 8.5h-2c-.8 0-1.5.7-1.5 1.5v2h3.3l-.4 3h-2.9V21h-3v-6H8v-3h1.5v-2.2c0-2.2 1.6-4 3.8-4H15v2.7Z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M12 17v-4.5c0-1.4 1-2.5 2.3-2.5s2.2 1 2.2 2.5V17" />
    </svg>
  );
}

const REDES = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between py-4">
        <div className="flex items-center gap-4 shrink-0">
          <a href="#topo" className="flex items-center gap-2">
            <svg width="34" height="30" viewBox="0 0 34 30" fill="none" aria-hidden="true">
              <path d="M2 2 L17 28 L32 2" stroke="#2FBD6B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span className="font-display font-extrabold text-xl tracking-tight text-navy">unex</span>
          </a>

          <div className="hidden md:flex items-center gap-1 pl-3 border-l border-line">
            {REDES.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="p-1.5 rounded-full text-slate hover:text-green-deep hover:bg-green/10 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

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
          <div className="flex items-center gap-4 pt-2 border-t border-line">
            {REDES.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="text-slate hover:text-green-deep transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

