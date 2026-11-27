'use strict';
/* Horário em Cuiabá. Duração = estimativa com página visível; não mede atenção. */
(()=>{
const zone='America/Cuiaba';
const fmt=new Intl.DateTimeFormat('pt-BR',{timeZone:zone,dateStyle:'short',timeStyle:'medium'});
const date=v=>v?fmt.format(new Date(v)).replace(',',''):'';
const duration=v=>v==null?'':[Math.floor(v/3600),Math.floor(v/60)%60,v%60].map(x=>String(x).padStart(2,'0')).join(':');
const now=()=>new Date().toISOString();
const number=(v,max=10000)=>Math.min(max,Math.max(0,Math.floor(Number(v)||0)));
function label(summary){return (summary.objective||0)+' objetivas resolvidas; '+(summary.first||0)+' na primeira tentativa; '+(summary.written||0)+' escritas registradas';}
function create(activity,read,save,status){
 let opened=null, inFlight=null;
 const visible=()=>!document.hidden;
 const repaint=(msg,retry=false)=>status?.(msg,retry);
 const persist=()=>{try{save();}catch(e){}};
 const tick=()=>{
  const x=read();if(!x||x.finishedAt||opened===null)return;
  const t=performance.now(),delta=Math.max(0,t-opened);opened=t;
  x.ms=(x.ms||0)+delta;
 };
 function resume(){
  const x=read();if(x&&!x.finishedAt&&visible()&&opened===null)opened=performance.now();
 }
 function pause(){tick();opened=null;persist();}
 document.addEventListener('visibilitychange',()=>{if(visible())resume();else pause();});
 window.addEventListener('pagehide',pause);
 window.addEventListener('pageshow',resume);
 setInterval(()=>{if(opened!==null){tick();persist();}},5000);
 function start(){
  if(!globalThis.crypto?.randomUUID)return null;
  opened=visible()?performance.now():null;
  return {attemptId:crypto.randomUUID(),startedAt:now(),ms:0};
 }
 function end(summary){
  const x=read();if(!x)return false;
  if(!x.finishedAt){
   tick();opened=null;x.finishedAt=now();
   x.summary={solved:number(summary.solved,46),total:number(summary.total,46),objective:number(summary.objective,46),first:number(summary.first,46),written:number(summary.written,46),hints:number(summary.hints)};
   persist();
  }
  return true;
 }
 function seconds(x){
  if(!x?.startedAt)return null;
  const elapsed=Math.floor((Date.parse(x.finishedAt||now())-Date.parse(x.startedAt))/1000);
  return Math.max(0,Math.min(elapsed,Math.floor((x.ms||0)/1000),2678400));
 }
 function rows(count,final){
  tick();const x=read(), s=x?.summary;
  return [
   ['TEMPO DE REALIZAÇÃO','Início (Cuiabá)',date(x?.startedAt),'Conclusão (Cuiabá)',date(x?.finishedAt),'Duração com página visível (hh:mm:ss)',duration(seconds(x))],
   ['REGISTRO','Situação',final?'Concluída':'Parcial','Etapas registradas',count,'Horários conforme relógio do dispositivo',x?'Tempo com a página visível. Intervalos fora da aba e entre visitas não são contados.':'Horários e duração não disponíveis para este progresso anterior.'],
   ...(s?[['DESEMPENHO','Objetivas resolvidas',s.objective,'Acertos na primeira tentativa',s.first,'Produções escritas registradas',s.written,'Dicas',s.hints]]:[])
  ];
 }
 async function sync(){
  const x=read();if(!x?.finishedAt||!x.summary||x.summary.solved!==x.summary.total){
   repaint('Este percurso não tem uma conclusão com horários registrados. O CSV deste aparelho ainda pode ser baixado.');return false;
  }
  const s=x.summary;
  if(x.synced){repaint('✓ Resumo disponível na área restrita do JP Analytics. '+label(s)+'.');return true;}
  if(inFlight)return inFlight;
  const conf=window.JPAcessosConfig||{},base=String(conf.url||'').replace(/\/$/,'');
  let token='';try{token=JSON.parse(sessionStorage.getItem('jp_analytics_session_v1')||'null')?.access_token||'';}catch(e){}
  if(!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(base)||!conf.key||!token){
   repaint('CSV disponível neste aparelho. Sem sessão escolar nesta aba, o resumo não entra no painel: você pode baixar o arquivo e entregá-lo pelo canal da escola.',!!token);return false;
  }
  repaint('Sincronizando o resumo com a coordenação…');
  inFlight=(async()=>{
   try{
    const res=await fetch(base+'/rest/v1/rpc/jp_record_busca_report',{method:'POST',headers:{apikey:conf.key,Authorization:'Bearer '+token,'Content-Type':'application/json'},cache:'no-store',body:JSON.stringify({p_attempt_id:x.attemptId,p_activity:activity,p_started_at:x.startedAt,p_finished_at:x.finishedAt,p_duration_seconds:seconds(x),p_solved:s.solved,p_total:s.total,p_objective_solved:s.objective,p_first_try:s.first,p_written:s.written,p_hints:s.hints})});
    if(!res.ok||await res.json()!==true)throw Error('not saved');
    x.synced=true;persist();repaint('✓ Resumo disponível na área restrita do JP Analytics. '+label(s)+'.');return true;
   }catch(e){
    repaint('Não foi possível sincronizar. Baixe o CSV para guardar a atividade. Se a conexão e a sessão escolar estiverem ativas, tente enviar novamente.',true);return false;
   }finally{inFlight=null;}
  })();return inFlight;
 }
 return {start,end,resume,rows,sync,clear:()=>{opened=null;}};
}
window.JPBuscaRelatorio={create,date,duration};
})();
