'use client'

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialCard from './TestimonialCard';
import siteConfig from '@/config/siteConfig.json';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const testimonials = siteConfig.testimonials;
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalPages]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  };

  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4"
          >
            What Our Patients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Read about the experiences of our satisfied patients and their journey to a perfect smile.
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className={`${isMobile ? 'h-[420px]' : 'h-[380px]'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`grid ${
                  isMobile
                    ? 'grid-cols-1 max-w-md mx-auto'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                } gap-8 h-full`}
              >
                {testimonials
                  .slice(
                    currentIndex * itemsPerPage,
                    currentIndex * itemsPerPage + itemsPerPage
                  )
                  .map((testimonial, index) => (
                    <TestimonialCard
                      key={testimonial.id}
                      name={testimonial.name}
                      comment={testimonial.comment}
                      rating={testimonial.rating}
                      image={testimonial.image}
                      delay={index}
                    />
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  currentIndex === index
                    ? 'bg-primary-600'
                    : 'bg-gray-300 hover:bg-primary-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none">
            <button
              onClick={handlePrevious}
              className="pointer-events-auto transform -translate-x-4 lg:-translate-x-12 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Previous testimonials"
            >
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto transform translate-x-4 lg:translate-x-12 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Next testimonials"
            >
              <svg
                className="w-6 h-6 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
