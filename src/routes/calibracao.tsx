import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";

export const Route = createFileRoute("/calibracao")({
  head: () => ({
    meta: [
      { title: "Checkpoint de Calibração — OrcaSlicer MASTERCLASS" },
      { name: "description", content: "Calculadora interativa do protocolo de 8 passos: temperatura, MVS, E-Steps, flow, pressure advance, retração e compensações." },
    ],
  }),
  component: CalibracaoPage,
});

type State = Record<string, string>;
const STORAGE_KEY = "orca-calibracao-v1";

function useLocalState(initial: State) {
  const [state, setState] = useState<State>(initial);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);
  const set = (k: string, v: string) => setState((s) => ({ ...s, [k]: v }));
  const reset = () => { setState(initial); try { localStorage.removeItem(STORAGE_KEY); } catch {} };
  return { state, set, reset };
}

function CalibracaoPage() {
  const { state, set, reset } = useLocalState({
    filamento: "PLA",
    data: "",
    temp_primeira: "210",
    temp_outras: "205",
    mvs_medida: "18",
    estep_atual: "93.5",
    estep_extrudado: "100",
    flow_ratio: "1.00",
    pa: "0.045",
    retr_len: "0.8",
    retr_speed: "40",
    cubo_real: "99.5",
    xy_comp: "0.05",
  });

  const mvsSegura = useMemo(() => {
    const v = parseFloat(state.mvs_medida);
    return isFinite(v) ? (v * 0.85).toFixed(2) : "—";
  }, [state.mvs_medida]);

  const novoEstep = useMemo(() => {
    const atual = parseFloat(state.estep_atual);
    const extr = parseFloat(state.estep_extrudado);
    if (!isFinite(atual) || !isFinite(extr) || extr === 0) return "—";
    return ((100 / extr) * atual).toFixed(3);
  }, [state.estep_atual, state.estep_extrudado]);

  const shrinkage = useMemo(() => {
    const real = parseFloat(state.cubo_real);
    if (!isFinite(real) || real === 0) return "—";
    return ((100 / real) * 100).toFixed(2);
  }, [state.cubo_real]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-24">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs mono uppercase tracking-wider text-primary mb-4">
            checkpoint · protocolo de 8 passos
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Checkpoint de Calibração</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Registre cada valor da calibração da sua impressora. Os cálculos (MVS segura, E-Steps, Shrinkage) são automáticos. Tudo é salvo no seu navegador.
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/curso" className="text-sm text-primary hover:underline">← voltar aos módulos</Link>
            <button onClick={reset} className="ml-auto text-xs text-muted-foreground hover:text-foreground border border-border rounded px-3 py-1.5">Limpar valores</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Field label="Filamento" value={state.filamento} onChange={(v) => set("filamento", v)} placeholder="PLA / PETG / ABS..." />
          <Field label="Data da calibração" type="date" value={state.data} onChange={(v) => set("data", v)} />
        </div>

        <Step n={1} title="Nivelamento da mesa" hint="Z-Offset é salvo no firmware, não no OrcaSlicer.">
          <Checklist items={["Mesa nivelada (papel com leve arrasto)", "ABL (G29) ativado", "Primeira camada uniforme sem lacunas"]} prefix="p1" state={state} set={set} />
        </Step>

        <Step n={2} title="PID Tuning" hint="M303 E0 S200 C8 (bico) · M303 E1 S60 C8 (mesa) · M500 para salvar.">
          <Checklist items={["PID do bico calibrado (oscilação < ±0.5°C)", "PID da mesa calibrado", "Salvo no firmware (M500 / SAVE_CONFIG)"]} prefix="p2" state={state} set={set} />
        </Step>

        <Step n={3} title="Temperatura" hint="Use a torre de temperatura. OrcaSlicer > Filamento > Temperatura do bico.">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primeira camada (°C)" value={state.temp_primeira} onChange={(v) => set("temp_primeira", v)} />
            <Field label="Outras camadas (°C)" value={state.temp_outras} onChange={(v) => set("temp_outras", v)} />
          </div>
        </Step>

        <Step n={4} title="MVS — Velocidade Volumétrica Máxima" hint="filament_max_volumetric_speed. Segura = medida × 0.85.">
          <div className="grid grid-cols-2 gap-4">
            <Field label="MVS medida (mm³/s)" value={state.mvs_medida} onChange={(v) => set("mvs_medida", v)} />
            <Result label="MVS segura (mm³/s)" value={mvsSegura} />
          </div>
        </Step>

        <Step n={5} title="E-Steps" hint="Extruda 100mm, mede o que sobra. Novo_E = (100 / extrudado) × E_atual. Salva no firmware.">
          <div className="grid grid-cols-2 gap-4">
            <Field label="E-Steps atual" value={state.estep_atual} onChange={(v) => set("estep_atual", v)} />
            <Field label="Distância extrudada real (mm)" value={state.estep_extrudado} onChange={(v) => set("estep_extrudado", v)} />
          </div>
          <Result label="Novo E-Steps (M92 E...)" value={novoEstep} />
        </Step>

        <Step n={6} title="Flow Rate" hint="OrcaSlicer > Filamento > Flow Ratio. Típico PLA 0.95–1.00.">
          <Field label="Flow Ratio final" value={state.flow_ratio} onChange={(v) => set("flow_ratio", v)} />
        </Step>

        <Step n={7} title="Pressure Advance" hint="OrcaSlicer > Filamento > Pressure Advance. Direct: 0.02–0.15 · Bowden: 0.3–1.2.">
          <Field label="Pressure Advance" value={state.pa} onChange={(v) => set("pa", v)} />
        </Step>

        <Step n={8} title="Retração" hint="OrcaSlicer > Impressora > Extrusor > Retraction Length / Speed.">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Comprimento (mm)" value={state.retr_len} onChange={(v) => set("retr_len", v)} />
            <Field label="Velocidade (mm/s)" value={state.retr_speed} onChange={(v) => set("retr_speed", v)} />
          </div>
        </Step>

        <Step n={9} title="Extra · Compensação de Contração (Shrinkage)" hint="Imprime cubo de 100mm. Compensação = (100 / real) × 100.">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Medida real do cubo (mm)" value={state.cubo_real} onChange={(v) => set("cubo_real", v)} />
            <Result label="Shrinkage Compensation (%)" value={shrinkage} />
          </div>
        </Step>

        <Step n={10} title="Extra · Compensação XY" hint="OrcaSlicer > Qualidade > Precisão > Compensação de contornos XY.">
          <Field label="XY Size Compensation (mm)" value={state.xy_comp} onChange={(v) => set("xy_comp", v)} />
        </Step>

        <div className="mt-12 rounded-xl border border-border bg-card/40 p-6">
          <h2 className="text-lg font-semibold mb-4">Resumo para o perfil do OrcaSlicer</h2>
          <ul className="mono text-sm space-y-2 text-muted-foreground">
            <li>Filamento: <span className="text-foreground">{state.filamento || "—"}</span></li>
            <li>Temperatura: <span className="text-foreground">{state.temp_primeira}°C / {state.temp_outras}°C</span></li>
            <li>MVS segura: <span className="text-foreground">{mvsSegura} mm³/s</span></li>
            <li>Novo E-Steps: <span className="text-foreground">{novoEstep}</span></li>
            <li>Flow Ratio: <span className="text-foreground">{state.flow_ratio}</span></li>
            <li>Pressure Advance: <span className="text-foreground">{state.pa}</span></li>
            <li>Retração: <span className="text-foreground">{state.retr_len} mm @ {state.retr_speed} mm/s</span></li>
            <li>Shrinkage: <span className="text-foreground">{shrinkage}%</span></li>
            <li>XY Compensation: <span className="text-foreground">{state.xy_comp} mm</span></li>
          </ul>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Step({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-xl border border-border bg-card/30 p-6">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="mono text-xs text-primary">PASSO {String(n).padStart(2, "0")}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {hint && <p className="text-xs text-muted-foreground mb-4">{hint}</p>}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-xs text-muted-foreground mb-1.5">{label}</span>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary" />
    </label>
  );
}

function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2">
      <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
      <div className="mono text-lg text-primary font-semibold">{value}</div>
    </div>
  );
}

function Checklist({ items, prefix, state, set }: { items: string[]; prefix: string; state: State; set: (k: string, v: string) => void }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => {
        const k = `${prefix}_${i}`;
        const checked = state[k] === "1";
        return (
          <li key={k}>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={checked} onChange={(e) => set(k, e.target.checked ? "1" : "")} className="accent-primary" />
              <span className={checked ? "line-through text-muted-foreground" : ""}>{it}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
