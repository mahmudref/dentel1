'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import {
  FaTeeth,
  FaTooth,
  FaStar,
  FaShieldAlt,
  FaEye,
  FaCut,
  FaBaby,
  FaCrown
} from 'react-icons/fa';

interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
  image: string;
  procedures: string[];
  color: string;
}

const categories: ServiceCategory[] = [
  {
    id: 'implants',
    title: 'زراعة الأسنان',
    description: 'زراعة متقدمة للأسنان المفقودة باستخدام أحدث التقنيات',
    icon: FaCrown,
    gradient: 'from-blue-500 to-blue-700',
    image: '/images/dental-implant.jpg',
    procedures: ['زراعة فورية', 'زراعة تقليدية', 'زراعة كاملة للفك'],
    color: 'blue'
  },
  {
    id: 'fillings',
    title: 'حشوات الأسنان',
    description: 'حشوات تجميلية وعلاجية بمواد عالية الجودة',
    icon: FaTooth,
    gradient: 'from-emerald-500 to-emerald-700',
    image: '/images/dental-filling.jpg',
    procedures: ['حشوات تجميلية', 'حشوات الأملغم', 'حشوات الراتنج'],
    color: 'emerald'
  },
  {
    id: 'orthodontics',
    title: 'تقويم الأسنان',
    description: 'تقويم حديث لأسنان ��ميلة ومرتبة',
    icon: FaTeeth,
    gradient: 'from-purple-500 to-purple-700',
    image: '/images/orthodontics.jpg',
    procedures: ['تقويم شفاف', 'تقويم معدني', 'تقويم متحرك'],
    color: 'purple'
  },
  {
    id: 'whitening',
    title: 'تبييض الأسنان',
    description: 'تبييض احترافي لابتسامة مشرقة',
    icon: FaStar,
    gradient: 'from-yellow-500 to-yellow-700',
    image: '/images/teeth-whitening.jpg',
    procedures: ['تبييض بالليزر', 'تبييض منزلي', 'تبييض فوري'],
    color: 'yellow'
  },
  {
    id: 'root-canal',
    title: 'علاج الجذور',
    description: 'علاج حديث وغير مؤلم لجذور الأسنان',
    icon: FaShieldAlt,
    gradient: 'from-red-500 to-red-700',
    image: '/images/root-canal.jpg',
    procedures: ['علاج العصب', 'إعادة علاج الجذور', 'حشو الجذور'],
    color: 'red'
  },
  {
    id: 'surgery',
    title: 'جراحة الفم',
    description: 'جراحات متقدمة للفم والفكين',
    icon: FaCut,
    gradient: 'from-indigo-500 to-indigo-700',
    image: '/images/oral-surgery.jpg',
    procedures: ['قلع الأسنان', 'زراعة العظم', 'جراحة اللثة'],
    color: 'indigo'
  },
  {
    id: 'pediatric',
    title: 'طب أسنان الأطفال',
    description: 'رعاية خاصة لأسنان الأطفال',
    icon: FaBaby,
    gradient: 'from-pink-500 to-pink-700',
    image: '/images/pediatric-dentistry.jpg',
    procedures: ['فحص دوري', 'علاج التسوس', 'التقويم المبكر'],
    color: 'pink'
  },
  {
    id: 'cosmetic',
    title: 'التجميل والتركيبات',
    description: 'تجميل الأسنان وتركيبات عالية الجودة',
    icon: FaEye,
    gradient: 'from-teal-500 to-teal-700',
    image: '/images/cosmetic-dentistry.jpg',
    procedures: ['فينير', 'تيجان', 'جسور'],
    color: 'teal'
  }
];

interface ProfessionalCategoriesProps {
  variant?: 'carousel' | 'grid' | 'cards';
}

