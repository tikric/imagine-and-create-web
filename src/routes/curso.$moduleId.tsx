import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { modules } from "@/data/modules";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/curso/$moduleId")({
  head: ({ params }) => {
    const m = modules.find((x) => x.id === params.moduleId);
    if (!m) return { meta: [{ title: "Módulo não encontrado" }] };
    return {
      meta: [
        { title: `Módulo ${m.number}: ${m.title} | OrcaSlicer MASTERCLASS` },
        { name: "description", content: `${m.tagline}. ${m.lessons.length} aulas · ${m.duration}.` },
        { property: "og:title", content: `Módulo ${m.number}: ${m.title}` },
        { property: "og:description", content: m.objective },
      ],
    };
  },
  loader: ({ params }) => {
    const m = modules.find((x) => x.id === params.moduleId);
    if (!m) throw notFound();
    const idx = modules.indexOf(m);
    return { module: m, prev: modules[idx - 1] ?? null, next: modules[idx + 1] ?? null };
  },
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl font-bold">Módulo não encontrado</h1>
        <Link to="/curso" className="mt-6 inline-block text-primary hover:underline">Voltar para a grade →</Link>
      </div>
    </div>
  ),
  component: ModulePage,
});

function ModulePage() {
  const { module: m, prev, next } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <Link to="/curso" className="mono text-xs uppercase text-muted-foreground hover:text-primary transition">
            ← Grade curricular
          </Link>
          <div className="mt-8 flex items-center gap-3 flex-wrap mb-4">
            <span className="mono text-primary">MÓDULO {String(m.number).padStart(2, "0")}</span>
            <span className="text-muted-foreground">·</span>
            <span className="mono text-xs uppercase tracking-wider text-muted-foreground">{m.level}</span>
            <span className="text-muted-foreground">·</span>
            <span className="mono text-xs text-muted-foreground">{m.lessons.length} aulas · {m.duration}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-balance">{m.title}</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl">{m.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card/50 p-8">
          <div className="mono text-xs uppercase tracking-wider text-primary mb-3">Metodologia</div>
          <p className="leading-relaxed">{m.methodology}</p>
        </div>
        <div className="rounded-2xl border border-primary/40 bg-primary/5 p-8">
          <div className="mono text-xs uppercase tracking-wider text-primary mb-3">Objetivo</div>
          <p className="leading-relaxed">{m.objective}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Aulas</h2>
          <span className="mono text-xs text-muted-foreground">{m.lessons.length} unidades</span>
        </div>

        <ol className="space-y-3">
          {m.lessons.map((l, i) => (
            <li key={i} className="group rounded-xl border border-border bg-card/40 hover:bg-card hover:border-primary/40 transition p-6">
              <div className="flex items-start gap-6">
                <div className="mono text-primary text-lg shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3">
                    <h3 className="text-lg md:text-xl font-semibold group-hover:text-primary transition">{l.title}</h3>
                    <span className="mono text-xs text-muted-foreground shrink-0">{l.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {l.topics.map((t) => (
                      <span key={t} className="text-xs rounded-md border border-border bg-background/60 px-2.5 py-1 text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-10 grid grid-cols-2 gap-4">
          {prev ? (
            <Link to="/curso/$moduleId" params={{ moduleId: prev.id }} className="group rounded-xl border border-border p-6 hover:border-primary/40 hover:bg-card transition">
              <div className="mono text-xs text-muted-foreground mb-1">← Módulo {prev.number}</div>
              <div className="font-medium group-hover:text-primary transition">{prev.title}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to="/curso/$moduleId" params={{ moduleId: next.id }} className="group rounded-xl border border-border p-6 hover:border-primary/40 hover:bg-card transition text-right">
              <div className="mono text-xs text-muted-foreground mb-1">Módulo {next.number} →</div>
              <div className="font-medium group-hover:text-primary transition">{next.title}</div>
            </Link>
          ) : <div />}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
