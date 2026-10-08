import baleSasakImage from '../assets/images/bale_sasak_traditional_1788475908128.jpg';
import lombokFoodImage from '../assets/images/lombok_traditional_food_1788475923293.jpg';
import sekotongCoastalImage from '../assets/images/sekotong_coastal_lombok_1788475821026.jpg';
import desaSadeVillageImage from '../assets/images/desa_sade_village_weaving_1788475836400.jpg';

export default function About() {
  const principles = [
    {
      number: '01',
      title: 'BOUTIQUE CURATION',
      description:
        'Every stay, experience and route is thoughtfully selected to balance local character, comfort and quality.',
    },
    {
      number: '02',
      title: 'ISLAND FIRST',
      description:
        'We work closely with local communities, guides and hosts so that every journey contributes to the island we call home.',
    },
    {
      number: '03',
      title: 'LOCAL KNOWLEDGE',
      description:
        'We know Lombok beyond the postcard — the quieter beaches, the better roads, the right time to arrive and the places worth staying longer.',
    },
  ];

  return (
    <section
      id="about"
      className="relative bg-[#FAF8F5] text-[#0E171A] pt-16 sm:pt-36 lg:pt-40 pb-20 sm:pb-36 lg:pb-44 overflow-hidden scroll-mt-20 border-t border-[#0E171A]/8"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Intro: Eyebrow + Large Editorial Headline */}
        <div className="max-w-3xl mb-16 sm:mb-20 lg:mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7987]" />
            <p
              id="about-eyebrow"
              className="text-[10.5px] uppercase tracking-[0.24em] font-semibold text-[#2E7987]"
            >
              OUR STORY · ISLAND ROOTS
            </p>
          </div>
          <h2
            id="about-headline"
            className="font-semibold text-3xl sm:text-5xl lg:text-[58px] text-[#0E171A] tracking-[-0.025em] leading-[1.06]"
          >
            Lombok,<br />
            experienced differently.
          </h2>
        </div>

        {/* Editorial Composition: Photography Collage + Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-18 items-start">
          {/* LEFT: Editorial Multi-Image Composition with Liquid Glass frames */}
          <div className="lg:col-span-7 order-1">
            <div className="relative">
              {/* Dominant Hero Landscape Anchor */}
              <div className="w-full lg:w-[92%] relative z-10">
                <div className="aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/70 liquid-glass-standard p-1.5 shadow-[0_20px_50px_rgba(14,23,26,0.06)] group">
                  <img
                    src={sekotongCoastalImage}
                    alt="Pristine white sandbar and crystal turquoise waters of Sekotong islands in West Lombok"
                    className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#0E171A]/60 mt-3 pl-2">
                  Sekotong Archipelago · West Lombok
                </p>
              </div>

              {/* SECONDARY TIERS */}
              <div className="grid grid-cols-12 gap-4 sm:gap-6 mt-6 sm:mt-8 lg:mt-6 items-start">
                {/* DESA SADE — TRADITIONAL SASAK VILLAGE */}
                <div className="col-span-5 sm:col-span-5 lg:col-span-5 pt-1 sm:pt-2">
                  <div className="aspect-[3/4] w-full overflow-hidden rounded-3xl border border-white/70 liquid-glass-standard p-1.5 shadow-[0_12px_36px_rgba(14,23,26,0.05)] group">
                    <img
                      src={desaSadeVillageImage}
                      alt="Sasak artisan woman weaving traditional songket textile outside a Bale Sasak house in Desa Sade village, Central Lombok"
                      className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#0E171A]/60 mt-2.5 pl-1">
                    Desa Sade · Central Lombok
                  </p>
                </div>

                {/* RIGHT COLUMN CLUSTER: BALE SASAK & CUISINE */}
                <div className="col-span-7 sm:col-span-7 lg:col-span-7 space-y-4 sm:space-y-6">
                  {/* BALE SASAK ARCHITECTURE */}
                  <div className="lg:-mt-16 relative z-20">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/70 liquid-glass-standard p-1.5 shadow-[0_16px_45px_rgba(14,23,26,0.08)] group">
                      <img
                        src={baleSasakImage}
                        alt="Authentic Bale Sasak traditional house with thatched alang-alang roof and woven bamboo walls in a Sasak village"
                        className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#0E171A]/60 mt-2 pl-2">
                      Bale Sasak · Vernacular Architecture
                    </p>
                  </div>

                  {/* TRADITIONAL LOMBOK CUISINE */}
                  <div className="w-[88%] sm:w-[82%] ml-auto relative z-20">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/70 liquid-glass-standard p-1.5 shadow-[0_10px_30px_rgba(14,23,26,0.05)] group">
                      <img
                        src={lombokFoodImage}
                        alt="Traditional Lombok cuisine with Ayam Taliwang, Plecing Kangkung, and fresh sambal on banana leaf platter"
                        className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#0E171A]/60 mt-2 text-right pr-2">
                      Ayam Taliwang & Plecing Kangkung
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Brand Story + Principles + Subtle Base */}
          <div className="lg:col-span-5 order-2 flex flex-col justify-between pt-2 lg:pt-0">
            {/* Introductory Copy */}
            <div className="max-w-[640px] mb-10 sm:mb-12">
              <p className="text-lg sm:text-[19px] lg:text-[20px] text-[#0E171A] font-medium leading-[1.65] mb-4 sm:mb-5">
                FIRST-LOP is a contemporary island travel studio rooted in Lombok.
              </p>
              <p className="text-base sm:text-[17px] text-[#0E171A]/80 font-normal leading-[1.7]">
                We created FIRST-LOP for travelers who want more than a checklist of places to visit. No rushed itineraries. No cookie-cutter tours. Just thoughtfully designed ways to experience the island — from the beaches of Selong Belanak to the quiet shores of Gili Meno.
              </p>
            </div>

            {/* Editorial Numbered Principles */}
            <div className="space-y-6 sm:space-y-8 border-t border-[#0E171A]/10 pt-8 sm:pt-10">
              {principles.map((item) => (
                <div
                  key={item.number}
                  className="grid grid-cols-12 gap-4 items-baseline"
                >
                  <div className="col-span-2">
                    <span className="text-xs sm:text-sm font-semibold text-[#2E7987] tracking-widest">
                      {item.number}
                    </span>
                  </div>
                  <div className="col-span-10">
                    <h3 className="font-semibold text-xs sm:text-sm text-[#0E171A] tracking-[0.16em] uppercase mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-[#0E171A]/75 font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtle Lombok Base Section */}
            <div className="mt-10 sm:mt-12 pt-6 border-t border-[#0E171A]/10">
              <p className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#2E7987] mb-1">
                BASED IN LOMBOK
              </p>
              <p className="text-sm sm:text-[15px] text-[#0E171A]/85 font-medium leading-snug">
                Kuta Lombok<br />
                <span className="text-[#0E171A]/65 font-normal">West Nusa Tenggara, Indonesia</span>
              </p>
            </div>
          </div>
        </div>

        {/* Brand Statement (Centered Emotional Conclusion) */}
        <div className="mt-20 sm:mt-28 lg:mt-32 pt-16 sm:pt-20 border-t border-[#0E171A]/10 text-center max-w-3xl mx-auto flex flex-col items-center">
          <h3 className="font-semibold text-2xl sm:text-4xl lg:text-[44px] text-[#0E171A] tracking-[-0.025em] leading-[1.18] mb-6">
            We believe the best way to discover Lombok<br className="hidden sm:inline" /> is to slow down.
          </h3>

          <div className="space-y-1.5 text-base sm:text-lg text-[#0E171A]/75 font-normal leading-relaxed">
            <p>Take the long way to the beach.</p>
            <p>Stay for one more sunset.</p>
            <p>Let the island set the pace.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
