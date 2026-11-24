/* JPs — Pontos de Aprendizagem | Exportação local de comprovantes.
   Cada atividade completa vale no máximo 100 JPs. O dashboard contabiliza
   somente a melhor tentativa de cada atividade para cada código. */
(function(){
'use strict';
const activities={
 'circuito-tabuada':'Circuito da Tabuada',
 'areas-malha':'Missão Geometria — Áreas',
 'inteiros-laboratorio':'Laboratório de Números Inteiros',
 'inteiros-desafios':'Desafios de Números Inteiros',
 'palavras-vivas':'Palavras Vivas'
};
const normal=v=>String(v??'').trim().toUpperCase();
const validCode=c=>/^[A-Z0-9_-]{4,18}$/.test(c);
function field(value){let s=String(value??'').replace(/[\r\n]/g,' ').trim();if(/^[=+@\t]/.test(s)||/^-(?!\d)/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'}
function saveCSV(filename,rows){
 const csv='\uFEFF'+rows.map(r=>r.map(field).join(';')).join('\r\n');
 const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1800);
}
function exportar(args){
 const activity=args&&args.atividade;
 if(!activities[activity]){alert('Atividade não cadastrada no sistema JPs.');return false}
 if(!args.concluida){alert('Conclua a atividade antes de emitir o comprovante de JPs.');return false}
 const raw=prompt('Digite seu CÓDIGO ESCOLAR DE PARTICIPAÇÃO (4 a 18 caracteres, letras ou números). Solicite o código ao professor. Não informe seu nome completo.');
 if(raw===null)return false;
 const code=normal(raw);
 if(!validCode(code)){alert('Código inválido. Use de 4 a 18 letras, números, hífen ou sublinhado, sem espaços.');return false}
 const value=Math.max(0,Math.min(100,Math.round(Number(args.jps)||0)));
 const attempt=(Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10)).toUpperCase();
 const datetime=new Date().toISOString();
 const row=['JP_PONTOS_V1',code,activity,activities[activity],value,'SIM',datetime,attempt];
 const header=['formato','codigo','atividade','nome_atividade','jps','concluida','data_utc','tentativa_id'];
 saveCSV('JPs-'+activity+'-'+code+'-'+datetime.slice(0,10)+'.csv',[header,row]);
 alert('Comprovante gerado: '+value+' JPs. Entregue o arquivo ao professor. A coordenação validará o resultado antes da premiação.');
 return true;
}
window.JPPontos={exportar,activities,saveCSV,validCode};
})();