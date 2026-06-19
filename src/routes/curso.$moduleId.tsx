import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { modules, type Lesson, type ParamRow, type Integration, type ErrorItem } from "@/data/modules";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import tela11 from "@/assets/orca/tela_11.png.asset.json";
import tela12 from "@/assets/orca/tela_12.png.asset.json";
import tela13 from "@/assets/orca/tela_13.png.asset.json";
import tela14 from "@/assets/orca/tela_14.png.asset.json";
import tela21 from "@/assets/orca/tela_21.png.asset.json";
import tela22 from "@/assets/orca/tela_22.png.asset.json";
import tela23 from "@/assets/orca/tela_23.png.asset.json";
import tela31 from "@/assets/orca/tela_31.png.asset.json";
import tela32 from "@/assets/orca/tela_32.png.asset.json";
import tela33 from "@/assets/orca/tela_33.png.asset.json";
import tela41 from "@/assets/orca/tela_41.png.asset.json";
import tela42 from "@/assets/orca/tela_42.png.asset.json";
import tela43 from "@/assets/orca/tela_43.png.asset.json";
import tela51 from "@/assets/orca/tela_51.png.asset.json";
import tela52 from "@/assets/orca/tela_52.png.asset.json";
import tela61 from "@/assets/orca/tela_61.png.asset.json";
import tela62 from "@/assets/orca/tela_62.png.asset.json";

