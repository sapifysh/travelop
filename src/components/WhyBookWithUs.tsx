const PROMISES = [
  {
    title: 'All-in pricing',
    body: 'Hotel, driver, boats and entry fees included. No surprise cash.',
  },
  {
    title: 'English-speaking drivers',
    body: 'Licensed locals who know the back roads and the tides.',
  },
  {
    title: 'Real people on WhatsApp',
    body: 'Our Lombok team replies before and during your trip.',
  },
  {
    title: 'Flexible dates',
    body: 'Move your dates free up to 7 days before you arrive.',
  },
];

export default function WhyBookWithUs() {
  // Track is rendered twice so the loop is seamless.
  const track = [...PROMISES, ...PROMISES];

  return (
    <section
      id="why-book"
      aria-labelledby="why-book-title"
      className="relative py-16 sm:py-24 bg-[#FAF8F5] text-[#0E171A] overflow-hidden"
    >
      {/* Atmospheric glows so the glass has colour to refract */}
      <div className="absolute -left-40 top-1/2 w-[620px] h-[420px] bg-[#3D95A5]/25 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute left-1/2 top-1/3 w-[520px] h-[360px] bg-[#E8CEAA]/40 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -right-32 bottom-0 w-[600px] h-[420px] bg-[#2E7987]/25 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#2E7987] block mb-3">
          Why travelers book with us
        </span>
        <h2
          id="why-book-title"
          className="font-semibold text-3xl sm:text-5xl text-[#0E171A] tracking-tight leading-[1.08]"
        >
          One local team. Every detail handled.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#0E171A]/65 leading-relaxed max-w-2xl">
          We live in Lombok and plan every trip ourselves.
        </p>
      </div>

      {/* Marquee: moves left to right, pauses on hover */}
      <div className="why-marquee relative z-10 mt-10 sm:mt-14">
        <ul className="why-marquee-track">
          {track.map((p, i) => (
            <li
              key={`${p.title}-${i}`}
              aria-hidden={i >= PROMISES.length}
              className="why-card liquid-glass-subtle refraction-highlight rounded-3xl"
            >
              <span className="flex items-center gap-3 text-[13px] font-semibold text-[#2E7987]">
                0{(i % PROMISES.length) + 1}
                <span className="block w-9 h-px bg-[#2E7987]" />
              </span>
              <h3 className="mt-3 text-lg sm:text-[19px] font-semibold text-[#0E171A] tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-[#0E171A]/65 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
