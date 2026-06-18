// Detalhamento item-por-item de cada tela do painel esquerdo do OrcaSlicer 2.4.
// Cada entrada: { name, value, whatIs, types?, influences, generates }

export type OrcaParamDetail = {
  name: string;
  value: string;
  whatIs: string;
  types?: { label: string; desc: string }[];
  influences: string;
  generates: string;
};

export const orcaParamDetails: Record<string, OrcaParamDetail[]> = {
  // ====================================================================
  // TELA 11 — QUALIDADE (Altura da camada · Largura da linha · Costura)
  // ====================================================================
  "tela-11-qualidade-camada-largura-costura": [
    {
      name: "Altura da camada",
      value: "0,2 mm",
      whatIs:
        "Espessura vertical de cada fatia que o bico deposita. É o eixo Z da resolução: define em quantas camadas a peça é dividida e quanto cada movimento do eixo Z sobe.",
      types: [
        { label: "0,08–0,12 mm (alta resolução)", desc: "Detalhes finos, miniaturas, peças orgânicas. Tempo de impressão dobra ou triplica." },
        { label: "0,16–0,20 mm (padrão)", desc: "Equilíbrio qualidade/tempo. Recomendado para 90% das peças funcionais." },
        { label: "0,24–0,32 mm (rápido)", desc: "Protótipos, peças grandes pouco visuais. Reduz tempo ~40% mas mostra camadas." },
      ],
      influences:
        "Resolução visível das camadas, tempo de impressão, qualidade de overhangs (camadas finas seguram melhor saliências), adesão à camada anterior (camadas finas = mais soldas, camadas grossas = camadas mais robustas individualmente).",
      generates:
        "Camadas mais finas geram impressões mais suaves ao toque e visualmente lisas, mas multiplicam o tempo total. Camadas grossas geram peças impressas rapidamente, com aparência 'em degraus' visíveis e overhangs mais sujeitos a curling.",
    },
    {
      name: "Altura da primeira camada",
      value: "0,2 mm",
      whatIs:
        "Espessura específica da camada inicial — aquela que toca a mesa. Independente da altura padrão, geralmente é configurada um pouco maior para compensar imperfeições do nivelamento.",
      types: [
        { label: "Igual à camada normal", desc: "Use apenas se sua mesa estiver perfeitamente nivelada (auto-level Klipper, BLTouch calibrado)." },
        { label: "100–150% da camada normal", desc: "Padrão seguro: 0,24–0,30 mm quando se imprime a 0,20 mm. Mascara pequenos desníveis." },
        { label: "200% (camada bem grossa)", desc: "Use para mesas problemáticas ou superfícies texturizadas (PEI texturizado, vidro com lacas)." },
      ],
      influences:
        "Adesão da peça à mesa, tolerância a desnivelamentos e tendência ao 'pé de elefante' (camada esmagada que se alarga).",
      generates:
        "Primeira camada grossa gera adesão muito mais robusta, mas pode esmagar e criar pé de elefante. Camada fina dá precisão dimensional na base, mas qualquer mínimo desnivelamento já causa descolamento.",
    },
    {
      name: "Largura da linha › Padrão",
      value: "0,42 mm",
      whatIs:
        "Largura base de extrusão. Define quanto plástico cada linha deposita lateralmente. Toda outra largura (parede, infill, etc) é derivada ou comparada a este valor.",
      types: [
        { label: "100% do diâmetro do bico (0,40 mm para bico 0,4)", desc: "Mínimo absoluto. Quase ninguém usa — gera adesão fraca entre linhas." },
        { label: "105–115% (0,42–0,46 mm)", desc: "Padrão recomendado. Linhas se sobrepõem ligeiramente, gerando solda lateral confiável." },
        { label: "120–140% (0,48–0,56 mm)", desc: "Usado em peças massivas para acelerar. Perde detalhe fino." },
      ],
      influences:
        "Quantidade de filamento por mm impresso, tempo de impressão (linhas mais largas = menos passadas), resistência mecânica das paredes e qualidade visual.",
      generates:
        "Linhas largas geram impressões rápidas e robustas com aparência mais 'grossa'; linhas estreitas geram mais detalhe mas exigem mais passadas e tempo.",
    },
    {
      name: "Largura da linha › Primeira camada",
      value: "0,5 mm",
      whatIs:
        "Largura específica da extrusão na primeira camada. Quase sempre maior que a Padrão, para esmagar mais filamento contra a mesa e melhorar a aderência.",
      types: [
        { label: "Igual à Padrão", desc: "Usado apenas com mesas PEI lisas perfeitamente niveladas." },
        { label: "120–140% (0,50–0,56 mm)", desc: "Padrão. Garante adesão extra. É o valor da sua tela." },
        { label: "200% (0,80 mm)", desc: "Truque para superfícies muito texturizadas ou primeira camada como brim integrado." },
      ],
      influences:
        "Aderência à mesa, ocorrência de warping nos cantos, tolerância a microfalhas no nivelamento.",
      generates:
        "Linhas maiores na primeira camada geram aderência praticamente impossível de descolar e impressões que sobrevivem a vibrações; linhas estreitas geram peças mais precisas dimensionalmente na base, mas mais sujeitas a descolar.",
    },
    {
      name: "Largura da linha › Parede externa",
      value: "0,42 mm",
      whatIs:
        "Largura específica das paredes externas (perímetros visíveis). É a única camada que o olho enxerga diretamente, então sua largura define a qualidade visual da peça.",
      types: [
        { label: "0,36–0,40 mm (fina)", desc: "Para letras, detalhes geométricos, peças decorativas. Aparência mais 'desenhada'." },
        { label: "0,42–0,45 mm (padrão)", desc: "Padrão recomendado. Boa fusão entre passadas, acabamento limpo." },
        { label: "0,50–0,60 mm (grossa)", desc: "Peças estruturais onde a parede precisa resistir a impacto. Sacrifica acabamento fino." },
      ],
      influences:
        "Qualidade visual da peça acabada, resistência mecânica das paredes externas, capacidade de imprimir textos e bordas finas, definição de detalhes geométricos.",
      generates:
        "Paredes externas finas geram cantos vivos, letras legíveis e curvas suaves; paredes grossas geram peças que aguentam pancada mas perdem detalhe.",
    },
    {
      name: "Largura da linha › Parede interna",
      value: "0,45 mm",
      whatIs:
        "Largura das paredes internas (todos os perímetros que NÃO são o externo). Ninguém vê — sua única função é resistência estrutural e suporte ao topo/base.",
      influences:
        "Resistência interna da peça, tempo de impressão (paredes mais grossas = menos passadas internas), volume de filamento usado.",
      generates:
        "Paredes internas mais grossas que a externa (truque clássico do Orca) geram peças com aparência fina externamente mas estrutura interna robusta — o melhor de dois mundos.",
    },
    {
      name: "Largura da linha › Superfície superior",
      value: "0,42 mm",
      whatIs:
        "Largura das linhas que formam a 'tampa' visível da peça (camadas sólidas do topo).",
      influences:
        "Aparência do topo (pillowing, gaps entre linhas, brilho da superfície). Em peças com Ironing depois, define a qualidade do alisamento.",
      generates:
        "Linhas finas no topo geram superfícies superiores limpas, sem buracos entre passadas, prontas para Ironing perfeito.",
    },
    {
      name: "Largura da linha › Preenchimento esparso",
      value: "0,45 mm",
      whatIs:
        "Largura das linhas do infill (estrutura interna oca). Como o infill não é visível e só precisa ser estrutural, pode ser mais grosso para acelerar.",
      types: [
        { label: "Igual à Padrão", desc: "Maximiza precisão estrutural." },
        { label: "110–120% (mais grosso)", desc: "Padrão de aceleração. Reduz tempo do infill em ~15%." },
        { label: "150%+ (muito grosso)", desc: "Aceleração extrema, mas pode causar over-extrusion visível no topo." },
      ],
      influences:
        "Tempo total de impressão (infill costuma ser 40–60% do tempo), volume de filamento, resistência estrutural.",
      generates:
        "Infill mais grosso gera impressões muito mais rápidas com resistência similar; muito grosso gera 'pillowing' (bolinhas) na primeira camada sólida que cobre o infill.",
    },
    {
      name: "Largura da linha › Preenchimento sólido",
      value: "0,42 mm",
      whatIs:
        "Largura das camadas 100% sólidas (topo, base, paredes finas que viraram sólido).",
      influences:
        "Qualidade visual das camadas que formam o topo/base, ocorrência de gaps ou over-extrusion.",
      generates:
        "Mesmo valor da parede externa garante consistência visual entre paredes laterais e topo/base.",
    },
    {
      name: "Largura da linha › Suporte",
      value: "0,42 mm",
      whatIs:
        "Largura das estruturas temporárias de suporte. Como serão removidas, busca-se um compromisso: forte o bastante para sustentar, fino o bastante para soltar.",
      types: [
        { label: "Igual à Padrão", desc: "Suporte sólido. Difícil de remover." },
        { label: "0,36–0,40 mm (fino)", desc: "Recomendado. Suporte 'esfarela' na remoção." },
      ],
      influences:
        "Facilidade de remoção dos suportes, quantidade de marca/cicatriz que fica na peça.",
      generates:
        "Suportes finos geram remoção limpa e fácil; suportes grossos geram estruturas que resistem mas exigem alicate e podem descascar a peça.",
    },
    {
      name: "Largura da linha › Ponte",
      value: "100%",
      whatIs:
        "Multiplicador (em %) aplicado à largura quando o Orca detecta uma ponte (linha que cruza vazio sem suporte). Manter em 100% mantém a largura padrão; reduzir afina a linha para ela esticar melhor sobre o vão.",
      types: [
        { label: "100% (padrão)", desc: "Mantém largura igual ao resto." },
        { label: "85–95% (mais fino)", desc: "Linha mais esticada, atravessa vãos maiores sem cair." },
      ],
      influences:
        "Capacidade de cruzar vãos sem cair, qualidade do acabamento das pontes.",
      generates:
        "Ponte mais fina gera pontes longas sem queda; ponte 100% gera estrutura sólida mas pontes longas tendem a ceder.",
    },
    {
      name: "Costura › Posição da costura",
      value: "Alinhada",
      whatIs:
        "A 'costura' (seam) é a cicatriz vertical que aparece em cada camada onde a parede começa e termina. Como o bico precisa parar/começar em algum ponto, sempre há uma marca. Este parâmetro decide ONDE esse ponto fica.",
      types: [
        { label: "Aleatória (Random)", desc: "Espalha o ponto de início aleatoriamente a cada camada. Resultado: nenhuma linha vertical visível, mas a peça inteira fica ligeiramente 'pontilhada'. Ideal para peças cilíndricas e estéticas." },
        { label: "Alinhada (Aligned)", desc: "Sempre no mesmo ponto, empilhando todas as cicatrizes em uma linha vertical única. Use quando você escolheu um canto oculto. É o valor da sua tela." },
        { label: "Traseira (Rear)", desc: "Força a costura na traseira da placa (Y máximo). Ideal para figurinhas que serão expostas só de frente." },
        { label: "Mais próxima (Nearest)", desc: "Otimiza tempo: a costura vai para o ponto mais próximo da última posição do bico. Pior visualmente, mas reduz tempo de viagem." },
      ],
      influences:
        "Local da cicatriz visível na peça, tempo de viagem entre camadas, aparência estética geral (pontilhada vs linha vertical).",
      generates:
        "Aligned gera uma linha vertical limpa que pode ser escondida em um canto/face de montagem; Random gera peças sem linha vertical mas com micro-pontos em toda a superfície; Nearest gera impressão mais rápida com cicatriz onde der.",
    },
    {
      name: "Costuras internas escalonadas",
      value: "Desativado (na sua tela)",
      whatIs:
        "Quando há múltiplas paredes (parede externa + paredes internas), cada uma tem sua própria costura. Este recurso DESLOCA a costura das paredes internas em ângulos diferentes a cada camada, em vez de empilhar todas alinhadas.",
      types: [
        { label: "Desativado", desc: "Todas as paredes (externa + internas) começam no mesmo ângulo. A linha vertical da costura externa coincide com as internas, criando um ponto fraco estrutural." },
        { label: "Ativado", desc: "As paredes internas têm suas costuras distribuídas em ângulos alternados a cada camada, escalonadamente. A costura externa pode continuar alinhada (escondida em canto), mas as internas formam um padrão helicoidal." },
      ],
      influences:
        "Resistência estrutural na linha da costura (regiões alinhadas formam ponto fraco mecânico), uniformidade do fluxo de plástico, distribuição de tensões.",
      generates:
        "Ativar gera peças mecanicamente mais resistentes — a cicatriz interna deixa de ser uma 'falha contínua' vertical e vira um padrão helicoidal que distribui carga. Desativado gera peça visualmente igual mas com possível ruptura na linha da costura sob esforço.",
    },
    {
      name: "Vão entre costuras",
      value: "10%",
      whatIs:
        "Define a sobreposição (ou espaço) entre o ponto onde a parede TERMINA e onde ela RECOMEÇA na mesma camada. Valor positivo cria sobreposição (linhas se cruzam); valor negativo cria gap (linhas não se encontram).",
      types: [
        { label: "0% (sem vão)", desc: "Linhas encostam exatamente. Risco de bolha de plástico (over-extrusion local) na junção." },
        { label: "5–15% (positivo, padrão)", desc: "Pequena sobreposição garante solda sem bolha. O valor 10% da sua tela é o equilíbrio mais comum." },
        { label: "Negativo (−5 a −20%)", desc: "Cria gap proposital. Reduz a bolha mas pode deixar buraco visível na costura. Útil em filamentos muito fluidos." },
      ],
      influences:
        "Aparência do ponto exato da costura (bolha vs buraco), resistência mecânica da junção camada-camada, vazamento de filamento durante a retração.",
      generates:
        "10% positivo gera junções soldadas sem bolha visível — comportamento ideal para PLA/PETG. Valor mais alto gera 'caroço' brilhante na costura; valor negativo gera buraco visível mas plano.",
    },
    {
      name: "Costura junta cachecol (Scarf Seam, beta)",
      value: "Nenhum",
      whatIs:
        "Recurso experimental que substitui a costura tradicional (corte vertical) por uma transição em RAMPA — o bico desce/sobe gradualmente no início e fim da parede, como um lenço (cachecol) que se sobrepõe.",
      types: [
        { label: "Nenhum", desc: "Costura tradicional, corte abrupto. Valor da sua tela." },
        { label: "Contornos (Contour)", desc: "Aplica scarf apenas nos contornos fechados (paredes circulares). Ideal para vasos e cilindros." },
        { label: "Tudo (All)", desc: "Aplica em todas as paredes. Máxima invisibilidade da costura, mas exige firmware com retração rápida e PA bem calibrado." },
      ],
      influences:
        "Visibilidade da costura (com Scarf, praticamente desaparece em peças cilíndricas), tempo de impressão (Scarf adiciona movimento extra), exigência de calibração (PA mal calibrado destrói o efeito).",
      generates:
        "Scarf gera junções INVISÍVEIS em vasos, lentes, cones — a parede aparenta ser uma única espiral contínua. Sem Scarf, mesmo o melhor 'Aligned' deixa linha visível.",
    },
    {
      name: "Velocidade de limpeza baseada na função",
      value: "Ativado",
      whatIs:
        "Quando há trocas de filamento (multimaterial) ou retrações longas, o Orca executa um 'wipe' (varredura do bico na peça) para limpar o nozzle. Este toggle ativa a regulação automática da velocidade dessa varredura conforme o tipo de função.",
      influences:
        "Velocidade de cada movimento de limpeza, ocorrência de stringing, marcas de wipe na peça.",
      generates:
        "Ativado gera limpeza adaptativa: rápida em paredes internas, lenta em externas; resultado: menos marca de wipe visível.",
    },
    {
      name: "Velocidade de limpeza",
      value: "80% (mm/s ou %)",
      whatIs:
        "Velocidade base da varredura de limpeza do bico (em mm/s ou em % da velocidade da parede). Quando o toggle anterior está ativo, este valor é o ponto de partida modulado.",
      influences:
        "Quanto plástico residual fica grudado no bico após retração/troca, qualidade visual das marcas de wipe.",
      generates:
        "Limpeza mais lenta gera bico mais limpo (sem stringing) mas marca de wipe visível; mais rápida gera marca quase invisível mas pode deixar resíduo.",
    },
    {
      name: "Limpeza em voltas",
      value: "Desativado",
      whatIs:
        "Faz o Orca executar o wipe em movimento circular (em vez de linha reta). Útil para nozzles entupidos ou filamentos que escorrem.",
      types: [
        { label: "Desativado", desc: "Wipe em linha reta sobre a última parede. Padrão." },
        { label: "Ativado", desc: "Wipe circular ao redor da posição final. Limpa o bico em 360°, ideal para Nylon/PETG que tendem a escorrer." },
      ],
      influences:
        "Eficácia da limpeza com filamentos viscosos, tempo gasto em cada retração.",
      generates:
        "Ativado gera bico extremamente limpo em filamentos problemáticos (Nylon, TPU); desativado é mais rápido e suficiente para PLA/PETG bem calibrados.",
    },
  ],
};
