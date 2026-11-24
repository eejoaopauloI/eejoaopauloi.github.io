
'use strict';
/* JP Recomposição — oficina de construção, malha de 1 cm por unidade */
const tasks=[
 ['rectangle',12,'Retângulo','4 × 3 = 12. Experimente 4 cm de base e 3 cm de altura.'],
 ['rectangle',18,'Retângulo','6 × 3 = 18. Experimente base de 6 cm e altura de 3 cm.'],
 ['square',16,'Quadrado','O quadrado tem lados iguais. Experimente 4 cm × 4 cm.'],
 ['rectangle',24,'Retângulo','8 × 3 = 24. Experimente base de 8 cm e altura de 3 cm.'],
 ['triangle',6,'Triângulo','O triângulo ocupa metade do retângulo: base 4 cm, altura 3 cm.'],
 ['triangle',12,'Triângulo','Base 6 cm e altura 4 cm: (6 × 4) ÷ 2 = 12.'],
 ['triangle',15,'Triângulo','Base 6 cm e altura 5 cm: (6 × 5) ÷ 2 = 15.'],
 ['triangle',20,'Triângulo','Base 8 cm e altura 5 cm: (8 × 5) ÷ 2 = 20.']
];
let taskIndex=0,vertices=[],tries=0,hints=0,solved=false,wins=0,bonusXP=0,buildRecords=[];
const board={left:55,bottom:398,step:36};
function gameScore(){
 const xp=records.filter(r=>r.acerto).length*10+bonusXP;
 $('game-xp').textContent=xp+' XP';
 $('game-rank').textContent=wins===8?'MESTRE DAS ÁREAS':wins>=4?'CONSTRUTOR':cursor>=12?'GEÔMETRA':'EXPLORADOR';
 $('game-message').textContent=wins===8?'Você concluiu as duas missões!':cursor>=12?'Conquiste as 8 missões de construção com dicas e novas tentativas.':'Explore as 12 figuras e libere a oficina de construção.';
 $('build-progress').textContent=wins+' / 8';
}
function boardNode(tag,attrs){
 const node=document.createElementNS('http://www.w3.org/2000/svg',tag);
 for(const [key,val] of Object.entries(attrs))node.setAttribute(key,String(val));
 $('builder-svg').append(node);return node;
}
function polygonPoints(){
 if(taskIndex>=tasks.length)return null;
 const type=tasks[taskIndex][0],need=type==='triangle'?3:2;
 if(vertices.length!==need)return null;
 if(type==='triangle')return vertices.slice();
 const a=vertices[0],b=vertices[1];
 return [[a[0],a[1]],[b[0],a[1]],[b[0],b[1]],[a[0],b[1]]];
}
function boardDraw(){
 $('builder-svg').replaceChildren();
 boardNode('rect',{x:0,y:0,width:600,height:440,fill:'#faffff'});
 for(let x=0;x<=13;x++){
  boardNode('line',{x1:board.left+board.step*x,y1:board.bottom-360,x2:board.left+board.step*x,y2:board.bottom,stroke:x%5===0?'#a4ccd7':'#d2e9ee','stroke-width':x%5===0?2:1});
  const label=boardNode('text',{x:board.left+x*board.step,y:board.bottom+19,'text-anchor':'middle','font-size':13,fill:'#3b667a'});label.textContent=x;
 }
 for(let y=0;y<=10;y++){
  boardNode('line',{x1:board.left,y1:board.bottom-board.step*y,x2:board.left+board.step*13,y2:board.bottom-board.step*y,stroke:y%5===0?'#a4ccd7':'#d2e9ee','stroke-width':y%5===0?2:1});
  const label=boardNode('text',{x:board.left-15,y:board.bottom-board.step*y+4,'text-anchor':'middle','font-size':13,fill:'#3b667a'});label.textContent=y;
 }
 const poly=polygonPoints();
 if(poly)boardNode('polygon',{points:poly.map(p=>(board.left+p[0]*board.step)+','+(board.bottom-p[1]*board.step)).join(' '),fill:'#05c9dc','fill-opacity':'.38',stroke:'#063966','stroke-width':4});
 else if(vertices.length>1)boardNode('polyline',{points:vertices.map(p=>(board.left+p[0]*board.step)+','+(board.bottom-p[1]*board.step)).join(' '),fill:'none',stroke:'#008aa7','stroke-width':3});
 vertices.forEach((p,i)=>{
  boardNode('circle',{cx:board.left+p[0]*board.step,cy:board.bottom-p[1]*board.step,r:7,fill:'#063966',stroke:'#fff','stroke-width':2});
  const label=boardNode('text',{x:board.left+p[0]*board.step+8,y:board.bottom-p[1]*board.step-10,'font-size':14,fill:'#063966','font-weight':800});label.textContent=String.fromCharCode(65+i);
 });
 if(!poly){$('build-measures').textContent='Pontos marcados: '+vertices.length+'. Marque '+(tasks[taskIndex][0]==='triangle'?3:2)+' pontos para formar a figura.';return}
 const dx=Math.abs(vertices[1][0]-vertices[0][0]),dy=tasks[taskIndex][0]==='triangle'?Math.abs(vertices[2][1]-vertices[0][1]):Math.abs(vertices[1][1]-vertices[0][1]);
 $('build-measures').textContent='Base: '+dx+' cm · Altura: '+dy+' cm. Calcule a área antes de conferir sua construção.';
}
function feedbackBuild(message,status=''){
 const p=$('build-feedback');p.textContent=message;p.className='builder-feedback'+(status?' '+status:'');
}
function markVertex(point){
 if(solved||taskIndex>=tasks.length)return;
 const required=tasks[taskIndex][0]==='triangle'?3:2;
 if(vertices.length===required)vertices=[];
 if(vertices.some(p=>p[0]===point[0]&&p[1]===point[1])){feedbackBuild('Esse ponto já foi utilizado. Escolha outro cruzamento da malha.','needs-work');return}
 vertices.push(point);boardDraw();
 feedbackBuild(vertices.length===required?'Sua figura está desenhada. Clique em Conferir minha construção.':'Ótimo. Marque mais '+(required-vertices.length)+' vértice(s).');
}
function resetBuildTask(){
 const task=tasks[taskIndex];if(!task){finishBuild();return}
 vertices=[];tries=0;hints=0;solved=false;
 $('build-kind').textContent='MISSÃO '+(taskIndex+1)+' DE 8 · '+(task[0]==='triangle'?'TRIÂNGULOS':'QUADRILÁTEROS');
 $('build-task').textContent='Construa um '+task[2].toLowerCase()+' com área de';
 $('build-target').textContent=task[1]+' cm²';
 $('build-instructions').textContent=task[0]==='triangle'?'Marque três vértices: os DOIS PRIMEIROS na mesma linha horizontal para formar a base; o terceiro acima ou abaixo dessa linha.':'Marque dois cantos opostos e a malha completará a figura.'+(task[0]==='square'?' Os quatro lados devem ser iguais.':'');
 $('build-next').disabled=true;$('build-next').textContent='Próxima missão →';$('build-check').disabled=false;
 $('build-trail').textContent='Missões concluídas: '+wins+'/8 · Tentativas nesta missão: 0';
 feedbackBuild('Os intervalos da malha valem 1 cm. Observe, construa e confira.');boardDraw();gameScore();
}
function validateBuild(){
 if(solved)return;
 const poly=polygonPoints();
 if(!poly){feedbackBuild('Você ainda precisa marcar todos os vértices da figura.','needs-work');return}
 tries++;const [type,target]=tasks[taskIndex];
 const width=Math.abs(vertices[1][0]-vertices[0][0]);
 const height=type==='triangle'?Math.abs(vertices[2][1]-vertices[0][1]):Math.abs(vertices[1][1]-vertices[0][1]);
 const area=polygonArea(poly);
 let reason='';
 if(type==='triangle'&&vertices[0][1]!==vertices[1][1])reason='Os dois primeiros pontos devem estar na MESMA linha: essa é a base do triângulo.';
 else if(width===0||height===0)reason='Base e altura precisam ser maiores que zero. Afaste os pontos na horizontal e na vertical.';
 else if(type==='square'&&width!==height)reason='A figura ainda não é um quadrado: base e altura precisam ser iguais.';
 else if(area<target)reason='Sua figura tem '+area+' cm². Faltam '+(target-area)+' cm²: aumente a base ou a altura.';
 else if(area>target)reason='Sua figura tem '+area+' cm². Há '+(area-target)+' cm² a mais: diminua a base ou a altura.';
 if(!reason){
  solved=true;wins++;let xp=tries===1?30:20;bonusXP+=xp;
  buildRecords.push({n:taskIndex+1,figura:tasks[taskIndex][2],alvo:target,area,base:width,altura:height,tentativas:tries,xp});
  feedbackBuild('Conseguiu! Base '+width+' cm × altura '+height+' cm'+(type==='triangle'?' ÷ 2':'')+' = '+target+' cm². Você ganhou '+xp+' XP!','good');
  $('build-next').disabled=false;$('build-check').disabled=true;
  $('build-next').textContent=taskIndex===7?'Concluir aula 🏆':'Próxima missão →';
  gameScore();
 }else feedbackBuild('Quase! '+reason+' Você pode tentar novamente; use Desfazer ou Recomeçar figura.','needs-work');
 $('build-trail').textContent='Missões concluídas: '+wins+'/8 · Tentativas nesta missão: '+tries;
}
function finishBuild(){
 $('area-builder').hidden=true;$('builder-finale').hidden=false;
 $('builder-final-message').textContent='Você explorou 12 figuras e concluiu 8 construções na malha de 1 cm. Acertos: '+hits+'/12. Pontuação: '+(records.filter(r=>r.acerto).length*10+bonusXP)+' XP. Revise as áreas e explique como usou base e altura!';
 gameScore();$('builder-finale').scrollIntoView({behavior:'smooth',block:'start'});
}
function fullReport(){
 function csv(v){let t=String(v??'').replace(/[\r\n]+/g,' ');if(/^[=+@\t]/.test(t)||/^-{1}(?!\d)/.test(t))t="'"+t;return '"'+t.replace(/"/g,'""')+'"'}
 const rows=[['Etapa','Questão','Figura','Área correta','Área marcada ou construída','Acerto','Tentativas','XP']];
 for(const r of records)rows.push(['Investigar',r.n,r.figura,r.correta,r.marcada,r.acerto?'Sim':'Não',1,r.acerto?10:0]);
 for(const r of buildRecords)rows.push(['Construir',r.n,r.figura,r.alvo,r.area,'Sim',r.tentativas,r.xp]);
 rows.push(['TOTAL','','','',wins+' construções',hits+' de 12',buildRecords.reduce((s,r)=>s+r.tentativas,0),records.filter(r=>r.acerto).length*10+bonusXP]);
 const url=URL.createObjectURL(new Blob(['\uFEFF'+rows.map(row=>row.map(csv).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');
 a.href=url;a.download='jp-areas-aula-gamificada-'+new Date().toISOString().slice(0,10)+'.csv';document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1500);
 $('builder-download-status').textContent='Relatório baixado localmente. Nenhum resultado foi enviado à escola.';
}
for(const id of ['build-x','build-y']){
 const select=$(id),limit=id==='build-x'?13:10;
 for(let i=0;i<=limit;i++){const option=document.createElement('option');option.value=String(i);option.textContent=i+' cm';select.append(option)}
}
$('builder-svg').addEventListener('click',e=>{
 const rect=$('builder-svg').getBoundingClientRect();
 const vx=(e.clientX-rect.left)/rect.width*600,vy=(e.clientY-rect.top)/rect.height*440;
 const x=Math.max(0,Math.min(13,Math.round((vx-board.left)/board.step)));
 const y=Math.max(0,Math.min(10,Math.round((board.bottom-vy)/board.step)));
 markVertex([x,y]);
});
$('build-add-point').onclick=()=>markVertex([Number($('build-x').value),Number($('build-y').value)]);
$('build-check').onclick=validateBuild;
$('build-next').onclick=()=>{if(!solved)return;taskIndex++;resetBuildTask()};
$('build-undo').onclick=()=>{if(solved)return;vertices.pop();boardDraw();feedbackBuild('Último vértice desfeito. Continue seu desenho.')};
$('build-clear').onclick=()=>{if(solved)return;vertices=[];boardDraw();feedbackBuild('Figura apagada. Comece novamente.')};
$('build-hint').onclick=()=>{
 const t=tasks[taskIndex],messages=['Pense na fórmula da área e na diferença entre base e altura.','Para esta missão: '+t[3],'Você pode marcar novos pontos e conferir quantas unidades quadradas a figura ocupa.'];
 const i=Math.min(hints++,messages.length-1);feedbackBuild('Dica '+(i+1)+' de 3: '+messages[i]);
};
$('build-ggb').onclick=()=>{
 const pts=polygonPoints();if(!pts){feedbackBuild('Marque os vértices da figura antes de visualizar no GeoGebra.','needs-work');return}
 if(!geoLoaded){feedbackBuild('O GeoGebra está indisponível. Sua malha interativa continua funcionando.');return}
 try{
  geo.newConstruction();geo.setAxesVisible(true,true);geo.setGridVisible(true);geo.setCoordSystem(0,13,0,10);
  if(typeof geo.setAxisSteps==='function')geo.setAxisSteps(1,1,1,1);
  if(geo.setGraphicsOptions)geo.setGraphicsOptions(1,{grid:true,gridType:0,gridDistance:[1,1]});
  pts.forEach((p,i)=>geo.evalCommand('P'+(i+1)+'=('+p[0]+','+p[1]+')'));
  geo.evalCommand('Projeto=Polygon('+pts.map((_,i)=>'P'+(i+1)).join(',')+')');
  geo.setColor('Projeto',0,138,167);geo.setFilling('Projeto',.35);
  feedbackBuild('A figura foi exibida no GeoGebra acima. Continue a validação na oficina abaixo.');
 }catch(e){feedbackBuild('Não foi possível sincronizar com o GeoGebra. Continue na malha interativa.','needs-work')}
};
$('builder-download').onclick=fullReport;
$('builder-repeat').onclick=()=>{taskIndex=wins=bonusXP=0;buildRecords=[];$('builder-finale').hidden=true;$('area-builder').hidden=false;resetBuildTask();$('area-builder').scrollIntoView({behavior:'smooth',block:'start'})};
const originalChoose=choose;
choose=function(v){originalChoose(v);gameScore()};
const originalFinish=finish;
finish=function(){
 originalFinish();
 $('area-complete').querySelector('h2').textContent='Missão 1 concluída! Oficina de construção liberada.';
 $('area-summary').textContent='Você investigou 12 figuras e acertou '+hits+'. Agora complete as 8 construções usando a malha de 1 cm, com dicas e novas tentativas.';
 $('area-builder').hidden=false;resetBuildTask();
 $('area-builder').scrollIntoView({behavior:'smooth',block:'start'});
};
gameScore();
