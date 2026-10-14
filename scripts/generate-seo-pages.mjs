// Generates one static index.html per SEO landing page from src/data/seo-pages.json,
// plus an updated public/sitemap.xml. Runs automatically before `npm run build`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = JSON.parse(fs.readFileSync(path.join(root, 'src/data/seo-pages.json'), 'utf8'));
const posts = JSON.parse(fs.readFileSync(path.join(root, 'src/data/blog-posts.json'), 'utf8'));
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
        <img src="${p.heroImage}" alt="${esc(p.heroAlt || p.keyword)}" />
${p.sections.map((s) => `        <h2>${esc(s.h2)}</h2>\n` + (s.image ? `        <img src="${s.image}" alt="${esc(s.imageAlt || s.h2)}" loading="lazy" />\n` : '') + `        <p>${esc(s.body)}</p>`).join('\n')}
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
<html lang="${p.lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="google-site-verification" content="tDlYLO48w0lIpSdYIxWDqGL80g3e2ZAwFtXcD80xL4k" />
    <link rel="icon" href="/favicon.ico?v=3" sizes="48x48" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
    <link rel="manifest" href="/site.webmanifest?v=3" />
    <meta name="theme-color" content="#3D6074" />
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
    <meta property="og:image" content="${esc(p.heroImage.startsWith('/') ? SITE + p.heroImage : p.heroImage.replace('w=1600', 'w=1200&h=630'))}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(p.title)}" />
    <meta name="twitter:description" content="${esc(p.description)}" />
    <meta name="twitter:image" content="${esc(p.heroImage.startsWith('/') ? SITE + p.heroImage : p.heroImage.replace('w=1600', 'w=1200&h=630'))}" />
    <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Instrument+Serif:ital@0;1&family=Lato:ital,wght@0,300;0,400;0,700;1,400&family=Libre+Caslon+Condensed:wght@400..700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
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

// Blog: /blog index + one static page per post.
const pageLabel = (slug) => (slug === 'lombok-private-tours' ? 'Lombok Private Tours' : pages.find((p) => p.slug === slug)?.navLabel || slug);
const shell = ({ lang = 'en', url, title, description, image, ogType, ld, body }) => `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="google-site-verification" content="tDlYLO48w0lIpSdYIxWDqGL80g3e2ZAwFtXcD80xL4k" />
    <link rel="icon" href="/favicon.ico?v=3" sizes="48x48" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=3" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=3" />
    <link rel="manifest" href="/site.webmanifest?v=3" />
    <meta name="theme-color" content="#3D6074" />
    <link rel="canonical" href="${url}" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(description)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="FIRST-LOP" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:image" content="${SITE}${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${SITE}${image}" />
    <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Instrument+Serif:ital@0;1&family=Lato:ital,wght@0,300;0,400;0,700;1,400&family=Libre+Caslon+Condensed:wght@400..700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-[#FAF8F5] text-[#0E171A] antialiased selection:bg-[#2E7987]/20 selection:text-[#0E171A]">
    <div id="root">${body}
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

for (const post of posts) {
  const url = `${SITE}/blog/${post.slug}`;
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.h1,
        description: post.description,
        image: [`${SITE}${post.heroImage}`, `${SITE}${post.ogImage}`],
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        inLanguage: 'en',
        mainEntityOfPage: url,
        author: { '@type': 'Organization', name: post.author, url: `${SITE}/` },
        publisher: { '@type': 'Organization', name: 'FIRST-LOP', logo: { '@type': 'ImageObject', url: `${SITE}/icon-512.png` } },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: post.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE}/blog` },
          { '@type': 'ListItem', position: 3, name: post.h1, item: url },
        ],
      },
    ],
  };
  const body = `
      <main>
        <article>
          <p>${esc(post.eyebrow)}</p>
          <h1>${esc(post.h1)}</h1>
          <p><time datetime="${post.datePublished}">${post.datePublished}</time> · ${post.readMinutes} min read · ${esc(post.author)}</p>
          <img src="${post.heroImage}" alt="${esc(post.heroAlt)}" width="1600" />
          <p>${esc(post.intro)}</p>
${post.sections
  .map(
    (s) =>
      `          <h2>${esc(s.h2)}</h2>\n` +
      (s.image ? `          <img src="${s.image}" alt="${esc(s.imageAlt)}" loading="lazy" />\n` : '') +
      s.paragraphs.map((t) => `          <p>${esc(t)}</p>`).join('\n') +
      (s.link ? `\n          <p><a href="${s.link.href}">${esc(s.link.label)}</a></p>` : ''),
  )
  .join('\n')}
          <h2>Frequently asked questions</h2>
${post.faqs.map((f) => `          <h3>${esc(f.q)}</h3>\n          <p>${esc(f.a)}</p>`).join('\n')}
        </article>
        <nav>
          <a href="/">FIRST-LOP</a>
          <a href="/blog">Journal</a>
${post.related.map((r) => `          <a href="/${r}">${esc(pageLabel(r))}</a>`).join('\n')}
        </nav>
      </main>`;
  fs.mkdirSync(path.join(root, 'blog', post.slug), { recursive: true });
  fs.writeFileSync(
    path.join(root, 'blog', post.slug, 'index.html'),
    shell({ url, title: post.title, description: post.description, image: post.ogImage, ogType: 'article', ld, body }),
  );
}

{
  const url = `${SITE}/blog`;
  const title = 'Lombok Travel Journal: Itineraries, Guides & Tips | FIRST-LOP';
  const description = 'Practical Lombok and Gili Islands travel guides from the FIRST-LOP team: itineraries, where to stay, getting around and the best time to visit.';
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${url}#blog`,
    name: 'FIRST-LOP Journal',
    url,
    description,
    blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.h1, url: `${SITE}/blog/${p.slug}`, datePublished: p.datePublished })),
  };
  const body = `
      <main>
        <h1>The FIRST-LOP Journal</h1>
        <p>${esc(description)}</p>
${posts.map((p) => `        <article>\n          <h2><a href="/blog/${p.slug}">${esc(p.h1)}</a></h2>\n          <p>${esc(p.description)}</p>\n        </article>`).join('\n')}
        <nav><a href="/">FIRST-LOP</a></nav>
      </main>`;
  fs.mkdirSync(path.join(root, 'blog'), { recursive: true });
  fs.writeFileSync(path.join(root, 'blog', 'index.html'), shell({ url, title, description, image: posts[0].ogImage, ogType: 'website', ld, body }));
}

// Sitemap
const urls = [
  { loc: `${SITE}/`, priority: '1.0' },
  { loc: `${SITE}/lombok-private-tours`, priority: '0.9' },
  ...pages.map((p) => ({ loc: `${SITE}/${p.slug}`, priority: '0.8' })),
  { loc: `${SITE}/blog`, priority: '0.6' },
  ...posts.map((p) => ({ loc: `${SITE}/blog/${p.slug}`, priority: '0.7' })),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(root, 'public/sitemap.xml'), sitemap);
console.log(`Generated ${pages.length} SEO pages, ${posts.length} blog posts + sitemap.xml`);
