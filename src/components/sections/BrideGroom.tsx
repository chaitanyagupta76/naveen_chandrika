'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface BrideGroomProps {
  translations: any;
  images: any;
}

function ArchPhoto({ src, alt, label, name, parents, delay = 0 }: {
  src: string; alt: string; label: string; name: string; parents: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay }}
      className="flex flex-col items-center text-center flex-1 min-w-0 max-w-[190px] sm:max-w-[240px] md:max-w-[280px] w-full"
    >
      {/* Arch photo frame */}
      <div className="relative w-full mb-4 md:mb-6">
        {/* Outer gold border — arch shape */}
        <div
          className="relative overflow-hidden w-full"
          style={{
            aspectRatio: '3 / 4',
            borderRadius: '50% 50% 8px 8px / 18% 18% 3% 3%',
            padding: '3px md:4px',
            background: 'linear-gradient(145deg, #E6C98A, #D4A857 40%, #B88A3B 70%, #D4A857)',
            boxShadow: '0 6px 20px rgba(180,130,50,0.2)',
          }}
        >
          {/* Ivory inner gap */}
          <div
            className="relative overflow-hidden w-full h-full"
            style={{ borderRadius: '48% 48% 6px 6px / 16% 16% 2.5% 2.5%', padding: '2px md:3px', background: '#FAF0DC' }}
          >
            {/* Photo */}
            <div
              className="relative overflow-hidden w-full h-full"
              style={{ borderRadius: '46% 46% 4px 4px / 14% 14% 2% 2%' }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover object-top"
              />
              {/* Subtle bottom vignette */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.15), transparent)' }}
              />
            </div>
          </div>
        </div>

        {/* Gold bottom base strip */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[80%] h-[1px] md:h-[2px]"
          style={{ background: 'linear-gradient(to right, transparent, #D4A857 30%, #D4A857 70%, transparent)' }}
        />
      </div>

      {/* Label */}
      <p className="font-sans text-[8px] sm:text-[10px] tracking-[0.3em] uppercase text-[#B88A3B] font-semibold mb-1">
        {label}
      </p>

      {/* Name */}
      <h3 className="font-serif text-lg sm:text-3xl md:text-4xl text-text-heading mb-1 sm:mb-2 leading-tight font-bold">
        {name}
      </h3>

      {/* Thin gold line under name */}
      <div className="w-8 md:w-10 h-px mb-2" style={{ background: '#D4A857' }} />

      {/* Parents — line break after & */}
      <div className="font-sans text-[10px] sm:text-sm text-text-secondary leading-relaxed max-w-[170px] sm:max-w-[200px] text-center">
        {parents.split('&').map((part, i, arr) => (
          <span key={i}>
            {part.trim()}
            {i < arr.length - 1 && (
              <>
                {' '}&amp;
                <br />
              </>
            )}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function BrideGroom({ translations, images }: BrideGroomProps) {
  return (
    <section id="couple" className="py-8 md:py-24 bg-[#FDFBF7] relative overflow-hidden">

      {/* Flower decorations */}
      <div className="absolute -top-6 -left-6 w-40 md:w-52 h-40 md:h-52 pointer-events-none opacity-[0.05]">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute -bottom-6 -right-6 w-40 md:w-52 h-40 md:h-52 pointer-events-none opacity-[0.05]"
        style={{ transform: 'rotate(180deg)' }}>
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-2 md:px-4">

        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-3 md:gap-5 mb-10 md:mb-16"
        >
          <div className="h-px flex-1 max-w-[30px] md:max-w-[80px]"
            style={{ background: 'linear-gradient(to right, transparent, #D4A857)' }} />
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 opacity-60">
            <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
          </div>
          <p className="font-sans text-[10px] sm:text-sm tracking-[0.2em] md:tracking-[0.4em] uppercase text-text-heading font-semibold whitespace-nowrap">
            {translations.common?.brideGroomLabel || 'Bride & Groom'}
          </p>
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 opacity-60"
            style={{ transform: 'scaleX(-1)' }}>
            <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
          </div>
          <div className="h-px flex-1 max-w-[30px] md:max-w-[80px]"
            style={{ background: 'linear-gradient(to left, transparent, #D4A857)' }} />
        </motion.div>

        {/* ── Cards row — always a single row ── */}
        <div className="flex flex-row items-start justify-center gap-1 sm:gap-6 md:gap-12 lg:gap-16 relative max-w-6xl mx-auto">

          {/* Groom */}
          <ArchPhoto
            src={images.brideGroom.groom}
            alt={translations.brideGroom.groom}
            label={translations.common?.theGroom || 'The Groom'}
            name={translations.brideGroom.groom}
            parents={translations.brideGroom.groomParents}
            delay={0}
          />

          {/* Heart + connector in the middle */}
          <div className="flex flex-col items-center justify-center self-stretch gap-1 py-0 pt-16 sm:pt-32">
            <div className="w-px flex-1" style={{ background: 'linear-gradient(to bottom, transparent, #D4A857 40%, #D4A857 60%, transparent)' }} />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-3 h-3 sm:w-6 sm:h-6 fill-rose-500 text-rose-500 drop-shadow" />
            </motion.div>
            <div className="w-px flex-1" style={{ background: 'linear-gradient(to top, transparent, #D4A857 40%, #D4A857 60%, transparent)' }} />
          </div>

          {/* Bride */}
          <ArchPhoto
            src={images.brideGroom.bride}
            alt={translations.brideGroom.bride}
            label={translations.common?.theBride || 'The Bride'}
            name={translations.brideGroom.bride}
            parents={translations.brideGroom.brideParents}
            delay={0.15}
          />
        </div>

      </div>
    </section>
  );
}
