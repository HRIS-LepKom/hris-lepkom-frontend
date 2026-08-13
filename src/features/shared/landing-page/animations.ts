import type { Variants } from 'motion/react';

/**
 * Variants animasi bersama untuk seluruh section landing page.
 * Pola: fade-in + sedikit slide ke atas, dengan ease yang lembut,
 * dan opsi stagger untuk daftar kartu.
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Hover lift + tap scale untuk kartu / item interaktif.
 * Dipakai bersama whileHover / whileTap pada motion components.
 */
export const cardInteraction = {
  whileHover: { y: -4, scale: 1.01, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const } },
  whileTap: { scale: 0.98 },
};

/** Props bersama untuk komponen heading section. */
export interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}