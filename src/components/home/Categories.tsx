'use client'

import { BeakerIcon, SparklesIcon, WrenchScrewdriverIcon, ShieldCheckIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const cats = [
  { title: 'İmplant', icon: BeakerIcon },
  { title: 'Dolgu', icon: WrenchScrewdriverIcon },
  { title: 'Ortodonti', icon: AdjustmentsHorizontalIcon },
  { title: 'Diş Beyazlatma', icon: SparklesIcon },
  { title: 'Kanal Tedavisi', icon: ShieldCheckIcon },
];

export default function Categories() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">Çalışma Alanlarımız</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {cats.map((c) => (
            <div key={c.title} className="group rounded-2xl border border-gray-100 bg-gray-50 p-5 text-center shadow-sm hover:shadow-md transition-all">
              <c.icon className="h-8 w-8 mx-auto text-primary-600" />
              <div className="mt-3 font-medium text-gray-900">{c.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
