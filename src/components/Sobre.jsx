export default function Sobre() {
  return (
    <section id="sobre" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10 items-start">
        <div>
          <h2 className="font-display font-bold text-3xl text-navy leading-tight">
            Uma faculdade pensada para quem estuda e trabalha na Bahia.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="border-l-2 border-green pl-5">
            <p className="text-ink leading-relaxed">
              A Unex nasceu para atender quem precisa conciliar a rotina de trabalho com uma graduação séria,
              com horários flexíveis e unidades presentes no interior baiano — não só na capital.
            </p>
          </div>
          <div className="border-l-2 border-clay pl-5">
            <p className="text-ink leading-relaxed">
              Cada unidade conta com laboratórios próprios, clínicas-escola e núcleo de apoio ao estudante,
              para que a formação prática comece antes do estágio obrigatório.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
