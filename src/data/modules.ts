export type Lesson = { title: string; duration: string; topics: string[] };
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

export const modules: Module[] = [
  {
    id: "interface-fundamentos",
    number: 1,
    title: "Interface & Fundamentos do OrcaSlicer",
    tagline: "A anatomia do fatiador mais poderoso do mercado",
    level: "Iniciante",
    duration: "2h 30min",
    methodology: "Tour guiado pela UI com screenshots anotadas; exercícios práticos em cada aba (Prepare, Preview, Device, Project).",
    objective: "Dominar a interface, fluxo de trabalho e atalhos do OrcaSlicer para nunca mais ficar perdido em meio a centenas de configurações.",
    lessons: [
      { title: "Instalação, atualização e perfis oficiais", duration: "18min", topics: ["Download por SO", "Verificação de integridade", "Migração do PrusaSlicer/Bambu Studio"] },
      { title: "As 4 abas: Prepare, Preview, Device, Project", duration: "32min", topics: ["Workflow completo", "Atalhos de teclado", "Customização da UI"] },
      { title: "Importação e organização de modelos (.stl, .3mf, .step)", duration: "25min", topics: ["Diferenças entre formatos", "Manter histórico no .3mf", "Auto-arrange"] },
      { title: "Perfis de máquina, filamento e processo", duration: "40min", topics: ["Hierarquia de herança", "Criar perfil customizado", "Backup e versionamento"] },
      { title: "Primeira impressão: do .stl ao G-code", duration: "35min", topics: ["Checklist pré-impressão", "Slicing e Preview", "Envio via rede ou SD"] },
    ],
  },
  {
    id: "guia-materiais",
    number: 2,
    title: "Guia Definitivo de Materiais",
    tagline: "PLA, PETG, ABS, ASA, TPU, Nylon, PC e compostos com fibra",
    level: "Iniciante",
    duration: "3h 10min",
    methodology: "Tabelas comparativas, fotos macro de filamento, gráficos de temperatura vs. resistência, testes destrutivos em vídeo.",
    objective: "Escolher o material certo para cada aplicação e configurar perfis precisos de temperatura, ventilação e retração.",
    lessons: [
      { title: "PLA, PLA+ e PLA Silk: o cavalo de batalha", duration: "28min", topics: ["Janela térmica", "Cooling agressivo", "Limitações térmicas"] },
      { title: "PETG: força x dificuldade", duration: "30min", topics: ["Stringing", "Adesão excessiva à mesa", "Z-hop e retração"] },
      { title: "ABS, ASA e o vilão das emanações", duration: "32min", topics: ["Enclosure obrigatório", "Warping", "Alisamento com acetona"] },
      { title: "TPU e flexíveis: shore A vs D", duration: "26min", topics: ["Direct drive obrigatório", "Velocidade reduzida", "Aplicações de produto"] },
      { title: "Nylon, PC e engenharia avançada", duration: "35min", topics: ["Secagem crítica", "Bicos hardened", "Câmara aquecida"] },
      { title: "Compostos com fibra (CF, GF): desgaste do bico", duration: "24min", topics: ["Bicos de aço endurecido", "Engrenagens hardened", "Anisotropia"] },
      { title: "Armazenamento e secagem: o erro mais comum", duration: "25min", topics: ["Higroscopia por material", "Secador vs forno", "Sinais de filamento úmido"] },
    ],
  },
  { id: "adesao-suportes-infill", number: 3, title: "Adesão, Suportes & Infill Inteligente", tagline: "A base de uma impressão sem falhas", level: "Iniciante", duration: "2h 50min", methodology: "Comparativos visuais lado-a-lado de skirt/brim/raft e padrões de infill renderizados no Preview.", objective: "Eliminar warping e descolamento, escolher o padrão de infill ideal para cada peça e dominar suportes que se desprendem sem esforço.", lessons: [
      { title: "Skirt, Brim e Raft: quando usar cada um", duration: "22min", topics: ["Brim adaptativo", "Raft para ABS", "Auto-brim por área"] },
      { title: "Padrões de infill: Grid, Gyroid, Lightning, Cubic", duration: "35min", topics: ["Resistência por padrão", "Tempo de impressão", "Lightning para protótipos"] },
      { title: "Suportes normais vs Tree (orgânico)", duration: "30min", topics: ["Z-Gap", "Densidade de interface", "Tree para miniaturas"] },
      { title: "Suporte pintado (Paint-on)", duration: "20min", topics: ["Ferramenta de pintura", "Suporte apenas onde precisa", "Economia de filamento"] },
      { title: "Adesão à mesa: PEI, vidro, garolite", duration: "25min", topics: ["Por material", "Limpeza", "Cola bastão e laquê"] },
  ] },
  { id: "calibracao-cientifica", number: 4, title: "Calibração Científica", tagline: "Do E-Steps ao Pressure Advance", level: "Intermediário", duration: "4h 20min", methodology: "Testes calibráveis fornecidos em .3mf, medições com paquímetro, planilha de registro de calibração.", objective: "Calibrar cirurgicamente sua impressora: cada décimo de milímetro importa.", lessons: [
      { title: "E-Steps e extrusão volumétrica", duration: "30min", topics: ["Marcação de 120mm", "Cálculo da nova esteps", "Limites do firmware"] },
      { title: "Flow Rate: o ajuste de ouro", duration: "28min", topics: ["Cubo oco", "Medição de paredes", "Por filamento"] },
      { title: "Z-Offset e primeira camada perfeita", duration: "25min", topics: ["Live Z", "Teste de quadrado", "Mesh bed leveling"] },
      { title: "Temperature Tower automatizado", duration: "32min", topics: ["Geração no Orca", "Análise de stringing", "Janela ideal"] },
      { title: "Retração: distância x velocidade", duration: "30min", topics: ["Bowden vs Direct", "Z-hop", "Wipe"] },
      { title: "Pressure Advance / Linear Advance", duration: "35min", topics: ["Por que existe", "Pattern test", "Por filamento"] },
      { title: "Input Shaping: matando ringing", duration: "28min", topics: ["Acelerômetro", "MZV, ZV, EI", "Ganho real de velocidade"] },
      { title: "PID Tuning (hotend e mesa)", duration: "22min", topics: ["Comandos M303", "Estabilidade térmica"] },
  ] },
  { id: "hotend-extrusao", number: 5, title: "Anatomia do Hotend & Sistema de Extrusão", tagline: "Engenharia do conjunto que define tudo", level: "Intermediário", duration: "2h 40min", methodology: "Diagramas técnicos explodidos, vídeos de manutenção, troubleshooting guiado.", objective: "Entender e manter o coração da impressora — diagnosticar clogs, heat creep e desgaste antes de virar dor de cabeça.", lessons: [
      { title: "Heatbreak, heatsink e a física do heat creep", duration: "28min", topics: ["Diagrama térmico", "Ventilação do dissipador", "All-metal vs PTFE"] },
      { title: "Bicos: brass, hardened, ruby — qual escolher", duration: "22min", topics: ["Por material", "Diâmetros 0.2 a 0.8", "Durabilidade"] },
      { title: "Extrusores: direct drive vs Bowden", duration: "26min", topics: ["Trade-offs", "Flexíveis", "Engrenagens duplas"] },
      { title: "Diagnóstico de clog (entupimento)", duration: "30min", topics: ["Atomic pull", "Cold pull", "Quando trocar o bico"] },
      { title: "Manutenção preventiva mensal", duration: "20min", topics: ["Checklist", "Cinta térmica", "Lubrificação"] },
  ] },
  { id: "pos-processamento", number: 6, title: "Pós-Processamento Profissional", tagline: "Da peça impressa ao produto acabado", level: "Intermediário", duration: "3h 30min", methodology: "Demonstrações práticas com EPI, lista de materiais, fornecedores brasileiros.", objective: "Transformar peças FDM em produtos com acabamento de moldagem por injeção.", lessons: [
      { title: "Lixamento progressivo (220 a 2000)", duration: "30min", topics: ["Lixa seca x molhada", "Suporte de lixa", "Ordem das granas"] },
      { title: "Primer, massa rápida e pintura", duration: "35min", topics: ["Primer filler", "Tinta acrílica vs esmalte", "Verniz fosco/brilhante"] },
      { title: "Alisamento químico (ABS com acetona)", duration: "28min", topics: ["Segurança", "Câmara de vapor", "Tempo controlado"] },
      { title: "Heat-Set Inserts (insertos por calor)", duration: "32min", topics: ["Furos calibrados", "Ferro de solda dedicado", "Por material"] },
      { title: "Colagem, Snap-Fit e Press-Fit", duration: "28min", topics: ["Cianoacrilato + bicarbonato", "Tolerâncias 0.2mm", "Design para montagem"] },
      { title: "Ímãs, parafusos e roscas embutidas", duration: "25min", topics: ["Pausa para inserção", "Pockets calibrados", "Rosca direta no PLA"] },
  ] },
  { id: "design-paramétrico", number: 7, title: "Design Paramétrico para FDM", tagline: "Pense como engenheiro, imprima como artista", level: "Avançado", duration: "3h 00min", methodology: "Workflow Onshape/Fusion 360 → OrcaSlicer, regras de DFM (design for manufacturing) FDM.", objective: "Modelar peças que aproveitam ao máximo o processo FDM: menos suportes, menos retrabalho, mais resistência.", lessons: [
      { title: "Tolerâncias: 0.2mm de folga é regra", duration: "25min", topics: ["Furos x pinos", "Encaixes", "Compensação de bico"] },
      { title: "Regra dos 45°: chanfros vs overhangs", duration: "22min", topics: ["Sem suporte", "Bridging", "Orientação"] },
      { title: "Paredes mínimas e múltiplo do bico", duration: "20min", topics: ["1.2mm = 3 perímetros", "Wall generator", "Arachne"] },
      { title: "Snap-fits e living hinges em FDM", duration: "28min", topics: ["Material certo", "Espessura", "Ciclo de fadiga"] },
      { title: "Orientação para resistência (anisotropia)", duration: "30min", topics: ["Carga vs camadas", "Estudos de caso", "Reforço com Modifiers"] },
      { title: "Modifiers do OrcaSlicer: infill localizado", duration: "25min", topics: ["Mais infill onde recebe carga", "Texturas", "Multi-color por região"] },
  ] },
  { id: "velocidade-qualidade", number: 8, title: "Velocidade x Qualidade", tagline: "O equilíbrio que define o lucro por hora", level: "Avançado", duration: "2h 20min", methodology: "Benchmarks reais com cronômetro, comparativos visuais 50/150/300 mm/s.", objective: "Imprimir 3x mais rápido sem perder qualidade — entendendo aceleração, jerk e flow máximo.", lessons: [
      { title: "Velocidade por feature (perímetro, infill, top)", duration: "25min", topics: ["Outer wall lento", "Infill rápido", "Bridge moderado"] },
      { title: "Aceleração e jerk", duration: "22min", topics: ["Por que importam", "Limites do frame", "Smooth time"] },
      { title: "Flow máximo do hotend (Volcano, CHT, Revo)", duration: "28min", topics: ["mm³/s teórico", "Teste prático", "Limite real"] },
      { title: "Adaptive layer height", duration: "20min", topics: ["Variável por geometria", "Tempo x qualidade", "Quando usar"] },
      { title: "Modo Vaso (Spiralize)", duration: "18min", topics: ["Aplicações comerciais", "Limitações", "Acabamento"] },
  ] },
  { id: "multi-material", number: 9, title: "Multi-Material & Multi-Color (AMS, MMU)", tagline: "Imprimindo em 4 ou 16 cores sem desperdício", level: "Avançado", duration: "2h 40min", methodology: "Configuração do AMS/MMU, pintura por objeto, otimização de prime tower.", objective: "Dominar impressões multicor sem transformar metade do filamento em torre de purga.", lessons: [
      { title: "Hardware: AMS, MMU3, Palette", duration: "22min", topics: ["Compatibilidades", "Setup inicial"] },
      { title: "Pintura por objeto e por face", duration: "28min", topics: ["Ferramentas no Prepare", "Smart paint", "Por altura"] },
      { title: "Prime tower e wipe: minimizando desperdício", duration: "25min", topics: ["Volumes de purga", "Tower brim", "Flush into infill"] },
      { title: "Materiais diferentes na mesma peça", duration: "26min", topics: ["PLA + TPU", "Suporte solúvel (PVA, BVOH)", "Interface customizada"] },
  ] },
  { id: "perimetros-arachne", number: 10, title: "Perímetros & Arachne", tagline: "A engenharia das paredes que ninguém te conta", level: "Avançado", duration: "1h 50min", methodology: "Comparativo Classic vs Arachne em geometrias finas, análise de gaps.", objective: "Dominar o gerador de paredes Arachne para eliminar gaps em detalhes finos.", lessons: [
      { title: "Classic vs Arachne: o que muda", duration: "25min", topics: ["Largura variável", "Letras e logos", "Quando voltar pro Classic"] },
      { title: "Largura de extrusão por feature", duration: "22min", topics: ["Outer wall 0.4", "Infill 0.5", "Cálculo correto"] },
      { title: "Ordem de impressão (outer/inner first)", duration: "18min", topics: ["Dimensional accuracy", "Acabamento", "Bridging"] },
      { title: "Compensação de bico (XY hole compensation)", duration: "20min", topics: ["Furos sempre menores", "Calibração", "Por filamento"] },
  ] },
  { id: "seams-acabamento", number: 11, title: "Seams & Acabamento Profissional", tagline: "Escondendo a costura com intenção estética", level: "Avançado", duration: "1h 40min", methodology: "Seam painting passo a passo, fotos macro de costuras boas e ruins.", objective: "Posicionar a costura exatamente onde ela desaparece — em arestas, dentro de furos ou pintada manualmente.", lessons: [
      { title: "Física da costura em FDM", duration: "18min", topics: ["Por que existe", "Z-seam alignment", "Random vs Sharpest"] },
      { title: "Seam Painting: pintura manual", duration: "28min", topics: ["Ferramenta", "Casos estéticos", "Em multi-corpo"] },
      { title: "Scarf seam (costura inclinada)", duration: "20min", topics: ["Novidade do Orca", "Aplicações", "Trade-offs"] },
      { title: "Ironing: superfícies espelhadas", duration: "22min", topics: ["Velocidade", "Padrão", "Flow ratio"] },
  ] },
  { id: "bridging-overhangs", number: 12, title: "Bridging & Overhangs Extremos", tagline: "Imprimir no ar — literalmente", level: "Avançado", duration: "1h 30min", methodology: "Bridging test, overhang test, calibração de cooling.", objective: "Cruzar vãos de 50mm+ e imprimir overhangs de 60° sem suporte.", lessons: [
      { title: "Bridging: cooling máximo e flow reduzido", duration: "25min", topics: ["100% fan", "Flow 90%", "Slow bridges"] },
      { title: "Overhangs: speed adaptativo", duration: "22min", topics: ["Slowdown for overhangs", "Cooling extra"] },
      { title: "Fuzzy skin: textura útil", duration: "15min", topics: ["Esconde imperfeições", "Aderência tátil"] },
  ] },
  { id: "tolerancias-mecanica", number: 13, title: "Tolerâncias & Mecânica dos Materiais", tagline: "Quando a peça vira componente de máquina", level: "Profissional", duration: "3h 10min", methodology: "Ensaios destrutivos, gráficos tensão-deformação, FEA simplificado.", objective: "Especificar peças FDM para uso mecânico real, com fator de segurança e ciclo de vida.", lessons: [
      { title: "Anisotropia: 50% de resistência no Z", duration: "30min", topics: ["Por que XY é forte", "Orientação estratégica", "Reforço de camadas"] },
      { title: "Infill % vs resistência real", duration: "28min", topics: ["Curva infill x peso x força", "Padrão importa", "Concha sólida"] },
      { title: "Tensão de tração por material", duration: "25min", topics: ["Tabela PLA/PETG/ABS/Nylon/PC", "Datasheets reais"] },
      { title: "Fadiga e creep (deformação por tempo)", duration: "26min", topics: ["PLA falha sob calor", "Nylon para fadiga", "Recozimento"] },
      { title: "Recozimento (annealing) de PLA-HT, PA, PC", duration: "30min", topics: ["Temperatura", "Tempo", "Compensação de encolhimento"] },
  ] },
  { id: "troubleshooting", number: 14, title: "Troubleshooting: Catálogo de Falhas", tagline: "Cada defeito, sua causa e sua cura", level: "Intermediário", duration: "3h 00min", methodology: "Biblioteca visual com 40+ defeitos fotografados, árvore de decisão por sintoma.", objective: "Diagnosticar qualquer falha de impressão em menos de 2 minutos olhando para a peça.", lessons: [
      { title: "Warping, descolamento e elephant foot", duration: "25min", topics: ["Causas", "Brim adaptativo", "Primeira camada"] },
      { title: "Stringing, blobs e zits", duration: "28min", topics: ["Retração", "Temperatura", "Wipe e Z-hop"] },
      { title: "Layer shift e perda de passos", duration: "22min", topics: ["Correia frouxa", "Driver superaquecendo", "Velocidade excessiva"] },
      { title: "Under-extrusion e gaps entre perímetros", duration: "25min", topics: ["Flow baixo", "Clog parcial", "Temperatura"] },
      { title: "Ghosting, ringing e VFA", duration: "22min", topics: ["Aceleração", "Input shaping", "Rigidez do frame"] },
      { title: "Z-banding e qualidade vertical", duration: "20min", topics: ["Eixo Z torto", "Acoplamentos", "Z-hop excessivo"] },
  ] },
  { id: "producao-comercial", number: 15, title: "Produção Comercial & Margens", tagline: "Quando o hobby vira negócio", level: "Profissional", duration: "3h 40min", methodology: "Planilha de custos para download, estudos de caso reais com margens de mercado brasileiro.", objective: "Precificar peças com lucro real, calculando material, energia, depreciação, mão de obra e impostos.", lessons: [
      { title: "Cálculo de custo de filamento por peça", duration: "22min", topics: ["mm³ → gramas", "Por marca", "Desperdício embutido"] },
      { title: "Energia: tabela de consumo kWh", duration: "20min", topics: ["Medição com plug", "Tarifa local", "Por hora de impressão"] },
      { title: "Depreciação da impressora e bicos", duration: "25min", topics: ["Vida útil estimada", "Custo por hora-máquina"] },
      { title: "Tempo humano: setup, pós, embalagem", duration: "22min", topics: ["Cronômetro", "R$/hora", "Lote vs unitário"] },
      { title: "Markup, margem e ponto de equilíbrio", duration: "30min", topics: ["Diferença markup/margem", "Mercado livre/Shopee", "Frete"] },
      { title: "Fluxo: orçamento → produção → entrega", duration: "28min", topics: ["Templates", "Prazo realista", "SLA"] },
      { title: "Aspectos fiscais (MEI, ME, NF-e)", duration: "25min", topics: ["Regime tributário", "CNAE para impressão 3D"] },
  ] },
  { id: "fazenda-impressao", number: 16, title: "Fazenda de Impressão & Produção em Escala", tagline: "De 1 para 10 impressoras sem perder o controle", level: "Profissional", duration: "2h 20min", methodology: "Layout físico, gestão remota via aba Device, dashboards.", objective: "Operar múltiplas impressoras com monitoramento remoto e padronização de perfis.", lessons: [
      { title: "Layout físico e ventilação", duration: "22min", topics: ["Filtragem de ar", "Estabilidade térmica", "Acesso"] },
      { title: "Monitoramento remoto (OrcaSlicer Device, Obico, Mainsail)", duration: "30min", topics: ["Camera AI", "Pause automático em falha", "Notificações"] },
      { title: "Padronização de perfis entre máquinas", duration: "25min", topics: ["Calibração individual", "Perfil mestre", "Versionamento"] },
      { title: "Logística: SD vs Wi-Fi vs Cloud", duration: "20min", topics: ["Prós/contras", "Segurança"] },
  ] },
  { id: "grande-formato", number: 17, title: "Grande Formato & Peças Cortadas", tagline: "Quando o objeto é maior que a impressora", level: "Profissional", duration: "1h 50min", methodology: "Ferramenta Cut do OrcaSlicer com pinos de alinhamento e juntas dovetail.", objective: "Dividir peças grandes em partes coláveis com encaixes precisos.", lessons: [
      { title: "Ferramenta Cut: planos, pinos, conectores", duration: "28min", topics: ["Pinos de alinhamento", "Dovetail joints", "Por feature"] },
      { title: "Colagem profissional (CA + ativador, epóxi)", duration: "22min", topics: ["Por material", "Reforço com filete", "Tempo de cura"] },
      { title: "Estudo de caso: capacete dividido em 6 partes", duration: "25min", topics: ["Planejamento", "Execução", "Acabamento de juntas"] },
  ] },
  { id: "infill-avancado", number: 18, title: "Infill Avançado & Estruturas Internas", tagline: "Otimização topológica acessível", level: "Avançado", duration: "1h 40min", methodology: "Tabela comparativa de padrões com tempo, peso e resistência medidos.", objective: "Escolher o padrão de infill ideal por aplicação — peso, força, tempo ou flexibilidade.", lessons: [
      { title: "Catálogo de padrões: 15 opções comparadas", duration: "30min", topics: ["Gyroid", "Honeycomb", "Cubic", "Lightning"] },
      { title: "Densidade variável e gradient infill", duration: "22min", topics: ["Mais infill onde precisa", "Modifiers"] },
      { title: "Infill anchor e bonding com paredes", duration: "20min", topics: ["Evita gaps", "Anchor length"] },
  ] },
  { id: "suportes-avancados", number: 19, title: "Suportes Avançados (Tree, Organic, Paint-on)", tagline: "Suportes que se removem com um estalo", level: "Avançado", duration: "1h 50min", methodology: "Comparativos visuais Normal vs Tree vs Organic, configurações de interface.", objective: "Gerar suportes que sustentam perfeitamente e se desprendem sem marcar a peça.", lessons: [
      { title: "Tree e Organic: anatomia do suporte orgânico", duration: "28min", topics: ["Branch angle", "Tip diameter", "Para miniaturas"] },
      { title: "Interface layers: a chave do desprendimento", duration: "25min", topics: ["Z-gap fino", "Padrão de interface", "Material solúvel"] },
      { title: "Paint-on support: suporte só onde precisa", duration: "22min", topics: ["Pintura manual", "Economia", "Por face"] },
  ] },
  { id: "g-code-customizacao", number: 20, title: "G-code & Customização Avançada", tagline: "Falando a língua nativa da impressora", level: "Profissional", duration: "2h 10min", methodology: "Leitura de G-code linha a linha, edição de start/end, macros úteis.", objective: "Customizar start G-code, end G-code, layer change e pause-at-height para automações.", lessons: [
      { title: "Anatomia do G-code FDM", duration: "25min", topics: ["G0/G1", "M104/M109", "M204"] },
      { title: "Start e End G-code customizados", duration: "30min", topics: ["Por máquina", "Variáveis", "Purge line"] },
      { title: "Pause at height e troca manual de cor", duration: "20min", topics: ["M600", "Pausa segura", "Reaquecimento"] },
      { title: "Macros úteis (nudge, prime, wipe)", duration: "25min", topics: ["Klipper macros", "Marlin"] },
  ] },
  { id: "checklists-fluxos", number: 21, title: "Checklists & Fluxos Profissionais", tagline: "SOPs (Standard Operating Procedures) para impressão 3D", level: "Profissional", duration: "1h 30min", methodology: "Templates prontos para download (PDF e .3mf), exemplos de operação real.", objective: "Padronizar pré-impressão, monitoramento e pós-processo para eliminar erros humanos.", lessons: [
      { title: "Checklist pré-impressão (12 itens)", duration: "20min", topics: ["Mesa limpa", "Filamento seco", "Z calibrado"] },
      { title: "SOP de troca de filamento", duration: "18min", topics: ["Purga", "Temperatura", "Cold pull preventivo"] },
      { title: "Inspeção de qualidade final", duration: "22min", topics: ["Paquímetro", "Visual", "Funcional"] },
  ] },
  { id: "sustentabilidade", number: 22, title: "Sustentabilidade & Redução de Desperdício", tagline: "Impressão 3D consciente", level: "Intermediário", duration: "1h 20min", methodology: "Análise de ciclo de vida, fornecedores de reciclagem brasileiros.", objective: "Reduzir filamento desperdiçado em 40%+ e dar destino correto aos resíduos.", lessons: [
      { title: "Lightning infill e modo vaso para protótipos", duration: "20min", topics: ["Quando aceita 5%", "Tempo cortado pela metade"] },
      { title: "Reciclagem: trituradores e extrusoras", duration: "25min", topics: ["Filastruder", "Cooperativas", "Limitações"] },
      { title: "Filamentos reciclados e bio-based", duration: "18min", topics: ["PLA bio", "rPETG", "Marcas BR"] },
  ] },
  { id: "marketplaces-bonus", number: 23, title: "BÔNUS — Integração com Marketplaces", tagline: "Vendendo na Shopee, Mercado Livre e Etsy", level: "Profissional", duration: "1h 50min", methodology: "Estudos de caso de sellers 3D brasileiros, perfis otimizados para volume.", objective: "Criar perfis de impressão que equilibram qualidade e velocidade para maximizar lucro por hora-máquina.", lessons: [
      { title: "Perfis 'comerciais': qualidade aceitável no menor tempo", duration: "30min", topics: ["0.28mm camada", "2 perímetros", "10% infill"] },
      { title: "Embalagem e fotografia de produto", duration: "25min", topics: ["Foto branca", "Bullet points", "Variações"] },
      { title: "Precificação dinâmica e frete", duration: "22min", topics: ["Cubagem", "ML Full", "Frete grátis"] },
  ] },
  { id: "comunidade-bonus", number: 24, title: "BÔNUS — Comunidade & Suporte Vitalício", tagline: "Você nunca mais imprime sozinho", level: "Iniciante", duration: "Acesso vitalício", methodology: "Grupo Telegram exclusivo, encontros mensais ao vivo, biblioteca de perfis .3mf.", objective: "Manter você atualizado com cada release do OrcaSlicer e novos truques descobertos pela comunidade.", lessons: [
      { title: "Acesso ao grupo Telegram (alunos + instrutor)", duration: "—", topics: ["Resposta em até 24h"] },
      { title: "Encontros mensais ao vivo (troubleshooting)", duration: "2h/mês", topics: ["Resolvemos seus prints"] },
      { title: "Biblioteca de perfis calibrados (.3mf)", duration: "—", topics: ["Por impressora popular", "Atualizada"] },
  ] },
];

export const courseStats = {
  modules: 24,
  lessons: modules.reduce((a, m) => a + m.lessons.length, 0),
  hours: 56,
  downloads: 40,
};
