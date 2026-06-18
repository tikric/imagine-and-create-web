import { createFileRoute, Link } from "@tanstack/react-router";
import heroPrinter from "@/assets/hero-printer.jpg";
import { modules, courseStats } from "@/data/modules";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OrcaSlicer MASTERCLASS — Engenharia de Fatiamento" },
      { name: "description", content: "O curso definitivo de OrcaSlicer e impressão 3D FDM. 24 módulos, da interface à produção comercial." },
      { property: "og:image", content: heroPrinter },
      { name: "twitter:image", content: heroPrinter },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <Hero />
      <Marquee />
      <Stats />
      <Methodology />
      <CurriculumPreview />
      <Instructor />
      <Pricing />
      <Faq />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
        <div>
          <div className="fade-up inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs mono uppercase tracking-wider text-primary mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            v2026.06 · matrículas abertas
          </div>
          <h1 className="fade-up text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.02] text-balance">
            O guia <span className="text-primary">definitivo</span> do fatiador que vai revolucionar suas impressões 3D.
          </h1>
          <p className="fade-up mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Calibração científica, mecânica de materiais, otimização extrema e o caminho para transformar seu hobby em um negócio lucrativo — em <strong className="text-foreground">{courseStats.modules} módulos</strong> e <strong className="text-foreground">{courseStats.lessons}+ aulas</strong>.
          </p>
          <div className="fade-up mt-10 flex flex-col sm:flex-row gap-4">
            <a href="#investimento" className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition glow-orca">
              Garantir minha vaga →
            </a>
            <Link to="/curso" className="inline-flex items-center justify-center rounded-md border border-border px-7 py-3.5 text-sm font-medium hover:bg-card transition">
              Ver os 24 módulos
            </Link>
          </div>
          <div className="fade-up mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-primary to-chart-3" />
              ))}
            </div>
            <span>+2.400 alunos · nota 4,9/5</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 via-transparent to-chart-3/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img src={heroPrinter} alt="Bico de impressora 3D extrudando filamento" width={1536} height={1024} className="w-full h-auto object-cover" />
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between mono text-xs">
              <span className="rounded bg-background/80 px-2 py-1 backdrop-blur">● REC · live calibration</span>
              <span className="rounded bg-background/80 px-2 py-1 backdrop-blur text-primary">flow 14.2 mm³/s</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2 mono text-[10px]">
              <Stat label="LAYER" value="0.20mm" />
              <Stat label="TEMP" value="215°C" />
              <Stat label="SPEED" value="280 mm/s" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded bg-background/80 backdrop-blur px-3 py-2 border border-border/50">
      <div className="text-muted-foreground">{label}</div>
      <div className="text-primary font-semibold">{value}</div>
    </div>
  );
}

