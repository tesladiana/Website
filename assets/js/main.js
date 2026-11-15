let currentPage=null;

// ROSE PETALS — half red, quarter white, quarter light pink
const canvas=document.getElementById('petal-canvas');
const ctx=canvas.getContext('2d');
let petals=[],petalRAF=null,petalCallback=null,petalFrame=0;
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
resizeCanvas();window.addEventListener('resize',resizeCanvas);

function drawRosePetal(x,y,w,h,rot,opacity,color){
  ctx.save();
  ctx.globalAlpha=opacity;
  ctx.translate(x,y);
  ctx.rotate(rot);
  ctx.fillStyle=color;
  ctx.beginPath();
  ctx.moveTo(0,-h/2);
  ctx.bezierCurveTo(w*0.6,-h*0.4, w*0.7,h*0.1, 0,h/2);
  ctx.bezierCurveTo(-w*0.7,h*0.1, -w*0.6,-h*0.4, 0,-h/2);
  ctx.fill();
  ctx.globalAlpha=opacity*0.12;
  ctx.fillStyle='#fff';
  ctx.beginPath();
  ctx.ellipse(0,-h*0.1,w*0.25,h*0.28,0,0,Math.PI*2);
  ctx.fill();
  ctx.restore();
}

// Color pools: 50% red, 25% white, 25% light pink
const RED_COLORS  =['#8B0000','#A00000','#C0392B','#7B0000','#B22222','#922B21','#6B0000','#CC3333'];
const WHITE_COLORS=['#ffffff','#f5f5f5','#fffafa','#fce4e4'];
const PINK_COLORS =['#FFB6C1','#FF9EAD','#FFAABB','#F4A0B0','#FFB0C0'];

function petalColor(i,total){
  const r=i/total;
  if(r<0.5) return RED_COLORS[Math.floor(Math.random()*RED_COLORS.length)];
  if(r<0.75) return WHITE_COLORS[Math.floor(Math.random()*WHITE_COLORS.length)];
  return PINK_COLORS[Math.floor(Math.random()*PINK_COLORS.length)];
}

function spawnPetals(){
  petals=[];
  const total=75;
  for(let i=0;i<total;i++){
    petals.push({
      x:Math.random()*canvas.width,
      y:-30-Math.random()*150,
      w:18+Math.random()*16,h:26+Math.random()*20,
      rot:Math.random()*Math.PI*2,rotSpeed:(Math.random()-0.5)*0.09,
      speedY:13+Math.random()*10,speedX:(Math.random()-0.5)*2.5,
      sway:Math.random()*Math.PI*2,swaySpeed:0.04+Math.random()*0.04,
      opacity:0.82+Math.random()*0.18,
      color:petalColor(i,total),delay:i*2
    });
  }
}

function animatePetals(){
  ctx.clearRect(0,0,canvas.width,canvas.height);petalFrame++;
  let allGone=true;
  for(let p of petals){
    if(petalFrame<p.delay/16){allGone=false;continue;}
    p.y+=p.speedY;p.x+=p.speedX+Math.sin(p.sway)*1.2;p.sway+=p.swaySpeed;p.rot+=p.rotSpeed;
    if(p.y<canvas.height+80){allGone=false;drawRosePetal(p.x,p.y,p.w,p.h,p.rot,p.opacity,p.color);}
  }
  if(!allGone){petalRAF=requestAnimationFrame(animatePetals);}
  else{ctx.clearRect(0,0,canvas.width,canvas.height);canvas.style.display='none';if(petalCallback)petalCallback();}
}

function runPetals(cb){
  if(petalRAF)cancelAnimationFrame(petalRAF);
  petalCallback=cb;petalFrame=0;canvas.style.display='block';spawnPetals();animatePetals();
}

