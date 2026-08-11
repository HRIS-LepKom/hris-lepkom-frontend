import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { staggerContainer, staggerItem } from '../animations';

const contactItems = [
  {
    icon: <MapPin className="h-5 w-5" />,
    title: 'Alamat',
    lines: ['Kampus Kalimalang', 'Universitas Gunadarma, Bekasi'],
    iconBox: 'bg-lepkom-green/10 text-lepkom-green',
    border: 'hover:border-lepkom-green/40',
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: 'Email',
    lines: ['lepkom@gunadarma.ac.id'],
    iconBox: 'bg-sky-500/12 text-sky-500',
    border: 'hover:border-sky-400/50',
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: 'Jam Operasional',
    lines: ['Senin – Jumat', '08.00 – 16.00 WIB'],
    iconBox: 'bg-amber-500/12 text-amber-500',
    border: 'hover:border-amber-400/50',
  },
];

const floatingShapes = [
  { className: 'top-8 left-10 h-3 w-3 bg-amber-300', delay: 0 },
  { className: 'top-16 right-16 h-2.5 w-2.5 bg-sky-300', delay: 1 },
  { className: 'bottom-12 left-1/4 h-2 w-2 bg-rose-300', delay: 0.7 },
  { className: 'bottom-20 right-1/3 h-3 w-3 bg-white/40', delay: 1.6 },
];

export const ContactSection: React.FC = () => {
  return (
    <section id="kontak" className="py-20 md:py-28 bg-white scroll-mt-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Kontak"
          title="Hubungi Kami"
          description="Punya pertanyaan lebih lanjut seputar pendaftaran dan seleksi? Jangan ragu untuk menghubungi panitia."
        />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {contactItems.map((item) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className={`rounded-2xl border border-gray-100 bg-gray-50/50 p-6 text-center ${item.border} hover:bg-white hover:shadow-lg transition-all duration-300`}
            >
              <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBox}`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              {item.lines.map((line) => (
                <p key={line} className="text-sm text-gray-600">
                  {line}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-br from-lepkom-green via-emerald-600 to-sky-600 p-8 md:p-10 text-center text-white shadow-xl shadow-green-600/20 relative overflow-hidden"
        >
          {floatingShapes.map((s, i) => (
            <motion.span
              key={i}
              aria-hidden
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
              className={`absolute rounded-full ${s.className}`}
            />
          ))}

          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-white/10 blur-2xl"
          />

          <h3 className="text-2xl md:text-3xl font-bold mb-3 relative">
            Siap Menjadi Bagian dari LepKOM?
          </h3>
          <p className="text-white/90 mb-6 max-w-xl mx-auto relative">
            Daftarkan dirimu sekarang dan ikuti seluruh rangkaian seleksi Calon
            Asisten 2026. Jangan lewatkan kesempatan ini!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative inline-block"
          >
            <Link to="/register">
              <span className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 font-bold text-lepkom-green shadow-lg hover:bg-green-50 transition-colors">
                <Sparkles className="mr-2 h-5 w-5" />
                Daftar Sekarang <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};