import React from 'react';
import { motion } from 'motion/react';
import { fadeUp } from '../animations';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

/** Warna chip eyebrow bergantian per section agar playful. */
const chipStyles = [
  'bg-lepkom-green/10 text-lepkom-green border-lepkom-green/20',
  'bg-amber-500/10 text-amber-600 border-amber-400/25',
  'bg-sky-500/10 text-sky-600 border-sky-400/25',
  'bg-violet-500/10 text-violet-600 border-violet-400/25',
  'bg-rose-500/10 text-rose-600 border-rose-400/25',
];

export const SectionHeading: React.FC<SectionHeadingProps> = ({ eyebrow, title, description }) => {
  // Derive warna chip stabil dari nama eyebrow
  const key = eyebrow.charCodeAt(0) % chipStyles.length;
  const chip = chipStyles[key];

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="max-w-2xl mx-auto text-center mb-14 md:mb-16"
    >
      <span
        className={`inline-block text-xs font-bold uppercase tracking-[0.2em] border rounded-full px-4 py-1.5 mb-4 ${chip}`}
      >
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-lepkom-blue mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
};