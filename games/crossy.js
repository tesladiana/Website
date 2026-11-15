// ===== CROSSY CAT — The Royal Crossing =====
// Run from the palace garden toward the water: hop over garden paths full of
// carriages, horses, corgis and guards, then across the pond on lily pads and flower rafts.
(function(){
  const R = document.getElementById('rv-host').shadowRoot;
  const $ = id => R.getElementById(id);
  const CATS = {
    Tesla:    {name:'Lady Tesla',    img:'media/cat-tesla.png',    lives:3, power:'decree',
               ability:'Royal Decree: freezes every hazard for 3 seconds', cd:15},
    Berlioz:  {name:'Sir Berlioz',   img:'media/cat-berlioz.png',  lives:3, power:'pounce',
               ability:'Pounce: next hop leaps two lanes at once', cd:6},
    OMalley:  {name:"Duke O'Malley", img:'media/cat-omalley.png',  lives:4, power:'ninelives',
               ability:'Nine Lives: starts with 4 lives, +1 life every 30 lanes', cd:0},
    Kableton: {name:'Baron Kableton',img:'media/cat-kableton.png', lives:3, power:'shield',
               ability:'Royal Shield: 4 seconds untouchable, even on water', cd:15}
  };
  const ORDER = ['Tesla','Berlioz','OMalley','Kableton'];
  const imgs = {}; ORDER.forEach(k => { const i = new Image(); i.src = CATS[k].img; imgs[k] = i; });
  const W = 480, H = 640, COLS = 9, CW = W/COLS, RH = 53, GOAL = 1000;
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  const cv = $('c-canvas'); cv.width = W*DPR; cv.height = H*DPR;
  const g = cv.getContext('2d'); g.setTransform(DPR,0,0,DPR,0,0);
  let chosen = null, S = null, raf = 0;
  let best = +(localStorage.getItem('crossyBest') || 0);

  // ---------- lanes ----------
  const HAZ = {             // w in cells, speed range
    carriage:{w:2.2, sp:[55,95]}, horse:{w:1.5, sp:[90,140]}, dog:{w:0.8, sp:[130,190]}, guard:{w:0.7, sp:[30,50]}
  };
  function makeLane(row){
    if(row < 3) return {type:'garden', items:[]};
    const diff = Math.min(1, row/150), r = Math.random();
    const type = r < 0.22 ? 'garden' : r < 0.70 ? 'path' : 'pond';
    const dir = Math.random() < 0.5 ? -1 : 1, L = {type, dir, items:[]};
    if(type === 'path'){
      const kinds = ['carriage','horse','dog','guard'].filter(k => k !== 'dog' || row > 8);
      L.kind = kinds[Math.floor(Math.random()*kinds.length)];
      const h = HAZ[L.kind];
      L.speed = (h.sp[0] + Math.random()*(h.sp[1]-h.sp[0])) * (1 + diff*0.8);
      const n = L.kind === 'guard' ? 3 : 1 + Math.floor(Math.random()*(2 + diff*1.5));
      for(let i=0;i<n;i++) L.items.push({x: i*(W+CW*3)/n + Math.random()*30, w: CW*h.w, ph: Math.random()*6});
    } else if(type === 'pond'){
      L.speed = 35 + Math.random()*40 + diff*35;
      L.kind = Math.random() < 0.5 ? 'lily' : 'raft';
      const n = L.kind === 'lily' ? 4 + Math.floor(Math.random()*2) : 2 + Math.floor(Math.random()*2);
      const wcells = L.kind === 'lily' ? 1 : 2 + Math.floor(Math.random()*2);
      for(let i=0;i<n;i++) L.items.push({x: i*(W+CW*2)/n + Math.random()*20, w: CW*wcells, seed: Math.random()});
    } else {
      for(let c=0;c<COLS;c++) if(c !== 4 && Math.random() < 0.13) L.items.push({col:c, kind: Math.random()<0.5 ? 'topiary' : 'roses'});
    }
    return L;
  }
  const lane = row => S.lanes[row] || (S.lanes[row] = makeLane(row));
  const blocked = (row,col) => { const L = lane(row); return L.type === 'garden' && L.items.some(b => b.col === col); };

  // ---------- screens ----------
  function stop(){ if(S) S.running = false; if(raf) cancelAnimationFrame(raf); raf = 0; }
  function show(id){ ['c-select','c-play','c-end'].forEach(k => $(k).classList.toggle('hidden', k !== id)); }
  const startBtn = () => R.querySelector('#c-select button[onclick="crossyStart()"]');
  function renderPicker(){
    const box = $('c-cats'); box.innerHTML = '';
    ORDER.forEach(id => {
      const d = document.createElement('div');
      d.className = 'catpick' + (id === chosen ? ' sel' : '');
      d.onclick = () => { chosen = id; renderPicker(); };
      const im = document.createElement('img'); im.src = CATS[id].img; im.alt = CATS[id].name;
      im.style.cssText = 'height:120px;width:auto;max-width:100%;object-fit:contain;margin:0 auto;';
      const n = document.createElement('div'); n.className = 'n'; n.textContent = CATS[id].name;
      const a = document.createElement('div'); a.className = 'a'; a.textContent = CATS[id].ability;
      d.append(im, n, a); box.appendChild(d);
    });
    const b = startBtn(); b.disabled = !chosen;
    R.querySelector('#c-select .sub').textContent = chosen ? CATS[chosen].name + ' is ready. Begin the Royal Crossing!' : 'Choose your cat for the Royal Crossing';
  }
  function showCrossy(){
    stop(); _back();
    $('menu').classList.add('hidden'); $('crossy-view').classList.remove('hidden');
    chosen = null; show('c-select'); renderPicker();
  }
  function crossyQuit(){ window.backToMenu(); }

  function crossyStart(){
    if(!chosen) return;
    stop();
    const c = CATS[chosen];
    S = {c, lanes:{}, row:0, col:4, x:4*CW, fromX:4*CW, fromRow:0, hopT:1, lives:c.lives, maxRow:0, cam:0,
         inv:0, flash:0, freeze:0, shield:0, pounce:false, cool:0, running:true, last:performance.now(), t:0};
    for(let r=0;r<20;r++) lane(r);
    show('c-play');
    hud('Run for the water! Dodge the carriages, horses and hounds.');
    if(!(window.Pager && Pager.isPhone())) $('c-play').scrollIntoView({block:'start'});
    raf = requestAnimationFrame(loop);
  }
  function hud(msg){
    $('c-jumps').textContent = S.maxRow;
    $('c-msg').textContent = msg !== undefined ? msg : 'Lives ' + '\u2665'.repeat(Math.max(0,S.lives)) + '  \u00b7  Best ' + best;
    const b = $('c-power'), c = S.c;
    if(c.power === 'ninelives'){ b.disabled = true; b.textContent = 'Nine Lives (passive)'; }
    else { b.disabled = S.cool > 0; b.textContent = S.cool > 0 ? 'Power ' + Math.ceil(S.cool) + 's'
      : {decree:'Royal Decree', pounce:'Pounce', shield:'Royal Shield'}[c.power]; }
  }
  function crossyPower(){
    if(!S || !S.running || S.cool > 0 || S.c.power === 'ninelives') return;
    const p = S.c.power;
    if(p === 'decree'){ S.freeze = 3; hud('By royal decree, the realm stands still!'); }
    if(p === 'shield'){ S.shield = 4; hud('The Royal Shield glows!'); }
    if(p === 'pounce'){ S.pounce = true; hud('Pounce ready: your next hop leaps two lanes.'); }
    S.cool = S.c.cd; hud($('c-msg').textContent);
  }
  function crossyMove(d){            // -1 left, 0 forward, 1 right, 2 back
    if(!S || !S.running || S.hopT < 1) return;
    let row = S.row, col = Math.round(S.x / CW);
    if(d === 0){ row += (S.pounce ? 2 : 1); }
    else if(d === 2) row = Math.max(0, row-1); else col += d;
    if(col < 0 || col >= COLS || blocked(row,col)) return;
    if(d === 0 && S.pounce) S.pounce = false;
    S.fromX = S.x; S.fromRow = S.row; S.row = row; S.col = col; S.hopT = 0;
    if(row > S.maxRow){
      const before = S.maxRow; S.maxRow = row;
      if(S.c.power === 'ninelives' && Math.floor(row/30) > Math.floor(before/30)){ S.lives++; hud('Nine Lives! A life is restored.'); }
      if(S.maxRow > best){ best = S.maxRow; try{ localStorage.setItem('crossyBest', best); }catch(e){} }
      $('c-jumps').textContent = S.maxRow;
    }
  }
  function hit(why){
    if(S.inv > 0 || S.shield > 0) return;
    S.lives--; S.flash = 1; S.inv = 1.5;
    if(S.lives <= 0) return end(false, why);
    let r = S.row; while(r > 0 && lane(r).type !== 'garden') r--;
    S.row = S.fromRow = r; S.col = 4; S.x = S.fromX = 4*CW; S.hopT = 1;
    hud(why + ' Lives left: ' + S.lives + '.');
  }
  function end(won, why){
    stop(); show('c-end');
    $('c-result').textContent = won ? 'A thousand lanes!' : (why || 'The crossing has claimed you.');
    $('c-summary').textContent = (won ? S.c.name + ' reaches the royal water in triumph. ' : '') + 'Lanes crossed: ' + S.maxRow + '.  Best: ' + best + '.';
  }

  // ---------- loop ----------
  function loop(now){
    if(!S || !S.running) return;
    const dt = Math.min(0.05, (now - S.last)/1000); S.last = now; S.t += dt;
    const frozen = S.freeze > 0, md = frozen ? 0 : dt;
    const top = Math.floor(S.cam/RH) + Math.ceil(H/RH) + 2;
    for(let r = Math.max(0, Math.floor(S.cam/RH)-2); r <= top; r++){
      const L = lane(r); if(L.type === 'garden') continue;
      L.items.forEach(it => {
        it.x += L.dir * L.speed * md;
        if(L.dir > 0 && it.x > W + CW) it.x -= W + CW*2 + it.w;
        if(L.dir < 0 && it.x + it.w < -CW) it.x += W + CW*2 + it.w;
      });
    }
    if(S.hopT < 1){ S.hopT = Math.min(1, S.hopT + dt*7); S.x = S.fromX + (S.col*CW - S.fromX)*S.hopT; }
    const L = lane(S.row), cx = S.x + CW/2;
    if(S.hopT >= 1 && L.type === 'pond'){
      const pad = L.items.find(it => cx > it.x + 2 && cx < it.x + it.w - 2);
      if(!pad && S.shield <= 0) hit('Splash! Into the royal pond.');
      else if(pad){
        S.x += L.dir * L.speed * md; S.fromX = S.x; S.col = Math.round(S.x/CW);
        if(S.x < -CW/2 || S.x > W - CW/2) hit('Swept off by the current.');
      }
    }
    if(S.shield > 0 && (S.x < 0 || S.x > W-CW)){ S.x = Math.max(0, Math.min(W-CW, S.x)); S.fromX = S.x; }
    if(L.type === 'path' && L.items.some(it => cx + CW*0.3 > it.x && cx - CW*0.3 < it.x + it.w))
      hit({carriage:'Run down by a royal carriage!', horse:'Trampled by a galloping horse!', dog:'Caught by the palace corgis!', guard:'Arrested by the royal guard!'}[L.kind]);
    if(!S.running) return;
    if(S.maxRow >= GOAL) return end(true);
    const prevCool = Math.ceil(S.cool);
    S.inv = Math.max(0,S.inv-dt); S.flash = Math.max(0,S.flash-dt*2);
    S.freeze = Math.max(0,S.freeze-dt); S.shield = Math.max(0,S.shield-dt); S.cool = Math.max(0,S.cool-dt);
    if(Math.ceil(S.cool) !== prevCool) hud(S.cool === 0 ? undefined : $('c-msg').textContent);
    const target = Math.max(0, (S.row - 3)*RH); S.cam += (target - S.cam)*Math.min(1, dt*6);
    draw();
    raf = requestAnimationFrame(loop);
  }

  // ---------- drawing ----------
  const yOf = row => H - (row+1)*RH + S.cam;
  const GOLD = '#C9A84C';
  function rr(x,y,w,h,r){ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); }
  function crown(x,y,s,col){ g.fillStyle = col || GOLD; g.beginPath(); g.moveTo(x-s,y); g.lineTo(x-s,y-s*0.8); g.lineTo(x-s*0.5,y-s*0.35); g.lineTo(x,y-s); g.lineTo(x+s*0.5,y-s*0.35); g.lineTo(x+s,y-s*0.8); g.lineTo(x+s,y); g.closePath(); g.fill(); }
  function drawCarriage(it,y,dir){
    const x = it.x, w = it.w;
    g.fillStyle = '#5a0f1c'; rr(x+4, y+8, w-8, 26, 6); g.fill();
    g.strokeStyle = GOLD; g.lineWidth = 2; rr(x+4, y+8, w-8, 26, 6); g.stroke();
    g.fillStyle = 'rgba(255,230,160,.35)'; g.fillRect(x+w/2-12, y+13, 24, 12);
    crown(x+w/2, y+8, 7);
    g.fillStyle = '#111'; [x+14, x+w-14].forEach(wx => { g.beginPath(); g.arc(wx, y+RH-12, 8, 0, Math.PI*2); g.fill(); g.strokeStyle = GOLD; g.stroke(); });
    // little horse in front
    const hx = dir > 0 ? x + w - 2 : x + 2;
    g.fillStyle = '#e8e2d6'; g.beginPath(); g.ellipse(hx + dir*6, y+26, 8, 5, 0, 0, Math.PI*2); g.fill();
  }
  function drawHorse(it,y,dir){
    const cx = it.x + it.w/2, by = y + RH/2 + 2, leg = Math.sin(S.t*14 + it.ph)*4;
    g.fillStyle = '#6b3e1f'; g.beginPath(); g.ellipse(cx, by-4, it.w*0.36, 10, 0, 0, Math.PI*2); g.fill();
    g.save(); g.translate(cx + dir*it.w*0.32, by-12); g.rotate(-dir*0.6); g.fillRect(-4,-14,9,18); g.restore();
    g.beginPath(); g.ellipse(cx + dir*it.w*0.42, by-24, 8, 5, 0, 0, Math.PI*2); g.fill();
    g.strokeStyle = '#3a200e'; g.lineWidth = 3;
    [[-14,leg],[-8,-leg],[8,leg],[14,-leg]].forEach(([dx,l]) => { g.beginPath(); g.moveTo(cx+dx, by+4); g.lineTo(cx+dx+l, by+16); g.stroke(); });
    g.fillStyle = '#4a2c6a'; g.fillRect(cx-9, by-14, 18, 6); g.fillStyle = GOLD; g.fillRect(cx-9, by-9, 18, 2);
  }
  function drawDog(it,y,dir){       // corgi
    const cx = it.x + it.w/2, by = y + RH/2 + 6, b = Math.abs(Math.sin(S.t*18 + it.ph))*3;
    g.fillStyle = '#d98b3a'; g.beginPath(); g.ellipse(cx, by-b, 15, 8, 0, 0, Math.PI*2); g.fill();
    g.fillStyle = '#fff'; g.beginPath(); g.ellipse(cx, by+3-b, 10, 4, 0, 0, Math.PI*2); g.fill();
    g.fillStyle = '#d98b3a'; g.beginPath(); g.arc(cx + dir*14, by-8-b, 7, 0, Math.PI*2); g.fill();
    g.beginPath(); g.moveTo(cx+dir*10, by-12-b); g.lineTo(cx+dir*12, by-21-b); g.lineTo(cx+dir*15, by-13-b); g.fill();
    g.beginPath(); g.moveTo(cx+dir*15, by-12-b); g.lineTo(cx+dir*19, by-20-b); g.lineTo(cx+dir*20, by-10-b); g.fill();
    g.fillStyle = GOLD; g.fillRect(cx+dir*9-3, by-5-b, 6, 3);
  }
  function drawGuard(it,y){
    const cx = it.x + it.w/2, by = y + 6, s = Math.sin(S.t*6 + it.ph)*2;
    g.fillStyle = '#111'; rr(cx-7, by, 14, 16, 6); g.fill();               // bearskin
    g.fillStyle = '#f0c9a0'; g.fillRect(cx-5, by+15, 10, 6);
    g.fillStyle = '#B3123A'; g.fillRect(cx-8, by+21, 16, 14);
    g.fillStyle = GOLD; g.fillRect(cx-1, by+21, 2, 14);
    g.fillStyle = '#0d0d2a'; g.fillRect(cx-7, by+35, 6, 9+s); g.fillRect(cx+1, by+35, 6, 9-s);
  }
  function drawLily(it,y){
    const cx = it.x + it.w/2, cy = y + RH/2;
    g.fillStyle = '#2f8a3a'; g.beginPath(); g.arc(cx, cy, CW*0.44, 0.35, Math.PI*2 - 0.1); g.lineTo(cx,cy); g.fill();
    g.strokeStyle = '#1e5e27'; g.lineWidth = 2; g.stroke();
    const pink = ['#f3a6c0','#ffffff','#ffd166'][Math.floor(it.seed*3)];
    for(let k=0;k<6;k++){ g.fillStyle = pink; g.beginPath(); g.ellipse(cx + Math.cos(k)*6, cy-4 + Math.sin(k)*6, 6, 3, k, 0, Math.PI*2); g.fill(); }
    g.fillStyle = '#ffd700'; g.beginPath(); g.arc(cx, cy-4, 3, 0, Math.PI*2); g.fill();
  }
  function drawRaft(it,y){
    g.fillStyle = '#2f6b2f'; rr(it.x+3, y+9, it.w-6, RH-18, 14); g.fill();
    g.strokeStyle = GOLD; g.lineWidth = 1.5; g.stroke();
    const cols = ['#B3123A','#f3a6c0','#ffd166','#ffffff','#9b59b6'];
    for(let fx = it.x + 12, k = 0; fx < it.x + it.w - 8; fx += 16, k++){
      g.fillStyle = cols[(k + Math.floor(it.seed*5)) % 5];
      for(let p=0;p<5;p++){ g.beginPath(); g.arc(fx + Math.cos(p*1.256)*4, y+RH/2 + Math.sin(p*1.256)*4 + (k%2?-5:5), 3.2, 0, Math.PI*2); g.fill(); }
      g.fillStyle = '#ffd700'; g.beginPath(); g.arc(fx, y+RH/2 + (k%2?-5:5), 2, 0, Math.PI*2); g.fill();
    }
  }
  function draw(){
    g.clearRect(0,0,W,H);
    const r0 = Math.max(0, Math.floor(S.cam/RH) - 1), r1 = r0 + Math.ceil(H/RH) + 2;
    for(let r=r0;r<=r1;r++){
      const L = lane(r), y = yOf(r);
      if(L.type === 'garden'){
        g.fillStyle = r % 2 ? '#1d4a24' : '#21522a'; g.fillRect(0,y,W,RH);
        g.fillStyle = 'rgba(255,255,255,.05)'; for(let c=0;c<COLS;c+=2) g.fillRect(c*CW, y, CW, RH);
        L.items.forEach(b => { const bx = b.col*CW + CW/2, by = y + RH/2;
          if(b.kind === 'topiary'){ g.fillStyle = '#0e3a17'; g.beginPath(); g.arc(bx, by-6, 13, 0, Math.PI*2); g.fill(); g.beginPath(); g.arc(bx, by+9, 9, 0, Math.PI*2); g.fill();
            g.fillStyle = '#7a5a14'; g.fillRect(bx-6, by+14, 12, 8); crown(bx, by-17, 6); }
          else { g.fillStyle = '#0b5a22'; g.beginPath(); g.arc(bx,by,CW*0.38,0,Math.PI*2); g.fill();
            g.fillStyle = '#B3123A'; [[-8,-6],[7,-4],[0,7],[-2,-1]].forEach(([dx,dy]) => { g.beginPath(); g.arc(bx+dx,by+dy,5,0,Math.PI*2); g.fill(); }); } });
      } else if(L.type === 'path'){
        g.fillStyle = '#b9a47a'; g.fillRect(0,y,W,RH);
        g.fillStyle = 'rgba(80,60,30,.18)'; for(let k=0;k<26;k++) g.fillRect((k*53 + r*29) % W, y + (k*17 % RH), 3, 2);
        g.fillStyle = GOLD; g.fillRect(0,y,W,2); g.fillRect(0,y+RH-2,W,2);
        L.items.forEach(it => ({carriage:drawCarriage, horse:drawHorse, dog:drawDog, guard:drawGuard})[L.kind](it, y, L.dir));
      } else {
        g.fillStyle = '#123a5c'; g.fillRect(0,y,W,RH);
        g.fillStyle = 'rgba(255,255,255,.08)'; for(let i=0;i<6;i++) g.fillRect(((i*83 + r*37) + S.t*10*L.dir + W) % W, y+10+(i%3)*12, 22, 2);
        L.items.forEach(it => (L.kind === 'lily' ? drawLily : drawRaft)(it, y));
      }
      if(r > 0 && r % 25 === 0){ g.fillStyle = GOLD; g.font = "700 11px 'Title Wave',serif"; g.fillText(String(r), 4, y+13); }
    }
    // cat
    const lift = S.hopT < 1 ? Math.sin(S.hopT*Math.PI)*10 : 0;
    const rowY = S.hopT < 1 ? yOf(S.fromRow) + (yOf(S.row) - yOf(S.fromRow))*S.hopT : yOf(S.row);
    const im = imgs[chosen];
    const ccx = S.x + CW/2, ccy = rowY + RH/2 - lift;
    if(S.shield > 0){ g.strokeStyle = 'rgba(255,215,0,' + (0.5 + 0.4*Math.sin(S.t*10)) + ')'; g.lineWidth = 3; g.beginPath(); g.arc(ccx, ccy, RH*0.55, 0, Math.PI*2); g.stroke();
      g.fillStyle = 'rgba(201,168,76,.15)'; g.fill(); }
    g.save();
    if(S.inv > 0 && Math.floor(performance.now()/90) % 2 === 0) g.globalAlpha = 0.35;
    if(im.complete && im.naturalWidth){ const s = RH*1.05, w = s*im.naturalWidth/im.naturalHeight; g.drawImage(im, ccx - w/2, ccy - s/2 - 4, w, s); }
    g.restore();
    if(S.pounce){ g.fillStyle = '#FFD700'; g.font = "900 12px 'Title Wave',serif"; g.textAlign = 'center'; g.fillText('POUNCE', ccx, rowY - 4 - lift); g.textAlign = 'left'; }
    if(S.freeze > 0){ g.fillStyle = 'rgba(120,170,255,.12)'; g.fillRect(0,0,W,H); g.fillStyle = '#FFD700'; g.font = "900 16px 'Title Wave',serif"; g.textAlign='center'; g.fillText('ROYAL DECREE  ' + S.freeze.toFixed(1), W/2, 26); g.textAlign='left'; }
    if(S.flash > 0){ g.fillStyle = 'rgba(139,0,0,' + (S.flash*0.5) + ')'; g.fillRect(0,0,W,H); }
    g.strokeStyle = GOLD; g.lineWidth = 2; g.strokeRect(1,1,W-2,H-2);
  }

  // ---------- input ----------
  window.addEventListener('keydown', e => {
    if(!S || !S.running) return;
    if(e.code === 'KeyE' || e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyP'){ e.preventDefault(); return crossyPower(); }
    const m = {ArrowUp:0, KeyW:0, Space:0, ArrowLeft:-1, KeyA:-1, ArrowRight:1, KeyD:1, ArrowDown:2, KeyS:2}[e.code];
    if(m === undefined) return; e.preventDefault(); crossyMove(m);
  });
  let t0 = null;
  cv.addEventListener('pointerdown', e => { t0 = {x:e.clientX, y:e.clientY}; });
  cv.addEventListener('pointerup', e => {
    if(!t0) return; const dx = e.clientX - t0.x, dy = e.clientY - t0.y; t0 = null;
    if(Math.max(Math.abs(dx),Math.abs(dy)) < 20) return crossyMove(0);
    if(Math.abs(dx) > Math.abs(dy)) crossyMove(dx > 0 ? 1 : -1); else crossyMove(dy < 0 ? 0 : 2);
  });

  // ---------- wiring ----------
  const _back = window.backToMenu;
  window.backToMenu = function(){ stop(); _back(); };
  const _rv = window.rvStop; window.rvStop = function(){ stop(); if(_rv) _rv(); };
  Object.assign(window, {showCrossy, crossyStart, crossyMove, crossyPower, crossyQuit});
  window._crossyState = () => S;   // test hook
})();
