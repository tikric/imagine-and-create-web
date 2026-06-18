import { createFileRoute, Link } from "@tanstack/react-router";
import { modules, courseStats } from "@/data/modules";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/curso/")({
  head: () => ({
    meta: [
      { title: "Grade Curricular — 24 Módulos | OrcaSlicer MASTERCLASS" },
      { name: "description", content: "Grade completa: 24 módulos do OrcaSlicer, da interface aos perfis comerciais. Calibração científica, materiais, suportes, multi-material, troubleshooting e mais." },
      { property: "og:title", content: "Grade Curricular — 24 Módulos" },
      { property: "og:description", content: "Os 24 módulos do curso, do iniciante ao profissional." },
    ],
  }),
  component: CursoIndex,
});

const LEVEL_COLORS: Record<string, string> = {
  "Iniciante": "text-chart-4 border-chart-4/30 bg-chart-4/5",
  "Intermediário": "text-chart-2 border-chart-2/30 bg-chart-2/5",
  "Avançado": "text-primary border-primary/30 bg-primary/5",
  "Profissional": "text-chart-3 border-chart-3/30 bg-chart-3/5",
};

function CursoIndex() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="mono text-xs uppercase tracking-wider text-primary mb-4">Grade curricular</div>
        <h1 className="text-5xl md:text-6xl font-bold text-balance max-w-4xl">
          24 módulos. {courseStats.lessons}+ aulas.<br />
          <span className="text-primary">Zero achismo.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Da primeira impressão à fazenda de 10 máquinas. Cada módulo combina teoria com walkthrough prático no OrcaSlicer.
        </p>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
          {(["Iniciante", "Intermediário", "Avançado", "Profissional"] as const).map((lvl) => {
            const count = modules.filter((m) => m.level === lvl).length;
            return (
              <div key={lvl} className={`rounded-lg border px-4 py-3 ${LEVEL_COLORS[lvl]}`}>
                <div className="mono text-xs uppercase">{lvl}</div>
                <div className="text-2xl font-bold mt-1">{count} módulos</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="space-y-3">
          {modules.map((m) => {
            const highlights = Array.from(
              new Set(m.lessons.flatMap((l) => l.topics)),
            ).slice(0, 6);
            const goldenRule = m.lessons.find((l) => l.goldenRule)?.goldenRule;
            return (
              <Link
                key={m.id}
                to="/curso/$moduleId"
                params={{ moduleId: m.id }}
                className="group block rounded-2xl border border-border bg-card/40 hover:bg-card hover:border-primary/40 transition p-6 md:p-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 items-start">
                  <div className="mono text-primary text-lg md:text-xl pt-1">
                    /{String(m.number).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className={`mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${LEVEL_COLORS[m.level]}`}>
                        {m.level}
                      </span>
                      <span className="mono text-xs text-muted-foreground">{m.lessons.length} aulas · {m.duration}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold group-hover:text-primary transition">{m.title}</h3>
                    <p className="text-muted-foreground mt-1">{m.tagline}</p>

                    <p className="text-sm text-foreground/80 mt-4 leading-relaxed">
                      <span className="mono text-[10px] uppercase tracking-wider text-primary mr-2">Objetivo</span>
                      {m.objective}
                    </p>

                    {highlights.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {highlights.map((t) => (
                          <span
                            key={t}
                            className="mono text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-border bg-background/40 text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {goldenRule && (
                      <p className="mt-4 text-xs text-muted-foreground border-l-2 border-primary/50 pl-3 italic">
                        <span className="mono not-italic text-primary mr-1">Regra de ouro:</span>
                        {goldenRule}
                      </p>
                    )}
                  </div>
                  <div className="text-primary text-2xl opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition md:pt-1">→</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
