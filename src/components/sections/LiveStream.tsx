'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface LiveStreamProps {
  translations: any;
  images: any;
}

export default function LiveStream({ translations, images }: LiveStreamProps) {
  return (
    <section className="py-12 md:py-24 bg-[#FDFBF7] relative overflow-hidden" id="livestream">

      {/* Corner flower decorations */}
      <div className="absolute -top-6 -left-6 w-40 md:w-56 h-40 md:h-56 pointer-events-none opacity-[0.06]">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>
      <div
        className="absolute -bottom-6 -right-6 w-40 md:w-56 h-40 md:h-56 pointer-events-none opacity-[0.06]"
        style={{ transform: 'rotate(180deg)' }}
      >
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute top-1/2 left-0 w-24 md:w-32 h-24 md:h-32 opacity-[0.04] pointer-events-none -translate-y-1/2">
        <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute top-1/2 right-0 w-24 md:w-32 h-24 md:h-32 opacity-[0.04] pointer-events-none -translate-y-1/2 scale-x-[-1]">
        <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >

          {/* ── Section heading separator ── */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
            <div className="h-px w-10 md:w-24 bg-gradient-to-r from-transparent to-[#D4A857]" />
            <div className="relative w-8 h-8 md:w-9 md:h-9 opacity-65 flex-shrink-0">
              <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
            </div>
            <div className="h-px w-10 md:w-24 bg-gradient-to-l from-transparent to-[#D4A857]" />
          </div>

          {/* Badge */}
          <div className="mb-6 px-5 py-1.5 rounded-full flex items-center gap-2.5"
            style={{ border: '1px solid rgba(212,168,87,0.4)', background: 'rgba(212,168,87,0.06)' }}
          >
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#D4A857', boxShadow: '0 0 8px #D4A857' }} />
            <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.2em] text-[#B88A3B] uppercase">
              Live Stream
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#B88A3B] uppercase tracking-[0.15em] mb-3 text-center drop-shadow-sm">
            {translations.livestream.joinButton || 'Join Us Online'}
          </h2>

          {/* Gold divider line */}
          <div
            className="w-24 md:w-32 h-px mb-4"
            style={{ background: 'linear-gradient(to right, transparent, #D4A857 30%, #D4A857 70%, transparent)' }}
          />

          {/* Subtitle */}
          <p className="font-sans text-[#8C6D35] text-base md:text-xl mb-10 text-center font-medium">
            {translations.livestream.message || 'Ceremony at 6:00 PM'}
          </p>

          {/* Video Frame */}
          <div className="relative group w-full max-w-2xl mb-10">
            {/* Outer gold gradient border */}
            <div
              className="absolute -inset-[3px] rounded-[1.6rem] pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, #E6C98A 0%, #D4A857 30%, #B88A3B 60%, #D4A857 80%, #E6C98A 100%)',
                boxShadow: '0 0 0 1px rgba(212,168,87,0.3), 0 8px 30px rgba(180,130,50,0.25)',
              }}
            />
            {/* Ivory inner gap */}
            <div
              className="absolute -inset-[1px] rounded-[1.5rem] pointer-events-none"
              style={{ background: '#FAF0DC' }}
            />
            {/* Video box */}
            <div
              className="relative aspect-video w-full overflow-hidden rounded-[1.4rem]"
              style={{
                background: '#1a1a1a',
                boxShadow: '0 20px 50px rgba(0,0,0,0.18)',
              }}
            >
              <iframe
                src={images.livestreamUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                className="w-full h-full"
                title="Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Bottom flower strip accent */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              <div
                className="h-px w-10 md:w-14"
                style={{ background: 'linear-gradient(to right, transparent, #D4A857)' }}
              />
              <div className="relative w-4 h-4 md:w-5 md:h-5 opacity-70 shrink-0">
                <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
              </div>
              <div
                className="h-px w-10 md:w-14"
                style={{ background: 'linear-gradient(to left, transparent, #D4A857)' }}
              />
            </div>
          </div>

          {/* CTA Button */}
          <a
            href={images.livestreamUrl?.replace('/embed/', '/watch?v=') || '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('pauseBgm'));
              }
            }}
            className="mt-4 px-10 md:px-14 py-3 md:py-4 rounded-full font-sans font-bold text-sm md:text-base uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 inline-block"
            style={{
              background: 'linear-gradient(135deg, #E6C98A 0%, #D4A857 50%, #B88A3B 100%)',
              color: '#5C3D00',
              boxShadow: '0 8px 24px rgba(180,130,50,0.35), 0 2px 6px rgba(180,130,50,0.2)',
            }}
          >
            {translations.livestream.button || 'JOIN LIVE'}
          </a>

        </motion.div>
      </div>
    </section>
  );
}
