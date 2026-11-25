'use strict';
(()=> {
const $=id=>document.getElementById(id);
const fmt=n=>Number(n.toFixed(4)).toLocaleString('pt-BR',{maximumFractionDigits:4});
const levels=[
{icon:'➕',title:'Adição decimal',focus:'Alinhar as vírgulas e somar décimos e centésimos.',lesson:'A vírgula separa a parte inteira da decimal. Para somar, escreva vírgula embaixo de vírgula e complete com zeros quando necessário.',example:'2,35 + 1,4\n2,35 + 1,40 = 3,75.',hint:'Alinhe as casas decimais. Você pode escrever zeros à direita sem alterar o valor.'},
{icon:'➖',title:'Subtração decimal',focus:'Subtrair valores decimais respeitando cada casa.',lesson:'Na subtração, também alinhamos as vírgulas. Se houver casas faltando, acrescente zeros à direita. Depois subtraia como faria com números inteiros.',example:'6,2 − 2,75\n6,20 − 2,75 = 3,45.',hint:'Complete com zeros, alinhe vírgula embaixo de vírgula e subtraia.'},
{icon:'✖️',title:'Multiplicação decimal',focus:'Multiplicar números decimais e posicionar a vírgula.',lesson:'Multiplique inicialmente como se não houvesse vírgulas. Depois conte o total de casas decimais dos dois fatores e coloque essa quantidade de casas no produto.',example:'1,2 × 0,35\n12 × 35 = 420. São três casas decimais ao todo: 0,420 = 0,42.',hint:'Multiplique os algarismos e conte quantas casas decimais há nos fatores, somadas.'},
{icon:'➗',title:'Divisão decimal',focus:'Dividir com vírgula e interpretar quocientes.',lesson:'Para dividir por um decimal, multiplique dividendo e divisor pela mesma potência de 10 até tornar o divisor inteiro. Em seguida, efetue a divisão.',example:'4,8 ÷ 0,6\n48 ÷ 6 = 8. Multiplicamos ambos por 10; o quociente não muda.',hint:'Transforme o divisor em inteiro multiplicando os dois números pela mesma potência de 10.'},
{icon:'🏆',title:'Desafios do cotidiano',focus:'Escolher operações em situações de compra, medidas e esporte.',lesson:'Leia o problema, identifique os dados, escolha a operação e verifique se o resultado faz sentido. Dinheiro, tempos e medidas exigem atenção à unidade.',example:'Uma bola custa R$ 12,50 e uma garrafa custa R$ 4,75. Total = 12,50 + 4,75 = R$ 17,25.',hint:'Identifique se a situação pede juntar, retirar, repetir parcelas ou repartir igualmente.'}
];
const cases=[
[[125,235],[34,278],[675,125],[48,92],[235,147],[156,249],[385,415],[59,136],[1275,225],[199,301]],
[[500,175],[875,235],[1200,465],[725,318],[960,475],[650,125],[1500,625],[1325,750],[800,275],[1050,385]],
[[12,15,10],[25,14,10],[35,12,10],[125,4,100],[75,8,100],[24,15,10],[16,25,100],[125,12,100],[45,22,100],[32,15,10]],
[[48,6,10],[72,8,10],[96,12,10],[144,12,10],[225,15,10],[360,12,100],[84,7,10],[168,14,10],[525,25,100],[375,15,100]]
];
const questions=levels.map((l,stage)=>Array.from({length:10},(_,i)=>{
let a,b,ans,operation,context='',solution='';
if(stage<2){a=cases[stage][i][0]/100;b=cases[stage][i][1]/100;ans=stage===0?a+b:a-b;operation=stage===0?'+':'−';solution=fmt(a)+' '+operation+' '+fmt(b)+' = '+fmt(ans)+'. Alinhamos vírgulas e somamos ou subtraímos as mesmas casas.';}
if(stage===2){const [x,y,d]=cases[stage][i];a=x/d;b=y/10;ans=a*b;operation='×';solution=fmt(a)+' × '+fmt(b)+' = '+fmt(ans)+'. Multiplicamos os algarismos e recolocamos a vírgula considerando as casas decimais.';}
if(stage===3){const [x,y,d]=cases[stage][i];a=x/10;b=y/d;ans=a/b;operation='÷';solution=fmt(a)+' ÷ '+fmt(b)+' = '+fmt(ans)+'. Multiplicamos dividendo e divisor pela mesma potência de 10 e dividimos.';}
if(stage===4){
const tasks=[
['Uma cantina vende suco por R$ 3,50 e sanduíche por R$ 7,25. Quanto custa comprar os dois?',3.5,7.25,'+',10.75],
['Uma garrafa tinha 2,5 L e foram consumidos 0,75 L. Quantos litros restaram?',2.5,.75,'−',1.75],
['Uma quadra recebe 4 faixas de 1,25 m. Qual é o comprimento total?',4,1.25,'×',5],
['Um percurso de 6,4 km será dividido em 4 trechos iguais. Qual é a distância de cada trecho?',6.4,4,'÷',1.6],
['Um estudante correu 1,35 km pela manhã e 2,45 km à tarde. Quantos quilômetros percorreu?',1.35,2.45,'+',3.8],
['Uma fita de 5 m foi cortada e usaram-se 1,85 m. Quantos metros sobraram?',5,1.85,'−',3.15],
['Uma receita utiliza 0,75 L de leite por porção. Quantos litros são necessários para 6 porções?',.75,6,'×',4.5],
['Uma equipe dispõe de 7,5 L de água para distribuir igualmente entre 5 recipientes. Quantos litros vão em cada?',7.5,5,'÷',1.5],
['Uma papelaria vende dois cadernos por R$ 8,90 cada. Qual é o custo total?',8.9,2,'×',17.8],
['Um aluno comprou um lápis de R$ 2,35 e pagou com R$ 5,00. Quanto recebe de troco?',5,2.35,'−',2.65]
];
const t=tasks[i];a=t[1];b=t[2];operation=t[3];ans=t[4];context=t[0];solution='Operação: '+fmt(a)+' '+operation+' '+fmt(b)+' = '+fmt(ans)+'. Releia o enunciado para conferir se a unidade está correta.';
}
ans=Number(ans.toFixed(4));
return {stage,index:i,operation,a,b,answer:ans,prompt:stage===4?context:'Quanto é '+fmt(a)+' '+operation+' '+fmt(b)+'?',context:stage===4?'Escreva somente o valor numérico, sem unidade.':'Você pode usar papel e lápis para organizar as casas decimais.',solution};
}));
const storageKey='jp_missao_decimal_v1';
const fresh=()=>({level:0,step:0,review:false,completed:{},records:{},best:{},history:[]});
let state=fresh();
try{const old=JSON.parse(localStorage.getItem(storageKey)||'null');if(old&&old.records&&old.completed)state={...fresh(),...old};}catch(e){}
let intro=true,finishedMarker='',hintUsed=0,tries=0,previousWrong=[];
const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(state));}catch(e){$('dec-export-status').textContent='O salvamento local não está disponível. Baixe seu relatório para guardar os resultados.';}};
const key=(i,j,review=state.review)=>i+'-'+j+(review?'~r':'');
const totalDone=()=>Object.keys(state.records).filter(k=>!k.includes('~r')&&state.records[k]?.done).length;
const points=()=>Object.values(state.best).reduce((a,b)=>a+(+b||0),0);
const medals=()=>Object.values(state.completed).filter(Boolean).length;
const allowed=i=>i===0||Boolean(state.completed[i-1])||Boolean(state.completed[i]);
function stats(){$('dec-done').textContent=totalDone()+'/50';$('dec-medals').textContent=medals()+'/5';$('dec-points').textContent=points()+' / 500';}
function diagnostics(){
const d=$('dec-diagnostic');d.replaceChildren();
let have=false;
levels.forEach((level,i)=>{
const records=questions[i].map((_,j)=>state.records[key(i,j,false)]).filter(Boolean);
if(!records.length)return;have=true;
const first=records.filter(r=>r.tries===1&&r.hints===0).length;
const p=document.createElement('p');
p.textContent=level.icon+' '+level.title+': '+records.length+'/10 resolvidas · '+first+' sem erros ou dicas · '+records.reduce((s,r)=>s+r.tries-1,0)+' tentativas adicionais. '+(first<records.length?'Sugestão: revisar os exemplos e repetir a fase.':'Bom domínio observado nesta prática.');
d.append(p);
});if(!have)d.textContent='Conclua desafios para receber orientações de revisão.';
}
function map(){
stats();diagnostics();const target=$('dec-levels');target.replaceChildren();
levels.forEach((l,i)=>{const card=document.createElement('article');card.className='dec-level '+(state.completed[i]?'complete':allowed(i)?'ready':'');
const icon=document.createElement('span');icon.className='dec-icon';icon.textContent=l.icon;
const title=document.createElement('h3');title.textContent='Fase '+(i+1)+' · '+l.title;
const focus=document.createElement('p');focus.textContent=l.focus;
const mark=document.createElement('small');mark.textContent=state.completed[i]?'🏅 Concluída · '+(state.best[i]||0)+'/100 JPs':allowed(i)?'✅ Disponível · 10 desafios':'🔒 Conclua a fase anterior';
const btn=document.createElement('button');btn.className='dec-btn'+(state.completed[i]?' secondary':'');btn.disabled=!allowed(i);btn.textContent=state.completed[i]?'↶ Revisar':'Jogar →';btn.addEventListener('click',()=>open(i,Boolean(state.completed[i])));
card.append(icon,title,focus,mark,btn);target.append(card);
});}
function show(id){for(const el of ['dec-map','dec-play','dec-finish'])$(el).hidden=el!==id;$(id).scrollIntoView({behavior:'smooth',block:'start'});}
function open(i,review=false){
if(!allowed(i))return;state.level=i;state.review=review;state.step=0;intro=true;finishedMarker='';
if(review){for(let j=0;j<10;j++)delete state.records[key(i,j,true)];}
else while(state.step<10&&state.records[key(i,state.step,false)]?.done)state.step++;
save();render();show('dec-play');
}
function render(){
const l=levels[state.level],n=state.step;
$('dec-phase').textContent='FASE '+(state.level+1)+' DE 5 · '+l.title+(state.review?' · REVISÃO':'');
$('dec-number').textContent=n>=10?'10/10 concluídos':'DESAFIO '+(n+1)+' DE 10';
$('dec-progress-fill').style.width=(Math.min(n,10)*10)+'%';
$('dec-lesson').hidden=!intro;
$('dec-question-box').hidden=intro||n>=10;
$('dec-lesson-title').textContent=l.icon+' '+l.title;
$('dec-lesson-copy').textContent=l.lesson;
$('dec-lesson-example').textContent=l.example;
if(n>=10){finish();return;}
if(intro)return;
const q=questions[state.level][n],r=state.records[key(state.level,n)];
$('dec-tag').textContent=state.level===4?'MISSÃO DO COTIDIANO':'OPERAÇÃO DECIMAL';
$('dec-prompt').textContent=q.prompt;$('dec-context').textContent=q.context;
$('dec-answer').value=r?.done?fmt(r.answer):'';
$('dec-answer').disabled=Boolean(r?.done);$('dec-check').disabled=Boolean(r?.done);
$('dec-hint').disabled=Boolean(r?.done);$('dec-next').disabled=!r?.done;
$('dec-next').textContent=n===9?'Concluir esta fase →':'Próximo desafio →';
tries=r?.done?r.tries:0;hintUsed=r?.done?r.hints:0;previousWrong=[];
feedback(r?.done?'✅ Resposta registrada! '+q.solution:'Calcule com calma. Confira a posição da vírgula antes de responder.',Boolean(r?.done));
}
function feedback(msg,good){const f=$('dec-feedback');f.textContent=msg;f.className='dec-feedback'+(good?' good':'');}
function check(){
const q=questions[state.level][state.step],k=key(state.level,state.step);
if(!q||state.records[k]?.done)return;
const raw=$('dec-answer').value.trim().replace(/\s/g,'').replace(',','.');
if(!/^-?\d+(?:\.\d+)?$/.test(raw)){feedback('Digite apenas um número, como 1,25 ou 0,5.',false);return;}
const value=Number(raw);tries++;
if(Math.abs(value-q.answer)<0.000001){
const earned=tries===1?(hintUsed?8:10):Math.max(4,8-(tries-2)*2-(hintUsed?1:0));
state.records[k]={done:true,answer:value,expected:q.answer,tries,hints:hintUsed,points:earned,wrong:previousWrong,when:new Date().toISOString()};
save();render();feedback('✅ Correto! +'+earned+' JPs nesta resposta.\n'+q.solution,true);stats();diagnostics();
}else{
previousWrong.push(value);
feedback('🔎 Ainda não. Confira a conta e a vírgula; tente novamente. '+(tries>=2?'Dica: '+levels[state.level].hint:''),false);
}}
function finish(){
const i=state.level,rec=questions[i].map((_,j)=>state.records[key(i,j)]);
if(rec.some(r=>!r?.done))return;
const score=rec.reduce((s,r)=>s+r.points,0);
const marker=i+(state.review?'r':'o');
if(finishedMarker!==marker){
state.completed[i]=true;state.best[i]=Math.max(state.best[i]||0,score);
state.history.push({phase:i+1,review:state.review,score,date:new Date().toISOString()});
state.history=state.history.slice(-60);finishedMarker=marker;save();
}
$('dec-finish-copy').textContent='Você resolveu as 10 atividades de '+levels[i].title+'. Nesta rodada conquistou '+score+' de 100 JPs possíveis. Melhor resultado: '+state.best[i]+' JPs. '+(state.review?'Sua revisão não apagou os registros originais.':'A próxima fase foi desbloqueada!');
$('dec-continue').textContent=i===4?'Ver minhas conquistas →':'Avançar para a próxima fase →';
map();show('dec-finish');
}
function exportCSV(){
const rows=[['Fase','Operação','Questão','Enunciado','Resposta','Resposta esperada','Tentativas','Dicas','Acerto primeira sem dica','JPs','Data']];
for(let i=0;i<5;i++)for(let j=0;j<10;j++){
const q=questions[i][j],r=state.records[key(i,j,false)];
if(r?.done)rows.push([levels[i].title,q.operation,j+1,q.prompt,fmt(r.answer),fmt(r.expected),r.tries,r.hints,r.tries===1&&!r.hints?'Sim':'Não',r.points,r.when]);
}
rows.unshift(['Estudante',$('dec-student').value.trim(),'Turma',$('dec-class').value.trim(),'Missão Decimal','Dados locais, sem transmissão automática']);
rows.push(['Resumo','Desafios',totalDone()+'/50','Medalhas',medals()+'/5','JPs',points()+'/500']);
const csv=s=>{let v=String(s??'').replace(/[\r\n]/g,' ').trim();if(/^[=+@\t]/.test(v)||/^-(?!\d)/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"'};
const blob=new Blob(['\uFEFF'+rows.map(r=>r.map(csv).join(';')).join('\r\n')],{type:'text/csv;charset=utf-8'});
const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='JP-missao-decimal-'+new Date().toISOString().slice(0,10)+'.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2500);
$('dec-export-status').textContent='Relatório gerado. Envie o arquivo ao professor pelo canal combinado.';
}
const grid=$('dec-grid');for(let i=0;i<100;i++){const tile=document.createElement('span');grid.append(tile);}
function visual(){const n=+$('dec-hundredths').value;$('dec-hundredths-label').textContent=n;Array.from(grid.children).forEach((el,i)=>el.classList.toggle('on',i<n));$('dec-visual-result').textContent=n+'/100 = '+fmt(n/100)+' · '+n+' quadradinhos de 100';}
$('dec-hundredths').addEventListener('input',visual);visual();
$('dec-start').addEventListener('click',()=>{let next=levels.findIndex((_,i)=>!state.completed[i]);if(next<0)next=0;open(next,Boolean(state.completed[next]));});
$('dec-begin').addEventListener('click',()=>{intro=false;render();});
$('dec-check').addEventListener('click',check);
$('dec-answer').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});
$('dec-hint').addEventListener('click',()=>{hintUsed++;feedback('💡 Dica '+hintUsed+': '+levels[state.level].hint,false);});
$('dec-reteach').addEventListener('click',()=>{intro=true;render();});
$('dec-next').addEventListener('click',()=>{if(!state.records[key(state.level,state.step)]?.done)return;state.step++;intro=false;save();render();});
$('dec-back').addEventListener('click',()=>{map();show('dec-map');});
$('dec-partial').addEventListener('click',exportCSV);$('dec-export').addEventListener('click',exportCSV);
$('dec-continue').addEventListener('click',()=>state.level===4?show('dec-map'):open(state.level+1,false));
$('dec-replay').addEventListener('click',()=>open(state.level,true));
map();
})();