import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { faqItems } from '../data';

const faqPalettes = [
  { num: 'bg-lepkom-green/10 text-lepkom-green', activeBorder: 'border-lepkom-green/40', chevron: 'text-lepkom-green' },
  { num: 'bg-amber-500/12 text-amber-600', activeBorder: 'border-amber-400/50', chevron: 'text-amber-500' },
  { num: 'bg-sky-500/12 text-sky-600', activeBorder: 'border-sky-400/50', chevron: 'text-sky-500' },
  { num: 'bg-violet-500/12 text-violet-600', activeBorder: 'border-violet-400/50', chevron: 'text-violet-500' },
  { num: 'bg-rose-500/12 text-rose-600', activeBorder: 'border-rose-400/50', chevron: 'text-rose-500' },
  { num: 'bg-teal-500/12 text-teal-600', activeBorder: 'border-teal-400/50', chevron: 'text-teal-500' },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-20 md:py-28 bg-gradient-to-b from-white via-[#F7FAF8] to-white scroll-mt-16"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang Sering Diajukan"
          description="Temukan jawaban atas pertanyaan seputar pendaftaran dan seleksi Calon Asisten LepKOM."
        />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqItems.map((faq, index) => {
            const isOpen = openIndex === index;
            const palette = faqPalettes[index % faqPalettes.length];
            return (
              <div
                key={faq.question}
                className={`rounded-xl border bg-white transition-colors duration-300 ${
                  isOpen ? `${palette.activeBorder} shadow-sm` : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left"
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${palette.num}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1 font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    } ${palette.chevron}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pl-[3.75rem] text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};