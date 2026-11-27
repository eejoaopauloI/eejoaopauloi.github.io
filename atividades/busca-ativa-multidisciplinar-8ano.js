'use strict';
/* JP Recomposição — Busca Ativa Multidisciplinar, 8º ano Ensino Fundamental.
 * Preserva as 16 questões e a opção correta do material institucional.
 * As alternativas são redistribuídas de modo estável para reduzir padrões.
 * Registro exclusivamente local e CSV sem código.
 */
const $=id=>document.getElementById(id);
const missions=window.JP8AnoOriginal;
const miniChecks=missions.map((m,i)=>['Qual interpretação está de acordo com a explicação sobre '+m.subject+'?',m.lesson,m.options.find((v,j)=>j!==m.correct)]);
const stationInfo=[
{label:'Aprender com autonomia',from:1,to:4,icon:'📚'},
{label:'Projetos e investigação',from:5,to:8,icon:'🔎'},
{label:'Sociedade, linguagens e convivência',from:9,to:12,icon:'🌍'},
{label:'Comunicação, Matemática e natureza',from:13,to:16,icon:'🧠'}
];
const key=window.JPTrilha?.progressKey('jp_busca_ativa_8ano_16_v1')||'jp_busca_ativa_8ano_16_v1';
const localStore=window.JPTrilha?.progressStorage()||sessionStorage;
const fresh=()=>({index:0,started:false,answers:{},tries:{},hints:{},openedLessons:{},startedAt:new Date().toISOString()});
let state=fresh(),reviewOnly=false;
try{
 const data=JSON.parse(localStore.getItem(key)||'null');
 if(data&&Number.isInteger(data.index)&&data.index>=0&&data.index<=16&&data.answers&&data.tries&&data.openedLessons)state={...fresh(),...data};
}catch(error){}
const report=window.JPBuscaRelatorio?.create('busca-ativa-multidisciplinar-8ano',()=>state.report,()=>localStore.setItem(store,JSON.stringify(state)),(msg,retry)=>{$('md-report-status').textContent=msg;$('md-report-sync').hidden=!retry;});
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
 $('md-progress-text').textContent=state.index===16?'16 de 16 questões':'Desafio '+(state.index+1)+' de 16';
 $('md-progress-complete').textContent=complete()+' / 16 concluídos';
 $('md-progress-fill').style.width=Math.round(complete()/16*100)+'%';
 const pills=$('md-progress-pills');pills.replaceChildren();
 stationInfo.forEach((group,i)=>{
  const span=document.createElement('span'),finished=missions.filter(m=>station(m.n)===i&&state.answers[m.n]?.complete).length;
  span.textContent=group.icon;span.title=group.label+': '+finished+' / '+(group.to-group.from+1);
  span.className=finished===group.to-group.from+1?'passed':state.index<16&&station(item().n)===i?'current':'';
  pills.append(span);
 });
}
function show(){
 if(!state.started){screen('start');return}
 hud();
 if(state.index>=16){finish();return}
 if(!state.openedLessons[item().n]){renderLesson();return}
 renderQuestion();
}
function lessonFeedback(msg,good){const x=$('md-lesson-feedback');x.className='md-feedback'+(good?'':' warn');x.textContent=msg}
function renderLesson(){
 const m=item(),group=stationInfo[station(m.n)];
 screen('lesson');
 $('md-lesson-kicker').textContent='MINIAULA '+m.n+' / 16 · '+group.icon+' '+group.label.toUpperCase();
 $('md-lesson-title').textContent=m.subject+': entenda o conceito';
 $('md-lesson-text').textContent=m.lesson+' '+(window.JP8AnoAprofundamento?.[m.n-1]?.depth||'');
 $('md-deep-method').textContent=window.JP8AnoAprofundamento?.[m.n-1]?.method||m.hint;
 $('md-deep-mistake').textContent=window.JP8AnoAprofundamento?.[m.n-1]?.misconception||'Reveja o conceito antes de responder.';
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
 $('md-question-title').textContent='Tema '+m.n+' de 16 · Etapa 1 de 2';
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
 if(state.index>=16)return;const m=item();
 state.hints[m.n]=(state.hints[m.n]||0)+1;save();
 feedback('💡 '+m.hint,false);
});
$('md-question-revise').addEventListener('click',()=>{if(state.index>=16)return;reviewOnly=true;renderLesson()});
$('md-question-next').addEventListener('click',()=>{if(state.index>=16||!state.answers[item().n]?.complete)return;state.index++;save();show()});
$('md-start-btn').addEventListener('click',()=>{if(!state.started)state.report=report?.start();state.started=true;save();show()});
function exportCSV(final=false){
 const rows=[['Tipo','Número','Circuito','Componente','Enunciado','Resposta registrada','Gabarito','Tentativas','Dicas','Situação','Observação pedagógica']];
 for(const m of missions){
  const a=state.answers[m.n];if(!a?.complete)continue;
  rows.push(['Resposta',m.n,stationInfo[station(m.n)].label,m.subject,m.text,a.choice,m.options[m.correct],a.tries,a.hints,'Concluída',m.lesson]);
 }
 const applied=window.JP8AnoDesafios?.results?.()||{};
 if(report)rows.push(...report.rows(complete()+Object.values(applied).filter(x=>x.complete).length,!!state.report?.finishedAt||state.index>=16));
 const extras=window.JP8AnoAprofundamento||[];
 for(const a of extras){const result=applied[a.n];if(!result?.complete)continue;rows.push(['APLICAÇÃO',a.n,stationInfo[station(a.n)].label,missions[a.n-1].subject,a.question,result.selected,a.options[a.correct],result.tries,result.hints,'Concluída',a.reason]);}
 rows.push(['SÍNTESE','','','','Questões institucionais concluídas',complete()+' / 16','Aplicações concluídas',Object.values(applied).filter(x=>x.complete).length+' / 16','Acertos na primeira tentativa (institucionais)',missions.filter(m=>state.answers[m.n]?.tries===1).length,'']);
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
 const a=document.createElement('a');a.href=url;a.download='JP-busca-ativa-8ano-EF-'+(final?'final':'parcial')+'-'+new Date().toISOString().slice(0,10)+'.csv';
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
 const extra=Object.values(window.JP8AnoDesafios?.results?.()||{});
 const applied=extra.filter(x=>x.complete).length;
 const firstApplication=extra.filter(x=>x.complete&&x.tries===1).length;
 $('md-finish-text').textContent='Você concluiu '+complete()+' das 16 questões institucionais e '+applied+' dos 16 desafios de aplicação: '+(complete()+applied)+' atividades resolvidas. Acertos na primeira tentativa: '+first+' nas questões originais e '+firstApplication+' nas aplicações. Baixe o relatório com as duas etapas e as estratégias trabalhadas.';
 if(complete()+applied===32){report?.end({solved:32,total:32,objective:32,first:first+firstApplication,written:0,hints:Object.values(state.hints).reduce((n,x)=>n+(Number(x)||0),0)+extra.reduce((n,x)=>n+(Number(x.hints)||0),0)});report?.sync();}
 go('md-finish');
}
$('md-restart').addEventListener('click',()=>{
 if(!confirm('Recomeçar as 16 questões e apagar o progresso deste navegador? Baixe o relatório antes, se desejar preservar as respostas.'))return;
 report?.clear();state=fresh();reviewOnly=false;window.JP8AnoDesafios?.reset?.();save();show();window.scrollTo({top:0,behavior:'smooth'});
});
show();
