import type { LucideIcon } from 'lucide-react';
import { Star, Globe, Network } from 'lucide-react';

export type TimelineCategory = 'meeting' | 'exam' | 'interview';

export interface TimelineItem {
  icon: LucideIcon;
  category: TimelineCategory;
  title: string;
  date: string;
}

const star = Star;
const globe = Globe;
const network = Network;

/**
 * Data jadwal — persis mengikuti infografis "JADWAL" yang diberikan.
 * Ikon konsisten per tipe acara:
 *  - bintang (Star)  : rapat / meeting
 *  - globe (Globe)   : tes / uji praktik / pengumuman
 *  - network (Network): wawancara / presentasi
 */
export const timelineLeft: TimelineItem[] = [
  { icon: star, category: 'meeting', title: 'Technical Meeting', date: '10 Agt 2026' },
  { icon: globe, category: 'exam', title: 'Tes Uji Praktik Program', date: '13 Agt 2026' },
  { icon: network, category: 'interview', title: 'Wawancara [K]', date: '14 Agt 2026' },
  { icon: network, category: 'interview', title: 'Wawancara [L]', date: '18 Agt 2026' },
  { icon: globe, category: 'exam', title: 'Wawancara [F4]', date: '19 Agt 2026 – 20 Agt 2026' },
];

export const timelineRight: TimelineItem[] = [
  { icon: network, category: 'interview', title: 'Tes Essay Diri', date: '13 Agt 2026' },
  { icon: star, category: 'meeting', title: 'Presentasi Proyek [K]', date: '14 Agt 2026' },
  { icon: globe, category: 'exam', title: 'Presentasi Proyek [L]', date: '18 Agt 2026' },
  { icon: network, category: 'interview', title: 'Presentasi Proyek [F4]', date: '19 Agt 2026 – 20 Agt 2026' },
  { icon: star, category: 'meeting', title: 'Pengumuman Hasil', date: '22 Agt 2026' },
];

/**
 * Tahapan seleksi — persis mengikuti infografis "Tahapan Seleksi".
 */
export interface StageItem {
  number: string;
  title: string;
  description: string;
}

export const stages: StageItem[] = [
  {
    number: '01',
    title: 'Melakukan Pendaftaran dan Pengisian Formulir',
    description:
      'Calon Asisten (Calas) melakukan Pendaftaran dan wajib melengkapi semua Formulir Pendaftaran serta melakukan verifikasi akun via email',
  },
  {
    number: '02',
    title: 'Mendownload Kartu Calas',
    description:
      'Jika sudah melakukan pengisian formulir kemudian data telah diverifikasi oleh admin, calas wajib mendownload kartu calas.',
  },
  {
    number: '03',
    title: 'Mengikuti Technical Meeting',
    description:
      'Calas wajib mengikuti Technical Meeting untuk mengetahui lebih detail arahan pelaksanaan Seleksi',
  },
  {
    number: '04',
    title: 'Mengikuti Seluruh Rangkaian Pelaksanaan Seleksi',
    description: 'Calas wajib mengikuti semua tahapan seleksi sesuai ketentuan yang berlaku',
  },
  {
    number: '05',
    title: 'Melihat Pengumuman Hasil Seleksi',
    description:
      'Calas yang telah mengikuti seluruh rangkaian tahapan, dapat memantau pengumuman hasil seleksi baik dihalaman landing maupun di akun masing-masing',
  },
  {
    number: '06',
    title: 'Mengikuti Kegiatan Orientasi Asisten',
    description:
      'Asisten baru wajib mengikuti rangkaian penyambutan asisten sesuai jadwal dan ketentuan yang telah ditentukan',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'Apa saja syarat menjadi Calon Asisten (Calas) LepKOM?',
    answer:
      'Syarat utama adalah mahasiswa aktif Universitas Gunadarma, memiliki nilai akademik yang baik, dan memiliki minat untuk mengembangkan diri di bidang komputer. Informasi syarat lengkap akan diumumkan oleh panitia saat periode pendaftaran dibuka.',
  },
  {
    question: 'Bagaimana cara mendaftar sebagai Calon Asisten?',
    answer:
      'Calas melakukan pendaftaran melalui halaman pendaftaran, melengkapi semua Formulir Pendaftaran, dan melakukan verifikasi akun via email. Setelah data terverifikasi oleh admin, calas wajib mendownload kartu calas.',
  },
  {
    question: 'Apa itu Technical Meeting?',
    answer:
      'Technical Meeting adalah sesi pengarahan yang wajib diikuti oleh seluruh Calas untuk mengetahui lebih detail arahan pelaksanaan Seleksi, termasuk jadwal, teknis ujian, dan ketentuan yang berlaku.',
  },
  {
    question: 'Apa saja rangkaian seleksi yang harus diikuti?',
    answer:
      'Rangkaian seleksi meliputi Tes Uji Praktik Program, Tes Essay Diri, Wawancara, dan Presentasi Proyek. Seluruh calas wajib mengikuti semua tahapan seleksi sesuai ketentuan yang berlaku.',
  },
  {
    question: 'Di mana saya bisa melihat pengumuman hasil seleksi?',
    answer:
      'Pengumuman hasil seleksi dapat dipantau baik di halaman landing ini maupun di akun masing-masing setelah seluruh rangkaian tahapan selesai diikuti.',
  },
  {
    question: 'Apa yang dilakukan setelah dinyatakan lolos seleksi?',
    answer:
      'Asisten baru wajib mengikuti rangkaian kegiatan Orientasi Asisten — penyambutan asisten — sesuai jadwal dan ketentuan yang telah ditentukan oleh panitia.',
  },
];