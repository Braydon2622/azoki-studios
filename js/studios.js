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
      if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; }
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

  /* Email sign-up. On Netlify the form posts to Netlify Forms; anywhere else it only says so. */
  function signup() {
    $$('form[data-netlify]').forEach((f) => {
      f.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = $('.form-msg', f);
        if (local) { msg.textContent = '> preview only: nothing was sent.'; return; }
        if (!/netlify\.app$/.test(location.hostname) && !A.formsOnNetlify) { msg.textContent = '> sign-ups are not switched on yet. nothing was sent.'; return; }
        fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(new FormData(f)).toString() })
          .then((r) => { if (!r.ok) throw 0; msg.textContent = '> got it. you will hear from me when something ships.'; f.reset(); })
          .catch(() => { msg.textContent = '> that did not send. please try again in a bit.'; });
      });
    });
  }

  /* ---------- project page ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function workPage() {
    const root = $('#workRoot'); if (!root) return;
    const id = new URLSearchParams(location.search).get('id');
    const idx = Math.max(0, A.works.findIndex((w) => w.id === id));
    const w = A.works[idx], next = A.works[(idx + 1) % A.works.length];
    document.title = w.title + ' | Azoki Studios';
    document.documentElement.style.setProperty('--accent', w.accent);
    const btn = (c, cls) => {
      if (!c) return '';
      const url = A.links[c.link];
      return '<a class="btn ' + cls + '" data-link="' + c.link + '" data-strict="1" href="' + (url ? esc(url) : '#') + '">' + esc(c.label) + '</a>';
    };
    root.innerHTML =
      '<section class="wk-hero' + (w.pixel ? ' pixel' : '') + '">' +
      (w.embed ? '<iframe src="' + esc(w.embed) + '" title="' + esc(w.title) + ', running live" tabindex="-1" aria-hidden="true"></iframe>'
               : '<img src="' + w.cover + '" alt="' + esc(w.title) + '">') +
      '<div class="wk-head"><p class="piece-no">' + w.no + ' <span>' + esc(w.kind) + '</span></p><h1>' + esc(w.title) + '</h1>' +
      '<p class="piece-tag">' + esc(w.tagline) + '</p>' +
      '<div class="wk-bar"><div><span>Status</span>' + esc(w.status) + ', v' + esc(w.version) + '</div><div><span>Runs on</span>' + esc(w.platform) + '</div><div><span>Price</span>' + esc(w.price) + '</div>' +
      '<div class="push">' + btn(w.cta, 'solid') + btn(w.cta2, 'ghost') + '</div></div></div></section>' +
      '<div class="wk-wrap">' +
      '<section class="wk-lead"><p class="big reveal">' + esc(w.lead) + '</p><div class="stats reveal">' +
      w.stats.map((s) => '<div><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></div>').join('') + '</div></section>' +
      w.groups.map((g) => '<section class="wk-group reveal"><h2>' + esc(g.h) + '</h2><ul class="wk-list">' +
        g.items.map((it) => '<li><div><b>' + esc(it[0]) + '</b><span>' + esc(it[1]) + '</span></div></li>').join('') + '</ul></section>').join('') +
      (w.how ? '<section class="wk-group reveal"><h2>How it is made</h2><p class="wk-how">' + esc(w.how) + '</p></section>' : '') +
      '<section class="wk-group reveal" style="grid-template-columns:1fr"><h2 style="position:static">Stills</h2><div class="wk-gallery">' +
      w.gallery.map((g) => '<button class="shot" data-full="' + g[0] + '"><img src="' + g[0] + '" alt="' + esc(g[1]) + '" loading="lazy"><span><b style="margin:0">' + esc(g[1]) + '</b></span></button>').join('') +
      '</div><div class="wk-notes">' + w.notes.map((n) => '<p>&gt; ' + esc(n) + '</p>').join('') + '</div></section>' +
      '<div style="height:clamp(60px,8vw,120px)"></div></div>' +
      '<a class="wk-next" href="work.html?id=' + next.id + '"><span>Next: ' + next.no + '</span><b>' + esc(next.title) + ' -&gt;</b></a>';
  }

  workPage(); siblings(); dataLinks(); nav(); reveals(); tabs(); dial(); pan(); embeds(); whaleClock(); lightbox(); signup();
})();
