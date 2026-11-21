/* Writes one real page per project (azokistudios.com/winterville/ and so on) plus sitemap.xml.

   Run it after changing js/works.js or work.html:   node tools/build.js

   Why: links pasted into Discord, TikTok, X or iMessage only show a picture and a title if the
   page itself contains them. work.html fills itself in with JavaScript, which those apps never
   run, so each project gets its own small page with the right title, description and picture. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const SITE = 'https://azokistudios.com';

const box = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/works.js'), 'utf8'), box);
const A = box.window.AZOKI;
const tpl = fs.readFileSync(path.join(root, 'work.html'), 'utf8');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clip = (s, n) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[,.;:]$/, '') + '...');

function schema(w, url, img) {
  const o = {
    '@context': 'https://schema.org', '@type': 'SoftwareApplication',
    name: w.title, description: w.lead, url, image: img,
    applicationCategory: /game/i.test(w.kind) ? 'GameApplication' : /tool/i.test(w.kind) ? 'MultimediaApplication' : 'DesktopEnhancementApplication',
    operatingSystem: w.platform, author: { '@type': 'Organization', name: 'Azoki Studios', url: SITE + '/' }
  };
  const m = /^\$(\d+(?:\.\d+)?)$/.exec(w.price);
  if (m) o.offers = { '@type': 'Offer', price: m[1], priceCurrency: 'USD', url: (w.cta && A.links[w.cta.link]) || url };
  else if (/^free/i.test(w.price)) o.offers = { '@type': 'Offer', price: '0', priceCurrency: 'USD' };
  return JSON.stringify(o).replace(/</g, '\\u003c');
}

const urls = [SITE + '/'];
for (const w of A.works) {
  const url = SITE + '/' + w.id + '/', img = SITE + '/assets/share-' + w.id + '.jpg';
  const title = w.title + ' | Azoki Studios', desc = clip(w.tagline + ' ' + w.lead, 200);
  const head =
    '<base href="../">\n' +
    '<title>' + esc(title) + '</title>\n' +
    '<meta name="description" content="' + esc(desc) + '">\n' +
    '<link rel="canonical" href="' + url + '">\n' +
    '<meta property="og:type" content="website">\n' +
    '<meta property="og:site_name" content="Azoki Studios">\n' +
    '<meta property="og:url" content="' + url + '">\n' +
    '<meta property="og:title" content="' + esc(w.title + ': ' + w.tagline) + '">\n' +
    '<meta property="og:description" content="' + esc(clip(w.lead, 200)) + '">\n' +
    '<meta property="og:image" content="' + img + '">\n' +
    '<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n' +
    '<meta name="twitter:card" content="summary_large_image">\n' +
    '<script type="application/ld+json">' + schema(w, url, img) + '</script>';
  /* plain text for anything that reads the page without running the script */
  const body = '<main id="workRoot"><section class="wk-wrap" style="padding:160px var(--pad) 80px"><h1>' + esc(w.title) + '</h1><p>' + esc(w.tagline) + '</p><p>' + esc(w.lead) + '</p></section></main>';
  let html = tpl
    .replace('<html lang="en">', '<html lang="en" data-work="' + w.id + '">')
    .replace(/<title>[\s\S]*?<meta name="description"[^>]*>/, head)
    .replace('<main id="workRoot"></main>', body);
  if (html === tpl || !html.includes(body)) throw new Error('work.html no longer matches what build.js expects');
  html = html.replace('<!doctype html>', '<!doctype html>\n<!-- Made by tools/build.js from work.html and js/works.js. Edit those, then run: node tools/build.js -->');
  fs.mkdirSync(path.join(root, w.id), { recursive: true });
  fs.writeFileSync(path.join(root, w.id, 'index.html'), html);
  urls.push(url);
}

fs.writeFileSync(path.join(root, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => '  <url><loc>' + u + '</loc></url>').join('\n') + '\n</urlset>\n');
console.log('Wrote ' + A.works.length + ' project pages and sitemap.xml');
