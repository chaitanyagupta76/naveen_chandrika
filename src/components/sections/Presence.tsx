'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PresenceProps {
  translations: any;
  images: any;
}

function ParentCard({
  imageSrc,
  altText,
  heading,
  names,
  delay = 0,
}: {
  imageSrc: string;
  altText: string;
  heading: string;
  names: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, delay }}
      className="flex flex-col items-center relative group"
    >
      {/* ── Outer card shell ── */}
      <div
        className="relative w-full flex flex-col items-center rounded-[2.5rem] p-6 md:p-12 transition-shadow duration-500"
        style={{
          background: 'linear-gradient(160deg, #FFFDF8 0%, #FAF0DC 100%)',
          boxShadow:
            '0 8px 40px rgba(212,168,87,0.12), 0 2px 8px rgba(212,168,87,0.08)',
          border: '1.5px solid rgba(230,201,138,0.45)',
        }}
      >
        {/* ── Outer decorative ring inside card ── */}
        <div
          className="absolute inset-3 rounded-[2rem] pointer-events-none"
          style={{ border: '1px dashed rgba(212,168,87,0.25)' }}
        />

        {/* ── Corner flower accents ── */}
        {[
          'top-3 left-3',
          'top-3 right-3 scale-x-[-1]',
          'bottom-3 left-3 scale-y-[-1]',
          'bottom-3 right-3 scale-x-[-1] scale-y-[-1]',
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-10 h-10 md:w-12 md:h-12 opacity-30 pointer-events-none`}
          >
            <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
          </div>
        ))}

        {/* ── Photo frame ── */}
        <div className="relative mb-6 md:mb-8 w-full max-w-[220px] md:max-w-[260px]">
          {/* Outer gold gradient frame */}
          <div
            className="absolute -inset-1.5 rounded-[1.6rem] pointer-events-none group-hover:scale-[1.02] transition-transform duration-500"
            style={{
              background:
                'linear-gradient(135deg, #E6C98A 0%, #D4A857 30%, #B88A3B 60%, #D4A857 80%, #E6C98A 100%)',
              boxShadow:
                '0 0 0 1px rgba(212,168,87,0.3), 0 6px 24px rgba(180,130,50,0.3)',
            }}
          />

          {/* Ivory gap */}
          <div
            className="absolute -inset-0.5 rounded-[1.5rem] pointer-events-none"
            style={{ background: '#FAF0DC' }}
          />

          {/* Inner thin gold border */}
          <div
            className="absolute inset-1 rounded-[1.25rem] pointer-events-none z-10"
            style={{ border: '1px solid rgba(212,168,87,0.5)' }}
          />

          {/* Photo */}
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[1.25rem]">
            <Image
              src={imageSrc}
              alt={altText}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Bottom flower strip */}
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

        {/* ── Text ── */}
        <h3 className="text-lg md:text-2xl font-serif text-text-primary mb-1 md:mb-2 text-center mt-3">
          {heading}
        </h3>
        <div
          className="w-16 md:w-20 h-px mb-3 md:mb-4"
          style={{
            background:
              'linear-gradient(to right, transparent, #D4A857 30%, #D4A857 70%, transparent)',
          }}
        />
        <p className="text-[#B88A3B] font-semibold tracking-wide font-sans text-xs md:text-base text-center leading-relaxed">
          {names.split('&').map((part, i, arr) => (
            <span key={i}>
              {part.trim()}
              {i < arr.length - 1 && (
                <>
                  {' '}&amp;{' '}<br />
                </>
              )}
            </span>
          ))}
        </p>
      </div>
    </motion.div>
  );
}

export default function Presence({ translations, images }: PresenceProps) {
  return (
    <section className="py-8 md:py-24 bg-[#FDFBF7] relative overflow-hidden" id="presence">
      {/* Decorative flowers */}
      <div className="absolute top-0 left-0 w-40 md:w-56 h-40 md:h-56 opacity-[0.06] pointer-events-none">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-0 right-0 w-40 md:w-56 h-40 md:h-56 opacity-[0.06] pointer-events-none rotate-180">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute top-1/2 left-0 w-24 md:w-32 h-24 md:h-32 opacity-[0.04] pointer-events-none -translate-y-1/2">
        <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute top-1/2 right-0 w-24 md:w-32 h-24 md:h-32 opacity-[0.04] pointer-events-none -translate-y-1/2 scale-x-[-1]">
        <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading: With Blessings Of */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-20"
        >
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 md:mb-8">
            <div className="h-px w-10 md:w-24 bg-gradient-to-r from-transparent to-[#D4A857]" />
            <div className="relative w-8 h-8 md:w-9 md:h-9 opacity-65">
              <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
            </div>
            <div className="h-px w-10 md:w-24 bg-gradient-to-l from-transparent to-[#D4A857]" />
          </div>
          <h2 className="text-2xl md:text-5xl font-serif text-[#B88A3B] uppercase tracking-[0.2em] font-bold drop-shadow-sm">
            {translations.presence.blessings || 'With Blessings Of'}
          </h2>
        </motion.div>

        {/* Parents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto mb-12 md:mb-20">
          <ParentCard
            imageSrc={images.presence.groomParents?.url || '/images/hero.png'}
            altText={translations.presence.groomParents}
            heading={translations.presence.groomParents}
            names={translations.presence.groomParentsNames}
            delay={0.2}
          />
          <ParentCard
            imageSrc={images.presence.brideParents?.url || '/images/hero.png'}
            altText={translations.presence.brideParents}
            heading={translations.presence.brideParents}
            names={translations.presence.brideParentsNames}
            delay={0.4}
          />
        </div>

        {/* Message below parents */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center max-w-3xl mx-auto"
        >
           <div className="relative inline-block px-8 py-6">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4A857]/30" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4A857]/30" />
              <p className="text-base md:text-3xl font-serif text-text-primary leading-relaxed italic drop-shadow-sm">
                &ldquo;{translations.presence.title}&rdquo;
              </p>
           </div>
        </motion.div>
      </div>
    </section>
  );
}
