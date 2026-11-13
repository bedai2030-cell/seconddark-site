// Second Dark — embers, stars, scroll reveals
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// stars in the upper sky
const stars = document.querySelector('.stars');
if (stars) {
  const n = 90;
  for (let i = 0; i < n; i++) {
    const s = document.createElement('i');
    const size = Math.random() * 2.2 + 0.6;
    s.style.cssText = `position:absolute;left:${Math.random() * 100}%;top:${Math.random() * 46}%;` +
      `width:${size}px;height:${size}px;border-radius:50%;background:#fff;` +
      `opacity:${Math.random() * 0.7 + 0.15};animation:twinkle ${3 + Math.random() * 5}s ease-in-out ${Math.random() * 6}s infinite;`;
    stars.appendChild(s);
  }
  const st = document.createElement('style');
  st.textContent = '@keyframes twinkle{0%,100%{opacity:.15}50%{opacity:.8}}';
  document.head.appendChild(st);
}

// floating embers
const embers = document.querySelector('.embers');
if (embers && !reduced) {
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:absolute;inset:0;width:100%;height:100%';
  embers.appendChild(cv);
  const ctx = cv.getContext('2d');
  let W, H, ps = [];
  const resize = () => { W = cv.width = cv.offsetWidth * devicePixelRatio; H = cv.height = cv.offsetHeight * devicePixelRatio; };
  resize();
  addEventListener('resize', resize);
  const mk = () => ({
    x: Math.random() * W, y: H + Math.random() * H * 0.3,
    r: (Math.random() * 2.4 + 0.7) * devicePixelRatio,
    s: (Math.random() * 0.5 + 0.25) * devicePixelRatio,
    d: Math.random() * 6.28,
    o: Math.random() * 0.5 + 0.25,
  });
  for (let i = 0; i < 34; i++) { const p = mk(); p.y = Math.random() * H; ps.push(p); }
  (function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const p of ps) {
      p.y -= p.s; p.x += Math.sin(p.d += 0.012) * 0.4 * devicePixelRatio;
      if (p.y < -10) Object.assign(p, mk());
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,${170 + Math.floor(p.o * 60)},90,${p.o})`;
      ctx.arc(p.x, p.y, p.r, 0, 6.28);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  })();
}

// scroll reveals
const io = new IntersectionObserver((es) => {
  for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}, { threshold: 0.12 });
document.querySelectorAll('.rv').forEach((el) => io.observe(el));

// string lights twinkle stagger
document.querySelectorAll('.bulb').forEach((b, i) => { b.style.animationDelay = `${(i % 7) * 0.45}s`; });
