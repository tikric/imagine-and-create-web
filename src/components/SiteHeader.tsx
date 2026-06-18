import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="mono text-primary">[ ]</span>
          <span className="tracking-tight">OrcaSlicer<span className="text-primary"> MASTERCLASS</span></span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <li><Link to="/curso" className="hover:text-foreground transition">Módulos</Link></li>
          <li><a href="/#metodologia" className="hover:text-foreground transition">Metodologia</a></li>
          <li><a href="/#instrutor" className="hover:text-foreground transition">Instrutor</a></li>
          <li><a href="/#investimento" className="hover:text-foreground transition">Investimento</a></li>
          <li><a href="/#faq" className="hover:text-foreground transition">FAQ</a></li>
        </ul>
        <a href="/#investimento" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
          Quero entrar
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        <div className="md:col-span-2">
          <div className="font-semibold tracking-tight text-lg">
            OrcaSlicer<span className="text-primary"> MASTERCLASS</span>
          </div>
          <p className="mt-3 text-muted-foreground max-w-sm">
            Engenharia de fatiamento, calibração científica e produção comercial. Curso em português, atualizado a cada release.
          </p>
        </div>
        <div>
          <h4 className="mono text-xs uppercase tracking-wider text-primary mb-3">Curso</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="/curso" className="hover:text-foreground">24 Módulos</a></li>
            <li><a href="#investimento" className="hover:text-foreground">Investimento</a></li>
            <li><a href="#faq" className="hover:text-foreground">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mono text-xs uppercase tracking-wider text-primary mb-3">Contato</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li>contato@orcamaster.com.br</li>
            <li>Telegram exclusivo de alunos</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 OrcaSlicer Masterclass. Curso independente, não afiliado oficialmente ao projeto OrcaSlicer.</span>
          <span className="mono">v2026.06 · 24 módulos · 56h</span>
        </div>
      </div>
    </footer>
  );
}
