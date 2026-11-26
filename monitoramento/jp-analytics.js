'use strict';
(()=>{
const $=id=>document.getElementById(id);
const config=window.JPAcessosConfig||{},base=String(config.url||'').replace(/\/$/,'');
const pubKey=config.key||'',ready=/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(base)&&/^(sb_publishable_|eyJ)/.test(pubKey);
const sessionKey='jp_analytics_session_v1';
let token='',data=null;
const message=t=>$('ja-status').textContent=t;
const show=id=>['ja-setup','ja-login','ja-student','ja-admin','ja-change-password'].forEach(n=>$(n).hidden=n!==id);
const getToken=()=>{try{return JSON.parse(sessionStorage.getItem(sessionKey)||'null')?.access_token||''}catch(e){return ''}};
const putToken=t=>{try{sessionStorage.setItem(sessionKey,JSON.stringify({access_token:t}))}catch(e){}};
function logout(){try{sessionStorage.removeItem(sessionKey)}catch(e){}token='';data=null;show('ja-login');message('Sessão encerrada neste navegador.');}
async function request(path,method='POST',body={},authenticated=true){
 const headers={apikey:pubKey,'Content-Type':'application/json'};
 if(authenticated)headers.Authorization='Bearer '+token;
 const res=await fetch(base+path,{method,headers,body:JSON.stringify(body),cache:'no-store'});
 if(!res.ok){const err=await res.text();throw Error('Serviço recusou a solicitação ('+res.status+'). '+err.slice(0,120));}
 if(res.status===204)return null;
 const text=await res.text();return text?JSON.parse(text):null;
}
async function rpc(name,payload={}){return request('/rest/v1/rpc/'+name,'POST',payload);}
const row=(values,body)=>{const tr=document.createElement('tr');values.forEach(v=>{const td=document.createElement('td');td.textContent=String(v??'—');tr.append(td)});body.append(tr);return tr;};
function render(){
if(!data)return;
$('ja-students').textContent=data.students??0;$('ja-views').textContent=data.views??0;
$('ja-visitors').textContent=data.distinct_visitors??0;$('ja-submissions').textContent=data.submissions??0;
const sb=$('ja-student-rows'),lb=$('ja-learning-rows'),db=$('ja-daily-rows');sb.replaceChildren();lb.replaceChildren();db.replaceChildren();
(data.students_detail||[]).forEach(s=>row([s.full_name,s.class_name,s.public_alias,s.accesses,s.verified_jps,s.public_opt_in?'Autorizado':'Oculto'],sb));
(data.activities||[]).forEach(a=>{
 const tr=row([a.full_name,a.class_name,a.activity,a.score,a.solved+'/'+a.question_total,a.verified?'Validado':'Pendente'],lb);
 const td=document.createElement('td'),btn=document.createElement('button');
 btn.className='ja-btn secondary';btn.type='button';btn.textContent=a.verified?'Revogar':'Validar';
 btn.onclick=async()=>{if(!confirm((a.verified?'Revogar validação de ':'Validar após conferência: ')+a.full_name+' · '+a.activity+' · '+a.score+' JPs?'))return;
 btn.disabled=true;try{await rpc('jp_admin_verify',{p_id:a.id,p_verified:!a.verified});await refresh();}catch(e){message('Erro ao atualizar: '+e.message);btn.disabled=false;}};
 td.append(btn);tr.append(td);
});
(data.daily_views||[]).forEach(d=>row([d.visit_day,d.views,d.students],db));
message('Painel atualizado. Nomes e resultados individuais acessíveis somente nesta sessão institucional.');
}
async function refresh(){data=await rpc('jp_admin_overview');render();}
async function identify(){
try{
 const profile=await rpc('jp_my_profile');
 if(profile?.role==='admin'){show('ja-admin');await refresh();}
 else if(profile?.role==='student'&&profile.must_change_password){show('ja-change-password');message('Antes de iniciar, cadastre sua senha pessoal.');}
 else if(profile?.role==='student'){show('ja-student');$('ja-my-name').textContent='Estudante: '+profile.name+' · '+profile.class_name+' · Apelido: '+profile.alias;message('Conta de estudante autenticada.');}
 else{logout();message('Conta não cadastrada para uso do JP Analytics. Solicite o vínculo à escola.');}
}catch(e){logout();message('Não foi possível validar o acesso. '+e.message);}
}
function csvCell(v){let s=String(v??'').replace(/[\r\n]/g,' ');if(/^[=+@\t]/.test(s)||/^-(?!\d)/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
$('ja-export').onclick=()=>{
if(!data)return;const rows=[['Nome','Turma','Apelido público','Atividade','JPs','Questões','Total','Erros adicionais','Dicas','Validado','Data']];
(data.activities||[]).forEach(a=>rows.push([a.full_name,a.class_name,(data.students_detail||[]).find(s=>s.user_id===a.user_id)?.public_alias||'',a.activity,a.score,a.solved,a.question_total,a.extra_attempts,a.hints,a.verified?'SIM':'NÃO',a.created_at]));
const text='\uFEFF'+rows.map(r=>r.map(csvCell).join(';')).join('\r\n');
const url=URL.createObjectURL(new Blob([text],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='jp-analytics-interno-'+new Date().toISOString().slice(0,10)+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
message('Relatório interno gerado. Armazene-o somente em pasta institucional com acesso restrito.');
};
const downloadCSV=(name,rows)=>{
 const text='\uFEFF'+rows.map(r=>r.map(csvCell).join(';')).join('\r\n');
 const url=URL.createObjectURL(new Blob([text],{type:'text/csv;charset=utf-8'}));
 const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
};
const parseInput=txt=>{
 const lines=txt.replace(/^\uFEFF/,'').trim().split(/\r?\n/).filter(x=>x.trim());
 const split=line=>{const out=[];let cell='',quoted=false;for(let i=0;i<line.length;i++){const ch=line[i];if(ch==='"'){if(quoted&&line[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}else if(ch===';'&&!quoted){out.push(cell.trim());cell='';}else cell+=ch;}out.push(cell.trim());return out;};
 const header=split(lines.shift()||'').map(s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''));
 if(header.join(';')!=='matricula;nome;turma')throw Error('O CSV deve ter as colunas matricula;nome;turma, nessa ordem.');
 const students=lines.map(split).map(r=>({matricula:String(r[0]||'').trim(),name:String(r[1]||'').trim(),class_name:String(r[2]||'').trim()}));
 if(students.some(s=>!/^[0-9]{7}$/.test(s.matricula)||s.name.length<2||!s.class_name))throw Error('Existem matrículas, nomes ou turmas inválidos.');
 if(new Set(students.map(s=>s.matricula)).size!==students.length)throw Error('Existem matrículas duplicadas.');
 if(students.length>600)throw Error('O arquivo excede o limite de 600 estudantes.');
 return students;
};
const callFunction=async(name,payload)=>{
 const response=await fetch(base+'/functions/v1/'+name,{method:'POST',headers:{apikey:pubKey,Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(payload),cache:'no-store'});
 const result=await response.json().catch(()=>({error:'Resposta inválida'}));
 if(!response.ok)throw Error(result?.error||'Não foi possível completar a solicitação ('+response.status+')');
 return result;
};
$('ja-change-form').onsubmit=async e=>{
 e.preventDefault();const p=$('ja-new-password').value,c=$('ja-new-confirm').value,status=$('ja-change-status');
 if(p!==c){status.textContent='As senhas não são iguais.';return;}
 if(p.length<12||!/[A-Z]/.test(p)||!/[a-z]/.test(p)||!/[0-9]/.test(p)||!/[!@#$%*?]/.test(p)||/\s/.test(p)){status.textContent='Inclua ao menos 12 caracteres, letras maiúsculas e minúsculas, número e símbolo (!@#$%*?).';return;}
 status.textContent='Atualizando a senha com segurança...';
 try{await callFunction('jp-change-student-password',{password:p});$('ja-new-password').value='';$('ja-new-confirm').value='';logout();$('ja-login-status').textContent='Senha pessoal criada! Entre novamente com sua matrícula e a senha nova.';}
 catch(error){status.textContent=error.message;}
};
$('ja-change-exit').onclick=logout;
$('ja-import-action').onclick=async()=>{
 const input=$('ja-import-file'),status=$('ja-import-status'),btn=$('ja-import-action');
 if(!input.files?.length){status.textContent='Escolha um CSV antes de continuar.';return;}
 if(input.files[0].size>250000){status.textContent='Arquivo excede 250 KB.';return;}
 let students;
 try{students=parseInput(await input.files[0].text());}catch(error){status.textContent=error.message;return;}
 if(!confirm('Cadastrar '+students.length+' estudantes no banco institucional? As senhas serão geradas apenas durante a importação e deverão ser guardadas em local seguro.'))return;
 btn.disabled=true;const all=[];
 try{
  for(let i=0;i<students.length;i+=20){
   status.textContent='Cadastrando lote '+(Math.floor(i/20)+1)+' de '+Math.ceil(students.length/20)+'...';
   const r=await callFunction('jp-provision-students',{students:students.slice(i,i+20)});
   if(!Array.isArray(r.results))throw Error('Resposta de cadastro inválida');
   all.push(...r.results);
  }
  const rows=[['matricula','nome','turma','usuario','senha_inicial','situacao']];
  const byCode=new Map(students.map(s=>['e'+s.matricula,s]));
  all.forEach(s=>{const x=byCode.get(s.login)||{};rows.push([String(s.login||'').slice(1),x.name||'',x.class_name||'',s.login||'',s.password||'',s.status||'']);});
  downloadCSV('JP-CREDENCIAIS-RESTRITAS-'+new Date().toISOString().slice(0,10)+'.csv',rows);
  const ok=all.filter(x=>x.status==='created').length;
  status.textContent='Concluído: '+ok+' contas criadas; '+(all.length-ok)+' não criadas. O arquivo de credenciais foi baixado — guarde-o em local protegido, sem compartilhamento público.';
  await refresh();input.value='';
 }catch(error){
  if(all.length){const rows=[['matricula','nome','turma','usuario','senha_inicial','situacao']];const byCode=new Map(students.map(s=>['e'+s.matricula,s]));all.forEach(s=>{const x=byCode.get(s.login)||{};rows.push([String(s.login||'').slice(1),x.name||'',x.class_name||'',s.login||'',s.password||'',s.status||'']);});downloadCSV('JP-CADASTRO-PARCIAL-RESTRITO.csv',rows);}
  status.textContent='Importação interrompida: '+error.message+'. Confira o arquivo parcial antes de tentar novamente.';
 }finally{btn.disabled=false;}
};
$('ja-refresh').onclick=async()=>{try{await refresh()}catch(e){message('Atualização indisponível: '+e.message)}};
$('ja-admin-exit').onclick=logout;$('ja-student-exit').onclick=logout;
$('ja-login-form').onsubmit=async e=>{
e.preventDefault();const status=$('ja-login-status');status.textContent='Autenticando...';
try{
const user=$('ja-email').value.trim().toLowerCase();
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user)&&!/^e[0-9]{7}$/.test(user))throw Error('Identificador inválido');
const email=/^e[0-9]{7}$/.test(user)?user+'@alunos.portal-jp.invalid':user;
const response=await request('/auth/v1/token?grant_type=password','POST',{email,password:$('ja-password').value},false);
token=response.access_token;putToken(token);$('ja-password').value='';await identify();
}catch(error){token='';status.textContent='Não foi possível entrar. Confira as credenciais ou procure a coordenação.';message('Falha na autenticação.');}
};
if(!ready){show('ja-setup');message('Instalação pendente: configure o Supabase para habilitar o painel.');return;}
token=getToken();if(token)identify();else{show('ja-login');message('Entre com uma conta cadastrada pela escola.');}
})();