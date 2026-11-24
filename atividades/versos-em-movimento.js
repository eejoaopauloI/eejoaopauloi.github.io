'use strict';
const $=id=>document.getElementById(id);
const poems=[
 {title:'A cidade cabe no bolso',text:'Na tela pequena\no mundo cabe no dedo.\n\nDeslizo notícias,\nrostos, promessas,\no anúncio de uma vida perfeita.\n\nDo lado de fora,\no ônibus ainda demora\ne a chuva não aceita filtros.',guide:'O poema aproxima a linguagem digital da experiência urbana. O verso livre e o contraste entre tela e rua ajudam a construir uma leitura crítica.',
 questions:[
  {q:'A oposição entre a tela e a rua sugere principalmente:',options:['Uma crítica à diferença entre imagens idealizadas e a realidade cotidiana.','Uma defesa de que o ônibus deve ter acesso à internet.','A afirmação de que a chuva ocorre somente nas redes.'],correct:0,why:'A tela oferece imagens idealizadas, mas o cotidiano permanece com espera e chuva. Esse contraste produz uma crítica.'},
  {q:'Em “a chuva não aceita filtros”, o principal recurso expressivo é:',options:['Personificação e aproximação com a linguagem das redes.','Explicação científica sobre aplicativos.','Descrição literal de um filtro de água.'],correct:0,why:'A chuva recebe uma ação humana — aceitar ou não — e “filtros” remete ao universo digital.'},
  {q:'A organização dos versos indica que o poema:',options:['Utiliza verso livre, sem esquema fixo obrigatório de rimas.','Está inteiramente organizado em sonetos tradicionais.','Não pode ser considerado poesia porque não apresenta rimas.'],correct:0,why:'A poesia contemporânea pode usar versos livres e produzir ritmo por pausas, imagens e cortes.'},
  {q:'A expressão “Na tela pequena / o mundo cabe no dedo” constrói:',options:['Uma imagem metafórica da experiência digital.','Uma medida real do tamanho do mundo.','Uma instrução técnica para reparar celulares.'],correct:0,why:'É uma imagem poética: o acesso ao mundo parece caber no gesto de tocar a tela.'}
 ]},
 {title:'Notificação',text:'O celular vibra.\nUma luz corta a mesa.\n\n“Você está aí?”\n\nEstou.\nMas minha resposta\nfica parada entre\no caderno aberto\ne a palavra que não envio.\n\nLá fora,\nalguém chama pelo meu nome.',guide:'O poema trabalha silêncio, pausa, fragmentação e subjetividade. A experiência contemporânea aparece no conflito entre presença digital e relações ao redor.',
 questions:[
  {q:'O eu lírico é melhor compreendido como:',options:['A voz que expressa a experiência interior apresentada no poema.','Necessariamente a pessoa real que escreveu o poema.','A pessoa que envia a mensagem “Você está aí?”.'],correct:0,why:'Eu lírico é a voz que se manifesta no texto; não deve ser confundido automaticamente com seu autor.'},
  {q:'A resposta que fica “parada” sugere:',options:['Hesitação ou dificuldade de se comunicar.','Defeito comprovado no aparelho de celular.','Certeza de que ninguém está tentando contato.'],correct:0,why:'O silêncio e a palavra não enviada indicam hesitação, não um defeito técnico.'},
  {q:'Os versos curtos e as pausas ajudam a criar:',options:['Um ritmo de interrupção que acompanha a indecisão da voz poética.','Um padrão obrigatório de rimas alternadas.','A estrutura fixa de uma epopeia clássica.'],correct:0,why:'O corte dos versos dá ritmo à hesitação e ao silêncio da experiência narrada.'},
  {q:'O chamado que vem de fora introduz a ideia de:',options:['Convivência entre o ambiente digital e as relações presenciais.','Proibição de escrever poemas sobre tecnologia.','Desaparecimento completo da comunicação humana.'],correct:0,why:'A voz do lado de fora contrapõe a notificação digital a uma relação concreta e próxima.'}
 ]},
 {title:'Quadra aberta',text:'No chão da escola\nas linhas parecem fronteiras.\n\nAté que a bola atravessa\num risco de tinta,\ne um passe encontra\nquem estava de fora.\n\nNa rede,\nnão cabe a palavra “sozinho”.\n\nO jogo começa\nquando todos podem entrar.',guide:'Este poema utiliza linguagem cotidiana e imagens do esporte para sugerir inclusão. A passagem da quadra para relações humanas amplia o sentido dos versos.',
 questions:[
  {q:'As “linhas” que “parecem fronteiras” podem simbolizar:',options:['Barreiras que separam pessoas e grupos.','Apenas os limites oficiais de uma quadra, sem possibilidade simbólica.','Uma divisão de países desenhada no chão da escola.'],correct:0,why:'A imagem cria duplo sentido: as marcações reais da quadra evocam barreiras sociais.'},
  {q:'O momento em que o passe encontra “quem estava de fora” sugere:',options:['Inclusão de alguém que não participava.','Expulsão definitiva de outro participante.','Cancelamento obrigatório da partida.'],correct:0,why:'O passe aproxima quem estava excluído da atividade coletiva.'},
  {q:'Em “Na rede, / não cabe a palavra ‘sozinho’”, o termo “rede” permite:',options:['Um jogo de sentidos entre o esporte e a ideia de relações coletivas.','Somente a referência a uma rede elétrica.','A descrição técnica de uma rede de pesca.'],correct:0,why:'O termo atua no contexto esportivo e sugere vínculos entre pessoas, ampliando a imagem poética.'},
  {q:'A principal reflexão social proposta pelo poema é:',options:['A importância da participação e do acolhimento no coletivo.','A necessidade de vencer a qualquer custo.','A ideia de que esportes não podem ser tema de poesia.'],correct:0,why:'O verso final associa o início verdadeiro do jogo à possibilidade de participação de todos.'}
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
  $('vm-paper').hidden=true;$('vm-audio').disabled=true;$('vm-hint').disabled=true;
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
 $('vm-reading-title').textContent=p.title;
 $('vm-lesson').textContent=p.guide;
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
 $('vm-paper').hidden=true;$('vm-audio').disabled=true;$('vm-hint').disabled=true;
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