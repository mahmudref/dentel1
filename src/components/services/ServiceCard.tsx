'use client'

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp } from '@/utils/theme';
import siteConfig from '@/config/siteConfig.json';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  delay?: number;
}

export default function ServiceCard({ title, description, icon, features, delay = 0 }: ServiceCardProps) {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const iconPath = siteConfig.services.icons[icon as keyof typeof siteConfig.services.icons]?.path;

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      transition={{ delay: delay * 0.2 }}
      className="group relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
    >
      {/* Service Icon */}
      <div className="w-12 h-12 mb-4 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 group-hover:bg-primary-100 transition-colors">
        {iconPath && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        )}
      </div>

      {/* Service Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-4">
        {description}
      </p>

      {/* Features List */}
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <svg
              className="h-4 w-4 text-primary-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500 rounded-xl transition-colors duration-300" />
    </motion.div>
  );
}
