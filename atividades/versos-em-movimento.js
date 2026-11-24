'use strict';
const $=id=>document.getElementById(id);
const poems=[
 {title:'Futebol',author:'Carlos Drummond de Andrade',date:'Publicado em Poesia errante; reunido em Quando é dia de futebol',sport:'⚽ FUTSAL · FUTEBOL',source:'https://www.tudoepoema.com.br/carlos-drummond-de-andrade-futebol/',
 text:'Futebol se joga no estádio?\nFutebol se joga na praia,\nfutebol se joga na rua,\nfutebol se joga na alma.',
 guide:'O texto de Drummond amplia o futebol para além das quadras ou estádios. Leia o poema completo no link da fonte. O fragmento permite analisar repetição, pergunta retórica e o deslocamento do espaço físico para uma experiência afetiva.',
 questions:[
  {q:'No trecho, a sequência “estádio”, “praia”, “rua” e “alma” sugere que o futebol:',options:['Transcende o espaço de jogo e também integra a vida afetiva.','Só pode ocorrer em estádios oficiais.','É apresentado apenas como obrigação profissional.'],correct:0,why:'O percurso vai de lugares físicos até “alma”, metáfora de vínculo emocional com o esporte.'},
  {q:'A repetição de “Futebol se joga” funciona como:',options:['Anáfora que produz ritmo e amplia progressivamente o sentido.','Uma indicação de regras técnicas de futsal.','Uma afirmação de que não há recursos expressivos no poema.'],correct:0,why:'A retomada da expressão inicial dos versos cria paralelismo e intensifica o argumento poético.'},
  {q:'O verso “futebol se joga na alma” apresenta:',options:['Sentido figurado que associa o jogo a sentimentos e identidade.','Descrição literal de um órgão corporal.','Prova de que o poema é um manual de esporte.'],correct:0,why:'O termo “alma” desloca o jogo para o campo do afeto e da cultura.'},
  {q:'A relação mais adequada com o futsal praticado na escola é:',options:['Reconhecer que o jogo pode integrar cultura, memória e pertencimento, além da técnica.','Concluir que poemas são incapazes de dialogar com práticas esportivas.','Afirmar que a quadra escolar impede qualquer experiência poética.'],correct:0,why:'A experiência esportiva também pode produzir vínculos e sentidos compartilhados.'}
 ]},
 {title:'Voleibol',author:'Alberto da Cunha Melo',date:'Poemas para o jardim da infância (1981)',sport:'🏐 VOLEIBOL',source:'https://www.escritas.org/pt/t/97881/voleibol',
 text:'Uma menininha de nada\njogava voleibol\ne pegava os saques mais baixos',
 guide:'Na composição de Alberto da Cunha Melo, o voleibol surge ligado a uma personagem pequena, apresentada com delicadeza e valorização por imagens poéticas. Abra o poema completo na fonte para observar as comparações com elementos da natureza e da luminosidade.',
 questions:[
  {q:'O contraste entre “menininha de nada” e a habilidade no voleibol permite perceber:',options:['Valorização poética de uma personagem aparentemente pequena ou discreta.','Afirmação de que apenas adultos podem praticar esporte.','Descrição de uma competição exclusivamente profissional.'],correct:0,why:'O diminutivo contrasta com o protagonismo da personagem, que participa ativamente do jogo.'},
  {q:'A expressão “menininha de nada” pode produzir qual efeito?',options:['Um tom afetivo e de aparente fragilidade, posteriormente ressignificado.','Uma estatística precisa da altura da jogadora.','Uma regra oficial da modalidade.'],correct:0,why:'O diminutivo é expressivo, não um dado esportivo ou medida objetiva.'},
  {q:'No trecho, “pegava os saques mais baixos” destaca:',options:['Uma ação concreta do voleibol transformada em matéria poética.','Uma jogada de xadrez entre duas peças.','A obrigatoriedade de rimas em todos os poemas.'],correct:0,why:'O poeta transforma um gesto esportivo cotidiano em imagem literária.'},
  {q:'Ao ler a íntegra na fonte, as imagens da natureza reforçam principalmente:',options:['Uma representação lírica da personagem, que vai além da descrição do esporte.','Um relatório técnico do placar do jogo.','A rejeição de toda comparação poética.'],correct:0,why:'As imagens de natureza e luz ampliam a dimensão afetiva do retrato poético.'}
 ]},
 {title:'Ajedrez (Xadrez)',author:'Jorge Luis Borges',date:'El hacedor (1960) · original em espanhol',sport:'♟️ XADREZ',source:'https://www.cuentoneta.ar/literary-work/ajedrez-poema',
 text:'En su grave rincón, los jugadores\nrigen las lentas piezas.',
 guide:'Vocabulário de apoio: “jugadores” = jogadores; “rigen” = conduzem; “piezas” = peças. No poema de Borges, o xadrez é mais que uma partida: pode representar escolhas, tempo e forças que condicionam a existência. Leia o original completo no link. É um poema hispano-americano de 1960, utilizado para diálogo comparativo com a produção contemporânea.',
 questions:[
  {q:'No verso citado, a expressão “lentas piezas” contribui para construir:',options:['Uma atmosfera de estratégia, paciência e tempo no jogo.','Um placar de partida de futsal.','Uma cena de grande velocidade física.'],correct:0,why:'O adjetivo “lentas” aproxima a cena do pensamento estratégico, característica do xadrez.'},
  {q:'No poema integral, o tabuleiro pode ser lido como metáfora de:',options:['Relações entre liberdade, escolhas, limites e destino.','Um campo destinado ao saque de vôlei.','A inexistência de regras e conflitos.'],correct:0,why:'Borges expande a imagem do tabuleiro para questões filosóficas sobre quem move e quem é movido.'},
  {q:'A leitura do texto original em espanhol pode ser favorecida por:',options:['Reconhecimento de palavras próximas do português e apoio contextual.','Substituição do poema por uma descrição de regras técnicas.','Exigência de tradução literal de todas as palavras antes de interpretar.'],correct:0,why:'As semelhanças entre línguas e o contexto do xadrez apoiam a compreensão, mesmo sem fluência em espanhol.'},
  {q:'Ao relacionar o poema ao xadrez praticado na escola, uma reflexão pertinente é:',options:['Perceber que a partida permite pensar escolhas e consequências.','Afirmar que toda partida tem duração infinita.','Concluir que poesia não pode tratar de questões filosóficas.'],correct:0,why:'O jogo fornece imagens para pensar ação, limites e estratégias de vida.'}
 ]}
];
const all=poems.flatMap((p,i)=>p.questions.map((q,j)=>({...q,poem:i,local:j})));
let idx=-1,stage=0,attempts=0,usedHint=false,answered=false,points=0,done=0,poemSubmitted=false,entries=[];
const STAGES=5;
function setMsg(t,kind=''){const el=$('vm-feedback');el.textContent=t;el.className='vm-feedback'+(kind?' '+kind:'')}
function update(){
 const pos=idx<0?0:idx<12?1+Math.floor(idx/4):4;
 $('vm-step').textContent=(pos+1)+' / '+STAGES;$('vm-count').textContent=done+' / 12';$('vm-jps').textContent=points+' JPs';
 const portion=idx<0?0:idx<12?(idx+1)/13*90:poemSubmitted?100:93;
 $('vm-pct').textContent=Math.round(portion)+'%';$('vm-meter').style.width=portion+'%';
 [...$('vm-route').children].forEach((el,i)=>el.className=i<pos?'done':i===pos?'on':'');
}
function options(q){
 const wrapper=$('vm-options');wrapper.replaceChildren();
 const order=[0,1,2];const shift=(idx+1)%3;const reordered=[...order.slice(shift),...order.slice(0,shift)];
 reordered.forEach((value,k)=>{const b=document.createElement('button');b.type='button';b.className='vm-option';b.dataset.answer=String(value);
 const label=document.createElement('b');label.textContent=String.fromCharCode(65+k);
 const content=document.createElement('span');content.textContent=q.options[value];b.append(label,content);
 b.addEventListener('click',()=>choose(value,b));wrapper.append(b)});
}
function render(){
 if(idx===-1){
  $('vm-label').textContent='ETAPA 1 · MINIAULA DE LITERATURA';
  $('vm-reading-title').textContent='O que é poesia contemporânea?';
  $('vm-lesson').innerHTML='<p><strong>Poesia contemporânea</strong> é uma produção plural: não existe uma única forma de escrever poemas hoje. Os textos dialogam com o presente, com experiências pessoais e coletivas e com diferentes linguagens.</p><ul><li><strong>Eu lírico:</strong> voz que se expressa no poema, diferente do autor como pessoa real.</li><li><strong>Verso livre:</strong> verso sem métrica fixa obrigatória; rimas podem existir ou não.</li><li><strong>Imagem poética:</strong> relação criativa entre palavras, ideias e sensações, como metáforas e personificação.</li><li><strong>Temas e linguagens:</strong> cidade, tecnologia, identidade, afetos, desigualdade, cotidiano, memória e crítica social.</li><li><strong>Experimentação:</strong> os cortes dos versos, as pausas, a repetição e a disposição gráfica ajudam a produzir significado.</li></ul><p><strong>Estratégia de leitura:</strong> identifique o tema, a voz poética, as palavras mais expressivas e os sentidos sugeridos pelas imagens.</p>';
  $('vm-paper').hidden=true;$('vm-source').hidden=true;$('vm-audio').disabled=true;$('vm-hint').disabled=true;
  $('vm-task-level').textContent='ATIVIDADE DE RETOMADA';
  $('vm-task-title').textContent='Como estudar esta aula?';
  $('vm-question').textContent='1. Leia a miniaula. 2. Analise três poemas originais. 3. Responda a 12 questões comentadas. 4. Produza seus próprios versos. 5. Baixe o relatório e entregue ao professor.';
  $('vm-options').replaceChildren();$('vm-editor-pane').hidden=true;
  $('vm-next').disabled=false;$('vm-next').textContent='Começar poemas →';
  setMsg('Uma poesia não precisa rimar para ser poesia. Observe como as escolhas de linguagem criam sentidos.');
  update();return;
 }
 if(idx>=12){writeStage();return}
 stage=Math.floor(idx/4);
 const p=poems[stage],q=all[idx];
 attempts=0;usedHint=false;answered=false;
 $('vm-label').textContent='ETAPA '+(stage+2)+' · LITERATURA CONTEMPORÂNEA · POEMA '+(stage+1);
 $('vm-reading-title').textContent=p.title+' — '+p.author;
 $('vm-lesson').textContent=p.sport+' · '+p.date+'. '+p.guide;
 $('vm-source').href=p.source;$('vm-source').textContent='📖 Ler o poema completo na fonte ↗';$('vm-source').hidden=false;
 $('vm-attribution').textContent=p.author+' · '+p.date+' · trecho breve de obra publicada';
 $('vm-paper').hidden=false;$('vm-verse').textContent=p.text;
 $('vm-audio').disabled=false;$('vm-hint').disabled=false;
 $('vm-task-level').textContent='DESAFIO '+(idx+1)+' DE 12';
 $('vm-task-title').textContent='Leitura literária';
 $('vm-question').textContent=q.q;
 $('vm-editor-pane').hidden=true;options(q);
 $('vm-next').disabled=true;$('vm-next').textContent='Responda para avançar';
 $('vm-attempts').textContent='Leia novamente os versos e escolha a interpretação mais sustentada pelo texto.';
 setMsg('Observe as escolhas da linguagem, o tema e os efeitos de sentido. Evite respostas baseadas apenas em palpites.');
 update();
}
function choose(value,b){
 if(answered||idx<0||idx>=12)return;
 const q=all[idx];attempts++;
 if(value!==q.correct){
  b.classList.add('wrong');b.disabled=true;
  setMsg('🔎 Releia o poema: esta alternativa não é a mais sustentada pelos versos. Procure as palavras que produzem o sentido principal.','no');
  $('vm-attempts').textContent='Tentativas com erro: '+attempts+'. Você pode tentar novamente.';return;
 }
 answered=true;done++;
 const earned=attempts===1?(usedHint?4:5):3;points+=earned;
 entries.push({question:idx+1,poem:poems[q.poem].title,skill:['Leitura e contexto','Recurso poético','Forma e ritmo','Sentidos e efeitos'][q.local],right:q.options[q.correct],errors:attempts-1,hint:usedHint?'Sim':'Não',jps:earned});
 [...$('vm-options').children].forEach(x=>{x.disabled=true;if(Number(x.dataset.answer)===q.correct)x.classList.add('correct')});
 setMsg('✅ Leitura concluída! '+q.why+' Você conquistou '+earned+' JPs.','yes');
 $('vm-next').disabled=false;$('vm-next').textContent=idx===11?'Ir para oficina de criação ✍️':idx===3||idx===7?'Ler próximo poema →':'Próxima questão →';
 update();
}
function writeStage(){
 $('vm-label').textContent='ETAPA 5 · OFICINA DE CRIAÇÃO LITERÁRIA';
 $('vm-reading-title').textContent='Sua voz também é poesia';
 $('vm-lesson').innerHTML='<p><strong>Proposta:</strong> escreva um poema contemporâneo de 6 a 14 versos. Você pode escolher um tema do presente e experimentar ritmo, repetição, imagens poéticas ou versos livres.</p><p>Uma possibilidade é começar observando um objeto comum e transformá-lo em imagem: uma tela, uma janela, um caminho, uma bola, uma palavra ou o espaço da escola.</p><p>Evite copiar poemas de outras pessoas. Seus versos devem ser autorais.</p>';
 $('vm-paper').hidden=true;$('vm-source').hidden=true;$('vm-audio').disabled=true;$('vm-hint').disabled=true;
 $('vm-task-level').textContent='PRODUÇÃO AUTORAL · RETOMADA DA AULA';
 $('vm-task-title').textContent='Escreva um poema contemporâneo';
 $('vm-question').textContent='Use suas experiências e suas escolhas de linguagem para provocar sentidos no leitor.';
 $('vm-options').replaceChildren();$('vm-editor-pane').hidden=false;
 $('vm-next').disabled=false;$('vm-next').textContent='Registrar produção e concluir →';
 $('vm-save').hidden=false;
 setMsg('A produção é uma atividade de participação e será avaliada pelo professor. Os 40 JPs de participação dependem de validação institucional.');
 update();
}
function poemOK(){
 const text=$('vm-editor').value.trim();
 const lines=text.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
 const checks=[1,2,3].every(i=>$('vm-check-'+i).checked);
 return {text,lines,checks,valid:lines.length>=6&&lines.length<=14&&text.length>=110&&checks};
}
function finish(){
 const p=poemOK();
 if(!p.valid){
  setMsg('Revise a produção: escreva entre 6 e 14 versos não vazios, com pelo menos 110 caracteres no total, e confirme os três critérios de revisão. Versos autorais não são avaliados automaticamente.','no');
  return;
 }
 poemSubmitted=true;points+=40;
 $('vm-work').hidden=true;$('vm-final').hidden=false;update();
 $('vm-summary').textContent='Você retomou os conteúdos de Literatura, interpretou 3 poemas, respondeu a 12 desafios e registrou uma criação autoral. Pontuação provisória: '+points+' de 100 JPs, incluindo 40 JPs de participação na produção que precisam ser confirmados pelo professor.';
 $('vm-final').scrollIntoView({behavior:'smooth',block:'start'});
}
$('vm-next').addEventListener('click',()=>{
 if(idx===-1){idx=0;render();return}
 if(idx<12){if(!answered)return;idx++;render();return}
 if(!poemSubmitted)finish();
});
$('vm-hint').addEventListener('click',()=>{
 if(idx<0||idx>=12||answered)return;
 usedHint=true;
 const q=all[idx],tips=['Pense no contraste entre os versos e no tema do poema.','Procure a figura de linguagem, não apenas o significado literal.','Observe pausas, cortes e ritmo, não somente rimas.','Relacione as palavras ao sentido global e ao efeito no leitor.'];
 setMsg('💡 Pista: '+tips[q.local]+' Releia os versos antes de escolher.');
});
$('vm-audio').addEventListener('click',()=>{
 if(idx<0||idx>=12)return;
 if(!('speechSynthesis' in window)){$('vm-audio-status').textContent='Leitura em voz alta indisponível neste navegador.';return}
 try{window.speechSynthesis.cancel();const utter=new SpeechSynthesisUtterance(poems[stage].text);utter.lang='pt-BR';utter.rate=.87;window.speechSynthesis.speak(utter);$('vm-audio-status').textContent='🔊 Reprodução iniciada. Acompanhe os versos com a leitura.'}
 catch(e){$('vm-audio-status').textContent='Não foi possível reproduzir. Leia os versos diretamente.'}
});
$('vm-save').addEventListener('click',()=>{
 try{sessionStorage.setItem('vm-poesia-rascunho',JSON.stringify({text:$('vm-editor').value,checks:[1,2,3].map(i=>$('vm-check-'+i).checked)}));setMsg('Rascunho salvo somente nesta aba do navegador. Guarde também uma cópia em seu aparelho.','yes')}
 catch(e){setMsg('Não foi possível guardar o rascunho nesta aba. Copie seus versos antes de sair.','no')}
});
function csv(){
 const lines=[['Tipo','Etapa','Poema','Habilidade','Resposta correta','Erros','Pista','JPs']];
 for(const e of entries)lines.push(['Questão',e.question,e.poem,e.skill,e.right,e.errors,e.hint,e.jps]);
 lines.push(['Produção literária','Oficina','Poema autoral','Produção e revisão','Participação pendente de validação docente','','',40]);
 const txt=$('vm-editor').value.trim().replace(/\r?\n/g,' / ');
 lines.push(['Texto do estudante','Oficina',txt,'Analisar autoria, uso expressivo e sentido','','','','']);
 lines.push(['Resumo','3 poemas / 12 desafios','','JPs provisórios','','','',points]);
 JPPontos.saveCSV('jp-busca-ativa-literatura-poesia-contemporanea-'+new Date().toISOString().slice(0,10)+'.csv',lines);
 $('vm-status').textContent='Relatório e poema exportados. Entregue ao professor de Literatura para apreciação.';
}
$('vm-csv').addEventListener('click',csv);
$('vm-certificate').addEventListener('click',()=>{
 if(!poemSubmitted)return;
 JPPontos.exportar({atividade:'poesia-contemporanea-ba',concluida:true,jps:points});
});
$('vm-restart').addEventListener('click',()=>{
 if(!confirm('Deseja reiniciar a atividade? Baixe o relatório antes, se precisar preservar o poema.'))return;
 idx=-1;stage=attempts=points=done=0;answered=usedHint=poemSubmitted=false;entries=[];
 $('vm-editor').value='';[1,2,3].forEach(i=>$('vm-check-'+i).checked=false);
 $('vm-work').hidden=false;$('vm-final').hidden=true;$('vm-save').hidden=true;render();window.scrollTo({top:0,behavior:'smooth'});
});
try{const draft=JSON.parse(sessionStorage.getItem('vm-poesia-rascunho')||'null');if(draft&&typeof draft.text==='string'){$('vm-editor').value=draft.text;[1,2,3].forEach(i=>$('vm-check-'+i).checked=Boolean(draft.checks?.[i-1]))}}catch(e){}
render();