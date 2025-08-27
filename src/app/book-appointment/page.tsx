'use client'

import { motion } from 'framer-motion';
import Header from '@/components/Header';
import siteConfig from '@/config/siteConfig.json';

export default function BookAppointment() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 mb-4"
              >
                {siteConfig.bookAppointment.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-gray-600"
              >
                {siteConfig.bookAppointment.description}
              </motion.p>
            </div>

            {/* Appointment Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                <iframe
                  src={siteConfig.contact.googleFormsUrl}
                  width="100%"
                  height="800px"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                >
                  Loading...
                </iframe>
              </div>
            </motion.div>

            {/* Alternative Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 text-center"
            >
              <p className="text-gray-600 mb-4">
                Prefer to book over the phone? Call us at{' '}
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-primary-600 font-medium hover:text-primary-700"
                >
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="text-gray-600">
                Or send us a message on{' '}
                <button
                  onClick={() => {
                    const message = encodeURIComponent('Hi! I would like to schedule an appointment.');
                    window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${message}`, '_blank');
                  }}
                  className="text-green-600 font-medium hover:text-green-700"
                >
                  WhatsApp
                </button>
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
