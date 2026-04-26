'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Maximize2, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface GalleryProps {
  translations: any;
  images: any;
}

export default function Gallery({ translations, images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const galleryItems = images.gallery || [];

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % galleryItems.length : null));
  }, [galleryItems.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null));
  }, [galleryItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  // Autoplay
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (selectedIndex !== null && isAutoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 4000); // 4 seconds per slide
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedIndex, isAutoplay, handleNext]);

  return (
    <section className="py-8 md:py-24 bg-[#FDFBF7] relative overflow-hidden" id="gallery">
      
      {/* Decorative flowers */}
      <div className="absolute top-10 right-10 w-40 h-40 opacity-[0.05] pointer-events-none">
        <Image src="/site_images/flower.png" alt="" fill className="object-contain" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Heading matching theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center gap-3 sm:gap-5 mb-16"
        >
          <div className="h-px flex-1 max-w-[40px] sm:max-w-[80px]"
            style={{ background: 'linear-gradient(to right, transparent, #D4A857)' }} />
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 opacity-60">
            <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
          </div>
          <h2 className="font-sans text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase text-text-heading font-semibold text-center whitespace-nowrap">
            {translations.gallery.title}
          </h2>
          <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 opacity-60"
            style={{ transform: 'scaleX(-1)' }}>
            <Image src="/site_images/flower2.png" alt="" fill className="object-contain" />
          </div>
          <div className="h-px flex-1 max-w-[40px] sm:max-w-[80px]"
            style={{ background: 'linear-gradient(to left, transparent, #D4A857)' }} />
        </motion.div>

        {/* Mosaic/Masonry Grid */}
        <div className="columns-2 sm:columns-2 lg:columns-3 gap-3 sm:gap-6 space-y-3 sm:space-y-6">
          {galleryItems.map((item: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative group cursor-pointer overflow-hidden rounded-[2rem] break-inside-avoid border border-[#E6C98A]/30 shadow-md hover:shadow-xl transition-all duration-500"
              onClick={() => {
                setSelectedIndex(index);
                setIsAutoplay(true); // Restart autoplay on click
              }}
            >
              <Image
                src={item.url}
                alt={item.caption || 'Gallery Image'}
                width={800}
                height={1200}
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-105"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#B88A3B]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="bg-[#FDFBF7]/90 backdrop-blur-md p-4 rounded-full shadow-lg transform transition-transform duration-500 scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                  <Maximize2 className="text-[#B88A3B] w-6 h-6" />
                </div>
                
                {item.caption && (
                  <div className="absolute bottom-6 left-0 right-0 text-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <p className="font-serif text-white text-lg tracking-wide drop-shadow-md">{item.caption}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Carousel */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Top Bar Controls */}
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex items-center gap-4 z-50">
              <button 
                className="text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all"
                onClick={(e) => { e.stopPropagation(); setIsAutoplay(!isAutoplay); }}
                title={isAutoplay ? "Pause Autoplay" : "Start Autoplay"}
              >
                {isAutoplay ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <button 
                className="text-white/70 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all bg-white/5"
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Arrows */}
            <button 
              className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all z-50"
              onClick={(e) => { e.stopPropagation(); handlePrev(); setIsAutoplay(false); }} // Pause on manual nav
            >
              <ChevronLeft className="w-8 h-8 sm:w-12 sm:h-12" />
            </button>
            
            <button 
              className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 hover:bg-white/10 rounded-full transition-all z-50"
              onClick={(e) => { e.stopPropagation(); handleNext(); setIsAutoplay(false); }} // Pause on manual nav
            >
              <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12" />
            </button>

            {/* Progress Bar for Autoplay */}
            {isAutoplay && (
              <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full z-50">
                 <motion.div 
                   key={selectedIndex}
                   initial={{ width: "0%" }}
                   animate={{ width: "100%" }}
                   transition={{ duration: 4, ease: "linear" }}
                   className="h-full bg-[#D4A857]"
                 />
              </div>
            )}

            {/* Image Container with Crossfade */}
            <div 
              className="relative w-full max-w-6xl h-full max-h-[85vh] flex flex-col items-center justify-center" 
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.97, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.03, filter: 'blur(4px)' }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={galleryItems[selectedIndex].url}
                    alt={galleryItems[selectedIndex].caption || 'Gallery preview'}
                    fill
                    className="object-contain"
                    priority
                  />
                  
                  {/* Caption */}
                  {galleryItems[selectedIndex].caption && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10"
                    >
                      <p className="text-[#FAF0DC] font-serif text-lg sm:text-xl tracking-wide whitespace-nowrap">
                        {galleryItems[selectedIndex].caption}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
