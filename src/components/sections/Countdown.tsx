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
    <section className="py-12 md:py-24 bg-[#FDFBF7] relative overflow-hidden">
      
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
          <div className="flex justify-center items-center gap-3 sm:gap-6 md:gap-10 max-w-4xl mx-auto">
            <TimeUnit value={timeLeft.days} label={translations.countdown.days} />
            
            {/* Separator */}
            <div className="flex flex-col gap-2 md:gap-4 pb-8 md:pb-12 opacity-60">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#D4A857]" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#D4A857]" />
            </div>
            
            <TimeUnit value={timeLeft.hours} label={translations.countdown.hours} />
            
            <div className="flex flex-col gap-2 md:gap-4 pb-8 md:pb-12 opacity-60">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#D4A857]" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#D4A857]" />
            </div>
            
            <TimeUnit value={timeLeft.minutes} label={translations.countdown.minutes} />
            
            <div className="flex flex-col gap-2 md:gap-4 pb-8 md:pb-12 opacity-60 hidden sm:flex">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#D4A857]" />
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#D4A857]" />
            </div>
            
            <div className="hidden sm:block">
              <TimeUnit value={timeLeft.seconds} label={translations.countdown.seconds} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative w-16 h-20 sm:w-20 sm:h-24 md:w-28 md:h-32 rounded-t-[40%] rounded-b-[15%] shadow-lg flex flex-col items-center justify-center mb-4 sm:mb-6 transition-transform hover:-translate-y-1 overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #FFFFFF, #FAF0DC)',
          border: '1px solid rgba(230,201,138,0.5)',
          boxShadow: '0 10px 30px -5px rgba(212,168,87,0.15), inset 0 2px 5px rgba(255,255,255,0.8)'
        }}
      >
        {/* Inner subtle gold line */}
        <div className="absolute inset-1 rounded-t-[40%] rounded-b-[15%] border border-[#D4A857]/20 pointer-events-none" />
        
        <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-heading font-serif tracking-tight drop-shadow-sm z-10">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[8px] sm:text-[10px] md:text-xs text-[#B88A3B] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em]">
        {label}
      </span>
    </div>
  );
}
