'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import siteConfig from '@/config/siteConfig.json';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const isBookingPage = pathname === '/book-appointment';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = ['home', 'services', 'about', 'testimonials', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      }) || 'home';
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Ana Sayfa', href: '/', id: 'home' },
    { name: 'Hizmetler', href: '#services', id: 'services' },
    { name: 'Hakkımızda', href: '#about', id: 'about' },
    { name: 'Yorumlar', href: '#testimonials', id: 'testimonials' },
    { name: 'Klinik', href: '/clinic', id: 'clinic' },
    { name: 'İletişim', href: '#contact', id: 'contact' },
  ];

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(siteConfig.contact.section.whatsappMessage);
    const phone = siteConfig.contact.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed w-full z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-sm border-b border-gray-100'
            : isBookingPage ? 'bg-white/80 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo as Text */}
            <Link
              href="/"
              className="relative z-10 transition-transform hover:scale-105 active:scale-95"
            >
              <span
                className={`block select-none font-display font-semibold ${
                  isScrolled || isBookingPage ? 'text-gray-900' : 'text-white'
                } text-2xl md:text-3xl`}
              >
                {siteConfig.siteName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                    isScrolled || isBookingPage
                      ? activeSection === item.id
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  {item.name}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
              <Link
                href="/book-appointment"
                className={`ml-2 px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isScrolled || isBookingPage
                    ? 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800'
                    : 'bg-white text-primary-600 hover:bg-white/90 active:bg-white/80'
                }`}
              >
                {siteConfig.navigation?.cta?.text || 'Randevu Al'}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative z-40 p-2 -mr-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2.5 bg-gray-900' : ''
                  } ${isScrolled || isBookingPage ? 'bg-gray-900' : 'bg-white'}`}
                />
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 bg-gray-900' : 'opacity-100'
                  } ${isScrolled || isBookingPage ? 'bg-gray-900' : 'bg-white'}`}
                />
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2 bg-gray-900' : ''
                  } ${isScrolled || isBookingPage ? 'bg-gray-900' : 'bg-white'}`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-gray-900/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-lg flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col p-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-3 text-base transition-colors ${
                      activeSection === item.id
                        ? 'text-primary-600 font-medium'
                        : 'text-gray-600 hover:text-primary-600'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/book-appointment"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 px-6 py-3 bg-primary-600 text-white text-center rounded-lg font-medium hover:bg-primary-700 active:bg-primary-800 transition-colors"
                >
                  {siteConfig.navigation?.cta?.text || 'Randevu Al'}
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleWhatsAppClick();
                  }}
                  className="mt-3 px-6 py-3 bg-[#25D366] text-white text-center rounded-lg font-medium hover:bg-[#22c35e] active:bg-[#1fb055] transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {siteConfig.contact.section.whatsappButtonText}
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
