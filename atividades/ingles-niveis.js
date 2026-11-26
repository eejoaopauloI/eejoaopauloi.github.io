'use strict';
/* JP Inglês · Missão English — 5 níveis, 15 lições, 90 exercícios.
 * Respostas e progresso são armazenados exclusivamente neste navegador.
 * A fala usa síntese de voz do dispositivo, quando disponível.
 */
(()=>{
const $=id=>document.getElementById(id);
const lessons=window.JPInglesLessons;
if(!Array.isArray(lessons)||lessons.length!==15)throw Error('Currículo indisponível');
const levels=[
 {title:'Primeiros Passos',label:'Saudações, escola, números e cores',icon:'🌱'},
 {title:'Eu e minha rotina',label:'Família, verbo to be e hábitos',icon:'🏠'},
 {title:'Meu mundo',label:'Gostos, lugares e esportes',icon:'🌎'},
 {title:'No tempo certo',label:'Agora, ontem e amanhã',icon:'⏰'},
 {title:'Conectando ideias',label:'Leitura, meio ambiente e futuro',icon:'🚀'}
];
const key='jp_ingles_missao_english_v1';
const defaults=()=>({active:0,step:0,started:false,completed:{},best:{},answers:{},tries:{},hints:{},history:[],createdAt:new Date().toISOString()});
let state=defaults(),intro=true,ordered=[],bank=[],review=false;
try{
 const saved=JSON.parse(localStorage.getItem(key)||'null');
 if(saved&&typeof saved==='object'&&saved.answers&&saved.completed&&saved.tries&&saved.best){
  state={...defaults(),...saved,active:Math.min(14,Math.max(0,Number(saved.active)||0)),step:Math.min(6,Math.max(0,Number(saved.step)||0))};
  review=Boolean(saved.reviewMode);
 }
}catch(e){}
const save=()=>{try{state.reviewMode=review;localStorage.setItem(key,JSON.stringify(state))}catch(e){$('en-report-status').textContent='Não foi possível salvar no navegador. Baixe um relatório para preservar os resultados.'}};
const qid=(i,s)=>i+'-'+s;
const keyNow=()=>qid(state.active,state.step)+(review?'~revision':'');
const lesson=()=>lessons[state.active];
const all=()=>Object.keys(state.completed).filter(k=>state.completed[k]).length;
const done=()=>Object.values(state.answers).filter(a=>a?.done).length;
const pts=()=>Object.values(state.best).reduce((sum,n)=>sum+(Number(n)||0),0);
const levelDone=n=>lessons.filter(x=>x.level===n).every((x)=>state.completed[lessons.indexOf(x)]);
const visible=id=>$(id).scrollIntoView({block:'start',behavior:'smooth'});
function speak(text){
 if(!('speechSynthesis'in window)||!('SpeechSynthesisUtterance'in window)){
  showFeedback('🔊 Este dispositivo não oferece áudio nesta página. Use a transcrição e as alternativas visuais.',false);return;
 }
 try{
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);u.lang='en-US';u.rate=.84;u.pitch=1;
  const voice=window.speechSynthesis.getVoices().find(v=>v.lang?.toLowerCase().startsWith('en'));
  if(voice)u.voice=voice;
  window.speechSynthesis.speak(u);
 }catch(e){showFeedback('O áudio não pôde ser reproduzido. O texto permanece disponível.',false)}
}
function stats(){
 $('en-stat-lessons').textContent=all()+'/15';
 $('en-stat-answers').textContent=done()+'/90';
 $('en-stat-jps').textContent=pts().toLocaleString('pt-BR');
 $('en-stat-badges').textContent=levels.filter((_,i)=>levelDone(i+1)).length+'/5';
}
function allowed(i){return i===0||Boolean(state.completed[i-1])||Boolean(state.completed[i])}
function diagnosis(){
 const area=$('en-diagnostic'),btn=$('en-practice-suggested');
 area.replaceChildren();
 const reviewed=[];
 for(let i=0;i<lessons.length;i++){
  if(!state.completed[i])continue;
  const records=Array.from({length:6},(_,j)=>state.answers[qid(i,j)]).filter(Boolean);
  const first=records.filter(x=>x.firstTry).length;
  const attempts=records.reduce((n,x)=>n+(x.tries||0),0);
  const hints=records.reduce((n,x)=>n+(x.hints||0),0);
  reviewed.push({i,first,attempts,hints,need:6-first+hints});
 }
 const need=reviewed.filter(x=>x.first<5||x.hints>0).sort((a,b)=>b.need-a.need||a.i-b.i);
 const heading=document.createElement('p');
 if(!reviewed.length)heading.textContent='Comece pelo Nível 1. Depois de concluir uma lição, você verá aqui quais temas merecem mais atenção.';
 else if(!need.length)heading.textContent='Você acertou pelo menos cinco desafios de primeira em cada tema concluído, sem precisar de dicas. Continue avançando e revise quando desejar.';
 else heading.textContent='Estes temas merecem nova prática. A indicação considera tentativas e dicas, não representa diagnóstico individual definitivo.';
 area.append(heading);
 for(const x of need.slice(0,5)){
  const article=document.createElement('div');article.className='en-diagnostic-item';
  const label=document.createElement('strong');label.textContent='Lição '+(x.i+1)+' · '+lessons[x.i].topic;
  const info=document.createElement('span');
  info.textContent=x.first+'/6 acertos de primeira · '+x.attempts+' tentativas · '+x.hints+' dicas';
  article.append(label,info);area.append(article);
 }
 btn.disabled=!need.length;btn.textContent=need.length?'↶ Revisar '+lessons[need[0].i].topic:'✓ Revisão em dia';
 btn.onclick=()=>{if(need.length)openLesson(need[0].i,true)};
}
function map(){
 stats();diagnosis();
 $('en-levels').replaceChildren();
 levels.forEach((lv,j)=>{
  const sec=document.createElement('section');sec.className='en-level';
  const header=document.createElement('div');header.className='en-level-head';
  const title=document.createElement('h3');title.textContent=lv.icon+' Nível '+(j+1)+' · '+lv.title;
  const detail=document.createElement('small');
  const completed=lessons.filter((l,i)=>l.level===j+1&&state.completed[i]).length;
  detail.textContent=completed+'/3 lições concluídas · '+lv.label;
  header.append(title,detail);sec.append(header);
  const body=document.createElement('div');body.className='en-level-body';
  lessons.forEach((l,i)=>{
   if(l.level!==j+1)return;
   const card=document.createElement('article');card.className='en-lesson'+(state.completed[i]?' done':allowed(i)?' active':'');
   const icon=document.createElement('span');icon.className='en-lesson-icon';icon.textContent=['👋','📚','🎨','🏠','✨','☀️','🍎','🗺️','🏐','🎬','📅','🚀','🔍','🌱','🎓'][i];
   const h=document.createElement('h4');h.textContent=(i+1)+'. '+l.title;
   const note=document.createElement('p');note.textContent=l.goal;
   const score=document.createElement('span');score.className='en-pill';
   const first=Array.from({length:6},(_,j)=>state.answers[qid(i,j)]).filter(a=>a?.firstTry).length;
   score.textContent=state.completed[i]?'✓ Concluída · '+(state.best[i]||0)+' JPs'+(first<4?' · Revisão recomendada':''):allowed(i)?'Desbloqueada':'🔒 Conclua a anterior';
   const b=document.createElement('button');b.className='en-btn'+(state.completed[i]?' secondary':'');b.type='button';
   b.textContent=state.completed[i]?'↶ Revisar lição':allowed(i)?'Começar →':'🔒 Bloqueada';b.disabled=!allowed(i);
   b.addEventListener('click',()=>openLesson(i,Boolean(state.completed[i])));
   card.append(icon,h,note,score,b);body.append(card);
  });
  sec.append(body);$('en-levels').append(sec);
 });
}
function openLesson(i,again=false){
 if(!allowed(i))return;
 state.active=i;state.started=true;review=again;
 state.step=0;
 if(again){
  // Revisão independente: preserva todas as respostas originais, conquistas e JPs.
  for(let j=0;j<6;j++){delete state.answers[qid(i,j)+'~revision'];delete state.tries[qid(i,j)+'~revision'];delete state.hints[qid(i,j)+'~revision']}
 }else{
  while(state.step<6&&state.answers[qid(i,state.step)]?.done)state.step++;
 }
 intro=true;save();showLesson();
}
function showLesson(){
 $('en-map').hidden=true;$('en-complete').hidden=true;$('en-play').hidden=false;
 const l=lesson();
 $('en-lesson-meta').textContent='Nível '+l.level+' · Lição '+(state.active+1)+' de 15'+(review?' · revisão':'');
 $('en-lesson-title').textContent=l.title;
 $('en-lesson-goal').textContent=l.goal;
 $('en-vocab').replaceChildren();
 for(const [en,pt] of l.vocab){
  const card=document.createElement('div');card.className='en-vocab-card';
  const t=document.createElement('span'),strong=document.createElement('strong'),small=document.createElement('small');
  strong.textContent=en;small.textContent=pt;t.append(strong,small);
  const b=document.createElement('button');b.type='button';b.className='en-audio';b.textContent='🔊';b.setAttribute('aria-label','Ouvir '+en);
  b.addEventListener('click',()=>speak(en));
  card.append(t,b);$('en-vocab').append(card);
 }
 $('en-example').textContent=l.pattern;$('en-example-pt').textContent=l.translation;$('en-tip').textContent='💡 '+l.tip+' '+(l.deepNote||'')+' ⚠️ Erro comum: '+(l.misconception||'');
 renderStep();
 visible('en-play');
}
function renderStep(){
 const l=lesson();const n=state.step;
 $('en-progress').setAttribute('aria-valuenow',String(n));
 $('en-progress-bar').style.width=(n/6*100)+'%';
 $('en-question-count').textContent=n>=6?'6 de 6 concluídos':(n+1)+' de 6';
 $('en-intro').hidden=!intro;
 $('en-exercise').hidden=intro||n>=6;
 if(n>=6){finishLesson();return}
 if(intro)return;
 const items=makeExercises(l),q=items[n],record=state.answers[keyNow()];
 $('en-exercise-mode').textContent=q.label;
 $('en-exercise-jps').textContent='Exercício '+(n+1)+' · '+(state.tries[keyNow()]||0)+' tentativa(s)';
 $('en-task').textContent=q.prompt;
 $('en-audio-container').hidden=q.mode!=='audio';$('en-transcript').hidden=true;
 $('en-transcript').textContent=q.audio||'';
 $('en-options').replaceChildren();$('en-typing').hidden=true;$('en-order').hidden=true;
 $('en-next').disabled=!record?.done;
 $('en-next').textContent=n===5?'Concluir lição →':'Próximo exercício →';
 $('en-hint').disabled=Boolean(record?.done);
 $('en-revise').disabled=false;
 if(q.mode==='mc'||q.mode==='audio'){
  const order=[...q.options.keys()].sort((a,b)=>(hash(state.active*7+n*11+a)-hash(state.active*7+n*11+b)));
  // Prevent a predictable answer always occupying the same location.
  for(const j of order){
   const b=document.createElement('button');b.type='button';b.className='en-option';
   b.textContent=q.options[j];
   if(record?.done){b.disabled=true;if(j===q.correct)b.classList.add('correct')}
   else b.addEventListener('click',()=>{
    if(state.answers[keyNow()]?.done)return;
    evaluate(j===q.correct,q.options[j],q,()=>{b.classList.add('wrong');b.disabled=true});
   });
   $('en-options').append(b);
  }
 }else if(q.mode==='type'){
  $('en-typing').hidden=false;
  $('en-input').value='';
  $('en-input').disabled=Boolean(record?.done);
  $('en-check-input').disabled=Boolean(record?.done);
  if(record?.done)$('en-input').value=record.response;
  const check=()=>evaluate(eq($('en-input').value,q.answer),$('en-input').value,q,()=>{});
  $('en-check-input').onclick=check;
  $('en-input').onkeydown=e=>{if(e.key==='Enter'&&!state.answers[keyNow()]?.done){e.preventDefault();check()}};
 }else if(q.mode==='order'){
  $('en-order').hidden=false;ordered=[];bank=q.answer.split(' ').map((v,i)=>({text:v,index:i})).sort((a,b)=>hash(a.index*17+state.active*41+n*7)-hash(b.index*17+state.active*41+n*7));
  $('en-check-order').disabled=Boolean(record?.done);
  if(record?.done){ordered=q.answer.split(' ').map((v,i)=>({text:v,index:i}));bank=[]}
  renderBank();
  $('en-check-order').onclick=()=>evaluate(eq(ordered.map(x=>x.text).join(' '),q.answer),ordered.map(x=>x.text).join(' '),q,()=>{});
 }
 if(record?.done)showFeedback('✅ Resposta registrada. '+q.explanation,true);
 else showFeedback('Observe a explicação da lição e responda. Você pode tentar novamente se precisar.',false);
}
function hash(n){let x=(n+13)*2654435761;x^=x>>>16;x=Math.imul(x,2246822519);x^=x>>>13;return x>>>0}
function eq(a,b){
 const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[.!?,;:]/g,'').replace(/\s+/g,' ').trim();
 return norm(a)===norm(b);
}
function makeExercises(l){
 return [
 {mode:'mc',label:'VOCABULÁRIO EM CONTEXTO',prompt:l.choice[0],options:[...l.choice[1]],answer:l.choice[1][l.choice[2]],explanation:'A alternativa correta é "'+l.choice[1][l.choice[2]]+'". '+l.tip},
 {mode:'audio',label:'ESCUTA E COMPREENSÃO',prompt:'Ouça a frase e escolha seu significado em português.',audio:l.listen,options:[l.listenPt,...l.audioDistractors],answer:l.listenPt,explanation:'A expressão "'+l.listen+'" corresponde a "'+l.listenPt+'".'},
 {mode:'mc',label:'COMPLETE A FRASE',prompt:l.fill[0],options:l.fill[1],answer:l.fill[1][l.fill[2]],explanation:'A opção correta completa a frase respeitando a estrutura estudada: '+l.tip},
 {mode:'order',label:'ORGANIZE A FRASE',prompt:'Organize as palavras para dizer em inglês: '+l.order[0],answer:l.order[1],explanation:'A ordem adequada é: '+l.order[1]+'.'},
 {mode:'type',label:'ESCRITA',prompt:l.type[0],answer:l.type[1],explanation:'A escrita esperada é: '+l.type[1]+'.'},
 {mode:'mc',label:'LEITURA E INTERPRETAÇÃO',prompt:l.reading[0],options:l.reading[1],answer:l.reading[1][l.reading[2]],explanation:'A resposta é sustentada pelas informações da frase apresentada.'}
 ].map(q=>{if(q.options){q.options=[...new Set(q.options)];q.correct=q.options.indexOf(q.answer);if(q.correct<0||q.options.length<3)throw Error('Opções inválidas: '+l.title)}return q});
}
function renderBank(){
 const picked=$('en-answerbank'),pool=$('en-wordbank');picked.replaceChildren();pool.replaceChildren();
 for(const x of ordered){const b=document.createElement('button');b.className='en-chip selected';b.type='button';b.textContent=x.text;b.disabled=Boolean(state.answers[keyNow()]?.done);b.setAttribute('aria-label','Remover '+x.text+' da frase');b.addEventListener('click',()=>{ordered.splice(ordered.indexOf(x),1);bank.push(x);renderBank()});picked.append(b)}
 for(const x of bank){const b=document.createElement('button');b.className='en-chip';b.type='button';b.textContent=x.text;b.setAttribute('aria-label','Adicionar '+x.text+' à frase');b.addEventListener('click',()=>{bank.splice(bank.indexOf(x),1);ordered.push(x);renderBank()});pool.append(b)}
}
function evaluate(correct,response,q,onWrong){
 const k=keyNow();if(state.answers[k]?.done)return;
 state.tries[k]=(state.tries[k]||0)+1;
 if(correct){
  state.answers[k]={done:true,mode:q.mode,prompt:q.prompt,response,answer:q.answer,firstTry:state.tries[k]===1,hints:state.hints[k]||0,tries:state.tries[k],date:new Date().toISOString()};
  save();renderStep();showFeedback('✅ Certo! '+q.explanation,true);
 }else{
  if(onWrong)onWrong();
  showFeedback('🔎 Ainda não. '+(q.mode==='type'?'Confira a escrita e a ordem das letras. ':q.mode==='order'?'Observe a ordem do sujeito e do verbo. ':'Compare as alternativas com a miniaula. ')+'Você pode tentar novamente.',false);
  save();
 }
}
function showFeedback(msg,good){const box=$('en-feedback');box.className='en-feedback'+(good?' good':'');box.textContent=msg}
function finishLesson(){
 const index=state.active;
 const answers=Array.from({length:6},(_,i)=>state.answers[qid(index,i)+(review?'~revision':'')]);
 if(answers.some(a=>!a?.done))return;
 const first=answers.filter(a=>a.firstTry).length;
 const hints=answers.reduce((sum,a)=>sum+(a.hints||0),0);
 const score=Math.max(40,Math.min(100,40+first*10-hints*2));
 state.completed[index]=true;state.best[index]=Math.max(state.best[index]||0,score);
 state.history.push({lesson:index+1,when:new Date().toISOString(),first,score,hints,mode:review?'revisao':'original'});
 if(state.history.length>100)state.history=state.history.slice(-100);
 state.step=6;save();
 if(window.JPTrilha?.hasSession())window.JPTrilha.submit({activity:'ingles-niveis',score:Math.min(100,Math.round(pts()/15)),solved:all()*6,total:90,hints:Object.values(state.hints).reduce((n,v)=>n+(Number(v)||0),0)});
 $('en-play').hidden=true;$('en-complete').hidden=false;$('en-map').hidden=true;
 $('en-complete-message').textContent=(review?'Revisão finalizada. ':'Lição concluída. ')+'Você acertou '+first+' dos 6 exercícios na primeira tentativa. Melhor resultado: '+state.best[index]+' JPs nesta lição. Seus registros anteriores foram preservados.';
 map();visible('en-complete');
}
function next(){
 if(!state.answers[keyNow()]?.done)return;
 state.step++;intro=false;save();renderStep();if(state.step<6)visible('en-play');
}
function showMap(){
 if('speechSynthesis' in window)window.speechSynthesis.cancel();
 $('en-play').hidden=true;$('en-complete').hidden=true;$('en-map').hidden=false;
 map();visible('en-map');
}
function exportCSV(){
 const rows=[['Tipo','Lição','Nível','Tema','Exercício','Modalidade','Enunciado','Resposta','Gabarito','Tentativas','Acerto primeira tentativa','Dicas','JPs da lição','Situação']];
 rows.push(['Identificação','','','','Nome opcional',$('en-student').value.trim(),'Turma opcional',$('en-class').value.trim(),'','','','','','']);
 for(let i=0;i<lessons.length;i++){
  const l=lessons[i];
  for(let j=0;j<6;j++){
   const q=makeExercises(l)[j],a=state.answers[qid(i,j)];
   if(!a?.done)continue;
   rows.push(['Resposta',i+1,l.level,l.title,j+1,q.label,q.prompt,a.response,q.answer,a.tries,a.firstTry?'Sim':'Não',a.hints,state.best[i]||0,'Concluída']);
  }
 }
for(const h of state.history){rows.push(['Histórico',h.lesson,lessons[h.lesson-1]?.level,lessons[h.lesson-1]?.title,'Sessão',h.mode==='revisao'?'Revisão':'Original','Data',h.when,'Acertos de primeira',h.first,'Dicas',h.hints,'JPs obtidos',h.score]);}
for(let i=0;i<lessons.length;i++){
  if(!state.completed[i])continue;
  const records=Array.from({length:6},(_,j)=>state.answers[qid(i,j)]).filter(Boolean);
  const first=records.filter(a=>a.firstTry).length;
  const hints=records.reduce((n,a)=>n+(a.hints||0),0);
  rows.push(['Diagnóstico',i+1,lessons[i].level,lessons[i].topic,'Acertos de primeira',first+'/6','Dicas usadas',hints,'Orientação',first<5||hints>0?'Revisão recomendada':'Avançar mantendo revisão periódica','','','','']);
 }
 rows.push(['Síntese','','','','Lições concluídas',all()+'/15','Exercícios concluídos',done()+'/90','JPs acumulados',pts(),'Níveis concluídos',levels.filter((_,i)=>levelDone(i+1)).length,'','']);
 rows.push(['Observação','','','','Aprendizagem progressiva com correção e novas tentativas','O relatório não constitui frequência escolar nem avaliação oficial.','','','','','','','','']);
 rows.push(['Gerado em','','','','Data e hora',new Date().toLocaleString('pt-BR'),'','','','','','','','']);
 const field=v=>{let s=String(v??'').replace(/[\r\n]+/g,' ').trim();if(/^[=+@\t]/.test(s)||/^-(?!\d)/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'};
 const contents='\uFEFF'+rows.map(r=>r.map(field).join(';')).join('\r\n');
 const url=URL.createObjectURL(new Blob([contents],{type:'text/csv;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download='JP-Ingles-Missao-English-'+new Date().toISOString().slice(0,10)+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1600);
 $('en-report-status').textContent='Relatório gerado neste dispositivo. Entregue ao professor pelo canal indicado pela escola.';
}
$('en-start').addEventListener('click',()=>{if(state.started&&!state.completed[state.active])openLesson(state.active);else openLesson(Math.min(14,all()),false)});
$('en-begin-questions').addEventListener('click',()=>{intro=false;renderStep()});
$('en-hear-example').addEventListener('click',()=>speak(lesson().pattern));
$('en-hear-task').addEventListener('click',()=>speak(lesson().listen));
$('en-show-transcript').addEventListener('click',()=>{$('en-transcript').hidden=false});
$('en-hint').addEventListener('click',()=>{
 if(state.step>=6)return;const k=keyNow();state.hints[k]=(state.hints[k]||0)+1;save();
 const q=makeExercises(lesson())[state.step];
 showFeedback('💡 '+lesson().tip+(q.mode==='order'?' Comece identificando o sujeito da frase.':''),false);
});
$('en-revise').addEventListener('click',()=>{intro=true;renderStep();visible('en-play')});
$('en-next').addEventListener('click',next);
$('en-back-map').addEventListener('click',showMap);
$('en-download-partial').addEventListener('click',exportCSV);
$('en-export').addEventListener('click',exportCSV);
$('en-export-after').addEventListener('click',exportCSV);
$('en-print').addEventListener('click',()=>window.print());
$('en-continue').addEventListener('click',()=>{const nextIndex=Math.min(14,state.active+1);if(nextIndex===state.active&&state.completed[nextIndex])showMap();else openLesson(nextIndex,false)});
$('en-replay').addEventListener('click',()=>openLesson(state.active,true));
stats();map();
})();