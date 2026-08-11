import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '@/components/ui';
import { ArrowRight, CalendarCheck, GraduationCap, MapPin, Sparkles, Star, Globe, Network } from 'lucide-react';
import { staggerContainer, staggerItem } from '../animations';

const marqueeItems = [
  { icon: Star, label: 'Technical Meeting', date: '10 Agt', color: 'text-amber-500' },
  { icon: Globe, label: 'Tes Uji Praktik Program', date: '13 Agt', color: 'text-sky-500' },
  { icon: Network, label: 'Wawancara [K]', date: '14 Agt', color: 'text-violet-500' },
  { icon: Globe, label: 'Presentasi Proyek [L]', date: '18 Agt', color: 'text-sky-500' },
  { icon: Star, label: 'Pengumuman Hasil', date: '22 Agt', color: 'text-amber-500' },
];

const floatingDots = [
  { className: 'top-[18%] left-[8%] h-2.5 w-2.5 bg-amber-400', delay: 0 },
  { className: 'top-[70%] left-[12%] h-2 w-2 bg-sky-400', delay: 1.2 },
  { className: 'top-[28%] right-[10%] h-3 w-3 bg-violet-400', delay: 0.6 },
  { className: 'top-[78%] right-[18%] h-2 w-2 bg-rose-400', delay: 1.8 },
  { className: 'top-[12%] left-[42%] h-1.5 w-1.5 bg-lepkom-green', delay: 2.4 },
];

export const HeroSection: React.FC = () => {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-b from-[#EEF7F1] via-white to-white"
    >
      {/* Blob warna-warni yang bergerak pelan */}
      <motion.div
        aria-hidden
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-lepkom-green/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 35, 0], y: [0, -25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-sky-400/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 25, 0], y: [0, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-amber-400/15 blur-3xl"
      />

      {/* Titik-titik melayang */}
      {floatingDots.map((dot, i) => (
        <motion.span
          key={i}
          aria-hidden
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: dot.delay }}
          className={`absolute rounded-full ${dot.className}`}
        />
      ))}

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 py-20 md:py-28 lg:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div variants={staggerItem} className="mb-6 flex justify-center">
            <motion.span
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-lepkom-green/25 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-lepkom-green shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Open Recruitment 2026
            </motion.span>
          </motion.div>

          <motion.h1
            variants={staggerItem}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6"
          >
            <span className="text-lepkom-blue">Raih Kesempatan Menjadi </span>
            <span className="bg-gradient-to-r from-lepkom-green via-emerald-500 to-sky-500 bg-clip-text text-transparent">
              Asisten LepKOM
            </span>{' '}
            <span className="text-lepkom-blue">2026</span>
          </motion.h1>

          <motion.p
            variants={staggerItem}
            className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Lembaga Pengembangan Komputer Universitas Gunadarma membuka kesempatan bagi
            mahasiswa untuk bergabung sebagai Calon Asisten (Calas). Ikuti seluruh
            rangkaian seleksi dan jadilah bagian dari komunitas asisten yang berkembang
            di lingkungan laboratorium komputer.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-auto"
            >
              <Link to="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-lepkom-green to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold shadow-lg shadow-green-600/25 px-8 h-12 text-base"
                >
                  Daftar Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="w-full sm:w-auto"
            >
              <a href="#jadwal">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-lepkom-blue/25 bg-white text-lepkom-blue hover:bg-lepkom-blue/5 font-semibold px-8 h-12 text-base"
                >
                  Lihat Jadwal
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-lepkom-green/8 px-4 py-1.5 font-semibold text-lepkom-green">
              <CalendarCheck className="h-4 w-4" />
              10–22 Agustus 2026
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-500/8 px-4 py-1.5 font-semibold text-sky-600">
              <MapPin className="h-4 w-4" />
              Kampus Kalimalang
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 font-semibold text-amber-600">
              <GraduationCap className="h-4 w-4" />
              Mahasiswa Aktif UG
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee jadwal */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 border-y border-lepkom-green/10 bg-white/70 backdrop-blur-sm py-3 overflow-hidden"
      >
        <div className="flex w-max animate-marquee gap-8">
          {[...marqueeItems, ...marqueeItems].map((item, i) => {
            const Icon = item.icon;
            return (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 whitespace-nowrap"
              >
                <Icon className={`h-4 w-4 ${item.color}`} />
                {item.label}
                <span className="text-gray-400 font-medium">{item.date}</span>
                <span className="ml-4 text-gray-300">•</span>
              </span>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};