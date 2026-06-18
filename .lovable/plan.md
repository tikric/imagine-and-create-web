## Objetivo
Hoje, dos 24 módulos só o Módulo 1 tem aulas 100% detalhadas (teoria, integrações, parâmetros, regra de ouro, erros, exercício). Os outros 23 módulos têm aulas com 1-2 linhas de teoria. Vou expandir **todas as 73 aulas** ao mesmo padrão do Módulo 1.

## Escopo por aula (padrão completo)
Cada aula vai passar a ter:
- `theory`: 3–5 parágrafos técnicos
- `integrations`: 1–2 links com módulos relacionados
- `params`: tabela com 2–4 parâmetros (param / valor / ação)
- `goldenRule`: 1 regra de ouro destacada
- `errors`: 2–4 pares erro/solução
- `economy` ou `finance`: dica de custo/produção
- `exercise`: 3–5 passos práticos

## Execução em lotes
Para caber em respostas viáveis, vou expandir em **6 lotes** de 4 módulos cada, editando `src/data/modules.ts`:

```text
Lote 1 → Módulos 2, 3, 4, 5     (config impressora, processo, materiais, calibração)
Lote 2 → Módulos 6, 7, 8, 9     (engenharia, otimização, casos, comercial)
Lote 3 → Módulos 10, 11, 12, 13 (mestre, seams, velocidade, tolerâncias)
Lote 4 → Módulos 14, 15, 16, 17 (troubleshooting, produção, casos+, arachne)
Lote 5 → Módulos 18, 19, 20, 21 (infill, suportes, velocidade, protocolo)
Lote 6 → Módulos 22, 23, 24     (perfis, hotend, ironing)
```

A cada lote eu rodo um único `code--line_replace` no bloco do módulo. Sem mudar schema, sem mudar rotas, sem mexer no resto do site.

## Tom e fonte
Mantenho o tom técnico/engenharia já estabelecido (regra de ouro, integrações, tabelas mono). O conteúdo segue o material que você colou nas mensagens anteriores (OrcaSlicer Masterclass — interface, calibração científica, materiais, suportes, multi-material, troubleshooting, produção comercial).

## O que NÃO muda
- Design, rotas, navegação, componentes — nada disso.
- IDs das aulas e módulos permanecem (links existentes continuam válidos).
- Sem backend, sem login (isso fica pra depois se você quiser área do aluno).

## Custo / tempo
São ~70 aulas para escrever do zero. Cada lote consome bastante crédito (uma resposta grande por lote). Total esperado: **6 respostas grandes** até concluir.

Posso começar pelo Lote 1 assim que você aprovar.