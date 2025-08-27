'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';
import siteConfig from '@/config/siteConfig.json';

export default function ClinicHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-12 md:pb-16 relative">
        <div className="absolute inset-0 -z-10">
          <Image
            src={siteConfig.hero.image || '/images/main_bg_image.jpg'}
            alt={siteConfig.hero.imageAlt || 'Clinic facade'}
            fill
            priority
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/10" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-display font-bold text-gray-900 max-w-3xl"
        >
          Kliniğe Genel Bakış
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-4 text-lg text-gray-700 max-w-2xl"
        >
          incitanesi: modern teknoloji ve deneyimli hekimlerle konforlu bir tedavi deneyimi.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6"
        >
          <a href={siteConfig.navigation?.cta?.href || '/book-appointment'} className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-white font-medium hover:bg-primary-700">
            {siteConfig.navigation?.cta?.text || 'Randevu Al'}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
