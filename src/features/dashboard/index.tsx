import { useAuthStore } from '@/features/auth/shared/store';
import SuperAdminDashboard from './modules/super-admin';
import KoordinatorDashboard from './modules/koordinator';
import PenilaiDashboard from './modules/asisten-penilai';
import CalasDashboard from './modules/calas';
import { RoleQuickActionsWidget } from './shared/components/RoleQuickActionsWidget';
import { ContentLayout } from '@/components/layout';

const DashboardPage = () => {
  const { role } = useAuthStore();

  if (role === 'super_admin') {
    return (
      <ContentLayout>
        <SuperAdminDashboard />
      </ContentLayout>
    );
  }

  if (role === 'koordinator_lapangan' || role === 'penanggung_jawab_ruangan' || role === 'pj_soal_materi') {
    return (
      <ContentLayout>
        <KoordinatorDashboard />
      </ContentLayout>
    );
  }

  if (role === 'asisten_penilai') {
    return (
      <ContentLayout>
        <PenilaiDashboard />
      </ContentLayout>
    );
  }

  if (role === 'calas') {
    return (
      <ContentLayout>
        <CalasDashboard />
      </ContentLayout>
    );
  }

  // Fallback for asisten/staff or unknown roles
  return (
    <ContentLayout>
      <div className="space-y-6">
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
          <div className="mb-4 text-4xl text-lepkom-green">👋</div>
          <h1 className="text-2xl font-bold text-gray-800">Selamat Datang di HRIS LepKOM!</h1>
          <p className="mt-2 max-w-md text-gray-500 text-sm">
            Gunakan jalan pintas di bawah ini untuk mengakses fitur-fitur yang tersedia untuk peran Anda.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <RoleQuickActionsWidget />
        </div>
      </div>
    </ContentLayout>
  );
};

export default DashboardPage;
