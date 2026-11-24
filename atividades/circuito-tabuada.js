'use strict';
const $=id=>document.getElementById(id);
const stations=[
 {name:'Grupos iguais',icon:'🟦',color:'#16b8d1',subtitle:'Organize objetos em grupos idênticos.'},
 {name:'Saltos na reta',icon:'🐾',color:'#8d6ce4',subtitle:'Avance em passos do mesmo tamanho.'},
 {name:'Arranjos',icon:'🧱',color:'#f4ad38',subtitle:'Descubra a multiplicação nas linhas e colunas.'},
 {name:'Estratégias',icon:'🧠',color:'#21ad86',subtitle:'Quebre contas difíceis em contas conhecidas.'},
 {name:'Missão final',icon:'🏆',color:'#e67b58',subtitle:'Resolva problemas explicando seu raciocínio.'}
];
const tasks=[
 {type:'groups',a:3,b:4,ask:'Há 3 grupos com 4 peças em cada. Quantas peças há ao todo?'},
 {type:'groups',a:4,b:5,ask:'Quatro caixas têm 5 fichas cada. Quantas fichas existem?'},
 {type:'groups',a:5,b:3,ask:'Cinco saquinhos guardam 3 bolinhas cada. Quantas bolinhas há?'},
 {type:'groups',a:2,b:7,ask:'Duas equipes recebem 7 cartões cada. Quantos cartões foram distribuídos?'},
 {type:'groups',a:6,b:4,ask:'Seis bandejas têm 4 copos cada. Quantos copos há ao todo?'},
 {type:'jumps',a:4,b:3,ask:'Uma formiga dá 4 saltos de 3 unidades. Em que número ela chega?'},
 {type:'jumps',a:5,b:4,ask:'Na reta, marque 5 saltos iguais de 4. Qual é o destino?'},
 {type:'jumps',a:3,b:6,ask:'Três saltos de 6 unidades levam a qual posição?'},
 {type:'jumps',a:6,b:5,ask:'Seis saltos de 5 unidades chegam a que número?'},
 {type:'jumps',a:7,b:3,ask:'Sete saltos de 3 unidades terminam onde?'},
 {type:'array',a:3,b:6,ask:'Observe a organização em linhas e colunas. Quantos elementos há?'},
 {type:'array',a:4,b:7,ask:'Um painel tem 4 linhas de 7 peças. Quantas peças há?'},
 {type:'array',a:5,b:5,ask:'Um quadrado tem 5 linhas com 5 quadradinhos. Quantos são?'},
 {type:'array',a:6,b:4,ask:'Um mural tem 6 linhas e 4 colunas. Quantos espaços existem?'},
 {type:'array',a:7,b:5,ask:'Uma organização com 7 linhas e 5 colunas possui quantos pontos?'},
 {type:'split',a:6,b:7,cut:5,ask:'Calcule 6 × 7 usando 5 × 7 e mais 1 × 7.'},
 {type:'split',a:8,b:6,cut:5,ask:'Para calcular 8 × 6, pense em 5 × 6 mais 3 × 6.'},
 {type:'split',a:7,b:8,cut:5,ask:'Para calcular 7 × 8, separe em 5 × 8 e 2 × 8.'},
 {type:'split',a:9,b:4,cut:5,ask:'Em 9 × 4, use 5 × 4 mais 4 × 4.'},
 {type:'split',a:6,b:9,cut:5,ask:'Calcule 6 × 9 como 5 × 9 mais 1 × 9.'},
 {type:'story',a:5,b:8,ask:'Uma escola organizou 5 times com 8 estudantes em cada. Quantos estudantes participam?',story:'🏐 5 times · 8 estudantes por time'},
 {type:'story',a:7,b:6,ask:'Em um campeonato, há 7 mesas com 6 peças em cada. Quantas peças são necessárias?',story:'♟️ 7 mesas · 6 peças por mesa'},
 {type:'story',a:8,b:4,ask:'Um treino tem 8 estações. Cada estação oferece 4 desafios. Quantos desafios há?',story:'🏃 8 estações · 4 desafios por estação'},
 {type:'story',a:9,b:5,ask:'Nove equipes recebem 5 coletes cada. Quantos coletes são necessários?',story:'👕 9 equipes · 5 coletes por equipe'},
 {type:'story',a:6,b:7,ask:'Seis turmas produziram 7 cartazes cada. Quantos cartazes foram produzidos?',story:'🎨 6 turmas · 7 cartazes por turma'}
];
let position=0,score=0,firstTryCorrect=0,tries=0,usedHints=0,revealed=false,completed=0,answered=false,records=[],history=[];
function answer(task){return task.a*task.b}
function safeText(tag,txt,cls){const el=document.createElement(tag);el.textContent=txt;if(cls)el.className=cls;return el}
function groupViz(task){
 const board=$('ct-board');board.replaceChildren();
 board.append(safeText('div',task.a+' grupos de '+task.b+' elementos','visual-title'));
 const rows=safeText('div','','ct-rows');
 for(let i=0;i<task.a;i++){
  const group=safeText('div','','ct-group');
  group.style.borderColor=['#7fd5e4','#c1adeb','#ffce78','#a4e2c6'][i%4];
  group.append(safeText('b','Grupo '+(i+1)));
  for(let j=0;j<task.b;j++){
   const dot=safeText('span','●','ct-dot');dot.style.setProperty('--dot',['#8fdde7','#d4bdf5','#ffd37a','#9be3c5'][i%4]);
   group.append(dot);
  }
  rows.append(group);
 }board.append(rows);
}
function jumpsViz(task){
 const board=$('ct-board');board.replaceChildren();
 board.append(safeText('div',task.a+' saltos de '+task.b+' unidades','visual-title'));
 const line=safeText('div','','ct-jumps');line.append(safeText('div','0','ct-hop'));
 for(let i=1;i<=task.a;i++)line.append(safeText('div',String(i*task.b),'ct-hop'));
 board.append(line);
 board.append(safeText('p','Cada arco representa um salto do mesmo tamanho.','ct-signal'));
}
function arrayViz(task){
 const board=$('ct-board');board.replaceChildren();
 board.append(safeText('div',task.a+' linhas × '+task.b+' colunas','visual-title'));
 const dots=safeText('div','','ct-dots');dots.style.setProperty('--cols',task.b);
 for(let i=0;i<task.a*task.b;i++){
  const dot=safeText('span','','ct-dot');dot.style.setProperty('--dot',i%task.b<Math.ceil(task.b/2)?'#91d9ef':'#c6b7fb');dots.append(dot);
 }
 board.append(dots);
 board.append(safeText('p','Mude seu olhar: contar por linhas ou por colunas leva ao mesmo total.','ct-signal'));
}
function splitViz(task){
 const board=$('ct-board');board.replaceChildren();
 board.append(safeText('div','Divida um produto grande em dois conhecidos','visual-title'));
 const div=safeText('div','','ct-breakdown');
 const p1=safeText('div','','ct-part'),p2=safeText('div','','ct-part');
 p1.append(safeText('small','Parte 1'),safeText('strong',task.cut+' × '+task.b));
 p2.append(safeText('small','Parte 2'),safeText('strong',(task.a-task.cut)+' × '+task.b));
 p1.style.borderColor='#58c2d5';p2.style.borderColor='#f1bb60';div.append(p1,p2);board.append(div);
 board.append(safeText('p','As duas partes juntas formam '+task.a+' grupos de '+task.b+'.','ct-signal'));
}
function storyViz(task){
 const board=$('ct-board');board.replaceChildren();
 board.append(safeText('div','Problema do cotidiano','visual-title'));
 board.append(safeText('div',task.story,'ct-story'));
 board.append(safeText('p','Desenhe grupos no caderno ou separe mentalmente para calcular.','ct-signal'));
}
function renderVisual(task){({groups:groupViz,jumps:jumpsViz,array:arrayViz,split:splitViz,story:storyViz})[task.type](task)}
function distractors(task){
 const actual=answer(task),suggested=[actual+task.a,actual-task.a,actual+task.b,actual-task.b,task.a+task.b,actual+2,actual-2,actual+10,actual-10];
 const vals=new Set([actual]);
 for(const v of suggested){if(vals.size===4)break;if(v>=0&&v!==actual)vals.add(v)}
 while(vals.size<4)vals.add(actual+vals.size*4);
 let out=[...vals];for(let i=out.length-1;i>0;i--){const j=(i*7+position*11)% (i+1);[out[i],out[j]]=[out[j],out[i]]}
 return out;
}
function hud(){
 const stage=Math.min(4,Math.floor(position/5));
 $('ct-station').textContent=(stage+1)+' / 5';$('ct-progress').textContent=completed+' / 25';$('ct-xp').textContent=Math.round(score/5)+' JPs';
 $('ct-rank').textContent=completed>=25?'Mestre da multiplicação':completed>=20?'Estrategista':completed>=15?'Construtor':completed>=10?'Investigador':completed>=5?'Explorador':'Iniciante';
 $('ct-meter').style.width=(completed/25*100)+'%';
 [...$('ct-map').children].forEach((e,i)=>{e.className='ct-node'+(i<stage?' done':i===stage?' current':'')});
}
function render(){
 if(position>=tasks.length){finish();return}
 const task=tasks[position],stage=Math.floor(position/5),info=stations[stage];
 tries=0;usedHints=0;revealed=false;answered=false;
 $('ct-visual-title').textContent='ESTAÇÃO '+(stage+1)+' · '+info.name.toUpperCase();
 $('ct-visual-heading').textContent=info.name;
 $('ct-instruction').textContent=info.subtitle+' Observe a representação: a estratégia vale mais do que a velocidade.';
 $('ct-question-label').textContent='DESAFIO '+(position+1)+' DE 25';
 $('ct-level-heading').textContent='Qual é o seu raciocínio?';
 $('ct-question').textContent=task.ask;
 $('ct-next').disabled=true;$('ct-next').textContent='Escolha uma resposta';
 $('ct-feedback').className='ct-feedback';$('ct-feedback').textContent='Observe os grupos ou a estratégia visual antes de marcar.';
 $('ct-visual-status').textContent='Você pode contar, desenhar e calcular. Não precisa responder de cabeça.';
 $('ct-attempts').textContent='Tente quantas vezes precisar: cada erro rende uma orientação.';
 $('ct-hint').disabled=false;$('ct-model').disabled=false;$('ct-model').textContent='🔍 Explorar estratégia';
 $('ct-options').replaceChildren();
 distractors(task).forEach(value=>{
  const b=document.createElement('button');b.type='button';b.textContent=String(value);b.dataset.value=String(value);
  b.addEventListener('click',()=>choose(value));$('ct-options').append(b);
 });
 renderVisual(task);hud();
}
function strategy(t){
 switch(t.type){
 case 'groups':return 'São '+t.a+' grupos iguais. Some '+t.b+' por grupo: '+Array(t.a).fill(t.b).join(' + ')+' = '+answer(t)+'.';
 case 'jumps':return 'A partir do zero, dê '+t.a+' saltos de '+t.b+'. O último ponto é '+answer(t)+'.';
 case 'array':return 'Há '+t.a+' linhas de '+t.b+' peças. Multiplique linhas e colunas: '+t.a+' × '+t.b+' = '+answer(t)+'.';
 case 'split':return 'Separe '+t.a+' × '+t.b+' em ('+t.cut+' × '+t.b+') + ('+(t.a-t.cut)+' × '+t.b+') = '+(t.cut*t.b)+' + '+((t.a-t.cut)*t.b)+' = '+answer(t)+'.';
 default:return 'Existem '+t.a+' grupos de '+t.b+'. Multiplique '+t.a+' × '+t.b+' = '+answer(t)+'.';
 }
}
function hint(t,level){
 if(t.type==='groups')return [
  'Marque cada grupo com o dedo. Todos precisam ter a mesma quantidade.',
  'Conte '+t.b+' elementos em cada um dos '+t.a+' grupos.',
  'Você pode somar '+Array(t.a).fill(t.b).join(' + ')+'.'
 ][level];
 if(t.type==='jumps')return [
  'Comece pelo número zero e avance sempre o mesmo tanto.',
  'Faça '+t.a+' saltos de '+t.b+', sem pular nenhum.',
  'Liste '+Array.from({length:t.a},(_,i)=>(i+1)*t.b).join(', ')+'.'
 ][level];
 if(t.type==='array')return [
  'Observe linhas horizontais e colunas verticais.',
  'Conte '+t.a+' linhas, com '+t.b+' peças em cada.',
  'Some por linhas ou use '+t.a+' × '+t.b+'.'
 ][level];
 if(t.type==='split')return [
  'Divida a multiplicação em duas partes menores.',
  'Calcule '+t.cut+' × '+t.b+' e '+(t.a-t.cut)+' × '+t.b+'.',
  'Some os resultados '+(t.cut*t.b)+' e '+((t.a-t.cut)*t.b)+'.'
 ][level];
 return [
  'Quais quantidades estão se repetindo no enunciado?',
  'Você tem '+t.a+' grupos de '+t.b+'. Desenhe grupos, se ajudar.',
  'Calcule '+t.a+' × '+t.b+' por grupos iguais.'
 ][level];
}
function feedback(text,type=''){const f=$('ct-feedback');f.className='ct-feedback'+(type?' '+type:'');f.textContent=text}
function choose(value){
 if(answered)return;
 const task=tasks[position],actual=answer(task);
 tries++;
 if(value!==actual){
  [...$('ct-options').children].forEach(b=>{if(Number(b.dataset.value)===value){b.disabled=true;b.classList.add('wrong')}});
  feedback('Ainda não. '+hint(task,Math.min(tries-1,2))+' Experimente outra alternativa; você não perde a missão.','review');
  $('ct-attempts').textContent='Tentativas: '+tries+' · Dicas utilizadas: '+usedHints;
  return;
 }
 answered=true;completed++;
 if(tries===1)firstTryCorrect++;
 const earned=tries===1?(usedHints?15:20):10;score+=earned;
 records.push({station:Math.floor(position/5)+1,activity:stations[Math.floor(position/5)].name,question:position+1,multiplication:task.a+'×'+task.b,answer:actual,tries,hints:usedHints,explored:revealed,points:earned,correct:true});
 [...$('ct-options').children].forEach(b=>{b.disabled=true;if(Number(b.dataset.value)===actual)b.classList.add('correct')});
 feedback('🎉 Conseguiu! +'+(earned/5)+' JPs nesta resposta. '+strategy(task),'correct');
 $('ct-next').disabled=false;$('ct-next').textContent=position===24?'Concluir circuito 🏆':(position%5===4?'Desbloquear próxima estação 🚀':'Próximo desafio →');
 $('ct-attempts').textContent='Acertou em '+tries+' tentativa(s). A estratégia importa mais que a rapidez.';
 hud();
}
$('ct-hint').addEventListener('click',()=>{
 if(answered)return;
 const t=tasks[position],level=Math.min(usedHints,2);usedHints++;
 feedback('💡 Dica '+(level+1)+'/3: '+hint(t,level));
 $('ct-attempts').textContent='Tentativas: '+tries+' · Dicas utilizadas: '+usedHints;
});
$('ct-model').addEventListener('click',()=>{
 if(answered)return;
 revealed=true;
 const t=tasks[position];
 $('ct-visual-status').textContent='🔎 Estratégia em ação: '+(t.type==='split'?'multiplique as duas partes antes de somar.':t.type==='jumps'?'acompanhe os saltos iguais.':t.type==='array'?'conte por linhas ou colunas.':'identifique os grupos que se repetem.');
 feedback('Pense no modelo: '+hint(t,0)+' Depois, escolha seu resultado.');
 $('ct-model').textContent='🔍 Estratégia explorada';
});
$('ct-next').addEventListener('click',()=>{if(!answered)return;position++;render()});
function finish(){
 $('ct-stage').hidden=true;$('ct-finish').hidden=false;hud();
 $('ct-station').textContent='5 / 5';
 $('ct-summary').textContent='Você concluiu os 25 desafios e conquistou '+Math.round(score/5)+' JPs. Acertou '+firstTryCorrect+' na primeira tentativa. O mais importante é que utilizou grupos, saltos, arranjos e decomposição para compreender a multiplicação. Consulte seus resultados e explique ao professor uma estratégia que aprendeu.';
 $('ct-finish').scrollIntoView({behavior:'smooth',block:'start'});
}
function csvCell(value){let s=String(value??'').replace(/[\r\n]+/g,' ');if(/^[=+@\t]/.test(s)||/^-(?!\d)/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
$('ct-csv').addEventListener('click',()=>{
 const rows=[['Estação','Nome da estação','Questão','Operação','Resultado','Tentativas','Dicas','Explorou estratégia','Pontos de missão (base)','Concluída']];
 for(const r of records)rows.push([r.station,r.activity,r.question,r.multiplication,r.answer,r.tries,r.hints,r.explored?'Sim':'Não',r.points,'Sim']);
 rows.push(['RESUMO','','','','25 desafios',records.reduce((s,r)=>s+r.tries,0),records.reduce((s,r)=>s+r.hints,0),'',score,'Concluído']);
 const csv='\uFEFF'+rows.map(row=>row.map(csvCell).join(';')).join('\r\n');
 const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');
 a.href=url;a.download='jp-circuito-tabuada-'+new Date().toISOString().slice(0,10)+'.csv';
 document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1300);
 $('ct-download-status').textContent='Relatório salvo no seu dispositivo. Não houve envio automático à escola.';
});
$('ct-replay').addEventListener('click',()=>{
 position=score=firstTryCorrect=tries=usedHints=completed=0;answered=revealed=false;records=[];
 $('ct-stage').hidden=false;$('ct-finish').hidden=true;render();window.scrollTo({top:0,behavior:'smooth'});
});
render();
function exportJPsTabuada(){return JPPontos.exportar({atividade:'circuito-tabuada',concluida:completed>=25,jps:Math.round(score/5)})}
document.getElementById('ct-jps').addEventListener('click',exportJPsTabuada);
