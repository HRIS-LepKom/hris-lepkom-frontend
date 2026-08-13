import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { staggerContainer, staggerItem } from '../animations';
import { stages } from '../data';

/** Palet warna per kartu — berurutan, playful tapi konsisten. */
const cardPalettes = [
  { number: 'from-lepkom-green to-emerald-500', chip: 'bg-lepkom-green/10 text-lepkom-green', bar: 'bg-gradient-to-r from-lepkom-green to-emerald-500', check: 'bg-lepkom-green/10 text-lepkom-green', hover: 'hover:border-lepkom-green/40' },
  { number: 'from-amber-500 to-orange-500', chip: 'bg-amber-500/12 text-amber-600', bar: 'bg-gradient-to-r from-amber-400 to-orange-400', check: 'bg-amber-500/12 text-amber-500', hover: 'hover:border-amber-400/50' },
  { number: 'from-sky-500 to-blue-500', chip: 'bg-sky-500/12 text-sky-600', bar: 'bg-gradient-to-r from-sky-400 to-blue-400', check: 'bg-sky-500/12 text-sky-500', hover: 'hover:border-sky-400/50' },
  { number: 'from-violet-500 to-purple-500', chip: 'bg-violet-500/12 text-violet-600', bar: 'bg-gradient-to-r from-violet-400 to-purple-400', check: 'bg-violet-500/12 text-violet-500', hover: 'hover:border-violet-400/50' },
  { number: 'from-rose-500 to-pink-500', chip: 'bg-rose-500/12 text-rose-600', bar: 'bg-gradient-to-r from-rose-400 to-pink-400', check: 'bg-rose-500/12 text-rose-500', hover: 'hover:border-rose-400/50' },
  { number: 'from-teal-500 to-cyan-500', chip: 'bg-teal-500/12 text-teal-600', bar: 'bg-gradient-to-r from-teal-400 to-cyan-400', check: 'bg-teal-500/12 text-teal-500', hover: 'hover:border-teal-400/50' },
];

export const StagesSection: React.FC = () => {
  return (
    <section
      id="tahapan"
      className="py-20 md:py-28 bg-white scroll-mt-16"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tahapan Seleksi"
          title="Tahapan Seleksi"
          description="Urutan dan jumlah tahapan dapat berbeda setiap periode, ditentukan oleh panitia saat periode dibuka."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {stages.map((stage, i) => {
            const palette = cardPalettes[i % cardPalettes.length];
            return (
              <motion.div
                key={stage.number}
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className={`group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 pt-7 shadow-sm ${palette.hover} hover:shadow-lg transition-all duration-300`}
              >
                {/* Bar warna atas */}
                <span className={`absolute left-0 top-0 h-1.5 w-full ${palette.bar}`} />
                <div className="flex items-start justify-between mb-4">
                  <span
                    className={`bg-gradient-to-br ${palette.number} bg-clip-text text-transparent text-5xl font-extrabold tracking-tight transition-transform duration-300 group-hover:scale-110 origin-left`}
                  >
                    {stage.number}
                  </span>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full ${palette.check}`}>
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </div>
                <h3 className="text-lg font-bold text-lepkom-blue leading-snug mb-2">
                  {stage.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {stage.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};