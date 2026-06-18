import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { modules } from "@/data/modules";
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
  const { module: m, lesson: l, prev, next } = Route.useLoaderData();
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
          {l.topics.map((t) => (
            <span key={t} className="text-xs rounded-md border border-border bg-card/60 px-2.5 py-1 text-muted-foreground">{t}</span>
          ))}
        </div>

        {l.theory && l.theory.length > 0 && (
          <Section title="Conteúdo Teórico">
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              {l.theory.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Section>
        )}

        {l.integrations && l.integrations.length > 0 && (
          <Section title="Integrações Teóricas">
            <div className="space-y-3">
              {l.integrations.map((it, i) => (
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
                  {l.params.map((p, i) => (
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
                  {l.errors.map((e, i) => (
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
              {l.exercise.map((step, i) => (
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
