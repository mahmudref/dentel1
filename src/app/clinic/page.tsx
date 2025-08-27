'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SparklesIcon, FunnelIcon, UserGroupIcon, StarIcon, BeakerIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import siteConfig from '@/config/siteConfig.json';

import doctorsData from '@/config/doctors.json';

type Doc = { name: string; specialty: string; experience: number; image: string };

type Equip = { title: string; description: string; image: string };

type GalleryItem = { src: string; category: 'Klinik' | 'Ekipman' | 'Başarı'; };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45 } }),
};

export default function ClinicPage() {
  const [activeTab, setActiveTab] = useState<'doktorlar' | 'ekipmanlar' | 'galeri'>('doktorlar');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [specFilter, setSpecFilter] = useState<string>('Tümü');
  const [galeriFilter, setGaleriFilter] = useState<'Tümü' | 'Klinik' | 'Ekipman' | 'Başarı'>('Tümü');

  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const docScrollRef = useRef<HTMLDivElement | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);

  const doctors: Doc[] = (doctorsData as any[]).map((d) => ({
    name: d.name,
    specialty: d.specialty || d.role || 'Doktor',
    experience: d.experience ?? d.exp ?? 0,
    image: d.image,
  }));

  const equipment: Equip[] = [
    { title: 'Dijital Röntgen Sistemi', description: 'Düşük radyasyonla yüksek doğrulukta teşhis ve planlama.', image: '/images/general_dentistry.jpg' },
    { title: 'İntraoral Tarayıcı', description: 'Klasik ölçü almadan konforlu ve hassas 3D taramalar.', image: '/images/cosmetic_dentistry.jpg' },
    { title: 'Sterilizasyon Ünitesi', description: 'Tıbbi sınıf sterilizasyon ile maksimum hijyen ve güvenlik.', image: '/images/orthodontics.webp' },
    { title: 'LED Beyazlatma Lambası', description: 'Hızlı ve etkili beyazlatma, minimum hassasiyet.', image: '/images/main_bg_image.jpg' },
    { title: 'Operasyon Mikroskobu', description: 'Karmaşık işlemlerde üst düzey hassasiyet.', image: '/images/dental_interior.jpg' },
    { title: 'Ultrasonik Cihaz', description: 'Nazik ama etkili diş taşı temizliği.', image: '/images/general_dentistry.jpg' },
  ];

  const gallery: GalleryItem[] = [
    { src: '/images/dental_interior.jpg', category: 'Klinik' },
    { src: '/images/main_bg_image.jpg', category: 'Klinik' },
    { src: '/images/general_dentistry.jpg', category: 'Ekipman' },
    { src: '/images/cosmetic_dentistry.jpg', category: 'Başarı' },
    { src: '/images/orthodontics.webp', category: 'Ekipman' },
    { src: '/images/general_dentistry.jpg', category: 'Başarı' },
    { src: '/images/dental_interior.jpg', category: 'Klinik' },
  ];

  const specs = useMemo(() => ['Tümü', ...Array.from(new Set(doctors.map(d => d.specialty)))], [doctors]);

  useEffect(() => {
    const ids = ['doktorlar', 'ekipmanlar', 'galeri'];
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveTab(visible.target.id as any);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.25, 0.5, 0.75] }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      sectionsRef.current[id] = el;
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: 'doktorlar' | 'ekipmanlar' | 'galeri') => {
    const el = sectionsRef.current[id];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const filteredDoctors = useMemo(
    () => (specFilter === 'Tümü' ? doctors : doctors.filter(d => d.specialty === specFilter)),
    [doctors, specFilter]
  );

  const filteredGallery = useMemo(
    () => (galeriFilter === 'Tümü' ? gallery : gallery.filter(g => g.category === galeriFilter)),
    [gallery, galeriFilter]
  );

  return (
    <div className="pt-24 md:pt-28">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 bg-primary-200/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 bg-primary-400/40 blur-3xl rounded-full" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-primary-700 text-xs font-medium">
              <SparklesIcon className="h-4 w-4" /> incitanesi içinde
            </span>
            <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900">
              Doktorlarımız, Teknolojimiz ve Kliniğimiz
            </h1>
            <p className="mt-4 max-w-3xl text-gray-600">
              Uzmanlık, inovasyon ve konfor; en iyi sonuçlar için bir arada.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={<UserGroupIcon className="h-6 w-6" />} value="6B+" label="Mutlu Hasta" />
              <StatCard icon={<StarIcon className="h-6 w-6" />} value="15+" label="Toplam Yıl Deneyim" />
              <StatCard icon={<BeakerIcon className="h-6 w-6" />} value="20+" label="İleri Düzey Cihaz" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Tabs */}
      <div className="sticky top-16 md:top-20 z-20 bg-white/70 backdrop-blur border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-2 py-3 overflow-x-auto">
            {[
              { id: 'doktorlar', label: 'Doktorlar' },
              { id: 'ekipmanlar', label: 'Ekipmanlar' },
              { id: 'galeri', label: 'Galeri' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => scrollTo(t.id as any)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === t.id
                    ? 'bg-primary-600 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* DOCTORS */}
      <section id="doktorlar" className="py-14 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Doktorlarımız" subtitle="Deneyimli ve hasta odaklı ekibimizle tanışın." />

          {/* Filters */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 text-sm text-gray-600"><FunnelIcon className="h-4 w-4" /> Uzmanlık:</span>
            {specs.map((s) => (
              <button
                key={s}
                onClick={() => setSpecFilter(s)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors border ${
                  specFilter === s ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-8 relative">
            <button
              type="button"
              aria-label="Önceki"
              onClick={() => docScrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
              className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50"
            >
              <svg className="h-5 w-5 text-primary-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <div
              ref={docScrollRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 scroll-px-4"
            >
              {filteredDoctors.map((doc, idx) => (
                <motion.article
                  key={doc.name}
                  custom={idx}
                  initial={fadeUp.hidden}
                  whileInView={fadeUp.show(idx)}
                  viewport={{ once: true, margin: '-50px' }}
                  onClick={() => setSelectedDoc(doc)}
                  className="group min-w-[260px] sm:min-w-[300px] md:min-w-[360px] snap-center cursor-pointer"
                >
                  <div className="p-[1px] rounded-2xl bg-gradient-to-br from-primary-200 via-primary-400 to-primary-600">
                    <div className="relative rounded-2xl bg-white shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl bg-white">
                        <Image src={doc.image} alt={doc.name} fill className="object-contain object-center transition-transform duration-500 group-hover:scale-105 bg-white" />
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-800 shadow">{doc.experience}+ yıl</span>
                        <span className="absolute right-3 top-3 rounded-full bg-primary-600 text-white px-2.5 py-1 text-xs font-semibold shadow">{doc.specialty}</span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-900 inline-flex items-center gap-2">{doc.name}<ShieldCheckIcon className="h-4 w-4 text-primary-600" /></h3>
                        <p className="mt-1 text-gray-600">Hasta odaklı yaklaşım ve modern tedavi teknikleri.</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">Şeffaf plak</span>
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">Estetik</span>
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">Konfor</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <button className="text-sm font-medium text-primary-700 hover:text-primary-800">Detaylar</button>
                          <a href={siteConfig.navigation?.cta?.href || '/book-appointment'} className="inline-flex items-center rounded-lg bg-primary-600 px-3 py-1.5 text-sm text-white hover:bg-primary-700">Randevu</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            <button
              type="button"
              aria-label="Sonraki"
              onClick={() => docScrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
              className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-white shadow ring-1 ring-gray-200 hover:bg-gray-50"
            >
              <svg className="h-5 w-5 text-primary-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          <AnimatePresence>
            {selectedDoc && (
              <DoctorModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
            )}
          </AnimatePresence>

          {/* Before/After Slider */}
          <div className="mt-14">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Önce / Sonra</h3>
            <BeforeAfter before="/images/cosmetic_dentistry.jpg" after="/images/general_dentistry.jpg" />
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section id="ekipmanlar" className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Teknoloji ve Ekipman" subtitle="Hassasiyet, konfor ve sonuçları artıran son teknoloji çözümler." />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipment.map((item, idx) => (
              <motion.article
                key={item.title}
                custom={idx}
                initial={fadeUp.hidden}
                whileInView={fadeUp.show(idx)}
                viewport={{ once: true, margin: '-50px' }}
                className="relative overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50 shadow-sm transition-all hover:border-primary-200 hover:shadow-md"
              >
                <div className="relative aspect-[4/3]">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-gray-600">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="galeri" className="py-14 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Klinik Galerisi" subtitle="Konfor ve özen için tasarlanmış modern alanımıza bir bakış." />

          {/* Gallery Filters */}
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {(['Tümü', 'Klinik', 'Ekipman', 'Başarı'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setGaleriFilter(c)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors border ${
                  galeriFilter === c ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="mt-8 [column-fill:_balance] columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6">
            {filteredGallery.map((g, idx) => (
              <motion.button
                key={g.src + idx}
                type="button"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                onClick={() => setLightbox(g.src)}
                className="group mb-4 w-full break-inside-avoid relative overflow-hidden rounded-xl shadow-sm hover:shadow-md"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image src={g.src} alt={g.category} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-800 shadow">{g.category}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary-600 text-white p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-display font-semibold">Uzmanlarımızla randevu alın</h3>
              <p className="mt-2 text-primary-50/90">Kişiye özel bakım ve ileri teknoloji ile tanışın.</p>
            </div>
            <a href={siteConfig.navigation?.cta?.href || '/book-appointment'} className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary-700 font-medium hover:bg-white/95 active:bg-white/90 transition">
              {siteConfig.navigation?.cta?.text || 'Randevu Al'}
            </a>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="relative w-full max-w-5xl aspect-[16/9]">
              <Image src={lightbox} alt="Önizleme" fill className="object-contain" />
              <button type="button" onClick={() => setLightbox(null)} className="absolute -top-3 -right-3 rounded-full bg-white text-gray-800 shadow p-2 hover:bg-gray-100" aria-label="Kapat">✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl font-display font-bold text-gray-900">{title}</motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mt-3 text-lg text-gray-600">{subtitle}</motion.p>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-700">{icon}</div>
      <div>
        <div className="text-xl font-semibold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  );
}

function DoctorModal({ doc, onClose }: { doc: Doc; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl"
      >
        <div className="relative h-56 w-full">
          <Image src={doc.image} alt={doc.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <button onClick={onClose} aria-label="Kapat" className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-gray-800 hover:bg-white">✕</button>
          <div className="absolute bottom-3 left-4 text-white">
            <p className="text-primary-200 text-sm font-semibold">{doc.specialty}</p>
            <h3 className="text-2xl font-semibold">{doc.name}</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">{doc.experience}+ yıl deneyim</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">Hasta konforu</span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">Modern teknikler</span>
          </div>
          <p className="mt-4 text-gray-700">
            Kapsamlı muayene, kişiye özel tedavi planı ve hassas uygulamalarla sağlıklı, doğal bir gülüş hedefliyoruz.
          </p>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button onClick={onClose} className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Kapat</button>
            <a href={siteConfig.navigation?.cta?.href || '/book-appointment'} className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700">Randevu Al</a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [value, setValue] = useState(50);
  return (
    <div className="relative w-full max-w-5xl aspect-[16/9] rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
      <Image src={after} alt="Sonra" fill className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <Image src={before} alt="Önce" fill className="object-cover" />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="absolute left-0 right-0 bottom-4 mx-auto w-1/2 accent-primary-600"
        aria-label="Önce/Sonra kontrol"
      />
      <div className="absolute left-4 top-4 rounded bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-800 shadow">Önce</div>
      <div className="absolute right-4 top-4 rounded bg-white/90 px-2.5 py-1 text-xs font-semibold text-gray-800 shadow">Sonra</div>
    </div>
  );
}
