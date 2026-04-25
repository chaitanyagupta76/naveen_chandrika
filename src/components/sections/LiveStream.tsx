'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface LiveStreamProps {
  translations: any;
  images: any;
}

export default function LiveStream({ translations, images }: LiveStreamProps) {
  return (
    <section className="py-12 md:py-24 bg-background-main relative overflow-hidden" id="reception">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-text-primary mb-4">
              {translations.livestream.title}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-primary" />
              <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
              <div className="h-[1px] w-12 bg-primary" />
            </div>
          </div>

          <div className="relative group">
            {/* Decorative Frame */}
            <div className="absolute -inset-6 border-2 border-primary/20 rounded-[2.5rem] pointer-events-none group-hover:border-primary/40 transition-colors" />
            
            {/* Video Container */}
            <div className="relative aspect-video w-full bg-text-primary rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/10">
              <div className="absolute inset-0 flex items-center justify-center">
                 <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    className="w-full h-full"
                    title="Live Stream"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
              </div>
            </div>

            {/* Float Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 opacity-30 pointer-events-none">
              <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="bg-primary text-white px-10 py-4 rounded-full font-sans font-semibold hover:bg-text-primary transition-all shadow-xl flex items-center gap-3 mx-auto">
              <Play className="w-5 h-5 fill-current" />
              {translations.livestream.button}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
