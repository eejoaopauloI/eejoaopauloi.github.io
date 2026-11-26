'use strict';
/* JP Analytics: integração opcional de atividades.
   Só transmite dados quando o estudante estiver autenticado e o banco habilitado.
   Respostas enviadas permanecem pendentes de validação institucional. */
(()=>{
const cfg=window.JPAcessosConfig||{},base=String(cfg.url||'').replace(/\/$/,'');
const key=cfg.key||'',ready=/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(base)&&/^(sb_publishable_|eyJ)/.test(key);
const storage='jp_analytics_session_v1';
const token=()=>{try{return JSON.parse(sessionStorage.getItem(storage)||'null')?.access_token||''}catch(e){return ''}};
async function rpc(name,payload){
 if(!ready||!token())return {ok:false,reason:'no_session'};
 try{
 const r=await fetch(base+'/rest/v1/rpc/'+name,{method:'POST',headers:{apikey:key,Authorization:'Bearer '+token(),'Content-Type':'application/json'},body:JSON.stringify(payload),cache:'no-store'});
 return {ok:r.ok,reason:r.ok?'ok':'server_error'};
 }catch(e){return {ok:false,reason:'network_error'};}
}
const activity='missao-decimal';
window.JPMonitorClient={ready,hasSession:()=>ready&&Boolean(token()),submit:async d=>rpc('jp_submit_learning',{
 p_activity:activity,p_score:d.score,p_solved:d.solved,p_total:d.total,
 p_extra_attempts:d.extraAttempts||0,p_hints:d.hints||0
})};
if(ready&&token())rpc('jp_log_visit',{p_activity:activity});
})();