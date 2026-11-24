'use strict';
/* Detetives do Texto — inferências sustentadas em pistas, 20 casos × 2 etapas.
 * Sistema de JPs: até 3 por inferência e até 2 por evidência. */
const $=id=>document.getElementById(id);
const territories=[
 {label:'Pistas do cotidiano',help:'Observe acontecimentos e pequenos sinais do ambiente.'},
 {label:'Sentimentos e atitudes',help:'Repare nos gestos e nas reações das personagens.'},
 {label:'Intenções e causas',help:'Investigue por que alguém fez ou disse algo.'},
 {label:'Investigações complexas',help:'Relacione pistas de mais de uma frase antes de concluir.'}
];
const cases=[
 {t:'Quando Rafael abriu a porta de casa, viu a calçada molhada e várias pessoas fechando seus guarda-chuvas.',q:'O que provavelmente aconteceu pouco antes?',choices:['Choveu na região.','Houve uma festa na rua.','A calçada foi pintada.'],correct:0,evidence:['A calçada estava molhada e as pessoas fechavam os guarda-chuvas.','Rafael abriu a porta de casa.','Havia pessoas na rua.'],proof:0,why:'Calçada molhada e guarda-chuvas fechados são indícios convergentes de chuva recente.',hint:'Pense no que costuma molhar a calçada e levar pessoas a usar guarda-chuvas.'},
 {t:'O ônibus chegou ao ponto. Clara olhou para o relógio, apertou o passo e entrou antes que a porta se fechasse.',q:'O que podemos inferir sobre Clara naquele momento?',choices:['Estava com pressa para embarcar.','Queria passear sem destino.','Pretendia esperar o próximo ônibus.'],correct:0,evidence:['Ela olhou o relógio e acelerou o passo para entrar.','O ônibus chegou ao ponto.','A porta do ônibus existia.'],proof:0,why:'A consulta ao horário e o passo acelerado sugerem urgência para não perder o ônibus.',hint:'Observe os verbos ligados à maneira como Clara se movimenta.'},
 {t:'Na hora do recreio, Miguel abriu a lancheira. Estava vazia. Ele procurou algo nos bolsos e ficou olhando a fila da cantina.',q:'O que o texto sugere?',choices:['Miguel talvez não tenha levado lanche.','Miguel já tinha comprado dois lanches.','Miguel estava procurando um livro na cantina.'],correct:0,evidence:['A lancheira estava vazia e ele olhava a fila da cantina.','Era a hora do recreio.','Ele tinha bolsos.'],proof:0,why:'A lancheira vazia e o interesse na cantina apontam para a falta de lanche naquele momento.',hint:'Junte duas pistas: o estado da lancheira e para onde Miguel olha.'},
 {t:'A professora entrou na sala e encontrou cadeiras fora do lugar, papéis no chão e um cartaz recém-colado na parede.',q:'O que pode ter ocorrido antes de sua chegada?',choices:['A turma realizou alguma atividade com materiais.','A sala ficou fechada o dia inteiro.','Ninguém tocou nos objetos da sala.'],correct:0,evidence:['Cadeiras movidas, papéis no chão e cartaz recém-colado.','A professora entrou na sala.','Existia uma parede.'],proof:0,why:'As mudanças no ambiente indicam atividade anterior com movimentação e uso de materiais.',hint:'Procure as marcas de algo que foi feito na sala.'},
 {t:'Ao sair da quadra, Bruno segurava uma garrafa quase vazia. Sua camiseta estava úmida e ele respirava rapidamente.',q:'O que é razoável concluir?',choices:['Bruno provavelmente praticou uma atividade física intensa.','Bruno acabou de acordar em casa.','Bruno passou a aula inteira sentado e imóvel.'],correct:0,evidence:['Camiseta úmida, respiração rápida e garrafa quase vazia.','Bruno saiu da quadra.','Ele tinha uma camiseta.'],proof:0,why:'Os sinais corporais e o contexto da quadra sugerem esforço físico recente.',hint:'Que sinais o corpo apresenta depois de se exercitar?'},
 {t:'Ana ensaiou sua apresentação durante dias. Ao ouvir seu nome, respirou fundo, ajeitou as folhas e entrou no palco com as mãos tremendo.',q:'Como Ana provavelmente se sentia?',choices:['Nervosa ou ansiosa.','Absolutamente indiferente.','Com sono profundo.'],correct:0,evidence:['Ela respirou fundo e entrou com as mãos tremendo.','A apresentação ocorreu no palco.','Ana tinha folhas de papel.'],proof:0,why:'Mãos trêmulas e respiração profunda são pistas compatíveis com nervosismo diante da apresentação.',hint:'Observe as reações físicas de Ana antes de entrar no palco.'},
 {t:'Quando soube que o time jogaria a final, Lucas levantou os braços, abraçou os colegas e não parava de sorrir.',q:'Qual sentimento os gestos sugerem?',choices:['Alegria e entusiasmo.','Desinteresse pelo jogo.','Medo de encontrar os colegas.'],correct:0,evidence:['Ele levantou os braços, abraçou os colegas e sorriu muito.','O time jogaria a final.','Lucas estava com colegas.'],proof:0,why:'Abraços, braços erguidos e sorrisos são sinais de comemoração.',hint:'O que os gestos de Lucas comunicam sem precisar dizer “estou feliz”?'},
 {t:'Bia segurava o desenho atrás das costas. Quando a professora pediu para mostrá-lo, ela olhou para baixo e disse bem baixinho: “Ainda não está pronto”.',q:'O que Bia pode estar sentindo?',choices:['Insegurança em mostrar o trabalho.','Certeza de que deseja expor o desenho.','Raiva porque a aula terminou.'],correct:0,evidence:['Escondeu o desenho, baixou o olhar e falou bem baixinho.','Havia uma professora na sala.','Bia fez um desenho.'],proof:0,why:'Esconder o desenho e falar baixinho sugerem receio de apresentá-lo.',hint:'Perceba como Bia protege o desenho e evita mostrá-lo.'},
 {t:'Ao receber a notícia de que a biblioteca abriria novamente, Júlia correu para contar aos amigos e separou os livros que queria devolver.',q:'Qual atitude Júlia demonstra?',choices:['Interesse e expectativa pela reabertura.','Vontade de evitar a biblioteca.','Indiferença em relação aos livros.'],correct:0,evidence:['Ela correu para avisar os amigos e separou livros para devolver.','A biblioteca tinha livros.','Júlia conhecia alguns amigos.'],proof:0,why:'A pressa em compartilhar a notícia e o preparo dos livros demonstram envolvimento.',hint:'O que Júlia fez imediatamente após receber a notícia?'},
 {t:'Pedro encontrou seu nome na lista dos classificados. Leu novamente, sorriu e telefonou para a avó antes mesmo de guardar a mochila.',q:'Por que Pedro provavelmente telefonou?',choices:['Para compartilhar uma conquista.','Para perguntar sobre o tempo.','Para avisar que perdeu a mochila.'],correct:0,evidence:['Viu o nome entre os classificados, sorriu e ligou imediatamente.','A mochila ainda não estava guardada.','A avó tinha telefone.'],proof:0,why:'A sequência “classificação, sorriso, telefonema” sugere vontade de dividir uma boa notícia.',hint:'Relacione a descoberta de Pedro com sua reação e a ligação.'},
 {t:'O céu escureceu de repente. Antes de sair para o treino, o professor recolheu as bolas e pediu que todos entrassem no ginásio.',q:'Qual era provavelmente a intenção do professor?',choices:['Proteger a turma de uma possível mudança do tempo.','Começar um treino ao ar livre imediatamente.','Organizar uma festa surpresa.'],correct:0,evidence:['O céu escureceu e ele chamou todos para dentro do ginásio.','Havia bolas para recolher.','O professor estava com a turma.'],proof:0,why:'A mudança no céu antecede a decisão de levar a turma para um local coberto.',hint:'Por que alguém interromperia uma atividade externa quando o céu escurece?'},
 {t:'Marina passou pela torneira aberta, voltou alguns passos e a fechou. Depois colocou um aviso na pia: “Use somente o necessário”.',q:'O que motivou Marina?',choices:['Evitar desperdício de água.','Aumentar o consumo de água.','Proibir todos de usar a pia.'],correct:0,evidence:['Ela fechou a torneira e pediu para usar somente o necessário.','Marina voltou alguns passos.','Havia uma pia no local.'],proof:0,why:'Fechar a torneira e limitar o uso mostram preocupação com a economia de água.',hint:'Compare o gesto com a mensagem deixada na pia.'},
 {t:'Davi viu um colega sentado sozinho no intervalo. Aproximou-se com o tabuleiro de xadrez e perguntou: “Quer jogar comigo?”.',q:'O que a atitude de Davi sugere?',choices:['Desejo de incluir o colega na atividade.','Vontade de impedir o colega de brincar.','Intenção de esconder o tabuleiro.'],correct:0,evidence:['Viu o colega sozinho e o convidou para jogar.','O intervalo estava acontecendo.','O tabuleiro era de xadrez.'],proof:0,why:'O convite feito ao perceber o colega sozinho sugere acolhimento e inclusão.',hint:'Observe o que Davi percebeu antes de fazer o convite.'},
 {t:'O cartaz dizia “Silêncio, avaliação em andamento”. Ao chegar perto da sala, as pessoas diminuíram o volume da conversa.',q:'Por que as pessoas falaram mais baixo?',choices:['Para não atrapalhar quem fazia a avaliação.','Porque haviam perdido a voz.','Porque a sala estava vazia.'],correct:0,evidence:['O aviso pedia silêncio durante a avaliação e as pessoas baixaram a voz.','As pessoas chegaram perto da sala.','O cartaz estava na parede.'],proof:0,why:'A mudança de comportamento em resposta ao aviso demonstra respeito à atividade.',hint:'O cartaz estabelece qual cuidado? Como as pessoas reagiram?'},
 {t:'Antes de guardar o experimento, Sofia fotografou cada etapa e anotou as mudanças que observou. “Assim poderei comparar depois”, comentou.',q:'Qual foi o objetivo das fotografias e anotações?',choices:['Registrar dados para comparação posterior.','Enfeitar a sala sem usar os registros.','Evitar qualquer observação do experimento.'],correct:0,evidence:['Ela fotografou as etapas, anotou mudanças e disse que compararia depois.','O experimento seria guardado.','Sofia tinha uma câmera.'],proof:0,why:'Registros sucessivos permitem comparar mudanças e retomar evidências.',hint:'Qual ação de Sofia ajuda alguém a comparar momentos diferentes?'},
 {t:'A quadra estava pronta para a final de vôlei. A arquibancada já tinha gente, mas a equipe visitante ainda não chegara. A organização adiou o início por quinze minutos.',q:'Qual é a explicação mais sustentada para o atraso?',choices:['Aguardavam a chegada da equipe visitante.','A quadra estava interditada por obras.','O público não queria assistir à partida.'],correct:0,evidence:['A equipe visitante não havia chegado, então o início foi adiado.','A arquibancada já tinha gente.','Era uma final de vôlei.'],proof:0,why:'A ausência da equipe visitante é a informação diretamente relacionada à decisão de adiar.',hint:'Que fato ainda estava pendente quando a organização alterou o horário?'},
 {t:'Na horta da escola, algumas folhas estavam murchas. O solo parecia seco. Após observar os canteiros, os estudantes buscaram regadores.',q:'Que necessidade os estudantes provavelmente identificaram?',choices:['As plantas precisavam de água.','As plantas precisavam de tinta.','Os canteiros deveriam ser cobertos de papel.'],correct:0,evidence:['Folhas murchas, solo seco e busca por regadores.','A horta pertencia à escola.','Os estudantes observaram canteiros.'],proof:0,why:'Solo seco e folhas murchas, aliados à busca por regadores, apontam necessidade de irrigação.',hint:'Pense na relação entre folhas murchas, solo seco e regadores.'},
 {t:'Aline entregou o livro à colega com um marcador na página 42 e disse: “Você vai gostar desta parte”. A colega sorriu antes de abrir o livro.',q:'O que Aline provavelmente fez antes desse encontro?',choices:['Leu ou conheceu o trecho que indicou.','Escreveu o livro inteiro naquela manhã.','Decidiu que a colega não deveria ler.'],correct:0,evidence:['Aline marcou uma página específica e recomendou aquela parte.','A colega sorriu.','Havia um marcador dentro do livro.'],proof:0,why:'Indicar uma página e avaliá-la positivamente sugere familiaridade prévia com o trecho.',hint:'Como Aline sabia que aquela parte poderia agradar à colega?'},
 {t:'O grupo combinou dividir a pesquisa em partes. Dois dias depois, todos chegaram à reunião com anotações, fontes consultadas e perguntas para discutir.',q:'O que a preparação sugere?',choices:['Os participantes levaram a tarefa a sério e se organizaram.','Ninguém realizou nenhuma pesquisa.','O grupo desistiu de se reunir.'],correct:0,evidence:['Todos vieram com anotações, fontes e perguntas após dividir tarefas.','A reunião aconteceu dois dias depois.','O grupo fez um combinado.'],proof:0,why:'A entrega de registros variados após a divisão de tarefas evidencia organização e empenho.',hint:'O que os materiais levados à reunião mostram sobre o trabalho anterior?'},
 {t:'Joana chegou à escola carregando uma pequena caixa. Aproximou-se da professora e pediu: “Podemos abrir só depois que a turma estiver reunida?”. Ao ouvir o sinal, ela olhou para a porta e sorriu.',q:'O que podemos inferir com segurança?',choices:['Joana queria compartilhar algo com a turma reunida.','A caixa continha obrigatoriamente um bolo.','Joana pretendia levar a caixa de volta sem mostrar a ninguém.'],correct:0,evidence:['Ela pediu para abrir a caixa apenas depois que a turma estivesse reunida.','Joana chegou à escola.','O sinal tocou.'],proof:0,why:'O pedido de aguardar a turma sustenta a intenção de compartilhar; não há pistas para afirmar o conteúdo da caixa.',hint:'Uma inferência responsável não inventa o conteúdo da caixa; observe o pedido de Joana.'}
];
let current=0,phase='inference',finished=0,jps=0;
let wrongIn=0,wrongEv=0,hints=0,caseHint=0,caseHelp=false,records=[];
function render(){
 if(current>=cases.length){finish();return}
 phase='inference';wrongIn=0;wrongEv=0;caseHint=0;caseHelp=false;
 const c=cases[current],tier=Math.floor(current/5);
 $('dt-territory').textContent=(tier+1)+' / 4';
 $('dt-done').textContent=finished+' / 20';$('dt-jps').textContent=jps+' JPs';
 $('dt-rank').textContent=finished>=20?'Mestre da inferência':finished>=15?'Investigador':finished>=10?'Detetive':finished>=5?'Observador':'Aprendiz';
 $('dt-progress-bar').style.width=(finished*5)+'%';
 [...$('dt-map').children].forEach((el,i)=>el.className='dt-node'+(i<tier?' done':i===tier?' current':''));
 $('dt-level').textContent='TERRITÓRIO '+(tier+1)+' · CASO '+(current+1)+'/20 · '+territories[tier].label;
 $('dt-text').textContent=c.t;$('dt-tip').textContent=territories[tier].help+' Procure pistas, não uma frase que entregue toda a resposta.';
 $('dt-audio-status').textContent='A leitura em voz alta pode variar conforme o navegador e o dispositivo.';
 $('dt-next').disabled=true;$('dt-next').textContent='Resolva as duas etapas';
 $('dt-tries').textContent='Você pode tentar novamente. A pontuação valoriza a investigação e as pistas corretas.';
 showOptions();hud();
}
function hud(){
 $('dt-done').textContent=finished+' / 20';$('dt-jps').textContent=jps+' JPs';$('dt-progress-bar').style.width=finished*5+'%';
 $('dt-rank').textContent=finished>=20?'Mestre da inferência':finished>=15?'Investigador':finished>=10?'Detetive':finished>=5?'Observador':'Aprendiz';
}
function setFeedback(message,type=''){const el=$('dt-feedback');el.className='dt-feedback'+(type?' '+type:'');el.textContent=message}
function showOptions(){
 const c=cases[current],inf=phase==='inference';
 $('dt-question-label').textContent=inf?'ETAPA 1 DE 2 · DEDUZIR':'ETAPA 2 DE 2 · PROVAR COM PISTAS';
 $('dt-heading').textContent=inf?'🔍 Decifre a mensagem':'🧩 Encontre a evidência';
 $('dt-question').textContent=inf?c.q:'Qual trecho apresenta a pista mais forte para sustentar a conclusão?';
 $('dt-stage-note').textContent=inf?'Não basta adivinhar: descubra o sentido que o texto permite concluir.':'Agora sustente sua interpretação: escolha o indício mais relevante do texto.';
 const choices=inf?c.choices:c.evidence;
 const container=$('dt-options');container.replaceChildren();
 // Posição variável para evitar resposta fixa e memorização de letras.
 const order=[0,1,2].sort((a,b)=>((a*7+current*11+(inf?2:5))%13)-((b*7+current*11+(inf?2:5))%13));
 order.forEach((idx,i)=>{
  const b=document.createElement('button');b.type='button';b.className='dt-choice';
  const letter=document.createElement('b');letter.textContent=String.fromCharCode(65+i);
  const span=document.createElement('span');span.textContent=choices[idx];
  b.append(letter,span);b.dataset.choice=String(idx);b.addEventListener('click',()=>choose(idx,b));container.append(b);
 });
 setFeedback(inf?'O que se pode deduzir? Compare as três hipóteses com o texto.':'Qual pista realmente sustenta sua conclusão?');
}
function choose(idx,button){
 if(current>=20||phase==='solved')return;
 const c=cases[current],inf=phase==='inference',correct=inf?c.correct:c.proof;
 if(idx!==correct){
  if(inf)wrongIn++;else wrongEv++;
  button.disabled=true;button.classList.add('wrong');
  const guide=inf?'Volte ao registro: '+c.hint:'Pense em qual alternativa contém um sinal concreto relacionado à sua conclusão, não apenas um detalhe do cenário.';
  setFeedback('🔄 Essa alternativa não é a melhor. '+guide+' Tente outra.', 'try');
  $('dt-tries').textContent='Tentativas com erro: '+(wrongIn+wrongEv)+' · pistas solicitadas: '+caseHint;
  return;
 }
 button.classList.add('correct');
 [...$('dt-options').children].forEach(b=>b.disabled=true);
 if(inf){
  phase='evidence';
  // Persiste apenas as tentativas, para pontuar após ambas as fases.
  setFeedback('🎉 Boa hipótese! Agora precisamos demonstrar de onde ela veio.', 'good');
  $('dt-tries').textContent='Etapa 1 concluída. A próxima etapa verifica as pistas que sustentam a interpretação.';
  showOptions();return;
 }
 phase='solved';finished++;
 const inferPoints=wrongIn===0?(caseHelp?2:3):1;
 const evidencePoints=wrongEv===0?(caseHelp?1:2):1;
 const gained=inferPoints+evidencePoints;jps+=gained;
 records.push({case:current+1,territory:territories[Math.floor(current/5)].label,passages:c.t,inference:c.choices[c.correct],evidence:c.evidence[c.proof],wrongInference:wrongIn,wrongEvidence:wrongEv,hints:caseHint,points:gained});
 setFeedback('🏆 Caso resolvido! '+c.why+' Você ganhou '+gained+' JPs. Sua hipótese está sustentada por uma pista do texto.', 'good');
 $('dt-next').disabled=false;$('dt-next').textContent=current===19?'Concluir missão 🏆':current%5===4?'Desbloquear próximo território 🚀':'Próximo caso →';hud();
 $('dt-tries').textContent='Você concluiu as duas etapas. Total da missão: '+jps+' JPs.';
}
$('dt-hint').addEventListener('click',()=>{
 if(current>=20||phase==='solved')return;
 const c=cases[current];caseHelp=true;caseHint++;
 if(phase==='inference')setFeedback('💡 Pista do investigador: '+c.hint+' A conclusão não precisa estar escrita literalmente.');
 else setFeedback('💡 Pista do investigador: procure um detalhe concreto relacionado diretamente à conclusão. Prefira a evidência mais específica.');
 $('dt-tries').textContent='Dicas solicitadas neste caso: '+caseHint;
});
$('dt-read').addEventListener('click',()=>{
 if(!('speechSynthesis' in window)){ $('dt-audio-status').textContent='A leitura em voz alta não está disponível neste navegador.';return}
 try{
  window.speechSynthesis.cancel();
  const utter=new SpeechSynthesisUtterance(cases[current].t);
  utter.lang='pt-BR';utter.rate=.88;
  window.speechSynthesis.speak(utter);
  $('dt-audio-status').textContent='🔊 Reproduzindo o texto. Você também pode acompanhá-lo visualmente.';
 }catch(error){$('dt-audio-status').textContent='A leitura em voz alta não pôde ser iniciada. Leia o texto diretamente.'}
});
$('dt-next').addEventListener('click',()=>{
 if(phase!=='solved')return;
 if('speechSynthesis' in window)window.speechSynthesis.cancel();
 current++;render();
});
function finish(){
 $('dt-play').hidden=true;$('dt-finale').hidden=false;
 $('dt-territory').textContent='4 / 4';$('dt-done').textContent='20 / 20';$('dt-jps').textContent=jps+' JPs';$('dt-rank').textContent='Mestre da inferência';$('dt-progress-bar').style.width='100%';
 [...$('dt-map').children].forEach(e=>e.className='dt-node done');
 $('dt-summary').textContent='Você investigou 20 textos, formulou hipóteses e escolheu pistas para justificá-las. Conquistou '+jps+' de 100 JPs. A habilidade mais importante é justificar cada inferência com informações realmente presentes no texto.';
 $('dt-finale').scrollIntoView({block:'start',behavior:'smooth'});
}
$('dt-certificate').addEventListener('click',()=>{
 if(finished!==20)return;
 JPPontos.exportar({atividade:'detetives-texto',concluida:true,jps});
});
$('dt-report').addEventListener('click',()=>{
 if(finished!==20)return;
 const rows=[['Caso','Território','Texto','Inferência','Pista textual','Erros na inferência','Erros na pista','Dicas','JPs']];
 for(const r of records)rows.push([r.case,r.territory,r.passages,r.inference,r.evidence,r.wrongInference,r.wrongEvidence,r.hints,r.points]);
 rows.push(['RESUMO','20 casos','','','','','','',jps]);
 rows.push(...JPVisibilidade.csvRows(9));
 JPPontos.saveCSV('jp-detetives-texto-relatorio-'+new Date().toISOString().slice(0,10)+'.csv',rows);
 $('dt-export-status').textContent='Relatório gerado neste aparelho. Entregue o arquivo ao professor; os dados não são transmitidos automaticamente.';
});
$('dt-reset').addEventListener('click',()=>{
 if(!confirm('Reiniciar os 20 casos? Salve o relatório antes, se desejar preservar os resultados.'))return;
 current=finished=jps=0;wrongIn=wrongEv=caseHint=0;records=[];phase='inference';
 $('dt-play').hidden=false;$('dt-finale').hidden=true;render();window.scrollTo({top:0,behavior:'smooth'});
});
render();