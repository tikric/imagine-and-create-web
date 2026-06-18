export type ParamRow = { param: string; value: string; action: string };
export type Integration = { module: string; text: string };
export type ErrorItem = { error: string; solution: string };

export type Lesson = {
  id: string;
  number: number;
  title: string;
  duration: string;
  topics: string[];
  theory?: string[];
  integrations?: Integration[];
  goldenRule?: string;
  errors?: ErrorItem[];
  params?: ParamRow[];
  economy?: string;
  finance?: string;
  exercise?: string[];
};

export type Module = {
  id: string;
  number: number;
  title: string;
  tagline: string;
  level: "Iniciante" | "Intermediário" | "Avançado" | "Profissional";
  duration: string;
  methodology: string;
  objective: string;
  lessons: Lesson[];
};

const L = (
  n: number,
  id: string,
  title: string,
  duration: string,
  topics: string[],
  extra: Partial<Lesson> = {},
): Lesson => ({ number: n, id, title, duration, topics, ...extra });

export const modules: Module[] = [
  {
    id: "interface-completa", number: 1, title: "Interface Completa",
    tagline: "Domine cada pixel do OrcaSlicer",
    level: "Iniciante", duration: "1h 20min",
    methodology: "Tour guiado pela UI com screenshots anotadas das três zonas (Prepare, Preview, Device), exercícios práticos em cada aba.",
    objective: "Organizar o fluxo completo de importação, orientação física na mesa, configuração de propriedades, fatiamento em G-code e exportação/impressão final.",
    lessons: [
      L(1, "prepare-workspace", "Prepare | Central Workspace", "20min",
        ["Prepare", "Preview", "Device", "Modo Avançado"],
        {
          theory: [
            "O OrcaSlicer organiza o fluxo completo de fatiamento tridimensional em três grandes zonas lógicas: Prepare (aba de edição geométrica), Preview (leitor do G-code) e Device (gerenciador por rede).",
            "Prepare concentra importação de modelos (.stl, .step, .3mf), rotação, escala, posicionamento, seleção de perfis de processo e configuração de suportes e adesão.",
            "Preview é o leitor do G-code: visualização camada por camada, inspeção de velocidades e fluxos, tempo estimado por camada e verificação de caminhos de extrusão.",
            "Device é o gerenciador por rede: controle da impressora via LAN/Cloud, monitoramento de temperaturas, transmissão de vídeo e início de impressões remotas.",
          ],
          integrations: [
            { module: "Módulo 1 (Segurança)", text: "Configure o ambiente de trabalho seguro antes de começar — ventilação, impressoras fechadas para crianças, regras claras de operação." },
            { module: "Módulo 6 (Engenharia Mecânica)", text: "A orientação da peça na aba Prepare define a anisotropia. Posicione cargas paralelamente às camadas para máxima resistência." },
          ],
          economy: "Otimizar trajetórias cinemáticas encurta o tempo em até 20% por plate impresso. Ajustar retrações exatas previne engasgos.",
          finance: "Ajuste os coolers de ventilação na primeira camada para mitigar descolamentos de mesa PEI que geram perdas catastróficas.",
          params: [
            { param: "Modo de Visualização", value: "Avançado (On)", action: "Habilita a exibição completa de parâmetros cinemáticos e de extrusão" },
          ],
          goldenRule: "O primeiro passo do especialista absoluto é ativar o modo Avançado (Toggle) no painel esquerdo para expor as dezenas de parâmetros ocultos de engenharia de fatiamento.",
          errors: [
            { error: "Salvar projetos como STL perdendo configurações", solution: "Sempre salve como .3mf para reter perfis" },
            { error: "Tentar manipular geometrias na aba Preview", solution: "Retorne à aba Prepare para ajustes" },
          ],
          exercise: [
            "Importe um STL qualquer",
            "Mova nos 3 eixos, aplique escala e rotação",
            "Preencha uma placa com múltiplos objetos",
            "Salve como .3mf, feche, abra e observe a preservação de dados",
          ],
        }),
      L(2, "layout-barra-superior", "Layout Geral e Barra Superior", "18min",
        ["Add Plate", "Importação .stl/.step/.3mf", "Slice plate"], {
          theory: ["A barra superior centraliza os botões essenciais: 'Add Plate' para múltiplas mesas, importação universal (.stl, .step, .3mf) e 'Slice plate' para gerar o G-code da placa ativa."],
          integrations: [{ module: "Módulo 8 (Produção)", text: "Use Add Plate para organizar lotes comerciais — uma plate por cliente ou por SKU." }],
          goldenRule: "Prefira sempre o formato .3mf para preservar todas as configurações do projeto, incluindo orientação, suportes pintados e modifiers.",
          finance: "Organize placas completas para economizar aquecimento inicial: cada ciclo de pré-aquecimento consome 0.08-0.15 kWh.",
        }),
      L(3, "visualizacao-3d", "Visualização 3D, Movimentação, Escala e Rotação", "22min",
        ["Mover (M)", "Escalar (S)", "Rotacionar (R)", "Place on face"], {
          theory: [
            "Mover (M): arrasta por setas ou coordenadas precisas via painel direito.",
            "Escalar (S): o cadeado uniformizador mantém proporções — desative para escala não-uniforme.",
            "Rotacionar (R) e 'Place on face': assenta faces planas diretamente na PEI, eliminando suportes desnecessários.",
          ],
          integrations: [{ module: "Módulo 7 (Design)", text: "A orientação correta pode eliminar 100% dos suportes — sempre busque a face mais plana para baixo." }],
          params: [{ param: "Medida Absoluta", value: "Ativa (Uniforme)", action: "Mantém precisão milimétrica durante escala" }],
          goldenRule: "Use 'Place on Face' para máxima aderência: clique numa face plana e o Orca a alinha automaticamente com a mesa.",
        }),
      L(4, "ferramentas-avancadas", "Ferramentas Avançadas: Corte, Pintura e Suporte Manual", "20min",
        ["Cut", "Seam Painting", "Support Painting", "Modifier Mesh"], {
          theory: [
            "Cut: divide modelos em planos arbitrários, gerando opcionalmente pinos e slots de encaixe.",
            "Seam Painting: reposiciona a costura em arestas ocultas ou pintadas manualmente.",
            "Support Painting: força (azul) ou bloqueia (vermelho) suportes em regiões específicas.",
            "Modifier Mesh: customiza preenchimento, paredes ou velocidade em regiões delimitadas por uma geometria auxiliar.",
          ],
          integrations: [{ module: "Módulo 8 (Escala)", text: "Use a ferramenta Cut para dividir peças grandes em partes coláveis com pinos de alinhamento." }],
          params: [{ param: "Pino de Alinhamento", value: "Habilitado", action: "Gera cavidades e pinos para montagem após corte" }],
          goldenRule: "Combine Support Painting com Tree Organic para suportes mínimos e exatos — só onde a peça realmente precisa.",
        }),
    ],
  },

  {
    id: "config-impressora", number: 2, title: "Configurações da Impressora",
    tagline: "O perfil que descreve perfeitamente sua máquina",
    level: "Iniciante", duration: "1h 10min",
    methodology: "Configuração passo a passo do perfil de máquina, com referência aos firmwares Klipper, Marlin e RepRap.",
    objective: "Criar e validar o perfil de impressora que casa volume, firmware, cinemática e características do extrusor.",
    lessons: [
      L(1, "printer-profile", "Printer Profile > General", "20min",
        ["Vínculo slicer/microcontrolador", "Perfis oficiais"], {
          theory: ["O Printer Profile cria o vínculo entre o fatiamento e o microcontrolador. Um perfil mal configurado degrada o tempo de aceleração e gera G-code que a máquina não consegue executar com precisão."],
          integrations: [{ module: "Módulo 4 (Calibração)", text: "Perfil incorreto invalida toda a calibração subsequente." }],
          goldenRule: "Importe sempre as tabelas cinemáticas oficiais do fabricante antes de customizar.",
          finance: "Perfil correto reduz desgaste de motores e correias — economia direta em peças de reposição.",
        }),
      L(2, "volume-firmware", "Volume, Firmware e Limites da Máquina", "22min",
        ["Bed Shape", "Klipper/Marlin/RepRap", "Limites mecânicos"], {
          theory: [
            "Bed Shape e Tamanho Z: configure a área líquida realmente utilizável, descontando clipes e obstruções.",
            "Firmware: Klipper (mais avançado, Input Shaping nativo), Marlin (universal), RepRap (Duet).",
            "Limites Mecânicos: tetos de velocidade e aceleração que a estrutura física suporta sem ressonância.",
          ],
          integrations: [{ module: "Módulo 12 (Velocidade)", text: "Os limites da máquina nunca podem ser ultrapassados pelas velocidades de processo — eles são o teto absoluto." }],
          goldenRule: "Configure a área real, não a área de marketing do fabricante.",
          errors: [{ error: "Confundir acelerações de processo com tetos da máquina", solution: "Limites da máquina = hardware; processo = configurável por filamento" }],
        }),
      L(3, "bico-extrusor-fluxo", "Bico, Extrusor e Configurações de Fluxo", "28min",
        ["Diâmetro do bico", "Direct vs Bowden", "Volumetric Flow Limit"], {
          theory: [
            "Diâmetro do Bico: 0.4mm (padrão universal), 0.6mm (produção rápida), 0.2mm (detalhe extremo), 0.8mm (estrutural).",
            "Direct Drive: retração 0.5-1.2mm, ideal para TPU e flexíveis.",
            "Bowden: retração 3-6mm, maior inércia, mais leve no cabeçote.",
            "Volumetric Flow Limit: o teto físico de fusão do hotend (mm³/s). Exceder gera subextrusão garantida.",
          ],
          integrations: [{ module: "Módulo 2 (Materiais)", text: "Use bico endurecido (aço hardened ou rubi) obrigatoriamente para filamentos com fibra de carbono ou vidro." }],
          params: [
            { param: "Diâmetro do Bico", value: "0.4 mm", action: "Define largura padrão da linha" },
            { param: "Limite de Fluxo", value: "15 mm³/s", action: "Teto de derretimento seguro para hotend comum" },
          ],
          goldenRule: "Use bico de liga endurecida para qualquer filamento abrasivo — o desgaste de bico de latão começa nas primeiras horas.",
        }),
    ],
  },

  {
    id: "config-processo", number: 3, title: "Configurações de Processo",
    tagline: "O coração invisível do fatiamento",
    level: "Iniciante", duration: "1h 50min",
    methodology: "Walkthrough das 4 áreas críticas do Process Profile: Quality, Strength (paredes/infill), Speed e Support.",
    objective: "Configurar perfis de processo que equilibrem qualidade, velocidade e resistência conforme a finalidade da peça.",
    lessons: [
      L(1, "process-global", "Process > Global Settings", "20min",
        ["Velocidades de parede", "Fechamentos", "Presets"], {
          theory: ["Process > Global Settings gerencia velocidades de parede e fechamentos no nível mais alto. É onde você escolhe entre presets (0.16 Detail, 0.20 Standard, 0.28 Draft) ou customiza."],
          integrations: [{ module: "Módulo 3 (Adesão)", text: "A primeira camada definida aqui é o que determina sucesso ou falha de toda a impressão." }],
          params: [{ param: "Preset de Trabalho", value: "0.20mm Standard", action: "Equilíbrio precisão/velocidade" }],
          goldenRule: "Selecione o preset conforme a finalidade real da peça, depois customize 1-2 parâmetros — não comece do zero.",
        }),
      L(2, "quality-camadas", "Quality — Altura de Camada e Camadas Adaptativas", "25min",
        ["Altura de camada", "Primeira camada", "Adaptive Layer Height"], {
          theory: [
            "Altura de Camada: 0.12mm (detalhe fino) a 0.28mm (rápido). Regra: 25-75% do diâmetro do bico.",
            "Primeira Camada: sempre 100-150% da camada normal (0.20-0.30mm) — mais material = mais aderência.",
            "Adaptive Layer Height: reduz altura em detalhes curvos, expande em áreas planas. Economia real de tempo sem perder qualidade.",
          ],
          integrations: [{ module: "Módulo 7 (Design)", text: "Use Adaptive Layer Height especialmente em superfícies curvas com variação de geometria." }],
          economy: "Adaptive Layer Height reduz tempo total em até 30% em modelos com geometria mista.",
          params: [
            { param: "Altura da Camada", value: "0.20 mm", action: "Espessura vertical estável padrão" },
            { param: "Altura Primeira Camada", value: "0.24 mm", action: "Espessura ampliada para adesão" },
          ],
          goldenRule: "Use 0.28mm se a mesa está levemente desalinhada — camada maior perdoa imperfeições.",
        }),
      L(3, "paredes-infill", "Paredes, Infill e Top/Bottom", "30min",
        ["Wall Loops", "Infill Pattern", "Top/Bottom layers"], {
          theory: [
            "Wall Loops: 2-3 (decorativo), 4 (funcional), 5-6 (industrial). É o fator de resistência mais subestimado.",
            "Infill Pattern: Gyroid (isotrópico, sem cruzamentos), Cubic (resistente todas direções), Lightning (60% economia, só para decoração).",
            "Top/Bottom layers: mínimo 4 camadas sólidas para superfície fechada sem pinholing.",
          ],
          integrations: [{ module: "Módulo 6 (Engenharia)", text: "4 paredes geram mais resistência que aumentar infill de 20% para 40%, com menos material." }],
          params: [
            { param: "Wall Loops", value: "4", action: "Dita resistência à flexão" },
            { param: "Infill Density", value: "15%-25%", action: "Volume alveolar vazado padrão" },
          ],
          goldenRule: "Prefira sempre adicionar paredes em vez de aumentar densidade do infill — mais força com menos plástico.",
        }),
      L(4, "cooling-suporte-adesao", "Cooling, Suporte e Adesão à Mesa", "25min",
        ["Cooling Fan", "Tree Organic", "Skirt/Brim/Raft"], {
          theory: [
            "Cooling Fan: PLA 80-100%, PETG 30-60%, ABS/Nylon 0-10%. Errar aqui causa warping ou underextrusion.",
            "Suportes: Tree Organic (recomendado, ramos curvos) vs Normal Grid (denso, difícil de remover).",
            "Adesão: Skirt sempre (purga), Brim para cantos vivos, Raft só em casos extremos.",
          ],
          integrations: [{ module: "Módulo 2 (Materiais)", text: "Nunca use fan forte em ABS/ASA — a contração térmica acelerada causa warping severo e delaminação." }],
          params: [
            { param: "Estilo de Suporte", value: "Tree Organic", action: "Ramos curvos fáceis de destacar" },
            { param: "Z Gap de Interface", value: "0.20 mm", action: "Espaço para descolar suporte sem fundir" },
          ],
          goldenRule: "Mantenha o fan desligado em ABS/ASA — a contração térmica é seu pior inimigo.",
        }),
    ],
  },

  {
    id: "materiais-filamentos", number: 4, title: "Materiais & Filamentos",
    tagline: "PLA, PETG, ABS, ASA, TPU, PC, Nylon e compostos com fibra",
    level: "Iniciante", duration: "1h 30min",
    methodology: "Tabelas comparativas, fotos macro de filamento, perfis prontos por material e marca.",
    objective: "Dominar o comportamento térmico, mecânico e reológico de cada família de filamento.",
    lessons: [
      L(1, "pilares-materiais", "Materiais e os Pilares do Dia a Dia", "25min",
        ["Comportamento reológico", "Perfis por fabricante"], {
          theory: ["Cada material tem comportamento reológico único — viscosidade, contração, dependência térmica. Não existe perfil universal."],
          integrations: [{ module: "Módulo 2 (Materiais)", text: "Compreenda as propriedades poliméricas (Tg, ponto de fusão, contração) antes de configurar." }],
          goldenRule: "Crie perfis independentes para cada fabricante — variações de aditivos mudam temperatura ideal em ±10°C.",
          params: [{ param: "Densidade", value: "1.24 g/cm³ (PLA)", action: "Calibra custos precisos por peça" }],
        }),
      L(2, "pla-petg", "PLA e PETG — Características Térmicas e Mecânicas", "30min",
        ["PLA rígido", "PETG tenaz", "Stringing"], {
          theory: [
            "PLA: Rígido, ótimo para detalhe, frágil ao impacto, ~60°C de resistência térmica. Falha sob sol direto.",
            "PETG: Tenaz, resistente, ~80°C, mas stringing é problema crônico — exige retração calibrada.",
          ],
          integrations: [{ module: "Módulo 7 (Design)", text: "Escolha conforme aplicação: PLA para protótipo visual, PETG para funcional." }],
          params: [
            { param: "Nozzle Temp (PLA)", value: "205°C", action: "Fluidez ideal para PLA padrão" },
            { param: "Nozzle Temp (PETG)", value: "240°C", action: "Temperatura ampliada para fluidez do PETG" },
          ],
          goldenRule: "Use PETG ou ASA para peças externas. PLA derrete dentro de um carro fechado no sol.",
        }),
      L(3, "abs-asa-tpu", "ABS, ASA e TPU — Alta Performance e Flexíveis", "35min",
        ["ABS/ASA enclosure", "TPU Direct Drive", "Warping"], {
          theory: [
            "ABS/ASA: ~100°C de resistência, mas exigem enclosure (câmara fechada) obrigatório. Warping é o pesadelo.",
            "TPU: Flexível (Shore A 85-95), exige Direct Drive obrigatório, velocidade baixa (20-35 mm/s) e retração mínima.",
          ],
          integrations: [{ module: "Módulo 3 (Suportes)", text: "Use Brim largo para ABS/ASA — a contração na primeira camada descola peças sem aviso." }],
          params: [
            { param: "Temp. Mesa (ABS)", value: "105°C", action: "Mantém acima da transição vítrea" },
            { param: "Velocidade (TPU)", value: "25 mm/s", action: "Evita clog por compressão do flexível" },
          ],
          goldenRule: "Use base de cola (stick) ou laquê para materiais quentes — adesão dobra na primeira camada.",
        }),
    ],
  },

  {
    id: "calibracao-completa", number: 5, title: "Calibração Completa",
    tagline: "As ferramentas de calibração nativas do OrcaSlicer",
    level: "Intermediário", duration: "2h 00min",
    methodology: "Testes calibráveis nativos (Temperature Tower, Flow Rate, PA, Retraction) com análise visual e medição com paquímetro.",
    objective: "Dominar a sequência científica de calibração: cada passo apoia o seguinte.",
    lessons: [
      L(1, "metodologia-calibracao", "Calibration > Methodology", "25min",
        ["Sequência rigorosa", "5 calibrações básicas"], {
          theory: ["A calibração segue raciocínio lógico rigoroso: cada passo se assenta sobre constantes previamente calibradas. Pular etapas invalida tudo."],
          integrations: [{ module: "Módulo 4 (Calibração)", text: "Cada teste se baseia em variáveis estabilizadas — sem PID, não calibre fluxo." }],
          params: [{ param: "Ordem Metodológica", value: "Linear Rígida", action: "5 calibrações básicas em sequência" }],
          goldenRule: "Interrompa qualquer teste se observar descolamentos — calibração com adesão ruim é dado corrompido.",
        }),
      L(2, "temp-flow-pa", "Temperature Tower, Flow Rate e Pressure Advance", "40min",
        ["Temperature Tower", "Flow coarse/fine", "Pressure Advance"], {
          theory: [
            "Temperature Tower: identifica a faixa sem stringing nem subextrusão, por filamento.",
            "Flow Rate: Coarse (global, em saltos de 5%) + Fine (ajuste fino centesimal).",
            "Pressure Advance (PA): neutraliza a inércia do polímero, eliminando blobs em cantos.",
          ],
          integrations: [{ module: "Módulo 5 (Hotend)", text: "PA bem calibrado elimina bolhas em quinas e cantos de paredes externas." }],
          params: [
            { param: "Flow Ratio", value: "0.98", action: "Vazão milimétrica balanceada" },
            { param: "Pressure Advance", value: "0.025", action: "Compensação de pressão do bico" },
          ],
          goldenRule: "Siga a sequência exata: Temperatura → Fluxo → Pressure Advance. Inverter quebra a calibração.",
        }),
      L(3, "retraction-input-shaping", "Retraction e Input Shaping", "35min",
        ["Retração Direct/Bowden", "Input Shaping", "Ghosting"], {
          theory: [
            "Retração: Direct Drive 0.5-1.5mm, Bowden 3-6mm. Velocidade 30-60 mm/s.",
            "Input Shaping: filtro matemático que cancela vibrações da estrutura — elimina ghosting e ringing.",
          ],
          integrations: [{ module: "Módulo 5 (Problemas)", text: "90% dos casos de stringing são umidade do filamento, não retração mal calibrada." }],
          params: [
            { param: "Distância de Retração", value: "0.8 mm", action: "Percurso de recuo para Direct Drive" },
            { param: "Velocidade de Retração", value: "40 mm/s", action: "Retorno ágil sem grind do filamento" },
          ],
          goldenRule: "Seque o filamento antes de assumir qualquer erro de retração — umidade é a causa nº 1 de stringing.",
        }),
    ],
  },

  {
    id: "engenharia-mecanica", number: 6, title: "Engenharia Mecânica 3D",
    tagline: "Pense como engenheiro, não como mero operador",
    level: "Avançado", duration: "1h 45min",
    methodology: "Ensaios destrutivos, gráficos de carga vs orientação, casos reais de falha mecânica.",
    objective: "Projetar peças funcionais entendendo anisotropia, orientação de carga e infill estrutural real.",
    lessons: [
      L(1, "engenharia-3d", "Engenharia Mecânica para Impressão 3D", "30min",
        ["Anisotropia", "Cisalhamento Z"], {
          theory: ["Anisotropia: peças FDM são fortes em X/Y (filamento contínuo) e frágeis em Z (apenas adesão entre camadas). Queda de até 60% no eixo Z."],
          integrations: [{ module: "Módulo 7 (Design)", text: "Oriente cargas sempre paralelamente às camadas para máxima resistência." }],
          params: [{ param: "Anisotropia Típica", value: "Eixo Z Crítico", action: "Queda de até 60% na resistência" }],
          goldenRule: "Planeje os eixos de carga em direções longitudinais às camadas — sempre.",
        }),
      L(2, "direcao-camadas", "Direção das Camadas e Tipos de Tensão", "30min",
        ["Posicionamento", "Tração/compressão/flexão"], {
          theory: ["O posicionamento do modelo na mesa define a durabilidade sem acrescentar peso ou material. A mesma peça pode quebrar ou aguentar 10x mais carga só pela orientação."],
          integrations: [{ module: "Módulo 3 (Suportes)", text: "Orientação correta reduz drasticamente a necessidade de suportes." }],
          params: [{ param: "Orientação da Peça", value: "Paralela à Carga", action: "Garante resistência sem quebras de Z" }],
          goldenRule: "Evite imprimir pinos em pé se eles vão sofrer forças transversais — quebram na primeira tensão.",
        }),
      L(3, "infill-paredes-real", "Infill, Paredes e Resistência Estrutural Real", "45min",
        ["4 paredes vs infill denso", "Gyroid/Cubic"], {
          theory: ["4-5 paredes aumentam a rigidez em ~120% comparado a infill denso. Paredes são a estrutura primária; infill é estrutura secundária."],
          integrations: [{ module: "Módulo 18 (Infill)", text: "Use Gyroid ou Cubic para distribuição isotrópica de tensões em peças estruturais." }],
          params: [{ param: "Configuração Mecânica", value: "4 Paredes + 25% Gyroid", action: "Rigidez volumétrica ideal" }],
          goldenRule: "4 paredes + 25% Gyroid = a receita padrão de rigidez para peças funcionais.",
        }),
    ],
  },

  {
    id: "otimizacao-extrema", number: 7, title: "Otimização Extrema",
    tagline: "Menos tempo, menos material, máxima resistência",
    level: "Avançado", duration: "1h 00min",
    methodology: "Análise min/g (minutos por grama), comparativos de Lightning vs Cubic, bicos de alto fluxo.",
    objective: "Imprimir 30-60% mais rápido com 40-60% menos plástico, sem perder resistência funcional.",
    lessons: [
      L(1, "otimizacao-conceitos", "Otimização Extrema — Conceitos Gerais", "25min",
        ["Trajetórias redundantes", "Velocidades assimétricas"], {
          theory: ["A base da otimização é combater movimentações redundantes e desperdício de fusão. Cada movimento ocioso é dinheiro perdido."],
          integrations: [{ module: "Módulo 9 (Comercial)", text: "Otimização traduz-se direto em lucratividade — produção por hora aumenta linearmente." }],
          economy: "Análise min/g (minutos por grama) = métrica de lucratividade real por peça.",
          params: [{ param: "Métrica Monitorada", value: "Tempo por Grama (min/g)", action: "Indica eficiência do processo" }],
          goldenRule: "Defina velocidades assimétricas — devagar onde aparece, rápido onde não aparece.",
        }),
      L(2, "reduzir-tempo-material", "Reduzir Tempo e Material sem Perder Rigidez", "35min",
        ["Lightning Infill", "Bico 0.6mm", "Adaptive Layer"], {
          theory: ["Lightning Infill: cria subestruturas flutuantes que sustentam apenas o topo, economizando até 60% de plástico em decorativos."],
          integrations: [{ module: "Módulo 18 (Infill)", text: "Lightning é perfeito para peças decorativas e protótipos visuais." }],
          economy: "Bico 0.6mm reduz tempo em 40%+ para peças volumosas — economia anual de R$ 1.500+ em horas de máquina.",
          params: [{ param: "Padrão de Infill", value: "Lightning", action: "Otimização volumétrica extrema" }],
          goldenRule: "Use Lightning com 10-15% para peças de vitrine e modelos decorativos.",
        }),
    ],
  },

  {
    id: "estudos-caso", number: 8, title: "Estudos de Caso Reais",
    tagline: "A configuração ideal para cada tipo de geometria",
    level: "Avançado", duration: "1h 30min",
    methodology: "Estudo de 3 casos reais: dobradiças, engrenagens, suportes de carga pesada.",
    objective: "Aplicar todo o conhecimento teórico em casos práticos de engenharia mecânica.",
    lessons: [
      L(1, "case-studies", "Prepare > Case Studies", "20min",
        ["Requisitos funcionais", "Fatores térmicos e químicos"], {
          theory: ["A análise de requisitos funcionais antecede o fatiamento. Cada utilidade tem limites específicos (carga, ciclos, exposição química, térmica)."],
          integrations: [{ module: "Módulo 7 (Design)", text: "Cada utilidade tem limites específicos — liste todos antes de modelar." }],
          goldenRule: "Liste fatores térmicos e químicos antes de fatiar — a peça vai ficar onde, sob qual carga, exposta a quê?",
        }),
      L(2, "pecas-funcionais", "Peças Funcionais: Suportes, Dobradiças, Engrenagens", "35min",
        ["Dobradiças tolerância XY", "Engrenagens em Nylon", "Bico especial"], {
          theory: [
            "Dobradiças: exigem tolerâncias XY precisas (0.2mm de folga típica).",
            "Engrenagens: imprimir em Nylon ou PA-CF, bico especial endurecido, fan desligado para coesão entre camadas.",
          ],
          integrations: [{ module: "Módulo 2 (Materiais)", text: "Use Nylon para alta fricção e ciclos longos — PLA falha por fadiga em ~1000 ciclos." }],
          params: [{ param: "Filamento", value: "Nylon PA12 / ASA", action: "Polímeros de rigidez máxima" }],
          goldenRule: "Ajuste Horizontal Expansion (-0.05mm) quando furos saem apertados para encaixes.",
        }),
      L(3, "suporte-parede-pesada", "Suporte de Parede de Serviço Pesado", "35min",
        ["6 loops concêntricos", "Gyroid 3D 30%", "Furos horizontais"], {
          theory: ["Para suportes que sustentam carga real: 6 loops concêntricos + Gyroid 30% = máxima resistência por grama."],
          integrations: [{ module: "Módulo 6 (Engenharia)", text: "Alinhe furos de ancoragem na horizontal para evitar delaminação por arrancamento." }],
          params: [{ param: "Infill Aplicado", value: "Gyroid 3D (30%)", action: "Melhor distribuição contra torções" }],
          goldenRule: "Oriente furos horizontalmente para evitar delaminação por carga axial.",
        }),
    ],
  },

  {
    id: "comercial", number: 9, title: "Impressão 3D Comercial",
    tagline: "Transforme conhecimento ultra especializado em margem líquida",
    level: "Profissional", duration: "1h 10min",
    methodology: "Planilha de precificação para download, casos reais de margem no mercado brasileiro.",
    objective: "Precificar peças com lucro real, calculando todos os custos invisíveis.",
    lessons: [
      L(1, "mercado-profissional", "Impressão 3D Comercial e o Mercado Profissional", "30min",
        ["Padronização de custos", "Produtividade líquida"], {
          theory: ["A padronização absoluta de custos operacionais é o que separa hobby de negócio. Sem planilha, não há margem real."],
          integrations: [{ module: "Módulo 8 (Produção)", text: "Consistência operacional reduz perdas — cada falha é uma quebra de margem." }],
          economy: "Preencha 90% da mesa para economizar aquecimento e tempo de setup por peça.",
          finance: "Cobre R$ 15-25/hora ativa de máquina como referência de mercado brasileiro.",
          goldenRule: "Calcule produtividade líquida (peças boas/hora), não bruta.",
        }),
      L(2, "precificacao", "Precificação: Custo, Lucro e Perfis Comerciais", "40min",
        ["Energia ~300W", "Desgaste de bico", "Depreciação", "Taxa de falha"], {
          theory: ["Componentes obrigatórios do custo: energia (~300W ativos), desgaste de bico, depreciação da impressora, taxa de falha (~8-10%), tempo humano."],
          integrations: [{ module: "Módulo 15 (Produção)", text: "Use sempre taxa de falha histórica na precificação — não opcional." }],
          finance: "Margem 2x a 4x sobre custo básico para sustentabilidade do negócio. Inclua taxa de setup para projetos novos.",
          params: [{ param: "Taxa de Falha Coberta", value: "10% de Contingência", action: "Amortece custos inerentes de falha" }],
          goldenRule: "Inclua taxa de setup separada para projetos novos — modelar/calibrar nova peça consome horas não-impressão.",
        }),
    ],
  },

  {
    id: "mestre-orcaslicer", number: 10, title: "Mestre do OrcaSlicer",
    tagline: "Desafios integrados simulados",
    level: "Profissional", duration: "1h 00min",
    methodology: "Desafios de diagnose com sintomas múltiplos, raciocínio clínico, intervenções graduais.",
    objective: "Diagnosticar e resolver problemas complexos integrando múltiplos parâmetros simultaneamente.",
    lessons: [
      L(1, "desafio-slicer", "Mestre do OrcaSlicer — O Desafio do Slicer", "25min",
        ["Parâmetros térmicos complexos", "Raciocínio clínico"], {
          theory: ["A integração de parâmetros térmicos complexos exige raciocínio clínico: identificar o sintoma principal, isolar variáveis, intervir."],
          params: [{ param: "Nível do Desafio", value: "Expert Integrado", action: "Garante raciocínio clínico" }],
          goldenRule: "Varie uma única variável por vez — sempre. Diagnóstico múltiplo simultâneo é impossível de interpretar.",
        }),
      L(2, "diagnose-fisica", "Desafios Integrados de Diagnose Física", "35min",
        ["Warping severo", "PID dinâmico", "Sintomas múltiplos"], {
          theory: ["Warping severo exige intervenção combinada: Brim alargado + fan desligado + PID calibrado + mesa quente."],
          integrations: [{ module: "Módulo 5 (Problemas)", text: "Diagnose de sintomas múltiplos requer abordagem em árvore de decisão." }],
          params: [{ param: "Intervenção Crítica", value: "PID Dinâmico", action: "Estabiliza aquecimento para eliminar Z-Banding" }],
          goldenRule: "Higienize a placa PEI com sabão neutro semanalmente — oleosidade é causa nº 1 de descolamento.",
        }),
    ],
  },

  {
    id: "seams-acabamento", number: 11, title: "Seams e Acabamento Profissional",
    tagline: "Peças visualmente belas e sem emendas aparentes",
    level: "Avançado", duration: "2h 15min",
    methodology: "Seam Painting passo a passo, fotos macro de costuras boas e ruins, demonstração de Scarf Joint.",
    objective: "Posicionar a costura exatamente onde ela desaparece e dominar Ironing para superfícies espelhadas.",
    lessons: [
      L(1, "seams-intro", "Seams (Costuras) e Acabamento Profissional", "20min",
        ["Emenda perímetro", "Caminhos concêntricos"], {
          theory: ["A seam é a emenda onde o bico inicia e fecha o perímetro de cada camada. Mal posicionada, vira linha vertical visível na peça."],
          integrations: [{ module: "Módulo 6 (Pós-processamento)", text: "A posição da costura define a qualidade estética final mesmo antes do lixamento." }],
          goldenRule: "Use caminhos concêntricos onde possível para esconder costuras dentro de geometrias.",
        }),
      L(2, "como-orca-cria-emendas", "Como o OrcaSlicer Cria as Emendas", "25min",
        ["Scarf Joint", "Staggered", "Pressão início/fim"], {
          theory: [
            "Scarf Joint: sobrepõe as pontas em rampa para junção praticamente invisível.",
            "Staggered: distribui emendas em diferentes alturas em camadas adjacentes.",
            "Pressão acumulada no início/fim de extrusão é a causa física do blob na costura.",
          ],
          integrations: [{ module: "Módulo 5 (Hotend)", text: "A pressão acumulada no hotend cria blob no início e crater no fim — Scarf compensa isso." }],
          goldenRule: "Ative Scarf Joint para peças cilíndricas e geometrias suaves.",
        }),
      L(3, "tipos-seam", "Tipos de Seam: Rear, Aligned, Nearest e Random", "25min",
        ["Aligned", "Rear", "Nearest", "Random"], {
          theory: [
            "Aligned: empilha em canto oculto (ideal para poligonais com aresta natural).",
            "Rear: posiciona na traseira (montagem oculta).",
            "Nearest: minimiza tempo de viagem (peças técnicas onde estética não importa).",
            "Random: espalha pontos (superfícies redondas lisas).",
          ],
          params: [
            { param: "Seam Position", value: "Rear (Traseira)", action: "Mantém frente de figuras livre de marcas" },
            { param: "Wipe Distance", value: "2.0 mm", action: "Limpa sobra na costura" },
          ],
          goldenRule: "Use Random para artigos redondos lisos — uma linha visível arruinaria o acabamento.",
        }),
      L(4, "esconder-seam", "Como Esconder e Posicionar a Seam", "30min",
        ["Seam Painting", "Pintura vermelho/azul", "Quinas internas"], {
          theory: ["Seam Painting permite pintar áreas vermelhas (bloquear costura) ou azuis (forçar costura). Controle manual absoluto."],
          integrations: [{ module: "Módulo 1 (Interface)", text: "Use a ferramenta de pintura da aba Prepare para marcar manualmente." }],
          goldenRule: "Posicione a costura em quinas internas de modelos articulados — esconde 100%.",
        }),
      L(5, "ironing", "Ironing e Surface Smoothing", "35min",
        ["Microfluxo 15%", "Velocidade 15-30 mm/s", "Espaçamento 0.1mm"], {
          theory: ["Ironing: o bico quente passa novamente sobre o topo com microfluxo (10-15%) e velocidade reduzida, alisando a superfície até ficar espelhada."],
          integrations: [{ module: "Módulo 6 (Pós-processamento)", text: "Ironing entrega superfície espelhada que dispensa lixa fina." }],
          params: [
            { param: "Fluxo de Alisamento", value: "15%", action: "Volume para fechar frinchas microscópicas" },
            { param: "Velocidade de Alisamento", value: "20 mm/s", action: "Deslocamento lento para fusão homogênea" },
          ],
          goldenRule: "Não use Ironing em superfícies curvas — só funciona em topos planos.",
        }),
    ],
  },

  {
    id: "velocidade-extrema", number: 12, title: "Velocidade Extrema & Input Shaper",
    tagline: "Imprima até 70% mais rápido sem perder qualidade",
    level: "Avançado", duration: "1h 30min",
    methodology: "Calibração de acelerômetro, testes A/B de Input Shaping, fórmula de fluxo volumétrico.",
    objective: "Atingir velocidades reais de 250-300 mm/s mantendo qualidade visível.",
    lessons: [
      L(1, "limites-cinematicos", "Limites Cinemáticos Reais", "25min",
        ["Aceleração", "Correias", "Lubrificação"], {
          theory: ["Velocidade acima de 150 mm/s exige estabilização — a aceleração é o verdadeiro fator de velocidade média, não a velocidade de pico."],
          integrations: [{ module: "Módulo 4 (Calibração)", text: "A aceleração é o fator real de tempo total, não a velocidade nominal." }],
          economy: "Aceleração 4000 mm/s² poupa até 30% do tempo total em peças com muitos detalhes pequenos.",
          params: [{ param: "Aceleração Básica", value: "3000 mm/s²", action: "Teto padrão de aceleração estável" }],
          goldenRule: "Use correias reguladas e lubrificação constante — velocidade alta amplifica todo desgaste.",
        }),
      L(2, "limita-velocidade", "O Que Realmente Limita a Velocidade", "30min",
        ["Volumetric Flow", "Bico 0.6mm", "Subextrusão"], {
          theory: [
            "Volumetric Flow Limit: 12-18 mm³/s (hotend comum), 25-35 mm³/s (Volcano/CHT).",
            "Fórmula: Velocidade Máxima = Vazão Volumétrica ÷ (Altura da Camada × Largura da Linha).",
          ],
          integrations: [{ module: "Módulo 5 (Hotend)", text: "Exceder o fluxo volumétrico causa subextrusão garantida — não tem como contornar." }],
          economy: "Use bico 0.6mm para rascunhos comerciais — dobra a velocidade efetiva.",
          params: [{ param: "Vazão Volumétrica Limite", value: "15 mm³/s", action: "Teto de derretimento seguro" }],
          goldenRule: "Calibre a vazão de pico antes de aumentar qualquer velocidade.",
        }),
      L(3, "input-shaper-klipper", "Acelerômetros, Jerks e Input Shaper", "35min",
        ["Input Shaper", "Ghosting eliminado", "Aceleração assimétrica"], {
          theory: [
            "Input Shaper: filtro matemático no firmware (Klipper) que anula as frequências naturais de vibração da estrutura.",
            "Aceleração Outer Wall: 500-1500 mm/s² (estética). Inner Wall: 1500-3000. Infill: 4000+.",
          ],
          integrations: [{ module: "Módulo 5 (Problemas)", text: "Ghosting (ondulação fantasma) é completamente eliminado com Input Shaper bem calibrado." }],
          params: [{ param: "Aceleração Parede Externa", value: "1000 mm/s²", action: "Previne trepidações visíveis" }],
          goldenRule: "Use aceleração reduzida em paredes externas — o resto da peça pode voar.",
        }),
    ],
  },

  {
    id: "tolerancias-mecanica", number: 13, title: "Tolerâncias e Mecânica",
    tagline: "Peças que encaixam e deslizam com exatidão centesimal",
    level: "Profissional", duration: "1h 40min",
    methodology: "Testes de encaixe, planilha de tolerâncias por material, casos de Press Fit e Snap Fit.",
    objective: "Projetar peças que encaixam, deslizam e travam exatamente como pensadas.",
    lessons: [
      L(1, "tolerancias-encaixe", "Tolerâncias e Projetos Funcionais de Encaixe", "25min",
        ["Folga 0.20mm", "Contração", "Repetibilidade"], {
          theory: ["Folga recomendada padrão para FDM: 0.20mm por lado. Cada material tem comportamento próprio de contração."],
          integrations: [{ module: "Módulo 7 (Design)", text: "Sempre preveja contração térmica e expansão dimensional no CAD." }],
          params: [{ param: "Folga Recomendada", value: "0.20 mm", action: "Distanciamento para eixos e rolamentos" }],
          goldenRule: "Desenhe folgas baseado na repetibilidade real do bico da sua impressora, não em valores genéricos.",
        }),
      L(2, "folgas-compensacoes", "Folgas Reais e Compensações Físicas", "35min",
        ["Horizontal Expansion", "Elephant Foot", "Furos menores"], {
          theory: [
            "Horizontal Expansion: contrai os perímetros (-0.05mm) para compensar dilatação da linha.",
            "Elephant Foot Compensation: reduz a primeira camada (0.15mm) para anular rebarba inferior.",
          ],
          integrations: [{ module: "Módulo 4 (Calibração)", text: "Furos sempre saem menores por elephant foot e pressão lateral — calibre por material." }],
          params: [
            { param: "Compensação XY", value: "-0.05 mm", action: "Contrai perímetros para encaixe preciso" },
            { param: "Compensação Pé de Elefante", value: "0.15 mm", action: "Anula rebarbas de base" },
          ],
          goldenRule: "Use 0.2mm de folga no CAD para pinos móveis — abaixo disso, vão travar.",
        }),
      L(3, "press-snap-heat", "Press Fit, Snap Fit, Roscas e Heat Inserts", "40min",
        ["Press Fit", "Snap Fit", "Heat-Set Inserts"], {
          theory: [
            "Press Fit: interferência de 0.05-0.1mm (PETG, PLA+). Encaixa sob pressão e trava.",
            "Snap Fit: lingueta flexionável, orientação longitudinal às camadas para não quebrar.",
            "Heat-Set Inserts: furo 0.1mm menor que o inserto, ferro de soldar a 180-220°C.",
          ],
          integrations: [{ module: "Módulo 6 (Pós-processamento)", text: "Heat inserts garantem montagem durável com parafusos metálicos." }],
          params: [{ param: "Loops de Parede", value: "5", action: "Massa contínua para insertos resistirem" }],
          goldenRule: "Fatie furos 0.1mm menores que o inserto — o calor expande e cria o assento perfeito.",
        }),
    ],
  },

  {
    id: "troubleshooting", number: 14, title: "Resolução de Problemas Avançada",
    tagline: "Diagnostique e resolva qualquer sintoma de impressão",
    level: "Intermediário", duration: "1h 40min",
    methodology: "Catálogo visual de 40+ defeitos, árvore de decisão por sintoma, checklist sistematizado.",
    objective: "Diagnosticar qualquer falha em menos de 2 minutos olhando para a peça.",
    lessons: [
      L(1, "triagem-superficie", "Resolução de Problemas Avançada de Superfície", "20min",
        ["Triagem", "Falhas estruturais/mecânicas/térmicas"], {
          theory: ["Triagem inicial: o problema é estrutural (camadas), mecânico (vibração) ou térmico (extrusão)?"],
          params: [{ param: "Abordagem Sugerida", value: "Checklist Sistematizado", action: "Previne modificações redundantes" }],
          goldenRule: "Use checklist sistematizado — diagnóstico por palpite gera mais problemas que resolve.",
        }),
      L(2, "stringing-ghosting", "Stringing, Ghosting, Ringing e Z Banding", "40min",
        ["Stringing", "Ghosting", "Z-Banding"], {
          theory: [
            "Stringing: umidade ou retração insuficiente. Secar filamento resolve 90% dos casos.",
            "Ghosting/Ringing: vibrações estruturais. Input Shaper + correias tensionadas.",
            "Z-Banding: fuso empenado, acoplamento ou PID instável.",
          ],
          integrations: [{ module: "Módulo 5 (Problemas)", text: "Cada defeito tem assinatura visual própria — aprenda a reconhecer." }],
          params: [{ param: "PID de Mesa", value: "Ativar", action: "Evita oscilação térmica que gera bandas" }],
          goldenRule: "Use graxa PTFE nos fusos a cada 500h de impressão — Z-Banding mecânico evitado.",
        }),
      L(3, "warping-delaminacao", "Warping, Delaminação, Subextrusão e Layer Shift", "40min",
        ["Warping", "Delaminação", "Cold Pull", "Layer Shift"], {
          theory: [
            "Warping: Brim largo + mesa quente isolada de brisas + enclosure para ABS.",
            "Delaminação: bico frio — aumente temperatura em 5-10°C.",
            "Clog: faça Cold Pull (puxada fria) para limpar carbonização interna.",
            "Layer Shift: correias frouxas, colisão durante travel ou driver superaquecido.",
          ],
          integrations: [{ module: "Módulo 3 (Adesão)", text: "Warping é controlado primariamente por Brim e temperatura de mesa estável." }],
          params: [{ param: "Brim Width", value: "8.0 mm", action: "Prolonga base para evitar levantamento" }],
          goldenRule: "Rode cubo de 20mm para cada filamento novo antes de imprimir peça final.",
        }),
    ],
  },

  {
    id: "producao-comercial", number: 15, title: "Produção Comercial & Margens",
    tagline: "Fazendas de impressão 3D e controle industrial",
    level: "Profissional", duration: "1h 40min",
    methodology: "Layout de fazenda, sistemas de monitoramento (Obico, Klipper), controle de estoque de filamento.",
    objective: "Operar múltiplas impressoras com padronização industrial e perdas mínimas.",
    lessons: [
      L(1, "producao-altura-escala", "Produção Comercial em Altura de Escala", "30min",
        ["Cabines térmicas", "Umidade <40%", "Termohigrômetros"], {
          theory: ["Isolar máquinas com cabines térmicas estabiliza a temperatura interna em ±2°C e reduz drasticamente warping em ABS/ASA."],
          integrations: [{ module: "Módulo 8 (Produção)", text: "Manter umidade ambiental abaixo de 40% é crítico para PETG e Nylon." }],
          params: [{ param: "Umidade Limite", value: "Abaixo de 40%", action: "Previne re-absorção de água pelo filamento" }],
          goldenRule: "Instale termohigrômetros em cada rack — sem medir, não há controle.",
        }),
      L(2, "fazenda-controle", "Fazenda de Impressão, Controle de Qualidade e Embalagem", "35min",
        ["Catalogar carretéis", "Caixas estanques", "Embalagem a vácuo"], {
          theory: ["Catalogue cada carretel de filamento: data de abertura, peso atual, secagem, lote. Sem rastreio, qualidade vira loteria."],
          integrations: [{ module: "Módulo 2 (Materiais)", text: "Guarde sempre em caixas estanques com sílica gel — umidade entra em horas." }],
          economy: "Embalagem a vácuo preserva filamento aberto por meses sem re-secagem.",
          params: [{ param: "Estocagem Recomendada", value: "Vácuo Estanque", action: "Preserva molecularmente" }],
          goldenRule: "Etiquete peso atual e data de última desidratação em cada carretel.",
        }),
      L(3, "monitoramento-remoto", "Sistemas de Monitoramento Remoto de Falhas", "35min",
        ["Obico", "Klipper", "Detecção por IA"], {
          theory: ["Obico (ex-Spaghetti Detective) e Klipper Camera AI detectam espaguete (impressão falhando) em segundos e pausam automaticamente."],
          integrations: [{ module: "Módulo 1 (Interface)", text: "A aba Device do OrcaSlicer faz monitoramento básico nativo." }],
          economy: "Corta prejuízos de perda de material — uma falha não detectada queima 500g de filamento.",
          params: [{ param: "Inteligência IP", value: "Ativa", action: "Impede consumo de filamento em impressão falha" }],
          goldenRule: "Integre alarmes no celular para impressões noturnas autônomas.",
        }),
    ],
  },

  {
    id: "casos-estendidos", number: 16, title: "Estudos de Caso Reais Estendidos",
    tagline: "Casos estéticos decorativos contra peças mecânicas",
    level: "Avançado", duration: "1h 30min",
    methodology: "3 casos contrastantes: organizador estético, produto viral, peça industrial sob carga.",
    objective: "Aplicar perfis radicalmente diferentes para necessidades opostas.",
    lessons: [
      L(1, "esteticos-organizadores", "Estudos de Caso Estéticos e Organizadores", "25min",
        ["Linha 0.6mm", "Camada 0.28mm", "Baixa densidade"], {
          theory: ["Para grandes organizadores: largura de linha 0.6mm (paredes mais fortes) + altura 0.28mm + infill baixo. Velocidade prioritária."],
          integrations: [{ module: "Módulo 3 (Adesão)", text: "Grandes peças = baixa densidade; o segredo está nas paredes." }],
          params: [{ param: "Largura de Linha", value: "0.60 mm", action: "Otimização para rigidez extrema com menos passadas" }],
          goldenRule: "Use altura de camada 0.28mm para modelos grandes — economia de tempo enorme.",
        }),
      L(2, "produtos-virais", "Produtos Virais e Gadgets", "30min",
        ["Spiral Vase", "Silk", "Trajetórias orbitais"], {
          theory: ["Spiral Vase: trajetórias orbitais contínuas, sem costuras, parede única espessa. Perfeito para vasos e abajures."],
          integrations: [{ module: "Módulo 8 (Produção)", text: "Spiral vase produz peças em 40 minutos — produto viral de baixo custo." }],
          economy: "Produtos virais de baixo custo, alta rotatividade — margem alta por unidade.",
          params: [{ param: "Spiral Vase", value: "Ativo", action: "Cria filetes helicoidais contínuos sem costura" }],
          goldenRule: "Ative largura de perímetro em 150% do bico em modo vaso — paredes super resistentes.",
        }),
      L(3, "carga-industrial", "Peças de Carga Industrial sob Desgaste", "35min",
        ["Nylon+CF", "5+ paredes", "Bico endurecido"], {
          theory: ["Nylon+CF (carbono): alta dureza, estabilidade térmica até 120°C, exige 5+ loops de parede para torque contínuo."],
          integrations: [{ module: "Módulo 2 (Materiais)", text: "Bico endurecido é absolutamente obrigatório com fibra — bico de latão dura 50h." }],
          params: [{ param: "Filamento", value: "Nylon Carbono (PA-CF)", action: "Rigidez e estabilidade dimensional" }],
          goldenRule: "Velocidade baixa (40 mm/s) para alinhamento das fibras de carbono na direção da impressão.",
        }),
    ],
  },

  {
    id: "classic-arachne", number: 17, title: "Classic vs Arachne",
    tagline: "O algoritmo inteligente que dita as paredes",
    level: "Avançado", duration: "1h 10min",
    methodology: "Comparativo lado-a-lado Classic vs Arachne em letras, logos e geometrias finas.",
    objective: "Escolher o gerador de paredes correto para cada tipo de geometria.",
    lessons: [
      L(1, "algoritmo-fatiamento", "O Algoritmo de Fatiamento", "20min",
        ["Classic largura fixa", "Arachne variável"], {
          theory: ["Classic: largura fixa, loops constantes. Arachne: largura variável, preenche fendas que o Classic deixaria vazias."],
          goldenRule: "Use Arachne para relevos delicados, letras e logos — Classic deixaria gaps.",
        }),
      L(2, "classic-loops-fixos", "Classic — Loops Rígidos de Extrusão Fixa", "25min",
        ["Largura fixa", "Falhas em paredes finas"], {
          theory: ["Classic falha em paredes menores que o diâmetro do bico — gera lacunas visíveis em textos pequenos."],
          integrations: [{ module: "Módulo 7 (Design)", text: "Lacunas em textos pequenos são sintoma típico de Classic em geometria fina." }],
          params: [{ param: "Wall Generator", value: "Classic", action: "Trajetórias simétricas uniformes" }],
          goldenRule: "Use Classic para máxima rigidez em fatiados lineares e geometrias previsíveis.",
        }),
      L(3, "arachne-variavel", "Arachne — Adaptação e Largura Variável", "25min",
        ["Largura variável", "Letreiros sem vazios"], {
          theory: ["Arachne modula a vazão para se ajustar a quinas estreitas e relevos finos. Sem vazios, sem gaps."],
          integrations: [{ module: "Módulo 6 (Design)", text: "Letreiros minúsculos e logos imprimem perfeitos com Arachne." }],
          params: [{ param: "Wall Generator", value: "Arachne", action: "Modulação de largura variável" }],
          goldenRule: "Adote Arachne para chaveiros com textos <1mm — único jeito de sair legível.",
        }),
    ],
  },

  {
    id: "padroes-infill", number: 18, title: "Padrões de Infill em Detalhe",
    tagline: "O padrão ideal para cada tipo de solicitação mecânica",
    level: "Avançado", duration: "1h 20min",
    methodology: "Comparativo de 12+ padrões com tempo, peso e resistência medidos.",
    objective: "Escolher o padrão de infill ideal por aplicação — peso, força, tempo ou flexibilidade.",
    lessons: [
      L(1, "infill-basicos", "Infill Básicos — Grid, Lines, Rectilinear", "20min",
        ["Grid 2D", "Cruzamentos", "Problemas em alta velocidade"], {
          theory: ["Grid/Lines/Rectilinear: padrões 2D, com cruzamentos na mesma camada. O bico raspa no plástico em alta velocidade, gerando ruído e desgaste."],
          integrations: [{ module: "Módulo 3 (Preenchimento)", text: "Use apenas para protótipos rápidos e não-funcionais." }],
          goldenRule: "Evite Grid em impressões estruturais rápidas — o cruzamento gera vibração.",
        }),
      L(2, "infill-avancados", "Infill Avançados — Gyroid, Cubic, Lightning, Adaptive", "30min",
        ["Gyroid 3D", "Cubic isotrópico", "Dissipação"], {
          theory: ["Gyroid/Cubic: padrões 3D, sem cruzamentos na mesma camada. Dissipação isotrópica de tensões em todas direções."],
          integrations: [{ module: "Módulo 6 (Engenharia)", text: "Resistência praticamente igual em todas as direções." }],
          params: [{ param: "Infill Pattern", value: "Gyroid 3D / Cubic", action: "Células tridimensionais ideais para função" }],
          goldenRule: "Use Gyroid para qualquer peça que sofrerá torção e compressão multidirecional.",
        }),
      L(3, "otimizacao-forcas", "Otimizações de Forças em X, Y e Z", "30min",
        ["Adaptive Cubic", "Densidade variável"], {
          theory: ["Adaptive Cubic: concentra densidade perto das paredes (onde realmente importa), reduz no centro vazio."],
          integrations: [{ module: "Módulo 7 (Otimização)", text: "Economia de polímeros mantendo resistência estrutural." }],
          params: [{ param: "Estratégia de Infill", value: "Adaptive Cubic", action: "Concentra material onde tensões são altas" }],
          goldenRule: "Use Adaptive Cubic para protótipos industriais — força onde precisa, leveza no resto.",
        }),
    ],
  },

  {
    id: "suporte-avancado", number: 19, title: "Suporte Avançado",
    tagline: "Suportes removíveis facilmente e onde realmente importam",
    level: "Avançado", duration: "1h 20min",
    methodology: "Comparativo Normal vs Tree Organic, configurações de interface, design anti-suporte com chanfros.",
    objective: "Gerar suportes que sustentam perfeitamente e se desprendem sem marcar a peça.",
    lessons: [
      L(1, "tipos-suporte", "Normal Grid vs Tree Organic", "25min",
        ["Normal denso", "Tree ramos curvos"], {
          theory: [
            "Normal Grid: blocos verticais densos, difíceis de arrancar, marcam a peça.",
            "Tree Organic: ramos curvos, mínimo contato com a peça, ramificação inteligente.",
          ],
          integrations: [{ module: "Módulo 3 (Suportes)", text: "Tree Organic é uma revolução real para miniaturas e estátuas." }],
          params: [{ param: "Support Style", value: "Tree Organic", action: "Ramos fáceis de extrair sem marcar" }],
          goldenRule: "Adote Tree para todas estátuas, miniaturas e modelos estéticos.",
        }),
      L(2, "interface-layers", "Interface Layers — Camadas Densas Separadoras", "25min",
        ["Z Gap 0.15-0.20mm", "3 camadas densas", "Solúveis"], {
          theory: ["Z Gap: 0.15-0.20mm para descolar sem fundir. Top Interface: 3 camadas densas para acabamento limpo na peça."],
          integrations: [{ module: "Módulo 6 (Pós-processamento)", text: "Interface bem configurada descola sem fundir, acabamento limpo." }],
          params: [{ param: "Top Interface Layers", value: "3 Camadas", action: "Grade de alta densidade para acabamento" }],
          goldenRule: "Use suportes solúveis (PVA, BVOH) para acabamento absolutamente impecável.",
        }),
      L(3, "design-anti-suporte", "Design Anti-Suporte: Chanfros de 45°", "30min",
        ["Ângulo <45° autoportante", "Chanfros em furos"], {
          theory: ["Ângulo de overhang menor que 45° é autoportante — não precisa de suporte. Chanfros em furos horizontais eliminam suportes internos."],
          integrations: [{ module: "Módulo 7 (Design)", text: "O melhor suporte é aquele que não precisa existir — projete para evitá-los." }],
          params: [{ param: "Ângulo Limite", value: "45°", action: "Limite físico para deposição estável" }],
          goldenRule: "Aplique chanfros em todos furos horizontais maiores que 5mm.",
        }),
    ],
  },

  {
    id: "velocidade-aceleracao", number: 20, title: "Velocidade & Aceleração",
    tagline: "Cada variável de velocidade minuciosamente explicada",
    level: "Avançado", duration: "1h 30min",
    methodology: "Tabela de velocidades por feature, demonstração de ghosting por aceleração.",
    objective: "Configurar perfil de velocidades assimétrico que equilibra beleza e tempo.",
    lessons: [
      L(1, "velocidades-impressao", "Velocidades de Impressão (com Extrusão Ativa)", "30min",
        ["Outer Wall conservadora", "Inner Wall média", "Infill rápido"], {
          theory: ["Outer Wall conservadora (precisão estética), Inner Wall mais rápida (estrutural), Infill mais rápido (não visível)."],
          integrations: [{ module: "Módulo 12 (Velocidade)", text: "O equilíbrio entre beleza e tempo é assimetria proporcional." }],
          goldenRule: "Velocidades proporcionais à temperatura de fusão do material — quanto mais frio, mais lento.",
        }),
      L(2, "travel-rapido", "Velocidades de Movimento Rápido (Travel)", "30min",
        ["Travel >250mm/s", "Ghosting por travel"], {
          theory: ["Travel rápido reduz tempo ocioso, mas movimentos violentos causam ghosting nas paredes próximas."],
          integrations: [{ module: "Módulo 5 (Problemas)", text: "Vibrações de travel geram marcas em paredes adjacentes." }],
          params: [{ param: "Travel Speed", value: "250 mm/s", action: "Velocidade em vazio entre ilhas" }],
          goldenRule: "Evite travel >300 mm/s se o frame tem baixa inércia (Ender, A1 Mini).",
        }),
      L(3, "aceleracoes-finas", "Configuração de Acelerações Finas", "30min",
        ["Outer 500-1200", "Inner 1500", "Infill alto"], {
          theory: ["Outer Wall Accel: 500-1200 mm/s² (nitidez). Inner Wall: 1500 mm/s² (estrutural). Infill: alto (não visível)."],
          integrations: [{ module: "Módulo 12 (Input Shaper)", text: "Aceleração é o que define ghosting visível, não velocidade nominal." }],
          params: [{ param: "Inner Wall Accel", value: "1500 mm/s²", action: "Aceleração intermediária balanceada" }],
          goldenRule: "Aceleração conservadora em paredes externas é a regra de ouro para acabamento.",
        }),
    ],
  },

  {
    id: "protocolo-calibracao", number: 21, title: "Protocolo de Calibração Completo",
    tagline: "Do zero ao perfil impecável em 8 etapas",
    level: "Profissional", duration: "1h 30min",
    methodology: "Roteiro científico de 8 passos, manutenção preventiva semanal, frequência de correia.",
    objective: "Estabelecer o protocolo padrão de calibração que garante repetibilidade absoluta.",
    lessons: [
      L(1, "protocolo-8-etapas", "O Protocolo de Calibração em 8 Etapas", "35min",
        ["8 passos", "Ordem rígida"], {
          theory: [
            "1) Nivelamento da chapa PEI · 2) PID térmico · 3) Multiplicador de vazão · 4) Pressure Advance · 5) Retração fina · 6) Input Shaping · 7) Teste de temperatura · 8) Teste de fluxo.",
          ],
          integrations: [{ module: "Módulo 4 (Calibração)", text: "Cada passo se assenta sobre o anterior — pular um quebra a cadeia." }],
          params: [{ param: "Etapas", value: "8 Passos", action: "Alinhamento sistêmico absoluto" }],
          goldenRule: "Não pule etapas na ordem científica — cada uma valida a anterior.",
        }),
      L(2, "termo-fluxo-pa", "Relação Termodinâmica de Temperatura, Fluxo e PA", "25min",
        ["Temperatura altera viscosidade", "Recalibrar PA"], {
          theory: ["Temperatura altera viscosidade do polímero, o que invalida o PA calibrado. Mudou a temperatura? Recalibre o PA."],
          integrations: [{ module: "Módulo 5 (Hotend)", text: "Estabilidade térmica é fundamental para qualquer calibração." }],
          params: [{ param: "Estabilização Térmica", value: "Mesa PID Calibrada", action: "Impede descalibrações por oscilação" }],
          goldenRule: "Mantenha o PID sintonizado semanalmente — drift térmico invalida tudo.",
        }),
      L(3, "manutencao-preventiva", "Manual Preventivo de Correções Recorrentes", "30min",
        ["Correias 150Hz", "Substituir bicos", "Atomic Pull"], {
          theory: [
            "Tensionar correias (~150Hz medido com app de afinador).",
            "Substituir bicos desgastados (sinais: filamento sai oval, peças com erro dimensional crescente).",
            "Secar carretéis em estufa antes de calibração nova.",
          ],
          integrations: [{ module: "Módulo 5 (Manutenção)", text: "90% dos problemas atribuídos a fatiamento são na verdade manutenção mecânica." }],
          params: [{ param: "Frequência de Correia", value: "150 Hz", action: "Evita ghosting e ringing" }],
          goldenRule: "Faça Atomic Pull (puxada fria) antes de calibrar qualquer material técnico.",
        }),
    ],
  },

  {
    id: "perfis-material", number: 22, title: "Perfis de Material Avançados",
    tagline: "O ajuste cirúrgico das propriedades térmicas do filamento",
    level: "Profissional", duration: "1h 20min",
    methodology: "Ficha técnica de filamento, densidades reais por marca, compensação de encolhimento.",
    objective: "Criar perfis precisos por filamento que entregam dimensão exata.",
    lessons: [
      L(1, "perfil-filamento-precisao", "Configurando o Perfil de Filamento com Precisão", "25min",
        ["Densidade real", "Diâmetro", "Custo"], {
          theory: ["Configure densidade real (g/cm³), custo por kg e diâmetro nominal — essenciais para orçamentos corretos."],
          integrations: [{ module: "Módulo 9 (Comercial)", text: "Orçamentos precisos dependem da densidade real declarada." }],
          params: [{ param: "Diâmetro Nominal", value: "1.75 mm", action: "Espessura de entrada do carretel" }],
          goldenRule: "Localize a massa específica na ficha técnica do fabricante — varia por aditivo.",
        }),
      L(2, "variacoes-termicas", "Variações Térmicas de Nozzle e Bed por Camada", "25min",
        ["Primeira camada quente", "Demais estáveis"], {
          theory: ["Primeira camada: temperatura levemente maior para adesão. Demais camadas: temperatura estável para coesão."],
          integrations: [{ module: "Módulo 3 (Adesão)", text: "A primeira camada define o sucesso de toda a impressão." }],
          params: [{ param: "Mesa (L1/Demais)", value: "60°C / 55°C", action: "Temperatura inicial ampliada para adesão" }],
          goldenRule: "Use 60°C estáveis para PLA padrão — variação cria warping invisível.",
        }),
      L(3, "dilatacao-shrinkage", "Coeficiente de Dilatação e Retração Molecular", "30min",
        ["Shrinkage 0.8% ABS", "Cubos de 100mm"], {
          theory: ["Shrinkage Compensation: ABS encolhe ~0.8%, ASA ~0.5%, PLA ~0.3%. Compensa deformidade tridimensional."],
          integrations: [{ module: "Módulo 13 (Tolerâncias)", text: "A dilatação molecular afeta diretamente as tolerâncias de montagem." }],
          params: [{ param: "Shrinkage Compensation", value: "0.8% (ABS)", action: "Compensa deformidade reológica" }],
          goldenRule: "Rode cubos de 100mm para aferir encolhimento real do seu lote.",
        }),
    ],
  },

  {
    id: "extrusor-hotend", number: 23, title: "Extrusor & Hotend",
    tagline: "O coração invisível da fusão e empuxo físico",
    level: "Profissional", duration: "1h 20min",
    methodology: "Configurações de retração, wipe, Z-Hop e Spiral Z-Hop com casos de uso por geometria.",
    objective: "Configurar o extrusor para eliminar gotejamento, blobs e marcas de travel.",
    lessons: [
      L(1, "extrusor-retracoes", "Configurações Físicas do Extrusor e Retrações", "25min",
        ["Velocidade máx 60 mm/s", "Engrenagens duplas"], {
          theory: ["Velocidade máxima de extrusão: 60 mm/s. Engrenagens endurecidas são obrigatórias para torque sustentado."],
          integrations: [{ module: "Módulo 5 (Hotend)", text: "Engrenagens de qualidade evitam grind do filamento e patinagem." }],
          params: [{ param: "Velocidade Máxima", value: "60 mm/s", action: "Limite para proteger engrenagens" }],
          goldenRule: "Use engrenagens de dupla tração (BMG, Sherpa) para alto torque em direct drive.",
        }),
      L(2, "wipe-retract", "Acoplamento de Velocidades em Retração e Wipe", "25min",
        ["Wipe before retract", "0.5mm Direct"], {
          theory: ["Wipe before retract: o bico desliza sobre fileiras sólidas limpando a sobra antes de retrair."],
          integrations: [{ module: "Módulo 11 (Seams)", text: "Wipe elimina gotejamento na costura — visível desaparece." }],
          params: [{ param: "Wipe before retract", value: "Habilitado", action: "Garante trajetórias sem escorrimentos" }],
          goldenRule: "Use 0.5mm de wipe em Direct Drive — suficiente para limpar sem desperdiçar tempo.",
        }),
      L(3, "z-hop", "Movimentações de Z-Hop de Bico", "30min",
        ["Z-Hop 0.2-0.4mm", "Spiral Z-Hop"], {
          theory: ["Z-Hop: sobe 0.2-0.4mm em movimentos de travel para evitar colisão. Spiral Z-Hop suaviza em rampa helicoidal."],
          integrations: [{ module: "Módulo 20 (Velocidade)", text: "Z-Hop evita colisões em peças com geometria complexa." }],
          params: [{ param: "Z-Hop Type", value: "Spiral", action: "Elimina marcas horizontais visíveis" }],
          goldenRule: "Use Spiral Z-Hop para modelos esguios verticais — sem marca de travel.",
        }),
    ],
  },

  {
    id: "ironing-acabamentos", number: 24, title: "Ironing e Acabamentos",
    tagline: "Superfícies espelhadas e pontes longas e estáveis",
    level: "Profissional", duration: "1h 20min",
    methodology: "Configuração detalhada de Ironing, calibração de Bridge Flow Ratio, Fuzzy Skin para textura.",
    objective: "Atingir acabamentos de produto final direto da impressora.",
    lessons: [
      L(1, "ironing-coeficientes", "Ironing — Coeficientes, Espaçamentos e Fluxos", "25min",
        ["Microfluxo 15%", "Espaçamento 0.15mm"], {
          theory: ["Ironing: microfluxo de 10-15%, espaçamento 0.10-0.15mm, velocidade 15-30 mm/s. Resultado: superfície quase espelhada."],
          integrations: [{ module: "Módulo 6 (Pós-processamento)", text: "Ironing dispensa lixa fina em superfícies planas superiores." }],
          params: [{ param: "Espaçamento", value: "0.15 mm", action: "Ajuste para bico 0.4mm" }],
          goldenRule: "Seque o filamento antes de ativar Ironing — umidade gera bolhas visíveis no espelhamento.",
        }),
      L(2, "bridges-overhangs", "Bridges e Overhangs — Controle das Fatias Suspensas", "30min",
        ["Bridge Speed reduzida", "Cooling 100%"], {
          theory: ["Bridge: velocidade reduzida (30-50% da normal) + cooling 100% forçado + flow ligeiramente reduzido = fios estáveis no ar."],
          integrations: [{ module: "Módulo 3 (Suportes)", text: "Cooling máximo congela o filamento no ar antes que ele caia." }],
          params: [{ param: "Bridge Flow Ratio", value: "0.95", action: "Reduz vazão para tencionar a suspensão" }],
          goldenRule: "Ative Bridge Detect automaticamente — o Orca identifica e ajusta sozinho.",
        }),
      L(3, "fuzzy-skin", "Texturas e Acabamentos Decorativos (Fuzzy Skin)", "25min",
        ["Oscilações senoidais", "Outer Walls"], {
          theory: ["Fuzzy Skin: aplica oscilações senoidais (0.1mm) na parede externa, criando textura aveludada que disfarça imperfeições."],
          integrations: [{ module: "Módulo 7 (Design)", text: "Disfarça imperfeições de camada e melhora aderência tátil." }],
          params: [{ param: "Fuzzy Skin Thickness", value: "0.3 mm", action: "Distância radial de oscilação" }],
          goldenRule: "Habilite Fuzzy Skin apenas em Outer Walls — afeta só a aparência, não a estrutura.",
        }),
    ],
  },
];

export const courseStats = {
  modules: modules.length,
  lessons: modules.reduce((a, m) => a + m.lessons.length, 0),
  hours: 56,
  downloads: 40,
};
