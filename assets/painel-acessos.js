(()=>{'use strict';
const $=id=>document.getElementById(id);
const ids=[
 ['balanca-equacoes','⚖️ Balança das Equações','atividades/balanca-equacoes.html'],
 ['circuito-tabuada','🏁 Circuito da Tabuada','atividades/circuito-tabuada.html'],
 ['areas-malha','▦ Áreas de Figuras Planas','atividades/areas-malha-geogebra.html'],
 ['inteiros-desafios','➕ Desafios de Números Inteiros','atividades/inteiros.html'],
 ['inteiros-laboratorio','🔢 Laboratório de Inteiros','atividades/laboratorio-inteiros.html'],
 ['palavras-vivas','📖 Palavras Vivas','atividades/palavras-vivas.html'],
 ['detetives-texto','🔎 Detetives do Texto','atividades/detetives-texto.html'],
 ['versos-em-movimento','✍️ Versos em Movimento','atividades/versos-em-movimento.html'],
 ['busca-ativa-multidisciplinar','🌎 Missão Conexões · 9º ano','atividades/busca-ativa-multidisciplinar.html']
];
function rows(result){
 const body=$('ac-rows');body.replaceChildren();
 let visits=0,unique=0;
 for(const [id,name,link] of ids){
  const v=result.find(x=>x.atividade===id);
  const u=Number(v?.navegadores_distintos||0),a=Number(v?.acessos_totais||0);
  visits+=a;unique+=u;
  const tr=document.createElement('tr'),td=document.createElement('td'),anchor=document.createElement('a');
  anchor.href=link;anchor.textContent=name;td.append(anchor);tr.append(td);
  for(const number of [u,a]){const cell=document.createElement('td');cell.textContent=number.toLocaleString('pt-BR');tr.append(cell)}
  body.append(tr);
 }
 $('ac-views').textContent=visits.toLocaleString('pt-BR');
 $('ac-unique').textContent=unique.toLocaleString('pt-BR');
}
async function refresh(){
 $('ac-state').textContent='Consultando contagem central...';
 $('ac-refresh').disabled=true;
 try{
  if(!window.JPAcessos?.enabled)throw Error('Aguardando configuração do serviço externo de contagem.');
  const result=await window.JPAcessos.stats();
  if(!Array.isArray(result))throw Error('Resposta inválida do serviço.');
  rows(result);
  $('ac-state').textContent='Dados atualizados em '+new Date().toLocaleTimeString('pt-BR')+'.';
  $('ac-warning').textContent='Os indicadores são agregados e não identificam alunos. A coleta começa somente após a ativação do serviço.';
 }catch(e){
  $('ac-state').textContent=e.message||'Não foi possível obter dados.';
  $('ac-rows').innerHTML='<tr><td colspan="3">Sem dados disponíveis. Aguardando conexão com o serviço.</td></tr>';
  $('ac-views').textContent='—';$('ac-unique').textContent='—';
 }finally{$('ac-refresh').disabled=false}
}
$('ac-refresh').addEventListener('click',refresh);
refresh();
})();