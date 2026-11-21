/* Azoki Studios: page behaviour shared by index.html and work.html */
(function () {
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const A = window.AZOKI || { links: {}, works: [] };
  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:';

  /* sibling site links: the real domain when live, the folder next door while previewing */
  function siblings() {
    const pages = /^\/azoki-(studios|market)\//.test(location.pathname);   // GitHub Pages sub-folder, until the real domains are connected
    $$('a[data-sibling]').forEach((a) => {
      if (local) a.href = '../' + a.dataset.sibling + '/index.html';
      else if (pages) a.href = '/azoki-' + a.dataset.sibling + '/';
    });
  }

  function toast(msg) {
    const t = $('#toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 3600);
  }

  /* links that come from works.js (store pages and so on) */
  function dataLinks() {
    $$('a[data-link]').forEach((a) => {
      const url = A.links[a.dataset.link];
      if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; if (a.dataset.liveLabel) a.textContent = a.dataset.liveLabel; }
      else if (a.dataset.strict) a.addEventListener('click', (e) => { e.preventDefault(); toast('The store link is not set yet.'); });
    });
  }

  function nav() {
    const n = $('#nav'); if (!n) return;
    const f = () => n.classList.toggle('stuck', scrollY > 30);
    f(); addEventListener('scroll', f, { passive: true });
  }

  function reveals() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach((e) => io.observe(e));
  }

  /* Code Sea scene tabs */
  function tabs() {
    $$('[data-tabs]').forEach((scr) => {
      const imgs = $$('img', scr), btns = $$('.tabs button', scr.parentElement);
      let i = 0, timer = null, hold = false;
      const go = (n) => {
        i = (n + imgs.length) % imgs.length;
        imgs.forEach((im, k) => im.classList.toggle('on', k === i));
        btns.forEach((b, k) => b.setAttribute('aria-selected', k === i ? 'true' : 'false'));
      };
      btns.forEach((b, k) => b.addEventListener('click', () => { hold = true; go(k); }));
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new IntersectionObserver((es) => {
          clearInterval(timer);
          if (es[0].isIntersecting) timer = setInterval(() => { if (!hold) go(i + 1); }, 4200);
        }, { threshold: 0.4 }).observe(scr);
      }
    });
  }

  /* Hearthside time-of-day dial: crossfades noon -> sunset -> night */
  function dial() {
    const d = $('#dial'), scr = $('#daylight'); if (!d || !scr) return;
    const imgs = $$('img', scr), out = $('#dialTime');
    const stops = [12, 18.6, 23];
    const set = () => {
      const h = parseFloat(d.value);
      let a = [1, 0, 0];
      if (h <= stops[0]) a = [1, 0, 0];
      else if (h < stops[1]) { const f = (h - stops[0]) / (stops[1] - stops[0]); const e = f * f * (3 - 2 * f); a = [1, e, 0]; }
      else if (h < stops[2]) { const f = (h - stops[1]) / (stops[2] - stops[1]); const e = f * f * (3 - 2 * f); a = [0, 1, e]; }
      else a = [0, 0, 1];
      imgs.forEach((im, k) => { im.style.transition = 'none'; im.style.opacity = a[k]; });
      const hh = Math.floor(h) % 24, mm = Math.floor((h % 1) * 60);
      out.textContent = String(hh).padStart(2, '0') + ':' + String(mm).padStart(2, '0');
    };
    d.addEventListener('input', set); set();
  }

  /* Desktop Reef: look around the lagoon */
  function pan() {
    const p = $('#reefPan'); if (!p) return;
    const im = $('img', p);
    const move = (x, y) => { im.style.transform = 'translate(' + (-x * 26).toFixed(2) + '%,' + (-y * 26).toFixed(2) + '%)'; };
    move(0.5, 0.5);
    p.addEventListener('pointermove', (e) => { const r = p.getBoundingClientRect(); move((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height); });
    p.addEventListener('pointerleave', () => move(0.5, 0.5));
  }

  /* Live embeds: the real product in a frame. Loaded when scrolled near (or on click, with
     reduced motion), drawn at a fixed desktop size and scaled to fit. It only takes the mouse
     after a click, so scrolling the page never gets trapped inside it. */
  function embeds() {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    $$('.screen.live[data-embed]').forEach((s) => {
      const w = +s.dataset.w || 1180, h = +s.dataset.h || 664, go = $('.live-go', s);
      let fr = null;
      const fit = () => { if (fr) fr.style.transform = 'scale(' + (s.clientWidth / w) + ')'; };
      const load = () => {
        if (fr) return;
        fr = document.createElement('iframe');
        fr.src = s.dataset.embed; fr.title = s.dataset.title || 'Live demo'; fr.loading = 'lazy';
        fr.width = w; fr.height = h; fr.style.width = w + 'px'; fr.style.height = h + 'px';
        fr.setAttribute('allow', 'autoplay'); fr.tabIndex = -1;
        fr.addEventListener('load', () => { const im = $('img', s), pw = $('.live-wait', s); if (im) im.classList.remove('on'); if (pw) pw.remove(); });
        s.appendChild(fr); fit();
      };
      go.addEventListener('click', () => { load(); s.classList.add('on'); fr.tabIndex = 0; fr.focus(); });
      s.addEventListener('pointerleave', () => { s.classList.remove('on'); if (fr) fr.tabIndex = -1; });
      if ('ResizeObserver' in window) new ResizeObserver(fit).observe(s); else addEventListener('resize', fit);
      if (!reduce && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { load(); io.disconnect(); } }, { rootMargin: '200px' });
        io.observe(s);
      }
    });
  }

  /* "the whale comes at the top of every hour" */
  function whaleClock() {
    const el = $('#whaleClock'); if (!el) return;
    const f = () => {
      const n = new Date(), m = 60 - n.getMinutes();
      const hm = String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0');
      el.textContent = '> it is ' + hm + ' where you are. the whale is due in ' + (m === 60 ? 'under a minute' : m + ' min') + '.';
    };
    f(); setInterval(f, 20000);
  }

  function lightbox() {
    const lb = $('#lightbox'); if (!lb || !lb.showModal) return;
    const im = $('img', lb), cap = $('p', lb);
    document.addEventListener('click', (e) => {
      const s = e.target.closest('.shot'); if (!s) return;
      im.src = s.dataset.full; const t = $('img', s); im.alt = t ? t.alt : ''; cap.textContent = im.alt;
      lb.showModal();
    });
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.closest('.lb-close')) lb.close(); });
  }

  /* Email sign-up. Each one is forwarded to AZOKI.signupTo by formsubmit.co. */
  function signup() {
    $$('form.signup').forEach((f) => {
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = $('.form-msg', f), btn = $('button[type=submit]', f);
        if (f.elements._honey.value) return;
        if (local) { msg.textContent = '> preview only: nothing was sent.'; return; }
        if (!A.signupTo) { msg.textContent = '> sign-ups are not switched on yet. nothing was sent.'; return; }
        btn.disabled = true; msg.textContent = '> sending...';
        fetch('https://formsubmit.co/ajax/' + A.signupTo, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email: f.elements.email.value, list: 'Azoki Studios', _subject: 'Azoki Studios sign-up', _template: 'table' }) })
          .then((r) => r.json())
          .then((d) => { if (String(d.success) !== 'true') throw 0; msg.textContent = '> got it. you will hear from me when something ships.'; f.reset(); })
          .catch(() => { msg.textContent = '> that did not send. try again in a bit, or write to ' + A.signupTo + '.'; })
          .finally(() => { btn.disabled = false; });
      });
    });
  }

  /* Winterville's clock tower counts down to Christmas. So does its panel. */
  function xmasClock() {
    const el = $('#xmasClock'); if (!el) return;
    const n = new Date(), x = new Date(n.getFullYear(), 11, 25);
    const days = Math.ceil((x - new Date(n.getFullYear(), n.getMonth(), n.getDate())) / 864e5);
    if (days < 0 || days > 60) return;
    el.textContent = days === 0 ? '> it is christmas day. the square is full.' : '> christmas is in ' + days + (days === 1 ? ' day' : ' days') + '. the clock tower is counting too.';
  }

  /* ---------- project page ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function workPage() {
    const root = $('#workRoot'); if (!root) return;
    /* Each project has its own page (winterville/ and so on), made by tools/build.js.
       work.html?id= is the old address: it only forwards to the new one. */
    const here = document.documentElement.dataset.work;
    if (!here) {
      const q = new URLSearchParams(location.search).get('id');
      location.replace((A.works.some((w) => w.id === q) ? q : A.works[0].id) + '/');
      return;
    }
    const idx = Math.max(0, A.works.findIndex((w) => w.id === here));
    const w = A.works[idx], next = A.works[(idx + 1) % A.works.length];
    document.title = w.title + ' | Azoki Studios';
    document.documentElement.style.setProperty('--accent', w.accent);
    const btn = (c, cls) => {
      if (!c) return '';
      const url = A.links[c.link];
      if (!url && c.soon) return '<a class="btn ' + cls + '" href="index.html#bench">' + esc(c.soon) + '</a>';   /* not out yet: send them to the sign-up */
      return '<a class="btn ' + cls + '" data-link="' + c.link + '" data-strict="1" href="' + (url ? esc(url) : '#') + '">' + esc(c.label) + '</a>';
    };
    root.innerHTML =
      '<section class="wk-hero' + (w.pixel ? ' pixel' : '') + '">' +
      (w.embed ? '<iframe src="' + esc(w.embed) + '" title="' + esc(w.title) + ', running live" tabindex="-1" aria-hidden="true"></iframe>'
               : '<img src="' + w.cover + '" alt="' + esc(w.title) + '">') +
      '<div class="wk-head"><p class="piece-no">' + w.no + ' <span>' + esc(w.kind) + '</span></p><h1>' + esc(w.title) + '</h1>' +
      '<p class="piece-tag">' + esc(w.tagline) + '</p>' +
      '<div class="wk-bar"><div><span>Status</span>' + esc(w.status) + ', ' + (/^\d/.test(w.version) ? 'v' : '') + esc(w.version) + '</div><div><span>Runs on</span>' + esc(w.platform) + '</div><div><span>Price</span>' + esc(w.price) + '</div>' +
      '<div class="push">' + btn(w.cta, 'solid') + btn(w.cta2, 'ghost') + '</div></div></div></section>' +
      '<div class="wk-wrap">' +
      '<section class="wk-lead"><p class="big reveal">' + esc(w.lead) + '</p><div class="stats reveal">' +
      w.stats.map((s) => '<div><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></div>').join('') + '</div></section>' +
      w.groups.map((g) => '<section class="wk-group reveal"><h2>' + esc(g.h) + '</h2><ul class="wk-list">' +
        g.items.map((it) => '<li><div><b>' + esc(it[0]) + '</b><span>' + esc(it[1]) + '</span></div></li>').join('') + '</ul></section>').join('') +
      (w.how ? '<section class="wk-group reveal"><h2>How it is made</h2><p class="wk-how">' + esc(w.how) + '</p></section>' : '') +
      (w.motion ? '<section class="wk-group reveal" style="grid-template-columns:1fr"><h2 style="position:static">In motion</h2><div class="wk-motion">' +
        w.motion.map((m) => '<figure><img src="' + m[0] + '" alt="' + esc(m[1]) + ', moving" loading="lazy" width="' + m[2] + '" height="' + m[3] + '"><figcaption>' + esc(m[1]) + '</figcaption></figure>').join('') + '</div></section>' : '') +
      '<section class="wk-group reveal" style="grid-template-columns:1fr"><h2 style="position:static">' + (w.gallery.length ? 'Stills' : 'Good to know') + '</h2><div class="wk-gallery"' + (w.gallery.length ? '' : ' hidden') + '>' +
      w.gallery.map((g) => '<button class="shot" data-full="' + g[0] + '"><img src="' + g[0] + '" alt="' + esc(g[1]) + '" loading="lazy"><span><b style="margin:0">' + esc(g[1]) + '</b></span></button>').join('') +
      '</div><div class="wk-notes">' + w.notes.map((n) => '<p>&gt; ' + esc(n) + '</p>').join('') + '</div></section>' +
      '<div style="height:clamp(60px,8vw,120px)"></div></div>' +
      '<a class="wk-next" href="' + next.id + '/"><span>Next: ' + next.no + '</span><b>' + esc(next.title) + ' -&gt;</b></a>';
  }

  /* ---------- showpieces ---------- */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Headings arrive as ASCII noise and settle into words, the way Code Sea draws its fish.
     Every letter is pinned to its real width first, so nothing reflows while it settles. */
  function decode() {
    if (reduce || !('IntersectionObserver' in window)) return;
    const G = '<>~/\\|=+*-_:;^';
    const run = (el) => {
      const html = el.innerHTML, label = el.textContent, chars = [];
      const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
      while (tw.nextNode()) nodes.push(tw.currentNode);
      nodes.forEach((n) => {
        const frag = document.createDocumentFragment();
        n.nodeValue.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const w = document.createElement('span'); w.className = 'dc-w';
          for (const c of part) { const s = document.createElement('span'); s.className = 'dc-c'; s.textContent = c; w.appendChild(s); chars.push([s, c]); }
          frag.appendChild(w);
        });
        n.parentNode.replaceChild(frag, n);
      });
      chars.map(([s]) => s.getBoundingClientRect().width).forEach((wd, i) => { chars[i][0].style.width = wd.toFixed(2) + 'px'; });
      el.setAttribute('aria-label', label); el.classList.add('dc-on');
      const t0 = performance.now(), dur = Math.min(1500, 520 + chars.length * 16);
      let last = 0;
      const step = (now) => {
        const p = (now - t0) / dur;
        if (p >= 1) { el.innerHTML = html; el.removeAttribute('aria-label'); el.classList.remove('dc-on'); return; }
        if (now - last > 42) {
          last = now;
          chars.forEach(([s, c], i) => {
            const done = i / chars.length < p * 1.35 - 0.35;
            s.textContent = done ? c : G[(Math.random() * G.length) | 0];
            s.classList.toggle('dc-x', !done);
          });
        }
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); run(e.target); } }), { threshold: 0.3 });
    const go = () => $$('.hero h1, .sec-head h2, .piece h3, .wk-head h1, .tm-copy h2').forEach((h) => io.observe(h));
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(go);
  }

  /* The page is a dive: a gauge in the right margin reads how deep you have scrolled. */
  function depth() {
    if (!$('#sea') || !matchMedia('(min-width: 1200px)').matches) return;
    const g = document.createElement('aside'); g.className = 'depth'; g.setAttribute('aria-hidden', 'true');
    g.innerHTML = '<span class="depth-zone">surface</span><div class="depth-rail"><i>&gt;&lt;&gt;</i></div><span class="depth-read">0000 m</span>';
    document.body.appendChild(g);
    const fish = $('i', g), read = $('.depth-read', g), zone = $('.depth-zone', g);
    const ZONES = [[0, 'surface'], [40, 'sunlit water'], [200, 'twilight'], [1000, 'midnight'], [3000, 'the abyss'], [3780, 'the sea floor']];
    let tick = false;
    const f = () => {
      tick = false;
      const max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
      const m = Math.round(p * 3800);
      fish.style.top = (p * 100).toFixed(2) + '%';
      read.textContent = String(m).padStart(4, '0') + ' m';
      let z = ZONES[0][1]; ZONES.forEach((x) => { if (m >= x[0]) z = x[1]; });
      if (zone.textContent !== z) zone.textContent = z;
      g.classList.toggle('show', scrollY > innerHeight * 0.5);
    };
    addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(f); } }, { passive: true });
    f();
  }

  /* Screens lean toward the cursor and catch a little light. */
  function tilt() {
    if (reduce || !matchMedia('(hover: hover)').matches) return;
    $$('.piece-show .screen:not(.live):not(.pan):not(.strip)').forEach((s) => {
      s.classList.add('tilt');
      s.addEventListener('pointermove', (e) => {
        const r = s.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        s.style.setProperty('--ry', ((x - 0.5) * 7).toFixed(2) + 'deg');
        s.style.setProperty('--rx', ((0.5 - y) * 5).toFixed(2) + 'deg');
        s.style.setProperty('--gx', (x * 100).toFixed(1) + '%'); s.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      });
      s.addEventListener('pointerleave', () => { s.style.setProperty('--ry', '0deg'); s.style.setProperty('--rx', '0deg'); });
    });
  }

  /* Winterville snows on its own panel, and the snow settles on top of the screen
     the way the game piles it on your real windows. */
  function snow() {
    const show = $('#winterville .piece-show'), scr = show && $('.screen', show);
    if (!scr || reduce || !('IntersectionObserver' in window)) return;
    const TOP = 110, cv = document.createElement('canvas'); cv.className = 'snow'; cv.setAttribute('aria-hidden', 'true');
    show.appendChild(cv);
    const cx = cv.getContext('2d'); let W = 0, H = 0, dpr = 1, pile = [], flakes = [], on = false, last = 0;
    const COL = 4, MAXH = 15;
    const size = () => {
      dpr = Math.min(2, devicePixelRatio || 1); W = scr.clientWidth; H = scr.clientHeight + TOP;
      cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
      const n = Math.ceil(W / COL); if (pile.length !== n) pile = Array.from({ length: n }, (_, i) => 2.5 + 1.5 * Math.sin(i * 0.21) + Math.random());
    };
    const flake = (y) => ({ x: Math.random() * W, y: y, r: 0.8 + Math.random() * 1.9, v: 22 + Math.random() * 38, s: Math.random() * 6.28, lands: Math.random() < 0.55 });
    const frame = (now) => {
      if (!on) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (flakes.length < Math.min(150, W / 5)) flakes.push(flake(-6));
      cx.setTransform(dpr, 0, 0, dpr, 0, 0); cx.clearRect(0, 0, W, H);
      for (let i = flakes.length - 1; i >= 0; i--) {
        const k = flakes[i]; k.y += k.v * dt; k.x += Math.sin(now / 900 + k.s) * 14 * dt;
        const c = Math.max(0, Math.min(pile.length - 1, (k.x / COL) | 0));
        if (k.lands && k.y >= TOP - pile[c] && k.y < TOP + 6) {
          if (pile[c] < MAXH) { pile[c] += 1.5; if (c > 0) pile[c - 1] += 0.7; if (c < pile.length - 1) pile[c + 1] += 0.7; }
          flakes[i] = flake(-6); continue;
        }
        if (k.y > H + 4) { flakes[i] = flake(-6); continue; }
        cx.globalAlpha = k.y > TOP ? 0.55 : 0.9; cx.fillStyle = '#fff';
        cx.beginPath(); cx.arc(k.x, k.y, k.r, 0, 6.2832); cx.fill();
      }
      /* the drift on top of the screen: smooth it a little every frame so it slumps like snow */
      for (let c = 1; c < pile.length - 1; c++) { const d = pile[c] - (pile[c - 1] + pile[c + 1]) / 2; if (d > 1.2) { pile[c] -= d * 0.2; pile[c - 1] += d * 0.1; pile[c + 1] += d * 0.1; } }
      cx.globalAlpha = 1; cx.fillStyle = '#f4f8ff'; cx.beginPath(); cx.moveTo(0, TOP + 1);
      for (let c = 0; c < pile.length; c++) { const e = Math.min(1, Math.min(c, pile.length - 1 - c) / 4); cx.lineTo(c * COL + COL / 2, TOP + 1 - Math.min(MAXH, pile[c]) * e); }
      cx.lineTo(W, TOP + 1); cx.closePath(); cx.fill();
      requestAnimationFrame(frame);
    };
    size();
    if ('ResizeObserver' in window) new ResizeObserver(size).observe(scr);
    new IntersectionObserver((es) => {
      const v = es[0].isIntersecting; if (v && !on) { on = true; last = performance.now(); requestAnimationFrame(frame); } else if (!v) on = false;
    }).observe(show);
  }

  workPage(); siblings(); dataLinks(); nav(); reveals(); tabs(); dial(); pan(); embeds(); whaleClock(); xmasClock(); lightbox(); signup();
  decode(); depth(); tilt(); snow();
})();
