'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import type { Transition } from 'framer-motion';

interface SplashProps {
  translations: any;
  onFinish?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sky Lantern Component
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

// ─────────────────────────────────────────────────────────────────────────────
// Decorative Flourish SVG
// ─────────────────────────────────────────────────────────────────────────────
function OrnamentalFlourish({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="120" height="24" viewBox="0 0 120 24" fill="none"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      className="opacity-70"
    >
      <path
        d="M2 12 C10 4, 20 4, 30 12 C40 20, 50 20, 60 12 C70 4, 80 4, 90 12 C100 20, 110 20, 118 12"
        stroke="url(#flourishGrad)" strokeWidth="1.5" fill="none" strokeLinecap="round"
      />
      <circle cx="60" cy="12" r="2.5" fill="#D4A857" opacity="0.9" />
      <circle cx="30" cy="12" r="1.5" fill="#D4A857" opacity="0.6" />
      <circle cx="90" cy="12" r="1.5" fill="#D4A857" opacity="0.6" />
      <defs>
        <linearGradient id="flourishGrad" x1="0" y1="12" x2="120" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A857" stopOpacity="0.2" />
          <stop offset="30%" stopColor="#D4A857" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#F3E1B6" stopOpacity="1" />
          <stop offset="70%" stopColor="#D4A857" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D4A857" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Gold Sparkle Particle
// ─────────────────────────────────────────────────────────────────────────────
function GoldParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: 'radial-gradient(circle, rgba(212,168,87,0.9) 0%, rgba(243,225,182,0.4) 60%, transparent 100%)',
        boxShadow: '0 0 6px 2px rgba(212,168,87,0.4)',
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 1, 0.6, 1, 0], scale: [0, 1, 0.8, 1.1, 0] }}
      transition={{ duration: 3.5, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

interface LanternConfig {
  size: number;
  style: React.CSSProperties;
  animate: { y?: number[]; rotate?: number[]; opacity?: number[]; scale?: number[] };
  transition: Transition;
}

const LANTERNS: LanternConfig[] = [
  { size: 80, style: { left: '-2%', top: '10%' }, animate: { y: [0, -22, 0], rotate: [-5, 5, -5], opacity: [0.7, 0.95, 0.7] }, transition: { duration: 7, delay: 0, repeat: Infinity, ease: 'easeInOut' } },
  { size: 60, style: { left: '3%', top: '42%' }, animate: { y: [0, -18, 0], rotate: [-4, 4, -4], opacity: [0.6, 0.9, 0.6] }, transition: { duration: 8.5, delay: 1.2, repeat: Infinity, ease: 'easeInOut' } },
  { size: 44, style: { left: '1%', top: '70%' }, animate: { y: [0, -14, 0], rotate: [-3, 3, -3], opacity: [0.55, 0.85, 0.55] }, transition: { duration: 6.5, delay: 0.4, repeat: Infinity, ease: 'easeInOut' } },
  { size: 36, style: { left: '10%', top: '28%' }, animate: { y: [0, -12, 0], rotate: [-3, 2, -3], opacity: [0.5, 0.8, 0.5] }, transition: { duration: 7.5, delay: 2.1, repeat: Infinity, ease: 'easeInOut' } },
  { size: 24, style: { left: '16%', top: '6%' }, animate: { y: [0, -10, 0], rotate: [-2, 2, -2], opacity: [0.4, 0.7, 0.4] }, transition: { duration: 9, delay: 1.5, repeat: Infinity, ease: 'easeInOut' } },
  { size: 70, style: { right: '-1%', top: '8%' }, animate: { y: [0, -20, 0], rotate: [5, -5, 5], opacity: [0.75, 1, 0.75] }, transition: { duration: 8, delay: 0.7, repeat: Infinity, ease: 'easeInOut' } },
  { size: 52, style: { right: '2%', top: '40%' }, animate: { y: [0, -16, 0], rotate: [4, -4, 4], opacity: [0.6, 0.9, 0.6] }, transition: { duration: 9, delay: 1.8, repeat: Infinity, ease: 'easeInOut' } },
  { size: 38, style: { right: '1%', top: '68%' }, animate: { y: [0, -13, 0], rotate: [3, -3, 3], opacity: [0.55, 0.85, 0.55] }, transition: { duration: 6, delay: 0.2, repeat: Infinity, ease: 'easeInOut' } },
  { size: 28, style: { right: '10%', top: '22%' }, animate: { y: [0, -11, 0], rotate: [2, -2, 2], opacity: [0.45, 0.75, 0.45] }, transition: { duration: 7, delay: 2.5, repeat: Infinity, ease: 'easeInOut' } },
  { size: 18, style: { right: '18%', top: '4%' }, animate: { y: [0, -9, 0], rotate: [2, -2, 2], opacity: [0.4, 0.7, 0.4] }, transition: { duration: 8.5, delay: 1, repeat: Infinity, ease: 'easeInOut' } },
  { size: 14, style: { left: '32%', top: '3%' }, animate: { y: [0, -6, 0], opacity: [0.3, 0.55, 0.3] }, transition: { duration: 6, delay: 0.5, repeat: Infinity, ease: 'easeInOut' } },
  { size: 16, style: { right: '34%', top: '2%' }, animate: { y: [0, -6, 0], opacity: [0.35, 0.6, 0.35] }, transition: { duration: 8, delay: 1.2, repeat: Infinity, ease: 'easeInOut' } },
];

// Sparkle positions (deterministic)
const SPARKLES = [
  { x: '12%', y: '18%', size: 4, delay: 0 },
  { x: '85%', y: '25%', size: 3, delay: 0.8 },
  { x: '22%', y: '75%', size: 5, delay: 1.5 },
  { x: '78%', y: '65%', size: 3, delay: 0.3 },
  { x: '45%', y: '8%', size: 4, delay: 2.0 },
  { x: '55%', y: '88%', size: 3, delay: 1.2 },
  { x: '8%', y: '55%', size: 4, delay: 0.6 },
  { x: '92%', y: '45%', size: 3, delay: 1.8 },
  { x: '35%', y: '92%', size: 4, delay: 2.5 },
  { x: '68%', y: '12%', size: 3, delay: 0.4 },
  { x: '50%', y: '50%', size: 5, delay: 1.0 },
  { x: '15%', y: '35%', size: 3, delay: 2.2 },
];

export default function Splash({ translations, onFinish }: SplashProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling while splash is active
    document.body.style.overflow = 'hidden';

    // Hide splash after 3.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';

      // Signal other components (e.g. MusicPlayer) that splash is done
      window.dispatchEvent(new CustomEvent('splashDone'));

      if (onFinish) {
        setTimeout(onFinish, 1000); // Wait for fade out animation before unmounting
      }
    }, 3500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onFinish]);

  const groomName = translations.brideGroom?.groom;
  const brideName = translations.brideGroom?.bride;

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* ── Rich layered background ────────────────────────────────── */}
          <div className="absolute inset-0 z-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 30%, rgba(110,60,45,0.4) 0%, transparent 60%),
                radial-gradient(ellipse at 20% 80%, rgba(212,144,74,0.35) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 80%, rgba(212,144,74,0.35) 0%, transparent 50%),
                linear-gradient(170deg, #2D1B14 0%, #4A2A1E 20%, #3A5A6F 45%, #4A6A7F 60%, #D4904A 85%, #C0703A 100%)
              `
            }}
          />

          {/* ── Warm ground glow ───────────────────────────────────────── */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 h-[55%]"
              style={{ background: 'linear-gradient(to top, rgba(212,144,74,0.55) 0%, rgba(192,112,58,0.3) 40%, transparent 100%)' }}
            />
            <div className="absolute bottom-[15%] left-0 right-0 h-32 blur-3xl"
              style={{ background: 'radial-gradient(ellipse at center, rgba(255,200,80,0.25) 0%, transparent 70%)' }}
            />
          </div>

          {/* ── Vignette overlay for depth ──────────────────────────────── */}
          <div className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at center, transparent 40%, rgba(20,10,5,0.5) 100%)
              `
            }}
          />

          {/* ── Animated Sky Lanterns ───────────────────────────────────── */}
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            {LANTERNS.map((l, i) => (
              <motion.div key={i} className="absolute" style={l.style}
                animate={l.animate} transition={l.transition}>
                <SkyLantern size={l.size} uid={`splash-l${i}`} />
              </motion.div>
            ))}
          </div>

          {/* ── Gold sparkle particles ──────────────────────────────────── */}
          <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
            {SPARKLES.map((s, i) => (
              <GoldParticle key={i} x={s.x} y={s.y} size={s.size} delay={s.delay} />
            ))}
          </div>

          {/* ── Soft overlay for text readability ──────────────────────── */}
          <div className="absolute inset-0 z-10 bg-black/15 pointer-events-none" />

          {/* ── Content ────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="relative z-20 text-center px-6 flex flex-col items-center"
          >
            {/* Top decorative flourish */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
            >
              <OrnamentalFlourish />
            </motion.div>

            {/* Flower icon with glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
              className="relative w-14 h-14 md:w-16 md:h-16 my-4 md:my-5"
            >
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212,168,87,0.4) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                  transform: 'scale(2)',
                }}
              />
              <Image src="/site_images/flower2.png" alt="logo" fill className="object-contain drop-shadow-[0_0_12px_rgba(212,168,87,0.7)]" />
            </motion.div>

            {/* Welcome text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="text-[#F3E1B6]/90 font-sans text-[10px] md:text-xs tracking-[0.35em] uppercase leading-relaxed font-medium"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
            >
              {translations.common?.welcome}
            </motion.p>

            {/* Thin gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1, ease: 'easeOut' }}
              className="w-32 md:w-44 h-px my-4 md:my-5 origin-center"
              style={{
                background: 'linear-gradient(90deg, transparent, #D4A857, #F3E1B6, #D4A857, transparent)',
                boxShadow: '0 0 8px rgba(212,168,87,0.5)',
              }}
            />

            {/* ── Couple Names – stylish italic calligraphy ───────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1.2, ease: 'easeOut' }}
              className="flex flex-col items-center gap-1 md:gap-2"
            >
              {/* Groom name */}
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="font-splash italic text-[2.8rem] sm:text-5xl md:text-6xl lg:text-7xl leading-none font-semibold"
                style={{
                  color: '#FDFBF7',
                  textShadow: '0 0 30px rgba(212,168,87,0.5), 0 4px 12px rgba(0,0,0,0.5)',
                }}
              >
                {groomName}
              </motion.span>

              {/* Ampersand with decorative styling */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7, duration: 0.6 }}
                className="font-splash italic text-2xl sm:text-3xl md:text-4xl leading-none font-light"
                style={{
                  color: '#D4A857',
                  textShadow: '0 0 20px rgba(212,168,87,0.6), 0 2px 8px rgba(0,0,0,0.4)',
                }}
              >
                &amp;
              </motion.span>

              {/* Bride name */}
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.9, duration: 0.8 }}
                className="font-splash italic text-[2.8rem] sm:text-5xl md:text-6xl lg:text-7xl leading-none font-semibold"
                style={{
                  color: '#FDFBF7',
                  textShadow: '0 0 30px rgba(212,168,87,0.5), 0 4px 12px rgba(0,0,0,0.5)',
                }}
              >
                {brideName}
              </motion.span>
            </motion.div>

            {/* Bottom gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.1, duration: 1, ease: 'easeOut' }}
              className="w-32 md:w-44 h-px mt-5 md:mt-6 mb-3 md:mb-4 origin-center"
              style={{
                background: 'linear-gradient(90deg, transparent, #D4A857, #F3E1B6, #D4A857, transparent)',
                boxShadow: '0 0 8px rgba(212,168,87,0.5)',
              }}
            />

            {/* Bottom decorative flourish */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 2.2, duration: 1.2, ease: 'easeOut' }}
            >
              <OrnamentalFlourish flip />
            </motion.div>
          </motion.div>

          {/* ── Shimmer CSS animation (embedded keyframes) ─────────── */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes splash-shimmer {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
