import { path } from '@/utils/consts';
import { MdScore } from 'react-icons/md';
import { FaLaptopCode, FaProjectDiagram } from 'react-icons/fa';

export const penilaianMenu = {
  label: 'Penilaian Ujian',
  icon: MdScore,
  path: path.lepkom.penilaian.default,
  type: 'process',
  role: ['asisten_penilai'],
  children: [
    {
      key: 'praktek',
      label: 'Nilai Praktek',
      path: path.lepkom.penilaian.praktek.default,
      icon: FaLaptopCode,
      role: ['asisten_penilai']
    },
    {
      key: 'project',
      label: 'Nilai Project',
      path: path.lepkom.penilaian.project.default,
      icon: FaProjectDiagram,
      role: ['asisten_penilai']
    }
  ]
};
