'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, X } from 'lucide-react';

export function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
        >
          <AnimatePresence>
            {expanded && (
              <>
                <motion.a
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  href="mailto:arifyeasin9109@gmail.com"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border shadow-lg text-sm font-medium hover:border-cyan-400/40 transition-colors"
                >
                  <Mail size={18} className="text-cyan-400" />
                  Email Me
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, x: 20, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.8 }}
                  transition={{ delay: 0.05 }}
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border shadow-lg text-sm font-medium hover:border-emerald-400/40 transition-colors"
                >
                  <MessageCircle size={18} className="text-emerald-400" />
                  WhatsApp
                </motion.a>
              </>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setExpanded(!expanded)}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-full bg-cyan-400 text-background flex items-center justify-center shadow-lg neon-glow hover:scale-110 transition-transform"
            aria-label="Quick contact"
          >
            <motion.div animate={{ rotate: expanded ? 135 : 0 }} transition={{ duration: 0.2 }}>
              {expanded ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
