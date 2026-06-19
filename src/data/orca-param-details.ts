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
    {
      name: "Sólido interno › Direção do preenchimento sólido",
      value: "45°",
      whatIs:
        "Ângulo das linhas de preenchimento em áreas onde o infill é SÓLIDO (100%): interfaces infill/parede, camadas de topo/base internas e reforços. Exige máxima resistência e alinhamento com as forças aplicadas.",
      whyAdjust:
        "Alinhar com a carga predominante maximiza a resistência mecânica. 45° distribui forças uniformemente; 0° ou 90° concentram resistência em um eixo.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando Usar"],
        rows: [
          ["0°", "Linhas horizontais", "Forças em X"],
          ["45° (padrão)", "Distribuição uniforme", "Uso geral"],
          ["90°", "Linhas verticais", "Forças em Y"],
          ["0°/90°", "Cruzado", "Máxima resistência multidirecional"],
        ],
      },
      influences: "Direção da força, geometria, material e função da peça.",
      generates: "Resistência direcional (alinhada) ou uniforme (45°).",
      goldenRule: "45° para a maioria. Alinhe com a carga para resistência máxima.",
      summaryTable: {
        title: "Decisão rápida",
        headers: ["Tipo de Peça", "Direção", "Motivo"],
        rows: [
          ["Uso geral", "45°", "Distribuição uniforme"],
          ["Carga horizontal", "0°", "Força em X"],
          ["Carga vertical", "90°", "Força em Y"],
          ["Carga complexa", "0°/90°", "Ambas direções"],
        ],
      },
    },
    {
      name: "Sólido interno › Gabarito de rotação de preenchimento sólido",
      value: "Padrão",
      whatIs: "Ponto de referência a partir do qual a direção do infill sólido é calculada e rotacionada camada a camada.",
      whyAdjust: "Em peças assimétricas, mudar o gabarito alinha melhor o sólido com áreas críticas.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Padrão", "Rotação a partir do centro"],
          ["Personalizado", "Rotação a partir de ponto definido"],
        ],
      },
      influences: "Consistência do padrão sólido em peças assimétricas.",
      generates: "Alinhamento previsível ao longo da altura.",
      goldenRule: "Deixe em Padrão a menos que precise alinhar com eixo específico.",
    },
    {
      name: "Sólido interno › Aplicar preenchimento de vão",
      value: "Ativado",
      whatIs: "Ativa o gap fill: preenche pequenos espaços entre paredes e infill com linhas extras.",
      whyAdjust: "Sem gap fill, lacunas microscópicas enfraquecem a peça e podem ficar visíveis.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando Usar"],
        rows: [
          ["Ativado", "Preenche vãos", "Peças estruturais"],
          ["Desativado", "Deixa vãos", "Velocidade"],
        ],
      },
      influences: "Integridade da interface parede-infill.",
      generates: "Peça sólida sem lacunas; leve aumento de tempo.",
      goldenRule: "Ative para peças estruturais. Evita lacunas.",
    },
    {
      name: "Sólido interno › Filtrar vazios pequenos",
      value: "Ativado",
      whatIs: "Remove vazios microscópicos que não afetam a estrutura, reduzindo tempo de fatiamento.",
      whyAdjust: "Vazios sub-milimétricos geram movimentos extras sem ganho real.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando Usar"],
        rows: [
          ["Ativado", "Remove vazios pequenos", "Uso geral"],
          ["Desativado", "Mantém todos", "Requisitos especiais"],
        ],
      },
      influences: "Tempo de fatiamento e tamanho do G-code.",
      generates: "G-code mais limpo sem perda de resistência.",
      goldenRule: "Ative. Vazios pequenos não afetam resistência.",
    },
    {
      name: "Sólido interno › Sobreposição de preenchimento/parede",
      value: "20%",
      whatIs: "Quanto o infill se sobrepõe à parede interna para garantir conexão estrutural e eliminar lacunas.",
      whyAdjust: "Pouco = infill se solta; muito = marcas do infill aparecem na parede externa.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando Usar"],
        rows: [
          ["0-10%", "Pouca sobreposição", "Decorativas"],
          ["15-25% (padrão)", "Conexão forte", "Uso geral"],
          ["30-40%", "Conexão muito forte, marcas leves", "Estruturais"],
          ["50%+", "Infill visível na parede", "Casos extremos"],
        ],
      },
      influences: "Tipo de peça, material, densidade do infill e número de paredes.",
      generates: "Correto = forte e liso; insuficiente = fraco; excessivo = marcas.",
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste"],
        rows: [
          ["Densidade do infill", "Complementa", "Ajustar juntos"],
          ["Número de paredes", "Afeta necessidade", "+ paredes = – sobreposição"],
          ["Largura da linha", "Afeta valor real", "Proporcional"],
        ],
      },
      goldenRule: "20% para a maioria. Conecta infill à parede sem excesso.",
      summaryTable: {
        title: "Decisão rápida",
        headers: ["Tipo", "Sobreposição", "Motivo"],
        rows: [
          ["Decorativa", "10-15%", "Sem marcas"],
          ["Uso geral", "20%", "Equilíbrio"],
          ["Estrutural", "25-30%", "Conexão forte"],
          ["Alta carga", "30-40%", "Máxima resistência"],
        ],
      },
    },
    {
      name: "Avançado › Alinhar direção do preenchimento ao modelo",
      value: "Desativado",
      whatIs: "Ajusta automaticamente a direção do infill para se alinhar à geometria local do modelo.",
      whyAdjust: "Em geometrias curvas/orgânicas, direção fixa não acompanha as forças reais.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando Usar"],
        rows: [
          ["Ativado", "Ajuste local", "Peças orgânicas"],
          ["Desativado", "Direção global", "Peças simples"],
        ],
      },
      influences: "Resistência local em regiões com geometria variável.",
      generates: "Melhor aproveitamento mecânico em peças não-cartesianas.",
      goldenRule: "Ative para geometrias complexas.",
    },
    {
      name: "Avançado › Inserir camadas sólidas",
      value: "0",
      whatIs: "Adiciona camadas sólidas em intervalos regulares dentro do infill esparso, criando 'lajes' de reforço.",
      whyAdjust: "Aumenta rigidez vertical sem precisar aumentar a densidade global do infill.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando Usar"],
        rows: [
          ["0", "Sem camadas extras", "Peças simples"],
          ["2-3", "Reforço a cada 2-3mm", "Estruturais"],
          ["5+", "Muitas lajes", "Alta resistência vertical"],
        ],
      },
      influences: "Rigidez Z, peso, tempo e material.",
      generates: "Peças mais rígidas no eixo Z.",
      goldenRule: "2-3 para peças estruturais.",
    },
    {
      name: "Avançado › Direção de preenchimento de ponte externa",
      value: "0° (auto)",
      whatIs: "Ângulo do infill nas pontes EXTERNAS visíveis.",
      whyAdjust: "Linhas paralelas ao vão (0°) maximizam resistência; diagonais causam sag.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["0° (auto)", "Alinhado com a ponte — recomendado"],
          ["45°", "Diagonal — estético"],
        ],
      },
      influences: "Qualidade visual e resistência das pontes.",
      generates: "Pontes firmes sem afundamento.",
      goldenRule: "Deixe em 0°. Linhas paralelas ao vão = ponte forte.",
    },
    {
      name: "Avançado › Direção de preenchimento de ponte interna",
      value: "0° (auto)",
      whatIs: "Ângulo do infill nas pontes INTERNAS (não visíveis, mas estruturais).",
      whyAdjust: "Mesma lógica das pontes externas, afetando estrutura interna.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["0° (auto)", "Alinhado com a ponte"],
          ["45°", "Diagonal"],
        ],
      },
      influences: "Resistência estrutural interna sobre cavidades.",
      generates: "Suporte interno robusto para camadas subsequentes.",
      goldenRule: "0° (auto) para máxima resistência.",
    },
    {
      name: "Avançado › Ângulo relativo de ponte (Relative bridge angle)",
      value: "Desativado",
      whatIs: "Quando ATIVADO, os ângulos das pontes são RELATIVOS à geometria local, não à mesa.",
      whyAdjust: "Em peças rotacionadas, mantém a estratégia de ponte consistente.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Relativo à geometria"],
          ["Desativado", "Relativo ao eixo X"],
        ],
      },
      influences: "Consistência da estratégia de ponte ao rotacionar a peça.",
      generates: "Pontes ótimas independente da rotação.",
      goldenRule: "Ative se rotaciona peças no plate.",
    },
    {
      name: "Avançado › Limiar mínimo de preenchimento esparso",
      value: "0 mm²",
      whatIs: "Área mínima para que uma região receba infill esparso. Áreas menores são tratadas como sólidas ou ignoradas.",
      whyAdjust: "Em ilhas pequenas, infill esparso não traz resistência e gera movimentos extras.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["0 mm²", "Esparso em todas as áreas"],
          ["10-50 mm²", "Esparso apenas em áreas grandes"],
        ],
      },
      influences: "Tratamento de pequenas ilhas internas.",
      generates: "Menos movimentos curtos em ilhas pequenas.",
      goldenRule: "Mantenha 0 a menos que tenha problemas com ilhas pequenas.",
    },
    {
      name: "Avançado › Combinar preenchimento",
      value: "Desativado",
      whatIs: "Funde várias camadas de infill em uma única passagem mais espessa, acelerando a impressão.",
      whyAdjust: "Reduz drasticamente o tempo de infill, ao custo de maior demanda de fluxo do hotend.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Une camadas (mais rápido)"],
          ["Desativado", "Uma camada por vez (padrão)"],
        ],
      },
      influences: "Tempo de impressão, demanda de fluxo do hotend.",
      generates: "Impressões mais rápidas; cuidado com hotends de baixo fluxo.",
      goldenRule: "Ative em peças grandes com hotend volumétrico capaz.",
    },
    {
      name: "Avançado › Detectar preenchimentos sólidos internos estreitos",
      value: "Ativado",
      whatIs: "Identifica regiões estreitas de infill sólido e otimiza o tratamento para evitar superextrusão.",
      whyAdjust: "Sem detecção, áreas estreitas podem gerar blobs ou vazios.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Detecta e otimiza"],
          ["Desativado", "Tratamento padrão"],
        ],
      },
      influences: "Qualidade de regiões sólidas internas finas.",
      generates: "Acabamento limpo em sólidos estreitos.",
      goldenRule: "Mantenha ativado.",
    },
    {
      name: "Avançado › Garantir a espessura vertical da casca",
      value: "Ativado",
      whatIs: "Garante espessura mínima da casca em TODAS as áreas, adicionando sólido onde a geometria afina.",
      whyAdjust: "Sem esta opção, áreas inclinadas podem ter casca menor que a configurada, causando vazamentos.",
      optionsTable: {
        headers: ["Opção", "Efeito"],
        rows: [
          ["Ativado", "Espessura mínima garantida"],
          ["Desativado", "Pode variar com inclinação"],
        ],
      },
      influences: "Estanqueidade e opacidade em áreas inclinadas.",
      generates: "Peças sem vazamentos nem zonas translúcidas.",
      goldenRule: "Mantenha ativado — padrão seguro.",
    },
  ],

  // ====================================================================
  // TELA 31 — VELOCIDADE (Primeira camada · Outras camadas · Saliências)
  // ====================================================================
  "tela-31-velocidade-primeira-camada": [
    // ───────────── MÓDULO 1: VELOCIDADE DA PRIMEIRA CAMADA ─────────────
    {
      name: "Primeira camada",
      value: "50 mm/s",
      whatIs:
        "Velocidade do bico ao imprimir a primeira camada — a base de toda a peça. É uma das configurações mais críticas: se a primeira camada falha, toda a impressão falha.",
      whyAdjust:
        "Velocidade lenta dá tempo para o plástico esmagar contra a mesa e compensar pequenas irregularidades de nivelamento, garantindo adesão.",
      optionsTable: {
        headers: ["Velocidade", "Efeito", "Quando Usar"],
        rows: [
          ["10–15 mm/s", "Muito lenta", "Mesas irregulares, materiais difíceis"],
          ["20–30 mm/s", "Recomendado", "Uso geral, boa adesão"],
          ["40–50 mm/s", "Rápida", "Mesas perfeitas, peças pequenas"],
          ["60+ mm/s", "Muito rápida", "Risco alto de falha de adesão"],
        ],
      },
      influences:
        "Adesão à mesa, uniformidade das linhas, sensibilidade a desníveis, sucesso geral da impressão.",
      influencesList: [
        "Tipo de superfície (PEI, vidro, magnética, Kapton)",
        "Material (PLA, PETG, ABS, TPU)",
        "Tamanho da peça (peças grandes precisam de velocidade menor)",
        "Qualidade do nivelamento da mesa",
        "Uso de adesivos (cola, spray)",
      ],
      generates:
        "Velocidade lenta = adesão excelente e linhas uniformes. Velocidade alta = lacunas, descolamento e warping.",
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste Recomendado"],
        rows: [
          ["Altura da primeira camada", "Deve ser mais grossa", "0,24–0,30 mm"],
          ["Largura da primeira camada", "Mais grossa que padrão", "0,50–0,60 mm"],
          ["Temperatura da mesa", "Adequada ao material", "PLA 60 °C, PETG 80 °C"],
          ["Z-Offset", "Deve estar calibrado", "Ajustar com folha de papel"],
          ["Brim/Skirt", "Complementam adesão", "Ativar em peças grandes"],
        ],
      },
      howTo: [
        {
          step: "1",
          path: "Prepare › Velocidade › Velocidade da primeira camada › Primeira camada",
          desc: "Comece com 30 mm/s. Reduza para 20 mm/s em casos difíceis; suba a 40 mm/s em mesas perfeitas.",
        },
      ],
      example: {
        piece: "Suporte de parede 200×150 mm em PLA, mesa PEI lisa",
        config: "Primeira camada = 25 mm/s",
        result: "Adesão perfeita, sem warping, base uniforme em toda a área.",
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
      goldenRule:
        "Primeira camada lenta = sucesso garantido. Use 30 mm/s para a maioria; reduza a 20 mm/s em casos difíceis.",
      summaryTable: {
        title: "Decisão rápida por material × mesa",
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
      name: "Preenchimento da primeira camada",
      value: "100 mm/s",
      whatIs:
        "Velocidade do infill na primeira camada. Como o infill não é visível, pode ser mais rápido que a parede, mas ainda precisa aderir à mesa.",
      whyAdjust:
        "Equilibra tempo de impressão e adesão da base interna. Geralmente 1,5–2× mais rápido que a parede externa da primeira camada.",
      optionsTable: {
        headers: ["Velocidade", "Efeito", "Quando Usar"],
        rows: [
          ["20–40 mm/s", "Lenta", "Materiais difíceis"],
          ["40–60 mm/s", "Recomendado", "Uso geral"],
          ["60–80 mm/s", "Rápida", "Mesas perfeitas"],
        ],
      },
      influences: "Tempo da primeira camada e adesão das regiões internas.",
      generates: "Base interna firme sem comprometer a velocidade total.",
      goldenRule: "Mantenha 1,5–2× a velocidade da parede externa da primeira camada.",
    },
    {
      name: "Velocidade de deslocamento da primeira camada",
      value: "100% (mm/s)",
      whatIs:
        "Velocidade dos deslocamentos (sem extrusão) durante a primeira camada. Deslocamentos rápidos podem arrastar ou derrubar linhas ainda moles.",
      whyAdjust:
        "Reduzir evita marcas, arrastamentos e descolamentos antes da camada esfriar.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando Usar"],
        rows: [
          ["50–80 mm/s", "Seguro, sem marcas", "Uso geral"],
          ["80–120 mm/s", "Rápido", "Peças pequenas"],
          ["120+ mm/s", "Muito rápido", "Risco de marcas e arrastamentos"],
        ],
      },
      influences: "Integridade das linhas recém depositadas na primeira camada.",
      generates: "Primeira camada limpa, sem riscos nem deslocamentos.",
      goldenRule: "Mantenha abaixo de 100 mm/s na primeira camada.",
    },
    {
      name: "Número de camadas lentas",
      value: "1",
      whatIs:
        "Quantas camadas mantêm a velocidade reduzida antes de acelerar para a velocidade normal das demais camadas.",
      whyAdjust:
        "A transição gradual melhora a adesão e reduz o warping, especialmente em materiais que contraem muito.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando Usar"],
        rows: [
          ["1", "Padrão", "PLA, uso geral"],
          ["2–3", "Transição suave", "Peças grandes, ABS"],
          ["4–5", "Transição muito suave", "Materiais que contraem muito"],
        ],
      },
      influences: "Risco de warping e qualidade da base.",
      generates: "Aceleração progressiva sem choque térmico ou mecânico.",
      goldenRule: "1 camada para PLA; 2–3 para ABS. A transição gradual reduz o warping.",
    },

    // ───────────── MÓDULO 2: VELOCIDADE DE OUTRAS CAMADAS ─────────────
    {
      name: "Parede externa",
      value: "200 mm/s",
      whatIs:
        "Velocidade da parede mais externa — a superfície visível da peça. É o parâmetro que mais afeta a qualidade estética da impressão.",
      whyAdjust:
        "Velocidades altas geram vibrações que produzem ghosting e marcas. Velocidade lenta = superfície lisa e precisão dimensional maior.",
      optionsTable: {
        headers: ["Velocidade", "Efeito", "Quando Usar"],
        rows: [
          ["30–40 mm/s", "Muito lenta", "Alta qualidade estética"],
          ["40–60 mm/s", "Recomendado", "Uso geral, bom equilíbrio"],
          ["60–80 mm/s", "Rápida", "Peças menos críticas"],
          ["80–120 mm/s", "Muito rápida", "Risco de ghosting e marcas"],
        ],
      },
      influences:
        "Qualidade estética, precisão dimensional, presença de ghosting e marcas.",
      influencesList: [
        "Material (PLA, PETG, ABS, TPU)",
        "Aceleração configurada",
        "Temperatura do bico",
        "Altura da camada",
        "Input Shaping ativado ou não",
      ],
      generates:
        "Velocidade baixa = superfície espelhada. Velocidade alta = ghosting visível e menor precisão.",
      integrationsTable: {
        headers: ["Parâmetro", "Relação", "Ajuste Recomendado"],
        rows: [
          ["Aceleração", "Deve ser baixa", "500–1000 mm/s²"],
          ["Temperatura", "Mais quente = mais rápido", "Ajustar com a velocidade"],
          ["Fluxo", "Velocidade alta = fluxo alto", "Calibrar ambos juntos"],
          ["Input Shaping", "Permite velocidades maiores", "Ativar para acelerar"],
          ["Jerk", "Deve ser baixo", "5–8 mm/s"],
        ],
      },
      howTo: [
        {
          step: "1",
          path: "Prepare › Velocidade › Velocidade de outras camadas › Parede externa",
          desc: "Comece com 50 mm/s. Suba a 60 mm/s se a qualidade for boa; reduza a 40 mm/s se houver ghosting.",
        },
      ],
      example: {
        piece: "Busto decorativo em PLA",
        config: "Parede externa = 40 mm/s",
        result: "Superfície perfeita, sem marcas nem ghosting.",
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
      goldenRule:
        "Parede externa lenta = qualidade. 50 mm/s para a maioria; reduza a 40 mm/s para perfeição.",
      summaryTable: {
        title: "Decisão rápida por material e qualidade",
        headers: ["Qualidade", "PLA", "PETG", "ABS", "TPU"],
        rows: [
          ["Excelente", "35–45", "25–35", "30–40", "10–15"],
          ["Boa", "45–60", "35–50", "40–60", "15–25"],
          ["Rápida", "60–80", "50–70", "60–80", "25–35"],
        ],
      },
    },
    {
      name: "Parede interna",
      value: "300 mm/s",
      whatIs:
        "Velocidade das paredes internas — estruturais e não visíveis externamente. Foco em resistência e eficiência, não estética.",
      whyAdjust:
        "Pode ser 2–3× mais rápida que a parede externa, economizando tempo total sem prejudicar acabamento.",
      optionsTable: {
        headers: ["Velocidade", "Efeito", "Quando Usar"],
        rows: [
          ["80–120 mm/s", "Rápida", "Eficiência máxima"],
          ["120–200 mm/s", "Muito rápida", "Peças estruturais"],
          ["150–250 mm/s", "Extrema", "Impressoras rápidas (CoreXY, Klipper)"],
        ],
      },
      influences: "Tempo total de impressão e capacidade de fluxo do hotend.",
      generates: "Tempo de impressão drasticamente menor sem perda de qualidade externa.",
      goldenRule: "Parede interna 2–3× mais rápida que a externa.",
    },
    {
      name: "Pequenos perímetros",
      value: "50% (mm/s)",
      whatIs:
        "Velocidade reduzida aplicada a perímetros pequenos (detalhes finos, pontas), expressa em % da velocidade da parede externa.",
      whyAdjust:
        "Áreas pequenas têm pouco tempo para resfriar entre passagens; velocidade reduzida evita blobs e melhora a precisão.",
      optionsTable: {
        headers: ["Valor", "Efeito", "Quando Usar"],
        rows: [
          ["50%", "Metade da velocidade", "Detalhes muito finos"],
          ["75%", "Redução moderada", "Uso geral"],
          ["100%", "Velocidade normal", "Sem detalhes finos"],
        ],
      },
      influences: "Qualidade de pontas, colunas finas e detalhes pequenos.",
      generates: "Detalhes finos limpos, sem blobs ou deformações.",
      goldenRule: "50% para detalhes críticos; 75% para uso geral.",
    },
    {
      name: "Limiar de pequenos perímetros",
      value: "0 mm",
      whatIs:
        "Comprimento máximo de um perímetro para ser considerado “pequeno” e receber a velocidade reduzida.",
      whyAdjust:
        "Define quais áreas são desaceleradas. 0 mm desativa o tratamento; valores maiores ampliam o alcance.",
      optionsTable: {
        headers: ["Valor", "Efeito"],
        rows: [
          ["0 mm", "Nenhum perímetro considerado pequeno"],
          ["5–10 mm", "Pequenas áreas recebem velocidade reduzida"],
        ],
      },
      influences: "Quais regiões da peça são impressas em velocidade reduzida.",
      generates: "Controle preciso de onde aplicar o tratamento de pequenos perímetros.",
      goldenRule: "Comece com 0 mm; ative apenas se houver problemas em detalhes finos.",
    },
    {
      name: "Preenchimento esparso",
      value: "300 mm/s",
      whatIs:
        "Velocidade do infill interno da peça. Como é interno e não visível, pode ser a velocidade mais alta do perfil.",
      whyAdjust:
        "É o maior ganho de tempo possível. Limitado apenas pela capacidade volumétrica do hotend.",
      optionsTable: {
        headers: ["Velocidade", "Efeito", "Quando Usar"],
        rows: [
          ["150–250 mm/s", "Rápida", "Uso geral"],
          ["250–350 mm/s", "Muito rápida", "Impressoras rápidas"],
          ["350+ mm/s", "Extrema", "Fazendas de impressão / hotends de alto fluxo"],
        ],
      },
      influences: "Tempo total de impressão e demanda volumétrica do hotend.",
      generates: "Maior ganho de tempo do perfil, sem impacto visível.",
      goldenRule: "Infill 3–5× mais rápido que a parede externa, respeitando o fluxo máximo do hotend.",
    },
    {
      name: "Preenchimento sólido",
      value: "250 mm/s",
      whatIs:
        "Velocidade do infill denso que conecta o infill esparso às paredes (topo, base, sólidos internos).",
      whyAdjust:
        "Precisa de boa adesão à parede e cobertura uniforme; velocidade moderada equilibra acabamento e tempo.",
      optionsTable: {
        headers: ["Velocidade", "Efeito"],
        rows: [
          ["100–150 mm/s", "Moderada — melhor acabamento"],
          ["150–200 mm/s", "Rápida — equilíbrio"],
        ],
      },
      influences: "Adesão entre infill e parede, qualidade de topos e bases.",
      generates: "Topos e bases sólidos sem vazios visíveis.",
      goldenRule: "Mantenha entre a velocidade do infill esparso e a da parede externa.",
    },
    {
      name: "Superfície superior",
      value: "200 mm/s",
      whatIs:
        "Velocidade da última camada superior, visível externamente. Define a qualidade do acabamento de topo.",
      whyAdjust:
        "Velocidade lenta produz superfície lisa; pode ser combinada com Ironing para acabamento ainda melhor.",
      optionsTable: {
        headers: ["Velocidade", "Efeito"],
        rows: [
          ["30–50 mm/s", "Superfície lisa"],
          ["50–80 mm/s", "Equilíbrio entre tempo e acabamento"],
          ["80–120 mm/s", "Rápida, com possíveis marcas"],
        ],
      },
      influences: "Qualidade visual da face superior da peça.",
      generates: "Acabamento de topo uniforme, sem linhas marcadas.",
      goldenRule: "Mantenha entre 30–50 mm/s para topos perfeitos.",
    },
    {
      name: "Preenchimento de vão",
      value: "250 mm/s",
      whatIs:
        "Velocidade das linhas que preenchem vãos estreitos entre paredes (gap fill).",
      whyAdjust:
        "Vãos são imprevisíveis em largura; velocidade moderada evita superextrusão e blobs.",
      optionsTable: {
        headers: ["Velocidade", "Efeito"],
        rows: [
          ["100–150 mm/s", "Moderada — mais segura"],
          ["150–250 mm/s", "Rápida"],
        ],
      },
      influences: "Qualidade de vãos finos entre paredes.",
      generates: "Vãos preenchidos sem blobs ou superextrusão.",
      goldenRule: "Mantenha moderada para evitar artefatos em vãos.",
    },
    {
      name: "Suporte",
      value: "150 mm/s",
      whatIs:
        "Velocidade das estruturas de suporte. Como são descartadas, não precisam de alta qualidade.",
      whyAdjust:
        "Acelerar economiza tempo sem impacto na peça final.",
      optionsTable: {
        headers: ["Velocidade", "Efeito"],
        rows: [
          ["80–150 mm/s", "Rápida"],
          ["150–200 mm/s", "Muito rápida"],
        ],
      },
      influences: "Tempo total de impressão de peças com suporte.",
      generates: "Suportes funcionais com tempo mínimo.",
      goldenRule: "Acelere o máximo que o hotend permitir — suporte é descartado.",
    },
    {
      name: "Interface de suporte",
      value: "80 mm/s",
      whatIs:
        "Velocidade da camada de interface entre suporte e peça. Define a qualidade da superfície apoiada e a facilidade de remoção.",
      whyAdjust:
        "Velocidade reduzida melhora o acabamento da face apoiada e facilita a separação.",
      optionsTable: {
        headers: ["Velocidade", "Efeito"],
        rows: [
          ["30–50 mm/s", "Interface limpa, fácil remoção"],
          ["50–80 mm/s", "Equilíbrio"],
          ["80–120 mm/s", "Rápida — interface mais marcada"],
        ],
      },
      influences: "Qualidade da superfície apoiada e esforço de remoção.",
      generates: "Faces apoiadas limpas e suportes que se separam facilmente.",
      goldenRule: "Mantenha entre 30–50 mm/s para interfaces limpas.",
    },

    // ───────────── MÓDULO 3: VELOCIDADE EM SALIÊNCIAS ─────────────
    {
      name: "Reduzir velocidade em saliências",
      value: "Ativado",
      whatIs:
        "Reduz automaticamente a velocidade quando o bico imprime sobre saliências (overhangs), onde a camada anterior oferece pouco apoio.",
      whyAdjust:
        "Velocidade reduzida dá tempo para o material esfriar antes de avançar, evitando que a saliência caia ou enrole.",
      optionsTable: {
        headers: ["Opção", "Efeito", "Quando Usar"],
        rows: [
          ["Ativado", "Reduz velocidade em overhangs", "Peças com saliências"],
          ["Desativado", "Mantém velocidade normal", "Peças sem saliências"],
        ],
      },
      influences: "Qualidade de saliências e necessidade de suportes.",
      generates: "Saliências limpas, sem queda ou enrolamento.",
      goldenRule: "Ative sempre que houver overhangs — saliências precisam de velocidade reduzida.",
      summaryTable: {
        title: "Resumo dos parâmetros da Tela 31",
        headers: ["Parâmetro", "Função", "Valor Padrão", "Impacto"],
        rows: [
          ["Primeira camada", "Velocidade da base", "30–50 mm/s", "Adesão"],
          ["Parede externa", "Velocidade da superfície", "50–60 mm/s", "Qualidade estética"],
          ["Parede interna", "Velocidade estrutural", "150–200 mm/s", "Eficiência"],
          ["Preenchimento esparso", "Velocidade do infill", "200–300 mm/s", "Tempo de impressão"],
          ["Superfície superior", "Velocidade do topo", "50–80 mm/s", "Acabamento"],
          ["Reduzir velocidade em saliências", "Overhangs", "Ativado", "Qualidade das saliências"],
        ],
      },
    },
  ],

  // ====================================================================
  // TELA 32 — VELOCIDADE: Saliências, Travel e Aceleração
  // ====================================================================
  "tela-32-velocidade-saliencias-aceleracao": [
    {
      name: "Velocidade em saliências (tabela por %)",
      value: "10%=0 · 25%=50 · 50%=30 · 75%=10 mm/s",
      whatIs: "Tabela que reduz a velocidade conforme o grau de overhang (porcentagem da linha que está suspensa no ar). Quanto maior o overhang, mais lento o bocal viaja, dando tempo do cooling solidificar o plástico antes que ele caia.",
      whyAdjust: "Velocidades altas em saliências causam droop (queda), stringing e camadas mal formadas. A tabela faz a redução automática só onde necessário — preservando velocidade no resto.",
      influences: "Qualidade de overhangs sem suporte, necessidade de árvores de suporte, acabamento da face inferior em áreas inclinadas.",
      generates: "Overhangs limpos até 60–70° em PLA. Sem isso, qualquer saliência >45° apresenta deformação visível.",
      howTo: [
        { step: "1. Abrir aba Velocidade", path: "Painel Esquerdo › Velocidade › Velocidade em saliências", desc: "Localizar a tabela de 4 colunas (10/25/50/75%)" },
        { step: "2. Ajustar conforme material", path: "PLA: manter padrão · PETG: dobrar a redução · ABS: reduzir mais ainda", desc: "Materiais com cooling pior precisam de velocidades menores" },
      ],
      goldenRule: "Em peças com overhangs críticos: 10%=máx, 25%=80% da normal, 50%=50%, 75%=20%. Ative cooling 100% em paralelo.",
    },
    {
      name: "Velocidade de deslocamento (Travel)",
      value: "300 mm/s",
      whatIs: "Velocidade dos movimentos aéreos do bico (sem extrusão) entre uma região impressa e outra. Não afeta qualidade direta da extrusão, mas afeta stringing e tempo de impressão.",
      whyAdjust: "Travel alto reduz tempo morto e diminui chance de stringing (puxa o fio mais rápido que ele consegue escorrer). Travel muito alto pode causar layer shift em máquinas mal calibradas.",
      influences: "Tempo total de impressão, stringing entre objetos, ruído mecânico, risco de layer shift.",
      generates: "Em uma peça com muitas ilhas, travel 300 mm/s economiza 15–25% do tempo total vs. 150 mm/s.",
      goldenRule: "Core XY: 300–500 mm/s. Cartesiano (Ender, Prusa): 150–200 mm/s. Sempre combinar com Z-hop em peças altas.",
    },
    {
      name: "Aceleração — Parede externa",
      value: "500–1000 mm/s² (reduzir de 2000)",
      whatIs: "Quão rapidamente o bico atinge velocidade na parede externa. Aceleração alta significa que o bico chega à velocidade alvo em milissegundos — mas isso gera oscilação mecânica (ghosting/ringing).",
      whyAdjust: "Parede externa é a face VISÍVEL da peça. Acelerações altas aqui = ondulações fantasmas após cantos. Reduzir para 500–1000 mm/s² mata o ghosting, custando segundos por camada.",
      influences: "Qualidade visual da superfície, presença de ghosting/ringing, definição de cantos retos.",
      generates: "Cubo de calibração: aceleração 2000 = ondulações visíveis após cada canto. Aceleração 500 = canto limpo, parede lisa.",
      goldenRule: "Calibre Input Shaping ANTES de aceitar acelerações altas em parede externa. Sem IS, máximo 1000 mm/s² nesta linha.",
    },
    {
      name: "Aceleração — Infill esparso e Travel",
      value: "Infill 5000 · Travel 10000 mm/s²",
      whatIs: "Infill é interno (invisível), travel é aéreo (sem extrusão) — ambos podem usar aceleração alta sem custo visual. Ganho direto de tempo.",
      influences: "Tempo total de impressão (infill costuma ser 40–60% do tempo).",
      generates: "Aceleração infill 5000 vs 2000 reduz tempo de infill em ~30% sem afetar qualidade externa.",
      goldenRule: "Aceleração baixa onde se VÊ (parede externa, topo). Aceleração alta onde NÃO se vê (infill, travel, parede interna).",
      summaryTable: {
        headers: ["Tipo de linha", "Aceleração ideal", "Razão"],
        rows: [
          ["Parede externa", "500–1000", "Mata ghosting"],
          ["Parede interna", "2000–4000", "Equilíbrio"],
          ["Infill esparso", "5000+", "Invisível, ganha tempo"],
          ["Superfície topo", "1000–2000", "Acabamento liso"],
          ["Travel", "10000", "Sem extrusão, máx velocidade"],
        ],
      },
    },
  ],

  // ====================================================================
  // TELA 33 — VELOCIDADE: Jerk(XY), Decel e Suavização de Extrusão
  // ====================================================================
  "tela-33-velocidade-jerk-extrusao": [
    {
      name: "Habilitar accel_to_decel (50%)",
      value: "Ativado · 50%",
      whatIs: "Recurso do Klipper que limita a aceleração máxima usada em movimentos curtos. Em segmentos curtos, o firmware nunca atinge a velocidade alvo — o accel_to_decel reduz a aceleração permitida nesses casos, suavizando o movimento.",
      whyAdjust: "Sem accel_to_decel, segmentos curtos (cantos, detalhes finos) recebem aceleração total e geram vibração que aparece como ringing. Com 50%, o firmware nivela a resposta mecânica.",
      influences: "Qualidade em detalhes finos, ringing em cantos, suavidade de curvas complexas.",
      generates: "Texto em relevo de 2mm fica nítido vs. borrado. Curvas orgânicas sem 'degraus' de vibração.",
      goldenRule: "Klipper: ativar accel_to_decel em 50% é gratuito (zero perda de tempo) e melhora visivelmente detalhes pequenos.",
    },
    {
      name: "Jerk(XY) — Padrão",
      value: "9 mm/s",
      whatIs: "Quanto a impressora pode mudar de velocidade INSTANTANEAMENTE sem acelerar suavemente. Jerk alto = bico muda direção brusco; Jerk baixo = transição suave.",
      whyAdjust: "Jerk alto melhora qualidade em cantos pequenos (o bico não desacelera tanto), mas gera vibração mecânica. Em Input Shaper bem calibrado, jerk pode ser baixo (5–9) sem perda — o IS compensa.",
      influences: "Definição de cantos, ressonância da máquina, ghosting, ruído.",
      generates: "Jerk 20 sem IS = ringing severo. Jerk 9 com IS = cantos limpos sem custo de tempo.",
      goldenRule: "Sem Input Shaper: 7–9 mm/s. Com IS calibrado: 5–9 mm/s. Nunca >12 mm/s em parede externa.",
    },
    {
      name: "Jerk — Parede externa",
      value: "5–9 mm/s",
      whatIs: "Jerk específico da linha visível. Mantido baixo para garantir que cantos da face externa não vibrem.",
      influences: "Qualidade visual de cantos retos (cubos, prismas), nitidez de chanfros.",
      generates: "Jerk parede externa 5 mm/s + aceleração 1000 = canto perfeito, sem ondulação.",
      goldenRule: "Parede externa sempre com o Jerk MENOR de toda a tabela. É a linha visível.",
    },
    {
      name: "Suavização da extrusão (Avançado)",
      value: "0 mm³/s² (off)",
      whatIs: "Suaviza variações no fluxo de extrusão, reduzindo picos quando o bico desacelera/acelera. Funciona em conjunto com Pressure Advance no Klipper.",
      whyAdjust: "Ativar sem PA calibrado piora a qualidade. Só ative depois de PA bem ajustado — aí, suaviza ainda mais transições de velocidade.",
      influences: "Bleeding em cantos, qualidade quando há muita variação de velocidade.",
      generates: "Com PA + suavização: cantos sem 'gota' de excesso de plástico.",
      goldenRule: "Mantenha em 0 até calibrar Pressure Advance. Depois teste valores 0.01–0.05 mm³/s².",
    },
  ],

  // ====================================================================
  // TELA 41 — SUPORTE: Ativar, Tipo (Árvore), Estilo e Jangada
  // ====================================================================
  "tela-41-suporte-ativar-tipo": [
    {
      name: "Ativar suporte",
      value: "Ativado / Desativado",
      whatIs: "Liga ou desliga a geração automática de estruturas de suporte para overhangs e pontes. Sem suporte, áreas com overhang > 45° tendem a colapsar.",
      whyAdjust: "Algumas peças não precisam de suporte (geometrias simples). Outras precisam imperativamente. Ativar gera, desativar respeita pintura manual de suporte.",
      influences: "Viabilidade da impressão, tempo, consumo de filamento, qualidade da face inferior.",
      generates: "Peças orgânicas (figuras, miniaturas) sem suporte = falham; com Tree = imprimem perfeitas.",
      goldenRule: "Em dúvida, ative e revise o preview. Se o suporte estiver mínimo, mantenha; se for excessivo, desative e use pintura manual.",
    },
    {
      name: "Tipo: Árvore (auto)",
      value: "Árvore (auto)",
      whatIs: "Algoritmo moderno que gera suportes em forma de galhos orgânicos que se ramificam apenas onde precisam tocar a peça. Substitui o suporte Normal (grade vertical sólida).",
      whyAdjust: "Tree usa 40–60% menos filamento que Normal, deixa menos marcas, e remove com puxão. Ideal para geometrias orgânicas.",
      types: [
        { label: "Normal (auto)", desc: "Pilares verticais em grade — robusto, mais filamento, mais marcas" },
        { label: "Árvore (auto)", desc: "Ramos orgânicos — econômico, fácil remoção, ideal para curvas" },
        { label: "Híbrido", desc: "Tree para alturas grandes + Normal para áreas planas" },
      ],
      influences: "Consumo de filamento, qualidade da face inferior, facilidade de remoção, tempo de impressão.",
      generates: "Miniatura 60mm de altura: Normal = 18g de suporte. Tree = 7g. Mesma peça, mesma qualidade.",
      goldenRule: "Orgânico/curvo = Tree. Mecânico/plano = Normal+Snug. Quando em dúvida = Tree Organic.",
    },
    {
      name: "Ângulo limiar",
      value: "30°",
      whatIs: "Inclinação mínima (medida a partir da vertical) acima da qual o Orca considera a face uma overhang que precisa de suporte. 30° = qualquer face inclinada mais que 30° do prumo recebe suporte.",
      whyAdjust: "Reduzir (15–20°) gera MAIS suporte (mais conservador). Aumentar (40–60°) gera MENOS (confiando que o material aguenta).",
      influences: "Quantidade total de suporte, áreas que recebem ou não suporte, tempo.",
      generates: "Ângulo 30° = padrão seguro PLA. Ângulo 45° = mais econômico mas pode falhar em overhangs longos.",
      goldenRule: "PLA: 30–45°. PETG: 25–35°. ABS/ASA: 20–30°. Quanto pior o cooling, menor o ângulo limiar.",
    },
    {
      name: "Apenas na placa de impressão",
      value: "Ativado",
      whatIs: "Restringe o suporte a tocar APENAS a mesa de impressão — nunca em cima da peça. Sem isso, o Orca pode pousar suporte sobre superfícies da peça, deixando marcas.",
      whyAdjust: "Marca de suporte em cima da peça é difícil de remover e deixa imperfeição visível. Ativar evita totalmente.",
      influences: "Acabamento da face superior, marcas visíveis após remoção.",
      generates: "Figura com braço estendido: sem 'Apenas placa' = suporte pousa no ombro, marca visível. Com ativo = suporte sai do chão, sem marca.",
      goldenRule: "Sempre ativado em peças visuais. Desative apenas em peças funcionais internas onde marcas não importam.",
    },
    {
      name: "Densidade da primeira camada (Jangada/Raft)",
      value: "90%",
      whatIs: "Densidade da primeira camada do suporte (base que toca a mesa). 90% = quase sólida, garantindo adesão firme do suporte à plataforma.",
      influences: "Adesão do suporte à mesa, risco de descolamento do suporte durante a impressão.",
      generates: "Sem densidade alta na base, o suporte solta no meio da impressão = peça arruinada.",
      goldenRule: "Manter 80–100%. Não tente economizar aqui — suporte solto = impressão perdida.",
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
    {
      name: "Nova Interface de Usuário (UI Refresh)",
      value: "Layout modernizado",
      whatIs:
        "O OrcaSlicer 3.3 traz uma reformulação visual da interface: ícones redesenhados, espaçamentos otimizados, agrupamento mais lógico de parâmetros e melhor contraste entre seções. Painéis de Prepare, Preview e Device foram reorganizados para reduzir cliques em tarefas comuns.",
      whyAdjust:
        "Interface mais clara reduz curva de aprendizado para novos usuários e acelera fluxo de trabalho para usuários avançados.",
      howTo: [
        { step: "1", path: "Prepare / Preview / Device", desc: "Explore os painéis reorganizados" },
        { step: "2", path: "Preferências > Tema", desc: "Escolha entre tema claro/escuro otimizado" },
      ],
      influences: "Velocidade de trabalho e clareza visual em todas as abas.",
      generates: "Experiência mais fluida e profissional no slicer.",
      goldenRule: "Reserve 10 minutos para explorar a nova UI — você economizará horas depois.",
    },
    {
      name: "Fatiamento na Nuvem (Cloud Slicing — Web)",
      value: "Beta",
      whatIs:
        "Permite enviar o modelo para fatiamento em servidor remoto e receber o G-code de volta, sem usar CPU local. Ideal para dispositivos leves (Chromebook, tablets, notebooks fracos) ou para acelerar fatiamentos pesados em farms.",
      whyAdjust:
        "Libera o computador local durante fatiamentos longos e permite usar OrcaSlicer em hardware modesto.",
      optionsTable: {
        headers: ["Cenário", "Vantagem"],
        rows: [
          ["Notebook fraco", "Fatiamento sem travar a máquina"],
          ["Farm de impressão", "Fila centralizada de slicing"],
          ["Mobile/Tablet", "Acesso via navegador"],
        ],
      },
      howTo: [
        { step: "1", path: "Preferências > Cloud", desc: "Ativar fatiamento na nuvem" },
        { step: "2", path: "Conta", desc: "Fazer login na conta OrcaSlicer Cloud" },
        { step: "3", path: "Slice", desc: "Escolher 'Slice on Cloud'" },
      ],
      influences: "Carga da CPU local e tempo total de fatiamento em hardware fraco.",
      generates: "G-code gerado remotamente, baixado automaticamente ao fim.",
      goldenRule: "Use cloud slicing para peças grandes em máquinas fracas — sua CPU agradece.",
    },
    {
      name: "Diâmetro da Ponta de Suportes em Árvore",
      value: "Configurável",
      whatIs:
        "Novo parâmetro que controla o diâmetro da ponta dos ramos de suporte em árvore (tree supports). Pontas mais finas deixam menos marcas na peça e são mais fáceis de remover; pontas mais grossas oferecem maior estabilidade.",
      whyAdjust:
        "Reduz marcas residuais na superfície inferior de overhangs e facilita pós-processamento.",
      optionsTable: {
        headers: ["Diâmetro da Ponta", "Efeito", "Recomendado"],
        rows: [
          ["0.2–0.4 mm", "Mínima marca, fácil remoção", "Peças estéticas"],
          ["0.5–0.7 mm", "Equilíbrio", "Uso geral (padrão)"],
          ["0.8–1.2 mm", "Máxima estabilidade", "Overhangs pesados"],
        ],
      },
      howTo: [
        { step: "1", path: "Suporte > Árvore", desc: "Selecionar tipo Tree (organic)" },
        { step: "2", path: "Diâmetro da ponta", desc: "Definir conforme acabamento desejado" },
      ],
      influences: "Marcas residuais, facilidade de remoção e estabilidade do suporte.",
      generates: "Suportes em árvore com pontas otimizadas para a aplicação.",
      goldenRule: "Pontas finas (0.3 mm) para acabamento; pontas grossas (1.0 mm) para segurança estrutural.",
    },
    {
      name: "Modo de Limpeza de Bico (Purge Mode)",
      value: "Otimizado",
      whatIs:
        "Novo modo de purga reduz drasticamente o desperdício de filamento em impressões multimaterial (AMS, MMU). Em vez de descartar todo o material na torre de purga, parte é reutilizada em paredes internas, infill ou suporte.",
      whyAdjust:
        "Economia significativa de filamento em peças coloridas/multimaterial sem perder qualidade da troca.",
      optionsTable: {
        headers: ["Modo", "Desperdício", "Quando usar"],
        rows: [
          ["Torre de purga padrão", "Alto", "Cores muito contrastantes"],
          ["Reutilizar em infill", "Médio", "Padrão recomendado"],
          ["Reutilizar em suporte", "Baixo", "Quando suporte é descartável"],
        ],
      },
      howTo: [
        { step: "1", path: "Multimaterial > Purga", desc: "Abrir parâmetros de purga" },
        { step: "2", path: "Modo de limpeza", desc: "Selecionar 'Reutilizar em infill/suporte'" },
      ],
      influences: "Quantidade de filamento desperdiçado em trocas de cor/material.",
      generates: "Impressões multimaterial mais econômicas.",
      goldenRule: "Reutilize purga no infill — você pode economizar até 60% de filamento em peças multicor.",
    },
    {
      name: "Pular Etapas de Pós-processamento",
      value: "Opcional",
      whatIs:
        "Permite desativar etapas específicas de pós-processamento do G-code (ex.: arc fitting, otimizações de viagem, inserção de comentários) quando não são necessárias, acelerando o fatiamento final.",
      whyAdjust:
        "Reduz tempo de fatiamento em iterações rápidas (testes, calibrações) onde otimizações finais não importam.",
      howTo: [
        { step: "1", path: "Outros > Pós-processamento", desc: "Abrir lista de etapas" },
        { step: "2", path: "Desativar etapas", desc: "Marcar quais pular em modo rápido" },
      ],
      influences: "Tempo de fatiamento e tamanho final do G-code.",
      generates: "Fatiamento mais rápido para protótipos e testes.",
      goldenRule: "Em testes de calibração, pule pós-processamento — você economiza minutos por iteração.",
    },
    {
      name: "Fuzzy Skin Contínuo",
      value: "Ativado",
      whatIs:
        "Melhoria no algoritmo de Fuzzy Skin (textura rugosa em paredes) que mantém continuidade entre camadas, evitando 'costuras' ou faixas visíveis onde a textura quebrava. O ruído agora é coerente verticalmente.",
      whyAdjust:
        "Acabamento texturizado mais uniforme e profissional, sem artefatos de descontinuidade entre camadas.",
      howTo: [
        { step: "1", path: "Resistência > Fuzzy Skin", desc: "Ativar Fuzzy Skin" },
        { step: "2", path: "Modo", desc: "Selecionar 'Contínuo' (novo padrão)" },
      ],
      example: {
        piece: "Cabo / pegada texturizada",
        config: "Fuzzy Skin Contínuo",
        result: "Textura uniforme de cima a baixo, sem faixas visíveis",
      },
      influences: "Qualidade visual e tátil de superfícies texturizadas.",
      generates: "Fuzzy Skin com aparência uniforme em toda a altura.",
      goldenRule: "Fuzzy Skin Contínuo é o novo padrão — sempre prefira ao modo clássico.",
      summaryTable: {
        title: "Resumo das novidades do OrcaSlicer 3.3",
        headers: ["Categoria", "Funcionalidade", "Impacto Principal"],
        rows: [
          ["Interface", "Nova UI", "Mais clareza e produtividade"],
          ["Fatiamento", "Cloud Slicing", "Impressão em dispositivos leves"],
          ["Suportes", "Diâmetro da Ponta (Árvore)", "Remoção mais fácil e menos marcas"],
          ["Suportes", "Modo de Limpeza de Bico", "Menos desperdício em multi-material"],
          ["Performance", "Pular pós-processamento", "Redução de tempo e filamento"],
          ["Acabamento", "Fuzzy Skin Contínuo", "Acabamento mais uniforme"],
        ],
      },
    },
  ],
};

