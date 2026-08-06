import { path } from '@/utils/consts';
import { AiFillSchedule } from "react-icons/ai";
import { RiCalendarScheduleLine } from "react-icons/ri";

export const jadwalMenu = {
  label: 'Jadwal',
  icon: AiFillSchedule,
  path: path.lepkom.jadwal.default,
  type: 'management',
  role: ['super_admin', 'pj_soal_materi', "penanggung_jawab_ruangan", "koordinator_lapangan", "asisten_penilai", "asisten", "staff"],
  children: [
    {
      key: 'jadwalKosong',
      label: 'Jadwal Kosong Asisten',
      description: 'Kelola Seluruh Data Jadwal Kosong',
      path: path.lepkom.jadwal.jadwalKosong.default,
      icon: RiCalendarScheduleLine,
      role: ['super_admin', 'pj_soal_materi', "penanggung_jawab_ruangan", "koordinator_lapangan", "asisten_penilai", "asisten", "staff"]
    },
  ]
};
