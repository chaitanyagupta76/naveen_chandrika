'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Leaf {
  id: number;
  left: number;       // % across screen
  size: number;       // px
  duration: number;   // s to fall full screen
  delay: number;      // s initial delay
  opacity: number;
  xDrift: number;     // px horizontal drift
  rotation: number;   // initial rotation deg
  rotationEnd: number;// end rotation deg
  color: string;      // leaf color
  shape: number;      // 0-2 shape variant
}

// ─── Leaf palette matching the warm wedding theme ─────────────────────────────
const LEAF_COLORS = [
  'rgba(180,130,60,@)',    // warm gold-brown
  'rgba(212,168,87,@)',    // primary gold
  'rgba(160,110,50,@)',    // deep amber
  'rgba(200,160,90,@)',    // champagne gold
  'rgba(140,100,45,@)',    // earthy brown
  'rgba(230,195,130,@)',   // light gold
];

function randomLeafColor(opacity: number) {
  const c = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
  return c.replace('@', String(opacity.toFixed(2)));
}

// ─── Leaf generators ─────────────────────────────────────────────────────────
function makeLeaves(): Leaf[] {
  return Array.from({ length: 30 }, (_, i) => {
    const size    = Math.random() * 14 + 8;    // 8–22px
    const opacity = Math.random() * 0.35 + 0.12; // 0.12–0.47 — very subtle
    return {
      id:          i,
      left:        Math.random() * 105 - 2.5,  // slightly off edges
      size,
      duration:    Math.random() * 20 + 18,   // 18–38s slow drift
      delay:       Math.random() * 20,         // 0–20s stagger
      opacity,
      xDrift:      (Math.random() - 0.5) * 160, // ±80px sway
      rotation:    Math.random() * 360,
      rotationEnd: Math.random() * 720 - 360,   // net ±360° tumble
      color:       randomLeafColor(opacity),
      shape:       Math.floor(Math.random() * 3),
    };
  });
}

// ─── SVG leaf shapes ─────────────────────────────────────────────────────────
// shape 0 = simple oval leaf, 1 = pointed leaf, 2 = round petal
function LeafSVG({ size, color, shape }: { size: number; color: string; shape: number }) {
  const s = size;
  if (shape === 1) {
    // Pointed leaf
    return (
      <svg width={s} height={s * 1.4} viewBox="0 0 20 28" fill="none">
        <path
          d="M10 2 C16 8, 18 16, 10 26 C2 16, 4 8, 10 2Z"
          fill={color}
          stroke={color.replace(/[\d.]+\)$/, '0.4)')}
          strokeWidth="0.5"
        />
        <line x1="10" y1="4" x2="10" y2="24" stroke={color.replace(/[\d.]+\)$/, '0.3)')} strokeWidth="0.8" />
      </svg>
    );
  }
  if (shape === 2) {
    // Round petal / marigold-like
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="9" ry="11" fill={color}
          stroke={color.replace(/[\d.]+\)$/, '0.3)')} strokeWidth="0.5" />
        <line x1="12" y1="3" x2="12" y2="21" stroke={color.replace(/[\d.]+\)$/, '0.25)')} strokeWidth="0.7" />
        <line x1="5" y1="7" x2="19" y2="17" stroke={color.replace(/[\d.]+\)$/, '0.2)')} strokeWidth="0.5" />
        <line x1="19" y1="7" x2="5" y2="17" stroke={color.replace(/[\d.]+\)$/, '0.2)')} strokeWidth="0.5" />
      </svg>
    );
  }
  // Default: classic oval leaf
  return (
    <svg width={s * 0.7} height={s} viewBox="0 0 14 20" fill="none">
      <path
        d="M7 1 C12 5, 13 12, 7 19 C1 12, 2 5, 7 1Z"
        fill={color}
        stroke={color.replace(/[\d.]+\)$/, '0.3)')}
        strokeWidth="0.5"
      />
      <line x1="7" y1="2" x2="7" y2="18" stroke={color.replace(/[\d.]+\)$/, '0.25)')} strokeWidth="0.6" />
      <line x1="4" y1="8" x2="10" y2="8" stroke={color.replace(/[\d.]+\)$/, '0.2)')} strokeWidth="0.4" />
      <line x1="3" y1="12" x2="11" y2="12" stroke={color.replace(/[\d.]+\)$/, '0.2)')} strokeWidth="0.4" />
    </svg>
  );
}

// ─── Single leaf particle ─────────────────────────────────────────────────────
function FallingLeaf({ leaf }: { leaf: Leaf }) {
  return (
    <motion.div
      key={leaf.id}
      className="absolute pointer-events-none"
      style={{ left: `${leaf.left}%`, top: 0 }}
      initial={{ y: '-8vh', x: 0, opacity: 0, rotate: leaf.rotation }}
      animate={{
        y:       '108vh',
        x:       [0, leaf.xDrift * 0.3, leaf.xDrift * 0.7, leaf.xDrift * 0.4, leaf.xDrift],
        opacity: [0, leaf.opacity, leaf.opacity, leaf.opacity * 0.8, 0],
        rotate:  [leaf.rotation, leaf.rotation + leaf.rotationEnd * 0.5, leaf.rotation + leaf.rotationEnd],
      }}
      transition={{
        y:       { duration: leaf.duration, repeat: Infinity, ease: 'linear',     delay: leaf.delay },
        x:       { duration: leaf.duration, repeat: Infinity, ease: 'easeInOut',  delay: leaf.delay },
        opacity: { duration: leaf.duration, repeat: Infinity, ease: 'easeInOut',  delay: leaf.delay },
        rotate:  { duration: leaf.duration, repeat: Infinity, ease: 'easeInOut',  delay: leaf.delay },
      }}
    >
      <LeafSVG size={leaf.size} color={leaf.color} shape={leaf.shape} />
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function FallingLights() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    setLeaves(makeLeaves());
  }, []);

  if (leaves.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[40] overflow-hidden">
      {leaves.map(leaf => <FallingLeaf key={leaf.id} leaf={leaf} />)}
    </div>
  );
}
