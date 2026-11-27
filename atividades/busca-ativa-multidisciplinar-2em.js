'use strict';
/* JP Recomposição — Busca Ativa Multidisciplinar, 2º ano Ensino Médio.
 * Preserva as 23 questões e a opção correta do material institucional.
 * As alternativas são redistribuídas de modo estável para reduzir padrões.
 * Registro exclusivamente local e CSV sem código.
 */
const $=id=>document.getElementById(id);
const missions=[{"n":1,"subject":"Eletiva de Base","text":"As eletivas de base contribuem para a formação do estudante quando:","options":["Ampliam conhecimentos e possibilitam o desenvolvimento de habilidades relacionadas a diferentes interesses.","Substituem todas as disciplinas da formação geral.","Trabalham somente conteúdos para provas.","Limitam a autonomia do estudante."],"lesson":"As eletivas de base ampliam experiências, interesses e habilidades e não substituem a formação geral.","example":"Imagine uma eletiva de comunicação escolar: alunos podem exercitar pesquisa, produção de conteúdo e colaboração, ampliando aprendizagens de outras disciplinas.","hint":"Reflita sobre autonomia e ampliação de possibilidades; a eletiva não elimina componentes obrigatórios.","correct":0},{"n":2,"subject":"Eletiva Pré-Itinerário Formativo – LGG","text":"Uma proposta de criação de podcast sobre temas sociais, com pesquisa, roteiro e apresentação oral, mobiliza principalmente competências da área de:","options":["Linguagens e suas Tecnologias.","Ciências da Natureza exclusivamente.","Matemática exclusivamente.","Educação Física exclusivamente."],"lesson":"Linguagens e suas Tecnologias abrange práticas de comunicação, produção de textos, oralidade e mídias.","example":"Na criação de um podcast, estudantes pesquisam informações, escrevem roteiro, organizam ideias e gravam falas para um público.","hint":"Identifique as ações envolvidas: escrita, oralidade e comunicação em mídias.","correct":0},{"n":3,"subject":"Eletiva Pré-Itinerário Formativo – CHSA","text":"Para analisar um problema social considerando aspectos históricos, culturais, políticos e territoriais, é adequado integrar conhecimentos de:","options":["Ciências Humanas e Sociais Aplicadas.","Apenas Ciências da Natureza.","Apenas Matemática.","Apenas Arte."],"lesson":"Ciências Humanas e Sociais Aplicadas analisa sociedades, culturas, territórios, relações de poder e processos históricos.","example":"Investigar mobilidade urbana pode exigir Geografia para examinar o espaço, História para contextualizar transformações e Sociologia para analisar desigualdades.","hint":"Procure a área que estuda relações sociais, espaços, culturas e acontecimentos históricos.","correct":0},{"n":4,"subject":"Eletiva Pré-Itinerário Formativo – MAT/CNT","text":"Uma pesquisa sobre consumo de energia pode utilizar gráficos, cálculos de consumo e conhecimentos sobre transformações de energia. Essa proposta integra:","options":["Matemática e Ciências da Natureza.","Apenas Literatura.","Apenas História.","Apenas Educação Física."],"lesson":"Questões reais podem exigir cálculos, gráficos e investigação de fenômenos naturais. Matemática e Ciências da Natureza trabalham juntas nessas situações.","example":"Em uma escola, a Matemática compara consumos em kWh e constrói gráficos; a Física examina potência e transformações de energia.","hint":"Separe duas partes da investigação: dados numéricos e conhecimento sobre a natureza da energia.","correct":0},{"n":5,"subject":"Filosofia","text":"Ao analisar uma afirmação filosófica, comparar argumentos e questionar pressupostos, o estudante desenvolve:","options":["Reflexão crítica.","Aceitação passiva de ideias.","Memorização sem compreensão.","Apenas opinião pessoal sem argumentos."],"lesson":"Refletir criticamente significa investigar razões, questionar pressupostos e avaliar a coerência de afirmações.","example":"Diante de 'a tecnologia sempre melhora a vida', a reflexão crítica pergunta: para quem, em quais condições e com quais evidências?","hint":"Pensamento crítico não é concordar automaticamente nem apenas repetir informações.","correct":0},{"n":6,"subject":"Geografia","text":"A urbanização brasileira está relacionada a mudanças econômicas e sociais. Um possível efeito do crescimento urbano acelerado é:","options":["A expansão das áreas urbanas e o aumento de desafios relacionados à infraestrutura e mobilidade.","O desaparecimento das atividades econômicas nas cidades.","A redução automática das desigualdades sociais.","O fim dos deslocamentos populacionais."],"lesson":"Urbanização é o processo de crescimento e transformação da população e dos espaços urbanos, relacionado a mudanças econômicas e sociais.","example":"Com maior concentração populacional, uma cidade pode precisar ampliar transporte, saneamento, moradias e serviços públicos.","hint":"Crescimento urbano rápido costuma ampliar necessidades de infraestrutura; não resolve desigualdades automaticamente.","correct":0},{"n":7,"subject":"História","text":"No século XX, a Guerra Fria foi marcada principalmente por:","options":["Disputa política, ideológica, econômica e tecnológica entre Estados Unidos e União Soviética.","Uma guerra direta e contínua entre todos os países do mundo.","O fim das disputas entre sistemas econômicos.","Uma aliança permanente entre Estados Unidos e União Soviética."],"lesson":"A Guerra Fria envolveu rivalidade entre Estados Unidos e União Soviética em dimensões políticas, ideológicas, econômicas, militares e tecnológicas.","example":"A corrida espacial e a competição armamentista expressaram aspectos da disputa, embora não tenha ocorrido uma guerra direta contínua entre as duas potências.","hint":"Distinga disputa geopolítica prolongada de uma guerra direta entre todos os países.","correct":0},{"n":8,"subject":"Sociologia","text":"A desigualdade social pode ser analisada pela Sociologia considerando fatores como:","options":["Distribuição de renda, acesso a direitos, oportunidades e condições de vida.","Apenas características individuais.","Somente diferenças climáticas.","Apenas preferências pessoais."],"lesson":"A desigualdade social envolve diferenças estruturais de acesso a renda, direitos, educação, saúde, trabalho e oportunidades.","example":"Dois bairros podem apresentar diferenças no acesso a transporte e serviços públicos, afetando oportunidades dos moradores.","hint":"Uma análise sociológica observa condições coletivas, e não apenas escolhas individuais.","correct":0},{"n":9,"subject":"Educação Física","text":"A atividade física regular pode favorecer a qualidade de vida. Para uma prática segura, é importante:","options":["Considerar condições individuais, realizar preparação adequada e respeitar os limites do corpo.","Aumentar a intensidade sem orientação.","Ignorar sinais de dor ou mal-estar.","Priorizar a competição acima da saúde."],"lesson":"A atividade física regular pode trazer benefícios, mas deve respeitar condições individuais, limites do corpo e sinais de desconforto.","example":"Antes de praticar futsal, uma turma pode realizar aquecimento adequado, ajustar intensidade e hidratar-se conforme as condições.","hint":"Segurança e bem-estar importam mais do que forçar intensidade ou ignorar dor.","correct":0},{"n":10,"subject":"Língua Estrangeira – Inglês","text":"Leia: “Although technology makes communication easier, people still need to use it responsibly.” A palavra “Although” introduz uma ideia de:","options":["Concessão.","Causa.","Finalidade.","Conclusão."],"lesson":"Conectivos estabelecem relações entre partes do texto. 'Although' equivale, em muitos contextos, a 'embora' e introduz concessão ou contraste.","example":"'Although it is raining, we can play indoors.' → Embora esteja chovendo, podemos jogar em ambiente fechado.","hint":"Substitua mentalmente 'although' por 'embora' e observe o contraste entre as ideias.","correct":0},{"n":11,"subject":"Língua Portuguesa","text":"Leia: “A informação circula rapidamente nas redes sociais; portanto, é fundamental verificar a fonte antes de compartilhá-la.” A expressão “portanto” indica:","options":["Conclusão.","Oposição.","Condição.","Comparação."],"lesson":"Conectivos organizam as relações de sentido: 'portanto' introduz conclusão decorrente de uma informação anterior.","example":"'Há risco de desinformação; portanto, devemos conferir a fonte' → a segunda oração apresenta uma conclusão.","hint":"Procure o sentido equivalente a 'logo', 'assim' ou 'por isso'.","correct":0},{"n":12,"subject":"Arte","text":"A arte pode dialogar com questões sociais, políticas e culturais. Uma obra que provoca reflexão sobre desigualdade, por exemplo, pode ser compreendida como:","options":["Uma forma de expressão artística que também pode estimular reflexão sobre a sociedade.","Uma produção sem relação com o contexto.","Uma obra que precisa apresentar apenas beleza estética.","Uma manifestação que não comunica ideias."],"lesson":"A arte comunica ideias, sensibilidades e perspectivas, podendo dialogar com problemas sociais e culturais.","example":"Um mural que retrata desigualdades na cidade pode provocar perguntas e discussões sobre oportunidades e direitos.","hint":"Obras artísticas podem expressar mais do que beleza estética.","correct":0},{"n":13,"subject":"Biologia","text":"Na fotossíntese, as plantas utilizam energia luminosa para produzir matéria orgânica. Um dos principais produtos desse processo é:","options":["Glicose.","Nitrogênio atmosférico.","Proteína pronta.","Ácido clorídrico."],"lesson":"Na fotossíntese, organismos fotossintetizantes utilizam energia luminosa para transformar água e dióxido de carbono, produzindo compostos orgânicos, como glicose, e liberando oxigênio em condições típicas.","example":"A glicose produzida pode ser utilizada como fonte de energia e como matéria-prima para outras moléculas na planta.","hint":"Procure um composto orgânico produzido a partir da energia da luz.","correct":0},{"n":14,"subject":"Física","text":"Uma lâmpada de 100 W permanece ligada durante 5 horas. Considerando a relação entre potência e energia, quanto maior o tempo de funcionamento:","options":["Maior será a energia elétrica consumida.","Menor será sempre a energia consumida.","A potência da lâmpada se torna zero.","A energia consumida não sofre alteração."],"lesson":"A energia consumida depende da potência e do tempo: E = P × t, mantendo unidades compatíveis.","example":"Uma lâmpada de 100 W = 0,1 kW ligada por 5 horas consome 0,5 kWh. Ligada por 10 horas, consome 1 kWh.","hint":"Se a potência não muda, dobrar o tempo dobra a energia consumida.","correct":0},{"n":15,"subject":"Química","text":"Uma solução apresenta pH igual a 3. Em comparação com uma solução de pH 7, ela é:","options":["Mais ácida.","Mais básica.","Neutra.","Necessariamente um sal."],"lesson":"O pH é uma medida relacionada à acidez ou basicidade de soluções aquosas. Em condições usuais próximas de 25 °C, pH abaixo de 7 indica acidez e pH 7 é neutro.","example":"Uma solução com pH 3 é mais ácida do que uma solução neutra de pH 7.","hint":"Quanto menor o pH, maior a acidez, para soluções aquosas comparáveis.","correct":0},{"n":16,"subject":"Matemática","text":"Uma função quadrática é dada por f(x) = x² - 5x + 6. As raízes dessa função são:","options":["2 e 3.","1 e 6.","-2 e -3.","5 e 6."],"lesson":"As raízes de uma função quadrática são os valores de x para os quais f(x) = 0. Pode-se usar fatoração ou a fórmula resolutiva.","example":"x² − 5x + 6 = (x − 2)(x − 3). Assim, as raízes são 2 e 3, pois tornam o produto zero.","hint":"Procure dois números com soma 5 e produto 6; confira substituindo-os na função.","correct":0},{"n":17,"subject":"Estudo Orientado","text":"Para organizar estudos de conteúdos mais complexos, uma estratégia eficiente é:","options":["Dividir o conteúdo em etapas, estabelecer metas e revisar periodicamente.","Concentrar todo o estudo em um único dia.","Estudar somente o que já domina.","Evitar exercícios para economizar tempo."],"lesson":"O estudo orientado organiza o trabalho em etapas, com metas alcançáveis, exercícios, intervalos adequados e revisão espaçada.","example":"Para estudar equações, organize três sessões: conceitos e exemplos, exercícios guiados e revisão dos erros encontrados.","hint":"Metas pequenas e revisão periódica favorecem acompanhamento e consolidação.","correct":0},{"n":18,"subject":"Avaliação Semanal","text":"Ao analisar uma avaliação semanal, o estudante percebe erros recorrentes. O uso pedagógico desse resultado é:","options":["Identificar os pontos de dificuldade e planejar uma nova estratégia de aprendizagem.","Ignorar os erros porque a avaliação já terminou.","Considerar somente a nota.","Evitar novas atividades sobre o assunto."],"lesson":"A avaliação formativa ajuda a identificar dificuldades e orientar o planejamento das próximas aprendizagens, não apenas a atribuir notas.","example":"Se o estudante erra repetidamente questões de porcentagem, pode retomar o conceito, refazer exemplos e praticar situações novas.","hint":"Olhe para a habilidade que precisa de atenção, não somente para a pontuação.","correct":0},{"n":19,"subject":"Prática Experimental","text":"Em uma investigação experimental, a repetição de medidas e o registro organizado dos dados são importantes porque:","options":["Aumentam a confiabilidade da análise e permitem comparar resultados.","Eliminam a necessidade de formular hipóteses.","Garantem que qualquer hipótese esteja correta.","Substituem a interpretação dos resultados."],"lesson":"A repetição de medidas permite observar variações e identificar resultados discrepantes. O registro organizado facilita comparação, interpretação e avaliação de hipóteses.","example":"Ao medir três vezes o tempo de um deslocamento, a turma pode comparar resultados, calcular uma média e discutir possíveis fontes de variação.","hint":"Experimento confiável não dispensa interpretação nem transforma qualquer hipótese em verdade.","correct":0},{"n":20,"subject":"Tutoria","text":"Na tutoria, o acompanhamento do estudante deve favorecer:","options":["Autoconhecimento, organização, definição de metas e acompanhamento do próprio percurso.","Dependência constante de outras pessoas.","Apenas o controle das notas.","A realização das tarefas por outra pessoa."],"lesson":"Tutoria pedagógica envolve escuta, autoconhecimento, planejamento de metas e acompanhamento da autonomia do estudante.","example":"Com apoio do tutor, o estudante identifica dificuldade em leitura, define uma meta semanal e acompanha o próprio progresso.","hint":"O estudante precisa participar ativamente das decisões e de seu percurso de aprendizagem.","correct":0},{"n":21,"subject":"Literatura e Produção de Texto","text":"Em um texto dissertativo-argumentativo, a tese corresponde:","options":["À ideia ou posição central que será defendida ao longo do texto.","Apenas ao título.","À lista de palavras desconhecidas.","Somente à conclusão, sem relação com os argumentos."],"lesson":"Em um texto argumentativo, a tese é a posição central do autor; argumentos justificam essa posição, e a conclusão pode retomá-la.","example":"Tese: 'A prática de leitura precisa ser incentivada'. Argumento: 'O acesso a livros amplia repertórios e oportunidades de interpretação'.","hint":"Tese e argumento não são sinônimos: a tese é a ideia defendida; o argumento explica por quê.","correct":0},{"n":22,"subject":"Resolução de Problemas","text":"Em uma situação-problema matemática, depois de encontrar uma solução é importante:","options":["Verificar se o resultado responde à pergunta e se é coerente com os dados.","Encerrar imediatamente sem conferir.","Alterar os dados para obter outro resultado.","Ignorar as unidades utilizadas."],"lesson":"Resolver problemas envolve compreender, planejar, executar e conferir. A unidade de medida e a plausibilidade do resultado são parte da resposta.","example":"Se uma turma precisa de 24 bolas distribuídas igualmente por 6 caixas, calcula 4 por caixa e verifica: 6 × 4 = 24.","hint":"Conferir a resposta não é etapa opcional: compare o resultado com os dados e o que foi perguntado.","correct":0},{"n":23,"subject":"Projeto de Vida","text":"No Ensino Médio, o projeto de vida pode ajudar o estudante a:","options":["Relacionar interesses, valores, escolhas acadêmicas e profissionais a metas e ações planejadas.","Definir uma única profissão sem possibilidade de mudança.","Pensar apenas no presente.","Deixar suas escolhas exclusivamente para outras pessoas."],"lesson":"Projeto de vida articula autoconhecimento, interesses, valores e metas de estudo, trabalho e participação social. Planos podem ser revisitados e ajustados.","example":"Quem deseja seguir na área de saúde pode planejar estudos, pesquisar possibilidades formativas e conversar com profissionais, revendo metas conforme aprende.","hint":"Um projeto de vida é flexível e depende de escolhas conscientes e ações próprias.","correct":0}];

