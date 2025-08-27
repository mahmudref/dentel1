'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';
import siteConfig from '@/config/siteConfig.json';

export default function Hero() {
  const { hero } = siteConfig;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </motion.div>
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-full h-full rounded-full border border-primary-500/20"
          />
        </div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full">
          <motion.div
            animate={{
              rotate: -360,
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-full h-full rounded-full border border-primary-500/10"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-primary-500 font-medium mb-4"
          >
            {hero.welcomeText}
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6"
          >
            {hero.title}{' '}
            <span className="text-primary-500">{hero.subtitle}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg text-gray-300 mb-8"
          >
            {hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={hero.cta.primary.link}
              className="px-8 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors relative overflow-hidden group"
            >
              <span className="relative z-10">{hero.cta.primary.text}</span>
              <motion.div
                className="absolute inset-0 bg-primary-700"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            {/* <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={hero.cta.secondary.link}
              className="px-8 py-3 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-gray-900 transition-colors relative overflow-hidden group"
            >
              <span className="relative z-10">{hero.cta.secondary.text}</span>
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a> */}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
            className="w-2 h-2 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
