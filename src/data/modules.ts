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
    level: "Iniciante/Intermediário", duration: "1h 30min",
    methodology: "Tabelas comparativas, perfis prontos por material, técnicas de armazenamento e secagem.",
    objective: "Dominar as principais famílias de filamentos, suas propriedades, aplicações e configuração no OrcaSlicer.",
    lessons: [
      L(1, "fundamentos-materiais", "Fundamentos dos Materiais", "30min",
        ["Propriedades", "Armazenamento", "Secagem", "Qualidade"], {
          theory: [
            "Os filamentos são o 'combustível' da impressão 3D FDM. Cada tipo tem propriedades químicas e físicas únicas que determinam temperatura de fusão, resistência, flexibilidade e aplicações ideais.",
            "Escolher o filamento certo é tão importante quanto configurar a impressora corretamente — papel não serve para parede, concreto não serve para cortina.",
            "Filamentos absorvem umidade do ar (higroscopia). Umidade causa estalos, bolhas, fiapos e peças frágeis. Cada material tem sensibilidade diferente.",
            "Filamento barato sai caro: variação de diâmetro, umidade alta e aditivos ruins resultam em falhas, entupimentos e tempo perdido.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "Cada novo filamento exige Temp Tower + Flow + PA dedicados." },
            { module: "Módulo 22 (Perfis)", text: "Salve perfis separados para cada marca e cor — comportamentos variam." },
          ],
          params: [
            { param: "Temperatura de Fusão (Tg)", value: "Varia por material", action: "Define temperatura do bico" },
            { param: "Higroscopia", value: "Variável", action: "Define necessidade de secagem" },
            { param: "Tolerância de diâmetro", value: "±0.02mm ideal", action: "Garante extrusão uniforme" },
            { param: "Umidade armazenamento", value: "< 15% UR", action: "Recipiente hermético + sílica" },
          ],
          goldenRule: "Filamento seco é a base de uma boa impressão. Invista em um secador e mantenha seus filamentos em recipientes herméticos.",
          errors: [
            { error: "Estalos no bico durante a extrusão", solution: "Filamento úmido — seque conforme tabela" },
            { error: "Superfície áspera com bolhas", solution: "Seque o filamento antes de imprimir" },
            { error: "Peças frágeis e quebradiças", solution: "Filamento absorveu umidade — secar" },
            { error: "Variação de diâmetro", solution: "Troque por filamento de marca com tolerância ±0.02mm" },
          ],
          finance: "Filamento de qualidade reduz falhas em 50%+ e elimina entupimentos — economia real apesar do preço maior.",
          exercise: [
            "Meça o diâmetro do seu filamento em 5 pontos com paquímetro",
            "Monte uma drybox com recipiente hermético + sílica indicadora",
            "Crie um perfil de filamento no OrcaSlicer (Gerenciar perfis → Novo)",
            "Anote densidade, diâmetro, temperaturas e Flow Ratio",
          ],
          deepDive: [
            "Temperaturas de secagem por material: PLA 40-50°C/4-6h, PETG 60-70°C/4-6h, ABS 70-80°C/4-6h, Nylon 80-90°C/8-12h, TPU 70-80°C/4-6h.",
            "Métodos de secagem: secador dedicado (excelente, recomendado), forno baixa temperatura (bom para grandes quantidades), desidratador de alimentos (alternativa econômica), sacos a vácuo + sílica (apenas manutenção).",
            "Suportes solúveis: PVA/BVOH (água) para PLA e PETG, HIPS (limoneno) para ABS, AquaSys (solução alcalina) para Nylon.",
            "Escolha por aplicação: PLA para protótipo visual, PETG para funcional interno, ASA para externo/sol, ABS/ASA para automotivo, TPU para flexível, Nylon+CF para engrenagens e suportes mecânicos.",
          ],
          checklist: [
            "Higrômetro digital dentro de cada drybox",
            "Sílica gel indicadora trocada a cada 30 dias",
            "Etiqueta na bobina: marca, material, cor, data de abertura",
            "Secador calibrado com termômetro independente",
            "PETG, TPU e Nylon nunca fora da drybox durante impressão",
          ],
        }),
      L(2, "pla-petg", "PLA e PETG — Características e Configuração", "30min",
        ["PLA rígido", "PETG tenaz", "Stringing", "Perfis"], {
          theory: [
            "PLA (Ácido Polilático): bioplástico derivado de amido, biodegradável, fácil de imprimir, baixa retração, ótimo acabamento. Frágil ao impacto e amolece em ~55-60°C — derrete dentro de carro fechado no sol.",
            "PETG (Polietileno Tereftalato Glicol): versão modificada do PET, equilíbrio entre resistência e facilidade. Resistente a impactos, químicos e calor (~80°C). Stringing crônico e adesão forte demais à mesa.",
            "PLA é ideal para decoração, miniaturas, protótipos visuais. PETG é ideal para peças funcionais internas, recipientes, suportes que exigem durabilidade.",
            "PETG é higroscópico — spool aberto >2 semanas começa a 'pipocar' no bico. Secar a 65°C por 4-6h resolve.",
          ],
          integrations: [
            { module: "Módulo 5 (Calibração)", text: "PETG exige Pressure Advance bem ajustado — PLA perdoa, PETG não." },
            { module: "Módulo 6 (Engenharia)", text: "Para peça funcional externa: PETG ou ASA. PLA é só protótipo." },
          ],
          params: [
            { param: "PLA — Nozzle", value: "190-215°C (205 ideal)", action: "Fluidez ideal" },
            { param: "PLA — Mesa", value: "50-70°C (60 ideal)", action: "Adesão sem deformar" },
            { param: "PLA — Fan", value: "80-100%", action: "Bom resfriamento" },
            { param: "PETG — Nozzle", value: "220-250°C (235-240)", action: "Fluidez do PETG" },
            { param: "PETG — Mesa", value: "70-85°C (80 ideal)", action: "Adesão estável" },
            { param: "PETG — Fan", value: "30-60%", action: "Resfriamento moderado, evita warping" },
            { param: "Retração Direct (PLA)", value: "0.5-1.5mm", action: "Calibrar" },
            { param: "Retração Direct (PETG)", value: "1.0-2.0mm", action: "Calibrar contra stringing" },
          ],
          goldenRule: "Use PLA para tudo que é visual e não exige resistência. Use PETG para peças funcionais que precisam de durabilidade.",
          errors: [
            { error: "PETG arrancando pedaço de PEI ao remover", solution: "Espere mesa esfriar até 40°C antes de tocar" },
            { error: "Stringing severo em PETG", solution: "Seque o spool 6h a 65°C antes de mexer na retração" },
            { error: "PLA deformando em ambiente quente", solution: "Troque para PETG ou ASA — PLA amolece a 60°C" },
            { error: "PETG colando no bico", solution: "Reduzir temperatura em 5°C, aumentar Z-Offset" },
          ],
          economy: "Spool de PETG seco rende ~15% mais peças aprovadas vs spool úmido — secadora paga-se rápido.",
          exercise: [
            "Imprima Temp Tower em PLA (180-220°C) e PETG (220-250°C)",
            "Identifique faixa sem stringing visível",
            "Crie perfil dedicado para cada marca no OrcaSlicer",
            "Teste destacar peça PETG fria vs morna em PEI",
          ],
          deepDive: [
            "Tabela comparativa PLA vs PETG: facilidade (excelente vs boa), resistência (baixa vs média), calor (60°C vs 80°C), flexibilidade (baixa vs média), biodegradável (sim vs não), preço (baixo vs médio).",
            "Dicas PLA: mesa aderente (cola bastão, PEI), camadas finas (0.12mm) para detalhes, evitar peças expostas ao sol.",
            "Dicas PETG: Z-Offset ligeiramente maior que PLA, cola/spray na mesa para facilitar remoção, evitar resfriamento excessivo (warping).",
          ],
        }),
      L(3, "abs-asa-tpu-nylon", "ABS, ASA, TPU e Nylon — Materiais Técnicos", "30min",
        ["ABS/ASA enclosure", "TPU Direct Drive", "Nylon higroscópico", "Warping"], {
          theory: [
            "ABS (Acrilonitrila Butadieno Estireno): plástico de engenharia, alta resistência ao impacto, ~100°C de resistência térmica, ótimo pós-processamento com acetona. Warping severo, exige enclosure e ventilação (VOCs tóxicos).",
            "ASA (Acrilonitrila Estireno Acrilato): versão do ABS com resistência UV — não amarela ao sol. Ideal para peças externas, automotivo, equipamentos ao ar livre.",
            "TPU (Poliuretano Termoplástico): flexível e elástico (Shore 85A-95A), excelente absorção de impacto e vibração. Exige Direct Drive obrigatório, velocidade baixa (15-30 mm/s), retração mínima.",
            "Nylon (PA6, PA12, compostos com fibra): alta performance industrial, extremamente resistente e durável. Muito higroscópico (secagem constante), abrasivo (bico de aço endurecido), warping alto.",
          ],
          integrations: [
            { module: "Módulo 3 (Cooling)", text: "ABS e ASA: fan 0-10%. Mais que isso = warping e delaminação." },
            { module: "Módulo 14 (Troubleshooting)", text: "Warping em ABS = problema de ambiente (enclosure aberto, AC ligado), não de perfil." },
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
            { param: "Nylon — Bico", value: "Aço endurecido", action: "Obrigatório (abrasivo)" },
            { param: "Enclosure (ABS/ASA/Nylon)", value: "Obrigatório", action: "Sem ele, warping garantido" },
          ],
          goldenRule: "O filamento certo para a aplicação certa é a chave para peças duráveis. Filamento seco e bem armazenado é o primeiro passo para o sucesso.",
          errors: [
            { error: "Warping em ABS/ASA", solution: "Enclosure tampado + Brim 8mm + fan 0% + mesa pré-aquecida 10-15min" },
            { error: "TPU em Bowden — clog garantido", solution: "Use Direct Drive ou troque para PETG flexível" },
            { error: "Nylon com bolhas e baixa resistência", solution: "Secar 80-90°C por 8-12h, manter em secador durante impressão" },
            { error: "ABS amarelando ao sol", solution: "Troque para ASA — ABS não resiste a UV" },
            { error: "Bico desgastado rapidamente com Nylon-CF", solution: "Use bico de aço endurecido ou rubi" },
          ],
          finance: "Enclosure DIY com painéis ACM custa R$ 150-300 e habilita ABS/ASA/PC/Nylon — abre nicho de peças industriais e externas.",
          exercise: [
            "Seque um spool TPU 8h a 50°C e imprima chaveiro flexível a 20 mm/s",
            "Imprima caixa ABS 100mm de altura — com e sem enclosure, compare warping",
            "Crie perfil ASA para peça externa de teste",
            "Documente configurações ideais por filamento em tabela",
          ],
          deepDive: [
            "Como escolher: ambiente quente >60°C → PETG/ABS/ASA. Sol/UV → ASA. Flexibilidade → TPU. Máxima resistência → Nylon. Engrenagem mecânica → Nylon+CF.",
            "Comparativo técnicos: ABS (~100°C, baixa flex, UV ruim, enclosure obrigatório), ASA (idêntico ao ABS mas UV excelente), TPU (~70°C, alta flex, enclosure opcional), Nylon (~120°C, média flex, UV bom, enclosure obrigatório, caro).",
            "Dicas Nylon: use adesivos para mesa (PVA, cola), mantenha filamento em secador ATIVO durante a impressão (não só antes), bico aço/rubi obrigatório.",
          ],
          checklist: [
            "Enclosure fechado e estável antes de iniciar ABS/ASA/Nylon",
            "Ventilação ambiente adequada (VOCs do ABS são tóxicos)",
            "Bico de aço endurecido instalado para Nylon-CF",
            "Direct Drive verificado antes de TPU",
            "Secador ligado durante toda impressão de Nylon",
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
        ["Parâmetros térmicos complexos", "Raciocínio clínico", "Variável única"], {
          theory: [
            "A integração de parâmetros térmicos complexos exige raciocínio clínico: identificar o sintoma principal, isolar variáveis, intervir.",
            "Pense como médico: anamnese (o que mudou desde a última impressão boa?), exame (foto macro, peso, dimensões), hipótese, intervenção.",
            "A maioria dos defeitos tem 1 causa raiz e 3-4 sintomas secundários. Resolver a raiz cura todos.",
            "Documente cada intervenção: o que mudou, o que melhorou, o que piorou. Memória dispersa não acelera diagnóstico.",
          ],
          integrations: [
            { module: "Módulo 14 (Troubleshooting)", text: "Use a árvore de decisão de troubleshooting como referência — não chute." },
            { module: "Módulo 5 (Calibração)", text: "Sintomas que voltam = calibração base perdida; refaça PA e Flow antes de mais ajustes." },
          ],
          params: [
            { param: "Nível do Desafio", value: "Expert Integrado", action: "Garante raciocínio clínico" },
            { param: "Variáveis por Intervenção", value: "1", action: "Diagnóstico múltiplo simultâneo = dado corrompido" },
          ],
          goldenRule: "Varie uma única variável por vez — sempre. Diagnóstico múltiplo simultâneo é impossível de interpretar.",
          errors: [
            { error: "Mudar 4 parâmetros e a peça melhorar", solution: "Você não sabe o que funcionou — refaça uma de cada vez" },
            { error: "Confiar em memória de ajustes anteriores", solution: "Anote tudo em planilha por filamento e máquina" },
          ],
          finance: "Diagnóstico ordenado economiza horas/máquina — em produção, vale R$50-100 por hora salva.",
          exercise: [
            "Pegue uma peça com defeito recente",
            "Liste todos os sintomas visíveis",
            "Identifique o sintoma mais grave",
            "Faça UMA intervenção, reimprima, compare",
          ],
        }),
      L(2, "diagnose-fisica", "Desafios Integrados de Diagnose Física", "35min",
        ["Warping severo", "PID dinâmico", "Sintomas múltiplos"], {
          theory: [
            "Warping severo exige intervenção combinada: Brim alargado + fan desligado + PID calibrado + mesa quente + enclosure fechado.",
            "Z-banding (faixas horizontais regulares) indica problema no fuso Z, lubrificação ou PID instável da mesa.",
            "Sintomas múltiplos quase sempre vêm de problema ambiental (umidade do filamento, AC ligado, mesa fria) — não de slicer.",
            "Use árvore de decisão: ambiente → calibração → slicer → CAD. Nessa ordem, sempre.",
          ],
          integrations: [
            { module: "Módulo 14 (Troubleshooting)", text: "Diagnose de sintomas múltiplos requer abordagem em árvore de decisão sistemática." },
            { module: "Módulo 4 (Materiais)", text: "ABS/ASA sem enclosure = warping crônico, não tem ajuste de slicer que resolva." },
          ],
          params: [
            { param: "Intervenção Crítica", value: "PID Dinâmico", action: "Estabiliza aquecimento para eliminar Z-Banding" },
            { param: "Brim para ABS", value: "8-12 mm", action: "Compensa contração nas bordas" },
            { param: "Fan ABS/ASA", value: "0-10%", action: "Reduz contração térmica abrupta" },
          ],
          goldenRule: "Higienize a placa PEI com sabão neutro semanalmente — oleosidade é causa nº 1 de descolamento.",
          errors: [
            { error: "Warping em ABS culpando o slicer", solution: "Confirme enclosure fechado, fan 0%, mesa 110°C — ambiente vence" },
            { error: "Z-banding tratado como PA", solution: "Lubrifique fuso Z e refaça PID da mesa antes de mexer em PA" },
          ],
          economy: "Hábito semanal de limpar mesa PEI reduz descolamentos em 60% — vale 10 minutos por semana.",
          exercise: [
            "Limpe a mesa com sabão neutro + esponja macia",
            "Rode PID Tune no firmware",
            "Reimprima uma peça que descolou antes",
            "Anote a melhora no caderno de manutenção",
          ],
        }),
      L(3, "tela-11-qualidade-camada-largura-costura", "Tela 01 — Qualidade: Altura da camada, Largura da linha e Costura", "15min",
        ["Aba Qualidade", "Altura da camada", "Largura da linha", "Costura (Seam)"], {
          screens: [{
            src: "tela_11",
            tela: "Tela 11",
            panel: "Painel Esquerdo › aba QUALIDADE (ativa)",
            tool: "Seções visíveis: Altura da camada · Largura da linha · Costura",
            caption: "Topo da aba Qualidade — primeira tela ao abrir um perfil. Define resolução vertical, fluxo por linha e posição da cicatriz.",
          }],
          theory: [
            "Esta é a primeira tela da aba QUALIDADE no painel esquerdo. Aqui você define a base da impressão: quão fina é cada camada, quanto plástico cada linha deposita e onde a costura vertical aparece.",
            "Altura da camada (0,2 mm padrão) e Altura da primeira camada (0,2 mm) controlam resolução vertical e adesão.",
            "A seção Largura da linha mostra Padrão, Primeira camada, Parede externa/interna, Superfície superior, Preenchimento esparso/sólido, Suporte e Ponte — todos calibrados para bico 0,4 mm.",
            "A seção Costura define posição (Alinhada), escalonamento e a beta Scarf Seam para junções invisíveis.",
          ],
          params: [
            { param: "Altura da camada", value: "0,20 mm", action: "Padrão equilíbrio qualidade/tempo (bico 0,4)" },
            { param: "Largura > Padrão", value: "0,42 mm", action: "Linha base de extrusão" },
            { param: "Largura > Primeira camada", value: "0,5 mm", action: "Mais grossa = melhor adesão PEI" },
            { param: "Largura > Parede externa", value: "0,42 mm", action: "Define qualidade visual" },
            { param: "Costura > Posição", value: "Alinhada", action: "Empilha cicatrizes num canto oculto" },
            { param: "Vão entre costuras", value: "10%", action: "Distribui tensão sem ficar visível" },
          ],
          goldenRule: "Altura da camada = 25–75% do diâmetro do bico. Para 0,4 mm, use 0,1 a 0,3 mm. Parede externa lenta + 0,42 mm = melhor acabamento.",
        }),
      L(4, "tela-12-qualidade-precisao-alisamento", "Tela 02 — Qualidade: Precisão, Alisamento (Ironing) e Compensações", "15min",
        ["Aba Qualidade (rolagem)", "Precisão", "Alisamento", "Compensação XY"], {
          screens: [{
            src: "tela_12",
            tela: "Tela 12",
            panel: "Painel Esquerdo › aba QUALIDADE (rolagem inferior)",
            tool: "Seções visíveis: Precisão · Alisamento · início de Gerador de paredes",
            caption: "Continuação da aba Qualidade — fechamento de vãos, Arc Fitting, compensação de pé de elefante e Ironing.",
          }],
          theory: [
            "Rolando a aba QUALIDADE você encontra Precisão: Raio de fechamento de vãos (0,049 mm), Resolução (0,012 mm), Arc Fitting, Compensação de furos XY, Compensação de contornos XY e Compensação de pé de elefante (0,1 mm).",
            "Logo abaixo está Alisamento (Ironing) — 'Sem alisamento' por padrão; ative 'Top surfaces' para superfícies superiores espelhadas.",
            "Contorno em Z aparece desativado — só ative em superfícies orgânicas planas, nunca em peças com detalhes finos.",
          ],
          params: [
            { param: "Resolução", value: "0,012 mm", action: "Precisão da malha fatiada" },
            { param: "Arc fitting", value: "Ativado (curvas)", action: "Reduz G-code e suaviza arcos" },
            { param: "Compensação furos XY", value: "−0,05 mm", action: "Compensa furos que saem menores em FDM" },
            { param: "Pé de elefante", value: "0,1 mm", action: "Remove alargamento da base" },
            { param: "Tipo de Alisamento", value: "Top surfaces", action: "Espelha superfície superior" },
          ],
          goldenRule: "Para encaixes precisos: Compensação de furos XY = −0,05 mm e Contorno XY = −0,05 mm. Ironing apenas em topos planos.",
        }),
      L(5, "tela-13-resistencia-gerador-paredes", "Tela 03 — Resistência: Gerador de Paredes (Classic vs Arachne) e Superfícies", "15min",
        ["Aba Resistência", "Gerador de paredes", "Paredes e superfícies", "Ponte"], {
          screens: [{
            src: "tela_13",
            tela: "Tela 13",
            panel: "Painel Esquerdo › aba RESISTÊNCIA (topo)",
            tool: "Seções visíveis: Gerador de paredes · Paredes e superfícies · início de Ponte",
            caption: "Topo da aba Resistência. Note 'Gerador de paredes: Clássico' — alterne para Arachne para detalhes finos.",
          }],
          theory: [
            "Esta tela mostra o topo da aba RESISTÊNCIA. A primeira escolha é Gerador de paredes: Clássico (largura fixa) ou Arachne (largura variável, ideal para textos e fendas <1 mm).",
            "Em Paredes e superfícies: Ordem de impressão (Interior/Exterior para visual), Direção da volta da parede (Anti-horário), Limiar de parede única (300%) e Evitar atravessar paredes.",
            "Logo abaixo começa Ponte com Taxa de fluxo em ponte (1.0) e densidades de ponte externa/interna.",
          ],
          params: [
            { param: "Gerador de paredes", value: "Arachne (recomendado)", action: "Largura variável fecha lacunas" },
            { param: "Ordem das paredes", value: "Interior/Exterior", action: "Melhor acabamento visual" },
            { param: "Parede única em sup. superiores", value: "Ativado", action: "Acabamento mais limpo no topo" },
            { param: "Limiar de parede única", value: "300%", action: "Define quando virar parede única" },
          ],
          goldenRule: "Arachne para peças com detalhes finos (<1 mm); Clássico para peças estruturais simples e paredes mecânicas.",
        }),
      L(6, "tela-14-resistencia-ponte-saliencias", "Tela 04 — Resistência: Pontes e Saliências (Overhangs)", "12min",
        ["Aba Resistência (rolagem)", "Ponte", "Saliências", "Detecção de overhangs"], {
          screens: [{
            src: "tela_14",
            tela: "Tela 14",
            panel: "Painel Esquerdo › aba RESISTÊNCIA (meio)",
            tool: "Seções visíveis: Ponte (final) · Saliências (overhangs)",
            caption: "Configurações de Pontes e detecção de saliências — fundamentais para imprimir overhangs >45° sem suportes.",
          }],
          theory: [
            "Continuação da aba RESISTÊNCIA. A seção Ponte fecha com Densidade de ponte externa/interna (100%), Pontes externas/internas grossas, Camadas extras de ponte (beta) e Pontes para furos rebaixados.",
            "A seção Saliências controla overhangs: Detectar paredes salientes (ativo), Tornar saliências imprimíveis, Paredes extras em saliências (ativo) e Reversão em par.",
            "Quando 'Paredes extras em saliências' está ativo, o Orca adiciona reforços automáticos em ângulos críticos — reduz a necessidade de suportes em até 40%.",
          ],
          params: [
            { param: "Densidade ponte externa", value: "100%", action: "Ponte sólida sem vão" },
            { param: "Filtrar pontes internas", value: "Filtrar", action: "Remove micro-pontes irrelevantes" },
            { param: "Detectar paredes salientes", value: "Ativado", action: "Identifica overhangs automaticamente" },
            { param: "Paredes extras em saliências", value: "Ativado", action: "Reforça overhangs críticos" },
          ],
          goldenRule: "Ative 'Paredes extras em saliências' antes de adicionar suportes — muitas vezes elimina a necessidade.",
        }),
      L(7, "tela-21-resistencia-cascas-preenchimento", "Tela 05 — Resistência: Voltas da Parede, Cascas e início do Infill", "15min",
        ["Aba Resistência", "Paredes", "Cascas topo/base", "Preenchimento"], {
          screens: [{
            src: "tela_21",
            tela: "Tela 21",
            panel: "Painel Esquerdo › aba RESISTÊNCIA (seção Paredes/Cascas)",
            tool: "Seções visíveis: Paredes · Cascas de topo/base · Preenchimento",
            caption: "Configurações fundamentais de resistência: número de paredes, espessura de topo/base e densidade do infill.",
          }],
          theory: [
            "Voltas da parede (3) define quantos perímetros formam a casca lateral — 3 é o mínimo para peças estruturais, 4–6 para mecânicas.",
            "Cascas de topo/base: 5 camadas de topo (1 mm) e 3 de base, com Padrão 'Linha monótona' para topo e 'Monótono' para base — eliminam pillowing.",
            "Sobreposição superior/inferior de preenchimento/parede = 15% garante fusão entre infill e casca.",
            "Preenchimento esparso: 15% Grade — adequado para peças decorativas; suba para 25% Gyroid em funcionais.",
          ],
          params: [
            { param: "Voltas da parede", value: "3 (mínimo)", action: "4–6 para peças mecânicas" },
            { param: "Camadas de topo", value: "5 · 1 mm", action: "Elimina pillowing" },
            { param: "Camadas de base", value: "3", action: "Garante fechamento da base" },
            { param: "Densidade do infill", value: "15% (subir p/ 25%)", action: "Funcionais = 25% Gyroid" },
            { param: "Sobreposição infill/parede", value: "15%", action: "Funde infill à casca" },
          ],
          goldenRule: "4 paredes + 25% Gyroid = melhor relação resistência/peso para a maioria das peças funcionais.",
        }),
      L(8, "tela-22-resistencia-padroes-infill", "Tela 06 — Resistência: Padrões e Direção do Infill", "15min",
        ["Aba Resistência (rolagem)", "Padrão de preenchimento", "Direção", "Avançado"], {
          screens: [{
            src: "tela_22",
            tela: "Tela 22",
            panel: "Painel Esquerdo › aba RESISTÊNCIA (configurações de Infill)",
            tool: "Seções visíveis: Preenchimento esparso e sólido · início de Avançado",
            caption: "Configuração detalhada do infill: direção (45°), padrão, âncoras e início da seção Avançado.",
          }],
          theory: [
            "Direção do preenchimento esparso (45°) — ângulo padrão das linhas de infill, distribuindo carga em X e Y.",
            "Comprimento máximo da âncora (20 mm) e Comprimento da âncora (400%) — quanto o infill 'ancora' na parede para evitar deslocamento.",
            "Padrão de preenchimento sólido = Retilíneo, Direção = 45°, Gabarito de rotação = 0,90 (rotaciona o padrão por camada para uniformizar).",
            "Aplicar preenchimento de vão = Superfícies — o Orca preenche vãos finos apenas onde necessário, economizando filamento.",
          ],
          params: [
            { param: "Direção infill esparso", value: "45°", action: "Padrão; use 0/90° p/ alinhar com cargas" },
            { param: "Padrão sólido", value: "Retilíneo / Monótono", action: "Superfícies mais limpas" },
            { param: "Comprimento da âncora", value: "400%", action: "Evita infill solto" },
            { param: "Aplicar preenchimento de vão", value: "Superfícies", action: "Preenche apenas onde precisa" },
          ],
          goldenRule: "Para peças com carga conhecida, alinhe a direção do infill (0° ou 90°) ao vetor de força principal.",
        }),
      L(9, "tela-23-resistencia-avancado", "Tela 07 — Resistência: Avançado (camadas sólidas, bridge angle, espessura)", "12min",
        ["Aba Resistência (final)", "Avançado", "Camadas sólidas", "Bridge angle"], {
          screens: [{
            src: "tela_23",
            tela: "Tela 23",
            panel: "Painel Esquerdo › aba RESISTÊNCIA (seção Avançado)",
            tool: "Seções visíveis: Avançado · Garantir espessura vertical da casca",
            caption: "Parâmetros avançados que controlam camadas sólidas internas, ângulo relativo de ponte e detecção de infill estreito.",
          }],
          theory: [
            "Inserir camadas sólidas — força camadas 100% sólidas em alturas específicas (úteis para roscas e encaixes).",
            "Direção de preenchimento de ponte externa/interna (0°) — controla orientação das pontes internas. 'Relative bridge angle' (desativado) faria o Orca rotacionar automaticamente.",
            "Limiar mínimo de preenchimento esparso (15 mm²) — áreas menores que isso viram preenchimento sólido.",
            "Detectar preenchimentos sólidos internos estreitos (ativo) + Garantir espessura vertical da casca = 'Todos' — anti-vazamento dimensional em peças complexas.",
          ],
          params: [
            { param: "Limiar mín. infill esparso", value: "15 mm²", action: "Áreas menores viram sólidas" },
            { param: "Combinar preenchimento", value: "Desativado", action: "Mantenha off para precisão" },
            { param: "Detectar sólidos estreitos", value: "Ativado", action: "Reforça regiões finas internas" },
            { param: "Garantir espessura da casca", value: "Todos", action: "Casca uniforme em toda a peça" },
          ],
          goldenRule: "'Garantir espessura vertical da casca = Todos' resolve 90% dos casos de vazamento dimensional em geometrias complexas.",
        }),
      L(10, "tela-31-velocidade-primeira-camada", "Tela 08 — Velocidade: Primeira Camada e Outras Camadas", "15min",
        ["Aba Velocidade", "Primeira camada", "Outras camadas", "Velocidades por tipo de linha"], {
          screens: [{
            src: "tela_31",
            tela: "Tela 31",
            panel: "Painel Esquerdo › aba VELOCIDADE (topo)",
            tool: "Seções visíveis: Velocidade da primeira camada · Velocidade de outras camadas · início de Saliências",
            caption: "Velocidades por tipo de linha. Note: parede externa 200 mm/s é alto — reduza para 60 mm/s para qualidade premium.",
          }],
          theory: [
            "Primeira camada (50 mm/s) e preenchimento da primeira camada (100 mm/s) — lento garante adesão na PEI.",
            "Parede externa (200 mm/s) — VALOR PADRÃO ALTO. Para qualidade visual reduza para 40–60 mm/s.",
            "Parede interna (300 mm/s), Preenchimento esparso (300 mm/s), Sólido (250 mm/s), Superfície superior (200 mm/s).",
            "Suporte (150 mm/s) e Interface de suporte (80 mm/s) — interface lenta = superfície inferior melhor.",
          ],
          params: [
            { param: "Primeira camada", value: "20–30 mm/s", action: "Reduzir do padrão 50 p/ máxima adesão" },
            { param: "Parede externa", value: "40–60 mm/s", action: "REDUZIR do padrão 200 p/ visual" },
            { param: "Parede interna", value: "300 mm/s", action: "Pode manter rápido" },
            { param: "Infill esparso", value: "300 mm/s", action: "Rápido = economia de tempo" },
            { param: "Interface suporte", value: "80 mm/s", action: "Lento = peça com base lisa" },
          ],
          goldenRule: "Parede externa lenta (40–60 mm/s) para qualidade. Infill rápido (300 mm/s) para eficiência. Não confunda as duas.",
        }),
      L(11, "tela-32-velocidade-saliencias-aceleracao", "Tela 09 — Velocidade: Saliências e Deslocamento (Travel)", "15min",
        ["Aba Velocidade", "Reduzir vel. p/ perímetros encurvados", "Velocidade em saliências", "Velocidade de deslocamento"], {
          screens: [{
            src: "tela_32",
            tela: "Tela 32",
            panel: "Painel Esquerdo › aba VELOCIDADE (meio)",
            tool: "Seções visíveis: Reduzir vel. p/ perímetros encurvados · Velocidade em saliências · Velocidade de deslocamento",
            caption: "Controle de velocidade em áreas críticas (saliências, pontes) e tabela completa de velocidades de deslocamento (travel).",
          }],
          theory: [
            "Reduzir velocidade para perímetros encurvados (checkbox) — função automática que diminui a velocidade em saliências severas e pontes, evitando que o filamento seja arrastado pelo bico.",
            "Velocidade em saliências = 30 mm/s — aplicada a overhangs acima de 45°. Quanto maior o ângulo, menor a velocidade (75–90° pede 5–10 mm/s).",
            "Velocidade de deslocamento (Travel) — combina valores absolutos (30, 300, 500, 600 mm/s) e percentuais (100%, 150%) para movimentos aéreos do bico.",
            "Valores em mm/s² na mesma seção (2000, 4000, 5000, 10000) são acelerações de travel: altas porque não há extrusão envolvida.",
            "Regra de ouro: velocidade BAIXA onde a qualidade conta (saliências). Velocidade e aceleração ALTAS onde o bico está no ar (travel).",
          ],
          params: [
            { param: "Reduzir vel. p/ perímetros encurvados", value: "Ativado", action: "Protege saliências automaticamente" },
            { param: "Velocidade em saliências", value: "30 mm/s", action: "Ajuste por ângulo (5–60 mm/s)" },
            { param: "Travel principal", value: "300 mm/s", action: "Core XY: 300–500 · Cartesiano: 150–200" },
            { param: "Travel %", value: "150%", action: "1.5× a velocidade padrão" },
            { param: "Aceleração travel", value: "10000 mm/s²", action: "Apenas para movimentos aéreos" },
          ],
          goldenRule: "Ative 'Reduzir velocidade para perímetros encurvados' + 30 mm/s em saliências. No travel, suba até onde a máquina aguenta sem layer shift.",
        }),
      L(12, "tela-33-velocidade-jerk-extrusao", "Tela 10 — Velocidade: Jerk(XY), Decel e Suavização de Extrusão", "12min",
        ["Aba Velocidade (final)", "Jerk(XY)", "Accel_to_decel", "Suavização da extrusão"], {
          screens: [{
            src: "tela_33",
            tela: "Tela 33",
            panel: "Painel Esquerdo › aba VELOCIDADE (final)",
            tool: "Seções visíveis: continuação Aceleração · Jerk(XY) · Avançado",
            caption: "Parâmetros finais de velocidade: controle de Jerk por tipo de linha e suavização de extrusão (Klipper).",
          }],
          theory: [
            "Habilitar accel_to_decel (ativo) com valor 50% — limita a aceleração efetiva em movimentos curtos, reduzindo vibração.",
            "Jerk(XY) — quanto a impressora pode mudar velocidade instantaneamente. Padrão 9 mm/s para todos os tipos de linha (Padrão, Parede externa/interna, Preenchimento, Superfície, Primeira camada, Travel).",
            "Para máquinas com Input Shaper calibrado, Jerk pode ser mantido baixo (5–9 mm/s) sem perda de velocidade — o IS compensa.",
            "Suavização da extrusão (Avançado) = 0 mm³/s² — ative apenas em Klipper com PA calibrado.",
          ],
          params: [
            { param: "accel_to_decel", value: "50% (ativo)", action: "Limita aceleração em movimentos curtos" },
            { param: "Jerk padrão", value: "9 mm/s", action: "Conservador, evita ressonância" },
            { param: "Jerk parede externa", value: "5–9 mm/s", action: "Baixo = sem ghosting" },
            { param: "Jerk travel", value: "9 mm/s", action: "Mantém leve para evitar layer shift" },
          ],
          goldenRule: "Calibre Input Shaper antes de mexer em Jerk. Sem IS, manter Jerk em 7–9 mm/s é o ponto seguro para Klipper/Marlin.",
        }),
      L(13, "tela-41-suporte-ativar-tipo", "Tela 11 — Suporte: Ativar, Tipo (Árvore), Estilo e Jangada", "15min",
        ["Aba Suporte", "Ativar suporte", "Tipo: Árvore", "Jangada", "Filamento de suporte"], {
          screens: [{
            src: "tela_41",
            tela: "Tela 41",
            panel: "Painel Esquerdo › aba SUPORTE (topo)",
            tool: "Seções visíveis: Suporte · Jangada · Filamento de suporte · Alisamento de suporte",
            caption: "Configuração principal de suportes. Tipo 'Árvore (auto)' com Ângulo limiar 30° e 'Apenas na placa' ativado.",
          }],
          theory: [
            "Ativar suporte habilita a geração automática. Tipo = Árvore (auto) é o padrão moderno do Orca — gera ramos orgânicos com mínimo contato.",
            "Estilo = Padrão (Grade) na variante Árvore; Ângulo limiar = 30° gera suportes para overhangs acima desse ângulo.",
            "Densidade da primeira camada (90%) e Expansão da primeira camada (5 mm) garantem que o suporte adira firme à mesa.",
            "Apenas na placa de impressão (ativo) impede que suportes pousem em cima da peça — fundamental para não deixar marcas.",
            "Ignorar pequenas saliências (ativo) descarta overhangs minúsculos que não precisam de suporte real.",
          ],
          params: [
            { param: "Tipo", value: "Árvore (auto)", action: "Ramos orgânicos, mínimo contato" },
            { param: "Ângulo limiar", value: "30°", action: "Reduzir aumenta cobertura de suportes" },
            { param: "Densidade 1ª camada", value: "90%", action: "Adesão firme à mesa" },
            { param: "Expansão 1ª camada", value: "5 mm", action: "Base maior = mais estável" },
            { param: "Apenas na placa", value: "Ativado", action: "Suportes não tocam a peça em cima" },
          ],
          goldenRule: "Para peças orgânicas use Tree+Organic; para mecânicas use Normal+Snug. Sempre ative 'Apenas na placa' para evitar marcas no topo da peça.",
        }),
      L(14, "tela-42-suporte-avancado-interface", "Tela 12 — Suporte: Avançado, Z Gap, Interface e Padrão", "15min",
        ["Aba Suporte (rolagem)", "Avançado", "Distância Z", "Interface superior/inferior"], {
          screens: [{
            src: "tela_42",
            tela: "Tela 42",
            panel: "Painel Esquerdo › aba SUPORTE (seção Avançado)",
            tool: "Seções visíveis: Avançado · início de Suportes de árvore",
            caption: "Z Gap (0,2 mm), interfaces densas (espaçamento 0,5) e Distância XY entre suporte e objeto (0,35 mm).",
          }],
          theory: [
            "Distância Z superior = Distância Z inferior = 0,2 mm — espaço crítico entre suporte e peça. Menor (0,1) cola; maior (0,3) deixa áspero.",
            "Camadas de interface superior = 2, inferior = 'Mesmo número'. Padrão de interface = Padrão, Espaçamento = 0,5 mm (denso ≈ 100% para topo liso).",
            "Distância XY entre suporte e objeto = 0,35 mm — separação horizontal que define facilidade de remoção sem fundir.",
            "Vão na primeira camada entre suporte e objeto = 0,2 mm, Comprimento máximo de ponte = 10 mm.",
          ],
          params: [
            { param: "Distância Z superior", value: "0,15–0,20 mm", action: "Menor = cola; ideal 0,15" },
            { param: "Camadas de interface superior", value: "2–3", action: "Mais = superfície inferior mais lisa" },
            { param: "Espaçamento da interface", value: "0,5 mm (denso)", action: "≈100% densidade = topo liso" },
            { param: "Distância XY suporte/objeto", value: "0,35 mm", action: "Solta sem grudar" },
            { param: "Comprimento máx. de ponte", value: "10 mm", action: "Acima disso, força suporte" },
          ],
          goldenRule: "Acabamento perfeito sob a peça: Z Gap 0,15 mm + 3 camadas de interface + espaçamento 0,5 mm.",
        }),
      L(15, "tela-43-suporte-arvore", "Tela 13 — Suporte: Árvore (Tree) — ramos, ângulos e densidade", "12min",
        ["Aba Suporte (final)", "Suportes de árvore", "Diâmetro ponta", "Ângulo ramificação"], {
          screens: [{
            src: "tela_43",
            tela: "Tela 43",
            panel: "Painel Esquerdo › aba SUPORTE (seção Suportes de árvore)",
            tool: "Seções visíveis: final de Avançado · Suportes de árvore (parâmetros geométricos)",
            caption: "Geometria dos suportes em árvore: ponta 0,8 mm, ramos 2 mm, ramificação 30%, ângulo 40° e ângulo preferido 25°.",
          }],
          theory: [
            "Diâmetro da ponta = 0,8 mm — quanto menor, menos marca na peça; cuidado: <0,5 mm pode quebrar antes de tocar.",
            "Distância entre ramificações = 1 mm e Densidade da ramificação = 30% — define estabilidade vs. economia de filamento.",
            "Diâmetro do ramo de suporte = 2 mm — espessura do galho principal.",
            "Ângulo do diâmetro da ramificação = 5° (cone), Ângulo da ramificação = 40° (abertura máxima), Ângulo preferido = 25° (curvatura natural).",
          ],
          params: [
            { param: "Diâmetro da ponta", value: "0,4–0,8 mm", action: "Menor = menos marca; >0,5 mm = não quebra" },
            { param: "Densidade ramificação", value: "30–40%", action: "Mais = mais estável; menos = economia" },
            { param: "Diâmetro do ramo", value: "2 mm", action: "Espessura do galho principal" },
            { param: "Ângulo ramificação", value: "40°", action: "Abertura máxima da árvore" },
            { param: "Ângulo preferido", value: "25°", action: "Define curvatura orgânica" },
          ],
          goldenRule: "Tree Organic ideal: ponta 0,6 mm + ramo 2 mm + ângulo preferido 25°. Remove com puxão, deixa marca mínima.",
        }),
      L(16, "tela-51-multimaterial-torre-preparo", "Tela 14 — Multimaterial: Torre de Preparo (Wipe Tower)", "15min",
        ["Aba Multimaterial", "Torre de preparo", "Volume de purga", "Parede chanfrada"], {
          screens: [{
            src: "tela_51",
            tela: "Tela 51",
            panel: "Painel Esquerdo › aba MULTIMATERIAL (topo)",
            tool: "Seção visível: Torre de preparo (Wipe Tower) — todos os parâmetros geométricos e de purga",
            caption: "Torre de purga 30×30 mm, volume 30 mm³, vão 150%, fluxo extra 100% e parede chanfrada (Nervura, 8 mm).",
          }],
          theory: [
            "Ativar habilita a torre — obrigatória para trocas de cor/material (AMS, MMU, etc).",
            "Largura = 30 mm e Volume de preparo = 30 mm³ — dimensões da torre. Aumente para multimaterial de alta saturação.",
            "Vão entre preenchimentos = 150% e Espaçamento das linhas de purga = 120% — controlam quão 'porosa' é a torre (economiza filamento).",
            "Fluxo extra para purga = 100%, Velocidade máxima = 90 mm/s, Tipo de parede = Nervura, Largura da nervura = 8 mm.",
            "Parede chanfrada (ativo) inclina as paredes da torre — facilita remoção do plate.",
          ],
          params: [
            { param: "Largura da torre", value: "30 mm", action: "Aumentar p/ multimaterial saturado" },
            { param: "Volume de preparo", value: "30 mm³", action: "Quantidade mínima por troca" },
            { param: "Vão entre preenchimentos", value: "150%", action: "Torre mais leve = menos filamento" },
            { param: "Fluxo extra para purga", value: "100–150%", action: "Garante cor pura após troca" },
            { param: "Parede chanfrada", value: "Ativado", action: "Solta limpo da mesa" },
          ],
          goldenRule: "Em multimaterial, ative parede chanfrada + nervuras = torre estável que solta limpa sem cola extra.",
        }),
      L(17, "tela-52-multimaterial-filamento-purga", "Tela 15 — Multimaterial: Filamento por Recurso e Opções de Purga", "12min",
        ["Aba Multimaterial (rolagem)", "Filamento para Recursos", "Opções de purga", "Intertravamento de viga"], {
          screens: [{
            src: "tela_52",
            tela: "Tela 52",
            panel: "Painel Esquerdo › aba MULTIMATERIAL (rolagem inferior)",
            tool: "Seções visíveis: Filamento para Recursos · Prevenção de vazamento · Opções de purga · Avançado",
            caption: "Atribuição de filamento por tipo de linha (Paredes, Infill, Topo, Base, Torre) e estratégia de purga inteligente.",
          }],
          theory: [
            "Filamento para Recursos atribui qual extrusora/cor cuida de cada tipo: paredes externas/internas, preenchimento, topo, base e torre de limpeza. Tudo em 'Padrão' = ferramenta atual.",
            "Prevenção de vazamento (desativado) — só ative em filamentos muito molhos (Nylon/TPU) que vazam ao trocar.",
            "Purgar no preenchimento dos objetos (desativado) e Purgar nos suportes (ativo) = ECONOMIA: a purga vira o filamento dos suportes, eliminando torre desperdiçada.",
            "Avançado: Usar intertravamento de viga (off), Cascas de interface (off) — recursos beam interlock para multimaterial estrutural avançado.",
          ],
          params: [
            { param: "Filamento p/ recursos", value: "Padrão (todos)", action: "Por linha: paredes/infill/topo/base/torre" },
            { param: "Purgar nos suportes", value: "Ativado", action: "Reduz drasticamente desperdício da torre" },
            { param: "Purgar no infill", value: "Desativado", action: "Ativar economiza ainda mais (cuidado p/ peça visual)" },
            { param: "Prevenção de vazamento", value: "Desativado", action: "Só ative p/ Nylon/TPU" },
          ],
          goldenRule: "Ative 'Purgar nos suportes' antes de aumentar a torre: você economiza até 40% do filamento desperdiçado em trocas.",
        }),
      L(18, "tela-61-outros-saia-borda-vaso", "Tela 16 — Outros: Saia (Skirt), Borda (Brim) e Modo Vaso", "15min",
        ["Aba Outros", "Saia", "Borda", "Modo especial: Vaso espiral"], {
          screens: [{
            src: "tela_61",
            tela: "Tela 61",
            panel: "Painel Esquerdo › aba OUTROS (topo)",
            tool: "Seções visíveis: Saia (Skirt) · Borda (Brim) · Modo especial (Vaso espiral / Sequência)",
            caption: "Saia 0 voltas (desabilitada), Borda Auto 5 mm + 0,1 mm de gap, Modo de Fatiamento Padrão.",
          }],
          theory: [
            "SAIA — Voltas = 0 (sem skirt). Padrão recomendado: 1–3 voltas para purgar o bico e testar primeira camada antes da peça.",
            "Tipo de saia = Combinado, Distância = 2 mm, Ponto de partida = −135° (canto traseiro-esquerdo), Velocidade = 50 mm/s.",
            "BORDA — Tipo Auto (Orca decide), Largura 5 mm, Espaço entre borda e objeto 0,1 mm, Taxa de fluxo 1.0. Brim aumenta adesão e previne warping de ABS/PETG.",
            "MODO ESPECIAL — Modo de Fatiamento = Padrão. Mude para 'Vaso espiral' para impressão helicoidal contínua (sem topo, sem infill, parede única).",
            "Sequência de impressão = Por camada (todas peças sobem juntas) ou Por objeto (uma peça por vez).",
          ],
          params: [
            { param: "Voltas da saia", value: "1–3", action: "Purga o bico antes da peça" },
            { param: "Tipo de borda", value: "Auto", action: "Orca escolhe baseado no risco de warp" },
            { param: "Largura da borda", value: "5–10 mm", action: "Mais largo = mais adesão (ABS)" },
            { param: "Espaço borda/objeto", value: "0,1 mm", action: "Brim cola na peça (remove com canivete)" },
            { param: "Modo Vaso", value: "Ativar p/ vasos", action: "Trajetória helicoidal contínua, sem costura" },
          ],
          goldenRule: "PLA = sem brim. PETG/ABS = brim 5–10 mm. Para vasos decorativos = Modo Vaso + 1 parede + filamento Silk.",
        }),
      L(19, "tela-62-outros-textura-difusa-gcode", "Tela 17 — Outros: Textura Difusa (Fuzzy Skin) e Opções de G-code", "12min",
        ["Aba Outros (rolagem)", "Textura Difusa (Fuzzy Skin)", "Opções do G-code", "Etiquetar objetos"], {
          screens: [{
            src: "tela_62",
            tela: "Tela 62",
            panel: "Painel Esquerdo › aba OUTROS (final)",
            tool: "Seções visíveis: Textura Difusa (Fuzzy Skin) · Opções do G-code · Formato do nome do arquivo",
            caption: "Fuzzy Skin 'Somente pintada' modo Deslocamento, ponto 0,8 mm, espessura 0,3 mm. Opções avançadas de G-code.",
          }],
          theory: [
            "TEXTURA DIFUSA (Fuzzy Skin) = 'Somente pintada' — aplica a textura apenas onde você pintou na peça (controle cirúrgico).",
            "Modo gerador = Deslocamento, Tipo de ruído = Clássico, Distância do ponto = 0,8 mm (frequência), Espessura = 0,3 mm (amplitude).",
            "Aplicar à primeira camada (off) — manter desativado para não comprometer adesão.",
            "OPÇÕES DO G-CODE: Reduzir retração durante o preenchimento (ativo) economiza fadiga do extrusor; G-code detalhado (off); Etiquetar objetos (ativo) permite Orca cancelar objeto individual via UI.",
            "Excluir objetos (ativo) = recurso M486 que permite cancelar peça falhada sem parar a impressão inteira.",
            "Formato do nome do arquivo usa variáveis: {plate_name}_{filament_type}_{layer_height}_{print_time}.gcode — organização automática.",
          ],
          params: [
            { param: "Fuzzy Skin", value: "Somente pintada", action: "Aplica textura cirurgicamente" },
            { param: "Distância do ponto", value: "0,5–1,0 mm", action: "Menor = textura mais fina" },
            { param: "Espessura textura", value: "0,2–0,4 mm", action: "Amplitude do ruído" },
            { param: "Etiquetar objetos", value: "Ativado", action: "Habilita cancelar objeto individual (M486)" },
            { param: "Reduzir retração no infill", value: "Ativado", action: "Menos fadiga do extrusor" },
          ],
          goldenRule: "Fuzzy Skin 0,8 mm + 0,3 mm em punhos e empunhaduras = aderência tátil instantânea, esconde camadas e dá toque profissional.",
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
