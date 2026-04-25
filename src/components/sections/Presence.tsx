'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PresenceProps {
  translations: any;
  images: any;
}

export default function Presence({ translations, images }: PresenceProps) {
  return (
    <section className="py-12 md:py-24 bg-[#FDFBF7] relative overflow-hidden" id="presence">
      {/* Decorative flowers */}
      <div className="absolute top-10 left-10 w-40 h-40 opacity-[0.05] pointer-events-none">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>
      <div className="absolute bottom-10 right-10 w-40 h-40 opacity-[0.05] pointer-events-none rotate-180">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-6 mb-8">
             <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-[#D4A857]" />
             <Image src="/site_images/flower2.png" alt="icon" width={40} height={40} className="opacity-60" />
             <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-[#D4A857]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-text-primary max-w-3xl mx-auto leading-tight italic drop-shadow-sm">
            &ldquo;{translations.presence.title}&rdquo;
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Groom's Parents Side */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgba(212,168,87,0.08)] border border-[#E6C98A]/30 relative group"
          >
            <div className="absolute inset-2 border border-[#E6C98A]/20 rounded-[2rem] pointer-events-none" />
            
            <div className="relative w-full max-w-[280px] aspect-[4/3] sm:aspect-[4/3] mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E6C98A] to-[#B88A3B] rounded-[1.25rem] scale-[1.03] opacity-50 group-hover:scale-105 transition-transform duration-500" />
              <div className="relative w-full h-full overflow-hidden rounded-xl border-4 border-white shadow-xl">
                <Image
                  src={images.presence.groomParents?.url || '/images/hero.png'}
                  alt={translations.presence.groomParents}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-serif text-text-primary mb-2 text-center">
              {translations.presence.groomParents}
            </h3>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4A857] to-transparent mb-3" />
            <p className="text-[#D4A857] font-semibold tracking-wider font-sans text-sm sm:text-base text-center">
              {translations.presence.groomParentsNames}
            </p>
          </motion.div>

          {/* Bride's Parents Side */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgba(212,168,87,0.08)] border border-[#E6C98A]/30 relative group"
          >
            <div className="absolute inset-2 border border-[#E6C98A]/20 rounded-[2rem] pointer-events-none" />
            
            <div className="relative w-full max-w-[280px] aspect-[4/3] sm:aspect-[4/3] mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E6C98A] to-[#B88A3B] rounded-[1.25rem] scale-[1.03] opacity-50 group-hover:scale-105 transition-transform duration-500" />
              <div className="relative w-full h-full overflow-hidden rounded-xl border-4 border-white shadow-xl">
                <Image
                  src={images.presence.brideParents?.url || '/images/hero.png'}
                  alt={translations.presence.brideParents}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-serif text-text-primary mb-2 text-center">
              {translations.presence.brideParents}
            </h3>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4A857] to-transparent mb-3" />
            <p className="text-[#D4A857] font-semibold tracking-wider font-sans text-sm sm:text-base text-center">
              {translations.presence.brideParentsNames}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
