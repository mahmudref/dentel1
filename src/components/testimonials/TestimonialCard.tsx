'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp } from '@/utils/theme';

interface TestimonialCardProps {
  name: string;
  comment: string;
  rating: number;
  image: string;
  delay?: number;
}

export default function TestimonialCard({
  name,
  comment,
  rating,
  image,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ delay: delay * 0.2 }}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col"
    >
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{name}</h4>
          <div className="flex items-center">
            {[...Array(rating)].map((_, i) => (
              <svg
                key={i}
                className="w-4 h-4 text-yellow-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <div className="relative flex-grow overflow-hidden">
        <p className="text-gray-600 italic line-clamp-6">&quot;{comment}&quot;</p>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>
    </motion.div>
  );
}
