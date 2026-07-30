import { path } from '@/utils/consts';
import { FaBookOpen, FaListAlt, FaQuestionCircle } from 'react-icons/fa';
import { MdLibraryBooks } from 'react-icons/md';

export const soalMenu = {
  label: 'Manajemen Soal',
  icon: MdLibraryBooks,
  path: path.lepkom.soal.default,
  type: 'management',
  role: ['pj_soal_materi'],
  children: [
    {
      key: 'materi',
      label: 'Materi',
      path: path.lepkom.soal.materi.default,
      icon: FaBookOpen,
      role: ['pj_soal_materi']
    },
    {
      key: 'daftarSoal',
      label: 'Daftar Soal',
      path: path.lepkom.soal.daftarSoal.default,
      icon: FaListAlt,
      role: ['pj_soal_materi']
    },
    {
      key: 'questionCard',
      label: 'Question Card',
      path: path.lepkom.soal.questionCard.default,
      icon: FaQuestionCircle,
      role: ['pj_soal_materi']
    }
  ]
};
