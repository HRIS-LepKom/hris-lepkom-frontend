import { ContentLayout } from "@/components/layout";
import { useBreadcrumbStore } from "@/hooks/globalStore";
import { path } from "@/utils/consts";
import { useEffect } from "react";
import HeaderContent from "./components/HeaderContent";

const RiwayatPenilaianPage = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Penugasan', path: path.lepkom.penugasan.default },
      { label: 'Riwayat Penilaian Asisten', path: path.lepkom.penugasan.historyPenilaian.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="flex flex-col gap-6">
        <HeaderContent />
      </div>
    </ContentLayout>
  );
};

export default RiwayatPenilaianPage;