'use strict';
/* JP Recomposição · Busca Ativa Multidisciplinar · 3ª série do Ensino Médio · 1º bimestre
 * Enunciados e organização fundamentados no documento pedagógico fornecido
 * pela escola. 30 questões preservadas; miniaulas são apoio suplementar.
 * Dados salvos exclusivamente no navegador; relatório CSV sem código.
 */
const $=id=>document.getElementById(id);
const blocks=[
 {
  "id": "lp",
  "name": "Língua Portuguesa",
  "icon": "📰",
  "from": 1,
  "to": 3,
  "lesson": "Textos dissertativo-argumentativos apresentam uma tese, isto é, a ideia central defendida pelo autor. Os argumentos justificam essa tese por meio de dados, exemplos, relações de causa e consequência ou referências verificáveis. Em textos jornalísticos, é preciso distinguir informações, interpretações e possíveis pontos de vista.",
  "example": "Tese: 'É necessário combater o desperdício de água'. Argumento: 'O consumo excessivo pressiona os sistemas de abastecimento'. Para julgar a consistência do argumento, investigue se há dados confiáveis e uma relação lógica com a tese.",
  "tip": "Tese = posição central; argumento = fundamento que sustenta a posição. Na investigação, registre fonte, título, data, ideia central e diferentes perspectivas.",
  "check": "Qual é o papel da tese num texto argumentativo?",
  "options": [
   "Expressar a ideia central que será defendida.",
   "Apresentar apenas a data de publicação.",
   "Repetir informações sem relação com o tema."
  ],
  "correct": 0,
  "why": "Uma tese é a posição central sustentada por argumentos ao longo do texto."
 },
 {
  "id": "mat",
  "name": "Matemática",
  "icon": "🧮",
  "from": 4,
  "to": 7,
  "lesson": "Uma equação quadrática tem a forma ax² + bx + c = 0, com a diferente de zero. Suas raízes são os valores de x que tornam a expressão nula. Funções quadráticas podem ser estudadas pelas raízes e pelo comportamento do gráfico. Porcentagem representa uma razão em relação a 100; pesquisas de dados exigem fonte, unidade, período e comparação cuidadosa.",
  "example": "x² − 7x + 12 = 0 pode ser escrita como (x − 3)(x − 4) = 0: portanto, x = 3 ou x = 4. Em f(x) = x² − 6x + 5, temos (x − 1)(x − 5), logo raízes 1 e 5. Rendimento de 5% sobre R$ 2.000: 2.000 × 0,05 = R$ 100.",
  "tip": "Ao pesquisar população, use a mesma data de referência e fonte para os três municípios; em seguida, calcule população maior menos população menor.",
  "check": "Quais números tornam (x − 3)(x − 4) igual a zero?",
  "options": [
   "3 e 4.",
   "−3 e −4.",
   "1 e 12."
  ],
  "correct": 0,
  "why": "Um produto vale zero quando ao menos um de seus fatores é zero."
 },
 {
  "id": "fis",
  "name": "Física",
  "icon": "⚡",
  "from": 8,
  "to": 10,
  "lesson": "A potência elétrica indica a taxa de transformação ou consumo de energia. Para aparelhos elétricos, uma relação comum é P = U × i, em que U é a tensão e i a corrente. A energia consumida depende tanto da potência quanto do tempo de funcionamento: E = P × t, com unidades compatíveis.",
  "example": "Um aparelho de 1.000 W corresponde a 1 kW. Se permanecer ligado por 2 horas, consumirá 1 kW × 2 h = 2 kWh. Já um de 100 W ligado por 10 horas consumirá 1 kWh. A comparação exige considerar o tempo.",
  "tip": "Anote a potência indicada na etiqueta do aparelho e estime as horas diárias de uso. Para obter kWh, converta W para kW dividindo por 1.000.",
  "check": "Dois aparelhos de mesma potência ficam ligados por tempos diferentes. Qual consome mais energia?",
  "options": [
   "O que permanece ligado por mais tempo.",
   "O que tem a cor mais escura.",
   "Ambos sempre consomem o mesmo."
  ],
  "correct": 0,
  "why": "Com potência igual, a energia E = P × t cresce proporcionalmente ao tempo."
 },
 {
  "id": "qui",
  "name": "Química",
  "icon": "🧪",
  "from": 11,
  "to": 13,
  "lesson": "Reações de oxidação-redução envolvem transferência de elétrons ou mudanças nos números de oxidação. Oxidação é perda de elétrons; redução é ganho de elétrons. Há transformações químicas cotidianas, como corrosão, combustão e fermentação, que podem ser investigadas por reagentes e produtos.",
  "example": "Em uma reação de corrosão, o ferro pode sofrer oxidação e formar compostos associados à ferrugem. Nas pilhas, reações redox estão relacionadas à transformação de energia química em energia elétrica.",
  "tip": "Diferencie oxidação e redução; ao pesquisar uma reação, descreva materiais iniciais, transformação observada e aplicação, usando fontes seguras.",
  "check": "Em termos de elétrons, o que significa oxidação?",
  "options": [
   "Perda de elétrons.",
   "Ganho de elétrons.",
   "Apenas mudança de estado físico."
  ],
  "correct": 0,
  "why": "Oxidar significa perder elétrons; reduzir significa ganhar elétrons."
 },
 {
  "id": "bio",
  "name": "Biologia",
  "icon": "🧬",
  "from": 14,
  "to": 16,
  "lesson": "Populações apresentam variabilidade genética, criada por mutações e recombinação. A seleção natural pode favorecer características hereditárias que aumentam o sucesso reprodutivo em determinado ambiente. Esse processo ocorre ao longo de gerações, não porque um indivíduo decide se adaptar.",
  "example": "Uma característica que melhora a obtenção de alimento em certo ambiente pode, em determinadas condições, estar associada a maior sucesso reprodutivo. Na pesquisa, verifique se a característica é de fato uma adaptação e como se relaciona ao ambiente da espécie.",
  "tip": "Mutações geram novas variantes genéticas; seleção natural atua sobre a variação herdável. Ao pesquisar espécie de Mato Grosso, cite a fonte e descreva ambiente, característica e função.",
  "check": "Por que a seleção natural depende de variabilidade hereditária?",
  "options": [
   "Porque diferentes características podem influenciar a reprodução ao longo das gerações.",
   "Porque todos os indivíduos precisam ser geneticamente idênticos.",
   "Porque o ambiente nunca muda."
  ],
  "correct": 0,
  "why": "Sem diferenças herdáveis, a seleção não pode alterar a frequência de variantes na população."
 },
 {
  "id": "hist",
  "name": "História",
  "icon": "🏭",
  "from": 17,
  "to": 19,
  "lesson": "Industrialização e transformações políticas dos séculos XIX e XX modificaram as relações de trabalho, intensificaram processos de urbanização e contribuíram para novos movimentos e organizações sociais. A análise histórica precisa considerar contextos, grupos envolvidos e interpretações diversas.",
  "example": "O crescimento das fábricas atraiu trabalhadores para centros urbanos e trouxe mudanças no emprego, na moradia e nas lutas por direitos. Em investigações sobre o século XX brasileiro, compare acontecimentos e versões históricas fundamentadas.",
  "tip": "Identifique contexto, causas, principais eventos, efeitos e diferentes interpretações do acontecimento pesquisado.",
  "check": "A industrialização esteve relacionada principalmente a:",
  "options": [
   "Transformações no trabalho, nas cidades e na organização social.",
   "Desaparecimento de todas as cidades.",
   "Fim de tecnologias de produção."
  ],
  "correct": 0,
  "why": "A indústria impactou atividades econômicas, relações de trabalho e expansão urbana."
 },
 {
  "id": "geo",
  "name": "Geografia",
  "icon": "🌍",
  "from": 20,
  "to": 22,
  "lesson": "A globalização econômica intensifica fluxos de mercadorias, capitais, serviços, tecnologias e informações entre países e regiões. Seus efeitos podem envolver novos mercados e acesso a bens, mas também desigualdades e impactos socioambientais. Cadeias produtivas conectam matéria-prima, transformação, transporte e consumo.",
  "example": "Um produto vendido em Paranaíta pode utilizar matérias-primas de outros lugares, ser fabricado em outro estado e percorrer rodovias antes de chegar ao comércio. Essa rede envolve trabalho, infraestrutura e efeitos ambientais.",
  "tip": "Ao avaliar consequências, apresente um efeito positivo e outro negativo com argumentos. Na pesquisa, organize a origem da matéria-prima, produção, transporte, comércio e impactos.",
  "check": "O que caracteriza uma cadeia produtiva em redes globalizadas?",
  "options": [
   "Etapas de produção e distribuição conectadas entre diferentes lugares.",
   "Isolamento obrigatório de todos os países.",
   "Ausência completa de transportes e comércio."
  ],
  "correct": 0,
  "why": "As cadeias produtivas articulam etapas e territórios diferentes."
 },
 {
  "id": "fil",
  "name": "Filosofia",
  "icon": "💭",
  "from": 23,
  "to": 25,
  "lesson": "Pensamento crítico é analisar afirmações, questionar pressupostos e avaliar razões e evidências. Na ética, decisões envolvem liberdade, responsabilidade e possíveis consequências para outras pessoas. Dilemas de privacidade, redes sociais e inteligência artificial podem ter diferentes argumentos justificáveis.",
  "example": "Ao decidir compartilhar uma notícia não verificada, alguém pode considerar liberdade de expressão e responsabilidade com informações falsas. Uma análise crítica observa evidências, danos possíveis e respeito aos direitos de terceiros.",
  "tip": "Em um dilema, apresente pelo menos duas posições e defenda uma delas com razões. Evite considerar opinião pessoal como prova suficiente.",
  "check": "Uma postura de pensamento crítico é:",
  "options": [
   "Avaliar argumentos e buscar justificativas.",
   "Aceitar qualquer informação sem examinar.",
   "Tomar toda decisão apenas por impulso."
  ],
  "correct": 0,
  "why": "O pensamento crítico exige exame das razões e das informações apresentadas."
 },
 {
  "id": "soc",
  "name": "Sociologia",
  "icon": "🤝",
  "from": 26,
  "to": 27,
  "lesson": "Desigualdade social, acesso à educação e oportunidades no mercado de trabalho podem se relacionar de formas complexas. Indicadores sociais são medidas que ajudam a compreender realidades, mas devem ser interpretados considerando o ano, a fonte, a população e as diferenças entre grupos.",
  "example": "Taxas de escolarização e desemprego podem ajudar a analisar oportunidades, desde que sejam comparadas com períodos e critérios compatíveis. Um indicador isolado não explica todas as causas de uma desigualdade.",
  "tip": "Na investigação, escolha um indicador, apresente dois dados comparáveis, identifique o período e a fonte e interprete o que revelam sem confundir correlação com causa.",
  "check": "Qual cuidado é importante ao comparar dois indicadores sociais?",
  "options": [
   "Verificar fonte, período e população analisada.",
   "Ignorar os critérios de coleta.",
   "Usar apenas impressões sem dados."
  ],
  "correct": 0,
  "why": "A interpretação depende de dados comparáveis e bem contextualizados."
 },
 {
  "id": "eng",
  "name": "Língua Inglesa e Síntese Multidisciplinar",
  "icon": "🇬🇧",
  "from": 28,
  "to": 30,
  "lesson": "No inglês, a estrutura 'If + simple present, ... will + verbo' pode expressar uma condição real e sua possível consequência futura. Na produção de um texto sobre planos, organize frases curtas e conectadas. O desafio final articula evidências e pelo menos quatro áreas do conhecimento em uma proposta de intervenção.",
  "example": "'If people reduce waste, they will help the environment' expressa condição e consequência. Para falar de futuro: 'I want to study science. I will prepare for university.' No projeto final, defina problema, causas, impactos, dados, recursos e a contribuição de quatro áreas.",
  "tip": "Escreva de cinco a seis frases em inglês sobre seus planos. Na intervenção final, proponha ações concretas, recursos necessários e contribuições de quatro ou mais áreas.",
  "check": "Na frase 'If people reduce waste, they will help the environment', há:",
  "options": [
   "Uma condição e sua consequência.",
   "Uma ação concluída no passado.",
   "Uma ordem sem condição."
  ],
  "correct": 0,
  "why": "A oração com 'if' apresenta condição; a outra indica consequência provável."
 }
];
/* Tipo: mc = múltipla escolha; disc = discursiva; inv = investigativa.
   Questões e alternativas acompanham o documento original. */
