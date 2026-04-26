'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CountdownProps {
  translations: any;
}

export default function Countdown({ translations }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(translations.countdown.targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [translations.countdown.targetDate]);

  return (
    <section className="py-8 md:py-24 bg-[#FDFBF7] relative overflow-hidden">
      
      {/* Decorative flowers */}
      <div className="absolute top-0 right-0 w-48 h-48 opacity-[0.07] pointer-events-none">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-[0.07] pointer-events-none rotate-180">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Section Heading matching theme */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-16">
            <div className="h-px flex-1 max-w-[40px] sm:max-w-[80px]"
              style={{ background: 'linear-gradient(to right, transparent, #D4A857)' }} />
            <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 opacity-60">
              <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
            </div>
            <h2 className="font-sans text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-text-heading font-semibold text-center whitespace-nowrap">
              {translations.countdown.title}
            </h2>
            <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 opacity-60"
              style={{ transform: 'scaleX(-1)' }}>
              <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
            </div>
            <div className="h-px flex-1 max-w-[40px] sm:max-w-[80px]"
              style={{ background: 'linear-gradient(to left, transparent, #D4A857)' }} />
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center items-center gap-1.5 sm:gap-4 md:gap-8 max-w-4xl mx-auto">
            <TimeUnit value={timeLeft.days} label={translations.countdown.days} />
            
            {/* Separator */}
            <div className="flex flex-col gap-1.5 md:gap-3 pb-8 md:pb-12">
              <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-[#D4A857] shadow-[0_0_6px_rgba(212,168,87,0.8)]" />
              <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-[#D4A857] shadow-[0_0_6px_rgba(212,168,87,0.8)]" />
            </div>
            
            <TimeUnit value={timeLeft.hours} label={translations.countdown.hours} />
            
            <div className="flex flex-col gap-1.5 md:gap-3 pb-8 md:pb-12">
              <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-[#D4A857] shadow-[0_0_6px_rgba(212,168,87,0.8)]" />
              <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-[#D4A857] shadow-[0_0_6px_rgba(212,168,87,0.8)]" />
            </div>
            
            <TimeUnit value={timeLeft.minutes} label={translations.countdown.minutes} />
            
            <div className="flex flex-col gap-1.5 md:gap-3 pb-8 md:pb-12">
              <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-[#D4A857] shadow-[0_0_6px_rgba(212,168,87,0.8)]" />
              <div className="w-1 h-1 md:w-2 md:h-2 rounded-full bg-[#D4A857] shadow-[0_0_6px_rgba(212,168,87,0.8)]" />
            </div>
            
            <TimeUnit value={timeLeft.seconds} label={translations.countdown.seconds} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Outer glow ring */}
      <div
        className="relative flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:-translate-y-1"
        style={{
          width: 'clamp(60px, 16vw, 112px)',
          height: 'clamp(74px, 20vw, 128px)',
        }}
      >
        {/* Animated outer glow border */}
        <div
          className="absolute inset-0 rounded-t-[50%] rounded-b-[18%] animate-pulse"
          style={{
            background: 'linear-gradient(145deg, #E6C98A, #D4A857 35%, #B88A3B 65%, #E6C98A)',
            padding: '2px',
            boxShadow: '0 0 18px 4px rgba(212,168,87,0.35), 0 8px 24px rgba(180,130,50,0.25)',
          }}
        >
          <div className="w-full h-full rounded-t-[48%] rounded-b-[15%] bg-transparent" />
        </div>

        {/* Main tile */}
        <div
          className="absolute inset-[2px] rounded-t-[48%] rounded-b-[15%] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #FFFDF7 0%, #FAF0DC 55%, #F5E6C8 100%)',
            boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.9), inset 0 -2px 6px rgba(180,130,50,0.12)',
          }}
        >
          {/* Top shimmer highlight */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/60 to-transparent pointer-events-none rounded-t-[48%]" />
          {/* Inner gold border */}
          <div
            className="absolute inset-[4px] rounded-t-[46%] rounded-b-[12%] pointer-events-none"
            style={{ border: '1px solid rgba(212,168,87,0.30)' }}
          />
          <span className="text-[1.55rem] sm:text-4xl md:text-5xl text-text-heading font-serif tracking-tight drop-shadow-sm z-10 relative">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="text-[7px] sm:text-[10px] md:text-xs text-[#B88A3B] font-bold uppercase tracking-[0.18em] sm:tracking-[0.3em]">
        {label}
      </span>
    </div>
  );
}
