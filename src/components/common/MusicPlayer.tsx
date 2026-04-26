'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const startedRef = useRef(false);           // ref-based guard (no stale closures)
  const rampIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Volume ramp: 0 → 1 over ~4 seconds (slow, cinematic feel on first load)
  const rampVolume = useCallback((durationMs = 4000) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;

    if (rampIntervalRef.current) clearInterval(rampIntervalRef.current);

    const step = 0.02;                        // increment per tick
    const interval = durationMs * step;       // ms between ticks
    rampIntervalRef.current = setInterval(() => {
      if (!audioRef.current) return;
      const next = Math.min(audioRef.current.volume + step, 1);
      audioRef.current.volume = next;
      if (next >= 1 && rampIntervalRef.current) {
        clearInterval(rampIntervalRef.current);
        rampIntervalRef.current = null;
      }
    }, interval);
  }, []);

  // Core: create Audio element & wire up autoplay triggers
  useEffect(() => {
    const audio = new Audio('/music/bgm.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    audioRef.current = audio;

    const startPlayback = () => {
      if (startedRef.current) return;
      startedRef.current = true;

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          rampVolume(4000);                   // slow ramp on initial load
        })
        .catch(() => {
          // Browser blocked — reset flag so a real gesture can retry
          startedRef.current = false;
          setIsPlaying(false);
        });
    };

    // 1) When the splash screen finishes it dispatches 'splashDone'
    window.addEventListener('splashDone', startPlayback, { once: true });

    // 2) Fallback: any user gesture unlocks audio on strict browsers
    const gestures = ['click', 'touchstart', 'keydown'] as const;
    const handleGesture = () => {
      if (!startedRef.current) {
        startPlayback();
      }
    };

    gestures.forEach((e) =>
      document.addEventListener(e, handleGesture, { passive: true })
    );

    // scroll fires on window, not document
    window.addEventListener('scroll', handleGesture, { passive: true });

    // 3) Optimistic: some browsers / PWA contexts allow immediate play
    startPlayback();

    return () => {
      window.removeEventListener('splashDone', startPlayback);
      window.removeEventListener('scroll', handleGesture);
      gestures.forEach((e) => document.removeEventListener(e, handleGesture));
      audio.pause();
      audio.src = '';
      if (rampIntervalRef.current) clearInterval(rampIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for the custom "pauseBgm" event dispatched by LiveStream
  useEffect(() => {
    const handler = () => {
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener('pauseBgm', handler);
    return () => window.removeEventListener('pauseBgm', handler);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
        // If the volume was reset (e.g. after pause), ramp again
        if (audio.volume < 0.1) rampVolume();
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  /* ── Animated equalizer bars (visible when playing) ── */
  const bars = [1, 2, 3, 4];

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <button
      id="music-player-fab"
      onClick={toggle}
      aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      className="fixed z-[9999] flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
      style={{
        bottom: '1.5rem',
        right: '1.5rem',
        width: '52px',
        height: '52px',
        background: 'linear-gradient(135deg, #E6C98A 0%, #D4A857 50%, #B88A3B 100%)',
        boxShadow: isPlaying
          ? '0 4px 20px rgba(212,168,87,0.55), 0 0 40px rgba(212,168,87,0.25)'
          : '0 4px 14px rgba(212,168,87,0.35)',
        border: '2px solid rgba(255,255,255,0.25)',
      }}
    >
      {/* Pulse ring when playing */}
      {isPlaying && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{
            background: 'rgba(212,168,87,0.25)',
            animationDuration: '2s',
          }}
        />
      )}

      {isPlaying ? (
        /* Equalizer bars */
        <div className="flex items-end gap-[3px] h-5">
          {bars.map((b) => (
            <span
              key={b}
              className="w-[3px] rounded-full"
              style={{
                background: '#5C3D00',
                animation: `eqBar 0.8s ease-in-out ${b * 0.12}s infinite alternate`,
              }}
            />
          ))}
        </div>
      ) : (
        /* Play icon (triangle) */
        <svg
          width="20"
          height="22"
          viewBox="0 0 20 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-[2px]"
        >
          <path
            d="M2 1.5L18 11L2 20.5V1.5Z"
            fill="#5C3D00"
            stroke="#5C3D00"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {/* Keyframe for equalizer */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes eqBar {
          0% { height: 4px; }
          100% { height: 18px; }
        }
      `}} />
    </button>
  );
}