const tasks=[
 {
  "n": 1,
  "b": 0,
  "type": "mc",
  "text": "Em um texto argumentativo, a tese corresponde:",
  "options": [
   "à ideia central que será defendida pelo autor.",
   "apenas ao título do texto.",
   "a uma informação sem relação com o tema.",
   "somente à conclusão."
  ],
  "correct": 0,
  "hint": "Relembre o que o autor pretende defender ao longo do texto.",
  "why": "A tese é a posição central defendida pelo autor, sustentada por argumentos."
 },
 {
  "n": 2,
  "b": 0,
  "type": "disc",
  "text": "Explique a função dos argumentos em um texto dissertativo-argumentativo e indique duas características de um argumento consistente.",
  "hint": "Explique como os argumentos sustentam a tese. Considere coerência lógica, informações verificáveis, evidências, pertinência ao tema.",
  "criteria": "Sua resposta descreve a função de sustentar a tese e identifica duas características justificadas de um argumento consistente."
 },
 {
  "n": 3,
  "b": 0,
  "type": "inv",
  "text": "Escolha uma matéria jornalística sobre um problema social brasileiro. Identifique tese ou ideia central, argumentos utilizados, fonte das informações e possíveis pontos de vista presentes no texto.",
  "hint": "Selecione uma matéria identificável. Registre título, veículo, data e fonte. Diferencie o fato central de argumentos e interpretações presentes.",
  "criteria": "Identifique a matéria, ideia central, argumentos, fontes de informações e possíveis pontos de vista, com análise própria."
 },
 {
  "n": 4,
  "b": 1,
  "type": "mc",
  "text": "As soluções da equação x² – 7x + 12 = 0 são:",
  "options": [
   "2 e 6",
   "3 e 4",
   "-3 e -4",
   "1 e 12"
  ],
  "correct": 1,
  "hint": "Procure dois números que somados dão 7 e multiplicados dão 12.",
  "why": "x² − 7x + 12 = (x − 3)(x − 4), logo as raízes são x = 3 e x = 4."
 },
 {
  "n": 5,
  "b": 1,
  "type": "disc",
  "text": "Uma função quadrática é dada por f(x)=x²−6x+5. Determine suas raízes e mostre os cálculos.",
  "hint": "Encontre x para o qual f(x) = 0. Você pode fatorar ou usar a fórmula resolutiva.",
  "criteria": "Mostre x² − 6x + 5 = (x − 1)(x − 5) e as raízes x = 1 e x = 5, ou cálculo equivalente correto."
 },
 {
  "n": 6,
  "b": 1,
  "type": "inv",
  "text": "Pesquise dados sobre a população de três municípios de Mato Grosso. Calcule a diferença entre o município mais populoso e o menos populoso e organize os dados em uma tabela.",
  "hint": "Escolha três municípios e use dados comparáveis do mesmo ano, preferencialmente IBGE. Apresente tabela com município, população e ano. Subtraia menor população da maior.",
  "criteria": "Inclua três municípios, populações com ano e fonte, tabela e diferença correta entre maior e menor."
 },
 {
  "n": 7,
  "b": 1,
  "type": "mc",
  "text": "Uma aplicação de R$ 2.000,00 apresentou rendimento de 5% no período. O rendimento foi de:",
  "options": [
   "R$ 50,00",
   "R$ 100,00",
   "R$ 150,00",
   "R$ 200,00"
  ],
  "correct": 1,
  "hint": "Transforme 5% em 0,05 e multiplique por 2.000.",
  "why": "5% de R$ 2.000,00 corresponde a 2.000 × 0,05 = R$ 100,00."
 },
 {
  "n": 8,
  "b": 2,
  "type": "mc",
  "text": "A potência elétrica de um aparelho pode ser calculada pela relação:",
  "options": [
   "P = U·i",
   "P = m·g",
   "P = d/t",
   "P = F/d"
  ],
  "correct": 0,
  "hint": "Lembre-se da relação entre tensão elétrica, corrente elétrica e potência.",
  "why": "Potência elétrica é P = U × i, em que U é a tensão e i é a corrente elétrica."
 },
 {
  "n": 9,
  "b": 2,
  "type": "disc",
  "text": "Explique a relação entre potência elétrica, energia consumida e tempo de funcionamento de um aparelho.",
  "hint": "Use E = P × t e explique por que a mesma potência ligada por mais horas consome mais energia.",
  "criteria": "Relacione potência, energia e tempo; explique E = P × t e o uso de unidades compatíveis."
 },
 {
  "n": 10,
  "b": 2,
  "type": "inv",
  "text": "Escolha três aparelhos elétricos de sua casa. Registre a potência indicada em cada um e estime quais consomem mais energia considerando o tempo de uso diário. Explique sua conclusão.",
  "hint": "Registre potência em W e tempo em horas. Converta W para kW e calcule kWh/dia; destaque que maior potência nem sempre indica maior consumo diário.",
  "criteria": "Apresente três aparelhos, potência, tempo diário estimado, comparação de consumo e justificativa."
 },
 {
  "n": 11,
  "b": 3,
  "type": "mc",
  "text": "Uma característica de uma reação de oxidação-redução é a ocorrência de:",
  "options": [
   "transferência de elétrons.",
   "ausência total de transformação.",
   "apenas mudança de estado físico.",
   "somente dissolução."
  ],
  "correct": 0,
  "hint": "Oxidar e reduzir envolvem perda e ganho de elétrons.",
  "why": "Reações de oxirredução envolvem transferência de elétrons ou mudanças nos números de oxidação."
 },
 {
  "n": 12,
  "b": 3,
  "type": "disc",
  "text": "Explique, de forma geral, o que significa oxidar e reduzir uma espécie química em uma reação de oxirredução.",
  "hint": "Oxidação: perda de elétrons; redução: ganho. As duas transformações ocorrem em conjunto na reação.",
  "criteria": "Explique corretamente a perda de elétrons na oxidação e ganho na redução."
 },
 {
  "n": 13,
  "b": 3,
  "type": "inv",
  "text": "Pesquise um exemplo de reação química presente no cotidiano (combustão, corrosão, pilha, fermentação etc.). Identifique os materiais envolvidos, a transformação observada e uma aplicação prática.",
  "hint": "Selecione uma reação; registre reagentes, produtos ou transformações observáveis, e uma aplicação. Não realize experimentos perigosos.",
  "criteria": "Inclua reação cotidiana, materiais, transformação e aplicação prática com referência identificada."
 },
 {
  "n": 14,
  "b": 4,
  "type": "mc",
  "text": "A seleção natural está relacionada à ideia de que:",
  "options": [
   "indivíduos com características vantajosas podem ter maior sucesso reprodutivo em determinado ambiente.",
   "todos os indivíduos de uma população são geneticamente idênticos.",
   "os seres vivos não sofrem mudanças ao longo das gerações.",
   "apenas os organismos mais fortes sobrevivem em qualquer ambiente."
  ],
  "correct": 0,
  "hint": "Considere adaptações que dependem do ambiente e influenciam o sucesso reprodutivo.",
  "why": "Em um ambiente específico, características hereditárias vantajosas podem favorecer a sobrevivência e a reprodução."
 },
 {
  "n": 15,
  "b": 4,
  "type": "disc",
  "text": "Explique como mutações e variabilidade genética podem contribuir para a evolução das populações.",
  "hint": "Mutações produzem novas variantes e, com recombinação, ajudam a criar diversidade sobre a qual a seleção pode atuar.",
  "criteria": "Relacione variação genética hereditária, mutações e mudanças na frequência de características ao longo de gerações."
 },
 {
  "n": 16,
  "b": 4,
  "type": "inv",
  "text": "Pesquise uma espécie encontrada em Mato Grosso que apresente alguma adaptação ao ambiente em que vive. Descreva a adaptação e explique como ela pode favorecer a sobrevivência da espécie.",
  "hint": "Escolha uma espécie real com ocorrência documentada no estado. Registre habitat, característica e sua função ambiental, citando fonte.",
  "criteria": "Apresente espécie de Mato Grosso, ambiente, adaptação e explicação fundamentada de sua vantagem."
 },
 {
  "n": 17,
  "b": 5,
  "type": "mc",
  "text": "A industrialização e as transformações sociais dos séculos XIX e XX contribuíram para:",
  "options": [
   "mudanças nas relações de trabalho, urbanização e organização social.",
   "desaparecimento das cidades.",
   "fim das tecnologias de produção.",
   "redução das relações econômicas internacionais."
  ],
  "correct": 0,
  "hint": "Pense no crescimento das fábricas e das cidades e nas transformações das relações trabalhistas.",
  "why": "A industrialização influenciou o trabalho, a urbanização, a economia e a organização da sociedade."
 },
 {
  "n": 18,
  "b": 5,
  "type": "disc",
  "text": "Explique como as transformações políticas e econômicas do mundo contemporâneo influenciaram as relações de trabalho e a vida urbana.",
  "hint": "Analise industrialização, expansão de cidades, novos empregos, organizações de trabalhadores e desigualdades.",
  "criteria": "Relacione mudanças políticas ou econômicas a condições de trabalho e vida nas cidades."
 },
 {
  "n": 19,
  "b": 5,
  "type": "inv",
  "text": "Escolha um acontecimento histórico brasileiro do século XX. Pesquise causas, principais acontecimentos, consequências e diferentes interpretações sobre o período.",
  "hint": "Escolha um fato delimitado. Identifique causas, cronologia, efeitos e contraste interpretações fundamentadas em fontes.",
  "criteria": "Apresente acontecimento brasileiro do século XX, causas, eventos, consequências e diferentes interpretações com fontes."
 },
 {
  "n": 20,
  "b": 6,
  "type": "mc",
  "text": "A globalização econômica caracteriza-se, entre outros aspectos, pela:",
  "options": [
   "intensificação dos fluxos de mercadorias, capitais, informações e serviços.",
   "eliminação das redes internacionais.",
   "redução das relações comerciais.",
   "ausência de circulação de informações."
  ],
  "correct": 0,
  "hint": "Considere redes de comércio, capital, serviços e comunicação entre regiões.",
  "why": "A globalização amplia e intensifica fluxos econômicos e informacionais entre diferentes lugares."
 },
 {
  "n": 21,
  "b": 6,
  "type": "disc",
  "text": "Analise uma consequência positiva e uma consequência negativa da globalização para países e populações.",
  "hint": "Considere acesso a mercados, tecnologias e informação, mas também desigualdade, precarização, dependência e impactos ambientais.",
  "criteria": "Explique uma consequência positiva e outra negativa, com justificativa de seus efeitos."
 },
 {
  "n": 22,
  "b": 6,
  "type": "inv",
  "text": "Escolha um produto consumido em sua comunidade. Investigue sua cadeia produtiva, identificando origem da matéria-prima, local de produção, transporte, comercialização e possíveis impactos ambientais.",
  "hint": "Organize etapas do percurso do produto: origem → produção → transporte → comércio → impacto socioambiental.",
  "criteria": "Inclua produto, origem, produção, transporte, comercialização e impactos ambientais, com fonte."
 },
 {
  "n": 23,
  "b": 7,
  "type": "mc",
  "text": "O pensamento crítico caracteriza-se por:",
  "options": [
   "analisar ideias, questionar argumentos e buscar justificativas.",
   "aceitar qualquer afirmação sem reflexão.",
   "rejeitar todo tipo de conhecimento.",
   "basear decisões apenas em opiniões pessoais."
  ],
  "correct": 0,
  "hint": "O pensamento crítico investiga as razões apresentadas e avalia sua consistência.",
  "why": "Pensar criticamente envolve analisar ideias, questionar argumentos e buscar justificativas."
 },
 {
  "n": 24,
  "b": 7,
  "type": "disc",
  "text": "Explique a relação entre liberdade, responsabilidade e tomada de decisões na vida em sociedade.",
  "hint": "Explique que nossas escolhas têm impactos e devem considerar direitos, consequências e responsabilidades.",
  "criteria": "Relacione autonomia das decisões, responsabilidade por consequências e convivência social."
 },
 {
  "n": 25,
  "b": 7,
  "type": "inv",
  "text": "Escolha um dilema ético relacionado ao uso das redes sociais, inteligência artificial, privacidade ou tecnologia. Apresente diferentes posições e defenda uma delas com argumentos.",
  "hint": "Descreva a situação, pelo menos duas posições, seus argumentos e sua conclusão fundamentada.",
  "criteria": "Apresente dilema atual, diferentes posições e argumento consistente para uma posição escolhida."
 },
 {
  "n": 26,
  "b": 8,
  "type": "disc",
  "text": "Explique como desigualdade social, acesso à educação e mercado de trabalho podem estar relacionados na sociedade brasileira.",
  "hint": "Considere oportunidades de estudo, qualidade da educação, acesso a empregos e reprodução das desigualdades.",
  "criteria": "Relacione os três fatores e explique como podem influenciar oportunidades sociais."
 },
 {
  "n": 27,
  "b": 8,
  "type": "inv",
  "text": "Pesquise um indicador social brasileiro (renda, escolaridade, desemprego, saneamento ou outro). Apresente dois dados, indique a fonte e explique o que esses dados revelam sobre a sociedade.",
  "hint": "Escolha indicador e fonte identificada, como IBGE. Registre dois dados com ano e população ou região, faça comparação e interpretação.",
  "criteria": "Inclua indicador, dois dados comparáveis, anos, fonte e interpretação fundamentada."
 },
 {
  "n": 28,
  "b": 9,
  "type": "mc",
  "text": "Na frase “If people reduce waste, they will help the environment”, a estrutura expressa principalmente:",
  "options": [
   "uma condição e sua consequência.",
   "uma ação concluída no passado.",
   "uma ordem direta.",
   "uma descrição de pessoa."
  ],
  "correct": 0,
  "hint": "A oração com 'If' apresenta uma condição; 'will' aponta consequência provável.",
  "why": "A frase usa uma estrutura condicional: se as pessoas reduzirem resíduos, ajudarão o meio ambiente."
 },
 {
  "n": 29,
  "b": 9,
  "type": "disc",
  "text": "Escreva um pequeno texto em inglês (5 a 6 frases) sobre seus planos para o futuro acadêmico ou profissional.",
  "hint": "Use cinco ou seis frases próprias: I want to..., I plan to..., I will..., I hope to... Revise verbo, sujeito e coerência.",
  "criteria": "Produza cinco a seis frases em inglês com informações sobre planos acadêmicos ou profissionais."
 },
 {
  "n": 30,
  "b": 9,
  "type": "inv",
  "text": "Escolha um problema contemporâneo que afete sua escola, comunidade ou região (desigualdade, desinformação, mudanças climáticas, energia, resíduos, saúde coletiva, tecnologia etc.). Produza uma proposta de intervenção fundamentada em dados. Apresente: problema, causas, consequências, evidências, solução, recursos necessários e como pelo menos quatro áreas do conhecimento podem contribuir para a proposta.",
  "hint": "Planeje: problema → causas → consequências → evidências/dados → solução viável → recursos necessários → contribuições explícitas de quatro áreas ou disciplinas.",
  "criteria": "Apresente problema real, dados, causas, consequências, solução viável, recursos e participação fundamentada de pelo menos quatro áreas do conhecimento."
 }
];
if(tasks.length!==30||blocks.length!==10||tasks.some((t,i)=>t.n!==i+1||t.b!==blocks.findIndex(b=>t.n>=b.from&&t.n<=b.to)))throw Error('Configuração inconsistente');
const store=window.JPTrilha?.progressKey('jp_busca_ativa_multi_3em_b1_v1')||'jp_busca_ativa_multi_3em_b1_v1';
const localStore=window.JPTrilha?.progressStorage()||sessionStorage;
const fresh=()=>({index:0,started:false,seen:{},answers:{},attempts:{},hints:{},drafts:{},confirmed:{},startedAt:new Date().toISOString()});
let state=fresh(),lessonMode=false,reviewMode=false,reviewReturn=null,ready=false;
try{const old=JSON.parse(localStore.getItem(store)||'null');if(old&&Number.isInteger(old.index)&&old.index>=0&&old.index<=30&&old.answers&&old.seen&&old.drafts){state={...fresh(),...old};state.index=Math.min(30,Math.max(0,state.index))}}catch(error){}
const save=()=>{try{localStore.setItem(store,JSON.stringify(state));$('md-start-status').textContent='Progresso salvo neste navegador.'}catch(e){$('md-start-status').textContent='Salvamento indisponível. Baixe o relatório parcial para não perder o trabalho.'}};
function hideAll(){for(const id of ['md-start','md-progress-area','md-lesson','md-question-card','md-finish'])$(id).hidden=true}
const scroll=id=>$(id).scrollIntoView({block:'start',behavior:'smooth'});
function current(){return tasks[Math.min(state.index,29)]}
function answeredCount(){return Object.keys(state.answers).filter(k=>state.answers[k]?.complete).length}
function updateHud(){
 $('md-progress-area').hidden=false;
 $('md-progress-text').textContent=state.index===30?'30 de 30 atividades':'Atividade '+(state.index+1)+' de 30';
 $('md-progress-complete').textContent=answeredCount()+' / 30 registradas';
 $('md-progress-fill').style.width=(answeredCount()/30*100)+'%';
 const container=$('md-progress-pills');container.replaceChildren();
 blocks.forEach((b,i)=>{const span=document.createElement('span');span.textContent=b.icon;span.title=b.name+' · '+b.from+'–'+b.to;span.setAttribute('aria-label',b.name);const total=tasks.filter(t=>t.b===i).length;const count=tasks.filter(t=>t.b===i&&state.answers[t.n]?.complete).length;span.className=count===total?'passed':state.index<30&&current().b===i?'current':'';container.append(span)});
}
function start(){
 state.started=true;save();show();
}
function show(){
 hideAll();
 if(!state.started){$('md-start').hidden=false;return}
 updateHud();
 if(state.index>=30){finish();return}
 const task=current(),group=blocks[task.b];
 if(!state.seen[group.id]){lessonMode=true;renderLesson(task.b);return}
 lessonMode=false;renderQuestion();
}
function lessonChoice(message,good){
 $('md-lesson-feedback').textContent=message;$('md-lesson-feedback').className='md-feedback'+(good?'':' warn');
}
function renderLesson(idx){
 const group=blocks[idx];
 $('md-lesson').hidden=false;$('md-question-card').hidden=true;$('md-finish').hidden=true;
 $('md-lesson-kicker').textContent='MINIAULA '+(idx+1)+' / 10 · '+group.icon+' '+group.name;
 $('md-lesson-title').textContent=group.name+': antes de responder, compreenda';
 $('md-lesson-text').textContent=group.lesson;
 $('md-lesson-example').textContent=group.example;
 $('md-lesson-tip').textContent=group.tip;
 $('md-lesson-check').textContent=group.check;
 const options=$('md-lesson-options');options.replaceChildren();
 let passed=Boolean(state.seen[group.id]);
 group.options.forEach((label,i)=>{
  const btn=document.createElement('button');btn.type='button';btn.className='md-choice';btn.textContent=String.fromCharCode(65+i)+') '+label;btn.disabled=passed;
  if(passed&&i===group.correct)btn.classList.add('correct');
  btn.addEventListener('click',()=>{
   if(i===group.correct){
    state.seen[group.id]=true;save();lessonChoice('✅ Exatamente. '+group.why,true);renderLesson(idx);
   }else{btn.classList.add('wrong');btn.disabled=true;lessonChoice('🔎 Releia a explicação e o exemplo. Depois tente outra alternativa.',false)}
  });options.append(btn);
 });
 $('md-lesson-next').disabled=!passed;
 $('md-lesson-next').textContent=reviewMode?'Voltar à atividade →':'Começar as questões de '+group.name+' →';
 if(!passed)lessonChoice('Responda para prosseguir. Caso erre, revise a miniaula e tente novamente.',false);
 else lessonChoice('✅ '+group.why,true);
 scroll('md-lesson');
}
$('md-lesson-next').addEventListener('click',()=>{
 if(reviewMode){reviewMode=false;show();return}
 if(!state.seen[blocks[current().b].id])return;
 show();
});
function renderQuestion(){
 const t=current(),b=blocks[t.b];
 $('md-lesson').hidden=true;$('md-question-card').hidden=false;
 $('md-question-subject').textContent=b.icon+' '+b.name.toUpperCase()+' · BLOCO '+(t.b+1)+'/10';
 $('md-question-type').textContent=t.type==='mc'?'MÚLTIPLA ESCOLHA':t.type==='inv'?'INVESTIGATIVA':'DISCURSIVA';
 $('md-question-title').textContent='Missão '+t.n+' de 30';
 $('md-question-context').textContent=b.tip;
 $('md-question-text').textContent=t.text;
 $('md-question-options').replaceChildren();
 $('md-written').hidden=t.type==='mc';
 $('md-research-box').hidden=t.type!=='inv';
 $('md-question-next').disabled=true;$('md-question-next').textContent=t.n===30?'Concluir a missão →':t.n===b.to?'Desbloquear próximo componente →':'Próxima questão →';
 $('md-question-submit').hidden=t.type==='mc';
 $('md-question-submit').disabled=false;$('md-question-submit').textContent='Revisar minha resposta';
 $('md-response').classList.toggle('md-long',t.n===30);
 $('md-response').value=state.drafts[t.n]?.text||state.answers[t.n]?.text||'';
 $('md-source-title').value=state.drafts[t.n]?.source||state.answers[t.n]?.source||'';
 $('md-source-url').value=state.drafts[t.n]?.reference||state.answers[t.n]?.reference||'';
 $('md-response-count').textContent=$('md-response').value.length+' caracteres registrados';
 const recorded=state.answers[t.n]?.complete;
 if(recorded){
  $('md-question-next').disabled=false;
  $('md-question-submit').disabled=true;
  $('md-question-submit').textContent='Resposta registrada';
  message('✅ Sua resposta foi registrada. Avance para a próxima atividade. As respostas abertas serão apreciadas pelo professor.',true);
 }else message(t.type==='mc'?'Escolha uma alternativa. Você terá orientação se errar.':'Escreva sua resposta, confira os critérios e registre quando estiver pronta.',false);
 if(t.type==='mc')t.options.forEach((choice,i)=>{
  const btn=document.createElement('button');btn.type='button';btn.className='md-choice';
  btn.textContent=String.fromCharCode(65+i)+') '+choice;
  if(recorded){btn.disabled=true;if(t.correct===i)btn.classList.add('correct')}
  else btn.addEventListener('click',()=>choose(i,btn));
  $('md-question-options').append(btn);
 });
 if(t.type!=='mc'&&state.confirmed[t.n]&&!recorded){$('md-question-submit').textContent='Confirmar registro da resposta';message('🔎 Confira: '+t.criteria+' Depois confirme o registro.',false)}
 scroll('md-question-card');
}
function message(text,good){
 $('md-question-feedback').textContent=text;
 $('md-question-feedback').className='md-feedback'+(good?'':' warn');
}
function choose(choice,btn){
 const t=current();if(t.type!=='mc'||state.answers[t.n]?.complete)return;
 state.attempts[t.n]=(state.attempts[t.n]||0)+1;
 if(choice===t.correct){
  state.answers[t.n]={type:'mc',complete:true,selected:t.options[choice],correct:t.options[t.correct],tries:state.attempts[t.n],hints:state.hints[t.n]||0};
  message('✅ Resposta correta! '+t.why,true);save();updateHud();
  $('md-question-next').disabled=false;
  [...$('md-question-options').children].forEach((button,i)=>{button.disabled=true;if(i===t.correct)button.classList.add('correct')});
 }else{
  btn.classList.add('wrong');btn.disabled=true;
  message('🔎 Ainda não. '+t.hint+' Releia e tente outra alternativa.',false);
  save();
 }
}
const textLength=s=>s.replace(/\s+/g,' ').trim().length;
function saveDraft(){
 if(!state.started||state.index>=30)return;
 const t=current();if(t.type==='mc'||state.answers[t.n]?.complete)return;
 state.drafts[t.n]={text:$('md-response').value,source:$('md-source-title').value,reference:$('md-source-url').value};
 save();
 $('md-response-count').textContent=$('md-response').value.length+' caracteres registrados';
}
for(const id of ['md-response','md-source-title','md-source-url'])$(id).addEventListener('input',()=>{if(state.index<30&&current().type!=='mc'){delete state.confirmed[current().n];$('md-question-submit').textContent='Revisar minha resposta';saveDraft()}});
$('md-question-submit').addEventListener('click',()=>{
 if(state.index>=30)return;
 const t=current();if(t.type==='mc'||state.answers[t.n]?.complete)return;
 const text=$('md-response').value.trim(),source=$('md-source-title').value.trim(),reference=$('md-source-url').value.trim();
 const min=t.n===30?250:t.type==='inv'?95:55;
 if(textLength(text)<min){message('✍️ Desenvolva um pouco mais a resposta: escreva pelo menos '+min+' caracteres de conteúdo. A qualidade do texto será avaliada pelo professor.',false);$('md-response').focus();return}
 if(t.type==='inv'&&source.length<5){message('🔎 Registre a identificação da fonte consultada. Se usou observação direta, entrevista ou pesquisa presencial, descreva isso no campo de fonte.',false);$('md-source-title').focus();return}
 if(!state.confirmed[t.n]){
  state.confirmed[t.n]=true;saveDraft();save();
  $('md-question-submit').textContent='Confirmar registro da resposta';
  message('📝 Antes de concluir, confira: '+t.criteria+' Se precisar, aperfeiçoe o texto. Depois clique novamente para confirmar.',false);
  return;
 }
 state.answers[t.n]={type:t.type,complete:true,text,source,reference,criteria:t.criteria,hints:state.hints[t.n]||0};
 delete state.drafts[t.n];delete state.confirmed[t.n];save();
 message('✅ Resposta registrada para apreciação docente. Lembre-se de baixar o relatório.',true);
 $('md-question-submit').disabled=true;$('md-question-submit').textContent='Resposta registrada';
 $('md-question-next').disabled=false;updateHud();
});
$('md-question-hint').addEventListener('click',()=>{
 if(state.index>=30)return;const t=current();
 state.hints[t.n]=(state.hints[t.n]||0)+1;
 message('💡 Orientação: '+t.hint+(t.type==='mc'?' Reflita antes de marcar a alternativa.':''),false);save();
});
$('md-question-revise').addEventListener('click',()=>{
 if(state.index>=30)return;
 reviewMode=true;saveDraft();renderLesson(current().b);
});
$('md-question-next').addEventListener('click',()=>{
 if(state.index>=30||!state.answers[current().n]?.complete)return;
 state.index++;save();show();
});
$('md-start-btn').addEventListener('click',start);
function csvEscape(value){
 let s=String(value??'').replace(/[\r\n]+/g,' ').trim();
 if(/^[=+@\t]/.test(s)||/^-(?!\d)/.test(s))s="'"+s;
 return '"'+s.replace(/"/g,'""')+'"';
}
function exportReport(final=false){
 const rows=[['Tipo','Questão','Componente curricular','Modalidade','Enunciado','Resposta ou texto do estudante','Gabarito objetivo','Tentativas objetivas','Dicas','Fonte consultada','Referência complementar','Situação']];
 for(const t of tasks){
  const a=state.answers[t.n];
  if(!a||!a.complete)continue;
  rows.push(['Resposta',t.n,blocks[t.b].name,t.type==='mc'?'Múltipla escolha':t.type==='disc'?'Discursiva':'Investigativa',t.text,t.type==='mc'?a.selected:a.text,t.type==='mc'?a.correct:'Avaliação docente',a.tries||'',a.hints||0,a.source||'',a.reference||'',t.type==='mc'?'Verificada automaticamente':'Pendente de análise docente']);
 }
 if(state.index<30&&current().type!=='mc'&&!state.answers[current().n]?.complete){
  const draft=state.drafts[current().n];
  if(draft&&draft.text?.trim())rows.push(['Rascunho não concluído',current().n,blocks[current().b].name,current().type,current().text,draft.text,'',state.attempts[current().n]||'',state.hints[current().n]||'',draft.source||'',draft.reference||'','Rascunho parcial']);
 }
 rows.unshift(['Identificação do estudante','', '', '', 'Nome (preenchimento opcional)', $('md-student').value.trim(), 'Turma (preenchimento opcional)', $('md-class').value.trim(), '', '', '', '']);
 const total=answeredCount(),objetivas=tasks.filter(t=>t.type==='mc'&&state.answers[t.n]?.complete);
 const firstTry=objetivas.filter(t=>state.answers[t.n].tries===1).length;
 rows.push(['SÍNTESE','','','','Atividades registradas',total+' / 30','Questões objetivas registradas',objetivas.length,'Acertos na primeira tentativa',firstTry,'','']);
 rows.push(['OBSERVAÇÃO','','','','Questões escritas não possuem correção automática','','','','','','','Resultados para apreciação pelo professor; não equivalem a frequência oficial.']);
 if(window.JPVisibilidade?.csvRows)rows.push(...JPVisibilidade.csvRows(12));
 rows.push(['DADOS DO RELATÓRIO','','','','Gerado em',new Date().toLocaleString('pt-BR'),'Sem exigência de código','','','','','']);
 const data='\uFEFF'+rows.map(r=>r.map(csvEscape).join(';')).join('\r\n');
 const link=document.createElement('a'),url=URL.createObjectURL(new Blob([data],{type:'text/csv;charset=utf-8'}));
 link.href=url;link.download='JP-busca-ativa-multidisciplinar-3em-1bimestre-'+(final?'final':'parcial')+'-'+new Date().toISOString().slice(0,10)+'.csv';
 document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
 $('md-export-feedback').textContent='Arquivo gerado neste aparelho. Entregue-o ao professor pelo canal indicado pela escola.';
 $('md-start-status').textContent='Relatório baixado. Nenhum dado foi enviado automaticamente.';
}
$('md-progress-btn').addEventListener('click',()=>exportReport(false));
$('md-download-final').addEventListener('click',()=>exportReport(true));
function finish(){
 hideAll();updateHud();$('md-finish').hidden=false;
 const objekt=tasks.filter(t=>t.type==='mc');
 const first=objekt.filter(t=>state.answers[t.n]?.tries===1).length;
 $('md-finish-text').textContent='Você registrou '+answeredCount()+' das 30 atividades, incluindo respostas de múltipla escolha, discursivas e investigativas. Das '+objekt.length+' questões objetivas, '+first+' foram acertadas na primeira tentativa. As produções escritas, a pesquisa e o desafio de intervenção aguardam apreciação docente.';
 if(window.JPTrilha?.hasSession())window.JPTrilha.submit({score:0,solved:answeredCount(),total:30});
 scroll('md-finish');
}
$('md-restart').addEventListener('click',()=>{
 if(!confirm('Recomeçar todas as 30 atividades? Baixe seu relatório antes de apagar as respostas deste navegador.'))return;
 state=fresh();reviewMode=false;lessonMode=false;save();show();window.scrollTo({top:0,behavior:'smooth'});
});
show();
