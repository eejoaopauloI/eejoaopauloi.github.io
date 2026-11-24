'use strict';
const $=id=>document.getElementById(id);
const questions=[
 {kind:'rectangle',pts:[[2,2],[6,2],[6,5],[2,5]],prompt:'Conte as colunas e as linhas do retângulo.',explain:'Base de 4 cm e altura de 3 cm: 4 × 3 = 12 cm².',formula:'A = base × altura'},
 {kind:'square',pts:[[3,2],[7,2],[7,6],[3,6]],prompt:'Os quatro lados têm a mesma medida. Quantos quadradinhos estão coloridos?',explain:'Lado 4 cm: 4 × 4 = 16 cm².'},
 {kind:'rectangle',pts:[[1,1],[8,1],[8,4],[1,4]],prompt:'Descubra quantas colunas e quantas linhas a figura ocupa.',explain:'7 colunas e 3 linhas: 7 × 3 = 21 cm².'},
 {kind:'rectangle',pts:[[2,3],[11,3],[11,5],[2,5]],prompt:'A figura é comprida e estreita. Qual é a sua área?',explain:'Base 9 cm e altura 2 cm. Área = 9 × 2 = 18 cm².'},
 {kind:'triangle',pts:[[2,2],[8,2],[2,6]],prompt:'Imagine um retângulo de mesma base e altura. Que parte dele representa este triângulo?',explain:'Base 6 cm, altura 4 cm: (6 × 4) ÷ 2 = 12 cm².',formula:'A = (base × altura) ÷ 2'},
 {kind:'triangle',pts:[[3,2],[9,2],[6,6]],prompt:'A altura é a distância perpendicular do vértice superior até a base.',explain:'Base 6 cm e altura 4 cm: 24 ÷ 2 = 12 cm².'},
 {kind:'triangle',pts:[[1,2],[7,2],[5,7]],prompt:'A ponta pode ficar deslocada; a altura continua sendo perpendicular à base.',explain:'Base 6 cm e altura 5 cm: 30 ÷ 2 = 15 cm².'},
 {kind:'triangle',pts:[[2,1],[10,1],[6,6]],prompt:'Compare o triângulo com um retângulo de mesma base e altura.',explain:'Base 8 cm e altura 5 cm: 40 ÷ 2 = 20 cm².'},
 {kind:'composite',pts:[[2,2],[8,2],[8,4],[5,4],[5,7],[2,7]],prompt:'Divida a figura em L em dois retângulos, sem sobrepor as partes.',explain:'Retângulo de baixo: 6 × 2 = 12 cm². Parte superior esquerda: 3 × 3 = 9 cm². Total: 21 cm².',formula:'A total = A₁ + A₂'},
 {kind:'composite',pts:[[1,1],[9,1],[9,3],[4,3],[4,6],[1,6]],prompt:'Qual é a soma das áreas dos dois retângulos que formam a letra L?',explain:'Parte de baixo: 8 × 2 = 16 cm². Parte superior esquerda: 3 × 3 = 9 cm². Total: 25 cm².'},
 {kind:'trapezoid',pts:[[2,2],[10,2],[8,6],[4,6]],prompt:'Identifique a base maior, a base menor e a altura.',explain:'Base maior 8 cm, base menor 4 cm e altura 4 cm: (8 + 4) × 4 ÷ 2 = 24 cm².',formula:'A = (B + b) × h ÷ 2'},
 {kind:'trapezoid',pts:[[1,2],[10,2],[8,6],[4,6]],prompt:'Conte quantas unidades medem as duas bases paralelas e a altura.',explain:'Base maior 9 cm, base menor 4 cm, altura 4 cm: (9 + 4) × 4 ÷ 2 = 26 cm².'}
];
const builds=[
 {kind:'rectangle',target:12,name:'Retângulo',example:[4,3]},
 {kind:'rectangle',target:18,name:'Retângulo',example:[6,3]},
 {kind:'square',target:16,name:'Quadrado',example:[4,4]},
 {kind:'rectangle',target:24,name:'Retângulo',example:[8,3]},
 {kind:'triangle',target:6,name:'Triângulo',example:[4,3]},
 {kind:'triangle',target:12,name:'Triângulo',example:[6,4]},
 {kind:'triangle',target:15,name:'Triângulo',example:[6,5]},
 {kind:'triangle',target:20,name:'Triângulo',example:[8,5]}
];
const grid={left:51,bottom:414,step:34,maxX:14,maxY:11};
let index=0,points=[],locked=false,attempts=0,hintCount=0,score=0,right=0,completed=0,records=[];
function polyArea(pts){let n=0;for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];n+=a[0]*b[1]-b[0]*a[1]}return Math.abs(n)/2}
function domSVG(type,attrs){const e=document.createElementNS('http://www.w3.org/2000/svg',type);for(const k in attrs)e.setAttribute(k,String(attrs[k]));$('area-grid').append(e);return e}
function pixelPoint(p){return [grid.left+p[0]*grid.step,grid.bottom-p[1]*grid.step]}
function makePolygon(){if(index<12)return questions[index].pts;const kind=builds[index-12].kind;if(points.length<(kind==='triangle'?3:2))return null;
 if(kind==='triangle')return [...points];
 const a=points[0],b=points[1];return [[a[0],a[1]],[b[0],a[1]],[b[0],b[1]],[a[0],b[1]]]
}
function draw(){
 const svg=$('area-grid');svg.replaceChildren();
 domSVG('rect',{x:0,y:0,width:600,height:450,fill:'#f9fdff'});
 for(let x=0;x<=grid.maxX;x++){
  const X=grid.left+x*grid.step;
  domSVG('line',{x1:X,x2:X,y1:grid.bottom-grid.maxY*grid.step,y2:grid.bottom,stroke:x%5?'#cde6ee':'#9ecddc','stroke-width':x%5?1.1:2});
  const label=domSVG('text',{x:X,y:grid.bottom+22,'text-anchor':'middle','font-size':13,'font-weight':650,fill:'#164e70'});label.textContent=x;
 }
 for(let y=0;y<=grid.maxY;y++){
  const Y=grid.bottom-y*grid.step;
  domSVG('line',{x1:grid.left,x2:grid.left+grid.maxX*grid.step,y1:Y,y2:Y,stroke:y%5?'#cde6ee':'#9ecddc','stroke-width':y%5?1.1:2});
  const label=domSVG('text',{x:grid.left-17,y:Y+4,'text-anchor':'middle','font-size':13,'font-weight':650,fill:'#164e70'});label.textContent=y;
 }
 const poly=makePolygon();
 if(poly){
  const pts=poly.map(p=>pixelPoint(p).join(',')).join(' ');
  domSVG('polygon',{points:pts,fill:index<4?'#0aa8d1':index<8?'#8c66ef':index<12?'#ffad43':'#12bc9a','fill-opacity':index<12?.46:.38,stroke:index<8?'#063966':'#514094','stroke-width':4,'stroke-linejoin':'round'});
 }
 if(index>=12){
  points.forEach((p,i)=>{
   const [x,y]=pixelPoint(p);domSVG('circle',{cx:x,cy:y,r:8,fill:'#063966',stroke:'#ffffff','stroke-width':2.5});
   const t=domSVG('text',{x:x+9,y:y-10,'font-size':15,'font-weight':850,fill:'#063966'});t.textContent=String.fromCharCode(65+i);
  });
 }
}
function answers(expected,n){
 const values=new Set([expected]);const offsets=[-8,4,-4,6,-6,8,2,-2,10,-10,12];
 for(let k=0;k<offsets.length&&values.size<4;k++){const v=expected+offsets[(k+n)%offsets.length];if(v>0)values.add(v)}
 while(values.size<4)values.add(expected+values.size*3);
 return [...values].sort((a,b)=>((a*7+n*5)%19)-((b*7+n*5)%19));
}
function info(message,type=''){const e=$('feedback');e.textContent=message;e.className='game-feedback'+(type?' '+type:'')}
function updateHUD(){
 $('hud-phase').textContent=index<12?'1 / 2':'2 / 2';
 $('hud-progress').textContent=completed+' / 20';$('hud-xp').textContent=Math.round(score/4.2)+' JPs';
 $('hud-rank').textContent=completed>=20?'Mestre das áreas':completed>=16?'Construtor':completed>=12?'Arquiteto':completed>=6?'Investigador':'Explorador';
 $('hud-meter').style.width=(completed/20*100)+'%';
 $('tab-1').className=index<12?'active':'done';$('tab-2').className=index<12?'':index<20?'active':'done';
}
function render(){
 if(index>=20){finish();return}
 locked=false;attempts=0;hintCount=0;points=[];
 const construction=index>=12,stage=index<4?1:index<8?2:index<12?3:index<16?4:5;
 $('task-level').textContent=(construction?'FASE 2 · MISSÃO '+(index-11)+'/8':'FASE 1 · DESAFIO '+(index+1)+'/12')+' · NÍVEL '+stage;
 $('grid-stage-label').textContent='MALHA COLORIDA · EIXOS DE 1 EM 1';
 $('grid-title').textContent=construction?'Construa a figura':'Observe e investigue';
 $('answer-buttons').hidden=construction;$('build-area').hidden=!construction;$('build-coordinates').hidden=!construction;
 $('undo').hidden=!construction;$('clear').hidden=!construction;
 $('next').disabled=true;$('next').textContent='Responda para avançar';
 $('tries-label').textContent='';
 $('hint').textContent='💡 Quero uma dica';
 if(!construction){
  const q=questions[index],expected=polyArea(q.pts);
  $('task-heading').textContent='Qual é a área da figura colorida?';
  $('task-prompt').textContent=q.prompt;
  $('grid-note').textContent='Cada quadradinho vale 1 cm².'+(q.formula?' Fórmula de apoio: '+q.formula+'.':' Conte as unidades e descubra a área.');
  $('answer-buttons').replaceChildren();
  answers(expected,index).forEach((value)=>{
   const b=document.createElement('button');b.type='button';b.textContent=value+' cm²';
   b.dataset.value=String(value);b.addEventListener('click',()=>choose(value));$('answer-buttons').append(b);
  });
  info('🧐 Observe, calcule e marque uma das quatro alternativas. A resposta só aparece depois.');
 }else{
  const t=builds[index-12],kind=t.kind;
  $('task-heading').textContent='Construa um '+t.name.toLowerCase()+' com área de';
  $('task-prompt').textContent='Toque nos cruzamentos da malha ou selecione coordenadas. Use a base e a altura para planejar.';
  $('build-target').textContent=t.target+' cm²';
  $('grid-note').textContent='Cada intervalo vale 1 cm. Monte sua figura e confira sem revelar a área calculada antes.';
  $('build-instructions').textContent=kind==='triangle'?'Marque três pontos. Os dois primeiros devem estar na mesma linha horizontal; o terceiro fica acima ou abaixo dessa base.':'Marque dois cantos opostos. A malha completa os outros vértices.'+(kind==='square'?' O quadrado precisa ter lados iguais.':'');
  $('check-build').disabled=false;
  info('✏️ Hora de criar! Marque os vértices e clique em Conferir minha construção.');
  updateMeasures();
 }
 draw();updateHUD();
}
function choose(value){
 if(locked||index>=12)return;
 locked=true;const q=questions[index],correct=polyArea(q.pts),ok=value===correct;
 if(ok){right++;score+=15}
 completed++;
 records.push({phase:'Investigação',challenge:index+1,kind:q.kind,goal:correct,answer:value,correct:ok,attempts:1,xp:ok?15:0});
 [...$('answer-buttons').children].forEach(b=>{b.disabled=true;const v=Number(b.dataset.value);if(v===correct)b.classList.add('correct');else if(v===value)b.classList.add('wrong')});
 info((ok?'🎉 Acertou! Seus JPs aumentaram. ':'🔎 Boa tentativa. A resposta correta é '+correct+' cm². ')+q.explain,ok?'right':'review');
 $('next').disabled=false;$('next').textContent=index===11?'Desbloquear oficina de construção 🚀':'Próximo desafio →';updateHUD();
}
function updateMeasures(){
 const n=index<12?0:builds[index-12].kind==='triangle'?3:2;
 if(!points.length){$('build-measures').textContent='Pontos marcados: 0 de '+n+'. Escolha o primeiro vértice.';return}
 if(points.length<n){$('build-measures').textContent='Pontos marcados: '+points.length+' de '+n+'. Continue escolhendo.';return}
 const kind=builds[index-12].kind;
 const width=Math.abs(points[1][0]-points[0][0]);
 const height=kind==='triangle'?Math.abs(points[2][1]-points[0][1]):Math.abs(points[1][1]-points[0][1]);
 $('build-measures').textContent='Figura desenhada com '+points.length+' vértices. Observe a malha, calcule no caderno e clique em Conferir minha construção.';
}
function addPoint(point){
 if(index<12||locked||index>=20)return;
 const required=builds[index-12].kind==='triangle'?3:2;
 if(points.length>=required)points=[];
 if(points.some(p=>p[0]===point[0]&&p[1]===point[1])){info('Esse vértice já está marcado. Escolha outro ponto da malha.','review');return}
 points.push(point);draw();updateMeasures();info(points.length===required?'Figura pronta para conferir. Você pode modificar os pontos antes de validar.':'Faltam '+(required-points.length)+' vértice(s). Continue na malha.');
}
function checkBuild(){
 if(index<12||locked||index>=20)return;
 const t=builds[index-12],poly=makePolygon();
 if(!poly){info('A figura ainda está incompleta. Marque '+(t.kind==='triangle'?3:2)+' pontos na malha.','review');return}
 attempts++;
 const width=Math.abs(points[1][0]-points[0][0]);
 const height=t.kind==='triangle'?Math.abs(points[2][1]-points[0][1]):Math.abs(points[1][1]-points[0][1]);
 const area=polyArea(poly);
 let correction='';
 if(t.kind==='triangle'&&points[0][1]!==points[1][1])correction='Os dois primeiros vértices precisam ficar na mesma linha horizontal. Assim você forma a base.';
 else if(width===0||height===0)correction='A base e a altura não podem ser zero. Afaste os vértices horizontal e verticalmente.';
 else if(t.kind==='square'&&width!==height)correction='Você fez um retângulo. Para ser quadrado, a base e a altura precisam ser iguais.';
 else if(area<t.target)correction='Ainda faltam '+(t.target-area)+' cm². Aumente a base ou a altura e confira novamente.';
 else if(area>t.target)correction='Sua figura excedeu o objetivo em '+(area-t.target)+' cm². Reduza a base ou a altura.';
 $('tries-label').textContent='Tentativas desta missão: '+attempts;
 if(correction){info('💪 Vamos melhorar! '+correction+' Você pode tentar novamente.','review');return}
 locked=true;completed++;const earned=attempts===1?30:20;score+=earned;
 records.push({phase:'Construção',challenge:index-11,kind:t.kind,goal:t.target,answer:area,correct:true,attempts,xp:earned});
 $('check-build').disabled=true;
 info('🏆 Conseguiu! Área = '+(t.kind==='triangle'?'('+width+' × '+height+') ÷ 2':width+' × '+height)+' = '+area+' cm². Você ganhou pontos de missão e aumentou seus JPs.','right');
 $('next').disabled=false;$('next').textContent=index===19?'Concluir missão 🏆':'Próxima construção →';updateHUD();
}
function showHint(){
 if(index<12){
  const q=questions[index];
  const lines=q.kind==='rectangle'||q.kind==='square'?['Conte quantos quadradinhos cabem na base.','Conte quantas linhas a figura tem.','Multiplique base pela altura.']:q.kind==='triangle'?['Localize uma base e uma altura perpendicular.','Imagine um retângulo com a mesma base e altura.','A área do triângulo é metade da área desse retângulo.']:q.kind==='trapezoid'?['Encontre as duas bases paralelas.','Meça a altura entre as bases.','Some as bases, multiplique pela altura e divida por 2.']:['Divida a figura em duas regiões retangulares.','Calcule cada retângulo separadamente.','Some as áreas das duas partes sem repetir nenhum quadradinho.'];
  info('💡 Dica '+(Math.min(hintCount,2)+1)+'/3: '+lines[Math.min(hintCount++,2)]);
 }else{
  const t=builds[index-12],kind=t.kind;
  const lines=['Pense em duas medidas inteiras de base e altura.','Use a fórmula '+(kind==='triangle'?'A = (base × altura) ÷ 2.':kind==='square'?'A = lado × lado.':'A = base × altura.')+'','Uma construção possível usa base '+t.example[0]+' cm e altura '+t.example[1]+' cm.'];
  info('💡 Dica '+(Math.min(hintCount,2)+1)+'/3: '+lines[Math.min(hintCount++,2)]);
 }
}
function finish(){
 $('game-main').hidden=true;$('game-finish').hidden=false;
 $('hud-phase').textContent='2 / 2';$('tab-2').className='done';updateHUD();
 $('finish-summary').textContent='Você terminou 12 desafios de investigação e 8 construções. Acertos na primeira fase: '+right+' de 12. Pontuação final: '+score+' JPs. Baixe seu relatório e mostre ao professor como calculou as áreas.';
 $('game-finish').scrollIntoView({behavior:'smooth',block:'start'});
}
function download(){
 function csv(v){let s=String(v??'').replace(/[\r\n]+/g,' ');if(/^[=+@\t]/.test(s)||/^-(?!\d)/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
 const data=[['Fase','Questão','Figura','Área-alvo (cm²)','Área marcada/construída (cm²)','Acerto','Tentativas','Pontos de missão (base)']];
 for(const r of records)data.push([r.phase,r.challenge,r.kind,r.goal,r.answer,r.correct?'Sim':'Não',r.attempts,r.xp]);
 data.push(['RESUMO','','','',right+' acertos / 12 investigações','8 construções',completed,score]);
 const contents='\uFEFF'+data.map(row=>row.map(csv).join(';')).join('\r\n');
 const url=URL.createObjectURL(new Blob([contents],{type:'text/csv;charset=utf-8'}));
 const link=document.createElement('a');link.href=url;link.download='jp-recomposicao-missao-geometria-'+new Date().toISOString().slice(0,10)+'.csv';
 document.body.append(link);link.click();link.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
 $('report-status').textContent='Relatório baixado neste aparelho. Nenhum dado foi enviado automaticamente à escola.';
}
for(const [id,max] of [['point-x',grid.maxX],['point-y',grid.maxY]]){
 for(let v=0;v<=max;v++){const opt=document.createElement('option');opt.value=v;opt.textContent=v+' cm';$(id).append(opt)}
}
$('area-grid').addEventListener('click',e=>{
 if(index<12||locked)return;
 const bounds=$('area-grid').getBoundingClientRect();
 const px=(e.clientX-bounds.left)/bounds.width*600,py=(e.clientY-bounds.top)/bounds.height*450;
 const x=Math.max(0,Math.min(grid.maxX,Math.round((px-grid.left)/grid.step)));
 const y=Math.max(0,Math.min(grid.maxY,Math.round((grid.bottom-py)/grid.step)));
 addPoint([x,y]);
});
$('point-add').addEventListener('click',()=>addPoint([Number($('point-x').value),Number($('point-y').value)]));
$('undo').addEventListener('click',()=>{if(locked)return;points.pop();draw();updateMeasures();info('Último ponto removido. Continue sua construção.')});
$('clear').addEventListener('click',()=>{if(locked)return;points=[];draw();updateMeasures();info('Figura apagada. Você pode recomeçar.')});
$('check-build').addEventListener('click',checkBuild);
$('hint').addEventListener('click',showHint);
$('next').addEventListener('click',()=>{if(!locked)return;index++;if(index===12)score+=20;render()});
$('print-grid').addEventListener('click',()=>window.print());
$('download-report').addEventListener('click',download);
$('restart').addEventListener('click',()=>{index=right=completed=score=attempts=hintCount=0;points=[];records=[];$('game-main').hidden=false;$('game-finish').hidden=true;render();window.scrollTo({top:0,behavior:'smooth'})});
render();

function exportJPsAreas(){return JPPontos.exportar({atividade:'areas-malha',concluida:completed>=20,jps:Math.round(score/4.2)})}
document.getElementById('area-jps').addEventListener('click',exportJPsAreas);
