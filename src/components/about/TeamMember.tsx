'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fadeInUp } from '@/utils/theme';

interface TeamMemberProps {
  name: string;
  role: string;
  specialization: string;
  bio: string;
  image: string;
  delay?: number;
}

export default function TeamMember({
  name,
  role,
  specialization,
  bio,
  image,
  delay = 0,
}: TeamMemberProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      transition={{ delay: delay * 0.2 }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-primary-600 font-medium mb-2">{role}</p>
        <p className="text-sm text-gray-500 mb-4">{specialization}</p>
        <p className="text-gray-600">{bio}</p>

        {/* Social Links - can be added here */}
        <div className="mt-4 flex space-x-4">
          <a
            href="#"
            className="text-gray-400 hover:text-primary-600 transition-colors"
            aria-label={`${name}'s LinkedIn profile`}
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-primary-600 transition-colors"
            aria-label={`${name}'s Twitter profile`}
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
