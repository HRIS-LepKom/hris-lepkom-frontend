import { path } from '@/utils/consts';
import { FaUserEdit, FaGraduationCap, FaUsers, FaFileArchive } from 'react-icons/fa';
import { BsPersonVcard } from 'react-icons/bs';

export const biodataMenu = {
  label: 'Biodata Calas',
  icon: BsPersonVcard,
  path: path.lepkom.biodata.default,
  type: 'management',
  role: ['calas'],
  children: [
    {
      key: 'personal',
      label: 'Data Pribadi',
      path: path.lepkom.biodata.personal.default,
      icon: FaUserEdit,
      role: ['calas']
    },
    {
      key: 'pendidikan',
      label: 'Pendidikan',
      path: path.lepkom.biodata.pendidikan.default,
      icon: FaGraduationCap,
      role: ['calas']
    },
    {
      key: 'keluarga',
      label: 'Keluarga',
      path: path.lepkom.biodata.keluarga.default,
      icon: FaUsers,
      role: ['calas']
    },
    {
      key: 'berkas',
      label: 'Upload Berkas',
      path: path.lepkom.biodata.berkas.default,
      icon: FaFileArchive,
      role: ['calas']
    }
  ]
};
