'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import type { Transition } from 'framer-motion';
import Image from 'next/image';

interface HeroProps {
  translations: any;
  images: any;
  metadata: any;
}

// ─────────────────────────────────────────────────────────────────────────────
// Ornate CSS/SVG frame — generated, no PNG
// ─────────────────────────────────────────────────────────────────────────────

function FloralCrown() {
  return (
    <svg viewBox="0 0 160 90" fill="none" className="w-full h-full">
      {/* Petals around central circle */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const r = (angle * Math.PI) / 180;
        return (
          <ellipse key={i}
            cx={80 + Math.cos(r) * 18} cy={46 + Math.sin(r) * 18}
            rx="7" ry="5"
            transform={`rotate(${angle} ${80 + Math.cos(r) * 18} ${46 + Math.sin(r) * 18})`}
            fill="#D4A857" opacity="0.8"
          />
        );
      })}
      {/* Central coin */}
      <circle cx="80" cy="46" r="11" fill="#D4A857" />
      <circle cx="80" cy="46" r="6.5" fill="#F3E1B6" />
      <circle cx="80" cy="46" r="3" fill="#D4A857" />
      {/* Left sprigs */}
      <path d="M64 46 Q48 32 28 24" stroke="#8A9A5B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M60 42 Q46 40 30 36" stroke="#8A9A5B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <ellipse cx="26" cy="23" rx="9" ry="5" transform="rotate(-35 26 23)" fill="#8A9A5B" opacity="0.75" />
      <ellipse cx="28" cy="35" rx="8" ry="4" transform="rotate(-10 28 35)" fill="#8A9A5B" opacity="0.6" />
      <circle cx="16" cy="20" r="5" fill="#D4A857" opacity="0.7" />
      {/* Left scroll */}
      <path d="M58 46 Q48 58 40 63 Q34 66 32 62" stroke="#D4A857" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Right sprigs */}
      <path d="M96 46 Q112 32 132 24" stroke="#8A9A5B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M100 42 Q114 40 130 36" stroke="#8A9A5B" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <ellipse cx="134" cy="23" rx="9" ry="5" transform="rotate(35 134 23)" fill="#8A9A5B" opacity="0.75" />
      <ellipse cx="132" cy="35" rx="8" ry="4" transform="rotate(10 132 35)" fill="#8A9A5B" opacity="0.6" />
      <circle cx="144" cy="20" r="5" fill="#D4A857" opacity="0.7" />
      {/* Right scroll */}
      <path d="M102 46 Q112 58 120 63 Q126 66 128 62" stroke="#D4A857" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function Corner({ rotate = 0 }: { rotate?: number }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" className="w-full h-full"
      style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M3 33 L3 10 Q3 3 10 3 L33 3" stroke="#D4A857" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M3 33 L3 14 Q3 7 10 7 L33 7" stroke="#D4A857" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
      <circle cx="4.5" cy="4.5" r="3.5" fill="#D4A857" />
    </svg>
  );
}

function OrnateFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      {/* Floral crown — rises above the arch */}
      <div className="absolute -top-9 left-[10%] right-[10%] pointer-events-none z-30" style={{ height: '72px' }}>
        <FloralCrown />
      </div>

      {/* Corner accents (positioned at photo aperture corners) */}
      <div className="absolute top-[20%] left-0 w-7 h-7 z-20 pointer-events-none"><Corner rotate={0} /></div>
      <div className="absolute top-[20%] right-0 w-7 h-7 z-20 pointer-events-none"><Corner rotate={90} /></div>
      <div className="absolute bottom-[6%] left-0 w-7 h-7 z-20 pointer-events-none"><Corner rotate={270} /></div>
      <div className="absolute bottom-[6%] right-0 w-7 h-7 z-20 pointer-events-none"><Corner rotate={180} /></div>

      {/* Side pillar dots */}
      {[...Array(5)].map((_, i) => (
        <div key={`l${i}`} className="absolute w-2 h-2 rounded-full -left-2 z-20 pointer-events-none"
          style={{ top: `${28 + i * 13}%`, background: '#D4A857', opacity: 0.65 - i * 0.07 }} />
      ))}
      {[...Array(5)].map((_, i) => (
        <div key={`r${i}`} className="absolute w-2 h-2 rounded-full -right-2 z-20 pointer-events-none"
          style={{ top: `${28 + i * 13}%`, background: '#D4A857', opacity: 0.65 - i * 0.07 }} />
      ))}

      {/* Outer gold ring */}
      <div style={{
        borderRadius: '50% 50% 8% 8% / 16% 16% 3% 3%',
        padding: '4px',
        background: 'linear-gradient(145deg, #E6C98A 0%, #D4A857 35%, #B88A3B 65%, #D4A857 100%)',
        boxShadow: '0 0 0 1px #B88A3B, 0 20px 50px rgba(0,0,0,0.5), 0 0 24px rgba(212,168,87,0.3)',
      }}>
        {/* Ivory separator */}
        <div style={{ borderRadius: '48% 48% 7% 7% / 15% 15% 2.5% 2.5%', padding: '4px', background: '#FAF0DC' }}>
          {/* Inner gold ring */}
          <div style={{ borderRadius: '46% 46% 6% 6% / 14% 14% 2% 2%', padding: '3px', background: 'linear-gradient(145deg, #D4A857, #B88A3B)' }}>
            {/* Photo aperture — perfectly clipped arch */}
            <div className="relative overflow-hidden"
              style={{ borderRadius: '44% 44% 5% 5% / 13% 13% 2% 2%', aspectRatio: '3/4' }}>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gold ornamental line */}
      <div className="flex items-center gap-1.5 justify-center mt-3 px-4">
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #D4A857 60%, transparent)' }} />
        <svg viewBox="0 0 24 12" className="w-6 h-3 flex-shrink-0">
          <path d="M12 1 L17 6 L12 11 L7 6 Z" fill="#D4A857" />
          <path d="M12 3 L15.5 6 L12 9 L8.5 6 Z" fill="#FAF0DC" />
        </svg>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, #D4A857 60%, transparent)' }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sky Lantern
