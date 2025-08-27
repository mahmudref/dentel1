'use client'

import { motion } from 'framer-motion';
import siteConfig from '@/config/siteConfig.json';

export default function Map() {
  return (
    <section className="relative w-full h-[400px] bg-gray-100" id="location">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full h-full"
      >
        <iframe
          src={siteConfig.contact.googleMapsUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location map"
          // className="filter grayscale"
        />
      </motion.div>
    </section>
  );
}
