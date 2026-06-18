import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { modules, type Lesson, type Module, type ParamRow, type Integration, type ErrorItem } from "@/data/modules";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/curso/$moduleId/$lessonId")({
  head: ({ params }) => {
    const m = modules.find((x) => x.id === params.moduleId);
    const l = m?.lessons.find((x) => x.id === params.lessonId);
    if (!m || !l) return { meta: [{ title: "Aula não encontrada" }] };
    return {
      meta: [
        { title: `${l.title} — Módulo ${m.number} | OrcaSlicer MASTERCLASS` },
        { name: "description", content: `Aula ${l.number} do Módulo ${m.number}: ${m.title}. Duração ${l.duration}.` },
        { property: "og:title", content: `${l.title} — Aula ${l.number}` },
        { property: "og:description", content: l.theory?.[0] ?? `${m.tagline}` },
      ],
    };
  },
  loader: ({ params }) => {
    const m = modules.find((x) => x.id === params.moduleId);
    if (!m) throw notFound();
    const l = m.lessons.find((x) => x.id === params.lessonId);
    if (!l) throw notFound();
    const idx = m.lessons.indexOf(l);
    return {
      module: m,
      lesson: l,
      prev: m.lessons[idx - 1] ?? null,
      next: m.lessons[idx + 1] ?? null,
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
  const { module: m, lesson: l, prev, next } = Route.useLoaderData() as { module: Module; lesson: Lesson; prev: Lesson | null; next: Lesson | null };
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <article className="mx-auto max-w-4xl px-6 py-16">
        <Link
          to="/curso/$moduleId"
          params={{ moduleId: m.id }}
          className="mono text-xs uppercase text-muted-foreground hover:text-primary transition"
        >
          ← Módulo {String(m.number).padStart(2, "0")} · {m.title}
        </Link>

        <div className="mt-8 flex items-center gap-3 flex-wrap mb-4 mono text-xs">
          <span className="text-primary">AULA {String(l.number).padStart(2, "0")}</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-muted-foreground">{l.duration}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-balance">{l.title}</h1>

        <div className="mt-6 flex flex-wrap gap-2">
          {l.topics.map((t: string) => (
            <span key={t} className="text-xs rounded-md border border-border bg-card/60 px-2.5 py-1 text-muted-foreground">{t}</span>
          ))}
        </div>

        {l.theory && l.theory.length > 0 && (
          <Section title="Conteúdo Teórico">
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              {l.theory.map((p: string, i: number) => <p key={i}>{p}</p>)}
            </div>
          </Section>
        )}

        {l.deepDive && l.deepDive.length > 0 && (
          <Section title="Aprofundamento Técnico">
            <div className="space-y-5 text-base leading-relaxed text-foreground/90 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6 md:p-8">
              <div className="mono text-xs uppercase tracking-wider text-primary">▼ Deep Dive</div>
              {l.deepDive.map((p: string, i: number) => <p key={i}>{p}</p>)}
            </div>
          </Section>
        )}

        {l.caseStudy && (
          <Section title="Estudo de Caso">
            <div className="rounded-2xl border border-chart-3/40 bg-chart-3/5 p-6 md:p-8">
              <div className="mono text-xs uppercase tracking-wider text-chart-3 mb-3">◆ Caso real</div>
              <p className="text-foreground/90 leading-relaxed">{l.caseStudy}</p>
            </div>
          </Section>
        )}

        {l.checklist && l.checklist.length > 0 && (
          <Section title="Checklist Operacional">
            <ul className="space-y-2 rounded-xl border border-border bg-card/40 p-5">
              {l.checklist.map((c: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mono text-primary mt-0.5">☐</span>
                  <span className="text-foreground/90">{c}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {l.integrations && l.integrations.length > 0 && (
          <Section title="Integrações Teóricas">
            <div className="space-y-3">
              {l.integrations.map((it: Integration, i: number) => (
                <div key={i} className="rounded-xl border-l-4 border-primary bg-card/50 p-5">
                  <div className="mono text-xs text-primary mb-1">{it.module}</div>
                  <div className="text-foreground/90">{it.text}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {(l.economy || l.finance) && (
          <Section title="Economia & Dicas Financeiras">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {l.economy && (
                <Callout label="Economia do Mestre FDM" icon="◇">
                  {l.economy}
                </Callout>
              )}
              {l.finance && (
                <Callout label="Dica Financeira" icon="$">
                  {l.finance}
                </Callout>
              )}
            </div>
          </Section>
        )}

        {l.params && l.params.length > 0 && (
          <Section title="Tabela de Parâmetros">
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-card">
                  <tr className="text-left mono text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3 border-b border-border">Parâmetro</th>
                    <th className="px-5 py-3 border-b border-border">Valor</th>
                    <th className="px-5 py-3 border-b border-border">Ação Técnica</th>
                  </tr>
                </thead>
                <tbody>
                  {l.params.map((p: ParamRow, i: number) => (
                    <tr key={i} className="hover:bg-card/40 transition">
                      <td className="px-5 py-3 border-b border-border font-medium">{p.param}</td>
                      <td className="px-5 py-3 border-b border-border mono text-primary">{p.value}</td>
                      <td className="px-5 py-3 border-b border-border text-muted-foreground">{p.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {l.goldenRule && (
          <Section title="Regra de Ouro">
            <div className="rounded-2xl border border-primary/50 bg-gradient-to-br from-primary/10 to-transparent p-8 glow-orca">
              <div className="mono text-xs uppercase tracking-wider text-primary mb-3">★ Regra de Ouro</div>
              <p className="text-xl font-semibold leading-relaxed text-balance">"{l.goldenRule}"</p>
            </div>
          </Section>
        )}

        {l.errors && l.errors.length > 0 && (
          <Section title="Lista de Erros Comuns & Solução Imediata">
            <div className="overflow-x-auto rounded-xl border border-destructive/30">
              <table className="w-full text-sm">
                <thead className="bg-destructive/10">
                  <tr className="text-left mono text-xs uppercase tracking-wider text-destructive">
                    <th className="px-5 py-3 border-b border-border">Erro Comum</th>
                    <th className="px-5 py-3 border-b border-border">Solução Imediata</th>
                  </tr>
                </thead>
                <tbody>
                  {l.errors.map((e: ErrorItem, i: number) => (
                    <tr key={i}>
                      <td className="px-5 py-3 border-b border-border">{e.error}</td>
                      <td className="px-5 py-3 border-b border-border text-primary">{e.solution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {l.exercise && l.exercise.length > 0 && (
          <Section title="Exercício Prático Autônomo">
            <ol className="space-y-3">
              {l.exercise.map((step: string, i: number) => (
                <li key={i} className="flex items-start gap-4 rounded-xl border border-border bg-card/40 p-5">
                  <span className="mono text-primary shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}
      </article>

      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-10 grid grid-cols-2 gap-4">
          {prev ? (
            <Link to="/curso/$moduleId/$lessonId" params={{ moduleId: m.id, lessonId: prev.id }} className="group rounded-xl border border-border p-5 hover:border-primary/40 hover:bg-card transition">
              <div className="mono text-xs text-muted-foreground mb-1">← Aula {prev.number}</div>
              <div className="font-medium group-hover:text-primary transition text-sm">{prev.title}</div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to="/curso/$moduleId/$lessonId" params={{ moduleId: m.id, lessonId: next.id }} className="group rounded-xl border border-border p-5 hover:border-primary/40 hover:bg-card transition text-right">
              <div className="mono text-xs text-muted-foreground mb-1">Aula {next.number} →</div>
              <div className="font-medium group-hover:text-primary transition text-sm">{next.title}</div>
            </Link>
          ) : <div />}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-5">{title}</h2>
      {children}
    </section>
  );
}

function Callout({ label, icon, children }: { label: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card/60 p-5">
      <div className="flex items-center gap-2 mono text-xs uppercase tracking-wider text-primary mb-2">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <p className="text-foreground/90 leading-relaxed">{children}</p>
    </div>
  );
}