const TELA_MAP: Record<string, { url: string }> = {
  tela_11: tela11, tela_12: tela12, tela_13: tela13, tela_14: tela14, tela_21: tela21,
  tela_22: tela22, tela_23: tela23, tela_31: tela31, tela_32: tela32, tela_33: tela33,
  tela_41: tela41, tela_42: tela42, tela_43: tela43, tela_51: tela51, tela_52: tela52,
  tela_61: tela61, tela_62: tela62,
};

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

      {/* Índice das aulas */}
      <section className="mx-auto max-w-5xl px-6 pb-8">
        <div className="rounded-2xl border border-border bg-card/40 p-6">
          <div className="mono text-xs uppercase tracking-wider text-primary mb-4">Índice — {m.lessons.length} aulas</div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {m.lessons.map((l) => (
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

      {/* Conteúdo de todas as aulas */}
      <article className="mx-auto max-w-4xl px-6 py-8">
        {m.lessons.map((l, li) => (
          <LessonBlock key={l.id} l={l} isFirst={li === 0} />
        ))}
      </article>

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

function LessonBlock({ l, isFirst }: { l: Lesson; isFirst: boolean }) {
  return (
    <section id={l.id} className={`scroll-mt-24 ${isFirst ? "" : "mt-20 pt-16 border-t border-border"}`}>
      <div className="flex items-center gap-3 flex-wrap mb-4 mono text-xs">
        <span className="text-primary">AULA {String(l.number).padStart(2, "0")}</span>
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">{l.duration}</span>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-balance">{l.title}</h2>

      <div className="mt-6 flex flex-wrap gap-2">
        {l.topics.map((t: string) => (
          <span key={t} className="text-xs rounded-md border border-border bg-card/60 px-2.5 py-1 text-muted-foreground">{t}</span>
        ))}
      </div>

      {l.screens && l.screens.length > 0 && (
        <Section title="Tela do OrcaSlicer — Ferramenta em destaque">
          <div className="space-y-6">
            {l.screens.map((s, i) => (
              <figure key={i} className="rounded-2xl border border-primary/30 bg-card/40 overflow-hidden">
                <div className="border-b border-border bg-card/60 px-5 py-3">
                  <div className="mono text-xs uppercase tracking-wider text-primary">{s.tela}</div>
                  <div className="text-sm font-semibold mt-1">{s.panel}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.tool}</div>
                </div>
                <img
                  src={TELA_MAP[s.src]?.url}
                  alt={`${s.tela} — ${s.panel}`}
                  loading="lazy"
                  className="w-full h-auto block bg-[#1e1e1e]"
                />
                <figcaption className="px-5 py-3 text-sm text-foreground/80 border-t border-border bg-card/30">
                  {s.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      {l.paramDetails && l.paramDetails.length > 0 && (
        <Section title="Cada item da tela, explicado">
          <div className="space-y-5">
            {l.paramDetails.map((p, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card/40 p-6">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-4 pb-3 border-b border-border">
                  <div>
                    <div className="mono text-xs uppercase tracking-wider text-muted-foreground">Item {String(i + 1).padStart(2, "0")}</div>
                    <div className="text-lg font-bold mt-0.5">{p.name}</div>
                  </div>
                  <div className="mono text-sm text-primary bg-primary/10 px-3 py-1.5 rounded-md border border-primary/30">
                    {p.value}
                  </div>
                </div>
                <div className="grid gap-5">
                  <div>
                    <div className="mono text-xs uppercase tracking-wider text-primary mb-1">▸ O que é</div>
                    <p className="text-foreground/90 leading-relaxed">{p.whatIs}</p>
                  </div>
                  {p.whyAdjust && (
                    <div>
                      <div className="mono text-xs uppercase tracking-wider text-chart-3 mb-1">▸ Por que ajustar</div>
                      <p className="text-foreground/90 leading-relaxed">{p.whyAdjust}</p>
                    </div>
                  )}
                  {p.types && p.types.length > 0 && (
                    <div>
                      <div className="mono text-xs uppercase tracking-wider text-primary mb-2">▸ Tipos / Opções disponíveis</div>
                      <ul className="space-y-1.5">
                        {p.types.map((t, ti) => (
                          <li key={ti} className="text-foreground/90 leading-relaxed">
                            <span className="font-semibold text-primary">{t.label}:</span> {t.desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {p.optionsTable && (
                    <MiniTable label="▸ Tabela de opções" color="primary" data={p.optionsTable} />
                  )}
                  <div>
                    <div className="mono text-xs uppercase tracking-wider text-primary mb-1">▸ O que influencia</div>
                    <p className="text-foreground/90 leading-relaxed">{p.influences}</p>
                    {p.influencesList && p.influencesList.length > 0 && (
                      <ul className="mt-2 space-y-1 list-disc pl-5 text-foreground/90">
                        {p.influencesList.map((it, ii) => <li key={ii}>{it}</li>)}
                      </ul>
                    )}
                  </div>
                  <div>
                    <div className="mono text-xs uppercase tracking-wider text-primary mb-1">▸ O que gera (consequência prática)</div>
                    <p className="text-foreground/90 leading-relaxed">{p.generates}</p>
                  </div>
                  {p.generatesTable && (
                    <MiniTable label="▸ Consequências práticas" color="primary" data={p.generatesTable} />
                  )}
                  {p.integrationsTable && (
                    <MiniTable label="▸ Integração com outros parâmetros" color="chart-3" data={p.integrationsTable} />
                  )}
                  {p.howTo && p.howTo.length > 0 && (
                    <div>
                      <div className="mono text-xs uppercase tracking-wider text-chart-3 mb-2">▸ Como configurar no OrcaSlicer</div>
                      <ol className="space-y-2">
                        {p.howTo.map((h, hi) => (
                          <li key={hi} className="rounded-lg border border-border bg-card/50 p-3">
                            <div className="font-semibold">{h.step}</div>
                            <div className="mono text-xs text-primary mt-0.5">{h.path}</div>
                            <div className="text-sm text-foreground/80 mt-1">{h.desc}</div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {p.example && (
                    <div className="rounded-xl border border-chart-3/40 bg-chart-3/5 p-4">
                      <div className="mono text-xs uppercase tracking-wider text-chart-3 mb-2">▸ Exemplo prático</div>
                      <div className="grid gap-1.5 text-sm">
                        <div><span className="font-semibold">Peça:</span> {p.example.piece}</div>
                        <div><span className="font-semibold">Configuração:</span> {p.example.config}</div>
                        <div><span className="font-semibold">Resultado:</span> {p.example.result}</div>
                      </div>
                    </div>
                  )}
                  {p.errorsTable && (
                    <MiniTable label="▸ Erros comuns e soluções" color="destructive" data={p.errorsTable} />
                  )}
                  {p.goldenRule && (
                    <div className="rounded-xl border border-primary/50 bg-gradient-to-br from-primary/10 to-transparent p-4">
                      <div className="mono text-xs uppercase tracking-wider text-primary mb-1">★ Regra de ouro</div>
                      <p className="font-semibold text-foreground">"{p.goldenRule}"</p>
                    </div>
                  )}
                  {p.summaryTable && (
                    <MiniTable label={`▸ ${p.summaryTable.title ?? "Tabela resumo"}`} color="primary" data={p.summaryTable} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

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
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h3 className="text-2xl font-bold mb-5">{title}</h3>
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

function MiniTable({
  label,
  color,
  data,
}: {
  label: string;
  color: "primary" | "chart-3" | "destructive";
  data: { headers: string[]; rows: string[][] };
}) {
  const colorClass =
    color === "destructive"
      ? "text-destructive border-destructive/40"
      : color === "chart-3"
        ? "text-chart-3 border-chart-3/40"
        : "text-primary border-primary/40";
  return (
    <div>
      <div className={`mono text-xs uppercase tracking-wider mb-2 ${colorClass.split(" ")[0]}`}>{label}</div>
      <div className={`overflow-x-auto rounded-xl border ${colorClass.split(" ")[1]}`}>
        <table className="w-full text-sm">
          <thead className="bg-card/60">
            <tr className="text-left mono text-xs uppercase tracking-wider text-muted-foreground">
              {data.headers.map((h, i) => (
                <th key={i} className="px-4 py-2.5 border-b border-border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <tr key={ri} className="hover:bg-card/40 transition">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2.5 border-b border-border align-top text-foreground/90">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
