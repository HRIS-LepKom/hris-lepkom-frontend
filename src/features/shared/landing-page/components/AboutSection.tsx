import React from 'react';
import { motion } from 'motion/react';
import { Building2, Users, Award, Lightbulb } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { fadeUp, staggerContainer, staggerItem } from '../animations';

const values = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: 'Pengembangan Skill',
    description:
      'Kembangkan kemampuan teknis dan soft skill melalui pendampingan langsung di lingkungan laboratorium komputer.',
    chip: 'bg-amber-500/12 text-amber-600',
    border: 'hover:border-amber-400/40',
    iconBox: 'bg-amber-500/12 text-amber-500',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Komunitas & Networking',
    description:
      'Bergabung dengan komunitas asisten yang solid, saling berbagi ilmu, dan memperluas relasi antar mahasiswa.',
    chip: 'bg-sky-500/12 text-sky-600',
    border: 'hover:border-sky-400/40',
    iconBox: 'bg-sky-500/12 text-sky-500',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Pengalaman Organisasi',
    description:
      'Dapatkan pengalaman berharga dalam pengelolaan laboratorium, pelayanan pengguna, dan kegiatan akademik.',
    chip: 'bg-violet-500/12 text-violet-600',
    border: 'hover:border-violet-400/40',
    iconBox: 'bg-violet-500/12 text-violet-500',
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="tentang" className="py-20 md:py-28 bg-white scroll-mt-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tentang Kami"
          title="Lembaga Pengembangan Komputer"
          description="LEPKOM merupakan lembaga di lingkungan Universitas Gunadarma yang berfokus pada pengembangan kompetensi komputer dan pengelolaan laboratorium, dengan asisten sebagai ujung tombak pelayanan."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 h-full w-full rounded-2xl border-2 border-lepkom-green/20" />
            <motion.div
              whileHover={{ rotate: -0.5 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-2xl bg-gradient-to-br from-lepkom-green via-emerald-600 to-lepkom-blue p-8 md:p-10 text-white overflow-hidden"
            >
              <motion.div
                aria-hidden
                animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-white/15 blur-2xl"
              />
              <motion.div
                aria-hidden
                animate={{ rotate: [0, -8, 0] }}
                transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-amber-400/30 blur-2xl"
              />
              <Building2 className="h-10 w-10 text-amber-300 mb-4" />
              <h3 className="text-2xl font-bold mb-3">
                Lembaga Pengembangan Komputer
              </h3>
              <p className="text-white/90 leading-relaxed mb-4">
                Lembaga Pengembangan Komputer (LEPKOM) Universitas Gunadarma
                adalah lembaga yang menaungi pengembangan kemampuan mahasiswa
                di bidang komputer. Berkedudukan di Kampus Kalimalang, LEPKOM
                menjadi tempat mahasiswa belajar, berpraktik, dan berkontribusi
                sebagai asisten laboratorium.
              </p>
              <p className="text-white/85 leading-relaxed">
                Menjadi asisten LEPKOM berarti menjadi bagian dari tim yang
                membantu operasional laboratorium, mendampingi praktikum, dan
                turut menjaga mutu layanan komputer di lingkungan kampus.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={staggerItem}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.25 }}
                className={`flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50/50 p-5 ${value.border} hover:bg-white hover:shadow-md transition-all duration-300`}
              >
                <div className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${value.iconBox}`}>
                  {value.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{value.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};