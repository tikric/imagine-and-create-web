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

  // ====================================================================
  // TELA 13 — RESISTÊNCIA (Gerador de paredes · Paredes/Superfícies · Pontes)
  // ====================================================================
  "tela-13-resistencia-gerador-paredes": [
    // ───────────── MÓDULO 1: GERADOR DE PAREDES ─────────────
    {
      name: "Gerador de paredes",
      value: "Clássico | Arachne",
      whatIs:
        "Algoritmo que o OrcaSlicer usa para gerar as trajetórias das paredes. Clássico desenha com largura de linha fixa (como um pincel de tamanho único); Arachne ajusta a largura dinamicamente para preencher qualquer espaço (como um pincel que muda de tamanho).",
      whyAdjust:
        "Define a qualidade das paredes, a precisão dos detalhes finos, a resistência estrutural e o tempo de impressão. É a decisão fundamental de como a peça será 'desenhada' camada a camada.",
      optionsTable: {
        headers: ["Opção", "Descrição", "Melhor para"],
        rows: [
          ["Clássico (Classic)", "Largura de linha fixa, caminhos constantes e previsíveis", "Peças simples, estruturais, furos com dimensão precisa"],
          ["Arachne", "Largura de linha variável, adapta-se ao espaço disponível", "Detalhes finos, textos em relevo, engrenagens, paredes <1mm"],
        ],
      },
      influences:
        "Espessura mínima de paredes preenchíveis, qualidade de detalhes finos, previsibilidade dimensional, velocidade de fatiamento e visual da parede.",
      influencesList: [
        "Espessura das paredes: Clássico falha em paredes < largura do bico; Arachne ajusta",
        "Detalhes finos: Clássico deixa lacunas em textos; Arachne preenche tudo",
        "Previsibilidade: Clássico = caminhos sempre iguais; Arachne = caminhos variam",
        "Velocidade: Clássico geralmente mais rápido; Arachne mais lento em geometria complexa",
        "Visual: Clássico uniforme com possíveis lacunas; Arachne sem lacunas mas largura variável",
      ],
      generates:
        "Clássico produz paredes uniformes mas pode deixar lacunas finas; Arachne elimina lacunas mas pode mostrar variação de largura.",
      generatesTable: {
        headers: ["Configuração", "Resultado visual", "Quando usar"],
        rows: [
          ["Clássico", "Paredes uniformes, possíveis lacunas em paredes finas", "Peças simples, estruturas, furos precisos"],
          ["Arachne", "Paredes sem lacunas, largura variável visível", "Peças detalhadas, textos, miniaturas"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação com Gerador", "Ajuste recomendado"],
        rows: [
          ["Largura da linha", "Arachne substitui dinamicamente", "Manter valores padrão"],
          ["Parede precisa", "Funciona com ambos", "Ativar para Arachne"],
          ["Evitar atravessar paredes", "Funciona com ambos", "Ativar para qualidade"],
        ],
      },
      howTo: [
        { step: "1", path: "Aba Prepare", desc: "Abra o OrcaSlicer 2.4 na aba Prepare" },
        { step: "2", path: "Resistência › Gerador de paredes", desc: "Expanda no painel esquerdo" },
        { step: "3", path: "Gerador de paredes", desc: "Escolha Clássico ou Arachne" },
      ],
      example: {
        piece: "Chaveiro com nome em relevo de 1mm",
        config: "Arachne",
        result: "Letras perfeitas, sem lacunas, totalmente preenchidas",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Lacunas em paredes finas", "Clássico com paredes <0.4mm", "Mudar para Arachne"],
          ["Textos ilegíveis", "Clássico não preenche letras finas", "Mudar para Arachne"],
          ["Largura inconsistente", "Arachne em peça simples", "Mudar para Clássico"],
          ["Fatiamento lento", "Arachne em peça complexa", "Aceitar ou usar Clássico"],
        ],
      },
      goldenRule:
        "Arachne para detalhes, textos e paredes finas. Clássico para estruturas simples e previsíveis. A escolha certa elimina lacunas.",
      summaryTable: {
        title: "Decisão rápida por tipo de peça",
        headers: ["Tipo de peça", "Gerador", "Motivo"],
        rows: [
          ["Textos, logotipos", "Arachne", "Preenche letras finas"],
          ["Miniaturas", "Arachne", "Detalhes complexos"],
          ["Engrenagens", "Arachne", "Dentes precisos sem lacunas"],
          ["Caixas, estruturas", "Clássico", "Previsível"],
          ["Paredes <1mm", "Arachne", "Evita lacunas"],
          ["Furos precisos", "Clássico", "Dimensões controladas"],
        ],
      },
    },

    // ───────────── MÓDULO 2: PAREDES E SUPERFÍCIES ─────────────
    {
      name: "Ordem de impressão das paredes",
      value: "Interior/Exterior (padrão)",
      whatIs:
        "Define a sequência em que paredes externas e internas são impressas. A externa é a superfície visível; a interna dá suporte estrutural. A ordem define qual é priorizada em qualidade e precisão.",
      whyAdjust:
        "Impacta diretamente a qualidade visual (parede externa lisa), a resistência e a precisão dimensional da peça.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Interior/Exterior", "Internas primeiro, externa por último apoiada nelas", "Melhor qualidade visual e dimensional"],
          ["Exterior/Interior", "Externa primeiro, internas reforçam por dentro", "Melhor resistência estrutural"],
          ["Exterior/Interior/Exterior", "Alternado", "Mecanismos com tolerâncias precisas"],
        ],
      },
      influences: "Qualidade visual da parede externa, resistência da peça e precisão dimensional.",
      influencesList: [
        "Visual: Interior/Exterior deixa parede externa mais lisa",
        "Resistência: Exterior/Interior dá melhor ancoragem entre paredes",
        "Precisão: Interior/Exterior produz dimensões mais previsíveis",
      ],
      generates: "Interior/Exterior = peça mais bonita e precisa. Exterior/Interior = peça mais forte.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["Interior/Exterior", "Parede externa lisa e precisa", "Peças estéticas, visíveis"],
          ["Exterior/Interior", "Parede externa menos lisa, mais resistente", "Peças estruturais"],
        ],
      },
      goldenRule: "Interior/Exterior para peças bonitas. Exterior/Interior para peças fortes. A ordem define a prioridade.",
    },
    {
      name: "Preenchimento primeiro",
      value: "Desativado (padrão)",
      whatIs:
        "Faz o preenchimento (infill) ser impresso ANTES das paredes da mesma camada, em vez de depois. Inverte a sequência clássica parede→infill.",
      whyAdjust:
        "Pode reduzir movimentos de deslocamento (travel) e acelerar a impressão em peças com infill denso, ao custo de qualidade nas paredes externas (o infill pode 'empurrar' a parede).",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Infill impresso primeiro", "Peças com infill muito denso, foco em velocidade"],
          ["Desativado", "Paredes impressas primeiro", "Uso geral, melhor qualidade visual"],
        ],
      },
      influences: "Qualidade da parede externa, tempo de impressão e quantidade de travel.",
      generates: "Ativado = mais rápido mas pode marcar a parede; desativado = parede mais limpa.",
      goldenRule: "Desative para qualidade. Ative para velocidade em peças densas.",
    },
    {
      name: "Direção da volta da parede",
      value: "Anti-horário (padrão)",
      whatIs:
        "Define o sentido (horário ou anti-horário) em que o bico percorre cada parede. O sentido afeta como o plástico é 'puxado' e depositado, influenciando a textura final.",
      whyAdjust:
        "Pequenas variações de textura e brilho podem aparecer conforme o sentido; o padrão anti-horário foi calibrado pela equipe do OrcaSlicer.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Anti-horário", "Padrão, melhor visual na maioria das máquinas"],
          ["Horário", "Alternativo, testar caso a parede saia com defeito direcional"],
        ],
      },
      influences: "Textura e direção de eventuais marcas visuais na parede externa.",
      generates: "Mudança sutil na aparência das camadas; raramente perceptível.",
      goldenRule: "Mantenha anti-horário. Inverta apenas se notar artefato direcional consistente.",
    },
    {
      name: "Taxa de fluxo em superfície superior",
      value: "1,00 (padrão)",
      whatIs:
        "Multiplicador aplicado ao fluxo de extrusão APENAS nas camadas que formam a superfície superior visível da peça. Ajuste fino para o acabamento do 'teto'.",
      whyAdjust:
        "A superfície superior é o que o olho vê primeiro. Excesso de fluxo gera bolhas/excesso; pouco fluxo gera lacunas/listras visíveis.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0,90–0,95", "Menos plástico", "Topo com excesso, blobs, sobreposição"],
          ["1,00", "Padrão", "Uso geral, calibração correta"],
          ["1,05–1,10", "Mais plástico", "Topo com lacunas, listras, brilho irregular"],
        ],
      },
      influences: "Aparência do topo: brilho, lacunas, excesso de material, marcas de Ironing.",
      generates: "Topo perfeitamente liso (valor correto) ou com defeitos (valor errado).",
      goldenRule: "1,00 para a maioria. 0,95 se sobrar plástico. 1,05 se faltar plástico.",
    },
    {
      name: "Taxa de fluxo em superfície inferior",
      value: "1,00 (padrão)",
      whatIs:
        "Multiplicador de fluxo aplicado às camadas inferiores (a base da peça que toca a mesa ou primeiras camadas após brim).",
      whyAdjust:
        "A base define adesão e aparência inferior. Excesso causa 'pé de elefante' e sobreposição; falta gera lacunas que comprometem adesão.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0,95", "Menos plástico", "Base com excesso, pé de elefante"],
          ["1,00", "Padrão", "Uso geral"],
          ["1,05", "Mais plástico", "Base com lacunas, má adesão"],
        ],
      },
      influences: "Qualidade da primeira/última camada inferior, adesão e aparência da base.",
      generates: "Base sólida e limpa (correto) ou com defeitos visíveis (errado).",
      goldenRule: "1,00 padrão. Ajuste em ±0,05 conforme a base sai com excesso ou lacuna.",
    },
    {
      name: "Definir outros fluxos",
      value: "Desativado (padrão)",
      whatIs:
        "Habilita o ajuste individual de fluxo para tipos específicos de linha (paredes, infill, suporte etc.) separadamente do fluxo global.",
      whyAdjust:
        "Permite calibração fina por tipo de linha — útil quando uma região específica (ex: infill) sai com excesso enquanto o restante está correto.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Libera campos de fluxo por tipo de linha"],
          ["Desativado", "Usa apenas o fluxo padrão global"],
        ],
      },
      influences: "Granularidade do controle de fluxo na peça.",
      generates: "Calibração mais precisa quando ativado; mais simples quando desativado.",
      goldenRule: "Ative apenas se já calibrou o fluxo global e precisa de ajustes pontuais.",
    },
    {
      name: "Parede única na primeira camada",
      value: "Desativado",
      whatIs:
        "Força a primeira camada a usar APENAS UMA parede ao redor do contorno, em vez do número normal de paredes definido na peça.",
      whyAdjust:
        "Melhora adesão da primeira camada e reduz pé-de-elefante, especialmente em peças com base de detalhe fino.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Uma única parede na primeira camada → melhor adesão, menos pé-de-elefante"],
          ["Desativado", "Número normal de paredes desde a camada 1"],
        ],
      },
      influences: "Adesão à mesa, formação de pé-de-elefante, precisão dimensional da base.",
      generates: "Base mais limpa e bem aderida com o recurso ativo.",
      goldenRule: "Ative para peças com base detalhada ou histórico de pé-de-elefante.",
    },
    {
      name: "Parede única em superfícies superiores",
      value: "Desativado",
      whatIs:
        "Usa apenas UMA parede ao redor das camadas que formam a superfície superior, melhorando o fechamento do topo.",
      whyAdjust:
        "Uma parede única no topo se acomoda melhor sobre o infill, evitando 'pillowing' (deformação por bolhas de ar) e melhorando o acabamento.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Uma parede no topo → topo mais liso"],
          ["Desativado", "Número normal de paredes no topo"],
        ],
      },
      influences: "Acabamento do topo, pillowing, integração com Ironing.",
      generates: "Topo visivelmente mais uniforme quando ativado.",
      goldenRule: "Ative em peças com infill baixo (<25%) e topo visível.",
    },
    {
      name: "Limiar de parede única",
      value: "300% (padrão)",
      whatIs:
        "Espessura máxima (em % da largura da linha) para que uma região seja impressa com UMA ÚNICA parede em vez de duas paredes finas. Acima do limiar, o OrcaSlicer cria duas paredes; abaixo, mantém uma só.",
      whyAdjust:
        "Em paredes muito finas, duas paredes lado a lado podem deixar uma fenda no meio. Uma parede única elimina essa fenda.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["200%", "Apenas paredes muito finas usam linha única", "Peças com detalhes finos isolados"],
          ["300%", "Padrão", "Uso geral"],
          ["400%", "Mais regiões usam linha única", "Peças com muitas paredes finas"],
        ],
      },
      influences: "Existência de fendas em paredes finas, resistência e tempo de impressão.",
      generates: "Paredes finas sólidas sem fenda central quando bem dimensionado.",
      goldenRule: "300% para a maioria. Aumente para peças com muitas regiões finas.",
    },
    {
      name: "Evitar atravessar paredes",
      value: "Desativado (padrão)",
      whatIs:
        "Faz o bico CONTORNAR paredes já impressas durante movimentos de deslocamento (travel), em vez de passar por cima delas.",
      whyAdjust:
        "Quando o bico passa sobre uma parede já impressa, pode raspar, derrubar ou marcar a superfície. Evitar travessias preserva a qualidade.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Bico desvia das paredes → qualidade superior", "Peças com paredes finas, foco em visual"],
          ["Desativado", "Bico atravessa livremente → mais rápido", "Peças robustas, foco em velocidade"],
        ],
      },
      influences: "Qualidade superficial, tempo de impressão, comprimento dos travels.",
      generates: "Paredes sem marcas de raspagem quando ativado; impressão mais rápida quando desativado.",
      goldenRule: "Ative para qualidade. Desative para velocidade. Paredes finas merecem o desvio.",
    },
    {
      name: "Compensação de fluxo de área pequena (beta)",
      value: "Desativado",
      whatIs:
        "Recurso beta que detecta áreas muito pequenas (<1mm²) e reduz automaticamente o fluxo nelas para evitar excesso de plástico/blobs.",
      whyAdjust:
        "Em áreas minúsculas, o tempo de extrusão é tão curto que o fluxo configurado deposita material em excesso. A compensação ajusta para evitar 'blobs'.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Compensação automática em áreas <1mm²"],
          ["Desativado", "Fluxo normal em todas as áreas"],
        ],
      },
      influences: "Qualidade de detalhes finos, formação de blobs em pequenas regiões.",
      generates: "Detalhes finos mais limpos quando ativado.",
      goldenRule: "Ative para peças com detalhes pequenos (miniaturas). Desative em peças grandes.",
    },

    // ───────────── MÓDULO 3: PONTES ─────────────
    {
      name: "Pontes › Taxa de fluxo em ponte",
      value: "1,00 (padrão)",
      whatIs:
        "Multiplicador de fluxo aplicado quando o OrcaSlicer detecta uma PONTE EXTERNA — linha que cruza um vão sem suporte abaixo. Controla quanto plástico é depositado por mm de ponte.",
      whyAdjust:
        "A ponte é esticada entre duas paredes. Excesso = linha pesada que cai/curva; falta = linha fina que rompe. O fluxo correto deixa a ponte tensionada e firme.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0,85–0,90", "Linha mais fina, mais esticada", "Vãos longos (>50mm)"],
          ["0,95–1,00", "Padrão", "Vãos médios (30–50mm)"],
          ["1,00–1,05", "Linha mais grossa, mais reforçada", "Vãos curtos (<30mm)"],
        ],
      },
      influences: "Sucesso da ponte (curva ou estica), aparência inferior, necessidade de suporte.",
      influencesList: [
        "Comprimento do vão: longos pedem fluxo menor; curtos toleram mais",
        "Material: PLA 0,90–1,00 · PETG 0,95–1,00 · ABS 0,85–0,95",
        "Velocidade: fluxo menor com velocidade maior, e vice-versa",
        "Resfriamento: bom cooling permite fluxo normal; cooling fraco exige fluxo menor",
      ],
      generates: "Ponte tensionada e reta (correto) ou ponte caída/rompida (errado).",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["Fluxo 0,85", "Ponte esticada, vãos longos vencidos", "Vãos >50mm"],
          ["Fluxo 1,00", "Ponte sólida padrão", "Vãos 30–50mm"],
          ["Fluxo 1,05", "Ponte reforçada", "Vãos curtos <30mm"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação com Ponte", "Ajuste recomendado"],
        rows: [
          ["Velocidade da ponte", "Inversamente proporcional ao fluxo", "30–50 mm/s"],
          ["Cooling Fan", "Essencial para solidificar rápido", "100% durante pontes"],
          ["Largura da linha › Ponte", "Fluxo × largura definem a corda", "Ajustar em conjunto"],
        ],
      },
      example: {
        piece: "Telhado de uma casinha com vão de 60mm sem suporte",
        config: "Fluxo 0,88 + Cooling 100% + Velocidade 35 mm/s",
        result: "Ponte esticada, reta, sem curvatura — atravessa o vão limpo",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Ponte caída no meio", "Fluxo alto demais", "Reduzir para 0,85–0,90"],
          ["Ponte rompida", "Fluxo baixo demais", "Aumentar para 1,00"],
          ["Linhas separadas na ponte", "Densidade ou largura inadequadas", "Revisar densidade externa"],
        ],
      },
      goldenRule: "0,85 para vãos longos, 1,00 para vãos médios. O fluxo da ponte define se a linha estica ou cai.",
    },
    {
      name: "Pontes › Taxa de fluxo em ponte interna",
      value: "1,00 (padrão)",
      whatIs:
        "Multiplicador de fluxo para PONTES INTERNAS — pontes não visíveis, geralmente formadas sobre infill esparso para apoiar camadas superiores sólidas.",
      whyAdjust:
        "Ponte interna não precisa ser tão estética quanto a externa, mas precisa de estrutura. Ajuste separado permite reforçar internamente sem afetar o visual externo.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0,90", "Mais fina", "Quando há excesso visível por dentro"],
          ["1,00", "Padrão", "Uso geral"],
          ["1,10", "Mais grossa", "Quando topo de infill afunda"],
        ],
      },
      influences: "Solidez da base do topo, pillowing, integração entre infill e top.",
      generates: "Topo mais firme com fluxo correto da ponte interna.",
      goldenRule: "1,00 padrão. Aumente se o topo apresentar pillowing.",
    },
    {
      name: "Pontes › Densidade de ponte externa",
      value: "100% (padrão)",
      whatIs:
        "Define a quantidade de linhas paralelas usadas para formar a PONTE EXTERNA. 100% = linhas encostadas; valores menores = espaçamento entre linhas.",
      whyAdjust:
        "Pontes externas são visíveis — densidade alta dá acabamento sólido. Densidade reduzida economiza tempo/material mas mostra os 'cordões' por baixo.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["100%", "Linhas coladas, ponte sólida", "Qualidade visual"],
          ["75%", "Pequenos espaços", "Compromisso"],
          ["50%", "Linhas bem separadas", "Velocidade extrema"],
        ],
      },
      influences: "Aparência inferior da peça, tempo de impressão, peso.",
      generates: "Superfície inferior sólida (100%) ou listrada (75–50%).",
      goldenRule: "100% para qualidade, 75% para velocidade.",
    },
    {
      name: "Pontes › Densidade de ponte interna",
      value: "100% (padrão)",
      whatIs:
        "Define a densidade das pontes que formam a base de topos sólidos sobre infill esparso. Não é visível externamente.",
      whyAdjust:
        "Densidade interna alta dá base sólida para o topo se acomodar sem pillowing; densidade baixa economiza tempo mas pode comprometer o topo.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["100%", "Base sólida para o topo", "Topo perfeito, padrão"],
          ["75%", "Economia leve", "Peças funcionais sem topo crítico"],
        ],
      },
      influences: "Qualidade do topo, pillowing, integração infill→top.",
      generates: "Topos sem pillowing com 100%.",
      goldenRule: "100% para estruturas e topos visíveis, 75% para economia em peças funcionais.",
    },
    {
      name: "Pontes › Pontes externas grossas",
      value: "Desativado",
      whatIs:
        "Faz as pontes externas usarem linhas mais grossas (largura aumentada) para ganhar resistência e melhor aparência ao atravessar vãos.",
      whyAdjust:
        "Linhas mais grossas suportam melhor o próprio peso ao atravessar o vão, reduzindo a chance de curvatura no meio.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Linhas mais grossas → ponte mais resistente"],
          ["Desativado", "Largura normal"],
        ],
      },
      influences: "Resistência da ponte e aparência inferior.",
      generates: "Pontes mais sólidas com ativado; melhor em vãos longos.",
      goldenRule: "Ative em vãos >40mm ou materiais que cedem (PETG, ABS).",
    },
    {
      name: "Pontes › Pontes internas grossas",
      value: "Desativado",
      whatIs:
        "Equivalente ao anterior, mas para pontes INTERNAS (sobre infill). Aumenta a largura das linhas que formam a base do topo.",
      whyAdjust:
        "Linhas internas mais grossas formam plataforma mais sólida para o topo, eliminando pillowing.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Base interna mais sólida para o topo"],
          ["Desativado", "Largura normal"],
        ],
      },
      influences: "Solidez do topo, pillowing.",
      generates: "Topo mais limpo quando ativado.",
      goldenRule: "Ative se notar pillowing no topo, mesmo com densidade 100%.",
    },
    {
      name: "Pontes › Camadas extras de ponte (beta)",
      value: "Desativado (padrão)",
      whatIs:
        "Imprime CAMADAS ADICIONAIS de ponte sobre uma ponte original, reforçando-a antes de continuar com camadas normais por cima.",
      whyAdjust:
        "Em vãos críticos, uma única camada de ponte pode não suportar bem o peso das camadas superiores. Camadas extras criam uma 'laje' reforçada.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["Desativado", "Apenas a camada de ponte original", "Uso geral"],
          ["1 camada", "Um reforço extra", "Vãos médios críticos"],
          ["2–3 camadas", "Reforço forte", "Vãos longos, peças mecânicas"],
        ],
      },
      influences: "Resistência estrutural das pontes, peso e tempo de impressão.",
      generates: "Pontes muito mais resistentes; impressão mais lenta.",
      goldenRule: "Use 1 camada extra em vãos longos. Não exagere — adiciona tempo significativo.",
    },
    {
      name: "Pontes › Filtrar pontes internas pequenas",
      value: "Filtrar (padrão)",
      whatIs:
        "Remove pontes internas muito pequenas (curtas demais para fazer diferença estrutural), economizando tempo e evitando defeitos em micro-vãos.",
      whyAdjust:
        "Pontes minúsculas raramente são úteis e podem gerar defeitos (blobs, paradas). Filtrá-las simplifica o G-code.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Filtrar", "Remove pontes internas pequenas → mais rápido"],
          ["Não filtrar", "Mantém todas as pontes → mais conservador"],
        ],
      },
      influences: "Tempo de impressão, presença de defeitos em micro-pontes.",
      generates: "Menos blobs em regiões minúsculas com filtragem ativada.",
      goldenRule: "Mantenha filtrado por padrão. Desative se notar buracos onde havia ponte pequena.",
    },
    {
      name: "Pontes › Pontes para furos rebaixados",
      value: "Nenhum (padrão)",
      whatIs:
        "Otimização específica para furos com REBAIXO/CHANFRO (countersunk), onde a ponte precisa começar em uma borda inclinada em vez de uma parede reta.",
      whyAdjust:
        "Furos rebaixados (típicos de parafusos escareados) têm geometria especial. A otimização ajusta a ponte para acompanhar o chanfro.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Nenhum", "Pontes tratadas de forma padrão"],
          ["Automático", "OrcaSlicer detecta e ajusta o padrão da ponte"],
          ["Manual", "Ajuste fino caso a caso"],
        ],
      },
      influences: "Qualidade de furos para parafusos escareados.",
      generates: "Furos rebaixados limpos e prontos para parafuso quando otimizado.",
      goldenRule: "Ative Automático apenas em peças com furos para parafusos escareados.",
    },
  ],

  // ====================================================================
  // TELA 14 — RESISTÊNCIA (Pontes avançadas · Saliências/Overhangs)
  // ====================================================================
  "tela-14-resistencia-ponte-saliencias": [
    // ───────────── MÓDULO 1: PONTES (DETALHAMENTO AVANÇADO) ─────────────
    {
      name: "Limiar de parede única (detalhamento avançado)",
      value: "300% (padrão)",
      whatIs:
        "Espessura máxima de parede (em % da largura da linha) para que ela seja impressa com UMA ÚNICA linha de extrusão em vez de múltiplas paredes. Fórmula: limite_mm = largura_linha × (limiar/100). Ex: 0,42mm × 300% = paredes <1,26mm viram linha única.",
      whyAdjust:
        "Paredes muito finas com múltiplas linhas geram excesso/sobreposição; com linha única podem ficar quebradiças. O limiar equilibra resistência e fidelidade dimensional.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["100%", "Quase nenhuma região vira linha única", "Peças estruturais sólidas"],
          ["200%", "Poucas regiões finas viram linha única", "Peças com poucos detalhes"],
          ["300%", "Padrão", "Uso geral, equilíbrio"],
          ["400%", "Muitas regiões usam linha única", "Peças orgânicas, variações de espessura"],
          ["500%", "Quase todas as paredes finas usam linha única", "Luminárias, peças decorativas/flexíveis"],
        ],
      },
      influences: "Resistência, transparência, excesso de plástico, fidelidade dimensional e tempo de impressão.",
      influencesList: [
        "Espessura: paredes <1mm pedem limiar alto; >2mm pedem limiar baixo",
        "Material: PLA tolera limiar alto; TPU exige limiar baixo (precisa de mais linhas)",
        "Função: estrutural = baixo; decorativa = alto",
        "Visual: linha única pode deixar transparência; múltiplas linhas dão superfície sólida",
        "Velocidade: linha única extrui menos = mais rápido",
      ],
      generates: "Paredes sólidas (limiar baixo) ou paredes finas/transparentes (limiar alto).",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["100–150%", "Paredes sólidas, sem transparência", "Estruturais, resistentes"],
          ["200–300%", "Equilíbrio entre qualidade e leveza", "Uso geral"],
          ["400–500%", "Muitas paredes finas, possível transparência", "Decorativas, leves"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação com Limiar", "Ajuste recomendado"],
        rows: [
          ["Largura da linha", "É a base do cálculo", "Ajustar a largura ANTES do limiar"],
          ["Gerador de paredes", "Arachne ignora o limiar e ajusta dinamicamente", "Arachne anula"],
          ["Parede precisa", "Funciona junto", "Ativar para precisão dimensional"],
          ["Número de paredes", "Limiar define o mínimo", "Manter 2–3 paredes"],
        ],
      },
      howTo: [
        { step: "1", path: "Aba Prepare", desc: "Abra o OrcaSlicer 2.4" },
        { step: "2", path: "Resistência › Paredes e superfícies", desc: "Expanda no painel esquerdo" },
        { step: "3", path: "Limiar de parede única", desc: "Digite o valor em %" },
      ],
      example: {
        piece: "Cúpula de luminária com paredes de 0,6mm (bico 0,4mm)",
        config: "Limiar 400%",
        result: "Paredes em linha única, luz atravessa de forma uniforme",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Paredes transparentes indesejadas", "Limiar muito alto", "Reduzir para 200–250%"],
          ["Excesso de plástico em paredes finas", "Limiar muito baixo", "Aumentar para 350–400%"],
          ["Paredes quebradiças", "Limiar muito alto em peça estrutural", "Reduzir significativamente"],
          ["Tempo de impressão alto", "Limiar muito baixo em peça leve", "Aumentar para 300%"],
        ],
      },
      goldenRule:
        "300% para a maioria. Paredes finas → limiar alto. Paredes grossas → limiar baixo. Ajuste até a parede ficar sólida sem excesso.",
      summaryTable: {
        title: "Decisão por espessura de parede",
        headers: ["Espessura da parede", "Limiar recomendado", "Motivo"],
        rows: [
          ["< 0,6mm", "400–500%", "Linha única, leveza, transparência"],
          ["0,6–1,0mm", "300%", "Equilíbrio"],
          ["1,0–1,5mm", "200%", "Duas linhas, resistente"],
          ["> 1,5mm", "100–150%", "Múltiplas linhas, sólido"],
        ],
      },
    },
    {
      name: "Evitar atravessar paredes (detalhamento avançado)",
      value: "Desativado (padrão)",
      whatIs:
        "Faz o bico CONTORNAR paredes já impressas durante travels, em vez de cruzar por cima. O slicer calcula um caminho alternativo que respeita o perímetro existente.",
      whyAdjust:
        "Bico quente passando sobre parede impressa pode derreter, riscar ou derrubar a superfície. Evitar travessias preserva o acabamento.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Bico desvia das paredes", "Peças com paredes finas, foco em qualidade"],
          ["Desativado", "Bico atravessa livremente", "Velocidade, peças robustas"],
        ],
      },
      influences: "Qualidade superficial, tempo de impressão, integridade de paredes finas, tamanho de travels.",
      influencesList: [
        "Espessura: <1mm sempre ativado; >2mm pode desativar",
        "Tipo de peça: estéticas = ativado; estruturais = opcional",
        "Temperatura: bico muito quente derrete fácil → ativar",
        "Material: PLA/PETG/ABS amolecem rápido → ativar",
        "Tempo: ativado aumenta tempo total da impressão",
      ],
      generates: "Superfície sem riscos/marcas quando ativado; impressão mais rápida porém com riscos quando desativado.",
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Z-Hop (Travels)", "Alternativa: ergue o bico", "Ativar Z-Hop também"],
          ["Largura da parede", "Paredes finas pedem desvio", "Ativar para paredes <1mm"],
          ["Ordem de impressão", "Define quais paredes já existem", "Interior/Exterior + Evitar = ótimo"],
        ],
      },
      example: {
        piece: "Cúpula de luminária com paredes 0,8mm",
        config: "Evitar = Ativado",
        result: "Paredes intactas, sem marcas de arraste",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Marcas de arraste", "Evitar desativado", "Ativar Evitar"],
          ["Tempo de impressão muito alto", "Evitar ativado em peça simples", "Desativar"],
          ["Paredes finas derrubadas", "Evitar desativado", "Ativar"],
        ],
      },
      goldenRule: "Ative para qualidade. Desative para velocidade. Paredes finas merecem o desvio.",
      summaryTable: {
        headers: ["Tipo de peça", "Evitar", "Motivo"],
        rows: [
          ["Estética/decorativa", "Ativado", "Superfície perfeita"],
          ["Paredes <1mm", "Ativado", "Evita danos"],
          ["Protótipo", "Desativado", "Velocidade"],
          ["Paredes >2mm", "Desativado", "Desnecessário"],
        ],
      },
    },
    {
      name: "Compensação de fluxo de área pequena (beta) — detalhamento",
      value: "Desativado",
      whatIs:
        "Reduz automaticamente o fluxo em áreas <1mm² para evitar acúmulo de material/blobs em pontas, detalhes finos e geometria minúscula.",
      whyAdjust:
        "Em áreas muito pequenas o plástico não tem para onde escoar — o excesso vira bolha. A compensação proporciona fluxo proporcional à área.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Compensação automática em áreas <1mm²", "Miniaturas, detalhes finos"],
          ["Desativado", "Fluxo normal", "Peças grandes, estruturais"],
        ],
      },
      influences: "Qualidade de detalhes minúsculos, formação de blobs em pontas.",
      generates: "Detalhes limpos quando ativado; possíveis blobs quando desativado em geometria fina.",
      goldenRule: "Ative para miniaturas. Desative para peças grandes. A compensação evita bolhas em detalhes finos.",
    },

    // ───────────── MÓDULO 2: SALIÊNCIAS (OVERHANGS) ─────────────
    {
      name: "Saliências › Detectar paredes salientes",
      value: "Ativado (padrão)",
      whatIs:
        "Faz o slicer identificar automaticamente, camada a camada, regiões onde a parede se projeta além do suporte da camada anterior (overhangs). Permite aplicar velocidade, cooling e fluxo específicos a essas regiões.",
      whyAdjust:
        "Saliências (especialmente >45°) são pontos críticos: precisam de velocidade reduzida e cooling máximo para não cair. Sem detecção, são tratadas como parede comum e falham.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Detecta e trata overhangs separadamente", "Peças com curvas, esferas, ângulos"],
          ["Desativado", "Todas as paredes tratadas iguais", "Peças sem overhangs (caixas retas)"],
        ],
      },
      influences: "Qualidade de overhangs, velocidade adaptativa, cooling em pontos críticos.",
      generates: "Overhangs mais limpos e estáveis quando ativado.",
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Velocidade de overhang", "Só funciona se detecção ativa", "30–50% da velocidade normal"],
          ["Cooling para overhang", "Só funciona se detecção ativa", "100% do ventilador"],
          ["Paredes extras em saliências", "Só ativa com detecção", "1–2 paredes extras"],
        ],
      },
      goldenRule: "Mantenha sempre ativado. A detecção é pré-requisito para todo o tratamento de overhangs.",
    },
    {
      name: "Saliências › Tornar saliências imprimíveis",
      value: "Desativado (padrão)",
      whatIs:
        "Modifica AUTOMATICAMENTE a geometria da peça inserindo micro-rampas em saliências severas (>45–60°) para reduzir o ângulo efetivo e melhorar a adesão sem precisar de suportes.",
      whyAdjust:
        "Em saliências severas, em vez de adicionar suporte (que precisa ser removido e marca a peça), o slicer 'engana' a geometria criando uma rampa interna invisível.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Otimiza geometria, reduz necessidade de suportes", "Peças com overhangs severos"],
          ["Desativado", "Mantém geometria original do STL", "Peças simples ou que exigem fidelidade dimensional total"],
        ],
      },
      influences: "Necessidade de suportes, fidelidade dimensional, qualidade de overhangs severos.",
      generates: "Overhangs >60° imprimíveis sem suporte quando ativado; necessidade de suporte quando desativado.",
      example: {
        piece: "Estatueta com braços para baixo (overhang ~65°)",
        config: "Tornar saliências imprimíveis = Ativado",
        result: "Braços imprimem sem suporte, com pequena alteração interna invisível",
      },
      goldenRule: "Ative para reduzir suportes. Desative se a peça exige fidelidade dimensional absoluta.",
    },
    {
      name: "Saliências › Paredes extras em saliências",
      value: "0 (padrão)",
      whatIs:
        "Adiciona paredes ADICIONAIS especificamente nas regiões detectadas como saliência, criando reforço estrutural para que a saliência não deforme nem caia.",
      whyAdjust:
        "Saliências são áreas de tensão — a parede está parcialmente no ar. Paredes extras ancoram a saliência na parte sólida.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0", "Sem reforço", "Overhangs leves (<45°)"],
          ["1", "Uma parede extra", "Overhangs médios (45–60°)"],
          ["2", "Duas paredes extras", "Overhangs severos (>60°)"],
        ],
      },
      influences: "Resistência e estabilidade de overhangs, tempo de impressão, peso da peça.",
      generates: "Overhangs sem deformação quando dimensionado corretamente.",
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Detectar paredes salientes", "Pré-requisito", "DEVE estar ativado"],
          ["Velocidade de overhang", "Combina para sucesso", "Reduzir velocidade + paredes extras"],
        ],
      },
      goldenRule: "1 parede extra para a maioria. 2 para overhangs severos. Paredes extras evitam deformações.",
    },
    {
      name: "Saliências › Reversão em par",
      value: "Desativado",
      whatIs:
        "Alterna a DIREÇÃO de extrusão (horário/anti-horário) entre camadas consecutivas em regiões de overhang, melhorando a adesão entre camadas em pontos críticos.",
      whyAdjust:
        "Em overhangs, a camada atual se apoia parcialmente na anterior. Alternar a direção 'cruza' a deposição entre camadas, ancorando melhor uma na outra.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Alterna direção em overhangs camada a camada"],
          ["Desativado", "Mantém direção constante (anti-horário)"],
        ],
      },
      influences: "Adesão entre camadas em overhangs, resistência de saliências.",
      generates: "Overhangs mais coesos quando ativado.",
      goldenRule: "Ative para overhangs. A reversão melhora a adesão em áreas críticas.",
    },
  ],

  // ====================================================================
  // TELA 21 — RESISTÊNCIA (Paredes · Cascas Topo/Base · Preenchimento)
  // ====================================================================
  "tela-21-resistencia-cascas-preenchimento": [
    // ───────────── MÓDULO 1: PAREDES ─────────────
    {
      name: "Voltas da parede (Wall Loops)",
      value: "3–4 (padrão)",
      whatIs:
        "Número de linhas (perímetros) impressas ao redor da peça em cada camada. As paredes são a 'casca' estrutural e a fonte primária de resistência — mais que o infill. Analogia: cada volta é uma fileira de tijolos ao redor da peça.",
      whyAdjust:
        "Define a resistência mecânica real da peça, sua rigidez, peso, tempo de impressão e até a qualidade visual (a parede externa é o que se vê).",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["1–2", "Paredes finas, leve, flexível", "Decorativos, protótipos rápidos"],
          ["3–4", "Padrão equilibrado", "Uso geral, peças funcionais"],
          ["5–6", "Paredes grossas, alta resistência", "Estruturas, ferramentas"],
          ["7–8", "Paredes muito grossas", "Industrial, cargas extremas"],
        ],
      },
      influences: "Resistência mecânica, peso, tempo, material consumido, qualidade visual da parede externa.",
      influencesList: [
        "Tipo de peça: decorativa = poucas; estrutural = muitas",
        "Material: PLA 3–4 · PETG 4–5 · ABS 4–5 · Nylon 5–6",
        "Tamanho: pequenas 2–3, médias 3–4, grandes 4–5",
        "Função: protótipo 2–3, uso final 4–5, ferramenta 5–6",
        "Cada parede extra adiciona ~20% de tempo de impressão",
      ],
      generates: "Peça frágil/leve (2 paredes) ou peça resistente/pesada (6+ paredes).",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando usar"],
        rows: [
          ["2 paredes", "Leve, flexível, frágil", "Decoração, protótipo"],
          ["4 paredes", "Equilíbrio resistência/peso", "Uso geral"],
          ["6 paredes", "Muito resistente, pesado", "Estruturas, ferramentas"],
          ["8 paredes", "Máxima resistência", "Industrial"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação com Paredes", "Ajuste recomendado"],
        rows: [
          ["Densidade de infill", "Paredes pesam mais que infill na resistência", "4 paredes + 20% infill = ótimo"],
          ["Ordem das paredes", "Define qualidade visual da externa", "Interior/Exterior"],
          ["Largura da parede", "Define a espessura final somada", "Ajustar largura DEPOIS"],
          ["Camadas de topo/base", "Complementam as paredes", "Manter ≥3 camadas sólidas"],
        ],
      },
      howTo: [
        { step: "1", path: "Aba Prepare", desc: "Abra o OrcaSlicer 2.4" },
        { step: "2", path: "Resistência › Paredes", desc: "Expanda no painel esquerdo" },
        { step: "3", path: "Voltas da parede", desc: "Digite o número desejado" },
      ],
      example: {
        piece: "Suporte de motor de 5kg",
        config: "6 paredes + 30% infill",
        result: "Suporte rígido, seguro para carga, sem flexão",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Peça quebra fácil", "Poucas paredes", "Aumentar para 4–6"],
          ["Tempo muito alto", "Muitas paredes", "Reduzir para 3–4"],
          ["Superfície irregular", "Paredes insuficientes", "Mínimo 3"],
          ["Peça pesada demais", "Excesso de paredes", "Reduzir + infill leve"],
        ],
      },
      goldenRule:
        "4 paredes para a maioria. 2 para protótipos. 6 para estruturas. A resistência começa nas paredes, não no infill.",
      summaryTable: {
        headers: ["Tipo de peça", "Paredes", "Motivo"],
        rows: [
          ["Decorativa/protótipo", "2–3", "Leve e rápida"],
          ["Uso geral/funcional", "3–4", "Equilíbrio"],
          ["Estrutural/ferramenta", "5–6", "Alta resistência"],
          ["Industrial/carga", "7–8", "Máxima resistência"],
        ],
      },
    },
    {
      name: "Parede extra alternada",
      value: "Desativado (padrão)",
      whatIs:
        "Adiciona uma parede EXTRA em camadas alternadas (camada par: N paredes; camada ímpar: N+1 paredes). Cria intertravamento entre camadas sem dobrar o material da peça inteira.",
      whyAdjust:
        "Aumenta resistência (especialmente a flexão e cisalhamento entre camadas) com custo menor de tempo/material que simplesmente adicionar mais uma parede em todas as camadas.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Paredes alternadas, intertravadas", "Peças que sofrem flexão"],
          ["Desativado", "Número fixo de paredes", "Uso geral"],
        ],
      },
      influences: "Resistência a flexão, intertravamento entre camadas, peso e tempo.",
      generates: "Peça com maior resistência a flexão quando ativado, com pequeno custo de tempo.",
      goldenRule: "Ative para peças que sofrem flexão. A parede alternada distribui tensões.",
    },
    {
      name: "Detectar paredes finas",
      value: "Desativado (padrão)",
      whatIs:
        "Identifica regiões com paredes mais finas que a largura da linha e ajusta dinamicamente a largura da extrusão para preenchê-las, evitando que sejam ignoradas no fatiamento.",
      whyAdjust:
        "Sem detecção, paredes <0,4mm com bico 0,4mm simplesmente desaparecem do G-code. A detecção força o slicer a preencher essas regiões com linhas adaptadas.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Ajusta largura para preencher paredes finas", "Miniaturas, peças com detalhes"],
          ["Desativado", "Paredes finas podem ser ignoradas", "Peças com paredes grossas"],
        ],
      },
      influences: "Fidelidade do modelo, presença de detalhes finos no G-code.",
      generates: "Detalhes finos aparecem na peça quando ativado; somem quando desativado.",
      goldenRule: "Ative para miniaturas e modelos com detalhe. Desative para estruturas puras.",
    },
    {
      name: "Cascas de topo/base",
      value: "Camadas (padrão)",
      whatIs:
        "Define o MÉTODO de cálculo da espessura das cascas (camadas sólidas no topo e base): por número de camadas ou por espessura em mm. As cascas formam as superfícies fechadas da peça.",
      whyAdjust:
        "Trocar entre 'camadas' e 'espessura' permite manter consistência seja qual for a altura da camada usada — útil ao trocar entre 0,2mm e 0,28mm sem recalcular.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Camadas", "Espessura = N × altura da camada", "Uso geral, controle direto"],
          ["Espessura (mm)", "Slicer calcula N camadas para atingir espessura", "Quando muda altura da camada com frequência"],
        ],
      },
      influences: "Espessura final das cascas ao mudar layer height.",
      generates: "Topo/base com espessura consistente ou variável conforme a opção.",
      goldenRule: "Use 'Camadas' para a maioria. 'Espessura' se troca layer height com frequência.",
    },
    {
      name: "Camadas de topo da casca",
      value: "4 (padrão)",
      whatIs:
        "Quantidade de camadas SÓLIDAS (100% preenchidas) impressas no topo da peça antes de fechar a superfície. São as últimas camadas que selam o infill.",
      whyAdjust:
        "Poucas camadas no topo = pillowing (bolhas), buracos sobre o infill. Muitas = desperdício de tempo. O número certo depende do infill abaixo.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["2–3", "Topo fino, rápido", "Infill alto (>40%)"],
          ["4–5", "Padrão", "Infill médio (20–30%)"],
          ["6–8", "Topo muito sólido", "Peças estéticas ou Ironing"],
        ],
      },
      influences: "Qualidade do topo, pillowing, brilho do Ironing, tempo de impressão.",
      generates: "Topo perfeitamente fechado (correto) ou com bolhas/buracos (poucas camadas).",
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Densidade do infill", "Infill baixo pede mais camadas", "20% infill → 5 camadas; 40% → 3"],
          ["Ironing", "Mais camadas dão melhor base", "Mínimo 4 camadas"],
        ],
      },
      goldenRule: "4 camadas para a maioria. 5–6 com infill <20%. Topo bonito começa aqui.",
    },
    {
      name: "Espessura da casca do topo",
      value: "0,8 mm (padrão)",
      whatIs:
        "Espessura TOTAL em mm das camadas sólidas do topo, calculada como (camadas de topo × altura da camada). Funciona como mínimo: se Nº de camadas não atingir essa espessura, mais camadas são adicionadas.",
      whyAdjust:
        "Garante espessura mínima de topo independente da altura da camada usada. Evita topo fino demais ao usar layer heights pequenas.",
      optionsTable: {
        headers: ["Valor", "Equivale a (layer 0,2mm)", "Uso"],
        rows: [
          ["0,8 mm", "4 camadas", "Padrão"],
          ["1,0 mm", "5 camadas", "Topo médio"],
          ["1,2 mm", "6 camadas", "Topo grosso, Ironing"],
        ],
      },
      influences: "Espessura mínima do topo, integração com Ironing.",
      generates: "Topo sólido com espessura garantida.",
      goldenRule: "0,8mm cobre a maioria. Aumente para 1,2mm em peças com Ironing.",
    },
    {
      name: "Densidade da superfície superior",
      value: "100% (padrão)",
      whatIs:
        "Densidade de extrusão (% de plástico) APENAS na última camada visível do topo. 100% = linhas totalmente coladas, sem espaço entre elas.",
      whyAdjust:
        "Menos de 100% no topo deixa linhas separadas visíveis. 100% garante superfície totalmente fechada.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["100%", "Topo completamente sólido", "Topos visíveis, Ironing"],
          ["80–90%", "Topo levemente menos denso", "Peças internas, não visíveis"],
        ],
      },
      influences: "Aparência do topo, fechamento, brilho.",
      generates: "Topo perfeito (100%) ou listras (<100%).",
      goldenRule: "100% sempre. Reduza só em peças cuja parte de cima ficará escondida.",
    },
    {
      name: "Padrão de superfície superior",
      value: "Monotonic (padrão)",
      whatIs:
        "Padrão geométrico das linhas da última camada do topo. Cada padrão produz uma textura visual diferente.",
      whyAdjust:
        "O padrão define a estética do topo. Monotonic gera linhas paralelas no mesmo sentido — visual mais uniforme.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Monotonic", "Linhas paralelas mesma direção", "Acabamento liso e uniforme (padrão)"],
          ["Rectilinear", "Linhas paralelas, sentido alterna", "Padrão clássico"],
          ["Concentric", "Círculos concêntricos", "Peças redondas/cilíndricas"],
          ["Hilbert Curve", "Curva fractal contínua", "Estética sofisticada"],
        ],
      },
      influences: "Aparência visual do topo.",
      generates: "Texturas distintas conforme padrão escolhido.",
      goldenRule: "Monotonic para acabamento uniforme. Concentric em peças redondas.",
    },
    {
      name: "Camadas da casca de base",
      value: "3–4 (padrão)",
      whatIs:
        "Quantidade de camadas sólidas (100%) na base da peça — as primeiras camadas que tocam a mesa e formam o 'piso' sólido.",
      whyAdjust:
        "Base fina = falha de adesão, possíveis buracos no chão. Base grossa = boa adesão, mais material.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["2", "Base fina", "Economia, peças com base não visível"],
          ["3–4", "Padrão", "Uso geral"],
          ["5–6", "Base muito sólida", "Peças com infill baixo, ou base estrutural"],
        ],
      },
      influences: "Adesão à mesa, fechamento do 'chão', resistência da base.",
      generates: "Base sólida e bem aderida com 3–4 camadas.",
      goldenRule: "3–4 camadas para a maioria. Aumente em peças com infill <15%.",
    },
    {
      name: "Espessura da casca de base",
      value: "0,4–0,6 mm (padrão)",
      whatIs:
        "Espessura TOTAL em mm das camadas inferiores sólidas. Funciona como mínimo (forçando mais camadas se preciso).",
      whyAdjust: "Garante chão mínimo independente da altura da camada.",
      optionsTable: {
        headers: ["Valor", "Equivale a (layer 0,2mm)", "Uso"],
        rows: [
          ["0,4 mm", "2 camadas", "Economia"],
          ["0,6 mm", "3 camadas", "Padrão"],
          ["0,8 mm", "4 camadas", "Base estrutural"],
        ],
      },
      influences: "Espessura mínima do 'chão'.",
      generates: "Base com espessura garantida.",
      goldenRule: "0,6mm cobre a maioria.",
    },
    {
      name: "Densidade da superfície inferior",
      value: "100% (padrão)",
      whatIs:
        "Densidade de extrusão da PRIMEIRA camada visível inferior. 100% = chão totalmente sólido.",
      whyAdjust: "100% melhora adesão à mesa e dá aparência limpa ao chão da peça.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["100%", "Base completamente sólida (padrão)"],
          ["90%", "Pequeno espaço entre linhas"],
        ],
      },
      influences: "Adesão e aparência da base.",
      generates: "Base perfeita com 100%.",
      goldenRule: "Mantenha 100%.",
    },
    {
      name: "Padrão de superfície inferior",
      value: "Monotonic (padrão)",
      whatIs:
        "Padrão geométrico das linhas da primeira camada visível inferior.",
      optionsTable: {
        headers: ["Opção", "Uso"],
        rows: [
          ["Monotonic", "Padrão, melhor aparência da base"],
          ["Rectilinear", "Linhas alternadas"],
          ["Concentric", "Círculos para bases redondas"],
        ],
      },
      influences: "Aparência da base.",
      generates: "Texturas diferentes na base conforme padrão.",
      goldenRule: "Monotonic para a maioria. Concentric em bases circulares.",
    },
    {
      name: "Sobreposição Superior/Inferior de preenchimento sólido/parede",
      value: "25% (padrão)",
      whatIs:
        "Quanto o preenchimento sólido das cascas (topo/base) AVANÇA SOBRE a parede adjacente, criando ancoragem entre a casca e a parede.",
      whyAdjust:
        "Sem sobreposição, casca e parede ficam apenas encostadas — podem se separar. Sobreposição 'costura' as duas, evitando lacunas e separações visíveis.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0–10%", "Pouca conexão, risco de lacuna", "Não recomendado"],
          ["20–30%", "Boa ancoragem", "Padrão, uso geral"],
          ["40–50%", "Forte conexão, pode marcar parede externa", "Peças estruturais"],
        ],
      },
      influences: "Ancoragem casca↔parede, lacunas visíveis, qualidade da parede externa.",
      generates: "Topo/base bem integrado às paredes com 25%.",
      goldenRule: "20–30% cobre a maioria. Mais que 40% pode causar marcas externas.",
    },

    // ───────────── MÓDULO 2: PREENCHIMENTO (INFILL) ─────────────
    {
      name: "Densidade do preenchimento esparso",
      value: "15–20% (padrão)",
      whatIs:
        "Porcentagem de plástico usado no INTERIOR da peça (entre as paredes). 0% = oca; 100% = totalmente sólida. Define o quanto a peça pesa e custa.",
      whyAdjust:
        "Mais infill ≠ proporcionalmente mais resistência. A maior parte da resistência vem das paredes. Infill alto principalmente aumenta peso, tempo e custo — com ganho marginal de resistência acima de 30%.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0–10%", "Infill mínimo, peça leve", "Decorativos, miniaturas"],
          ["15–25%", "Padrão equilibrado", "Uso geral"],
          ["30–50%", "Infill denso", "Peças funcionais/estruturais"],
          ["50–80%", "Muito denso", "Alta resistência mecânica"],
          ["100%", "Peça maciça", "Casos raros — peso e tempo extremos"],
        ],
      },
      influences: "Peso, tempo, custo, resistência (com retorno decrescente), apoio ao topo.",
      influencesList: [
        "Resistência: dobrar infill NÃO dobra resistência — paredes mandam mais",
        "Topo: infill baixo (<15%) pede mais camadas de topo para evitar pillowing",
        "Peso: 100% pesa ~3× mais que 20%",
        "Tempo: 50% pode dobrar o tempo vs 20%",
      ],
      generates: "Peça leve e rápida (15–20%) ou pesada e demorada (>50%).",
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Paredes", "Aumente paredes ANTES de aumentar infill", "Resistência vem das paredes"],
          ["Camadas de topo", "Infill baixo pede mais topo", "20% infill → 4 camadas mínimo"],
          ["Padrão de infill", "Define eficiência", "Gyroid/Cubic mais eficientes que Grid"],
        ],
      },
      goldenRule:
        "15–20% para a maioria. Para mais resistência aumente PAREDES primeiro, infill depois.",
      summaryTable: {
        headers: ["Tipo de peça", "Infill", "Motivo"],
        rows: [
          ["Decorativa", "5–10%", "Leveza"],
          ["Funcional geral", "15–25%", "Equilíbrio"],
          ["Estrutural", "30–50%", "Resistência real"],
          ["Alta carga", "60–80%", "Máxima resistência prática"],
        ],
      },
    },
    {
      name: "Multilinhas de Preenchimento",
      value: "Desativado",
      whatIs:
        "Permite que o slicer imprima MÚLTIPLAS linhas paralelas próximas no infill, em vez de uma linha simples — acelerando trajetos longos do infill ao custo de pequena variação de qualidade.",
      whyAdjust:
        "Em peças grandes, infill com multilinhas reduz consideravelmente o tempo por aproveitar trajetos retos mais largos.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Múltiplas linhas por passada — mais rápido"],
          ["Desativado", "Uma linha por vez — padrão, mais preciso"],
        ],
      },
      influences: "Tempo de impressão e qualidade do infill (raramente perceptível externamente).",
      generates: "Impressão sensivelmente mais rápida em peças grandes quando ativado.",
      goldenRule: "Ative em peças grandes para ganhar tempo. Desative em peças pequenas/precisas.",
    },
    {
      name: "Padrão de preenchimento esparso",
      value: "Gyroid (padrão recomendado)",
      whatIs:
        "Geometria das linhas que formam o INFILL interno. Cada padrão tem propriedades distintas de resistência, isotropia (igualdade em todas as direções), velocidade e estética.",
      whyAdjust:
        "O padrão certo define se a peça resiste igual em todas as direções (isotrópico) ou só em uma; também afeta tempo, peso e a capacidade de suportar topos sólidos.",
      optionsTable: {
        headers: ["Padrão", "Característica", "Melhor para"],
        rows: [
          ["Gyroid", "Isotrópico, sem cruzamentos, ondulado", "Peças funcionais — recomendado padrão"],
          ["Cubic", "Alta resistência multidirecional", "Estruturas mecânicas"],
          ["Grid", "Rápido, simples, cruzamentos visíveis", "Protótipos rápidos"],
          ["Lightning", "Ultra econômico, só apoia o topo", "Peças decorativas, miniaturas"],
          ["Honeycomb (3D Honeycomb)", "Muito resistente, pesado", "Painéis estruturais"],
          ["Triangles", "Resistência boa em XY", "Peças planas"],
          ["Concentric", "Acompanha o perímetro", "Peças flexíveis (TPU)"],
        ],
      },
      influences: "Resistência (e em qual direção), tempo, peso, ruído de impressão, suporte ao topo.",
      influencesList: [
        "Isotropia: Gyroid = igual em todas as direções; Grid = forte só em XY",
        "Velocidade: Grid mais rápido; Gyroid intermediário; Honeycomb mais lento",
        "Suporte ao topo: Cubic/Gyroid suportam bem; Lightning quase só nas pontas",
        "Para TPU/flexíveis: Concentric mantém flexibilidade",
      ],
      generates: "Peças com perfis de resistência muito diferentes conforme o padrão.",
      example: {
        piece: "Suporte de prateleira que carrega peso vertical",
        config: "Cubic 30%",
        result: "Suporte rígido em todas as direções, sem flexão",
      },
      goldenRule:
        "Gyroid para a maioria — isotrópico e bonito. Lightning para decorativos. Cubic para estruturais.",
      summaryTable: {
        headers: ["Aplicação", "Padrão", "Motivo"],
        rows: [
          ["Uso geral", "Gyroid", "Equilíbrio total"],
          ["Mecânica/estrutura", "Cubic", "Resistência 3D"],
          ["Protótipo rápido", "Grid", "Velocidade"],
          ["Decorativo leve", "Lightning", "Economia extrema"],
          ["Painel resistente", "Honeycomb", "Rigidez por peso"],
          ["TPU/flexível", "Concentric", "Mantém flexibilidade"],
        ],
      },
    },
  ],

  // ====================================================================
  // TELA 22 — RESISTÊNCIA (Preenchimento avançado · Direção · Âncoras · Pontes)
  // ====================================================================
  "tela-22-resistencia-padroes-infill": [
    // ───────────── MÓDULO 1: PREENCHIMENTO (INFILL) ─────────────
    {
      name: "Direção do preenchimento",
      value: "45° (padrão)",
      whatIs:
        "Ângulo (em graus em relação ao eixo X da mesa) das linhas que formam o INFILL esparso. Define a orientação das 'vigas' internas da peça e, portanto, em qual direção ela é mais resistente.",
      whyAdjust:
        "Alinhar o infill com a direção da força aplicada pode aumentar a resistência da peça em até 50%. O ângulo certo distribui ou concentra a resistência onde você precisa.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0°", "Linhas horizontais (eixo X)", "Forças na direção X"],
          ["45°", "Padrão — distribuição uniforme", "Uso geral"],
          ["90°", "Linhas verticais (eixo Y)", "Forças na direção Y"],
          ["45° / 135°", "Cruzado", "Forças em múltiplas direções"],
          ["0° / 90°", "Grade", "Estruturas leves, decorativas"],
        ],
      },
      influences: "Resistência mecânica por direção, eficiência de extrusão, aparência do infill quando visível.",
      influencesList: [
        "Direção da força: alinhe o infill com a carga principal",
        "Padrão: Gyroid/Cubic dependem menos do ângulo; Grid depende muito",
        "Geometria: retangulares se beneficiam de 0°/90°; circulares de 45°",
        "Material: ABS contrai — alinhe ao eixo de menor contração",
        "Visual: infill visível ganha estética com ângulos consistentes",
      ],
      generates: "Peça mais resistente na direção alinhada, mais fraca na perpendicular.",
      generatesTable: {
        headers: ["Configuração", "Resistência", "Quando usar"],
        rows: [
          ["0°", "Máxima em X, mínima em Y", "Carga horizontal"],
          ["45°", "Uniforme em X e Y", "Uso geral, multidirecional"],
          ["90°", "Máxima em Y, mínima em X", "Carga vertical"],
          ["0°/90°", "Moderada em ambas", "Decorativo, estruturas leves"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste recomendado"],
        rows: [
          ["Padrão de infill", "Define sensibilidade ao ângulo", "Gyroid = direção menos crítica"],
          ["Densidade do infill", "Direção certa multiplica densidade", "Alinhe ANTES de aumentar densidade"],
          ["Paredes", "Infill não substitui paredes", "Manter ≥3–4 paredes"],
          ["Alinhar ao modelo", "Automatiza a escolha", "Ativar em geometrias complexas"],
        ],
      },
      howTo: [
        { step: "1", path: "Aba Prepare", desc: "Abra o OrcaSlicer 2.4" },
        { step: "2", path: "Resistência › Preenchimento (Infill)", desc: "Expanda no painel esquerdo" },
        { step: "3", path: "Direção do preenchimento", desc: "Digite o ângulo (ex.: 45)" },
      ],
      example: {
        piece: "Suporte de parede que carrega 5kg verticalmente",
        config: "Direção = 90° + Padrão Cubic + 30%",
        result: "Linhas verticais alinhadas com a carga; suporte não flexiona",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Peça quebra na direção da carga", "Infill perpendicular à força", "Alinhar com a carga"],
          ["Padrão visual irregular", "Direção não otimizada", "Usar 45° ou 0°/90°"],
          ["Resistência inconsistente entre peças", "Direção mudou com a rotação no plate", "Padronizar direção"],
          ["Tempo de impressão alto", "Direção gera muitos travels", "Tentar 0°/90°"],
        ],
      },
      goldenRule:
        "45° para a maioria. Alinhe com a força para resistência máxima. Infill alinhado = resistência garantida.",
      summaryTable: {
        headers: ["Tipo de peça", "Direção", "Motivo"],
        rows: [
          ["Suporte de parede", "90°", "Carga vertical"],
          ["Prateleira", "0°", "Carga horizontal"],
          ["Caixa/container", "45°", "Carga uniforme"],
          ["Engrenagem", "45°", "Torque multidirecional"],
          ["Tampa", "0°/90°", "Simplicidade"],
          ["Figura orgânica", "45°", "Adaptação"],
        ],
      },
    },
    {
      name: "Gabarito de rotação de preenchimento",
      value: "Padrão",
      whatIs:
        "Define o PONTO DE REFERÊNCIA a partir do qual o ângulo de rotação do infill é aplicado. Pode ser um conjunto de regras predefinido ou uma lista personalizada de ângulos por camada.",
      whyAdjust:
        "Permite ROTACIONAR o infill camada a camada, criando intertravamento entre camadas (camada 1 a 45°, camada 2 a 135°, camada 3 a 45°...). Aumenta resistência sem aumentar densidade.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Padrão", "Sem rotação — usa Direção do preenchimento fixa", "Uso geral"],
          ["Personalizado", "Lista de ângulos rotacionados por camada", "Peças estruturais, intertravamento"],
        ],
      },
      influences: "Intertravamento entre camadas, isotropia da peça.",
      generates: "Peça com resistência mais uniforme entre camadas quando personalizado.",
      goldenRule: "Use padrão para a maioria. Personalize em peças críticas para reforço entre camadas.",
    },
    {
      name: "Comprimento máximo da âncora de preenchimento",
      value: "12 mm (padrão)",
      whatIs:
        "Comprimento MÁXIMO permitido para uma 'âncora' — pequena extensão da linha de infill que se prolonga sobre a parede interna para ancorá-la, evitando que pontas soltas do infill levantem.",
      whyAdjust:
        "Sem âncoras, a ponta da linha de infill termina no ar sobre a parede e pode 'curvar para cima' (curling). Âncoras grudam a ponta na parede.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0 mm", "Sem âncoras", "Peças leves/decorativas"],
          ["5–10 mm", "Âncoras moderadas", "Uso geral"],
          ["10–20 mm", "Âncoras longas", "Peças que precisam de máxima ancoragem"],
        ],
      },
      influences: "Estabilidade das pontas de infill, conexão infill↔parede, gasto leve de material extra.",
      generates: "Infill sem curling nas pontas com âncoras adequadas.",
      goldenRule: "5–12mm para a maioria. Âncoras conectam o infill à parede.",
    },
    {
      name: "Comprimento da âncora de preenchimento",
      value: "2,5 mm (padrão)",
      whatIs:
        "Comprimento ALVO (preferido) das âncoras — o slicer tenta usar este valor, limitado ao máximo definido acima.",
      whyAdjust: "Define o tamanho 'normal' das âncoras. Pequeno = economia; grande = mais segurança contra curling.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["0,5–1,0 mm", "Âncoras curtas, mínimo material extra"],
          ["1,0–2,5 mm", "Padrão"],
          ["2,5–3,0 mm", "Âncoras longas, máxima ancoragem"],
        ],
      },
      influences: "Estabilidade da ponta, material extra usado.",
      generates: "Pontas firmemente ancoradas com valor adequado.",
      goldenRule: "2–3mm cobre a maioria. Diminua só em miniaturas.",
    },
    {
      name: "Padrão de preenchimento sólido interno",
      value: "Rectilinear (padrão)",
      whatIs:
        "Padrão usado especificamente em áreas de INFILL SÓLIDO INTERNO — camadas 100% preenchidas entre o infill esparso e as cascas superiores/inferiores (não é o padrão do infill esparso).",
      whyAdjust:
        "O padrão sólido interno influencia adesão entre camadas sólidas e padrão de stress nas zonas mais densas da peça.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Rectilinear", "Linhas retas, padrão clássico", "Uso geral, boa resistência"],
          ["Concentric", "Acompanha o perímetro", "Peças com furos, formas circulares"],
          ["Aligned Rectilinear", "Linhas alinhadas todas iguais", "Quando força só em uma direção"],
          ["Hilbert Curve", "Curva fractal contínua", "Estética/visual interno"],
          ["Monotonic Line", "Linhas em monotônico", "Acabamento mais uniforme"],
        ],
      },
      influences: "Adesão entre camadas sólidas internas, distribuição de tensão, integração com pontes internas.",
      generates: "Camadas sólidas internas com padrão geométrico distinto.",
      goldenRule: "Rectilinear para a maioria. Concentric em formas redondas/furadas.",
    },
    {
      name: "Direção do preenchimento sólido",
      value: "45°",
      whatIs:
        "Ângulo aplicado especificamente ao infill SÓLIDO interno (não ao esparso). Pode ser diferente do ângulo do infill esparso.",
      whyAdjust:
        "Permite combinar direções diferentes: esparso a 45° + sólido a 0°, criando intertravamento camada a camada.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["0°", "Linhas horizontais"],
          ["45°", "Padrão diagonal"],
          ["90°", "Linhas verticais"],
        ],
      },
      influences: "Distribuição de tensão nas regiões sólidas, intertravamento com o infill esparso.",
      generates: "Padrões sólidos alinhados de acordo com a escolha.",
      goldenRule: "45° na maioria. Use outro ângulo se quiser cruzar com o esparso.",
    },
    {
      name: "Gabarito de rotação de preenchimento sólido",
      value: "Padrão",
      whatIs:
        "Equivalente ao gabarito do infill esparso, mas aplicado APENAS às camadas sólidas. Permite rotacionar o sólido camada a camada.",
      whyAdjust: "Cria intertravamento camada-a-camada nas regiões sólidas, aumentando resistência.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Padrão", "Sem rotação"],
          ["Personalizado", "Lista de ângulos alternados por camada"],
        ],
      },
      influences: "Intertravamento entre camadas sólidas.",
      generates: "Sólido com resistência mais uniforme quando personalizado.",
      goldenRule: "Padrão para a maioria; personalize em peças críticas.",
    },
    {
      name: "Aplicar preenchimento de vão",
      value: "Ativado (padrão)",
      whatIs:
        "Ativa o GAP FILL — preenchimento automático de pequenos vazios que sobram entre paredes (regiões finas demais para uma parede inteira, mas que ficariam vazias sem preenchimento).",
      whyAdjust:
        "Sem gap fill, áreas estreitas entre paredes ficam ocas, comprometendo resistência e qualidade. Com gap fill, o slicer adiciona linhas curtas para fechar essas lacunas.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Preenche vãos pequenos automaticamente", "Uso geral, peças estruturais"],
          ["Desativado", "Deixa vãos vazios → mais rápido", "Decorativos, velocidade"],
        ],
      },
      influences: "Resistência, fechamento de regiões finas, presença de blobs em micro-regiões.",
      generates: "Peças totalmente fechadas e sólidas quando ativado.",
      goldenRule: "Ative sempre, exceto em decorativos rápidos.",
    },
    {
      name: "Filtrar vazios pequenos",
      value: "Ativado",
      whatIs:
        "Remove vazios MUITO pequenos identificados pelo gap fill que não fariam diferença estrutural, evitando o tempo extra e os blobs gerados pelo preenchimento dessas regiões minúsculas.",
      whyAdjust:
        "Vazios minúsculos preenchidos podem gerar pings, blobs e excesso. Filtrá-los simplifica o G-code.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Ignora vãos minúsculos"],
          ["Desativado", "Tenta preencher todos os vãos"],
        ],
      },
      influences: "Tempo, defeitos em micro-regiões.",
      generates: "Menos blobs e impressão mais limpa quando ativado.",
      goldenRule: "Mantenha ativado por padrão.",
    },
    {
      name: "Sobreposição de preenchimento/parede",
      value: "20–25% (padrão)",
      whatIs:
        "Quanto as linhas do INFILL ESPARSO avançam para DENTRO da parede mais interna, ancorando o infill à parede. Diferente da sobreposição topo/base — esta é específica do esparso.",
      whyAdjust:
        "Sem sobreposição, infill e parede só se encostam — podem separar. Com sobreposição, o infill 'morde' a parede e se ancora.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0–10%", "Pouca conexão, risco de separação", "Decorativos sem carga"],
          ["15–25%", "Padrão — boa ancoragem", "Uso geral"],
          ["30–40%", "Forte ancoragem, pode marcar parede externa", "Estruturais sob carga"],
        ],
      },
      influences: "Ancoragem infill↔parede, qualidade da parede externa, lacunas internas.",
      generates: "Peça com infill bem ancorado às paredes com 20%.",
      goldenRule: "20% para a maioria. A sobreposição conecta o infill à parede.",
    },

    // ───────────── MÓDULO 2: AVANÇADO ─────────────
    {
      name: "Avançado › Alinhar direção do preenchimento ao modelo",
      value: "Desativado (padrão)",
      whatIs:
        "Faz o slicer ROTACIONAR automaticamente a direção do infill em cada ilha (região contínua de infill) para se alinhar à geometria local — em vez de usar um ângulo fixo global.",
      whyAdjust:
        "Em peças com geometria complexa/orgânica, um ângulo fixo não é ótimo em todas as regiões. O alinhamento automático otimiza região por região.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Slicer adapta direção a cada região", "Peças orgânicas, complexas"],
          ["Desativado", "Usa Direção do preenchimento global", "Peças simples/geométricas"],
        ],
      },
      influences: "Eficiência estrutural do infill em peças complexas.",
      generates: "Resistência mais uniforme em geometrias variadas quando ativado.",
      goldenRule: "Ative para geometrias complexas. Mantenha desativado para peças geométricas simples.",
    },
    {
      name: "Avançado › Inserir camadas sólidas",
      value: "0 (padrão)",
      whatIs:
        "Insere CAMADAS 100% SÓLIDAS adicionais em intervalos regulares no meio do infill esparso, criando 'reforços horizontais' periódicos que aumentam dramaticamente a rigidez vertical.",
      whyAdjust:
        "Peças longas verticalmente com infill baixo podem ceder. Camadas sólidas intermediárias funcionam como 'lajes' que enrijecem a estrutura.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0", "Sem camadas extras", "Padrão, uso geral"],
          ["A cada 2–3mm", "Reforço periódico", "Peças estruturais altas"],
          ["A cada 1mm ou menos", "Reforço intenso", "Alta resistência vertical"],
        ],
      },
      influences: "Rigidez vertical, peso, tempo de impressão.",
      generates: "Peça muito mais rígida verticalmente; impressão mais lenta.",
      goldenRule: "0 para uso geral. Use em peças altas e finas que precisam de rigidez vertical.",
    },
    {
      name: "Avançado › Direção de preenchimento de ponte externa",
      value: "0° (auto)",
      whatIs:
        "Ângulo das linhas de extrusão que formam a PONTE EXTERNA. Por padrão, o slicer detecta automaticamente o melhor ângulo (perpendicular ao vão).",
      whyAdjust:
        "A direção da ponte é crítica — linhas precisam atravessar o vão pela menor distância possível. Ângulo errado = ponte falha.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0° (auto)", "Slicer escolhe melhor ângulo", "Recomendado"],
          ["Valor fixo", "Força um ângulo específico", "Quando o automático erra"],
        ],
      },
      influences: "Sucesso da ponte, comprimento de cada linha de ponte.",
      generates: "Ponte que atravessa o menor caminho possível.",
      goldenRule: "Deixe em 0° (auto). Só altere se a ponte estiver falhando com ângulo automático.",
    },
    {
      name: "Avançado › Direção de preenchimento de ponte interna",
      value: "0° (auto)",
      whatIs:
        "Ângulo das pontes INTERNAS (sobre infill esparso, formando a base do topo). Mesmo princípio das externas, mas para pontes que não são visíveis.",
      whyAdjust: "Define quão eficiente é a 'laje' interna que apoia o topo sólido.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["0° (auto)", "Slicer escolhe automaticamente"],
          ["Valor fixo", "Força ângulo específico"],
        ],
      },
      influences: "Qualidade do apoio do topo sólido, pillowing.",
      generates: "Topo sólido bem apoiado com auto.",
      goldenRule: "Deixe em auto. Altere apenas em casos específicos de pillowing.",
    },
    {
      name: "Avançado › Ângulo relativo de ponte (Relative bridge angle)",
      value: "Desativado",
      whatIs:
        "Quando ATIVADO, os ângulos das pontes (externa e interna) são interpretados como RELATIVOS à orientação local da geometria, em vez de absolutos em relação à mesa.",
      whyAdjust:
        "Em peças rotacionadas no plate ou com pontes em ângulos não-cardinais, o ângulo relativo se adapta à peça em vez de à máquina — mantém a estratégia de ponte consistente independente da rotação.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Ângulo medido em relação à geometria da ponte"],
          ["Desativado", "Ângulo medido em relação ao eixo X da mesa"],
        ],
      },
      influences: "Consistência da estratégia de ponte ao rotacionar a peça.",
      generates: "Pontes sempre cruzando o vão de forma ótima, independente da rotação.",
      goldenRule: "Ative se rotaciona peças no plate e quer manter o comportamento da ponte.",
    },
  ],

  // ====================================================================
  // TELA 23 — RESISTÊNCIA (Sólido Interno · Avançado)
  // ====================================================================
  "tela-23-resistencia-avancado": [
    // ───────────── MÓDULO 1: SÓLIDO INTERNO ─────────────
    {
      name: "Sólido interno › Direção do preenchimento sólido",
      value: "45°",
      whatIs:
        "Define o ângulo das linhas de preenchimento em áreas onde o infill é SÓLIDO (100% de densidade), como a interface entre infill e paredes ou camadas de topo/base. É diferente do infill esparso porque atua em áreas críticas que precisam de máxima resistência e devem se alinhar às forças aplicadas. Analogia: o infill normal é estrutura de vigas; o sólido é a laje de concreto que precisa ser forte em todas as direções.",
      whyAdjust:
        "Alinhar a direção do sólido com a carga predominante maximiza a resistência mecânica. 45° distribui forças uniformemente; 0° ou 90° concentram resistência em um eixo específico.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando Usar"],
        rows: [
          ["0°", "Linhas horizontais", "Forças na direção X"],
          ["45° (padrão)", "Diagonal", "Distribuição uniforme"],
          ["90°", "Linhas verticais", "Forças na direção Y"],
          ["-45°", "Diagonal negativa", "Alternativa à 45°"],
          ["0°/90°", "Cruzado", "Máxima resistência multidirecional"],
        ],
      },
      influences:
        "Direção da força aplicada (X = 0°, Y = 90°, multidirecional = 45°), geometria da peça (retangular alinha com lados; circular usa 45° ou 0°/90°; orgânica usa 45°), material (PLA aceita qualquer, PETG e ABS pedem alinhamento com carga/contração) e função (estrutural alinha com carga; decorativa usa 45° por estética).",
      generates:
        "45° dá distribuição uniforme para uso geral. 0° ou 90° dão força máxima em um eixo específico. 0°/90° cobre cargas em ambas direções.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando Usar"],
        rows: [
          ["45°", "Distribuição uniforme", "Uso geral"],
          ["0°", "Força máxima em X", "Carga horizontal"],
          ["90°", "Força máxima em Y", "Carga vertical"],
          ["0°/90°", "Força em ambas direções", "Carga complexa"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste Recomendado"],
        rows: [
          ["Direção do infill esparso", "Pode ser diferente", "45° para ambos"],
          ["Padrão de superfície superior", "Complementa", "Monotonic ou Concentric"],
          ["Paredes", "Sólido conecta paredes", "4–6 paredes"],
        ],
      },
      howTo: [
        { step: "1. Abrir OrcaSlicer 2.4", path: "Aba Prepare", desc: "Abra o projeto" },
        { step: "2. Painel esquerdo", path: "Resistência › Sólido interno", desc: "Expanda a seção" },
        { step: "3. Localizar parâmetro", path: "Direção do preenchimento sólido", desc: "Campo numérico em graus" },
        { step: "4. Definir valor", path: "Ex: 45°", desc: "Mantenha 45° na maioria; ajuste para 0° ou 90° se houver carga predominante" },
      ],
      example: {
        piece: "Suporte com carga vertical / Caixa com carga distribuída",
        config: "Suporte = 90° · Caixa = 45°",
        result: "Suporte: máxima resistência na direção da carga. Caixa: distribuição uniforme, boa qualidade geral.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Peça quebra no topo/base", "Direção desalinhada", "Alinhar com a carga"],
          ["Superfície superior irregular", "Direção inconsistente", "Usar 45°"],
          ["Resistência baixa", "Direção errada", "Alinhar com a força"],
        ],
      },
      goldenRule: "45° para a maioria. Alinhe com a carga para resistência máxima. O sólido interno é a base da peça.",
      summaryTable: {
        title: "Decisão Rápida",
        headers: ["Tipo de Peça", "Direção Recomendada", "Motivo"],
        rows: [
          ["Uso geral", "45°", "Distribuição uniforme"],
          ["Carga horizontal", "0°", "Força em X"],
          ["Carga vertical", "90°", "Força em Y"],
          ["Carga complexa", "0°/90°", "Força em ambas direções"],
        ],
      },
    },
    {
      name: "Sólido interno › Gabarito de rotação de preenchimento sólido",
      value: "Padrão",
      whatIs:
        "Define o ponto de referência (gabarito) a partir do qual a direção do infill sólido é calculada. Determina o alinhamento e a consistência do padrão entre camadas sólidas.",
      whyAdjust:
        "Define o alinhamento do infill sólido, afeta a consistência do padrão entre camadas e pode melhorar a distribuição de forças quando ajustado para um ponto específico da peça.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Padrão", "Rotação a partir do centro da peça"],
          ["Personalizado", "Rotação a partir de um ponto definido pelo usuário"],
        ],
      },
      influences: "Consistência do padrão de sólido entre camadas e o alinhamento global do infill sólido com a geometria da peça.",
      generates: "Padrão consistente e previsível em peças simétricas; ajuste personalizado em peças com geometria assimétrica.",
      goldenRule: "Mantenha 'Padrão' na maioria; só use personalizado quando precisar alinhar o sólido a um eixo específico da peça.",
    },
    {
      name: "Sólido interno › Aplicar preenchimento de vão",
      value: "Ativado",
      whatIs:
        "Ativa a função que preenche automaticamente pequenos espaços (vãos) entre paredes e infill com linhas adicionais. Previne lacunas microscópicas que enfraqueceriam a peça.",
      whyAdjust:
        "Vãos entre parede e infill criam pontos de falha. Ativar garante que a peça seja realmente sólida no interior, melhorando resistência sem afetar significativamente o tempo.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando Usar"],
        rows: [
          ["Ativado", "Preenche vãos automaticamente", "Uso geral, peças estruturais"],
          ["Desativado", "Deixa vãos", "Velocidade, peças decorativas"],
        ],
      },
      influences: "Resistência da interface parede/infill, integridade interna e tempo de fatiamento.",
      generates: "Peças realmente sólidas no interior, sem pontos de fragilidade entre paredes e infill.",
      goldenRule: "Ative para peças estruturais. O preenchimento de vão evita lacunas.",
    },
    {
      name: "Sólido interno › Filtrar vazios pequenos",
      value: "Ativado",
      whatIs:
        "Remove vazios muito pequenos que não afetam a estrutura da peça. Vazios microscópicos não impactam a resistência, mas geram G-code mais pesado e tempo de fatiamento maior.",
      whyAdjust:
        "Simplifica o G-code, reduz tempo de fatiamento e elimina movimentos extras inúteis em vazios irrelevantes.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando Usar"],
        rows: [
          ["Ativado", "Remove vazios pequenos", "Uso geral"],
          ["Desativado", "Mantém todos os vazios", "Peças com requisitos especiais"],
        ],
      },
      influences: "Tempo de fatiamento, tamanho do G-code e tempo de impressão.",
      generates: "G-code mais limpo, fatiamento mais rápido, mesma resistência efetiva.",
      goldenRule: "Ative para a maioria. Vazios pequenos não afetam a resistência.",
    },
    {
      name: "Sólido interno › Sobreposição de preenchimento/parede",
      value: "20%",
      whatIs:
        "Define quanto o infill se sobrepõe à parede para garantir uma conexão forte na interface. Parâmetro fundamental para a integridade estrutural da peça. Analogia: é a 'cola' que une duas peças de madeira — pouca cola = peças se soltam; cola suficiente = união forte.",
      whyAdjust:
        "Conecta o infill à parede, previne lacunas na interface e melhora a resistência. Sem sobreposição adequada, o infill se descola da parede sob carga.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando Usar"],
        rows: [
          ["0–10%", "Pouca sobreposição", "Peças decorativas"],
          ["15–25% (padrão)", "Sobreposição média", "Uso geral"],
          ["30–40%", "Muita sobreposição", "Peças estruturais"],
          ["50%", "Sobrepõe metade", "Peças de alta resistência"],
        ],
      },
      influences:
        "Tipo de peça (decorativa 10–15%, funcional 20–25%, estrutural 30–40%), material (PLA 15–25%, PETG 20–30%, ABS 20–30%, Nylon 25–35%), densidade do infill (baixa pede mais; alta pede menos) e número de paredes (poucas pedem mais; muitas pedem menos).",
      generates:
        "Sobreposição correta = peça forte e parede lisa. Sobreposição insuficiente = peça fraca, infill descola. Sobreposição excessiva = marcas visíveis e possíveis bolhas na parede externa.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando Usar"],
        rows: [
          ["0–10%", "Infill pode se soltar", "Peças decorativas"],
          ["15–25%", "Conexão forte, sem excesso", "Uso geral"],
          ["30–40%", "Conexão muito forte, possíveis marcas", "Peças estruturais"],
          ["50%+", "Infill pode aparecer na parede", "Casos extremos"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste Recomendado"],
        rows: [
          ["Densidade do infill", "Complementa a conexão", "Ajustar juntos"],
          ["Número de paredes", "Afeta a necessidade", "Mais paredes = menos sobreposição"],
          ["Largura da linha", "Afeta a sobreposição real", "Ajustar proporcionalmente"],
        ],
      },
      howTo: [
        { step: "1. Abrir aba Prepare", path: "OrcaSlicer 2.4", desc: "Abra o projeto" },
        { step: "2. Painel esquerdo", path: "Resistência › Sólido interno", desc: "Expanda a seção" },
        { step: "3. Localizar parâmetro", path: "Sobreposição de preenchimento/parede", desc: "Campo em porcentagem" },
        { step: "4. Definir valor", path: "Ex: 20%", desc: "Comece com 20%; aumente para 25% se houver lacunas; reduza para 15% se aparecer marca na parede" },
      ],
      example: {
        piece: "Caixa organizadora / Suporte estrutural / Estatueta decorativa",
        config: "Caixa = 20% · Suporte = 30% · Estatueta = 10%",
        result: "Caixa: conexão forte e sem marcas (excelente). Suporte: conexão muito forte com leves marcas (funcional). Estatueta: conexão suficiente sem marcas (excelente).",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Infill se solta da parede", "Sobreposição insuficiente", "Aumentar para 25–30%"],
          ["Marcas na parede externa", "Sobreposição excessiva", "Reduzir para 15–20%"],
          ["Peça quebra na interface", "Conexão fraca", "Aumentar sobreposição"],
          ["Tempo de impressão alto", "Sobreposição muito alta", "Reduzir para 20%"],
        ],
      },
      goldenRule: "20% para a maioria. A sobreposição conecta o infill à parede. Nem muito, nem pouco.",
      summaryTable: {
        title: "Decisão Rápida",
        headers: ["Tipo de Peça", "Sobreposição Recomendada", "Motivo"],
        rows: [
          ["Decorativa", "10–15%", "Sem marcas"],
          ["Uso geral", "20%", "Equilíbrio"],
          ["Estrutural", "25–30%", "Conexão forte"],
          ["Alta carga", "30–40%", "Máxima resistência"],
        ],
      },
    },

    // ───────────── MÓDULO 2: AVANÇADO ─────────────
    {
      name: "Avançado › Alinhar direção do preenchimento ao modelo",
      value: "Desativado",
      whatIs:
        "Ajusta automaticamente a direção do infill para se alinhar com a geometria do modelo, otimizando a resistência localmente em cada área da peça.",
      whyAdjust:
        "Otimiza resistência por região, melhora distribuição de forças em peças complexas e automatiza um ajuste que seria impossível fazer manualmente em geometrias orgânicas.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando Usar"],
        rows: [
          ["Ativado", "Ajuste automático por região", "Peças complexas, orgânicas"],
          ["Desativado", "Direção fixa global", "Peças simples, estruturais"],
        ],
      },
      influences: "Resistência local em cada área, comportamento mecânico em peças com geometria variável.",
      generates: "Peças orgânicas com resistência otimizada por região. Em peças simples, gera complexidade desnecessária.",
      goldenRule: "Ative para geometrias complexas. O alinhamento melhora a resistência.",
    },
    {
      name: "Avançado › Inserir camadas sólidas",
      value: "0",
      whatIs:
        "Adiciona camadas 100% sólidas em intervalos regulares dentro do infill esparso, criando reforços internos horizontais ao longo da altura da peça.",
      whyAdjust:
        "Cria reforços horizontais que aumentam drasticamente a resistência em compressão e flexão, especialmente útil em peças altas que sofrem carga vertical.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando Usar"],
        rows: [
          ["0", "Sem camadas extras", "Peças simples"],
          ["2–3", "Camadas a cada 2–3 mm", "Peças estruturais"],
          ["5+", "Muitas camadas", "Peças de alta resistência"],
        ],
      },
      influences: "Resistência à compressão e flexão, peso da peça, consumo de filamento e tempo de impressão.",
      generates: "Peças com 'lajes' internas que aumentam resistência sem precisar elevar densidade total do infill.",
      goldenRule: "Use 2–3 para peças estruturais. Camadas sólidas reforçam o interior.",
    },
    {
      name: "Avançado › Direção de preenchimento de ponte externa",
      value: "0°",
      whatIs:
        "Define o ângulo das linhas do infill nas pontes externas — aquelas que ficam visíveis e enfrentam o vão sem suporte.",
      whyAdjust:
        "Alinhar com a direção da ponte garante que cada linha cruze o vão como uma viga independente, sustentada nas duas extremidades.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["0°", "Alinhado com a ponte"],
          ["45°", "Diagonal"],
        ],
      },
      influences: "Qualidade visual e resistência da ponte externa.",
      generates: "0° dá pontes mais firmes e limpas; 45° pode causar droop se o vão for grande.",
      goldenRule: "0° para pontes que precisam de resistência.",
    },
    {
      name: "Avançado › Direção de preenchimento de ponte interna",
      value: "0°",
      whatIs:
        "Define o ângulo do infill nas pontes internas — áreas onde uma camada sólida precisa atravessar um vão sobre o infill esparso.",
      whyAdjust:
        "Boa direção interna evita 'pelos' e camadas mal formadas que comprometem o suporte das camadas superiores.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["0°", "Alinhado com a ponte"],
          ["45°", "Diagonal"],
        ],
      },
      influences: "Qualidade do topo da peça e estabilidade das camadas que vêm depois da ponte interna.",
      generates: "0° dá pontes internas firmes que servem de base limpa para as camadas seguintes.",
      goldenRule: "Mantenha 0° para máxima estabilidade interna.",
    },
    {
      name: "Avançado › Relative bridge angle",
      value: "Desativado",
      whatIs:
        "Define se o ângulo da ponte é relativo à geometria local da ponte (ativo) ou absoluto em relação ao eixo XY da impressora (desativado).",
      whyAdjust:
        "Em peças com múltiplas pontes em direções diferentes, o modo relativo faz o Orca rotacionar automaticamente cada ponte para o melhor ângulo individual.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Ângulo relativo à ponte (auto por ponte)"],
          ["Desativado", "Ângulo absoluto global"],
        ],
      },
      influences: "Qualidade de pontes em peças com múltiplas direções de vão.",
      generates: "Ativado = cada ponte recebe o melhor ângulo localmente. Desativado = ângulo único global.",
      goldenRule: "Ative em peças com várias pontes em direções diferentes.",
    },
    {
      name: "Avançado › Limiar mínimo de preenchimento esparso",
      value: "0 mm²",
      whatIs:
        "Define a área mínima para que o infill esparso seja aplicado. Áreas menores que esse limiar são preenchidas como sólido em vez de receber padrão esparso.",
      whyAdjust:
        "Evita o Orca tentar gerar padrão de infill esparso em áreas tão pequenas que ele se transformaria em traços soltos. Em áreas pequenas, sólido é mais forte e rápido.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["0 mm²", "Infill esparso em todas as áreas"],
          ["10–50 mm²", "Áreas menores viram sólidas"],
        ],
      },
      influences: "Qualidade e resistência de áreas pequenas internas, tempo de impressão.",
      generates: "Áreas pequenas com sólido firme em vez de padrão fragmentado.",
      goldenRule: "10–15 mm² é o sweet spot para a maioria das peças.",
    },
    {
      name: "Avançado › Combinar preenchimento",
      value: "Desativado",
      whatIs:
        "Une várias camadas de infill esparso em uma única camada mais grossa, imprimindo o infill apenas a cada N camadas em vez de em todas.",
      whyAdjust:
        "Acelera drasticamente a impressão de peças com bastante infill, ao custo de menor precisão dimensional interna.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Une camadas de infill (mais rápido)"],
          ["Desativado", "Cada camada com seu infill (mais preciso)"],
        ],
      },
      influences: "Tempo de impressão, precisão dimensional interna, qualidade de pontes internas.",
      generates: "Ativado = ganho de tempo significativo. Desativado = precisão máxima.",
      goldenRule: "Mantenha desativado para precisão. Ative apenas em peças funcionais grandes onde tempo importa.",
    },
    {
      name: "Avançado › Detectar preenchimentos sólidos internos estreitos",
      value: "Ativado",
      whatIs:
        "Identifica automaticamente áreas internas estreitas que precisam de tratamento sólido especial para evitar gaps e fragilidade.",
      whyAdjust:
        "Sem essa detecção, áreas finas internas podem ficar com infill mal distribuído, gerando pontos fracos invisíveis.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Detecta e reforça áreas estreitas"],
          ["Desativado", "Tratamento padrão"],
        ],
      },
      influences: "Resistência em regiões finas internas, integridade estrutural em paredes com nervuras.",
      generates: "Peças mais consistentes em geometrias com regiões internas finas.",
      goldenRule: "Mantenha ativado — reforça regiões finas sem custo perceptível.",
    },
    {
      name: "Avançado › Garantir a espessura vertical da casca",
      value: "Ativado (Todos)",
      whatIs:
        "Garante que a casca (topo e base) tenha a espessura definida em TODAS as áreas, mesmo em superfícies inclinadas onde naturalmente o número de camadas sólidas seria menor.",
      whyAdjust:
        "Sem esse ajuste, superfícies inclinadas ficam translúcidas ou com vazamento dimensional. Com ele, o Orca adiciona camadas sólidas extras onde a inclinação reduziria a espessura efetiva.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Espessura garantida em toda a superfície"],
          ["Desativado", "Espessura variável conforme inclinação"],
        ],
      },
      influences: "Estanqueidade, opacidade e integridade dimensional em áreas inclinadas.",
      generates: "Peças sem vazamentos, sem zonas translúcidas e com casca consistente em todas as inclinações.",
      goldenRule: "Mantenha ativado em 'Todos' — resolve 90% dos casos de vazamento dimensional em geometrias complexas.",
    },
  ],


  // ====================================================================
  // TELA 31 — VELOCIDADE (Primeira camada · Outras camadas · Saliências)
  // ====================================================================
  "tela-31-velocidade-primeira-camada": [
    // ───────────── MÓDULO 1: VELOCIDADE DA PRIMEIRA CAMADA ─────────────
    {
      name: "Primeira camada › Primeira camada",
      value: "30 mm/s (padrão recomendado)",
      whatIs:
        "Define a velocidade com que o bico se move ao imprimir a primeira camada da peça. É uma das configurações mais críticas: a primeira camada é a base de toda a impressão — se falhar, toda a peça falha. Analogia: é a fundação de uma casa — precisa ser feita com calma; uma fundação rápida e mal feita compromete toda a construção.",
      whyAdjust:
        "Velocidade lenta garante adesão e precisão. A primeira camada deve ser 50–70% mais lenta que as outras: se a normal é 200 mm/s, a primeira fica em ~50 mm/s. Essa redução compensa irregularidades da mesa e dá tempo do plástico 'esmagar' contra a superfície.",
      optionsTable: {
        headers: ["Velocidade", "Efeito", "Quando Usar"],
        rows: [
          ["10–15 mm/s", "Muito lenta", "Mesas irregulares, materiais difíceis"],
          ["20–30 mm/s", "Recomendado", "Uso geral, boa adesão"],
          ["40–50 mm/s", "Rápida", "Mesas perfeitas, peças pequenas"],
          ["60+ mm/s", "Muito rápida", "Risco de falha na adesão"],
        ],
      },
      influences:
        "Tipo de superfície da mesa (PEI lisa 30–40, vidro 20–30, magnética 30–50, Kapton 20–30), material (PLA 30–50, PETG 20–30, ABS 15–25, TPU 15–20), tamanho da peça (pequenas 30–40, médias 25–35, grandes 20–30), nivelamento da mesa (bem nivelada 30–50, desníveis 20–30, irregular 10–20) e uso de adesivos (com cola 30–50, sem 20–30).",
      generates:
        "Velocidade lenta = adesão excelente e linha uniforme. Velocidade média = bom equilíbrio. Velocidade rápida = adesão aceitável mas com risco. Adesão é inversamente proporcional à velocidade; lenta dá tempo do plástico esmagar e selar.",
      generatesTable: {
        headers: ["Configuração", "Resultado", "Quando Usar"],
        rows: [
          ["Lenta (20 mm/s)", "Adesão excelente, linha uniforme", "Peças grandes, mesas irregulares"],
          ["Média (30 mm/s)", "Boa adesão, equilíbrio", "Uso geral"],
          ["Rápida (50 mm/s)", "Adesão aceitável, rápida", "Peças pequenas, mesas perfeitas"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste Recomendado"],
        rows: [
          ["Altura da primeira camada", "Deve ser mais grossa", "0,24–0,30 mm"],
          ["Largura da primeira camada", "Deve ser mais grossa", "0,50–0,60 mm"],
          ["Temperatura da mesa", "Adequada ao material", "PLA 60°C · PETG 80°C"],
          ["Z-Offset", "Calibrado", "Ajustar com papel"],
          ["Brim/Skirt", "Complementa a adesão", "Ativar em peças grandes"],
        ],
      },
      howTo: [
        { step: "1. Abrir OrcaSlicer 2.4", path: "Aba Prepare", desc: "Abra o projeto" },
        { step: "2. Painel esquerdo", path: "Velocidade › Velocidade da primeira camada", desc: "Expanda a seção" },
        { step: "3. Localizar parâmetro", path: "Primeira camada", desc: "Campo em mm/s" },
        { step: "4. Definir valor", path: "Ex: 30 mm/s", desc: "Comece com 30; reduza para 20 em adesão ruim; aumente para 40 em mesas ótimas" },
      ],
      example: {
        piece: "Suporte de parede 200×150 mm / Miniatura pequena / Peça técnica ABS",
        config: "Suporte = 25 mm/s · Miniatura = 40 mm/s · ABS = 20 mm/s",
        result: "Suporte: adesão perfeita sem warping. Miniatura: boa adesão e rápida. ABS: adesão garantida sem warping.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Peça descola da mesa", "Velocidade muito alta", "Reduzir para 20–30 mm/s"],
          ["Primeira camada irregular", "Velocidade inconsistente", "Manter velocidade constante"],
          ["Linhas não se tocam", "Velocidade muito alta", "Reduzir para 20–30 mm/s"],
          ["Tempo de impressão alto", "Velocidade muito baixa", "Aumentar para 30–40 mm/s"],
        ],
      },
      goldenRule: "Primeira camada lenta = sucesso garantido. Use 30 mm/s para a maioria. Reduza para 20 mm/s em casos difíceis.",
      summaryTable: {
        title: "Decisão Rápida (Material × Mesa)",
        headers: ["Material", "Mesa", "Velocidade Recomendada"],
        rows: [
          ["PLA", "PEI lisa", "30–40 mm/s"],
          ["PLA", "Vidro", "20–30 mm/s"],
          ["PETG", "PEI lisa", "20–30 mm/s"],
          ["PETG", "Vidro com cola", "15–25 mm/s"],
          ["ABS", "PEI com cola", "15–25 mm/s"],
          ["TPU", "PEI lisa", "15–20 mm/s"],
        ],
      },
    },
    {
      name: "Primeira camada › Preenchimento da primeira camada",
      value: "60 mm/s (40–80 recomendado)",
      whatIs:
        "Define a velocidade do infill (preenchimento) na primeira camada. Geralmente é mais rápido que a parede externa, mas ainda mais lento que as outras camadas. Por ser interno, não precisa do mesmo cuidado estético da parede.",
      whyAdjust:
        "O infill da primeira camada não é visível, então pode ir mais rápido — mas ainda precisa aderir bem à mesa. Regra: 1,5–2× mais rápido que a parede externa da primeira camada.",
      optionsTable: {
        headers: ["Velocidade", "Efeito", "Quando Usar"],
        rows: [
          ["40–60 mm/s", "Recomendado", "Uso geral"],
          ["60–80 mm/s", "Rápida", "Mesas perfeitas"],
          ["20–40 mm/s", "Lenta", "Materiais difíceis"],
        ],
      },
      influences: "Adesão do infill da primeira camada, tempo total da camada inicial e qualidade da base interna.",
      generates: "Infill da base bem aderido e firme, servindo como apoio estável para as camadas seguintes.",
      goldenRule: "1,5–2× a velocidade da parede externa da primeira camada.",
    },
    {
      name: "Primeira camada › Velocidade de deslocamento da primeira camada",
      value: "100% (50–80 mm/s na prática)",
      whatIs:
        "Define a velocidade dos movimentos aéreos (travel) durante a primeira camada. Como a primeira camada ainda está mole, deslocamentos rápidos podem arrastar plástico ou derrubar partes recém-impressas.",
      whyAdjust:
        "Travel alto na primeira camada cria marcas, arranca linhas e pode descolar trechos. Manter <100 mm/s evita esses problemas.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando Usar"],
        rows: [
          ["50–80 mm/s", "Seguro, sem marcas", "Uso geral"],
          ["80–120 mm/s", "Rápido", "Peças pequenas"],
          ["120+ mm/s", "Muito rápido", "Risco de marcas"],
        ],
      },
      influences: "Marcas na primeira camada, risco de arrancar trechos recém-impressos, tempo total da camada inicial.",
      generates: "Travel moderado = primeira camada limpa sem marcas de deslocamento.",
      goldenRule: "Mantenha abaixo de 100 mm/s na primeira camada.",
    },
    {
      name: "Primeira camada › Número de camadas lentas",
      value: "1",
      whatIs:
        "Define quantas camadas iniciais são impressas na velocidade reduzida da primeira camada antes de acelerar para a velocidade normal das outras camadas.",
      whyAdjust:
        "Transição gradual melhora adesão, evita mudanças bruscas de velocidade e reduz risco de warping — fundamental em materiais que contraem muito (ABS, ASA, Nylon).",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando Usar"],
        rows: [
          ["1", "Padrão", "Uso geral"],
          ["2–3", "Transição suave", "Peças grandes, ABS"],
          ["4–5", "Transição muito suave", "Materiais que contraem muito"],
        ],
      },
      influences: "Risco de warping, qualidade das primeiras camadas, tempo total inicial.",
      generates: "Mais camadas lentas = peça com base mais firme e menos warping em materiais difíceis.",
      goldenRule: "1 camada para PLA. 2–3 para ABS. A transição gradual reduz o warping.",
    },

    // ───────────── MÓDULO 2: VELOCIDADE DE OUTRAS CAMADAS ─────────────
    {
      name: "Outras camadas › Parede externa",
      value: "50 mm/s (padrão recomendado)",
      whatIs:
        "Velocidade da parede mais externa, a superfície visível da peça. É o parâmetro que mais afeta a qualidade estética da impressão. Analogia: é como pintar um quadro — pintar rápido deixa a tinta irregular; pintar devagar dá acabamento perfeito.",
      whyAdjust:
        "Velocidades altas causam vibrações que viram ghosting e marcas visíveis. A parede externa deve ser a velocidade MAIS LENTA do perfil — é a linha que define a qualidade final da peça.",
      optionsTable: {
        headers: ["Velocidade", "Efeito", "Quando Usar"],
        rows: [
          ["30–40 mm/s", "Muito lenta", "Alta qualidade estética"],
          ["40–60 mm/s", "Recomendado", "Uso geral, bom equilíbrio"],
          ["60–80 mm/s", "Rápida", "Peças menos críticas"],
          ["80–120 mm/s", "Muito rápida", "Risco de ghosting"],
        ],
      },
      influences:
        "Material (PLA 40–60, PETG 30–50, ABS 40–60, TPU 15–25, Nylon 30–50), aceleração (baixa permite mais velocidade; alta exige menos), temperatura (bico quente aceita mais velocidade) e altura da camada (fina pede menos; grossa aceita mais).",
      generates:
        "Velocidade alta = ghosting visível (fantasmas da geometria na parede) e menor precisão dimensional. Velocidade baixa = superfície espelhada e máxima precisão. Precisão e qualidade são inversamente proporcionais à velocidade.",
      generatesTable: {
        headers: ["Configuração", "Resultado Visual", "Quando Usar"],
        rows: [
          ["30–40 mm/s", "Superfície espelhada, sem marcas", "Alta qualidade"],
          ["50–60 mm/s", "Boa qualidade, equilibrada", "Uso geral"],
          ["70–80 mm/s", "Qualidade aceitável, marcas leves", "Protótipos"],
          ["100+ mm/s", "Qualidade baixa, ghosting", "Internas, estruturais"],
        ],
      },
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste Recomendado"],
        rows: [
          ["Aceleração", "Deve ser baixa", "500–1000 mm/s²"],
          ["Temperatura", "Mais quente = mais rápido", "Ajustar conforme velocidade"],
          ["Fluxo", "Velocidade alta = fluxo alto", "Calibrar ambos"],
          ["Input Shaping", "Permite velocidades maiores", "Ativar para velocidade"],
          ["Jerk", "Deve ser baixo", "5–8 mm/s"],
        ],
      },
      howTo: [
        { step: "1. Abrir OrcaSlicer 2.4", path: "Aba Prepare", desc: "Abra o projeto" },
        { step: "2. Painel esquerdo", path: "Velocidade › Velocidade de outras camadas", desc: "Expanda a seção" },
        { step: "3. Localizar parâmetro", path: "Parede externa", desc: "Campo em mm/s" },
        { step: "4. Definir valor", path: "Ex: 50 mm/s", desc: "Comece com 50 (PLA); aumente para 60 se qualidade boa; reduza para 40 se houver ghosting" },
      ],
      example: {
        piece: "Busto decorativo / Caixa organizadora / Suporte estrutural",
        config: "Busto = 40 mm/s · Caixa = 50 mm/s · Suporte = 70 mm/s",
        result: "Busto: superfície perfeita sem marcas. Caixa: boa qualidade em tempo moderado. Suporte: qualidade aceitável e rápida.",
      },
      errorsTable: {
        headers: ["Sintoma", "Causa", "Solução"],
        rows: [
          ["Ghosting nas paredes", "Velocidade muito alta", "Reduzir para 40–50 mm/s"],
          ["Superfície irregular", "Velocidade inconsistente", "Manter velocidade constante"],
          ["Paredes com marcas", "Aceleração muito alta", "Reduzir aceleração"],
          ["Tempo de impressão alto", "Velocidade muito baixa", "Aumentar para 50–60 mm/s"],
        ],
      },
      goldenRule: "Parede externa lenta = qualidade. 50 mm/s para a maioria. Reduza para 40 mm/s para perfeição.",
      summaryTable: {
        title: "Decisão Rápida (Qualidade × Material)",
        headers: ["Qualidade", "PLA", "PETG", "ABS", "TPU"],
        rows: [
          ["Excelente", "35–45", "25–35", "30–40", "10–15"],
          ["Boa", "45–60", "35–50", "40–60", "15–25"],
          ["Rápida", "60–80", "50–70", "60–80", "25–35"],
        ],
      },
    },
    {
      name: "Outras camadas › Parede interna",
      value: "150 mm/s (80–250 conforme máquina)",
      whatIs:
        "Velocidade das paredes internas — estruturais e não visíveis externamente. Como ficam atrás da parede externa, não precisam de acabamento estético perfeito, apenas resistência e boa coesão.",
      whyAdjust:
        "Pode ir muito mais rápido que a externa porque não é visível. Foco em eficiência e resistência interna. Regra: 2–3× a velocidade da parede externa.",
      optionsTable: {
        headers: ["Velocidade", "Efeito", "Quando Usar"],
        rows: [
          ["80–120 mm/s", "Rápida", "Eficiência máxima"],
          ["120–200 mm/s", "Muito rápida", "Peças estruturais"],
          ["150–250 mm/s", "Extrema", "Impressoras rápidas"],
        ],
      },
      influences: "Tempo total de impressão, coesão entre paredes internas e externas, capacidade do hotend.",
      generates: "Tempo total reduzido sem comprometer qualidade visível.",
      goldenRule: "2–3× a velocidade da parede externa. Sem custo estético.",
    },
    {
      name: "Outras camadas › Pequenos perímetros",
      value: "50% da parede normal",
      whatIs:
        "Define uma velocidade reduzida (como porcentagem) para áreas pequenas — detalhes finos, pontas, recortes pequenos. Áreas pequenas exigem mais precisão; reduzir velocidade evita 'blobs' e perda de definição.",
      whyAdjust:
        "Em detalhes finos, a velocidade normal é alta demais para o material esfriar entre passes próximos, gerando blobs. Reduzir compensa.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando Usar"],
        rows: [
          ["50%", "Metade da velocidade", "Detalhes muito finos"],
          ["75%", "Redução moderada", "Uso geral"],
          ["100%", "Velocidade normal", "Sem detalhes finos"],
        ],
      },
      influences: "Definição de detalhes finos, presença de blobs, qualidade em pontas e recortes.",
      generates: "Detalhes pequenos com definição preservada, sem blobs.",
      goldenRule: "50% é o sweet spot para detalhes finos.",
    },
    {
      name: "Outras camadas › Limiar de pequenos perímetros",
      value: "0 mm",
      whatIs:
        "Define o tamanho máximo (em mm) de uma área para ser considerada 'pequena' e receber a velocidade reduzida. Acima desse limiar, mesmo perímetros curtos usam velocidade normal.",
      whyAdjust:
        "Aumentar faz mais áreas se beneficiarem da velocidade reduzida; diminuir ou zerar mantém velocidade normal em quase tudo.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["0 mm", "Todas as áreas com velocidade normal"],
          ["5–10 mm", "Pequenas áreas com velocidade reduzida"],
        ],
      },
      influences: "Quais perímetros recebem velocidade reduzida, qualidade em detalhes e tempo total.",
      generates: "Definição preservada em áreas curtas quando ajustado para 5–10 mm.",
      goldenRule: "5–10 mm para peças com muitos detalhes finos.",
    },
    {
      name: "Outras camadas › Preenchimento esparso",
      value: "200 mm/s (150–350 conforme máquina)",
      whatIs:
        "Velocidade do infill esparso da peça. Como é totalmente interno e invisível, pode ser a velocidade MAIS ALTA do perfil — ganho direto de tempo sem perda visual.",
      whyAdjust:
        "Infill é onde se ganha mais tempo. Regra: 3–5× a velocidade da parede externa. Limitado apenas pela capacidade do hotend.",
      optionsTable: {
        headers: ["Velocidade", "Efeito", "Quando Usar"],
        rows: [
          ["150–250 mm/s", "Rápida", "Uso geral"],
          ["250–350 mm/s", "Muito rápida", "Impressoras rápidas"],
          ["350+ mm/s", "Extrema", "Fazendas de impressão"],
        ],
      },
      influences: "Tempo total da impressão (infill costuma representar 40–60% do tempo), capacidade do hotend, qualidade interna (geralmente irrelevante visualmente).",
      generates: "Redução drástica do tempo total sem afetar qualidade externa.",
      goldenRule: "3–5× a velocidade da parede externa. É onde se ganha mais tempo.",
    },
    {
      name: "Outras camadas › Preenchimento sólido",
      value: "150 mm/s",
      whatIs:
        "Velocidade do infill denso (100%) que conecta o infill esparso às paredes — a 'cola' estrutural entre regiões. Precisa de boa adesão para garantir transferência de carga entre infill e paredes.",
      whyAdjust:
        "Sólido demais rápido = adesão fraca entre regiões. Mais lento que o esparso, mais rápido que a parede externa.",
      optionsTable: {
        headers: ["Velocidade", "Efeito"],
        rows: [
          ["100–150 mm/s", "Moderada"],
          ["150–200 mm/s", "Rápida"],
        ],
      },
      influences: "Adesão entre infill e paredes, resistência mecânica da peça.",
      generates: "Conexão firme entre regiões internas e paredes externas.",
      goldenRule: "Mantenha entre a parede externa e o infill esparso. 150 mm/s é seguro.",
    },
    {
      name: "Outras camadas › Superfície superior",
      value: "50 mm/s (30–80 recomendado)",
      whatIs:
        "Velocidade da última camada superior — a face de TOPO visível da peça. Como é uma superfície estética crítica, exige velocidade reduzida para acabamento liso. Pode ser combinada com Ironing.",
      whyAdjust:
        "Velocidade alta no topo deixa textura visível, linhas tortas e cantos mal fechados. Reduzir garante face plana e brilhante.",
      optionsTable: {
        headers: ["Velocidade", "Efeito"],
        rows: [
          ["30–50 mm/s", "Superfície lisa"],
          ["50–80 mm/s", "Equilíbrio"],
          ["80–120 mm/s", "Rápida"],
        ],
      },
      influences: "Acabamento da face superior, eficácia do Ironing, presença de pinholes.",
      generates: "Topo liso e uniforme, especialmente com Ironing ativo.",
      goldenRule: "Trate como a parede externa: lenta = bonita.",
    },
    {
      name: "Outras camadas › Preenchimento de vão",
      value: "150 mm/s",
      whatIs:
        "Velocidade das linhas que preenchem vãos pequenos entre paredes (gap fill) — usadas quando a geometria deixa espaços que não cabem uma linha inteira mas precisam ser preenchidos.",
      whyAdjust:
        "Gap fill geralmente são linhas curtas e irregulares — velocidade muito alta gera blobs e cantos sujos.",
      optionsTable: {
        headers: ["Velocidade", "Efeito"],
        rows: [
          ["100–150 mm/s", "Moderada"],
          ["150–250 mm/s", "Rápida"],
        ],
      },
      influences: "Qualidade visual em transições parede-vão, presença de blobs em geometrias finas.",
      generates: "Vãos preenchidos com firmeza sem blobs.",
      goldenRule: "Mantenha próximo à velocidade do sólido interno.",
    },
    {
      name: "Outras camadas › Suporte",
      value: "150 mm/s (80–200 conforme tipo)",
      whatIs:
        "Velocidade das estruturas de suporte. Como suportes são descartáveis e não fazem parte da peça final, podem ser rápidos — qualidade visual não importa.",
      whyAdjust:
        "Ganho de tempo direto. Único limite é não derrubar a estrutura por velocidade excessiva (causa vibração).",
      optionsTable: {
        headers: ["Velocidade", "Efeito"],
        rows: [
          ["80–150 mm/s", "Rápida"],
          ["150–200 mm/s", "Muito rápida"],
        ],
      },
      influences: "Tempo total da impressão, estabilidade do suporte durante a impressão.",
      generates: "Suportes rápidos sem comprometer a estabilidade da peça.",
      goldenRule: "Rápido — suporte vai para o lixo.",
    },
    {
      name: "Outras camadas › Interface de suporte",
      value: "50 mm/s (30–80 recomendado)",
      whatIs:
        "Velocidade da camada de interface do suporte — a parte que TOCA a face inferior da peça. Define a qualidade da superfície suportada e a facilidade de remoção.",
      whyAdjust:
        "Velocidade lenta na interface = face inferior lisa e suporte que solta limpo. Velocidade alta = face áspera e suporte fundido.",
      optionsTable: {
        headers: ["Velocidade", "Efeito"],
        rows: [
          ["30–50 mm/s", "Interface limpa"],
          ["50–80 mm/s", "Equilíbrio"],
          ["80–120 mm/s", "Rápida"],
        ],
      },
      influences: "Acabamento da face suportada, facilidade de remoção do suporte.",
      generates: "Face inferior da peça lisa e suporte que solta com puxão limpo.",
      goldenRule: "Trate como parede externa — lenta = face suportada bonita.",
    },

    // ───────────── MÓDULO 3: VELOCIDADE EM SALIÊNCIAS ─────────────
    {
      name: "Saliências › Reduzir velocidade em saliências",
      value: "Ativado",
      whatIs:
        "Reduz automaticamente a velocidade quando o bico imprime sobre overhangs (saliências). Permite que o cooling solidifique o plástico antes que ele caia, evitando droop e stringing.",
      whyAdjust:
        "Velocidade normal em saliência = plástico mole cai, gerando droop e cabelos. Velocidade reduzida + cooling 100% = overhangs limpos até 60–70°.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando Usar"],
        rows: [
          ["Ativado", "Reduz velocidade em overhangs", "Peças com saliências"],
          ["Desativado", "Mantém velocidade normal", "Peças sem saliências"],
        ],
      },
      influences: "Qualidade de overhangs sem suporte, necessidade de árvores de suporte, acabamento de faces inclinadas.",
      generates: "Overhangs limpos sem droop ou stringing, especialmente em PLA.",
      goldenRule: "Ative para peças com overhangs. Saliências precisam de velocidade reduzida.",
    },

    // ───────────── RESUMO TELA 31 ─────────────
    {
      name: "Resumo › Parâmetros principais da Tela 31",
      value: "Tabela consolidada",
      whatIs:
        "Visão consolidada de todos os parâmetros da Tela 31 com função, valor padrão e impacto principal. Use como referência rápida na hora de calibrar um novo perfil.",
      influences: "Estratégia global de velocidade da impressora.",
      generates: "Calibração mais rápida e consistente entre perfis.",
      goldenRule: "Parede externa lenta + infill rápido + primeira camada lenta = perfil equilibrado.",
      summaryTable: {
        title: "Resumo da Tela 31",
        headers: ["Parâmetro", "Função", "Valor Padrão", "Impacto"],
        rows: [
          ["Primeira camada", "Velocidade da base", "30–50 mm/s", "Adesão da peça"],
          ["Parede externa", "Velocidade da superfície", "50–60 mm/s", "Qualidade estética"],
          ["Parede interna", "Velocidade estrutural", "150–200 mm/s", "Eficiência"],
          ["Preenchimento esparso", "Velocidade do infill", "200–300 mm/s", "Tempo de impressão"],
          ["Superfície superior", "Velocidade do topo", "50–80 mm/s", "Acabamento"],
          ["Reduzir vel. em saliências", "Overhangs", "Ativado", "Qualidade de saliências"],
        ],
      },
    },
  ],

  // ====================================================================
  // TELA 32 — VELOCIDADE: Saliências, Travel e Aceleração
  // ====================================================================
  "tela-32-velocidade-saliencias-aceleracao": [
    // ───────── AULA 1 ─────────
    {
      name: "Reduzir velocidade para perímetros encurvados (Slow Down for Curled Perimeters)",
      value: "Checkbox (Ativar/Desativar)",
      whatIs:
        "Função que reduz automaticamente a velocidade do bocal em áreas onde as paredes podem se curvar ou enrolar (saliências severas e pontes), evitando que o filamento recém-depositado seja arrastado pelo bico.",
      whyAdjust:
        "Em saliências, o filamento não adere bem ao ar; velocidades altas pioram o problema. Reduzir automaticamente melhora a adesão e a integridade da camada — especialmente útil em overhangs acima de 45°.",
      influences:
        "Qualidade de overhangs, adesão entre camadas em áreas críticas, risco de curling (enrolamento das bordas).",
      generates:
        "Saliências mais limpas e estáveis, menos defeitos visíveis na face inferior das áreas suspensas.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Reduz velocidade em áreas críticas", "Peças com saliências > 45°"],
          ["Desativado", "Mantém velocidade normal", "Peças sem saliências"],
        ],
      },
      goldenRule:
        "Ative para qualquer peça com overhangs. A velocidade reduzida automática salva a qualidade em áreas críticas sem custo de configuração.",
    },
    // ───────── AULA 2 ─────────
    {
      name: "Velocidade em saliências (Overhang Speed)",
      value: "30 mm/s (padrão)",
      whatIs:
        "Velocidade específica aplicada às áreas classificadas como saliência (ângulos acima de ~45°). Substitui a velocidade normal da parede sempre que o slicer detecta overhang.",
      whyAdjust:
        "Saliências são as áreas mais frágeis da camada — velocidade baixa dá tempo para o cooling solidificar a linha antes que ela caia. Quanto maior o ângulo de saliência, menor deve ser a velocidade.",
      influences: "Adesão da saliência, droop (queda do filamento), acabamento da face inferior em áreas inclinadas.",
      generates:
        "Em PLA com cooling 100%, overhangs até 70° ficam limpos com 20–30 mm/s. Acima de 60 mm/s as bordas começam a cair.",
      optionsTable: {
        headers: ["Ângulo da saliência", "Velocidade recomendada"],
        rows: [
          ["25–45°", "40–60 mm/s"],
          ["45–60°", "20–30 mm/s"],
          ["60–75°", "10–20 mm/s"],
          ["75–90°", "5–10 mm/s"],
        ],
      },
      goldenRule: "Saliências severas pedem velocidade baixa. 30 mm/s atende a maioria dos casos em PLA/PETG.",
    },
    // ───────── AULAS 3–13: Velocidade de deslocamento (Travel) ─────────
    {
      name: "Velocidade de deslocamento (Travel) — visão geral",
      value: "Combinação de valores absolutos (mm/s) e percentuais (%)",
      whatIs:
        "Conjunto de velocidades para os movimentos do bico SEM extrusão (entre regiões impressas). Pode ser configurada em valor absoluto (mm/s) ou em porcentagem da velocidade padrão.",
      whyAdjust:
        "Travel não afeta diretamente a extrusão, mas impacta tempo total de impressão, stringing e risco de layer shift. Definir bem cada faixa equilibra eficiência e estabilidade mecânica.",
      influences: "Tempo total, stringing, ruído, risco de layer shift em máquinas cartesianas.",
      generates: "Travel bem ajustado economiza 15–25% do tempo em peças com muitas ilhas.",
      optionsTable: {
        headers: ["Valor da tela", "Tipo / Aplicação", "Quando usar"],
        rows: [
          ["150% (ou mm/s)", "Percentual sobre a velocidade padrão", "Equilíbrio (recomendado)"],
          ["100% (mm/s ou %)", "Igual à velocidade padrão", "Configuração conservadora"],
          ["30 mm/s", "Travel em áreas críticas", "Qualidade > eficiência"],
          ["300 mm/s", "Travel em áreas não críticas", "Equilíbrio entre tempo e estabilidade"],
          ["500 mm/s (ou %)", "Travel rápido", "Máquinas Core XY bem calibradas"],
          ["600 mm/s", "Travel agressivo", "Bambu / Voron com IS"],
          ["2000 mm/s", "Aceleração de travel (mm/s²)", "Movimentos aéreos rápidos"],
          ["4000 mm/s", "Aceleração intermediária (mm/s²)", "Travel + parede interna"],
          ["5000 mm/s (ou %)", "Aceleração alta (mm/s²)", "Infill / ponte"],
          ["10000 mm/s", "Aceleração máxima de travel (mm/s²)", "Apenas movimentos aéreos"],
          ["0 mm/s (ou %)", "Desativado / sem limite", "Usa o padrão da máquina"],
        ],
      },
      howTo: [
        { step: "1", path: "Painel Esquerdo › Velocidade › Velocidade de deslocamento", desc: "Expandir a seção" },
        { step: "2", path: "Travel principal", desc: "Core XY: 300–500 mm/s · Cartesiano: 150–200 mm/s" },
        { step: "3", path: "Aceleração travel", desc: "5000–10000 mm/s² apenas se a estrutura permitir" },
      ],
      goldenRule:
        "Velocidade baixa onde a qualidade conta (saliências, primeira camada). Velocidade e aceleração altas onde o bico está no AR (travel) — é onde se ganha tempo sem perder qualidade.",
    },
  ],

  // ====================================================================
  // TELA 33 — VELOCIDADE: Aceleração, Jerk(XY) e Suavização da Extrusão
  // ====================================================================
  "tela-33-velocidade-jerk-extrusao": [
    // ───────────── ACELERAÇÃO ─────────────
    {
      name: "Aceleração — Conceitos Gerais",
      value: "mm/s²",
      whatIs:
        "A Aceleração define a rapidez com que a cabeça de impressão muda de velocidade, medida em mm/s². Aceleração alta reduz tempo de impressão; aceleração baixa reduz vibrações (ghosting/ringing) e aumenta a qualidade visual.",
      whyAdjust:
        "É um dos parâmetros mais críticos da qualidade. A aceleração define o equilíbrio entre tempo de impressão e fidelidade dimensional. Estruturas robustas (Voron, Bambu) toleram acelerações altas; estruturas leves (Ender, Anycubic) precisam de valores conservadores. Input Shaping permite 2–3× mais aceleração sem ghosting.",
      optionsTable: {
        headers: ["Tipo de aceleração", "Valor da tela", "Quando usar"],
        rows: [
          ["Padrão", "5000 mm/s²", "Teto máximo da máquina"],
          ["Parede externa", "500 mm/s²", "Peças estéticas, superfícies visíveis"],
          ["Parede interna", "1000 mm/s²", "Estrutural, não visível"],
          ["Preenchimento", "2000 mm/s²", "Infill, área interna"],
          ["Superfície superior", "2000 mm/s²", "Topo visível"],
          ["Primeira camada", "500 mm/s²", "Adesão à mesa"],
          ["Travel 1ª camada", "2000 mm/s²", "Movimentos aéreos na base"],
          ["Deslocamento (Travel)", "10000 mm/s²", "Movimentos sem extrusão"],
        ],
      },
      howTo: [
        { step: "1", path: "Prepare > Velocidade > Aceleração", desc: "Expandir a seção" },
        { step: "2", path: "Parede externa", desc: "500–1000 mm/s² para qualidade visual" },
        { step: "3", path: "Preenchimento", desc: "2000–4000 mm/s² para ganhar tempo" },
        { step: "4", path: "Travel", desc: "5000–10000 mm/s² (máximo da máquina)" },
      ],
      example: {
        piece: "Busto decorativo de 80 mm",
        config: "Parede externa 500 mm/s² · Preenchimento 1500 mm/s² · Travel 8000 mm/s²",
        result: "Superfície lisa sem ghosting, tempo ligeiramente maior compensado pela qualidade.",
      },
      influences: "Ghosting/ringing, precisão dimensional, tempo de impressão, vibração mecânica.",
      generates: "Aceleração alta sem Input Shaping = fantasmas visíveis nas paredes. Aceleração baixa na parede externa = superfície espelhada.",
      goldenRule:
        "Parede externa = qualidade (500–1000). Preenchimento = velocidade (2000–4000). Travel = máximo (5000–10000). A aceleração define o equilíbrio entre qualidade e tempo.",
    },
    {
      name: "Aceleração — Padrão",
      value: "5000 mm/s²",
      whatIs:
        "Valor base usado quando nenhuma aceleração específica está definida. Funciona como teto máximo para todos os movimentos da máquina.",
      whyAdjust:
        "Se a aceleração padrão for muito alta, a máquina vibra mesmo em movimentos genéricos. Muito baixa e a impressão fica lenta sem motivo.",
      optionsTable: {
        headers: ["Valor", "Tipo de máquina", "Observação"],
        rows: [
          ["2000–3000 mm/s²", "Ender, Anycubic (estrutura leve)", "Conservador"],
          ["3000–5000 mm/s²", "Prusa, Creality K1 (estrutura média)", "Padrão"],
          ["5000–8000 mm/s²", "Voron, Bambu Lab (estrutura robusta)", "Agressivo"],
          ["8000+ mm/s²", "CoreXY com Input Shaping calibrado", "Extremo"],
        ],
      },
      influences: "Teto de todas as demais acelerações, vibração geral da máquina.",
      generates: "Padrão 8000 sem IS = ringing em qualquer movimento. Padrão 5000 com IS = velocidade real sem perda.",
      goldenRule: "A aceleração padrão define o teto da sua impressora. Respeite os limites mecânicos da máquina.",
    },
    {
      name: "Aceleração — Parede externa",
      value: "500 mm/s²",
      whatIs:
        "Aceleração da linha visível da peça. É o valor mais crítico para qualidade estética: define se cantos e curvas terão ghosting ou serão limpos.",
      whyAdjust:
        "A parede externa é a 'cara' da peça. Toda vibração aqui aparece como ondulação ou fantasma. Vale sacrificar tempo para ganhar acabamento.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["300–500 mm/s²", "Máxima qualidade", "Peças estéticas, miniaturas"],
          ["500–800 mm/s²", "Recomendado", "Uso geral"],
          ["800–1200 mm/s²", "Boa qualidade", "Peças funcionais"],
          ["1200–2000 mm/s²", "Aceitável", "Protótipos"],
        ],
      },
      influences: "Ghosting, ringing, definição de cantos, brilho da superfície.",
      generates: "Parede externa 500 = canto perfeito. Parede externa 2000 = ondulação visível depois de cada canto.",
      goldenRule: "Parede externa lenta = qualidade. 500–800 mm/s² para a maioria. 300 mm/s² para perfeição.",
    },
    {
      name: "Aceleração — Parede interna",
      value: "1000 mm/s²",
      whatIs:
        "Aceleração das paredes estruturais internas, escondidas pela externa. Pode ser maior pois não impacta o visual.",
      whyAdjust:
        "Aumentar aqui acelera a impressão sem prejuízo estético. Mas exagerar transmite vibração à parede externa.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["800–1200 mm/s²", "Recomendado", "Uso geral"],
          ["1200–2000 mm/s²", "Mais rápido", "Peças estruturais"],
          ["2000–3000 mm/s²", "Rápido", "Protótipos"],
        ],
      },
      influences: "Tempo de impressão, vibração transmitida à parede externa.",
      generates: "Interna 2000 + externa 500 = tempo reduzido sem perda visual.",
      goldenRule: "Parede interna sempre maior que a externa e menor que o preenchimento.",
    },
    {
      name: "Aceleração — Preenchimento",
      value: "2000 mm/s²",
      whatIs:
        "Aceleração do infill. Como não é visível, aceita os valores mais altos da tabela.",
      whyAdjust:
        "Infill é o grande consumidor de tempo. Subir a aceleração aqui reduz o tempo total sem qualquer perda estética.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["1500–2000 mm/s²", "Recomendado", "Uso geral"],
          ["2000–4000 mm/s²", "Rápido", "Peças estruturais"],
          ["4000–6000 mm/s²", "Máxima velocidade", "Protótipos, print farm"],
        ],
      },
      influences: "Tempo total de impressão.",
      generates: "Infill 4000 mm/s² = redução de 15–25% no tempo do miolo, sem efeito visual.",
      goldenRule: "O infill pode ter a aceleração mais alta. Economize tempo onde ninguém vê.",
    },
    {
      name: "Aceleração — Superfície superior",
      value: "2000 mm/s²",
      whatIs:
        "Aceleração das camadas sólidas do topo. Visível, então merece valores moderados — mas pode ser um pouco maior que a parede externa.",
      whyAdjust:
        "Topo com aceleração alta gera ondulações na superfície sólida. Baixa demais aumenta tempo desnecessariamente.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["800–1200 mm/s²", "Máxima qualidade", "Peças estéticas com ironing"],
          ["1200–2000 mm/s²", "Recomendado", "Uso geral"],
          ["2000–3000 mm/s²", "Rápido", "Peças funcionais"],
        ],
      },
      influences: "Acabamento do topo, brilho, planicidade.",
      generates: "Topo 1000 + ironing = superfície quase espelhada.",
      goldenRule: "Topo merece quase o mesmo cuidado da parede externa. Mantenha moderado.",
    },
    {
      name: "Aceleração — Primeira camada",
      value: "500 mm/s²",
      whatIs:
        "Aceleração específica da primeira camada. Baixa para garantir adesão e evitar deslocar a peça.",
      whyAdjust:
        "Aceleração alta na primeira camada arranca cantos da mesa e gera warping imediato. Baixa garante adesão segura.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["300–500 mm/s²", "Recomendado", "Uso geral"],
          ["500–1000 mm/s²", "Mais rápido", "Mesas com excelente adesão"],
          ["1000–1500 mm/s²", "Rápido", "Peças pequenas, baixo risco"],
        ],
      },
      influences: "Adesão à mesa, risco de descolamento e warping.",
      generates: "Primeira camada 500 = adesão garantida em qualquer material.",
      goldenRule: "Primeira camada lenta = adesão garantida. Use 500 mm/s² ou menos.",
    },
    {
      name: "Aceleração — Deslocamento (Travel)",
      value: "10000 mm/s²",
      whatIs:
        "Aceleração dos movimentos aéreos, sem extrusão. Pode ser a maior da tabela pois não afeta nenhuma superfície.",
      whyAdjust:
        "Travel é tempo morto. Aceleração alta aqui reduz drasticamente o tempo total da impressão.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["5000–8000 mm/s²", "Rápido", "Impressoras médias"],
          ["8000–12000 mm/s²", "Recomendado", "Uso geral"],
          ["12000–20000 mm/s²", "Máxima velocidade", "Máquinas com Input Shaping"],
        ],
      },
      influences: "Tempo total de impressão, ruído da máquina.",
      generates: "Travel 10000 = redução visível no tempo em peças com muitas ilhas.",
      goldenRule: "Travel = máximo. Acelere ao máximo onde não há extrusão.",
    },

    // ───────────── JERK (XY) ─────────────
    {
      name: "Jerk (XY) — Conceitos Gerais",
      value: "mm/s",
      whatIs:
        "Define a taxa de mudança da aceleração — a 'brusquidão' com que a impressora inicia e para movimentos. Jerk alto = bico parte e para de forma abrupta; Jerk baixo = transição suave.",
      whyAdjust:
        "Jerk alto melhora a qualidade em cantos pequenos (o bico não desacelera tanto) mas gera vibração. Jerk baixo elimina vibração mas arredonda cantos. Input Shaping permite Jerk mais alto sem ghosting.",
      optionsTable: {
        headers: ["Tipo de Jerk", "Valor da tela", "Quando usar"],
        rows: [
          ["Padrão", "8 mm/s", "Teto base"],
          ["Parede externa", "4 mm/s", "Precisão máxima"],
          ["Parede interna", "5 mm/s", "Estrutural"],
          ["Preenchimento", "8 mm/s", "Infill, área não visível"],
          ["Superfície superior", "5 mm/s", "Topo visível"],
          ["Primeira camada", "2 mm/s", "Adesão"],
          ["Travel 1ª camada", "2 mm/s", "Estabilidade da base"],
          ["Deslocamento (Travel)", "8 mm/s", "Movimentos aéreos"],
        ],
      },
      howTo: [
        { step: "1", path: "Prepare > Velocidade > Jerk (XY)", desc: "Expandir a seção" },
        { step: "2", path: "Parede externa", desc: "3–5 mm/s para precisão" },
        { step: "3", path: "Preenchimento", desc: "8–12 mm/s para ganhar tempo" },
        { step: "4", path: "Primeira camada", desc: "2–3 mm/s para adesão" },
      ],
      example: {
        piece: "Caixa organizadora com cantos retos",
        config: "Parede externa 4 mm/s · Preenchimento 10 mm/s · Travel 10 mm/s",
        result: "Cantos perfeitamente nítidos, sem vibração nem arredondamento.",
      },
      influences: "Definição de cantos, ressonância da máquina, ghosting, ruído.",
      generates: "Jerk 20 sem IS = cantos arredondados e ringing. Jerk 4 = cantos cirúrgicos.",
      goldenRule:
        "Jerk baixo = precisão (3–5 mm/s). Jerk alto = velocidade (8–12 mm/s). O Jerk define a suavidade dos movimentos.",
    },
    {
      name: "Jerk — Parede externa",
      value: "4 mm/s",
      whatIs:
        "Jerk específico da linha visível (perímetro externo). Mantido baixo para garantir cantos nítidos e sem ghosting.",
      whyAdjust:
        "É a linha que o olho enxerga — qualquer vibração aqui arruína o acabamento. Vale sacrificar tempo por nitidez.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["2–3 mm/s", "Máxima precisão", "Peças estéticas"],
          ["3–5 mm/s", "Recomendado", "Uso geral"],
          ["5–7 mm/s", "Boa qualidade", "Peças funcionais"],
        ],
      },
      influences: "Qualidade de cantos retos, nitidez de chanfros e arestas.",
      generates: "Jerk parede externa 4 mm/s + aceleração 500 = canto perfeito.",
      goldenRule: "Parede externa com Jerk baixo = cantos perfeitos. Use 3–5 mm/s.",
    },
    {
      name: "Jerk — Parede interna",
      value: "5 mm/s",
      whatIs:
        "Jerk dos perímetros internos. Pode ser igual ou ligeiramente maior que a externa, pois eventual vibração fica escondida.",
      whyAdjust:
        "Aumentar acelera a impressão sem prejuízo estético, já que a interna é coberta pela externa.",
      influences: "Tempo de impressão, vibração transmitida à parede externa.",
      generates: "Interna 7 mm/s = tempo reduzido sem comprometer a face visível.",
      goldenRule: "Interna pode ser +1 a +2 mm/s acima da externa. Não exagere.",
    },
    {
      name: "Jerk — Preenchimento",
      value: "8 mm/s",
      whatIs:
        "Jerk do infill. Não é visível, então aceita valores altos para reduzir tempo.",
      whyAdjust:
        "Infill é o grande consumidor de tempo. Jerk alto aqui acelera bastante sem perda visível.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["6–8 mm/s", "Recomendado", "Uso geral"],
          ["8–12 mm/s", "Mais rápido", "Peças estruturais"],
          ["12–15 mm/s", "Máxima velocidade", "Protótipos"],
        ],
      },
      influences: "Tempo total de impressão.",
      generates: "Jerk infill 12 + aceleração 4000 = redução significativa no tempo do miolo.",
      goldenRule: "Infill com Jerk alto = mais rápido. Economize tempo onde ninguém vê.",
    },
    {
      name: "Jerk — Superfície superior",
      value: "5 mm/s",
      whatIs:
        "Jerk das camadas sólidas do topo. Mantido baixo para garantir acabamento liso, sem ondulações.",
      whyAdjust:
        "Topo é tão visível quanto a parede externa. Jerk alto = ondulações; Jerk baixo = topo espelhado.",
      influences: "Acabamento do topo, brilho, planicidade.",
      generates: "Topo 5 mm/s + ironing = superfície espelhada.",
      goldenRule: "Topo merece o mesmo cuidado da parede externa — Jerk baixo sempre.",
    },
    {
      name: "Jerk — Primeira camada",
      value: "2 mm/s",
      whatIs:
        "Jerk da primeira camada. Muito baixo para garantir estabilidade máxima e evitar deslocar a peça.",
      whyAdjust:
        "Jerk alto na primeira camada pode descolar cantos da mesa. Jerk muito baixo lentifica desnecessariamente.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["1–2 mm/s", "Máxima estabilidade", "Uso geral"],
          ["2–4 mm/s", "Recomendado", "Mesas perfeitas"],
          ["4–6 mm/s", "Mais rápido", "Peças pequenas"],
        ],
      },
      influences: "Adesão à mesa, risco de descolamento.",
      generates: "Jerk primeira camada 2 = adesão segura em qualquer material.",
      goldenRule: "Primeira camada com Jerk baixo = estabilidade. Use 2 mm/s para garantir adesão.",
    },
    {
      name: "Jerk — Travel (deslocamento)",
      value: "8 mm/s",
      whatIs:
        "Jerk em movimentos sem extrusão. Pode ser mais alto pois não há plástico saindo do bico.",
      whyAdjust:
        "Travel é tempo morto. Jerk alto reduz esse tempo sem afetar qualidade.",
      influences: "Tempo total de impressão, ruído da máquina.",
      generates: "Travel 12 mm/s = menos tempo entre ilhas, sem stringing extra.",
      goldenRule: "Travel pode usar o Jerk mais alto da tabela — 8–12 mm/s.",
    },

    // ───────────── AVANÇADO ─────────────
    {
      name: "Suavização da extrusão (Extrusion Smoothing)",
      value: "0.1–0.3",
      whatIs:
        "Parâmetro avançado que suaviza variações de fluxo durante a extrusão, reduzindo picos quando o bico desacelera/acelera. Funciona em conjunto com Pressure Advance no Klipper.",
      whyAdjust:
        "Suaviza transições de fluxo e reduz marcas em curvas e cantos. Ativar sem Pressure Advance calibrado piora a qualidade — sempre calibrar PA primeiro.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando usar"],
        rows: [
          ["0–0.1", "Pouca suavização", "Peças simples"],
          ["0.1–0.3", "Recomendado", "Uso geral"],
          ["0.3–0.5", "Muita suavização", "Peças com curvas e cantos"],
          [">0.5", "Pode borrar detalhes", "Não recomendado"],
        ],
      },
      howTo: [
        { step: "1", path: "Velocidade > Avançado", desc: "Localizar Suavização da extrusão" },
        { step: "2", path: "Pré-requisito", desc: "Calibrar Pressure Advance primeiro" },
        { step: "3", path: "Valor", desc: "Testar 0.1 → 0.2 → 0.3" },
      ],
      influences: "Bleeding em cantos, qualidade em zonas de variação rápida de fluxo.",
      generates: "Com PA + suavização 0.2: cantos sem 'gota' de excesso de plástico.",
      goldenRule: "Use 0.1–0.3 para suavizar extrusões em curvas sem perder detalhes.",
      summaryTable: {
        title: "Resumo da Tela 33 — Aceleração, Jerk e Suavização",
        headers: ["Parâmetro", "Valor da tela", "Recomendado", "Função"],
        rows: [
          ["Aceleração padrão", "5000 mm/s²", "3000–5000", "Teto geral da máquina"],
          ["Aceleração parede externa", "500 mm/s²", "500–800", "Qualidade visual"],
          ["Aceleração parede interna", "1000 mm/s²", "1000–2000", "Estrutura"],
          ["Aceleração preenchimento", "2000 mm/s²", "2000–4000", "Tempo de impressão"],
          ["Aceleração superfície superior", "2000 mm/s²", "1000–2000", "Acabamento do topo"],
          ["Aceleração primeira camada", "500 mm/s²", "300–500", "Adesão"],
          ["Aceleração travel", "10000 mm/s²", "8000–12000", "Tempo morto"],
          ["Jerk padrão", "8 mm/s", "5–8", "Base da suavidade"],
          ["Jerk parede externa", "4 mm/s", "3–5", "Cantos precisos"],
          ["Jerk parede interna", "5 mm/s", "5–7", "Estrutura"],
          ["Jerk preenchimento", "8 mm/s", "8–12", "Velocidade do infill"],
          ["Jerk superfície superior", "5 mm/s", "4–6", "Topo liso"],
          ["Jerk primeira camada", "2 mm/s", "2–3", "Adesão"],
          ["Jerk travel", "8 mm/s", "8–12", "Reduz tempo morto"],
          ["Suavização da extrusão", "0.1–0.3", "0.1–0.3", "Após calibrar PA"],
        ],
      },
    },
  ],

  // ====================================================================
  // TELA 41 — SUPORTE: Ativar, Tipo (Árvore), Estilo e Jangada
  // ====================================================================
  "tela-41-suporte-ativar-tipo": [
    // ───────── AULA 1 ─────────
    {
      name: "Ativar suporte",
      value: "Checkbox (Ativar/Desativar)",
      whatIs:
        "Interruptor mestre que permite ao OrcaSlicer gerar estruturas de suporte para áreas da peça que não podem ser impressas no ar. Em FDM o plástico não pode ser depositado no vazio — ângulos acima de 45° tendem a deformar ou cair.",
      whyAdjust:
        "Algumas peças foram projetadas anti-suporte (todos os ângulos ≤45°) e não precisam de nada. Outras dependem de suporte para existir. Desligar economiza filamento e tempo quando não é necessário.",
      influences: "Viabilidade da impressão, tempo total, consumo de filamento, qualidade da face inferior.",
      generates: "Peças orgânicas sem suporte falham; com suporte ativo imprimem perfeitas.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Gera suportes automaticamente", "Peças com overhangs > 45°"],
          ["Desativado", "Nenhum suporte gerado", "Peças sem saliências ou anti-suporte"],
        ],
      },
      goldenRule: "Ative suportes apenas quando necessário. O melhor suporte é aquele que você não precisa imprimir.",
    },
    // ───────── AULA 2 ─────────
    {
      name: "Tipo de suporte",
      value: "Dropdown (Normal / Árvore / Snug)",
      whatIs: "Define a estrutura básica que será usada para sustentar as saliências da peça.",
      types: [
        { label: "Normal", desc: "Colunas verticais com grade — simples e confiável, mas difícil de remover e deixa marcas" },
        { label: "Árvore (Tree)", desc: "Ramos orgânicos que crescem ao redor da peça — fácil remoção, menos material, fatiamento mais lento" },
        { label: "Snug", desc: "Ajustado à geometria da peça — bom equilíbrio, mas difícil de remover em áreas internas" },
      ],
      influences: "Consumo de filamento, qualidade da face inferior, facilidade de remoção, tempo de fatiamento.",
      generates: "Tree usa 40–60% menos filamento que Normal e remove com puxão; Normal é mais robusto mas deixa marcas.",
      optionsTable: {
        headers: ["Cenário", "Tipo recomendado", "Motivo"],
        rows: [
          ["Peças com suportes internos", "Árvore (Tree)", "Fácil remoção em áreas internas"],
          ["Peças estruturais simples", "Normal", "Confiável e previsível"],
          ["Geometria orgânica/complexa", "Árvore (Tree)", "Adapta-se à forma da peça"],
          ["Impressões multimaterial", "Normal", "Mais fácil de controlar a purga"],
        ],
      },
      goldenRule: "Use Tree Support para a maioria das peças. Ele é mais fácil de remover e deixa menos marcas.",
    },
    // ───────── AULA 3 ─────────
    {
      name: "Estilo de suporte",
      value: "Dropdown (Orgânico / Grid / Lightning / Honeycomb)",
      whatIs: "Define o padrão de preenchimento dentro do suporte e como ele se conecta à peça.",
      types: [
        { label: "Orgânico (Organic)", desc: "Ramos curvos que tocam a peça em pontos específicos — ideal para peças estéticas e superfícies curvas" },
        { label: "Grid", desc: "Estrutura de grade padrão — robusta, ideal para peças estruturais" },
        { label: "Lightning", desc: "Estrutura mínima, apenas o necessário — suportes rápidos e protótipos" },
        { label: "Honeycomb", desc: "Estrutura hexagonal densa — estável para suportes que precisam de rigidez" },
      ],
      influences: "Acabamento da face inferior, consumo de filamento, estabilidade do suporte.",
      generates: "Orgânico deixa a peça visualmente limpa; Grid produz suporte sólido e previsível; Lightning é o mais econômico.",
      goldenRule: "Orgânico para peças estéticas. Grid para suportes estruturais.",
    },
    // ───────── AULA 4 ─────────
    {
      name: "Ângulo limiar",
      value: "45° (padrão)",
      whatIs:
        "Ângulo a partir do qual o OrcaSlicer começa a gerar suportes. 0° = horizontal, 90° = vertical. Faces inclinadas mais do que esse valor recebem suporte.",
      whyAdjust: "Reduzir gera MAIS suporte (mais conservador). Aumentar gera MENOS (confia que o material aguenta).",
      influences: "Quantidade total de suporte, áreas que recebem ou não suporte, tempo de impressão.",
      generates: "30° = mais suporte e mais segurança; 55° = menos suporte mas maior risco de overhangs feios.",
      optionsTable: {
        headers: ["Ângulo", "Quando usar"],
        rows: [
          ["30°", "Peças com muitos detalhes e superfícies curvas"],
          ["45°", "Padrão — equilíbrio entre qualidade e material"],
          ["55°", "Peças simples e geometrias retas"],
          ["65°+", "Apenas saliências muito severas"],
        ],
      },
      goldenRule: "45° para a maioria. 30° para mais qualidade. 55° para economizar material.",
    },
    // ───────── AULA 5 ─────────
    {
      name: "Densidade da primeira camada do suporte",
      value: "100% (padrão)",
      whatIs: "Porcentagem de preenchimento da primeira camada do suporte. Camada mais densa = melhor adesão à mesa.",
      influences: "Adesão do suporte à mesa, risco de descolamento durante a impressão.",
      generates: "Densidade alta = base firme; densidade baixa = risco de a torre de suporte soltar no meio da impressão.",
      optionsTable: {
        headers: ["Densidade", "Efeito", "Quando usar"],
        rows: [
          ["80–90%", "Menos material, adesão suficiente", "Mesas PEI lisas"],
          ["100%", "Padrão — adesão máxima", "Uso geral"],
          ["110–120%", "Mais material, adesão garantida", "Mesas irregulares, materiais difíceis"],
        ],
      },
      goldenRule: "Mantenha 80–100%. Não economize aqui — suporte solto = impressão perdida.",
    },
    // ───────── AULA 6 ─────────
    {
      name: "Expansão da primeira camada",
      value: "2–5 mm (padrão)",
      whatIs: "Quanto a base do suporte se expande lateralmente para melhorar a adesão à mesa.",
      influences: "Estabilidade da torre de suporte, área ocupada na mesa, consumo de filamento na base.",
      generates: "Base larga = suporte não tomba mesmo com altura grande; base estreita = suporte fino balança e pode cair.",
      optionsTable: {
        headers: ["Expansão", "Efeito", "Quando usar"],
        rows: [
          ["0 mm", "Base exata", "Peças pequenas"],
          ["2–5 mm", "Padrão", "Uso geral"],
          ["5–10 mm", "Base muito expandida", "Peças grandes / suportes altos"],
        ],
      },
      goldenRule: "Use 3 mm para a maioria. Aumente para suportes altos para evitar que tombem.",
    },
    // ───────── AULA 7 ─────────
    {
      name: "Apenas na placa de impressão",
      value: "Checkbox (Ativado/Desativado)",
      whatIs: "Limita a geração de suportes às áreas que tocam a mesa. Suportes em cima da peça são evitados.",
      influences: "Acabamento da face superior, marcas visíveis após a remoção.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando usar"],
        rows: [
          ["Ativado", "Suportes apenas na mesa", "Peças com detalhes internos / visuais"],
          ["Desativado", "Suportes em qualquer lugar", "Peças com saliências acima de outras áreas"],
        ],
      },
      goldenRule: "Ative para a maioria das peças. Desative apenas se houver saliências acima de outras áreas que precisem de suporte.",
    },
    // ───────── AULA 8 ─────────
    {
      name: "Suportar apenas regiões críticas",
      value: "Checkbox",
      whatIs: "Concentra os suportes apenas nas áreas mais críticas, reduzindo material e facilitando a remoção.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Suportes apenas onde realmente necessário"],
          ["Desativado", "Suportes em todas as saliências detectadas"],
        ],
      },
      goldenRule: "Ative para economizar material em peças com muitos overhangs leves.",
    },
    // ───────── AULA 9 ─────────
    {
      name: "Ignorar pequenas saliências",
      value: "Filtrar / Não filtrar",
      whatIs: "Impede a geração de suportes para saliências muito pequenas que podem ser impressas sem suporte devido à área reduzida.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Filtrar", "Ignora saliências pequenas"],
          ["Não filtrar", "Gera suporte para todas as saliências"],
        ],
      },
      goldenRule: "Filtrar reduz suportes desnecessários sem comprometer a qualidade.",
    },
    // ───────── AULA 10 ─────────
    {
      name: "Distância Z superior (Z Gap)",
      value: "0,20 mm (padrão)",
      whatIs:
        "Espaço vertical entre o topo do suporte e a parte inferior da peça. Um dos parâmetros mais críticos: define facilidade de remoção × acabamento da face inferior.",
      influences: "Acabamento da face inferior, esforço de remoção, risco de quebrar a peça ao remover.",
      optionsTable: {
        headers: ["Z Gap", "Efeito", "Quando usar"],
        rows: [
          ["0,10–0,15 mm", "Difícil de remover, superfície lisa", "Acabamento perfeito"],
          ["0,15–0,20 mm", "Padrão — fácil remoção, bom acabamento", "Uso geral"],
          ["0,20–0,30 mm", "Remoção muito fácil, superfície áspera", "Protótipos, peças internas"],
        ],
      },
      goldenRule: "0,20 mm para a maioria. 0,15 mm para acabamento. 0,25 mm para remoção fácil. Sempre múltiplo da altura de camada.",
    },
  ],

  // ====================================================================
  // TELA 42 — SUPORTE: Avançado, Z Gap, Interface e Padrão
  // ====================================================================
  "tela-42-suporte-avancado-interface": [
    {
      name: "Distância Z (superior e inferior)",
      value: "0,15–0,20 mm",
      whatIs: "Espaço vertical entre o topo do suporte e a face da peça que está sendo suportada. Z Gap pequeno = suporte gruda; grande = solta fácil mas deixa face áspera.",
      whyAdjust: "É o parâmetro MAIS CRÍTICO da seção. 0,2mm é o padrão; 0,15mm dá face mais lisa mas grudenta; 0,25mm solta limpo mas com textura visível.",
      influences: "Acabamento da face inferior da peça, esforço para remover o suporte, possibilidade de quebrar a peça ao remover.",
      generates: "Z Gap 0,1 = não consegue separar sem destruir. 0,15 = puxa com alicate, face lisa. 0,2 = remove com a mão, face com pequena textura. 0,3 = cai sozinho, face muito áspera.",
      goldenRule: "PLA: 0,15mm. PETG: 0,20mm (PETG cola muito). ABS: 0,18mm. Sempre múltiplo de altura de camada.",
    },
    {
      name: "Camadas de interface (superior)",
      value: "2–3 camadas",
      whatIs: "Quantas camadas densas o Orca imprime no TOPO do suporte (logo abaixo da peça). Mais camadas = superfície de contato mais lisa para a peça pousar.",
      whyAdjust: "Sem interface densa, a face inferior da peça mostra os espaços do padrão de suporte. Com 2–3 camadas de interface, a peça pousa em uma 'tampa' lisa.",
      influences: "Acabamento da face inferior, consumo extra de filamento, tempo.",
      generates: "0 camadas = face com listras visíveis. 2 camadas = face quase lisa. 4 camadas = praticamente perfeita mas mais filamento.",
      goldenRule: "Mínimo 2 camadas para qualquer peça visual. 3 camadas para superfícies críticas.",
    },
    {
      name: "Espaçamento da interface",
      value: "0,5 mm (denso ≈100%)",
      whatIs: "Espaçamento entre linhas da camada de interface. 0,5mm com largura 0,42 = praticamente 100% densidade, formando superfície sólida.",
      influences: "Lisura da face inferior, esforço de remoção.",
      generates: "Espaçamento 0,5 = topo do suporte LISO, peça pousa perfeito. Espaçamento 2,0 = listras visíveis na peça.",
      goldenRule: "Para acabamento perfeito: espaçamento 0,4–0,5mm. Para economia: 1,0mm (aceita pequenas linhas).",
    },
    {
      name: "Distância XY entre suporte e objeto",
      value: "0,35 mm",
      whatIs: "Separação horizontal entre paredes do suporte e paredes laterais da peça. Define se o suporte 'cola' nas laterais ou se separa cleanly.",
      whyAdjust: "Pequeno demais = suporte funde com a peça (não sai). Grande demais = suporte instável e overhangs sem cobertura adequada.",
      influences: "Facilidade de remoção lateral, qualidade de paredes verticais da peça.",
      generates: "XY 0,2 = não desencaixa. XY 0,35 = puxa limpo. XY 0,5 = solta fácil mas suporte pode tombar.",
      goldenRule: "PLA: 0,35mm. PETG: 0,4mm. Sempre testar primeiro em uma peça pequena antes de imprimir grande.",
    },
    {
      name: "Comprimento máximo de ponte (sem suporte)",
      value: "10 mm",
      whatIs: "Vão livre que o Orca aceita sem gerar suporte (assume que é uma ponte que o filamento aguenta). Acima desse valor, força suporte.",
      influences: "Quantidade de suporte gerado, qualidade de pontes longas.",
      generates: "10mm = padrão seguro. Aumentar p/ 20mm = arrisca pontes ruins. Reduzir p/ 5mm = mais suporte em qualquer vão.",
      goldenRule: "PLA: até 15mm seguro. PETG: até 10mm. Para mais, sempre suporte.",
    },
  ],

  // ====================================================================
  // TELA 43 — SUPORTE: Árvore (Tree) — Geometria e Densidade
  // ====================================================================
  "tela-43-suporte-arvore": [
    {
      name: "Diâmetro da ponta",
      value: "0,4–0,8 mm",
      whatIs: "Espessura da extremidade do ramo que toca a peça. Quanto menor, menor a marca deixada — mas se for muito fina (<0,4mm), o ramo quebra antes de chegar ao destino.",
      whyAdjust: "Marca visível na peça depende diretamente do diâmetro da ponta. 0,4mm = marca quase invisível; 0,8mm = marca leve mas circular.",
      influences: "Qualidade da face suportada, robustez do suporte, facilidade de quebrar antes da impressão terminar.",
      generates: "Ponta 0,4 + Tree Organic = peça quase sem marca de suporte. Ponta 1,2 = marca grosseira mas suporte super-confiável.",
      goldenRule: "PLA: 0,4–0,6mm. PETG (cola mais): 0,6–0,8mm. Nunca <0,4mm — quebra.",
    },
    {
      name: "Densidade da ramificação",
      value: "30–40%",
      whatIs: "Quão denso é o padrão interno dos ramos. Densidade alta = ramos sólidos, robustos; baixa = ocos, econômicos.",
      influences: "Robustez do suporte, consumo de filamento, tempo.",
      generates: "30% = padrão Orca, econômico. 50% = ramos sólidos para suportes muito altos. 20% = arrisca quebra em meio à impressão.",
      goldenRule: "Suporte <50mm de altura: 30%. Suporte 50–150mm: 35–40%. Suporte >150mm: 45–50%.",
    },
    {
      name: "Diâmetro do ramo de suporte",
      value: "2 mm",
      whatIs: "Espessura do tronco principal dos galhos. Define resistência mecânica do suporte como um todo.",
      influences: "Estabilidade da árvore, possibilidade de tombamento, consumo.",
      generates: "Ramo 2mm = padrão estável. Ramo 1mm = árvore frágil, tomba. Ramo 3mm = super robusto, mais filamento.",
      goldenRule: "2mm é o sweet spot para 95% dos casos. Aumente apenas em suportes muito altos (>200mm).",
    },
    {
      name: "Ângulo de ramificação",
      value: "40°",
      whatIs: "Ângulo máximo que um ramo pode abrir a partir do tronco. 40° = ramo se inclina até 40° do prumo para alcançar pontos distantes.",
      whyAdjust: "Maior ângulo = árvore alcança áreas mais afastadas do centro com menos pilares. Menor = mais pilares verticais, mais filamento.",
      influences: "Eficiência da árvore, alcance lateral, estabilidade.",
      generates: "40° = cobre overhangs laterais. 60° = arrisca quedar; 25° = árvore mais vertical, mais filamento.",
      goldenRule: "30–40° é o ideal. Aumente apenas se a peça tiver overhangs laterais muito extensos.",
    },
    {
      name: "Ângulo preferido (curvatura)",
      value: "25°",
      whatIs: "Ângulo natural que o algoritmo TENTA manter ao curvar os ramos. Define a aparência 'orgânica' das árvores.",
      influences: "Estética dos suportes, suavidade das curvas dos ramos.",
      generates: "25° = curvas suaves e elegantes (Tree Organic). 0° = ramos retos (Tree clássico). 45° = curvas exageradas.",
      goldenRule: "Tree Organic recomendado: ângulo preferido 25° + diâmetro ponta 0,5mm + ramo 2mm. Acabamento perfeito.",
      summaryTable: {
        headers: ["Caso", "Ponta", "Ramo", "Densidade", "Ângulo"],
        rows: [
          ["Miniatura visual", "0,4", "1,5", "30%", "25°"],
          ["Peça mecânica", "0,8", "2,5", "40%", "30°"],
          ["Suporte alto >150mm", "0,6", "3", "45%", "30°"],
        ],
      },
    },
  ],

  // ====================================================================
  // TELA 51 — MULTIMATERIAL: Torre de Preparo (Wipe Tower)
  // ====================================================================
  "tela-51-multimaterial-torre-preparo": [
    {
      name: "Ativar Torre de Preparo",
      value: "Ativado em multimaterial",
      whatIs: "Habilita a geração da Wipe Tower — estrutura auxiliar onde a impressora purga o material antigo durante cada troca de cor/filamento. Sem ela, a primeira porção da nova cor sai contaminada na peça.",
      whyAdjust: "Obrigatória em AMS, MMU e qualquer setup multi-filamento. Sem torre, a transição entre cores fica com 'fantasma' da cor anterior.",
      influences: "Pureza das cores após cada troca, desperdício de filamento, tempo extra de impressão.",
      generates: "Sem torre em troca AMS = primeiros 10–30mm da nova cor saem misturados, manchando a peça.",
      goldenRule: "Sempre ativada em multi-cor. Em mono-filamento, manter desativada (economiza tempo e filamento).",
    },
    {
      name: "Largura da torre",
      value: "30 mm (padrão)",
      whatIs: "Dimensão lateral da torre quadrada. Define quanto volume de purga cabe em cada camada da torre.",
      whyAdjust: "Torre pequena = pouca área para purgar, exige altura maior. Torre grande = mais área, menos altura, mas ocupa mais espaço da mesa.",
      influences: "Estabilidade da torre, área útil da mesa, fluxo de purga por camada.",
      generates: "30mm × 30mm = padrão estável para até 4 cores. Para 8+ cores, aumentar para 40–50mm.",
      goldenRule: "2 cores: 25mm. 4 cores: 30mm. 8+ cores ou muita saturação: 40–50mm.",
    },
    {
      name: "Volume de preparo (purga)",
      value: "30 mm³",
      whatIs: "Quantidade mínima de filamento extrudada na torre a cada troca, suficiente para limpar o filamento anterior do bico.",
      whyAdjust: "Pouco = cor contaminada. Muito = desperdício. Volume varia conforme par de cores (claro→escuro precisa menos; escuro→claro precisa muito mais).",
      influences: "Pureza da cor após troca, desperdício, tempo.",
      generates: "Branco→preto: 30mm³ basta. Preto→branco: precisa 80–120mm³.",
      goldenRule: "Calibrar matriz de purga no Orca (Calibrate › Flushing volumes) é a única forma de otimizar de verdade.",
    },
    {
      name: "Purgar nos suportes (Avançado)",
      value: "Ativado",
      whatIs: "Em vez de jogar a purga na torre dedicada, usa o filamento purgado para imprimir as estruturas de suporte. O suporte fica multicolor, mas isso é jogado fora depois.",
      whyAdjust: "Economia ENORME: a torre fica muito menor (ou sumirá) porque a purga vira material útil de suporte.",
      influences: "Tamanho da torre, desperdício total, viabilidade econômica do multimaterial.",
      generates: "Peça AMS 4 cores: sem este recurso = 25g de desperdício na torre. Com purgar nos suportes = 8g.",
      goldenRule: "Sempre ativado se a peça tiver suporte. Economia de até 60% do desperdício multimaterial.",
    },
    {
      name: "Parede chanfrada (Bevel)",
      value: "Ativada",
      whatIs: "Inclina as paredes da torre formando um cone trapezoidal. Facilita drasticamente a remoção da torre da mesa após a impressão.",
      influences: "Facilidade de remoção, integridade da torre durante impressão.",
      generates: "Torre vertical = gruda muito na mesa, precisa de espátula. Chanfrada = solta com leve torção da mão.",
      goldenRule: "Sempre ativada em multi-filamento. Custo zero, benefício alto.",
    },
  ],

  // ====================================================================
  // TELA 52 — MULTIMATERIAL: Filamento por Recurso e Opções de Purga
  // ====================================================================
  "tela-52-multimaterial-filamento-purga": [
    {
      name: "Filamento para Recursos",
      value: "Padrão (todos)",
      whatIs: "Define qual extrusora/cor é usada para cada tipo de linha: paredes externas, paredes internas, infill, superfície superior, base, suporte, torre. 'Padrão' = mantém a ferramenta atualmente atribuída ao objeto.",
      whyAdjust: "Permite economizar filamento caro (ex: usar PLA básico no infill e PLA Silk apenas nas paredes externas) ou criar efeitos visuais.",
      types: [
        { label: "Paredes externas", desc: "Cor visível principal — use filamento bom" },
        { label: "Paredes internas", desc: "Invisível — pode ser barato" },
        { label: "Infill", desc: "100% invisível — material mais barato/restos" },
        { label: "Topo/Base", desc: "Visível — cor coordenada com paredes" },
        { label: "Torre/Suporte", desc: "Descartado — material barato/sobras" },
      ],
      influences: "Economia de filamento, complexidade do gerenciamento de cores, tempo (mais trocas = mais tempo).",
      generates: "Peça grande: infill em PLA básico + paredes em PLA Silk = 50% de economia no Silk caro.",
      goldenRule: "Em peças funcionais grandes, sempre atribua material barato ao infill. Em multi-cor, mantenha consistência por região.",
    },
    {
      name: "Prevenção de vazamento",
      value: "Desativado (padrão)",
      whatIs: "Adiciona um wiper extra em cada troca para evitar que filamento mole vaze do bico inativo. Útil em multi-bico ou filamentos higroscópicos.",
      whyAdjust: "Ativar adiciona tempo e desperdício. Só necessário em Nylon/TPU mal armazenados ou setups dual-extruder.",
      influences: "Limpeza das trocas, tempo extra, desperdício de filamento.",
      generates: "Single bico AMS: manter off (não vaza). Dual extruder com Nylon: ativar (evita gotas).",
      goldenRule: "Single nozzle (AMS, MMU): off. Dual extruder: on. Filamento muito molhado: on.",
    },
    {
      name: "Purgar nos suportes",
      value: "Ativado",
      whatIs: "Reaproveita filamento purgado para imprimir o suporte. Em vez de jogar fora na torre, o material vira estrutura útil (que será descartada com o suporte).",
      whyAdjust: "É o recurso de economia mais importante do multimaterial. Pode reduzir desperdício em 40–60%.",
      influences: "Tamanho da torre, custo de impressão multi-cor, sustentabilidade.",
      generates: "Peça AMS 4 cores com suporte: torre encolhe ~70% quando ativado.",
      goldenRule: "Se a peça tem suporte, SEMPRE ative. Praticamente elimina a torre de purga.",
    },
    {
      name: "Purgar no preenchimento dos objetos",
      value: "Desativado",
      whatIs: "Como 'purgar nos suportes', mas usando o INFILL da peça final. Aproveita o infill para receber a purga, eliminando ainda mais a torre.",
      whyAdjust: "Economia máxima — mas pode contaminar visivelmente o infill (que vira multicor). Em peças funcionais, ok; em peças visuais com paredes finas, pode escapar.",
      influences: "Desperdício total, possível contaminação visual em paredes finas ou translúcidas.",
      generates: "Peça opaca densa: ativar = desperdício quase zero. Peça translúcida ou parede fina: manter off (cores aparecem).",
      goldenRule: "Peça funcional opaca: ativar. Peça decorativa/visual: manter off. Filamento translúcido: NUNCA ativar.",
    },
    {
      name: "Intertravamento de viga (Beam Interlock)",
      value: "Desativado",
      whatIs: "Recurso avançado que cria interligações mecânicas entre regiões de cores diferentes (úteis em multimaterial estrutural — ex: rígido + flexível). Sem isso, regiões diferentes podem delaminar.",
      whyAdjust: "Só é necessário em peças multi-material com materiais MECANICAMENTE diferentes (PETG + TPU, PLA + Nylon). Em multi-cor com mesmo material, não precisa.",
      influences: "Resistência da junção entre materiais, complexidade do slicing.",
      generates: "Suporte solúvel + peça rígida sem interlock = ok. PLA rígido + TPU flexível na mesma peça sem interlock = delaminação garantida.",
      goldenRule: "Multi-COR (mesma família de material): off. Multi-MATERIAL (físico-químico diferente): on.",
    },
  ],

  // ====================================================================
  // TELA 61 — OUTROS: Saia (Skirt), Borda (Brim) e Modo Vaso
  // ====================================================================
  "tela-61-outros-saia-borda-vaso": [
    {
      name: "Saia (Skirt) — Voltas",
      value: "1–3 voltas",
      whatIs: "Linhas de extrusão impressas ao redor (mas sem tocar) da peça antes que a impressão real comece. Servem para purgar o bico, ativar fluxo e dar tempo para você verificar a primeira camada.",
      whyAdjust: "0 voltas = começa direto na peça (risco de bolha de ar nas primeiras linhas). 3 voltas = bico aquecido e estável quando começa a peça.",
      influences: "Qualidade do início da primeira camada, perda de filamento, tempo extra (segundos).",
      generates: "Sem skirt: primeira linha da peça pode falhar. Com 2 voltas: peça começa com fluxo perfeito.",
      goldenRule: "1 volta = teste rápido. 3 voltas = padrão seguro. Para peças críticas, sempre 3 voltas.",
    },
    {
      name: "Tipo de Borda (Brim)",
      value: "Auto",
      whatIs: "Estrutura plana de uma camada ao redor da base da peça, aumentando a área em contato com a mesa para combater warping (encurvamento por contração).",
      types: [
        { label: "Auto", desc: "Orca decide com base no formato (ativa onde há risco)" },
        { label: "Externo", desc: "Brim só por fora — visual" },
        { label: "Interno", desc: "Brim em furos internos — combate warping em ilhas" },
        { label: "Brim em todos os lugares", desc: "Externo + interno — máxima adesão" },
        { label: "Nenhum", desc: "Sem brim — só para PLA com excelente adesão" },
      ],
      influences: "Adesão da peça, warping em ABS/PETG, tempo de remoção, marca na base.",
      generates: "ABS sem brim = warp garantido. ABS com brim 10mm = peça plana.",
      goldenRule: "PLA: nenhum ou Auto. PETG/ABS/ASA: Externo 5–10mm. Peça com cantos finos: 'Em todos os lugares'.",
    },
    {
      name: "Largura da borda",
      value: "5–10 mm",
      whatIs: "Quantos milímetros de extensão o brim se estende para fora da peça. Mais largo = mais adesão, mas mais material e mais tempo para limpar.",
      influences: "Força de adesão à mesa, esforço de remoção, marca na base.",
      generates: "Brim 5mm = adesão dobrada vs sem brim. Brim 10mm = ABS sem warp. Brim 15+mm = excessivo.",
      goldenRule: "PLA: 3–5mm. PETG: 5–8mm. ABS/ASA: 8–12mm. Peça muito alta e fina: 12–15mm.",
    },
    {
      name: "Espaço entre borda e objeto",
      value: "0,0–0,1 mm",
      whatIs: "Folga horizontal entre o brim e a parede da peça. 0 = colado (precisa cortar com canivete). 0,1 = leve folga (se quebra mais fácil).",
      influences: "Facilidade de remoção do brim, qualidade da base da peça após remoção.",
      generates: "Gap 0 = remoção perfeita mas com canivete. Gap 0,15 = remove com a mão mas pode soltar antes da hora.",
      goldenRule: "Padrão 0 (colado). Aumente para 0,1 só se quiser remoção sem ferramenta.",
    },
    {
      name: "Modo Vaso (Espiral)",
      value: "Ativar para vasos",
      whatIs: "Modo especial de fatiamento onde a peça é impressa em UMA espiral helicoidal contínua, sem camadas distintas, sem topo, sem infill — apenas uma parede que sobe espiralando.",
      whyAdjust: "Resultado mágico: vasos sem costura visível, transição perfeita entre camadas, impressão muito rápida (só uma parede). Mas: só funciona em peças ocas com 1 parede e sem detalhes superiores.",
      influences: "Aplicável apenas a vasos, copos, abajures, peças decorativas ocas.",
      generates: "Vaso espiral 200mm de altura: tempo ~1h vs 4h normal. Visual: sem costura vertical, perfeitamente liso.",
      goldenRule: "Modo Vaso + filamento Silk + 1 parede + altura camada 0,3mm = vasos profissionais em 1h.",
    },
  ],

  // ====================================================================
  // TELA 62 — OUTROS: Textura Difusa (Fuzzy Skin) e Opções de G-code
  // ====================================================================
  "tela-62-outros-textura-difusa-gcode": [
    {
      name: "Textura Difusa (Fuzzy Skin)",
      value: "Somente pintada",
      whatIs: "Aplica um padrão de ruído nas paredes externas, criando textura tátil tipo 'lixa fina' ou 'casca de árvore'. Útil para esconder linhas de camada e dar acabamento profissional.",
      types: [
        { label: "Desativado", desc: "Sem textura — padrão" },
        { label: "Contorno externo", desc: "Aplica em toda a face externa visível" },
        { label: "Em todas as paredes", desc: "Aplica também nas paredes internas (mais material)" },
        { label: "Somente pintada", desc: "Aplica APENAS onde você pintou na peça — controle cirúrgico" },
      ],
      whyAdjust: "Esconde imperfeições de impressão, dá toque/aderência (punhos), oculta a costura Z, visual artesanal.",
      influences: "Acabamento visual, aderência tátil, leve aumento de tempo e filamento (~5–10%).",
      generates: "Empunhadura de ferramenta com Fuzzy Skin: aderência instantânea, parece couro. Sem: liso e escorregadio.",
      goldenRule: "Use 'Somente pintada' + pintura em punhos/empunhaduras. Resultado profissional sem custo em áreas que devem ser lisas.",
    },
    {
      name: "Distância do ponto (frequência)",
      value: "0,5–1,0 mm",
      whatIs: "Distância entre os deslocamentos de ruído. Menor = textura mais densa/fina; maior = textura mais espaçada/grosseira.",
      influences: "Aparência visual da textura, granulometria.",
      generates: "0,5mm = textura fina tipo lixa. 1mm = textura média. 2mm = quase ondulações.",
      goldenRule: "Aderência (punhos): 0,5mm. Visual decorativo: 0,8–1,0mm.",
    },
    {
      name: "Espessura da textura (amplitude)",
      value: "0,2–0,4 mm",
      whatIs: "Quanto o ruído desloca a parede para dentro e para fora. Define a 'profundidade' da textura.",
      influences: "Intensidade visual e tátil da textura.",
      generates: "0,2mm = textura sutil. 0,4mm = textura forte, muito visível. >0,5mm = pode comprometer parede.",
      goldenRule: "Nunca usar amplitude > 50% da largura de linha (0,42mm = max 0,2mm). Acima disso, parede vira queijo suíço.",
    },
    {
      name: "Etiquetar objetos (M486)",
      value: "Ativado",
      whatIs: "Insere comandos M486 no G-code que identificam cada objeto separadamente. Permite cancelar UMA peça falhada no painel da impressora sem parar a impressão inteira.",
      whyAdjust: "Em fazendas de impressão ou placas com múltiplas peças, salvar 90% do trabalho quando UMA peça falha é regra de ouro.",
      influences: "Capacidade de cancelar objetos individualmente, tamanho marginal do G-code.",
      generates: "Plate com 10 peças, 1 solta da mesa: sem M486 = perde tempo continuando ou aborta tudo. Com M486 = cancela só aquela.",
      goldenRule: "Sempre ativado em impressoras Bambu, Prusa MK4, Klipper modernos. Único custo é alguns KB no G-code.",
    },
    {
      name: "Reduzir retração durante o preenchimento",
      value: "Ativado",
      whatIs: "Evita executar retrações dentro do infill (onde não importa estética). Reduz drasticamente o desgaste do extrusor e o tempo perdido em retrações desnecessárias.",
      influences: "Vida útil do extrusor, tempo de impressão em peças com muito infill, qualidade (zero impacto pois é interno).",
      generates: "Peça grande com infill denso: retrações reduzidas de 8000 para 2000 = extrusor dura muito mais.",
      goldenRule: "Sempre ativado. Zero downside, alto upside na vida útil mecânica.",
    },
  ],

  // ====================================================================
  // MÓDULO 3.2 — NOVIDADES DO ORCASLICER 3.2
  // ====================================================================
  "modulo-orcaslicer-3-2-novidades": [
    // ───────────── SEÇÃO 1: NOVIDADES GERAIS ─────────────
    {
      name: "Visualização Realista (Realistic View)",
      value: "Phong + SSAO + Sombras",
      whatIs:
        "Novo sistema de renderização 3D que substitui o visualizador clássico (Gouraud) por um motor baseado em Phong shading, com suporte a oclusão de ambiente (SSAO) e sombras projetadas. Phong oferece iluminação realista; SSAO adiciona sombras suaves em cantos; sombras projetadas mostram a peça projetando sombra na mesa virtual.",
      whyAdjust:
        "Visualização muito mais realista facilita identificar problemas de design (overhangs, cantos, detalhes) antes de fatiar, reduzindo retrabalho e desperdício de filamento.",
      optionsTable: {
        headers: ["Nível", "Descrição", "Quando usar"],
        rows: [
          ["Gouraud (Clássico)", "Iluminação básica, sem sombras", "PCs menos potentes"],
          ["Gouraud + SSAO", "Básica com oclusão", "Equilíbrio performance/realismo"],
          ["Gouraud + SSAO + Sombras", "Básica com sombras", "Visualização detalhada"],
          ["Phong", "Iluminação realista básica", "Preferência visual"],
          ["Phong + SSAO", "Realista com oclusão", "Melhor visualização de detalhes"],
          ["Phong + SSAO + Sombras", "Máximo realismo", "Visualização final da peça"],
        ],
      },
      howTo: [
        { step: "1", path: "Prepare", desc: "Abra o OrcaSlicer 3.2 na aba Prepare" },
        { step: "2", path: "Opções de renderização", desc: "Selecione Gouraud ou Phong" },
        { step: "3", path: "SSAO / Sombras", desc: "Ative conforme preferência visual" },
      ],
      example: {
        piece: "Miniatura com detalhes faciais",
        config: "Phong + SSAO + Sombras",
        result: "Curvas, texturas e áreas que precisam de suporte ficam claramente visíveis",
      },
      influences: "Percepção de detalhes, identificação de problemas de design e desempenho da GPU.",
      generates: "Pré-visualização realista da peça antes do fatiamento.",
      goldenRule: "Visualização realista = menos surpresas na impressão. Veja como sua peça vai ficar antes de fatiar.",
    },
    {
      name: "Sliders de Pré-visualização Aprimorados",
      value: "Interativos",
      whatIs:
        "Sliders da aba Preview foram reformulados: as etiquetas das camadas ao lado do slider vertical agora são interativas — clicáveis e arrastáveis. Destacam ao passar o mouse, preservam a posição atual (sem saltos) e ganharam estilo visual mais limpo com bordas e sombras.",
      whyAdjust:
        "Navegação camada por camada mais rápida e precisa, especialmente útil para inspecionar áreas críticas do G-code.",
      howTo: [
        { step: "1", path: "Preview", desc: "Acesse a aba Preview" },
        { step: "2", path: "Slider vertical", desc: "Navegue entre camadas ou clique nas etiquetas" },
        { step: "3", path: "Slider horizontal", desc: "Navegue dentro da camada selecionada" },
      ],
      influences: "Velocidade de inspeção do G-code e identificação de problemas por camada.",
      generates: "Experiência de navegação mais fluida na pré-visualização.",
      goldenRule: "Clique direto na etiqueta da camada para saltar — sem perder o contexto atual.",
    },
    {
      name: "Centro de Solução de Problemas (Troubleshoot Center)",
      value: "Novo recurso",
      whatIs:
        "Painel acessível pelo menu Ajuda que centraliza ferramentas de diagnóstico: salvar logs em ZIP, definir nível de log, copiar informações de sistema (OS/CPU/RAM/GPU/monitores), visão geral de perfis (habilitados/totais/usuários) e botão 'Reconstruir' para limpar a pasta de perfis. Nenhuma informação pessoal é coletada e especificações podem ser ocultadas.",
      whyAdjust:
        "Facilita reportar bugs com contexto suficiente para o time de desenvolvimento e resolver problemas locais de perfil sem reinstalar o software.",
      howTo: [
        { step: "1", path: "Ajuda > Centro de Solução de Problemas", desc: "Abrir o painel" },
        { step: "2", path: "Copiar informações do sistema", desc: "Para reportar bugs" },
        { step: "3", path: "Reconstruir", desc: "Limpa a pasta de perfis em caso de corrupção" },
        { step: "4", path: "Salvar logs", desc: "Exporta ZIP com logs para análise" },
      ],
      influences: "Velocidade de diagnóstico e qualidade dos relatórios de bug.",
      generates: "Logs e info de sistema padronizados para suporte.",
      goldenRule: "Use o Troubleshoot Center antes de reportar qualquer problema — economize tempo dos devs e seu.",
    },

    // ───────────── SEÇÃO 2: MELHORIAS EM PONTES ─────────────
    {
      name: "Largura de Linha Dedicada para Pontes",
      value: "100% do diâmetro do bico",
      whatIs:
        "Parâmetro novo (Bridge Line Width) que separa a largura das linhas de ponte da largura do infill sólido interno. Limitado a 100% do diâmetro do bico, melhora a adesão entre linhas impressas no ar — que não podem ser pressionadas contra a camada anterior.",
      whyAdjust:
        "Pontes ficam mais fortes, com melhor adesão lateral entre linhas e superfície inferior mais lisa, sem aumentar o tempo de impressão.",
      optionsTable: {
        headers: ["Largura", "Efeito"],
        rows: [
          ["70% do bico", "Linhas finas, menos sag mas pouca adesão"],
          ["85% do bico", "Equilíbrio"],
          ["100% do bico", "Máxima adesão entre linhas (recomendado)"],
        ],
      },
      howTo: [
        { step: "1", path: "Resistência > Pontes", desc: "Abrir parâmetros de ponte" },
        { step: "2", path: "Largura da linha da ponte", desc: "Ajustar entre 70–100% do bico" },
      ],
      influences: "Qualidade da superfície inferior de pontes e resistência das linhas no ar.",
      generates: "Pontes mais coesas e com acabamento melhor.",
      goldenRule: "100% do diâmetro do bico é o padrão ideal — pontes fortes sem custo de tempo.",
    },
    {
      name: "Direção Relativa de Pontes",
      value: "Ativado",
      whatIs:
        "Permite ajustar o ângulo da ponte em relação à geometria da peça, em vez de um ângulo absoluto fixo em relação à mesa. Você pode 'nudge' (deslocar) o ângulo em alguns graus. Ironing também respeita o alinhamento.",
      whyAdjust:
        "Em peças complexas, alinhar pontes à geometria da própria peça produz cobertura melhor que ângulos fixos.",
      howTo: [
        { step: "1", path: "Resistência > Pontes", desc: "Abrir parâmetros de ponte" },
        { step: "2", path: "Direção relativa de ponte", desc: "Ativar e ajustar o ângulo" },
      ],
      influences: "Cobertura e qualidade de pontes em geometrias irregulares.",
      generates: "Pontes alinhadas à peça, com melhor acabamento.",
      goldenRule: "Use direção relativa em geometrias complexas — siga a peça, não a mesa.",
    },
    {
      name: "Pontes Externas em Geometrias Complexas",
      value: "Algoritmo melhorado",
      whatIs:
        "O detector de pontes externas foi aprimorado para formar pontes corretamente onde contornos compartilham vértices e há micro-espaços entre superfícies adjacentes — situações em que a versão anterior gerava lacunas.",
      whyAdjust:
        "Não há nada para configurar — é uma melhoria automática. Antes (V2.3) pontes externas em peças complexas podiam ter lacunas; agora formam superfícies completas e uniformes.",
      example: {
        piece: "Peça com contornos sobrepostos",
        config: "OrcaSlicer 3.2 (automático)",
        result: "Superfície inferior perfeitamente formada, sem interrupções",
      },
      influences: "Qualidade da face inferior de peças com geometria complexa.",
      generates: "Pontes externas completas e uniformes.",
      goldenRule: "Atualizar para 3.2 já resolve pontes externas quebradas em peças complexas — sem mexer em parâmetros.",
    },

    // ───────────── SEÇÃO 3: MULTI-MATERIAL (SEMM) ─────────────
    {
      name: 'Filamento "Padrão" para Recursos Específicos',
      value: "Padrão (filamento ativo)",
      whatIs:
        'Nova opção "Padrão" na atribuição de filamento por recurso (paredes externas/internas, infill esparso/sólido, superfícies). Filamento 0 = Padrão usa o filamento ativo do objeto; outros recursos podem ter filamentos específicos, incluindo em impressoras SEMM (Single-Extruder Multi-Material).',
      whyAdjust:
        "Permite combinar materiais com propriedades diferentes na mesma peça — por exemplo, parede externa flexível com núcleo rígido — sem precisar de impressora IDEX.",
      howTo: [
        { step: "1", path: "Prepare", desc: "Selecione o objeto" },
        { step: "2", path: "Filamento por Recurso", desc: 'Escolha "Padrão" ou um filamento específico por recurso' },
      ],
      example: {
        piece: "Cabo de ferramenta",
        config: "Parede externa = TPU; demais = PETG",
        result: "Pegada macia por fora, núcleo rígido por dentro",
      },
      influences: "Possibilidades criativas e funcionais em SEMM e multimaterial.",
      generates: "Peças híbridas com propriedades diferentes por região.",
      goldenRule: "Filamento por recurso = criatividade sem limites. Use materiais diferentes em áreas diferentes da mesma peça.",
    },

    // ───────────── SEÇÃO 4: CONECTIVIDADE E HOSTS ─────────────
    {
      name: "Suporte Nativo ao Moonraker (Klipper)",
      value: "Moonraker",
      whatIs:
        "OrcaSlicer 3.2 adiciona Moonraker (Klipper) como tipo de host de impressão nativo. Permite controle direto de impressoras com firmware Klipper, sem precisar de plugins ou bridges.",
      whyAdjust:
        "Melhor integração com fazendas de impressão Klipper, comunicação mais confiável e rápida, e gerenciamento centralizado a partir do slicer.",
      howTo: [
        { step: "1", path: "Dispositivo", desc: "Abrir configuração de host" },
        { step: "2", path: "Tipo de host", desc: "Selecionar Moonraker (Klipper)" },
        { step: "3", path: "Endereço", desc: "Inserir IP/URL da máquina e conectar" },
      ],
      influences: "Fluxo de envio de G-code e monitoramento em impressoras Klipper.",
      generates: "Controle nativo de Klipper diretamente do OrcaSlicer.",
      goldenRule: "Klipper + Moonraker nativo no 3.2 — fim das gambiarras de integração.",
    },

    // ───────────── SEÇÃO 5: MELHORIAS EM INFILL ─────────────
    {
      name: "Ângulos Configuráveis para Lightning Infill",
      value: "Overhang 60–70° · Prune 40–50° · Straighten 20–30°",
      whatIs:
        "Três novos parâmetros (modo especialista) para o infill Lightning: Ângulo de Saliência (quão longe paredes suportam o topo), Ângulo de Poda (agressividade na remoção de ramos sem suporte) e Ângulo de Endireitamento (simplificação dos ramos).",
      whyAdjust:
        "Permite ajustar Lightning para diferentes geometrias, equilibrando uso de material com suporte ao topo da peça.",
      optionsTable: {
        headers: ["Parâmetro", "Função", "Recomendado"],
        rows: [
          ["Ângulo de Saliência (Overhang)", "Quão longe paredes suportam o topo", "60–70°"],
          ["Ângulo de Poda (Prune)", "Remoção de ramos sem suporte", "40–50°"],
          ["Ângulo de Endireitamento", "Simplificação dos ramos", "20–30°"],
        ],
      },
      howTo: [
        { step: "1", path: "Resistência > Preenchimento", desc: "Selecione Lightning como padrão" },
        { step: "2", path: "Avançado", desc: "Expandir opções avançadas" },
        { step: "3", path: "Ajustar ângulos", desc: "Configurar os três parâmetros conforme a peça" },
      ],
      influences: "Uso de material, suporte ao topo e tempo de impressão com Lightning.",
      generates: "Infill Lightning ajustado à geometria específica.",
      goldenRule: "Lightning configurável = menos material com mesmo suporte ao topo.",
    },

    // ───────────── SEÇÃO 6: OUTRAS MELHORIAS ─────────────
    {
      name: 'Desativar "Diminuir Velocidade para Perímetros Encaracolados"',
      value: "Desativado por padrão",
      whatIs:
        'A opção "Slow Down for Curled Perimeters" passa a vir desativada por padrão. Em velocidades modernas, pode causar artefatos nas paredes se o Pressure Advance não estiver perfeitamente calibrado. O tooltip foi expandido com recomendações.',
      whyAdjust:
        "Evita artefatos visíveis em paredes para a maioria dos usuários. Reativar só faz sentido em hotends com resfriamento fraco ou impressoras com Pressure Advance bem ajustado.",
      howTo: [
        { step: "1", path: "Velocidade > Avançado", desc: "Abrir opções avançadas de velocidade" },
        { step: "2", path: "Slow Down for Curled Perimeters", desc: "Reativar somente se necessário" },
      ],
      influences: "Qualidade visual das paredes e necessidade de calibração do Pressure Advance.",
      generates: "Paredes mais limpas por padrão.",
      goldenRule: "Mantenha desativado — só reative se vir curling nas paredes.",
    },
    {
      name: "Fechamento de Vãos e Linhas de Ponte em Modificadores",
      value: "Correções aplicadas",
      whatIs:
        "Correções para garantir que velocidades de ponte (internas e externas) e configurações de gap fill definidas em volumes modificadores sejam respeitadas durante o fatiamento. Também melhora a ordenação de partes de modelo sobrepostas.",
      whyAdjust:
        "Sem ação do usuário — é uma correção. Importante para quem usa modificadores para ajustar regiões específicas da peça.",
      influences: "Comportamento de modificadores e previsibilidade do fatiamento.",
      generates: "Modificadores que realmente aplicam suas configurações.",
      goldenRule: "Modificadores agora funcionam como esperado — confie nas suas configurações locais.",
      summaryTable: {
        title: "Resumo das novidades do OrcaSlicer 3.2",
        headers: ["Categoria", "Funcionalidade", "Impacto Principal"],
        rows: [
          ["Visualização", "Realistic View (Phong, SSAO, Sombras)", "Visualização mais realista"],
          ["Interface", "Sliders interativos", "Navegação mais fácil"],
          ["Diagnóstico", "Troubleshoot Center", "Facilidade em reportar problemas"],
          ["Pontes", "Largura dedicada", "Pontes mais fortes"],
          ["Pontes", "Direção relativa", "Melhor cobertura em geometrias complexas"],
          ["Multi-Material", 'Filamento "Padrão"', "Mais criatividade"],
          ["Infill", "Ângulos Lightning configuráveis", "Controle mais fino"],
          ["Hosts", "Suporte Moonraker", "Melhor integração Klipper"],
        ],
      },
    },
  ],

  "modulo-orcaslicer-3-3-novidades": [
    // ───────────── SEÇÃO 1: INTERFACE E ACESSIBILIDADE ─────────────
    {
      name: "Acesso Rápido às Configurações de Perfil de Filamento",
      value: "Botão direto na aba Preparar",
      whatIs:
        "A seção 'Personalização do Perfil de Filamento' foi reorganizada e agora expõe um botão de configuração direta na aba Preparar, ao lado da lista de perfis. Antes, esse acesso exigia navegar pelos menus gerais do slicer.",
      whyAdjust:
        "Reduz cliques e simplifica o fluxo de trabalho — ideal para quem troca de filamento com frequência e precisa ajustar fluxo, temperatura ou adesão da primeira camada rapidamente.",
      howTo: [
        { step: "1", path: "Preparar", desc: "Abrir a aba Preparar" },
        { step: "2", path: "Botão de configuração ao lado do perfil", desc: "Clicar para abrir configurações personalizadas" },
        { step: "3", path: "Ajustes rápidos", desc: "Editar fluxo, temperatura ou adesão e salvar" },
      ],
      influences: "Velocidade de troca de perfil de filamento e clareza do fluxo de ajustes.",
      generates: "Atalho direto para personalizações de filamento sem sair da aba Preparar.",
      goldenRule: "Use o atalho na Preparar para ajustar fluxo/temperatura ao trocar de filamento — sem dar voltas pelos menus.",
    },
    {
      name: "Tradução e Suporte a Idiomas",
      value: "Chinês simplificado, japonês e coreano",
      whatIs:
        "O OrcaSlicer 3.3 incorpora traduções oficiais para chinês simplificado, japonês e coreano. A padronização do código de localização também limpa a base do projeto, facilitando contribuições futuras em outros idiomas.",
      whyAdjust:
        "Melhora a experiência de usuários não falantes de inglês e prepara o terreno para mais traduções comunitárias.",
      howTo: [
        { step: "1", path: "Preferências > Idioma", desc: "Selecionar o idioma desejado" },
        { step: "2", path: "Reiniciar", desc: "Reabrir o OrcaSlicer para aplicar" },
      ],
      influences: "Acessibilidade global e adoção do slicer em mercados asiáticos.",
      generates: "Interface localizada em mais idiomas oficiais.",
      goldenRule: "Idioma certo = menos erros de interpretação de parâmetros técnicos.",
    },

    // ───────────── SEÇÃO 2: NOVOS ALGORITMOS DE FATIAMENTO ─────────────
    {
      name: "Fatiamento na Nuvem Baseado em Web (Web-based Slicing)",
      value: "Beta · Desativado por padrão",
      whatIs:
        "Serviço de fatiamento baseado em nuvem: o usuário envia o projeto (3MF), o servidor realiza o fatiamento e o G-code é devolvido para download ou impressão. Permite fatiar em máquinas fracas, navegadores web ou dispositivos móveis, dependendo da implementação do host (ex.: Bambu Lab).",
      whyAdjust:
        "Libera CPU local em peças grandes, viabiliza uso em hardware modesto e centraliza slicing em farms de impressão.",
      optionsTable: {
        headers: ["Cenário", "Vantagem"],
        rows: [
          ["Notebook/Chromebook fraco", "Fatiamento sem travar a máquina"],
          ["Farm de impressão", "Fila centralizada de slicing"],
          ["Mobile/Tablet", "Acesso via navegador"],
        ],
      },
      howTo: [
        { step: "1", path: "Preferências > Cloud", desc: "Ativar fatiamento na nuvem (off por padrão)" },
        { step: "2", path: "Conta", desc: "Fazer login no serviço suportado pelo host" },
        { step: "3", path: "Slice on Cloud", desc: "Enviar projeto e baixar o G-code gerado" },
      ],
      influences: "Carga da CPU local e tempo total em hardware fraco.",
      generates: "G-code gerado remotamente, baixado automaticamente ao final.",
      goldenRule: "Cloud para máquina fraca; local para controle total.",
    },
    {
      name: "Melhorias no Algoritmo de Suporte Árvore (Organic Supports)",
      value: "Estrutura mais leve + Diâmetro da Ponta",
      whatIs:
        "Os suportes Orgânicos (Árvore) ficaram mais leves (menos material, remoção mais fácil), ganharam o parâmetro Diâmetro da Ponta (espessura do ramo que toca a peça) e foram otimizados para multimaterial — em especial com filamentos de suporte solúveis combinados ao novo Purge Mode.",
      whyAdjust:
        "Pontas finas reduzem marcas em superfícies curvas; pontas grossas dão firmeza onde overhangs pesam. A nova geração ainda economiza filamento e tempo.",
      optionsTable: {
        headers: ["Diâmetro da Ponta", "Uso ideal"],
        rows: [
          ["0.2 mm", "Superfícies curvas e detalhadas"],
          ["0.3 mm", "Equilíbrio (padrão recomendado)"],
          ["0.4 mm+", "Suportes estruturais / overhangs pesados"],
        ],
      },
      howTo: [
        { step: "1", path: "Suporte > Suportes de Árvore", desc: "Selecionar tipo Tree (organic)" },
        { step: "2", path: "Diâmetro da Ponta", desc: "Ajustar conforme acabamento desejado" },
        { step: "3", path: "Purge Mode", desc: "Configurar limpeza no suporte para multimaterial" },
      ],
      influences: "Marcas residuais, facilidade de remoção, consumo de filamento.",
      generates: "Suportes árvore mais leves e com ponta otimizada.",
      goldenRule: "Diâmetro da Ponta fino para estética; grosso para segurança estrutural.",
    },
    {
      name: "Modo de Limpeza de Bico (Purge Mode)",
      value: "Nos Suportes / Preenchimento / Torre",
      whatIs:
        "Substitui a antiga opção 'Purgar nos Suportes dos Objetos', que era ambígua. O novo Purge Mode controla explicitamente onde o filamento residual é despejado durante trocas: na torre de purga, dentro dos suportes ou dentro do infill.",
      whyAdjust:
        "Mais clareza sobre o destino da purga e redução real de desperdício em impressões multimaterial — em alguns casos elimina a necessidade da torre.",
      optionsTable: {
        headers: ["Modo", "Desperdício", "Quando usar"],
        rows: [
          ["Na Torre de Purga", "Alto", "Cores muito contrastantes"],
          ["Nos Suportes", "Médio", "Multicor com suporte descartável"],
          ["No Preenchimento", "Mínimo", "Padrão recomendado para economia"],
        ],
      },
      howTo: [
        { step: "1", path: "Multimaterial > Purgar", desc: "Abrir parâmetros de purga" },
        { step: "2", path: "Modo de Limpeza de Bico", desc: "Escolher destino da purga" },
        { step: "3", path: "Diâmetro da Ponta", desc: "Combinar com tree supports para evitar marcas" },
      ],
      influences: "Quantidade de filamento desperdiçado em trocas de cor/material.",
      generates: "Impressões multimaterial mais econômicas e sem torre, se desejado.",
      goldenRule: "'Nos Suportes' para 2 cores sem torre; sempre ajuste o Diâmetro da Ponta para não marcar a peça.",
    },

    // ───────────── SEÇÃO 3: PERFORMANCE ─────────────
    {
      name: "Pular Etapas de Pós-Processamento",
      value: "Configurável",
      whatIs:
        "Correção e expansão da opção 'Pular Pontos de Pós-Processamento': permite que a torre de limpeza ignore etapas específicas de purga, especialmente útil em impressoras IDEX (dual-extrusor).",
      whyAdjust:
        "Reduz drasticamente tempo e filamento em multimaterial IDEX, e oferece mais flexibilidade para perfis customizados de calibração.",
      howTo: [
        { step: "1", path: "Multimaterial > Torre de Purga", desc: "Abrir opções da torre" },
        { step: "2", path: "Pular Pontos de Pós-Processamento", desc: "Ativar" },
        { step: "3", path: "Etapas", desc: "Selecionar quais etapas ignorar" },
      ],
      influences: "Tempo total de impressão e filamento gasto em torre/purga.",
      generates: "Fatiamentos IDEX mais rápidos e econômicos.",
      goldenRule: "Em IDEX, pule pontos de purga onde não há contaminação — economize tempo e material.",
    },

    // ───────────── SEÇÃO 4: PÓS-PROCESSAMENTO ─────────────
    {
      name: "Geração de Texturas (Fuzzy Skin) Aprimorada",
      value: "Modo Contínuo",
      whatIs:
        "Fuzzy Skin recebe um Modo Contínuo: a textura é aplicada de forma coerente entre camadas, sem 'costuras' nem faixas visíveis. A geração dos pontos de textura também ficou mais controlada, com padrão mais preciso.",
      whyAdjust:
        "Acabamento texturizado uniforme em peças altas, sem artefatos de descontinuidade — ideal para cabos, pegadas e superfícies decorativas.",
      howTo: [
        { step: "1", path: "Acabamento > Fuzzy Skin", desc: "Ativar Fuzzy Skin" },
        { step: "2", path: "Modo", desc: "Selecionar 'Contínuo' (novo padrão)" },
        { step: "3", path: "Densidade / Espessura", desc: "Ajustar para o efeito desejado" },
      ],
      example: {
        piece: "Cabo / pegada texturizada",
        config: "Fuzzy Skin Contínuo",
        result: "Textura uniforme de cima a baixo, sem faixas visíveis",
      },
      influences: "Qualidade visual e tátil de superfícies texturizadas.",
      generates: "Fuzzy Skin com aparência uniforme em toda a altura da peça.",
      goldenRule: "Fuzzy Skin Contínuo é o novo padrão — sempre prefira ao modo clássico.",
      summaryTable: {
        title: "Resumo das novidades do OrcaSlicer 3.3",
        headers: ["Categoria", "Funcionalidade", "Impacto Principal"],
        rows: [
          ["Interface", "Acesso rápido ao perfil de filamento", "Fluxo de trabalho mais rápido"],
          ["Idiomas", "Traduções para chinês, japonês e coreano", "Acessibilidade global"],
          ["Fatiamento", "Fatiamento na nuvem (Web-based)", "Impressão em dispositivos leves"],
          ["Suportes", "Diâmetro da Ponta (Árvore)", "Remoção mais fácil e menos marcas"],
          ["Suportes", "Modo de Limpeza de Bico (Purge Mode)", "Menos desperdício em multi-material"],
          ["Performance", "Pular etapas de pós-processamento", "Redução de tempo e filamento"],
          ["Acabamento", "Fuzzy Skin Contínuo", "Acabamento mais uniforme"],
        ],
      },
    },
  ],
};

