import { useEffect } from 'react';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';

const DetailJadwalAsisten = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Jadwal', path: path.lepkom.jadwal.default },
      { label: 'Jadwal Asisten', path: path.lepkom.jadwal.jadwalAsisten.default },
      { label: 'Detail Jdawal Asisten', path: path.lepkom.jadwal.jadwalAsisten.detail },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        <h1>masih dalam tahap pembuatan</h1>
      </div>
    </ContentLayout>
  );
};

export default DetailJadwalAsisten;
