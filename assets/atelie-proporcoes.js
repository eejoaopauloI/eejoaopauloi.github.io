(() => {
'use strict';
const $ = id => document.getElementById(id);
const el = (tag, text, cls) => {
 const n = document.createElement(tag);
 if (text != null) n.textContent = text;
 if (cls) n.className = cls;
 return n;
};
const paints = {
 yellow:{name:'amarelo',abbr:'AM',hue:49},
 blue:{name:'azul',abbr:'AZ',hue:222},
 red:{name:'vermelho',abbr:'VM',hue:8}
};
const missions = [
 {title:'01 / Faça a receita',prompt:'Use as colheres para colocar 2 partes de amarelo e 1 parte de azul na bancada.',colors:['yellow','blue'],ref:[2,1],goal:[2,1],hint:'Cada toque em + acrescenta uma colher da cor daquela linha.',win:'Você preparou 3 partes. A razão amarelo : azul é 2 : 1 e a razão azul : total é 1 : 3.'},
 {title:'02 / Dobre sem mudar o tom',prompt:'Agora o painel precisa de 6 partes desse mesmo verde. Quanto vai de cada tinta?',colors:['yellow','blue'],ref:[2,1],goal:[4,2],hint:'Para fazer 6 partes a partir de 3, faça dois grupos completos de 2 de amarelo e 1 de azul.',win:'Você dobrou as duas cores: 2 virou 4 e 1 virou 2. A quantidade mudou, mas a proporção e o tom da simulação ficaram iguais.'},
 {title:'03 / Compare uma cor com o todo',prompt:'Você preparou 4 partes de amarelo e 2 de azul. Na ordem azul : total da mistura, qual é a razão sem simplificar?',choices:['2 : 4','2 : 6','4 : 6'],correct:1,hint:'O total inclui as duas tintas: some 4 e 2. O primeiro número da razão é só o azul.',win:'São 2 partes de azul em 6 no total: 2 : 6. Isso equivale a 1 : 3. Já 2 : 4 compara azul com amarelo, e não com o total.'},
 {title:'04 / Descubra a receita que não funciona',prompt:'Uma dupla passou de 2 de amarelo e 1 de azul para 3 de amarelo e 2 de azul. A cor fica igual na simulação?',choices:['Sim, porque acrescentou uma colher de cada.','Não, porque agora as quantidades de amarelo e azul ficaram iguais.','Não, porque a quantidade de amarelo deixou de ser o dobro da de azul.'],correct:2,hint:'Na receita original, para cada colher de azul, há duas de amarelo. Com 2 de azul, seriam necessárias 4 de amarelo.',win:'Adicionar 1 a cada cor não conserva a relação. Para manter esse tom, as duas quantidades precisam ser multiplicadas pelo mesmo número.'},
 {title:'05 / Cumpra a encomenda do mural',prompt:'Prepare 12 partes de tinta sem mudar o verde da receita original. Use o mesmo tamanho de colher.',colors:['yellow','blue'],ref:[2,1],goal:[8,4],hint:'A receita tem 3 partes. Quantas vezes um grupo de 3 cabe em 12? Use esse fator nas duas cores.',win:'São 8 partes de amarelo e 4 de azul. Você fez 4 grupos de 3 e manteve a razão 2 : 1.'}
];
const color = (keys, amounts) => {
 const sum = amounts[0] + amounts[1];
 if (!sum) return '';
 const h = (paints[keys[0]].hue * amounts[0] + paints[keys[1]].hue * amounts[1])/sum;
 return 'hsl('+h+' 72% 56%)';
};
const recipe = (keys, amounts) => amounts.map((v,i)=>v+' '+(v===1?'parte':'partes')+' de '+paints[keys[i]].name).join(' + ');
function swatch(node, value){
 node.style.backgroundColor = value;
 node.classList.toggle('empty',!value);
}
let current=0, mix=[0,0], passed=false, controls=[];
function updateMix(){
 const m=missions[current], total=mix[0]+mix[1];
 swatch($('mix'), color(m.colors,mix));
 $('total').textContent='Total: '+total+' '+(total===1?'parte':'partes');
 controls.forEach(({minus,plus,counter,tiles},i)=>{
  minus.disabled=passed||mix[i]===0; plus.disabled=passed||mix[i]===12;
  counter.value=mix[i]; counter.textContent=mix[i]; tiles.replaceChildren();
  for(let n=0;n<mix[i];n++) tiles.append(el('span',paints[m.colors[i]].abbr,'tile '+m.colors[i]));
 });
}
function ingredient(key,i){
 const p=paints[key], row=el('div',null,'ingredient'), label=el('strong',p.name[0].toUpperCase()+p.name.slice(1));
 const c=el('div',null,'counters'), counter=el('output','0'), tiles=el('div',null,'tileline');
 const minus=el('button','−','secondary'), plus=el('button','+');
 tiles.setAttribute('aria-hidden','true'); counter.setAttribute('aria-label','Partes de '+p.name);
 for(const [btn,delta,word] of [[minus,-1,'Retirar'],[plus,1,'Adicionar']]){
  btn.type='button'; btn.setAttribute('aria-label',word+' uma parte de '+p.name);
  btn.addEventListener('click',()=>{if(passed||mix[i]+delta<0||mix[i]+delta>12)return; mix[i]+=delta;updateMix();if($('feedback').classList.contains('try')){$('feedback').textContent='';$('feedback').className='feedback';}});
 }
 c.append(minus,counter,plus);row.append(label,c,tiles);controls.push({minus,plus,counter,tiles});return row;
}
function show(focus){
 const m=missions[current];passed=false;mix=[0,0];controls=[];
 $('progress').value=current;
 $('step-label').textContent='Missão '+(current+1)+' de '+missions.length;
 $('mission-title').textContent=m.title; $('prompt').textContent=m.prompt;
 $('hint').textContent=m.hint;$('hint').hidden=true;$('hint-button').textContent='Ver pista';$('hint-button').setAttribute('aria-expanded','false');$('hint-button').setAttribute('aria-controls','hint');
 $('feedback').textContent='';$('feedback').className='feedback';
 $('check').hidden=false;$('next').hidden=true;
 $('next').textContent=current===missions.length-1?'Ir para o cartão-desafio →':'Próxima missão →';
 $('bench').hidden=!m.colors;$('options').hidden=!!m.colors;
 $('ingredients').replaceChildren();$('choices').replaceChildren();
 if(m.colors){
  swatch($('target'),color(m.colors,m.ref));$('recipe').textContent=recipe(m.colors,m.ref);
  m.colors.forEach((key,i)=>$('ingredients').append(ingredient(key,i)));updateMix();
 }else{
  m.choices.forEach((value,i)=>{
   const label=el('label',null,'choice'), input=el('input');
   input.type='radio';input.name='choice'; input.value=i;
   label.append(input,el('span',value));$('choices').append(label);
  });
 }
 if(focus)$('mission-title').focus();
}
$('hint-button').addEventListener('click',()=>{
 $('hint').hidden=!$('hint').hidden;
 $('hint-button').setAttribute('aria-expanded',String(!$('hint').hidden));
 $('hint-button').textContent=$('hint').hidden?'Ver pista':'Ocultar pista';
});
$('answer').addEventListener('submit',e=>{
 e.preventDefault();if(passed)return;
 const m=missions[current];let ok=false;let why='Tente de novo. Confira o que cada número representa.';
 if(m.colors){
  ok=mix.every((x,i)=>x===m.goal[i]);
  const total=mix[0]+mix[1], want=m.goal[0]+m.goal[1];
  if(total!==want)why='Você colocou '+total+' de '+want+' partes pedidas. Ajuste a quantidade e confira a divisão entre as tintas.';
  else why='Você chegou ao total. Agora ajuste quantas partes vão de cada cor para manter a receita.';
 }else{
  const selected=$('choices').querySelector('input:checked');
  ok=!!selected&&Number(selected.value)===m.correct;
  if(!selected)why='Selecione uma opção antes de conferir.';
 }
 $('feedback').className='feedback '+(ok?'good':'try');$('feedback').textContent=ok?'✓ '+m.win:why;
 if(ok){
  passed=true;$('progress').value=current+1;
  if(m.colors)updateMix();else $('choices').querySelectorAll('input').forEach(x=>x.disabled=true);
  $('check').hidden=true;$('next').hidden=false;$('next').focus();
 }
});
$('next').addEventListener('click',()=>{
 if(!passed)return;
 if(current<missions.length-1){current++;show(true);return;}
 $('autoria').hidden=false;$('next').hidden=true;$('create-title').focus();
});
$('restart').addEventListener('click',()=>{current=0;$('autoria').hidden=true;$('author-card').hidden=true;$('author-feedback').textContent='';$('author-form').reset();setPairLabel();show(true);});
function setPairLabel(){ $('second-label').textContent='Partes de '+paints[$('author-pair').value.split('-')[1]].name; }
$('author-pair').addEventListener('change',setPairLabel);
$('author-form').addEventListener('submit',e=>{
 e.preventDefault();
 const name=$('color-name').value.trim(), aa=Number($('amount-a').value), bb=Number($('amount-b').value), k=Number($('repeat').value);
 if(!name){$('author-feedback').textContent='Dê um nome à cor para montar o cartão.';$('color-name').focus();return;}
 if(aa===bb){$('author-feedback').textContent='Escolha quantidades diferentes para as duas tintas.';$('amount-b').focus();return;}
 const pair=$('author-pair').value.split('-');
 $('card-title').textContent=name;
 $('card-color').style.backgroundColor=color(pair,[aa,bb]);
 $('card-task').textContent='Receita: '+recipe(pair,[aa,bb])+'. A turma precisa de '+((aa+bb)*k)+' partes desse mesmo tom. Quantas partes de cada tinta são necessárias? Qual é a razão da segunda cor para o total?';
 $('card-key').textContent=recipe(pair,[aa*k,bb*k])+'. Multiplique as duas quantidades por '+k+'. '+paints[pair[1]].name[0].toUpperCase()+paints[pair[1]].name.slice(1)+' : total = '+bb*k+' : '+(aa+bb)*k+'.';
 $('card-details').open=false;$('author-card').hidden=false;
 $('author-feedback').textContent='Cartão pronto! Mostre a pergunta à outra dupla antes de abrir o gabarito.';
});
$('game-ui').hidden=false;show(false);
})();