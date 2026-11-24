'use strict';
/* Balança das Equações: transformações preservam igualdade em ambos os membros.
  40 desafios progressivos com relatório CSV local e sem identificação/código. */
const $=id=>document.getElementById(id);
const levels=[
 {name:'O equilíbrio é a regra',intro:'Pense em uma balança. Uma caixa azul tem peso desconhecido x. Se retiramos 1 peso de um lado, precisamos retirar exatamente 1 do outro. Primeiro, experimente essa regra.',goal:'Retire unidades dos dois pratos até a caixa x ficar sozinha.'},
 {name:'Caixas do mesmo peso',intro:'Duas ou mais caixas azuis têm o mesmo peso. Se 3 caixas equivalem a 15 pesos, divida os dois pratos em 3 grupos iguais.',goal:'Divida ambos os pratos pelo mesmo número para descobrir uma caixa x.'},
 {name:'Duas operações',intro:'Quando há caixas e pesos no mesmo prato, retire primeiro os pesos iguais de ambos os lados. Depois forme grupos iguais.',goal:'Use subtração e divisão na ordem que fizer sentido.'},
 {name:'Caixas nos dois lados',intro:'Se existem caixas x nos dois pratos, retire a mesma quantidade de caixas de cada lado. Isso preserva o equilíbrio.',goal:'Retire caixas dos dois lados, retire pesos e forme grupos.'},
 {name:'Desafios da vida real',intro:'Transforme situações envolvendo esporte, material escolar e problemas do cotidiano em equações. A incógnita x deve representar uma quantidade específica.',goal:'Resolva na balança e depois verifique substituindo o valor encontrado.'}
];
const cases=[];
const xList=[3,5,4,7,6,8,9,10];
const bList=[2,4,3,5,6,2,7,8];
for(let i=0;i<8;i++){const x=xList[i],b=bList[i];cases.push({a:1,b,d:0,c:x+b,x,context:'Uma caixa misteriosa e pesos de uma unidade estão em equilíbrio. Descubra o peso da caixa.'})}
for(let i=0;i<8;i++){const x=[3,4,5,6,7,8,9,10][i],a=[2,3,4,2,5,3,4,5][i];cases.push({a,b:0,d:0,c:a*x,x,context:'As caixas azuis são idênticas. Cada uma tem exatamente o mesmo peso. Quantas unidades pesam?'})}
for(let i=0;i<8;i++){const x=[4,5,6,3,7,8,9,10][i],a=[2,3,4,5,2,4,3,5][i],b=[3,4,6,2,7,5,8,6][i];cases.push({a,b,d:0,c:a*x+b,x,context:'Há caixas misteriosas e pesos extras no mesmo prato. Descubra o valor de x com duas transformações.'})}
for(let i=0;i<8;i++){const x=[3,4,5,6,7,8,9,10][i],d=[1,1,2,2,1,3,2,2][i],k=[2,3,2,3,4,2,3,4][i],b=[2,3,4,2,5,6,3,4][i];const a=k+d;cases.push({a,b,d,c:k*x+b,x,context:'Existem caixas x nos dois pratos. Para manter o equilíbrio, retire a mesma quantidade de caixas de cada lado.'})}
const stories=[
 'Na escola, uma caixa de bolas pesa x kg. Duas caixas e mais 3 kg equivalem a 15 kg. Qual é a massa de cada caixa?',
 'Em um treino de vôlei, 3 pacotes iguais de material e mais 4 unidades equivalem a 22 unidades. Quanto representa cada pacote?',
 'Um jogo de futsal usa conjuntos de peças iguais. Quatro conjuntos e 2 peças extras somam 30 peças. Qual é o tamanho de cada conjunto?',
 'No xadrez, 5 conjuntos de peças idênticos e 5 peças extras equivalem a 40 peças. Quantas peças há em cada conjunto?',
 'Para o torneio de tênis de mesa, 4 kits mais 5 unidades equivalem a 2 kits mais 19 unidades. Quanto vale cada kit?',
 'No handebol, 6 bolsas e 4 kg equilibram 2 bolsas e 36 kg. Qual é a massa de uma bolsa?',
 'Em uma campanha esportiva, 5 caixas e 6 unidades equilibram 2 caixas e 33 unidades. Quantas unidades há por caixa?',
 'Na biblioteca, 7 caixas de livros e 3 livros avulsos equilibram 3 caixas e 43 livros. Quantos livros há em cada caixa?'
];
const values=[
 [2,3,0,15,6],[3,4,0,22,6],[4,2,0,30,7],[5,5,0,40,7],
 [4,5,2,19,7],[6,4,2,36,8],[5,6,2,33,9],[7,3,3,43,10]
];
for(let i=0;i<8;i++){const [a,b,d,c,x]=values[i];cases.push({a,b,d,c,x,context:stories[i]})}
if(cases.length!==40||cases.some(q=>q.a*q.x+q.b!==q.d*q.x+q.c))throw Error('Falha ao preparar equações');
const stageNames=['Equilíbrio','Caixas iguais','Duas etapas','Dois pratos','Desafios reais'];
let index=0,score=0,done=0,history=[],attempts=0,hints=0,pointsThis=0,solved=false,firstSolve=true,log=[],state=null;
const storeKey='jp_balanca_equacoes_progress_v1';
function clone(q){return {a:q.a,b:q.b,d:q.d,c:q.c,x:q.x}}
function expression(a,b){
 if(a===0)return String(b);
 const part=(a===1?'x':a+'x');
 return b?part+' + '+b:part;
}
function equation(q){return expression(q.a,q.b)+' = '+expression(q.d,q.c)}
function message(text,kind=''){const el=$('eq-feedback');el.textContent=text;el.className='eq-feedback'+(kind?' '+kind:'')}
function addHistory(text){history.push(text);renderHistory()}
function renderHistory(){
 const ol=$('eq-history');ol.replaceChildren();
 history.forEach((t,i)=>{const li=document.createElement('li');li.textContent=t;ol.append(li)});
}
function chips(el,num,kind){
 const show=Math.min(num,kind==='unit'?10:7);
 for(let i=0;i<show;i++){const span=document.createElement('span');span.className='eq-weight '+kind;span.textContent=kind==='unit'?'1':'x';el.append(span)}
 if(num>show){const span=document.createElement('span');span.className='eq-weight group';span.textContent='+'+(num-show);span.title='Outros '+(num-show)+' pesos';el.append(span)}
}
function drawBalance(){
 const left=$('eq-left-blocks'),right=$('eq-right-blocks');left.replaceChildren();right.replaceChildren();
 chips(left,state.a,'x');chips(left,state.b,'unit');chips(right,state.d,'x');chips(right,state.c,'unit');
 $('eq-left-label').textContent=expression(state.a,state.b);
 $('eq-right-label').textContent=expression(state.d,state.c);
 $('eq-formula').textContent=equation(state);
 renderHistory();
}
function hud(){
 const level=Math.min(4,Math.floor(index/8));
 $('eq-level').textContent=(level+1)+' / 5';
 $('eq-count').textContent=done+' / 40';
 $('eq-points').textContent=score+' / 100';
 $('eq-rank').textContent=done>=40?'Mestre da Balança':done>=32?'Equilibrista':done>=24?'Algebrista':done>=16?'Investigador':done>=8?'Explorador':'Aprendiz';
 $('eq-progress-fill').style.width=(done/40*100)+'%';
 [...$('eq-map').children].forEach((el,i)=>el.className=i<level?'done':i===level?'current':'');
}
function save(){
 try{localStorage.setItem(storeKey,JSON.stringify({index,score,done,history,attempts,hints,solved,firstSolve,log,state}))}catch(e){}
}
function feedbackHints(){
 if(state.d>0)return 'Há caixas x dos dois lados. Retire a mesma quantidade de caixas azuis de ambos os pratos.';
 if(state.b>0)return 'Há pesos de 1 unidade extras no prato esquerdo. Retire exatamente essa quantidade de pesos de cada prato.';
 if(state.a>1)return 'Restaram '+state.a+' caixas idênticas. Divida os dois pratos em '+state.a+' grupos iguais.';
 return 'A caixa x está isolada. Agora digite o valor que aparece do outro lado e confira por substituição.';
}
function button(label,handler,cls=''){
 const b=document.createElement('button');b.type='button';b.className='eq-btn'+(cls?' '+cls:'');b.textContent=label;b.addEventListener('click',handler);$('eq-actions').append(b);
}
function actions(){
 const wrap=$('eq-actions');wrap.replaceChildren();
 $('eq-answer-area').hidden=true;
 if(solved){$('eq-stage').textContent='MISSÃO CONCLUÍDA';$('eq-task').textContent='Você manteve o equilíbrio!';$('eq-guide-text').textContent='Confira a transformação registrada à esquerda e avance quando quiser.';return}
 if(state.a===1&&state.b===0&&state.d===0){
  $('eq-stage').textContent='ETAPA FINAL · DESCOBRIR x';$('eq-task').textContent='Qual é o peso da caixa azul?';$('eq-guide-text').textContent='Agora que o x está sozinho, leia a igualdade e digite o valor da incógnita.';$('eq-answer-area').hidden=false;$('eq-answer').value='';$('eq-answer').focus();return;
 }
 $('eq-stage').textContent='ETAPA DE TRANSFORMAÇÃO';$('eq-task').textContent='O que vamos retirar ou dividir?';
 $('eq-guide-text').textContent='Clique em uma ação: ela acontece nos DOIS pratos ao mesmo tempo. A balança deve continuar equilibrada.';
 if(state.d>0){
  button('📦 Retirar 1 caixa x de CADA lado',()=>operate('removeX',1),'primary');
  if(state.d>1)button('📦 Retirar '+state.d+' caixas x de CADA lado',()=>operate('removeX',state.d));
 }
 if(state.b>0){
  button('🟠 Retirar 1 peso de CADA lado',()=>operate('removeUnit',1),'primary');
  if(state.b>1)button('🟠 Retirar '+state.b+' pesos de CADA lado',()=>operate('removeUnit',state.b));
 }
 if(state.a>1&&state.d===0&&state.b===0&&state.a>0){
  button('➗ Dividir OS DOIS pratos em '+state.a+' grupos iguais',()=>operate('divide',state.a),'primary');
  if(state.a%2===0&&state.a!==2)button('➗ Dividir OS DOIS pratos em 2 grupos iguais',()=>operate('divide',2));
 }
 if(state.d>0)button('🤔 Retirar x só do prato esquerdo?',()=>mistake('Se retirar uma caixa de apenas um prato, a igualdade deixará de ser válida. Retire x dos dois lados.'));
 else if(state.b>0)button('🤔 Retirar peso só de um prato?',()=>mistake('Para preservar a igualdade, você precisa retirar a mesma quantidade de ambos os lados.'));
 else button('🤔 Dividir apenas o lado direito?',()=>mistake('Dividir apenas um lado altera a igualdade. Divida ambos os membros pelo mesmo número.'));
}
function mistake(why){attempts++;firstSolve=false;message('🔎 Vamos pensar: '+why,'warn');$('eq-attempts').textContent='Tentativas a revisar: '+attempts+'. Experimente outra transformação.';save()}
function operate(kind,n){
 if(solved)return;
 const before=equation(state);
 if(kind==='removeX'){
  if(n<=0||n>state.a||n>state.d){mistake('Não há essa quantidade de caixas nos dois pratos.');return}
  state.a-=n;state.d-=n;
  addHistory(before+' → retirar '+n+'x de ambos → '+equation(state));
 }else if(kind==='removeUnit'){
  if(n<=0||n>state.b||n>state.c){mistake('Não é possível retirar esses pesos de ambos os pratos.');return}
  state.b-=n;state.c-=n;
  addHistory(before+' → retirar '+n+' unidade(s) de ambos → '+equation(state));
 }else if(kind==='divide'){
  if(n<=1||![state.a,state.b,state.d,state.c].every(v=>v%n===0)){mistake('Só podemos dividir em grupos inteiros iguais quando todos os termos permitem essa divisão.');return}
  state.a/=n;state.b/=n;state.d/=n;state.c/=n;
  addHistory(before+' → dividir ambos os membros por '+n+' → '+equation(state));
 }
 if(state.a*state.x+state.b!==state.d*state.x+state.c)throw Error('Invariante de igualdade violada');
 drawBalance();actions();
 message('✅ Ótima transformação! Você fez a mesma operação nos dois lados. '+feedbackHints(),'good');
 $('eq-attempts').textContent='Operações realizadas: '+(history.length-1)+'. Continue até isolar x.';
 save();
}
function render(){
 if(index>=40){finish();return}
 const q=cases[index],lvl=Math.floor(index/8);
 state=clone(q);history=[equation(q)];attempts=0;hints=0;solved=false;firstSolve=true;
 $('eq-game').hidden=false;$('eq-end').hidden=true;
 $('eq-topic').textContent='NÍVEL '+(lvl+1)+' · MISSÃO '+(index+1)+' / 40 · '+levels[lvl].name;
 $('eq-instruction').innerHTML='<strong>Aprenda fazendo.</strong> '+levels[lvl].intro+'<br><strong>Seu objetivo:</strong> '+levels[lvl].goal;
 $('eq-context').hidden=lvl!==4;
 if(lvl===4)$('eq-context').textContent='🏟️ Problema contextualizado: '+q.context+' A balança representa essa igualdade.';
 $('eq-next').disabled=true;$('eq-next').textContent='Resolva para ir à próxima missão';
 $('eq-attempts').textContent='Observe os dois pratos. Você pode retirar unidades, caixas ou dividir em grupos.';
 drawBalance();actions();message('⚖️ O equilíbrio está perfeito! Descubra o valor de x sem mudar a igualdade.');hud();save();
}
function check(){
 if(solved||state.a!==1||state.d!==0||state.b!==0)return;
 const raw=$('eq-answer').value.trim(),guess=Number(raw);
 if(raw===''||!Number.isInteger(guess)){message('Digite um número inteiro para representar o peso da caixa x.','warn');return}
 if(guess!==state.c){
  mistake('Observe o número no prato direito e teste seu valor na equação original. O resultado precisa manter os pratos iguais.');
  return;
 }
 solved=true;done++;
 const gained=firstSolve&&hints===0?2:1;score+=gained;
 const origin=cases[index];
 log.push({mission:index+1,level:Math.floor(index/8)+1,initial:equation(origin),value:origin.x,operations:history.join(' | '),errors:attempts,hints,earned:gained});
 addHistory('Conferência: '+origin.a+' × '+origin.x+' + '+origin.b+' = '+origin.d+' × '+origin.x+' + '+origin.c+' → '+(origin.a*origin.x+origin.b)+' = '+(origin.d*origin.x+origin.c));
 $('eq-next').disabled=false;
 $('eq-next').textContent=index===39?'🎉 Finalizar as 40 missões':index%8===7?'🚀 Desbloquear o próximo nível':'Próxima missão →';
 actions();hud();
 message('🏅 Correto! x = '+origin.x+'. Você ganhou '+gained+' JPs. Ao substituir o valor na equação original, os dois lados continuam iguais.','good');
 $('eq-attempts').textContent='Missão '+(index+1)+' concluída · '+done+'/40 missões · '+score+' JPs (bônus final após todas as missões).';
 save();
}
$('eq-check').addEventListener('click',check);
$('eq-answer').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check()}});
$('eq-next').addEventListener('click',()=>{
 if(!solved)return;
 index++;if(index===40){score+=20;save();finish()}else render();
});
$('eq-hint').addEventListener('click',()=>{
 if(solved)return;
 hints++;firstSolve=false;
 message('💡 Pista '+hints+': '+feedbackHints()+' Explique em voz alta por que a mesma operação deve ocorrer em ambos os lados.','warn');
 save();
});
$('eq-reset-mission').addEventListener('click',()=>{
 if(solved){message('Esta missão já foi concluída. Avance para continuar.','warn');return}
 state=clone(cases[index]);history=[equation(state)];firstSolve=false;drawBalance();actions();
 message('↶ Balança restaurada. Observe a igualdade e tente outra sequência.','warn');save();
});
function csvField(value){
 let s=String(value??'').replace(/[\r\n]/g,' ').trim();
 if(/^[=+@]/.test(s)||/^-(?!\d)/.test(s))s="'"+s;
 return '"'+s.replace(/"/g,'""')+'"';
}
function download(filename,rows){
 const content='\uFEFF'+rows.map(r=>r.map(csvField).join(';')).join('\r\n');
 const url=URL.createObjectURL(new Blob([content],{type:'text/csv;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1500);
}
function report(partial=false){
 const rows=[['Missão','Nível','Equação original','Valor de x','Histórico das operações','Erros','Dicas solicitadas','JPs']];
 log.forEach(x=>rows.push([x.mission,x.level,x.initial,x.value,x.operations,x.errors,x.hints,x.earned]));
 if(partial&&index<40){rows.push(['EM ANDAMENTO','Próxima missão: '+(index+1),'','','','','','']);rows.push(['Equação atual',equation(state),'Operações: '+history.join(' | '),'Tentativas: '+attempts,'Dicas: '+hints,'','',''])}
 rows.push(['RESULTADO',done+' / 40 missões','','','','','',score]);
 rows.push(['Observação','Relatório sem código pessoal, login ou cadastro. A verificação do trabalho deve ser realizada pelo professor.','','','','','','']);
 download('JP-equacoes-balanca-'+(partial?'progresso-parcial':'relatorio-final')+'-'+new Date().toISOString().slice(0,10)+'.csv',rows);
 const note='Arquivo baixado sem código. Entregue ao professor pelo canal indicado pela escola.';
 if(partial)$('eq-partial-status').textContent=note;else $('eq-export-status').textContent=note;
}
function finish(){
 $('eq-game').hidden=true;$('eq-end').hidden=false;
 $('eq-level').textContent='5 / 5';$('eq-count').textContent='40 / 40';
 $('eq-points').textContent=score+' / 100';$('eq-rank').textContent='Mestre da Balança';
 $('eq-progress-fill').style.width='100%';
 [...$('eq-map').children].forEach(el=>el.className='done');
 $('eq-end-text').textContent='Você concluiu as 40 missões, aprendeu a manter a igualdade, isolar a incógnita e conferir a solução. Resultado: '+score+' de 100 JPs. O relatório guarda cada transformação e pode ser baixado sem código.';
 $('eq-end').scrollIntoView({block:'start',behavior:'smooth'});
}
$('eq-report').addEventListener('click',()=>report(false));
$('eq-partial-report').addEventListener('click',()=>report(true));
$('eq-again').addEventListener('click',()=>{
 if(!confirm('Recomeçar as 40 missões? Baixe o relatório antes para preservar os resultados.'))return;
 index=score=done=0;history=[];attempts=hints=0;log=[];solved=false;firstSolve=true;
 render();window.scrollTo({top:0,behavior:'smooth'});
});
function restore(){
 try{
  const data=JSON.parse(localStorage.getItem(storeKey)||'null');
  if(!data||!Number.isInteger(data.index)||data.index<0||data.index>40||!Number.isInteger(data.done)||data.done!==data.index+(data.solved&&data.index<40?1:0))return false;
  if(!Array.isArray(data.log)||data.log.length!==data.done||!Number.isFinite(data.score)||data.score<0||data.score>100)return false;
  if(data.index===40&&data.score<20)return false;
  index=data.index;done=data.done;score=data.score;log=data.log;
  if(index===40){finish();return true}
  state=data.state;history=data.history;attempts=data.attempts||0;hints=data.hints||0;solved=Boolean(data.solved);firstSolve=Boolean(data.firstSolve);
  const q=cases[index],lvl=Math.floor(index/8);
  if(!state||!Array.isArray(history)||!Number.isInteger(state.a)||state.x!==q.x||state.a<1||state.d<0||state.b<0||state.c<0||state.a*state.x+state.b!==state.d*state.x+state.c)throw Error('Estado inválido');
  $('eq-topic').textContent='NÍVEL '+(lvl+1)+' · MISSÃO '+(index+1)+' / 40 · '+levels[lvl].name;
  $('eq-instruction').innerHTML='<strong>Aprenda fazendo.</strong> '+levels[lvl].intro+'<br><strong>Seu objetivo:</strong> '+levels[lvl].goal;
  $('eq-context').hidden=lvl!==4;if(lvl===4)$('eq-context').textContent='🏟️ Problema contextualizado: '+q.context;
  drawBalance();actions();hud();
  $('eq-next').disabled=!solved;
  $('eq-next').textContent=solved?(index===39?'🎉 Finalizar as 40 missões':'Próxima missão →'):'Resolva para ir à próxima missão';
  message('📚 Progresso recuperado deste navegador. Continue de onde parou.','good');
  return true;
 }catch(e){return false}
}
if(!restore())render();