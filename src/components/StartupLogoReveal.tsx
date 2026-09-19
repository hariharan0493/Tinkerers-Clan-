import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StartupLogoRevealProps {
  onComplete: () => void;
  durationMs?: number;
}

export function StartupLogoReveal({ onComplete, durationMs = 1800 }: StartupLogoRevealProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Schedule fade-out after hold time
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, durationMs - 400); // 400ms for exit animation

    const completeTimer = setTimeout(() => {
      onComplete();
    }, durationMs);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [durationMs, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key="startup-reveal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#070D26] select-none"
          style={{ willChange: 'opacity' }}
          onClick={() => {
            setIsVisible(false);
            setTimeout(onComplete, 200);
          }}
        >
          {/* Subtle atmospheric ambient glow to frame the logo cleanly */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none" />

          {/* Logo Container - maintaining exact proportions without distortion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 w-[240px] sm:w-[300px] md:w-[340px] max-w-[85vw] p-4 flex items-center justify-center"
          >
            <img
              src="/team-logo.svg"
              alt="Tinkerers Clan Team Logo"
              className="w-full h-auto object-contain max-h-[70vh] drop-shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
              referrerPolicy="no-referrer"
              width="400"
              height="340"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
