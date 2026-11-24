'use strict';
/* Dashboard JPs — armazenamento local, sem servidor ou autenticação.
 * Somente comprovantes JP_PONTOS_V1; melhor tentativa por código + atividade.
 * Conferência institucional indispensável antes de qualquer premiação. */
const $=id=>document.getElementById(id);
const STORE='jp_recomposicao_pontuacoes_v1';
const CATALOG={
 'circuito-tabuada':'Circuito da Tabuada',
 'areas-malha':'Missão Geometria — Áreas',
 'inteiros-laboratorio':'Laboratório de Números Inteiros',
 'inteiros-desafios':'Desafios de Números Inteiros',
 'palavras-vivas':'Palavras Vivas'
};
let archive=[];
function validCode(code){return /^[A-Z0-9_-]{4,18}$/.test(String(code))}
function validDate(value){return typeof value==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d/.test(value)&&!Number.isNaN(Date.parse(value))}
function loadLocal(){
 try{
  const value=JSON.parse(localStorage.getItem(STORE)||'[]');
  archive=Array.isArray(value)?value.filter(isRecord):[];
 }catch(error){archive=[];setStatus('O armazenamento local não está disponível. O painel funcionará nesta sessão; faça backup dos comprovantes.','review')}
}
function isRecord(row){
 return row&&row.formato==='JP_PONTOS_V1'&&validCode(row.codigo)&&Object.hasOwn(CATALOG,row.atividade)&&Number.isInteger(row.jps)&&row.jps>=0&&row.jps<=100&&row.concluida==='SIM'&&validDate(row.data_utc)&&typeof row.tentativa_id==='string'&&/^[A-Z0-9-]{8,60}$/.test(row.tentativa_id);
}
function saveLocal(){
 try{localStorage.setItem(STORE,JSON.stringify(archive))}
 catch(error){setStatus('O navegador não conseguiu salvar os resultados localmente. Faça backup dos comprovantes.','review')}
}
function setStatus(message,type='ok'){
 const p=$('jp-status');p.textContent=message;p.style.background=type==='review'?'#fff0e5':'#e7f8ed';
 p.style.borderColor=type==='review'?'#b56c38':'#298b5e';
}
/* Robust semicolon-separated CSV handling: UTF-8 BOM, quotes, escaped quotes,
   CRLF and LF; do not import arbitrary spreadsheets or CSV formulas as HTML. */
