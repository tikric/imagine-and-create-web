import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { modules } from "@/data/modules";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { LessonBlock } from "@/components/LessonBlock";

export const Route = createFileRoute("/curso/$moduleId/$lessonId")({
  head: ({ params }) => {
    const m = modules.find((x) => x.id === params.moduleId);
    const l = m?.lessons.find((x) => x.id === params.lessonId);
    if (!m || !l) return { meta: [{ title: "Aula não encontrada" }] };
    return {
      meta: [
        { title: `Aula ${l.number}: ${l.title} | Módulo ${m.number}` },
        { name: "description", content: `${l.title} — ${l.duration}.` },
      ],
    };
  },
  loader: ({ params }) => {
    const m = modules.find((x) => x.id === params.moduleId);
    if (!m) throw notFound();
    const li = m.lessons.findIndex((x) => x.id === params.lessonId);
    if (li < 0) throw notFound();
    return {
      module: m,
      lesson: m.lessons[li],
      prev: m.lessons[li - 1] ?? null,
      next: m.lessons[li + 1] ?? null,
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl font-bold">Aula não encontrada</h1>
        <Link to="/curso" className="mt-6 inline-block text-primary hover:underline">Voltar para a grade →</Link>
      </div>
    </div>
  ),
  component: LessonPage,
});

function LessonPage() {
  const { module: m, lesson, prev, next } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <Link to="/curso/$moduleId" params={{ moduleId: m.id }} className="mono text-xs uppercase text-muted-foreground hover:text-primary transition">
            ← Módulo {m.number}: {m.title}
          </Link>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-6 py-12">
        <LessonBlock l={lesson} isFirst />
      </article>

      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-10 grid grid-cols-2 gap-4">
          {prev ? (
            <Link to="/curso/$moduleId/$lessonId" params={{ moduleId: m.id, lessonId: prev.id }} className="group rounded-xl border border-border p-6 hover:border-primary/40 hover:bg-card transition">
              <div className="mono text-xs text-muted-foreground mb-1">← Aula {prev.number}</div>
              <div className="font-medium group-hover:text-primary transition">{prev.title}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to="/curso/$moduleId/$lessonId" params={{ moduleId: m.id, lessonId: next.id }} className="group rounded-xl border border-border p-6 hover:border-primary/40 hover:bg-card transition text-right">
              <div className="mono text-xs text-muted-foreground mb-1">Aula {next.number} →</div>
              <div className="font-medium group-hover:text-primary transition">{next.title}</div>
            </Link>
          ) : <div />}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
