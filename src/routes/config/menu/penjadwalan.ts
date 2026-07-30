import { path } from '@/utils/consts';
import { FaCalendarAlt, FaChalkboardTeacher, FaMapMarkedAlt } from 'react-icons/fa';

export const penjadwalanMenu = {
  label: 'Penjadwalan',
  icon: FaCalendarAlt,
  path: path.lepkom.penjadwalan.default,
  type: 'management',
  role: ['koordinator_lapangan', 'penanggung_jawab_ruangan'],
  children: [
    {
      key: 'session',
      label: 'Sesi Ujian',
      path: path.lepkom.penjadwalan.session.default,
      icon: FaCalendarAlt,
      role: ['koordinator_lapangan']
    },
    {
      key: 'roomAssignment',
      label: 'Penugasan Ruangan',
      path: path.lepkom.penjadwalan.roomAssignment.default,
      icon: FaMapMarkedAlt,
      role: ['koordinator_lapangan']
    },
    {
      key: 'roomPlacement',
      label: 'Penempatan Ruangan',
      path: path.lepkom.penjadwalan.roomPlacement.default,
      icon: FaChalkboardTeacher,
      role: ['koordinator_lapangan', 'penanggung_jawab_ruangan']
    }
  ]
};
