'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TimelineProps {
  translations: any;
  images: any;
}

export default function Timeline({ translations, images }: TimelineProps) {
  const events = translations.timeline.events || [];
  const timelineImages = images?.timeline || [];

  return (
    <section className="py-12 md:py-24 bg-[#FDFBF7] relative overflow-hidden" id="timeline">

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 opacity-[0.05] pointer-events-none">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 opacity-[0.05] pointer-events-none rotate-180">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Heading matching theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-3 sm:gap-5 mb-20"
        >
          <div className="h-px flex-1 max-w-[40px] sm:max-w-[80px]"
            style={{ background: 'linear-gradient(to right, transparent, #D4A857)' }} />
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 opacity-60">
            <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
          </div>
          <h2 className="font-sans text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-text-heading font-semibold text-center whitespace-nowrap">
            {translations.timeline.title}
          </h2>
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 opacity-60"
            style={{ transform: 'scaleX(-1)' }}>
            <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
          </div>
          <div className="h-px flex-1 max-w-[40px] sm:max-w-[80px]"
            style={{ background: 'linear-gradient(to left, transparent, #D4A857)' }} />
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, transparent, #D4A857 15%, #D4A857 85%, transparent)' }} />

          <div className="space-y-24">
            {events.map((event: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-center gap-8 lg:gap-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full hidden md:flex items-center justify-center z-10 bg-[#FDFBF7]">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#E6C98A] to-[#B88A3B] shadow-[0_0_15px_rgba(212,168,87,0.6)] border-2 border-white" />
                </div>

                {/* Content Card with Image */}
                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(212,168,87,0.08)] hover:shadow-[0_15px_40px_rgba(212,168,87,0.15)] border border-[#E6C98A]/30 overflow-hidden group transition-all duration-500 hover:-translate-y-2">

                    {/* Event Image */}
                    {timelineImages[index] && (
                      <div className="relative w-full aspect-[16/10] overflow-hidden">
                        <Image
                          src={timelineImages[index]}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

                        <div className="absolute bottom-6 left-6 right-6 text-white transform transition-transform duration-500 group-hover:translate-y-[-4px]">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-px w-8 bg-[#D4A857]" />
                            <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#FAF0DC] drop-shadow-md">
                              {event.date}
                            </span>
                          </div>
                          <h3 className="text-3xl sm:text-4xl font-serif text-white drop-shadow-lg">{event.title}</h3>
                        </div>
                      </div>
                    )}

                    <div className={`p-8 sm:p-10 relative overflow-hidden`}>
                      {/* Subtle floral watermark inside card */}
                      <div className={`absolute -bottom-10 ${index % 2 === 0 ? '-right-10' : '-left-10'} w-40 h-40 opacity-[0.03] pointer-events-none`}>
                        <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
                      </div>

                      <div className={`relative z-10 flex flex-col ${index % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                        <span className="text-[#B88A3B] text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase block mb-3 md:hidden">
                          {event.date} • {event.time}
                        </span>

                        <div className="hidden md:flex items-center gap-3 mb-4">
                          {index % 2 !== 0 && <div className="w-1.5 h-1.5 rounded-full bg-[#D4A857]" />}
                          <p className="text-sm font-sans tracking-[0.15em] text-[#B88A3B] font-semibold uppercase">
                            {event.time}
                          </p>
                          {index % 2 === 0 && <div className="w-1.5 h-1.5 rounded-full bg-[#D4A857]" />}
                        </div>

                        <p className="text-text-secondary leading-loose text-sm sm:text-base italic max-w-md">
                          "{event.description}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for MD */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