// ─────────────────────────────────────────────────────────────────────────────
function SkyLantern({ size = 48, uid }: { size?: number; uid: string }) {
  const id = uid;
  const w = size;
  const h = Math.round(size * 1.35);
  return (
    <svg width={w} height={h} viewBox="0 0 48 65" fill="none">
      <ellipse cx="24" cy="36" rx="22" ry="26" fill={`url(#og${id})`} />
      <rect x="7" y="12" width="34" height="40" rx="17" fill={`url(#body${id})`} />
      <rect x="11" y="8" width="26" height="8" rx="4" fill="#BE5E0A" />
      <rect x="11" y="50" width="26" height="8" rx="4" fill="#BE5E0A" />
      <ellipse cx="24" cy="34" rx="13" ry="18" fill={`url(#inner${id})`} />
      <ellipse cx="18" cy="28" rx="4" ry="9" fill="rgba(255,240,180,0.35)" />
      <line x1="24" y1="0" x2="24" y2="8" stroke="#BE5E0A" strokeWidth="1.5" strokeLinecap="round" />
      <defs>
        <radialGradient id={`og${id}`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FFD060" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#FF8C1A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FF6600" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`body${id}`} x1="7" y1="12" x2="41" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFC14D" />
          <stop offset="50%" stopColor="#FF8C1A" />
          <stop offset="100%" stopColor="#C85A00" />
        </linearGradient>
        <radialGradient id={`inner${id}`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#FFF0B0" stopOpacity="1" />
          <stop offset="50%" stopColor="#FFD060" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFAA33" stopOpacity="0.3" />
        </radialGradient>
      </defs>
    </svg>
  );
}

interface LanternConfig {
  size: number;
  style: React.CSSProperties;
  animate: { y?: number[]; rotate?: number[]; opacity?: number[]; scale?: number[] };
  transition: Transition;
}

const LANTERNS: LanternConfig[] = [
  { size: 100, style: { left: '-1%', top: '12%' }, animate: { y: [0, -22, 0], rotate: [-5, 5, -5], opacity: [0.85, 1, 0.85] }, transition: { duration: 7, delay: 0, repeat: Infinity, ease: 'easeInOut' } },
  { size: 76, style: { left: '4%', top: '42%' }, animate: { y: [0, -18, 0], rotate: [-4, 4, -4], opacity: [0.8, 1, 0.8] }, transition: { duration: 8.5, delay: 1.2, repeat: Infinity, ease: 'easeInOut' } },
  { size: 56, style: { left: '2%', top: '68%' }, animate: { y: [0, -14, 0], rotate: [-3, 3, -3], opacity: [0.75, 1, 0.75] }, transition: { duration: 6.5, delay: 0.4, repeat: Infinity, ease: 'easeInOut' } },
  { size: 44, style: { left: '10%', top: '28%' }, animate: { y: [0, -12, 0], rotate: [-3, 2, -3], opacity: [0.7, 0.9, 0.7] }, transition: { duration: 7.5, delay: 2.1, repeat: Infinity, ease: 'easeInOut' } },
  { size: 32, style: { left: '14%', top: '6%' }, animate: { y: [0, -10, 0], rotate: [-2, 2, -2], opacity: [0.6, 0.85, 0.6] }, transition: { duration: 9, delay: 1.5, repeat: Infinity, ease: 'easeInOut' } },
  { size: 26, style: { left: '18%', top: '54%' }, animate: { y: [0, -8, 0], rotate: [-2, 2, -2], opacity: [0.55, 0.8, 0.55] }, transition: { duration: 7, delay: 3, repeat: Infinity, ease: 'easeInOut' } },
  { size: 88, style: { right: '-1%', top: '8%' }, animate: { y: [0, -20, 0], rotate: [5, -5, 5], opacity: [0.9, 1, 0.9] }, transition: { duration: 8, delay: 0.7, repeat: Infinity, ease: 'easeInOut' } },
  { size: 70, style: { right: '3%', top: '38%' }, animate: { y: [0, -16, 0], rotate: [4, -4, 4], opacity: [0.8, 1, 0.8] }, transition: { duration: 9, delay: 1.8, repeat: Infinity, ease: 'easeInOut' } },
  { size: 50, style: { right: '1%', top: '65%' }, animate: { y: [0, -13, 0], rotate: [3, -3, 3], opacity: [0.75, 0.95, 0.75] }, transition: { duration: 6, delay: 0.2, repeat: Infinity, ease: 'easeInOut' } },
  { size: 38, style: { right: '9%', top: '22%' }, animate: { y: [0, -11, 0], rotate: [2, -2, 2], opacity: [0.65, 0.9, 0.65] }, transition: { duration: 7, delay: 2.5, repeat: Infinity, ease: 'easeInOut' } },
  { size: 28, style: { right: '16%', top: '4%' }, animate: { y: [0, -9, 0], rotate: [2, -2, 2], opacity: [0.6, 0.8, 0.6] }, transition: { duration: 8.5, delay: 1, repeat: Infinity, ease: 'easeInOut' } },
  { size: 22, style: { right: '20%', top: '58%' }, animate: { y: [0, -7, 0], rotate: [1, -1, 1], opacity: [0.5, 0.75, 0.5] }, transition: { duration: 7, delay: 3.5, repeat: Infinity, ease: 'easeInOut' } },
  { size: 18, style: { left: '30%', top: '3%' }, animate: { y: [0, -6, 0], opacity: [0.4, 0.65, 0.4] }, transition: { duration: 6, delay: 0.5, repeat: Infinity, ease: 'easeInOut' } },
  { size: 16, style: { left: '42%', top: '88%' }, animate: { y: [0, -5, 0], opacity: [0.4, 0.6, 0.4] }, transition: { duration: 7.5, delay: 2, repeat: Infinity, ease: 'easeInOut' } },
  { size: 20, style: { right: '32%', top: '2%' }, animate: { y: [0, -6, 0], opacity: [0.45, 0.65, 0.45] }, transition: { duration: 8, delay: 1.2, repeat: Infinity, ease: 'easeInOut' } },
  { size: 14, style: { right: '40%', top: '92%' }, animate: { y: [0, -5, 0], opacity: [0.35, 0.55, 0.35] }, transition: { duration: 6.5, delay: 0.8, repeat: Infinity, ease: 'easeInOut' } },
];

// ─────────────────────────────────────────────────────────────────────────────
// Hero section
// ─────────────────────────────────────────────────────────────────────────────
// Duration constants (must match CSS/framer values)
const SLIDE_INTERVAL = 5000; // ms
const SLIDE_DURATION = 1.4;  // s crossfade
const KB_DURATION = 6;    // s Ken Burns pan per slide

export default function Hero({ translations, images, metadata }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1); // 1=forward, -1=backward
  const [progress, setProgress] = useState(0);         // 0→1 within current interval
  const slides = images.heroSlideshow || [];
  const sectionRef = useRef<HTMLElement>(null);
  const intervalStart = useRef<number>(Date.now());

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  // Auto-advance
  useEffect(() => {
    if (!slides.length) return;
    intervalStart.current = Date.now();
    const t = setInterval(() => {
      setDirection(1);
      setCurrentSlide(p => (p + 1) % slides.length);
      intervalStart.current = Date.now();
    }, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [slides.length]);

  // Progress bar tick (60fps)
  useEffect(() => {
    if (!slides.length) return;
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - intervalStart.current;
      setProgress(Math.min(elapsed / SLIDE_INTERVAL, 1));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [slides.length, currentSlide]);

  const goTo = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
    intervalStart.current = Date.now();
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Sky gradient */}
      <div className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(170deg, #6E8FA3 0%, #3A5A6F 35%, #4A6A7F 55%, #D4904A 80%, #C0703A 100%)' }}
      />

      {/* Parallax warm ground glow */}
      <motion.div style={{ y: bgY, opacity: bgOpacity }} className="absolute inset-0 z-0 h-[125%] -top-[12%]">
        <div className="absolute bottom-0 left-0 right-0 h-[55%]"
          style={{ background: 'linear-gradient(to top, rgba(212,144,74,0.65) 0%, rgba(192,112,58,0.35) 40%, transparent 100%)' }}
        />
        <div className="absolute bottom-[15%] left-0 right-0 h-32 blur-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,200,80,0.3) 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Floating lanterns */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {LANTERNS.map((l, i) => (
          <motion.div key={i} className="absolute" style={l.style}
            animate={l.animate} transition={l.transition}>
            <SkyLantern size={l.size} uid={`l${i}`} />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 w-full container mx-auto px-6 sm:px-8 py-28 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 min-h-screen">

        {/* Left — couple text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex-1 text-center lg:text-left"
        >
          <p className="text-primary-light text-xs sm:text-sm font-sans tracking-[0.35em] uppercase mb-5 drop-shadow">
            {translations.hero.title}
          </p>
          <h1 className="font-hero text-white drop-shadow-2xl leading-tight mb-7 whitespace-nowrap"
            style={{ fontSize: 'clamp(2.6rem, 8vw, 5.5rem)' }}>
            {translations.brideGroom?.groom || 'Abhishek'} & {translations.brideGroom?.bride || 'Bhavana'}
          </h1>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <div className="h-px flex-1 max-w-[3rem] bg-primary-light/60" />
            <p className="font-serif text-base sm:text-lg text-primary-light italic drop-shadow">
              {metadata.weddingDate}
            </p>
            <div className="h-px flex-1 max-w-[3rem] bg-primary-light/60" />
          </div>
        </motion.div>

        {/* Right — Ornate generated frame + slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.25 }}
          className="flex-shrink-0"
          style={{ width: 'clamp(280px, 80vw, 380px)' }}
        >
          {/* Warm glow behind frame */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,190,60,0.35) 0%, transparent 70%)',
              borderRadius: '50%', filter: 'blur(32px)',
            }}
          />

          <OrnateFrame>
            {/* ── Crossfade + Ken Burns carousel ── */}
            <AnimatePresence mode="sync" initial={false}>
              <motion.div
                key={currentSlide}
                className="absolute inset-0 overflow-hidden"
                initial={{
                  opacity: 0,
                  x: direction > 0 ? '8%' : '-8%',
                }}
                animate={{
                  opacity: 1,
                  x: '0%',
                }}
                exit={{
                  opacity: 0,
                  x: direction > 0 ? '-8%' : '8%',
                }}
                transition={{
                  opacity: { duration: SLIDE_DURATION, ease: [0.4, 0, 0.2, 1] },
                  x: { duration: SLIDE_DURATION, ease: [0.4, 0, 0.2, 1] },
                }}
              >
                {/* Ken Burns: slow zoom + drift while slide is active */}
                {slides[currentSlide] && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.08, x: direction > 0 ? '2%' : '-2%' }}
                    animate={{ scale: 1.0, x: '0%' }}
                    transition={{ duration: KB_DURATION, ease: 'easeOut' }}
                  >
                    <Image
                      src={slides[currentSlide]}
                      alt="Couple photo"
                      fill
                      className="object-cover object-top"
                      priority={currentSlide === 0}
                      sizes="(max-width: 768px) 80vw, 380px"
                    />
                  </motion.div>
                )}


              </motion.div>
            </AnimatePresence>

            {/* ── Progress dots ── */}
            {slides.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2.5 z-20">
                {slides.map((_: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="relative overflow-hidden rounded-full transition-all duration-300"
                    style={{
                      width: i === currentSlide ? 22 : 7,
                      height: 5,
                      background: 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {i === currentSlide && (
                      <motion.span
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: '#fff', width: `${progress * 100}%` }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </OrnateFrame>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-50"
      >
        <div className="w-px h-10 bg-white" />
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </motion.div>
    </section>
  );
}
