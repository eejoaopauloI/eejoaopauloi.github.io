/* JP Recomposição — percurso pedagógico antes e durante as atividades.
   Adiciona miniaula, exemplos e checagens conceituais sem alterar motores dos jogos. */
(()=>{'use strict';
const path=location.pathname.split('/').pop().toLowerCase();
const lessons={
'areas-malha-geogebra.html':{
 title:'Missão Geometria · Antes de calcular, compreender a área',
 subtitle:'Geometria · medidas de superfície · malha quadriculada',
 stages:[
 {name:'O que é área?',lead:'Área é a quantidade de superfície ocupada por uma figura. Não é o mesmo que perímetro, que mede o contorno.',example:'Um piso formado por 6 quadradinhos de 1 cm² tem área 6 cm². Já o contorno é medido em centímetros.',formula:'Área: quadradinhos dentro da figura\nPerímetro: lados ao redor dela',ask:'Se uma figura cobre exatamente 8 quadradinhos de 1 cm², qual é sua área?',options:['8 cm²','8 cm','16 cm²'],correct:0,feedback:'Cada quadradinho representa uma unidade de área. Somamos 8 unidades de superfície.'},
 {name:'Como a malha ajuda?',lead:'Na malha, você pode contar quadradinhos inteiros e combinar partes. Em regiões retangulares, linhas e colunas tornam a contagem mais rápida.',example:'Um retângulo com 3 linhas e 4 colunas ocupa 3 × 4 = 12 quadradinhos. Se cada quadradinho equivale a 1 cm², a área é 12 cm².',formula:'Área do retângulo = base × altura\n4 cm × 3 cm = 12 cm²',ask:'Quantos quadradinhos ocupa um retângulo com 5 colunas e 2 linhas?',options:['10','7','14'],correct:0,feedback:'São 2 grupos de 5 quadradinhos: 2 × 5 = 10.'},
 {name:'Por que o triângulo é diferente?',lead:'Um triângulo pode ser metade de um retângulo de mesma base e altura. Por isso, multiplicamos base por altura e dividimos por 2.',example:'Um triângulo de base 6 cm e altura 4 cm corresponde à metade de um retângulo de área 24 cm².',formula:'A = (base × altura) ÷ 2\nA = (6 × 4) ÷ 2 = 12 cm²',ask:'Qual é a área de um triângulo com base 8 cm e altura 3 cm?',options:['12 cm²','24 cm²','11 cm²'],correct:0,feedback:'O retângulo teria 24 cm²; a metade é 12 cm².'},
 {name:'Construir e conferir',lead:'Nas construções, a figura precisa ser fechada e os vértices devem estar na malha. A forma pode mudar sem que a área necessariamente mude.',example:'Dois retângulos de 2 × 6 e 3 × 4 têm formas diferentes, mas ambos ocupam 12 quadradinhos de 1 cm².',formula:'2 × 6 = 12 cm²\n3 × 4 = 12 cm²',ask:'Dois retângulos diferentes podem ter a mesma área?',options:['Sim, se ocuparem a mesma superfície.','Não, a forma determina uma área única.','Só se tiverem o mesmo perímetro.'],correct:0,feedback:'A área mede a superfície ocupada, não a aparência ou a medida do contorno.'}
 ],
 references:[['Área e perímetro','Área mede dentro; perímetro mede ao redor.'],['Malha 1 × 1','Cada quadrado unitário equivale a 1 unidade quadrada.'],['Retângulo','Base × altura.'],['Triângulo','(Base × altura) ÷ 2.']]
},
'circuito-tabuada.html':{
 title:'Circuito da Tabuada · Aprenda a multiplicar compreendendo',
 subtitle:'Matemática · agrupamentos · raciocínio multiplicativo',
 stages:[
 {name:'Multiplicar é formar grupos iguais',lead:'A multiplicação representa uma quantidade de grupos com o mesmo número de elementos. Não é necessário começar decorando a tabuada.',example:'Em 3 equipes com 4 jogadores em cada uma, há 4 + 4 + 4 = 12 jogadores.',formula:'3 grupos de 4 = 3 × 4 = 12',ask:'Quatro caixas com 3 bolas em cada uma têm quantas bolas?',options:['12 bolas','7 bolas','9 bolas'],correct:0,feedback:'Há 4 grupos iguais de 3: 3 + 3 + 3 + 3 = 12.'},
 {name:'Saltos na reta numérica',lead:'Cada salto representa a mesma quantidade. A multiplicação indica quantos saltos damos e o tamanho de cada salto.',example:'Para 4 × 3, saímos de 0 e damos quatro saltos de 3: 3, 6, 9, 12.',formula:'0 → 3 → 6 → 9 → 12',ask:'Três saltos de 5, partindo do zero, terminam em:',options:['15','8','10'],correct:0,feedback:'Cinco, dez, quinze: 3 × 5 = 15.'},
 {name:'Linhas e colunas',lead:'Uma disposição em linhas e colunas permite visualizar o produto. Girar o arranjo não altera o total de objetos.',example:'Três linhas de cinco fichas formam 15 fichas; cinco linhas de três fichas também formam 15.',formula:'3 × 5 = 5 × 3 = 15',ask:'Um arranjo de 2 linhas e 7 colunas contém:',options:['14 elementos','9 elementos','7 elementos'],correct:0,feedback:'Cada uma das 2 linhas contém 7 elementos: 2 × 7 = 14.'},
 {name:'Decompor para calcular',lead:'Quando uma conta parece difícil, divida um fator em partes conhecidas e some os resultados.',example:'Para 6 × 7, pense em 6 × 5 + 6 × 2 = 30 + 12.',formula:'6 × (5 + 2) = 30 + 12 = 42',ask:'Quanto é 4 × 8, pensando em 4 × 5 + 4 × 3?',options:['32','27','35'],correct:0,feedback:'4 × 5 = 20 e 4 × 3 = 12; somando, 32.'}
 ],
 references:[['Grupos iguais','Número de grupos × elementos por grupo.'],['Saltos','Somar a mesma quantidade repetidamente.'],['Arranjos','Linhas × colunas.'],['Decomposição','Distribuir: a × (b+c) = ab+ac.']]
},
'detetives-texto.html':{
 title:'Detetives do Texto · Aprenda a ler nas entrelinhas',
 subtitle:'Língua Portuguesa · inferência · evidência textual',
 stages:[
 {name:'O explícito e o implícito',lead:'Informação explícita está escrita diretamente; informação implícita pode ser concluída por pistas. Inferir não é inventar uma história.',example:'“Pedro entrou encharcado e deixou o guarda-chuva na porta.” Está explícito que ele entrou encharcado. É possível inferir que havia chuva.',formula:'Pistas do texto + relação coerente = inferência',ask:'O que podemos inferir de “Ana bocejou várias vezes e apoiou a cabeça na carteira”?',options:['Ana provavelmente estava com sono.','Ana ganhou um prêmio.','A sala estava vazia.'],correct:0,feedback:'Bocejar e apoiar a cabeça são pistas compatíveis com sonolência.'},
 {name:'Como justificar uma conclusão?',lead:'Uma boa inferência precisa de evidências observáveis. Procure expressões do texto que sustentem sua interpretação.',example:'Se um personagem sorri e abraça os colegas após uma notícia, isso sustenta a hipótese de alegria.',formula:'Conclusão: sentiu alegria\nPistas: sorriu + abraçou os colegas',ask:'Qual pista melhor sustenta que alguém estava apressado?',options:['Olhou o relógio e correu até o portão.','Usava uma camiseta azul.','Havia um banco na praça.'],correct:0,feedback:'Relógio e corrida são ações relacionadas à pressa.'},
 {name:'Evitar interpretações sem base',lead:'Às vezes há mais de uma hipótese possível, mas a melhor é a que exige menos suposições e se apoia nas pistas fornecidas.',example:'“Marina levou uma caixa embrulhada e escondeu-a na mochila.” Não podemos afirmar o conteúdo da caixa.',formula:'Se o texto não informa, não invente detalhes.',ask:'O texto diz apenas que há um pacote fechado. Qual conclusão é responsável?',options:['Ainda não sabemos o que há dentro.','Com certeza há um bolo.','Com certeza há uma bola.'],correct:0,feedback:'A leitura responsável reconhece limites da evidência.'},
 {name:'Investigar emoções, intenções e causas',lead:'Palavras, gestos, mudanças no ambiente e sequência dos fatos ajudam a compreender emoções, objetivos e consequências.',example:'O céu escureceu; o professor interrompeu o treino e levou a turma ao ginásio. A sequência sugere precaução diante de possível chuva.',formula:'Fato 1 → reação → inferência sustentada',ask:'Qual é a interpretação mais sustentada se o professor recolhe as bolas ao ver nuvens escuras?',options:['Queria proteger a turma do mau tempo.','Estava organizando uma festa.','O time já ganhou o campeonato.'],correct:0,feedback:'A reação do professor está ligada à mudança do tempo.'}
 ],
 references:[['Explícito','O texto afirma diretamente.'],['Implícito','Podemos concluir por indícios.'],['Evidência','Trecho que sustenta a conclusão.'],['Cuidado','Não crie fatos que o texto não informa.']]
},
'inteiros.html':{
 title:'Números Inteiros · Descubra os sinais antes dos desafios',
 subtitle:'Matemática · números positivos e negativos · 20 questões',
 stages:[
 {name:'O que são números inteiros?',lead:'Inteiros incluem números negativos, zero e positivos. Eles aparecem em temperaturas, andares, saldos e resultados de jogos.',example:'Um saldo de −5 representa 5 unidades abaixo de zero; +5 representa 5 unidades acima de zero.',formula:'… −3, −2, −1, 0, +1, +2, +3 …',ask:'Qual número representa uma dívida de 8 reais?',options:['−8','+8','0'],correct:0,feedback:'Uma dívida pode ser representada por um saldo negativo.'},
 {name:'Comparar e ordenar',lead:'Na reta numérica, os números aumentam da esquerda para a direita. Entre dois negativos, o mais perto de zero é maior.',example:'−2 é maior do que −7 porque está à direita de −7 na reta.',formula:'−7 < −2 < 0 < +3',ask:'Qual é o maior número?',options:['−1','−5','−9'],correct:0,feedback:'−1 está mais à direita e é o mais próximo de zero.'},
 {name:'Somar e subtrair inteiros',lead:'Somar um número positivo avança na reta; somar um negativo recua. Subtrair um número equivale a somar seu oposto.',example:'−3 + 5 = 2. Já 4 − (−2) = 4 + 2 = 6.',formula:'a − b = a + (−b)',ask:'Quanto é −4 + 7?',options:['3','−11','−3'],correct:0,feedback:'Partindo de −4, avançamos 7 unidades e chegamos a 3.'},
 {name:'Multiplicar e dividir com sinais',lead:'Com sinais iguais, o resultado de multiplicação ou divisão é positivo; com sinais diferentes, é negativo.',example:'(−3) × (−4) = +12. Já (−12) ÷ (+3) = −4.',formula:'(−) × (−) = (+)\n(−) × (+) = (−)',ask:'Qual é o resultado de (−5) × 3?',options:['−15','15','−8'],correct:0,feedback:'Sinais diferentes dão produto negativo: 5 × 3 = 15; portanto, −15.'}
 ],
 references:[['Reta numérica','Números maiores ficam à direita.'],['Soma','Soma de opostos pode resultar em zero.'],['Subtração','Subtrair é somar o oposto.'],['Produtos','Sinais iguais: +; diferentes: −.']]
},
'laboratorio-inteiros.html':{
 title:'Laboratório dos Inteiros · Compreenda cada operação',
 subtitle:'Matemática · recomposição · diagnóstico e prática progressiva',
 stages:[
 {name:'Posições acima e abaixo do zero',lead:'Números inteiros representam quantidades acima, abaixo ou iguais a zero. Eles fazem sentido em dívidas, temperaturas, níveis e posições.',example:'Se a temperatura era −2 °C e subiu 5 °C, chegou a 3 °C.',formula:'−2 + 5 = +3',ask:'Em uma reta numérica, qual número está três unidades abaixo de zero?',options:['−3','+3','0'],correct:0,feedback:'Abaixo de zero caminhamos para os números negativos.'},
 {name:'Adição com significado',lead:'Na soma de inteiros, observe deslocamentos positivos e negativos. Quando os sinais diferem, compare os valores absolutos.',example:'−7 + 9 = 2 porque um avanço de 9 supera um recuo de 7.',formula:'−7 + 9 = +2',ask:'Quanto é −8 + 3?',options:['−5','+5','−11'],correct:0,feedback:'Partimos de −8 e avançamos 3: chegamos a −5.'},
 {name:'A subtração é uma transformação',lead:'Subtrair um número equivale a somar seu oposto; isso também vale quando o número subtraído é negativo.',example:'5 − (−4) = 5 + 4 = 9. Retirar uma dívida de 4 unidades melhora o saldo em 4.',formula:'a − b = a + (−b)',ask:'Quanto é −2 − (−5)?',options:['3','−7','−3'],correct:0,feedback:'−2 − (−5) = −2 + 5 = 3.'},
 {name:'Multiplicação e divisão',lead:'Nos produtos e quocientes, analise primeiro os sinais, depois calcule os valores absolutos.',example:'(−6) × 3 = −18; (−18) ÷ (−3) = +6.',formula:'Sinais iguais → positivo\nSinais diferentes → negativo',ask:'Qual o resultado de (−24) ÷ 6?',options:['−4','4','−18'],correct:0,feedback:'Sinais diferentes dão quociente negativo. 24 ÷ 6 = 4.'}
 ],
 references:[['Positivo e negativo','Relacionam-se à posição em relação a zero.'],['Adição','Pense em deslocamentos na reta.'],['Subtração','Some o oposto do segundo número.'],['× e ÷','Sinais iguais positivo, diferentes negativo.']]
},
'palavras-vivas.html':{
 title:'Palavras Vivas · Aprenda a ler com significado',
 subtitle:'Língua Portuguesa · leitura inicial · palavras, frases e pequenos textos',
 stages:[
 {name:'As palavras carregam sentido',lead:'Ao ler, observamos letras e sílabas, mas também pensamos no que as palavras significam. Uma palavra pode nomear um objeto, uma ação ou uma característica.',example:'Na palavra “BOLA”, reconhecemos as letras B, O, L, A. Ela pode se referir ao objeto usado em muitos esportes.',formula:'B + O + L + A → BOLA',ask:'Qual palavra nomeia um objeto usado no voleibol?',options:['BOLA','CORRER','ALTO'],correct:0,feedback:'BOLA nomeia um objeto; as outras opções indicam ação ou característica.'},
 {name:'Ler frases inteiras',lead:'Uma frase articula palavras para comunicar uma ideia. Descubra quem fez o quê e, quando houver, onde ou quando aconteceu.',example:'“Lia pegou a bola.” Quem pegou? Lia. O que pegou? A bola.',formula:'QUEM? Lia\nFEZ O QUÊ? Pegou a bola.',ask:'Na frase “Rui abriu o livro”, quem realizou a ação?',options:['Rui','O livro','A escola'],correct:0,feedback:'O sujeito da ação é Rui, que abriu o livro.'},
 {name:'Compreensão de pequenos textos',lead:'Leia com calma, localize fatos importantes e relacione frases. Não é necessário responder depressa.',example:'“Hoje choveu. Ana levou um guarda-chuva.” O texto informa que choveu e Ana levou um objeto para se proteger.',formula:'Ler → localizar → compreender',ask:'No texto “O cachorro dormiu na varanda”, onde ele dormiu?',options:['Na varanda','Na escola','No ônibus'],correct:0,feedback:'A informação aparece diretamente no texto.'},
 {name:'Releitura para confirmar',lead:'Quando uma palavra ou frase parecer difícil, releia em voz baixa ou alta e busque pistas no contexto. O erro pode ser uma oportunidade para ajustar a leitura.',example:'“O jogo terminou. A equipe comemorou.” A sequência ajuda a compreender que houve algo que motivou a comemoração.',formula:'Ler → pensar → responder → reler e conferir',ask:'O que é melhor fazer quando a resposta não combina com o texto?',options:['Reler e procurar informações no texto.','Escolher qualquer opção sem ler.','Desistir imediatamente.'],correct:0,feedback:'Voltar ao texto fortalece a compreensão e a autonomia.'}
 ],
 references:[['Palavra','Letras reunidas com significado.'],['Frase','Comunica uma ideia.'],['Texto','Conjunto de informações relacionadas.'],['Releitura','Ajuda a conferir a compreensão.']]
},
'versos-em-movimento.html':{
 title:'Versos em Movimento · Introdução à leitura da poesia contemporânea',
 subtitle:'Literatura · 3ª série do Ensino Médio · recomposição de aula',
 stages:[
 {name:'Poesia não depende apenas de rima',lead:'A poesia contemporânea reúne diferentes estéticas e formas. Um poema pode ter versos livres, rimas, linguagem cotidiana ou estrutura regular.',example:'Uma frase simples pode ganhar outros sentidos pela escolha de imagens, pausas e disposição dos versos. O importante é pensar como a linguagem produz efeitos.',formula:'Verso ≠ necessariamente rima\nPoema = construção de linguagem e sentidos',ask:'Um poema sem rimas obrigatórias pode ser poesia?',options:['Sim, o verso livre é uma possibilidade.','Não, todo poema precisa rimar.','Apenas se tiver 14 versos.'],correct:0,feedback:'Rima não é condição necessária para a existência da poesia.'},
 {name:'Eu lírico e voz poética',lead:'O eu lírico é a voz que se manifesta no poema. Não devemos confundi-la automaticamente com a pessoa real do autor.',example:'Se um poema diz “eu atravesso a cidade”, a voz que fala é construída no texto e pode ou não corresponder às vivências do escritor.',formula:'Autor: pessoa real\nEu lírico: voz construída no poema',ask:'A voz que fala em primeira pessoa num poema é sempre seu autor real?',options:['Não, pode ser uma voz poética construída.','Sim, sempre é uma autobiografia.','É necessariamente o leitor.'],correct:0,feedback:'A literatura permite construir diferentes vozes e perspectivas.'},
 {name:'Imagem poética e esporte',lead:'A poesia pode usar esporte para falar de questões maiores: memória, pertencimento, estratégia, inclusão e relações humanas.',example:'Em poemas sobre futebol ou xadrez, o jogo pode assumir sentidos que ultrapassam a prática literal.',formula:'Imagem literal → sentidos figurados\nJogo → cultura, escolhas, afetos',ask:'Quando um poema relaciona xadrez a escolhas de vida, há:',options:['Uso simbólico do jogo.','Somente um manual de regras.','Obrigação de interpretar tudo literalmente.'],correct:0,feedback:'A prática esportiva pode servir de imagem para reflexões humanas.'},
 {name:'Ler e produzir com autoria',lead:'Durante a atividade, observe escolhas de palavras, ritmo e imagens. Depois escreva versos próprios, sem copiar obras publicadas.',example:'Você pode partir de uma cena do voleibol ou do futsal e perguntar que emoção, conflito ou memória ela simboliza.',formula:'Observar → interpretar → experimentar → revisar',ask:'Qual atitude é mais adequada ao escrever seu poema?',options:['Criar imagens e versos próprios, revisando os sentidos.','Copiar integralmente um poema publicado.','Juntar frases aleatórias sem leitura.'],correct:0,feedback:'A autoria é importante; o professor acompanhará a qualidade literária do texto.'}
 ],
 references:[['Poesia contemporânea','Pluralidade de formas, vozes e temas.'],['Eu lírico','Voz que se expressa no texto.'],['Imagem poética','Palavras ganham sentidos figurados.'],['Autoria','Escreva e revise seus próprios versos.']]
}
};
const data=lessons[path];if(!data)return;
const root=document.querySelector('main');if(!root)return;
const hero=root.querySelector('section');if(!hero)return;
const article=document.createElement('section');article.id='jp-tutor';article.className='jp-tutor';article.setAttribute('aria-label','Miniaula de preparação pedagógica');
article.innerHTML='<div class="jp-tutor-header"><div><span class="jp-tutor-kicker">TRILHA DE APRENDIZAGEM · PREPARAÇÃO GUIADA</span><h2 id="jp-tutor-title"></h2><p id="jp-tutor-subtitle"></p></div><button class="jp-tutor-button secondary" type="button" id="jp-tutor-collapse">Ir à prática →</button></div><div id="jp-tutor-body"><div class="jp-tutor-track"><div class="jp-tutor-fill" id="jp-tutor-fill"></div></div><p class="jp-tutor-steps" id="jp-tutor-step"></p><h3 id="jp-tutor-heading"></h3><p id="jp-tutor-lead"></p><div class="jp-tutor-highlight"><strong>📘 Exemplo explicado</strong><p id="jp-tutor-example"></p></div><div class="jp-tutor-equation" id="jp-tutor-formula"></div><div class="jp-tutor-check"><strong>🔎 Confira se compreendeu</strong><p id="jp-tutor-question"></p><div class="jp-tutor-choice-list" id="jp-tutor-choices"></div><div class="jp-tutor-feedback" role="status" aria-live="polite" id="jp-tutor-feedback">Selecione a resposta que faz sentido.</div></div><div class="jp-tutor-controls"><button class="jp-tutor-button secondary" id="jp-tutor-back" type="button">← Anterior</button><button class="jp-tutor-button" id="jp-tutor-next" type="button" disabled>Próxima explicação →</button></div></div><p class="jp-tutor-caveat">A miniaula não atribui JPs. Durante a atividade, use as explicações e pistas disponíveis sempre que precisar.</p>';
hero.insertAdjacentElement('afterend',article);
const $=id=>article.querySelector('#'+id);
$('jp-tutor-title').textContent=data.title;$('jp-tutor-subtitle').textContent=data.subtitle;
let step=0;const solved=new Set();
const safeAnswers=data.stages.map((x,i)=>({options:x.options,correct:x.correct}));
const runStart=document.createElement('div');runStart.className='jp-tutor-return';
const revisit=document.createElement('button');revisit.type='button';revisit.textContent='📘 Rever miniaula e exemplos';revisit.addEventListener('click',()=>{article.hidden=false;render();article.scrollIntoView({behavior:'smooth',block:'start'})});runStart.append(revisit);
article.insertAdjacentElement('afterend',runStart);
const help=document.createElement('details');help.className='jp-tutor-help';help.innerHTML='<summary>💡 Precisa de ajuda durante os desafios? Abra aqui seu guia de consulta.</summary><div class="jp-tutor-help-list"></div>';
const grid=help.querySelector('.jp-tutor-help-list');
data.references.forEach(([heading,desc])=>{const item=document.createElement('div');const b=document.createElement('b');b.textContent=heading;const p=document.createElement('p');p.textContent=desc;item.append(b,p);grid.append(item)});
runStart.insertAdjacentElement('afterend',help);
function showPractice(){
 article.hidden=true;
 const next=help.nextElementSibling||runStart.nextElementSibling;
 (next||runStart).scrollIntoView({behavior:'smooth',block:'start'});
}
$('jp-tutor-collapse').addEventListener('click',showPractice);
$('jp-tutor-back').addEventListener('click',()=>{step=Math.max(0,step-1);render()});
$('jp-tutor-next').addEventListener('click',()=>{if(!solved.has(step))return;if(step===data.stages.length-1){showPractice();return}step++;render();article.scrollIntoView({behavior:'smooth',block:'start'})});
function render(){
 const stage=data.stages[step],finished=solved.has(step);
 $('jp-tutor-fill').style.width=String((step+1)/data.stages.length*100)+'%';
 $('jp-tutor-step').textContent='CONCEITO '+(step+1)+' DE '+data.stages.length;
 $('jp-tutor-heading').textContent=stage.name;
 $('jp-tutor-lead').textContent=stage.lead;
 $('jp-tutor-example').textContent=stage.example;
 $('jp-tutor-formula').textContent=stage.formula;
 $('jp-tutor-question').textContent=stage.ask;
 const options=$('jp-tutor-choices');options.replaceChildren();
 stage.options.forEach((value,i)=>{const button=document.createElement('button');button.type='button';button.className='jp-tutor-choice';button.textContent=String.fromCharCode(65+i)+'. '+value;button.disabled=finished;
  if(finished&&i===stage.correct)button.classList.add('correct');
  button.addEventListener('click',()=>{
   if(solved.has(step))return;
   if(i===stage.correct){solved.add(step);render();$('jp-tutor-feedback').textContent='✅ '+stage.feedback;}
   else{button.classList.add('wrong');button.disabled=true;$('jp-tutor-feedback').className='jp-tutor-feedback warn';$('jp-tutor-feedback').textContent='🔄 Releia o exemplo. Identifique a relação importante e tente outra alternativa.'}
  });options.append(button)});
 $('jp-tutor-feedback').className='jp-tutor-feedback';
 $('jp-tutor-feedback').textContent=finished?'✅ '+stage.feedback:'Escolha uma resposta. Se errar, receba orientação e tente novamente.';
 $('jp-tutor-back').disabled=step===0;
 $('jp-tutor-next').disabled=!finished;
 $('jp-tutor-next').textContent=step===data.stages.length-1?'Começar as atividades →':'Próxima explicação →';
}
render();
})();