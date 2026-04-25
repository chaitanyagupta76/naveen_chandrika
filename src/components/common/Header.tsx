'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'Couple',   href: '#couple' },
  { label: 'Venue',    href: '#venue' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Gallery',  href: '#gallery' },
  { label: 'RSVP',     href: '#presence' },
];

export default function Header({ lang, translations }: { lang: string; translations: any }) {
  const pathname = usePathname();
  const nextLang = lang === 'en' ? 'te' : 'en';
  const newPath = `${pathname}?lang=${nextLang}`;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const groomInitial = translations?.brideGroom?.groom ? Array.from(translations.brideGroom.groom as string)[0] : 'A';
  const brideInitial = translations?.brideGroom?.bride ? Array.from(translations.brideGroom.bride as string)[0] : 'B';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background-main/95 backdrop-blur-md shadow-md border-b border-primary/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className={`font-hero text-2xl tracking-widest select-none transition-colors ${
          scrolled ? 'text-primary' : 'text-primary-light'
        }`}>
          {groomInitial} &amp; {brideInitial}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-sans font-medium transition-colors tracking-wide hover:text-primary ${
                scrolled ? 'text-text-secondary' : 'text-white/90'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* Language toggle */}
          <Link
            href={newPath}
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-primary transition-colors border border-primary/30 rounded-full px-3 py-1"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className={lang === 'te' ? 'font-telugu' : 'font-sans'}>
              {lang === 'en' ? 'తెలుగు' : 'English'}
            </span>
          </Link>
        </nav>

        {/* Mobile: lang + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href={newPath}
            className="flex items-center gap-1 text-xs text-text-secondary hover:text-primary border border-primary/30 rounded-full px-2.5 py-1"
          >
            <Globe className="w-3 h-3" />
            <span className={lang === 'te' ? 'font-telugu' : 'font-sans'}>
              {lang === 'en' ? 'తెలుగు' : 'English'}
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="text-text-primary p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background-main/97 backdrop-blur-md border-t border-primary/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-base font-sans text-text-primary hover:text-primary transition-colors tracking-wide py-1 border-b border-border-base"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