const miniChecks=[["Uma eletiva pode desenvolver habilidades que também ajudam em outros componentes?","Sim, pode ampliar interesses e conhecimentos.","Não, deve substituir toda a formação geral."],["A produção de um podcast mobiliza principalmente que tipo de prática?","Comunicação oral, escrita e uso de mídias.","Somente cálculos de funções."],["Para compreender desigualdade em uma cidade, é adequado considerar história e território?","Sim, integrar diferentes dimensões sociais.","Não, observar apenas uma fórmula matemática."],["Em uma pesquisa de energia, quem ajuda a interpretar tabelas e gráficos?","A Matemática, junto a conhecimentos científicos.","Somente a análise de personagens literários."],["Questionar uma afirmação exige avaliar suas razões?","Sim, o pensamento crítico examina argumentos.","Não, significa concordar sem pensar."],["O crescimento urbano pode exigir mais serviços e mobilidade?","Sim, com planejamento de infraestrutura.","Não, elimina automaticamente a necessidade de transportes."],["A Guerra Fria envolveu diferentes áreas além da disputa militar?","Sim, incluiu rivalidades ideológicas e tecnológicas.","Não, limitou-se a uma única batalha direta."],["Para estudar desigualdade, é relevante observar acesso a serviços?","Sim, direitos e oportunidades fazem parte da análise.","Não, apenas preferências individuais importam."],["Uma prática esportiva segura deve respeitar os limites de cada pessoa?","Sim, observando sinais do corpo e condições individuais.","Não, ignorando dores e sinais de mal-estar."],["Na frase 'Although I am tired, I will study', há contraste?","Sim, 'although' pode significar 'embora'.","Não, é uma expressão de soma obrigatória."],["'Portanto' introduz uma ideia que decorre do que foi dito?","Sim, geralmente uma conclusão.","Não, necessariamente uma comparação."],["Uma obra de arte pode expressar ideias sociais?","Sim, além de suas dimensões estéticas.","Não, arte nunca comunica posições ou temas."],["A fotossíntese produz compostos orgânicos usando luz?","Sim, a glicose é um exemplo.","Não, utiliza luz apenas para formar sal de cozinha."],["Se a potência fica constante, aumentar o tempo aumenta o consumo?","Sim, porque energia = potência × tempo.","Não, o tempo não influencia a energia."],["Uma solução aquosa de pH 3 costuma ser ácida?","Sim, comparada com a solução neutra de pH 7.","Não, em geral é mais básica que pH 7."],["Se (x − 2)(x − 3) = 0, os valores 2 e 3 zeram o produto?","Sim, pois ao menos um fator fica zero.","Não, porque a soma dos dois é 5."],["Revisar aos poucos pode ajudar mais que estudar tudo de uma vez?","Sim, com metas e prática periódica.","Não, só vale estudar um único dia."],["Os erros de uma avaliação podem orientar o próximo estudo?","Sim, identificando habilidades a retomar.","Não, servem apenas para encerrar o assunto."],["A repetição de medidas permite perceber variações?","Sim, e ajuda na comparação dos resultados.","Não, elimina toda necessidade de interpretar dados."],["Uma tutoria de qualidade incentiva a autonomia do estudante?","Sim, com metas e reflexão sobre o percurso.","Não, ao fazer as tarefas no lugar do estudante."],["Os argumentos devem sustentar a tese de um texto?","Sim, justificando a posição central.","Não, a tese equivale somente ao título."],["Conferir a unidade e a coerência faz parte de resolver problemas?","Sim, antes de aceitar o resultado.","Não, basta encontrar qualquer número."],["O projeto de vida pode ser revisto com novas experiências?","Sim, escolhas e metas podem ser ajustadas.","Não, toda escolha profissional deve ser irreversível."]];
const stationInfo=[
 {label:'Itinerários e protagonismo',from:1,to:4,icon:'🧭'},
 {label:'Sociedade, história e convivência',from:5,to:9,icon:'🌎'},
 {label:'Linguagens e expressão',from:10,to:12,icon:'📚'},
 {label:'Ciências e Matemática',from:13,to:16,icon:'🔬'},
 {label:'Estratégias de aprendizagem',from:17,to:20,icon:'🎯'},
 {label:'Textos, problemas e futuro',from:21,to:23,icon:'🚀'}
];
const key=window.JPTrilha?.progressKey('jp_busca_ativa_2em_23_v1')||'jp_busca_ativa_2em_23_v1';
const localStore=window.JPTrilha?.progressStorage()||sessionStorage;
const fresh=()=>({index:0,started:false,answers:{},tries:{},hints:{},openedLessons:{},startedAt:new Date().toISOString()});
let state=fresh(),reviewOnly=false;
try{
 const data=JSON.parse(localStore.getItem(key)||'null');
 if(data&&Number.isInteger(data.index)&&data.index>=0&&data.index<=23&&data.answers&&data.tries&&data.openedLessons)state={...fresh(),...data};
}catch(error){}
const report=window.JPBuscaRelatorio?.create('busca-ativa-multidisciplinar-2em',()=>state.report,()=>localStore.setItem(store,JSON.stringify(state)),(msg,retry)=>{$('md-report-status').textContent=msg;$('md-report-sync').hidden=!retry;});
$('md-report-sync').addEventListener('click',()=>report?.sync());
if(state.started&&state.report)report?.resume();
const save=()=>{try{localStore.setItem(key,JSON.stringify(state));$('md-start-status').textContent='Progresso salvo neste navegador.'}catch(e){$('md-start-status').textContent='Salvamento indisponível. Baixe um relatório parcial antes de sair.'}};
const item=()=>missions[Math.min(state.index,22)];
const complete=()=>missions.filter(m=>state.answers[m.n]?.complete).length;
const station=n=>stationInfo.findIndex(x=>n>=x.from&&n<=x.to);
const go=id=>$(id).scrollIntoView({block:'start',behavior:'smooth'});
function screen(name){
 ['md-start','md-progress-area','md-lesson','md-question-card','md-application','md-finish'].forEach(id=>$(id).hidden=true);
 if(name==='start'){$('md-start').hidden=false;return}
 $('md-progress-area').hidden=false;
 $('md-'+name).hidden=false;
}
function hud(){
 $('md-progress-text').textContent=state.index===23?'23 de 23 questões':'Desafio '+(state.index+1)+' de 23';
 $('md-progress-complete').textContent=complete()+' / 23 concluídos';
 $('md-progress-fill').style.width=Math.round(complete()/23*100)+'%';
 const pills=$('md-progress-pills');pills.replaceChildren();
 stationInfo.forEach((group,i)=>{
  const span=document.createElement('span'),finished=missions.filter(m=>station(m.n)===i&&state.answers[m.n]?.complete).length;
  span.textContent=group.icon;span.title=group.label+': '+finished+' / '+(group.to-group.from+1);
  span.className=finished===group.to-group.from+1?'passed':state.index<23&&station(item().n)===i?'current':'';
  pills.append(span);
 });
}
function show(){
 if(!state.started){screen('start');return}
 hud();
 if(state.index>=23){finish();return}
 if(!state.openedLessons[item().n]){renderLesson();return}
 renderQuestion();
}
function lessonFeedback(msg,good){const x=$('md-lesson-feedback');x.className='md-feedback'+(good?'':' warn');x.textContent=msg}
function renderLesson(){
 const m=item(),group=stationInfo[station(m.n)];
 screen('lesson');
 $('md-lesson-kicker').textContent='MINIAULA '+m.n+' / 23 · '+group.icon+' '+group.label.toUpperCase();
 $('md-lesson-title').textContent=m.subject+': entenda o conceito';
 $('md-lesson-text').textContent=m.lesson+' '+(window.JP2EMAprofundamento?.[m.n-1]?.depth||'');
 $('md-deep-method').textContent=window.JP2EMAprofundamento?.[m.n-1]?.method||m.hint;
 $('md-deep-mistake').textContent=window.JP2EMAprofundamento?.[m.n-1]?.misconception||'Reveja o conceito antes de responder.';
 $('md-lesson-example').textContent=m.example;
 $('md-lesson-tip').textContent=m.hint;
 $('md-lesson-check').textContent=miniChecks[m.n-1][0];
 $('md-lesson-options').replaceChildren();
 const done=Boolean(state.openedLessons[m.n]);
 const check=miniChecks[m.n-1];
 const opts=m.n%2===0?[check[2],check[1]]:[check[1],check[2]];
 const right=m.n%2===0?1:0;
 opts.forEach((label,i)=>{
  const b=document.createElement('button');b.type='button';b.className='md-choice';b.textContent=String.fromCharCode(65+i)+') '+label;
  b.disabled=done;if(done&&i===right)b.classList.add('correct');
  b.addEventListener('click',()=>{
   if(i===right){state.openedLessons[m.n]=true;save();renderLesson()}
   else{b.disabled=true;b.classList.add('wrong');lessonFeedback('📘 Releia o exemplo e a explicação. Compare com o conceito estudado e tente novamente.',false)}
  });
  $('md-lesson-options').append(b);
 });
 $('md-lesson-next').disabled=!done;
 $('md-lesson-next').textContent=reviewOnly?'Voltar ao desafio →':'Aplicar o que aprendi →';
 lessonFeedback(done?'✅ Sua compreensão foi verificada. Agora aplique o conceito na questão.':'Analise a situação e selecione a resposta correta antes de avançar.',done);
 go('md-lesson');
}
$('md-lesson-next').addEventListener('click',()=>{if(!state.openedLessons[item().n])return;reviewOnly=false;renderQuestion()});
function shuffled(m){
 // Ordenação estável por número do desafio e do navegador, sem expor padrão A.
 const positions=[[2,0,3,1],[1,3,0,2],[3,2,1,0],[0,2,1,3]];
 const order=positions[(m.n*7+Math.floor((m.n-1)/4))%positions.length];
 return order.map(ix=>({label:m.options[ix],original:ix}));
}
function feedback(text,good){const el=$('md-question-feedback');el.className='md-feedback'+(good?'':' warn');el.textContent=text}
function renderQuestion(){
 const m=item(),group=stationInfo[station(m.n)],done=Boolean(state.answers[m.n]?.complete);
 screen('question-card');
 $('md-question-subject').textContent=group.icon+' '+group.label.toUpperCase()+' · '+m.subject.toUpperCase();
 $('md-question-type').textContent='QUESTÃO INSTITUCIONAL · 1ª ETAPA';
 $('md-question-title').textContent='Tema '+m.n+' de 23 · Etapa 1 de 2';
 $('md-question-context').textContent='📘 Para pensar: '+m.lesson;
 $('md-question-text').textContent=m.text;
 $('md-question-options').replaceChildren();
 $('md-written').hidden=true;
 $('md-question-submit').hidden=true;
 $('md-question-next').disabled=!done;
 $('md-question-next').textContent='Aplicar em uma nova situação →';
 const opts=shuffled(m);
 opts.forEach((option,i)=>{
  const b=document.createElement('button');b.type='button';b.className='md-choice';
  b.textContent=String.fromCharCode(65+i)+') '+option.label;
  if(done){b.disabled=true;if(option.original===m.correct)b.classList.add('correct')}
  else b.addEventListener('click',()=>{
   if(state.answers[m.n]?.complete)return;
   state.tries[m.n]=(state.tries[m.n]||0)+1;
   if(option.original===m.correct){
    state.answers[m.n]={complete:true,choice:option.label,letter:String.fromCharCode(65+i),tries:state.tries[m.n],hints:state.hints[m.n]||0,correct:m.options[m.correct]};
    save();hud();renderQuestion();feedback('✅ Correto! '+m.lesson,true);
   }else{
    b.classList.add('wrong');b.disabled=true;
    feedback('🔎 Ainda não. '+m.hint+' Revise o exemplo e tente outra alternativa.',false);save();
   }
  });
  $('md-question-options').append(b);
 });
 feedback(done?'✅ Resposta correta registrada. '+m.lesson:'Escolha a alternativa que melhor aplica o conceito. Em caso de erro, você receberá uma orientação.',done);
 go('md-question-card');
}
$('md-question-hint').addEventListener('click',()=>{
 if(state.index>=23)return;const m=item();
 state.hints[m.n]=(state.hints[m.n]||0)+1;save();
 feedback('💡 '+m.hint,false);
});
$('md-question-revise').addEventListener('click',()=>{if(state.index>=23)return;reviewOnly=true;renderLesson()});
$('md-question-next').addEventListener('click',()=>{if(state.index>=23||!state.answers[item().n]?.complete)return;state.index++;save();show()});
$('md-start-btn').addEventListener('click',()=>{if(!state.started)state.report=report?.start();state.started=true;save();show()});
function exportCSV(final=false){
 const rows=[['Tipo','Número','Circuito','Componente','Enunciado','Resposta registrada','Gabarito','Tentativas','Dicas','Situação','Observação pedagógica']];
 for(const m of missions){
  const a=state.answers[m.n];if(!a?.complete)continue;
  rows.push(['Resposta',m.n,stationInfo[station(m.n)].label,m.subject,m.text,a.choice,m.options[m.correct],a.tries,a.hints,'Concluída',m.lesson]);
 }
 const applied=window.JP2EMDesafios?.results?.()||{};
 if(report)rows.push(...report.rows(complete()+Object.values(applied).filter(x=>x.complete).length,!!state.report?.finishedAt||state.index>=23));
 const extras=window.JP2EMAprofundamento||[];
 for(const a of extras){const result=applied[a.n];if(!result?.complete)continue;rows.push(['APLICAÇÃO',a.n,stationInfo[station(a.n)].label,missions[a.n-1].subject,a.question,result.selected,a.options[a.correct],result.tries,result.hints,'Concluída',a.reason]);}
 rows.push(['SÍNTESE','','','','Questões institucionais concluídas',complete()+' / 23','Aplicações concluídas',Object.values(applied).filter(x=>x.complete).length+' / 23','Acertos na primeira tentativa (institucionais)',missions.filter(m=>state.answers[m.n]?.tries===1).length,'']);
 rows.push(['SÍNTESE APLICAÇÃO','','','','Acertos na primeira tentativa (aplicações)',Object.values(applied).filter(x=>x.complete&&x.tries===1).length,'Questões totais resolvidas',complete()+Object.values(applied).filter(x=>x.complete).length,'','','']);
 rows.push(['CRITÉRIO','','','','Respostas corrigidas com devolutivas e tentativas adicionais','Não equivale a nota ou frequência oficial','','','','','']);
 rows.push(['IDENTIFICAÇÃO','','','','Nome (opcional)',$('md-student')?.value.trim()||'','Turma (opcional)',$('md-class')?.value.trim()||'','','','']);
 if(window.JPVisibilidade?.snapshot){
  const p=JPVisibilidade.snapshot();
  rows.push(['VISIBILIDADE','','','','Vezes que a página ficou oculta',p.saidas,'Tempo em segundo plano (s)',p.segundos,'','','Ocultar a aba não comprova pesquisa indevida.']);
 }
 rows.push(['RELATÓRIO','','','','Data de geração',new Date().toLocaleString('pt-BR'),'','','','','Sem cadastro ou código de participação']);
 function csv(v){let s=String(v??'').replace(/[\r\n]+/g,' ').trim();if(/^[=+@\t-]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
 const content='\uFEFF'+rows.map(r=>r.map(csv).join(';')).join('\r\n');
 const url=URL.createObjectURL(new Blob([content],{type:'text/csv;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download='JP-busca-ativa-2ano-EM-'+(final?'final':'parcial')+'-'+new Date().toISOString().slice(0,10)+'.csv';
 document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1800);
 $('md-start-status').textContent='Relatório salvo no aparelho. O download, por si só, não envia as respostas à coordenação.';
 $('md-export-feedback').textContent='Arquivo baixado. Entregue ao professor pelo canal orientado pela escola.';
}
$('md-progress-btn').addEventListener('click',()=>exportCSV(false));
$('md-export-now').addEventListener('click',()=>exportCSV(false));
$('md-download-final').addEventListener('click',()=>{exportCSV(true);report?.sync();});
function finish(){
 screen('finish');hud();
 const first=missions.filter(m=>state.answers[m.n]?.tries===1).length;
 const extra=Object.values(window.JP2EMDesafios?.results?.()||{});
 const applied=extra.filter(x=>x.complete).length;
 const firstApplication=extra.filter(x=>x.complete&&x.tries===1).length;
 $('md-finish-text').textContent='Você concluiu '+complete()+' das 23 questões institucionais e '+applied+' dos 23 desafios de aplicação: '+(complete()+applied)+' atividades resolvidas. Acertos na primeira tentativa: '+first+' nas questões originais e '+firstApplication+' nas aplicações. Baixe o relatório com as duas etapas e as estratégias trabalhadas.';
 if(complete()+applied===46){report?.end({solved:46,total:46,objective:46,first:first+firstApplication,written:0,hints:Object.values(state.hints).reduce((n,x)=>n+(Number(x)||0),0)+extra.reduce((n,x)=>n+(Number(x.hints)||0),0)});report?.sync();}
 go('md-finish');
}
$('md-restart').addEventListener('click',()=>{
 if(!confirm('Recomeçar as 23 questões e apagar o progresso deste navegador? Baixe o relatório antes, se desejar preservar as respostas.'))return;
 report?.clear();state=fresh();reviewOnly=false;window.JP2EMDesafios?.reset?.();save();show();window.scrollTo({top:0,behavior:'smooth'});
});
show();
