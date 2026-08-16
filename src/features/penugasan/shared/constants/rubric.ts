export interface RubricGrade {
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  min: number;
  max: number;
  range: string;
  label: string;
  badgeClass: string;
  cardClass: string;
}

export const RUBRIC_GRADES: RubricGrade[] = [
  {
    grade: 'A',
    min: 90,
    max: 100,
    range: '90–100',
    label: 'Sangat Baik',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    cardClass: 'bg-emerald-50/60 border-emerald-200 text-emerald-900',
  },
  {
    grade: 'B',
    min: 80,
    max: 89,
    range: '80–89',
    label: 'Baik',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    cardClass: 'bg-blue-50/60 border-blue-200 text-blue-900',
  },
  {
    grade: 'C',
    min: 70,
    max: 79,
    range: '70–79',
    label: 'Cukup',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    cardClass: 'bg-amber-50/60 border-amber-200 text-amber-900',
  },
  {
    grade: 'D',
    min: 50,
    max: 69,
    range: '50–69',
    label: 'Kurang',
    badgeClass: 'bg-orange-100 text-orange-800 border-orange-300',
    cardClass: 'bg-orange-50/60 border-orange-200 text-orange-900',
  },
  {
    grade: 'E',
    min: 0,
    max: 49,
    range: '0–49',
    label: 'Sangat Kurang',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    cardClass: 'bg-rose-50/60 border-rose-200 text-rose-900',
  },
];

export const getScoreGrade = (score: number): RubricGrade => {
  if (score >= 90) return RUBRIC_GRADES[0];
  if (score >= 80) return RUBRIC_GRADES[1];
  if (score >= 70) return RUBRIC_GRADES[2];
  if (score >= 50) return RUBRIC_GRADES[3];
  return RUBRIC_GRADES[4];
};

export const PRAKTEK_CRITERIA_GUIDELINES = [
  {
    name: 'konsep',
    number: '1',
    label: 'Konsep',
    description: 'Penguasaan calas terhadap teori dasar path materi yang dilamar. Diuji dari jawaban terhadap soal fundamental.',
  },
  {
    name: 'eksekusi',
    number: '2',
    label: 'Eksekusi',
    description: 'Ketepatan dan kecepatan calas menyelesaikan soal dari level mudah hingga sulit. Fokus pada kelengkapan solusi.',
  },
  {
    name: 'analisa',
    number: '3',
    label: 'Analisa',
    description: 'Cara calas mengidentifikasi masalah, menarik kesimpulan dari error, dan menentukan langkah perbaikan saat praktik.',
  },
  {
    name: 'klarifikasi',
    number: '4',
    label: 'Klarifikasi',
    description: 'Kemampuan calas menjelaskan ulang pendekatan dan alasan di balik setiap keputusan teknis yang diambil.',
  },
];

export const PROJECT_CRITERIA_SECTIONS = [
  {
    sectionTitle: 'A. Wawancara Project (Day 2)',
    sectionDesc: 'Evaluasi teknis dan presentasi pengerjaan project mandiri Calon Asisten.',
    items: [
      {
        name: 'penguasaan',
        number: '1',
        label: 'Penguasaan',
        description: 'Pemahaman calas terhadap arsitektur, alur data, dan tiap komponen project miliknya sendiri. Dicek dengan pertanyaan spesifik.',
      },
      {
        name: 'kreatifitas',
        number: '2',
        label: 'Kreatifitas',
        description: 'Tingkat kebaruan ide, kompleksitas solusi, dan nilai lebih project dibanding tugas umum perkuliahan.',
      },
      {
        name: 'kontribusi',
        number: '3',
        label: 'Kontribusi',
        description: 'Kejelasan batas kerja pribadi calas dalam project. Dinilai dari kedalaman jawaban saat ditanya detail yang hanya diketahui penggarap langsung.',
      },
      {
        name: 'presentasi',
        number: '4',
        label: 'Presentasi',
        description: 'Struktur penyampaian, kerapihan dokumentasi, dan keyakinan calas saat memaparkan project di depan penilai.',
      },
    ],
  },
  {
    sectionTitle: 'B. Wawancara Personal (Day 2)',
    sectionDesc: 'Evaluasi karakter, motivasi, integritas, dan kecocokan nilai organisasi.',
    items: [
      {
        name: 'motivasi',
        number: '5',
        label: 'Motivasi',
        description: 'Alasan mendasar calas ingin bergabung. Diukur dari konsistensi jawaban dan pemahaman akan konsekuensi menjadi asisten.',
      },
      {
        name: 'interpersonal',
        number: '6',
        label: 'Interpersonal',
        description: 'Cara calas menyampaikan gagasan, mendengarkan pertanyaan, dan merespon secara logis tanpa defensif berlebihan.',
      },
      {
        name: 'integritas',
        number: '7',
        label: 'Integritas',
        description: 'Kejujuran jawaban, sopan santun selama wawancara, dan kesesuaian nilai pribadi dengan budaya organisasi asisten.',
      },
      {
        name: 'potensi',
        number: '8',
        label: 'Potensi',
        description: 'Kemauan menerima kritik, sikap terhadap umpan balik, dan ketertarikan belajar hal baru di luar zona nyaman.',
      },
    ],
  },
];
