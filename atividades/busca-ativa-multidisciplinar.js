'use strict';
/* JP Recomposição · Busca Ativa Multidisciplinar · 9º ano · 1º bimestre
 * Enunciados e organização fundamentados no documento pedagógico fornecido
 * pela escola. 30 questões preservadas; miniaulas são apoio suplementar.
 * Dados salvos exclusivamente no navegador; relatório CSV sem código.
 */
const $=id=>document.getElementById(id);
const blocks=[
 {id:'lp',name:'Língua Portuguesa',icon:'📰',from:1,to:3,lesson:'Fato é uma informação que pode ser verificada por evidências; opinião expressa avaliação ou ponto de vista. Em uma notícia, identificar título, data, fonte e informações verificáveis ajuda a avaliar a confiabilidade.',example:'“A escola abriu uma biblioteca em março” é uma afirmação verificável. “A biblioteca é o melhor espaço da escola” é uma opinião. Uma reportagem confiável distingue informações verificadas de interpretações.',tip:'Argumento é uma razão que sustenta uma ideia. Para investigar uma notícia, localize a fonte, a data, o fato central e os elementos que permitem confirmar a informação.',check:'Qual alternativa descreve melhor um fato?',options:['Uma informação que pode ser verificada.','Uma preferência pessoal.','Uma avaliação sem evidências.'],correct:0,why:'Fatos podem ser conferidos em registros, dados ou fontes; opiniões revelam julgamentos.'},
 {id:'mat',name:'Matemática',icon:'🧮',from:4,to:7,lesson:'Resolver uma equação significa encontrar valores que tornam a igualdade verdadeira. Na equação do 1º grau, fazemos operações equivalentes nos dois membros. No 2º grau, as raízes são valores que zeram a expressão. Porcentagem representa partes de cada 100.',example:'2x + 7 = 25 → subtraia 7 dos dois lados: 2x = 18 → divida ambos por 2: x = 9. Confira: 2 × 9 + 7 = 25. Para 8% de R$ 500, calcule 500 × 0,08 = R$ 40.',tip:'Para equações quadráticas fatoráveis, procure dois números cuja soma e produto correspondam aos coeficientes. Na pesquisa de preços: média = soma dos valores ÷ 3; amplitude = maior preço − menor preço.',check:'Na equação 2x + 7 = 25, qual operação devemos fazer primeiro?',options:['Subtrair 7 dos dois membros.','Somar 7 apenas à direita.','Dividir um só lado por 2.'],correct:0,why:'Subtrair 7 de ambos os lados preserva a igualdade e isola 2x.'},
 {id:'cien',name:'Ciências',icon:'🔋',from:8,to:10,lesson:'Fontes renováveis são repostas naturalmente em escalas compatíveis com o uso humano, como solar, eólica e hídrica. Isso não significa ausência de impactos. É necessário comparar geração, disponibilidade e consequências ambientais.',example:'A energia solar usa a radiação do Sol e não queima combustível durante a geração elétrica. Sua produção varia com a luz solar; painéis e baterias exigem materiais e gestão ambiental.',tip:'Ao pesquisar, identifique como a energia é obtida, uma vantagem, uma limitação e um impacto. Diferencie uma fonte de energia de um equipamento que a transforma.',check:'Qual fonte de energia é renovável?',options:['Energia solar.','Petróleo.','Carvão mineral.'],correct:0,why:'A radiação solar é reposta continuamente; petróleo e carvão são combustíveis fósseis.'},
 {id:'geo',name:'Geografia',icon:'🌍',from:11,to:13,lesson:'A globalização intensifica conexões econômicas, culturais, tecnológicas e de informação entre lugares. Os meios de transporte e comunicação fazem mercadorias, ideias e serviços circularem em redes complexas.',example:'Uma bola esportiva pode envolver matéria-prima produzida em um país, fabricação em outro, transporte por rodovias e venda em uma loja da cidade. Sua trajetória revela redes produtivas.',tip:'Em uma cadeia de produção, observe origem das matérias-primas, transformação, distribuição e venda. Não confunda local de fabricação com local de compra.',check:'O que indica a presença de redes globais?',options:['Produtos e informações circulam entre diferentes países.','Todos os países deixam de se comunicar.','Cada país produz apenas para si.'],correct:0,why:'A globalização relaciona diversos lugares por redes de produção, comércio e comunicação.'},
 {id:'hist',name:'História',icon:'🏛️',from:14,to:16,lesson:'No fim do século XVIII, a Revolução Francesa contestou privilégios do Antigo Regime. Ideias como liberdade, igualdade jurídica e cidadania influenciaram debates políticos, mas sua concretização foi histórica e socialmente disputada.',example:'A Declaração dos Direitos do Homem e do Cidadão (1789) afirmava princípios de liberdade e igualdade em direitos, mas a participação política efetiva não alcançava igualmente todos os grupos.',tip:'Ao investigar acontecimentos históricos, separe causas, eventos principais e consequências. Consulte fontes confiáveis e considere quem participou e quais grupos foram excluídos.',check:'Qual transformação está relacionada à Revolução Francesa?',options:['A contestação de privilégios e estruturas do Antigo Regime.','A defesa de privilégios exclusivos da nobreza.','A proibição da ideia de cidadania.'],correct:0,why:'A Revolução questionou hierarquias e instituições políticas do Antigo Regime.'},
 {id:'arte',name:'Arte',icon:'🎨',from:17,to:19,lesson:'A arte moderna e contemporânea utiliza diferentes linguagens e materiais para criar sentidos. Uma obra pode provocar reflexão sobre identidades, ambiente, desigualdades e mudanças sociais.',example:'Uma fotografia que registra resíduos em um rio pode sensibilizar sobre poluição. Uma instalação feita com materiais reutilizados pode questionar desperdício e consumo.',tip:'Na pesquisa de um artista, registre nome, título da obra, linguagem (pintura, fotografia, escultura etc.), tema e sua interpretação com base no que observou.',check:'Uma obra artística pode abordar um problema social por meio de:',options:['Experimentação de técnicas e linguagens.','Uma única forma correta de representação.','Proibição de temas atuais.'],correct:0,why:'As linguagens artísticas podem ser variadas e propor reflexão crítica.'},
 {id:'edfis',name:'Educação Física',icon:'🏐',from:20,to:22,lesson:'Atividades físicas podem contribuir para saúde, bem-estar e convivência. Cooperação, ética, respeito às regras e inclusão são componentes da prática esportiva, e não apenas o resultado da partida.',example:'Em um jogo de voleibol, as equipes podem adaptar altura da rede, tamanho da quadra ou regras de participação para acolher diferentes capacidades, preservando a segurança e a aprendizagem.',tip:'Você pode pesquisar futsal, voleibol, handebol, tênis de mesa ou xadrez. No caso do xadrez, destaque atenção, estratégia e acessibilidade; ele não equivale a exercício físico vigoroso.',check:'Qual atitude representa inclusão no esporte?',options:['Adaptar regras para ampliar a participação com segurança.','Excluir quem está aprendendo.','Impedir adaptações em qualquer situação.'],correct:0,why:'Adaptações ajudam a garantir acesso e participação equitativa.'},
 {id:'eng',name:'Língua Inglesa',icon:'🇬🇧',from:23,to:25,lesson:'Em inglês, frases com “if” expressam uma condição. Observe o sujeito e o tempo verbal. Também é possível aprender vocabulário examinando palavras no contexto de notícias, músicas e anúncios.',example:'“If I study, I pass the test” usa presente simples nos dois trechos para indicar uma relação habitual. Com ideia de futuro, podemos dizer “If I study, I will pass the test”. Na tarefa do material, a opção disponível correta é “pass”.',tip:'Para escrever sua rotina, utilize frases simples: “I study in the morning. I like science. I play volleyball.” Para investigar expressões, explique o sentido no contexto, não apenas traduza isoladamente.',check:'Qual frase usa corretamente “I” no presente simples?',options:['I study every day.','I studies every day.','I studying every day.'],correct:0,why:'No presente simples afirmativo, “I” é seguido pela forma básica do verbo: I study.'},
 {id:'tut',name:'Tutoria',icon:'🤝',from:26,to:27,lesson:'O respeito à diversidade envolve reconhecer que pessoas podem ter diferentes crenças, culturas, histórias e convicções. Em sociedades democráticas, o diálogo e os direitos de todas as pessoas precisam ser considerados.',example:'Uma ação comunitária que promove rodas de conversa e cooperação entre moradores pode criar espaços de escuta, reduzir conflitos e incentivar a solidariedade.',tip:'Ao pesquisar, descreva o objetivo da iniciativa, quem participa, quais ações são realizadas e de que forma elas beneficiam a comunidade.',check:'Uma prática que favorece a convivência democrática é:',options:['Escutar com respeito diferentes pontos de vista.','Impedir toda manifestação de diversidade.','Desconsiderar direitos de grupos minoritários.'],correct:0,why:'O diálogo respeitoso reconhece a dignidade e os direitos das diferentes pessoas.'},
 {id:'multi',name:'Síntese Multidisciplinar',icon:'🌱',from:28,to:30,lesson:'Problemas reais podem exigir conhecimentos de diferentes disciplinas. Para elaborar uma intervenção, investigue evidências, reconheça causas e consequências e proponha soluções realizáveis.',example:'Para analisar desperdício de energia na escola: Matemática organiza consumo em tabelas e calcula variações; Ciências estuda fontes e impactos; Geografia analisa recursos, infraestrutura e distribuição espacial.',tip:'No desafio final, apresente problema, dados ou observações, causas, consequências, ação proposta e contribuição de pelo menos três componentes curriculares. A proposta precisa ser específica e viável.',check:'Qual procedimento é adequado a uma investigação multidisciplinar?',options:['Reunir evidências, comparar informações e propor solução.','Ignorar dados contrários a uma hipótese.','Usar apenas opinião pessoal como comprovação.'],correct:0,why:'Uma investigação fundamentada considera informações verificáveis e diferentes perspectivas.'}
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
const store='jp_busca_ativa_multi_9ano_b1_v1';
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
 const total=answeredCount(),objetivas=tasks.filter(t=>t.type==='mc'&&state.answers[t.n]?.complete);
 const firstTry=objetivas.filter(t=>state.answers[t.n].tries===1).length;
 rows.push(['SÍNTESE','','','','Atividades registradas',total+' / 30','Questões objetivas registradas',objetivas.length,'Acertos na primeira tentativa',firstTry,'','']);
 rows.push(['OBSERVAÇÃO','','','','Questões escritas não possuem correção automática','','','','','','','Resultados para apreciação pelo professor; não equivalem a frequência oficial.']);
 if(window.JPVisibilidade?.csvRows)rows.push(...JPVisibilidade.csvRows(12));
 rows.push(['DADOS DO RELATÓRIO','','','','Gerado em',new Date().toLocaleString('pt-BR'),'Sem exigência de código','','','','','']);
 const data='\uFEFF'+rows.map(r=>r.map(csvEscape).join(';')).join('\r\n');
 const link=document.createElement('a'),url=URL.createObjectURL(new Blob([data],{type:'text/csv;charset=utf-8'}));
 link.href=url;link.download='JP-busca-ativa-multidisciplinar-9ano-1bimestre-'+(final?'final':'parcial')+'-'+new Date().toISOString().slice(0,10)+'.csv';
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
