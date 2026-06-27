import { mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";
import { modules, type Lesson, type Module } from "../src/data/modules";

const OUT = "/mnt/documents/orca-curso-html";
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const css = `
*{box-sizing:border-box}body{font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:900px;margin:0 auto;padding:24px;line-height:1.55;color:#1a1a1a;background:#fafafa}
h1{font-size:28px;border-bottom:2px solid #333;padding-bottom:8px}
h2{font-size:22px;margin-top:32px;color:#0a4a8f}
h3{font-size:18px;margin-top:24px;color:#222}
h4{font-size:16px;margin-top:18px;color:#444}
.meta{color:#666;font-size:14px;margin-bottom:16px}
.tag{display:inline-block;background:#0a4a8f;color:#fff;padding:2px 8px;border-radius:4px;font-size:12px;margin-right:6px}
table{border-collapse:collapse;width:100%;margin:12px 0;font-size:14px;background:#fff}
th,td{border:1px solid #ddd;padding:8px;text-align:left;vertical-align:top}
th{background:#0a4a8f;color:#fff}
ul,ol{padding-left:22px}
.box{background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:14px;margin:12px 0}
.golden{background:#fff8e1;border-left:4px solid #f5b800;padding:12px;margin:14px 0;border-radius:4px}
.golden:before{content:"⭐ Regra de Ouro: ";font-weight:bold}
.error{background:#fdecea;border-left:4px solid #d93025;padding:10px;margin:8px 0;border-radius:4px}
.param{background:#f0f7ff;border:1px solid #cfe0f5;border-radius:6px;padding:14px;margin:16px 0}
nav a{display:block;padding:6px 0;color:#0a4a8f;text-decoration:none}
nav a:hover{text-decoration:underline}
.back{display:inline-block;margin-bottom:16px;color:#0a4a8f;text-decoration:none}
code{background:#eee;padding:1px 4px;border-radius:3px;font-size:13px}
`;

const layout = (title: string, body: string, back = "../index.html") => `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><style>${css}</style></head>
<body><a class="back" href="${back}">← Voltar</a>${body}</body></html>`;

const list = (arr?: string[]) =>
  arr && arr.length ? `<ul>${arr.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : "";

const table = (t?: { headers: string[]; rows: string[][]; title?: string }) => {
  if (!t) return "";
  return `${t.title ? `<h4>${esc(t.title)}</h4>` : ""}<table><thead><tr>${t.headers
    .map((h) => `<th>${esc(h)}</th>`)
    .join("")}</tr></thead><tbody>${t.rows
    .map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
};

function renderLesson(l: Lesson, m: Module): string {
  let h = `<div class="meta"><span class="tag">Módulo ${m.number}</span> ${esc(m.title)} • ${esc(l.duration)}</div>`;
  h += `<h1>Aula ${l.number}: ${esc(l.title)}</h1>`;

  if (l.topics?.length) {
    h += `<div class="box"><h3>Tópicos</h3>${list(l.topics)}</div>`;
  }
  if (l.theory?.length) h += `<h2>Teoria</h2>${list(l.theory)}`;
  if (l.deepDive?.length) h += `<h2>Aprofundamento</h2>${list(l.deepDive)}`;
  if (l.goldenRule) h += `<div class="golden">${esc(l.goldenRule)}</div>`;

  if (l.params?.length) {
    h += `<h2>Parâmetros</h2><table><thead><tr><th>Parâmetro</th><th>Valor</th><th>Ação</th></tr></thead><tbody>${l.params
      .map(
        (p) =>
          `<tr><td>${esc(p.param)}</td><td>${esc(p.value)}</td><td>${esc(p.action)}</td></tr>`,
      )
      .join("")}</tbody></table>`;
  }

  if (l.paramDetails?.length) {
    h += `<h2>Detalhamento</h2>`;
    for (const p of l.paramDetails) {
      h += `<div class="param"><h3>${esc(p.name)}${p.value ? ` — <code>${esc(p.value)}</code>` : ""}</h3>`;
      if (p.whatIs) h += `<p><b>O que é:</b> ${esc(p.whatIs)}</p>`;
      if (p.whyAdjust) h += `<p><b>Por que ajustar:</b> ${esc(p.whyAdjust)}</p>`;
      if (p.types?.length)
        h += `<h4>Tipos</h4><ul>${p.types.map((t) => `<li><b>${esc(t.label)}:</b> ${esc(t.desc)}</li>`).join("")}</ul>`;
      h += table(p.optionsTable);
      if (p.influences) h += `<p><b>Influencia:</b> ${esc(p.influences)}</p>`;
      if (p.influencesList?.length) h += list(p.influencesList);
      if (p.generates) h += `<p><b>Gera:</b> ${esc(p.generates)}</p>`;
      h += table(p.generatesTable);
      h += table(p.integrationsTable);
      if (p.howTo?.length)
        h += `<h4>Como fazer</h4><ol>${p.howTo
          .map((s) => `<li><b>${esc(s.step)}</b> — <code>${esc(s.path)}</code> — ${esc(s.desc)}</li>`)
          .join("")}</ol>`;
      if (p.example)
        h += `<div class="box"><b>Exemplo — ${esc(p.example.piece)}</b><br>Config: ${esc(p.example.config)}<br>Resultado: ${esc(p.example.result)}</div>`;
      h += table(p.errorsTable);
      if (p.goldenRule) h += `<div class="golden">${esc(p.goldenRule)}</div>`;
      h += table(p.summaryTable);
      h += `</div>`;
    }
  }

  if (l.integrations?.length) {
    h += `<h2>Integrações</h2><ul>${l.integrations
      .map((i) => `<li><b>${esc(i.module)}:</b> ${esc(i.text)}</li>`)
      .join("")}</ul>`;
  }
  if (l.errors?.length) {
    h += `<h2>Erros & Soluções</h2>${l.errors
      .map((e) => `<div class="error"><b>${esc(e.error)}</b><br>${esc(e.solution)}</div>`)
      .join("")}`;
  }
  if (l.checklist?.length) h += `<h2>Checklist</h2>${list(l.checklist)}`;
  if (l.exercise?.length) h += `<h2>Exercício</h2>${list(l.exercise)}`;
  if (l.caseStudy) h += `<h2>Estudo de Caso</h2><div class="box">${esc(l.caseStudy)}</div>`;
  if (l.economy) h += `<h2>Economia</h2><div class="box">${esc(l.economy)}</div>`;
  if (l.finance) h += `<h2>Financeiro</h2><div class="box">${esc(l.finance)}</div>`;

  return h;
}

let indexBody = `<h1>Curso OrcaSlicer — Conteúdo Completo</h1><nav>`;
for (const m of modules) {
  const mDir = join(OUT, `modulo-${String(m.number).padStart(2, "0")}`);
  mkdirSync(mDir, { recursive: true });

  let mBody = `<h1>Módulo ${m.number}: ${esc(m.title)}</h1>`;
  mBody += `<div class="meta"><span class="tag">${esc(m.level)}</span> ${esc(m.duration)}</div>`;
  mBody += `<p><i>${esc(m.tagline)}</i></p>`;
  mBody += `<div class="box"><b>Objetivo:</b> ${esc(m.objective)}<br><b>Metodologia:</b> ${esc(m.methodology)}</div>`;
  mBody += `<h2>Aulas</h2><nav>`;

  for (const l of m.lessons) {
    const file = `aula-${String(l.number).padStart(3, "0")}-${l.id}.html`;
    writeFileSync(
      join(mDir, file),
      layout(`${l.number} ${l.title}`, renderLesson(l, m), "./index.html"),
    );
    mBody += `<a href="./${file}">Aula ${l.number} — ${esc(l.title)} <small>(${esc(l.duration)})</small></a>`;
  }
  mBody += `</nav>`;
  writeFileSync(join(mDir, "index.html"), layout(`Módulo ${m.number}`, mBody, "../index.html"));

  indexBody += `<a href="./modulo-${String(m.number).padStart(2, "0")}/index.html"><b>Módulo ${m.number}</b> — ${esc(m.title)} <small>(${m.lessons.length} aulas • ${esc(m.duration)})</small></a>`;
}
indexBody += `</nav>`;
writeFileSync(
  join(OUT, "index.html"),
  `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Curso OrcaSlicer</title><style>${css}</style></head><body>${indexBody}</body></html>`,
);

console.log("Done. Modules:", modules.length);
