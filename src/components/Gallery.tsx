import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, MapPin, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/content';
import { GalleryItem } from '../types';

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  return (
    <section
      id="gallery"
      className="py-24 sm:py-32 bg-[#FAF7F0] text-[#123B45] border-t border-[#123B45]/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#4F9DA6] block mb-3">
            A Little More Lombok
          </span>
          <h2 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-[#123B45] tracking-tight leading-[1.12]">
            Made for Moments Worth Remembering.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#123B45]/80 font-normal leading-relaxed max-w-xl">
            Unfiltered glimpses of quiet shores, turquoise depths, and golden hour calm across the archipelago.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {GALLERY_ITEMS.map((item, idx) => {
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`group relative overflow-hidden rounded-xl bg-[#123B45]/5 cursor-pointer ${
                  item.span || 'col-span-12 md:col-span-4'
                } min-h-[260px] sm:min-h-[320px]`}
                onClick={() => setSelectedPhoto(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle dark vignette on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Caption & Location on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white flex items-end justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.18em] uppercase font-semibold text-[#F4C95D] block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-lg sm:text-xl text-white">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-white/80 mt-1">
                      <MapPin className="w-3 h-3 text-[#4F9DA6]" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-5xl w-full bg-[#123B45] text-[#FAF7F0] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close Lightbox"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] max-h-[75vh] w-full overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 sm:p-8 bg-[#123B45] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#F4C95D] block mb-1">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="font-bold text-2xl sm:text-3xl text-white">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-sm text-white/70 mt-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#4F9DA6]" />
                    <span>{selectedPhoto.location}</span>
                  </p>
                </div>

                <a
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                    `Hi Kala Lombok, I loved the photo of ${selectedPhoto.title} (${selectedPhoto.location}). Can you incorporate this place into my trip?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FAF7F0] text-[#123B45] hover:bg-white text-xs font-semibold uppercase tracking-[0.16em] px-5 py-3 rounded-full transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E98B72]" />
                  <span>Take Me Here</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
