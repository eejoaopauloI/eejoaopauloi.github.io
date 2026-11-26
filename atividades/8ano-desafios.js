/* JP Recomposição — 16 desafios de transferência aplicados após as 16 questões originais. */
(()=>{'use strict';
 const data=window.JP8AnoAprofundamento;
 if(!Array.isArray(data)||data.length!==16)return;
 const $=id=>document.getElementById(id);
 const key=window.JPTrilha?.progressKey('jp_busca_ativa_8ano_aplicacoes_v1')||'jp_busca_ativa_8ano_aplicacoes_v1';
const localStore=window.JPTrilha?.progressStorage()||sessionStorage;
 let results={};
 try{
  const parsed=JSON.parse(localStore.getItem(key)||'{}');
  if(parsed&&typeof parsed==='object'&&!Array.isArray(parsed))results=parsed;
 }catch(e){}
 const save=()=>{try{localStore.setItem(key,JSON.stringify(results))}catch(e){}};
 let bypass=false;
 let previewing=false;
 const count=()=>Object.values(results).filter(x=>x?.complete).length;
 function updateProgress(){
  if(!$('md-progress-complete')||$('md-progress-area').hidden)return;
  const original=typeof complete==='function'?complete():0;
  $('md-progress-complete').textContent=original+' / 16 originais · '+count()+' / 16 aplicações';
  $('md-progress-fill').style.width=Math.round((original+count())/32*100)+'%';
 }
 function showApplication(){
  if(typeof state==='undefined'||state.index>=16)return;
  const n=state.index+1;
  const t=data[n-1],a=results[n];
  $('md-question-card').hidden=true;
  $('md-lesson').hidden=true;
  $('md-application').hidden=false;
  $('md-application-title').textContent='Tema '+n+' de 16 · Etapa 2 de 2';
  $('md-application-subject').textContent='🔗 '+t.topic.toUpperCase();
  $('md-application-depth').textContent=t.depth;
  $('md-application-question').textContent=t.question;
  $('md-application-options').replaceChildren();
  $('md-application-next').disabled=!a?.complete;
  $('md-application-next').textContent=n===16?'Concluir jornada de 32 desafios →':'Avançar para o próximo tema →';
  t.options.forEach((value,i)=>{
   const btn=document.createElement('button');
   btn.type='button';btn.className='md-choice';
   btn.textContent=String.fromCharCode(65+i)+') '+value;
   if(a?.complete){btn.disabled=true;if(i===t.correct)btn.classList.add('correct')}
   else btn.addEventListener('click',()=>{
    if(results[n]?.complete)return;
    const record=results[n]||{tries:0,hints:0};
    record.tries++;
    if(i===t.correct){
     results[n]={...record,complete:true,selected:value,correct:t.options[t.correct]};
     save();showApplication();
     message('✅ Raciocínio correto! '+t.reason,true);
     updateProgress();
    }else{
     results[n]=record;save();
     btn.classList.add('wrong');btn.disabled=true;
     message('🔎 A alternativa não resolve adequadamente a situação. Releia os dados, observe o erro comum e peça uma estratégia se necessário.',false);
    }
   });
   $('md-application-options').append(btn);
  });
  message(a?.complete?'✅ Aplicação concluída. '+t.reason:'Analise a situação. Escolha a alternativa justificável pelos conceitos e dados apresentados.',Boolean(a?.complete));
  updateProgress();
  $('md-application').scrollIntoView({behavior:'smooth',block:'start'});
 }
 function message(txt,good){
  const box=$('md-application-feedback');
  box.className='md-feedback'+(good?'':' warn');
  box.textContent=txt;
 }
 $('md-question-next').addEventListener('click',e=>{
  if(bypass||typeof state==='undefined'||state.index>=16)return;
  const n=state.index+1;
  if(!state.answers[n]?.complete)return;
  e.stopImmediatePropagation();
  e.preventDefault();
  showApplication();
 },true);
 $('md-application-hint').addEventListener('click',()=>{
  if(typeof state==='undefined'||state.index>=16)return;
  const n=state.index+1,t=data[n-1];
  if(results[n]?.complete){message('✅ '+t.reason,true);return}
  const r=results[n]||{tries:0,hints:0};r.hints++;results[n]=r;save();
  message('💡 Estratégia orientadora: '+t.method+' Atenção ao erro comum: '+t.misconception,false);
 });
 $('md-application-back').addEventListener('click',()=>{
  if(typeof renderQuestion==='function')renderQuestion();
 });
 $('md-application-next').addEventListener('click',()=>{
  if(typeof state==='undefined'||state.index>=16||!results[state.index+1]?.complete)return;
  $('md-application').hidden=true;
  bypass=true;
  try{$('md-question-next').click()}finally{bypass=false}
  updateProgress();
 });
 window.JP8AnoDesafios={
  results:()=>JSON.parse(JSON.stringify(results)),
  reset:()=>{results={};try{localStore.removeItem(key)}catch(e){}}
 };
 updateProgress();
})();