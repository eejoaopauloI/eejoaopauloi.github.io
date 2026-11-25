'use strict';
/* Oficinas manipuláveis exclusivas da Missão Proporção e Escala.
   Não altera pontuação nem respostas da trilha oficial. */
(()=>{
 const root=document.getElementById('sc-map');
 if(!root)return;
 const gcd=(a,b)=>b?gcd(b,a%b):a;
 const workshop=document.createElement('section');
 workshop.className='jp-labs sc-panel';
 workshop.id='jp-labs';
 workshop.innerHTML=`
 <span class="sc-kicker">APRENDA FAZENDO</span>
 <h2>🎮 Laboratório de Proporções</h2>
 <p class="jp-lead">Mexa nos valores e observe o que muda. Complete os dois minidesafios antes de iniciar a trilha, ou volte aqui sempre que precisar.</p>
 <div class="jp-lab-grid">
 <div class="jp-lab" id="jp-ratio-lab">
  <span class="jp-lab-tag">OFICINA 1 · RAZÃO</span><h3>🏐 Bolas e cones</h3>
  <p>Uma razão compara quantidades. Ajuste os números para descobrir quantos objetos existem para cada grupo.</p>
  <div class="jp-control"><label for="jp-balls">Bolas <strong id="jp-balls-n">4</strong></label><input id="jp-balls" type="range" min="1" max="12" value="4"></div>
  <div class="jp-control"><label for="jp-cones">Cones <strong id="jp-cones-n">6</strong></label><input id="jp-cones" type="range" min="1" max="12" value="6"></div>
  <div class="jp-objects"><div><small>BOLAS</small><div id="jp-balls-dots" class="jp-dots"></div></div><div><small>CONES</small><div id="jp-cones-dots" class="jp-dots"></div></div></div>
  <div class="jp-equation" aria-live="polite" id="jp-ratio-result"></div>
  <div class="jp-challenge"><strong>🎯 Desafio da oficina</strong><p>Configure 6 bolas e 9 cones. Qual é a razão bolas:cones simplificada?</p>
   <div class="jp-choice-row" id="jp-ratio-choices"><button type="button" data-answer="3:2">3:2</button><button type="button" data-answer="2:3">2:3</button><button type="button" data-answer="6:9">6:9</button></div>
   <p class="jp-lab-feedback" id="jp-ratio-feedback" role="status">Use os controles e selecione sua resposta.</p>
  </div>
 </div>
 <div class="jp-lab" id="jp-scale-lab">
  <span class="jp-lab-tag">OFICINA 2 · ESCALA</span><h3>📏 Da planta à realidade</h3>
  <p>Em uma escala 1:n, cada centímetro desenhado representa n centímetros reais. Compare as medidas.</p>
  <div class="jp-control"><label for="jp-scale">Escala: <strong id="jp-scale-n">1:100</strong></label><input id="jp-scale" type="range" min="1" max="4" step="1" value="2"></div>
  <div class="jp-control"><label for="jp-length">Comprimento no desenho: <strong id="jp-length-n">3 cm</strong></label><input id="jp-length" type="range" min="1" max="10" value="3"></div>
  <div class="jp-scale-graphic"><div class="jp-ruler" id="jp-ruler"></div><small id="jp-ruler-note"></small></div>
  <div class="jp-equation" id="jp-scale-result" aria-live="polite"></div>
  <div class="jp-challenge"><strong>🎯 Desafio da oficina</strong><p>Na escala 1:200, um desenho mede 4 cm. Qual é o comprimento real em metros?</p>
   <div class="jp-challenge-input"><input id="jp-scale-answer" type="number" min="0" step="any" inputmode="decimal" aria-label="Comprimento real em metros" placeholder="Resposta em metros"><button type="button" id="jp-scale-check">Conferir</button></div>
   <p class="jp-lab-feedback" id="jp-scale-feedback" role="status">Lembre-se: 100 centímetros formam 1 metro.</p>
  </div>
 </div>
 </div>
 <div class="jp-awards" id="jp-awards" aria-live="polite"><strong>🏅 Conquistas das oficinas: 0/2</strong><span>As oficinas são um treino livre. Os JPs e o relatório da trilha continuam sendo registrados nos 25 desafios.</span></div>
 <div class="sc-actions"><button type="button" class="sc-btn" id="jp-go-mission">Agora, iniciar os desafios →</button></div>
 `;
 root.parentNode.insertBefore(workshop,root);
 const $=id=>document.getElementById(id);
 const goals={ratio:false,scale:false};
 const refreshAwards=()=>{$('jp-awards').querySelector('strong').textContent='🏅 Conquistas das oficinas: '+Object.values(goals).filter(Boolean).length+'/2';};
 const dots=(id,n,symbol)=>{const el=$(id);el.replaceChildren();for(let i=0;i<n;i++){const dot=document.createElement('span');dot.textContent=symbol;dot.setAttribute('aria-hidden','true');el.append(dot)}el.setAttribute('aria-label',n+' unidades');};
 function updateRatio(){
  const a=+$('jp-balls').value,b=+$('jp-cones').value,d=gcd(a,b);
  $('jp-balls-n').textContent=a;$('jp-cones-n').textContent=b;
  dots('jp-balls-dots',a,'🏐');dots('jp-cones-dots',b,'🔶');
  $('jp-ratio-result').textContent=a+' : '+b+' = '+(a/d)+' : '+(b/d)+'  ·  Dividimos os dois termos por '+d+'.';
 }
 const factors=[20,50,100,200];
 function updateScale(){
  const factor=factors[+$('jp-scale').value-1],n=+$('jp-length').value,cm=n*factor;
  $('jp-scale-n').textContent='1:'+factor;$('jp-length-n').textContent=n+' cm';
  $('jp-ruler').style.width=Math.min(100,n*9+10)+'%';
  $('jp-ruler').textContent=n+' cm na planta';
  $('jp-ruler-note').textContent='Barra ilustrativa, não uma medida física da tela.';
  $('jp-scale-result').textContent=n+' × '+factor+' = '+cm+' cm reais = '+(cm/100).toLocaleString('pt-BR')+' m.';
 }
 for(const name of ['jp-balls','jp-cones'])$(name).addEventListener('input',updateRatio);
 for(const name of ['jp-scale','jp-length'])$(name).addEventListener('input',updateScale);
 $('jp-ratio-choices').addEventListener('click',e=>{
  const b=e.target.closest('button[data-answer]');if(!b)return;
  const a=+$('jp-balls').value,c=+$('jp-cones').value;
  if(a!==6||c!==9){$('jp-ratio-feedback').textContent='Primeiro ajuste os controles para 6 bolas e 9 cones. Assim você confere a razão na prática.';return;}
  if(b.dataset.answer==='2:3'){goals.ratio=true;$('jp-ratio-feedback').textContent='✅ Excelente! 6:9 = 2:3 porque dividimos os dois termos por 3.';refreshAwards();}
  else $('jp-ratio-feedback').textContent='🔎 Ainda não. Divida 6 e 9 pelo mesmo número e mantenha a ordem bolas:cones.';
 });
 $('jp-scale-check').addEventListener('click',()=>{
  const raw=$('jp-scale-answer').value;
  if(raw===''){ $('jp-scale-feedback').textContent='Digite um valor em metros antes de conferir.';return; }
  const n=Number(raw);
  if(Math.abs(n-8)<0.000001){goals.scale=true;$('jp-scale-feedback').textContent='✅ Isso! 4 × 200 = 800 cm e 800 ÷ 100 = 8 m.';refreshAwards();}
  else $('jp-scale-feedback').textContent='🔎 Observe: 4 cm × 200 = 800 cm. Agora converta centímetros para metros dividindo por 100.';
 });
 $('jp-go-mission').addEventListener('click',()=>$('sc-start').click());
 updateRatio();updateScale();
})();