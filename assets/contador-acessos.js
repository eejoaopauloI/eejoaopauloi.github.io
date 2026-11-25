/* Contagem agregada das atividades — não identifica estudantes. */
(()=>{
 'use strict';
 const items={
  'balanca-equacoes.html':['balanca-equacoes','⚖️ Balança das Equações'],
  'circuito-tabuada.html':['circuito-tabuada','🏁 Circuito da Tabuada'],
  'areas-malha-geogebra.html':['areas-malha','▦ Áreas na Malha'],
  'inteiros.html':['inteiros-desafios','➕ Desafios de Inteiros'],
  'laboratorio-inteiros.html':['inteiros-laboratorio','🔢 Laboratório de Inteiros'],
  'palavras-vivas.html':['palavras-vivas','📖 Palavras Vivas'],
  'detetives-texto.html':['detetives-texto','🔎 Detetives do Texto'],
  'versos-em-movimento.html':['versos-em-movimento','✍️ Versos em Movimento'],
  'busca-ativa-multidisciplinar.html':['busca-ativa-multidisciplinar','🌎 Missão Conexões'],
  'busca-ativa-multidisciplinar-3em.html':['busca-ativa-multidisciplinar-3em','🎓 Missão Conexões · EM']
 };
 const names=Object.fromEntries(Object.values(items).map(([id,name])=>[id,name]));
 const config=window.JPAcessosConfig||{};
 const enabled=/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(config.url||'')&&/^(sb_publishable_|eyJ)/.test(config.key||'');
 const base=(config.url||'').replace(/\/$/,'');
 const key=config.key||'';
 const path=location.pathname.split('/').pop().toLowerCase();
 const activity=items[path]?.[0]||null;
 const store='jp_contador_navegador_v1',optout='jp_contador_desativado_v1';
 function identity(){
  try{
   let uuid=localStorage.getItem(store);
   if(uuid&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid))return uuid;
   if(!crypto?.randomUUID)return null;
   uuid=crypto.randomUUID();
   localStorage.setItem(store,uuid);
   return uuid;
  }catch(e){return null}
 }
 const optedOut=()=>{try{return localStorage.getItem(optout)==='sim'}catch(e){return true}};
 async function rpc(func,payload){
  const r=await fetch(base+'/rest/v1/rpc/'+func,{
   method:'POST',
   headers:{apikey:key,'Content-Type':'application/json'},
   body:JSON.stringify(payload),
   cache:'no-store',
   credentials:'omit'
  });
  if(!r.ok)throw Error('Serviço de contagem indisponível ('+r.status+').');
  if(func==='jp_estatisticas_acessos')return await r.json();
 }
 async function stats(){
  if(!enabled)throw Error('Aguardando a configuração do serviço de contagem da escola.');
  return await rpc('jp_estatisticas_acessos',{});
 }
 window.JPAcessos={enabled,items,names,stats};
 if(!activity)return;
 async function start(){
  const main=document.querySelector('main');
  if(!main)return;
  const box=document.createElement('aside');
  box.style.cssText='max-width:1180px;margin:14px auto 18px;padding:14px 17px;background:#f2fafc;border:1px solid #b8dfe9;border-left:5px solid #0b91aa;border-radius:12px;color:#2b566a;font:14px/1.55 system-ui,sans-serif';
  const heading=document.createElement('strong');heading.textContent='📊 Participação na atividade';
  const value=document.createElement('p');value.style.margin='6px 0';value.textContent='A contagem coletiva ainda não foi ativada.';
  const note=document.createElement('p');note.style.cssText='margin:8px 0 6px;font-size:12px;color:#557486';note.textContent='O indicador estima navegadores distintos, não estudantes identificados. Não acompanha respostas, nomes ou sites visitados.';
  const label=document.createElement('label');label.style.cssText='display:flex;gap:8px;align-items:center;font-size:12px;color:#345e73';
  const input=document.createElement('input');input.type='checkbox';input.checked=!optedOut();
  const span=document.createElement('span');span.textContent='Permitir a contagem anônima deste navegador';
  label.append(input,span);box.append(heading,value,note,label);
  main.prepend(box);
  input.addEventListener('change',()=>{
   try{localStorage.setItem(optout,input.checked?'nao':'sim');if(!input.checked)localStorage.removeItem(store)}catch(e){}
   value.textContent=input.checked?'Contagem habilitada neste navegador para os próximos acessos.':'Contagem desativada neste navegador.';
  });
  if(!enabled){value.textContent='Painel de acessos em preparação: aguardando conexão com o serviço de dados.';return}
  if(!optedOut()){
   const uuid=identity();
   if(uuid){try{await rpc('jp_registrar_acesso',{p_atividade:activity,p_navegador:uuid})}catch(e){value.textContent='Não foi possível registrar o acesso nesta ocasião.'}}
  }
  try{
   const result=await stats();const hit=result.find(x=>x.atividade===activity);
   const uniq=Number(hit?.navegadores_distintos||0),views=Number(hit?.acessos_totais||0);
   value.textContent='Navegadores distintos: '+uniq.toLocaleString('pt-BR')+' · Acessos totais: '+views.toLocaleString('pt-BR');
  }catch(e){value.textContent='Contagem temporariamente indisponível.'}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
