// Basic particle background + typing effect + small helpers
(() => {
  // Typing lines
  const lines = [
    "拆机 · 改装 · 编程",
    "喜欢深夜调试与复古硬件",
    "欢迎探索我的项目与笔记"
  ];
  const el = document.getElementById('typewriter');
  let li = 0, ci = 0, direction = 1;
  function tick(){
    const cur = lines[li];
    el.textContent = cur.slice(0, ci);
    ci += direction;
    if(ci > cur.length + 10){ direction = -1; ci = cur.length; setTimeout(tick, 900); return; }
    if(ci === 0){ direction = 1; li = (li + 1) % lines.length; }
    setTimeout(tick, 80 + Math.random()*60);
  }
  tick();

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Email mailto (link is a mailto in HTML). Keep a small feedback on click
  const emailEl = document.getElementById('email-link');
  emailEl.addEventListener('click', () => {
    // no preventDefault so mailto will open. Add a small visual feedback
    emailEl.classList.add('clicked');
    setTimeout(()=> emailEl.classList.remove('clicked'), 1200);
  });

  // Particles canvas
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w=0,h=0, particles=[];
  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function createParticles(n){
    particles = [];
    for(let i=0;i<n;i++){
      particles.push({
        x: Math.random()*w,
        y: Math.random()*h,
        vx: (Math.random()-0.5)*0.3,
        vy: (Math.random()-0.5)*0.3,
        r: 0.6 + Math.random()*1.6,
        hue: Math.random()*360
      });
    }
  }
  createParticles(Math.floor((w*h)/70000)); // density

  function step(){
    ctx.clearRect(0,0,w,h);
    // subtle gradient glow
    const g = ctx.createLinearGradient(0,0,w,h);
    g.addColorStop(0, 'rgba(0,240,255,0.03)');
    g.addColorStop(1, 'rgba(255,45,149,0.03)');
    ctx.fillStyle = g;
    ctx.fillRect(0,0,w,h);

    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.x < -10) p.x = w+10;
      if(p.x > w+10) p.x = -10;
      if(p.y < -10) p.y = h+10;
      if(p.y > h+10) p.y = -10;

      const alpha = 0.6;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${200 + Math.sin(p.x*0.01+p.y*0.01)*40}, 90%, 60%, ${alpha})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();

})();
