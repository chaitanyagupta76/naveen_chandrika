'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  left: number;       // % across screen
  size: number;       // px
  duration: number;   // s to fall full screen
  delay: number;      // s initial delay
  opacity: number;
  blur: number;       // px glow blur
  xDrift: number;     // px horizontal drift over full fall
  color: string;      // warm palette color
  tail: boolean;      // render an elongated streak tail
  tailLen: number;    // px length of tail
}

// ─── Warm palette matching the site theme ────────────────────────────────────
const COLORS = [
  'rgba(255,230,120,@)',   // bright gold
  'rgba(212,168,87,@)',    // primary gold
  'rgba(255,190,60,@)',    // amber
  'rgba(255,140,30,@)',    // candle orange
  'rgba(243,225,182,@)',   // ivory light
  'rgba(255,215,100,@)',   // champagne
];

function randomColor(opacity: number) {
  const c = COLORS[Math.floor(Math.random() * COLORS.length)];
  return c.replace('@', String(opacity.toFixed(2)));
}

// ─── Particle generators ─────────────────────────────────────────────────────
function makeParticles(): Particle[] {
  return Array.from({ length: 60 }, (_, i) => {
    const size     = Math.random() * 5 + 1.5;   // 1.5–6.5px
    const opacity  = Math.random() * 0.55 + 0.25; // 0.25–0.8
    const hasTail  = size > 3.5 && Math.random() > 0.45;
    return {
      id:       i,
      left:     Math.random() * 100,
      size,
      duration: Math.random() * 14 + 10,         // 10–24s
      delay:    Math.random() * 12,              // 0–12s stagger
      opacity,
      blur:     size * (Math.random() * 2.5 + 1.5), // glow radius
      xDrift:   (Math.random() - 0.5) * 120,    // ±60px drift
      color:    randomColor(opacity),
      tail:     hasTail,
      tailLen:  Math.random() * 22 + 8,          // 8–30px tail
    };
  });
}

// ─── Single particle ─────────────────────────────────────────────────────────
function Spark({ p }: { p: Particle }) {
  const glowColor = p.color.replace(/[\d.]+\)$/, '0.6)');

  return (
    <motion.div
      key={p.id}
      className="absolute pointer-events-none"
      style={{ left: `${p.left}%`, top: 0 }}
      initial={{ y: '-8vh', x: 0, opacity: 0 }}
      animate={{
        y:       '108vh',
        x:       [0, p.xDrift * 0.5, p.xDrift, p.xDrift * 0.5, 0],
        opacity: [0, p.opacity, p.opacity, p.opacity * 0.7, 0],
      }}
      transition={{
        y:       { duration: p.duration, repeat: Infinity, ease: 'linear',     delay: p.delay },
        x:       { duration: p.duration,  repeat: Infinity, ease: 'easeInOut', delay: p.delay },
        opacity: { duration: p.duration,  repeat: Infinity, ease: 'easeInOut', delay: p.delay },
      }}
    >
      {/* Tail (comet streak above the orb) */}
      {p.tail && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: p.size * 0.6,
            height: p.tailLen,
            background: `linear-gradient(to bottom, transparent 0%, ${p.color} 100%)`,
            borderRadius: '50%',
            filter: `blur(${p.blur * 0.4}px)`,
          }}
        />
      )}

      {/* Orb */}
      <div
        style={{
          width:  p.size,
          height: p.size,
          borderRadius: '50%',
          background: p.color,
          boxShadow: [
            `0 0 ${p.blur}px ${p.blur * 0.5}px ${glowColor}`,
            `0 0 ${p.blur * 2}px ${p.blur}px ${p.color.replace(/[\d.]+\)$/, '0.25)')}`,
          ].join(', '),
        }}
      />
    </motion.div>
  );
}

// ─── Floating ember (large slow drifting glow for depth) ─────────────────────
interface Ember {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
}

function makeEmbers(): Ember[] {
  return Array.from({ length: 12 }, (_, i) => ({
    id:    i,
    left:  Math.random() * 100,
    top:   Math.random() * 80,
    size:  Math.random() * 60 + 20,
    delay: Math.random() * 6,
  }));
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function FallingLights() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [embers,    setEmbers]    = useState<Ember[]>([]);

  useEffect(() => {
    setParticles(makeParticles());
    setEmbers(makeEmbers());
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">

      {/* Layer 1 — deep background floating embers (large diffused glows) */}
      {embers.map(e => (
        <motion.div
          key={`ember-${e.id}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left:   `${e.left}%`,
            top:    `${e.top}%`,
            width:  e.size,
            height: e.size,
            background: 'radial-gradient(circle, rgba(255,200,80,0.18) 0%, transparent 70%)',
          }}
          animate={{
            y:       [0, -30, 0],
            x:       [0, 15, -10, 0],
            opacity: [0.0, 0.5, 0.3, 0.0],
            scale:   [0.8, 1.15, 0.9, 0.8],
          }}
          transition={{
            duration: Math.random() * 8 + 10,
            repeat:   Infinity,
            ease:    'easeInOut',
            delay:    e.delay,
          }}
        />
      ))}

      {/* Layer 2 — falling sparks with comet tails */}
      {particles.map(p => <Spark key={p.id} p={p} />)}

      {/* Layer 3 — subtle warm vignette shimmer at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,200,80,0.06) 0%, transparent 100%)',
        }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