function Marquee() {
  const items = ["PRESSURE ADVANCE", "INPUT SHAPING", "ARACHNE", "TREE SUPPORT", "SCARF SEAM", "ADAPTIVE LAYERS", "FLOW CALIBRATION", "MULTI-MATERIAL", "MODIFIERS", "VASE MODE"];
  const row = [...items, ...items];
  return (
    <div className="border-y border-border bg-card/50 py-5 overflow-hidden">
      <div className="marquee flex whitespace-nowrap gap-12 mono text-sm text-muted-foreground">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="text-primary">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  const stats = [
    [courseStats.modules, "Módulos", "do básico ao profissional"],
    [`${courseStats.lessons}+`, "Aulas práticas", "com walkthrough no Orca"],
    [`${courseStats.hours}h`, "De conteúdo", "atualizado a cada release"],
    [`${courseStats.downloads}+`, "Downloads", "perfis .3mf, planilhas, checklists"],
  ];
  return (
    <section id="metodologia" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
        {stats.map(([n, l, d]) => (
          <div key={l} className="bg-background p-8">
            <div className="text-5xl font-bold text-primary">{n}</div>
            <div className="mt-3 font-medium">{l}</div>
            <div className="text-xs text-muted-foreground mt-1">{d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Methodology() {
  const pillars = [
    { tag: "01", title: "Teoria com profundidade", body: "Explicamos a física por trás de cada parâmetro: heat creep, anisotropia, pressure advance, fluxo volumétrico. Você entende, não decora." },
    { tag: "02", title: "Prática no OrcaSlicer", body: "Cada conceito vem com screenshot anotado mostrando exatamente onde ajustar no slicer e como interpretar o Preview." },
    { tag: "03", title: "Calibração científica", body: "Testes calibráveis em .3mf, planilhas de registro e protocolos repetíveis. Sem chute, sem 'tente até dar certo'." },
    { tag: "04", title: "Aplicação comercial", body: "Do orçamento ao envio: cálculo de custos, gestão de fazenda de impressão, perfis otimizados para Mercado Livre e Shopee." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-3xl mb-16">
        <div className="mono text-xs uppercase tracking-wider text-primary mb-4">A metodologia</div>
        <h2 className="text-4xl md:text-5xl font-bold text-balance">Quatro pilares que separam o hobby da engenharia.</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((p) => (
          <div key={p.tag} className="group rounded-2xl border border-border bg-card/50 p-8 hover:border-primary/50 transition">
            <div className="flex items-baseline justify-between mb-6">
              <span className="mono text-xs text-primary">/ {p.tag}</span>
              <span className="h-px flex-1 mx-4 bg-border group-hover:bg-primary/30 transition" />
            </div>
            <h3 className="text-2xl font-semibold mb-3">{p.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CurriculumPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <div className="mono text-xs uppercase tracking-wider text-primary mb-4">Grade curricular</div>
          <h2 className="text-4xl md:text-5xl font-bold">24 módulos, 56 horas, zero achismo.</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Da segurança operacional (com protocolo para crianças e impressoras fechadas) até pós-processamento profissional — lixamento, alisamento químico com acetona e insertos termofixados.
          </p>
        </div>
        <Link to="/curso" className="text-sm text-primary hover:underline">Ver curso completo →</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
        {modules.slice(0, 12).map((m) => {
          const highlights = Array.from(new Set(m.lessons.flatMap((l) => l.topics))).slice(0, 3);
          return (
            <Link
              key={m.id}
              to="/curso/$moduleId"
              params={{ moduleId: m.id }}
              className="group bg-card p-6 hover:bg-card/30 transition relative flex flex-col"
            >
              <div className="flex items-baseline justify-between mb-4">
                <span className="mono text-xs text-primary">MOD.{String(m.number).padStart(2, "0")}</span>
                <span className="text-xs text-muted-foreground">{m.level}</span>
              </div>
              <h3 className="font-semibold text-lg leading-snug mb-2 group-hover:text-primary transition">{m.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{m.tagline}</p>
              {highlights.length > 0 && (
                <ul className="mt-4 space-y-1 text-xs text-foreground/80">
                  {highlights.map((t) => (
                    <li key={t} className="flex gap-2"><span className="text-primary">▸</span><span>{t}</span></li>
                  ))}
                </ul>
              )}
              <div className="mt-auto pt-6 flex items-center justify-between text-xs text-muted-foreground">
                <span>{m.lessons.length} aulas · {m.duration}</span>
                <span className="text-primary opacity-0 group-hover:opacity-100 transition">→</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-8 text-center">
        <Link to="/curso" className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm hover:bg-card transition">
          Mais 12 módulos avançados <span className="text-primary">→</span>
        </Link>
      </div>
    </section>
  );
}

function Instructor() {
  return (
    <section id="instrutor" className="mx-auto max-w-7xl px-6 py-24">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-background p-8 md:p-16 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 items-center">
        <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-chart-3/10 border border-border overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl font-bold text-primary/60">/M</span>
          </div>
        </div>
        <div>
          <div className="mono text-xs uppercase tracking-wider text-primary mb-4">Seu instrutor</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Engenheiro, maker e operador de uma fazenda de 12 impressoras.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Sete anos calibrando, quebrando e reconstruindo perfis. Compilei aqui tudo o que eu queria ter aprendido no primeiro mês — sem rodeios, sem misticismo, sem "tente diminuir a temperatura e veja se melhora".
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              "12 impressoras em produção contínua",
              "+50.000 horas de impressão registradas",
              "Perfis publicados para 18 modelos",
              "Consultoria para indústria automotiva",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <span className="text-primary mt-0.5">▸</span>
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="investimento" className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center mb-12">
        <div className="mono text-xs uppercase tracking-wider text-primary mb-4">Investimento</div>
        <h2 className="text-4xl md:text-5xl font-bold text-balance">Uma única vaga. Acesso vitalício.</h2>
      </div>
      <div className="rounded-3xl border border-primary/50 bg-card overflow-hidden glow-orca">
        <div className="bg-primary/10 px-8 py-3 text-center mono text-xs uppercase tracking-wider text-primary">
          Turma de junho · 30 vagas
        </div>
        <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-2">Plano Completo</h3>
            <p className="text-muted-foreground mb-8">Tudo. Para sempre. Atualizações incluídas.</p>
            <ul className="space-y-3 text-sm">
              {[
                "24 módulos · 73+ aulas com walkthrough no Orca",
                "Perfis .3mf de calibração (PLA, PETG, ABS, TPU, ASA)",
                "Planilha de precificação + custo por grama/hora",
                "Checklist de manutenção e de pós-processamento",
                "Guia de alisamento químico (acetona) e insertos termofixados",
                "Tabelas de secagem e armazenamento de filamentos",
                "Grupo Telegram com instrutor + encontros mensais ao vivo",
                "Certificado de conclusão · atualizações vitalícias · garantia de 14 dias",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:border-l md:border-border md:pl-12 text-center md:text-left">
            <div className="text-sm text-muted-foreground line-through">de R$ 1.997</div>
            <div className="mt-2 flex items-baseline gap-2 justify-center md:justify-start">
              <span className="text-5xl font-bold">12x R$ 79</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">ou R$ 797 à vista</div>
            <button className="mt-8 w-full rounded-md bg-primary py-4 text-sm font-semibold text-primary-foreground hover:opacity-90 transition">
              Quero garantir minha vaga
            </button>
            <p className="mt-4 text-xs text-muted-foreground text-center">Pagamento seguro · cartão, Pix ou boleto</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const items = [
    ["Preciso ter uma impressora 3D para fazer o curso?", "Não para os módulos teóricos, mas a partir do módulo 4 (Calibração) o ideal é ter acesso a uma máquina. Funcionamos com qualquer impressora FDM compatível com OrcaSlicer (Bambu Lab, Creality, Prusa, Voron, Ender, etc)."],
    ["O OrcaSlicer funciona com a minha impressora?", "OrcaSlicer suporta praticamente toda impressora FDM moderna. No módulo 1 ensinamos a criar perfil customizado caso a sua não esteja na lista oficial."],
    ["O curso é em português?", "100%. Áudio, legendas, materiais escritos e suporte — todos em português brasileiro."],
    ["Por quanto tempo terei acesso?", "Vitalício. Você compra uma vez e mantém acesso para sempre, incluindo atualizações futuras do conteúdo."],
    ["Tem garantia?", "Sim, 14 dias. Se não gostar por qualquer motivo, devolvemos 100% do valor sem perguntas."],
    ["Funciona para quem quer vender peças impressas?", "Sim — o módulo 15 (Produção Comercial) e o módulo 23 (Marketplaces) são dedicados a isso. Inclui planilha de precificação."],
  ];
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center mb-12">
        <div className="mono text-xs uppercase tracking-wider text-primary mb-4">FAQ</div>
        <h2 className="text-4xl md:text-5xl font-bold">Perguntas frequentes</h2>
      </div>
      <div className="space-y-3">
        {items.map(([q, a]) => (
          <details key={q} className="group rounded-xl border border-border bg-card/50 overflow-hidden">
            <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer hover:bg-card transition list-none">
              <span className="font-medium">{q}</span>
              <span className="text-primary text-xl group-open:rotate-45 transition">+</span>
            </summary>
            <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
