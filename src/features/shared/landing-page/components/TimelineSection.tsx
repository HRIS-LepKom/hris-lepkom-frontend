import React from 'react';
import { motion } from 'motion/react';
import { SectionHeading } from './SectionHeading';
import { fadeUp, staggerContainer, staggerItem } from '../animations';
import { timelineLeft, timelineRight, type TimelineItem, type TimelineCategory } from '../data';

/** Warna per kategori — konsisten di seluruh section. */
const categoryStyles: Record<TimelineCategory, { iconBox: string; dateChip: string; border: string; accent: string }> = {
  meeting: {
    iconBox: 'bg-amber-500/12 text-amber-500',
    dateChip: 'bg-amber-500/10 text-amber-600',
    border: 'hover:border-amber-400/50',
    accent: 'bg-amber-400',
  },
  exam: {
    iconBox: 'bg-sky-500/12 text-sky-500',
    dateChip: 'bg-sky-500/10 text-sky-600',
    border: 'hover:border-sky-400/50',
    accent: 'bg-sky-400',
  },
  interview: {
    iconBox: 'bg-violet-500/12 text-violet-500',
    dateChip: 'bg-violet-500/10 text-violet-600',
    border: 'hover:border-violet-400/50',
    accent: 'bg-violet-400',
  },
};

const TimelineColumn: React.FC<{ items: TimelineItem[] }> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => {
        const Icon = item.icon;
        const style = categoryStyles[item.category];
        return (
          <motion.div
            key={item.title}
            variants={staggerItem}
            whileHover={{ y: -3, scale: 1.01 }}
            transition={{ duration: 0.25 }}
            className={`relative flex items-center gap-4 overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm ${style.border} hover:shadow-md transition-all duration-300`}
          >
            {/* Garis aksen kiri */}
            <span className={`absolute left-0 top-0 h-full w-1 ${style.accent}`} />
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${style.iconBox}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900 leading-snug">{item.title}</p>
            </div>
            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${style.dateChip}`}>
              {item.date}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const TimelineSection: React.FC = () => {
  return (
    <section
      id="jadwal"
      className="py-20 md:py-28 bg-gradient-to-b from-white via-[#F7FAF8] to-white scroll-mt-16"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Jadwal"
          title="Catat Jadwal Pendaftaran dan Pelaksanaannya!"
          description="Simak tanggal penting rangkaian seleksi Calon Asisten (Calas) LepKOM 2026 agar tidak terlewat."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto"
        >
          <TimelineColumn items={timelineLeft} />
          <TimelineColumn items={timelineRight} />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          * Jadwal dapat berubah sewaktu-waktu. Pantau terus pengumuman resmi melalui akun dan halaman ini.
        </motion.p>
      </div>
    </section>
  );
};