// LIGHTBOX
function openLightbox(card){
  document.getElementById('lightbox-img').src=card.querySelector('img').src;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox(){document.getElementById('lightbox').classList.remove('open');}
document.getElementById('lightbox').addEventListener('click',function(e){if(e.target===this)closeLightbox();});

// NAV
function enterSite(){
  try { playEntrance(); } catch (e) { console.warn(e); }
  const hero=document.getElementById('hero');
  if(hero){ hero.style.opacity='0'; setTimeout(()=>{hero.style.display='none';},250); }
  function showMenu(){ const menu=document.getElementById('menu'); if(menu) menu.classList.add('visible'); }
  try { runPetals(showMenu); setTimeout(showMenu, 1200); } // safety: open the menu even if the petals never finish
  catch (e) { console.warn(e); showMenu(); }
}
function showPage(id){ if(window.rvStop) window.rvStop(); if(window.petalStop) window.petalStop(); if(window.RC_stop) window.RC_stop();
  document.getElementById('menu').classList.remove('visible');
  runPetals(()=>{
    document.getElementById(id).classList.add('visible');
    currentPage=id;
    document.getElementById('backBtn').classList.add('show');
    if(id==='story')document.getElementById('story-back-btn').classList.add('show');
  });
}
function goBack(){
  const backBtn=document.getElementById('backBtn'),menu=document.getElementById('menu');
  document.getElementById('story-back-btn').classList.remove('show');
  if(currentPage){
    document.getElementById(currentPage).classList.remove('visible');
    currentPage=null;backBtn.classList.remove('show');
    runPetals(()=>{menu.classList.add('visible');});
  } else {
    menu.classList.remove('visible');
    runPetals(()=>{
      const hero=document.getElementById('hero');
      hero.style.display='block';hero.style.opacity='0';hero.scrollTop=0;
      setTimeout(()=>{hero.style.opacity='1';},30);
      backBtn.classList.remove('show');
    });
  }
}
function showPart(n){
  document.querySelectorAll('.story-part').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.story-nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('part'+n).classList.add('active');
  document.querySelectorAll('.story-nav-btn')[n-1].classList.add('active');
  document.getElementById('story').scrollTop=0;
  document.getElementById('story-back-btn').classList.add('show');
  if(window.Pager) Pager.goToEl(document.getElementById('part'+n));
}
function showStoryList(){document.getElementById('story').scrollTop=0;if(window.Pager) Pager.go(document.getElementById('story'),0);}

// MUSIC PLAYER
const tracks = {
  baby:   { el: null, name: 'Baby Mine',           bar: 'bar-baby',   btn: 'btn-baby',   icon: 'icon-baby' },
  royal1: { el: null, name: 'Royal Proclamation',                bar: 'bar-royal1', btn: 'btn-royal1', icon: 'icon-royal1' },
  royal2: { el: null, name: 'Royal Woodwinds',              bar: 'bar-royal2', btn: 'btn-royal2', icon: 'icon-royal2' },
  royal3: { el: null, name: 'Dance of the Sugar Plum Fairy',                   bar: 'bar-royal3', btn: 'btn-royal3', icon: 'icon-royal3' },
  royal4: { el: null, name: 'Inspirational Symphony',        bar: 'bar-royal4', btn: 'btn-royal4', icon: 'icon-royal4' },
  royal5: { el: null, name: 'Everybody Wants to Be a Cat',                  bar: 'bar-royal5', btn: 'btn-royal5', icon: 'icon-royal5' },
  royal6: { el: null, name: 'I Can\'t Wait to Be King',            bar: 'bar-royal6', btn: 'btn-royal6', icon: 'icon-royal6' },
  royal7: { el: null, name: 'Friend Like Me', bar: 'bar-royal7', btn: 'btn-royal7', icon: 'icon-royal7' }
};
let currentTrack = null;

function initAudio() {
  tracks.baby.el   = document.getElementById('audio-baby');
  tracks.royal1.el = document.getElementById('audio-royal1');
  tracks.royal2.el = document.getElementById('audio-royal2');
  tracks.royal3.el = document.getElementById('audio-royal3');
  tracks.royal4.el = document.getElementById('audio-royal4');
  tracks.royal5.el = document.getElementById('audio-royal5');
  tracks.royal6.el = document.getElementById('audio-royal6');
  tracks.royal7.el = document.getElementById('audio-royal7');
  Object.values(tracks).forEach(t => {
    if(t.el) {
      t.el.addEventListener('timeupdate', () => {
        if(t.el.duration) {
          document.getElementById(t.bar).style.width = (t.el.currentTime / t.el.duration * 100) + '%';
        }
      });
    }
  });
}

function toggleTrack(id) { pauseEntrance();
  if(!tracks.baby.el) initAudio();
  const t = tracks[id];
  if(currentTrack && currentTrack !== id) stopAll();
  if(t.el.paused) {
    t.el.play();
    currentTrack = id;
    document.getElementById(t.btn).classList.add('playing');
    document.getElementById(t.icon).innerHTML = '&#9646;&#9646;';
    const np = document.getElementById('now-playing');
    document.getElementById('now-playing-title').textContent = t.name;
    np.style.display = 'block';
  } else {
    t.el.pause();
    currentTrack = null;
    document.getElementById(t.btn).classList.remove('playing');
    document.getElementById(t.icon).innerHTML = '&#9654;';
    document.getElementById('now-playing').style.display = 'none';
  }
}

function stopAll() {
  if(!tracks.baby.el) return;
  Object.keys(tracks).forEach(id => {
    const t = tracks[id];
    if(t.el && !t.el.paused) {
      t.el.pause();
      document.getElementById(t.btn).classList.remove('playing');
      document.getElementById(t.icon).innerHTML = '&#9654;';
    }
  });
  currentTrack = null;
  document.getElementById('now-playing').style.display = 'none';
}


// NARRATION
function toggleNarr(n){ pauseEntrance();
  const el=document.getElementById('narr-'+n);
  const coin=document.getElementById('coin-'+n);
  if(!el.paused){ el.pause(); coin.classList.remove('playing'); return; }
  for(let i=1;i<=5;i++){
    const o=document.getElementById('narr-'+i);
    if(i!==n && !o.paused){ o.pause(); document.getElementById('coin-'+i).classList.remove('playing'); }
  }
  if(typeof stopAll==='function') stopAll();
  el.onended=function(){ coin.classList.remove('playing'); };
  el.play();
  coin.classList.add('playing');
}
// ===== REVELS =====
function playEntrance(){ const en = document.getElementById('audio-royal2'); if(!en) return; en.volume = 0.02; en.play().catch(() => {}); }
function pauseEntrance(){ const en = document.getElementById('audio-royal2'); if(en && en.volume < 1){ en.pause(); en.volume = 1; } }

// ===== PHONE PAGER =====
// On phones (<=700px wide) nothing scrolls: each section is cut into screen-sized pages
// (CSS columns) that you move through with the arrows, a swipe, or the dots.
(function(){
  const mq = window.matchMedia('(max-width:700px)');
  const phone = () => mq.matches;
  const items = [];   // {box, flow, nav, page, pages, mode}

  function makeNav(box, it){
    const nav = document.createElement('div'); nav.className = 'pg-nav';
    nav.innerHTML = '<button type="button" class="pg-prev" aria-label="Previous page">&#8249;</button><div class="pg-dots"></div><span class="pg-count"></span><button type="button" class="pg-next" aria-label="Next page">&#8250;</button>';
    nav.querySelector('.pg-prev').onclick = e => { e.stopPropagation(); go(box, it.page-1); };
    nav.querySelector('.pg-next').onclick = e => { e.stopPropagation(); go(box, it.page+1); };
    box.appendChild(nav); return nav;
  }
  function wrap(box, mode){
    const flow = document.createElement('div'); flow.className = mode === 'screens' ? 'pg-track' : 'pg-flow';
    while(box.firstChild) flow.appendChild(box.firstChild);
    box.appendChild(flow);
    const it = {box, flow, page:0, pages:1, mode};
    it.nav = makeNav(box, it);
    box._pg = it; items.push(it);
    // swipe left / right (ignored on game boards, which use their own swipes)
    let t0 = null;
    box.addEventListener('touchstart', e => {
      if(!phone() || e.touches.length !== 1) { t0 = null; return; }
      const path = e.composedPath ? e.composedPath() : [];
      if(path.some(n => n.tagName === 'CANVAS')) { t0 = null; return; }
      t0 = {x:e.touches[0].clientX, y:e.touches[0].clientY};
    }, {passive:true});
    box.addEventListener('touchend', e => {
      if(!t0) return; const t = e.changedTouches[0];
      const dx = t.clientX - t0.x, dy = t.clientY - t0.y; t0 = null;
      if(Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)*1.3) go(box, it.page + (dx < 0 ? 1 : -1));
    }, {passive:true});
    if(window.ResizeObserver){
      const ro = new ResizeObserver(() => measure(it));
      Array.from(flow.children).forEach(c => ro.observe(c));
    }
    flow.querySelectorAll('img').forEach(im => { if(!im.complete) im.addEventListener('load', () => measure(it)); });
    return it;
  }
  function stepOf(it){ return it.box.clientWidth; }
  function measure(it){
    if(!phone()){ it.flow.style.transform = ''; it.pages = 1; it.page = 0; it.nav.classList.remove('on'); return; }
    if(it.mode === 'screens') it.pages = it.flow.children.length;
    else {
      const gap = parseFloat(getComputedStyle(it.flow).columnGap) || 0, w = it.flow.clientWidth;
      it.pages = Math.max(1, Math.round((it.flow.scrollWidth + gap) / (w + gap)));
    }
    if(it.page > it.pages - 1) it.page = it.pages - 1;
    render(it);
  }
  function render(it){
    if(!phone()) return;
    const x = it.page * (it.mode === 'screens' ? stepOf(it) : (it.flow.clientWidth + (parseFloat(getComputedStyle(it.flow).columnGap) || 0)));
    it.flow.style.transform = 'translateX(' + (-x) + 'px)';
    it.nav.classList.toggle('on', it.pages > 1);
    const dots = it.nav.querySelector('.pg-dots');
    if(it.pages <= 12){ dots.innerHTML = '<i></i>'.repeat(it.pages); dots.children[it.page] && dots.children[it.page].classList.add('on'); }
    else dots.innerHTML = '';
    it.nav.querySelector('.pg-count').textContent = (it.page+1) + ' / ' + it.pages;
    it.nav.querySelector('.pg-prev').disabled = it.page === 0;
    it.nav.querySelector('.pg-next').disabled = it.page >= it.pages - 1;
  }
  function go(box, n){
    const it = box && box._pg; if(!it) return;
    measure(it);
    it.page = Math.max(0, Math.min(it.pages - 1, n)); render(it);
  }
  function goToEl(el){
    const box = el && el.closest('.inner-page'); const it = box && box._pg; if(!it || !phone()) return;
    measure(it);
    const fr = it.flow.getBoundingClientRect(), r = el.getBoundingClientRect();
    const step = it.flow.clientWidth + (parseFloat(getComputedStyle(it.flow).columnGap) || 0);
    go(box, it.page + Math.floor((r.left - fr.left + 2) / step));
  }
  function refresh(){ items.forEach(measure); }

  document.querySelectorAll('.inner-page').forEach(p => wrap(p, 'flow'));
  const hero = document.getElementById('hero');
  if(hero){
    const it = wrap(hero, 'screens');
    const hint = hero.querySelector('.scroll-down-hint');
    const setHint = () => { if(!hint) return; const sp = hint.querySelector('span'), svg = hint.querySelector('svg');
      if(sp) sp.textContent = phone() ? 'swipe' : 'scroll'; if(svg) svg.style.transform = phone() ? 'rotate(-90deg)' : ''; };
    setHint(); mq.addEventListener && mq.addEventListener('change', setHint);
  }
  // re-measure whenever a section is opened, the screen turns, or fonts finish loading
  const mo = new MutationObserver(muts => muts.forEach(m => { const it = m.target._pg; if(it && m.target.classList.contains('visible')) { it.page = 0; measure(it); } }));
  items.forEach(it => mo.observe(it.box, {attributes:true, attributeFilter:['class']}));
  window.addEventListener('resize', refresh);
  mq.addEventListener && mq.addEventListener('change', refresh);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  window.addEventListener('load', refresh);
  setTimeout(refresh, 0);
  window.Pager = {go, goToEl, refresh, isPhone: phone};
})();
