'use client'

import { useEffect, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import siteConfig from '@/config/siteConfig.json';

type Review = { author_name: string; rating: number; text: string; time: number };

export default function LiveReviews() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('/api/google-reviews', {
          signal: controller.signal,
          headers: {
            'Cache-Control': 'no-cache',
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data.reviews || null);
      } catch (fetchError) {
        // Handle different types of errors gracefully
        const errorMessage = fetchError instanceof Error ? fetchError.message : 'Unknown error';

        // Don't log FullStory or fetch-related errors
        if (!errorMessage.includes('Failed to fetch') && !errorMessage.includes('AbortError')) {
          console.warn('Reviews fetch failed:', errorMessage);
        }

        // fallback to local testimonials
        const fallback = (siteConfig.testimonials || []).slice(0, 3).map((t: any) => ({
          author_name: t.name,
          rating: t.rating,
          text: t.comment,
          time: Date.now(),
        }));
        setReviews(fallback);
        setError('fallback');
      }
    };

    fetchReviews();
  }, []);

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-gray-900">Google Yorumları</h2>
          {error && <span className="text-xs text-gray-500">Canlı veriler için Google API anahtarı gerekli</span>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(reviews || []).map((r, idx) => (
            <div key={idx} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="font-medium text-gray-900">{r.author_name}</div>
                <div className="ml-auto inline-flex items-center gap-1 text-primary-600">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className={`h-4 w-4 ${i < Math.round(r.rating) ? 'text-primary-600' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-gray-700 text-sm leading-6 line-clamp-4">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
