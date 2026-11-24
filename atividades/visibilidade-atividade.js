/* JP Recomposição — acompanhamento transparente da visibilidade da atividade.
 * Não monitora sites visitados, buscas, teclas ou conteúdo de outras abas.
 * Contabiliza transições visible -> hidden, inclusive minimização e troca de app.
 * Dados ficam nesta aba/aba recarregada e são exportados exclusivamente no relatório local.
 */
(function(){
 'use strict';
 const key='jp_visibilidade_v1:'+location.pathname;
 const fresh={saidas:0,segundos:0,escondidoEm:null,iniciadoEm:new Date().toISOString()};
 let session=fresh;
 try{
  const value=JSON.parse(sessionStorage.getItem(key)||'null');
  if(value&&Number.isSafeInteger(value.saidas)&&value.saidas>=0&&value.saidas<100000&&Number.isFinite(value.segundos)&&value.segundos>=0){
   session={...fresh,...value,escondidoEm:null};
  }
 }catch(error){}
 let hiddenAt=document.visibilityState==='hidden'?Date.now():null;
 let lastHidden=document.visibilityState==='hidden';
 const save=()=>{try{sessionStorage.setItem(key,JSON.stringify({...session,escondidoEm:null}))}catch(error){}};
 function snapshot(){
  const ongoing=hiddenAt!==null?Math.max(0,(Date.now()-hiddenAt)/1000):0;
  return {saidas:session.saidas,segundos:Math.round(session.segundos+ongoing),aviso:'Mudanças para estado oculto; não indicam pesquisa, fraude ou consulta a outros sites.'};
 }
 document.addEventListener('visibilitychange',()=>{
  const hidden=document.visibilityState==='hidden';
  if(hidden===lastHidden)return;
  lastHidden=hidden;
  if(hidden){session.saidas+=1;hiddenAt=Date.now();save()}
  else {if(hiddenAt!==null)session.segundos+=Math.max(0,(Date.now()-hiddenAt)/1000);hiddenAt=null;save()}
  updateLabel();
 });
 window.addEventListener('pagehide',save);
 function csvRows(length=8){
  const x=snapshot(), pad=(label,value)=>[label,value,...Array(Math.max(0,length-2)).fill('')];
  return [
   pad('VISIBILIDADE DA PÁGINA','Contagem de vezes que a atividade ficou oculta: '+x.saidas),
   pad('TEMPO EM SEGUNDO PLANO',String(x.segundos)+' segundo(s), valor aproximado'),
   pad('NOTA DE INTERPRETAÇÃO',x.aviso)
  ];
 }
 function updateLabel(){const el=document.getElementById('jp-visibilidade-numero');if(el)el.textContent=String(session.saidas)}
 function announce(){
  const target=document.querySelector('main');
  if(!target)return;
  const el=document.createElement('div');el.className='jp-visibility-note';el.style.cssText='max-width:1180px;margin:12px auto 18px;padding:12px 15px;border:1px solid #b8d8e5;border-left:4px solid #088ba5;border-radius:11px;background:#eef9fc;color:#315a6e;font:14px/1.55 system-ui,sans-serif';
  el.innerHTML='<strong>Transparência sobre o acompanhamento:</strong> esta atividade registra quantas vezes a página deixa de ficar visível (por exemplo, ao trocar de aba, minimizar o navegador ou mudar de aplicativo). <strong>Ocorrências: <span id="jp-visibilidade-numero">0</span>.</strong> O registro é incluído no relatório local para fins de acompanhamento pedagógico. Não informa quais sites foram acessados nem comprova pesquisa ou irregularidade.';
  target.prepend(el);updateLabel();
 }
 window.JPVisibilidade={snapshot,csvRows};
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',announce,{once:true});else announce();
})();