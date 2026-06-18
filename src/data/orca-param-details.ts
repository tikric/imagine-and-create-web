// Detalhamento item-por-item de cada tela do painel esquerdo do OrcaSlicer 2.4.
// Formato masterclass: cada item é uma AULA COMPLETA.

export type OrcaParamDetail = {
  name: string;
  value: string;
  whatIs: string;
  whyAdjust?: string;
  types?: { label: string; desc: string }[];
  optionsTable?: { headers: string[]; rows: string[][] };
  influences: string;
  influencesList?: string[];
  generates: string;
  generatesTable?: { headers: string[]; rows: string[][] };
  integrationsTable?: { headers: string[]; rows: string[][] };
  howTo?: { step: string; path: string; desc: string }[];
  example?: { piece: string; config: string; result: string };
  errorsTable?: { headers: string[]; rows: string[][] };
  goldenRule?: string;
  summaryTable?: { title?: string; headers: string[]; rows: string[][] };
};

export const orcaParamDetails: Record<string, OrcaParamDetail[]> = {
  // ====================================================================
  // TELA 11 — QUALIDADE (Altura da camada · Largura da linha · Costura)
  // ====================================================================
  "tela-11-qualidade-camada-largura-costura": [
    // ───────────── MÓDULO 1: ALTURA DA CAMADA ─────────────
    {
      name: "Altura da camada",
      value: "0,2 mm",
      whatIs:
        "Espessura vertical de cada fatia que o bico deposita — a distância que o eixo Z sobe a cada camada. Define a resolução vertical: menor = mais detalhes e mais tempo; maior = mais rápido e menos detalhe. Regra física: deve ficar entre 25% e 75% do diâmetro do bico (bico 0,4 mm → 0,1 a 0,3 mm). Abaixo de 25% há subextrusão; acima de 75% a linha não adere bem.",
      whyAdjust:
        "É o parâmetro de maior impacto no binômio QUALIDADE × TEMPO. Dobrar a altura corta o tempo pela metade, mas multiplica a visibilidade dos 'degraus'. Camadas finas têm mais superfície de solda Z (peça mais resistente verticalmente); camadas grossas têm menos contato e ficam mais frágeis em Z.",
      optionsTable: {
        headers: ["Valor", "Nome", "Uso", "Tempo (rel.)", "Qualidade"],
        rows: [
          ["0,08 mm", "Ultra detalhe", "Miniaturas, joias", "4×", "Excelente"],
          ["0,12 mm", "Alta qualidade", "Peças visuais", "2×", "Muito boa"],
          ["0,16 mm", "Qualidade", "Peças padrão c/ detalhe", "1,6×", "Boa"],
          ["0,20 mm", "Padrão", "Uso geral", "1×", "Regular"],
          ["0,24 mm", "Rápido", "Protótipos grandes", "0,8×", "Aceitável"],
          ["0,28 mm", "Ultra rápido", "Rascunhos", "0,6×", "Baixa"],
          ["0,32 mm", "Extremo", "Estruturas simples", "0,5×", "Muito baixa"],
        ],
      },
      influences:
        "Diâmetro do bico (define mínimo/máximo), material, detalhamento da peça, tempo de impressão e adesão entre camadas.",
      influencesList: [
        "Diâmetro do bico: mín = 25% × bico; máx = 75% × bico",
        "Material: PLA aceita 0,08 mm; PETG prefere ≥0,16 mm; ABS gosta de grosso (menos warping)",
        "Detalhes: textos em relevo e curvas exigem ≤0,12 mm; paredes retas aceitam 0,28 mm",
        "Tempo: dobrar a altura = metade do tempo total",
        "Resistência Z: camadas finas soldam mais entre si; grossas são frágeis em Z",
      ],
      generates:
        "Camadas finas geram superfícies lisas, transições suaves e peças resistentes em Z; camadas grossas geram impressão rápida com 'efeito escada' visível e fragilidade entre camadas.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["0,12 mm", "Superfície lisa, detalhes nítidos", "Miniaturas, esculturas, textos"],
          ["0,20 mm", "Equilíbrio qualidade × tempo", "Peças funcionais, protótipos"],
          ["0,28 mm", "Linhas visíveis, impressão rápida", "Peças grandes, testes estruturais"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Velocidade", "Camadas finas precisam ser mais lentas", "−20–30% para 0,12 mm"],
          ["Temperatura", "Camadas finas pedem mais T°", "+5 °C para 0,12 mm"],
          ["Fluxo", "Camadas finas amplificam erros de flow", "Calibrar antes de 0,12 mm"],
          ["Cooling Fan", "Camadas finas precisam de mais fan", "+10–20%"],
          ["Largura da linha", "Largura = 2–4× altura", "Aumentar p/ camadas grossas"],
          ["Adaptive Layer Height", "Alterna fina/grossa", "Ativar p/ peças mistas"],
        ],
      },
      howTo: [
        { step: "1. Abrir aba Prepare", path: "Aba Prepare", desc: "OrcaSlicer 2.4 aberto." },
        { step: "2. Expandir Qualidade", path: "Processo › Qualidade › Altura da camada", desc: "Abrir o grupo Altura da camada." },
        { step: "3. Definir o valor", path: "Campo 'Altura da camada'", desc: "Ex.: 0,20 mm. O tempo estimado é recalculado." },
        { step: "4. Salvar preset", path: "Processo › Salvar como…", desc: "Crie perfis: PLA_Qualidade (0,12), PLA_Padrao (0,20), PLA_Rapido (0,28)." },
      ],
      example: {
        piece: "Miniatura D&D 28 mm com detalhes finos",
        config: "Bico 0,4 mm · Altura 0,08 mm · 40 mm/s · +5 °C",
        result: "Detalhes faciais nítidos, curvas suaves. Tempo 3 h (vs 1,5 h em 0,20 mm).",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Linhas não se tocam", "Camada > 75% do bico", "Reduzir para ≤75% do diâmetro"],
          ["Plástico não sai", "Camada < 25% do bico", "Aumentar para ≥25%"],
          ["'Degraus' visíveis", "Camada muito grossa", "Reduzir ou usar Adaptive Layers"],
          ["Quebra entre camadas", "Pouca solda Z", "Reduzir altura ou aumentar T°"],
          ["Tempo excessivo", "Camada muito fina", "Subir para 0,20–0,24 mm"],
        ],
      },
      goldenRule:
        "Para bico 0,4 mm: 0,12 mm = detalhe, 0,20 mm = padrão, 0,28 mm = velocidade. A altura é o equilíbrio entre o detalhe que você quer e o tempo que você tem.",
      summaryTable: {
        title: "Decisão rápida por bico e tipo de peça",
        headers: ["Tipo de peça", "Bico 0,4", "Bico 0,6", "Bico 0,8"],
        rows: [
          ["Miniatura / detalhe", "0,08–0,12", "—", "—"],
          ["Funcional / estética", "0,16–0,20", "0,24–0,30", "0,32–0,40"],
          ["Protótipo / rápido", "0,24–0,28", "0,36–0,42", "0,48–0,56"],
          ["Estrutural / grande", "0,28–0,32", "0,42–0,48", "0,56–0,64"],
        ],
      },
    },
    {
      name: "Altura da primeira camada",
      value: "0,2 mm",
      whatIs:
        "Espessura da primeira fatia depositada diretamente na mesa. Valor independente das demais camadas — geralmente maior, para compensar imperfeições de nivelamento e garantir adesão. Funciona como base esmagada que preenche micro-poros da superfície.",
      whyAdjust:
        "A primeira camada é literalmente o que segura a peça na mesa durante horas. Mais grossa = mais plástico esmagado = mais adesão; muito grossa = 'pé de elefante' (alargamento da base). Mantém-se geralmente entre 100% e 150% da altura normal.",
      optionsTable: {
        headers: ["Valor (% da normal)", "Uso", "Resultado"],
        rows: [
          ["100%", "Mesas perfeitamente niveladas", "Adesão média"],
          ["120%", "Mesas com leve desnível", "Boa adesão"],
          ["140%", "Mesas irregulares", "Excelente adesão"],
          ["150%", "Problemas graves de nivelamento", "Adesão máxima, pé de elefante"],
        ],
      },
      influences:
        "Nivelamento da mesa, tipo de superfície (PEI, vidro, magnética), material, tamanho da peça e Z-Offset.",
      influencesList: [
        "Nivelamento: mesa boa → mais fina; ruim → mais grossa",
        "Superfície: PEI lisa aceita fina; vidro pede mais espessura",
        "Material: PLA 100–120%; PETG 120–140%; ABS 140–150%; TPU 100%",
        "Tamanho: peças grandes precisam de 130–150% para não warpar",
        "Z-Offset baixo já esmaga — reduzir altura para compensar",
      ],
      generates:
        "Primeira camada grossa gera base robusta com pé de elefante; fina gera base precisa mas frágil ao descolamento.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["100% (fina)", "Base precisa, sem alargamento", "Mesas perfeitas, peças pequenas"],
          ["120% (média)", "Base adequada, pouco alargamento", "Uso geral, PEI lisa"],
          ["140% (grossa)", "Base robusta, pé de elefante", "Mesas irregulares, ABS"],
          ["150% (muito grossa)", "Base alargada, difícil remover", "Casos extremos"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Velocidade da 1ª camada", "Deve ser lenta", "20–30 mm/s"],
          ["Temperatura da mesa", "Ideal por material", "PLA 60 / PETG 80 / ABS 110"],
          ["Z-Offset", "Calibrar com papel/baby-step", "Ajuste fino"],
          ["Brim / Raft", "Substitui ou complementa", "Ativar p/ peças grandes"],
          ["Compensação pé de elefante", "Corrige alargamento", "0,1–0,2 mm"],
          ["Largura 1ª camada", "Mais grossa p/ adesão", "0,5–0,6 mm"],
        ],
      },
      howTo: [
        { step: "1. Abrir Prepare", path: "Aba Prepare", desc: "OrcaSlicer 2.4." },
        { step: "2. Qualidade › Altura da camada", path: "Processo › Qualidade › Altura da camada", desc: "Expandir o grupo." },
        { step: "3. Definir 'Altura da primeira camada'", path: "Campo dedicado", desc: "Ex.: 0,24 mm para altura normal 0,20 mm (120%)." },
      ],
      example: {
        piece: "Suporte de parede 200 × 150 mm em PLA",
        config: "Bico 0,4 · Altura normal 0,20 · 1ª camada 0,28 mm (140%) · Mesa 60 °C",
        result: "Adesão excelente, sem warping. Pé de elefante de 0,15 mm corrigido com compensação.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Peça descola", "1ª camada muito fina", "Subir para 120–140%"],
          ["Pé de elefante", "1ª camada muito grossa", "Ativar Elephant Foot Compensation"],
          ["1ª camada com falhas", "Z-Offset incorreto", "Recalibrar Z-Offset"],
          ["Bico arrasta", "1ª camada grossa demais p/ Z-Offset", "Reduzir altura ou ajustar Z"],
          ["Linhas não tocam na base", "1ª camada muito fina", "Aumentar altura ou abaixar Z"],
        ],
      },
      goldenRule:
        "A primeira camada deve ser mais grossa que as demais para absorver imperfeições. 120–140% da altura normal = adesão garantida sem pé de elefante.",
      summaryTable: {
        title: "Primeira camada por material",
        headers: ["Material", "Altura normal", "1ª camada", "Observação"],
        rows: [
          ["PLA", "0,20 mm", "0,24 mm (120%)", "Padrão"],
          ["PLA detalhe", "0,12 mm", "0,20 mm (166%)", "Mantém base estável"],
          ["PETG", "0,20 mm", "0,28 mm (140%)", "Evita colar demais"],
          ["ABS", "0,20 mm", "0,30 mm (150%)", "Reduz warping"],
          ["TPU", "0,20 mm", "0,20 mm (100%)", "Evita aderência excessiva"],
        ],
      },
    },

    // ───────────── MÓDULO 2: LARGURA DA LINHA ─────────────
    {
      name: "Largura da linha › Padrão",
      value: "0,42 mm",
      whatIs:
        "Largura base de extrusão usada por todos os tipos de linha, salvo quando substituída. NÃO é igual ao diâmetro do bico — o plástico se expande lateralmente ao sair, então a largura típica é 105% do bico (0,42 mm para 0,4 mm).",
      whyAdjust:
        "Define quanto plástico cai por mm impresso. Largura maior = paredes mais resistentes e impressão mais rápida; largura menor = mais detalhe e textos legíveis. Regra: largura deve ficar entre 100% e 150% do diâmetro do bico.",
      optionsTable: {
        headers: ["Valor", "% do bico 0,4", "Uso", "Resultado"],
        rows: [
          ["0,35 mm", "87%", "Fino", "Detalhes muito finos, textos pequenos"],
          ["0,40 mm", "100%", "Mínimo", "Precisão máxima, risco de lacunas"],
          ["0,42 mm", "105% — PADRÃO", "Geral", "Equilíbrio precisão × preenchimento"],
          ["0,45 mm", "112%", "Reforço", "Menos lacunas, melhor solda"],
          ["0,50 mm", "125%", "Grosso", "Rápido, menos detalhe"],
          ["0,60 mm", "150%", "Máximo", "Estrutural, visual grosso"],
        ],
      },
      influences:
        "Diâmetro do bico, material, altura da camada (largura = 2–4× altura) e algoritmo de paredes (Arachne vs Classic).",
      influencesList: [
        "Bico menor → largura menor → mais detalhe",
        "PLA aceita 120%; PETG prefere 100–110%; ABS gosta de mais largo",
        "Altura 0,20 mm → largura ideal 0,40–0,80 mm",
        "Arachne ajusta largura dinamicamente; Classic usa valor fixo",
      ],
      generates:
        "Linhas finas geram superfícies lisas com risco de lacunas; linhas grossas geram paredes resistentes com textura visível.",
      generatesTable: {
        headers: ["Configuração", "Resultado visual", "Quando usar"],
        rows: [
          ["0,35 mm", "Detalhes nítidos, lacunas em paredes", "Miniaturas, textos pequenos"],
          ["0,42 mm", "Bom preenchimento, detalhe adequado", "Uso geral"],
          ["0,50 mm", "Paredes resistentes, menos detalhe", "Peças estruturais"],
          ["0,60 mm", "Visual grosso, máxima resistência", "Protótipos industriais"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Altura da camada", "Largura = 2–4× altura", "Ajustar proporcionalmente"],
          ["Fluxo", "Largura maior = fluxo maior", "Recalibrar após mudar"],
          ["Velocidade", "Largura maior = mais lenta", "−10–20%"],
          ["Temperatura", "Largura maior = T° maior", "+5 °C para 0,50 mm"],
          ["Arachne", "Substitui valor fixo", "Ativar para detalhes"],
        ],
      },
      howTo: [
        { step: "1. Prepare", path: "Aba Prepare", desc: "OrcaSlicer 2.4." },
        { step: "2. Qualidade › Largura da linha", path: "Processo › Qualidade › Largura da linha", desc: "Expandir o grupo." },
        { step: "3. Campo Padrão", path: "Largura da linha › Padrão", desc: "Ex.: 0,42 mm (105% do bico 0,4)." },
      ],
      example: {
        piece: "Chaveiro com nome em relevo (letras 1 mm)",
        config: "Bico 0,4 mm · Largura padrão 0,35 mm",
        result: "Texto nítido e legível em 30 min.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Lacunas entre linhas", "Largura muito fina", "Subir para 0,45–0,50 mm"],
          ["Extrusão excessiva", "Largura muito grossa", "Reduzir para 0,40–0,42 mm"],
          ["Textos ilegíveis", "Largura muito grossa", "Reduzir para 0,35–0,38 mm"],
          ["Paredes fracas", "Largura muito fina", "Subir para 0,45–0,50 mm"],
          ["Superfície áspera", "Largura inconsistente", "Verificar fluxo/temperatura"],
        ],
      },
      goldenRule:
        "Padrão entre 100% e 120% do bico. Para bico 0,4 mm: 0,42 mm. Finura para detalhes, grossura para resistência.",
      summaryTable: {
        headers: ["Uso", "Bico 0,4", "Bico 0,6", "Bico 0,8"],
        rows: [
          ["Detalhe fino", "0,35", "—", "—"],
          ["Uso geral", "0,42", "0,60", "0,80"],
          ["Estrutural", "0,50", "0,75", "1,00"],
          ["Protótipo rápido", "0,60", "0,90", "1,20"],
        ],
      },
    },
    {
      name: "Largura da linha › Primeira camada",
      value: "0,5 mm",
      whatIs:
        "Largura exclusiva da extrusão na primeira camada. Mais grossa que o padrão para esmagar plástico contra a mesa, preencher micro-poros e tolerar Z-Offset imperfeito.",
      whyAdjust:
        "Mais área de contato = mais adesão. Mas largura excessiva cria pé de elefante. Equilíbrio típico: 120–140% da largura padrão.",
      optionsTable: {
        headers: ["Valor (% do padrão)", "Uso", "Resultado"],
        rows: [
          ["100%", "Mesas perfeitas", "Adesão média"],
          ["120%", "Mesas boas", "Boa adesão"],
          ["140%", "Mesas regulares", "Excelente adesão"],
          ["150%", "Mesas irregulares", "Adesão máxima"],
        ],
      },
      influences:
        "Nivelamento da mesa, material, tamanho da peça e Z-Offset.",
      influencesList: [
        "PLA 120–130%; PETG 130–140%; ABS 140–150%",
        "Peças pequenas 100–120%; grandes 140–150%",
        "Z-Offset baixo já esmaga — reduzir largura",
      ],
      generates:
        "Linhas grossas geram base que NÃO descola; linhas finas geram base precisa mas frágil.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["Fina (100%)", "Base precisa, fácil remover", "Peças pequenas, mesa perfeita"],
          ["Média (120%)", "Boa adesão, base adequada", "Uso geral"],
          ["Grossa (140%)", "Adesão máxima, pé de elefante", "Peças grandes, ABS"],
        ],
      },
      howTo: [
        { step: "1. Prepare", path: "Aba Prepare", desc: "OrcaSlicer 2.4." },
        { step: "2. Qualidade › Largura da linha", path: "Processo › Qualidade › Largura da linha", desc: "Expandir." },
        { step: "3. Campo Primeira camada", path: "Largura › Primeira camada", desc: "Ex.: 0,50 mm (≈120% de 0,42)." },
      ],
      goldenRule:
        "A primeira camada deve ser mais grossa que as demais. 120–140% da largura padrão é o ponto ideal para adesão sem pé de elefante.",
    },
    {
      name: "Largura da linha › Parede externa",
      value: "0,42 mm",
      whatIs:
        "Largura exclusiva da parede mais externa — a única superfície visível da peça. Define a qualidade ESTÉTICA da impressão. Geralmente mais fina que as paredes internas para garantir lisura.",
      whyAdjust:
        "É a 'cara' da peça. Mais fina = superfície mais lisa e detalhes nítidos; mais grossa = textura áspera mas paredes mais robustas. A resistência vem das paredes internas, não desta.",
      optionsTable: {
        headers: ["Valor", "Uso", "Resultado estético"],
        rows: [
          ["0,35 mm", "Muito fina", "Superfície quase espelhada"],
          ["0,38 mm", "Fina", "Superfície lisa, boa qualidade"],
          ["0,42 mm", "PADRÃO", "Equilíbrio qualidade × velocidade"],
          ["0,45 mm", "Grossa", "Mais rugosa, menos detalhe"],
        ],
      },
      influences:
        "Qualidade visual, detalhes (textos, relevos, curvas), tempo de impressão e resistência das paredes externas.",
      influencesList: [
        "Externa fina = superfície mais lisa",
        "Textos, relevos, curvas → parede fina",
        "Paredes finas demoram mais (mais passadas)",
        "Resistência vem das paredes INTERNAS",
      ],
      generates:
        "Parede externa fina gera peças visualmente premium; grossa gera peças resistentes a impacto mas com 'cara' de protótipo.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["0,35 mm", "Espelhada, detalhes nítidos", "Miniaturas, joias, textos"],
          ["0,42 mm", "Boa qualidade, equilíbrio", "Uso geral"],
          ["0,50 mm", "Linhas visíveis, menos detalhe", "Estruturais, protótipos"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Velocidade parede externa", "Deve ser lenta", "40–60 mm/s"],
          ["Ordem de impressão", "Externa por último", "Melhor visual"],
          ["Costura (Seam)", "Esconder em cantos", "Posicionar estrategicamente"],
        ],
      },
      goldenRule:
        "A parede externa é o cartão de visita. Mantenha-a fina (0,38–0,42 mm) e lenta (40–60 mm/s) para o melhor acabamento.",
    },
    {
      name: "Largura da linha › Parede interna",
      value: "0,45 mm",
      whatIs:
        "Largura das paredes internas (todos os perímetros que NÃO são o externo). Não são visíveis — sua única função é resistência estrutural e suporte ao topo/base.",
      whyAdjust:
        "Como ninguém vê, podem ser mais grossas que a externa para ganhar resistência sem prejudicar a estética. É o truque clássico do Orca: externa fina + interna grossa = melhor dos dois mundos.",
      optionsTable: {
        headers: ["Valor", "Uso", "Resultado estrutural"],
        rows: [
          ["0,42 mm", "Igual à externa", "Visual consistente"],
          ["0,45 mm", "PADRÃO", "Bom equilíbrio resistência × velocidade"],
          ["0,50 mm", "Mais grossa", "Maior resistência"],
          ["0,55 mm", "Grossa", "Máxima resistência"],
        ],
      },
      influences:
        "Resistência interna, tempo de impressão (menos passadas) e volume de filamento.",
      generates:
        "Internas mais grossas que a externa geram peças com aparência fina externamente e estrutura interna robusta.",
      goldenRule:
        "Paredes internas podem ser MAIS grossas que as externas. 0,45–0,50 mm para resistência sem sacrificar qualidade visual.",
    },
    {
      name: "Largura da linha › Superfície superior",
      value: "0,42 mm",
      whatIs:
        "Largura das linhas que formam a 'tampa' visível da peça (camadas sólidas do topo). É a segunda 'cara' da peça.",
      whyAdjust:
        "Linhas finas no topo eliminam pillowing e gaps entre passadas. Se for usar Ironing depois, esta largura define a qualidade do alisamento.",
      optionsTable: {
        headers: ["Valor", "Uso", "Resultado"],
        rows: [
          ["0,35 mm", "Muito fina", "Topo espelhado, ideal p/ Ironing"],
          ["0,38 mm", "Fina", "Topo liso"],
          ["0,42 mm", "PADRÃO", "Consistência com a parede"],
        ],
      },
      influences:
        "Aparência do topo (pillowing, gaps, brilho) e qualidade do Ironing posterior.",
      generates:
        "Linhas finas no topo geram superfícies limpas, sem buracos, prontas para Ironing perfeito.",
      goldenRule:
        "O topo deve ser tão liso quanto a parede externa. Use a mesma largura ou ligeiramente menor para melhor acabamento.",
    },
    {
      name: "Largura da linha › Preenchimento esparso",
      value: "0,45 mm",
      whatIs:
        "Largura das linhas do infill (estrutura interna oca). Como não é visível e só precisa ser estrutural, pode ser mais grosso para acelerar.",
      whyAdjust:
        "Infill costuma representar 40–60% do tempo total. Engrossar a linha do infill reduz drasticamente esse tempo com perda mínima de resistência.",
      optionsTable: {
        headers: ["Valor (% do padrão)", "Uso", "Resultado"],
        rows: [
          ["100% (0,42)", "Máxima precisão", "Padrão conservador"],
          ["110–120% (0,45–0,50)", "Aceleração padrão", "−15% de tempo no infill"],
          ["≥150% (0,60+)", "Aceleração extrema", "Risco de pillowing no topo"],
        ],
      },
      influences:
        "Tempo total de impressão, volume de filamento e resistência estrutural.",
      generates:
        "Infill mais grosso gera impressões muito mais rápidas com resistência similar; muito grosso gera pillowing na primeira camada sólida acima.",
      goldenRule:
        "O infill pode ser mais grosso que a parede para economizar tempo. 0,45–0,50 mm para um bom equilíbrio.",
    },
    {
      name: "Largura da linha › Preenchimento sólido",
      value: "0,42 mm",
      whatIs:
        "Largura das camadas 100% sólidas (topo, base, paredes finas convertidas em sólido).",
      whyAdjust:
        "Manter igual à parede externa garante consistência visual entre laterais e topo/base, sem gaps ou over-extrusion na interface.",
      influences:
        "Qualidade visual das camadas que formam topo/base, ocorrência de gaps ou over-extrusion.",
      generates:
        "Mesmo valor da parede externa gera transição invisível entre lateral e topo/base.",
      goldenRule:
        "Use o mesmo valor da parede externa para topo/base/sólidos visualmente uniformes.",
    },
    {
      name: "Largura da linha › Suporte",
      value: "0,42 mm",
      whatIs:
        "Largura das estruturas temporárias de suporte. Como serão removidas, o compromisso é: forte o bastante para sustentar, fino o bastante para soltar.",
      whyAdjust:
        "Suporte muito grosso resiste à remoção e descasca a peça; muito fino desaba durante a impressão. Para suporte normal, 85–95% do bico costuma ser o ponto ótimo.",
      optionsTable: {
        headers: ["Valor", "Uso", "Resultado"],
        rows: [
          ["0,35 mm", "Fino", "Fácil remover, menos material"],
          ["0,42 mm", "PADRÃO", "Equilíbrio estabilidade × remoção"],
          ["0,50 mm", "Grosso", "Suporte muito estável, difícil de soltar"],
        ],
      },
      influences:
        "Facilidade de remoção dos suportes e marca/cicatriz na peça após a remoção.",
      generates:
        "Suportes finos geram remoção limpa; grossos exigem alicate e podem descascar a superfície.",
      goldenRule:
        "Suportes descartáveis podem ser finos (0,35–0,40 mm) para facilitar a remoção e economizar material.",
    },
    {
      name: "Largura da linha › Ponte",
      value: "100%",
      whatIs:
        "Multiplicador (em %) aplicado à largura da extrusão quando o OrcaSlicer detecta uma ponte — uma linha que cruza um vazio sem suporte abaixo. A ponte é esticada entre duas paredes, como uma corda no ar. 100% mantém a largura nominal; 85–95% gera linha mais fina que estica melhor sobre o vão; abaixo de 85% a linha tende a romper.",
      whyAdjust:
        "Linha mais grossa tem mais inércia e pode cair antes de solidificar. Linha mais fina estica como um fio, atravessando vãos maiores com menos peso para segurar. O segredo é o ponto onde a linha estica sem romper.",
      optionsTable: {
        headers: ["Valor", "Efeito na ponte", "Melhor para"],
        rows: [
          ["70–80%", "Linha muito fina, estica bem", "Vãos > 80 mm com risco de queda"],
          ["85–95%", "Linha esticada, boa travessia", "Vãos 30–80 mm — PONTO ÓTIMO"],
          ["95–100%", "Linha nominal, estrutura sólida", "Vãos < 30 mm, pontes estruturais"],
          [">100%", "Linha grossa, pesada", "Não recomendado"],
        ],
      },
      influences:
        "Capacidade de cruzar vãos sem cair, qualidade do acabamento das pontes e tempo de solidificação no ar.",
      influencesList: [
        "Comprimento do vão: vãos longos exigem linhas mais finas",
        "Velocidade: linhas finas pedem velocidade moderada",
        "Resfriamento: fan a 100% para solidificar rápido",
        "Material: PLA solidifica rápido (vãos longos); PETG é lento (linhas mais grossas)",
        "Bico: 0,6 mm a 85% = 0,51 mm (mais massa que 0,4 mm a 100%)",
      ],
      generates:
        "Larguras baixas geram pontes que atravessam vãos longos com baixa flecha; 100% gera estrutura sólida mas pontes longas cedem.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["100%, vão 50 mm", "Linha pode ceder no meio", "Vãos curtos, peças estruturais"],
          ["85%, vão 50 mm", "Linha estica e atravessa", "Vãos médios, boa aparência inferior"],
          ["80%, vão 80 mm", "Linha estica bem", "Vãos longos, estética > resistência"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Ajuste recomendado para ponte"],
        rows: [
          ["Velocidade da ponte", "30–50 mm/s"],
          ["Cooling Fan", "100%"],
          ["Bridge Flow Ratio", "0,90–0,95"],
          ["Z Gap (suportes)", "N/A (ponte não usa suporte)"],
        ],
      },
      howTo: [
        { step: "1. Ativar detecção automática", path: "Processo › Qualidade › Detectar pontes automaticamente", desc: "Permite ao Orca aplicar config específica em cada vão." },
        { step: "2. Ajustar largura", path: "Processo › Qualidade › Largura da linha › Ponte", desc: "85% para vãos médios, 90% para estruturais." },
        { step: "3. Ajustar velocidade", path: "Processo › Velocidade › Velocidade da ponte", desc: "30–50 mm/s para garantir solidificação." },
      ],
      example: {
        piece: "Suporte de prateleira com vão de 60 mm sem suporte",
        config: "Ponte 85% · 40 mm/s · Fan 100%",
        result: "Ponte atravessa sem queda, superfície inferior aceitável.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Linha cai no meio", "Ponte fina ou rápida demais", "Subir para 90–100% ou reduzir velocidade"],
          ["Linha rompe", "Ponte fina ou filamento frio", "Subir para 95% ou aumentar T°"],
          ["Fiapos na parte inferior", "Resfriamento insuficiente", "Fan 100%"],
          ["Ponte ondulada", "Velocidade alta", "Reduzir para 30 mm/s"],
        ],
      },
      goldenRule:
        "85% de largura + 40 mm/s + 100% de fan = ponte que atravessa e solidifica.",
      summaryTable: {
        title: "Decisão rápida por vão e material",
        headers: ["Vão", "Material", "Largura ponte", "Velocidade", "Fan"],
        rows: [
          ["< 30 mm", "PLA", "100%", "50 mm/s", "80%"],
          ["30–60 mm", "PLA", "85–90%", "40 mm/s", "100%"],
          ["60–100 mm", "PLA", "80–85%", "30 mm/s", "100%"],
          ["< 30 mm", "PETG", "100%", "40 mm/s", "60%"],
          ["30–60 mm", "PETG", "90–95%", "30 mm/s", "80%"],
        ],
      },
    },

    // ───────────── MÓDULO 3: COSTURA (SEAM) ─────────────
    {
      name: "Costura › Posição da costura",
      value: "Alinhada",
      whatIs:
        "Define ONDE o bico inicia e termina cada perímetro externo. Cada loop precisa começar/fechar em um ponto, e nesse ponto há uma micro-sobra de plástico — a 'cicatriz' da impressão. Este parâmetro decide se essa cicatriz fica oculta, espalhada ou alinhada.",
      whyAdjust:
        "É puramente estético — mas com impacto enorme. Uma costura mal posicionada destrói visualmente uma peça boa. Uma costura bem posicionada deixa a peça aparentemente sem emenda.",
      optionsTable: {
        headers: ["Tipo", "O que faz", "Melhor para", "Visual"],
        rows: [
          ["Aligned", "Empilha costuras no canto oculto", "Peças com cantos", "Linha vertical num canto"],
          ["Rear", "Posiciona na traseira (Y máx)", "Peças com face oculta", "Linha vertical atrás"],
          ["Nearest", "Onde o trajeto anterior terminou", "Peças técnicas", "Costura espalhada"],
          ["Random", "Distribui aleatoriamente", "Peças redondas", "Pontos minúsculos"],
        ],
      },
      influences:
        "Geometria da peça (cantos vs redondos), estética (face visível) e resistência (costura alinhada cria linha de fratura).",
      influencesList: [
        "Cantos → Aligned",
        "Redondas → Random",
        "Face oculta → Rear",
        "Alinhada distribui menos tensão; Random distribui pontos fracos",
      ],
      generates:
        "Aligned gera linha vertical visível em um canto; Random gera micro-pontos invisíveis; Rear gera frente totalmente lisa.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["Aligned", "Linha vertical num canto", "Caixas, poligonais"],
          ["Rear", "Linha na traseira", "Estátuas, decorativos"],
          ["Nearest", "Costura mínima, tempo otimizado", "Técnicas"],
          ["Random", "Pontos minúsculos espalhados", "Cilindros, esferas, vasos"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Scarf Seam", "Suaviza a costura", "Ativar p/ redondos"],
          ["Seam Painting", "Controle manual", "Pintar onde quer"],
          ["Wipe", "Limpa o excesso", "Ativar p/ costura limpa"],
          ["Retração", "Reduz sobra", "Calibrar"],
        ],
      },
      howTo: [
        { step: "1. Prepare", path: "Aba Prepare", desc: "OrcaSlicer 2.4." },
        { step: "2. Qualidade › Costura", path: "Processo › Qualidade › Costura", desc: "Expandir o grupo." },
        { step: "3. Posição da costura", path: "Campo dedicado", desc: "Escolher Aligned, Rear, Nearest ou Random." },
      ],
      example: {
        piece: "Vaso cilíndrico decorativo",
        config: "Posição: Random",
        result: "Nenhuma linha vertical visível, apenas pontos imperceptíveis espalhados.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Linha vertical em superfície lisa", "Aligned em peça redonda", "Mudar para Random"],
          ["Pontos salientes espalhados", "Random em peça poligonal", "Mudar para Aligned"],
          ["Costura na frente", "Rear não configurado", "Posicionar peça corretamente"],
        ],
      },
      goldenRule:
        "Cantos = Aligned. Redondos = Random. Frente definida = Rear. Posicione a costura onde ninguém vai ver.",
      summaryTable: {
        headers: ["Tipo de peça", "Posição", "Motivo"],
        rows: [
          ["Caixa, poligonal", "Aligned", "Oculta em um canto"],
          ["Cilindro, vaso", "Random", "Espalha os pontos"],
          ["Estátua, busto", "Rear", "Oculta atrás"],
          ["Engrenagem, técnica", "Nearest", "Otimiza tempo"],
        ],
      },
    },
    {
      name: "Costuras internas escalonadas",
      value: "Desativado",
      whatIs:
        "Distribui as costuras das paredes internas em ângulos/posições diferentes a cada camada, em vez de alinhá-las verticalmente com a costura externa. Evita que todas as costuras formem uma 'linha de fraqueza' contínua no mesmo eixo Z.",
      whyAdjust:
        "Costuras alinhadas (externa + internas no mesmo ângulo) criam um plano de fragilidade vertical. Escalonar transforma isso num padrão helicoidal, distribuindo tensões.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Desativado", "Todas as paredes começam no mesmo ângulo → ponto fraco vertical"],
          ["Ativado", "Internas em ângulos alternados → padrão helicoidal mais resistente"],
        ],
      },
      influences:
        "Resistência estrutural na linha da costura, uniformidade do fluxo e distribuição de tensões.",
      generates:
        "Ativar gera peças mecanicamente mais resistentes (sem 'falha contínua' vertical); desativar mantém aparência igual mas com risco de ruptura na linha da costura sob esforço.",
      goldenRule:
        "Ative SEMPRE em peças estruturais. Desligue apenas se você precisar de costura interna 100% alinhada por motivo estético específico.",
    },
    {
      name: "Vão entre costuras",
      value: "10%",
      whatIs:
        "Define a sobreposição (positivo) ou o gap (negativo) entre o ponto onde a parede TERMINA e onde RECOMEÇA na mesma camada. Positivo cria sobreposição (linhas se cruzam); negativo cria gap (linhas não se encontram).",
      whyAdjust:
        "Sem sobreposição, a junção pode abrir ou criar bolha de plástico. 10% positivo é o padrão que solda sem caroço.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["0%", "Linhas encostam exatamente — risco de bolha"],
          ["5–15% (positivo) — PADRÃO", "Pequena sobreposição, solda sem bolha"],
          ["Negativo (−5 a −20%)", "Gap proposital — buraco visível, útil em filamentos fluidos"],
          ["20%+", "Sobreposição grande — caroço brilhante visível"],
        ],
      },
      influences:
        "Aparência do ponto exato da costura (bolha vs buraco), resistência mecânica da junção e vazamento durante retração.",
      generates:
        "10% positivo gera junções soldadas sem bolha — ideal para PLA/PETG. Valor alto gera caroço brilhante; negativo gera buraco visível mas plano.",
      goldenRule:
        "10% positivo é o equilíbrio: solda sem caroço e sem buraco.",
    },
    {
      name: "Costura junta cachecol (Scarf Seam, beta)",
      value: "Nenhum",
      whatIs:
        "Recurso experimental que substitui a costura tradicional (corte vertical abrupto) por uma transição em RAMPA — o bico sobe/desce gradualmente no início e fim da parede, como um lenço (cachecol) que se sobrepõe.",
      whyAdjust:
        "É a única forma de tornar a costura praticamente INVISÍVEL em peças cilíndricas. Em vasos, lentes e cones, transforma uma 'cicatriz' em uma transição imperceptível.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Nenhum", "Costura tradicional, corte abrupto"],
          ["Contornos (Contour)", "Scarf apenas em contornos fechados — ideal vasos/cilindros"],
          ["Tudo (All)", "Em todas as paredes — máxima invisibilidade, exige PA bem calibrado"],
        ],
      },
      influences:
        "Visibilidade da costura, tempo de impressão (Scarf adiciona movimento extra) e exigência de calibração (PA mal calibrado destrói o efeito).",
      generates:
        "Scarf gera junções INVISÍVEIS em formas cilíndricas — a parede aparenta uma espiral contínua. Sem Scarf, mesmo o melhor Aligned deixa linha visível.",
      goldenRule:
        "Use Scarf 'Contornos' em vasos e cilindros — a costura desaparece. Em PLA bem calibrado, ative 'Tudo'.",
    },
    {
      name: "Velocidade de limpeza baseada na função",
      value: "Ativado",
      whatIs:
        "Toggle que faz o Orca regular AUTOMATICAMENTE a velocidade do 'wipe' (varredura do bico para limpar o nozzle) de acordo com onde o wipe acontece — rápido em paredes internas, lento em paredes externas visíveis.",
      whyAdjust:
        "Sem este toggle, o wipe acontece sempre na mesma velocidade. Com ele ativo, o Orca otimiza: rápido onde ninguém vê, lento onde a marca de wipe seria visível.",
      influences:
        "Velocidade de cada movimento de limpeza, ocorrência de stringing e marcas de wipe na peça.",
      generates:
        "Ativado gera limpeza adaptativa: rápida em paredes internas, lenta nas externas → menos marca visível.",
      goldenRule:
        "Mantenha ATIVADO por padrão — é otimização gratuita.",
    },
    {
      name: "Velocidade de limpeza",
      value: "80%",
      whatIs:
        "Velocidade base da varredura de limpeza do bico (em % da velocidade da parede ou mm/s). Quando o toggle anterior está ativo, este valor é o ponto de partida que será modulado por função.",
      whyAdjust:
        "Mais lento limpa melhor mas deixa marca visível; mais rápido deixa marca quase invisível mas pode não limpar bem. 80% é o ponto onde a marca é discreta e a limpeza eficaz.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["50%", "Limpeza lenta e cuidadosa — marca visível"],
          ["80% — PADRÃO", "Equilíbrio limpeza × marca"],
          ["100%", "Limpeza rápida — marca quase invisível, pode deixar resíduo"],
        ],
      },
      influences:
        "Quanto plástico residual fica no bico após retração/troca e qualidade visual das marcas de wipe.",
      generates:
        "Limpeza lenta gera bico limpo (sem stringing) mas marca visível; rápida gera marca invisível mas pode deixar resíduo.",
      goldenRule:
        "80% é o ponto ouro. Suba para 100% se aparecer marca; desça para 60% se houver stringing.",
    },
    {
      name: "Limpeza em voltas",
      value: "Desativado",
      whatIs:
        "Faz o Orca executar o wipe em movimento CIRCULAR (em vez de linha reta). Limpa o bico em 360°, ideal para nozzles entupidos ou filamentos viscosos que escorrem.",
      whyAdjust:
        "Filamentos como Nylon, TPU e PETG úmido escorrem do bico durante movimentos longos. Wipe circular elimina esse resíduo em todas as direções.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Desativado", "Wipe em linha reta — padrão para PLA"],
          ["Ativado", "Wipe circular 360° — ideal para Nylon, TPU, PETG"],
        ],
      },
      influences:
        "Eficácia da limpeza com filamentos viscosos e tempo gasto em cada retração.",
      generates:
        "Ativado gera bico extremamente limpo em filamentos problemáticos; desativado é mais rápido e suficiente para PLA/PETG bem calibrados.",
      goldenRule:
        "PLA/PETG calibrados = desativado. Nylon/TPU/PETG úmido = ativado.",
    },
  ],

  // ====================================================================
  // TELA 12 — QUALIDADE (Precisão · Pé de elefante · Alisamento)
  // ====================================================================
  "tela-12-qualidade-precisao-alisamento": [
    // ───────────── MÓDULO 1: LIMPEZA ANTES DA VOLTA EXTERNA ─────────────
    {
      name: "Limpeza antes da volta externa",
      value: "Checkbox",
      whatIs:
        "Função que faz o bico se mover ligeiramente sobre a parede INTERNA antes de iniciar a parede externa, descarregando o excesso de plástico residual ali (onde ninguém vê) em vez de criar um 'blob' na superfície visível.",
      whyAdjust:
        "A parede externa é a 'cara' da peça. Qualquer caroço (blob) no início do perímetro fica visível para sempre. Limpar o bico ANTES, na parede interna, transfere o defeito para um lugar invisível.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Bico limpa na parede interna antes da externa", "Peças com alta qualidade visual"],
          ["Desativado", "Bico inicia a parede externa diretamente", "Peças estruturais, máxima velocidade"],
        ],
      },
      influences:
        "Qualidade visual da parede externa, tempo de impressão (movimento extra) e quantidade de blobs no início de cada perímetro.",
      influencesList: [
        "Peças estéticas (figuras, vasos) → Ativar",
        "Peças estruturais → Pode desativar",
        "PLA/PETG se beneficiam (reduzem stringing)",
        "ABS pode dispensar (velocidade > estética)",
      ],
      generates:
        "Ativado gera paredes externas sem blobs visíveis no início do perímetro; desativado gera economia de tempo com possíveis caroços visíveis.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["Ativado", "Parede externa lisa, sem blobs", "Peças visíveis, estéticas"],
          ["Desativado", "Possíveis blobs na parede externa", "Protótipos, peças estruturais"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Costura (Seam)", "Limpeza ocorre antes da costura", "Manter ativado p/ costura limpa"],
          ["Wipe Distance", "Define o tamanho da limpeza", "Ajustar se aparecer marca"],
          ["Retração", "Reduz excesso na costura", "Combinar com a limpeza"],
          ["Velocidade parede externa", "Deve ser lenta", "40–60 mm/s"],
        ],
      },
      howTo: [
        { step: "1. Prepare", path: "Aba Prepare", desc: "OrcaSlicer 2.4." },
        { step: "2. Qualidade", path: "Processo › Qualidade", desc: "Expandir o grupo." },
        { step: "3. Checkbox", path: "Limpeza antes da volta externa", desc: "Marcar ou desmarcar." },
      ],
      example: {
        piece: "Busto decorativo em PLA",
        config: "Limpeza ativada · Velocidade externa 50 mm/s",
        result: "Superfície lisa, sem imperfeições no início dos perímetros.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Blobs na parede externa", "Limpeza desativada", "Ativar limpeza"],
          ["Tempo de impressão alto demais", "Limpeza ativada desnecessariamente", "Desativar p/ peças estruturais"],
          ["Costura ainda com excesso", "Limpeza insuficiente", "Aumentar Wipe Distance"],
        ],
      },
      goldenRule:
        "Ative a limpeza para peças bonitas. Desative para peças rápidas. A parede externa merece o cuidado extra.",
      summaryTable: {
        headers: ["Tipo de peça", "Limpeza", "Motivo"],
        rows: [
          ["Estética, decorativa", "Ativado", "Superfície perfeita"],
          ["Estrutural, funcional", "Desativado", "Velocidade"],
          ["Protótipo visual", "Ativado", "Avaliar estética"],
          ["Protótipo funcional", "Desativado", "Avaliar forma"],
        ],
      },
    },

    // ───────────── MÓDULO 2: PRECISÃO ─────────────
    {
      name: "Precisão › Raio de fechamento de vãos de fatiamento",
      value: "0,049 mm",
      whatIs:
        "Distância máxima que o fatiador considera como 'vão' entre duas linhas. Se o espaço entre paredes é MENOR que este valor, o Orca une as paredes automaticamente, preenchendo o gap. Acima do valor, o gap é preservado.",
      whyAdjust:
        "Modelos STL têm imperfeições microscópicas: paredes que deveriam tocar não tocam, contornos não fecham. Este parâmetro decide até que tamanho de 'buraquinho' o Orca silenciosamente conserta — sem isso, peças mostram lacunas estranhas; com valor alto demais, detalhes finos somem.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0,02 mm", "Fechamento mínimo", "Modelos STEP precisos, detalhes finos"],
          ["0,049 mm — PADRÃO", "Equilíbrio", "Uso geral"],
          ["0,08–0,10 mm", "Fechamento agressivo", "Modelos com imperfeições, peças grandes"],
        ],
      },
      influences:
        "Qualidade do modelo (STEP vs STL), tamanho dos detalhes finos, dimensão da peça e tipo de geometria.",
      influencesList: [
        "STEP/CAD limpo → valor baixo",
        "STL/mesh com falhas → valor mais alto",
        "Textos e letras pequenas → valor baixo (preserva traços)",
        "Paredes finas próximas → valor baixo (evita unir)",
        "Peças grandes/orgânicas → valor alto",
      ],
      generates:
        "Valor baixo preserva todos os detalhes mas pode deixar lacunas microscópicas; valor alto fecha os gaps mas pode unir paredes/letras que deveriam ficar separadas.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["0,02 mm", "Detalhes preservados, possíveis lacunas", "Modelos perfeitos, peças pequenas"],
          ["0,049 mm", "Bom equilíbrio, sem lacunas", "Uso geral"],
          ["0,10 mm", "Preenche espaços, detalhes podem sumir", "Modelos com imperfeições"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Resolução", "Ambos controlam precisão", "Manter proporcionais"],
          ["Parede precisa", "Trabalha em conjunto", "Ativar ambos p/ precisão dimensional"],
          ["Largura da linha", "Define o gap mínimo natural", "Aumentar se ainda houver lacunas"],
        ],
      },
      howTo: [
        { step: "1. Prepare", path: "Aba Prepare", desc: "OrcaSlicer 2.4." },
        { step: "2. Qualidade › Precisão", path: "Processo › Qualidade › Precisão", desc: "Expandir o grupo." },
        { step: "3. Campo dedicado", path: "Raio de fechamento de vãos", desc: "Ex.: 0,049 mm." },
      ],
      example: {
        piece: "Placa com letras em relevo de 2 mm",
        config: "Raio de fechamento 0,02 mm",
        result: "Letras nítidas e bem separadas, sem traços preenchidos.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Lacunas entre paredes", "Valor muito baixo", "Subir para 0,08–0,10 mm"],
          ["Detalhes finos sumindo", "Valor muito alto", "Reduzir para 0,02–0,03 mm"],
          ["Textos ilegíveis", "Valor muito alto", "Reduzir significativamente"],
          ["Paredes próximas unidas", "Valor muito alto", "Reduzir para 0,03–0,04 mm"],
        ],
      },
      goldenRule:
        "0,049 mm para a maioria. Aumente se houver lacunas. Diminua se detalhes sumirem.",
      summaryTable: {
        headers: ["Tipo de peça", "Valor", "Motivo"],
        rows: [
          ["Textos, detalhes finos", "0,02–0,03 mm", "Preserva detalhes"],
          ["Uso geral", "0,049 mm", "Equilíbrio"],
          ["Peças grandes/orgânicas", "0,08–0,10 mm", "Preenche imperfeições"],
          ["Paredes finas próximas", "0,03–0,04 mm", "Evita unir"],
        ],
      },
    },
    {
      name: "Precisão › Resolução",
      value: "0,012 mm",
      whatIs:
        "Distância mínima entre dois pontos consecutivos que o fatiador considera ao caminhar sobre a malha. Mais baixo = mais pontos preservados = curvas mais suaves; mais alto = menos pontos = G-code menor e mais leve.",
      whyAdjust:
        "Controla quanto detalhe da malha sobrevive ao fatiamento. Resoluções muito baixas geram arquivos enormes que travam impressoras; muito altas geram curvas poligonais visíveis.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0,005 mm", "Máxima precisão, G-code grande", "Joias, miniaturas com curvas complexas"],
          ["0,012 mm — PADRÃO", "Equilíbrio detalhe × tamanho", "Uso geral"],
          ["0,025 mm", "Menos precisão, G-code leve", "Peças grandes e simples"],
          ["0,050 mm", "Baixa precisão", "Protótipos rápidos"],
        ],
      },
      influences:
        "Suavidade de curvas, tamanho do G-code, tempo de fatiamento e tempo de processamento na impressora.",
      influencesList: [
        "Curvas complexas → resolução baixa",
        "Superfícies planas → resolução alta tolerada",
        "Peças pequenas → resolução baixa (detalhes críticos)",
        "Peças grandes → resolução alta (detalhes diluídos)",
      ],
      generates:
        "Resolução baixa gera curvas perfeitas mas arquivos pesados; resolução alta gera arquivos leves com possíveis 'facetas' visíveis.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["0,005 mm", "Curvas perfeitamente suaves", "Joias, miniaturas"],
          ["0,012 mm", "Curvas boas, detalhes nítidos", "Uso geral"],
          ["0,025 mm", "Curvas com ligeiros degraus", "Peças grandes"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Raio de fechamento", "Ambos controlam precisão", "Manter equilibrados"],
          ["Altura da camada", "Resolução < altura", "Resolução ≈ 5–10% da altura"],
          ["Ajuste de arco", "Substitui necessidade de res. baixa", "Ativar p/ curvas"],
        ],
      },
      howTo: [
        { step: "1. Prepare", path: "Aba Prepare", desc: "OrcaSlicer 2.4." },
        { step: "2. Qualidade › Precisão", path: "Processo › Qualidade › Precisão", desc: "Expandir." },
        { step: "3. Resolução", path: "Campo Resolução", desc: "Ex.: 0,012 mm." },
      ],
      example: {
        piece: "Anel decorativo com curvas complexas",
        config: "Resolução 0,005 mm",
        result: "Curvas perfeitamente suaves, sem facetas visíveis.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Curvas com degraus", "Resolução muito alta", "Reduzir para 0,008–0,012 mm"],
          ["G-code enorme", "Resolução muito baixa", "Subir para 0,015–0,025 mm"],
          ["Fatiamento lento", "Resolução muito baixa", "Subir para 0,015 mm"],
          ["Detalhes perdidos", "Resolução muito alta", "Reduzir para 0,008 mm"],
        ],
      },
      goldenRule:
        "0,012 mm para a maioria. 0,005 mm para curvas perfeitas. 0,025 mm para peças simples.",
      summaryTable: {
        headers: ["Tipo de peça", "Valor", "Motivo"],
        rows: [
          ["Joias, miniaturas", "0,005–0,008 mm", "Curvas perfeitas"],
          ["Uso geral", "0,012 mm", "Equilíbrio"],
          ["Peças grandes simples", "0,025 mm", "Economia de processamento"],
          ["Protótipos rápidos", "0,050 mm", "Velocidade máxima"],
        ],
      },
    },
    {
      name: "Precisão › Ajuste de arco (Arc fitting)",
      value: "Checkbox",
      whatIs:
        "Função que converte sequências de muitos segmentos retos (G1) em comandos de arco (G2/G3). O Orca identifica trechos curvos e os substitui por um único comando matemático de arco, reduzindo o G-code em até 90% nas partes curvas.",
      whyAdjust:
        "Sem Arc Fitting, uma circunferência vira centenas de pequenos G1 — arquivos enormes, processamento pesado, e em altas velocidades a impressora 'engasga' entre segmentos. Com Arc Fitting, vira 1 ou 2 comandos G2/G3 fluidos.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Converte segmentos em arcos G2/G3", "Peças com curvas, firmwares modernos"],
          ["Desativado", "Mantém somente G1", "Peças angulares ou firmware antigo sem G2/G3"],
        ],
      },
      influences:
        "Tamanho do G-code, suavidade das curvas em alta velocidade, compatibilidade com firmware e fluidez do movimento.",
      influencesList: [
        "Peças curvas → ativar (até 90% menos G-code)",
        "Peças angulares → indiferente",
        "Firmware moderno (Marlin 2+, Klipper) → suporta G2/G3",
        "Firmware antigo → testar antes de ativar",
      ],
      generates:
        "Ativado gera arquivos pequenos, curvas suaves e movimentos fluidos; desativado gera arquivos pesados com possível 'engasgo' em curvas a alta velocidade.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["Ativado", "Curvas suaves, arquivo pequeno", "Vasos, figuras, peças orgânicas"],
          ["Desativado", "Curvas poligonais, arquivo grande", "Caixas, peças angulares"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Resolução", "Arc Fitting substitui necessidade de res. baixa", "Usar resolução padrão"],
          ["Velocidade", "G2/G3 mantém fluidez em altas velocidades", "Permite imprimir mais rápido"],
        ],
      },
      howTo: [
        { step: "1. Prepare", path: "Aba Prepare", desc: "OrcaSlicer 2.4." },
        { step: "2. Qualidade › Precisão", path: "Processo › Qualidade › Precisão", desc: "Expandir." },
        { step: "3. Checkbox", path: "Ajuste de arco (Arc fitting)", desc: "Marcar para ativar." },
      ],
      example: {
        piece: "Vaso cilíndrico decorativo",
        config: "Arc fitting ativado",
        result: "G-code reduziu de 2 MB para 200 KB; curvas perfeitamente suaves.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Curvas com degraus", "Arc fitting desativado", "Ativar"],
          ["G-code muito grande", "Arc fitting desativado", "Ativar"],
          ["Impressora trava em curvas", "Firmware sem suporte a G2/G3", "Desativar ou atualizar firmware"],
        ],
      },
      goldenRule:
        "Ative Arc fitting para peças com curvas. Desative se o firmware não suportar G2/G3.",
      summaryTable: {
        headers: ["Tipo de peça", "Arc Fitting", "Motivo"],
        rows: [
          ["Vasos, curvas", "Ativado", "Suavidade + arquivo pequeno"],
          ["Caixas, angulares", "Indiferente", "Sem efeito prático"],
          ["Figuras orgânicas", "Ativado", "Curvas complexas"],
          ["Peças mecânicas", "Indiferente", "Geometria simples"],
        ],
      },
    },
    {
      name: "Precisão › Compensação de furos XY",
      value: "0 mm",
      whatIs:
        "Ajuste dimensional aplicado APENAS a furos internos (contornos fechados internos). Em FDM, furos sempre saem MENORES que o CAD por dois motivos físicos: contração do plástico ao esfriar + trajetória circular que puxa o filete para dentro. Esta compensação 'engorda' o furo no G-code para compensar.",
      whyAdjust:
        "Sem compensação, um furo CAD de 3,0 mm imprime tipicamente 2,80–2,90 mm — parafuso M3 não entra. Com compensação positiva, o furo sai exatamente no diâmetro projetado.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0 mm", "Sem compensação", "Peças sem furos ou tolerâncias largas"],
          ["+0,05 mm", "Pequena compensação", "Furos até 5 mm em PLA"],
          ["+0,10 mm", "Média compensação", "Furos 5–10 mm, padrão p/ encaixes"],
          ["+0,15–0,20 mm", "Grande compensação", "Furos grandes, ABS, Nylon"],
        ],
      },
      influences:
        "Diâmetro real do furo, encaixe de parafusos/pinos/eixos e qualidade do encaixe mecânico.",
      influencesList: [
        "Diâmetro do furo: quanto maior, mais compensação",
        "Material: PLA pouco; ABS/Nylon muito",
        "Temperatura: mais quente = mais contração = mais compensação",
        "Altura da camada: camadas grossas pedem mais compensação",
      ],
      generates:
        "Compensação correta gera encaixes precisos; insuficiente gera parafuso travado; excessiva gera furo solto.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["Sem compensação", "Furos menores que o CAD", "Peças sem encaixe"],
          ["Compensação adequada", "Furo no diâmetro exato", "Parafusos, pinos"],
          ["Compensação excessiva", "Furo maior que o CAD", "Peças com folga proposital"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Compensação de contornos XY", "Complementar (contornos externos)", "Manter equilibrado"],
          ["Fluxo (Flow)", "Afeta o tamanho final", "Calibrar fluxo PRIMEIRO"],
          ["Pressure Advance", "Reduz arredondamento", "Calibrar PA antes da compensação"],
        ],
      },
      howTo: [
        { step: "1. Calibrar Flow e PA primeiro", path: "Calibration › Flow / PA", desc: "Sem isso, qualquer compensação é chute." },
        { step: "2. Prepare", path: "Aba Prepare", desc: "OrcaSlicer 2.4." },
        { step: "3. Qualidade › Precisão", path: "Processo › Qualidade › Precisão", desc: "Expandir." },
        { step: "4. Campo dedicado", path: "Compensação de furos XY", desc: "Começar em +0,05 mm e ajustar." },
      ],
      example: {
        piece: "Tampa de caixa com furos M3 (CAD 3,0 mm)",
        config: "Compensação +0,10 mm em PLA",
        result: "Furo impresso ≈ 3,05 mm; parafuso M3 entra com firmeza.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Parafuso não entra", "Compensação insuficiente", "Aumentar +0,05 mm"],
          ["Parafuso solto", "Compensação excessiva", "Reduzir −0,05 mm"],
          ["Furo ovalizado", "Não é compensação", "Verificar fluxo, PA, vibração"],
        ],
      },
      goldenRule:
        "Furos sempre saem menores. +0,05 mm para furos pequenos, +0,10 mm para furos médios. Teste e ajuste.",
      summaryTable: {
        title: "Compensação por diâmetro × material",
        headers: ["Diâmetro", "PLA", "PETG", "ABS", "Nylon"],
        rows: [
          ["2–5 mm", "+0,05", "+0,08", "+0,10", "+0,15"],
          ["5–10 mm", "+0,08", "+0,12", "+0,15", "+0,20"],
          ["10–20 mm", "+0,10", "+0,15", "+0,20", "+0,25"],
        ],
      },
    },
    {
      name: "Precisão › Compensação de contornos XY",
      value: "0 mm",
      whatIs:
        "Ajuste dimensional aplicado ao contorno EXTERNO da peça. Positivo aumenta as dimensões externas; negativo reduz. Espelha a compensação de furos, mas para o perímetro externo.",
      whyAdjust:
        "Encaixes do tipo 'peça dentro de outra peça' exigem folga (negativo) ou aperto (positivo). Em vez de mexer no CAD, ajusta-se aqui.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0 mm", "Sem compensação", "Peças isoladas, sem encaixe"],
          ["−0,05 mm", "Peça levemente menor", "Encaixes justos (press-fit leve)"],
          ["−0,10 mm", "Peça menor", "Encaixes deslizantes precisos"],
          ["+0,05 mm", "Peça levemente maior", "Compensa peça que saiu pequena"],
        ],
      },
      influences:
        "Tamanho externo da peça, qualidade de encaixes macho-fêmea e tolerâncias mecânicas.",
      generates:
        "Compensação negativa gera peças que encaixam dentro de outras; positiva gera peças que ganham dimensão para compensar contração.",
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Compensação de furos XY", "Espelham-se", "Ajustar em conjunto"],
          ["Compensação de pé de elefante", "Atua só na base", "Combinar p/ encaixes na base"],
        ],
      },
      howTo: [
        { step: "1. Qualidade › Precisão", path: "Processo › Qualidade › Precisão", desc: "Expandir." },
        { step: "2. Campo dedicado", path: "Compensação de contornos XY", desc: "Ex.: −0,05 mm p/ encaixe justo." },
      ],
      goldenRule:
        "Para encaixes, use −0,05 mm. Para folgas, use +0,05 mm. Teste em peça pequena antes da peça final.",
    },
    {
      name: "Precisão › Compensação de pé de elefante",
      value: "0,1 mm",
      whatIs:
        "Reduz o tamanho da PRIMEIRA camada (e opcionalmente as próximas) para eliminar o 'pé de elefante' — alargamento da base causado pelo plástico esmagado contra a mesa quente.",
      whyAdjust:
        "Sem compensação, a base da peça fica visivelmente mais larga que o resto, prejudicando encaixes que apoiam na mesa (ex.: pé de prateleira, base de cubo de calibração).",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0 mm", "Sem compensação", "Peças pequenas ou já dimensionadas no CAD"],
          ["0,1 mm — PADRÃO", "Compensação leve", "Uso geral"],
          ["0,2 mm", "Compensação média", "Peças grandes, ABS"],
          ["0,3 mm", "Compensação alta", "Peças muito grandes, materiais que contraem"],
        ],
      },
      influences:
        "Largura real da base da peça, qualidade de encaixes apoiados na base e precisão dimensional na primeira camada.",
      influencesList: [
        "Temperatura da mesa: mais quente = mais pé de elefante",
        "Altura da primeira camada: mais grossa = mais esmagamento",
        "Largura da primeira camada: mais larga = mais alargamento",
        "Z-Offset baixo = mais esmagamento",
      ],
      generates:
        "Compensação correta gera base no diâmetro exato do CAD; excessiva gera base levemente menor (cantos arredondados na base).",
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Altura 1ª camada", "Mais grossa = mais pé", "Reduzir altura OU subir compensação"],
          ["T° mesa", "Mais quente = mais pé", "PLA 60 °C; reduzir se exagerar"],
          ["Z-Offset", "Mais baixo = mais pé", "Calibrar antes"],
        ],
      },
      howTo: [
        { step: "1. Qualidade › Precisão", path: "Processo › Qualidade › Precisão", desc: "Expandir." },
        { step: "2. Campo dedicado", path: "Compensação de pé de elefante", desc: "Ex.: 0,1 mm." },
      ],
      goldenRule:
        "O pé de elefante é o inimigo dos encaixes na base. Use 0,1 mm para a maioria das peças.",
    },
    {
      name: "Precisão › Densidade das camadas do pé de elefante",
      value: "100%",
      whatIs:
        "Define em quantas camadas a compensação do pé de elefante é DISTRIBUÍDA. 100% aplica tudo na primeira camada (mudança abrupta); valores menores espalham a correção por várias camadas (transição suave).",
      whyAdjust:
        "Compensação total na primeira camada cria um 'degrau' visível entre a 1ª camada e a 2ª. Distribuir por mais camadas suaviza a transição.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["100% — PADRÃO", "Toda a compensação na primeira camada"],
          ["50%", "Compensação dividida em 2 camadas (transição suave)"],
          ["33%", "Compensação dividida em 3 camadas (transição muito suave)"],
        ],
      },
      influences:
        "Visibilidade da transição entre base e corpo da peça e suavidade da compensação.",
      generates:
        "100% gera correção total mas com 'degrau' visível; valores menores geram base ligeiramente afunilada de forma suave.",
      goldenRule:
        "100% basta na maioria. Reduza apenas se o degrau de compensação ficar visível.",
    },
    {
      name: "Precisão › Camadas de compensação de pé de elefante",
      value: "Checkbox",
      whatIs:
        "Toggle que define se a compensação atua APENAS na primeira camada ou se também é aplicada nas próximas camadas até o efeito sumir naturalmente.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Compensação em múltiplas camadas (atenuação progressiva)"],
          ["Desativado", "Compensação somente na primeira camada"],
        ],
      },
      influences:
        "Suavidade da transição entre base e corpo e visibilidade da correção.",
      generates:
        "Ativado gera base suavemente afunilada (invisível); desativado gera correção concentrada com possível 'degrau'.",
      goldenRule:
        "Ative em peças onde a base e a 2ª camada precisam de transição invisível.",
    },
    {
      name: "Precisão › Parede precisa",
      value: "Checkbox",
      whatIs:
        "Força o Orca a recalcular o FLUXO de cada parede individualmente para garantir que a largura final seja EXATAMENTE a configurada. Sacrifica fluxo constante em troca de precisão dimensional.",
      whyAdjust:
        "Sem este recurso, o Orca tolera pequenas variações de largura para manter o fluxo constante. Em peças com tolerâncias críticas (encaixes, engrenagens), essas variações estragam o encaixe.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Largura exata, fluxo variável", "Peças com tolerância crítica"],
          ["Desativado", "Largura aproximada, fluxo constante", "Uso geral, peças estéticas"],
        ],
      },
      influences:
        "Precisão dimensional das paredes, consistência do fluxo e qualidade visual (pequenas variações de brilho onde o fluxo muda).",
      generates:
        "Ativado gera paredes com largura exata mas pequenas variações visuais; desativado gera paredes visualmente uniformes mas dimensionalmente aproximadas.",
      goldenRule:
        "Ative para peças com encaixes precisos. Desative para peças estéticas.",
    },
    {
      name: "Precisão › Altura Z precisa",
      value: "Checkbox",
      whatIs:
        "Garante que a altura TOTAL da peça seja exatamente a definida no CAD, ajustando a espessura da ÚLTIMA camada para 'fechar' a altura exata. Sem isso, a altura final é arredondada ao múltiplo da altura de camada.",
      whyAdjust:
        "Projete 10,05 mm com camadas de 0,2 mm — sem Altura Z Precisa, o Orca arredonda para 10,00 ou 10,20. Com o recurso ativo, a última camada vira 0,25 mm para fechar exato.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Altura final exatamente igual ao CAD"],
          ["Desativado", "Altura final arredondada ao múltiplo da camada"],
        ],
      },
      influences:
        "Precisão dimensional em Z, encaixes verticais e empilhamento de peças.",
      generates:
        "Ativado gera altura final precisa com possível variação visual na última camada; desativado gera altura ligeiramente diferente do CAD.",
      goldenRule:
        "Ative em peças que precisam encaixar verticalmente ou empilhar com precisão.",
    },
    {
      name: "Precisão › Converter furos em polifuros",
      value: "Checkbox",
      whatIs:
        "Transforma furos CIRCULARES em POLÍGONOS (hexágonos, octógonos) no G-code. Como FDM produz furos menores que o CAD, um polígono ligeiramente maior 'inscrito' compensa esse erro, gerando furos finais mais precisos dimensionalmente.",
      whyAdjust:
        "É uma alternativa elegante à Compensação de Furos XY: em vez de engordar o círculo, redesenha como polígono. Funciona melhor em furos pequenos para parafusos.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Furos viram polígonos (mais precisos)", "Furos p/ parafusos, pinos"],
          ["Desativado", "Furos circulares normais", "Furos estéticos visíveis"],
        ],
      },
      influences:
        "Precisão dimensional de furos pequenos e aparência visual interna do furo.",
      generates:
        "Ativado gera furos com diâmetro mais próximo do CAD (paredes ligeiramente facetadas); desativado gera furos circulares com diâmetro menor.",
      goldenRule:
        "Ative para furos de parafuso. Desative para furos estéticos visíveis.",
    },

    // ───────────── MÓDULO 3: ALISAMENTO (IRONING) ─────────────
    {
      name: "Alisamento › Tipo de Alisamento",
      value: "Dropdown",
      whatIs:
        "Define ONDE o Orca aplica o Ironing — passada extra do bico quente sem (ou quase sem) extrusão, derretendo as micro-rugosidades da superfície e preenchendo vales entre linhas. Cria acabamento espelhado.",
      whyAdjust:
        "Topo de uma peça FDM nunca é perfeitamente liso — há sulcos entre passadas. Ironing 'derrete e nivela' esses sulcos, transformando o topo em uma superfície quase polida. Custo: tempo extra significativo no topo.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Desativado", "Sem alisamento", "Peças estruturais, economia de tempo"],
          ["Top surfaces", "Apenas o último topo da peça", "Padrão — peças com topo visível"],
          ["All solid surfaces", "Todas as superfícies sólidas", "Peças com várias faces planas"],
          ["All surfaces", "Tudo, incluindo bases sólidas internas", "Casos especiais, peças pequenas"],
        ],
      },
      influences:
        "Acabamento visual do topo (espelhado vs sulcado), tempo de impressão (Ironing dobra o tempo do topo) e consumo extra de filamento (Ironing Flow > 0).",
      influencesList: [
        "Material: PLA aliasa muito bem; PETG razoável; ABS difícil",
        "Largura da linha do topo: menor = melhor base p/ Ironing",
        "Velocidade do Ironing: 20–30 mm/s típico",
        "Ironing Flow: 10–15% (apenas o suficiente p/ preencher sulcos)",
      ],
      generates:
        "Top surfaces gera topo quase espelhado; All surfaces gera tempo de impressão muito maior em troca de acabamento total.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["Desativado", "Topo com sulcos visíveis", "Estruturais"],
          ["Top surfaces", "Topo liso, brilhante", "Padrão estético"],
          ["All solid surfaces", "Todas as faces sólidas alisadas", "Peças multi-face"],
          ["All surfaces", "Tudo alisado (muito lento)", "Casos especiais"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Largura linha topo", "Menor = melhor Ironing", "0,35–0,42 mm"],
          ["Ironing Flow", "Excesso causa caroços", "10–15%"],
          ["Velocidade Ironing", "Alta = ineficaz", "20–30 mm/s"],
          ["Ironing Spacing", "Espaçamento entre passadas", "0,10–0,15 mm"],
        ],
      },
      howTo: [
        { step: "1. Prepare", path: "Aba Prepare", desc: "OrcaSlicer 2.4." },
        { step: "2. Qualidade › Alisamento", path: "Processo › Qualidade › Alisamento", desc: "Expandir." },
        { step: "3. Tipo", path: "Dropdown Tipo de Alisamento", desc: "Selecionar 'Top surfaces' como padrão." },
      ],
      example: {
        piece: "Tampa de caixa em PLA",
        config: "Top surfaces · Flow 12% · 25 mm/s · Spacing 0,12 mm",
        result: "Topo com brilho quase espelhado, sem sulcos visíveis.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Caroços no topo", "Ironing Flow alto demais", "Reduzir para 10%"],
          ["Topo ainda com sulcos", "Spacing largo demais", "Reduzir para 0,10 mm"],
          ["Topo queimado", "Velocidade muito baixa", "Subir para 25 mm/s"],
          ["Tempo total dobrou", "All surfaces selecionado", "Voltar para Top surfaces"],
        ],
      },
      goldenRule:
        "Use 'Top surfaces' para a maioria das peças. Desative para economizar tempo. 'All surfaces' só em casos especiais.",
    },
    {
      name: "Alisamento › Contorno em Z",
      value: "Checkbox (experimental)",
      whatIs:
        "Recurso EXPERIMENTAL que aplica Ironing acompanhando a CURVATURA da superfície em Z — alisa topos curvos (calotas, cúpulas) seguindo o ângulo da superfície. Sem isso, Ironing só funciona em topos planos.",
      whyAdjust:
        "Topos curvos (esferas, domos) ficam sempre 'escamados' porque cada camada tem topo planar diferente. Z Contour acompanha a curva, alisando como se fosse uma superfície contínua.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Desativado", "Ironing só em topos planos"],
          ["Ativado", "Ironing acompanha curvas em Z (experimental)"],
        ],
      },
      influences:
        "Acabamento de topos curvos, tempo de impressão extra e estabilidade do recurso (ainda em beta).",
      generates:
        "Ativado gera topos curvos alisados pela primeira vez no Orca; desativado deixa topos curvos com 'escamas' de camadas.",
      goldenRule:
        "Mantenha desativado por padrão (experimental). Ative apenas se a peça tiver topo curvo crítico.",
    },
    {
      name: "Alisamento › Contorno em Z habilitado",
      value: "Checkbox",
      whatIs:
        "Habilita efetivamente o motor de Z Contour para processar as superfícies. É o 'liga/desliga' interno que controla se o Orca calcula o caminho curvo do Ironing. Funciona em conjunto com o checkbox anterior.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Motor de Z Contour calcula caminhos curvos"],
          ["Desativado", "Motor desligado, Z Contour não atua mesmo se marcado acima"],
        ],
      },
      influences:
        "Funcionamento efetivo do Z Contour e tempo de processamento do fatiamento.",
      generates:
        "Ativado gera Ironing curvo funcional; desativado anula qualquer configuração de Z Contour.",
      goldenRule:
        "Ative em conjunto com 'Contorno em Z' quando quiser alisar topos curvos.",
    },
  ],
};
