'use strict';
(()=>{
 const $=id=>document.getElementById(id);
 const cfg=window.JPAcessosConfig||{},base=String(cfg.url||'').replace(/\/$/,'');
 const apiKey=cfg.key||'';
 const valid=/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(base)&&/^(sb_publishable_|eyJ)/.test(apiKey);
 const note=$('rk-status'),podium=$('rk-podium'),rows=$('rk-rows');
 const selection=$('rk-class'),summary=$('rk-summary');
 const make=(tag,value)=>{const e=document.createElement(tag);e.textContent=String(value??'');return e;};
 let data=[];
 function render(){
  const turma=selection.value;
  const chosen=turma?data.filter(s=>s.class_name===turma):data.slice();
  chosen.sort((a,b)=>Number(b.total_jps)-Number(a.total_jps)||Number(b.activities)-Number(a.activities)||a.alias.localeCompare(b.alias,'pt-BR'));
  $('rk-podium-title').textContent='🥇 Pódio '+(turma?'do '+turma:'geral da escola');
  $('rk-list-title').textContent='Classificação '+(turma?'— '+turma:'geral da escola');
  summary.textContent=(turma?'Turma '+turma:'Todas as turmas')+' · '+chosen.length+' estudante(s) com pontuação validada e divulgação autorizada';
  podium.replaceChildren();rows.replaceChildren();
  if(!chosen.length){
   podium.append(make('p','Ainda não há resultados autorizados e validados para esta classificação.'));
   const tr=document.createElement('tr'),td=make('td','Sem resultados disponíveis.');td.colSpan=5;tr.append(td);rows.append(tr);
   note.textContent='A publicação depende de validação pedagógica e autorização. Nenhum nome completo ou número de matrícula é divulgado.';
   return;
  }
  ['🥇','🥈','🥉'].forEach((icon,i)=>{
   const s=chosen[i];if(!s)return;
   const card=make('article','');card.className='rk-winner';
   card.append(make('span',icon),make('strong',s.alias),make('p',s.class_name+' · '+s.total_jps+' JPs'));
   podium.append(card);
  });
  chosen.forEach((s,i)=>{
   const tr=make('tr','');[i+1+'º',s.alias,s.class_name,s.total_jps,s.activities].forEach(v=>tr.append(make('td',v)));rows.append(tr);
  });
  note.textContent='Exibimos somente apelidos/códigos e pontuações autorizadas e validadas, nunca nomes reais ou matrículas.';
 }
 async function load(){
  if(!valid){data=[];render();note.textContent='O serviço de classificação ainda não foi configurado.';return;}
  try{
   const response=await fetch(base+'/rest/v1/rpc/jp_public_ranking_by_class',{method:'POST',headers:{apikey:apiKey,'Content-Type':'application/json'},body:'{}',cache:'no-store'});
   if(!response.ok)throw Error('Serviço indisponível.');
   const result=await response.json();
   if(!Array.isArray(result)||result.some(s=>typeof s.alias!=='string'||typeof s.class_name!=='string'))throw Error('Resposta inválida.');
   data=result;render();
  }catch(e){data=[];render();note.textContent='Não foi possível carregar o ranking neste momento.';}
 }
 selection.addEventListener('change',render);
 load();
})();