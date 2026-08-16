import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/shared/store';
import { path } from '@/utils/consts';
import {
  FiUsers,
  FiFileText,
  FiCalendar,
  FiMapPin,
  FiUpload,
  FiGrid,
  FiList,
  FiBookOpen,
  FiCheckSquare,
  FiUserPlus,
} from 'react-icons/fi';

interface QuickActionItem {
  label: string;
  path: string;
  icon: React.ElementType;
  hoverBorder: string;
  hoverText: string;
  hoverBg: string;
}

export const RoleQuickActionsWidget: React.FC<{ customRole?: string }> = ({ customRole }) => {
  const navigate = useNavigate();
  const authRole = useAuthStore(state => state.role);
  const role = customRole || authRole;

  const getActions = (): QuickActionItem[] => {
    switch (role) {
      case 'super_admin':
        return [
          {
            label: 'Calon Asisten',
            path: path.lepkom.masterData.calas.default,
            icon: FiUserPlus,
            hoverBorder: 'hover:border-lepkom-green',
            hoverText: 'hover:text-lepkom-green',
            hoverBg: 'hover:bg-green-50',
          },
          {
            label: 'Kelola Asisten',
            path: path.lepkom.masterData.asisten.default,
            icon: FiUsers,
            hoverBorder: 'hover:border-blue-500',
            hoverText: 'hover:text-blue-500',
            hoverBg: 'hover:bg-blue-50',
          },
          {
            label: 'Gelombang Rekrutmen',
            path: path.lepkom.masterData.rekrutmen.default,
            icon: FiCalendar,
            hoverBorder: 'hover:border-purple-500',
            hoverText: 'hover:text-purple-500',
            hoverBg: 'hover:bg-purple-50',
          },
          {
            label: 'Kelola Soal',
            path: path.lepkom.masterData.soal.default,
            icon: FiFileText,
            hoverBorder: 'hover:border-orange-500',
            hoverText: 'hover:text-orange-500',
            hoverBg: 'hover:bg-orange-50',
          },
        ];

      case 'koordinator_lapangan':
        return [
          {
            label: 'Penempatan Asisten',
            path: path.lepkom.penugasan.penempatanRuanganAsisten.default,
            icon: FiMapPin,
            hoverBorder: 'hover:border-blue-500',
            hoverText: 'hover:text-blue-500',
            hoverBg: 'hover:bg-blue-50',
          },
          {
            label: 'Penempatan Calas',
            path: path.lepkom.penugasan.penempatanRuanganCalas.default,
            icon: FiGrid,
            hoverBorder: 'hover:border-lepkom-green',
            hoverText: 'hover:text-lepkom-green',
            hoverBg: 'hover:bg-green-50',
          },
          {
            label: 'Cek Jawaban Calas',
            path: path.lepkom.penugasan.checkUploadJawaban.default,
            icon: FiUpload,
            hoverBorder: 'hover:border-purple-500',
            hoverText: 'hover:text-purple-500',
            hoverBg: 'hover:bg-purple-50',
          },
          {
            label: 'Jadwal Kosong',
            path: path.lepkom.jadwal.jadwalKosong.default,
            icon: FiCalendar,
            hoverBorder: 'hover:border-amber-500',
            hoverText: 'hover:text-amber-500',
            hoverBg: 'hover:bg-amber-50',
          },
        ];

      case 'penanggung_jawab_ruangan':
        return [
          {
            label: 'Penempatan Calas',
            path: path.lepkom.penugasan.penempatanRuanganCalas.default,
            icon: FiUsers,
            hoverBorder: 'hover:border-lepkom-green',
            hoverText: 'hover:text-lepkom-green',
            hoverBg: 'hover:bg-green-50',
          },
          {
            label: 'Cek Jawaban Calas',
            path: path.lepkom.penugasan.checkUploadJawaban.default,
            icon: FiUpload,
            hoverBorder: 'hover:border-purple-500',
            hoverText: 'hover:text-purple-500',
            hoverBg: 'hover:bg-purple-50',
          },
          {
            label: 'Question Card',
            path: path.lepkom.masterData.questionCard.default,
            icon: FiList,
            hoverBorder: 'hover:border-blue-500',
            hoverText: 'hover:text-blue-500',
            hoverBg: 'hover:bg-blue-50',
          },
          {
            label: 'Jadwal Kosong',
            path: path.lepkom.jadwal.jadwalKosong.default,
            icon: FiCalendar,
            hoverBorder: 'hover:border-amber-500',
            hoverText: 'hover:text-amber-500',
            hoverBg: 'hover:bg-amber-50',
          },
        ];

      case 'pj_soal_materi':
        return [
          {
            label: 'Kelola Soal',
            path: path.lepkom.masterData.soal.default,
            icon: FiFileText,
            hoverBorder: 'hover:border-purple-500',
            hoverText: 'hover:text-purple-500',
            hoverBg: 'hover:bg-purple-50',
          },
          {
            label: 'Kelola Materi',
            path: path.lepkom.masterData.materi.default,
            icon: FiBookOpen,
            hoverBorder: 'hover:border-blue-500',
            hoverText: 'hover:text-blue-500',
            hoverBg: 'hover:bg-blue-50',
          },
          {
            label: 'Question Card',
            path: path.lepkom.masterData.questionCard.default,
            icon: FiList,
            hoverBorder: 'hover:border-lepkom-green',
            hoverText: 'hover:text-lepkom-green',
            hoverBg: 'hover:bg-green-50',
          },
          {
            label: 'Jadwal Kosong',
            path: path.lepkom.jadwal.jadwalKosong.default,
            icon: FiCalendar,
            hoverBorder: 'hover:border-amber-500',
            hoverText: 'hover:text-amber-500',
            hoverBg: 'hover:bg-amber-50',
          },
        ];

      case 'asisten_penilai':
        return [
          {
            label: 'Nilai Praktek',
            path: path.lepkom.penugasan.praktek.default,
            icon: FiCheckSquare,
            hoverBorder: 'hover:border-lepkom-green',
            hoverText: 'hover:text-lepkom-green',
            hoverBg: 'hover:bg-green-50',
          },
          {
            label: 'Nilai Project',
            path: path.lepkom.penugasan.project.default,
            icon: FiFileText,
            hoverBorder: 'hover:border-blue-500',
            hoverText: 'hover:text-blue-500',
            hoverBg: 'hover:bg-blue-50',
          },
          {
            label: 'Cek Jawaban Calas',
            path: path.lepkom.penugasan.checkUploadJawaban.default,
            icon: FiUpload,
            hoverBorder: 'hover:border-purple-500',
            hoverText: 'hover:text-purple-500',
            hoverBg: 'hover:bg-purple-50',
          },
          {
            label: 'Question Card',
            path: path.lepkom.masterData.questionCard.default,
            icon: FiList,
            hoverBorder: 'hover:border-amber-500',
            hoverText: 'hover:text-amber-500',
            hoverBg: 'hover:bg-amber-50',
          },
        ];

      default:
        return [
          {
            label: 'Jadwal Kosong',
            path: path.lepkom.jadwal.jadwalKosong.default,
            icon: FiCalendar,
            hoverBorder: 'hover:border-lepkom-green',
            hoverText: 'hover:text-lepkom-green',
            hoverBg: 'hover:bg-green-50',
          },
          {
            label: 'Data Calas',
            path: path.lepkom.masterData.calas.default,
            icon: FiUsers,
            hoverBorder: 'hover:border-blue-500',
            hoverText: 'hover:text-blue-500',
            hoverBg: 'hover:bg-blue-50',
          },
          {
            label: 'Data Materi',
            path: path.lepkom.masterData.materi.default,
            icon: FiBookOpen,
            hoverBorder: 'hover:border-purple-500',
            hoverText: 'hover:text-purple-500',
            hoverBg: 'hover:bg-purple-50',
          },
        ];
    }
  };

  const actions = getActions();

  return (
    <Card header="Jalan Pintas">
      <div className={`grid ${actions.length > 2 ? 'grid-cols-2' : 'grid-cols-2'} gap-4`}>
        {actions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <Button
              key={idx}
              variant="outline"
              className={`h-auto flex-col items-center justify-center p-5 gap-2.5 border-dashed ${action.hoverBorder} ${action.hoverText} ${action.hoverBg} transition-all`}
              onClick={() => navigate(action.path)}
            >
              <Icon className="w-7 h-7" />
              <span className="font-medium text-xs text-center leading-tight">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};
