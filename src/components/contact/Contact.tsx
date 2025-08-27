'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import siteConfig from '@/config/siteConfig.json';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormState({
        name: '',
        email: '',
        phone: '',
        message: '',
        service: '',
      });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="relative py-20 overflow-hidden" id="contact">
      {/* Simplified Background Elements */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#f0f9ff,_transparent_70%)]" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Information */}
          <motion.div
            initial={!isMobile ? { opacity: 0, x: -30 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div>
              <span className="text-primary-600 font-medium block">
                Contact Us
              </span>
              
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mt-2">
                Get in Touch with Us
              </h2>

              <p className="text-lg text-gray-600 mt-4">
                Have questions or ready to schedule your appointment? We&apos;re here to help you achieve your perfect smile.
              </p>
            </div>

            <div className="space-y-6">
              {/* Contact Items */}
              {[
                { icon: 'location', title: 'Visit Us', content: siteConfig.contact.address },
                { icon: 'phone', title: 'Call Us', content: siteConfig.contact.phone },
                { icon: 'email', title: 'Email Us', content: siteConfig.contact.email },
                { icon: 'clock', title: 'Opening Hours', content: siteConfig.contact.hours },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={!isMobile ? { opacity: 0, y: 20 } : false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <ContactIcon icon={item.icon} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={!isMobile ? { opacity: 0, x: 30 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl relative z-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  />
                </div>

                {/* Service Selection
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formState.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    required
                  >
                    <option value="">Select a service</option>
                    {siteConfig.services.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:w-auto px-8 py-3 bg-primary-600 text-white rounded-lg font-medium transition-all duration-200
                      ${isSubmitting ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'}`}
                    whileHover={!isMobile ? { scale: 1.02 } : undefined}
                    whileTap={!isMobile ? { scale: 0.98 } : undefined}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                  <button
                    type="button"
                    onClick={() => {
                      const message = encodeURIComponent(siteConfig.contact.section.whatsappMessage);
                      const phone = siteConfig.contact.phone.replace(/[^0-9]/g, '');
                      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                    }}
                    className="w-full sm:w-auto px-8 py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#22c35e] active:bg-[#1fb055] transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {siteConfig.contact.section.whatsappButtonText}
                  </button>
                </div>

                {/* Success Message */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center font-medium"
                  >
                    Thank you! We&apos;ll get back to you soon.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const ContactIcon = ({ icon }: { icon: string }) => {
  const iconMap: { [key: string]: React.ReactElement } = {
    location: (
      <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    phone: (
      <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    email: (
      <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    clock: (
      <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return iconMap[icon] || null;
};
