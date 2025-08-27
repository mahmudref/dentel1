'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import siteConfig from '@/config/siteConfig.json';
import { useEffect, useState, useRef } from 'react';

export default function About() {
  const { about, team } = siteConfig;
  const [isMobile, setIsMobile] = useState(false);
  const targetRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Optimize scroll-based animations
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const imageScale = useTransform(scrollYProgress, [0.2, 0.8], [0.95, 1], {
    clamp: true
  });

  return (
    <section ref={targetRef} className="relative py-20 overflow-hidden" id="about">
      {/* Simplified Background Elements */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-primary-500/10 to-transparent rounded-full blur-3xl" />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <motion.div
            initial={!isMobile ? { opacity: 0, x: -50 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.div
              style={!isMobile ? { scale: imageScale } : undefined}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={about.clinicOverview.image}
                alt={about.title}
                width={600}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
            
            {/* Experience Badge */}
            <motion.div
              initial={!isMobile ? { opacity: 0, scale: 0.8 } : false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-full p-6 shadow-xl z-20"
            >
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary-600">15+</span>
                <span className="block text-sm text-gray-600">Years of<br/>Experience</span>
              </div>
            </motion.div>

            {/* Static Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-100 rounded-full z-0" />
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary-50 rounded-full z-0" />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={!isMobile ? { opacity: 0, y: 30 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="space-y-6">
              <span className="text-primary-600 font-medium block">
                About Our Doctor
              </span>

              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900">
                {about.title}
              </h2>

              <p className="text-lg text-gray-600">
                {about.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {about.values.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={!isMobile ? { opacity: 0, y: 20 } : false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white p-4 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl"
                  >
                    <div className="text-primary-600 text-2xl font-bold mb-1">
                      {stat.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.description}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Professional Signature Section */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={team[0].image}
                        alt={team[0].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-playfair font-bold text-gray-900">{team[0].name}</h4>
                      <div className="h-4 w-px bg-primary-200"></div>
                      <p className="text-primary-600 font-medium">{team[0].role}</p>
                    </div>
                    <p className="mt-2 text-gray-600">{team[0].bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
