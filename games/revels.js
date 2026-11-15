(function(){
  const host = document.getElementById('rv-host');
  const root = host.attachShadow({mode:'open'});
  const st = document.createElement('style');
  st.textContent = "\n/* Revels styles: mirror the shared site look (music-card / music-btn in assets/css/style.css) */\n*{box-sizing:border-box;}\n.hidden{display:none!important;}\n.btn{font-family:'Title Wave',Georgia,serif;font-weight:900;background:#C9A84C;color:#000;border:1px solid #C9A84C;padding:.6rem 1.5rem;letter-spacing:.15em;text-transform:uppercase;cursor:pointer;margin:5px;font-size:clamp(.85rem,1.8vw,1.1rem);max-width:100%;border-radius:0;transition:background .2s,color .2s,border-color .2s;}\n.btn:disabled{opacity:.35;cursor:default;}\n.btn.ghost{background:transparent;color:rgba(255,200,0,.75);border:1px solid rgba(255,200,0,.3);}\n.btn.power{background:#4a2c6a;color:#FFD700;border-color:#C9A84C;}\n.row{display:flex;gap:.5rem;justify-content:center;flex-wrap:wrap;margin-top:.5rem;}\n.row .btn{margin:0;}\n.menu{display:flex;flex-direction:column;align-items:stretch;gap:12px;margin:0 auto 1.5rem;max-width:600px;width:100%;}\n.menu .btn{width:100%;margin:0;padding:.9rem 1rem;}\n.games{display:flex;flex-direction:column;gap:2rem;width:100%;max-width:600px;margin:0 auto;}\n.gcard{border:1px solid rgba(201,168,76,.25);padding:1.8rem;background:rgba(201,168,76,.03);cursor:pointer;transition:border-color .2s;}\n.gcard-title{font-weight:900;font-size:clamp(1.4rem,3vw,2.2rem);color:#C9A84C;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.4rem;text-shadow:0 0 20px rgba(201,168,76,.3);}\n.gcard-sub{font-style:italic;font-weight:700;font-size:clamp(1rem,2.2vw,1.4rem);color:rgba(255,255,255,.45);letter-spacing:.1em;text-transform:uppercase;margin-bottom:1.2rem;}\n.card{border:1px solid rgba(201,168,76,.25);background:rgba(201,168,76,.03);max-width:600px;margin:0 auto 1.5rem;padding:1.8rem;}\n.sub{font-style:italic;font-weight:700;color:rgba(255,255,255,.6);letter-spacing:.1em;text-transform:uppercase;font-size:clamp(1rem,2.2vw,1.3rem);margin:0 0 1rem;}\n.qnum{color:#C9A84C;letter-spacing:.1em;text-transform:uppercase;font-size:.8rem;}\n.timerbar{height:3px;background:rgba(255,255,255,.1);margin:12px 0 4px;overflow:hidden;}\n.timerbar div{height:100%;width:100%;background:#C9A84C;}\n.question{font-weight:700;font-size:clamp(1.05rem,2.4vw,1.35rem);line-height:1.45;margin:14px 0;letter-spacing:.04em;}\n.answers{display:flex;flex-direction:column;gap:8px;}\n.ans{font-family:'Title Wave',Georgia,serif;font-weight:700;color:#fff;background:transparent;border:1px solid rgba(201,168,76,.4);padding:.9rem 1rem;cursor:pointer;text-align:left;font-size:clamp(.95rem,2vw,1.15rem);letter-spacing:.05em;transition:all .2s;}\n.ans.right{background:rgba(201,168,76,.25);border-color:#C9A84C;color:#FFD700;}\n.ans.wrong{background:rgba(139,0,0,.35);border-color:#8B0000;}\n.ans:disabled{cursor:default;}\n#feedback{min-height:2rem;margin:12px 0 6px;font-style:italic;font-weight:700;font-size:1.05rem;}\n#result-title{font-weight:900;color:#C9A84C;font-size:clamp(1.4rem,3.5vw,2rem);letter-spacing:.08em;text-transform:uppercase;margin:0 0 .6rem;text-shadow:0 0 20px rgba(201,168,76,.3);}\n.endtitle{font-weight:900;color:#C9A84C;font-size:clamp(1.2rem,3vw,1.7rem);letter-spacing:.08em;text-transform:uppercase;margin:0 0 .6rem;line-height:1.3;}\n.play{scroll-margin-top:5.2rem;}\n.board{display:block;margin:0 auto;width:min(100%,480px,calc((100vh - 280px) * .75));min-width:min(100%,260px);height:auto;border:2px solid #C9A84C;touch-action:none;background:#000;}\n.gbar{display:flex;justify-content:space-between;gap:8px;max-width:480px;margin:0 auto 6px;color:#fff;font-size:.85rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;flex-wrap:wrap;}\n.gbar b{color:#FFD700;}\n#jmsg,#c-msg{min-height:1.4rem;font-style:italic;font-weight:700;font-size:.95rem;margin:6px auto;max-width:480px;}\n.cats{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin:0 0 1.2rem;}\n.catpick{cursor:pointer;border:1px solid rgba(201,168,76,.35);background:rgba(201,168,76,.03);padding:10px;width:150px;transition:.2s;overflow-wrap:break-word;}\n.catpick.sel{border-color:#FFD700;box-shadow:0 0 14px rgba(255,215,0,.45);}\n.catpick img{width:100%;height:auto;display:block;}\n.catpick .n{font-weight:900;color:#C9A84C;font-size:.85rem;letter-spacing:.06em;text-transform:uppercase;margin-top:6px;}\n.catpick .a{font-style:italic;font-size:.85rem;color:rgba(255,255,255,.8);line-height:1.3;margin-top:4px;}\n@media (max-width:700px){.board{width:min(100%,480px,calc((100dvh - 385px) * .75));}.games{gap:1rem;}.gcard{padding:1rem;}.gcard-sub{margin-bottom:.7rem;font-size:.95rem;}.catpick img{height:90px!important;}.cats{display:block;margin-bottom:.6rem;}.catpick{display:inline-block;vertical-align:top;margin:4px;}.sub{margin-bottom:.6rem;}}@media (max-width:700px) and (max-height:700px){.catpick img{height:56px!important;}.cats .catpick{padding:5px;}.cats .catpick .a{font-size:.7rem;line-height:1.15;}.cats .catpick .n{margin-top:2px;}.gbar{font-size:.75rem;}}@media (max-width:480px){.row{gap:.4rem;}.row .btn{flex:1 1 0;min-width:0;padding:.6rem .4rem;letter-spacing:.08em;}.gcard,.card{padding:1.2rem;}.catpick{width:136px;padding:8px;}.catpick .a{font-size:.78rem;letter-spacing:0;}}\n\n@media (hover:hover){.btn:hover:not(:disabled){background:#FFD700;border-color:#FFD700;}.btn.ghost:hover:not(:disabled){background:transparent;color:#FFCC00;border-color:#FFCC00;}.btn.power:hover:not(:disabled){background:#5d3a85;}.gcard:hover{border-color:rgba(201,168,76,.6);}.ans:hover:not(:disabled){border-color:#C9A84C;color:#C9A84C;}.catpick:hover{border-color:#C9A84C;transform:translateY(-3px);}}\n";
  root.appendChild(st);
  root.appendChild(document.getElementById('rv-tpl').content.cloneNode(true));
  (function(root){
    const doc = {
      getElementById: id => root.getElementById(id),
      querySelectorAll: s => root.querySelectorAll(s),
      createElement: t => document.createElement(t),
      addEventListener: (t,f,o) => window.addEventListener(t,f,o)
    };

const CAT_IMG = {"Tesla": "media/d09f352d3b.png", "Berlioz": "media/5a00fde75a.png", "OMalley": "media/302e5a44d2.png", "Kableton": "media/36744be296.png"};
const TRIVIA = {"first": {"title": "First Grade", "timer": 0, "qs": [["What sound does a cat make?", ["Meow", "Woof", "Moo", "Oink"], 0], ["What do cats use to clean their fur?", ["Their tongue", "A towel", "Soap", "A comb"], 0], ["How many ears does a cat usually have?", ["Two", "One", "Four", "Six"], 0], ["Which animal says moo?", ["A cow", "A cat", "A dog", "A duck"], 0], ["What do cats love to chase?", ["Yarn", "Clocks", "Clouds", "Trees"], 0], ["Which of these is a color?", ["Blue", "Loud", "Jump", "Tall"], 0], ["What is the opposite of hot?", ["Cold", "Warm", "Sweet", "Bright"], 0], ["Which animal lives in water?", ["A fish", "A horse", "An owl", "A cow"], 0], ["How many legs does a cat have?", ["Four", "Two", "Six", "Eight"], 0], ["Which of these is a day of the week?", ["Monday", "Summer", "Purple", "Circle"], 0]]}, "fourth": {"title": "Fourth Grade", "timer": 0, "qs": [["What is the Lady's full name?", ["Lady Tesla Diana", "Lady Tessie Lou", "Queen Marie", "Princess Anna"], 0], ["Which cat is called the Knight?", ["Berlioz", "Kableton", "O'Malley", "Toby"], 0], ["Where was Tessie found by her family?", ["Under a car seat", "In a barn", "In a box", "In a tree"], 0], ["Who arrived while Tessie was missing?", ["Maximus", "Toby", "Kableton", "Berlioz"], 0], ["Which cat is Maine's official state cat?", ["Maine Coon", "Sphynx", "Scottish Fold", "British Shorthair"], 0], ["What did Kableton claim to fight?", ["A dragon", "A bird", "A dog", "A mouse"], 0], ["Where did O'Malley and Berlioz come from?", ["Burlington, Iowa", "Colorado", "Alabama", "Georgia"], 0], ["What did the Lady like to drink from?", ["The faucet", "A bowl", "A puddle", "A cup"], 0], ["How many children were in the first family?", ["Four", "Two", "Three", "Five"], 0], ["Which cat did Tessie learn to put up with?", ["O'Malley", "Kableton", "Berlioz", "Toby"], 0]]}, "eighth": {"title": "Eighth Grade", "timer": 5, "qs": [["Which breed was developed in Toronto in 1966?", ["Sphynx", "Maine Coon", "Scottish Fold", "British Shorthair"], 0], ["What percent of Tessie is Maine Coon?", ["10%", "13%", "7%", "3%"], 0], ["What is the biggest part of Tessie's mix?", ["American domestic cat", "Maine Coon", "Sphynx", "Scottish Fold"], 0], ["How long was the family's trip to Colorado?", ["Two weeks", "Six weeks", "Two days", "Two months"], 0], ["Which breed is known for folded ears?", ["Scottish Fold", "Sphynx", "Maine Coon", "Manx"], 0], ["How old was Kableton when he arrived?", ["Three weeks", "Three months", "One year", "Six weeks"], 0], ["What did Berlioz do when Kableton ran from the dragon?", ["Took care of the dragon", "Ran away too", "Took a nap", "Called for help"], 0], ["What kind of dog was Toby?", ["German Shepherd", "Poodle", "Beagle", "Pug"], 0], ["What percent of Tessie is Scottish Fold?", ["7%", "10%", "6%", "13%"], 0], ["Where did the cats travel in December?", ["Iowa to Colorado", "Florida to Georgia", "Alabama to Iowa", "Georgia to Florida"], 0]]}, "tenth": {"title": "The Sovereign's Trial", "timer": 4, "qs": [["Which word means 'a line of descent'?", ["Lineage", "Pastry", "Fee", "Courtyard"], 0], ["'Ephemeral' most nearly means", ["Lasting a very short time", "Eternal", "Extremely loud", "Deep underground"], 0], ["'Benevolent' most nearly means", ["Kind and generous", "Cruel and cold", "Hungry", "Sleepy"], 0], ["'Ubiquitous' most nearly means", ["Found everywhere", "Hard to find", "Easily broken", "Brightly colored"], 0], ["'Pragmatic' most nearly means", ["Practical and sensible", "Dreamy and vague", "Angry", "Fancy"], 0], ["'Heterogeneous' most nearly means", ["Made of diverse parts", "Entirely identical", "Completely silent", "Very heavy"], 0], ["'Sovereign' most nearly means", ["A supreme ruler", "A loyal servant", "A court jester", "A grave marker"], 0], ["'Tolerate' most nearly means", ["To endure", "To adore", "To expel", "To celebrate"], 0], ["'Undying' most nearly means", ["Everlasting", "Brief", "Forgotten", "Painful"], 0], ["'Clandestine' most nearly means", ["Secret", "Loud and public", "Bright and cheerful", "Frozen solid"], 0]]}};
const CATS = [
  {id:'Tesla', name:'Tesla', ability:'Yarn Spell: clears hazards once each round', lives:3, speed:1},
  {id:'OMalley', name:"O'Malley", ability:'Starts with an extra life', lives:4, speed:1},
  {id:'Kableton', name:'Kableton', ability:'Power-ups last twice as long', lives:3, speed:1},
  {id:'Berlioz', name:'Berlioz', ability:'Moves faster', lives:3, speed:1.3}
];
const imgs = {};
Object.keys(CAT_IMG).forEach(k => { const im = new Image(); im.src = CAT_IMG[k]; imgs[k] = im; });

// ---------- navigation ----------
function hideAll(){
  ['menu','trivia-levels','trivia-card','trivia-result','jumpy-view','crossy-view'].forEach(id => doc.getElementById(id).classList.add('hidden'));
  stopTimer(); stopJumpy(); 
}
function backToMenu(){ hideAll(); doc.getElementById('menu').classList.remove('hidden'); }
function showTrivia(){ hideAll(); doc.getElementById('trivia-levels').classList.remove('hidden'); }

// ---------- trivia ----------
let currentLevel = 'first', qIdx = 0, score = 0, answered = false, activeQs = [], timerRaf = 0, timerEnd = 0, timerLen = 0;
function startLevel(level){
  currentLevel = level; activeQs = TRIVIA[level].qs.slice(); qIdx = 0; score = 0;
  hideAll(); doc.getElementById('trivia-card').classList.remove('hidden');
  renderQuestion();
}
function stopTimer(){ if(timerRaf) cancelAnimationFrame(timerRaf); timerRaf = 0; }
function startTimer(){
  stopTimer();
  const secs = TRIVIA[currentLevel].timer;
  const wrap = doc.getElementById('timer-wrap');
  if(!secs){ wrap.classList.add('hidden'); return; }
  wrap.classList.remove('hidden');
  timerLen = secs*1000; timerEnd = performance.now() + timerLen;
  const tick = now => {
    const left = Math.max(0, timerEnd - now);
    doc.getElementById('timer-fill').style.width = (left/timerLen*100) + '%';
    if(left <= 0){ timeUp(); return; }
    timerRaf = requestAnimationFrame(tick);
  };
  timerRaf = requestAnimationFrame(tick);
}
function timeUp(){
  stopTimer();
  if(answered) return;
  answered = true;
  const q = activeQs[qIdx];
  doc.querySelectorAll('#answers .ans').forEach((b,i) => { b.disabled = true; if(i === q[2]) b.classList.add('right'); });
  doc.getElementById('feedback').textContent = 'Time ran out. The answer was: ' + q[1][q[2]] + '.';
  showNext();
}
function renderQuestion(){
  const q = activeQs[qIdx];
  answered = false;
  doc.getElementById('hud-trivia').textContent = TRIVIA[currentLevel].title + '  ·  Question ' + (qIdx+1) + ' of ' + activeQs.length + '  ·  Score ' + score;
  doc.getElementById('question').textContent = q[0];
  const box = doc.getElementById('answers'); box.innerHTML = '';
  q[1].forEach((txt,i) => {
    const b = doc.createElement('button'); b.className = 'ans'; b.textContent = txt;
    b.onclick = () => pick(i); box.appendChild(b);
  });
  doc.getElementById('feedback').textContent = '';
  doc.getElementById('next').classList.add('hidden');
  startTimer();
}
function pick(i){
  if(answered) return;
  answered = true; stopTimer();
  const q = activeQs[qIdx];
  const btns = doc.querySelectorAll('#answers .ans');
  btns.forEach(b => b.disabled = true);
  if(i === q[2]){ score++; btns[i].classList.add('right'); doc.getElementById('feedback').textContent = 'Correct. The Lady notices.'; }
  else { btns[i].classList.add('wrong'); btns[q[2]].classList.add('right'); doc.getElementById('feedback').textContent = 'Incorrect. The answer was: ' + q[1][q[2]] + '.'; }
  showNext();
}
function showNext(){
  const n = doc.getElementById('next');
  n.textContent = qIdx === activeQs.length - 1 ? 'See Your Fate' : 'Next';
  n.classList.remove('hidden');
}
function nextQuestion(){
  if(qIdx === activeQs.length - 1){ showResult(); return; }
  qIdx++; renderQuestion();
}
function showResult(){
  hideAll(); doc.getElementById('trivia-result').classList.remove('hidden');
  const total = activeQs.length; let title, text;
  if(score === total){ title = 'Tesla Is Pleased'; text = 'You scored ' + score + ' of ' + total + '. You are now her advisor.'; }
  else if(score * 2 >= total){ title = 'Tesla Is Not Very Pleased'; text = 'You scored ' + score + ' of ' + total + '. You may remain in her service as a servant.'; }
  else { title = 'Tesla Is Not Pleased'; text = 'You scored ' + score + ' of ' + total + '. You are banned from the realm.'; }
  doc.getElementById('result-title').textContent = title;
  doc.getElementById('result-text').textContent = text;
}

// ---------- jumpy cat ----------
const JW = 480, JH = 640, JDPR = Math.min(2, window.devicePixelRatio || 1);
const jcv = doc.getElementById('j-canvas');
jcv.width = JW*JDPR; jcv.height = JH*JDPR;
const jg = jcv.getContext('2d'); jg.setTransform(JDPR,0,0,JDPR,0,0);
const JCATS = {
  Tesla:    {name:'Tesla',    ability:'Heart every 50 columns + passage button', lives:1, gap:165, flap:-330, size:1},
  OMalley:  {name:"O'Malley", ability:'A heart every 25 columns',              lives:1, gap:165, flap:-330, size:1},
  Kableton: {name:'Kableton', ability:'Wider gaps between columns',           lives:1, gap:210, flap:-330, size:1},
  Berlioz:  {name:'Berlioz',  ability:'Stays small (1/3 height)',              lives:1, gap:165, flap:-330, size:0.33}
};
const CAT_ORDER = ['Tesla','Berlioz','Kableton','OMalley'];
const IMG_J = {};
Object.keys(CAT_IMG).forEach(k => { const im = new Image(); im.src = CAT_IMG[k]; IMG_J[k] = im; });
let jchosen = 'Tesla', J = null, jraf = 0, jbest = 0;
try{ jbest = +(localStorage.getItem('jumpyBest') || 0); }catch(e){}
function showJumpy(){ hideAll(); doc.getElementById('jumpy-view').classList.remove('hidden'); showJumpySelect(); }
function showJumpySelect(){
  stopJumpy();
  doc.getElementById('jumpy-view').classList.remove('hidden');
  doc.getElementById('j-select').classList.remove('hidden');
  doc.getElementById('j-play').classList.add('hidden');
  doc.getElementById('j-end').classList.add('hidden');
  const box = doc.getElementById('j-cats'); box.innerHTML = '';
  CAT_ORDER.forEach(id => {
    const d = doc.createElement('div');
    d.className = 'catpick' + (id === jchosen ? ' sel' : '');
    d.onclick = () => { jchosen = id; showJumpySelect(); };
    const im = doc.createElement('img'); im.src = CAT_IMG[id]; im.alt = JCATS[id].name;
    const n = doc.createElement('div'); n.className = 'n'; n.textContent = JCATS[id].name;
    const a = doc.createElement('div'); a.className = 'a'; a.textContent = JCATS[id].ability;
    d.append(im, n, a); box.appendChild(d);
  });
}
function stopJumpy(){ if(J) J.running = false; if(jraf) cancelAnimationFrame(jraf); jraf = 0; }
function jumpyStart(){
  stopJumpy();
  const c = JCATS[jchosen];
  J = {c, y: JH/2, vy: 0, gravity: 900, pipes: [], bees: [], mice: [], score: 0, lives: c.lives,
       shield: 0, gap: c.gap, flapV: c.flap, spawnT: 0.6, speed: 150,
       inv: 0, flash: 0, running: true, ready: true, bob: 0, last: performance.now(), mouseCount: 0, passReady: false, size: c.size || 1};
  const pbtn = doc.getElementById('j-pass'); if(pbtn){ pbtn.style.display = 'none'; pbtn.disabled = true; }
  doc.getElementById('j-select').classList.add('hidden');
  doc.getElementById('j-end').classList.add('hidden');
  doc.getElementById('j-play').classList.remove('hidden');
  updateJumpyHUD();
  jmsg('Tap, press Space or Flap to begin. Slip between the columns.');
  if(!(window.Pager && Pager.isPhone())) doc.getElementById('j-play').scrollIntoView({block:'start'});
  jraf = requestAnimationFrame(jumpyLoop);
}
function jmsg(t){ doc.getElementById('jmsg').textContent = t; }
function heartsHTML(n){ let s = ''; for(let i=0;i<n;i++) s += '<span style="color:#e0304f">&#9829;</span>'; return s || '<span style="color:#555">none</span>'; }
function updateJumpyHUD(){
  doc.getElementById('j-lives').innerHTML = heartsHTML(J.lives) + (J.shield ? ' <span style="color:#FFD700">&#9670; shield</span>' : '');
  doc.getElementById('j-score').textContent = J.score;
  doc.getElementById('j-best').textContent = jbest;
}
function jflap(){ if(J && J.running){ if(J.ready){ J.ready = false; jmsg(''); } J.vy = J.flapV; } }
function usePass(){
  if(!J || !J.running || !J.passReady) return;
  J.passReady = false;
  J.inv = 10; // invincible for ~10 columns worth of time
  const btn = doc.getElementById('j-pass');
  if(btn){ btn.style.display = 'none'; btn.disabled = true; }
  jmsg('Passage granted! Safe through the next columns.');
}
function jumpyEnd(){ if(J && J.running) jumpyFinish(); }
function jumpyFinish(won){
  stopJumpy();
  jbest = Math.max(jbest, J.score);
  try{ localStorage.setItem('jumpyBest', jbest); }catch(e){}
  doc.getElementById('j-play').classList.add('hidden');
  doc.getElementById('j-end').classList.remove('hidden');
  if(won){
    doc.getElementById('j-result').textContent = 'Congratulations, you made it home for dinner.';
    doc.getElementById('j-summary').textContent = 'Columns passed: ' + J.score + '.  Best: ' + jbest + '.';
  } else {
    doc.getElementById('j-result').textContent = 'The Columns Have Claimed You';
    doc.getElementById('j-summary').textContent = 'Columns passed: ' + J.score + '.  Best: ' + jbest + '.';
  }
}
function jumpyLoop(now){
  if(!J || !J.running) return;
  jraf = requestAnimationFrame(jumpyLoop);
  const dt = Math.min((now - J.last)/1000, 0.035); J.last = now;
  if(J.ready){ J.bob += dt; J.y = JH/2 + Math.sin(J.bob*4)*8; drawJumpy(); return; }
  J.vy += J.gravity*dt; J.y += J.vy*dt;
  if(J.inv > 0) J.inv -= dt;
  if(J.flash > 0) J.flash -= dt;
  J.speed = Math.min(260, 150 + J.score*4);
  J.spawnT -= dt;
  if(J.spawnT <= 0){
    const top = 120 + Math.random()*(JH - 300 - J.gap);
    J.pipes.push({x: JW + 20, top, passed: false});
    if(Math.random() < 0.3) J.mice.push({x: JW + 40, y: JH - 70 - 14, got: false});
    J.spawnT = 1.7;
  }
  const catX = 120, half = 22 * (J.size || 1);
  for(const p of J.pipes){
    p.x -= J.speed*dt;
    if(!p.passed && p.x + 60 < catX){
      p.passed = true; J.score++;
      // hearts
      if(jchosen === 'OMalley' && J.score % 25 === 0) J.bees.push({x: JW + 40, y: p.top + J.gap/2, t: 0});
      if(jchosen === 'Tesla' && J.score % 50 === 0) J.bees.push({x: JW + 40, y: p.top + J.gap/2, t: 0});
      // Tesla passage button every 50
      if(jchosen === 'Tesla' && J.score % 50 === 0){
        J.passReady = true;
        const btn = doc.getElementById('j-pass');
        if(btn){ btn.style.display = 'inline-block'; btn.disabled = false; }
      }
      if(J.score >= 750){ updateJumpyHUD(); jumpyFinish(true); return; }
      updateJumpyHUD();
    }
  }
  J.pipes = J.pipes.filter(p => p.x > -80);
  for(const b of J.bees){ b.x -= J.speed*dt*0.9; b.t += dt; b.y += Math.sin(b.t*4)*0.8; }
  J.bees = J.bees.filter(b => b.x > -40);
  for(const m of J.mice){ m.x -= (J.speed + 60)*dt; }
  J.mice = J.mice.filter(m => m.x > -60);
  // collect bee hearts
  for(let i = J.bees.length-1; i >= 0; i--){
    const b = J.bees[i];
    if(Math.hypot(b.x - catX, b.y - J.y) < 36){
      J.bees.splice(i,1); J.lives++; updateJumpyHUD(); jmsg('A bee brings you a heart!');
    }
  }
  // collisions
  let hit = false;
  if(J.y - half < 0 || J.y + half > JH - 70) hit = true;
  if(J.inv <= 0){
    for(const p of J.pipes){
      const overlapX = catX + half > p.x && catX - half < p.x + 60;
      if(overlapX && (J.y - half < p.top || J.y + half > p.top + J.gap)){ hit = true; break; }
    }
    for(const m of J.mice){
      if(Math.abs(m.x - catX) < 30 && J.y + half > JH - 70 - 26){ hit = true; break; }
    }
  }
  if(hit && J.inv <= 0){
    J.y = Math.max(half, Math.min(JH - 70 - half, J.y)); J.vy = 0;
    J.flash = 0.35; J.inv = 1.0;
    if(J.shield > 0){ J.shield--; jmsg('Your yarn shield absorbed the hit!'); }
    else {
      J.lives--; jmsg(J.lives > 0 ? 'Ouch! You lost a heart.' : '');
      if(J.lives <= 0){ updateJumpyHUD(); jumpyFinish(); return; }
    }
    updateJumpyHUD();
  }
  drawJumpy();
}
function drawBee(x,y){
  jg.save(); jg.translate(x,y);
  jg.fillStyle = '#FFD21A'; jg.beginPath(); jg.ellipse(0,0,14,10,0,0,Math.PI*2); jg.fill();
  jg.fillStyle = '#1a1a1a'; jg.fillRect(-5,-10,4,20); jg.fillRect(3,-10,4,20);
  jg.fillStyle = 'rgba(255,255,255,.7)'; jg.beginPath(); jg.ellipse(-4,-14,7,5,-0.3,0,Math.PI*2); jg.fill(); jg.beginPath(); jg.ellipse(6,-14,7,5,0.3,0,Math.PI*2); jg.fill();
  jg.fillStyle = '#e0304f'; jg.beginPath(); jg.moveTo(0,20); jg.bezierCurveTo(-12,8,-8,-2,0,4); jg.bezierCurveTo(8,-2,12,8,0,20); jg.fill();
  jg.restore();
}
function drawMouse(x,y){
  jg.save(); jg.translate(x,y);
  jg.strokeStyle = '#8f8f9a'; jg.lineWidth = 3; jg.beginPath(); jg.moveTo(-14,4); jg.quadraticCurveTo(-30,-6,-26,-16); jg.stroke();
  jg.fillStyle = '#9a9aa6'; jg.beginPath(); jg.ellipse(0,0,16,10,0,0,Math.PI*2); jg.fill();
  jg.beginPath(); jg.arc(14,-4,8,0,Math.PI*2); jg.fill();
  jg.fillStyle = '#f2a7b5'; jg.beginPath(); jg.arc(12,-12,4,0,Math.PI*2); jg.fill();
  jg.fillStyle = '#000'; jg.beginPath(); jg.arc(18,-6,1.6,0,Math.PI*2); jg.fill();
  jg.restore();
}
function drawJumpy(){
  jg.clearRect(0,0,JW,JH);
  const sky = jg.createLinearGradient(0,0,0,JH);
  sky.addColorStop(0,'#1a0a2e'); sky.addColorStop(0.4,'#2d1b4e'); sky.addColorStop(0.8,'#3d2060'); sky.addColorStop(1,'#1a0a2e');
  jg.fillStyle = sky; jg.fillRect(0,0,JW,JH);
  // royal gold accents
  jg.fillStyle = 'rgba(201,168,76,.08)';
  for(let i=0;i<5;i++){ jg.beginPath(); jg.arc(40+i*100,60+(i%2)*50,50,0,Math.PI*2); jg.fill(); }
  // subtle crown-like lines
  jg.strokeStyle = 'rgba(201,168,76,.15)'; jg.lineWidth = 1;
  for(let i=0;i<8;i++){ jg.beginPath(); jg.moveTo(i*60,0); jg.lineTo(i*60+30,40); jg.stroke(); }
  J.pipes.forEach(p => {
    const bottom = p.top + J.gap;
    [[0, p.top],[bottom, JH-70]].forEach(([y0, y1]) => {
      const pg = jg.createLinearGradient(p.x,0,p.x+60,0);
      pg.addColorStop(0,'#4a2c6a'); pg.addColorStop(0.3,'#C9A84C'); pg.addColorStop(0.7,'#C9A84C'); pg.addColorStop(1,'#4a2c6a');
      jg.fillStyle = pg; jg.fillRect(p.x, y0, 60, y1 - y0);
      // column capital
      jg.fillStyle = '#E8CC7A';
      if(y0 === 0){ jg.fillRect(p.x-8, y1-18, 76, 18); jg.fillRect(p.x-4, y1-26, 68, 8); }
      else { jg.fillRect(p.x-8, y0, 76, 18); jg.fillRect(p.x-4, y0+18, 68, 8); }
    });
  });
  const cg = jg.createLinearGradient(0,JH-70,0,JH); cg.addColorStop(0,'#8b1420'); cg.addColorStop(1,'#4a0a12');
  jg.fillStyle = cg; jg.fillRect(0,JH-70,JW,70);
  jg.fillStyle = '#C9A84C'; jg.fillRect(0,JH-72,JW,3);
  J.mice.forEach(m => drawMouse(m.x, JH-70-14));
  J.bees.forEach(b => drawBee(b.x, b.y));
  const img = IMG_J[jchosen];
  const scale = J.size || 1;
  const h = 120 * scale, w = h*0.75;
  jg.save();
  if(J.inv > 0 && Math.floor(performance.now()/90) % 2 === 0) jg.globalAlpha = 0.35;
  if(img && img.complete) jg.drawImage(img, 120 - w/2, J.y - h/2, w, h);
  jg.restore();
  if(J.flash > 0){ jg.fillStyle = 'rgba(139,0,0,' + (J.flash*0.6) + ')'; jg.fillRect(0,0,JW,JH); }
}
doc.getElementById('j-flap').addEventListener('click', jflap);
jcv.addEventListener('pointerdown', jflap);
doc.addEventListener('keydown', e => {
  if(!J || !J.running) return;
  if(e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w'){ e.preventDefault(); jflap(); }
});

backToMenu();

    window.backToMenu = backToMenu;
    function retryLevel(){ startLevel(currentLevel); }
window.jumpyEnd = jumpyEnd;
window.jumpyStart = jumpyStart;
window.nextQuestion = nextQuestion;
window.retryLevel = retryLevel;
window.showJumpy = showJumpy;
window.showJumpySelect = showJumpySelect;
window.showCrossy = function(){ hideAll(); const v=doc.getElementById('crossy-view'); if(v) v.classList.remove('hidden'); else alert('Crossy Cat coming soon — carriages, lily pads, 1000 jumps to the castle!'); };
window.showTrivia = showTrivia;
window.startLevel = startLevel;
window.rvStop = function(){ stopTimer(); stopJumpy();  };
  })(root);
})();
