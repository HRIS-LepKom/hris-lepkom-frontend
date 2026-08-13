import { useEffect } from 'react';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';
import { HeaderContent } from './components/HeaderContent';
import { JadwalKosongTable } from './components/JadwalKosongTable';

const JadwalKosongModule = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Jadwal', path: path.lepkom.jadwal.default }, // path to jadwal default if exists, else dashboard
      { label: 'Jadwal Kosong', path: path.lepkom.jadwal.jadwalKosong.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        <HeaderContent />
        <JadwalKosongTable />
      </div>
    </ContentLayout>
  );
};

export default JadwalKosongModule;
