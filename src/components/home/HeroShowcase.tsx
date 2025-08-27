'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';
import siteConfig from '@/config/siteConfig.json';

export default function HeroShowcase() {
  const { hero } = siteConfig;

  return (
    <section id="home" className="relative min-h-[88vh] md:min-h-screen overflow-hidden">
      {/* Background image with gentle zoom-in */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute inset-0 -z-10"
      >
        <Image src={hero.image} alt={hero.imageAlt} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-black/10" />
      </motion.div>

      {/* Soft gradient blobs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="pointer-events-none absolute inset-0 -z-0"
      >
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-400/25 blur-3xl" />
        <div className="absolute right-[-6rem] bottom-[-6rem] h-96 w-96 rounded-full bg-primary-200/30 blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 md:pt-40">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-white/90 text-xs backdrop-blur"
        >
          {hero.welcomeText}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-4xl md:text-6xl font-display font-semibold text-white leading-tight"
        >
          {hero.title} <span className="text-primary-300">{hero.subtitle}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-4 max-w-2xl text-lg text-white/85"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 flex items-center gap-4"
        >
          <a href={hero.cta.primary.link} className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-white font-medium hover:bg-primary-700">{hero.cta.primary.text}</a>
          <a href="#services" className="inline-flex items-center rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-white/90 font-medium backdrop-blur hover:bg-white/20">{hero.cta.secondary.text}</a>
        </motion.div>
      </div>

      {/* Floating chips */}
      <FloatingChip className="left-8 top-24" text="Hijyen 100%" />
      <FloatingChip className="right-8 md:right-16 top-40" text="Ağrısız Tedavi" delay={0.25} />
      <FloatingChip className="left-1/2 -translate-x-1/2 bottom-20" text="Randevu 24/7" delay={0.5} />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80"
      >
        <div className="w-6 h-10 border-2 border-white/70 rounded-full p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-2 h-2 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

function FloatingChip({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: [0, -10, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, repeatType: 'mirror' }}
      className={`absolute select-none rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur ${className}`}
    >
      {text}
    </motion.div>
  );
}
