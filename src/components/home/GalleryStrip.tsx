'use client'

import Image from 'next/image';

const images = [
  '/images/dental_interior.jpg',
  '/images/main_bg_image.jpg',
  '/images/general_dentistry.jpg',
  '/images/cosmetic_dentistry.jpg',
  '/images/orthodontics.webp',
];

export default function GalleryStrip() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Klinikten Kareler</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {images.map((src) => (
            <div key={src} className="relative h-40 w-64 rounded-xl overflow-hidden snap-center shadow-sm">
              <Image src={src} alt="Clinic" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
