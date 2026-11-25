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
 {n:1,b:0,type:'mc',text:'Leia: “A tecnologia pode aproximar pessoas, mas também exige responsabilidade no uso das informações.” A frase apresenta principalmente:',options:['uma reflexão com uma ideia defendida.','uma receita culinária.','uma narrativa fantástica.','uma pergunta direta.'],correct:0,hint:'Observe se o trecho narra acontecimentos, ensina uma receita ou apresenta um ponto de vista.',why:'O enunciado apresenta uma reflexão sobre tecnologia, relações humanas e responsabilidade.'},
 {n:2,b:0,type:'disc',text:'Explique a diferença entre fato e opinião e apresente um exemplo de cada.',hint:'Diferencie o que pode ser verificado do que expressa uma avaliação. Depois escreva dois exemplos identificados.',criteria:'Sua resposta define fato, define opinião e apresenta um exemplo coerente de cada um.'},
 {n:3,b:0,type:'inv',text:'Escolha uma notícia atual sobre educação, ciência ou meio ambiente. Identifique título, fonte, data, fato principal e um elemento que ajude a avaliar a confiabilidade da informação.',hint:'Procure uma notícia com data e veículo identificados. Verifique se cita documentos, pesquisas, entrevistas ou outras evidências.',criteria:'O texto registra título, fonte, data, fato principal e um critério de confiabilidade.'},
 {n:4,b:1,type:'mc',text:'As raízes da equação x² – 5x + 6 = 0 são:',options:['1 e 6','2 e 3','-2 e -3','3 e 5'],correct:1,hint:'Procure dois números cujo produto seja 6 e cuja soma seja 5.',why:'Fatorando, (x − 2)(x − 3) = 0. Logo, as raízes são 2 e 3.'},
 {n:5,b:1,type:'disc',text:'Resolva a equação 2x + 7 = 25 e apresente todas as etapas do cálculo.',hint:'Subtraia 7 dos dois membros, depois divida ambos por 2. Substitua x na equação para conferir.',criteria:'Apresente os passos 2x = 18, x = 9 e a conferência 2 × 9 + 7 = 25.'},
 {n:6,b:1,type:'inv',text:'Pesquise o preço de um mesmo produto em três estabelecimentos. Organize os valores, calcule a média aproximada e determine a diferença entre o maior e o menor preço.',hint:'Registre nome do produto, três estabelecimentos e três preços. Calcule média = soma ÷ 3 e diferença = maior − menor.',criteria:'Inclua produto, três estabelecimentos, preços, média aproximada e diferença entre os extremos.'},
 {n:7,b:1,type:'mc',text:'Uma aplicação de R$ 500,00 teve aumento de 8%. O valor do aumento foi:',options:['R$ 8,00','R$ 20,00','R$ 40,00','R$ 80,00'],correct:2,hint:'8% = 8/100 = 0,08. Multiplique esse valor por 500.',why:'500 × 0,08 = R$ 40,00 de aumento.'},
 {n:8,b:2,type:'mc',text:'Qual alternativa apresenta uma fonte de energia renovável?',options:['Carvão mineral.','Petróleo.','Energia solar.','Gás natural.'],correct:2,hint:'Pense em uma fonte que se renova naturalmente, sem depender da formação de combustíveis fósseis.',why:'A energia solar é renovável. Carvão, petróleo e gás natural são fontes fósseis não renováveis.'},
 {n:9,b:2,type:'disc',text:'Explique uma vantagem e uma possível limitação do uso de fontes de energia renováveis.',hint:'Escolha uma fonte renovável e explique um benefício e uma dificuldade real relacionada ao uso dela.',criteria:'Descreva pelo menos uma vantagem e uma limitação, com explicação coerente.'},
 {n:10,b:2,type:'inv',text:'Pesquise duas fontes de energia utilizadas no Brasil. Para cada uma, indique como é obtida, uma vantagem e um possível impacto ambiental.',hint:'Escolha duas fontes diferentes. Para cada uma, registre obtenção, vantagem e impacto; consulte fontes identificáveis.',criteria:'Apresente duas fontes, obtenção, vantagem e impacto ambiental de cada uma.'},
 {n:11,b:3,type:'mc',text:'A globalização pode ser entendida como um processo que intensifica:',options:['o isolamento entre os países.','as relações econômicas, culturais e tecnológicas entre diferentes lugares.','apenas as atividades agrícolas locais.','a redução das redes de comunicação.'],correct:1,hint:'Considere como países e regiões interagem por comércio, tecnologia, cultura e comunicação.',why:'A globalização está ligada à intensificação de conexões econômicas, culturais e tecnológicas.'},
 {n:12,b:3,type:'disc',text:'Explique como os avanços nos meios de transporte e comunicação influenciam as relações entre diferentes lugares do mundo.',hint:'Fale sobre circulação de pessoas, mercadorias, informações e ideias. Traga um exemplo.',criteria:'Relacione transporte e comunicação à integração de diferentes lugares, com pelo menos um exemplo.'},
 {n:13,b:3,type:'inv',text:'Escolha um produto utilizado por sua família. Pesquise onde é produzido e como chega até o consumidor. Descreva pelo menos três etapas desse percurso.',hint:'Exemplo de etapas: produção da matéria-prima, fabricação, transporte, distribuição, comercialização.',criteria:'Identifique o produto, a região ou local de produção e pelo menos três etapas da cadeia.'},
 {n:14,b:4,type:'mc',text:'Uma característica importante da Revolução Francesa foi:',options:['defesa dos privilégios exclusivos da nobreza.','contestação de estruturas sociais e políticas do Antigo Regime.','rejeição de ideias de liberdade.','fortalecimento absoluto dos privilégios feudais.'],correct:1,hint:'Pense nas mudanças políticas defendidas por grupos que questionaram privilégios no fim do século XVIII.',why:'A Revolução Francesa questionou estruturas sociais e políticas características do Antigo Regime.'},
 {n:15,b:4,type:'disc',text:'Explique por que ideias como liberdade, igualdade e cidadania foram importantes nas transformações políticas da Idade Moderna.',hint:'Explique como essas ideias questionaram privilégios e influenciaram a organização política e os direitos.',criteria:'Relacione liberdade, igualdade e cidadania às mudanças políticas, sem supor que todos receberam os mesmos direitos imediatamente.'},
 {n:16,b:4,type:'inv',text:'Pesquise um acontecimento histórico do século XVIII ou XIX que tenha influenciado a formação do mundo contemporâneo. Registre causas, principais acontecimentos e uma consequência.',hint:'Escolha um acontecimento específico e organize: contexto, causas, eventos principais e consequência.',criteria:'Informe o acontecimento e seu período, causas, acontecimentos principais e pelo menos uma consequência.'},
 {n:17,b:5,type:'mc',text:'A arte moderna e contemporânea caracteriza-se, entre outros aspectos, pela:',options:['existência de uma única forma correta de representação.','experimentação de linguagens, técnicas e formas de expressão.','rejeição de qualquer inovação.','obrigação de representar somente paisagens.'],correct:1,hint:'Arte moderna e contemporânea costuma explorar novas linguagens, materiais e possibilidades expressivas.',why:'A experimentação de técnicas, linguagens e formas é característica importante da produção moderna e contemporânea.'},
 {n:18,b:5,type:'disc',text:'Explique como uma obra de arte pode provocar reflexão sobre um problema social ou ambiental.',hint:'Escolha um tema, como poluição ou desigualdade, e descreva o que a obra mostra e como pode sensibilizar o público.',criteria:'Explique o vínculo entre linguagem artística, tema social ou ambiental e reflexão do público.'},
 {n:19,b:5,type:'inv',text:'Pesquise um artista brasileiro ou mato-grossense. Registre uma obra, sua linguagem artística, o tema abordado e uma interpretação pessoal.',hint:'Registre nome do artista, título de obra, linguagem, tema e interpretação apoiada em características observáveis.',criteria:'Inclua artista, obra, linguagem, tema e interpretação pessoal coerente.'},
 {n:20,b:6,type:'mc',text:'A prática regular de atividade física pode contribuir para:',options:['saúde, bem-estar e qualidade de vida.','substituir completamente o sono.','eliminar a necessidade de alimentação equilibrada.','impedir qualquer ocorrência de cansaço.'],correct:0,hint:'Considere os benefícios de hábitos ativos, sem supor que eles eliminam outras necessidades do corpo.',why:'Atividade física regular contribui para a saúde e o bem-estar, sem substituir descanso e alimentação adequada.'},
 {n:21,b:6,type:'disc',text:'Explique a importância da cooperação, do respeito e da ética nas práticas esportivas.',hint:'Pense em trabalho em equipe, respeito a regras, adversários, diferenças e decisões justas.',criteria:'Explique cooperação, respeito e ética com relação a práticas esportivas.'},
 {n:22,b:6,type:'inv',text:'Escolha uma modalidade esportiva. Pesquise regras básicas, capacidades físicas envolvidas e uma adaptação que permita maior inclusão de participantes.',hint:'Você pode escolher futsal, voleibol, handebol, tênis de mesa ou outra modalidade. No xadrez, distinga habilidades cognitivas das capacidades físicas.',criteria:'Apresente modalidade, regras, capacidades físicas relevantes e uma adaptação inclusiva viável.'},
 {n:23,b:7,type:'mc',text:'Complete corretamente: “If I study, I ____ the test.”',options:['pass','passes','passing','passed'],correct:0,hint:'O sujeito é “I”, que usa a forma básica do verbo no presente simples.',why:'Com o sujeito “I”, a forma correta no presente simples é “pass”. A frase pode expressar uma relação habitual.'},
 {n:24,b:7,type:'disc',text:'Escreva um pequeno parágrafo em inglês (4 a 5 frases) apresentando sua rotina de estudos ou seus planos para o futuro.',hint:'Use frases simples. Ex.: “I study in the morning. I like math. I play volleyball. I want to learn English.” Crie seu texto próprio.',criteria:'Seu parágrafo deve conter quatro ou cinco frases em inglês sobre estudos ou planos.'},
 {n:25,b:7,type:'inv',text:'Escolha uma música, anúncio ou postagem em inglês. Identifique cinco palavras ou expressões, traduza-as e explique como são utilizadas no contexto escolhido.',hint:'Identifique o material consultado; escolha cinco expressões curtas e explique o sentido de cada uma dentro do contexto.',criteria:'Registre a fonte, cinco palavras ou expressões, tradução e explicação contextual.'},
 {n:26,b:8,type:'disc',text:'Explique por que o respeito à diversidade de crenças, culturas e convicções é importante para a construção de uma sociedade democrática.',hint:'Relacione respeito, direitos, diálogo e convivência entre pessoas com diferentes ideias e experiências.',criteria:'Explique como o reconhecimento da diversidade fortalece direitos, convivência e democracia.'},
 {n:27,b:8,type:'inv',text:'Pesquise uma iniciativa, projeto ou ação comunitária que promova solidariedade, respeito ou diálogo. Registre o objetivo e como ela contribui para a comunidade.',hint:'Procure uma ação real. Identifique responsáveis, objetivo, público e contribuição para a comunidade.',criteria:'Descreva uma iniciativa identificável, seu objetivo e sua contribuição comunitária.'},
 {n:28,b:9,type:'mc',text:'Para investigar um problema relacionado às mudanças climáticas, uma abordagem adequada seria:',options:['utilizar apenas opiniões pessoais.','reunir dados científicos, analisar informações e comparar diferentes evidências.','ignorar dados que contradigam uma hipótese.','escolher uma explicação sem investigação.'],correct:1,hint:'A pesquisa científica precisa de observação, dados, comparação e revisão de hipóteses.',why:'Investigar significa reunir dados, analisar diferentes evidências e avaliar explicações à luz dessas informações.'},
 {n:29,b:9,type:'disc',text:'Explique como Matemática, Ciências e Geografia podem trabalhar juntas para analisar o consumo de energia elétrica de uma escola.',hint:'Matemática: quantificar consumo; Ciências: fontes, transformações e impactos; Geografia: distribuição, infraestrutura e uso de recursos.',criteria:'Explique a contribuição articulada das três disciplinas para analisar o consumo elétrico.'},
 {n:30,b:9,type:'inv',text:'Escolha um problema real da escola ou da comunidade (desperdício de água, energia, lixo, desinformação, mobilidade, alimentação, convivência, preservação ambiental etc.). Elabore uma proposta de intervenção. Apresente: problema, dados ou observações, causas, consequências, solução proposta e como três ou mais disciplinas podem contribuir para resolver ou compreender a situação.',hint:'Organize em seis partes: 1. problema; 2. dados/observações; 3. causas; 4. consequências; 5. solução; 6. participação de pelo menos três disciplinas.',criteria:'A proposta apresenta problema real, evidências, causas, consequências, solução viável e contribuição de três ou mais disciplinas.'}
];
if(tasks.length!==30||blocks.length!==10||tasks.some((t,i)=>t.n!==i+1||t.b!==blocks.findIndex(b=>t.n>=b.from&&t.n<=b.to)))throw Error('Configuração inconsistente');
const store='jp_busca_ativa_multi_3em_b1_v1';
const fresh=()=>({index:0,started:false,seen:{},answers:{},attempts:{},hints:{},drafts:{},confirmed:{},startedAt:new Date().toISOString()});
let state=fresh(),lessonMode=false,reviewMode=false,reviewReturn=null,ready=false;
try{const old=JSON.parse(localStorage.getItem(store)||'null');if(old&&Number.isInteger(old.index)&&old.index>=0&&old.index<=30&&old.answers&&old.seen&&old.drafts){state={...fresh(),...old};state.index=Math.min(30,Math.max(0,state.index))}}catch(error){}
const save=()=>{try{localStorage.setItem(store,JSON.stringify(state));$('md-start-status').textContent='Progresso salvo neste navegador.'}catch(e){$('md-start-status').textContent='Salvamento indisponível. Baixe o relatório parcial para não perder o trabalho.'}};
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
 scroll('md-finish');
}
$('md-restart').addEventListener('click',()=>{
 if(!confirm('Recomeçar todas as 30 atividades? Baixe seu relatório antes de apagar as respostas deste navegador.'))return;
 state=fresh();reviewMode=false;lessonMode=false;save();show();window.scrollTo({top:0,behavior:'smooth'});
});
show();
