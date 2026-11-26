'use strict';
(()=>{const $=id=>document.getElementById(id),conf=window.JPAcessosConfig||{},base=String(conf.url||'').replace(/\/$/,'');
const key=conf.key||'';const valid=/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(base)&&/^(sb_publishable_|eyJ)/.test(key||'');
const note=$('rk-status'),podium=$('rk-podium'),rows=$('rk-rows');
const make=(tag,value)=>{const e=document.createElement(tag);e.textContent=String(value);return e};
async function load(){
if(!valid){podium.textContent='Ranking em preparação.';note.textContent='O sistema central ainda não foi ativado pela escola.';return;}
try{
const response=await fetch(base+'/rest/v1/rpc/jp_public_ranking',{method:'POST',headers:{apikey:key,'Content-Type':'application/json'},body:'{}',cache:'no-store'});
if(!response.ok)throw Error('O serviço não respondeu.');
const data=await response.json();if(!Array.isArray(data))throw Error('Resposta inválida');
podium.replaceChildren();rows.replaceChildren();
if(!data.length){podium.textContent='Nenhuma conquista validada e autorizada para divulgação até o momento.';note.textContent='Os resultados aparecem após autorização de divulgação e conferência pedagógica.';return;}
const icons=['🥇','🥈','🥉'];
data.slice(0,3).forEach((s,i)=>{const card=make('article','');card.className='rk-winner';card.append(make('span',icons[i]),make('strong',s.alias),make('p',s.total_jps+' JPs'));podium.append(card)});
data.forEach((s,i)=>{const tr=make('tr','');[i+1+'º',s.alias,s.total_jps,s.activities].forEach(v=>tr.append(make('td',v)));rows.append(tr)});
note.textContent='Exibindo apenas apelidos ou códigos com divulgação autorizada e pontuação validada.';
}catch(e){podium.textContent='Não foi possível carregar a classificação.';note.textContent='Tente novamente mais tarde.';}
}
load();
})();