'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Clock, CalendarDays, Navigation } from 'lucide-react';

interface VenueProps {
  translations: any;
  images: any;
}

export default function Venue({ translations, images }: VenueProps) {
  const venues = translations.venue.locations || [];
  const venueImages = images.venue || [];

  return (
    <section className="py-8 md:py-24 bg-[#FDFBF7] relative overflow-hidden" id="venue">

      {/* Decorative floral watermark */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.05] pointer-events-none">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.05] pointer-events-none rotate-180">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          {/* Section Heading matching BrideGroom theme */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
            <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#D4A857]" />
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 opacity-70">
              <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
            </div>
            <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#D4A857]" />
          </div>

          <h2 className="text-sm sm:text-base tracking-[0.3em] sm:tracking-[0.5em] uppercase text-[#B88A3B] font-semibold mb-4">
            {translations.common?.joinUs || 'Join us for'}
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-primary italic drop-shadow-sm">
            {translations.venue.title}
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {venues.map((venue: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative flex flex-col"
            >
              {/* Outer Gold Frame Effect */}
              <div
                className="absolute inset-0 rounded-[2rem] pointer-events-none"
                style={{
                  padding: '1px',
                  background: 'linear-gradient(145deg, rgba(230,201,138,0.4), rgba(212,168,87,0.1) 40%, rgba(184,138,59,0.1) 70%, rgba(212,168,87,0.4))',
                }}
              >
                <div className="w-full h-full rounded-[2rem] bg-white" />
              </div>

              <div className="relative flex flex-col h-full rounded-[2rem] overflow-hidden bg-[#FDFBF7] shadow-[0_8px_30px_rgba(212,168,87,0.1)] hover:shadow-[0_15px_40px_rgba(212,168,87,0.2)] transition-all duration-500 m-[1px]">

                {/* Image Section */}
                <div className="relative h-40 md:h-64 lg:h-72 w-full shrink-0 overflow-hidden">
                  <Image
                    src={images.venue[index]?.image || (Array.isArray(images.venue) ? images.venue[0]?.image : images.venue.image)}
                    alt={venue.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90" />

                  {/* Title overlay */}
                  <div className="absolute bottom-6 left-8 right-8 flex flex-col items-center text-center">
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/90 font-medium mb-2 drop-shadow-md">
                      {translations.common?.joinUs || 'Join us for'}
                    </p>
                    <h3 className="text-3xl font-serif text-white drop-shadow-lg">{venue.name}</h3>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-5 sm:p-8 lg:p-10">

                  {/* Location & Time — full width, prominent on mobile */}
                  <div className="flex flex-col gap-5 sm:gap-6 mb-6 sm:mb-8">
                    {/* Location */}
                    <div className="flex flex-row items-start text-left gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#FAF0DC] flex items-center justify-center border border-[#E6C98A]/40 shadow-sm shrink-0 mt-0.5">
                        <MapPin className="w-5 h-5 text-[#B88A3B]" />
                      </div>
                      <div>
                        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#B88A3B] font-semibold mb-1.5">{translations.common?.location || 'Location'}</p>
                        <p className="text-text-secondary text-sm sm:text-base leading-relaxed">{venue.address}</p>
                      </div>
                    </div>

                    {/* Time — per-venue label */}
                    <div className="flex flex-row items-start text-left gap-4">
                      <div className="w-11 h-11 rounded-full bg-[#FAF0DC] flex items-center justify-center border border-[#E6C98A]/40 shadow-sm shrink-0 mt-0.5">
                        <Clock className="w-5 h-5 text-[#B88A3B]" />
                      </div>
                      <div>
                        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#B88A3B] font-semibold mb-1.5">
                          {index === 0
                            ? (translations.common?.sumuhurtham || 'Sumuhurtham')
                            : (translations.common?.dinnerReception || 'Dinner & Reception')}
                        </p>
                        <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-medium">{venue.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Gold Divider */}
                  <div className="w-full h-px mb-6 sm:mb-8" style={{ background: 'linear-gradient(to right, transparent, #E6C98A, transparent)' }} />

                  {/* Map Preview — hidden on mobile, visible on md+ */}
                  <div className="hidden md:block aspect-[21/9] w-full rounded-xl overflow-hidden border border-[#E6C98A]/20 shadow-inner mb-8 shrink-0 relative group/map bg-gray-100">
                    <iframe
                      src={images.venue[index]?.mapUrl || (Array.isArray(images.venue) ? images.venue[0]?.mapUrl : images.venue.mapUrl)}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="grayscale opacity-70 group-hover/map:grayscale-0 group-hover/map:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl" />
                  </div>

                  {/* Button */}
                  <div className="mt-auto">
                    <a
                      href={images.venue[index]?.mapLink || (images.venue[index]?.mapUrl || (Array.isArray(images.venue) ? images.venue[0]?.mapUrl : images.venue.mapUrl) || "#").replace('&output=embed', '')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative flex items-center justify-center gap-2 w-full py-4 rounded-xl font-sans text-xs tracking-widest uppercase font-semibold text-white overflow-hidden transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#D4A857] via-[#B88A3B] to-[#D4A857] bg-[length:200%_auto] group-hover/btn:bg-[position:100%_center] transition-all duration-500" />
                      <Navigation className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">{venue.button}</span>
                    </a>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
