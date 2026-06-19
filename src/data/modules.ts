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
  deepDive?: string[];
  checklist?: string[];
  caseStudy?: string;
  screens?: { src: string; tela: string; panel: string; tool: string; caption: string }[];
  paramDetails?: {
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
  }[];

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
    id: "interface-completa", number: 1, title: "Interface Completa: Prepare, Preview e Device",
    tagline: "Domine a interface do OrcaSlicer com fluência",
    level: "Iniciante", duration: "1h 00min",
    methodology: "Tour guiado pelas três zonas (Prepare, Preview, Device) com foco em ferramentas de manipulação 3D, barra superior e edição avançada (corte, pintura, modifiers).",
    objective: "Ao final, o aluno navega com fluência pelo software, importa modelos, posiciona-os, fatia e envia para impressão.",
    lessons: [
      L(1, "prepare-workspace", "Aula 1.1 — Prepare: Central Workspace", "15min",
        ["Importação", "Posicionamento", "Perfis", "Fatiar Placa"], {
          theory: [
            "A aba PREPARAR é o centro de operações do OrcaSlicer: importa modelos 3D, posiciona na mesa virtual, ajusta orientação/escala e configura todos os parâmetros de fatiamento.",
            "Centraliza qualidade, resistência, velocidade, suportes e multimaterial — é o ponto de partida obrigatório de qualquer impressão.",
            "Analogia: é a bancada/cozinha onde você separa, corta e tempera os ingredientes (modelos) antes de cozinhar (fatiar).",
          ],
          paramDetails: [{
            name: "Aba Preparar", value: "Workspace principal",
            whatIs: "Tela inicial onde modelos são importados, posicionados na mesa virtual e configurados antes do fatiamento.",
            whyAdjust: "Um bom posicionamento e perfil escolhido resolvem ~50% dos problemas de impressão antes mesmo do G-code.",
            optionsTable: { headers: ["Área", "Função", "Descrição"], rows: [
              ["Barra Superior", "Comandos principais", "Importar, Adicionar Placa, Fatiar, Salvar"],
              ["Mesa Virtual", "Visualização 3D", "Mostra o modelo na placa de impressão"],
              ["Painel Esquerdo", "Configurações", "Qualidade, Resistência, Velocidade, Suporte, Multimaterial, Outros"],
              ["Painel Direito", "Info do objeto", "Nome, volume, peso, tempo estimado"],
              ["Barra Inferior", "Visualização", "Zoom, rotação, ajuste de câmera"],
            ]},
            influences: "Posicionamento, escolha do perfil e orientação determinam adesão, suportes, anisotropia e tempo.",
            influencesList: [
              "Posicionamento → suportes necessários, anisotropia, tempo",
              "Perfil escolhido → qualidade final, tempo e consumo",
              "Orientação → adesão à mesa, suportes, resistência",
            ],
            generates: "Define se a peça gruda bem, exige menos suportes e é estruturalmente forte — ou se descola e deforma.",
            generatesTable: { headers: ["Ação", "Resultado", "Quando Usar"], rows: [
              ["Posicionar centralizado", "Peça no centro da mesa", "Sempre"],
              ["Maior face na mesa", "Melhor adesão, menos suportes", "Sempre"],
              ["Salvar como .3mf", "Preserva todas as configurações", "Sempre"],
            ]},
            howTo: [
              { step: "1", path: "Arquivo > Importar (ou arrastar)", desc: "Aceita .stl, .step, .3mf, .obj, .amf" },
              { step: "2", path: "Mouse / Mover (M)", desc: "Arraste o modelo; Shift move no eixo Z" },
              { step: "3", path: "Painel Esquerdo", desc: "Escolha perfis de impressora, filamento e processo" },
              { step: "4", path: "Fatiar Placa", desc: "Canto superior direito → gera G-code e leva para Preview" },
            ],
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Modelo não aparece", "Importação falhou", "Verificar formato do arquivo"],
              ["Modelo flutuando", "Z=0 fora da mesa", "Usar Place on Face"],
              ["Não cabe na mesa", "Escala muito grande", "Escalar ou cortar o modelo"],
              ["Configurações perdidas", "Salvou como STL", "Sempre salvar como .3mf"],
            ]},
            goldenRule: "Antes de configurar qualquer parâmetro térmico, posicione corretamente o modelo. Bom posicionamento resolve 50% dos problemas.",
          }],
        }),
      L(2, "layout-barra-superior", "Aula 1.2 — Layout Geral e Barra Superior", "15min",
        ["Arquivo", "Adicionar Placa", "Fatiar Placa", "Indicadores"], {
          theory: [
            "A barra superior é o painel de controle: importação, gerenciamento de projeto, múltiplas placas, desfazer/refazer, seleção de perfis e fatiar.",
            "Analogia: painel principal de um avião — cada botão tem função específica e essencial.",
          ],
          paramDetails: [{
            name: "Barra Superior", value: "Centro de comando",
            whatIs: "Conjunto de botões e menus que controlam todo o projeto, da importação à exportação do G-code.",
            whyAdjust: "Conhecer cada botão acelera o fluxo e evita perda de configurações.",
            optionsTable: { headers: ["Botão", "Função", "Descrição"], rows: [
              ["Arquivo", "Projeto", "Novo, Abrir, Salvar, Importar, Exportar"],
              ["Adicionar Placa", "Múltiplas mesas", "Adiciona uma nova mesa de impressão"],
              ["Importar", "Modelos", "STL, STEP, 3MF, OBJ, AMF"],
              ["Desfazer/Refazer", "Correção", "Desfaz/refaz a última ação"],
              ["Fatiar Placa", "G-code", "Gera o G-code da placa atual"],
              ["Seleção de Perfis", "Configurações", "Impressora, Filamento, Processo"],
            ]},
            influences: "Menu Arquivo, múltiplas placas e indicadores de tempo/material organizam todo o fluxo de produção.",
            influencesList: [
              "Arquivo: Novo, Abrir, Importar, Salvar, Salvar como .3mf, Exportar G-code",
              "Adicionar Placa: organiza lotes complexos (cada placa independente)",
              "Indicadores (canto sup. direito): tempo estimado e consumo de filamento",
            ],
            generates: "Projetos organizados, configurações preservadas e estimativas confiáveis de tempo e custo.",
            howTo: [
              { step: "1", path: "Arquivo > Salvar como .3mf", desc: "Salva projeto preservando posicionamento e perfis" },
              { step: "2", path: "Adicionar Placa", desc: "Cria Placa 2, 3... cada uma com modelos e configurações próprias" },
              { step: "3", path: "Fatiar Placa", desc: "Configurar parâmetros → clicar → ver na aba Preview" },
              { step: "4", path: "Indicadores", desc: "Conferir tempo e gramas antes de imprimir" },
            ],
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Projeto perdido", "Salvou como STL", "Sempre .3mf"],
              ["Configurações sumiram", "Abriu STL em vez de .3mf", "Abrir sempre o .3mf"],
              ["Placas não aparecem", "Não adicionou", "Usar Adicionar Placa"],
              ["Tempo estimado errado", "Perfil incorreto", "Conferir velocidade e perfil"],
            ]},
            goldenRule: "Sempre salve como .3mf. Salvar como STL é perder todo o seu trabalho.",
          }],
        }),
      L(3, "visualizacao-3d", "Aula 1.3 — Visualização 3D: Mover, Escalar e Rotacionar", "15min",
        ["Mover (M)", "Escalar (S)", "Rotacionar (R)", "Place on Face"], {
          theory: [
            "As três ferramentas centrais de manipulação são Mover (M), Escalar (S) e Rotacionar (R), acessíveis por atalho de teclado.",
            "Place on Face automatiza o assentamento da maior face plana contra a mesa, melhorando adesão e reduzindo suportes.",
            "Analogia: montar quebra-cabeça — mover, ajustar tamanho e girar peças até encaixar perfeitamente.",
          ],
          paramDetails: [{
            name: "Mover / Escalar / Rotacionar", value: "Atalhos M / S / R",
            whatIs: "Ferramentas de manipulação 3D do modelo na mesa de impressão virtual.",
            whyAdjust: "Posicionamento, tamanho e orientação corretos garantem adesão, resistência e mínimo de suportes.",
            optionsTable: { headers: ["Ferramenta", "Atalho", "Função"], rows: [
              ["Mover", "M", "Posiciona arrastando setas X/Y/Z ou por coordenadas"],
              ["Escalar", "S", "Ajusta tamanho — cadeado uniforme preserva proporções"],
              ["Rotacionar", "R", "Gira nos eixos X/Y/Z; inclui Place on Face"],
              ["Place on Face", "R + clique na face", "Assenta a face escolhida diretamente na mesa"],
            ]},
            influences: "Modificadores de teclado, cadeado de proporção e Place on Face afetam precisão e orientação.",
            influencesList: [
              "Shift + arrastar → movimento no eixo Z (altura)",
              "Ctrl + arrastar → movimento em passos precisos",
              "Cadeado uniforme ativo → escala proporcional X/Y/Z",
              "Cadeado desativado → escala por eixo (pode deformar)",
              "Ctrl + R → reseta rotação",
            ],
            generates: "Decide entre peça centralizada e bem aderida ou deformada, flutuante e cheia de suportes.",
            howTo: [
              { step: "1", path: "Selecionar modelo", desc: "Clicar uma vez sobre a peça" },
              { step: "2", path: "M / S / R", desc: "Ativar a ferramenta desejada" },
              { step: "3", path: "Painel Direito", desc: "Digitar valores exatos quando necessário" },
              { step: "4", path: "R > Place on Face", desc: "Clicar na maior face plana para assentar na mesa" },
            ],
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Peça deformada", "Escalou sem cadeado uniforme", "Ativar cadeado uniforme"],
              ["Suportes desnecessários", "Orientação ruim", "Usar Place on Face"],
              ["Não cabe na mesa", "Escala grande", "Reduzir escala"],
              ["Peça flutuante", "Não assentou", "Usar Place on Face"],
            ]},
            goldenRule: "Antes de qualquer parâmetro térmico, use Place on Face para assentar a maior face na mesa.",
          }],
        }),
      L(4, "ferramentas-avancadas", "Aula 1.4 — Ferramentas Avançadas: Corte, Pintura e Modificadores", "15min",
        ["Cut", "Seam Painting", "Support Painting", "Modifier Mesh"], {
          theory: [
            "Ferramentas avançadas permitem dividir, pintar e personalizar regiões específicas do modelo: Corte, Pintura de Costura, Pintura de Suporte e Modificador de Malha.",
            "Analogia: escultor — corta peças grandes, marca onde fica a cicatriz e onde quer mais material/suporte.",
          ],
          paramDetails: [{
            name: "Edição Avançada", value: "Cut / Seam / Support / Modifier",
            whatIs: "Conjunto de ferramentas para dividir modelos, controlar costura, controlar suportes e aplicar configurações por região.",
            whyAdjust: "Permite impressões que cabem na mesa, com costura escondida, suportes mínimos e regiões com configurações específicas.",
            optionsTable: { headers: ["Ferramenta", "Função", "Cores / Opções"], rows: [
              ["Corte (Cut)", "Divide o modelo em planos", "Pinos e encaixes opcionais"],
              ["Pintura de Costura", "Define onde a cicatriz fica", "Vermelho bloqueia • Azul força"],
              ["Pintura de Suporte", "Controla suportes locais", "Azul força • Vermelho bloqueia"],
              ["Modificador de Malha", "Configurações por região", "Cubo, cilindro ou esfera"],
            ]},
            influences: "Tamanho da peça, posição da costura, regiões com overhang e áreas funcionais determinam quando usar cada ferramenta.",
            influencesList: [
              "Cut: peças maiores que a mesa ou divididas para montagem",
              "Seam: superfícies lisas visíveis devem bloquear (vermelho)",
              "Support: furos e roscas devem bloquear (vermelho); overhangs >45° devem forçar (azul)",
              "Modifier: paredes extras em áreas de carga, infill reduzido em áreas decorativas",
            ],
            generates: "Peças maiores impressas em partes, costuras invisíveis, suportes mínimos e regiões reforçadas.",
            howTo: [
              { step: "1", path: "Cortar (ícone faca)", desc: "Escolher plano + ativar pinos/encaixes" },
              { step: "2", path: "Pintar Costura", desc: "Vermelho em superfícies lisas, azul em cantos ocultos" },
              { step: "3", path: "Pintar Suporte", desc: "Azul em overhangs, vermelho em furos/roscas" },
              { step: "4", path: "Adicionar Modificador", desc: "Escolher forma → posicionar → aplicar parâmetros locais" },
            ],
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Suportes em furos internos", "Não bloqueou", "Pintura de Suporte (vermelho)"],
              ["Costura visível", "Não escondeu", "Pintura de Costura (vermelho)"],
              ["Peça não cabe", "Não cortou", "Usar Cut"],
              ["Toda peça com mesmo parâmetro", "Sem modifier", "Usar Modifier Mesh"],
            ]},
            goldenRule: "Combine Pintura de Suportes com Tree Organic para suportes mínimos, fáceis de remover e sem marcas.",
            summaryTable: { title: "Resumo do Módulo 1", headers: ["Aula", "Tópico", "Aprendizados"], rows: [
              ["1.1", "Prepare", "Importar, posicionar, perfis, fatiar"],
              ["1.2", "Barra Superior", "Arquivo, Add Plate, Fatiar, indicadores"],
              ["1.3", "Visualização 3D", "M, S, R, Place on Face"],
              ["1.4", "Avançadas", "Cut, Seam, Support, Modifier"],
            ]},
          }],
        }),
    ],
  },

  {
    id: "config-impressora", number: 2, title: "Configurações da Impressora: O Perfil que Descreve Sua Máquina",
    tagline: "Crie um perfil preciso para sua impressora",
    level: "Iniciante", duration: "1h 30min",
    methodology: "Configuração passo a passo do perfil de máquina em 3 aulas: Perfil Geral, Machine Limits e Extruder.",
    objective: "Ao final, o aluno terá um perfil personalizado e preciso para sua impressora, entendendo cada parâmetro e seu impacto.",
    lessons: [
      L(1, "perfil-geral", "Aula 2.1 — Perfil Geral da Impressora", "25min",
        ["General", "Machine Limits", "Extruder", "Firmware"], {
          theory: [
            "O Perfil da Impressora é o arquivo de configuração que define as características físicas e eletrônicas da sua máquina dentro do OrcaSlicer: dimensões, firmware, limites de movimento e sistema de extrusão.",
            "Um perfil incorreto pode causar colisões, subextrusão e falhas catastróficas — é a fundação sobre a qual todos os outros perfis (filamento, processo) são construídos.",
            "Analogia: o perfil é o manual do proprietário do seu carro — sem ele você não sabe o que a máquina pode ou não fazer.",
          ],
          paramDetails: [{
            name: "Perfil da Impressora", value: "Personalizado por máquina",
            whatIs: "Arquivo de configuração que descreve dimensões, firmware, limites e extrusão da impressora para o OrcaSlicer gerar G-code compatível.",
            whyAdjust: "Define os limites que o fatiador nunca pode ultrapassar — é o que evita colisões, subextrusão e travamentos.",
            optionsTable: { headers: ["Área", "Função", "Descrição"], rows: [
              ["General", "Identificação e básico", "Nome, modelo, fabricante, firmware"],
              ["Machine Limits", "Limites físicos", "Mesa, altura Z, aceleração, jerk, velocidade máxima"],
              ["Extruder", "Sistema de extrusão", "Diâmetro do bico, tipo de extrusor, retração, fluxo"],
            ]},
            influences: "Firmware, tamanho da mesa e tipo de extrusor determinam compatibilidade do G-code e comportamento mecânico.",
            influencesList: [
              "Firmware: Marlin (Ender/Prusa/Anycubic), Klipper (Voron/Rat Rig, mais avançado), RepRap (legado)",
              "Tamanho da mesa: define área útil e impede peças fora da área",
              "Extrusor: Direct Drive (retração curta) vs Bowden (retração longa)",
            ],
            generates: "Define se a impressão é segura, confiável e compatível — ou se causa colisões e falhas.",
            integrationsTable: { headers: ["Parâmetro", "Relação", "Ajuste"], rows: [
              ["Perfil de Filamento", "Define temperatura e fluxo", "Independente do perfil da impressora"],
              ["Perfil de Processo", "Define qualidade e velocidade", "Sempre respeita os limites da máquina"],
              ["G-code", "Gerado com base no perfil", "Não é gerado sem perfil válido"],
            ]},
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Bico colide com a mesa", "Altura Z incorreta", "Verificar tamanho da mesa"],
              ["Peça não cabe na mesa", "Área de impressão errada", "Medir e corrigir a área"],
              ["Comandos não reconhecidos", "Firmware errado", "Selecionar firmware correto"],
              ["Impressora não conecta", "Host configurado errado", "Verificar host e porta"],
            ]},
            goldenRule: "Nunca use perfis genéricos. Crie um perfil específico para sua impressora e mantenha-o atualizado.",
          }],
        }),
      L(2, "machine-limits", "Aula 2.2 — Volume, Firmware e Limites da Máquina", "30min",
        ["Bed Shape", "Firmware", "Velocidade/Aceleração/Jerk"], {
          theory: [
            "Machine Limits define os limites físicos e eletrônicos da máquina: mesa, altura Z, aceleração, jerk, velocidade máxima e firmware. Esses limites são o teto que o fatiador nunca ultrapassa.",
            "Analogia: um estádio — o campo é fixo (mesa), as regras são fixas (firmware) e a velocidade dos jogadores é limitada (aceleração).",
          ],
          paramDetails: [{
            name: "Machine Limits", value: "Tetos físicos e elétricos",
            whatIs: "Conjunto de parâmetros que limita área útil, altura Z e cinemática da impressora para garantir G-code seguro.",
            whyAdjust: "Limites corretos evitam colisões e ghosting; limites incorretos são a causa nº 1 de falhas catastróficas.",
            optionsTable: { headers: ["Parâmetro", "Descrição", "Exemplo (Ender 3)"], rows: [
              ["Formato", "Retangular ou circular", "Retangular"],
              ["X (Largura)", "Área útil em mm", "220 mm"],
              ["Y (Profundidade)", "Área útil em mm", "220 mm"],
              ["Z (Altura)", "Altura útil em mm", "250 mm"],
              ["Velocidade Máxima", "mm/s", "300 mm/s"],
              ["Aceleração Máxima", "mm/s²", "3000 mm/s²"],
              ["Jerk Máximo", "mm/s", "20 mm/s"],
            ]},
            influences: "Firmware, limites cinemáticos e área da mesa moldam compatibilidade, qualidade e tamanho máximo.",
            influencesList: [
              "Marlin: mais comum, suporte universal — selecione se não souber",
              "Klipper: avançado, calibrações dinâmicas, Input Shaping nativo",
              "RepRap: legado, menos comum",
              "Aceleração alta → ghosting; baixa → impressão lenta",
              "Jerk alto → cantos arredondados; baixo → impressão lenta",
              "Área da mesa limita o tamanho máximo da peça",
            ],
            generates: "Define se a máquina trabalha rápida, suave e dentro dos seus limites mecânicos reais.",
            generatesTable: { headers: ["Configuração", "Resultado", "Quando Usar"], rows: [
              ["Limites altos", "Rápido, mas com vibração", "Impressoras robustas"],
              ["Limites baixos", "Lento, mas suave", "Impressoras leves"],
              ["Área correta", "Posicionamento confiável", "Sempre"],
              ["Área incorreta", "Não cabe ou colide", "Nunca"],
            ]},
            integrationsTable: { headers: ["Parâmetro", "Relação", "Ajuste"], rows: [
              ["Velocidade (Processo)", "Nunca pode exceder o limite", "Sempre respeitar"],
              ["Aceleração (Processo)", "Nunca pode exceder o limite", "Sempre respeitar"],
              ["Jerk (Processo)", "Nunca pode exceder o limite", "Sempre respeitar"],
            ]},
            howTo: [
              { step: "1", path: "Impressora > Perfil > Machine Limits", desc: "Abrir aba de limites" },
              { step: "2", path: "Formato / X / Y / Z", desc: "Medir área útil real, descontando clipes" },
              { step: "3", path: "Firmware", desc: "Marlin, Klipper ou RepRap (Marlin se em dúvida)" },
              { step: "4", path: "Velocidade / Aceleração / Jerk", desc: "Consultar manual do fabricante" },
              { step: "5", path: "Salvar perfil", desc: "Confirma todos os limites" },
            ],
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Bico colide com a mesa", "Z muito alto", "Reduzir Z"],
              ["Peça cortada", "X ou Y pequenos", "Aumentar X ou Y"],
              ["G-code não funciona", "Firmware errado", "Selecionar correto"],
              ["Impressão lenta", "Limites muito baixos", "Aumentar (se seguro)"],
            ]},
            goldenRule: "Configure limites com valores reais. Meça a área e consulte o manual — limites incorretos são a causa nº 1 de falhas catastróficas.",
          }],
        }),
      L(3, "bico-extrusor-fluxo", "Aula 2.3 — Bico, Extrusor e Configurações de Fluxo", "35min",
        ["Diâmetro do bico", "Direct vs Bowden", "Retração", "MVS"], {
          theory: [
            "A aba Extruder define o sistema de extrusão: diâmetro do bico, tipo de extrusor, parâmetros de retração, velocidade máxima do extrusor e limite de fluxo volumétrico (MVS).",
            "Analogia: pistola de cola quente — o bico define a espessura, o sistema empurra a cola, a retração é quando você solta o gatilho.",
          ],
          paramDetails: [{
            name: "Extruder (Bico, Tipo e Fluxo)", value: "Bico 0.4mm padrão",
            whatIs: "Conjunto de parâmetros do sistema de extrusão: bico, extrusor, retração e MVS.",
            whyAdjust: "Define largura real da linha, comportamento da retração e velocidade máxima útil sem subextrusão.",
            optionsTable: { headers: ["Diâmetro", "Uso", "Observação"], rows: [
              ["0.2 mm", "Detalhes finos, miniaturas", "Lento, fácil entupir"],
              ["0.4 mm", "Padrão", "Equilíbrio entre detalhe e velocidade"],
              ["0.6 mm", "Peças funcionais", "Mais rápido, menos detalhe"],
              ["0.8 mm", "Peças grandes, protótipos", "Muito rápido, pouco detalhe"],
            ]},
            influences: "Diâmetro do bico, tipo de extrusor e retração se combinam com material e temperatura.",
            influencesList: [
              "Camada entre 25% e 75% do diâmetro do bico",
              "Direct Drive: motor próximo ao bico — retração 0.5–2.0mm; ideal para TPU",
              "Bowden: motor no quadro com PTFE — retração 3.0–7.0mm; cabeçote leve",
              "Retração varia por material — calibre para cada filamento",
              "MVS: PLA 12–20 / PETG 8–15 / ABS 8–12 mm³/s (use 85% como margem)",
            ],
            generates: "Define se haverá fiapos, entupimentos ou subextrusão, e qual a velocidade segura real.",
            generatesTable: { headers: ["Configuração", "Resultado", "Quando Usar"], rows: [
              ["Bico 0.2mm", "Detalhes finos, lento", "Miniaturas"],
              ["Bico 0.4mm", "Equilíbrio", "Sempre"],
              ["Bico 0.6mm", "Rápido, menos detalhe", "Peças funcionais"],
              ["Direct Drive", "Retração curta, TPU", "Recomendado"],
              ["Bowden", "Leve, retração longa", "Impressoras econômicas"],
            ]},
            integrationsTable: { headers: ["Parâmetro", "Relação", "Ajuste"], rows: [
              ["Altura da camada", "25–75% do diâmetro do bico", "Ajustar conforme bico"],
              ["Largura da linha", "Baseada no diâmetro do bico", "Ajustar conforme bico"],
              ["Retração", "Depende do tipo de extrusor", "Calibrar por filamento"],
              ["MVS", "Teto físico do hotend", "Não exceder 85% do medido"],
            ]},
            howTo: [
              { step: "1", path: "Impressora > Perfil > Extruder", desc: "Abrir aba do extrusor" },
              { step: "2", path: "Diâmetro do Bico", desc: "0.4mm como padrão" },
              { step: "3", path: "Tipo de Extrusor", desc: "Direct Drive ou Bowden" },
              { step: "4", path: "Retração", desc: "Direct 0.8mm @ 40 mm/s • Bowden 4.0mm @ 50 mm/s" },
              { step: "5", path: "Extra Prime / MVS", desc: "0mm de prime, MVS conforme calibração" },
              { step: "6", path: "Salvar", desc: "Persistir o perfil" },
            ],
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Subextrusão", "Bico desgastado ou MVS alto", "Trocar bico ou reduzir MVS"],
              ["Fiapos", "Retração incorreta", "Calibrar retração"],
              ["Entupimento", "Retração longa ou heat creep", "Reduzir retração ou melhorar cooling"],
              ["TPU falha", "Bowden em TPU", "Usar Direct Drive"],
            ]},
            goldenRule: "Use bicos de aço endurecido para filamentos abrasivos (CF, GF, madeira, glow). Bronze se desgasta rápido.",
            summaryTable: { title: "Resumo do Módulo 2", headers: ["Aula", "Tópico", "Aprendizados"], rows: [
              ["2.1", "Perfil Geral", "Identificação, firmware, básico"],
              ["2.2", "Machine Limits", "Mesa, altura Z, cinemática"],
              ["2.3", "Extruder", "Bico, tipo, retração, MVS"],
            ]},
          }],
        }),
    ],
  },


  {
    id: "config-processo", number: 3, title: "Configurações de Processo: Qualidade",
    tagline: "Domine altura, largura, costura e precisão",
    level: "Iniciante", duration: "2h 00min",
    methodology: "Quatro aulas sobre os pilares da qualidade: altura da camada, largura da linha, costura e precisão/alisamento.",
    objective: "Configurar resolução, acabamento e precisão dimensional para obter peças com a qualidade desejada.",
    lessons: [
      L(1, "altura-camada", "Aula 3.1 — Altura da Camada", "30min",
        ["Layer Height", "First Layer", "Adaptive"], {
          theory: [
            "Altura da camada é a espessura vertical de cada fatia depositada — define resolução vertical, tempo, resistência e qualidade de curvas.",
            "Analogia: escultura em fatias de papel — fatias finas dão mais detalhe e tempo; grossas, menos detalhe e mais rapidez.",
          ],
          paramDetails: [{
            name: "Altura da Camada", value: "0.20mm padrão (25–75% do bico)",
            whatIs: "Espessura vertical de cada fatia que o bico deposita; é a distância que Z sobe a cada camada.",
            whyAdjust: "Equilibrar detalhe vs tempo: quanto menor, mais detalhe e mais lento; quanto maior, mais rápido e com degraus.",
            optionsTable: { headers: ["Valor", "Uso", "Tempo (rel.)", "Qualidade"], rows: [
              ["0.08mm", "Ultra detalhe", "4x", "Excelente"],
              ["0.12mm", "Alta qualidade", "2x", "Muito boa"],
              ["0.16mm", "Qualidade", "1.6x", "Boa"],
              ["0.20mm", "Padrão", "1x", "Regular"],
              ["0.24mm", "Rápido", "0.8x", "Aceitável"],
              ["0.28mm", "Ultra rápido", "0.6x", "Baixa"],
              ["0.32mm", "Extrema velocidade", "0.5x", "Muito baixa"],
            ]},
            influences: "Bico, material, detalhes da peça, tempo e adesão entre camadas.",
            influencesList: [
              "Bico 0.4mm: 0.08–0.32mm | Bico 0.6mm: 0.12–0.48mm",
              "Regra: 25–75% do diâmetro do bico",
              "PLA aceita 0.08mm; PETG prefere ≥ 0.16mm",
              "Textos/curvas: camada fina (0.12mm); paredes retas: grossa (0.28mm)",
              "Dobrar a camada ≈ metade do tempo",
              "Camadas finas → mais adesão entre camadas (mais resistência Z)",
            ],
            generates: "Define resolução visual, tempo total e resistência mecânica na direção Z.",
            generatesTable: { headers: ["Camada", "Resultado", "Quando Usar"], rows: [
              ["Fina (0.12mm)", "Superfície lisa, detalhes nítidos", "Miniaturas, esculturas, textos"],
              ["Média (0.20mm)", "Equilíbrio qualidade/tempo", "Funcional, protótipos"],
              ["Grossa (0.28mm)", "Linhas visíveis, degraus", "Peças grandes, testes"],
            ]},
            integrationsTable: { headers: ["Parâmetro", "Relação", "Ajuste"], rows: [
              ["Velocidade", "Finas pedem velocidade menor", "−20–30% para 0.12mm"],
              ["Temperatura", "Finas precisam de mais calor", "+5°C para 0.12mm"],
              ["Fluxo", "Finas são mais sensíveis", "Calibrar antes de 0.12mm"],
              ["Fan", "Finas precisam de mais cooling", "+10–20%"],
              ["Largura da linha", "Deve ser 2–4× a camada", "Aumentar para camadas grossas"],
            ]},
            howTo: [
              { step: "1", path: "Prepare > Qualidade > Altura da camada", desc: "Abrir o campo Altura da camada" },
              { step: "2", path: "Valor", desc: "Digitar (ex.: 0.20mm) — tempo recalcula" },
              { step: "3", path: "Presets", desc: "0.12 Fine • 0.16 Optimal • 0.20 Standard • 0.24 Draft • 0.28 Extra Draft" },
              { step: "4", path: "Primeira camada", desc: "100–150% da normal (ex.: 0.24–0.30mm) para adesão" },
              { step: "5", path: "Adaptive Layer Height", desc: "Ativar variação (ex.: 0.08–0.20mm) para otimizar" },
            ],
            example: { piece: "Miniatura D&D 28mm", config: "Bico 0.4mm + 0.08mm", result: "Detalhes nítidos; 3h vs 1.5h em 0.20mm" },
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Linhas não se tocam", "Camada muito grossa", "Reduzir para ≤75% do bico"],
              ["Plástico não sai", "Camada muito fina", "Aumentar para ≥25% do bico"],
              ["Superfície com degraus", "Camada grossa", "Reduzir ou usar Adaptive"],
              ["Quebra entre camadas", "Camada grossa", "Reduzir ou aumentar T°"],
              ["Tempo alto", "Camada fina demais", "Subir para 0.20mm"],
            ]},
            goldenRule: "Para bico 0.4mm: 0.12mm = detalhe, 0.20mm = padrão, 0.28mm = rapidez.",
            summaryTable: { title: "Decisão Rápida", headers: ["Peça", "0.4mm", "0.6mm", "0.8mm"], rows: [
              ["Miniatura/Detalhe", "0.08–0.12", "—", "—"],
              ["Funcional/Estética", "0.16–0.20", "0.24–0.30", "0.32–0.40"],
              ["Protótipo/Rápido", "0.24–0.28", "0.36–0.42", "0.48–0.56"],
              ["Estrutural/Grande", "0.28–0.32", "0.42–0.48", "0.56–0.64"],
            ]},
          }],
        }),
      L(2, "largura-linha", "Aula 3.2 — Largura da Linha", "30min",
        ["Largura padrão", "Paredes", "Infill", "Ponte"], {
          theory: [
            "Largura da linha é a 'pista' que o filamento deixa — normalmente um pouco maior que o bico (105% padrão). O plástico se expande ao sair.",
            "Analogia: pincel — traço fino para detalhes, traço grosso para cobrir rápido.",
          ],
          paramDetails: [{
            name: "Largura da Linha", value: "0.42mm para bico 0.4mm (100–150% do bico)",
            whatIs: "Espessura horizontal de cada linha depositada; define paredes, adesão e qualidade.",
            whyAdjust: "Equilibra detalhe, resistência e tempo. Diferente por região (parede externa, interna, infill, ponte).",
            optionsTable: { headers: ["Parâmetro", "Função", "Padrão"], rows: [
              ["Padrão", "Largura base de extrusão", "0.42mm"],
              ["Primeira camada", "Largura na 1ª camada", "0.50mm"],
              ["Parede externa", "Superfície visível", "0.42mm"],
              ["Parede interna", "Estrutura interna", "0.45mm"],
              ["Infill esparso", "Preenchimento", "0.45mm"],
              ["Superfície superior", "Topo", "0.42mm"],
              ["Suporte", "Estruturas de suporte", "0.42mm"],
              ["Ponte", "Pontes em vão", "85–100%"],
            ]},
            influences: "Bico, material, tipo de peça e altura da camada definem a largura ideal.",
            influencesList: [
              "Largura = 100–150% do bico (0.40–0.60mm em 0.4mm)",
              "PLA aceita 120%; PETG 100–110%; ABS um pouco maior",
              "Largura deve ser 2–4× a altura da camada",
              "Parede externa fina (0.38–0.42mm) + lenta = melhor acabamento",
              "Ponte: 85–95% + velocidade 30–50 mm/s + fan 100% + flow 0.90–0.95",
              "Infill pode ser mais grosso (0.45–0.50mm) para economizar tempo",
            ],
            generates: "Define se paredes terão lacunas/excesso, se pontes atravessam vãos e se o topo fica liso.",
            integrationsTable: { headers: ["Parâmetro", "Relação", "Ajuste"], rows: [
              ["Altura de camada", "Largura 2–4× a camada", "Aumentar com camada grossa"],
              ["Velocidade de parede externa", "Mais lenta + fina = melhor acabamento", "40–60 mm/s"],
              ["Bridge Flow Ratio", "Ajusta ponte", "0.90–0.95"],
              ["Cooling Fan (ponte)", "Solidifica a ponte", "100%"],
            ]},
            howTo: [
              { step: "1", path: "Prepare > Qualidade > Largura da linha", desc: "Abrir a seção" },
              { step: "2", path: "Padrão", desc: "0.42mm para bico 0.4mm" },
              { step: "3", path: "Parede externa", desc: "Reduzir para 0.38–0.40mm em peças estéticas" },
              { step: "4", path: "Infill", desc: "Aumentar para 0.45–0.50mm" },
              { step: "5", path: "Ponte", desc: "85–95% + fan 100% + 30–50 mm/s" },
            ],
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Paredes com lacunas", "Largura baixa", "Aumentar largura"],
              ["Paredes com excesso", "Largura alta", "Reduzir largura"],
              ["Detalhes finos perdidos", "Parede externa grossa", "Reduzir para 0.35–0.38mm"],
              ["Ponte caída", "Largura/fluxo alto", "Reduzir para 85% + fan 100%"],
            ]},
            goldenRule: "Use 100–120% do bico como largura padrão (0.42mm em bico 0.4mm).",
            summaryTable: { title: "Decisão Rápida", headers: ["Uso", "0.4mm", "0.6mm", "0.8mm"], rows: [
              ["Detalhe fino", "0.35", "—", "—"],
              ["Uso geral", "0.42", "0.60", "0.80"],
              ["Estrutural", "0.50", "0.75", "1.00"],
              ["Protótipo", "0.60", "0.90", "1.20"],
            ]},
          }],
        }),
      L(3, "costura-seam", "Aula 3.3 — Costura (Seam)", "30min",
        ["Aligned/Rear/Nearest/Random", "Scarf Seam", "Seam Painting"], {
          theory: [
            "Costura é o ponto onde cada perímetro externo começa/termina — sempre forma uma micro-cicatriz.",
            "O objetivo é esconder essa cicatriz, escolhendo posição (Aligned/Rear/Nearest/Random), aplicando Scarf Seam ou pintando manualmente.",
          ],
          paramDetails: [{
            name: "Posição da Costura", value: "Aligned (padrão poligonal)",
            whatIs: "Configuração que define onde a costura/cicatriz da impressão aparece em cada camada.",
            whyAdjust: "Esconder a cicatriz em pontos não visíveis (cantos, traseira, distribuídos).",
            optionsTable: { headers: ["Tipo", "O que faz", "Melhor para"], rows: [
              ["Aligned", "Empilha no canto mais oculto", "Peças poligonais (caixas)"],
              ["Rear", "Posiciona na traseira", "Bustos, estátuas"],
              ["Nearest", "Ponto mais próximo", "Peças técnicas (tempo)"],
              ["Random", "Distribui aleatoriamente", "Cilindros, vasos"],
            ]},
            influences: "Geometria da peça, orientação na mesa e necessidade estética.",
            influencesList: [
              "Cantos definidos → Aligned",
              "Frente visível → Rear",
              "Tempo importa, estética não → Nearest",
              "Peças redondas → Random",
              "Scarf Seam (45°/60°) sobrepõe pontas para transição suave (ideal em curvas)",
              "Seam Painting: vermelho bloqueia, azul força",
              "Wipe a 80%: limpa o blob na costura",
            ],
            generates: "Define se a peça tem linha vertical visível, pontos espalhados ou costura invisível.",
            howTo: [
              { step: "1", path: "Prepare > Qualidade > Costura", desc: "Abrir a seção" },
              { step: "2", path: "Posição da costura", desc: "Aligned, Rear, Nearest ou Random" },
              { step: "3", path: "Scarf Seam", desc: "45° (suave) ou 60° (agressivo) em peças redondas" },
              { step: "4", path: "Pintar Costura", desc: "Vermelho bloqueia em superfícies visíveis; azul força em cantos ocultos" },
              { step: "5", path: "Wipe", desc: "Ativar limpeza ~80% para reduzir blob" },
            ],
            example: { piece: "Vaso cilíndrico", config: "Random + Scarf 45°", result: "Sem linha vertical, pontos imperceptíveis" },
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Linha vertical visível", "Aligned em peça redonda", "Mudar para Random"],
              ["Pontos espalhados", "Random em peça poligonal", "Mudar para Aligned"],
              ["Costura na frente", "Orientação errada", "Reposicionar e usar Rear"],
            ]},
            goldenRule: "Cantos = Aligned. Redondos = Random. Frente definida = Rear. Esconda onde ninguém olha.",
            summaryTable: { headers: ["Peça", "Costura", "Motivo"], rows: [
              ["Caixa/poligonal", "Aligned", "Oculta no canto"],
              ["Cilindro/vaso", "Random", "Espalha pontos"],
              ["Busto/estátua", "Rear", "Oculta atrás"],
              ["Técnica", "Nearest", "Otimiza tempo"],
            ]},
          }],
        }),
      L(4, "precisao-alisamento", "Aula 3.4 — Precisão e Alisamento", "30min",
        ["Compensações XY", "Pé de elefante", "Arc Fitting", "Ironing"], {
          theory: [
            "Parâmetros de precisão corrigem distorções dimensionais (furos menores, pé de elefante) e melhoram acabamento (Ironing, Arc Fitting).",
            "Analogia: marceneiro — precisão é a régua; alisamento é a lixa final.",
          ],
          paramDetails: [{
            name: "Precisão & Ironing", value: "Compensações + alisamento de topo",
            whatIs: "Conjunto de ajustes finos: compensação XY, pé de elefante, parede precisa, Arc Fitting e Ironing.",
            whyAdjust: "Garantir encaixes perfeitos, base correta e acabamento liso onde o olho percebe.",
            optionsTable: { headers: ["Parâmetro", "Função", "Padrão"], rows: [
              ["Raio fechamento de vãos", "Une linhas próximas", "0.049mm"],
              ["Resolução", "Detalhe da malha", "0.012mm"],
              ["Arc Fitting", "Converte segmentos em arcos", "Desativado"],
              ["Compensação furos XY", "Corrige diâmetro interno", "0mm"],
              ["Compensação contornos XY", "Corrige tamanho externo", "0mm"],
              ["Compensação pé de elefante", "Reduz alargamento da 1ª camada", "0.1mm"],
              ["Parede precisa", "Garante largura exata", "Desativado"],
            ]},
            influences: "Material, geometria, primeira camada e necessidade de acabamento.",
            influencesList: [
              "Furos sempre saem menores: PLA +0.05–0.10mm | PETG +0.08–0.15mm | ABS +0.10–0.20mm | Nylon +0.15–0.25mm",
              "Pé de elefante: 0.1mm padrão; até 0.3mm em casos extremos",
              "Arc Fitting reduz G-code em até 90% em peças com muitas curvas",
              "Ironing só em topos planos, com filamento seco — bolhas estragam",
              "Ironing: fluxo 15%, espaçamento 0.15mm, velocidade 20–30 mm/s",
            ],
            generates: "Determina se os encaixes funcionam, se a base é precisa e se o topo brilha.",
            howTo: [
              { step: "1", path: "Prepare > Qualidade > Precisão", desc: "Compensar furos e contornos por material" },
              { step: "2", path: "Compensação pé de elefante", desc: "0.1mm como padrão" },
              { step: "3", path: "Arc Fitting", desc: "Ativar em peças curvas; desativar em angulares" },
              { step: "4", path: "Qualidade > Alisamento (Ironing)", desc: "Top surfaces, fluxo 15%, esp. 0.15mm, 20–30 mm/s" },
              { step: "5", path: "Teste", desc: "Imprimir, medir com paquímetro e ajustar" },
            ],
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Parafuso solto", "Compensação insuficiente", "Aumentar compensação"],
              ["Parafuso não entra", "Compensação excessiva", "Reduzir compensação"],
              ["Base alargada", "Pé de elefante", "Compensação 0.1mm"],
              ["Topo áspero", "Ironing off", "Ativar Ironing"],
              ["Bolhas no Ironing", "Filamento úmido", "Secar filamento"],
            ]},
            goldenRule: "Precisão faz peças encaixarem. Compense furos, corrija pé de elefante e use Ironing para acabamento profissional.",
            summaryTable: { title: "Resumo do Módulo 3", headers: ["Aula", "Tópico", "Aprendizados"], rows: [
              ["3.1", "Altura da camada", "Layer Height, First Layer, Adaptive"],
              ["3.2", "Largura da linha", "Padrão, paredes, infill, ponte"],
              ["3.3", "Costura", "Posição, Scarf Seam, Pintura"],
              ["3.4", "Precisão & Ironing", "Compensações, Arc Fitting, Ironing"],
            ]},
          }],
        }),
    ],
  },


  {
    id: "materiais-filamentos", number: 4, title: "Materiais e Filamentos",
    tagline: "PLA, PETG, ABS, ASA, TPU e Nylon",
    level: "Intermediário", duration: "1h 30min",
    methodology: "Tabelas comparativas, perfis prontos por material, técnicas de armazenamento e secagem.",
    objective: "Dominar as principais famílias de filamentos, suas propriedades, aplicações e configuração no OrcaSlicer.",
    lessons: [
      L(1, "fundamentos-materiais", "Fundamentos dos Materiais", "30min",
        ["Propriedades dos polímeros", "Higroscopia", "Armazenamento", "Secagem", "Qualidade"], {
          theory: [
            "Os filamentos são o 'combustível' da impressão 3D FDM. Cada tipo tem propriedades químicas e físicas únicas que determinam temperatura de fusão (Tg), resistência, flexibilidade e aplicações ideais.",
            "Escolher o filamento certo é tão importante quanto configurar a impressora corretamente — papel não serve para parede, concreto não serve para cortina. Cada material tem seu lugar.",
            "Filamentos absorvem umidade do ar (higroscopia). Umidade causa estalos no bico, bolhas, fiapos, superfície áspera e peças frágeis. Cada material tem sensibilidade diferente — Nylon é o pior.",
            "Filamento barato sai caro: variação de diâmetro, umidade alta de fábrica e aditivos ruins resultam em falhas, entupimentos e tempo perdido. Marca confiável compensa.",
            "Analogia: filamento é como ingrediente na cozinha — qualidade do prato depende da qualidade da matéria-prima. Você não faz um bolo bom com farinha vencida.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "Cada novo filamento exige Temp Tower + Flow + PA dedicados — comportamento varia por lote." },
            { module: "Módulo 22 (Perfis)", text: "Salve perfis separados para cada marca/cor — comportamentos variam mesmo dentro do mesmo material." },
            { module: "Módulo 6 (Engenharia)", text: "Adesão Z varia muito entre materiais — PETG > PLA, Nylon > PETG." },
          ],
          params: [
            { param: "Temperatura de Fusão (Tg)", value: "Varia por material", action: "Define temperatura do bico" },
            { param: "Higroscopia", value: "Variável", action: "Define necessidade de secagem" },
            { param: "Tolerância de diâmetro", value: "±0.02mm ideal", action: "Garante extrusão uniforme" },
            { param: "Umidade armazenamento", value: "< 15% UR", action: "Recipiente hermético + sílica" },
            { param: "Densidade do filamento", value: "Varia por material", action: "Necessária para cálculo de Flow correto" },
          ],
          goldenRule: "Filamento seco é a base de uma boa impressão. Invista em um secador e mantenha seus filamentos em recipientes herméticos com sílica indicadora.",
          errors: [
            { error: "Estalos no bico durante extrusão", solution: "Filamento úmido — secar conforme tabela do material" },
            { error: "Superfície áspera com bolhas", solution: "Secar o filamento antes de imprimir" },
            { error: "Peças frágeis e quebradiças", solution: "Filamento absorveu umidade — secar (especialmente Nylon, PETG)" },
            { error: "Variação de diâmetro", solution: "Trocar por marca com tolerância ±0.02mm" },
            { error: "Entupimento recorrente", solution: "Filamento com aditivos ruins ou umidade — trocar marca + secar" },
          ],
          finance: "Filamento de qualidade reduz falhas em 50%+ e elimina entupimentos. R$ 20 a mais no spool economiza R$ 200 em retrabalho e tempo perdido.",
          exercise: [
            "Meça o diâmetro do filamento em 5 pontos com paquímetro",
            "Monte uma drybox com recipiente hermético + sílica indicadora + higrômetro",
            "Crie um perfil de filamento no OrcaSlicer (Gerenciar perfis → Novo)",
            "Anote densidade, diâmetro real, temperaturas e Flow Ratio calibrado",
          ],
          paramDetails: [{
            name: "Fundamentos do Filamento",
            value: "Propriedades + Armazenamento",
            whatIs: "Conjunto de propriedades físico-químicas (Tg, higroscopia, tolerância, densidade) que define como o material se comporta na impressão e no uso final.",
            whyAdjust: "Ignorar fundamentos = falhas previsíveis. Dominá-los = peças consistentes e profissionais.",
            types: [
              { label: "Higroscopia BAIXA", desc: "PLA — tolera ambiente normal por semanas" },
              { label: "Higroscopia MÉDIA", desc: "ABS, ASA — drybox recomendada" },
              { label: "Higroscopia ALTA", desc: "PETG, TPU — drybox obrigatória" },
              { label: "Higroscopia EXTREMA", desc: "Nylon, PC — secador ATIVO durante impressão" },
            ],
            influences: "Qualidade da extrusão, aparência da peça, resistência mecânica, durabilidade do hotend.",
            influencesList: [
              "Diâmetro fora de ±0.02mm → variação de Flow e qualidade",
              "Umidade > 15% → estalos, bolhas, peça frágil",
              "Temperatura errada → subextrusão ou queima",
              "Densidade errada no perfil → Flow incorreto",
              "Marca inconsistente → cada lote precisa recalibrar",
            ],
            generates: "Tabela de secagem por material — siga estritamente para garantir qualidade.",
            generatesTable: {
              headers: ["Material", "Temp. de Secagem", "Tempo", "Sensibilidade"],
              rows: [
                ["PLA", "40-50°C", "4-6h", "Baixa"],
                ["PETG", "60-70°C", "4-6h", "Média"],
                ["ABS", "70-80°C", "4-6h", "Média"],
                ["ASA", "70-80°C", "4-6h", "Média"],
                ["TPU", "70-80°C", "4-6h", "Alta"],
                ["Nylon", "80-90°C", "8-12h", "Extrema (secador ativo)"],
                ["PC", "80-90°C", "8-12h", "Extrema"],
              ],
            },
            optionsTable: {
              headers: ["Método de Secagem", "Eficiência", "Quando Usar"],
              rows: [
                ["Secador dedicado (Sunlu, Sovol)", "Excelente", "Padrão — recomendado"],
                ["Forno em baixa temperatura", "Boa", "Grandes quantidades"],
                ["Desidratador de alimentos", "Boa", "Alternativa econômica"],
                ["Sacos a vácuo + sílica", "Apenas manutenção", "Não seca, só conserva"],
              ],
            },
            integrationsTable: {
              headers: ["Aplicação", "Material Recomendado", "Motivo"],
              rows: [
                ["Protótipo visual", "PLA", "Fácil, barato, boa cor"],
                ["Funcional interno", "PETG", "Resistente, durável"],
                ["Externo/sol", "ASA", "Resistente UV"],
                ["Automotivo", "ABS/ASA", "Resistente calor"],
                ["Flexível", "TPU", "Elasticidade"],
                ["Engrenagem/mecânica", "Nylon+CF", "Resistência industrial"],
              ],
            },
            example: {
              piece: "Suporte de celular para carro (sol direto, 60°C dentro do veículo)",
              config: "ASA, drybox, secado 70°C/6h, perfil dedicado calibrado",
              result: "Resiste ao sol sem deformar nem amarelar; PLA derreteria em uma semana",
            },
            errorsTable: {
              headers: ["Sintoma", "Causa Provável", "Solução"],
              rows: [
                ["Estalos no bico", "Umidade evaporando", "Secar conforme tabela"],
                ["Superfície áspera/bolhas", "Filamento úmido", "Secar"],
                ["Peça quebradiça", "Umidade absorvida", "Secar + drybox durante impressão"],
                ["Variação de diâmetro", "Marca ruim", "Trocar por marca ±0.02mm"],
                ["Entupimento frequente", "Aditivos ruins ou umidade", "Trocar marca + secar"],
              ],
            },
            goldenRule: "Filamento seco é fundação. Sem isso, nenhum outro ajuste resolve.",
          }],
          checklist: [
            "Higrômetro digital dentro de cada drybox",
            "Sílica gel indicadora trocada a cada 30 dias",
            "Etiqueta na bobina: marca, material, cor, data de abertura",
            "Secador calibrado com termômetro independente",
            "PETG, TPU e Nylon nunca fora da drybox durante impressão",
            "Perfil dedicado por marca/cor com Flow e Temp calibrados",
          ],
        }),
      L(2, "pla-petg", "PLA e PETG — Características e Configuração", "30min",
        ["PLA rígido", "PETG tenaz", "Stringing", "Perfis OrcaSlicer"], {
          theory: [
            "PLA (Ácido Polilático): bioplástico derivado de amido de milho/cana, biodegradável em condições industriais, fácil de imprimir, baixa retração, ótimo acabamento visual. Frágil ao impacto e amolece em ~55-60°C — derrete dentro de carro fechado no sol.",
            "PETG (Polietileno Tereftalato Glicol): versão modificada do PET (mesmo das garrafas), equilíbrio entre resistência e facilidade. Resistente a impactos, químicos e calor (~80°C). Stringing crônico e adesão forte demais à mesa (pode arrancar PEI).",
            "PLA é ideal para decoração, miniaturas, protótipos visuais, brinquedos. PETG é ideal para peças funcionais internas, recipientes, suportes que exigem durabilidade.",
            "PETG é higroscópico — spool aberto >2 semanas começa a 'pipocar' no bico. Secar a 65°C por 4-6h resolve. PLA é mais tolerante mas também se beneficia de drybox.",
            "Analogia: PLA é o 'açúcar' da impressão 3D — fácil de trabalhar, doce no resultado, mas frágil. PETG é a 'farinha integral' — mais difícil mas mais nutritivo (funcional).",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "PETG exige Pressure Advance bem ajustado — PLA perdoa, PETG não." },
            { module: "Módulo 6 (Engenharia)", text: "Para peça funcional externa: PETG ou ASA. PLA é só protótipo." },
            { module: "Módulo 3 (Cooling)", text: "PLA aceita 100% fan; PETG só 30-60% (mais fan = warping)." },
          ],
          params: [
            { param: "PLA — Nozzle", value: "190-215°C (205 ideal)", action: "Fluidez ideal" },
            { param: "PLA — Mesa", value: "50-70°C (60 ideal)", action: "Adesão sem deformar" },
            { param: "PLA — Fan", value: "80-100%", action: "Resfriamento máximo" },
            { param: "PETG — Nozzle", value: "220-250°C (235-240)", action: "Fluidez do PETG" },
            { param: "PETG — Mesa", value: "70-85°C (80 ideal)", action: "Adesão estável" },
            { param: "PETG — Fan", value: "30-60%", action: "Moderado — evita warping" },
            { param: "Retração Direct (PLA)", value: "0.5-1.5mm", action: "Calibrar" },
            { param: "Retração Direct (PETG)", value: "1.0-2.0mm", action: "Calibrar contra stringing" },
            { param: "Retração Bowden", value: "+3-5mm sobre Direct", action: "Compensar comprimento do tubo" },
          ],
          goldenRule: "Use PLA para tudo que é visual e não exige resistência. Use PETG para peças funcionais que precisam de durabilidade. Cada um no seu lugar.",
          errors: [
            { error: "PETG arrancando pedaço de PEI ao remover", solution: "Aplicar cola/spray na mesa ou esperar esfriar até 40°C" },
            { error: "Stringing severo em PETG", solution: "Secar spool 6h a 65°C antes de mexer na retração" },
            { error: "PLA deformando em ambiente quente", solution: "Trocar para PETG ou ASA — PLA amolece a 60°C" },
            { error: "PETG colando no bico (blob)", solution: "Reduzir temperatura 5°C, aumentar Z-Offset" },
            { error: "PLA quebra fácil", solution: "É característica do PLA — trocar para PLA+ ou PETG" },
          ],
          economy: "Spool de PETG seco rende ~15% mais peças aprovadas vs spool úmido — secadora se paga em semanas em produção comercial.",
          exercise: [
            "Imprima Temp Tower em PLA (180-220°C) e PETG (220-250°C)",
            "Identifique faixa sem stringing visível em cada",
            "Crie perfil dedicado para cada marca no OrcaSlicer",
            "Teste destacar peça PETG fria vs morna em PEI",
          ],
          paramDetails: [{
            name: "PLA vs PETG",
            value: "Configurações comparativas",
            whatIs: "Dois filamentos universais da impressão 3D — PLA para visual/protótipo, PETG para funcional/durável.",
            whyAdjust: "Cada um exige perfil dedicado. Usar perfil de PLA com PETG = stringing e blobs. Usar perfil de PETG com PLA = subextrusão.",
            types: [
              { label: "PLA", desc: "Bioplástico, fácil, frágil ao impacto, amolece em 60°C" },
              { label: "PLA+", desc: "PLA modificado, mais resistente ao impacto, mesma facilidade" },
              { label: "PETG", desc: "Versão do PET, resistente, durável, stringing crônico" },
              { label: "PETG-CF", desc: "PETG com fibra de carbono, mais rígido, exige bico aço" },
            ],
            influences: "Qualidade visual, resistência mecânica, ambiente de uso, complexidade de impressão.",
            generates: "Configurações específicas por material — não intercambiáveis.",
            generatesTable: {
              headers: ["Parâmetro", "PLA", "PETG"],
              rows: [
                ["Nozzle", "190-215°C", "220-250°C"],
                ["Mesa", "50-70°C", "70-85°C"],
                ["Fan", "80-100%", "30-60%"],
                ["Velocidade", "50-100 mm/s", "40-80 mm/s"],
                ["Retração (Direct)", "0.5-1.5mm", "1.0-2.0mm"],
                ["Ambiente uso", "Interno frio", "Interno/externo morno"],
                ["Adesão mesa", "Fácil", "Forte demais (cuidado PEI)"],
              ],
            },
            optionsTable: {
              headers: ["Aspecto", "PLA", "PETG"],
              rows: [
                ["Facilidade", "Excelente", "Boa"],
                ["Resistência impacto", "Baixa", "Média-alta"],
                ["Resistência calor", "60°C", "80°C"],
                ["Flexibilidade", "Baixa", "Média"],
                ["Biodegradável", "Sim (industrial)", "Não"],
                ["Preço", "Baixo", "Médio"],
                ["Stringing", "Baixo", "Alto (precisa calibrar)"],
              ],
            },
            integrationsTable: {
              headers: ["Dica", "PLA", "PETG"],
              rows: [
                ["Adesão mesa", "Cola bastão, PEI", "Cola/spray para FACILITAR remoção"],
                ["Camadas finas", "0.12mm para detalhes", "0.16-0.20mm padrão"],
                ["Ambiente", "Evitar sol direto", "Evitar fan alto (warping)"],
                ["Z-Offset", "Padrão", "Ligeiramente maior que PLA"],
              ],
            },
            example: {
              piece: "Suporte de celular para escritório (PLA) vs Suporte para o carro (PETG)",
              config: "PLA: 205°C, mesa 60°C, fan 100%. PETG: 240°C, mesa 80°C, fan 50%",
              result: "PLA dura anos no escritório; PETG aguenta o calor do carro sem deformar",
            },
            errorsTable: {
              headers: ["Sintoma", "Causa", "Solução"],
              rows: [
                ["PETG arranca PEI", "Adesão forte demais", "Cola na mesa ou esperar esfriar a 40°C"],
                ["Stringing PETG", "Umidade", "Secar 6h a 65°C antes de mexer em retração"],
                ["PLA deforma no calor", "Tg ~60°C", "Trocar para PETG ou ASA"],
                ["Blob no bico (PETG)", "Temperatura alta ou Z baixo", "−5°C ou +Z-Offset"],
                ["PLA quebra fácil", "Característica do material", "PLA+ ou PETG"],
              ],
            },
            goldenRule: "PLA visual, PETG funcional. Perfil dedicado para cada um — não tente usar o mesmo.",
          }],
        }),
      L(3, "abs-asa-tpu-nylon", "ABS, ASA, TPU e Nylon — Materiais Técnicos", "30min",
        ["ABS/ASA enclosure", "TPU Direct Drive", "Nylon higroscópico", "Warping", "VOCs"], {
          theory: [
            "ABS (Acrilonitrila Butadieno Estireno): plástico de engenharia clássico, alta resistência ao impacto, ~100°C de resistência térmica, ótimo pós-processamento com vapor de acetona (acabamento liso). Warping severo, exige enclosure e ventilação ambiente (VOCs tóxicos — não inalar).",
            "ASA (Acrilonitrila Estireno Acrilato): versão do ABS com resistência UV adicionada — não amarela ao sol. Ideal para peças externas, automotivo, equipamentos ao ar livre. Mesma configuração do ABS.",
            "TPU (Poliuretano Termoplástico): flexível e elástico (Shore 85A-95A), excelente absorção de impacto e vibração. Exige Direct Drive OBRIGATÓRIO (Bowden = clog garantido), velocidade baixa (15-30 mm/s), retração mínima ou zero.",
            "Nylon (PA6, PA12, compostos com fibra de carbono): alta performance industrial, extremamente resistente e durável. MUITO higroscópico (secagem constante durante impressão), abrasivo (bico de aço endurecido obrigatório), warping alto.",
            "Cada um abre um nicho comercial diferente: ABS/ASA = automotivo e externo, TPU = vedações e pegadores, Nylon = peças industriais e engrenagens. Investimento em enclosure e bico aço retorna rápido.",
          ],
          integrations: [
            { module: "Módulo 3 (Cooling)", text: "ABS e ASA: fan 0-10%. Mais que isso = warping e delaminação." },
            { module: "Módulo 14 (Troubleshooting)", text: "Warping em ABS = problema de ambiente (enclosure aberto, AC ligado), não de perfil." },
            { module: "Módulo 23 (Hotend)", text: "Nylon-CF exige bico endurecido e hotend que aguente 290°C." },
            { module: "Módulo 9 (Comercial)", text: "Materiais técnicos abrem nichos com margem 3-5× maior que PLA." },
          ],
          params: [
            { param: "ABS — Nozzle", value: "230-260°C (240-250)", action: "Fluidez ideal" },
            { param: "ABS — Mesa", value: "100-110°C (105)", action: "Mantém acima da Tg" },
            { param: "ABS — Fan", value: "0-10%", action: "Mais que isso = warping" },
            { param: "ASA — Nozzle/Mesa", value: "240-260°C / 100-110°C", action: "Idêntico ao ABS" },
            { param: "TPU — Nozzle", value: "210-240°C (220-230)", action: "Temperatura moderada" },
            { param: "TPU — Velocidade", value: "15-30 mm/s", action: "Evita clog por compressão" },
            { param: "TPU — Retração", value: "0-0.5mm", action: "Mínima ou zero" },
            { param: "Nylon — Nozzle", value: "250-290°C (260-270)", action: "Alta temperatura" },
            { param: "Nylon — Mesa", value: "80-100°C", action: "Com adesivo PVA/cola" },
            { param: "Nylon — Bico", value: "Aço endurecido / rubi", action: "Obrigatório (abrasivo)" },
            { param: "Enclosure (ABS/ASA/Nylon)", value: "Obrigatório", action: "Sem ele, warping garantido" },
          ],
          goldenRule: "O filamento certo para a aplicação certa é a chave para peças duráveis. Materiais técnicos exigem infraestrutura (enclosure, bico aço, secador ativo) — sem isso, não tente.",
          errors: [
            { error: "Warping severo em ABS/ASA", solution: "Enclosure tampado + Brim 8mm + fan 0% + mesa pré-aquecida 10-15min" },
            { error: "TPU em Bowden — clog garantido", solution: "Usar Direct Drive ou trocar para PETG flexível" },
            { error: "Nylon com bolhas e baixa resistência", solution: "Secar 80-90°C por 8-12h, manter em secador ATIVO durante impressão" },
            { error: "ABS amarelando ao sol", solution: "Trocar para ASA — ABS não resiste a UV" },
            { error: "Bico desgastado com Nylon-CF", solution: "Bico de aço endurecido ou rubi" },
            { error: "VOCs causando dor de cabeça (ABS)", solution: "Ventilação ambiente, enclosure com filtro de carvão ativado" },
          ],
          finance: "Enclosure DIY com painéis ACM custa R$ 150-300 e habilita ABS/ASA/PC/Nylon — abre nicho de peças industriais e externas com margem 3-5× maior que PLA.",
          exercise: [
            "Seque um spool TPU 8h a 50°C e imprima chaveiro flexível a 20 mm/s",
            "Imprima caixa ABS 100mm de altura — com e sem enclosure, compare warping",
            "Crie perfil ASA para peça externa de teste",
            "Documente configurações ideais por filamento em tabela",
          ],
          paramDetails: [{
            name: "Materiais Técnicos",
            value: "ABS / ASA / TPU / Nylon",
            whatIs: "Família de filamentos avançados que exigem infraestrutura específica (enclosure, Direct Drive, bico aço, secador ativo) mas entregam performance industrial.",
            whyAdjust: "Cada um abre um nicho de aplicação que PLA/PETG não cobrem — automotivo, externo, flexível, industrial.",
            types: [
              { label: "ABS", desc: "Clássico, vapor acetona, ~100°C, VOCs tóxicos, sem UV" },
              { label: "ASA", desc: "ABS com UV — externo/sol, automotivo, painéis" },
              { label: "TPU", desc: "Flexível Shore 85A-95A, vedações, pegadores, absorvedores" },
              { label: "Nylon", desc: "Industrial, engrenagens, alta resistência, MUITO higroscópico" },
            ],
            influences: "Equipamento necessário (enclosure, bico, secador), ambiente de impressão, segurança, nicho comercial atendido.",
            influencesList: [
              "Enclosure controla temperatura ambiente — sem ele, warping garantido em ABS/ASA/Nylon",
              "Direct Drive obrigatório para TPU — Bowden quase sempre dá clog",
              "Bico aço endurecido obrigatório para Nylon-CF — desgasta latão em horas",
              "Secador ATIVO durante impressão de Nylon — não basta secar antes",
              "Ventilação para VOCs do ABS — não inalar continuamente",
            ],
            generates: "Configurações específicas por material — não há perfil universal.",
            generatesTable: {
              headers: ["Material", "Nozzle", "Mesa", "Fan", "Enclosure", "Bico"],
              rows: [
                ["ABS", "240-250°C", "100-110°C", "0-10%", "Obrigatório", "Latão"],
                ["ASA", "240-260°C", "100-110°C", "0-10%", "Obrigatório", "Latão"],
                ["TPU", "220-230°C", "50-60°C", "30-50%", "Opcional", "Latão"],
                ["Nylon (puro)", "250-270°C", "80-100°C", "0-30%", "Obrigatório", "Aço"],
                ["Nylon-CF", "260-290°C", "80-100°C", "0-30%", "Obrigatório", "Aço/Rubi"],
              ],
            },
            optionsTable: {
              headers: ["Material", "Resist. Calor", "Flexibilidade", "Resist. UV", "Preço"],
              rows: [
                ["ABS", "~100°C", "Baixa", "Ruim (amarela)", "Médio"],
                ["ASA", "~100°C", "Baixa", "Excelente", "Médio-alto"],
                ["TPU", "~70°C", "Alta", "Boa", "Médio-alto"],
                ["Nylon", "~120°C", "Média", "Boa", "Alto"],
              ],
            },
            integrationsTable: {
              headers: ["Aplicação", "Material", "Por quê"],
              rows: [
                ["Painel externo / placa solar", "ASA", "Resiste UV sem amarelar"],
                ["Carcaça eletrônica industrial", "ABS", "Resistência + pós-acabamento acetona"],
                ["Vedação / pegador / chaveiro", "TPU", "Flexibilidade Shore"],
                ["Engrenagem industrial", "Nylon-CF", "Resistência ao desgaste"],
                ["Suporte automotivo motor", "ASA ou Nylon", "Calor + UV (ASA) ou carga (Nylon)"],
              ],
            },
            howTo: [
              { step: "Preparar enclosure", path: "Fechar tampa, deixar estabilizar", desc: "10-15min antes de iniciar (ABS/ASA/Nylon)" },
              { step: "Secar filamento", path: "Secador 6-12h", desc: "PETG 4h/65°, ABS 6h/75°, Nylon 12h/85°" },
              { step: "Trocar bico (Nylon-CF)", path: "Aço endurecido ou rubi", desc: "Latão desgasta em horas com CF" },
              { step: "Direct Drive (TPU)", path: "Verificar antes", desc: "Bowden = clog garantido" },
              { step: "Imprimir com manta", path: "Brim 8mm + cola/spray", desc: "Adesão extra para evitar warping" },
              { step: "Ventilação (ABS)", path: "Janela aberta ou exaustor", desc: "VOCs do ABS são tóxicos em exposição contínua" },
            ],
            example: {
              piece: "Suporte de painel solar externo (sol direto + vento)",
              config: "ASA, enclosure, 250°C/105°C, fan 5%, Brim 8mm, secado 6h",
              result: "Suporte que aguenta sol e intempérie por anos sem amarelar, deformar ou quebrar",
            },
            errorsTable: {
              headers: ["Sintoma", "Causa", "Solução"],
              rows: [
                ["Warping ABS/ASA", "Enclosure aberto ou frio", "Fechar + pré-aquecer 10-15min + Brim 8mm"],
                ["TPU entupindo", "Bowden ou velocidade alta", "Direct Drive + 15-30 mm/s + retração 0-0.5mm"],
                ["Nylon frágil/bolhas", "Umidade", "Secar 8-12h + secador ATIVO durante impressão"],
                ["ABS amarelando", "UV", "Trocar para ASA"],
                ["Bico desgastado rápido", "Filamento com fibra (CF)", "Bico de aço endurecido ou rubi"],
                ["Dor de cabeça imprimindo ABS", "VOCs", "Ventilar ambiente, filtro de carvão"],
              ],
            },
            summaryTable: {
              title: "Como escolher o material técnico",
              headers: ["Necessidade", "Material", "Equipamento Extra"],
              rows: [
                ["Ambiente quente > 60°C", "PETG / ABS / ASA", "Enclosure (ABS/ASA)"],
                ["Sol direto / UV", "ASA", "Enclosure"],
                ["Flexibilidade", "TPU", "Direct Drive"],
                ["Máxima resistência", "Nylon", "Enclosure + bico aço + secador"],
                ["Engrenagem mecânica", "Nylon-CF", "Enclosure + bico endurecido/rubi"],
                ["Automotivo motor", "ASA ou Nylon", "Enclosure"],
              ],
            },
            goldenRule: "Sem enclosure não tente ABS/ASA/Nylon. Sem Direct Drive não tente TPU. Sem bico aço não tente Nylon-CF. Infraestrutura é pré-requisito, não opcional.",
          }],
          checklist: [
            "Enclosure fechado e estabilizado antes de iniciar ABS/ASA/Nylon",
            "Ventilação ambiente adequada (VOCs do ABS são tóxicos)",
            "Bico de aço endurecido ou rubi instalado para Nylon-CF",
            "Direct Drive verificado antes de TPU",
            "Secador LIGADO durante toda impressão de Nylon",
            "Brim 8mm + cola/spray para warping crítico",
            "Filtro de carvão ativado no enclosure (ABS)",
          ],
        }),
    ],
  },

  {
    id: "calibracao-completa", number: 5, title: "Calibração Científica: O Protocolo de 8 Passos",
    tagline: "Protocolo rigoroso para impressões perfeitas e consistentes",
    level: "Intermediário", duration: "2h 00min",
    methodology: "Protocolo linear de 8 passos: Temperatura → MVS → Pressure Advance → Flow Rate → Retração → Cornering → Input Shaping → Tolerância. Cada passo apoia o seguinte; uma variável por vez.",
    objective: "Eliminar o 'achismo' com um protocolo científico passo a passo, obtendo um perfil de filamento calibrado e entendendo a interdependência entre cada parâmetro.",
    lessons: [
      L(1, "temperatura", "Passo 1 — Calibração de Temperatura", "20min",
        ["Torre de Temperatura", "Faixa por material", "Leitura visual"], {
          theory: [
            "A calibração de temperatura define a temperatura ideal do bico para o filamento específico. Cada filamento tem uma faixa recomendada, mas a ideal varia conforme impressora, velocidade e ambiente.",
            "Determina fluidez do plástico, adesão entre camadas, qualidade da superfície e formação de fiapos/bolhas.",
            "Analogia: derreter chocolate — pouco quente fica quebradiço, muito quente queima; no ponto certo fica liso e consistente.",
          ],
          paramDetails: [{
            name: "Temperatura do Bico", value: "195–270°C (depende do material)",
            whatIs: "Temperatura do hotend que define a fluidez do polímero derretido.",
            whyAdjust: "Cada combinação de material, velocidade e ventilação tem uma temperatura ótima — a menor que ainda produz uma impressão forte e sem defeitos.",
            optionsTable: { headers: ["Método", "Descrição", "Quando Usar"], rows: [
              ["Torre de Temperatura", "Impressão com degraus de temperatura", "Recomendado — mais preciso"],
              ["Teste de Ponte", "Avalia pontes em diferentes temperaturas", "Filamentos com foco em pontes"],
              ["Teste de Overhang", "Avalia saliências em diferentes temperaturas", "Peças com muitos overhangs"],
            ]},
            influences: "Material, velocidade, diâmetro do bico, ventilação e umidade do filamento.",
            influencesList: [
              "Material: PLA 195–210°C, PETG 230–240°C, ABS/ASA 245–255°C, Nylon 255–270°C",
              "Velocidade: +5°C para cada 50 mm/s adicionais",
              "Bico: 0.6mm +5°C; 0.8mm +5–10°C sobre o 0.4mm",
              "Ventilação: fan 100% pode exigir +5°C",
              "Umidade: filamento úmido causa estalos e bolhas — secar 4–6h",
            ],
            generates: "Define se a peça terá superfície lisa e adesão sólida, ou fiapos, bolhas e aspecto queimado.",
            generatesTable: { headers: ["Temperatura", "Resultado", "Quando Usar"], rows: [
              ["Muito baixa", "Subextrusão, má adesão, superfície áspera", "Nunca"],
              ["Ideal", "Superfície lisa, boa adesão, sem fiapos", "Sempre"],
              ["Muito alta", "Fiapos, bolhas, aspecto queimado", "Nunca"],
            ]},
            integrationsTable: { headers: ["Parâmetro", "Relação", "Ajuste"], rows: [
              ["Velocidade", "Mais rápido exige mais calor", "+5°C a cada 50 mm/s"],
              ["Flow Rate", "Temperatura alta pode pedir fluxo menor", "Ajustar após a temperatura"],
              ["Retração", "Calor demais aumenta fiapos", "Temperatura ideal minimiza"],
              ["Ventilação", "Fan alto resfria a extrusão", "+5°C se fan = 100%"],
            ]},
            howTo: [
              { step: "1", path: "Calibração > Temperatura", desc: "Abra a ferramenta de Temperature Tower" },
              { step: "2", path: "Inicial / Final / Incremento", desc: "Ex.: 190 → 230°C em passos de 5°C para PLA" },
              { step: "3", path: "Fatiar e imprimir", desc: "Imprima e inspecione cada degrau após resfriar" },
              { step: "4", path: "Perfil do filamento", desc: "Anote o melhor degrau e salve no perfil" },
            ],
            example: { piece: "Torre de PLA Genérico", config: "190 → 230°C, passo 5°C", result: "205°C escolhida: superfície excelente, sem fiapos ou bolhas" },
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Fiapos em todas as temperaturas", "Filamento úmido", "Secar 4–6h"],
              ["Superfície opaca", "Temperatura baixa", "Aumentar 5–10°C"],
              ["Bolhas na superfície", "Temperatura alta", "Reduzir 5–10°C"],
              ["Má adesão entre camadas", "Temperatura baixa", "Aumentar 5°C"],
              ["Queimado/descolorido", "Temperatura alta demais", "Reduzir 10°C"],
            ]},
            goldenRule: "A temperatura ideal é a MENOR que ainda produz uma impressão forte e sem defeitos.",
            summaryTable: { title: "Decisão Rápida", headers: ["Sintoma", "Ação"], rows: [
              ["Fiapos", "Reduzir 5°C"], ["Superfície áspera", "Aumentar 5°C"],
              ["Má adesão", "Aumentar 5°C"], ["Bolhas", "Reduzir 5–10°C"],
              ["Queimado", "Reduzir 10°C"], ["Subextrusão", "Aumentar 5–10°C"],
            ]},
          }],
        }),
      L(2, "mvs", "Passo 2 — Velocidade Volumétrica Máxima (MVS)", "20min",
        ["Limite térmico do hotend", "mm³/s", "Margem 85%"], {
          theory: [
            "MVS é o fluxo máximo de filamento (mm³/s) que o hotend consegue derreter antes de sofrer subextrusão. É o teto real de velocidade da máquina.",
            "Analogia: torneira — se você pedir mais água do que ela pode dar, sai fraca e irregular. Idem para filamento.",
          ],
          paramDetails: [{
            name: "Maximum Volumetric Speed", value: "5–25 mm³/s (depende do hotend)",
            whatIs: "Limite térmico de fluxo do hotend; impede subextrusão em alta velocidade.",
            whyAdjust: "Permite imprimir o mais rápido possível com segurança, sem falhas de extrusão.",
            optionsTable: { headers: ["Hotend", "MVS (mm³/s)", "Observação"], rows: [
              ["Padrão (Ender)", "8–12", "Bico 0.4mm"],
              ["Médio (Spider)", "12–18", "Bico 0.4mm"],
              ["Alto fluxo (Dragon, Volcano)", "18–25", "Bico 0.4mm"],
              ["Comercial (Bambu)", "20–32", "Bico 0.4mm"],
            ]},
            influences: "Tipo de hotend, material, temperatura e diâmetro do bico.",
            influencesList: [
              "PLA funde fácil (MVS alta); Nylon absorve calor lentamente (MVS baixa)",
              "Temperatura mais alta → MVS mais alta",
              "Bico 0.6mm: +20–30%; 0.8mm: +40–50%",
            ],
            generates: "Define se a impressão segura tolera velocidades altas ou se haverá lacunas e falhas.",
            generatesTable: { headers: ["Configuração", "Resultado", "Quando Usar"], rows: [
              ["MVS muito alta", "Subextrusão, falhas", "Nunca"],
              ["MVS ideal", "Extrusão consistente", "Sempre"],
              ["MVS muito baixa", "Velocidade limitada à toa", "Raramente"],
            ]},
            integrationsTable: { headers: ["Parâmetro", "Relação", "Ajuste"], rows: [
              ["Velocidade", "MVS limita a velocidade máxima real", "Não exceder MVS"],
              ["Temperatura", "Calor mais alto eleva o teto", "Calibrar T antes"],
              ["Largura/Altura da linha", "Mais material exige mais MVS", "Proporcional"],
            ]},
            howTo: [
              { step: "1", path: "Calibração > Volumetric Speed", desc: "Imprima o teste de linha crescente" },
              { step: "2", path: "Observação", desc: "Identifique o ponto onde começa a falhar" },
              { step: "3", path: "Cálculo", desc: "MVS_seguro = MVS_medido × 0.85" },
              { step: "4", path: "filament_max_volumetric_speed", desc: "Salvar no perfil do filamento" },
            ],
            example: { piece: "Teste MVS PLA a 205°C", config: "MVS medido = 18 mm³/s", result: "Definir 15 mm³/s (margem de segurança)" },
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Subextrusão em alta velocidade", "MVS alta", "Reduzir 20–30%"],
              ["Falhas em paredes finas", "MVS alta", "Reduzir MVS"],
              ["Velocidade limitada", "MVS baixa", "Aumentar 10–20%"],
            ]},
            goldenRule: "Use 85% do MVS medido — margem para variações de filamento e ambiente.",
            summaryTable: { title: "MVS Segura por Material", headers: ["Material", "MVS Típica", "MVS Segura"], rows: [
              ["PLA", "15–20", "12–17"], ["PETG", "10–15", "8–13"], ["ABS", "8–12", "7–10"],
              ["TPU", "5–8", "4–7"], ["Nylon", "6–12", "5–10"],
            ]},
          }],
        }),
      L(3, "pressure-advance", "Passo 3 — Pressure Advance", "20min",
        ["Compensação de pressão", "Cantos nítidos", "Direct vs Bowden"], {
          theory: [
            "PA compensa a inércia da pressão dentro do bico: sem ele, cantos incham (excesso) e linhas começam com falta de material.",
            "Analogia: cano com torneira — a água demora a chegar e continua saindo por inércia. PA antecipa essas variações.",
          ],
          paramDetails: [{
            name: "Pressure Advance", value: "0.02–1.2 (depende do extrusor)",
            whatIs: "Fator que antecipa/reduz o fluxo para compensar a inércia da pressão no hotend.",
            whyAdjust: "Elimina cantos arredondados e melhora precisão dimensional em mudanças de direção.",
            optionsTable: { headers: ["Método", "Descrição", "Quando Usar"], rows: [
              ["PA Line", "Linha única com PA variável", "Recomendado p/ Klipper"],
              ["PA Pattern", "Padrões com PAs diferentes", "Marlin"],
              ["PA Tower", "Torres com PAs diferentes", "Alternativa"],
            ]},
            influences: "Tipo de extrusor, material, temperatura e velocidade.",
            influencesList: [
              "Direct Drive: 0.02–0.15 | Bowden: 0.3–1.2",
              "PETG mais pegajoso → PA mais alto",
              "Temperatura alta → PA mais baixo",
              "Velocidade alta → PA mais alto",
            ],
            generates: "Define se cantos serão nítidos e dimensões precisas, ou inchados/afilados.",
            generatesTable: { headers: ["Configuração", "Resultado", "Quando Usar"], rows: [
              ["PA muito baixo", "Cantos arredondados, inchaço", "Nunca"],
              ["PA ideal", "Cantos nítidos e precisos", "Sempre"],
              ["PA muito alto", "Cantos afilados, subextrusão", "Nunca"],
            ]},
            integrationsTable: { headers: ["Parâmetro", "Relação", "Ajuste"], rows: [
              ["Temperatura", "Calibrar na T ideal", "Primeiro T, depois PA"],
              ["Flow Rate", "Fluxo deve estar correto antes", "Flow → PA"],
              ["Retração", "Trabalham juntos", "PA antes da retração"],
              ["Velocidade", "PA varia com velocidade", "Calibrar na velocidade de uso"],
            ]},
            howTo: [
              { step: "1", path: "Calibração > Pressure Advance", desc: "Escolher PA Line ou Pattern" },
              { step: "2", path: "Intervalo", desc: "Ex.: 0.00–0.12 (Direct) ou 0.3–1.0 (Bowden)" },
              { step: "3", path: "Análise", desc: "Localizar transição com cantos mais nítidos" },
              { step: "4", path: "pressure_advance", desc: "Salvar valor no perfil do filamento" },
            ],
            example: { piece: "PA Line PLA Direct", config: "Intervalo 0.00–0.12 a 205°C", result: "Melhor canto em PA = 0.045" },
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Cantos arredondados", "PA baixo", "Aumentar PA"],
              ["Cantos afilados/lacunas", "PA alto", "Reduzir PA"],
              ["Inchaço em mudanças de direção", "PA baixo", "Aumentar PA"],
            ]},
            goldenRule: "Calibre PA após Temperatura e Flow Rate — ele transforma cantos arredondados em cantos precisos.",
            summaryTable: { title: "PA Inicial por Extrusor", headers: ["Extrusor", "PA Inicial", "Faixa"], rows: [
              ["Direct Drive (alta qualidade)", "0.04", "0.02–0.08"],
              ["Direct Drive (stock)", "0.08", "0.05–0.15"],
              ["Bowden curto", "0.4", "0.3–0.6"],
              ["Bowden longo", "0.6", "0.5–1.2"],
              ["IDEX", "0.2", "0.1–0.5"],
            ]},
          }],
        }),
      L(4, "flow-rate", "Passo 4 — Flow Rate", "15min",
        ["Largura real da linha", "Passo grosso/fino", "Cubo de fluxo"], {
          theory: [
            "Flow Rate ajusta a quantidade de filamento extrudada para garantir a largura de linha correta. Pouco gera lacunas; muito gera excesso e imprecisão.",
            "Analogia: tubo de pasta de dente — a pressão certa entrega a quantidade exata.",
          ],
          paramDetails: [{
            name: "Flow Ratio", value: "0.90–1.05 (típico)",
            whatIs: "Multiplicador do volume extrudado para casar a largura real com a desejada.",
            whyAdjust: "Garante dimensões precisas, superfície superior lisa e sem excesso de material.",
            optionsTable: { headers: ["Método", "Descrição", "Quando Usar"], rows: [
              ["Passo Grosso", "Ajuste inicial rápido", "Sempre"],
              ["Passo Fino", "Refinamento centesimal", "Sempre"],
              ["Cubo de Fluxo", "Mede parede com paquímetro", "Alternativa"],
            ]},
            influences: "Material, temperatura, diâmetro real do filamento e E-Steps.",
            influencesList: [
              "PLA ~1.0 | PETG ~0.95 | TPU ~0.92",
              "Temperatura alta → Flow um pouco menor",
              "Filamento fino → Flow maior (compensa)",
              "E-Steps descalibrados são compensados pelo Flow (mas calibre antes)",
            ],
            generates: "Define se a superfície superior será lisa, com lacunas ou com excesso.",
            generatesTable: { headers: ["Configuração", "Resultado", "Quando Usar"], rows: [
              ["Flow baixo", "Lacunas, subextrusão", "Nunca"],
              ["Flow ideal", "Superfície lisa e dimensões precisas", "Sempre"],
              ["Flow alto", "Excesso, dimensões imprecisas", "Nunca"],
            ]},
            integrationsTable: { headers: ["Parâmetro", "Relação", "Ajuste"], rows: [
              ["E-Steps", "Flow compensa E-Steps", "Calibrar E-Steps antes"],
              ["Temperatura", "Pode mudar conforme T", "Calibrar na T ideal"],
              ["Pressure Advance", "PA depende do Flow", "Flow antes do PA"],
              ["Largura da linha", "Flow define a largura real", "Medir com paquímetro"],
            ]},
            howTo: [
              { step: "1", path: "Calibração > Flow Rate > Passo Grosso", desc: "Imprimir e escolher melhor face" },
              { step: "2", path: "Passo Fino", desc: "Refinar em incrementos de ~0.5%" },
              { step: "3", path: "Cubo (alternativa)", desc: "1 parede, 0% infill, medir e calcular" },
              { step: "4", path: "flow_ratio", desc: "Salvar no perfil do filamento" },
            ],
            example: { piece: "Cubo PLA 20mm", config: "Alvo 0.42mm / Medido 0.40mm", result: "Flow = 0.42/0.40 = 1.05" },
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Lacunas na superfície superior", "Flow baixo", "Aumentar 2–5%"],
              ["Excesso de material", "Flow alto", "Reduzir 2–5%"],
              ["Dimensões imprecisas", "Flow incorreto", "Recalibrar"],
            ]},
            goldenRule: "Calibre Flow após Temperatura e antes do Pressure Advance — é a base das dimensões.",
            summaryTable: { headers: ["Sintoma", "Ação"], rows: [
              ["Lacunas no topo", "Flow +2–5%"], ["Excesso", "Flow −2–5%"],
              ["Peça menor", "Flow +"], ["Peça maior", "Flow −"],
            ]},
          }],
        }),
      L(5, "retracao", "Passo 5 — Retração", "15min",
        ["Fim do stringing", "Direct vs Bowden", "Wipe e Z-Hop"], {
          theory: [
            "Retração puxa filamento para aliviar pressão no bico durante deslocamentos, eliminando fiapos.",
            "Analogia: conta-gotas — soltar a pressão interrompe o gotejar.",
          ],
          paramDetails: [{
            name: "Comprimento / Velocidade de Retração", value: "Direct: 0.5–2.0mm / 30–50 mm/s • Bowden: 3–7mm / 40–60 mm/s",
            whatIs: "Distância e velocidade com que o filamento é puxado para evitar vazamento durante deslocamentos.",
            whyAdjust: "Eliminar fiapos sem causar subextrusão ou grind do filamento.",
            optionsTable: { headers: ["Parâmetro", "Descrição", "Faixa"], rows: [
              ["Comprimento", "Distância de recuo", "Direct 0.5–2.0 / Bowden 3–7 mm"],
              ["Velocidade", "Velocidade do recuo", "Direct 30–50 / Bowden 40–60 mm/s"],
              ["Extra Prime", "Material extra ao retornar", "0–0.5mm"],
              ["Wipe", "Limpeza após retração", "Ativado"],
              ["Z-Hop", "Levanta o bico no deslocamento", "0.2–0.4mm"],
            ]},
            influences: "Tipo de extrusor, material, temperatura e velocidade.",
            influencesList: [
              "Direct: comprimentos curtos; Bowden: longos",
              "PETG mais pegajoso → mais retração",
              "TPU: retração mínima ou zero",
              "Temperatura alta → retração mais longa",
            ],
            generates: "Decide entre peça limpa ou cheia de fiapos.",
            generatesTable: { headers: ["Configuração", "Resultado", "Quando Usar"], rows: [
              ["Curta", "Fiapos", "Nunca"],
              ["Ideal", "Sem fiapos", "Sempre"],
              ["Longa", "Subextrusão / entupimento", "Nunca"],
            ]},
            integrationsTable: { headers: ["Parâmetro", "Relação", "Ajuste"], rows: [
              ["Temperatura", "Calor pede mais retração", "Calibrar T antes"],
              ["Pressure Advance", "PA reduz necessidade de retração extrema", "PA antes da retração"],
              ["Wipe", "Complementa a retração", "Ativar"],
              ["Z-Hop", "Reduz colisões no deslocamento", "0.2–0.4mm"],
            ]},
            howTo: [
              { step: "1", path: "Calibração > Retraction", desc: "Imprimir torre de retração" },
              { step: "2", path: "Iniciais", desc: "Direct 0.8mm/40mm/s • Bowden 4mm/50mm/s" },
              { step: "3", path: "Análise", desc: "Identificar menor retração sem fiapos" },
              { step: "4", path: "Perfil", desc: "Salvar comprimento e velocidade no filamento" },
            ],
            example: { piece: "Torre PLA Direct", config: "0.8mm/40mm/s → fiapos", result: "Subir para 1.0mm: sem fiapos" },
            errorsTable: { headers: ["Sintoma", "Causa", "Solução"], rows: [
              ["Fiapos", "Retração curta/lenta", "+0.2mm ou +5 mm/s"],
              ["Subextrusão após retração", "Retração longa", "−0.2mm"],
              ["Entupimento", "Retração muito longa", "−0.5mm"],
              ["Marca na superfície", "Sem Wipe", "Ativar Wipe"],
            ]},
            goldenRule: "Calibre a retração por último — ela depende de temperatura, flow e PA.",
            summaryTable: { headers: ["Sintoma", "Ação"], rows: [
              ["Fiapos", "Comprimento +0.2mm"],
              ["Fiapos persistem", "Velocidade +5 mm/s"],
              ["Subextrusão", "Comprimento −0.2mm"],
              ["Entupimento", "Comprimento −0.5mm"],
            ]},
          }],
        }),
      L(6, "cornering", "Passo 6 — Cornering (Jerk / Junction Deviation)", "10min",
        ["Suavidade nas curvas", "Marlin vs Klipper"], {
          theory: [
            "Cornering controla a suavidade das mudanças de direção. Baixo = cantos precisos; alto = mais velocidade mas risco de inchaço.",
            "Analogia: carro fazendo curva — velocidade demais arredonda a trajetória.",
          ],
          paramDetails: [{
            name: "Jerk / Junction Deviation", value: "Jerk 5–15 mm/s • JD 0.01–0.1",
            whatIs: "Controle de quão abruptas podem ser as mudanças de direção do bico.",
            whyAdjust: "Equilibrar precisão dos cantos e velocidade global da impressão.",
            optionsTable: { headers: ["Impressora", "Jerk (Marlin)", "JD (Klipper)"], rows: [
              ["Ender 3", "8–12 mm/s", "0.02–0.05"],
              ["Prusa MK3", "10–15 mm/s", "—"],
              ["Voron", "—", "0.01–0.03"],
              ["Bambu Lab", "—", "0.02–0.05"],
            ]},
            influences: "Massa da impressora, material e velocidade.",
            influencesList: [
              "Máquinas leves → Jerk mais alto",
              "Máquinas pesadas → Jerk mais baixo",
              "PETG: Jerk mais baixo",
              "Velocidade alta → Jerk mais baixo",
            ],
            generates: "Cantos arredondados ou precisos; impressões mais rápidas ou mais limpas.",
            howTo: [
              { step: "Klipper", path: "printer.cfg [printer]", desc: "Ajustar junction_deviation e testar" },
              { step: "Marlin", path: "Menu > Configurações > Movimento", desc: "Ajustar Jerk e testar" },
            ],
            goldenRule: "Jerk baixo = cantos precisos. Jerk alto = velocidade. Encontre o equilíbrio.",
          }],
        }),
      L(7, "input-shaping", "Passo 7 — Input Shaping", "10min",
        ["Anti-ghosting", "ADXL345", "Frequências"], {
          theory: [
            "Input Shaping elimina vibrações (ringing/ghosting) usando um acelerômetro (ADXL345) e um filtro matemático que cancela a frequência natural da máquina.",
            "Analogia: dedo no violão — interrompe a vibração da corda exatamente quando ela começa.",
          ],
          paramDetails: [{
            name: "Input Shaper (X / Y)", value: "MZV/EI/ZV • freq medida (~30–60 Hz)",
            whatIs: "Filtro de firmware que antecipa e cancela vibrações estruturais da impressora.",
            whyAdjust: "Eliminar ghosting nas paredes e habilitar acelerações maiores sem perder qualidade.",
            influences: "Rigidez do frame, posição dos motores, qualidade do acelerômetro.",
            generates: "Paredes limpas em alta velocidade, ou ghosting visível se desligado.",
            howTo: [
              { step: "1", path: "Hardware", desc: "Acoplar ADXL345 firmemente ao bico/mesa" },
              { step: "2", path: "Klipper SHAPER_CALIBRATE", desc: "Rodar para X e Y" },
              { step: "3", path: "printer.cfg [input_shaper]", desc: "Salvar shaper_freq_x e shaper_freq_y" },
              { step: "4", path: "Validação", desc: "Imprimir cubo de ringing e comparar" },
            ],
            goldenRule: "Input Shaping é a chave para impressões rápidas e limpas — invista em um acelerômetro.",
          }],
        }),
      L(8, "tolerancia", "Passo 8 — Tolerância e Validação Final", "10min",
        ["Encaixes precisos", "XY Compensation", "Hole Expansion"], {
          theory: [
            "A calibração de tolerância verifica precisão dimensional de furos e encaixes — define a folga ideal para montagens precisas.",
            "Após os 8 passos, valide com um Benchy, teste de tolerância e uma peça funcional com overhangs.",
          ],
          paramDetails: [{
            name: "Tolerância XY / Furos", value: "XY Comp −0.01 a −0.05mm • Hole Exp 0.0–0.1mm",
            whatIs: "Compensações que ajustam dimensões externas e diâmetros internos para encaixes confiáveis.",
            whyAdjust: "Garantir que peças encaixem com firmeza, mas ainda possam ser montadas/desmontadas.",
            optionsTable: { headers: ["Encaixe", "Folga Ideal", "Uso"], rows: [
              ["Press Fit", "0.05–0.10mm", "Encaixe firme"],
              ["Slide Fit", "0.15–0.25mm", "Deslizante"],
              ["Loose Fit", "0.30–0.50mm", "Folga livre"],
            ]},
            influences: "Flow Rate, Pressure Advance, contração térmica do material.",
            generates: "Define se montagens irão se encaixar corretamente sem retrabalho.",
            howTo: [
              { step: "1", path: "Calibração > Tolerância", desc: "Imprimir teste de gap e/ou furos" },
              { step: "2", path: "Medição", desc: "Conferir com paquímetro" },
              { step: "3", path: "XY Size Compensation / Hole Expansion", desc: "Ajustar conforme medição" },
              { step: "4", path: "Validação Final", desc: "Benchy + peça funcional para confirmar tudo" },
            ],
            goldenRule: "A folga ideal permite firmeza no encaixe e ainda assim montagem/desmontagem fácil.",
            summaryTable: { title: "Checklist de Validação Final", headers: ["Item", "Critério"], rows: [
              ["Fiapos", "Nenhum"],
              ["Cantos", "Nítidos"],
              ["Dimensões", "Dentro da tolerância"],
              ["Superfícies", "Lisas, sem ghosting"],
              ["Encaixes", "Conforme classe (press/slide/loose)"],
            ]},
          }],
        }),
    ],
  },

  {
    id: "engenharia-mecanica", number: 6, title: "Engenharia Mecânica 3D",
    tagline: "Anisotropia, Forças e Resistência Estrutural",
    level: "Avançado", duration: "1h 45min",
    methodology: "Tabelas comparativas, ensaios destrutivos, casos práticos de orientação e infill.",
    objective: "Projetar e orientar peças para máxima resistência estrutural, dominando anisotropia, distribuição de forças e configuração de paredes/infill.",
    lessons: [
      L(1, "anisotropia-forcas", "Anisotropia e Forças em X, Y, Z", "35min",
        ["Anisotropia FDM", "Direção de carga", "Eixos X/Y vs Z", "Adesão entre camadas"], {
          theory: [
            "Anisotropia é a propriedade de um material apresentar comportamentos mecânicos diferentes em direções diferentes. Na impressão FDM, a peça é muito mais forte em X/Y (paralelo às camadas) do que em Z (perpendicular).",
            "A direção Z é mais fraca porque as camadas são unidas apenas por adesão térmica — não há continuidade molecular. A ligação interlayer é sempre mais fraca que o material em si.",
            "Analogia: madeira compensada — forte na direção das fibras, fraca perpendicular a elas. A impressão 3D tem 'fibras' horizontais (filamentos depositados em X/Y).",
            "Peça orientada corretamente pode suportar até 5-6× mais carga que a mesma peça mal orientada. A diferença é a direção das camadas em relação à força aplicada.",
            "Por isso o engenheiro 3D pensa em 'direção da carga' antes do slicer: identificar onde a força vai atuar é o passo zero do projeto funcional.",
          ],
          integrations: [
            { module: "Módulo 1 (Interface)", text: "Place on Face deita a peça na face que maximiza resistência à carga real." },
            { module: "Módulo 4 (Materiais)", text: "PETG e Nylon têm adesão Z muito melhor que PLA — escolha por exigência mecânica." },
            { module: "Módulo 7 (Otimização)", text: "Aumentar paredes em vez de infill economiza material E aumenta resistência." },
            { module: "Módulo 13 (Tolerâncias)", text: "Encaixes em XY são previsíveis; encaixes em Z variam mais por anisotropia." },
          ],
          params: [
            { param: "Eixo X/Y (Horizontal)", value: "Resistência Máxima", action: "Forte, contínuo — como fibra de madeira" },
            { param: "Eixo Z (Vertical)", value: "Resistência Mínima", action: "Frágil — adesão térmica entre fibras" },
            { param: "Layer Height (estrutural)", value: "0.12-0.16mm", action: "Camadas finas = mais superfície de adesão" },
            { param: "Temperatura (estrutural)", value: "+5°C acima do padrão", action: "Mais quente = melhor adesão Z" },
            { param: "Velocidade (estrutural)", value: "−20% do padrão", action: "Mais lento = melhor adesão Z" },
            { param: "Wall Loops (alta carga)", value: "4-6", action: "Paredes contínuas absorvem a carga principal" },
          ],
          goldenRule: "A direção das camadas define a direção da resistência. Sempre alinhe as camadas com a força principal — peça orientada corretamente suporta 5× mais carga.",
          errors: [
            { error: "Peça quebra na primeira carga", solution: "Reorientar com camadas alinhadas à força principal" },
            { error: "Fratura limpa entre camadas", solution: "Aumentar temperatura +5°C, reduzir velocidade 20%, usar 0.12-0.16mm" },
            { error: "Falha em áreas específicas", solution: "Aumentar paredes (4-6) na região crítica" },
            { error: "Peça delamina sob tração Z", solution: "Trocar PLA por PETG/Nylon ou imprimir deitada" },
          ],
          finance: "Falha mecânica em campo custa devolução + retrabalho + reputação. Projeto correto vale 10× o tempo gasto.",
          exercise: [
            "Identifique a direção da força principal em uma peça funcional sua",
            "Posicione com camadas paralelas à força (Place on Face)",
            "Configure 4-6 paredes + Gyroid 25-40%",
            "Imprima 2 versões (correta e incorreta), quebre na mão para sentir a diferença",
          ],
          paramDetails: [{
            name: "Anisotropia FDM",
            value: "X/Y forte, Z fraco",
            whatIs: "Diferença de resistência entre os eixos da peça impressa, causada pela natureza camada-a-camada do FDM.",
            whyAdjust: "Sem entender anisotropia, peças funcionais quebram em uso. Com ela, você projeta para a carga real.",
            types: [
              { label: "Tração", desc: "Camadas paralelas à força = máxima resistência" },
              { label: "Compressão", desc: "Camadas perpendiculares à força = boa resistência" },
              { label: "Flexão", desc: "Camadas paralelas à flexão = máxima resistência" },
              { label: "Torção", desc: "Camadas a 45° = distribuição uniforme" },
              { label: "Cisalhamento", desc: "Camadas perpendiculares ao corte = máxima resistência" },
            ],
            influences: "Orientação na mesa, escolha de material, parâmetros de adesão Z (temp, velocidade, altura), número de paredes.",
            influencesList: [
              "Altura da camada: 0.12-0.16mm aumenta superfície de adesão",
              "Temperatura: +5°C melhora fusão entre camadas",
              "Velocidade: −20% dá mais tempo de fusão",
              "Material: PETG/Nylon > PLA em adesão Z",
              "Paredes: 4-6 absorvem a carga em vez do infill",
            ],
            generates: "Mesma peça pode aguentar 5× mais carga só mudando orientação.",
            generatesTable: {
              headers: ["Orientação", "Carga", "Resultado"],
              rows: [
                ["Camadas paralelas à força", "Tração vertical", "Resistência máxima (5-6×)"],
                ["Camadas perpendiculares à força", "Tração vertical", "Falha imediata (delaminação)"],
                ["Camadas a 45°", "Torção", "Distribuição uniforme"],
                ["Camadas paralelas à viga", "Flexão", "Máxima rigidez"],
              ],
            },
            integrationsTable: {
              headers: ["Parâmetro", "Como ajuda na resistência", "Valor recomendado"],
              rows: [
                ["Altura da camada", "Mais adesão entre camadas", "0.12-0.16mm"],
                ["Temperatura", "Melhor fusão térmica", "+5°C do padrão"],
                ["Velocidade", "Mais tempo de fusão", "−20% do padrão"],
                ["Wall Loops", "Paredes contínuas absorvem carga", "4-6"],
                ["Material", "Adesão Z intrínseca", "PETG > PLA"],
              ],
            },
            example: {
              piece: "Gancho de parede (tração vertical)",
              config: "Deitado, camadas horizontais, PETG, 4 paredes, Gyroid 25%, 0.16mm, +5°C, −20% vel.",
              result: "Carga máxima absorvida porque fibras estão alinhadas com a tração — 5× mais que orientação em pé",
            },
            errorsTable: {
              headers: ["Sintoma", "Causa", "Solução"],
              rows: [
                ["Quebra na primeira carga", "Orientação errada", "Reorientar paralelo à força"],
                ["Fratura limpa entre camadas", "Adesão Z ruim", "+5°C, −20% vel, 0.12-0.16mm"],
                ["Falha em ponto específico", "Pouca parede na região", "4-6 wall loops"],
                ["Delaminação sob tração Z", "PLA + Z sob carga", "Trocar material ou deitar"],
              ],
            },
            goldenRule: "Identifique a direção da carga antes de orientar. Camadas devem fluir com a força, nunca atravessá-la.",
          }],
        }),
      L(2, "orientacao-tensoes", "Orientação e Distribuição de Tensões", "35min",
        ["Horizontal/Vertical/45°", "Place on Face", "Tração/Compressão/Flexão/Torção", "Suportes"], {
          theory: [
            "A orientação da peça na mesa determina como as camadas serão depositadas e como as forças serão distribuídas. Cada orientação cria um padrão de tensões diferente — escolher a errada significa peça quebrada em uso.",
            "Horizontal (deitada): camadas paralelas à mesa, máxima resistência à tração e flexão, melhor acabamento no topo, pode exigir suportes para overhangs.",
            "Vertical (em pé): camadas empilhadas, boa resistência à compressão mas pior à tração/flexão, menos suportes necessários, fragilidade em cargas laterais.",
            "Diagonal (45°): compromisso equilibrado, distribuição uniforme de forças, ideal para torção e cargas multidirecionais, mas exige mais suportes.",
            "A orientação afeta também tempo, suportes, acabamento e quantidade de pós-processamento — sempre avalie o conjunto, não só a resistência.",
          ],
          integrations: [
            { module: "Módulo 1 (Interface)", text: "Place on Face automatiza orientação básica; Rotacionar (R) ajusta manualmente." },
            { module: "Módulo 19 (Suportes)", text: "Boa orientação reduz drasticamente suportes — bônus de design, tempo e custo." },
            { module: "Módulo 17 (Pintura)", text: "Cut + orientação por parte permite acabamentos premium em peças complexas." },
          ],
          params: [
            { param: "Tração", value: "Camadas paralelas à força", action: "Ex: gancho deitado" },
            { param: "Compressão", value: "Camadas perpendiculares", action: "Ex: coluna em pé" },
            { param: "Flexão", value: "Camadas paralelas à flexão", action: "Ex: viga deitada" },
            { param: "Torção", value: "Camadas a 45°", action: "Ex: eixo de engrenagem" },
            { param: "Cisalhamento", value: "Camadas perpendiculares ao corte", action: "Resiste ao corte" },
            { param: "Acabamento crítico", value: "Face lisa para cima", action: "Top layers ficam mais lisas" },
          ],
          goldenRule: "A melhor orientação alinha as camadas com a força principal. Use Place on Face como ponto de partida, mas ajuste manualmente quando resistência for crítica.",
          errors: [
            { error: "Peça quebra sob carga", solution: "Reorientar alinhando camadas à força principal" },
            { error: "Suportes excessivos", solution: "Rotacionar para minimizar overhangs (Tree Organic se inevitável)" },
            { error: "Superfície ruim onde precisa ser lisa", solution: "Top layers ficam melhores — orientar face importante para cima" },
            { error: "Tempo longo por suportes", solution: "Cortar peça (Cut) e orientar partes individualmente" },
          ],
          economy: "Orientação correta economiza tempo de pós e material de suporte — produção comercial ganha 15-20% por peça.",
          exercise: [
            "Modele um suporte em L",
            "Imprima nas 3 orientações: horizontal, vertical e 45°",
            "Pendure peso crescente até cada quebrar",
            "Documente qual orientação aguentou mais carga",
          ],
          paramDetails: [{
            name: "Orientação na Mesa",
            value: "Horizontal / Vertical / 45°",
            whatIs: "Posição da peça em relação à mesa, que determina a direção de deposição das camadas e o padrão de tensões resultante.",
            whyAdjust: "Mesma peça com orientações diferentes pode variar 5× na resistência, 50% no tempo e 80% no consumo de suporte.",
            types: [
              { label: "Horizontal (deitada)", desc: "Camadas paralelas à mesa — máxima tração/flexão, melhor topo, mais suportes" },
              { label: "Vertical (em pé)", desc: "Camadas empilhadas — boa compressão, ruim tração, menos suportes" },
              { label: "Diagonal (45°)", desc: "Compromisso — boa torção e multidirecional, exige suportes" },
            ],
            influences: "Resistência mecânica, tempo de impressão, quantidade de suporte, qualidade de acabamento por face.",
            generates: "Combinação de resistência + tempo + suporte + acabamento muda completamente.",
            generatesTable: {
              headers: ["Orientação", "Resistência", "Suportes", "Acabamento", "Tempo"],
              rows: [
                ["Horizontal", "Máxima (tração/flexão)", "Mais necessários", "Topo perfeito", "Médio"],
                ["Vertical", "Média (compressão)", "Mínimos", "Laterais visíveis", "Maior (mais Z)"],
                ["45°", "Equilibrada", "Médios", "Distribuído", "Médio"],
              ],
            },
            optionsTable: {
              headers: ["Tipo de Peça", "Orientação Recomendada", "Motivo"],
              rows: [
                ["Gancho / Suporte de carga", "Deitado", "Tração vertical alinhada com camadas"],
                ["Coluna / Pilar", "Em pé", "Compressão direta entre camadas"],
                ["Viga / Alavanca", "Deitado", "Flexão paralela às camadas"],
                ["Engrenagem", "Deitado", "Torção uniforme + face plana"],
                ["Tampa / Caixa", "Deitado", "Acabamento perfeito na face superior"],
                ["Busto / Figura", "45° ou em pé", "Equilíbrio + menos suporte facial"],
              ],
            },
            howTo: [
              { step: "Place on Face", path: "Selecionar peça → P", desc: "Clica em uma face para 'deitar' ela na mesa — base para orientação" },
              { step: "Rotacionar manual", path: "Selecionar peça → R", desc: "Ajuste fino em eixos X/Y/Z com valores numéricos" },
              { step: "Cut (cortar)", path: "Ferramenta Cut", desc: "Dividir peça grande em partes para orientar cada uma idealmente" },
              { step: "Tree Organic", path: "Suporte → Tipo Organic", desc: "Suportes mínimos quando orientação ideal exige overhangs" },
            ],
            example: {
              piece: "Suporte em L para prateleira (carga vertical 5 kg)",
              config: "Deitado com a parte longa paralela à mesa, 4 paredes, Gyroid 30%, PETG",
              result: "Aguenta a carga sem deformar; em pé quebraria entre camadas na primeira tentativa",
            },
            errorsTable: {
              headers: ["Sintoma", "Causa", "Solução"],
              rows: [
                ["Quebra sob carga", "Orientação contra a força", "Reorientar paralelo à força"],
                ["Suportes excessivos", "Orientação cria muitos overhangs", "Rotacionar ou usar Tree Organic"],
                ["Topo ruim onde devia ser liso", "Face crítica para baixo", "Reorientar com face para cima"],
                ["Tempo longo", "Suportes pesados", "Cortar peça e orientar partes"],
              ],
            },
            goldenRule: "Place on Face é ponto de partida. Para peça funcional, sempre validar com a direção real da carga.",
          }],
        }),
      L(3, "resistencia-estrutural", "Resistência Estrutural — Paredes vs Infill", "35min",
        ["Wall loops", "Gyroid/Cubic", "Receita 4 paredes + 25%", "Top/Bottom layers"], {
          theory: [
            "A resistência estrutural vem da combinação de paredes, infill, altura da camada, temperatura e material. Mas as PAREDES (wall loops) são a parte mais importante.",
            "Paredes são contínuas (linhas externas/internas sem quebra) e absorvem a maior parte da carga. Infill é descontínuo (muda de direção) e contribui muito menos para a resistência por grama.",
            "4 paredes são mais importantes que 40% de infill. Aumentar paredes em vez de densidade economiza tempo E material — duplo ganho de eficiência estrutural.",
            "Gyroid é o melhor padrão genérico: células 3D contínuas, sem cruzamentos na mesma camada, distribuição isotrópica de forças. Para cargas multidirecionais é a escolha padrão.",
            "Receita 'mágica' para peças funcionais comuns: 4 paredes + 20-25% Gyroid + 0.16mm + temperatura padrão. Cobre 80% dos casos com excelente equilíbrio resistência/peso/tempo.",
          ],
          integrations: [
            { module: "Módulo 18 (Infill)", text: "Gyroid e Cubic para distribuição isotrópica em peças estruturais." },
            { module: "Módulo 7 (Otimização)", text: "Aumentar paredes em vez de densidade economiza material e tempo." },
            { module: "Módulo 4 (Materiais)", text: "PETG/Nylon multiplicam o ganho das paredes — adesão Z superior." },
          ],
          params: [
            { param: "Wall Loops (padrão)", value: "4", action: "Ponto ideal: 80% resistência com 20% material" },
            { param: "Wall Loops (estrutural)", value: "5-6", action: "Resistência crítica (suportes, ferramentas)" },
            { param: "Infill Pattern", value: "Gyroid", action: "Isotrópico — padrão estrutural" },
            { param: "Infill Density (geral)", value: "15-25%", action: "Uso geral recomendado" },
            { param: "Infill Density (estrutural)", value: "25-40%", action: "Peças sob carga real" },
            { param: "Top/Bottom Layers", value: "4-6 camadas", action: "Fecha superfície sem pinholing" },
            { param: "Layer Height (estrutural)", value: "0.12-0.16mm", action: "Mais adesão Z" },
          ],
          goldenRule: "A resistência vem das paredes, não do infill. 4 paredes + 20-25% Gyroid superam 2 paredes + 40% de infill. Priorize paredes.",
          errors: [
            { error: "Peça quebra mesmo com 80% de infill", solution: "Reduzir infill para 25% e subir paredes para 6 — vai ficar mais rígida" },
            { error: "Peça pesada, lenta e fraca", solution: "Trocar estratégia: mais paredes, menos infill, padrão Gyroid" },
            { error: "Quebra na junção parede/infill", solution: "Ativar 'Detect overhang wall', revisar temperatura e Flow" },
            { error: "Deformação sob carga contínua", solution: "Trocar material (PLA → PETG → Nylon)" },
          ],
          finance: "Receita '4 paredes + 25% Gyroid' usa 30-40% menos material que 'infill alto' equivalente em rigidez — produção comercial sente direto no custo.",
          exercise: [
            "Imprima 3 cubos: (a) 2p + 60% infill, (b) 4p + 25% Gyroid, (c) 6p + 10% Gyroid",
            "Pese cada um e aplique flexão na mão até deformar",
            "Calcule rigidez por grama — paredes+Gyroid vence",
            "Imprima um suporte real com receita estrutural e teste sob carga",
          ],
          paramDetails: [{
            name: "Estrutura: Paredes + Infill",
            value: "4 paredes + Gyroid 20-25%",
            whatIs: "Combinação dos elementos internos da peça (wall loops, padrão e densidade de infill, top/bottom layers) que define rigidez e resistência.",
            whyAdjust: "A escolha errada gasta material sem ganhar resistência. A receita certa entrega 80% da resistência com 50% do peso.",
            types: [
              { label: "Wall Loops", desc: "Linhas contínuas — absorvem a carga principal. 4 é o sweet spot" },
              { label: "Infill Pattern", desc: "Geometria interna — Gyroid (isotrópico) é o padrão estrutural" },
              { label: "Infill Density", desc: "% de material interno — 15-25% para uso geral, 25-40% para carga" },
              { label: "Top/Bottom Layers", desc: "Camadas sólidas no topo e base — 4-6 para fechar sem pinholing" },
            ],
            influences: "Rigidez, resistência ao impacto, peso, tempo de impressão, custo por peça.",
            influencesList: [
              "Paredes são contínuas — distribuem carga sem interrupção",
              "Infill é descontínuo — contribui menos por grama",
              "Gyroid é isotrópico — resiste em qualquer direção",
              "Camadas finas (0.12-0.16) aumentam adesão Z",
              "Material multiplica ou anula o ganho",
            ],
            generates: "Receitas prontas por tipo de peça — cada uma é um equilíbrio testado.",
            generatesTable: {
              headers: ["Tipo de Peça", "Paredes", "Infill", "Camada", "Material"],
              rows: [
                ["Protótipo visual", "2", "Grid 15%", "0.20mm", "PLA"],
                ["Uso geral", "4", "Gyroid 20%", "0.20mm", "PLA+ ou PETG"],
                ["Estrutural", "5", "Gyroid 30%", "0.16mm", "PETG"],
                ["Alta carga", "6", "Gyroid 40%", "0.12mm", "Nylon"],
              ],
            },
            integrationsTable: {
              headers: ["Padrão Infill", "Característica", "Quando Usar"],
              rows: [
                ["Gyroid", "Isotrópico, sem cruzamentos", "Padrão estrutural"],
                ["Cubic", "Forte em 3 eixos", "Alta carga unidirecional"],
                ["Lightning", "Mínimo material", "Decorativos (NÃO estrutural)"],
                ["Grid", "Rápido, plano", "Protótipos visuais"],
                ["Honeycomb", "Rígido lateral", "Peças com flexão lateral"],
              ],
            },
            example: {
              piece: "Suporte de motor 5kg em PETG",
              config: "6 paredes + Gyroid 35% + 0.16mm + 245°C + 50 mm/s parede externa",
              result: "Suporte resistente sem deformação, peso 30% menor que 'infill 80%' equivalente",
            },
            errorsTable: {
              headers: ["Sintoma", "Causa", "Solução"],
              rows: [
                ["Quebra com 80% infill", "Poucas paredes", "Reduzir infill para 25%, subir paredes para 6"],
                ["Pesada, lenta e fraca", "Estratégia errada (infill alto)", "Trocar para paredes + Gyroid"],
                ["Quebra na junção", "Adesão parede/infill ruim", "Ativar Detect overhang wall, revisar temp/Flow"],
                ["Deformação contínua", "Material limitante", "Trocar PLA → PETG → Nylon"],
              ],
            },
            summaryTable: {
              title: "Receita Universal de Resistência",
              headers: ["Elemento", "Valor", "Por quê"],
              rows: [
                ["Wall Loops", "4", "Sweet spot de eficiência estrutural"],
                ["Infill Pattern", "Gyroid", "Isotrópico, sem nós de tensão"],
                ["Infill Density", "20-25%", "Suficiente para apoiar paredes e top"],
                ["Top/Bottom Layers", "5", "Fecha sem pinholing"],
                ["Layer Height", "0.16mm", "Equilíbrio adesão Z + tempo"],
                ["Temperatura", "+5°C do padrão", "Melhor fusão entre camadas"],
                ["Velocidade", "−20% padrão", "Mais tempo de fusão"],
              ],
            },
            goldenRule: "4 paredes + Gyroid 25% é a receita universal. Suba paredes (não infill) quando precisar de mais resistência.",
          }],
          checklist: [
            "Direção da carga identificada antes de orientar",
            "Camadas alinhadas com a força principal",
            "Wall Loops ≥ 4 para peças funcionais",
            "Gyroid ou Cubic para cargas multidirecionais",
            "Layer Height 0.12-0.16mm para peças estruturais",
            "Temperatura +5°C e velocidade −20% para máxima adesão Z",
            "Material adequado: PLA (protótipo), PETG (geral), Nylon (alta carga)",
          ],
        }),
    ],
  },


  {
    id: "otimizacao-extrema", number: 7, title: "Otimização Extrema",
    tagline: "Menos tempo, menos material, máxima resistência",
    level: "Avançado", duration: "1h 00min",
    methodology: "Métricas min/g, custo por peça e resistência por grama. Comparativos diretos: Lightning vs Gyroid, bico 0.4 vs 0.6, camadas fixas vs adaptativas.",
    objective: "Reduzir tempo de impressão em até 50% e consumo de filamento em até 60% sem comprometer a resistência funcional da peça.",
    lessons: [
      L(1, "otimizacao-conceitos", "Otimização Extrema — Conceitos Gerais", "25min",
        ["Eficiência material e temporal", "Métricas min/g e custo/peça", "Identificação de oportunidades"], {
          theory: [
            "Otimização extrema é o conjunto de técnicas e estratégias para reduzir tempo de impressão e consumo de filamento sem comprometer resistência e qualidade. O objetivo é encontrar o equilíbrio perfeito entre eficiência e desempenho, maximizando produtividade e minimizando desperdício.",
            "Por que importa: reduz tempo de produção em até 50%, economiza filamento (reduz custos), aumenta produtividade da impressora, permite produzir mais peças no mesmo tempo e reduz impacto ambiental.",
            "Analogia: imagine dirigir um carro. Você pode andar devagar e gastar muito combustível, ou rápido e gastar menos tempo mas mais combustível. A otimização é encontrar a velocidade ideal — menor consumo de tempo E combustível.",
            "Otimização NÃO é sobre cortar custos cegamente; é sobre usar recursos de forma inteligente. Uma peça otimizada pode custar 50% menos e ser igualmente funcional.",
          ],
          integrations: [
            { module: "Módulo 6 (Engenharia)", text: "Identifique áreas críticas (carga) antes de otimizar — nunca economize material onde a peça sofre tensão." },
            { module: "Módulo 9 (Comercial)", text: "Eficiência traduz-se direto em margem: 50% menos custo/peça = dobro de lucro na mesma venda." },
            { module: "Módulo 18 (Infill)", text: "Lightning é decorativo, Gyroid é funcional — escolha por aplicação, não por moda." },
            { module: "Módulo 20 (Velocidade)", text: "Travel speed alto é o ganho mais barato — não afeta qualidade visível." },
          ],
          params: [
            { param: "Tempo por Grama (min/g)", value: "Tempo total ÷ peso", action: "Quanto menor, mais lucrativa" },
            { param: "Custo por Peça", value: "Material + energia + tempo", action: "Métrica de viabilidade comercial" },
            { param: "Resistência por Grama", value: "Carga máx ÷ peso", action: "Eficiência estrutural — quanto maior, melhor" },
            { param: "Produtividade", value: "Peças ÷ hora", action: "Mede ganho real do processo" },
          ],
          goldenRule: "Otimize onde ninguém vê. Invista material e tempo onde é realmente necessário. Uma peça otimizada pode custar metade do preço e ser igualmente funcional.",
          errors: [
            { error: "Peça quebra em uso", solution: "Otimização excessiva em área crítica — aumentar paredes/infill na zona de carga" },
            { error: "Superfície ruim onde aparece", solution: "Otimização comprometeu qualidade visível — preserve outer wall e top layers" },
            { error: "Tempo ainda alto após mudanças", solution: "Revisar bico (0.6mm) e altura (0.24-0.28mm) — são os ganhos maiores" },
            { error: "Material desperdiçado mesmo após otimizar", solution: "Áreas não críticas não foram identificadas — mapear antes de configurar" },
          ],
          finance: "Otimização bem aplicada: 10 peças/dia vs 4 peças/dia = +150% produtividade na mesma máquina e mesmas horas operacionais.",
          exercise: [
            "Pegue uma peça atual e calcule min/g e custo/peça",
            "Mapeie áreas críticas (carga) vs não críticas (estéticas/internas)",
            "Aplique uma otimização específica por zona",
            "Reimprima e compare min/g, custo e resistência funcional",
          ],
          paramDetails: [{
            name: "Estratégia de Otimização",
            value: "Eficiência multi-eixo",
            whatIs: "Conjunto de princípios e métricas para reduzir tempo e material mantendo função.",
            whyAdjust: "Sem otimização, a mesma máquina produz menos da metade — margem comercial fica inviável.",
            influences: "Tempo de produção, custo por peça, peso final, resistência funcional, consumo energético.",
            influencesList: [
              "Geometria: paredes finas e grande volume interno = mais espaço para otimizar",
              "Configurações: altura, largura, infill, paredes, velocidade",
              "Material: PLA é mais flexível para otimizar; ABS/Nylon limitam",
              "Impressora: bicos maiores e hotend potente expandem o teto",
            ],
            optionsTable: {
              headers: ["Princípio", "Descrição", "Impacto"],
              rows: [
                ["Eficiência Material", "Menos filamento onde não é necessário", "Reduz custo e peso"],
                ["Eficiência Temporal", "Imprimir rápido onde qualidade não é crítica", "Reduz tempo de produção"],
                ["Eficiência Estrutural", "Manter resistência onde é necessária", "Garante funcionalidade"],
                ["Eficiência Energética", "Reduzir uso de energia", "Reduz custos operacionais"],
              ],
            },
            generates: "Combinações de estratégias geram resultados quantificáveis — escolha por contexto da peça.",
            generatesTable: {
              headers: ["Estratégia", "Resultado", "Quando Usar"],
              rows: [
                ["Lightning Infill", "−60% material, −30% tempo", "Decorativos, sem carga"],
                ["Bico 0.6mm", "−50% tempo, +20% resistência", "Peças grandes/estruturais"],
                ["Camadas 0.28mm", "−40% tempo, qualidade aceitável", "Protótipos rápidos"],
                ["Adaptive Layers", "−25% tempo, mesma qualidade", "Áreas planas + curvas"],
              ],
            },
            integrationsTable: {
              headers: ["Parâmetro", "Relação com Otimização", "Ajuste Recomendado"],
              rows: [
                ["Altura da camada", "Mais grossa = mais rápido", "0.24-0.28mm"],
                ["Largura da linha", "Mais larga = menos passadas", "0.50-0.60mm"],
                ["Infill", "Menos = mais rápido", "Lightning em decorativos"],
                ["Paredes", "Menos = mais rápido", "2-3 para leves"],
                ["Velocidade", "Mais = mais rápido", "Subir onde não afeta qualidade"],
              ],
            },
            howTo: [
              { step: "Analise a peça", path: "Uso final / função / visual", desc: "Onde vai ser usada? Precisa de resistência máxima? É estética ou funcional?" },
              { step: "Identifique áreas críticas", path: "Mapa de carga", desc: "Áreas que sofrem carga vs estéticas vs internas (não visíveis)" },
              { step: "Aplique otimização por zona", path: "Modifiers / Perfil", desc: "Reduzir infill nas não críticas, aumentar velocidade interna, suportes apenas onde necessário" },
              { step: "Valide", path: "Teste real", desc: "Teste em uso, meça tempo e material economizados, ajuste o que faltou" },
            ],
            example: {
              piece: "Organizador de mesa decorativo",
              config: "Bico 0.6mm + Lightning 10% + 2 paredes + 0.28mm + 150 mm/s",
              result: "45min/peça e 80g (vs 1h30/150g do perfil padrão) — custo cai 50%, produção dobra",
            },
            errorsTable: {
              headers: ["Sintoma", "Causa", "Solução"],
              rows: [
                ["Peça quebra", "Otimização excessiva em área crítica", "Aumentar paredes/infill na área"],
                ["Superfície ruim", "Otimização comprometeu qualidade", "Aumentar qualidade onde é visível"],
                ["Tempo ainda alto", "Otimização insuficiente", "Revisar bico e altura de camada"],
                ["Material desperdiçado", "Otimização mal aplicada", "Mapear áreas não críticas antes"],
              ],
            },
            goldenRule: "Otimização inteligente, não cega. Mapeie antes de configurar.",
          }],
        }),
      L(2, "reduzir-tempo-material", "Reduzir Tempo e Material sem Perder Rigidez", "35min",
        ["Lightning Infill", "Bico 0.6mm/0.8mm", "Adaptive Layer Height", "Otimização de paredes"], {
          theory: [
            "Esta aula aborda técnicas específicas para reduzir drasticamente tempo e consumo de filamento mantendo rigidez e funcionalidade: Lightning Infill, bicos de maior diâmetro, alturas adaptativas e otimização de paredes/suportes.",
            "Lightning Infill cria 'raízes' que sustentam apenas as superfícies superiores, deixando o interior vazio. Economiza até 60% de filamento e 30% de tempo — ideal para decorativos.",
            "Bico 0.6mm dobra o fluxo do 0.4mm; 0.8mm quadruplica. Tempo cai de 4h para 2h (0.6) ou 1h (0.8) na mesma peça, com paredes mais grossas e resistentes.",
            "Adaptive Layer Height analisa a geometria, reduz altura em curvas/detalhes e aumenta em áreas planas. Mesma qualidade percebida com 25% menos tempo. Combinar bico 0.6 + Lightning + Adaptive transforma 6h em 2h30.",
            "Analogia: construir uma ponte — você não coloca concreto onde não há peso, usa estruturas vazadas onde possível. Impressão 3D permite o mesmo: material apenas onde necessário.",
          ],
          integrations: [
            { module: "Módulo 18 (Infill)", text: "Lightning só para decorativos — em funcionais use Gyroid ou Cubic." },
            { module: "Módulo 23 (Hotend)", text: "Bico 0.6/0.8 exige hotend de alto fluxo (≥22 mm³/s) — calibre MVS antes." },
            { module: "Módulo 19 (Suportes)", text: "Tree Organic + pintura de suporte = menos material e remoção mais fácil." },
          ],
          params: [
            { param: "Padrão de Infill (decorativo)", value: "Lightning 10-15%", action: "Mínimo material, suporta o topo" },
            { param: "Diâmetro do Bico", value: "0.6mm / 0.8mm", action: "Mais fluxo, menos passadas" },
            { param: "Largura da Linha", value: "0.60-0.65mm (bico 0.6)", action: "Acompanhar bico após troca" },
            { param: "Altura da Camada", value: "0.24-0.32mm (bico 0.6)", action: "Aproveitar vazão extra" },
            { param: "Adaptive Layer Height", value: "On (0.08-0.28mm)", action: "Qualidade onde importa, velocidade onde não" },
            { param: "Paredes (leve / estrutural)", value: "2 / 4", action: "Ajustar à função da peça" },
          ],
          goldenRule: "Lightning Infill para decorativos, bico 0.6mm para estruturais grandes, Adaptive Layers para qualidade onde importa. Otimização extrema é usar recursos de forma inteligente, não cortar custos cegamente.",
          errors: [
            { error: "Peça quebra com Lightning", solution: "Lightning é decorativo — use Gyroid/Cubic em funcional" },
            { error: "Superfície superior irregular (pillowing)", solution: "Aumentar densidade Lightning para 15% ou top layers para 5-6" },
            { error: "Detalhes finos sumiram com bico 0.6", solution: "Bico 0.6 não imprime detalhes <0.6mm — use 0.4mm em miniaturas" },
            { error: "Subextrusão após trocar bico", solution: "Atualize Line Width, Flow e MVS no perfil para o novo diâmetro" },
            { error: "Tempo ainda alto", solution: "Bico padrão 0.4 — trocar para 0.6mm" },
          ],
          finance: "Caso real: 100 organizadores de mesa. Perfil otimizado (bico 0.6, Lightning 10%, 2 paredes) = 45min/peça e 80g vs 1h30 e 150g do perfil padrão → custo por peça cai pela metade, produção diária dobra.",
          exercise: [
            "Imprima a mesma peça com Lightning 10% e Gyroid 20% — compare tempo, peso e resistência",
            "Imprima com bico 0.4mm e 0.6mm — compare tempo e qualidade aparente",
            "Crie dois perfis no OrcaSlicer: 'Rápido Decorativo' e 'Estrutural Eficiente'",
            "Documente min/g, custo/peça e resistência funcional dos dois perfis",
          ],
          paramDetails: [
            {
              name: "Lightning Infill",
              value: "10-15% densidade",
              whatIs: "Padrão de infill que cria subestruturas (raízes) apenas onde necessário para suportar superfícies superiores.",
              whyAdjust: "Economiza até 60% de material e 30% de tempo em peças sem carga estrutural.",
              types: [
                { label: "Quando USAR", desc: "Peças decorativas, sem carga, protótipos visuais, peças com paredes grossas" },
                { label: "Quando NÃO usar", desc: "Peças estruturais, peças sob carga, paredes finas, peças que precisam resistência" },
              ],
              influences: "Tempo de impressão, consumo de filamento, peso final, resistência interna.",
              generates: "Peça oca por dentro com 'raízes' que sustentam o topo. Forma externa preservada.",
              howTo: [
                { step: "Abrir parâmetros", path: "Resistência → Preenchimento", desc: "Acessar configurações de infill" },
                { step: "Selecionar padrão", path: "Padrão de preenchimento esparso → Lightning", desc: "Escolher o padrão Lightning" },
                { step: "Densidade", path: "10-15%", desc: "Manter baixa para máxima economia" },
                { step: "Imprimir e verificar", path: "Topo da peça", desc: "Se houver pillowing, subir para 15% ou aumentar top layers" },
              ],
              goldenRule: "Lightning é decorativo. Para função use Gyroid ou Cubic.",
            },
            {
              name: "Bico de Maior Diâmetro",
              value: "0.6mm / 0.8mm",
              whatIs: "Substituir o bico padrão 0.4mm por um de maior diâmetro para dobrar (0.6) ou quadruplicar (0.8) o fluxo.",
              whyAdjust: "Redução drástica de tempo, paredes mais grossas e resistentes, menos entupimentos com filamentos especiais (carbono, madeira).",
              types: [
                { label: "Vantagens", desc: "−50% tempo, paredes mais grossas, menos passadas, menos entupimento com filamentos especiais" },
                { label: "Desvantagens", desc: "Menos detalhes em peças pequenas, textos finos somem, pós-processamento mais difícil" },
              ],
              influences: "Vazão volumétrica, tempo total, resolução XY mínima, exigência de hotend.",
              generates: "Comparativo de tempo numa mesma peça: 0.4mm = 4h, 0.6mm = 2h, 0.8mm = 1h.",
              howTo: [
                { step: "Trocar bico físico", path: "Hotend frio → bico novo", desc: "Instalar bico do novo diâmetro" },
                { step: "Atualizar perfil", path: "Impressora → Configurações do Extrusor", desc: "Alterar Diâmetro do bico para 0.6mm" },
                { step: "Largura da linha", path: "Qualidade → Largura", desc: "Ajustar para 0.60-0.65mm" },
                { step: "Altura da camada", path: "Qualidade → Altura", desc: "Aumentar para 0.24-0.36mm" },
                { step: "Calibrar MVS", path: "Calibração → Max Volumetric Speed", desc: "Confirmar que o hotend aguenta o novo fluxo" },
              ],
              goldenRule: "Bicos maiores = peças rápidas e resistentes. Bicos menores = detalhes e precisão.",
            },
            {
              name: "Adaptive Layer Height",
              value: "On (variação 0.08-0.28mm)",
              whatIs: "Recurso que ajusta automaticamente a altura da camada conforme a geometria — fina em curvas/detalhes, grossa em áreas planas.",
              whyAdjust: "Otimiza qualidade e tempo simultaneamente — não precisa escolher entre os dois.",
              influences: "Tempo de impressão, qualidade visual em curvas, suavidade de superfícies inclinadas.",
              generates: "Mesma qualidade percebida com 25% menos tempo em peças com áreas mistas (planas + curvas).",
              howTo: [
                { step: "Acessar configuração", path: "Qualidade → Altura da camada", desc: "Abrir o painel de altura" },
                { step: "Ativar Adaptive", path: "Clicar em 'Camadas Adaptativas'", desc: "Habilitar a função" },
                { step: "Definir variação", path: "Ex: 0.08-0.28mm", desc: "Faixa mínima e máxima permitida" },
                { step: "Aplicar", path: "OrcaSlicer ajusta automaticamente", desc: "O slicer analisa a geometria e decide" },
              ],
              goldenRule: "Use sempre que a peça tiver áreas planas E curvas — ganho gratuito de tempo.",
            },
            {
              name: "Perfis de Eficiência",
              value: "Rápido / Estrutural",
              whatIs: "Dois perfis prontos balanceando eficiência e função — apliquen conforme o tipo de peça.",
              influences: "Tempo total, peso, resistência, custo por peça.",
              generates: "Reduções consistentes de 30-65% em tempo conforme o perfil escolhido.",
              optionsTable: {
                headers: ["Parâmetro", "Rápido (Decorativo)", "Estrutural Eficiente"],
                rows: [
                  ["Bico", "0.6mm", "0.6mm"],
                  ["Altura da camada", "0.28mm", "0.20mm"],
                  ["Largura da linha", "0.60mm", "0.60mm"],
                  ["Paredes", "2", "4"],
                  ["Infill", "Lightning 10%", "Gyroid 20%"],
                  ["Velocidade", "150 mm/s", "80 mm/s"],
                  ["Tempo (relativo)", "50%", "70%"],
                ],
              },
              summaryTable: {
                title: "Tabela de Decisão Rápida",
                headers: ["Necessidade", "Bico", "Altura", "Infill", "Paredes", "Tempo"],
                rows: [
                  ["Máxima qualidade", "0.4mm", "0.12mm", "Gyroid 30%", "4", "100%"],
                  ["Equilíbrio", "0.4mm", "0.20mm", "Gyroid 20%", "4", "70%"],
                  ["Rápido", "0.6mm", "0.24mm", "Lightning 15%", "3", "50%"],
                  ["Ultra rápido", "0.6mm", "0.28mm", "Lightning 10%", "2", "35%"],
                ],
              },
              example: {
                piece: "100 organizadores de mesa (sem carga)",
                config: "Bico 0.6 + Lightning 10% + 2 paredes + 0.28mm + 150 mm/s",
                result: "45min/peça (vs 1h30), 80g (vs 150g), custo −50%, produção 10/dia (vs 5)",
              },
              errorsTable: {
                headers: ["Sintoma", "Causa", "Solução"],
                rows: [
                  ["Peça quebra", "Otimização excessiva", "Aumentar paredes/infill"],
                  ["Superfície superior irregular", "Lightning insuficiente", "Aumentar densidade ou top layers"],
                  ["Detalhes perdidos", "Bico 0.6 muito grande", "Usar 0.4mm para detalhes"],
                  ["Tempo ainda alto", "Bico padrão 0.4", "Trocar para 0.6mm"],
                ],
              },
              goldenRule: "Combine bico 0.6 + Lightning + Adaptive para máximo ganho em decorativos. Bico 0.6 + Gyroid 20% + 4 paredes para estruturais eficientes.",
            },
          ],
        }),
    ],
  },

  {
    id: "estudos-caso", number: 8, title: "Estudos de Caso Reais",
    tagline: "A configuração ideal para cada tipo de geometria",
    level: "Avançado", duration: "1h 30min",
    methodology: "Metodologia estruturada: análise de requisitos → matriz de decisão → configuração → validação. Aplicada a 6 casos reais (3 funcionais + 3 estéticos).",
    objective: "Desenvolver capacidade de analisar qualquer peça, identificar requisitos funcionais/estéticos e configurar o OrcaSlicer para o melhor resultado possível.",
    lessons: [
      L(1, "analise-requisitos", "Análise de Requisitos e Metodologia", "30min",
        ["Checklist funcional", "Matriz de decisão", "Ferramentas de análise"], {
          theory: [
            "Análise de requisitos é o processo de examinar uma peça ANTES de imprimir para identificar suas necessidades funcionais, estéticas e estruturais. É a etapa mais importante — define todas as configurações subsequentes.",
            "Por que importa: evita retrabalho, garante que a peça atenda aos requisitos, otimiza recursos e reduz falhas. Ignorar essa etapa = falha previsível.",
            "Analogia: o arquiteto não começa construindo. Ele analisa terreno, clima e necessidades dos moradores antes de projetar fundação, paredes e telhado. Impressão 3D segue a mesma lógica.",
            "Quatro pilares da análise: (1) Função, (2) Estética, (3) Estrutura, (4) Restrições de impressão. Cada pilar tem perguntas-chave que determinam configuração.",
            "Documentar o checklist no .3mf como nota técnica transforma cada projeto em manual de boas práticas para os próximos.",
          ],
          integrations: [
            { module: "Módulo 6 (Engenharia)", text: "Requisitos definem material, orientação, paredes e infill — não comece pelo slicer." },
            { module: "Módulo 4 (Materiais)", text: "Pergunta 'ambiente de uso' decide PLA vs PETG vs ASA vs Nylon." },
            { module: "Módulo 7 (Otimização)", text: "Áreas críticas vs não críticas saem da análise — base da otimização inteligente." },
            { module: "Módulo 16 (Casos+)", text: "Estudos estendidos detalham 6 receitas comerciais aplicáveis direto." },
          ],
          params: [
            { param: "Checklist Funcional", value: "4 pilares × 4 perguntas", action: "Função, estética, estrutura, restrições" },
            { param: "Matriz de Decisão", value: "Critério × Prioridade", action: "Decide trade-offs entre resistência, estética, velocidade, custo" },
            { param: "Notas no .3mf", value: "Documentadas", action: "Histórico técnico por projeto" },
            { param: "Análise de Saliências", value: "Áreas > 45°", action: "Identifica necessidade de suportes" },
          ],
          goldenRule: "Nunca imprima sem antes analisar. Entenda o que a peça precisa fazer, onde vai ficar e quais forças vai sofrer. Configuração correta começa com análise correta.",
          errors: [
            { error: "Peça externa em PLA quebra/derrete", solution: "Checklist ignorou ambiente — ASA/PETG mínimo para externo" },
            { error: "Cliente devolve por motivo previsível", solution: "Pular checklist = retrabalho garantido — aplique sempre" },
            { error: "Otimização ferrou parte crítica", solution: "Áreas críticas não foram mapeadas antes de configurar" },
            { error: "Suportes inesperados aumentam tempo", solution: "Análise de Saliências antes de fatiar, não depois" },
          ],
          finance: "5 minutos de análise economizam 5 horas de retrabalho. Em produção comercial, checklist obrigatório reduz devoluções em 60-80%.",
          exercise: [
            "Pegue uma peça atual e responda os 4 pilares por escrito",
            "Monte uma matriz de decisão com 5 critérios para a peça",
            "Anote tudo como nota no arquivo .3mf",
            "Compare com a peça impressa sem análise — note as diferenças",
          ],
          paramDetails: [{
            name: "Metodologia de Análise",
            value: "4 Pilares + Matriz",
            whatIs: "Processo estruturado em 4 passos para extrair todos os requisitos de uma peça antes de tocar no OrcaSlicer.",
            whyAdjust: "Sem metodologia, configuração vira tentativa-e-erro. Com metodologia, vira engenharia repetível.",
            types: [
              { label: "Pilar 1 — Função", desc: "Para que serve, onde usa, quanto dura, quais forças sofre" },
              { label: "Pilar 2 — Estética", desc: "Visível? Lisa? Cores? Textos/detalhes legíveis?" },
              { label: "Pilar 3 — Estrutura", desc: "Carga máxima, direção, temperatura, exposição química" },
              { label: "Pilar 4 — Restrições", desc: "Cabe na mesa? Suportes? Pode ser dividida? Material disponível?" },
            ],
            influences: "Material, orientação, paredes, infill, altura de camada, velocidade, suportes, pós-processamento.",
            influencesList: [
              "Função → material e resistência exigida",
              "Estética → camada fina, costura, ironing",
              "Estrutura → paredes, infill, orientação por carga",
              "Restrições → dividir, orientar, escolher suporte",
            ],
            generates: "Checklist completo com 16 perguntas — responda todas antes de fatiar.",
            generatesTable: {
              headers: ["Pilar", "Pergunta", "O que decide"],
              rows: [
                ["Função", "Para que serve?", "Material e robustez"],
                ["Função", "Onde vai ser usada?", "PLA/PETG/ASA/Nylon"],
                ["Função", "Quanto deve durar?", "Material + paredes"],
                ["Função", "Quais forças sofre?", "Orientação + paredes + infill"],
                ["Estética", "É visível?", "Camada fina + costura"],
                ["Estética", "Precisa ser lisa?", "Ironing + top layers"],
                ["Estética", "Tem cores?", "Multimaterial ou pintura"],
                ["Estética", "Tem textos?", "Bico 0.4mm + camada 0.12"],
                ["Estrutura", "Carga máxima?", "Paredes e infill"],
                ["Estrutura", "Direção da carga?", "Orientação"],
                ["Estrutura", "Temperatura?", "Material"],
                ["Estrutura", "Química/UV?", "ASA/Nylon/PETG"],
                ["Restrições", "Cabe na mesa?", "Cortar (Cut) ou trocar impressora"],
                ["Restrições", "Suportes?", "Tree Organic ou reorientar"],
                ["Restrições", "Dividir?", "Cut + orientar partes"],
                ["Restrições", "Material disponível?", "Ajustar projeto à realidade"],
              ],
            },
            optionsTable: {
              headers: ["Critério Prioritário", "Decisão Recomendada"],
              rows: [
                ["Resistência alta", "Paredes 4-6 + Gyroid 25-40% + PETG/ABS"],
                ["Estética alta", "Camadas 0.12mm + Ironing + PLA"],
                ["Velocidade alta", "Bico 0.6mm + Lightning + camadas grossas"],
                ["Custo baixo", "Lightning Infill + PLA + menos paredes"],
                ["Durabilidade alta", "ABS/ASA/Nylon + paredes 5+ + infill 30%+"],
              ],
            },
            integrationsTable: {
              headers: ["Ferramenta OrcaSlicer", "Função", "Quando Usar"],
              rows: [
                ["Medir", "Mede dimensões da peça", "Verificar tamanho e folgas"],
                ["Fatiar", "Visualização camada por camada", "Inspecionar suportes e overhangs"],
                ["Pré-visualizar", "Resultado final simulado", "Confirmar configurações"],
                ["Análise de Saliências", "Mostra áreas > 45°", "Identificar suportes necessários"],
              ],
            },
            howTo: [
              { step: "Pilar 1 — Função", path: "Responder 4 perguntas", desc: "Para quê, onde, quanto, quais forças" },
              { step: "Pilar 2 — Estética", path: "Responder 4 perguntas", desc: "Visível, lisa, cores, detalhes" },
              { step: "Pilar 3 — Estrutura", path: "Responder 4 perguntas", desc: "Carga, direção, temp, química" },
              { step: "Pilar 4 — Restrições", path: "Responder 4 perguntas", desc: "Mesa, suportes, divisão, material" },
              { step: "Matriz de Decisão", path: "Critério × Prioridade", desc: "Decidir trade-offs antes de configurar" },
              { step: "Documentar no .3mf", path: "Notas técnicas", desc: "Histórico para próximos projetos" },
            ],
            example: {
              piece: "Caixa para projeto eletrônico que ficará na garagem (calor + UV moderado)",
              config: "Análise → ASA (UV+calor), 4 paredes, Gyroid 25%, deitado, com brim",
              result: "Caixa dura anos sem amarelar/deformar; PLA derreteria em meses",
            },
            errorsTable: {
              headers: ["Sintoma", "Causa", "Solução"],
              rows: [
                ["Peça derrete/quebra", "Pilar 'ambiente' ignorado", "ASA/PETG mínimo para externo"],
                ["Cliente devolve", "Análise pulada", "Aplicar checklist sempre"],
                ["Otimização ferrou função", "Pilar 'estrutura' incompleto", "Mapear áreas críticas antes"],
                ["Suportes inesperados", "Análise de Saliências ignorada", "Conferir antes de fatiar"],
              ],
            },
            goldenRule: "5 minutos de análise economizam 5 horas de retrabalho. Documente sempre.",
          }],
          checklist: [
            "Função, estética, estrutura e restrições respondidos por escrito",
            "Matriz de decisão preenchida com prioridades reais",
            "Análise de Saliências verificada antes de fatiar",
            "Material escolhido conforme ambiente de uso",
            "Notas técnicas salvas no .3mf",
          ],
        }),
      L(2, "pecas-funcionais", "Peças Funcionais — Suportes, Dobradiças e Engrenagens", "30min",
        ["Suporte de carga", "Dobradiça articulada", "Engrenagem mecânica", "Tolerâncias"], {
          theory: [
            "Peças funcionais têm função mecânica específica: precisam suportar cargas, exigem precisão dimensional e durabilidade. Geralmente internas ou estruturais — estética é secundária.",
            "Requisitos comuns: resistência estrutural, precisão dimensional, durabilidade, baixa deformação sob carga contínua ou cíclica.",
            "Materiais recomendados: PETG (equilíbrio), ABS (alta resistência), Nylon (máxima resistência + mecânica), PLA+ (resistência moderada para protótipo funcional).",
            "Três casos clássicos cobrem 80% das peças funcionais: suporte de parede (flexão), dobradiça (tração/compressão alternadas), engrenagem (torção contínua).",
            "Receita base universal para funcionais: 4-6 paredes + Gyroid 25-40% + orientação que alinhe camadas com a carga principal + tolerâncias calibradas.",
          ],
          integrations: [
            { module: "Módulo 6 (Engenharia)", text: "Toda peça funcional aplica anisotropia + orientação por carga." },
            { module: "Módulo 5 (Calibração)", text: "Tolerâncias dimensionais exigem XY Compensation calibrado." },
            { module: "Módulo 13 (Tolerâncias)", text: "Encaixes móveis pedem folga ±0.15mm; estáticos ±0.05mm." },
          ],
          params: [
            { param: "Paredes (funcional)", value: "4-6", action: "Base da resistência" },
            { param: "Infill (funcional)", value: "Gyroid 25-40%", action: "Distribuição isotrópica" },
            { param: "Altura camada (funcional)", value: "0.12-0.16mm", action: "Adesão Z + precisão" },
            { param: "Orientação", value: "Camadas paralelas à carga principal", action: "Anisotropia favorável" },
            { param: "Material (geral)", value: "PETG", action: "Equilíbrio resistência/facilidade" },
            { param: "Material (mecânico)", value: "Nylon+CF", action: "Engrenagens, alta carga" },
            { param: "Tolerância encaixe móvel", value: "+0.15mm XY", action: "Folga para articulação" },
          ],
          goldenRule: "Peças funcionais exigem precisão e resistência. Paredes grossas (4-6), Gyroid, orientação alinhada com a carga e tolerâncias calibradas.",
          errors: [
            { error: "Suporte deforma sob carga", solution: "Subir paredes para 5-6 e usar PETG; verificar orientação" },
            { error: "Dobradiça travando", solution: "Aumentar folga XY para +0.15mm; calibrar XY Compensation" },
            { error: "Dente de engrenagem quebra", solution: "Trocar para Nylon+CF; camada 0.12mm; 6 paredes" },
            { error: "Pino de dobradiça frágil", solution: "Camadas paralelas ao eixo; PETG ou PLA+; 4 paredes" },
          ],
          finance: "Peças funcionais sob encomenda têm margem 3-5× maior que decorativos. Investir em PETG/Nylon e bico aço retorna em poucas peças.",
          exercise: [
            "Imprima o suporte de parede em L com receita PETG e teste com 10kg",
            "Imprima dobradiça com folga +0.15mm e teste movimento",
            "Imprima engrenagem em Nylon+CF e teste sob torque",
            "Documente medidas reais vs nominais",
          ],
          paramDetails: [
            {
              name: "Caso 1 — Suporte de Parede em L",
              value: "PETG, 5 paredes, Gyroid 30%",
              whatIs: "Suporte estrutural para prateleira que sofre flexão constante (peso vertical sobre braço horizontal).",
              whyAdjust: "Curva do L é ponto de máxima tensão — exige orientação e parede otimizadas.",
              influences: "Capacidade de carga, deformação ao longo do tempo, durabilidade.",
              generates: "Suporte que aguenta 10 kg distribuídos sem deformar.",
              generatesTable: {
                headers: ["Parâmetro", "Valor", "Motivo"],
                rows: [
                  ["Bico", "0.4mm", "Equilíbrio qualidade/velocidade"],
                  ["Altura da camada", "0.16mm", "Resistência entre camadas"],
                  ["Paredes", "5", "Resistência estrutural"],
                  ["Infill", "Gyroid 30%", "Distribuição isotrópica"],
                  ["Orientação", "Deitado", "Camadas alinhadas com a carga"],
                  ["Material", "PETG", "Durabilidade + adesão Z"],
                  ["Temperatura", "240°C", "PETG ideal"],
                  ["Mesa", "80°C", "Adesão PETG"],
                  ["Suportes", "Tree Organic na curva", "Área crítica"],
                  ["Brim", "5-8mm", "Peça grande precisa adesão extra"],
                ],
              },
              goldenRule: "Curva do L deve ter camadas contínuas paralelas à carga. Brim obrigatório.",
            },
            {
              name: "Caso 2 — Dobradiça Articulada",
              value: "PETG/PLA+, 4 paredes, Gyroid 25%, folga +0.15mm",
              whatIs: "Peça articulada com pino central que sofre tração e compressão alternadas em movimento repetitivo.",
              whyAdjust: "Tolerância no pino define se vai travar ou ter folga excessiva. Calibração de XY Compensation é crítica.",
              influences: "Movimento livre, durabilidade do pino, vida útil em ciclos.",
              generates: "Dobradiça que articula livremente e suporta 5kg por ciclo.",
              generatesTable: {
                headers: ["Parâmetro", "Valor", "Motivo"],
                rows: [
                  ["Bico", "0.4mm", "Precisão dimensional crítica"],
                  ["Altura da camada", "0.12mm", "Precisão no pino"],
                  ["Paredes", "4", "Resistência sem perder precisão"],
                  ["Infill", "Gyroid 25%", "Distribuição de forças"],
                  ["Orientação", "Deitado, eixo paralelo à mesa", "Camadas alinhadas com carga"],
                  ["Tolerância XY", "+0.15mm", "Folga para articulação"],
                  ["Parede precisa", "On", "Dimensões exatas"],
                  ["Suportes", "Tree Organic", "Remoção fácil"],
                  ["Material", "PETG ou PLA+", "Resistência cíclica"],
                ],
              },
              goldenRule: "Teste folga com peça pequena primeiro. +0.15mm é ponto inicial — ajuste por impressora.",
            },
            {
              name: "Caso 3 — Engrenagem",
              value: "Nylon+CF, 6 paredes, Gyroid 40%, bico aço",
              whatIs: "Engrenagem mecânica que sofre torção constante e atrito nos dentes.",
              whyAdjust: "Dentes são pontos de máxima tensão. Material errado = desgaste rápido. Bico errado = entupimento.",
              influences: "Resistência à torção, durabilidade dos dentes, precisão do engrenamento.",
              generates: "Engrenagem que aguenta torque moderado por milhares de ciclos.",
              generatesTable: {
                headers: ["Parâmetro", "Valor", "Motivo"],
                rows: [
                  ["Bico", "0.4mm aço endurecido", "Precisão + suportar fibra"],
                  ["Altura da camada", "0.12mm", "Detalhe dos dentes"],
                  ["Paredes", "6", "Resistência à torção"],
                  ["Infill", "Gyroid 40%", "Distribuição de torção"],
                  ["Orientação", "Deitado", "Camadas contínuas nos dentes"],
                  ["Material", "Nylon+CF", "Resistência ao desgaste"],
                  ["Pressure Advance", "Calibrado", "Cantos precisos"],
                  ["Parede precisa", "On", "Dentes exatos"],
                  ["Enclosure", "Obrigatório", "Nylon exige"],
                  ["Secador ativo", "On", "Nylon higroscópico"],
                ],
              },
              goldenRule: "Sem bico aço + secador + enclosure, não tente Nylon-CF. Infraestrutura é pré-requisito.",
            },
            {
              name: "Comparativo Funcionais",
              value: "Quick reference",
              whatIs: "Tabela síntese das 3 receitas funcionais clássicas.",
              influences: "Escolha rápida quando o tipo de peça já está identificado.",
              generates: "Configuração base aplicável direto após análise de requisitos.",
              summaryTable: {
                title: "Receitas Funcionais",
                headers: ["Peça", "Material", "Paredes", "Infill", "Altura", "Orientação"],
                rows: [
                  ["Suporte", "PETG", "5", "Gyroid 30%", "0.16mm", "Deitado"],
                  ["Dobradiça", "PLA+ ou PETG", "4", "Gyroid 25%", "0.12mm", "Deitado"],
                  ["Engrenagem", "Nylon+CF", "6", "Gyroid 40%", "0.12mm", "Deitado"],
                ],
              },
              errorsTable: {
                headers: ["Sintoma", "Causa", "Solução"],
                rows: [
                  ["Suporte deforma", "Paredes insuficientes", "5-6 paredes + PETG"],
                  ["Dobradiça trava", "Folga insuficiente", "+0.15mm + XY Comp calibrado"],
                  ["Dente quebra", "Material/parede fracos", "Nylon+CF + 6 paredes"],
                  ["Pino frágil", "Orientação errada", "Camadas paralelas ao eixo"],
                ],
              },
              goldenRule: "Receita base + ajuste por análise de requisitos = peça funcional confiável.",
            },
          ],
        }),
      L(3, "pecas-esteticas", "Peças Estéticas — Vaso, Busto e Luminária", "30min",
        ["Modo Vaso Espiral", "Seam Painting", "Ironing", "Tree Organic", "Acabamento premium"], {
          theory: [
            "Peças estéticas têm a estética como função principal. Não sofrem cargas significativas — o foco é superfície lisa, detalhes nítidos, cores fiéis e ausência de marcas visíveis (costuras, suportes).",
            "Requisitos comuns: superfície uniforme, detalhes preservados, costura invisível ou oculta, sem marcas de suporte, boa reprodução de cores e texturas.",
            "Materiais recomendados: PLA (melhor acabamento), PLA Silk (brilho metálico), PLA Matte (fosco premium), PETG (acabamento bom + mais resistente para uso semi-funcional).",
            "Três casos clássicos cobrem 90% dos decorativos: vaso (sem costura, modo espiral), busto (overhangs + costura escondida), luminária (translúcida com padrão vazado).",
            "Técnicas premium: Modo Vaso Espiral elimina costura, Scarf Seam suaviza junções, Seam Painting esconde onde quiser, Ironing aliza topo, Tree Organic remove sem marcas.",
          ],
          integrations: [
            { module: "Módulo 3 (Qualidade)", text: "Ironing, Scarf Seam e Seam Painting saem direto do módulo de qualidade." },
            { module: "Módulo 19 (Suportes)", text: "Tree Organic é padrão para estéticos — remove sem marcar superfície curva." },
            { module: "Módulo 17 (Acabamento)", text: "PLA Silk/Matte + pós-processamento abrem nicho de decoração premium." },
          ],
          params: [
            { param: "Altura camada (estético)", value: "0.12mm", action: "Detalhes finos + camadas invisíveis" },
            { param: "Material visual", value: "PLA / PLA Silk / PLA Matte", action: "Melhor acabamento" },
            { param: "Modo Vaso Espiral", value: "On (vasos)", action: "Sem costura, parede contínua" },
            { param: "Seam Position", value: "Rear / Painted", action: "Costura escondida" },
            { param: "Ironing", value: "On (topo plano)", action: "Superfície superior lisa" },
            { param: "Suporte", value: "Tree Organic", action: "Remoção sem marcas" },
            { param: "Infill (decorativo)", value: "Lightning 10% ou 0%", action: "Economia, sem carga" },
            { param: "Paredes (decorativo)", value: "2-3", action: "Suficiente para forma" },
          ],
          goldenRule: "Peças estéticas exigem acabamento impecável. PLA + camadas 0.12mm + Tree Organic + Ironing + costura oculta. Resultado digno de vitrine.",
          errors: [
            { error: "Costura visível na frente", solution: "Seam Position 'Rear' ou usar Seam Painting" },
            { error: "Marcas de suporte na superfície curva", solution: "Tree Organic + Z Gap maior + Support Painting" },
            { error: "Topo rugoso", solution: "Ironing + 5-6 top layers + flow 15%" },
            { error: "Linhas de camada visíveis", solution: "Camada 0.12mm + PLA Matte (esconde camadas)" },
            { error: "Vaso com defeito na junção", solution: "Modo Vaso Espiral (elimina costura)" },
          ],
          finance: "Decorativos com acabamento premium (PLA Silk, Ironing, sem costura visível) vendem por 3-5× o preço de versão sem cuidado.",
          exercise: [
            "Imprima um vaso com Modo Vaso Espiral em PLA Silk",
            "Imprima um busto com Seam Painting + Tree Organic",
            "Imprima uma luminária com 0% infill e PLA branco translúcido",
            "Compare cada um com versão sem técnicas premium",
          ],
          paramDetails: [
            {
              name: "Caso 1 — Vaso Decorativo (Espiral)",
              value: "PLA Silk, Modo Vaso, 0% infill",
              whatIs: "Vaso impresso em espiral contínua (sem mudança de camada), eliminando completamente a costura.",
              whyAdjust: "Modo Vaso transforma a peça em uma parede helicoidal — superfície externa fica perfeita, sem nenhuma costura visível.",
              influences: "Acabamento visual, ausência de defeitos, tempo de impressão (mais rápido), peso (mais leve).",
              generates: "Vaso com superfície contínua e brilho metálico do PLA Silk.",
              generatesTable: {
                headers: ["Parâmetro", "Valor", "Motivo"],
                rows: [
                  ["Modo", "Vaso Espiral (Spiral Vase)", "Sem costuras, superfície contínua"],
                  ["Bico", "0.4mm", "Qualidade"],
                  ["Altura da camada", "0.12mm", "Superfície lisa"],
                  ["Largura da linha", "0.42mm", "Padrão"],
                  ["Paredes", "1 (modo vaso)", "Apenas parede externa"],
                  ["Infill", "0%", "Vaso vazio"],
                  ["Orientação", "Em pé", "Forma natural"],
                  ["Material", "PLA Silk", "Brilho metálico"],
                ],
              },
              goldenRule: "Modo Vaso só funciona em peças com perímetro contínuo e sem topo sólido. Sem costuras = superfície perfeita.",
            },
            {
              name: "Caso 2 — Estatueta / Busto",
              value: "PLA Matte, costura Rear + Painted, Tree Organic",
              whatIs: "Peça decorativa com overhangs (nariz, queixo) e detalhes finos. Costura deve ficar escondida na parte de trás.",
              whyAdjust: "Tree Organic remove sem deixar marca nas superfícies curvas. Seam Painting permite controlar exatamente onde fica a costura.",
              influences: "Qualidade de detalhes, ausência de marcas, custo do material (Lightning economiza).",
              generates: "Busto sem marcas visíveis, costura na parte de trás, detalhes preservados.",
              generatesTable: {
                headers: ["Parâmetro", "Valor", "Motivo"],
                rows: [
                  ["Bico", "0.4mm", "Detalhes preservados"],
                  ["Altura da camada", "0.12mm", "Detalhes finos"],
                  ["Paredes", "3", "Suficiente para decoração"],
                  ["Infill", "Lightning 10%", "Economia, sem carga"],
                  ["Orientação", "Em pé ou 45°", "Equilíbrio detalhes/suporte"],
                  ["Costura", "Rear + Seam Painting", "Na parte de trás"],
                  ["Suportes", "Tree Organic + Support Painting", "Remoção sem marcas"],
                  ["Material", "PLA Matte", "Esconde linhas de camada"],
                ],
              },
              goldenRule: "PLA Matte + Tree Organic + Seam Painting = busto digno de exposição.",
            },
            {
              name: "Caso 3 — Luminária Translúcida",
              value: "PLA Branco, padrão vazado, 0% infill",
              whatIs: "Abajur com padrão geométrico vazado que aproveita a translucidez do PLA branco para difundir luz.",
              whyAdjust: "Pontes bem configuradas garantem que o padrão fique limpo. Infill 0% deixa a luz passar.",
              influences: "Qualidade visual do padrão, translucidez, difusão da luz.",
              generates: "Luminária com padrão limpo e luz difundida uniformemente.",
              generatesTable: {
                headers: ["Parâmetro", "Valor", "Motivo"],
                rows: [
                  ["Bico", "0.4mm", "Qualidade"],
                  ["Altura da camada", "0.16mm", "Equilíbrio"],
                  ["Paredes", "3", "Resistência mínima"],
                  ["Infill", "0%", "Vazado para luz"],
                  ["Orientação", "Em pé", "Natural"],
                  ["Suportes", "Tree Organic apenas onde necessário", "Mínimas marcas"],
                  ["Detect bridges", "On", "Pontes limpas"],
                  ["Bridge flow", "85%", "Pontes sem queda"],
                  ["Bridge speed", "40mm/s", "Pontes firmes"],
                  ["Material", "PLA Branco", "Translucidez ideal"],
                ],
              },
              goldenRule: "PLA branco difunde luz de forma única. Pontes bem calibradas + 0% infill = luminária profissional.",
            },
            {
              name: "Técnicas para Acabamento Premium",
              value: "Toolbox decorativo",
              whatIs: "Conjunto de técnicas do OrcaSlicer que transformam decorativos comuns em premium.",
              influences: "Acabamento visual, valor percebido, preço de venda.",
              generates: "Diferença qualitativa que justifica preço 3-5× maior.",
              optionsTable: {
                headers: ["Técnica", "O que faz", "Quando usar"],
                rows: [
                  ["Ironing", "Alisa superfície superior", "Topos planos visíveis"],
                  ["Scarf Seam", "Suaviza junção da costura", "Peças redondas (vasos, cilindros)"],
                  ["Seam Painting", "Esconde a costura onde escolher", "Peças com frente definida"],
                  ["Support Painting", "Suportes apenas onde marcar", "Áreas específicas"],
                  ["Tree Organic", "Suportes fáceis de remover", "Superfícies curvas"],
                  ["Modo Vaso Espiral", "Sem costura, parede contínua", "Vasos, cones, cilindros ocos"],
                ],
              },
              summaryTable: {
                title: "Comparativo de Decorativos",
                headers: ["Peça", "Material", "Modo", "Infill", "Altura", "Costura"],
                rows: [
                  ["Vaso", "PLA Silk", "Vaso Espiral", "0%", "0.12mm", "Nenhuma"],
                  ["Busto", "PLA Matte", "Normal", "Lightning 10%", "0.12mm", "Rear + Painted"],
                  ["Luminária", "PLA Branco", "Normal", "0%", "0.16mm", "Aligned"],
                ],
              },
              errorsTable: {
                headers: ["Sintoma", "Causa", "Solução"],
                rows: [
                  ["Costura visível", "Seam Position errada", "Rear ou Seam Painting"],
                  ["Marcas de suporte", "Suporte padrão em curva", "Tree Organic + Z Gap maior"],
                  ["Topo rugoso", "Sem Ironing", "Ativar Ironing + 5-6 top layers"],
                  ["Camadas visíveis", "Camada grossa em PLA brilhante", "0.12mm + PLA Matte"],
                  ["Vaso com defeito vertical", "Costura no modo normal", "Trocar para Modo Vaso Espiral"],
                ],
              },
              goldenRule: "PLA + camadas 0.12mm + Tree Organic + Ironing + Seam Painting = receita universal de decorativo premium.",
            },
          ],
          checklist: [
            "Altura de camada 0.12mm para detalhes finos",
            "Material visual escolhido (Silk/Matte/Branco) conforme efeito",
            "Costura definida (Rear, Painted ou eliminada via Vaso)",
            "Suportes em Tree Organic para superfícies curvas",
            "Ironing ativo em topos planos visíveis",
            "Lightning Infill ou 0% para peças sem carga",
          ],
        }),
    ],
  },

  {
    id: "comercial", number: 9, title: "Impressão 3D Comercial",
    tagline: "Transforme conhecimento em margem líquida",
    level: "Profissional", duration: "1h 10min",
    methodology: "Padronização de processos + planilha de precificação completa com custos diretos, indiretos e ocultos. Casos reais do mercado brasileiro (B2B, B2C, marketplaces).",
    objective: "Estruturar uma operação comercial sustentável: padronizar perfis, controle de qualidade, embalagem profissional, fluxo de trabalho e precificação correta com margem real.",
    lessons: [
      L(1, "mercado-padronizacao", "Mercado e Padronização", "30min",
        ["Segmentos B2B/B2C", "Perfis comerciais", "Controle de qualidade", "Embalagem", "Fluxo de trabalho"], {
          theory: [
            "Padronização comercial é o conjunto de processos que garantem que cada peça seja produzida com a mesma qualidade, consistência e eficiência — da primeira à centésima do lote. É a base de um negócio escalável.",
            "Por que importa: garante consistência entre lotes, reduz retrabalho/desperdício, aumenta confiança do cliente, permite escalar produção e profissionaliza a operação.",
            "Analogia: uma padaria. Todo pão deve sair com a mesma qualidade. Se um sai queimado e outro cru, o cliente não volta. Padronização garante que todos os pães sejam perfeitos.",
            "Estrutura de um negócio de impressão 3D: Vendas (atrai), Produção (imprime), Pós-produção (acabamento), Logística (embala/envia) e Financeiro (precifica/controla). Cada área precisa de processo documentado.",
            "Segmentos de mercado: B2B (volume + margem 20-30%), B2C (peças únicas, margem 50-100%), Educacional (kits, laboratórios), Serviços sob demanda e Produtos próprios (margem mais alta + escalabilidade).",
            "Perfis comerciais padronizados eliminam tentativa-e-erro: Rápido (0.28mm, 2 paredes, Lightning 10%), Padrão (0.20mm, 3 paredes, Gyroid 20%), Qualidade (0.12mm, 4 paredes, Gyroid 25%), Estrutural (0.16mm, 5 paredes, Gyroid 35%).",
            "Controle de qualidade exige checklist obrigatório: dimensões com paquímetro (±0.2mm), superfície sem fiapos/lacunas, camadas sem warping/separação, suportes limpos e acabamento pós-processado.",
            "Embalagem profissional comunica valor: pequenas (<100g) saco com zíper + caixa; médias (100-500g) papel bolha + caixa; grandes (>500g) isopor + caixa reforçada; frágeis com suporte interno.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "Perfis comerciais só são confiáveis sobre máquina calibrada — PA, Flow e PID antes." },
            { module: "Módulo 7 (Otimização)", text: "Perfis Rápido/Padrão usam Lightning + bico 0.6 para reduzir custo/tempo na faixa B2B." },
            { module: "Módulo 8 (Estudos de Caso)", text: "Análise de requisitos define qual perfil padronizado aplicar a cada pedido." },
            { module: "Módulo 14 (Troubleshooting)", text: "Checklist de QA captura falhas antes do envio — reduz devoluções." },
            { module: "Módulo 15 (Produção)", text: "Padronização viabiliza fazenda de impressão e gestão de fila." },
          ],
          params: [
            { param: "Perfil Rápido", value: "0.28mm / 2 paredes / Lightning 10%", action: "Protótipos e peças internas" },
            { param: "Perfil Padrão", value: "0.20mm / 3 paredes / Gyroid 20%", action: "Uso geral comercial" },
            { param: "Perfil Qualidade", value: "0.12mm / 4 paredes / Gyroid 25%", action: "Peças visíveis, clientes exigentes" },
            { param: "Perfil Estrutural", value: "0.16mm / 5 paredes / Gyroid 35%", action: "Peças técnicas, sob carga" },
            { param: "Tolerância dimensional", value: "±0.2mm", action: "Critério de aprovação no QA" },
            { param: "Documentação de lote", value: "Data + material + perfil + tempo + foto", action: "Arquivo de referência por cliente" },
          ],
          goldenRule: "Padronize seus perfis, documente seus processos e entregue qualidade consistente. Um cliente satisfeito volta e indica. A padronização é o que separa um hobby de um negócio.",
          errors: [
            { error: "Cliente insatisfeito por inconsistência", solution: "Padronizar perfis nomeados (ex: PLA_Padrao_0.20mm) e testar com benchy antes de liberar" },
            { error: "Prazo não cumprido em lote grande", solution: "Planejar gestão de fila com buffer de tempo de 20% para retrabalho" },
            { error: "Retrabalho recorrente", solution: "Implementar checklist de inspeção obrigatório antes da embalagem" },
            { error: "Peça chega danificada ao cliente", solution: "Adequar embalagem ao peso/fragilidade — isopor para >500g, suporte interno para frágeis" },
          ],
          finance: "Padronização reduz taxa de falha de 12% para 4-6% — em produção comercial, isso representa 6-8% de margem recuperada direto no resultado mensal.",
          exercise: [
            "Crie 4 perfis padronizados no OrcaSlicer (Rápido, Padrão, Qualidade, Estrutural)",
            "Teste cada perfil com um benchy e documente tempo, peso e qualidade",
            "Monte um checklist de QA com 5 itens críticos",
            "Defina a embalagem padrão para 3 faixas de peso",
            "Documente o fluxo de trabalho do pedido ao envio em uma página",
          ],
          paramDetails: [{
            name: "Padronização Comercial Completa",
            value: "Perfis + QA + Embalagem + Fluxo",
            whatIs: "Sistema integrado de processos que garante que toda peça produzida atenda ao mesmo padrão de qualidade, do orçamento à entrega.",
            whyAdjust: "Sem padronização, cada peça vira projeto novo — custo de setup explode e qualidade vira loteria. Com padronização, escala vira possibilidade real.",
            influences: "Consistência entre lotes, taxa de retrabalho, confiança do cliente, capacidade de escalar e profissionalismo percebido.",
            generates: "Operação previsível: mesmo perfil → mesmo tempo, mesmo custo, mesma qualidade — base de qualquer fazenda comercial.",
            optionsTable: {
              headers: ["Perfil", "Uso", "Configuração"],
              rows: [
                ["Rápido", "Protótipos, peças internas", "0.28mm, 2 paredes, Lightning 10%"],
                ["Padrão", "Uso geral comercial", "0.20mm, 3 paredes, Gyroid 20%"],
                ["Qualidade", "Peças visíveis, clientes exigentes", "0.12mm, 4 paredes, Gyroid 25%"],
                ["Estrutural", "Peças técnicas, cargas", "0.16mm, 5 paredes, Gyroid 35%"],
              ],
            },
            generatesTable: {
              headers: ["Segmento", "Características", "Oportunidades", "Margem típica"],
              rows: [
                ["B2B (Empresas)", "Grandes volumes, peças técnicas, contratos", "Engenharia, manufatura, prototipagem", "20-30%"],
                ["B2C (Consumidores)", "Peças únicas, personalizadas", "Decoração, acessórios, presentes", "50-100%"],
                ["Educacional", "Kits, material didático", "Escolas, universidades, cursos", "30-50%"],
                ["Serviços", "Impressão sob demanda, reparos", "Clientes sem impressora", "40-60%"],
                ["Produtos Próprios", "Desenvolvidos por você", "Mercado Livre, Shopee, Etsy", "60-150%"],
              ],
            },
            integrationsTable: {
              headers: ["Item QA", "O que verificar", "Critério de aprovação"],
              rows: [
                ["Dimensões", "Medidas com paquímetro", "Dentro da tolerância ±0.2mm"],
                ["Superfície", "Visual e tátil", "Sem lacunas, sem fiapos, lisa"],
                ["Camadas", "Uniformidade", "Sem separação, sem warping"],
                ["Suportes", "Áreas de contato", "Sem marcas, limpas"],
                ["Acabamento", "Pós-processamento", "Lixado, pintado, montado"],
              ],
            },
            howTo: [
              { step: "1. Recebimento", path: "Pedido", desc: "Captura geometria + requisitos do cliente" },
              { step: "2. Análise", path: "Modelo 3D", desc: "Geometria, requisitos, segmento" },
              { step: "3. Orçamento", path: "Planilha", desc: "Material, tempo, custos, margem" },
              { step: "4. Aprovação", path: "Cliente", desc: "Confirmação por escrito" },
              { step: "5. Produção", path: "Fatiar + imprimir", desc: "Aplicar perfil padronizado" },
              { step: "6. Pós-processamento", path: "Acabamento", desc: "Lixar, pintar, montar" },
              { step: "7. QA", path: "Checklist", desc: "Aprovar ou retrabalhar" },
              { step: "8. Embalagem", path: "Por faixa de peso", desc: "Proteção adequada + etiqueta" },
              { step: "9. Pós-venda", path: "Follow-up", desc: "Feedback + recompra" },
            ],
            example: {
              piece: "Lote de 50 suportes técnicos para cliente B2B recorrente",
              config: "Perfil Estrutural padronizado + QA com paquímetro + embalagem média + etiqueta com lote/data",
              result: "Lote entregue em 3 dias, zero devolução, cliente recompra mensal — relação de longo prazo iniciada",
            },
            errorsTable: {
              headers: ["Sintoma", "Causa", "Solução"],
              rows: [
                ["Cliente insatisfeito", "Qualidade inconsistente", "Padronizar perfis e processos"],
                ["Prazo não cumprido", "Gestão de fila ineficiente", "Planejar produção + buffer 20%"],
                ["Prejuízo no lote", "Precificação incorreta", "Revisar custos + margem"],
                ["Retrabalho recorrente", "QA falho", "Implementar checklist obrigatório"],
                ["Peça danificada no envio", "Embalagem inadequada", "Adequar por peso/fragilidade"],
              ],
            },
            goldenRule: "Padronize onde escala. Documente onde precisa repetir. Inspecione antes de enviar. Sempre.",
          }],
          checklist: [
            "4 perfis comerciais criados, nomeados e testados com benchy",
            "Checklist de QA aplicado a 100% dos lotes",
            "Embalagem padrão definida por faixa de peso",
            "Fluxo de trabalho documentado em 9 etapas",
            "Documentação de cada lote (data, material, perfil, tempo, foto)",
          ],
        }),
      L(2, "precificacao", "Precificação: Custo, Margem e Lucro Real", "40min",
        ["Custos diretos", "Custos indiretos", "Custos ocultos", "Fórmula de precificação", "Estratégias"], {
          theory: [
            "Precificação é o processo de determinar o preço de venda considerando TODOS os custos (material, energia, depreciação, mão de obra, pós-processamento, embalagem, frete, taxas) + margem de lucro. Precificar certo é o que sustenta o negócio.",
            "Analogia: um restaurante. O preço do prato não é só o custo dos ingredientes — inclui cozinha, garçom, aluguel, energia e lucro. Impressão 3D funciona igual.",
            "Custos diretos = material (filamento + 20% de suportes + 10% de perdas), energia (potência × horas × tarifa), depreciação (impressora R$2500 ÷ 10.000h = R$0,25/h + bicos + manutenção R$0,50/h).",
            "Custos indiretos = mão de obra (tempo × valor/hora R$30), pós-processamento (tempo × valor/hora), embalagem (material + tempo), frete (PAC ~R$20) e taxas de marketplaces (10-20%).",
            "Fórmula consagrada: Custo Total = Material + Energia + Depreciação + Mão de Obra + Pós + Embalagem + Frete + Taxas. Preço = Custo Total ÷ (1 − Margem). Margem 50% significa dividir por 0,5 (= multiplicar por 2).",
            "Exemplo prático: peça 72g em PLA, 3h → R$8,64 filamento + R$2,40 energia + R$1,50 depreciação + R$15 mão de obra + R$7,50 pós + R$7,50 embalagem = R$42,54 de custo. Margem 50% → preço final R$85,08.",
            "Precificação por hora máquina é alternativa para serviços: Iniciante R$15-25/h, Intermediário R$25-40/h, Profissional R$40-60/h, Industrial R$60-100/h.",
            "Custos ocultos quebram negócios: falhas (5-10% do total), manutenção (R$50-200/mês), atualizações (R$200-500/ano) e tempo ocioso (reduz capacidade real em 20%). Sem incluir, margem é fictícia.",
            "Estratégias: Custo+Margem (recomendada, segura), Preço de Mercado (competitivo), Valor Agregado (peça exclusiva), Preço Dinâmico (sazonais). Comece sempre com Custo+50%.",
          ],
          integrations: [
            { module: "Módulo 4 (Materiais)", text: "Custo/g muda 5x entre PLA (R$0,12) e Nylon (R$0,40) — precificar errado por material zera margem." },
            { module: "Módulo 7 (Otimização)", text: "Lightning Infill + bico 0.6 reduzem custo direto 30-50% sem perder cliente." },
            { module: "Módulo 8 (Estudos de Caso)", text: "Cada caso (funcional, estético, técnico) tem faixa de margem distinta — não cobre igual." },
            { module: "Módulo 14 (Troubleshooting)", text: "Reduzir taxa de falha de 10% para 4% = 6% direto no lucro líquido." },
            { module: "Módulo 15 (Produção)", text: "Tempo ocioso da máquina entra como custo na fazenda de impressão." },
          ],
          params: [
            { param: "Custo filamento", value: "R$0,08-0,40/g", action: "PLA (R$0,12) a Nylon (R$0,40)" },
            { param: "Custo energia", value: "300W × R$0,80/kWh", action: "~R$0,24/h em SP residencial" },
            { param: "Depreciação máquina", value: "R$0,25/h", action: "Impressora R$2500 ÷ 10.000h" },
            { param: "Manutenção horária", value: "R$0,50/h", action: "R$100/mês ÷ 200h de uso" },
            { param: "Mão de obra", value: "R$30/h", action: "Referência mercado brasileiro" },
            { param: "Margem mínima", value: "50%", action: "Ponto de partida sustentável" },
            { param: "Contingência falhas", value: "10%", action: "Adicional sobre custo total" },
            { param: "Frete típico", value: "R$20 (PAC)", action: "Repassar ao cliente sempre" },
          ],
          goldenRule: "Precificar não é chute. Calcule custos reais: material + energia + depreciação + mão de obra + pós + embalagem + frete + taxas. Adicione 40-60% de margem. Um preço bem calculado sustenta o negócio.",
          errors: [
            { error: "Prejuízo no fim do mês", solution: "Recalcular custos completos e subir margem para mínimo de 50%" },
            { error: "Cliente reclama do preço", solution: "Comparar com mercado e oferecer perfil Rápido como entrada" },
            { error: "Poucos pedidos com preço alto", solution: "Reduzir margem em produtos de entrada e ampliar volume" },
            { error: "Trabalhando 'de graça'", solution: "Incluir custos ocultos: falhas 10% + manutenção R$1-2/h + 20% tempo ocioso" },
            { error: "Esquecer depreciação", solution: "Adicionar R$0,25-1,00/h fixo na planilha" },
            { error: "Mesmo preço para peça nova e repetida", solution: "Cobrar setup separado em projetos novos (1-2h de mão de obra)" },
          ],
          finance: "Margem 50% sobre custo total realista é o piso para sustentabilidade. Margem 100% é alcançável em B2C com peças exclusivas. Em B2B, 20-30% só fecha com volume mensal recorrente.",
          exercise: [
            "Monte planilha no Google Sheets com material, energia, depreciação, mão de obra, pós, embalagem, frete, taxas",
            "Calcule o custo real de 3 peças que você imprime hoje",
            "Defina o preço de venda com margem mínima de 50%",
            "Pesquise o preço de peças similares no Mercado Livre e Shopee",
            "Compare seu preço com o mercado e ajuste",
            "Inclua custos ocultos (falhas 10% + manutenção) e refaça o cálculo",
            "Crie o perfil comercial padrão e amarre à tabela de preços",
          ],
          paramDetails: [{
            name: "Planilha de Precificação Completa",
            value: "Custo Total ÷ (1 − Margem)",
            whatIs: "Modelo de cálculo que integra custos diretos, indiretos e ocultos com margem de lucro para chegar ao preço de venda sustentável.",
            whyAdjust: "Cada item omitido vira prejuízo silencioso. A planilha torna visível o que normalmente é esquecido — base para decisões financeiras reais.",
            influences: "Margem real, sustentabilidade financeira, capacidade de investir em melhorias, posicionamento no mercado e poder de negociação.",
            generates: "Preço de venda calculado por fórmula auditável: Custo Total ÷ (1 − Margem). Sem chute, sem prejuízo silencioso.",
            optionsTable: {
              headers: ["Item", "Valor Unitário", "Quantidade exemplo", "Subtotal"],
              rows: [
                ["Filamento PLA", "R$0,12/g", "72g", "R$8,64"],
                ["Energia", "R$0,80/kWh", "1,2 kWh (3h)", "R$0,96"],
                ["Depreciação", "R$0,50/h", "3h", "R$1,50"],
                ["Mão de obra", "R$30/h", "0,5h", "R$15,00"],
                ["Pós-processamento", "R$30/h", "0,25h", "R$7,50"],
                ["Embalagem", "R$5 + 5min × R$30", "1", "R$7,50"],
                ["Custo Total", "—", "—", "R$42,54"],
                ["Margem 50%", "Custo ÷ (1 − 0,50)", "—", "+ R$42,54"],
                ["Preço Final", "—", "—", "R$85,08"],
              ],
            },
            generatesTable: {
              headers: ["Material", "Custo/kg", "Custo/g", "Margem mínima recomendada"],
              rows: [
                ["PLA", "R$80-150", "R$0,08-0,15", "40-50%"],
                ["PETG", "R$100-180", "R$0,10-0,18", "45-55%"],
                ["ABS", "R$90-160", "R$0,09-0,16", "45-55%"],
                ["ASA", "R$150-250", "R$0,15-0,25", "50-60%"],
                ["TPU", "R$120-220", "R$0,12-0,22", "50-60%"],
                ["Nylon", "R$200-400", "R$0,20-0,40", "60-70%"],
              ],
            },
            integrationsTable: {
              headers: ["Estratégia", "Descrição", "Quando usar"],
              rows: [
                ["Custo + Margem", "Custo total + porcentagem fixa", "Recomendada — sempre como base"],
                ["Preço de Mercado", "Alinhado com concorrentes", "Mercado competitivo / commodity"],
                ["Valor Agregado", "Baseado no valor para o cliente", "Peças exclusivas, design próprio"],
                ["Preço Dinâmico", "Ajusta conforme demanda", "Produtos sazonais, nichos"],
              ],
            },
            howTo: [
              { step: "1. Mapear custos diretos", path: "Material + Energia + Depreciação", desc: "Valores por hora e por grama" },
              { step: "2. Mapear custos indiretos", path: "Mão de obra + Pós + Embalagem + Frete + Taxas", desc: "Tempo × valor/hora + insumos" },
              { step: "3. Somar Custo Total", path: "Diretos + Indiretos", desc: "Base da fórmula" },
              { step: "4. Definir margem", path: "40-60% inicial", desc: "Ajustar por segmento e material" },
              { step: "5. Aplicar fórmula", path: "Custo ÷ (1 − Margem)", desc: "Preço de venda" },
              { step: "6. Incluir custos ocultos", path: "+10% falhas + manutenção", desc: "Margem real, não fictícia" },
              { step: "7. Validar no mercado", path: "Comparar concorrentes", desc: "Ajuste fino" },
            ],
            example: {
              piece: "Suporte de parede em PETG, 120g, 4h de impressão",
              config: "R$14,40 filamento + R$3,20 energia + R$2,00 depreciação + R$30 mão de obra + R$15 pós + R$7,50 embalagem = R$72,10 custo. Margem 50% → R$144,20",
              result: "Preço competitivo no mercado (concorrentes R$130-160), margem real preservada, sem trabalhar de graça",
            },
            errorsTable: {
              headers: ["Sintoma", "Causa", "Solução"],
              rows: [
                ["Prejuízo recorrente", "Precificação baixa", "Recalcular e subir margem para 50%+"],
                ["Cliente acha caro", "Margem alta demais", "Comparar mercado + oferecer perfil Rápido"],
                ["Volume baixo", "Preço acima do mercado", "Reduzir margem + ganhar em volume"],
                ["Trabalhando de graça", "Sem custos ocultos", "Incluir falhas 10% + manutenção + tempo ocioso"],
                ["Esquecer depreciação", "Item ignorado", "Adicionar R$0,25-1,00/h fixo"],
              ],
            },
            goldenRule: "Custo Total ÷ (1 − Margem). Sem fórmula, sem negócio. Margem 50% é o mínimo para sustentar operação séria.",
          }],
          checklist: [
            "Planilha de precificação com todos os 8 itens de custo",
            "Margem mínima de 40-60% aplicada por segmento",
            "Custos ocultos (10% falhas + manutenção) incluídos",
            "Tabela de preços por material atualizada trimestralmente",
            "Validação periódica contra preços de mercado (ML/Shopee)",
          ],
        }),
    ],
  },


  {
    id: "mestre-orcaslicer", number: 10, title: "Mestre do OrcaSlicer",
    tagline: "Tour visual, diagnose integrada e desafios avançados",
    level: "Profissional", duration: "2h 30min",
    methodology: "Tour visual completo do painel esquerdo (5 partes) + diagnose com raciocínio clínico. Cada aula mapeia uma aba, suas interdependências e tabelas de decisão rápida.",
    objective: "Consolidar conhecimento integrando todas as telas do OrcaSlicer em visão panorâmica. Diagnosticar problemas complexos com raciocínio clínico e resolver qualquer desafio de impressão.",
    lessons: [
      L(1, "tour-qualidade", "Tour Visual — Painel Esquerdo (Parte 1): Qualidade", "25min",
        ["Altura da camada", "Largura da linha", "Costura (Seam)", "Precisão", "Ironing"], {
          theory: [
            "Tour Visual é o voo onde você usa todos os instrumentos juntos. Aprender cada parâmetro isolado é um pré-requisito; ver as interdependências é o que cria o piloto profissional.",
            "Aba QUALIDADE controla resolução vertical (altura), espessura de extrusão (largura) e onde a parede fecha (costura). Essas três decisões definem 70% da estética final.",
            "Altura da camada × Largura da linha são interdependentes: largura ideal = 1,1-1,2 × diâmetro do bico; altura ideal = 25-75% da largura. Sair dessa faixa quebra adesão Z e aparência.",
            "Costura (Seam) é onde a parede começa/fecha em cada camada. Posição errada = cicatriz vertical visível. Scarf Seam suaviza a transição diagonal entre camadas.",
            "Precisão (Gap, Resolução, XY Compensation) decide encaixes; Ironing passa o bico quente sobre a top layer com fluxo reduzido para acabamento espelhado.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "Largura de linha só é confiável após Flow Rate calibrado (E-step + Pressure Advance)." },
            { module: "Módulo 7 (Otimização)", text: "Adaptive Layer Height reduz tempo 20-30% sem perder detalhe nas zonas curvas." },
            { module: "Módulo 11 (Seams)", text: "Tour de costura aqui é introdução; M11 aprofunda Scarf Seam e seam painting." },
          ],
          params: [
            { param: "Altura camada", value: "0.12-0.28mm", action: "25-75% da largura da linha" },
            { param: "Largura linha", value: "0.38-0.50mm", action: "1.1-1.2× diâmetro do bico 0.4" },
            { param: "Costura padrão", value: "Aligned", action: "Equilíbrio estética/velocidade" },
            { param: "Ironing fluxo", value: "10-15%", action: "Top layer espelhada" },
          ],
          goldenRule: "Qualidade é o equilíbrio entre altura da camada, largura da linha e posição da costura. Domine as três e você terá peças bonitas e precisas.",
          errors: [
            { error: "Cicatriz vertical visível", solution: "Mudar costura para Rear ou Random; ativar Scarf Seam" },
            { error: "Camadas separando no Z", solution: "Reduzir altura para 50% da largura; aumentar temperatura 5°C" },
            { error: "Top layer com sulcos", solution: "Ativar Ironing 10-15% + reduzir velocidade top 30mm/s" },
          ],
          paramDetails: [{
            name: "Tour Aba Qualidade",
            value: "5 telas integradas",
            whatIs: "Mapa completo da aba Qualidade do OrcaSlicer, mostrando como Altura, Largura, Costura, Precisão e Ironing se interconectam.",
            whyAdjust: "Mexer em uma sem entender o impacto nas outras quebra o equilíbrio. O tour mostra o sistema completo.",
            optionsTable: {
              headers: ["Tela", "Parâmetros", "Função", "Interdependência"],
              rows: [
                ["Altura da Camada", "Layer Height, First Layer, Adaptive", "Resolução vertical", "Afeta tempo, resistência, qualidade"],
                ["Largura da Linha", "Padrão, Paredes, Infill, Ponte", "Espessura de extrusão", "Afeta resistência, qualidade, adesão"],
                ["Costura (Seam)", "Posição, Scarf Seam, Wipe", "Onde a parede começa/fecha", "Afeta estética, resistência"],
                ["Precisão", "Gap, Resolução, Compensações", "Exatidão dimensional", "Afeta encaixes, dimensões"],
                ["Ironing", "Tipo, Fluxo, Espaçamento", "Acabamento de superfície", "Afeta estética, lisura"],
              ],
            },
            generatesTable: {
              headers: ["Prioridade", "Altura", "Largura", "Costura"],
              rows: [
                ["Estética", "0.12mm", "0.38mm", "Rear/Random"],
                ["Equilíbrio", "0.20mm", "0.42mm", "Aligned"],
                ["Resistência", "0.16mm", "0.45mm", "Nearest"],
                ["Velocidade", "0.28mm", "0.50mm", "Aligned"],
              ],
            },
            integrationsTable: {
              headers: ["Ferramenta", "Atalho", "Função", "Quando usar"],
              rows: [
                ["Medir", "—", "Mede distâncias e ângulos", "Verificar dimensões"],
                ["Fatiar", "Ctrl+F", "Gera G-code", "Sempre antes de imprimir"],
                ["Preview", "Ctrl+P", "Visualiza camadas", "Verificar suportes/overhangs"],
                ["Modo Avançado", "—", "Revela parâmetros ocultos", "Configurações finas"],
              ],
            },
            influences: "Tempo total de impressão, resistência mecânica, acabamento visível e adesão entre camadas.",
            generates: "Configuração coerente da aba Qualidade — base para todas as demais decisões.",
            goldenRule: "Não otimize isoladamente. Altura, largura e costura formam um sistema único.",
          }],
        }),
      L(2, "tour-resistencia", "Tour Visual — Painel Esquerdo (Parte 2): Resistência", "25min",
        ["Gerador de Paredes", "Pontes", "Saliências", "Classic vs Arachne", "Infill"], {
          theory: [
            "Aba RESISTÊNCIA define a estrutura interna da peça: como as paredes são geradas, como vãos são cruzados e como overhangs são tratados.",
            "Classic gera paredes de largura uniforme (rápido, previsível). Arachne ajusta largura variável para preencher detalhes finos e textos sem lacunas — mais lento, porém indispensável em geometrias complexas.",
            "Pontes (bridges) cruzam vãos sem suporte. Regra ouro: 85% da largura, 40mm/s e 100% de fan resfriam rápido e evitam queda do filamento.",
            "Saliências (overhangs) acima de 45° normalmente exigem suporte. Detectar antes de fatiar evita falhas e retrabalho.",
          ],
          integrations: [
            { module: "Módulo 6 (Engenharia)", text: "Direção de paredes + tipo de infill definem anisotropia da peça." },
            { module: "Módulo 8 (Casos)", text: "Engrenagens e dobradiças usam Arachne para detalhes; suportes de carga usam Classic." },
          ],
          params: [
            { param: "Gerador padrão", value: "Arachne", action: "Detalhes finos sem lacunas" },
            { param: "Ponte largura", value: "85%", action: "Reduz peso do vão" },
            { param: "Ponte velocidade", value: "40mm/s", action: "Permite resfriamento" },
            { param: "Ponte fan", value: "100%", action: "Solidifica antes de cair" },
            { param: "Limiar saliência", value: "45°", action: "Decide necessidade de suporte" },
          ],
          goldenRule: "Arachne para detalhes, Classic para estrutura. Pontes: 85% largura, 40mm/s, 100% fan. Saliências >45° pedem suporte.",
          errors: [
            { error: "Texto com lacunas", solution: "Mudar gerador para Arachne" },
            { error: "Ponte caída/fiapos", solution: "Reduzir velocidade para 40mm/s e fan 100%" },
          ],
          paramDetails: [{
            name: "Tour Aba Resistência",
            value: "5 telas integradas",
            whatIs: "Mapa da aba Resistência: gerador de paredes, pontes, saliências e infill em visão sistêmica.",
            whyAdjust: "Resistência é estrutural: cada parâmetro afeta carga máxima, peso e tempo de impressão.",
            optionsTable: {
              headers: ["Critério", "Classic", "Arachne"],
              rows: [
                ["Detalhes finos", "Pode falhar", "Preenche perfeitamente"],
                ["Paredes uniformes", "Excelente", "Variável"],
                ["Textos", "Pode ter lacunas", "Excelente"],
                ["Peças estruturais", "Bom", "Bom"],
                ["Velocidade", "Mais rápido", "Mais lento"],
              ],
            },
            generatesTable: {
              headers: ["Cenário", "Gerador", "Pontes", "Saliências"],
              rows: [
                ["Textos, logotipos", "Arachne", "85%", "Suportes"],
                ["Engrenagens", "Arachne", "90%", "Sem suportes"],
                ["Suportes estruturais", "Classic", "100%", "Sem suportes"],
                ["Peças orgânicas", "Arachne", "85%", "Tree Organic"],
              ],
            },
            integrationsTable: {
              headers: ["Tela", "Parâmetros", "Função"],
              rows: [
                ["Gerador de Paredes", "Classic/Arachne", "Algoritmo de paredes"],
                ["Paredes e Superfícies", "Ordem, Fluxo, Precisão", "Estrutura da parede"],
                ["Pontes", "Largura, Fluxo, Densidade", "Cruzamento de vãos"],
                ["Saliências", "Detectar, Reversão", "Overhangs >45°"],
                ["Preenchimento", "Padrão, Densidade, Direção", "Estrutura interna"],
              ],
            },
            influences: "Resistência mecânica, peso, tempo de impressão e qualidade de detalhes.",
            generates: "Estrutura interna coerente com a função da peça.",
            goldenRule: "Arachne resolve detalhes; Classic resolve volume. Escolha pela geometria, não pelo hábito.",
          }],
        }),
      L(3, "tour-velocidade", "Tour Visual — Painel Esquerdo (Parte 3): Velocidade", "25min",
        ["Primeira camada", "Velocidades por tipo de linha", "Aceleração", "Jerk"], {
          theory: [
            "Aba VELOCIDADE é um sistema: parede externa lenta (40-60mm/s) para qualidade visível, infill rápido (150mm/s) para eficiência, aceleração baixa nas paredes externas para evitar ghosting.",
            "Primeira camada SEMPRE devagar (20-30mm/s) — adesão na placa é base de tudo. Travel pode ser rápido (150-250mm/s).",
            "Aceleração controla a mudança de velocidade; jerk controla a suavidade do movimento em cantos. Valores altos em paredes externas geram ghosting (sombras visíveis).",
            "Cada material tem faixa própria: TPU exige 15-30mm/s; PLA aceita 100+; PETG fica em 60-80 para estética.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "Input Shaping calibrado permite subir aceleração sem ghosting." },
            { module: "Módulo 7 (Otimização)", text: "Velocidade alta + bico 0.6 = peças funcionais em metade do tempo." },
            { module: "Módulo 4 (Materiais)", text: "TPU não aceita acelerações altas — quebra extrusão." },
          ],
          params: [
            { param: "Primeira camada", value: "20-30mm/s", action: "Adesão garantida" },
            { param: "Parede externa", value: "40-60mm/s", action: "Estética visível" },
            { param: "Infill", value: "100-200mm/s", action: "Eficiência" },
            { param: "Acel. parede externa", value: "500-1000mm/s²", action: "Sem ghosting" },
            { param: "Jerk parede externa", value: "3-5mm/s", action: "Cantos precisos" },
          ],
          goldenRule: "Velocidade é sistema: lenta onde se vê, rápida onde não se vê. Aceleração baixa nas paredes externas elimina ghosting.",
          errors: [
            { error: "Ghosting nas paredes", solution: "Reduzir aceleração para 500-1000mm/s² e calibrar IS" },
            { error: "Primeira camada descola", solution: "Reduzir para 20mm/s e checar Z-offset" },
          ],
          paramDetails: [{
            name: "Tour Aba Velocidade",
            value: "5 telas integradas",
            whatIs: "Mapa da aba Velocidade: primeira camada, tipos de linha, aceleração e jerk em sistema único.",
            whyAdjust: "Tempo de impressão é dinheiro, mas velocidade mal calibrada destrói qualidade. Sistema balanceado é a meta.",
            optionsTable: {
              headers: ["Tipo de linha", "PLA", "PETG", "ABS", "TPU"],
              rows: [
                ["Parede Externa", "40-60", "30-50", "40-60", "15-25"],
                ["Parede Interna", "80-120", "60-80", "80-100", "20-30"],
                ["Preenchimento", "100-150", "80-120", "100-150", "25-35"],
                ["Superfície Superior", "40-60", "30-50", "40-60", "15-20"],
                ["Suporte", "80-120", "60-80", "80-100", "20-30"],
              ],
            },
            generatesTable: {
              headers: ["Tipo", "Aceleração (mm/s²)", "Jerk (mm/s)", "Efeito"],
              rows: [
                ["Parede Externa", "500-1000", "3-5", "Qualidade máxima"],
                ["Parede Interna", "1000-2000", "5-8", "Equilíbrio"],
                ["Preenchimento", "2000-5000", "8-12", "Eficiência"],
                ["Deslocamento", "5000-10000", "8-12", "Máxima eficiência"],
              ],
            },
            integrationsTable: {
              headers: ["Prioridade", "Parede ext.", "Infill", "Aceleração parede"],
              rows: [
                ["Qualidade", "40 mm/s", "100 mm/s", "500 mm/s²"],
                ["Equilíbrio", "60 mm/s", "150 mm/s", "1000 mm/s²"],
                ["Velocidade", "80 mm/s", "200 mm/s", "2000 mm/s²"],
                ["Prototipagem", "100 mm/s", "250 mm/s", "3000 mm/s²"],
              ],
            },
            influences: "Tempo total, ghosting, adesão e qualidade visível.",
            generates: "Perfil de velocidade balanceado entre tempo e qualidade.",
            goldenRule: "Lenta onde se vê, rápida onde não se vê. Sempre.",
          }],
        }),
      L(4, "tour-suporte", "Tour Visual — Painel Esquerdo (Parte 4): Suporte", "25min",
        ["Tipo de suporte", "Tree Organic", "Z Gap", "Interface", "Pintura de suporte"], {
          theory: [
            "Aba SUPORTE habilita impressão de geometrias complexas. Tree Organic é o padrão moderno: ramos finos, fácil remoção, poucas marcas.",
            "Z Gap é o segredo: 0.20mm é o equilíbrio universal entre remoção fácil e acabamento aceitável.",
            "Interface (camadas densas no topo do suporte) define qualidade da superfície inferior da peça. Mais camadas = mais lisa, porém mais difícil remover.",
            "Suportes são sacrificiais — investir tempo neles é o que entrega peça final perfeita.",
          ],
          integrations: [
            { module: "Módulo 8 (Casos estéticos)", text: "Bustos e esculturas usam Tree Organic com interface 3." },
            { module: "Módulo 14 (Troubleshooting)", text: "Marcas visíveis na peça = Z Gap baixo demais." },
          ],
          params: [
            { param: "Tipo", value: "Tree Organic", action: "Fácil remoção, poucas marcas" },
            { param: "Ângulo limiar", value: "45°", action: "Padrão para PLA/PETG" },
            { param: "Z Gap", value: "0.20mm", action: "Equilíbrio universal" },
            { param: "Interface superior", value: "2 camadas", action: "Acabamento aceitável" },
            { param: "Diâmetro ponta Tree", value: "0.4mm", action: "Marca mínima" },
          ],
          goldenRule: "Use Tree Organic + Z Gap 0.20mm + interface 2 camadas. Suportes são sacrificiais — invista neles para uma peça perfeita.",
          errors: [
            { error: "Suporte difícil de remover", solution: "Aumentar Z Gap para 0.25mm" },
            { error: "Marca visível na peça", solution: "Reduzir Z Gap para 0.15mm + interface 3 camadas" },
          ],
          paramDetails: [{
            name: "Tour Aba Suporte",
            value: "7 telas integradas",
            whatIs: "Mapa da aba Suporte: ativação, tipo, estilo, Z Gap, interface e suportes em árvore.",
            whyAdjust: "Suporte mal configurado = pós-processamento horrível ou peça inviável.",
            optionsTable: {
              headers: ["Parâmetro", "PLA", "PETG", "ABS", "TPU"],
              rows: [
                ["Tipo", "Tree", "Tree", "Tree", "Normal"],
                ["Estilo", "Orgânico", "Orgânico", "Orgânico", "Grid"],
                ["Ângulo Limiar", "45°", "50°", "40°", "45°"],
                ["Z Gap", "0.20mm", "0.25mm", "0.20mm", "0.15mm"],
                ["Interface Superior", "2", "3", "2", "2"],
                ["Diâmetro Ponta (Tree)", "0.4mm", "0.4mm", "0.6mm", "0.4mm"],
              ],
            },
            generatesTable: {
              headers: ["Z Gap", "Facilidade de remoção", "Acabamento", "Quando usar"],
              rows: [
                ["0.10-0.15mm", "Difícil", "Excelente", "Acabamento crítico"],
                ["0.20mm", "Recomendado", "Bom", "Uso geral"],
                ["0.25-0.30mm", "Fácil", "Regular", "Protótipos"],
              ],
            },
            integrationsTable: {
              headers: ["Cenário", "Tipo", "Z Gap", "Interface"],
              rows: [
                ["Acabamento crítico", "Tree", "0.15mm", "3 camadas"],
                ["Uso geral", "Tree", "0.20mm", "2 camadas"],
                ["Remoção fácil", "Tree", "0.25mm", "1 camada"],
                ["Estrutural", "Normal", "0.20mm", "2 camadas"],
              ],
            },
            influences: "Tempo de impressão, facilidade de remoção, qualidade da superfície inferior.",
            generates: "Suporte que remove fácil sem destruir o acabamento.",
            goldenRule: "0.20mm para a maioria. Reduza para acabamento, aumente para remoção fácil.",
          }],
        }),
      L(5, "tour-multimaterial", "Tour Visual — Painel Esquerdo (Parte 5): Multimaterial", "20min",
        ["Torre de purga", "Prevenção de vazamento", "Troca de filamento", "Volumes de purga"], {
          theory: [
            "Aba MULTIMATERIAL gerencia impressões com múltiplos filamentos: cores, materiais distintos ou suportes solúveis.",
            "Torre de purga limpa o bico entre trocas — sem ela, cor anterior contamina nova. Volume depende do contraste entre cores.",
            "Prevenção de vazamento (Flush into infill/support) reduz desperdício em até 50% purgando dentro de áreas não visíveis.",
            "Quanto maior o contraste entre cores, maior o volume de purga necessário. Branco→preto exige até 400mm³.",
          ],
          integrations: [
            { module: "Módulo 4 (Materiais)", text: "Suporte solúvel (PVA, BVOH) exige multimaterial e umidade controlada." },
            { module: "Módulo 9 (Comercial)", text: "Custo de filamento purgado entra na precificação — não ignorar." },
          ],
          params: [
            { param: "Torre largura", value: "30-40mm", action: "Estabilidade" },
            { param: "Volume purga padrão", value: "200-300mm³", action: "Contraste médio" },
            { param: "Fluxo extra", value: "120-150%", action: "Remoção completa" },
            { param: "Purgar no infill", value: "Ativado", action: "Reduz desperdício 50%" },
          ],
          goldenRule: "Torre de purga para transições limpas. Purgar no preenchimento reduz desperdício. Volume proporcional ao contraste das cores.",
          errors: [
            { error: "Cor anterior aparece na nova", solution: "Aumentar volume de purga para 350-400mm³" },
            { error: "Torre cai/instável", solution: "Aumentar largura para 40mm e ângulo de rotação 30°" },
          ],
          paramDetails: [{
            name: "Tour Aba Multimaterial",
            value: "3 telas integradas",
            whatIs: "Mapa da aba Multimaterial: torre de purga, prevenção de vazamento e troca de filamento.",
            whyAdjust: "Multimaterial mal configurado desperdiça filamento e contamina cores. Bem configurado, abre nicho premium.",
            optionsTable: {
              headers: ["Parâmetro", "Valor", "Efeito"],
              rows: [
                ["Ativar torre", "Sim", "Necessário para multi-cor"],
                ["Largura", "30-40mm", "Estabilidade da torre"],
                ["Volume de preparo", "200-300mm³", "Purga eficiente"],
                ["Fluxo extra", "120-150%", "Remoção completa"],
                ["Ângulo de rotação", "15-30°", "Estabilidade"],
              ],
            },
            generatesTable: {
              headers: ["Opção", "Efeito", "Quando usar"],
              rows: [
                ["Purgar no Preenchimento", "Purga dentro do infill", "Reduz desperdício"],
                ["Purgar nos Suportes", "Purga dentro dos suportes", "Suportes internos"],
                ["Desativado", "Purga na torre", "Uso geral / sem infill"],
              ],
            },
            integrationsTable: {
              headers: ["Contraste", "Volume purga", "Fluxo extra", "Observação"],
              rows: [
                ["Cores similares", "150-200mm³", "100%", "Purga mínima"],
                ["Contraste médio", "200-300mm³", "120%", "Recomendado"],
                ["Alto contraste", "300-400mm³", "150%", "Branco → Preto"],
              ],
            },
            influences: "Pureza das cores, desperdício de filamento, tempo total e custo final.",
            generates: "Impressão multimaterial limpa, com desperdício controlado.",
            goldenRule: "Volume de purga proporcional ao contraste. Purgar no infill quando possível.",
          }],
        }),
      L(6, "diagnose-desafios", "Diagnose e Desafios Avançados — Raciocínio Clínico", "30min",
        ["Troubleshoot Center", "Raciocínio clínico", "Diagnose de falhas", "Desafios simulados"], {
          theory: [
            "Centro de Solução de Problemas (Help > Troubleshoot Center) centraliza diagnóstico: copia info do sistema, salva logs, reconstrói perfis corrompidos. Use sempre antes de reportar bug.",
            "Raciocínio clínico = método médico aplicado à impressão: Observe → Pergunte → Teste uma variável por vez → Documente → Ajuste e repita.",
            "Nunca mude vários parâmetros ao mesmo tempo — você não saberá qual resolveu. Variável única é regra inegociável.",
            "Cada sintoma tem causas mais prováveis. Use a tabela de diagnose como árvore de decisão e teste a hipótese mais barata primeiro (umidade > temperatura > calibração > hardware).",
            "Exemplo prático — fiapos entre torres: H1 retração curta (aumentar comprimento); H2 temperatura alta (reduzir 5°C); H3 filamento úmido (secar 4h). Teste H3 primeiro: mais barato e mais comum.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "Sintomas que voltam = calibração base perdida; refaça PA + Flow." },
            { module: "Módulo 14 (Troubleshooting)", text: "Árvore de decisão completa por sintoma." },
            { module: "Módulo 15 (Produção)", text: "Documentar cada diagnóstico vira base de conhecimento da fazenda." },
          ],
          params: [
            { param: "Variáveis por teste", value: "1", action: "Inegociável" },
            { param: "Documentação", value: "Planilha por filamento/máquina", action: "Memória externa" },
            { param: "Ordem de hipóteses", value: "Mais barata primeiro", action: "Umidade > temp > calibração > hardware" },
          ],
          goldenRule: "O especialista não é quem nunca erra, mas quem sabe diagnosticar e corrigir. Observe, pergunte, teste uma variável por vez, documente e ajuste. O Troubleshoot Center é sua ferramenta aliada.",
          errors: [
            { error: "Mudou 4 parâmetros e melhorou", solution: "Você não sabe o que funcionou — refaça uma de cada vez" },
            { error: "Confia em memória de ajustes", solution: "Anote tudo em planilha por filamento e máquina" },
            { error: "Reporta bug sem logs", solution: "Use Troubleshoot Center > Copiar info do sistema antes" },
          ],
          finance: "Diagnóstico ordenado economiza horas/máquina — em produção vale R$50-100 por hora salva.",
          exercise: [
            "Faça o Tour Visual completo no OrcaSlicer visitando cada tela",
            "Documente as configurações que você usa para cada tipo de peça",
            "Crie um checklist de diagnóstico para sua operação",
            "Resolva um problema real aplicando raciocínio clínico (uma variável por vez)",
            "Compartilhe aprendizados na sua planilha de referência",
          ],
          paramDetails: [{
            name: "Diagnose com Raciocínio Clínico",
            value: "Método em 5 passos",
            whatIs: "Metodologia médica aplicada à impressão 3D: anamnese, exame, hipótese, intervenção, validação.",
            whyAdjust: "Sem método, diagnóstico vira chute. Com método, vira engenharia repetível e ensinável.",
            optionsTable: {
              headers: ["Sintoma", "Possível causa", "Solução"],
              rows: [
                ["Stringing", "Filamento úmido, retração incorreta", "Secar 4h, calibrar retração"],
                ["Warping", "Mesa fria, sem enclosure", "Aumentar temp mesa, usar Brim"],
                ["Ghosting", "Aceleração alta, IS não calibrado", "Reduzir acel, calibrar Input Shaping"],
                ["Z-Banding", "Fuso empenado, PID instável", "Lubrificar fuso, calibrar PID"],
                ["Subextrusão", "MVS excedida, entupimento", "Reduzir MVS, cold pull"],
                ["Layer Shift", "Correias frouxas, colisão", "Apertar correias, ajustar"],
                ["Pé de Elefante", "Primeira camada grossa", "Ativar compensação first layer"],
              ],
            },
            generatesTable: {
              headers: ["Desafio", "Diagnóstico", "Solução"],
              rows: [
                ["Stringing + má adesão", "Temp alta + Z-Offset baixo", "Reduzir temp 5°C + ajustar Z"],
                ["Ghosting + layer shift", "Acel alta + correias frouxas", "Calibrar IS + apertar correias"],
                ["Superfície áspera + delaminação", "Temp baixa + filamento úmido", "Aumentar temp 10°C + secar"],
              ],
            },
            integrationsTable: {
              headers: ["Sintoma", "Causa mais provável", "Solução imediata"],
              rows: [
                ["Fiapos", "Umidade", "Secar filamento 4h"],
                ["Warping", "Mesa fria", "Aumentar temp mesa"],
                ["Ghosting", "Aceleração alta", "Reduzir aceleração"],
                ["Camadas separadas", "Temperatura baixa", "Aumentar temp bico 10°C"],
                ["Descolamento", "Z-Offset alto", "Ajustar Z-Offset"],
                ["Furos menores", "Sem compensação", "XY compensation +0.1mm"],
              ],
            },
            howTo: [
              { step: "1. Observe", path: "Visual + localização + padrão", desc: "Descrição precisa do defeito" },
              { step: "2. Pergunte", path: "O que mudou desde a última boa?", desc: "Anamnese técnica" },
              { step: "3. Teste", path: "Uma variável por vez", desc: "Inegociável" },
              { step: "4. Documente", path: "Planilha", desc: "O que mudou, o que melhorou, o que piorou" },
              { step: "5. Ajuste", path: "Próxima hipótese ou refinamento", desc: "Iterar até resolver" },
            ],
            influences: "Tempo de inatividade, taxa de retrabalho, confiança operacional e curva de aprendizado.",
            generates: "Base de conhecimento documentada e diagnóstico previsível.",
            goldenRule: "Uma variável por vez. Sempre. Documente tudo.",
          }],
          checklist: [
            "Tour Visual completo realizado nas 5 abas",
            "Planilha de diagnóstico por filamento/máquina criada",
            "Troubleshoot Center localizado e testado",
            "Raciocínio clínico aplicado em pelo menos 1 problema real",
            "Configurações de cada tipo de peça documentadas",
          ],
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
        ["Emenda perímetro", "Caminhos concêntricos", "Posicionamento"], {
          theory: [
            "A seam é a emenda onde o bico inicia e fecha o perímetro de cada camada. Mal posicionada, vira linha vertical visível na peça.",
            "Empilhamento de seam: se todas as camadas começam no mesmo ponto, forma cicatriz vertical. Random/Staggered distribui essa imperfeição.",
            "Em peças cilíndricas (figuras, vasos), a seam é a única imperfeição estrutural visível — toda atenção deve estar nela.",
            "Caminhos concêntricos no top permitem esconder a seam dentro da geometria — escolha 'Concentric' para topos visíveis.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "Pressure Advance bem calibrado reduz drasticamente o blob da seam — pré-requisito." },
            { module: "Módulo 24 (Ironing)", text: "Topos com seam visível pedem Ironing para desaparecer linha do bico." },
          ],
          params: [
            { param: "Seam Position", value: "Aligned/Rear", action: "Posiciona em lugar fixo controlável" },
            { param: "Wipe Distance", value: "2.0 mm", action: "Sobra é puxada e amassa contra parede" },
            { param: "Top Surface Pattern", value: "Monotonic", action: "Esconde a seam do topo" },
          ],
          goldenRule: "Use caminhos concêntricos onde possível para esconder costuras dentro de geometrias.",
          errors: [
            { error: "Linha vertical visível na frente da peça", solution: "Mude seam para Rear ou pinte manualmente para trás" },
            { error: "Blob em cada camada da seam", solution: "Calibre PA e ative Wipe Distance 2.0mm" },
          ],
          economy: "Seam bem posicionada elimina lixamento de costura — 15-30 minutos a menos por peça acabada.",
          exercise: [
            "Imprima um cilindro 30mm com Aligned",
            "Imprima novamente com Random",
            "Compare visualmente sob luz rasante",
            "Escolha a estratégia padrão para cilíndricos",
          ],
        }),
      L(2, "como-orca-cria-emendas", "Como o OrcaSlicer Cria as Emendas", "25min",
        ["Scarf Joint", "Staggered", "Pressão início/fim"], {
          theory: [
            "Scarf Joint: sobrepõe as pontas em rampa para junção praticamente invisível — a melhor opção para peças cilíndricas e suaves.",
            "Staggered: distribui emendas em diferentes alturas em camadas adjacentes, evitando empilhamento vertical.",
            "Pressão acumulada no início/fim de extrusão é a causa física do blob na costura — bico chega quente com material pressurizado.",
            "OrcaSlicer aplica retração interna na seam (Retract before wipe) que sozinha resolve 60-70% dos blobs.",
          ],
          integrations: [
            { module: "Módulo 23 (Hotend)", text: "Hotend de alto fluxo acumula mais pressão — exige PA maior e Scarf mais agressivo." },
            { module: "Módulo 5 (Calibração)", text: "Sem PA calibrado, Scarf ainda mostra ondulação — calibre antes." },
          ],
          params: [
            { param: "Scarf Joint", value: "On (cilíndricas)", action: "Junção em rampa invisível" },
            { param: "Staggered", value: "On", action: "Distribui emendas em alturas" },
            { param: "Retract before wipe", value: "0.4 mm", action: "Alivia pressão antes de fechar" },
          ],
          goldenRule: "Ative Scarf Joint para peças cilíndricas e geometrias suaves.",
          errors: [
            { error: "Scarf ainda visível em PETG", solution: "Aumente PA e velocidade do scarf — PETG é viscoso" },
            { error: "Buraquinho na seam (cratera)", solution: "Reduza retract before wipe ou aumente Flow do início" },
          ],
          finance: "Scarf bem calibrado dispensa pintura e lixamento em peças decorativas — produto premium sem custo extra.",
          exercise: [
            "Imprima vaso cilíndrico sem Scarf",
            "Reimprima com Scarf On",
            "Fotografe lado a lado",
            "Padronize Scarf para todas as peças cilíndricas",
          ],
        }),
      L(3, "tipos-seam", "Tipos de Seam: Rear, Aligned, Nearest e Random", "25min",
        ["Aligned", "Rear", "Nearest", "Random"], {
          theory: [
            "Aligned: empilha em canto oculto (ideal para poligonais com aresta natural). Forma linha controlável.",
            "Rear: posiciona na traseira (montagem oculta). Garante frente limpa.",
            "Nearest: minimiza tempo de viagem (peças técnicas onde estética não importa). Mais rápido.",
            "Random: espalha pontos (superfícies redondas lisas). Esconde por distribuição.",
          ],
          integrations: [
            { module: "Módulo 1 (Interface)", text: "Combine com Seam Painting para forçar posição em peças específicas." },
            { module: "Módulo 7 (Otimização)", text: "Nearest é o mais rápido — use em protótipos onde tempo importa mais que estética." },
          ],
          params: [
            { param: "Seam Position", value: "Rear (Traseira)", action: "Mantém frente de figuras livre de marcas" },
            { param: "Wipe Distance", value: "2.0 mm", action: "Limpa sobra na costura" },
            { param: "Random (cilíndricos)", value: "On", action: "Espalha defeito em superfícies redondas" },
          ],
          goldenRule: "Use Random para artigos redondos lisos — uma linha visível arruinaria o acabamento.",
          errors: [
            { error: "Random gera pontos visíveis em PETG", solution: "Volte para Aligned + Seam Painting manual" },
            { error: "Rear não funciona porque peça gira no slicer", solution: "Confirme orientação no Prepare antes de fatiar" },
          ],
          economy: "Seam Nearest reduz tempo de impressão em 3-7% em peças com muitas ilhas — ganho silencioso.",
          exercise: [
            "Imprima a mesma peça com cada tipo de seam",
            "Anote: tempo total, posição visível, qualidade",
            "Escolha o tipo padrão por categoria (figura, técnica, decorativa)",
            "Salve nos perfis dedicados",
          ],
          deepDive: [
            "Rear (traseira): a seam é forçada ao ponto de maior coordenada Y do contorno em cada camada. Funciona para peças com 'frente e trás' definidos — busts, figuras humanoides, placas de identificação. O lado de trás vira uma linha vertical limpa que some quando a peça é montada contra parede ou base.",
            "Aligned (alinhada): em cada camada, o slicer escolhe o vértice mais próximo da costura da camada anterior, gerando uma linha contínua. Ideal para sólidos com aresta natural (cubos, prismas, peças mecânicas) onde a linha cai numa quina física — visualmente desaparece.",
            "Nearest (mais próxima): cada camada começa no ponto mais perto de onde o bico terminou a camada anterior, minimizando viagem. Resultado: seam aleatória mas curta — perfeita para protótipos funcionais e peças onde o tempo de impressão importa mais que a estética. Costuma reduzir o tempo total em 3-7%.",
            "Random (aleatória): distribui pontos de início espalhados pela camada. A 'cicatriz' deixa de existir como linha e vira ruído imperceptível em superfícies orgânicas e cilíndricas lisas (vasos, esferas, bustos). Em PETG e materiais que blob facilmente, pode gerar pontos visíveis — combine com PA bem calibrado.",
            "Decisão prática: peça mecânica → Aligned. Bust/figura → Rear + Seam Painting. Vaso/cilindro liso → Random ou Scarf. Protótipo → Nearest. Quando dúvida, faça uma plate de teste com a peça repetida 4 vezes, uma com cada modo.",
          ],
          checklist: [
            "Definiu a categoria da peça (mecânica/figura/decorativa/protótipo) antes de escolher seam",
            "Pressure Advance calibrado para o material atual (sem PA, qualquer modo blobeia)",
            "Wipe Distance entre 1.0 e 2.0mm no perfil do material",
            "Para peças vendidas: orientação no slicer trava a posição esperada do Rear",
            "Modelo salvo como .3mf após decisão final (Seam Painting persiste)",
          ],
        }),
      L(4, "esconder-seam", "Como Esconder e Posicionar a Seam", "30min",
        ["Seam Painting", "Pintura vermelho/azul", "Quinas internas"], {
          theory: [
            "Seam Painting permite pintar áreas vermelhas (bloquear costura) ou azuis (forçar costura). Controle manual absoluto.",
            "Quinas internas de modelos articulados (juntas de figuras, dobras de caixas) são lugares perfeitos para esconder seam.",
            "Para peças com texto/logo, pinte vermelho sobre o texto e azul logo atrás — força a seam para a região não visível.",
            "Seam Painting é por-modelo e fica salvo no .3mf — uma vez pintado, persiste em todas as reimpressões.",
          ],
          integrations: [
            { module: "Módulo 1 (Interface)", text: "Use a ferramenta de pintura da aba Prepare para marcar manualmente." },
            { module: "Módulo 22 (Perfis)", text: "Salve o .3mf com Seam Painting aplicado — vira template reutilizável." },
          ],
          params: [
            { param: "Seam Painting", value: "Manual", action: "Controle absoluto da posição" },
            { param: "Bloquear (vermelho)", value: "Áreas visíveis", action: "Impede seam onde aparece" },
            { param: "Forçar (azul)", value: "Quinas internas", action: "Concentra seam onde esconde" },
          ],
          goldenRule: "Posicione a costura em quinas internas de modelos articulados — esconde 100%.",
          errors: [
            { error: "Pintar só vermelho sem azul → seam escolhe local aleatório", solution: "Sempre combine vermelho (bloquear) com azul (forçar)" },
            { error: "Reimpressão perdeu o painting", solution: "Salve como .3mf, não STL — STL não guarda painting" },
          ],
          economy: "Seam Painting bem feito uma vez vale toda vida útil do modelo — investimento de 5 minutos por peça nova.",
          exercise: [
            "Importe uma figura humanoid",
            "Pinte vermelho na frente, azul atrás da cabeça",
            "Salve como .3mf",
            "Reimprima e confirme posição",
          ],
        }),
      L(5, "ironing", "Ironing e Surface Smoothing", "35min",
        ["Microfluxo 15%", "Velocidade 15-30 mm/s", "Espaçamento 0.1mm"], {
          theory: [
            "Ironing: o bico quente passa novamente sobre o topo com microfluxo (10-15%) e velocidade reduzida, alisando a superfície até ficar espelhada.",
            "Funciona apenas em superfícies planas horizontais — curvas ou inclinadas o bico não acompanha.",
            "Espaçamento 0.1mm entre passadas garante cobertura total sem sobre-fusão. Maior gera linhas visíveis; menor desperdiça tempo.",
            "Custo: Ironing adiciona 15-30% no tempo da peça, então use só em superfícies que aparecem.",
          ],
          integrations: [
            { module: "Módulo 24 (Ironing)", text: "Detalhamento completo de parâmetros e materiais ideais para Ironing." },
            { module: "Módulo 3 (Cooling)", text: "Ironing pede fan reduzido para fundir bem — ajuste conforme material." },
          ],
          params: [
            { param: "Fluxo de Alisamento", value: "15%", action: "Volume para fechar frinchas microscópicas" },
            { param: "Velocidade de Alisamento", value: "20 mm/s", action: "Deslocamento lento para fusão homogênea" },
            { param: "Espaçamento", value: "0.10 mm", action: "Cobertura total sem sobre-fusão" },
            { param: "Tipo de Ironing", value: "Top Surfaces", action: "Aplica só onde aparece" },
          ],
          goldenRule: "Não use Ironing em superfícies curvas — só funciona em topos planos.",
          errors: [
            { error: "Ironing em curva — bico arranha", solution: "Desative para essa peça ou divida o modelo" },
            { error: "Linhas visíveis no Ironing", solution: "Reduza espaçamento para 0.08mm e velocidade para 15 mm/s" },
          ],
          finance: "Ironing entrega acabamento de injeção sem pós-processamento — produto premium com markup direto.",
          exercise: [
            "Imprima placa plana 80×80mm sem Ironing",
            "Reimprima com Ironing On",
            "Compare brilho sob luz",
            "Padronize para peças com topo visível",
          ],
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
          theory: [
            "Velocidade acima de 150 mm/s exige estabilização — a aceleração é o verdadeiro fator de velocidade média, não a velocidade de pico.",
            "Em peças pequenas (<40mm), a impressora nunca atinge velocidade nominal — passa o tempo acelerando e desacelerando. Aceleração é tudo.",
            "Correias soltas amplificam ringing acima de 200 mm/s. Verifique tensão antes de subir velocidade.",
            "Lubrificação semanal de fusos e LM8UU é obrigatória em produção — atrito vira ghosting visível.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "A aceleração é o fator real de tempo total, não a velocidade nominal." },
            { module: "Módulo 20 (Aceleração)", text: "Detalhe absoluto sobre acelerações assimétricas por feature." },
          ],
          params: [
            { param: "Aceleração Básica", value: "3000 mm/s²", action: "Teto padrão de aceleração estável" },
            { param: "Aceleração Pós-IS", value: "8000-12000 mm/s²", action: "Habilitada por Input Shaper" },
            { param: "Tensão de Correia", value: "Som G3/G4", action: "Aplicativo de afinador no celular" },
          ],
          goldenRule: "Use correias reguladas e lubrificação constante — velocidade alta amplifica todo desgaste.",
          errors: [
            { error: "Ghosting que volta após 1 mês", solution: "Lubrifique LM8UU e refaça tensão de correia" },
            { error: "Velocidade alta com aceleração baixa = mesmo tempo", solution: "Suba aceleração junto, ela é o limitante real" },
          ],
          economy: "Aceleração 4000 mm/s² poupa até 30% do tempo total em peças com muitos detalhes pequenos.",
          exercise: [
            "Verifique tensão das correias com afinador (G3-G4)",
            "Lubrifique fusos e barras lineares",
            "Suba aceleração em 500 mm/s² e teste ghosting",
            "Documente o teto seguro da sua máquina",
          ],
        }),
      L(2, "limita-velocidade", "O Que Realmente Limita a Velocidade", "30min",
        ["Volumetric Flow", "Bico 0.6mm", "Subextrusão"], {
          theory: [
            "Volumetric Flow Limit: 12-18 mm³/s (hotend comum), 25-35 mm³/s (Volcano/CHT). É o teto físico de fusão do hotend.",
            "Fórmula: Velocidade Máxima = Vazão Volumétrica ÷ (Altura da Camada × Largura da Linha).",
            "Exemplo: 15 mm³/s ÷ (0.20 × 0.45) = 167 mm/s máximo. Acima disso = subextrusão garantida.",
            "Para subir velocidade sem trocar hotend: aumente altura de camada (0.28) ou largura (0.50) — vazão diminui e velocidade sobe.",
          ],
          integrations: [
            { module: "Módulo 23 (Hotend)", text: "Hotend CHT/Volcano dobra o fluxo volumétrico — única forma de velocidade real >250 mm/s." },
            { module: "Módulo 21 (Protocolo)", text: "Calibração de Max Volumetric Speed é o último passo do protocolo." },
          ],
          params: [
            { param: "Vazão Volumétrica Limite", value: "15 mm³/s", action: "Teto de derretimento seguro" },
            { param: "Diâmetro do Bico", value: "0.6 mm", action: "Aumenta largura e dobra throughput" },
            { param: "Altura Camada", value: "0.28 mm", action: "Maior altura = menos velocidade para mesmo fluxo" },
          ],
          goldenRule: "Calibre a vazão de pico antes de aumentar qualquer velocidade.",
          errors: [
            { error: "Velocidade 300 mm/s com subextrusão visível", solution: "Calcule fluxo necessário e compare com teto do hotend" },
            { error: "Trocou bico 0.6 mas velocidade igual", solution: "Atualize Line Width e Layer Height no perfil novo" },
          ],
          economy: "Use bico 0.6mm para rascunhos comerciais — dobra a velocidade efetiva sem trocar hardware.",
          exercise: [
            "Calcule sua vazão atual: largura × altura × velocidade",
            "Confronte com teto do hotend",
            "Reduza velocidade até ficar 10% abaixo do teto",
            "Rode Max Volumetric Speed do OrcaSlicer para confirmar",
          ],
        }),
      L(3, "input-shaper-klipper", "Acelerômetros, Jerks e Input Shaper", "35min",
        ["Input Shaper", "Ghosting eliminado", "Aceleração assimétrica"], {
          theory: [
            "Input Shaper: filtro matemático no firmware (Klipper) que anula as frequências naturais de vibração da estrutura.",
            "Calibração: acelerômetro ADXL345 mede ressonância nos eixos X e Y. Klipper aplica filtro automaticamente.",
            "Sem IS, ringing é visível acima de 3000 mm/s². Com IS bem calibrado, vai a 10000+ mm/s² sem ghost.",
            "Aceleração assimétrica: Outer Wall 500-1500 (estética), Inner Wall 1500-3000 (interno), Infill 4000+ (não aparece).",
          ],
          integrations: [
            { module: "Módulo 14 (Troubleshooting)", text: "Ghosting (ondulação fantasma) é completamente eliminado com Input Shaper bem calibrado." },
            { module: "Módulo 20 (Aceleração)", text: "Assimetria de aceleração maximiza ganho de tempo sem perder estética." },
          ],
          params: [
            { param: "Aceleração Parede Externa", value: "1000 mm/s²", action: "Previne trepidações visíveis" },
            { param: "Aceleração Parede Interna", value: "2000 mm/s²", action: "Não aparece — pode voar" },
            { param: "Aceleração Infill", value: "5000 mm/s²", action: "Totalmente escondido" },
            { param: "IS Shaper Type", value: "MZV / EI", action: "MZV equilibrado, EI agressivo" },
          ],
          goldenRule: "Use aceleração reduzida em paredes externas — o resto da peça pode voar.",
          errors: [
            { error: "Ghosting volta depois de IS", solution: "Acelerômetro mal fixado — refaça com fita dupla face firme" },
            { error: "IS aplicado mas peça vibra na alta velocidade", solution: "Mecânica precisa: tensão correia + lubrificação primeiro" },
          ],
          finance: "Input Shaper bem calibrado dobra velocidade útil — 50% mais peças por dia em produção.",
          exercise: [
            "Fixe acelerômetro no cabeçote (eixo X) e na mesa (eixo Y)",
            "Rode SHAPER_CALIBRATE em ambos",
            "Anote frequências e Shaper Type sugerido",
            "Atualize printer.cfg e teste com cubo Benchy",
          ],
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
          theory: [
            "Folga recomendada padrão para FDM: 0.20mm por lado. Cada material tem comportamento próprio de contração.",
            "PLA: folga 0.15-0.20mm (mais previsível). PETG: 0.20-0.25mm (contrai mais). ABS: 0.25-0.30mm (contração térmica alta).",
            "Repetibilidade da impressora: meça 10 peças idênticas com paquímetro e calcule desvio padrão — isso é seu limite real.",
            "Encaixes deslizantes (gavetas, suportes) usam folga 0.30-0.40mm; encaixes de pressão (press fit) usam 0.05-0.10mm de interferência.",
          ],
          integrations: [
            { module: "Módulo 6 (Engenharia)", text: "Sempre preveja contração térmica e expansão dimensional no CAD." },
            { module: "Módulo 22 (Perfis)", text: "Salve Horizontal Expansion por material — é o seu segredo de tolerância." },
          ],
          params: [
            { param: "Folga Recomendada", value: "0.20 mm", action: "Distanciamento para eixos e rolamentos" },
            { param: "Folga Deslizante", value: "0.30-0.40 mm", action: "Gavetas e ajustes móveis" },
            { param: "Interferência Press Fit", value: "0.05-0.10 mm", action: "Encaixa sob pressão e trava" },
          ],
          goldenRule: "Desenhe folgas baseado na repetibilidade real do bico da sua impressora, não em valores genéricos.",
          errors: [
            { error: "Folga 0.20 trava no PETG", solution: "PETG contrai mais — use 0.25mm" },
            { error: "Encaixe folgado no PLA depois ficar perfeito em ABS", solution: "Crie tabela de tolerância por material" },
          ],
          economy: "Tolerância correta evita refazer protótipos cliente — economiza 1-2 reprintagens por projeto.",
          exercise: [
            "Imprima teste de encaixe (0.10, 0.15, 0.20, 0.25, 0.30mm)",
            "Teste cada uma com paquímetro e mão",
            "Anote a melhor para cada material",
            "Monte tabela de tolerâncias pessoal",
          ],
        }),
      L(2, "folgas-compensacoes", "Folgas Reais e Compensações Físicas", "35min",
        ["Horizontal Expansion", "Elephant Foot", "Furos menores"], {
          theory: [
            "Horizontal Expansion: contrai os perímetros (-0.05mm) para compensar dilatação da linha. Furos saem do tamanho exato do CAD.",
            "Elephant Foot Compensation: reduz a primeira camada (0.15mm) para anular rebarba inferior. Sem isso, base sempre fica 0.3mm maior.",
            "Furos verticais saem menores por compressão lateral e elephant foot — sempre modele 0.2-0.4mm maior que o destino real.",
            "X/Y Compensation aplicada em parte do modelo: use Modifier Mesh com valor próprio em regiões críticas.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "Furos sempre saem menores por elephant foot e pressão lateral — calibre por material." },
            { module: "Módulo 1 (Interface)", text: "Use Modifier Mesh para aplicar compensação só onde precisa." },
          ],
          params: [
            { param: "Compensação XY", value: "-0.05 mm", action: "Contrai perímetros para encaixe preciso" },
            { param: "Compensação Pé de Elefante", value: "0.15 mm", action: "Anula rebarbas de base" },
            { param: "Furo no CAD", value: "+0.30 mm", action: "Compensa contração lateral" },
          ],
          goldenRule: "Use 0.2mm de folga no CAD para pinos móveis — abaixo disso, vão travar.",
          errors: [
            { error: "Furo 6mm sai 5.6mm impresso", solution: "Aumente furo no CAD para 6.3mm ou aplique Hole Compensation" },
            { error: "Base com rebarba (elephant foot)", solution: "Ative Elephant Foot Compensation 0.15mm" },
          ],
          finance: "Compensações corretas eliminam pós-furo com broca — passo de produção a menos por peça.",
          exercise: [
            "Imprima placa com furos 4, 6, 8, 10mm",
            "Meça cada um e calcule desvio",
            "Aplique Hole Compensation no perfil",
            "Reimprima e confirme exatidão",
          ],
        }),
      L(3, "press-snap-heat", "Press Fit, Snap Fit, Roscas e Heat Inserts", "40min",
        ["Press Fit", "Snap Fit", "Heat-Set Inserts"], {
          theory: [
            "Press Fit: interferência de 0.05-0.1mm (PETG, PLA+). Encaixa sob pressão e trava — uso único, não desmontável.",
            "Snap Fit: lingueta flexionável que trava por geometria. Orientação longitudinal às camadas para não quebrar na deflexão.",
            "Heat-Set Inserts: furo 0.1mm menor que o inserto, ferro de soldar a 180-220°C. Plástico amolece e abraça o metal.",
            "Roscas impressas: M6+ funciona bem em PETG; abaixo disso use heat-set ou rosca cortada com macho.",
          ],
          integrations: [
            { module: "Módulo 6 (Engenharia)", text: "Snap Fit precisa de orientação para a lingueta resistir flexão — anisotropia importa." },
            { module: "Módulo 4 (Materiais)", text: "Heat-Set em PLA derrete demais; PETG e PC seguram melhor o inserto." },
          ],
          params: [
            { param: "Loops de Parede", value: "5", action: "Massa contínua para insertos resistirem" },
            { param: "Interferência Press Fit", value: "0.05-0.10 mm", action: "Encaixa sob pressão" },
            { param: "Furo Heat Insert", value: "Inserto - 0.10 mm", action: "Plástico amolece e abraça" },
            { param: "Temperatura ferro", value: "180-220 °C", action: "Acima do Tg, abaixo do ponto de fusão" },
          ],
          goldenRule: "Fatie furos 0.1mm menores que o inserto — o calor expande e cria o assento perfeito.",
          errors: [
            { error: "Snap fit quebra na primeira flexão", solution: "Reoriente lingueta longitudinal às camadas" },
            { error: "Heat insert solto depois de inserir", solution: "Reduza furo em mais 0.05mm e use temperatura menor" },
          ],
          economy: "Heat-set inserts (R$0.30/un) transformam peça plástica em montagem com parafuso metálico durável — produto profissional.",
          exercise: [
            "Imprima placa com 4 furos para M3 insert",
            "Insira com ferro a 200°C",
            "Aperte parafuso e teste arrancamento",
            "Padronize procedimento para projetos com montagem",
          ],
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
        ["Triagem", "Estrutural/mecânica/térmica", "Checklist"], {
          theory: [
            "Triagem inicial: o problema é estrutural (camadas), mecânico (vibração) ou térmico (extrusão)? Identificar categoria reduz 70% do tempo de diagnose.",
            "Defeitos estruturais: warping, delaminação, layer shift. Causa: adesão, temperatura mesa, correia.",
            "Defeitos mecânicos: ghosting, ringing, Z-banding. Causa: vibração, fuso, lubrificação.",
            "Defeitos térmicos: stringing, blob, sub/sobre-extrusão. Causa: temperatura, fluxo, umidade.",
          ],
          integrations: [
            { module: "Módulo 10 (Mestre)", text: "Raciocínio clínico se apoia em triagem categórica — sem ela, vira chute." },
            { module: "Módulo 5 (Calibração)", text: "Defeitos térmicos quase sempre indicam calibração base perdida." },
          ],
          params: [
            { param: "Abordagem Sugerida", value: "Checklist Sistematizado", action: "Previne modificações redundantes" },
            { param: "Triagem", value: "3 categorias", action: "Estrutural / Mecânico / Térmico" },
          ],
          goldenRule: "Use checklist sistematizado — diagnóstico por palpite gera mais problemas que resolve.",
          errors: [
            { error: "Tratar warping (estrutural) como subextrusão (térmico)", solution: "Triagem categórica antes de qualquer intervenção" },
            { error: "Mudar 4 parâmetros e voltar ao zero", solution: "Uma variável por vez, sempre" },
          ],
          economy: "Triagem rápida economiza 30-50% do tempo de diagnose — em produção, é dinheiro direto.",
          exercise: [
            "Pegue 3 peças com defeito diferentes",
            "Categorize cada uma (estrutural/mecânico/térmico)",
            "Aplique intervenção da categoria",
            "Anote acerto/erro para refinar critério",
          ],
        }),
      L(2, "stringing-ghosting", "Stringing, Ghosting, Ringing e Z Banding", "40min",
        ["Stringing", "Ghosting", "Z-Banding"], {
          theory: [
            "Stringing (fios entre ilhas): umidade do filamento ou retração insuficiente. Secar filamento resolve 90% dos casos.",
            "Ghosting/Ringing (ondulação após detalhes): vibrações estruturais. Input Shaper + correias tensionadas + lubrificação.",
            "Z-Banding (faixas horizontais regulares): fuso empenado, acoplamento solto ou PID instável da mesa.",
            "Blob na seam: pressão acumulada no bico — calibre Pressure Advance e ative Wipe/Retract before wipe.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "Cada defeito tem assinatura visual própria — aprenda a reconhecer." },
            { module: "Módulo 12 (Velocidade)", text: "Input Shaper bem calibrado elimina ghosting em qualquer velocidade." },
          ],
          params: [
            { param: "PID de Mesa", value: "Ativar", action: "Evita oscilação térmica que gera bandas" },
            { param: "Secagem PETG", value: "65°C / 6h", action: "Resolve 90% do stringing" },
            { param: "Graxa PTFE Fuso Z", value: "A cada 500h", action: "Previne Z-banding mecânico" },
          ],
          goldenRule: "Use graxa PTFE nos fusos a cada 500h de impressão — Z-Banding mecânico evitado.",
          errors: [
            { error: "Stringing após calibrar retração 5x", solution: "Pare. Seque filamento 6h e retest" },
            { error: "Z-banding após PA novo", solution: "PA não afeta Z. Lubrifique fuso e refaça PID mesa" },
          ],
          finance: "Secadora de filamento (R$ 200-400) resolve stringing crônico e dura anos — paga-se em 1 mês.",
          exercise: [
            "Identifique 1 defeito visível em peça atual",
            "Categorize: mecânico ou térmico?",
            "Aplique a única intervenção correspondente",
            "Reimprima e confirme",
          ],
        }),
      L(3, "warping-delaminacao", "Warping, Delaminação, Subextrusão e Layer Shift", "40min",
        ["Warping", "Delaminação", "Cold Pull", "Layer Shift"], {
          theory: [
            "Warping (bordas levantadas): Brim largo (8mm) + mesa quente isolada de brisas + enclosure para ABS/ASA. Fan baixo é crítico.",
            "Delaminação (camadas separando): bico frio — aumente temperatura em 5-10°C e reduza fan.",
            "Clog/subextrusão progressiva: faça Cold Pull (puxada fria) para limpar carbonização interna do bico.",
            "Layer Shift (peça torta a partir de uma altura): correias frouxas, colisão durante travel ou driver TMC superaquecido.",
          ],
          integrations: [
            { module: "Módulo 3 (Adesão)", text: "Warping é controlado primariamente por Brim e temperatura de mesa estável." },
            { module: "Módulo 4 (Materiais)", text: "ABS sem enclosure = warping crônico, não tem ajuste de slicer que resolva." },
          ],
          params: [
            { param: "Brim Width", value: "8.0 mm", action: "Prolonga base para evitar levantamento" },
            { param: "Temp +5-10°C", value: "Para delaminação", action: "Bico mais quente = mais adesão entre camadas" },
            { param: "Cold Pull", value: "Mensal", action: "Limpa carbonização do hotend" },
          ],
          goldenRule: "Rode cubo de 20mm para cada filamento novo antes de imprimir peça final.",
          errors: [
            { error: "Layer shift e blame nas correias", solution: "Confirme primeiro temperatura do driver — TMC quente pula passos" },
            { error: "Clog não resolve com cold pull", solution: "Desmonte bico, limpe câmara de fusão fisicamente" },
          ],
          economy: "Cold pull mensal preserva hotend por anos vs 6 meses sem manutenção — R$80-150 economizados por bico.",
          exercise: [
            "Faça cold pull no seu hotend agora",
            "Observe carbonização puxada",
            "Imprima cubo 20mm e confirme melhora",
            "Marque na agenda: cold pull mensal",
          ],
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
          theory: [
            "Isolar máquinas com cabines térmicas estabiliza a temperatura interna em ±2°C e reduz drasticamente warping em ABS/ASA.",
            "Layout de fazenda: racks verticais com 3-4 impressoras por torre, exaustão direcionada, iluminação independente.",
            "Umidade ambiental: PLA tolera até 50%; PETG, Nylon e PC degradam acima de 40%. Desumidificador é obrigatório.",
            "Sensor termohigrômetro em cada rack permite alerta quando umidade sobe — proteção proativa de estoque.",
          ],
          integrations: [
            { module: "Módulo 4 (Materiais)", text: "Manter umidade ambiental abaixo de 40% é crítico para PETG e Nylon." },
            { module: "Módulo 22 (Perfis)", text: "Documente temperatura e umidade do ambiente no perfil — mudanças explicam variações." },
          ],
          params: [
            { param: "Umidade Limite", value: "Abaixo de 40%", action: "Previne re-absorção de água pelo filamento" },
            { param: "Temperatura Cabine", value: "±2°C estável", action: "Reduz warping ABS/ASA" },
            { param: "Termohigrômetro", value: "1 por rack", action: "Monitoramento contínuo" },
          ],
          goldenRule: "Instale termohigrômetros em cada rack — sem medir, não há controle.",
          errors: [
            { error: "Produção em garagem aberta — qualidade oscila com clima", solution: "Cabine térmica básica (R$ 300) estabiliza tudo" },
            { error: "Stringing geral em PETG no inverno", solution: "Umidade subiu — desumidificador e secagem extra" },
          ],
          finance: "Desumidificador 12L (R$ 600-900) protege estoque de R$ 5k+ em filamento — ROI em 2 meses.",
          exercise: [
            "Meça umidade do seu ambiente agora",
            "Compare com limite por material",
            "Instale desumidificador se passar 40%",
            "Monte caderno de log diário",
          ],
        }),
      L(2, "fazenda-controle", "Fazenda de Impressão, Controle de Qualidade e Embalagem", "35min",
        ["Catalogar carretéis", "Caixas estanques", "Embalagem a vácuo"], {
          theory: [
            "Catalogue cada carretel de filamento: data de abertura, peso atual, secagem, lote. Sem rastreio, qualidade vira loteria.",
            "Caixas estanques com sílica gel renovável (cor indica saturação): solução simples e durável.",
            "Embalagem a vácuo (selador comum + sílica): preserva spool aberto por meses sem re-secagem.",
            "Controle de qualidade por amostragem: 1 a cada 10 peças pesada, medida e inspecionada. Defeito sistemático aparece rápido.",
          ],
          integrations: [
            { module: "Módulo 4 (Materiais)", text: "Guarde sempre em caixas estanques com sílica gel — umidade entra em horas." },
            { module: "Módulo 9 (Comercial)", text: "Taxa de falha medida vira insumo direto da planilha de precificação." },
          ],
          params: [
            { param: "Estocagem Recomendada", value: "Vácuo Estanque", action: "Preserva molecularmente" },
            { param: "QC Amostragem", value: "1 a cada 10", action: "Detecta drift sistemático" },
            { param: "Sílica", value: "Renovável colorida", action: "Indica saturação visualmente" },
          ],
          goldenRule: "Etiquete peso atual e data de última desidratação em cada carretel.",
          errors: [
            { error: "Spool aberto em prateleira sem caixa", solution: "Caixa estanque + sílica imediata" },
            { error: "Sem rastreio de qualidade — defeito vira recorrente", solution: "Implemente QC amostral hoje" },
          ],
          economy: "Embalagem a vácuo preserva filamento aberto por meses sem re-secagem.",
          exercise: [
            "Compre 1 caixa estanque + sílica",
            "Catalogue todos os spools abertos",
            "Implemente etiqueta com data e peso",
            "Estabeleça revisão mensal",
          ],
        }),
      L(3, "monitoramento-remoto", "Sistemas de Monitoramento Remoto de Falhas", "35min",
        ["Obico", "Klipper", "Detecção por IA"], {
          theory: [
            "Obico (ex-Spaghetti Detective) e Klipper Camera AI detectam espaguete (impressão falhando) em segundos e pausam automaticamente.",
            "Câmera fixa enquadrando a peça + IA em nuvem ou local — alerta no celular em menos de 30 segundos.",
            "Termostatos inteligentes (Sonoff/Shelly) cortam energia automaticamente se temperatura ultrapassar limite.",
            "Pausa remota via OctoPrint/Klipper Web evita perda de R$30-80 em filamento por falha não detectada.",
          ],
          integrations: [
            { module: "Módulo 1 (Interface)", text: "A aba Device do OrcaSlicer faz monitoramento básico nativo." },
            { module: "Módulo 9 (Comercial)", text: "Monitoramento reduz taxa de falha real — entra na conta de margem." },
          ],
          params: [
            { param: "Inteligência IP", value: "Ativa", action: "Impede consumo de filamento em impressão falha" },
            { param: "Alarme Celular", value: "On", action: "Notificação imediata em falha" },
            { param: "Câmera por máquina", value: "1", action: "Enquadre a peça, não a impressora inteira" },
          ],
          goldenRule: "Integre alarmes no celular para impressões noturnas autônomas.",
          errors: [
            { error: "Falha à noite consome 800g de spool", solution: "Obico + alerta celular evita 100% disso" },
            { error: "Câmera enquadrando impressora inteira — IA não detecta", solution: "Aproxime, enquadre só a peça e o bico" },
          ],
          economy: "Corta prejuízos de perda de material — uma falha não detectada queima 500g de filamento (R$ 60-150).",
          exercise: [
            "Instale Obico em uma impressora",
            "Configure alerta celular",
            "Force uma falha controlada (puxe filamento)",
            "Confirme tempo de detecção e pausa",
          ],
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
          theory: [
            "Para grandes organizadores: largura de linha 0.6mm (paredes mais fortes) + altura 0.28mm + infill baixo. Velocidade prioritária.",
            "Bico 0.4 com largura forçada 0.6 funciona, mas perde detalhe em quinas — para organizadores está OK.",
            "Top Surface Pattern Monotonic é obrigatório nesses tamanhos para acabamento uniforme.",
            "Cada gaveta/divisória deve sair em <2h para ser produção viável; perfil rápido aqui é regra.",
          ],
          integrations: [
            { module: "Módulo 7 (Otimização)", text: "Grandes peças = baixa densidade; o segredo está nas paredes." },
            { module: "Módulo 18 (Infill)", text: "Lightning Infill 10% funciona perfeitamente em organizadores sem carga." },
          ],
          params: [
            { param: "Largura de Linha", value: "0.60 mm", action: "Otimização para rigidez extrema com menos passadas" },
            { param: "Altura Camada", value: "0.28 mm", action: "Velocidade prioritária em peça grande" },
            { param: "Infill", value: "Lightning 10%", action: "Decorativo sem carga real" },
          ],
          goldenRule: "Use altura de camada 0.28mm para modelos grandes — economia de tempo enorme.",
          errors: [
            { error: "Organizador em 0.16mm — 12h de impressão", solution: "Suba para 0.28 + Lightning, vai a 3-4h" },
            { error: "Largura forçada 0.6 em bico 0.4 com detalhe fino", solution: "Use 0.6 só onde detalhe não importa" },
          ],
          economy: "Perfil 'rápido decorativo' bem feito multiplica produção por 3 sem trocar máquina.",
          exercise: [
            "Pegue STL de organizador atual",
            "Compare slice 0.16 vs 0.28 com Lightning",
            "Imprima a versão rápida",
            "Avalie se acabamento é aceitável para uso",
          ],
        }),
      L(2, "produtos-virais", "Produtos Virais e Gadgets", "30min",
        ["Spiral Vase", "Silk", "Trajetórias orbitais"], {
          theory: [
            "Spiral Vase (Vase Mode): trajetórias orbitais contínuas, sem costuras, parede única espessa. Perfeito para vasos e abajures.",
            "Silk PLA + Vase Mode = produto Instagram pronto. Acabamento brilhante sem pós-processamento.",
            "Vase Mode imprime em ~40 minutos peças que normalmente levariam 3h+ — produto viral de margem alta.",
            "Largura de linha 150% do bico em Vase = parede grossa e resistente, esconde camadas individualmente.",
          ],
          integrations: [
            { module: "Módulo 15 (Produção)", text: "Spiral vase produz peças em 40 minutos — produto viral de baixo custo." },
            { module: "Módulo 11 (Seams)", text: "Vase Mode elimina seam por design — nenhuma emenda existe." },
          ],
          params: [
            { param: "Spiral Vase", value: "Ativo", action: "Cria filetes helicoidais contínuos sem costura" },
            { param: "Largura Perímetro", value: "150% do bico", action: "Parede única super resistente" },
            { param: "Bottom Layers", value: "3-4", action: "Base sólida obrigatória" },
          ],
          goldenRule: "Ative largura de perímetro em 150% do bico em modo vaso — paredes super resistentes.",
          errors: [
            { error: "Vase com fundo aberto", solution: "Force Bottom Layers 3-4 mínimo" },
            { error: "Parede do vaso translúcida demais", solution: "Suba largura para 0.6-0.8mm em bico 0.4" },
          ],
          finance: "Produtos virais de baixo custo, alta rotatividade — margem alta por unidade.",
          exercise: [
            "Baixe um STL de vaso simples",
            "Ative Vase Mode no perfil",
            "Imprima em Silk PLA",
            "Fotografe e compare com vaso comprado",
          ],
        }),
      L(3, "carga-industrial", "Peças de Carga Industrial sob Desgaste", "35min",
        ["Nylon+CF", "5+ paredes", "Bico endurecido"], {
          theory: [
            "Nylon+CF (carbono): alta dureza, estabilidade térmica até 120°C, exige 5+ loops de parede para torque contínuo.",
            "Fibras de carbono são abrasivas: bico de latão dura ~50h, endurecido (aço/rubi) dura anos.",
            "Velocidade baixa (40 mm/s) para alinhar fibras de carbono na direção da impressão — resistência sobe 20-30%.",
            "Secagem obrigatória: Nylon absorve umidade ainda no spool fechado. Seque a 70°C por 8h antes de qualquer impressão.",
          ],
          integrations: [
            { module: "Módulo 4 (Materiais)", text: "Bico endurecido é absolutamente obrigatório com fibra — bico de latão dura 50h." },
            { module: "Módulo 6 (Engenharia)", text: "Carga industrial = orientação + material + paredes alinhadas; nada disso opcional." },
          ],
          params: [
            { param: "Filamento", value: "Nylon Carbono (PA-CF)", action: "Rigidez e estabilidade dimensional" },
            { param: "Wall Loops", value: "5+", action: "Torque contínuo sem ceder" },
            { param: "Velocidade", value: "40 mm/s", action: "Alinha fibras na direção da impressão" },
            { param: "Bico", value: "Endurecido (aço/rubi)", action: "Sobrevive ao abrasivo" },
          ],
          goldenRule: "Velocidade baixa (40 mm/s) para alinhamento das fibras de carbono na direção da impressão.",
          errors: [
            { error: "PA-CF com bico latão — desgaste em 1 spool", solution: "Troca obrigatória por hardened steel/rubi" },
            { error: "PA-CF úmido — peça com bolhas e fraca", solution: "Seque 8h a 70°C antes de imprimir" },
          ],
          finance: "Peça PA-CF substitui alumínio em muitas aplicações — preço 1/3 e prazo 1/5.",
          exercise: [
            "Calcule custo de bico endurecido vs perda de 3 bicos de latão",
            "Seque um spool PA-CF e imprima cubo teste",
            "Quebre na mão e compare com PETG",
            "Documente aplicações onde PA-CF substitui metal",
          ],
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
        ["Classic largura fixa", "Arachne variável", "Wall Generator"], {
          theory: [
            "Classic: largura fixa, loops constantes. Cada parede tem exatamente a largura do bico — simples e previsível.",
            "Arachne: largura variável, preenche fendas que o Classic deixaria vazias. Algoritmo de 2020 baseado em Voronoi.",
            "Wall Generator é configuração de perfil: troque em Process > Quality. Não afeta hardware nem firmware.",
            "Default no OrcaSlicer moderno é Arachne — mude para Classic só quando precisar de previsibilidade dimensional total.",
          ],
          integrations: [
            { module: "Módulo 3 (Paredes)", text: "Wall Loops e Wall Generator são duas escolhas independentes — entenda cada uma." },
            { module: "Módulo 13 (Tolerâncias)", text: "Classic é mais previsível dimensionalmente; Arachne perdoa mais geometria fina." },
          ],
          params: [
            { param: "Wall Generator", value: "Arachne (default)", action: "Largura variável" },
            { param: "Wall Generator", value: "Classic", action: "Largura fixa, máxima previsibilidade" },
          ],
          goldenRule: "Use Arachne para relevos delicados, letras e logos — Classic deixaria gaps.",
          errors: [
            { error: "Texto pequeno ilegível em Classic", solution: "Troque para Arachne" },
            { error: "Peça mecânica fora de medida em Arachne", solution: "Volte para Classic + Horizontal Expansion" },
          ],
          economy: "Escolha certa de Wall Generator elimina retrabalho de peças com texto/logo — 0 custo, ganho imediato.",
          exercise: [
            "Imprima a mesma peça com texto em Classic e Arachne",
            "Compare legibilidade do texto",
            "Meça dimensões críticas",
            "Escolha o default que serve mais ao seu mix de pedidos",
          ],
        }),
      L(2, "classic-loops-fixos", "Classic — Loops Rígidos de Extrusão Fixa", "25min",
        ["Largura fixa", "Falhas em paredes finas"], {
          theory: [
            "Classic falha em paredes menores que o diâmetro do bico — gera lacunas visíveis em textos pequenos e relevos finos.",
            "Vantagem: previsibilidade dimensional total. Cada parede tem exatamente 0.4mm (com bico 0.4mm).",
            "Para peças mecânicas com encaixe preciso, Classic é a escolha — você sabe exatamente quanto plástico vai onde.",
            "Wall Loops > 4 em Classic ainda gera infill 'gap fill' em quinas — Arachne preenche melhor mas perde dimensão.",
          ],
          integrations: [
            { module: "Módulo 13 (Tolerâncias)", text: "Classic + Horizontal Expansion = controle dimensional centesimal." },
            { module: "Módulo 6 (Engenharia)", text: "Peça mecânica = Classic. Estética = Arachne." },
          ],
          params: [
            { param: "Wall Generator", value: "Classic", action: "Trajetórias simétricas uniformes" },
            { param: "Gap Fill", value: "Nowhere/Everywhere", action: "Preenche vazios remanescentes" },
          ],
          goldenRule: "Use Classic para máxima rigidez em fatiados lineares e geometrias previsíveis.",
          errors: [
            { error: "Lacunas em textos pequenos é sintoma típico de Classic em geometria fina.", solution: "Troque para Arachne nessa peça" },
            { error: "Gap fill criando bolhas indesejadas", solution: "Mude Gap Fill para Nowhere e refatiamento" },
          ],
          finance: "Classic em peça mecânica garante encaixe sem retrabalho — tempo de pós-processamento zero.",
          exercise: [
            "Imprima cubo de calibração em Classic",
            "Meça com paquímetro",
            "Confirme dimensão exata da parede",
            "Use como base para futuros ajustes de Horizontal Expansion",
          ],
        }),
      L(3, "arachne-variavel", "Arachne — Adaptação e Largura Variável", "25min",
        ["Largura variável", "Letreiros sem vazios"], {
          theory: [
            "Arachne modula a vazão para se ajustar a quinas estreitas e relevos finos. Sem vazios, sem gaps em geometria fina.",
            "Algoritmo baseado em diagramas de Voronoi: divide a peça em regiões e atribui largura ótima a cada parede.",
            "Min/Max Wall Width: limites configuráveis (default 0.85x e 1.5x do bico). Saia da faixa e Classic toma conta.",
            "Custo: Arachne é ligeiramente mais lento que Classic em geometrias simples — diferença mínima.",
          ],
          integrations: [
            { module: "Módulo 11 (Seams)", text: "Arachne combina com Scarf Joint para acabamento premium em relevos." },
            { module: "Módulo 1 (Interface)", text: "Letreiros minúsculos e logos imprimem perfeitos com Arachne." },
          ],
          params: [
            { param: "Wall Generator", value: "Arachne", action: "Modulação de largura variável" },
            { param: "Min Wall Width", value: "0.85x bico", action: "Limite inferior" },
            { param: "Max Wall Width", value: "1.5x bico", action: "Limite superior" },
          ],
          goldenRule: "Adote Arachne para chaveiros com textos <1mm — único jeito de sair legível.",
          errors: [
            { error: "Arachne em peça grande sem detalhe — sem benefício", solution: "Volte para Classic, ligeiramente mais rápido" },
            { error: "Parede variando demais e visualmente irregular", solution: "Estreite Min/Max Wall Width" },
          ],
          finance: "Arachne habilita produção de chaveiros personalizados com texto pequeno — nicho rentável.",
          exercise: [
            "Modele chaveiro com texto 1.5mm",
            "Imprima com Classic e Arachne",
            "Fotografe macro do texto",
            "Documente diferença e adote padrão",
          ],
          deepDive: [
            "Arachne quebra a regra clássica do FDM ('paredes têm a largura do bico') usando o esqueleto medial da geometria: para cada região da peça, calcula o eixo central e ajusta a largura de extrusão entre min_wall_width (default 0.85× nozzle) e max_wall_width (default 1.5× nozzle). Em uma região de 1.1mm com bico 0.4, Classic gera 2 paredes de 0.4 + gap fill caótico; Arachne gera 2 paredes de 0.55mm encostadas, sem vazio.",
            "Wall Transition Angle e Wall Transition Length controlam onde Arachne pode 'mudar de ideia' sobre o número de paredes. Valores baixos geram transições agressivas (paredes aparecem e desaparecem em pouco caminho), gerando ondulação visível. Default 10° / 0.4mm funciona em 95% dos casos; aumente para 20° em superfícies estéticas se notar ondulação.",
            "Onde Classic ainda vence: peças com tolerância dimensional crítica (encaixes h7/g6 impressos), perfis comerciais onde você precisa prever exatamente a massa por peça, e setups com Pressure Advance mal calibrado (PA errado + largura variável = oscilação de fluxo visível). Em qualquer outro cenário, Arachne é a escolha default no Orca moderno por bom motivo.",
            "Caso clássico de letra fina: texto Arial 6pt extrudado 0.4mm fica ilegível no Classic (gera 1 parede sozinha sem fechar a letra 'o'). Arachne preenche com paredes de 0.34mm encostadas, fechando o 'o' e mantendo a letra legível. Para letras menores que 0.8mm de largura total, Arachne é praticamente obrigatório.",
          ],
          checklist: [
            "Verificou o tipo de peça: estética/texto = Arachne; mecânica de precisão = Classic",
            "Min/Max Wall Width nos defaults (0.85× / 1.5× nozzle) salvo prova em contrário",
            "Pressure Advance calibrado para o material (Arachne amplifica erros de PA)",
            "Em peças com texto: faça plate de teste Classic vs Arachne antes de produção em lote",
            "Compensação dimensional via Horizontal Expansion calibrada por bico, não por algoritmo",
          ],
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
          theory: [
            "Grid, Lines e Rectilinear são padrões 2D depositados como linhas paralelas que se cruzam (Grid) ou se alternam por camada (Rectilinear).",
            "Em altas velocidades o bico colide com cruzamentos solidificados, gerando ruído, vibração e desgaste do nozzle.",
            "São rápidos de gerar G-code e baratos em material, mas anisotrópicos: forte em XY, frágil em Z.",
          ],
          integrations: [
            { module: "Módulo 3 (Preenchimento)", text: "Use apenas para protótipos rápidos e não-funcionais." },
            { module: "Módulo 20 (Velocidade)", text: "Reduza Infill Speed em Grid ≥10% para evitar colisões." },
          ],
          params: [
            { param: "Infill Pattern", value: "Grid / Lines", action: "Rápido para visualização" },
            { param: "Infill Density", value: "10–15%", action: "Suficiente para protótipo conceitual" },
          ],
          goldenRule: "Evite Grid em impressões estruturais rápidas — o cruzamento gera vibração.",
          errors: [
            { error: "Ruído metálico no infill", solution: "Troque Grid por Rectilinear ou reduza velocidade." },
            { error: "Peça quebra na direção Z", solution: "Aumente paredes (4+) — o infill 2D não ajuda em tração Z." },
          ],
          economy: "Grid 10% imprime ~30% mais rápido que Gyroid 15%, ideal para validar geometria antes da peça final.",
          exercise: [
            "Imprima o mesmo cubo de teste com Grid e Rectilinear a 15%.",
            "Compare peso, tempo e ruído de impressão.",
            "Quebre manualmente cada cubo e observe o plano de fratura.",
          ],
        }),
      L(2, "infill-avancados", "Infill Avançados — Gyroid, Cubic, Lightning, Adaptive", "30min",
        ["Gyroid 3D", "Cubic isotrópico", "Dissipação"], {
          theory: [
            "Gyroid e Cubic são padrões 3D verdadeiros: cada camada se conecta à seguinte sem cruzamentos planos, distribuindo carga isotropicamente.",
            "Lightning gera ramificações mínimas que sustentam apenas o teto — ideal para peças decorativas leves.",
            "Gyroid é o padrão preferido para peças funcionais por sua resposta uniforme a torção, flexão e compressão.",
          ],
          integrations: [
            { module: "Módulo 6 (Engenharia)", text: "Resistência praticamente igual em todas as direções." },
            { module: "Módulo 7 (Otimização)", text: "Lightning corta tempo em 40% mantendo topo aceitável." },
          ],
          params: [
            { param: "Infill Pattern", value: "Gyroid", action: "Padrão 3D isotrópico — peças funcionais" },
            { param: "Infill Pattern", value: "Lightning", action: "Apenas sustenta topo — economia máxima" },
          ],
          goldenRule: "Use Gyroid para qualquer peça que sofrerá torção e compressão multidirecional.",
          errors: [
            { error: "Topo afundado com Lightning", solution: "Aumente Top Shell Layers para 6+." },
            { error: "Gyroid lento demais", solution: "Aumente Infill Speed gradualmente até aparecer ruído, depois recue 10%." },
          ],
          economy: "Lightning reduz custo de material em até 70% para peças decorativas — ótimo para vasos e estatuetas.",
          exercise: [
            "Imprima o mesmo modelo com Gyroid 15% e Lightning.",
            "Pese ambas as peças e compare consumo de filamento.",
            "Aplique torção manual e observe rigidez relativa.",
          ],
        }),
      L(3, "otimizacao-forcas", "Otimizações de Forças em X, Y e Z", "30min",
        ["Adaptive Cubic", "Densidade variável"], {
          theory: [
            "Adaptive Cubic varia a densidade do infill conforme a distância às paredes — máxima onde há tensão, mínima no miolo.",
            "Reduz peso e tempo sem comprometer rigidez estrutural perto da superfície.",
            "É a escolha ideal para protótipos industriais grandes onde cada grama conta.",
          ],
          integrations: [
            { module: "Módulo 7 (Otimização)", text: "Economia de polímeros mantendo resistência estrutural." },
            { module: "Módulo 9 (Comercial)", text: "Reduz custo material em peças >200g sem perder cliente." },
          ],
          params: [
            { param: "Estratégia de Infill", value: "Adaptive Cubic", action: "Concentra material onde tensões são altas" },
            { param: "Adaptive Quality", value: "0.6", action: "Equilíbrio entre economia e rigidez" },
          ],
          goldenRule: "Use Adaptive Cubic para protótipos industriais — força onde precisa, leveza no resto.",
          errors: [
            { error: "Casca externa afunda", solution: "Reduza Adaptive Quality para 0.4 (mais material perto da parede)." },
            { error: "Peça muito leve quebra fácil", solution: "Aumente paredes para 4 — Adaptive não compensa parede fina." },
          ],
          economy: "Em peças industriais >300g, Adaptive Cubic economiza 20–35% de filamento mantendo carga útil.",
          exercise: [
            "Fatie a mesma peça com Cubic 20% e Adaptive Cubic.",
            "Compare tempo, peso e visual do preview por camada.",
            "Imprima ambas e meça deflexão sob carga conhecida.",
          ],
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
            "Normal Grid: blocos verticais densos, difíceis de arrancar, marcam a peça e gastam muito material.",
            "Tree Organic: ramos curvos calculados por algoritmo, mínimo contato com a peça e ramificação inteligente.",
            "Tree gasta menos material, imprime mais rápido e deixa marcas quase imperceptíveis.",
          ],
          integrations: [
            { module: "Módulo 3 (Suportes)", text: "Tree Organic é uma revolução real para miniaturas e estátuas." },
            { module: "Módulo 6 (Pós-processamento)", text: "Marca de Tree é facilmente removida com lixa 400." },
          ],
          params: [
            { param: "Support Style", value: "Tree Organic", action: "Ramos fáceis de extrair sem marcar" },
            { param: "Tree Support Branch Angle", value: "40°", action: "Equilíbrio entre estabilidade e economia" },
          ],
          goldenRule: "Adote Tree para todas estátuas, miniaturas e modelos estéticos.",
          errors: [
            { error: "Tree tomba durante impressão", solution: "Reduza Branch Angle para 30° ou aumente Branch Diameter." },
            { error: "Tree não cobre overhang grande", solution: "Reduza Tree Support Tip Diameter para 0.4mm." },
          ],
          economy: "Tree economiza ~50% de filamento de suporte vs Normal Grid em peças orgânicas.",
          exercise: [
            "Gere suporte Normal e Tree para a mesma miniatura.",
            "Compare gramatura estimada e tempo no preview.",
            "Imprima ambos e avalie esforço de remoção.",
          ],
          deepDive: [
            "Tree Organic é um algoritmo gerativo (introduzido pelo Cura, refinado no Orca) que parte do overhang e cresce ramos curvos para baixo evitando colisão com a peça. Cada nó da árvore decide onde se ramificar baseado em três parâmetros físicos: Branch Angle (inclinação máxima do ramo, default 40°), Branch Distance (espaçamento entre pontas de apoio, default 1.0mm), e Branch Diameter (espessura da base, default 5mm).",
            "Diferença prática para Normal Grid em uma miniatura de 80mm: Tree usa ~12-18g de filamento contra ~35-45g do Normal — economia de 60-65% no suporte, sem perder estabilidade. O tempo de impressão cai 25-40% porque o slicer não precisa preencher blocos densos camada por camada.",
            "Quando Tree FALHA e Normal vence: overhangs amplos e contínuos (ex: parte inferior de uma asa horizontal de 60×40mm) — Tree vai gerar dezenas de ramos finos que oscilam e desabam. Use Normal Grid com 10-15% density nesse cenário, ou divida a peça em duas partes coladas depois. Tree é para geometrias orgânicas, irregulares e localizadas.",
            "Tree Organic Hybrid (modo do Orca) combina os dois: Tree onde a geometria é orgânica, Normal Grid onde há overhang chapado. É o default ideal para peças mistas (figuras com base plana, modelos com partes técnicas e estéticas).",
          ],
          checklist: [
            "Identificou se a peça é orgânica (Tree), chapada (Normal) ou mista (Hybrid)",
            "Branch Diameter ≥ 5mm em peças >50mm de altura para evitar tombamento",
            "Top Interface Layers ≥ 2 para todo Tree em peça visível",
            "Plate testada antes de produção em lote — Tree pode falhar em geometrias incomuns",
            "Filamento de suporte seco (PETG e PVA acumulam umidade que mata estabilidade do ramo)",
          ],
        }),
      L(2, "interface-layers", "Interface Layers — Camadas Densas Separadoras", "25min",
        ["Z Gap 0.15-0.20mm", "3 camadas densas", "Solúveis"], {
          theory: [
            "Z Gap (0.15–0.20mm) é o espaço que descola o suporte da peça sem soltar no ar.",
            "Top Interface (3 camadas densas a 90%) cria uma plataforma uniforme que recebe o overhang sem deixar fios.",
            "Filamentos solúveis (PVA, BVOH) em impressoras multi-material dão acabamento absolutamente limpo.",
          ],
          integrations: [
            { module: "Módulo 6 (Pós-processamento)", text: "Interface bem configurada descola sem fundir, acabamento limpo." },
            { module: "Módulo 22 (Perfis)", text: "PVA precisa de perfil próprio com temperatura mais baixa." },
          ],
          params: [
            { param: "Top Interface Layers", value: "3", action: "Grade de alta densidade para acabamento" },
            { param: "Support Z Distance", value: "0.18 mm", action: "Descola sem cair durante impressão" },
          ],
          goldenRule: "Use suportes solúveis (PVA, BVOH) para acabamento absolutamente impecável.",
          errors: [
            { error: "Suporte funde na peça", solution: "Aumente Z Gap em 0.05mm e reduza temperatura de interface." },
            { error: "Marca pontilhada no overhang", solution: "Aumente Top Interface Density para 95%." },
          ],
          finance: "Cobrar premium em peças com PVA é justo — material custa 4× o PLA e exige câmara seca.",
          exercise: [
            "Imprima um overhang teste com Z Gap 0.15, 0.20 e 0.25.",
            "Avalie esforço de remoção e qualidade da superfície inferior.",
            "Anote o melhor Z Gap para seu nozzle/material.",
          ],
        }),
      L(3, "design-anti-suporte", "Design Anti-Suporte: Chanfros de 45°", "30min",
        ["Ângulo <45° autoportante", "Chanfros em furos"], {
          theory: [
            "Overhangs com ângulo menor que 45° são autoportantes — o filamento se apoia na camada anterior.",
            "Chanfros em furos horizontais eliminam suportes internos e melhoram tolerância dimensional.",
            "Reprojetar a peça é mais barato do que pós-processar suporte mal acabado.",
          ],
          integrations: [
            { module: "Módulo 7 (Design)", text: "O melhor suporte é aquele que não precisa existir — projete para evitá-los." },
            { module: "Módulo 13 (Tolerâncias)", text: "Chanfro em furo melhora encaixe de parafusos." },
          ],
          params: [
            { param: "Ângulo Limite", value: "45°", action: "Limite físico para deposição estável" },
            { param: "Overhang Threshold", value: "55°", action: "Aciona suporte apenas além desse ângulo" },
          ],
          goldenRule: "Aplique chanfros em todos furos horizontais maiores que 5mm.",
          errors: [
            { error: "Overhang 50° feio sem suporte", solution: "Adicione chanfro de 45° no CAD ou rotacione a peça." },
            { error: "Furo horizontal oval", solution: "Modele como losango ou aplique chanfro superior." },
          ],
          economy: "Eliminar suporte interno em furos reduz tempo de impressão em 8–15% por peça.",
          exercise: [
            "Pegue uma peça com furo horizontal e adicione chanfro de 45°.",
            "Fatie antes e depois e compare tempo + material.",
            "Imprima e meça redondeza do furo nos dois casos.",
          ],
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
          theory: [
            "Cada feature tem velocidade ideal: Outer Wall conservadora (estética), Inner Wall média (estrutural), Infill rápida (não visível).",
            "Velocidade demais derrete pouco o material → underextrusion; velocidade de menos cozinha o polímero → fios e blobs.",
            "O perfil assimétrico é o segredo: rápido onde não importa, lento onde a peça aparece.",
          ],
          integrations: [
            { module: "Módulo 12 (Velocidade)", text: "O equilíbrio entre beleza e tempo é assimetria proporcional." },
            { module: "Módulo 22 (Perfis)", text: "Materiais técnicos exigem velocidades 30–50% menores." },
          ],
          params: [
            { param: "Outer Wall Speed", value: "80 mm/s", action: "Velocidade conservadora para acabamento" },
            { param: "Infill Speed", value: "200 mm/s", action: "Rápido onde a casca cobre" },
          ],
          goldenRule: "Velocidades proporcionais à temperatura de fusão do material — quanto mais frio, mais lento.",
          errors: [
            { error: "Acabamento ondulado", solution: "Reduza Outer Wall Speed para 60 mm/s." },
            { error: "Falhas no infill (gaps)", solution: "Reduza Infill Speed em 20% ou aumente temperatura 5°C." },
          ],
          finance: "Perfil bem ajustado entrega peça vendável em 1 tentativa — cada reimpressão queima margem.",
          exercise: [
            "Imprima cubo de calibração a 80, 120 e 160 mm/s na parede externa.",
            "Compare brilho e linhas visíveis.",
            "Fixe a velocidade máxima que ainda dá acabamento aceitável.",
          ],
        }),
      L(2, "travel-rapido", "Velocidades de Movimento Rápido (Travel)", "30min",
        ["Travel >250mm/s", "Ghosting por travel"], {
          theory: [
            "Travel é movimento em vazio — sem extrusão. Quanto mais rápido, menor o tempo total.",
            "Mas travel violento sacode o frame e gera ghosting nas paredes seguintes mesmo a velocidades normais.",
            "O segredo é equilibrar aceleração de travel e velocidade de pico, considerando rigidez do frame.",
          ],
          integrations: [
            { module: "Módulo 5 (Problemas)", text: "Vibrações de travel geram marcas em paredes adjacentes." },
            { module: "Módulo 12 (Input Shaper)", text: "Input Shaper permite travel mais agressivo sem ghosting." },
          ],
          params: [
            { param: "Travel Speed", value: "250 mm/s", action: "Velocidade em vazio entre ilhas" },
            { param: "Travel Acceleration", value: "5000 mm/s²", action: "Aceleração agressiva mas estável" },
          ],
          goldenRule: "Evite travel >300 mm/s se o frame tem baixa inércia (Ender, A1 Mini).",
          errors: [
            { error: "Ghosting após cantos", solution: "Reduza Travel Acceleration para 3000 mm/s²." },
            { error: "Stepper perde passos em travel", solution: "Reduza Travel Speed em 50 mm/s." },
          ],
          economy: "Otimizar travel pode encurtar impressões longas em 10–15% sem afetar qualidade.",
          exercise: [
            "Imprima uma peça com 2 ilhas a 150, 250 e 350 mm/s de travel.",
            "Observe ghosting nas paredes.",
            "Defina o teto seguro para sua máquina.",
          ],
        }),
      L(3, "aceleracoes-finas", "Configuração de Acelerações Finas", "30min",
        ["Outer 500-1200", "Inner 1500", "Infill alto"], {
          theory: [
            "Aceleração define quão rápido o cabeçote atinge velocidade nominal — é ela que cria ou elimina ghosting.",
            "Outer Wall Accel baixa (500–1200) preserva acabamento; Inner Wall e Infill podem ser altos.",
            "Jerk (ou Junction Deviation no Klipper) controla a transição entre segmentos — fino demais arredonda cantos.",
          ],
          integrations: [
            { module: "Módulo 12 (Input Shaper)", text: "Aceleração é o que define ghosting visível, não velocidade nominal." },
            { module: "Módulo 21 (Calibração)", text: "Recalibre Input Shaper após mudar aceleração nominal." },
          ],
          params: [
            { param: "Outer Wall Accel", value: "800 mm/s²", action: "Conservadora para acabamento limpo" },
            { param: "Inner Wall Accel", value: "1500 mm/s²", action: "Aceleração intermediária balanceada" },
          ],
          goldenRule: "Aceleração conservadora em paredes externas é a regra de ouro para acabamento.",
          errors: [
            { error: "Cantos arredondados", solution: "Aumente Junction Deviation ou Jerk gradualmente." },
            { error: "Ringing fantasma após cantos", solution: "Reduza Outer Wall Accel para 500 mm/s² ou calibre Input Shaper." },
          ],
          economy: "Acelerações otimizadas reduzem ~20% do tempo de impressão sem ghosting visível.",
          exercise: [
            "Imprima um cubo Input Shaper a 500, 1000, 2000 e 4000 mm/s².",
            "Identifique a aceleração máxima sem ghosting.",
            "Aplique 70% desse valor como Outer Wall Accel.",
          ],
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
            "Sequência obrigatória: 1) Nivelamento PEI · 2) PID térmico · 3) Multiplicador de vazão · 4) Pressure Advance · 5) Retração fina · 6) Input Shaping · 7) Teste de temperatura · 8) Teste de fluxo.",
            "Cada etapa pressupõe a anterior calibrada — invertendo a ordem, o erro propaga e a calibração nunca converge.",
            "Documente os resultados em planilha por máquina+filamento; é seu ativo profissional.",
          ],
          integrations: [
            { module: "Módulo 4 (Calibração)", text: "Cada passo se assenta sobre o anterior — pular um quebra a cadeia." },
            { module: "Módulo 22 (Perfis)", text: "Cada filamento novo exige PA + fluxo + temperatura novamente." },
          ],
          params: [
            { param: "Sequência", value: "8 etapas fixas", action: "Não inverter a ordem em hipótese alguma" },
            { param: "Frequência", value: "A cada filamento novo", action: "PA + fluxo + temperatura no mínimo" },
          ],
          goldenRule: "Não pule etapas na ordem científica — cada uma valida a anterior.",
          errors: [
            { error: "PA não converge", solution: "Volte ao multiplicador de vazão — provavelmente está errado." },
            { error: "Input Shaper não fixa ghosting", solution: "Verifique correias e parafusos do carriage antes de tudo." },
          ],
          finance: "Cobre 'taxa de calibração' (R$ 50–150) ao usar filamento novo do cliente — é trabalho técnico real.",
          exercise: [
            "Execute o protocolo completo em uma máquina + filamento.",
            "Anote tempo total e parâmetros finais.",
            "Salve como perfil nomeado: 'Máquina_Filamento_DDMMYY'.",
          ],
        }),
      L(2, "termo-fluxo-pa", "Relação Termodinâmica de Temperatura, Fluxo e PA", "25min",
        ["Temperatura altera viscosidade", "Recalibrar PA"], {
          theory: [
            "Temperatura altera viscosidade do polímero — quanto mais quente, mais fluido e mais Pressure Advance necessário.",
            "Mudou +10°C? Recalibre PA. Mudou marca de filamento? Recalibre tudo do passo 3 em diante.",
            "Estabilidade térmica da mesa e do hotend é pré-requisito; PID mal sintonizado invalida toda calibração subsequente.",
          ],
          integrations: [
            { module: "Módulo 5 (Hotend)", text: "Estabilidade térmica é fundamental para qualquer calibração." },
            { module: "Módulo 23 (Extrusor)", text: "PA depende diretamente do conjunto hotend + extrusor." },
          ],
          params: [
            { param: "Tolerância PID", value: "±1°C", action: "Acima disso PA varia perceptivelmente" },
            { param: "Recalibração PA", value: "A cada Δ10°C", action: "Mantém precisão de seam e cantos" },
          ],
          goldenRule: "Mantenha o PID sintonizado semanalmente — drift térmico invalida tudo.",
          errors: [
            { error: "Cantos com blob após troca de temp", solution: "Recalibre Pressure Advance no novo set point." },
            { error: "Fluxo varia entre lotes do mesmo filamento", solution: "Refaça multiplicador de vazão por lote." },
          ],
          economy: "Calibração térmica precisa elimina ~80% das peças rejeitadas por seam visível.",
          exercise: [
            "Calibre PA a 200°C e depois a 215°C no mesmo filamento.",
            "Compare valores e anote a diferença.",
            "Adicione regra no perfil: 'PA muda ~0.005 por 10°C'.",
          ],
        }),
      L(3, "manutencao-preventiva", "Manual Preventivo de Correções Recorrentes", "30min",
        ["Correias 150Hz", "Substituir bicos", "Atomic Pull"], {
          theory: [
            "Tensione correias a ~150Hz (medido com app de afinador de violão).",
            "Substitua bicos desgastados (sinais: filamento sai oval, peças com erro dimensional crescente, aro do furo do bico fica espelhado).",
            "Seque carretéis em estufa 4–6h antes de calibração nova; umidade altera fluxo em até 8%.",
          ],
          integrations: [
            { module: "Módulo 5 (Manutenção)", text: "90% dos problemas atribuídos a fatiamento são na verdade manutenção mecânica." },
            { module: "Módulo 23 (Extrusor)", text: "Atomic Pull semanal evita entupimentos parciais invisíveis." },
          ],
          params: [
            { param: "Frequência de Correia", value: "150 Hz", action: "Evita ghosting e ringing" },
            { param: "Vida útil bico latão", value: "~300h PLA", action: "Reduz para 50h com fibra/CF" },
          ],
          goldenRule: "Faça Atomic Pull (puxada fria) antes de calibrar qualquer material técnico.",
          errors: [
            { error: "Layer shift recorrente", solution: "Tensione correias e verifique parafusos das polias." },
            { error: "Erro dimensional aumentando com o tempo", solution: "Troque o bico — provavelmente desgastado/oval." },
          ],
          finance: "Bico aço endurecido (R$ 80) vale a pena se você imprime fibra — vida útil 10× maior que latão.",
          exercise: [
            "Meça a frequência das correias com app de afinador.",
            "Tensione até ficar entre 130–170 Hz.",
            "Execute um Atomic Pull e documente cor/forma do resíduo.",
          ],
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
          theory: [
            "Densidade real (g/cm³) varia por aditivo: PLA puro 1.24, PLA+wood 1.15, PLA-CF 1.30.",
            "Custo por kg e diâmetro nominal alimentam o orçamento — erros aqui distorcem preço final.",
            "Meça o diâmetro real do filamento em 5 pontos com paquímetro; use a média no perfil.",
          ],
          integrations: [
            { module: "Módulo 9 (Comercial)", text: "Orçamentos precisos dependem da densidade real declarada." },
            { module: "Módulo 21 (Calibração)", text: "Diâmetro errado vira erro de fluxo permanente." },
          ],
          params: [
            { param: "Diâmetro Medido", value: "1.74–1.76 mm", action: "Use a média real, não o nominal" },
            { param: "Densidade", value: "Da ficha técnica", action: "Essencial para custo correto" },
          ],
          goldenRule: "Localize a massa específica na ficha técnica do fabricante — varia por aditivo.",
          errors: [
            { error: "Peça superextrusada após troca de marca", solution: "Meça diâmetro real e refaça multiplicador de vazão." },
            { error: "Orçamento bate na balança errado", solution: "Atualize densidade no perfil — provavelmente está com 1.24 genérico." },
          ],
          finance: "Margem real só aparece com densidade e custo corretos — perfil errado pode esconder prejuízo.",
          exercise: [
            "Meça diâmetro de 5 pontos de um carretel com paquímetro.",
            "Atualize o perfil com a média.",
            "Compare gramatura prevista vs balança após impressão.",
          ],
        }),
      L(2, "variacoes-termicas", "Variações Térmicas de Nozzle e Bed por Camada", "25min",
        ["Primeira camada quente", "Demais estáveis"], {
          theory: [
            "Primeira camada precisa de mesa e bico mais quentes para garantir adesão e fusão.",
            "Demais camadas devem ser estáveis — variação térmica gera warping invisível e linhas de transição.",
            "Materiais técnicos (ABS, ASA, PC) exigem câmara fechada com temperatura ambiente controlada.",
          ],
          integrations: [
            { module: "Módulo 3 (Adesão)", text: "A primeira camada define o sucesso de toda a impressão." },
            { module: "Módulo 21 (Calibração)", text: "PID da mesa precisa ser sintonizado para cada set point." },
          ],
          params: [
            { param: "Mesa (L1/Demais)", value: "60°C / 55°C", action: "Temperatura inicial ampliada para adesão" },
            { param: "Bico (L1/Demais)", value: "215°C / 210°C", action: "+5°C ajuda fluxo na primeira camada" },
          ],
          goldenRule: "Use 60°C estáveis para PLA padrão — variação cria warping invisível.",
          errors: [
            { error: "Primeira camada não adere", solution: "Aumente mesa em 5°C e reduza velocidade da L1 para 20 mm/s." },
            { error: "Linhas claras a cada N camadas", solution: "Mesa oscilando — recalibre PID da mesa." },
          ],
          economy: "Mesa estabilizada reduz scrap de adesão em ~70% — ROI imediato.",
          exercise: [
            "Calibre PID da mesa a 60°C e 100°C.",
            "Monitore oscilação com termômetro IR.",
            "Anote a faixa real de variação.",
          ],
        }),
      L(3, "dilatacao-shrinkage", "Coeficiente de Dilatação e Retração Molecular", "30min",
        ["Shrinkage 0.8% ABS", "Cubos de 100mm"], {
          theory: [
            "Shrinkage Compensation: ABS encolhe ~0.8%, ASA ~0.5%, PLA ~0.3% após resfriar.",
            "Em peças funcionais (engrenagens, encaixes), essa diferença vira folga ou interferência indesejada.",
            "Calibre rodando um cubo de 100mm e medindo XY com paquímetro digital.",
          ],
          integrations: [
            { module: "Módulo 13 (Tolerâncias)", text: "A dilatação molecular afeta diretamente as tolerâncias de montagem." },
            { module: "Módulo 9 (Comercial)", text: "Peça que não encaixa = retrabalho = prejuízo direto." },
          ],
          params: [
            { param: "Shrinkage Compensation", value: "0.8% (ABS)", action: "Compensa deformidade reológica" },
            { param: "Cubo de Aferição", value: "100 × 100 mm", action: "Tamanho ideal para medir encolhimento" },
          ],
          goldenRule: "Rode cubos de 100mm para aferir encolhimento real do seu lote.",
          errors: [
            { error: "Engrenagem com folga", solution: "Ajuste Shrinkage Compensation X/Y separadamente." },
            { error: "Encaixe forçado em ABS", solution: "Aumente Shrinkage para 0.85% — lote provavelmente diferente." },
          ],
          economy: "Compensação correta elimina retrabalho — economia de tempo e filamento em peças funcionais.",
          exercise: [
            "Imprima cubo 100mm em ABS sem compensação.",
            "Meça X e Y com paquímetro.",
            "Calcule % de erro e aplique no perfil.",
          ],
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
          theory: [
            "Velocidade máxima de extrusão: ~60 mm/s para hotends padrão; CHT/volcano podem ir além.",
            "Engrenagens endurecidas (BMG, Sherpa) são obrigatórias para torque sustentado e abrasivos.",
            "Retração em Bowden (4–6mm) é maior que em Direct Drive (0.5–1mm) por causa do tubo PTFE.",
          ],
          integrations: [
            { module: "Módulo 5 (Hotend)", text: "Engrenagens de qualidade evitam grind do filamento e patinagem." },
            { module: "Módulo 11 (Seams)", text: "Retração calibrada elimina gotejamento na costura." },
          ],
          params: [
            { param: "Velocidade Máxima", value: "60 mm/s", action: "Limite para proteger engrenagens" },
            { param: "Retração Direct", value: "0.5–1.0 mm", action: "Curta evita filamento mole atrás" },
          ],
          goldenRule: "Use engrenagens de dupla tração (BMG, Sherpa) para alto torque em direct drive.",
          errors: [
            { error: "Filamento moído (grind)", solution: "Reduza velocidade de extrusão e aumente temperatura 5°C." },
            { error: "Stringing persistente", solution: "Faça Retraction Test no Orca — calibração rápida." },
          ],
          finance: "Upgrade para extrusor de qualidade (R$ 250) paga-se em 2 meses de produção sem refugo.",
          exercise: [
            "Execute Retraction Test no Orca Calibration.",
            "Identifique distância mínima sem stringing.",
            "Salve no perfil de filamento.",
          ],
        }),
      L(2, "wipe-retract", "Acoplamento de Velocidades em Retração e Wipe", "25min",
        ["Wipe before retract", "0.5mm Direct"], {
          theory: [
            "Wipe before retract: o bico desliza sobre fileiras sólidas limpando a sobra antes de retrair.",
            "Reduz blobs na costura e gotas em travel — invisível a olho nu quando bem ajustado.",
            "Combine com Coast (parar extrusão antes do fim do segmento) para resultado de produção.",
          ],
          integrations: [
            { module: "Módulo 11 (Seams)", text: "Wipe elimina gotejamento na costura — visível desaparece." },
            { module: "Módulo 20 (Velocidade)", text: "Wipe Speed alta demais arrasta material; mantenha próxima da Outer Wall." },
          ],
          params: [
            { param: "Wipe before retract", value: "Habilitado", action: "Garante trajetórias sem escorrimentos" },
            { param: "Wipe Distance", value: "0.5 mm (Direct)", action: "Suficiente para limpar sem desperdiçar tempo" },
          ],
          goldenRule: "Use 0.5mm de wipe em Direct Drive — suficiente para limpar sem desperdiçar tempo.",
          errors: [
            { error: "Blob na costura mesmo com retração", solution: "Habilite Wipe Before Retract." },
            { error: "Wipe deixando sulco visível", solution: "Reduza Wipe Distance e aumente Wipe Speed." },
          ],
          economy: "Wipe bem configurado dispensa lixa em peças vendáveis — ganho de tempo direto.",
          exercise: [
            "Imprima um cilindro com e sem Wipe Before Retract.",
            "Compare costura sob luz oblíqua.",
            "Anote configuração ideal por filamento.",
          ],
        }),
      L(3, "z-hop", "Movimentações de Z-Hop de Bico", "30min",
        ["Z-Hop 0.2-0.4mm", "Spiral Z-Hop"], {
          theory: [
            "Z-Hop: sobe 0.2–0.4mm em travel para evitar colisão do bico com a peça.",
            "Spiral Z-Hop suaviza o movimento em rampa helicoidal — elimina marcas verticais.",
            "Use 'Only on layer change' para peças simples; 'On all retractions' para modelos complexos.",
          ],
          integrations: [
            { module: "Módulo 20 (Velocidade)", text: "Z-Hop evita colisões em peças com geometria complexa." },
            { module: "Módulo 11 (Seams)", text: "Spiral Z-Hop reduz marca visível na costura." },
          ],
          params: [
            { param: "Z-Hop Type", value: "Spiral", action: "Elimina marcas horizontais visíveis" },
            { param: "Z-Hop Height", value: "0.3 mm", action: "Suficiente para evitar arranhão" },
          ],
          goldenRule: "Use Spiral Z-Hop para modelos esguios verticais — sem marca de travel.",
          errors: [
            { error: "Linhas verticais no acabamento", solution: "Mude Z-Hop para Spiral ou reduza para 0.2mm." },
            { error: "Z-Hop derrubando peça", solution: "Aumente adesão de mesa ou reduza Travel Speed em travel longo." },
          ],
          economy: "Z-Hop bem ajustado salva peças longas (vasos, estatuetas) que falhariam por colisão.",
          exercise: [
            "Imprima a mesma peça com Z-Hop Normal e Spiral.",
            "Compare paredes verticais sob luz lateral.",
            "Adote Spiral como padrão se diferença for visível.",
          ],
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
          theory: [
            "Ironing passa o bico aquecido sobre a camada superior com microfluxo (10–15%) e espaçamento ~0.15mm.",
            "O resultado é uma superfície quase espelhada que dispensa lixa em planos superiores.",
            "Funciona apenas em superfícies horizontais (top); paredes verticais não recebem ironing.",
          ],
          integrations: [
            { module: "Módulo 6 (Pós-processamento)", text: "Ironing dispensa lixa fina em superfícies planas superiores." },
            { module: "Módulo 22 (Perfis)", text: "Filamento úmido gera bolhas no ironing — seque antes." },
          ],
          params: [
            { param: "Ironing Flow", value: "12%", action: "Microfluxo para alisar sem acumular" },
            { param: "Espaçamento", value: "0.15 mm", action: "Ajuste para bico 0.4mm" },
          ],
          goldenRule: "Seque o filamento antes de ativar Ironing — umidade gera bolhas visíveis no espelhamento.",
          errors: [
            { error: "Bolhas no top liso", solution: "Seque o filamento 4h em estufa a 50°C." },
            { error: "Topo enrugado", solution: "Reduza Ironing Flow para 8% e velocidade para 20 mm/s." },
          ],
          finance: "Peças com ironing podem ser vendidas como acabamento premium (+20–30% no preço).",
          exercise: [
            "Imprima placa 50×50mm com e sem Ironing.",
            "Compare brilho sob luz oblíqua.",
            "Anote o melhor flow para seu filamento.",
          ],
        }),
      L(2, "bridges-overhangs", "Bridges e Overhangs — Controle das Fatias Suspensas", "30min",
        ["Bridge Speed reduzida", "Cooling 100%"], {
          theory: [
            "Bridge: linha estendida no ar entre dois apoios — exige resfriamento agressivo para não cair.",
            "Receita: velocidade 30–50% da normal + cooling 100% + Bridge Flow Ratio 0.90–0.95.",
            "Bridge Detect (Orca) identifica automaticamente e aplica perfil de ponte na região.",
          ],
          integrations: [
            { module: "Módulo 3 (Suportes)", text: "Cooling máximo congela o filamento no ar antes que ele caia." },
            { module: "Módulo 19 (Suportes)", text: "Ponte bem calibrada elimina necessidade de suporte interno." },
          ],
          params: [
            { param: "Bridge Flow Ratio", value: "0.95", action: "Reduz vazão para tensionar a suspensão" },
            { param: "Bridge Speed", value: "30 mm/s", action: "Tempo para cooling solidificar o fio" },
          ],
          goldenRule: "Ative Bridge Detect automaticamente — o Orca identifica e ajusta sozinho.",
          errors: [
            { error: "Ponte cai", solution: "Reduza Bridge Speed para 20 mm/s e Flow para 0.90." },
            { error: "Ponte fofa/sem tensão", solution: "Aumente Bridge Flow Ratio para 1.0 e ative cooling máximo." },
          ],
          economy: "Pontes bem feitas eliminam ~30% dos suportes em peças mecânicas — economia direta.",
          exercise: [
            "Imprima Bridge Test do Orca Calibration.",
            "Identifique distância máxima sem cair.",
            "Use 70% desse valor como limite seguro no design.",
          ],
        }),
      L(3, "fuzzy-skin", "Texturas e Acabamentos Decorativos (Fuzzy Skin)", "25min",
        ["Oscilações senoidais", "Outer Walls"], {
          theory: [
            "Fuzzy Skin aplica oscilações senoidais (0.1–0.3mm) na parede externa, criando textura aveludada.",
            "Disfarça imperfeições de camada e melhora aderência tátil — ideal para empunhaduras e cases.",
            "Aplicar apenas em Outer Walls preserva a integridade estrutural interna.",
          ],
          integrations: [
            { module: "Módulo 7 (Design)", text: "Disfarça imperfeições de camada e melhora aderência tátil." },
            { module: "Módulo 9 (Comercial)", text: "Acabamento texturizado vende como 'soft touch' premium." },
          ],
          params: [
            { param: "Fuzzy Skin Thickness", value: "0.3 mm", action: "Distância radial de oscilação" },
            { param: "Fuzzy Skin Point Distance", value: "0.75 mm", action: "Frequência do ruído tátil" },
          ],
          goldenRule: "Habilite Fuzzy Skin apenas em Outer Walls — afeta só a aparência, não a estrutura.",
          errors: [
            { error: "Peça perdeu precisão dimensional", solution: "Limite Fuzzy Skin a Outer Walls (não All Walls)." },
            { error: "Textura grossa demais", solution: "Reduza Fuzzy Skin Thickness para 0.15mm." },
          ],
          finance: "Itens com Fuzzy Skin (cases, empunhaduras) podem ser vendidos como acabamento soft-touch premium.",
          exercise: [
            "Imprima cilindro com Fuzzy Skin Thickness 0.15, 0.3 e 0.5mm.",
            "Compare toque e visual.",
            "Salve as duas variantes mais usadas como presets.",
          ],
        }),
      L(4, "pos-processamento-pro", "Pós-Processamento Profissional: Lixa, Acetona, Pintura e Insertos", "55min",
        ["Lixamento progressivo", "Alisamento químico (acetona)", "Primer + pintura", "Insertos heat-set", "Adesivos por material"], {
          theory: [
            "Pós-processamento é o que separa a peça 'impressa' do produto vendável. As quatro famílias de técnica: subtrativa (lixa, dremel), química (acetona, THF, MEK), aditiva (primer, tinta, verniz) e mecânica (insertos termofixados, parafusos, colagem).",
            "Cada material aceita um subconjunto: ABS/ASA aceitam acetona; PLA não (precisa de THF, mais perigoso); PETG só aceita lixa + tinta; Nylon aceita tingimento por imersão em corante para tecido a 60°C — vira preto-fosco perfeito.",
            "Insertos termofixados (heat-set inserts) são buchas de latão instaladas a quente no plástico, gerando rosca metálica permanente. Ferro de solda a 220°C + insert + 3-5s de pressão = encaixe profissional que aguenta torque de 2-4 Nm sem espanar.",
            "Ordem canônica do acabamento premium: (1) remover suportes → (2) lixar 220 → 400 → 800 → 1500 → 2000 → (3) limpar com álcool isopropílico → (4) primer filler 2 demãos → (5) lixa 1500 a seco → (6) tinta base acrílica → (7) verniz acetinado/fosco/brilho conforme briefing.",
          ],
          deepDive: [
            "Alisamento químico com acetona (somente ABS/ASA): câmara fechada (pote de vidro grande ou caixa de ferramenta selada), 30-50ml de acetona em papel-toalha nas paredes (NÃO em contato com a peça), peça suspensa por arame por cima do líquido, tempo 8-15 minutos para vapor agir. RISCOS REAIS: vapor de acetona é inflamável (limite inferior 2.6%) e tóxico — janelas abertas, longe de chamas, luvas nitrílica, respirador com cartucho VOC tipo A. Nunca use em ambiente fechado, nunca perto de gás de cozinha, NUNCA com criança no recinto.",
            "Lixamento progressivo eficiente: pular grit destrói tempo. Sequência testada 220 → 320 → 400 → 600 → 800 → 1500 → 2000. Cada grit remove os riscos do anterior; pular do 220 direto pro 800 deixa marcas que só aparecem na pintura. Use água + sabão neutro a partir do 600 (lixa d'água) — reduz pó, melhora corte, evita aquecer a peça (PLA derrete localmente com fricção seca).",
            "Insertos heat-set (M3 e M4 são os padrões makers): furo no CAD com tolerância correta — M3 short = furo Ø4.0mm, profundidade 5mm; M3 long = Ø4.0mm × 8mm; M4 = Ø5.6mm × 8mm. Use ferro de solda com ponta cônica dedicada (R$ 15-30), temperatura 220°C para PLA/PETG, 250°C para ABS. Pressione com pulso firme e VERTICAL — torto, o insert fica oblíquo e a rosca vira inutilizável.",
            "Adesivos por material (compatibilidade testada): PLA = CA gel (Loctite 480) ou epóxi 5min; PETG = epóxi obrigatório, CA não cola bem; ABS = solda química com acetona pura (junta vira monolítica) ou CA; Nylon = só epóxi 2 componentes; TPU = adesivo PU flexível (Sika Flex) ou cola sapateiro. Lixe a superfície antes de colar — área lisa não tem ancoragem mecânica.",
            "Pintura que dura: spray automotivo (Etna, Colorgin Akzo Nobel) sobre primer filler é o padrão. Demãos finas e cruzadas (vertical → horizontal → diagonal), 15-20cm de distância, tempo de cura entre demãos respeitado. Verniz final UV-resistente para peças externas. Em peças que serão manuseadas, finalize com 2 demãos de verniz acetinado — protege a tinta de unhas e atrito.",
          ],
          integrations: [
            { module: "Módulo 2 (Materiais)", text: "Escolha do material define o pós-processamento disponível — ABS para acetona, Nylon para tingimento, PETG para pintura simples." },
            { module: "Módulo 7 (Design)", text: "Projete já com furos para insertos e tolerâncias de pintura (+0.2mm em encaixes que vão receber 3-4 demãos)." },
            { module: "Módulo 15 (Comercial)", text: "Peça pintada + envernizada custa R$ 8-15 a mais em insumos e tempo, mas vende por 2-3× o valor da crua." },
          ],
          params: [
            { param: "Temperatura ferro p/ insert (PLA/PETG)", value: "220°C", action: "Funde plástico ao redor sem queimar" },
            { param: "Temperatura ferro p/ insert (ABS)", value: "250°C", action: "ABS exige mais calor para escoar" },
            { param: "Tempo vapor acetona (ABS, peça pequena)", value: "8-12 min", action: "Mais que isso = perda de detalhe" },
            { param: "Grit final antes do primer", value: "800-1500", action: "Superfície aceita primer uniformemente" },
            { param: "Tolerância furo M3 heat-set", value: "Ø 4.0 × 5.0 mm", action: "Insert curto padrão McMaster/Aliexpress" },
            { param: "Tolerância furo M4 heat-set", value: "Ø 5.6 × 8.0 mm", action: "Insert para carga estrutural" },
            { param: "Distância spray", value: "15-20 cm", action: "Mais perto escorre, mais longe vira casca de laranja" },
          ],
          goldenRule: "Pós-processamento começa no CAD: peça projetada para acabamento (orientação, furos para inserto, chanfros) economiza 70% do tempo de pós em relação a 'consertar' depois.",
          errors: [
            { error: "Insert termofixado entortado e rosca espanada", solution: "Use guia perpendicular (gabarito impresso) e ferro com ponta dedicada — nunca à mão livre" },
            { error: "Peça ABS derretida demais na acetona (perdeu detalhe)", solution: "Reduza tempo de exposição em 50% e ventile o pote a cada 3 min para reduzir saturação do vapor" },
            { error: "Tinta descascando em horas após pintura", solution: "Faltou primer filler ou superfície gordurosa — limpe com álcool isopropílico e aplique primer ANTES da tinta colorida" },
            { error: "CA não colou PETG", solution: "PETG quase não reage com cianoacrilato — troque para epóxi 5min e lixe a junta antes" },
            { error: "Marcas de lixa visíveis sob a tinta", solution: "Você pulou grits. Volte do 320 fazendo 320→400→600→800→1500 antes do primer" },
          ],
          checklist: [
            "Ventilação adequada (janela aberta + ventilador exaustor) sempre que usar acetona, primer ou tinta spray",
            "EPI: luvas nitrílica + óculos de segurança + respirador com cartucho VOC tipo A",
            "Bancada coberta com papelão/jornal trocado a cada projeto",
            "Insertos heat-set comprados na medida correta (M3/M4) antes de modelar o furo",
            "Lixas em sequência completa (220/320/400/600/800/1500/2000) — sem pular grits",
            "Primer e tinta da mesma marca/linha (compatibilidade química garantida)",
            "Tempo de cura entre demãos respeitado (ler embalagem — pressa = casca de laranja)",
            "Foto antes/depois para portfólio comercial",
          ],
          economy: "Pós-processamento dobra o tempo total da peça mas multiplica o preço por 2-3×. Margem líquida por hora trabalhada cresce de R$ 18-25 (peça crua) para R$ 45-70 (peça acabada premium).",
          finance: "Kit inicial profissional: lixas progressivas (R$ 35), primer filler 2 latas (R$ 80), 3 cores de tinta spray (R$ 90), verniz (R$ 45), 50 insertos M3+M4 (R$ 60), ferro de solda dedicado (R$ 60) = R$ 370. Retorno em 8-10 peças premium vendidas.",
          caseStudy: "Encomenda: 20 cases para controlador de drone, ABS preto, acabamento 'industrial fosco'. Processo: impressão 14h, lixa 320→600 (40min/peça), vapor de acetona 10min/peça em pote 5L com 4 peças por ciclo, instalação de 4 insertos M3 por case (5min/peça), verniz fosco preto fosco 2 demãos. Tempo total pós: 1h45 por peça × 20 = 35h. Preço de venda: R$ 95/un (vs R$ 35 da peça crua). Margem extra: R$ 1.200 — equivalente a R$ 34/h líquidos de pós-processamento.",
          exercise: [
            "Imprima 3 cubos 30mm em ABS",
            "Aplique no cubo 1: só lixa 220 → 800",
            "Aplique no cubo 2: lixa 220 → 800 + primer + tinta",
            "Aplique no cubo 3: vapor de acetona 10min + secagem 24h",
            "Compare brilho, toque, e tempo gasto em cada — escolha o fluxo padrão para seu produto",
            "Instale 2 insertos M3 em uma peça de teste e parafuse — confirme torque sem espanar",
          ],
        }),
    ],
  },
  {
    id: "novidades-orcaslicer-3-2",
    number: 25,
    title: "Novidades do OrcaSlicer 3.2",
    tagline: "Visualização realista, Troubleshoot Center, pontes e Lightning configurável",
    level: "Avançado",
    duration: "1h 30min",
    methodology: "Walkthrough das funcionalidades introduzidas no OrcaSlicer 3.2 (beta), com explicação item-a-item de cada novidade: o que é, por que ajustar, como aplicar, exemplos e regra de ouro.",
    objective: "Dominar os novos recursos do OrcaSlicer 3.2: visualização Phong+SSAO, sliders aprimorados, Troubleshoot Center, pontes dedicadas, filamento padrão, Moonraker nativo e Lightning Infill configurável.",
    lessons: [
      L(1, "modulo-orcaslicer-3-2-novidades", "Todas as novidades do OrcaSlicer 3.2", "1h 30min",
        ["Visualização Phong+SSAO", "Sliders", "Troubleshoot Center", "Pontes dedicadas", "Moonraker", "Lightning Infill"], {
          theory: [
            "O OrcaSlicer 3.2 traz uma reformulação visual, novas ferramentas de diagnóstico e melhorias profundas em pontes, infill Lightning e integração com hosts Klipper.",
            "Cada item abaixo é uma novidade explicada em detalhe: o que é, por que importa, como configurar e exemplo de uso.",
          ],
          goldenRule: "Atualize para 3.2 quando precisar de Troubleshoot Center, pontes mais fortes ou Moonraker nativo — mantenha 2.4 para perfis de produção já calibrados.",
        }),
    ],
  },
  {
    id: "novidades-orcaslicer-3-3",
    number: 26,
    title: "Novidades do OrcaSlicer 3.3",
    tagline: "UI refresh, Cloud Slicing, suportes em árvore com ponta fina e Purge Mode",
    level: "Avançado",
    duration: "1h 15min",
    methodology: "Estudo das novidades do OrcaSlicer 3.3: nova interface, fatiamento na nuvem, melhorias em suportes em árvore, modo de purga multimaterial e Fuzzy Skin contínuo. Cada recurso é destrinchado item-a-item.",
    objective: "Dominar os recursos da versão 3.3: nova UI, Cloud Slicing, suportes em árvore com diâmetro de ponta configurável, Purge Mode multimaterial, pular etapas de pós-processamento e Fuzzy Skin contínuo.",
    lessons: [
      L(1, "modulo-orcaslicer-3-3-novidades", "Todas as novidades do OrcaSlicer 3.3", "1h 15min",
        ["UI Refresh", "Cloud Slicing", "Suporte Árvore", "Purge Mode", "Fuzzy Skin contínuo"], {
          theory: [
            "O OrcaSlicer 3.3 foca em produtividade: nova interface, fatiamento remoto na nuvem, suportes em árvore com remoção mais limpa e economia em multimaterial via Purge Mode.",
            "Cada item abaixo detalha uma novidade — o que é, por que ativar, como configurar e impacto real.",
          ],
          goldenRule: "Ative Purge Mode em qualquer projeto multimaterial — economia de até 60% de filamento sem perder qualidade.",
        }),
    ],
  },
];


// Merge per-lesson item-by-item explanations from the orca-param-details file
import { orcaParamDetails } from "./orca-param-details";
for (const m of modules) {
  for (const l of m.lessons) {
    const details = orcaParamDetails[l.id];
    if (details) l.paramDetails = details;
  }
}

export const courseStats = {
  modules: modules.length,
  lessons: modules.reduce((a, m) => a + m.lessons.length, 0),
  hours: 56,
  downloads: 40,
};
