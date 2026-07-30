import { path } from '@/utils/consts';
import { FaLaptopCode, FaProjectDiagram } from 'react-icons/fa';
import { MdOutlineQuiz } from 'react-icons/md';

export const ujianMenu = {
  label: 'Ujian Calas',
  icon: MdOutlineQuiz,
  path: path.lepkom.ujian.default,
  type: 'process',
  role: ['calas'],
  children: [
    {
      key: 'praktek',
      label: 'Ujian Praktek',
      path: path.lepkom.ujian.praktek.default,
      icon: FaLaptopCode,
      role: ['calas']
    },
    {
      key: 'project',
      label: 'Ujian Project',
      path: path.lepkom.ujian.project.default,
      icon: FaProjectDiagram,
      role: ['calas']
    }
  ]
};
