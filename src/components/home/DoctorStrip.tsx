'use client'

import Image from 'next/image';
import { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import { motion, PanInfo, useMotionValue, AnimatePresence } from 'framer-motion';
import { ShieldCheckIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

import doctorsData from '@/config/doctors.json';

type Doc = { name: string; role: string; image: string; exp: number };

const docs: Doc[] = doctorsData.map((d: any) => ({
  name: d.name,
  role: d.specialty || d.role || 'Doktor',
  image: d.image,
  exp: d.experience ?? d.exp ?? 0,
}));

// Create infinite array for seamless looping
const createInfiniteArray = (array: Doc[], copies: number = 3) => {
  const result = [];
  for (let i = 0; i < copies; i++) {
    result.push(...array.map((item, index) => ({ ...item, id: `${i}-${index}` })));
  }
  return result;
};

// Deterministic "random" values based on index
const getDeterministicValue = (index: number, seed: number = 1) => {
  const x = Math.sin(seed * index) * 10000;
  return x - Math.floor(x);
};

export default function DoctorStrip() {
  const [currentIndex, setCurrentIndex] = useState(docs.length); // Start from middle copy
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const infiniteDocs = useMemo(() => createInfiniteArray(docs), []);
  
  // Real-time drag tracking
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if mobile and set client-side flag
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      if (newIndex >= docs.length * 2) {
        setTimeout(() => setCurrentIndex(docs.length), 0);
        return docs.length;
      }
      return newIndex;
    });
  }, [docs.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      if (newIndex < docs.length) {
        setTimeout(() => setCurrentIndex(docs.length * 2 - 1), 0);
        return docs.length * 2 - 1;
      }
      return newIndex;
    });
  }, [docs.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(docs.length + (index % docs.length));
  }, [docs.length]);

  // Real-time drag handling - follows hand movement immediately
  const handleDrag = useCallback((event: any, info: PanInfo) => {
    // Real-time feedback - carousel follows finger movement
    const sensitivity = isMobile ? 0.8 : 0.6;
    dragX.set(info.offset.x * sensitivity);
  }, [dragX, isMobile]);

  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    setIsDragging(false);
    const threshold = isMobile ? 40 : 60;
    
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        prev();
      } else {
        next();
      }
    }
    
    // Smooth return to position
    dragX.set(0);
  }, [next, prev, dragX, isMobile]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  // Real-time transform for smooth hand tracking
  const realTimeX = dragX;

  // Calculate positions with real-time drag offset
  const getCardProps = useCallback((index: number, realTimeOffset: number = 0) => {
    const diff = index - currentIndex;
    const absIndex = Math.abs(diff);
    
    // Mobile-optimized spacing and positioning with better visibility
    const spacing = isMobile ? 110 : 160;
    const translateX = (diff * spacing) + realTimeOffset;
    const translateY = absIndex * absIndex * (isMobile ? 5 : 12);
    const scale = absIndex === 0 ? 1 : absIndex === 1 ? (isMobile ? 0.8 : 0.8) : (isMobile ? 0.65 : 0.65);
    const opacity = absIndex === 0 ? 1 : absIndex === 1 ? 0.9 : absIndex === 2 ? 0.7 : 0.4;
    const zIndex = infiniteDocs.length - absIndex;
    const rotateY = (diff + realTimeOffset * 0.1) * (isMobile ? -3 : -10);
    const blur = absIndex > 3 ? 'blur-[2px]' : absIndex > 2 ? 'blur-[1px]' : '';

    return {
      translateX,
      translateY,
      scale,
      opacity,
      zIndex,
      rotateY,
      blur,
      isCenter: absIndex === 0,
      isVisible: absIndex <= (isMobile ? 3 : 3)
    };
  }, [currentIndex, infiniteDocs.length, isMobile]);

  // Get current doctor for info display
  const currentDoctor = docs[currentIndex % docs.length];

  // Don't render animations until client-side hydration is complete
  if (!isClient) {
    return (
      <section id="about" className="py-6 md:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 scroll-mt-24 sm:scroll-mt-28 overflow-hidden">
        <div className="container mx-auto px-3 sm:px-4 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between mb-4 md:mb-10">
            <h2 className="text-lg md:text-3xl font-display font-bold text-slate-900">
              Uzman Doktor Kadromuz
            </h2>
            <a 
              href="/clinic#doktorlar" 
              className="hidden sm:inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 text-sm font-medium transition-all duration-200 group"
            >
              Tüm Ekibi Görüntüle
              <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
          <div className="h-[300px] md:h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Yükleniyor...</h3>
              <p className="text-slate-600 text-sm">Doktor bilgileri hazırlanıyor</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-6 md:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50/50 scroll-mt-24 sm:scroll-mt-28 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between mb-4 md:mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg md:text-3xl font-display font-bold text-slate-900"
          >
            Uzman Doktor Kadromuz
          </motion.h2>
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href="/clinic#doktorlar" 
            className="hidden sm:inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 text-sm font-medium transition-all duration-200 group"
          >
            Tüm Ekibi Görüntüle
            <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </div>

        {/* Mobile: Real-time Hand Tracking Carousel */}
        <div className="md:hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-full"
          >
            {/* Mobile-optimized ambient background */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-48 bg-gradient-to-r from-transparent via-primary-50/20 to-transparent blur-xl pointer-events-none" />
            
            {/* Deterministic floating particles for mobile */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {[...Array(2)].map((_, i) => {
                const x = 50 + (getDeterministicValue(i, 123) * 150);
                const y = 30 + (getDeterministicValue(i, 456) * 120);
                const animX = 25 + (getDeterministicValue(i, 789) * 150);
                const animY = 20 + (getDeterministicValue(i, 101) * 130);
                
                return (
                  <motion.div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-primary-300/25 rounded-full"
                    initial={{ x, y }}
                    animate={{ 
                      y: [y, animY, y],
                      x: [x, animX, x],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ 
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                );
              })}
            </div>
            
            {/* Real-time Hand Tracking Mobile Carousel */}
            <motion.div 
              ref={containerRef}
              className="relative h-[300px] flex items-center justify-center overflow-visible touch-none select-none"
              style={{ 
                perspective: '700px',
                willChange: 'transform'
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              dragMomentum={false}
              onDrag={handleDrag}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              {infiniteDocs.map((doc, index) => {
                const dragOffset = isDragging ? realTimeX.get() : 0;
                const props = getCardProps(index, dragOffset);
                
                if (!props.isVisible) return null;

                return (
                  <motion.div
                    key={`mobile-${doc.id}`}
                    className={`absolute cursor-pointer ${props.blur}`}
                    style={{ 
                      zIndex: props.zIndex,
                      transformStyle: 'preserve-3d',
                      willChange: 'transform'
                    }}
                    animate={{
                      x: props.translateX,
                      y: props.translateY,
                      scale: props.scale,
                      opacity: props.opacity,
                      rotateY: props.rotateY,
                    }}
                    transition={{
                      type: isDragging ? "tween" : "spring",
                      stiffness: isDragging ? 0 : 400,
                      damping: isDragging ? 0 : 40,
                      duration: isDragging ? 0 : 0.4
                    }}
                    onClick={() => !isDragging && goToSlide(index % docs.length)}
                  >
                    <MobileDoctorCard doctor={doc} isActive={props.isCenter} isDragging={isDragging} index={index} />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Mobile-optimized Navigation */}
            <div className="flex items-center justify-center gap-3 mt-3">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm shadow-sm rounded-full border border-slate-200/50 hover:border-primary-300 transition-all duration-200"
              >
                <ChevronLeftIcon className="w-3 h-3 text-slate-600" />
              </motion.button>

              <div className="flex gap-1 px-2 py-1 bg-white/70 backdrop-blur-sm rounded-full shadow-sm border border-white/30">
                {docs.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === (currentIndex % docs.length)
                        ? 'bg-primary-600 w-3' 
                        : 'bg-slate-300 w-1 hover:bg-slate-400'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>

              <motion.button
                onClick={next}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-8 h-8 bg-white/90 backdrop-blur-sm shadow-sm rounded-full border border-slate-200/50 hover:border-primary-300 transition-all duration-200"
              >
                <ChevronRightIcon className="w-3 h-3 text-slate-600" />
              </motion.button>
            </div>

            {/* Mobile Active Doctor Info */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={`mobile-info-${currentIndex % docs.length}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-center mt-3 px-2"
              >
                <h3 className="text-base font-semibold text-slate-900 mb-0.5">
                  {currentDoctor.name}
                </h3>
                <p className="text-primary-600 font-medium text-sm mb-0.5">
                  {currentDoctor.role}
                </p>
                <p className="text-slate-600 text-xs">
                  {currentDoctor.exp} yıl deneyim
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Mobile Link */}
            <div className="flex justify-center mt-3">
              <a 
                href="/clinic#doktorlar" 
                className="inline-flex items-center gap-1 text-primary-700 hover:text-primary-800 text-sm font-medium transition-colors group"
              >
                Tüm Ekibi Görüntüle
                <ArrowRightIcon className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Desktop: Enhanced Infinite Arc Carousel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative hidden md:block"
        >
          {/* Enhanced ambient lighting */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-80 bg-gradient-to-r from-transparent via-primary-50/25 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent pointer-events-none" />
          
          {/* Deterministic floating particles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => {
              const x = 100 + (getDeterministicValue(i, 111) * 600);
              const y = 50 + (getDeterministicValue(i, 222) * 200);
              const scale = 0.5 + (getDeterministicValue(i, 333) * 0.5);
              const animX = 100 + (getDeterministicValue(i, 444) * 600);
              const animY = 50 + (getDeterministicValue(i, 555) * 200);
              const duration = 15 + (getDeterministicValue(i, 666) * 5);
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary-300/30 rounded-full"
                  initial={{ x, y, scale }}
                  animate={{ 
                    y: [y, animY, y],
                    x: [x, animX, x],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{ 
                    duration,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              );
            })}
          </div>
          
          {/* Desktop Real-time Tracking Carousel */}
          <motion.div 
            className="relative h-[400px] flex items-center justify-center overflow-hidden"
            style={{ perspective: '1200px' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDrag={handleDrag}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {infiniteDocs.map((doc, index) => {
              const dragOffset = isDragging ? realTimeX.get() : 0;
              const props = getCardProps(index, dragOffset);
              
              if (!props.isVisible) return null;

              return (
                <motion.div
                  key={`desktop-${doc.id}`}
                  className={`absolute cursor-pointer ${props.blur}`}
                  style={{ 
                    zIndex: props.zIndex,
                    transformStyle: 'preserve-3d'
                  }}
                  animate={{
                    x: props.translateX,
                    y: props.translateY,
                    scale: props.scale,
                    opacity: props.opacity,
                    rotateY: props.rotateY,
                  }}
                  transition={{
                    type: isDragging ? "tween" : "spring",
                    stiffness: isDragging ? 0 : 200,
                    damping: isDragging ? 0 : 25,
                    duration: isDragging ? 0 : 0.8
                  }}
                  whileHover={props.isCenter ? { 
                    scale: props.scale * 1.02,
                    y: props.translateY - 8,
                    transition: { duration: 0.3 }
                  } : {}}
                  onClick={() => !isDragging && goToSlide(index % docs.length)}
                >
                  <FloatingDoctorCard doctor={doc} isActive={props.isCenter} isDragging={isDragging} index={index} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Enhanced Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-6">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm shadow-xl rounded-full border border-slate-200/50 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 group"
              aria-label="Önceki doktor"
            >
              <ChevronLeftIcon className="w-5 h-5 text-slate-600 group-hover:text-primary-600 transition-colors" />
            </motion.button>

            {/* Enhanced dots indicator */}
            <div className="flex gap-2.5 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
              {docs.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === (currentIndex % docs.length)
                      ? 'bg-primary-600 w-8 shadow-sm' 
                      : 'bg-slate-300 w-2 hover:bg-slate-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm shadow-xl rounded-full border border-slate-200/50 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 group"
              aria-label="Sonraki doktor"
            >
              <ChevronRightIcon className="w-5 h-5 text-slate-600 group-hover:text-primary-600 transition-colors" />
            </motion.button>
          </div>

          {/* Enhanced active doctor info */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex % docs.length}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-8 max-w-md mx-auto"
            >
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                {currentDoctor.name}
              </h3>
              <p className="text-lg text-primary-600 font-medium mb-2">
                {currentDoctor.role}
              </p>
              <p className="text-slate-600 leading-relaxed">
                {currentDoctor.exp} yıl uzmanlık deneyimi ile hastaların sağlık ihtiyaçlarına kapsamlı çözümler sunmaktadır.
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function MobileDoctorCard({ doctor, isActive, isDragging, index }: { doctor: Doc; isActive: boolean; isDragging: boolean; index: number }) {
  // Deterministic animation duration based on index
  const duration = 3 + (getDeterministicValue(index, 789) * 2);
  
  return (
    <motion.div 
      className="relative group"
      animate={!isDragging ? {
        y: [0, -2, 0],
      } : {}}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{ willChange: 'transform' }}
    >
      {/* Optimized glow for mobile performance */}
      {isActive && !isDragging && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-primary-400/10 via-primary-500/15 to-primary-400/10 rounded-full blur-sm"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Mobile-optimized card sizing */}
      <div className={`relative ${
        isActive ? 'w-28 h-28' : 'w-20 h-20'
      } transition-all duration-300`}>
        
        {/* Enhanced outer ring */}
        <div className={`absolute inset-0 rounded-full p-0.5 ${
          isActive 
            ? 'bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 shadow-md' 
            : 'bg-gradient-to-br from-slate-200 to-slate-300 shadow-sm'
        }`}>
          
          {/* Inner container */}
          <div className="w-full h-full rounded-full p-0.5 bg-white/95 backdrop-blur-sm">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white shadow-inner">
              <Image 
                src={doctor.image} 
                alt={doctor.name} 
                fill 
                className="object-cover object-top" 
                sizes="(max-width: 768px) 112px, 128px"
                priority={isActive}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Compact professional badge */}
        <div className={`absolute -bottom-0.5 -right-0.5 ${
          isActive ? 'w-4 h-4' : 'w-3 h-3'
        } bg-white rounded-full shadow border border-primary-100 flex items-center justify-center transition-all duration-300`}>
          <ShieldCheckIcon className={`${
            isActive ? 'w-2 h-2' : 'w-1.5 h-1.5'
          } text-primary-600`} />
        </div>
      </div>
    </motion.div>
  );
}

function FloatingDoctorCard({ doctor, isActive, isDragging, index }: { doctor: Doc; isActive: boolean; isDragging: boolean; index: number }) {
  // Deterministic animation duration based on index
  const duration = 5 + (getDeterministicValue(index, 456) * 3);
  
  return (
    <motion.div 
      className="relative group"
      animate={!isDragging ? {
        y: [0, -8, 0],
      } : {}}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Enhanced glow effect */}
      {isActive && !isDragging && (
        <motion.div
          className="absolute -inset-6 bg-gradient-to-r from-primary-400/10 via-primary-500/20 to-primary-400/10 rounded-full blur-2xl"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
      
      {/* Main card */}
      <div className={`relative ${
        isActive ? 'w-56 h-56' : 'w-40 h-40'
      } transition-all duration-700`}>
        
        {/* Enhanced outer ring */}
        <div className={`absolute inset-0 rounded-full p-1 ${
          isActive 
            ? 'bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 shadow-2xl' 
            : 'bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 shadow-lg'
        }`}>
          
          {/* Enhanced inner ring */}
          <div className="w-full h-full rounded-full p-2 bg-white/95 backdrop-blur-sm ring-1 ring-white/50">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-white shadow-inner">
              <Image 
                src={doctor.image} 
                alt={doctor.name} 
                fill 
                className="object-cover object-top transition-transform duration-500 group-hover:scale-110" 
                sizes="(max-width: 768px) 224px, 256px"
              />
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/10 via-transparent to-transparent" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Enhanced professional badge */}
        <motion.div 
          className={`absolute -bottom-2 -right-2 ${
            isActive ? 'w-9 h-9' : 'w-7 h-7'
          } bg-white rounded-full shadow-xl border-2 ${
            isActive ? 'border-primary-200' : 'border-slate-200'
          } flex items-center justify-center transition-all duration-300`}
          whileHover={{ scale: 1.1 }}
        >
          <ShieldCheckIcon className={`${
            isActive ? 'w-4 h-4' : 'w-3 h-3'
          } text-primary-600`} />
        </motion.div>
      </div>
    </motion.div>
  );
}
