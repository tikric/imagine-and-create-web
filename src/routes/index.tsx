import { createFileRoute } from "@tanstack/react-router";
import heroCoffee from "@/assets/hero-coffee.jpg";
import cupLatte from "@/assets/cup-latte.jpg";
import barista from "@/assets/barista.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maré — Café de origem, torrado em pequenos lotes" },
      { name: "description", content: "Torrefação artesanal de cafés especiais brasileiros, entregues frescos na sua porta." },
      { property: "og:title", content: "Maré — Café de origem" },
      { property: "og:description", content: "Torrefação artesanal de cafés especiais brasileiros." },
      { property: "og:image", content: heroCoffee },
      { name: "twitter:image", content: heroCoffee },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground grain">
      <Header />
      <Hero />
      <Marquee />
      <Origins />
      <Ritual />
      <Subscription />
      <Journal />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-[var(--cream)]">
        <a href="#" className="font-serif text-2xl font-semibold tracking-tight">Maré<span className="text-[var(--caramel)]">.</span></a>
        <ul className="hidden md:flex items-center gap-10 text-sm">
          <li><a href="#origens" className="hover:text-[var(--caramel)] transition">Origens</a></li>
          <li><a href="#ritual" className="hover:text-[var(--caramel)] transition">Ritual</a></li>
          <li><a href="#assinatura" className="hover:text-[var(--caramel)] transition">Assinatura</a></li>
          <li><a href="#diario" className="hover:text-[var(--caramel)] transition">Diário</a></li>
        </ul>
        <a href="#assinatura" className="rounded-full border border-[var(--cream)]/40 px-5 py-2 text-sm hover:bg-[var(--cream)] hover:text-[var(--espresso)] transition">
          Comprar
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100vh] overflow-hidden">
      <img
        src={heroCoffee}
        alt="Grãos de café sendo despejados"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      <div className="relative z-10 mx-auto flex min-h-[100vh] max-w-7xl flex-col justify-end px-6 pb-24 pt-40 text-[var(--cream)]">
        <p className="fade-up mb-6 text-sm uppercase tracking-[0.3em] text-[var(--cream)]/70">
          Safra 2025 · Lote nº 047
        </p>
        <h1 className="fade-up font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] text-balance max-w-5xl">
          O tempo que o <em className="italic text-[var(--caramel)]">grão</em> pede,<br/>na xícara que você merece.
        </h1>
        <div className="fade-up mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a href="#assinatura" className="rounded-full bg-[var(--caramel)] px-8 py-4 text-sm font-medium text-[var(--cream)] hover:bg-[var(--caramel)]/90 transition">
            Receber em casa
          </a>
          <a href="#origens" className="text-sm border-b border-[var(--cream)]/40 pb-1 hover:border-[var(--caramel)] transition">
            Conheça as origens →
          </a>
        </div>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl border-t border-[var(--cream)]/20 pt-8">
          {[
            ["12", "fazendas parceiras"],
            ["7d", "do torrador ao postal"],
            ["89", "pontuação SCA média"],
            ["2.4k", "clientes fiéis"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-serif text-3xl md:text-4xl text-[var(--caramel)]">{n}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[var(--cream)]/60">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Cerrado Mineiro", "Mantiqueira", "Sul de Minas", "Chapada Diamantina", "Matas de Rondônia", "Espírito Santo"];
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border bg-[var(--espresso)] py-6 text-[var(--cream)]">
      <div className="marquee flex whitespace-nowrap gap-12 text-2xl md:text-4xl font-serif italic">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="text-[var(--caramel)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Origins() {
  const coffees = [
    { name: "Yara", region: "Cerrado Mineiro", notes: "Chocolate amargo, avelã, melaço", process: "Natural", price: "R$ 62" },
    { name: "Iara", region: "Mantiqueira de Minas", notes: "Caramelo, laranja-baía, mel", process: "Cereja descascado", price: "R$ 74" },
    { name: "Tupã", region: "Chapada Diamantina", notes: "Frutas vermelhas, cacau, jasmim", process: "Fermentado anaeróbio", price: "R$ 96" },
  ];
  return (
    <section id="origens" className="mx-auto max-w-7xl px-6 py-28">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--mocha)] mb-4">A coleção</p>
          <h2 className="font-serif text-5xl md:text-6xl text-balance max-w-2xl">
            Três <em className="italic text-[var(--caramel)]">origens</em>, três histórias dentro da bolsa.
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground">
          Cada grão chega aqui rastreável até o talhão. Torramos em micro-lotes para que você receba no auge da frescura.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
        {coffees.map((c, i) => (
          <article key={c.name} className="bg-card p-8 md:p-10 flex flex-col group hover:bg-[var(--espresso)] hover:text-[var(--cream)] transition-colors duration-500">
            <div className="flex items-baseline justify-between mb-8">
              <span className="text-xs uppercase tracking-wider text-muted-foreground group-hover:text-[var(--cream)]/60">Nº 0{i + 1}</span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground group-hover:text-[var(--cream)]/60">{c.process}</span>
            </div>
            <h3 className="font-serif text-5xl mb-2">{c.name}</h3>
            <p className="text-sm text-muted-foreground group-hover:text-[var(--cream)]/70 mb-8">{c.region}</p>
            <div className="border-t border-border group-hover:border-[var(--cream)]/20 pt-6 mt-auto">
              <p className="text-sm italic mb-6">{c.notes}</p>
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl">{c.price}</span>
                <span className="text-xs uppercase tracking-wider underline-offset-4 group-hover:underline">250g</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Ritual() {
  return (
    <section id="ritual" className="bg-[var(--espresso)] text-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-6 py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <img src={barista} alt="Barista preparando café" width={1024} height={1280} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--caramel)] mb-4">O ritual</p>
          <h2 className="font-serif text-5xl md:text-6xl mb-8 text-balance">
            Café não é pressa.<br/>É um <em className="italic text-[var(--caramel)]">gesto</em>.
          </h2>
          <p className="text-lg text-[var(--cream)]/70 mb-10 leading-relaxed max-w-lg">
            Da escolha do grão verde à última gota na xícara, cada etapa carrega intenção. A Maré nasceu para devolver ao café o tempo que ele merece — e o seu também.
          </p>
          <div className="space-y-px">
            {[
              ["01", "Seleção", "Visitamos as fazendas, provamos cada lote."],
              ["02", "Torra", "Pequenos lotes, perfil desenhado por cultivar."],
              ["03", "Entrega", "Embalado no dia anterior ao envio."],
            ].map(([n, t, d]) => (
              <div key={n} className="grid grid-cols-[auto_1fr_2fr] gap-6 items-start border-t border-[var(--cream)]/15 py-5">
                <span className="font-serif text-2xl text-[var(--caramel)]">{n}</span>
                <span className="font-serif text-xl">{t}</span>
                <span className="text-sm text-[var(--cream)]/60">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Subscription() {
  return (
    <section id="assinatura" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--mocha)] mb-4">Assinatura Maré</p>
          <h2 className="font-serif text-5xl md:text-6xl mb-6 text-balance">
            Uma origem nova<br/>a cada <em className="italic text-[var(--caramel)]">lua cheia</em>.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg">
            Receba mensalmente uma seleção curada pelo nosso mestre de torra, com cartão de catação e sugestão de método.
          </p>

          <div className="space-y-4">
            {[
              ["Solo", "250g · 1 origem", "R$ 68", "/mês"],
              ["Dueto", "500g · 2 origens", "R$ 128", "/mês"],
              ["Coletivo", "1kg · 3 origens", "R$ 230", "/mês"],
            ].map(([n, d, p, s], i) => (
              <label key={n} className="flex items-center gap-6 p-6 rounded-2xl border border-border hover:border-[var(--caramel)] hover:bg-card cursor-pointer transition group">
                <input type="radio" name="plan" defaultChecked={i === 1} className="h-4 w-4 accent-[var(--caramel)]" />
                <div className="flex-1">
                  <div className="font-serif text-2xl">{n}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-2xl">{p}</div>
                  <div className="text-xs text-muted-foreground">{s}</div>
                </div>
              </label>
            ))}
          </div>

          <button className="mt-10 rounded-full bg-[var(--espresso)] px-10 py-4 text-sm font-medium text-[var(--cream)] hover:bg-[var(--mocha)] transition">
            Começar minha assinatura
          </button>
        </div>

        <div className="relative aspect-square rounded-3xl overflow-hidden">
          <img src={cupLatte} alt="Xícara de café com latte art" width={1024} height={1024} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-[var(--cream)]/95 backdrop-blur p-6">
            <p className="text-xs uppercase tracking-wider text-[var(--mocha)] mb-2">Frete grátis</p>
            <p className="font-serif text-xl">para todo o Brasil em assinaturas mensais.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Journal() {
  const posts = [
    { tag: "Método", title: "Hario V60: o guia definitivo para começar", date: "12 mar" },
    { tag: "Origem", title: "Por que a altitude muda tudo no copo", date: "28 fev" },
    { tag: "Cultura", title: "A nova onda de produtores brasileiros", date: "10 fev" },
  ];
  return (
    <section id="diario" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-serif text-5xl md:text-6xl">Diário<span className="text-[var(--caramel)]">.</span></h2>
          <a href="#" className="text-sm border-b border-foreground/40 hover:border-[var(--caramel)] pb-1">Todos os textos →</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((p) => (
            <article key={p.title} className="group cursor-pointer">
              <div className="flex items-center gap-3 mb-4 text-xs uppercase tracking-wider text-muted-foreground">
                <span className="text-[var(--caramel)]">{p.tag}</span>
                <span>·</span>
                <span>{p.date}</span>
              </div>
              <h3 className="font-serif text-2xl leading-snug group-hover:text-[var(--caramel)] transition">{p.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground">Ler artigo →</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--espresso)] text-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
          <div>
            <a href="#" className="font-serif text-3xl">Maré<span className="text-[var(--caramel)]">.</span></a>
            <p className="mt-4 text-sm text-[var(--cream)]/60 max-w-xs">
              Torrefação artesanal de cafés especiais brasileiros. Feita com cuidado em São Paulo.
            </p>
          </div>
          {[
            ["Loja", ["Cafés", "Assinatura", "Acessórios", "Gift card"]],
            ["Casa", ["Sobre", "Produtores", "Sustentabilidade", "Contato"]],
            ["Suporte", ["Envios", "Trocas", "FAQ", "Atacado"]],
          ].map(([title, items]) => (
            <div key={title as string}>
              <h4 className="text-xs uppercase tracking-wider text-[var(--caramel)] mb-4">{title as string}</h4>
              <ul className="space-y-2 text-sm text-[var(--cream)]/70">
                {(items as string[]).map((i) => (
                  <li key={i}><a href="#" className="hover:text-[var(--cream)]">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-[var(--cream)]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--cream)]/50">
          <p>© 2026 Maré Torrefação. Todos os direitos reservados.</p>
          <p>Feito com grãos e calma.</p>
        </div>
      </div>
    </footer>
  );
}
