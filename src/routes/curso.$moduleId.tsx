import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { modules, type Lesson } from "@/data/modules";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { LessonBlock } from "@/components/LessonBlock";

const SPLIT_MODULES = new Set(["mestre-orcaslicer"]);

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
  const isSplit = SPLIT_MODULES.has(m.id);

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

      <section className="mx-auto max-w-5xl px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card/50 p-8">
          <div className="mono text-xs uppercase tracking-wider text-primary mb-3">Metodologia</div>
          <p className="leading-relaxed">{m.methodology}</p>
        </div>
        <div className="rounded-2xl border border-primary/40 bg-primary/5 p-8">
          <div className="mono text-xs uppercase tracking-wider text-primary mb-3">Objetivo</div>
          <p className="leading-relaxed">{m.objective}</p>
        </div>
      </section>

      {isSplit ? (
        <section className="mx-auto max-w-5xl px-6 pb-16">
          <div className="rounded-2xl border border-border bg-card/40 p-6">
            <div className="mono text-xs uppercase tracking-wider text-primary mb-4">Aulas — {m.lessons.length}</div>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {m.lessons.map((l: Lesson) => (
                <li key={l.id}>
                  <Link
                    to="/curso/$moduleId/$lessonId"
                    params={{ moduleId: m.id, lessonId: l.id }}
                    className="flex items-baseline gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 hover:border-primary/40 hover:bg-card transition"
                  >
                    <span className="mono text-primary text-sm">{String(l.number).padStart(2, "0")}</span>
                    <span className="font-medium hover:text-primary transition">{l.title}</span>
                    <span className="ml-auto mono text-xs text-muted-foreground shrink-0">{l.duration}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : (
        <>
          <section className="mx-auto max-w-5xl px-6 pb-8">
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <div className="mono text-xs uppercase tracking-wider text-primary mb-4">Índice — {m.lessons.length} aulas</div>
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {m.lessons.map((l: Lesson) => (
                  <li key={l.id}>
                    <a href={`#${l.id}`} className="flex items-baseline gap-3 rounded-lg px-3 py-2 hover:bg-card transition">
                      <span className="mono text-primary text-sm">{String(l.number).padStart(2, "0")}</span>
                      <span className="font-medium hover:text-primary transition">{l.title}</span>
                      <span className="ml-auto mono text-xs text-muted-foreground shrink-0">{l.duration}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <article className="mx-auto max-w-4xl px-6 py-8">
            {m.lessons.map((l: Lesson, li: number) => (
              <LessonBlock key={l.id} l={l} isFirst={li === 0} withDivider />
            ))}
          </article>
        </>
      )}

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