export default function ProfessionalCategories({ variant = 'carousel' }: ProfessionalCategoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Responsive visible cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
    setIsAutoPlaying(false);
  };

  const getVisibleCategories = () => {
    const result = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % categories.length;
      result.push(categories[index]);
    }
    return result;
  };

  if (variant === 'carousel') {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              مجالات خدماتنا
              <span className="block text-primary-600 text-2xl md:text-3xl mt-2">المتخصصة</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              نقدم مجموعة شاملة من الخدمات الطبية المتخصصة باستخدام أحدث التقنيات والأساليب العلاجية
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-primary-600 hover:scale-110"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-primary-600 hover:scale-110"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Cards Container */}
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
                <AnimatePresence mode="wait">
                  {getVisibleCategories().map((category, index) => (
                    <motion.div
                      key={`${category.id}-${currentIndex}-${index}`}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:scale-105"
                      onMouseEnter={() => setIsAutoPlaying(false)}
                      onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                      
                      {/* Content */}
                      <div className="relative p-8">
                        {/* Icon */}
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <category.icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                          {category.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {category.description}
                        </p>

                        {/* Procedures List */}
                        <ul className="space-y-2 mb-6">
                          {category.procedures.map((procedure, procIndex) => (
                            <motion.li
                              key={procIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (index * 0.1) + (procIndex * 0.05) }}
                              className="flex items-center text-sm text-gray-700"
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} mr-3`}></div>
                              {procedure}
                            </motion.li>
                          ))}
                        </ul>

                        {/* Learn More Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-full py-3 px-6 bg-gradient-to-r ${category.gradient} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0`}
                        >
                          تعرف على المزيد
                        </motion.button>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-12 space-x-2">
              {categories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Grid Layout variant
  if (variant === 'grid') {
    return (
      <section className="py-20 bg-white relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-primary-50/30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              خدماتنا المتخصصة
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              اكتشف مجموعة شاملة من العلاجات الطبية المتقدمة
            </p>
          </motion.div>

          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100"
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-all duration-500`}></div>

                {/* Content */}
                <div className="relative p-6">
                  {/* Icon Container */}
                  <div className="flex justify-center mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <category.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Procedures Count */}
                  <div className="text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${category.gradient} text-white`}>
                      {category.procedures.length} إجراءات متخصصة
                    </span>
                  </div>

                  {/* Hover Details */}
                  <div className="absolute inset-x-0 bottom-0 bg-white border-t border-gray-100 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="space-y-1">
                      {category.procedures.slice(0, 3).map((procedure, procIndex) => (
                        <div key={procIndex} className="flex items-center text-xs text-gray-600">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.gradient} mr-2`}></div>
                          {procedure}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated Border */}
                <div className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:${category.gradient} rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-30`}></div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <span>استكشف جميع خدماتنا</span>
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  // Cards Layout variant - Premium Design
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-primary-50/20 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 bg-primary-100 text-primary-600 text-sm font-semibold rounded-full mb-4"
          >
            ✨ خدماتنا المتميزة
          </motion.span>

          <h2 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6 leading-tight">
            مجالات التخصص
            <span className="block text-primary-600 text-3xl md:text-4xl mt-3">في مركزنا الطبي</span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            نجمع بين الخبرة الطبية العريقة والتقنيات الحديثة لنقدم لك أفضل مستوى من الرعاية الصحية
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}></div>

              {/* Content Container */}
              <div className="relative p-8 lg:p-10">
                {/* Header Section */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                      {category.title}
                    </h3>
                  </div>

                  {/* Number Badge */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  {category.description}
                </p>

                {/* Procedures List */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    الإجراءات المتاحة:
                  </h4>

                  <div className="grid grid-cols-1 gap-3">
                    {category.procedures.map((procedure, procIndex) => (
                      <motion.div
                        key={procIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index * 0.15) + (procIndex * 0.1) }}
                        className="flex items-center group/item"
                      >
                        {/* Animated Bullet */}
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.gradient} mr-4 group-hover/item:scale-125 transition-transform duration-200`}></div>

                        {/* Procedure Text */}
                        <span className="text-gray-700 font-medium group-hover/item:text-gray-900 transition-colors duration-200">
                          {procedure}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-1 py-4 px-6 bg-gradient-to-r ${category.gradient} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300`}
                  >
                    احجز استشارة
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-4 px-6 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-600 transition-all duration-300"
                  >
                    تعرف على المزيد
                  </motion.button>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.gradient} opacity-10 transform rotate-45 translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-500`}></div>

              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 max-w-4xl mx-auto border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              هل تحتاج إلى استشارة شخصية؟
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              فريقنا الطبي المتخصص جاهز لتقديم أفضل النصائح والعلاج المناسب لحالتك
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                احجز موعدك الآن
                <ChevronLeftIcon className="w-5 h-5 mr-3" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 border-2 border-primary-200 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300"
              >
                اتصل بنا مجاناً
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
