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
        ["Vínculo slicer/microcontrolador", "Perfis oficiais", "Customização avançada"], {
          theory: [
            "O Printer Profile é o documento de identidade da sua máquina dentro do OrcaSlicer. Ele descreve volume útil, cinemática (CoreXY, I3, Delta), firmware e características do extrusor.",
            "Um perfil mal configurado degrada o tempo de aceleração e gera G-code que a máquina não consegue executar com precisão — você pede 300mm/s e o firmware satura silenciosamente em 120mm/s.",
            "Perfis oficiais (Bambu, Prusa, Voron, Creality) já vêm com starting/ending G-code testado, macros de purga e wipe. Comece sempre por eles.",
            "Customizar significa duplicar o perfil oficial, renomear (ex.: 'X1C-Bocal-0.6') e modificar campos específicos — nunca editar o original.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "Perfil incorreto invalida toda a calibração subsequente — Flow e PA viram chute." },
            { module: "Módulo 12 (Velocidade)", text: "Os limites do perfil são o teto absoluto que Input Shaper jamais ultrapassa." },
          ],
          params: [
            { param: "Printer Model", value: "Oficial do fabricante", action: "Carrega cinemática e G-code base testados" },
            { param: "Nozzle Diameter", value: "0.4 mm", action: "Sincroniza largura de linha em todos os cálculos" },
            { param: "G-code Flavor", value: "Klipper / Marlin 2", action: "Define dialeto de comandos do post-processor" },
          ],
          goldenRule: "Importe sempre as tabelas cinemáticas oficiais do fabricante antes de customizar — não invente limites.",
          errors: [
            { error: "Editar perfil oficial diretamente e perder o reset", solution: "Duplique antes de qualquer alteração" },
            { error: "Perfil com cinemática errada (I3 em CoreXY)", solution: "Reimporte o oficial e refaça apenas os ajustes mínimos" },
          ],
          finance: "Perfil correto reduz desgaste de motores e correias em até 40% no ano — economia direta em peças de reposição.",
          exercise: [
            "Duplique o perfil oficial da sua impressora",
            "Renomeie incluindo bico e versão (ex.: 'Ender3-0.4-v2026')",
            "Confirme volume útil real medindo a mesa com paquímetro",
            "Salve e teste imprimindo um cubo de calibração 20mm",
          ],
        }),
      L(2, "volume-firmware", "Volume, Firmware e Limites da Máquina", "22min",
        ["Bed Shape", "Klipper/Marlin/RepRap", "Limites mecânicos"], {
          theory: [
            "Bed Shape e Tamanho Z: configure a área líquida realmente utilizável, descontando clipes, sensores BL-Touch e zonas de homing.",
            "Firmware: Klipper (mais avançado, Input Shaping nativo, macros em Python), Marlin (universal, mais conservador), RepRap/Duet (industrial).",
            "Limites Mecânicos: tetos de velocidade e aceleração que a estrutura física suporta sem ressonância. Ultrapassá-los gera ghosting permanente.",
            "Jerk vs Junction Deviation: Marlin clássico usa Jerk (mm/s); Klipper e Marlin 2 usam Junction Deviation (mm). Não misture conceitos.",
          ],
          integrations: [
            { module: "Módulo 12 (Velocidade)", text: "As velocidades de processo nunca podem ultrapassar os limites da máquina — eles são o teto absoluto." },
            { module: "Módulo 20 (Aceleração)", text: "Input Shaper só compensa dentro do envelope de aceleração que a estrutura aguenta." },
          ],
          params: [
            { param: "Bed Shape", value: "Real - 5mm de margem", action: "Evita colisões com clipes e bordas" },
            { param: "Max Print Accel", value: "3000-7000 mm/s²", action: "Teto baseado em ressonância medida" },
            { param: "Max Travel Accel", value: "5000-10000 mm/s²", action: "Movimento sem extrusão pode ser mais rápido" },
          ],
          goldenRule: "Configure a área real, não a área de marketing do fabricante — desconte clipes e zonas mortas.",
          errors: [
            { error: "Confundir acelerações de processo com tetos da máquina", solution: "Limites = hardware imutável; processo = configurável por filamento" },
            { error: "Z Max acima da haste real causando crash no topo", solution: "Meça com paquímetro e subtraia 2mm de segurança" },
          ],
          economy: "Reduzir Z Max para o útil real evita crashes que quebram fim-de-curso e BL-Touch — peça de R$ 80-250.",
          exercise: [
            "Meça com trena a área útil real da mesa",
            "Configure Bed Shape descontando 5mm de cada borda",
            "Rode o Input Shaper test (Módulo 12) e anote acelerações seguras",
            "Atualize Max Print Accel para o valor medido, não o de catálogo",
          ],
        }),
      L(3, "bico-extrusor-fluxo", "Bico, Extrusor e Configurações de Fluxo", "28min",
        ["Diâmetro do bico", "Direct vs Bowden", "Volumetric Flow Limit"], {
          theory: [
            "Diâmetro do Bico: 0.4mm (universal, equilíbrio), 0.6mm (produção 40% mais rápida), 0.2mm (joalheria/detalhe), 0.8mm (peças estruturais grandes).",
            "Direct Drive: extrusor sobre o cabeçote, retração curta (0.5-1.2mm), obrigatório para TPU, maior inércia móvel.",
            "Bowden: extrusor fixo na estrutura, retração longa (3-6mm), cabeçote leve permite velocidades altas, mas inércia do filamento atrapalha PA.",
            "Volumetric Flow Limit (mm³/s): o teto físico de fusão do hotend. Hotend padrão = 11-15 mm³/s; CHT/Volcano = 24-35 mm³/s. Exceder garante subextrusão.",
          ],
          integrations: [
            { module: "Módulo 4 (Materiais)", text: "Use bico endurecido (aço hardened ou rubi) obrigatoriamente para filamentos com fibra de carbono ou vidro." },
            { module: "Módulo 23 (Hotend)", text: "O Volumetric Flow Limit determina a velocidade máxima útil em qualquer altura de camada." },
          ],
          params: [
            { param: "Diâmetro do Bico", value: "0.4 mm", action: "Define largura padrão da linha" },
            { param: "Limite de Fluxo", value: "15 mm³/s", action: "Teto de derretimento seguro para hotend comum" },
            { param: "Retraction (Direct)", value: "0.8 mm", action: "Curto o suficiente para evitar grind" },
            { param: "Retraction (Bowden)", value: "4.5 mm", action: "Compensa elasticidade do tubo PTFE" },
          ],
          goldenRule: "Use bico de liga endurecida para qualquer filamento abrasivo — o desgaste de bico de latão começa nas primeiras horas com CF/GF.",
          errors: [
            { error: "Bico latão em filamento com fibra — desgaste em 8h", solution: "Troque por hardened steel ou rubi imediatamente" },
            { error: "Velocidade alta com flow limit baixo gera linhas finas", solution: "Calcule largura × altura × velocidade e respeite o teto" },
          ],
          finance: "Hotend CHT (R$ 180) triplica o throughput de produção — paga-se em 2-3 lotes comerciais.",
          exercise: [
            "Calcule o flow volumétrico atual: largura × altura × velocidade",
            "Compare com o limite do seu hotend",
            "Reduza velocidade até ficar 10% abaixo do teto",
            "Imprima Flow Tower do OrcaSlicer e confirme",
          ],
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
          theory: [
            "Process > Global Settings é o painel mestre: ele gerencia velocidades de parede, fechamentos e prioridades no nível mais alto.",
            "Presets oficiais do OrcaSlicer: 0.08 Extra Fine, 0.12 Fine, 0.16 Optimal, 0.20 Standard, 0.24 Draft, 0.28 Extra Draft. Cada um traz combinação testada de quality+speed.",
            "Customizar significa duplicar o preset (botão +), renomear (ex.: '0.20-PETG-Funcional') e ajustar 2-4 parâmetros — nunca redefinir tudo.",
            "A primeira camada é a única coisa que separa sucesso de fracasso. Trate-a como uma configuração à parte, com velocidade e fluxo dedicados.",
          ],
          integrations: [
            { module: "Módulo 4 (Materiais)", text: "Cada material exige preset próprio — PLA, PETG e ABS não compartilham temperaturas nem cooling." },
            { module: "Módulo 14 (Troubleshooting)", text: "90% dos defeitos vêm de preset errado para a finalidade — não da impressora." },
          ],
          params: [
            { param: "Preset de Trabalho", value: "0.20mm Standard", action: "Equilíbrio precisão/velocidade" },
            { param: "First Layer Speed", value: "20-30 mm/s", action: "Lenta para garantir adesão" },
            { param: "First Layer Flow Ratio", value: "1.10", action: "Sobre-extrusão deliberada para colar bem" },
          ],
          goldenRule: "Selecione o preset conforme a finalidade real da peça, depois customize 1-2 parâmetros — não comece do zero.",
          errors: [
            { error: "Usar preset Draft em peça mecânica de precisão", solution: "Volte para Optimal ou Standard antes de medir" },
            { error: "Primeira camada na mesma velocidade do resto", solution: "Force 20-30 mm/s no First Layer Speed" },
          ],
          economy: "Mudar entre presets em vez de criar do zero economiza ~1h de testes por novo material.",
          exercise: [
            "Duplique o preset Standard",
            "Renomeie com material e finalidade",
            "Ajuste apenas First Layer Speed e cooling",
            "Compare uma peça impressa com preset puro e com sua versão",
          ],
        }),
      L(2, "quality-camadas", "Quality — Altura de Camada e Camadas Adaptativas", "25min",
        ["Altura de camada", "Primeira camada", "Adaptive Layer Height"], {
          theory: [
            "Altura de Camada: 0.12mm (detalhe fino) a 0.28mm (rápido). Regra de ouro: 25-75% do diâmetro do bico. Fora dessa faixa, qualidade ou aderência despencam.",
            "Primeira Camada: sempre 100-150% da camada normal (0.20-0.30mm) — mais material = mais aderência, e perdoa mesa levemente desnivelada.",
            "Adaptive Layer Height: o slicer reduz altura em detalhes curvos e expande em áreas planas. Economia real de tempo sem perder qualidade visual.",
            "Variable Layer Height (manual): você pinta zonas específicas com altura customizada — útil para peças onde só a parte de cima precisa de detalhe.",
          ],
          integrations: [
            { module: "Módulo 6 (Engenharia)", text: "Camadas menores aumentam aderência inter-camada — peças funcionais ganham resistência com 0.16mm." },
            { module: "Módulo 11 (Seams)", text: "Camada mais baixa esconde a costura — em 0.12 a emenda quase desaparece." },
          ],
          params: [
            { param: "Altura da Camada", value: "0.20 mm", action: "Espessura vertical estável padrão" },
            { param: "Altura Primeira Camada", value: "0.24 mm", action: "Espessura ampliada para adesão" },
            { param: "Adaptive Layer Height", value: "On", action: "Otimiza tempo em curvas e áreas planas" },
          ],
          goldenRule: "Use 0.28mm se a mesa está levemente desalinhada — camada maior perdoa imperfeições.",
          errors: [
            { error: "0.30mm com bico 0.4mm — falha de aderência inter-camada", solution: "Volte para 0.20-0.24mm; 75% do bico é o teto" },
            { error: "0.08mm com Volumetric Flow Limit estourado", solution: "Reduza velocidade ou aumente altura" },
          ],
          economy: "Adaptive Layer Height reduz tempo total em até 30% em modelos com geometria mista, sem perda visual.",
          exercise: [
            "Imprima a mesma peça em 0.12, 0.20 e 0.28mm",
            "Cronometre cada uma e meça acabamento",
            "Ative Adaptive e compare tempo total",
            "Anote a combinação ideal para sua finalidade",
          ],
        }),
      L(3, "paredes-infill", "Paredes, Infill e Top/Bottom", "30min",
        ["Wall Loops", "Infill Pattern", "Top/Bottom layers"], {
          theory: [
            "Wall Loops: 2-3 (decorativo), 4 (funcional), 5-6 (industrial/carga). É o fator de resistência MAIS subestimado — paredes carregam, infill apenas estabiliza.",
            "Infill Pattern: Gyroid (isotrópico, sem cruzamentos, melhor em geral), Cubic (resistência uniforme nas 3 direções), Lightning (60% menos material, só decoração), Honeycomb (rígido mas lento).",
            "Top/Bottom layers: mínimo 4 camadas sólidas para superfície fechada sem pinholing. Em altura 0.20mm = 0.8mm de teto sólido.",
            "Top Surface Pattern: Monotonic elimina inconsistências visuais em superfícies topo — sempre preferível ao padrão antigo.",
          ],
          integrations: [
            { module: "Módulo 6 (Engenharia)", text: "4 paredes geram mais resistência que aumentar infill de 20% para 40%, com menos material e menos tempo." },
            { module: "Módulo 18 (Infill)", text: "Padrão Cubic para peças sob carga 3D; Gyroid para fluxo de água/ar dentro da peça." },
          ],
          params: [
            { param: "Wall Loops", value: "4", action: "Dita resistência à flexão e impacto" },
            { param: "Infill Density", value: "15%-25%", action: "Volume alveolar vazado padrão" },
            { param: "Infill Pattern", value: "Gyroid", action: "Isotrópico, sem cruzamentos problemáticos" },
            { param: "Top Surface Pattern", value: "Monotonic", action: "Acabamento topo uniforme" },
          ],
          goldenRule: "Prefira sempre adicionar paredes em vez de aumentar densidade do infill — mais força com menos plástico.",
          errors: [
            { error: "Pinholing no topo (furinhos)", solution: "Aumente Top Layers para 5-6 e revise Flow Ratio" },
            { error: "Peça flexível com infill 80%", solution: "Volte para 20% e adicione 2 paredes — mais rígido e mais leve" },
          ],
          economy: "Trocar infill 40% por 4 paredes + infill 20% reduz consumo em 25% e tempo em 18%.",
          exercise: [
            "Imprima cubo 20mm com 2/4/6 paredes",
            "Aplique força com a mão e compare flexão",
            "Repita com infill 10/25/50%",
            "Comprove: paredes vencem infill em resistência",
          ],
        }),
      L(4, "cooling-suporte-adesao", "Cooling, Suporte e Adesão à Mesa", "25min",
        ["Cooling Fan", "Tree Organic", "Skirt/Brim/Raft"], {
          theory: [
            "Cooling Fan por material: PLA 80-100%, PETG 30-60%, ABS/Nylon 0-10%, TPU 30-50%. Errar aqui causa warping (muito fan) ou stringing (pouco).",
            "Aux Fan (Bambu/Voron): resfria a peça externamente sem afetar a camada que está sendo extrudada — qualidade de detalhe sobe.",
            "Suportes: Tree Organic (recomendado padrão, ramos curvos, fácil remoção) vs Normal Grid (denso, marca a peça, difícil de arrancar) vs Snug (mínimo material).",
            "Adesão: Skirt sempre (purga as primeiras linhas), Brim para cantos vivos ou peças altas/estreitas, Raft só em casos extremos (mesa ruim, ABS sem enclosure).",
          ],
          integrations: [
            { module: "Módulo 4 (Materiais)", text: "Nunca use fan forte em ABS/ASA — a contração térmica acelerada causa warping severo e delaminação." },
            { module: "Módulo 19 (Suportes)", text: "Tree Organic + Support Painting elimina 90% das marcas em superfícies visíveis." },
          ],
          params: [
            { param: "Estilo de Suporte", value: "Tree Organic", action: "Ramos curvos fáceis de destacar" },
            { param: "Z Gap de Interface", value: "0.20 mm", action: "Espaço para descolar suporte sem fundir" },
            { param: "Fan Speed (PLA)", value: "100%", action: "Solidifica camada antes da próxima" },
            { param: "Fan Speed (ABS)", value: "0-10%", action: "Evita warping por contração rápida" },
          ],
          goldenRule: "Mantenha o fan desligado em ABS/ASA — a contração térmica é seu pior inimigo, mais do que adesão ruim.",
          errors: [
            { error: "Warping em ABS mesmo com brim", solution: "Confirme fan em 0-10% e enclosure fechado" },
            { error: "Suporte fundindo na peça (impossível remover)", solution: "Aumente Z Gap para 0.20-0.24mm" },
          ],
          economy: "Tree Organic gasta ~40% menos filamento que Normal Grid e remove em segundos — produção comercial ganha tempo.",
          exercise: [
            "Imprima a mesma peça com Normal e Tree Organic",
            "Pese o suporte removido e compare",
            "Cronometre a remoção de cada",
            "Padronize Tree Organic como default no seu perfil",
          ],
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
        ["Comportamento reológico", "Perfis por fabricante", "Tg e contração"], {
          theory: [
            "Cada material tem comportamento reológico único — viscosidade, contração térmica linear, dependência de temperatura. Não existe perfil universal.",
            "Tg (transição vítrea) define o ponto onde o polímero amolece sem fundir. Acima da Tg, a peça deforma sob carga: PLA 60°C, PETG 80°C, ABS 105°C, PC 150°C.",
            "Contração térmica linear: PLA 0.3%, PETG 0.5%, ABS 0.8%, Nylon 1.5%. É o que determina warping e necessidade de enclosure.",
            "Aditivos por fabricante mudam temperatura ideal em ±10°C — 'PLA Premium da marca X' não é 'PLA da marca Y'.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "Cada novo filamento exige Temp Tower + Flow + PA dedicados — perfis não migram entre marcas." },
            { module: "Módulo 22 (Perfis)", text: "Salve perfil nomeado 'Marca-Material-Cor' para rastrear comportamento real." },
          ],
          params: [
            { param: "Densidade (PLA)", value: "1.24 g/cm³", action: "Calibra custos precisos por peça" },
            { param: "Densidade (PETG)", value: "1.27 g/cm³", action: "Base para cálculo de peso final" },
            { param: "Densidade (ABS)", value: "1.04 g/cm³", action: "Menor massa por volume impresso" },
          ],
          goldenRule: "Crie perfis independentes para cada fabricante — variações de aditivos mudam temperatura ideal em ±10°C.",
          errors: [
            { error: "Usar perfil de PLA de marca A em marca B sem ajuste", solution: "Sempre refaça Temp Tower no primeiro spool" },
            { error: "Confiar na temperatura impressa no rótulo", solution: "Rótulo é faixa ampla — calibre você mesmo" },
          ],
          finance: "Estoque rotativo de 4-6 materiais (PLA, PETG, ABS/ASA, TPU, PC, PA-CF) cobre 95% dos pedidos comerciais.",
          exercise: [
            "Liste seus 3 filamentos mais usados",
            "Crie perfil dedicado para cada (marca-material)",
            "Anote Tg e contração nas notas do perfil",
            "Pese 1 metro de cada e confirme densidade",
          ],
        }),
      L(2, "pla-petg", "PLA e PETG — Características Térmicas e Mecânicas", "30min",
        ["PLA rígido", "PETG tenaz", "Stringing"], {
          theory: [
            "PLA: rígido, ótimo para detalhe estético, frágil ao impacto (quebra como vidro), ~60°C de resistência. Derrete dentro de carro fechado no sol.",
            "PLA+: variação com elastômero embutido, mais tenaz e ligeiramente mais resistente — ainda assim não funcional para sol direto.",
            "PETG: tenaz, resistente ao impacto, ~80°C, ótima adesão entre camadas. Mas stringing crônico — exige retração calibrada e secagem.",
            "PETG é higroscópico moderado: spool aberto >2 semanas começa a 'pipocar' no bico — secar a 65°C por 4-6h resolve.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "PETG exige Pressure Advance bem ajustado para cantos sem blob — PLA perdoa, PETG não." },
            { module: "Módulo 6 (Engenharia)", text: "Para peça funcional ao ar livre: PETG, ASA ou PC. PLA é só protótipo." },
          ],
          params: [
            { param: "Nozzle Temp (PLA)", value: "205°C", action: "Fluidez ideal para PLA padrão" },
            { param: "Nozzle Temp (PETG)", value: "240°C", action: "Temperatura ampliada para fluidez do PETG" },
            { param: "Bed Temp (PLA)", value: "60°C", action: "Adesão sem deformar a peça" },
            { param: "Bed Temp (PETG)", value: "80°C", action: "Cuidado: PETG cola DEMAIS em PEI a quente" },
          ],
          goldenRule: "Use PETG ou ASA para peças externas. PLA derrete dentro de um carro fechado no sol em 30 minutos.",
          errors: [
            { error: "PETG arrancando pedaço de PEI ao remover", solution: "Espere mesa esfriar até 40°C antes de tocar" },
            { error: "Stringing severo em PETG", solution: "Seque o spool 6h a 65°C antes de culpar retração" },
          ],
          economy: "Spool de PETG seco rende ~15% mais peças aprovadas vs spool úmido — secadora paga-se rápido.",
          exercise: [
            "Imprima Temp Tower em PLA e PETG",
            "Identifique faixa sem stringing visível",
            "Salve no perfil de cada marca",
            "Teste destacar peça PETG fria vs morna em PEI",
          ],
        }),
      L(3, "abs-asa-tpu", "ABS, ASA e TPU — Alta Performance e Flexíveis", "35min",
        ["ABS/ASA enclosure", "TPU Direct Drive", "Warping"], {
          theory: [
            "ABS: ~100°C de resistência, ótima usinabilidade pós-impressão (acetona suaviza), mas warping severo. Enclosure obrigatório acima de 80mm de altura.",
            "ASA: substituto direto do ABS com resistência UV — não amarela ao sol. Comportamento térmico idêntico ao ABS.",
            "TPU: flexível (Shore A 85-95), exige Direct Drive obrigatório (Bowden compressa e clog), velocidade baixa (20-35 mm/s), retração mínima (0.5-1.0mm).",
            "TPU é higroscópico extremo: 24h ao ar livre já degrada qualidade — secar antes de cada impressão é regra.",
          ],
          integrations: [
            { module: "Módulo 3 (Cooling)", text: "ABS e ASA: fan 0-10%. Mais que isso = warping garantido e delaminação inter-camada." },
            { module: "Módulo 14 (Troubleshooting)", text: "Warping em ABS = problema de ambiente (enclosure aberto, AC ligado), não de perfil." },
          ],
          params: [
            { param: "Temp. Mesa (ABS)", value: "105°C", action: "Mantém acima da transição vítrea" },
            { param: "Velocidade (TPU)", value: "25 mm/s", action: "Evita clog por compressão do flexível" },
            { param: "Retração (TPU)", value: "0.5-1.0 mm", action: "Mínima necessária — TPU não retrai bem" },
            { param: "Câmara fechada (ABS)", value: "Obrigatória", action: "Acima de 80mm a peça empena sem enclosure" },
          ],
          goldenRule: "Use base de cola (stick) ou laquê para materiais quentes — adesão dobra na primeira camada.",
          errors: [
            { error: "TPU em Bowden — clog garantido", solution: "Use Direct Drive ou troque para PETG flexível" },
            { error: "ABS empenando no canto", solution: "Brim 8mm + fan 0% + enclosure tampado durante toda impressão" },
          ],
          finance: "Enclosure DIY com painéis ACM custa R$ 150-300 e habilita ABS/ASA/PC — abre nicho de peças industriais.",
          exercise: [
            "Seque um spool TPU 8h a 50°C",
            "Imprima um chaveiro flexível em 20mm/s",
            "Imprima caixa ABS 100mm de altura — com e sem enclosure",
            "Compare warping e delaminação",
          ],
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
        ["Sequência rigorosa", "5 calibrações básicas", "Variável única"], {
          theory: [
            "A calibração segue raciocínio lógico rigoroso: cada passo se assenta sobre constantes previamente calibradas. Pular etapas invalida tudo.",
            "Sequência obrigatória: (1) PID hotend e mesa → (2) Temperature Tower → (3) Flow Coarse → (4) Flow Fine → (5) Pressure Advance → (6) Retraction → (7) Input Shaper → (8) Max Volumetric Flow.",
            "Princípio científico: varie UMA variável por vez. Se você muda temperatura E fluxo juntos, não sabe qual ajuste melhorou o resultado.",
            "Calibre com a peça destino em mente: detalhe estético usa parâmetros diferentes de peça funcional. Considere dois perfis por material.",
          ],
          integrations: [
            { module: "Módulo 4 (Materiais)", text: "Cada novo spool exige no mínimo Temperature Tower + Flow Fine — 10 minutos que salvam horas." },
            { module: "Módulo 21 (Protocolo)", text: "O Protocolo Completo de Calibração detalha cada um dos 8 passos em ordem." },
          ],
          params: [
            { param: "Ordem Metodológica", value: "Linear Rígida", action: "5+3 calibrações em sequência" },
            { param: "Variáveis por Teste", value: "1", action: "Mais que isso = dado corrompido" },
            { param: "Adesão", value: "Garantida", action: "Pré-requisito: sem isso, todo teste é lixo" },
          ],
          goldenRule: "Interrompa qualquer teste se observar descolamentos — calibração com adesão ruim é dado corrompido.",
          errors: [
            { error: "Calibrar Flow antes de Temperature", solution: "Refaça: temperatura errada falseia fluxo" },
            { error: "PA sem PID estabilizado", solution: "Rode PID Tune do firmware antes de qualquer Pressure Advance" },
          ],
          economy: "8 passos de calibração levam ~3h e reduzem reimpressões em 70% — pagam-se na primeira semana.",
          exercise: [
            "Liste os 8 passos da sequência num caderno",
            "Marque quais você já fez no filamento atual",
            "Refaça do passo zero o que faltar",
            "Anote os valores finais no perfil",
          ],
        }),
      L(2, "temp-flow-pa", "Temperature Tower, Flow Rate e Pressure Advance", "40min",
        ["Temperature Tower", "Flow coarse/fine", "Pressure Advance"], {
          theory: [
            "Temperature Tower: imprime degraus em temperaturas decrescentes (ex.: 230→200°C). Identifique o degrau com melhor brilho, sem stringing e com pontes estáveis.",
            "Flow Rate Coarse: cubo oco com paredes únicas, mede com paquímetro a parede real vs nominal — ajusta em saltos de 5%.",
            "Flow Rate Fine: refinamento centesimal sobre o Coarse. Imprime cubo com top achatado — superfície ideal não tem buracos nem sobre-extrusão.",
            "Pressure Advance (PA): compensa a inércia do polímero. Sem PA, cantos têm blob por excesso e início de linha tem subextrusão.",
          ],
          integrations: [
            { module: "Módulo 11 (Seams)", text: "PA bem calibrado elimina blob de seam — diferença visual enorme em peças cilíndricas." },
            { module: "Módulo 23 (Hotend)", text: "Hotend de alto fluxo (CHT) muda o PA — recalibre ao trocar." },
          ],
          params: [
            { param: "Flow Ratio", value: "0.98", action: "Vazão milimétrica balanceada" },
            { param: "Pressure Advance (Direct)", value: "0.020-0.040", action: "Compensação típica para Direct Drive" },
            { param: "Pressure Advance (Bowden)", value: "0.40-0.80", action: "Bowden exige PA muito maior" },
            { param: "Smooth Time (Klipper)", value: "0.040", action: "Suavização do PA em curvas" },
          ],
          goldenRule: "Siga a sequência exata: Temperatura → Fluxo → Pressure Advance. Inverter quebra a calibração.",
          errors: [
            { error: "PA visivelmente diferente em cada canto", solution: "Refaça com Smooth Time 0.04 e velocidade constante" },
            { error: "Flow Fine resulta >1.10 ou <0.90", solution: "Bico provavelmente entupido ou desgastado — inspecione" },
          ],
          economy: "Flow correto economiza 5-12% de filamento por peça — em produção, é margem direta.",
          exercise: [
            "Rode Temperature Tower do OrcaSlicer (Calibration menu)",
            "Identifique melhor degrau visual + sem stringing",
            "Rode Flow Coarse, meça parede com paquímetro digital",
            "Rode PA test e ache o canto sem blob",
            "Salve os 3 valores no perfil do filamento",
          ],
        }),
      L(3, "retraction-input-shaping", "Retraction e Input Shaping", "35min",
        ["Retração Direct/Bowden", "Input Shaping", "Ghosting"], {
          theory: [
            "Retração Direct Drive: 0.5-1.5mm, velocidade 30-60 mm/s. Mais que 2mm já causa grind do filamento dentro do extrusor.",
            "Retração Bowden: 3-6mm, velocidade 25-45 mm/s. Tubo PTFE absorve parte do movimento — daí a distância maior.",
            "Input Shaping: filtro matemático aplicado no firmware (Klipper nativo, Marlin via M593). Cancela frequência de ressonância da estrutura — elimina ghosting/ringing.",
            "Sem Input Shaper, o teto de aceleração útil é ~3000 mm/s². Com IS bem calibrado, sobe para 8000-12000 mm/s² sem ghost.",
          ],
          integrations: [
            { module: "Módulo 14 (Troubleshooting)", text: "90% dos casos de stringing são umidade do filamento, não retração mal calibrada." },
            { module: "Módulo 20 (Aceleração)", text: "Input Shaper habilita as velocidades comerciais reais — sem ele, qualidade desce em alta." },
          ],
          params: [
            { param: "Distância de Retração", value: "0.8 mm", action: "Percurso de recuo para Direct Drive" },
            { param: "Velocidade de Retração", value: "40 mm/s", action: "Retorno ágil sem grind do filamento" },
            { param: "IS Frequency (X)", value: "Medido (40-60 Hz)", action: "Cancela ressonância do eixo X" },
            { param: "IS Shaper Type", value: "MZV ou EI", action: "MZV equilibrado; EI mais agressivo" },
          ],
          goldenRule: "Seque o filamento antes de assumir qualquer erro de retração — umidade é a causa nº 1 de stringing.",
          errors: [
            { error: "Ghosting depois de calibrar IS", solution: "Refaça medição com acelerômetro firmemente preso, sem cabos balançando" },
            { error: "Filamento grinded no extrusor", solution: "Reduza retração para 0.5mm e/ou velocidade para 25 mm/s" },
          ],
          finance: "Input Shaper bem calibrado dobra a velocidade útil de produção — 50% mais peças/dia.",
          exercise: [
            "Rode Retraction Test do OrcaSlicer",
            "Identifique menor distância sem stringing",
            "Rode IS test com acelerômetro (Klipper) ou M593 manual (Marlin)",
            "Imprima o mesmo cubo antes/depois e compare ringing",
          ],
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
        ["Anisotropia", "Cisalhamento Z", "Direção de carga"], {
          theory: [
            "Anisotropia: peças FDM são fortes em X/Y (filamento contínuo) e frágeis em Z (apenas adesão entre camadas). Queda de até 60% na resistência axial.",
            "A falha quase sempre acontece por cisalhamento entre camadas — não por ruptura do filamento. Visualmente, a peça 'descasca' em vez de quebrar.",
            "Compare com injeção plástica: peça injetada é isotrópica (rigidez igual nas 3 direções); peça FDM nunca é.",
            "Engenheiro 3D pensa antes de modelar: 'qual eixo recebe a carga principal?' e orienta o STL conforme — não conforme o que 'cabe na mesa'.",
          ],
          integrations: [
            { module: "Módulo 1 (Interface)", text: "Use 'Place on Face' para deitar a peça na direção que maximiza resistência à carga real." },
            { module: "Módulo 13 (Tolerâncias)", text: "Anisotropia também afeta tolerância: encaixes XY são previsíveis; encaixes Z variam mais." },
          ],
          params: [
            { param: "Anisotropia Típica", value: "Eixo Z Crítico", action: "Queda de até 60% na resistência axial" },
            { param: "Wall Loops", value: "4-6", action: "Cascas absorvem carga melhor que infill" },
            { param: "Layer Height (funcional)", value: "0.16 mm", action: "Camada menor = mais adesão entre camadas" },
          ],
          goldenRule: "Planeje os eixos de carga em direções longitudinais às camadas — sempre.",
          errors: [
            { error: "Imprimir parafuso em pé — cisalha na primeira torção", solution: "Deite paralelo à mesa; rosca passa a ter força longitudinal" },
            { error: "Suporte de prateleira com camadas perpendiculares à carga", solution: "Reoriente para que as camadas trabalhem em compressão, não tração" },
          ],
          finance: "Falha mecânica em campo custa devolução + retrabalho + reputação — projeto correto vale 10x o tempo gasto.",
          exercise: [
            "Pegue uma peça funcional pronta",
            "Identifique a direção da carga principal",
            "Reposicione no slicer para alinhar carga às camadas",
            "Imprima as duas versões e quebre na mão para sentir diferença",
          ],
        }),
      L(2, "direcao-camadas", "Direção das Camadas e Tipos de Tensão", "30min",
        ["Posicionamento", "Tração/compressão/flexão", "Torção"], {
          theory: [
            "O posicionamento do modelo na mesa define a durabilidade sem acrescentar peso ou material. A mesma peça pode quebrar ou aguentar 10x mais carga só pela orientação.",
            "Tração: filamento aguenta bem ao longo da linha; ruim entre camadas. Oriente fibras na direção do esticamento.",
            "Compressão: FDM aguenta muito bem em qualquer direção — pilares e bases trabalham aqui.",
            "Flexão e torção: as piores cargas para FDM. Combine 5-6 paredes com infill Cubic e oriente o eixo neutro alinhado às camadas.",
          ],
          integrations: [
            { module: "Módulo 1 (Interface)", text: "Orientação correta reduz drasticamente a necessidade de suportes — bônus de design." },
            { module: "Módulo 19 (Suportes)", text: "Quanto melhor a orientação mecânica, menos suporte e menos pós-processamento." },
          ],
          params: [
            { param: "Orientação da Peça", value: "Paralela à Carga", action: "Garante resistência sem quebras de Z" },
            { param: "Wall Loops (flexão)", value: "5-6", action: "Cascas resistem flexão mais que infill" },
            { param: "Layer Height (carga)", value: "0.12-0.16 mm", action: "Camada fina = mais adesão = mais resistência Z" },
          ],
          goldenRule: "Evite imprimir pinos em pé se eles vão sofrer forças transversais — quebram na primeira tensão.",
          errors: [
            { error: "Gancho de carga impresso 'em pé' pela estética", solution: "Deite e use suporte mínimo — vale 8x mais carga" },
            { error: "Eixo de rotação com camadas perpendiculares ao giro", solution: "Imprima o eixo deitado, carga passa por compressão das fibras" },
          ],
          economy: "Orientação correta economiza tempo de pós e suporte — produção comercial ganha 15-20% por peça.",
          exercise: [
            "Modele um L de suporte simples",
            "Imprima em 3 orientações diferentes (em pé, deitado, 45°)",
            "Pendure peso até quebrar cada um",
            "Anote qual orientação aguentou mais",
          ],
        }),
      L(3, "infill-paredes-real", "Infill, Paredes e Resistência Estrutural Real", "45min",
        ["4 paredes vs infill denso", "Gyroid/Cubic", "Receita estrutural"], {
          theory: [
            "4-5 paredes aumentam a rigidez em ~120% comparado a infill denso. Paredes são a estrutura primária; infill é estrutura secundária.",
            "Gyroid: padrão isotrópico (rigidez igual nas 3 direções), sem cruzamentos de filamento — melhor opção genérica para peças funcionais.",
            "Cubic: cubos rotacionados 35°, rigidez uniforme nas 3 direções, levemente mais leve que Gyroid em alta densidade.",
            "Honeycomb 3D: máxima rigidez por grama, mas tempo de impressão alto. Use só quando peso importa mais que tempo.",
          ],
          integrations: [
            { module: "Módulo 18 (Infill)", text: "Use Gyroid ou Cubic para distribuição isotrópica de tensões em peças estruturais." },
            { module: "Módulo 7 (Otimização)", text: "Aumentar paredes em vez de densidade economiza tempo E material — duplo ganho." },
          ],
          params: [
            { param: "Configuração Mecânica", value: "4 Paredes + 25% Gyroid", action: "Rigidez volumétrica ideal" },
            { param: "Top/Bottom Layers", value: "5", action: "Fecha superfície sem pinholing" },
            { param: "Infill Pattern", value: "Gyroid", action: "Isotrópico, sem nós de tensão" },
          ],
          goldenRule: "4 paredes + 25% Gyroid = a receita padrão de rigidez para peças funcionais.",
          errors: [
            { error: "Aumentar infill para 80% e peça ainda flexionar", solution: "Reduza infill para 25% e suba paredes para 6 — vai ficar mais rígido" },
            { error: "Quebra na junção entre paredes e infill", solution: "Ative 'Detect overhang wall' e revise temperatura — adesão fraca" },
          ],
          finance: "Receita 4 paredes + 25% Gyroid usa 30-40% menos material que receita 'infill alto' equivalente em rigidez.",
          exercise: [
            "Imprima 3 cubos: (a) 2 paredes + 60% infill, (b) 4 paredes + 25% Gyroid, (c) 6 paredes + 10%",
            "Pese cada um",
            "Aplique flexão na mão até deformar",
            "Calcule rigidez/grama de cada — Gyroid+paredes vence",
          ],
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
        ["Trajetórias redundantes", "Velocidades assimétricas", "min/g"], {
          theory: [
            "A base da otimização é combater movimentações redundantes e desperdício de fusão. Cada movimento ocioso é dinheiro perdido.",
            "Métrica fundamental: min/g (minutos por grama). Peça com 50g em 4h = 4.8 min/g. Quanto menor, mais lucrativa.",
            "Velocidades assimétricas: parede externa lenta (qualidade visível), parede interna rápida (não aparece), infill ainda mais rápido.",
            "Travel speed: configure no máximo que a máquina aguenta sem ghost — movimento sem extrusão deve ser sempre rápido.",
          ],
          integrations: [
            { module: "Módulo 9 (Comercial)", text: "Otimização traduz-se direto em lucratividade — produção por hora aumenta linearmente." },
            { module: "Módulo 20 (Velocidade)", text: "Acelerar travel é o ganho mais barato e fácil — não afeta qualidade." },
          ],
          params: [
            { param: "Métrica Monitorada", value: "Tempo por Grama (min/g)", action: "Indica eficiência do processo" },
            { param: "Outer Wall Speed", value: "30-60 mm/s", action: "Devagar onde aparece" },
            { param: "Inner Wall Speed", value: "120-200 mm/s", action: "Rápido onde não aparece" },
            { param: "Travel Speed", value: "300-500 mm/s", action: "Máximo da máquina sem ghost" },
          ],
          goldenRule: "Defina velocidades assimétricas — devagar onde aparece, rápido onde não aparece.",
          errors: [
            { error: "Mesma velocidade em parede externa e infill", solution: "Diferencie: parede externa 50, interna 150, infill 200+" },
            { error: "Travel speed baixo igualado à impressão", solution: "Travel sempre 2-4x mais rápido que extrusão" },
          ],
          economy: "Travel 500 mm/s vs 150 mm/s reduz tempo total em 8-15% em peças com muitos saltos.",
          exercise: [
            "Anote tempo e peso de uma peça atual",
            "Calcule min/g",
            "Aplique velocidades assimétricas e travel alto",
            "Reimprima e compare min/g final",
          ],
        }),
      L(2, "reduzir-tempo-material", "Reduzir Tempo e Material sem Perder Rigidez", "35min",
        ["Lightning Infill", "Bico 0.6mm", "Adaptive Layer"], {
          theory: [
            "Lightning Infill: cria subestruturas flutuantes que sustentam apenas o topo, economizando até 60% de plástico em decorativos.",
            "Bico 0.6mm com altura 0.32mm dobra a vazão volumétrica vs bico 0.4 + camada 0.20 — mesmo CAD impresso em quase metade do tempo.",
            "Adaptive Layer Height: detecta curvas e reduz altura, planos altos a peça e expande altura. Tempo cai sem perder qualidade aparente.",
            "Combine os três: bico 0.6 + Lightning 10% + Adaptive Layer reduz peça de 6h para 2h30 com perda mínima de qualidade decorativa.",
          ],
          integrations: [
            { module: "Módulo 18 (Infill)", text: "Lightning é perfeito para peças decorativas e protótipos visuais — não use em peças funcionais." },
            { module: "Módulo 23 (Hotend)", text: "Bico 0.6 exige volumetric flow ~22 mm³/s — confirme com hotend de alto fluxo." },
          ],
          params: [
            { param: "Padrão de Infill", value: "Lightning", action: "Otimização volumétrica extrema" },
            { param: "Diâmetro do Bico", value: "0.6 mm", action: "Dobra vazão útil" },
            { param: "Altura de Camada", value: "0.32 mm (bico 0.6)", action: "Mantém aspecto razoável a alta velocidade" },
            { param: "Adaptive Layer Height", value: "On", action: "Ganho extra em peças curvas" },
          ],
          goldenRule: "Use Lightning com 10-15% para peças de vitrine e modelos decorativos.",
          errors: [
            { error: "Lightning em peça funcional → cede sob carga", solution: "Lightning é decorativo. Para função use Gyroid/Cubic" },
            { error: "Bico 0.6 com perfil de 0.4 → subextrusão", solution: "Atualize Line Width e Flow no perfil ao trocar bico" },
          ],
          finance: "Bico 0.6mm reduz tempo em 40%+ para peças volumosas — economia anual de R$ 1.500+ em horas de máquina em produção.",
          exercise: [
            "Pegue uma peça decorativa atual",
            "Troque infill para Lightning 10%",
            "Troque bico (e perfil) para 0.6mm",
            "Compare tempo, peso e aspecto final",
          ],
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
        ["Requisitos funcionais", "Fatores térmicos e químicos", "Checklist de projeto"], {
          theory: [
            "A análise de requisitos funcionais antecede o fatiamento. Cada utilidade tem limites específicos (carga, ciclos, exposição química, térmica).",
            "Checklist obrigatório antes de imprimir peça funcional: (1) ambiente de uso, (2) cargas e direção, (3) ciclos esperados, (4) exposição química/UV, (5) tolerâncias críticas.",
            "Ignorar qualquer item do checklist gera retrabalho garantido — cliente devolve por motivo que era previsível.",
            "Documente o checklist no .3mf como nota — historico vira manual de boas práticas para projetos futuros.",
          ],
          integrations: [
            { module: "Módulo 6 (Engenharia)", text: "Os requisitos definem material, orientação, paredes e infill — não comece pelo slicer." },
            { module: "Módulo 16 (Casos+)", text: "Estudos estendidos detalham 6 receitas comerciais aplicáveis direto." },
          ],
          params: [
            { param: "Checklist Funcional", value: "5 itens obrigatórios", action: "Ambiente, carga, ciclos, química, tolerância" },
            { param: "Notas no .3mf", value: "Documentadas", action: "Histórico técnico por projeto" },
          ],
          goldenRule: "Liste fatores térmicos e químicos antes de fatiar — a peça vai ficar onde, sob qual carga, exposta a quê?",
          errors: [
            { error: "Peça externa em PLA — quebra com sol e calor", solution: "Aplique checklist: ambiente externo = PETG/ASA/PC mínimo" },
            { error: "Peça com solvente em PETG", solution: "PETG sofre com acetona/álcool forte — use PC ou Nylon" },
          ],
          finance: "Checklist evita 80% das devoluções por uso indevido — margem comercial protegida.",
          exercise: [
            "Liste seu próximo projeto cliente",
            "Responda os 5 itens do checklist",
            "Escolha material baseado nas respostas",
            "Anote tudo em nota dentro do .3mf",
          ],
        }),
      L(2, "pecas-funcionais", "Peças Funcionais: Suportes, Dobradiças, Engrenagens", "35min",
        ["Dobradiças tolerância XY", "Engrenagens em Nylon", "Bico especial"], {
          theory: [
            "Dobradiças: exigem tolerâncias XY precisas (0.2mm de folga típica). Imprima eixo e olhal juntos com 'print-in-place' para garantir alinhamento.",
            "Engrenagens: imprimir em Nylon ou PA-CF, bico especial endurecido, fan desligado para coesão entre camadas — fricção exige rigidez Z.",
            "Eixo da engrenagem deve ser longitudinal às camadas; dente engata em força transversal, mas precisa de coesão axial para não delaminar.",
            "Horizontal Expansion: ajuste -0.05 a -0.10mm em encaixes apertados — slicer tende a engordar furos.",
          ],
          integrations: [
            { module: "Módulo 4 (Materiais)", text: "Use Nylon para alta fricção e ciclos longos — PLA falha por fadiga em ~1000 ciclos." },
            { module: "Módulo 13 (Tolerâncias)", text: "Ajuste de Horizontal Expansion é o segredo de encaixes precisos." },
          ],
          params: [
            { param: "Filamento", value: "Nylon PA12 / ASA", action: "Polímeros de rigidez máxima" },
            { param: "Horizontal Expansion", value: "-0.05 mm", action: "Compensa engorda de furos" },
            { param: "Fan (Nylon)", value: "0%", action: "Mantém coesão entre camadas" },
            { param: "Folga em dobradiça", value: "0.20 mm", action: "Move sem travar nem balançar" },
          ],
          goldenRule: "Ajuste Horizontal Expansion (-0.05mm) quando furos saem apertados para encaixes.",
          errors: [
            { error: "Print-in-place travado sólido", solution: "Aumente folga para 0.25mm e reduza Flow para 0.97" },
            { error: "Engrenagem PLA derretendo por fricção", solution: "Reimprima em Nylon ou PETG — PLA não suporta fricção contínua" },
          ],
          economy: "Engrenagem Nylon dura 50-100x mais ciclos que PLA — peça única vale o preço do spool.",
          exercise: [
            "Imprima uma dobradiça print-in-place padrão",
            "Imprima novamente com Horizontal Expansion -0.05",
            "Compare quanto cada uma se move",
            "Repita com folga 0.15 / 0.20 / 0.25 e meça",
          ],
        }),
      L(3, "suporte-parede-pesada", "Suporte de Parede de Serviço Pesado", "35min",
        ["6 loops concêntricos", "Gyroid 3D 30%", "Furos horizontais"], {
          theory: [
            "Para suportes que sustentam carga real: 6 loops concêntricos + Gyroid 30% = máxima resistência por grama.",
            "Furos de ancoragem (para parafuso de fixação na parede) sempre na horizontal — força de arrancamento passa por compressão de camadas, não tração entre elas.",
            "Top/Bottom 6 camadas em peça com parafuso embutido — superfície fina rasga ao apertar.",
            "Para carga sobre saliência (cantilever), oriente o suporte deitado; carga vira compressão em vez de cisalhamento Z.",
          ],
          integrations: [
            { module: "Módulo 6 (Engenharia)", text: "Alinhe furos de ancoragem na horizontal para evitar delaminação por arrancamento." },
            { module: "Módulo 18 (Infill)", text: "Gyroid 3D distribui torção melhor que Cubic em cantilevers." },
          ],
          params: [
            { param: "Infill Aplicado", value: "Gyroid 3D (30%)", action: "Melhor distribuição contra torções" },
            { param: "Wall Loops", value: "6", action: "Casca espessa para parafuso" },
            { param: "Top/Bottom Layers", value: "6", action: "Não rasga ao apertar parafuso" },
            { param: "Orientação Furo", value: "Horizontal", action: "Carga vira compressão de camadas" },
          ],
          goldenRule: "Oriente furos horizontalmente para evitar delaminação por carga axial.",
          errors: [
            { error: "Furo vertical com parafuso → camada rasga", solution: "Reimprima furo na horizontal" },
            { error: "Suporte de prateleira flexionando com peso", solution: "Suba paredes para 6 + Gyroid 30% e reoriente" },
          ],
          finance: "Suporte impresso bem dimensionado substitui peça metálica de R$ 30-80 — margem alta em volumes pequenos.",
          exercise: [
            "Modele suporte L de 100×60×30mm",
            "Imprima com 4p+20% Gyroid e com 6p+30% Gyroid",
            "Pendure peso até deformar",
            "Anote diferença de carga máxima",
          ],
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
        ["Padronização de custos", "Produtividade líquida", "Nicho vs commodity"], {
          theory: [
            "A padronização absoluta de custos operacionais é o que separa hobby de negócio. Sem planilha, não há margem real.",
            "Produtividade líquida = peças aprovadas / hora total. Inclui setup, retrabalho e falhas. Bruta engana, líquida paga conta.",
            "Nicho: peças técnicas com baixa concorrência (próteses, ortopédicas, industriais) — margem 4-8x.",
            "Commodity: chaveiros, brindes, decorativos — margem 1.5-2x. Só faz sentido em alto volume com máquina dedicada.",
          ],
          integrations: [
            { module: "Módulo 15 (Produção)", text: "Consistência operacional reduz perdas — cada falha é uma quebra de margem direta." },
            { module: "Módulo 7 (Otimização)", text: "Otimização extrema é o que torna commodity viável — sem ela, só nicho dá lucro." },
          ],
          params: [
            { param: "Margem Nicho", value: "4-8x custo", action: "Peça técnica especializada" },
            { param: "Margem Commodity", value: "1.5-2x custo", action: "Volume com máquina dedicada" },
            { param: "Métrica Principal", value: "min/g aprovado", action: "Tempo útil por grama de peça boa" },
          ],
          goldenRule: "Calcule produtividade líquida (peças boas/hora), não bruta.",
          errors: [
            { error: "Cobrar igual hobby (custo material × 2)", solution: "Inclua energia, desgaste, depreciação, falha, setup, lucro" },
            { error: "Aceitar commodity sem máquina dedicada", solution: "Recuse ou aumente prazo — não disputa volume com farm" },
          ],
          economy: "Preencha 90% da mesa para diluir tempo de aquecimento e setup por peça.",
          finance: "Cobre R$ 15-25/hora ativa de máquina como referência de mercado brasileiro.",
          exercise: [
            "Liste 3 peças que você já fez",
            "Calcule custo real (material + energia + desgaste + falha + tempo)",
            "Compare com o que cobrou",
            "Ajuste preço futuro com margem 2-4x do custo total",
          ],
        }),
      L(2, "precificacao", "Precificação: Custo, Lucro e Perfis Comerciais", "40min",
        ["Energia ~300W", "Desgaste de bico", "Depreciação", "Taxa de falha"], {
          theory: [
            "Componentes obrigatórios do custo: energia (~300W ativos), desgaste de bico, depreciação da impressora, taxa de falha (~8-10%), tempo humano de setup e pós-processamento.",
            "Energia: 300W × R$0.90/kWh × horas = custo direto. Em SP residencial pode ir a R$1.10/kWh.",
            "Depreciação: máquina de R$5000 com vida útil 5000h = R$1.00/h de máquina, antes de qualquer outro custo.",
            "Taxa de falha histórica: anote cada peça refugada por 6 meses para ter taxa real. Estimativa inicial 8-10%.",
          ],
          integrations: [
            { module: "Módulo 15 (Produção)", text: "Use sempre taxa de falha histórica na precificação — não opcional." },
            { module: "Módulo 14 (Troubleshooting)", text: "Reduzir falha sistemática é forma direta de aumentar margem sem subir preço." },
          ],
          params: [
            { param: "Taxa de Falha Coberta", value: "10% de Contingência", action: "Amortece custos inerentes de falha" },
            { param: "Custo Energia", value: "R$ 0.30-0.40/h", action: "300W × tarifa local" },
            { param: "Depreciação", value: "R$ 1.00/h", action: "Máquina R$5k em 5000h" },
            { param: "Margem sobre custo", value: "2-4x", action: "Sustentabilidade + lucro real" },
          ],
          goldenRule: "Inclua taxa de setup separada para projetos novos — modelar/calibrar nova peça consome horas não-impressão.",
          errors: [
            { error: "Esquecer depreciação no cálculo", solution: "Adicione R$1.00/h fixo na planilha" },
            { error: "Cobrar mesmo preço para peça nova e repetida", solution: "Setup é custo one-time — destaque na proposta" },
          ],
          finance: "Margem 2x a 4x sobre custo básico para sustentabilidade do negócio. Inclua taxa de setup para projetos novos.",
          exercise: [
            "Monte planilha com: material, energia, desgaste, depreciação, falha, setup, lucro",
            "Aplique em 3 cotações reais",
            "Compare com o preço que cobrou no passado",
            "Reajuste tabela de preços para clientes novos",
          ],
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
