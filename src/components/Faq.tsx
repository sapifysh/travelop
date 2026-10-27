import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { BRAND } from '../data/content';

const FAQS = [
  {
    question: 'How do I book?',
    answer:
      'Send your dates and what you would like to see through the Plan Your Trip form or on WhatsApp. We come back with a plan and one fixed price. Nothing is booked, and nothing is owed, until you say yes.',
  },
  {
    question: 'What is included in the price?',
    answer:
      'The price we quote is the price you pay. It covers your private car and driver, boat crossings and entrance fees; on multi-day journeys it also covers your hotel and breakfast. Every journey page lists exactly what is included, and there are no extra cash payments along the way.',
  },
  {
    question: 'Is it private, or do we join a group?',
    answer:
      'Private, always. Your car, your driver, your pace. We do not run shared tours, and you will never be put on a bus with strangers.',
  },
  {
    question: 'Can we change our dates?',
    answer:
      'Yes. You can move your dates free of charge up to 7 days before you arrive. Send us a message and we will shift your booking to the new dates.',
  },
  {
    question: 'Do you pick up from the airport?',
    answer:
      'Yes, from Lombok International Airport (LOP). Pickup is built into every multi-day journey, and you can also book a transfer on its own. We meet you at arrivals and drive you straight to your hotel.',
  },
  {
    question: 'Can I hire a car and driver just for the day?',
    answer:
      'Yes. There are 15 cars to choose from, from a Toyota Agya at $40 a day to a Toyota Alphard at $200, all with a local, English-speaking driver. A day runs up to 10 hours — enough for the south coast beaches, a waterfall, or both.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const whatsappUrl = `https://wa.me/${BRAND.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello ${BRAND.name}! I have a question about a trip to Lombok.`
  )}`;

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative py-20 sm:py-28 bg-[#FAF8F5] text-[#0E171A] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-10 md:gap-14">
          {/* Intro column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#9A7B1E] mb-4">
              Before You Book
            </p>
            <h2 id="faq-title" className="text-4xl sm:text-5xl text-[#123B45] leading-[1.08] mb-5">
              Questions,
              <br />
              answered plainly.
            </h2>
            <p className="text-[15px] leading-[1.65] text-[#0E171A]/75 max-w-[34ch] mb-7">
              The things travellers ask us most, in short. Anything else, ask us directly — a
              person from our Lombok team replies, not a bot.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#123B45] text-[#123B45] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[#123B45] hover:text-[#FAF7F0]"
            >
              Ask on WhatsApp
            </a>
          </motion.div>

          {/* Accordion column */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="border-b border-[#123B45]/15"
          >
            {FAQS.map((item, i) => {
              const open = openIndex === i;
              return (
                <div key={item.question} className="border-t border-[#123B45]/15">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
                  >
                    <h3 className="text-xl sm:text-[22px] text-[#123B45] leading-snug">
                      {item.question}
                    </h3>
                    <span
                      className={`flex-none w-[30px] h-[30px] rounded-full border border-[#9A7B1E] text-[#9A7B1E] flex items-center justify-center transition-transform duration-300 ${
                        open ? 'rotate-45' : ''
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>
                  {open && (
                    <div className="pb-6 pr-10 text-[15px] leading-[1.65] text-[#0E171A]/75">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
