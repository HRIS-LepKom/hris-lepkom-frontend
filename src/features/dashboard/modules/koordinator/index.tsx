import { useEffect } from 'react';
import { TodayScheduleWidget } from './components/TodayScheduleWidget';
import { useGetKoordinatorStats } from '../../shared/api';
import { useKoordinatorDashboardStore } from '../../shared/store';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';

import { useAuthStore } from '@/features/auth/shared/store';

const KoordinatorDashboard = () => {
  const { role } = useAuthStore();
  const { data, isLoading } = useGetKoordinatorStats();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  
  const setState = useKoordinatorDashboardStore(state => state.setState);
  const breadcrumbItems = useKoordinatorDashboardStore(state => state.breadcrumbItems);

  useEffect(() => {
    // Only set on mount
    setBreadcrumbItems(breadcrumbItems);
    return () => setBreadcrumbItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setState('koordinatorStats', data);
    }
  }, [data, setState]);

  const getDashboardHeader = () => {
    switch (role) {
      case 'penanggung_jawab_ruangan':
        return {
          title: 'Dashboard Penanggung Jawab Ruangan',
          subtitle: 'Pantau jadwal ujian aktif dan kelola penempatan Calas di ruangan.',
        };
      case 'pj_soal_materi':
        return {
          title: 'Dashboard PJ Soal & Materi',
          subtitle: 'Kelola bank soal ujian, materi pembelajaran, dan question card.',
        };
      case 'koordinator_lapangan':
      default:
        return {
          title: 'Dashboard Koordinator Lapangan',
          subtitle: 'Pantau jadwal ujian dan kelola penempatan ruangan aktif hari ini.',
        };
    }
  };

  const header = getDashboardHeader();

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{header.title}</h1>
        <p className="text-gray-500 mt-1">{header.subtitle}</p>
      </div>
      
      <TodayScheduleWidget isLoading={isLoading} />
    </div>
  );
};

export default KoordinatorDashboard;
