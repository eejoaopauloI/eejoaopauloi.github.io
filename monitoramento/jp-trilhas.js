'use strict';
/* JP Analytics — conector comum de atividades.
   Nunca envia nomes, respostas discursivas nem senhas.
   Os pontos enviados são preliminares e exigem validação pedagógica. */
(()=>{
 const conf=window.JPAcessosConfig||{};
 const base=String(conf.url||'').replace(/\/$/,'');
 const key=conf.key||'';
 const enabled=/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(base)&&/^(sb_publishable_|eyJ)/.test(key);
 const allowed=new Set(['missao-decimal','inteiros-desafios','inteiros-laboratorio','circuito-tabuada','palavras-vivas','detetives-texto','poesia-contemporanea-ba','proporcoes-escala','geografia-escalas','ingles-niveis','balanca-equacoes','busca-ativa-multidisciplinar','areas-malha','busca-ativa-multidisciplinar-3em','busca-ativa-multidisciplinar-2em','busca-ativa-multidisciplinar-8ano']);
 const store='jp_analytics_session_v1';
 const path=location.pathname.split('/').pop().toLowerCase();
 const lookup={
 'missao-decimal.html':'missao-decimal','inteiros.html':'inteiros-desafios',
 'laboratorio-inteiros.html':'inteiros-laboratorio','circuito-tabuada.html':'circuito-tabuada',
 'palavras-vivas.html':'palavras-vivas','detetives-texto.html':'detetives-texto',
 'versos-em-movimento.html':'poesia-contemporanea-ba',
 'matematica-proporcoes-escala.html':'proporcoes-escala',
 'geografia-escalas.html':'geografia-escalas','ingles-niveis.html':'ingles-niveis',
 'balanca-equacoes.html':'balanca-equacoes','busca-ativa-multidisciplinar.html':'busca-ativa-multidisciplinar',
 'areas-malha-geogebra.html':'areas-malha',
 'busca-ativa-multidisciplinar-3em.html':'busca-ativa-multidisciplinar-3em',
 'busca-ativa-multidisciplinar-2em.html':'busca-ativa-multidisciplinar-2em',
 'busca-ativa-multidisciplinar-8ano.html':'busca-ativa-multidisciplinar-8ano'};
 const activity=lookup[path]||'';
 const access=()=>{try{
  const jwt=JSON.parse(sessionStorage.getItem(store)||'null')?.access_token||'';
  const segments=jwt.split('.');if(segments.length!==3)return '';
  const payload=JSON.parse(atob(segments[1].replace(/-/g,'+').replace(/_/g,'/')));
  return Number(payload.exp)*1000>Date.now()&&payload.sub?jwt:'';
 }catch(e){return ''}};
 const makeMessage=()=>{
  if(document.getElementById('jp-central-sync'))return document.getElementById('jp-central-sync');
  const container=document.createElement('aside');container.id='jp-central-sync';
  container.setAttribute('role','status');container.setAttribute('aria-live','polite');
  container.style.cssText='position:relative;max-width:900px;margin:16px auto;padding:13px 18px;border-radius:12px;border:2px solid #bddbe4;background:#eef9fc;color:#073e65;font:600 14px/1.55 system-ui;';
  const body=document.querySelector('main')||document.body;
  body.append(container);return container;
 };
 const notice=s=>{const el=makeMessage();el.textContent=s;};
 const send=async(rpc,payload)=>{
  const token=access();if(!enabled||!token)return {ok:false,reason:'not_authenticated'};
  try{
   const r=await fetch(base+'/rest/v1/rpc/'+rpc,{method:'POST',headers:{apikey:key,Authorization:'Bearer '+token,'Content-Type':'application/json'},cache:'no-store',body:JSON.stringify(payload)});
   return {ok:r.ok,reason:r.ok?'ok':'rejected'};
  }catch(e){return {ok:false,reason:'offline'};}
 };
 const visited=new Set();
 async function visit(slug=activity){
  if(!allowed.has(slug)||visited.has(slug))return false;
  const result=await send('jp_log_visit',{p_activity:slug});
  if(result.ok)visited.add(slug);return result.ok;
 }
 async function submit(input={}){
  const slug=String(input.activity||activity);
  if(!allowed.has(slug))return {ok:false,reason:'unknown_activity'};
  const score=Math.round(Number(input.score));
  const solved=Math.floor(Number(input.solved));
  const total=Math.floor(Number(input.total));
  const extra=Math.max(0,Math.floor(Number(input.extraAttempts)||0));
  const hints=Math.max(0,Math.floor(Number(input.hints)||0));
  if(!Number.isFinite(score)||score<0||score>100||!Number.isFinite(solved)||!Number.isFinite(total)||total<1||total>200||solved<0||solved>total)return {ok:false,reason:'invalid_result'};
  const result=await send('jp_submit_learning',{p_activity:slug,p_score:score,p_solved:solved,p_total:total,p_extra_attempts:Math.min(10000,extra),p_hints:Math.min(10000,hints)});
  if(result.ok)notice('✓ Progresso da atividade enviado à coordenação. Pontuação pendente de validação pedagógica.');
  else if(result.reason==='not_authenticated')notice('Para registrar seu progresso, acesse Minha Área com sua conta escolar e retorne a esta atividade.');
  else notice('O resultado ficou neste dispositivo. Não foi possível sincronizar agora; procure a coordenação ou tente novamente.');
  return result;
 }
 window.JPTrilha={activity,visit,submit,notice,hasSession:()=>enabled&&!!access()};
 if(activity&&enabled&&access())visit(activity);
})();