'use strict';
/* JP Recomposição — mecanismo compartilhado de Matemática/Geografia.
   Dados e progresso independentes em cada trilha; sem identificação obrigatória. */
(()=>{
const $=id=>document.getElementById(id);
const data=window.JPEscalaDados;
if(!data||data.levels?.length!==5||data.levels.some(l=>l.items?.length!==5)){
 document.getElementById('sc-report-status').textContent='Não foi possível carregar os conteúdos desta trilha. Atualize a página.';return;
}
const key=window.JPTrilha?.progressKey('jp_trilha_escalas_'+data.kind+'_v1')||'jp_trilha_escalas_'+data.kind+'_v1';
const localStore=window.JPTrilha?.progressStorage()||sessionStorage;
const fresh=()=>({active:0,step:0,started:false,review:false,completed:{},scores:{},answers:{},attempts:{},hints:{},history:[],createdAt:new Date().toISOString()});
let state=fresh(),intro=true,justFinished='';
try{
 const saved=JSON.parse(localStore.getItem(key)||'null');
 if(saved&&typeof saved==='object'&&saved.completed&&saved.answers&&saved.scores){
  state={...fresh(),...saved,active:Math.min(4,Math.max(0,Number(saved.active)||0)),step:Math.min(5,Math.max(0,Number(saved.step)||0))};
 }
}catch(e){}
const save=()=>{try{localStore.setItem(key,JSON.stringify(state))}catch(e){$('sc-report-status').textContent='Salvamento local indisponível. Baixe um relatório parcial para preservar suas respostas.'}};
const lesson=()=>data.levels[state.active];
const task=()=>lesson().items[state.step];
const id=(i,j)=>i+'-'+j+(state.review?'~revisao':'');
const currentKey=()=>id(state.active,state.step);
const all=()=>Object.keys(state.completed).filter(k=>state.completed[k]).length;
const completedTasks=()=>Object.keys(state.answers).filter(k=>!k.includes('~revisao')&&state.answers[k]?.done).length;
const points=()=>Object.values(state.scores).reduce((a,b)=>a+(Number(b)||0),0);
const allowed=i=>i===0||Boolean(state.completed[i-1])||Boolean(state.completed[i]);
const go=id=>$(id).scrollIntoView({block:'start',behavior:'smooth'});
const same=(a,b)=>Math.abs(a-b)<=0.00001*Math.max(1,Math.abs(b));
function status(){
 $('sc-stat-done').textContent=completedTasks()+'/25';
 $('sc-stat-levels').textContent=all()+'/5';
 $('sc-stat-points').textContent=points().toLocaleString('pt-BR');
}
function diagnostic(){
 const box=$('sc-diagnostic');box.replaceChildren();
 const recommended=[];
 for(let i=0;i<5;i++){
  if(!state.completed[i])continue;
  const a=data.levels[i].items.map((q,j)=>state.answers[i+'-'+j]).filter(Boolean);
  const first=a.filter(x=>x.firstTry).length;
  const hints=a.reduce((n,x)=>n+(x.hints||0),0);
  recommended.push({i,first,hints,priority:5-first+hints});
 }
 const need=recommended.filter(x=>x.priority>0).sort((a,b)=>b.priority-a.priority||a.i-b.i);
 const p=document.createElement('p');
 p.textContent=!recommended.length?'Conclua um nível para receber orientações de revisão.':!need.length?'Você concluiu os níveis estudados sem erros de primeira tentativa nem dicas. Continue avançando!':'Os níveis abaixo apresentam oportunidades de retomada:';
 box.append(p);
 for(const r of need){
  const el=document.createElement('div');el.className='sc-diagnostic-item';
  const strong=document.createElement('strong');strong.textContent='Nível '+(r.i+1)+' · '+data.levels[r.i].title;
  const detail=document.createElement('span');detail.textContent=r.first+'/5 acertos na 1ª tentativa · '+r.hints+' dicas';
  el.append(strong,detail);box.append(el);
 }
 $('sc-practice').disabled=!need.length;
 $('sc-practice').textContent=need.length?'↶ Revisar: '+data.levels[need[0].i].title:'✓ Acompanhamento atualizado';
 $('sc-practice').onclick=()=>{if(need.length)openLevel(need[0].i,true)};
}
function map(){
 status();diagnostic();
 $('sc-levels').replaceChildren();
 data.levels.forEach((l,i)=>{
  const card=document.createElement('article');card.className='sc-level'+(state.completed[i]?' complete':allowed(i)?' active':'');
  const emoji=document.createElement('span');emoji.className='sc-level-icon';emoji.textContent=l.icon;
  const h=document.createElement('h3');h.textContent='Nível '+(i+1)+' · '+l.title;
  const p=document.createElement('p');p.textContent=l.focus;
  const small=document.createElement('small');small.className='sc-mini';small.textContent=state.completed[i]?'✓ Concluído · '+(state.scores[i]||0)+' JPs':allowed(i)?'Pronto para estudar':'🔒 Conclua o anterior';
  const btn=document.createElement('button');btn.type='button';btn.className='sc-btn'+(state.completed[i]?' secondary':'');btn.disabled=!allowed(i);
  btn.textContent=state.completed[i]?'↶ Revisar':'Começar →';
  btn.addEventListener('click',()=>openLevel(i,Boolean(state.completed[i])));
  card.append(emoji,h,p,small,btn);$('sc-levels').append(card);
 });
}
function showMap(){
 $('sc-map').hidden=false;$('sc-play').hidden=true;$('sc-finished').hidden=true;
 map();go('sc-map');
}
function openLevel(i,revisit=false){
 if(!allowed(i))return;
 state.active=i;state.step=0;state.review=revisit;state.started=true;intro=true;justFinished='';
 if(revisit){
  for(let j=0;j<5;j++){const k=i+'-'+j+'~revisao';delete state.answers[k];delete state.attempts[k];delete state.hints[k]}
 }else{
  while(state.step<5&&state.answers[id(i,state.step)]?.done)state.step++;
 }
 save();showLesson();
}
function showLesson(){
 $('sc-map').hidden=true;$('sc-finished').hidden=true;$('sc-play').hidden=false;
 const l=lesson();
 $('sc-meta').textContent='Nível '+(state.active+1)+' de 5'+(state.review?' · revisão':'');
 $('sc-lesson-title').textContent=l.icon+' '+l.title;
 $('sc-lesson-focus').textContent=l.focus;
 $('sc-lesson-text').textContent=l.lesson;
 $('sc-lesson-example').textContent=l.example;
 $('sc-lesson-method').textContent=l.method;
 showStep();go('sc-play');
}
function feedback(msg,good){
 const el=$('sc-feedback');el.textContent=msg;el.className='sc-feedback'+(good?' good':'');
}
function drawBar(q){
 const wrap=$('sc-bar-wrap');wrap.hidden=!q.bar;
 if(!q.bar)return;
 const scale=$('sc-bar'),labels=$('sc-bar-labels');scale.replaceChildren();labels.replaceChildren();
 // O segmento gráfico é ilustrativo, não uma medida em centímetros da tela.
 for(let i=0;i<q.bar.segments;i++){
  const part=document.createElement('div');scale.append(part);
 }
 for(let i=0;i<=q.bar.segments;i++){
  const el=document.createElement('span');el.textContent=String(i*q.bar.step)+' '+q.bar.unit;labels.append(el);
 }
 scale.style.gridTemplateColumns='repeat('+q.bar.segments+',minmax(0,1fr))';
}
function orderedChoices(q){
 const arr=q.options.map((v,i)=>({v,i}));
 const seed=q.id;
 return arr.sort((a,b)=>hash(seed*17+a.i*11)-hash(seed*17+b.i*11));
}
function hash(n){let x=Math.imul(n+71,2654435761);x^=x>>>15;x=Math.imul(x,2246822519);x^=x>>>13;return x>>>0}
function showStep(){
 const n=state.step;
 $('sc-counter').textContent=n>=5?'5/5 concluídas':(n+1)+' / 5';
 $('sc-progress').setAttribute('aria-valuenow',String(n));
 $('sc-fill').style.width=(n/5*100)+'%';
 $('sc-intro').hidden=!intro;$('sc-question').hidden=intro||n>=5;
 if(n>=5){finishLevel();return}
 if(intro)return;
 const q=task(),record=state.answers[currentKey()];
 $('sc-question-type').textContent=q.mode==='num'?'RESPOSTA NUMÉRICA · ESCALA / PROPORÇÃO':'QUESTÃO DE INTERPRETAÇÃO';
 $('sc-question-text').textContent=q.prompt;
 $('sc-options').replaceChildren();
 $('sc-answer').hidden=q.mode!=='num';
 $('sc-next').disabled=!record?.done;
 $('sc-next').textContent=n===4?'Concluir nível →':'Próximo desafio →';
 $('sc-hint').disabled=Boolean(record?.done);
 drawBar(q);
 if(q.mode==='mc'){
  for(const op of orderedChoices(q)){
   const btn=document.createElement('button');btn.type='button';btn.className='sc-option';btn.textContent=op.v;
   if(record?.done){btn.disabled=true;if(op.i===q.answer)btn.classList.add('correct')}
   else btn.addEventListener('click',()=>respond(op.i===q.answer,op.v,q,()=>{btn.classList.add('wrong');btn.disabled=true}));
   $('sc-options').append(btn);
  }
 }else{
  $('sc-input').value=record?.done?String(record.response).replace('.',','):'';
  $('sc-input').disabled=Boolean(record?.done);$('sc-check').disabled=Boolean(record?.done);
  $('sc-unit').textContent=q.unit||'';
  $('sc-check').onclick=checkNumber;
  $('sc-input').onkeydown=e=>{if(e.key==='Enter'&&!state.answers[currentKey()]?.done){e.preventDefault();checkNumber()}};
 }
 feedback(record?.done?'✅ Resposta concluída. '+q.explanation:'Leia, calcule ou compare as informações e responda. Você pode rever a explicação.',Boolean(record?.done));
}
function checkNumber(){
 if(state.step>=5||task().mode!=='num'||state.answers[currentKey()]?.done)return;
 const raw=$('sc-input').value.trim().replace(/\s/g,'');
 const clean=raw.replace(',','.');
 if(!/^-?\d+(?:\.\d+)?$/.test(clean)){feedback('Digite apenas um valor numérico. Exemplos: 3, 2,5 ou 12. As unidades já estão indicadas.',false);return}
 const value=Number(clean),q=task();
 respond(same(value,q.answer),value,q,()=>{});
}
function respond(correct,response,q,onWrong){
 const k=currentKey();if(state.answers[k]?.done)return;
 state.attempts[k]=(state.attempts[k]||0)+1;
 if(correct){
  state.answers[k]={done:true,response,expected:q.mode==='mc'?q.options[q.answer]:q.answer,mode:q.mode,firstTry:state.attempts[k]===1,tries:state.attempts[k],hints:state.hints[k]||0,when:new Date().toISOString()};
  save();showStep();feedback('✅ Correto! '+q.explanation,true);status();
 }else{
  if(onWrong)onWrong();
  feedback('🔎 Tente novamente. '+(q.mode==='num'?'Confira os cálculos e a unidade solicitada. ':'Compare com a estratégia do nível. ')+'Você pode pedir uma dica.',false);
  save();
 }
}
function finishLevel(){
 const tag=state.active+'-'+(state.review?'revisao':'original');
 const records=Array.from({length:5},(_,j)=>state.answers[id(state.active,j)]);
 if(records.some(x=>!x?.done))return;
 if(justFinished!==tag){
  const first=records.filter(x=>x.firstTry).length,hints=records.reduce((a,b)=>a+(b.hints||0),0);
  const score=Math.max(40,Math.min(100,40+12*first-2*hints));
  state.completed[state.active]=true;
  state.scores[state.active]=Math.max(state.scores[state.active]||0,score);
  state.history.push({level:state.active+1,mode:state.review?'revisao':'original',first,hints,score,when:new Date().toISOString()});
  state.history=state.history.slice(-100);
  justFinished=tag;save();
  if(window.JPTrilha?.hasSession())window.JPTrilha.submit({activity:window.JPTrilha.activity,score:Math.min(100,Math.round(points()/5)),solved:completedTasks(),total:25,hints:Object.values(state.hints).reduce((n,v)=>n+(Number(v)||0),0)});
 }
 $('sc-play').hidden=true;$('sc-map').hidden=true;$('sc-finished').hidden=false;
 const last=state.history[state.history.length-1];
 $('sc-finish-text').textContent='Você concluiu "'+lesson().title+'". Acertos na primeira tentativa: '+last.first+' de 5. Melhor pontuação do nível: '+state.scores[state.active]+' JPs. '+(state.review?'Sua revisão foi registrada sem apagar as respostas anteriores.':'O próximo nível foi desbloqueado.');
 $('sc-continue').textContent=state.active===4?'Ver meu percurso concluído →':'Ir ao próximo nível →';
 map();go('sc-finished');
}
function exportCSV(){
 const rows=[['Tipo','Nível','Tema','Questão','Modalidade','Enunciado','Resposta','Gabarito','Tentativas','Acerto de primeira','Dicas','Pontuação JPs','Status']];
 rows.push(['Identificação','','','Nome (opcional)',$('sc-name').value.trim(),'Turma (opcional)',$('sc-class').value.trim(),'','','','','','']);
 for(let i=0;i<5;i++)for(let j=0;j<5;j++){
  const q=data.levels[i].items[j],a=state.answers[i+'-'+j];
  if(!a?.done)continue;
  rows.push(['Resposta',i+1,data.levels[i].title,j+1,q.mode==='num'?'Numérica':'Objetiva',q.prompt,String(a.response)+(q.mode==='num'&&q.unit?' '+q.unit:''),String(a.expected)+(q.mode==='num'&&q.unit?' '+q.unit:''),a.tries,a.firstTry?'Sim':'Não',a.hints,state.scores[i]||0,'Concluída']);
 }
 for(const h of state.history)rows.push(['Histórico',h.level,data.levels[h.level-1]?.title,'',h.mode,'Data: '+h.when,'1ª tentativa: '+h.first+'/5','Dicas: '+h.hints,'JPs: '+h.score,'','','','']);
 for(let i=0;i<5;i++){
  if(!state.completed[i])continue;
  const aa=Array.from({length:5},(_,j)=>state.answers[i+'-'+j]);
  const first=aa.filter(x=>x?.firstTry).length,hints=aa.reduce((n,a)=>n+(a?.hints||0),0);
  rows.push(['Diagnóstico',i+1,data.levels[i].title,'','Acertos de primeira',first+'/5','Dicas',hints,'Orientação',first<5||hints>0?'Revisão sugerida':'Progredir com revisão periódica','','','']);
 }
 rows.push(['Síntese','','','Atividades concluídas',completedTasks()+'/25','Níveis concluídos',all()+'/5','Total JPs',points(),'','','','']);
 rows.push(['Observação','','','','Resultados de prática; não equivalem à nota, presença ou validação oficial.','','','','','','','','']);
 const csv=v=>{let s=String(v??'').replace(/[\r\n]+/g,' ').trim();if(/^[=+@\t]/.test(s)||/^-(?!\d)/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'};
 const blob=new Blob(['\uFEFF'+rows.map(r=>r.map(csv).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='JP-'+data.kind+'-escalas-'+new Date().toISOString().slice(0,10)+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
 $('sc-report-status').textContent='Arquivo gerado neste dispositivo. Entregue ao professor pelo canal orientado.';
}
$('sc-start').addEventListener('click',()=>{
 let i=state.started&&!state.completed[state.active]?state.active:data.levels.findIndex((_,idx)=>!state.completed[idx]);
 if(i<0){showMap();return}
 openLevel(i,false);
});
$('sc-begin').addEventListener('click',()=>{intro=false;showStep()});
$('sc-hint').addEventListener('click',()=>{
 if(state.step>=5||state.answers[currentKey()]?.done)return;
 const k=currentKey();state.hints[k]=(state.hints[k]||0)+1;save();
 feedback('💡 Dica: '+task().hint,false);
});
$('sc-review').addEventListener('click',()=>{intro=true;showStep()});
$('sc-next').addEventListener('click',()=>{
 if(state.step>=5||!state.answers[currentKey()]?.done)return;
 state.step++;intro=false;save();showStep();if(state.step<5)go('sc-play');
});
$('sc-back').addEventListener('click',showMap);
$('sc-partial').addEventListener('click',exportCSV);
$('sc-export').addEventListener('click',exportCSV);
$('sc-finish-export').addEventListener('click',exportCSV);
$('sc-continue').addEventListener('click',()=>{if(state.active===4)showMap();else openLevel(state.active+1,false)});
$('sc-redo').addEventListener('click',()=>openLevel(state.active,true));
map();
})();