function parseCSV(text){
 const rows=[];let row=[],cell='',quoted=false;
 text=String(text).replace(/^\uFEFF/,'');
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(quoted){
   if(c==='"'&&text[i+1]==='"'){cell+='"';i++}
   else if(c==='"')quoted=false;
   else cell+=c;
  }else{
   if(c==='"'&&cell==='')quoted=true;
   else if(c===';'){row.push(cell);cell=''}
   else if(c==='\r'||c==='\n'){
    if(c==='\r'&&text[i+1]==='\n')i++;
    row.push(cell);cell='';
    if(row.some(v=>v.trim()!==''))rows.push(row);
    row=[];
   }else cell+=c;
  }
 }
 if(quoted)throw new Error('CSV com aspas não encerradas');
 if(cell||row.length){row.push(cell);if(row.some(v=>v.trim()!==''))rows.push(row)}
 return rows;
}
const HEADER=['formato','codigo','atividade','nome_atividade','jps','concluida','data_utc','tentativa_id'];
function decode(text){
 const lines=parseCSV(text);
 if(lines.length<2||lines[0].length!==8||!HEADER.every((h,i)=>lines[0][i].trim()===h))
  throw new Error('Formato desconhecido: use o arquivo Comprovante JPs ou backup do painel.');
 if(lines.length>5001)throw new Error('Backup possui mais registros que o limite de importação');
 return lines.slice(1).map(line=>{
  if(line.length!==8)throw new Error('Linha do CSV com número incorreto de colunas');
  const data=Object.fromEntries(HEADER.map((name,i)=>[name,line[i]]));
  if(!/^\d{1,3}$/.test(data.jps))throw new Error('Pontuação JPs inválida');
  data.jps=Number(data.jps);
  data.codigo=data.codigo.trim().toUpperCase();
  data.atividade=data.atividade.trim();
  data.concluida=data.concluida.trim();
  data.tentativa_id=data.tentativa_id.trim().toUpperCase();
  if(!isRecord(data))throw new Error('Comprovante incompleto ou com campos não reconhecidos');
  data.nome_atividade=CATALOG[data.atividade];
  return data;
 });
}
async function importFiles(){
 const files=[...$('jp-import').files];
 if(!files.length){setStatus('Selecione pelo menos um arquivo CSV para importar.','review');return}
 let imported=0,repeated=0,invalid=0;const errors=[];
 const known=new Set(archive.map(r=>r.tentativa_id+'|'+r.atividade+'|'+r.codigo));
 for(const file of files){
  try{
   if(!/\.csv$/i.test(file.name)||file.size>1200000||file.size<35)throw Error('Arquivo não é CSV válido ou é muito grande');
   const incoming=decode(await file.text());
   for(const data of incoming){
    const signature=data.tentativa_id+'|'+data.atividade+'|'+data.codigo;
    if(known.has(signature)){repeated++;continue}
    known.add(signature);archive.push(data);imported++;
   }
  }catch(error){invalid++;if(errors.length<3)errors.push(file.name+': '+error.message)}
 }
 saveLocal();render();
 setStatus('Importados: '+imported+'. Duplicados ignorados: '+repeated+'. Inválidos: '+invalid+'. '+(errors.length?'Problemas: '+errors.join(' | '):'Confira os resultados com os professores antes de premiar.'),invalid?'review':'ok');
 $('jp-import').value='';
}
function bestPerActivity(){
 const result=new Map();
 for(const r of archive){
  const key=r.codigo+'|'+r.atividade,old=result.get(key);
  if(!old||r.jps>old.jps||(r.jps===old.jps&&r.data_utc<old.data_utc))result.set(key,r);
 }
 return [...result.values()];
}
function standings(){
 const grouped=new Map();
 for(const r of bestPerActivity()){
  if(!grouped.has(r.codigo))grouped.set(r.codigo,{code:r.codigo,points:0,activities:0,records:[]});
  const student=grouped.get(r.codigo);student.points+=r.jps;student.activities++;student.records.push(r);
 }
 return [...grouped.values()].sort((a,b)=>b.points-a.points||b.activities-a.activities||a.code.localeCompare(b.code,'pt-BR'));
}
function make(tag,text,className){
 const el=document.createElement(tag);el.textContent=text;if(className)el.className=className;return el;
}
function clearNode(node){node.replaceChildren()}
function rankingTie(a,b){return a&&b&&a.points===b.points&&a.activities===b.activities}
function render(){
 const students=standings(),best=bestPerActivity(),total=students.reduce((n,s)=>n+s.points,0);
 $('metric-students').textContent=students.length;
 $('metric-records').textContent=archive.length;
 $('metric-points').textContent=total.toLocaleString('pt-BR');
 $('metric-activities').textContent=Object.keys(CATALOG).length;
 const podium=$('jp-podium');clearNode(podium);
 const medals=['🥇','🥈','🥉'];
 if(!students.length)podium.append(make('div','Nenhum comprovante importado. Oriente os estudantes a baixar o comprovante JPs ao concluir suas trilhas.','jp-empty'));
 else students.slice(0,3).forEach((s,i)=>{
  const card=make('article','','jp-winner');
  card.append(make('div',medals[i],'jp-medal'),make('small',(i+1)+'º LUGAR · CLASSIFICAÇÃO PROVISÓRIA'));
  card.append(make('strong',s.code));card.append(make('span',s.points+' JPs'));
  card.append(make('small',s.activities+' de '+Object.keys(CATALOG).length+' trilhas'));
  if(students.some((other,k)=>k!==i&&rankingTie(s,other)))card.append(make('small','EMPATE: revisão institucional necessária'));
  podium.append(card);
 });
 const body=$('jp-ranking');clearNode(body);
 if(!students.length){const tr=document.createElement('tr'),cell=make('td','Nenhum resultado ainda.');cell.colSpan=6;tr.append(cell);body.append(tr)}
 students.forEach((s,i)=>{
  const tr=document.createElement('tr');
  const cells=[String(i+1)+'º',s.code,s.points+' JPs',s.activities+' / '+Object.keys(CATALOG).length,Math.round(s.points/(s.activities*100)*100)+'%',students.some((o,k)=>k!==i&&rankingTie(o,s))?'Empate a revisar':'Provisório'];
  cells.forEach((val,j)=>{const td=make('td',val);if(j===1){td.replaceChildren(make('span',val,'jp-code'))}tr.append(td)});
  body.append(tr);
 });
}
function csvCell(value){
 let valueText=String(value??'').replace(/[\r\n]+/g,' ');
 if(/^[=+@\t]/.test(valueText)||/^-(?!\d)/.test(valueText))valueText="'"+valueText;
 return '"'+valueText.replace(/"/g,'""')+'"';
}
function download(name,rows){
 const text='\uFEFF'+rows.map(row=>row.map(csvCell).join(';')).join('\r\n');
 const url=URL.createObjectURL(new Blob([text],{type:'text/csv;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1200);
}
function exportStandings(){
 const rows=[['Posição provisória','Código','Total JPs','Trilhas concluídas','Atividades','Status de empate']];
 const students=standings();
 students.forEach((s,i)=>rows.push([i+1,s.code,s.points,s.activities,s.records.map(r=>CATALOG[r.atividade]+': '+r.jps+' JPs').join(' | '),students.some((other,k)=>k!==i&&rankingTie(s,other))?'REVER EMPATE':'']));
 download('jp-recomposicao-classificacao-'+new Date().toISOString().slice(0,10)+'.csv',rows);
 setStatus('Classificação CSV exportada. Confira autenticidade e possíveis empates antes de premiar.');
}
function exportBackup(){
 if(!archive.length){setStatus('Não há comprovantes para exportar.','review');return}
 const rows=[HEADER,...archive.map(r=>HEADER.map(k=>r[k]))];
 download('jp-recomposicao-backup-comprovantes-'+new Date().toISOString().slice(0,10)+'.csv',rows);
 setStatus('Backup de controle exportado. Guarde-o em pasta institucional protegida; você pode reimportá-lo neste painel.');
}
$('jp-import-action').addEventListener('click',importFiles);
$('jp-export').addEventListener('click',exportStandings);
$('jp-backup').addEventListener('click',exportBackup);
$('jp-print').addEventListener('click',()=>window.print());
$('jp-clear').addEventListener('click',()=>{
 if(!confirm('Apagar todos os comprovantes armazenados NESTE navegador? Antes de continuar, exporte um backup para sua pasta institucional.'))return;
 if(!confirm('Confirma a exclusão local de TODOS os registros JPs deste painel?'))return;
 archive=[];try{localStorage.removeItem(STORE)}catch(error){}
 render();setStatus('Os dados foram apagados deste navegador.');
});
loadLocal();render();