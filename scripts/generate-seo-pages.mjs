// Generates one static index.html per SEO landing page from src/data/seo-pages.json,
// plus an updated public/sitemap.xml. Runs automatically before `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = JSON.parse(fs.readFileSync(path.join(root, 'src/data/seo-pages.json'), 'utf8'));
const SITE = 'https://firstlop.site';
const today = new Date().toISOString().slice(0, 10);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

for (const p of pages) {
  const url = `${SITE}/${p.slug}`;
  const others = pages.filter((o) => o.slug !== p.slug);
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        '@id': `${SITE}/#agency`,
        name: 'FIRST-LOP',
        url: `${SITE}/`,
        logo: `${SITE}/first-lop-logo.svg`,
        areaServed: [{ '@type': 'AdministrativeArea', name: 'Lombok, West Nusa Tenggara, Indonesia' }, { '@type': 'Place', name: 'Gili Islands' }],
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: p.h1,
        serviceType: p.keyword,
        description: p.description,
        provider: { '@id': `${SITE}/#agency` },
        areaServed: { '@type': 'Place', name: 'Lombok, Indonesia' },
        offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', lowPrice: String(p.priceLow), highPrice: String(p.priceHigh) },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: p.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: p.navLabel, item: url },
        ],
      },
    ],
  };

  // Static, crawlable copy of the page. React replaces it on load.
  const body = `
      <main>
        <p>${esc(p.eyebrow)}</p>
        <h1>${esc(p.h1)}</h1>
        <p>${esc(p.intro)}</p>
        <p>${esc(p.priceFrom)}</p>
${p.sections.map((s) => `        <h2>${esc(s.h2)}</h2>\n        <p>${esc(s.body)}</p>`).join('\n')}
        <ul>
${p.highlights.map((h) => `          <li>${esc(h)}</li>`).join('\n')}
        </ul>
        <h2>FAQ</h2>
${p.faqs.map((f) => `        <h3>${esc(f.q)}</h3>\n        <p>${esc(f.a)}</p>`).join('\n')}
        <nav>
          <a href="/">FIRST-LOP</a>
          <a href="/lombok-private-tours">Lombok Private Tours</a>
${others.map((o) => `          <a href="/${o.slug}">${esc(o.navLabel)}</a>`).join('\n')}
        </nav>
      </main>`;

  const html = `<!doctype html>
<html lang="${p.lang}" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="google-site-verification" content="tDlYLO48w0lIpSdYIxWDqGL80g3e2ZAwFtXcD80xL4k" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
    <link rel="apple-touch-icon" href="/favicon.svg?v=2" />
    <link rel="canonical" href="${url}" />
    <title>${esc(p.title)}</title>
    <meta name="description" content="${esc(p.description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta property="og:title" content="${esc(p.title)}" />
    <meta property="og:description" content="${esc(p.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="FIRST-LOP" />
    <meta property="og:locale" content="${p.lang === 'id' ? 'id_ID' : 'en_US'}" />
    <meta property="og:image" content="${esc(p.heroImage.replace('w=1600', 'w=1200&h=630'))}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(p.title)}" />
    <meta name="twitter:description" content="${esc(p.description)}" />
    <meta name="twitter:image" content="${esc(p.heroImage.replace('w=1600', 'w=1200&h=630'))}" />
    <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-[#FAF8F5] text-[#0E171A] antialiased selection:bg-[#2E7987]/20 selection:text-[#0E171A]">
    <div id="root">${body}
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
  fs.mkdirSync(path.join(root, p.slug), { recursive: true });
  fs.writeFileSync(path.join(root, p.slug, 'index.html'), html);
}

// Sitemap
const urls = [
  { loc: `${SITE}/`, priority: '1.0' },
  { loc: `${SITE}/lombok-private-tours`, priority: '0.9' },
  ...pages.map((p) => ({ loc: `${SITE}/${p.slug}`, priority: '0.8' })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemap);
console.log(`Generated ${pages.length} SEO pages + sitemap.xml`);
