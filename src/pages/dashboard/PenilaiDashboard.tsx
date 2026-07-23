import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import { CalasClassChartCard, CalasClassTableCard } from '@/components/dashboard/CalasClassChartWidget'

export default function PenilaiDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-lepkom-blue to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
            Portal Asisten Penilai
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2">
            Selamat Datang, {user?.nama || 'Penilai'}!
          </h1>
          <p className="text-sm text-white/80 mt-1 max-w-xl">
            Inputkan skor penilaian ujian praktek & project calas sesuai rubrik kriteria secara objektif.
          </p>
        </div>
        <Button
          variant="secondary"
          className="bg-white text-lepkom-blue hover:bg-gray-100 border-none font-bold self-start sm:self-center"
          onClick={() => navigate('/penilai/my-assignments')}
        >
          📝 Input Penilaian Ujian
        </Button>
      </div>

      {/* ─── 1. PINTASAN AKSI ────────────────────────────────────────────────── */}
      <Card header="Pintasan Aksi Penilai">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="secondary"
            className="w-full justify-start py-4 h-auto"
            onClick={() => navigate('/penilai/my-assignments')}
          >
            <div className="text-left">
              <p className="font-bold text-gray-900 text-base">Daftar Tugas Penilaian Saya</p>
              <p className="text-xs text-gray-500 font-normal mt-0.5">
                Buka daftar calas yang di-assign untuk dinilai kriteria praktek & project.
              </p>
            </div>
          </Button>

          <Button
            variant="secondary"
            className="w-full justify-start py-4 h-auto"
            onClick={() => navigate('/penilai/history')}
          >
            <div className="text-left">
              <p className="font-bold text-gray-900 text-base">Riwayat Skor Evaluasi</p>
              <p className="text-xs text-gray-500 font-normal mt-0.5">
                Lihat kembali riwayat nilai yang telah Anda submit sebelumnya.
              </p>
            </div>
          </Button>
        </div>
      </Card>

      {/* ─── 2. STATCARD (ROLE METRICS) ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/penilai/my-assignments')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tugas Menunggu</p>
              <p className="text-3xl font-extrabold text-amber-600 mt-1">5</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Belum diinput skor</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
              ⏳
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/penilai/history')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Sudah Dinilai</p>
              <p className="text-3xl font-extrabold text-lepkom-green mt-1">12</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Sudah tersimpan</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 text-lepkom-green flex items-center justify-center font-bold text-xl">
              ✅
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/penilai/my-assignments')}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Penugasan</p>
              <p className="text-3xl font-extrabold text-lepkom-blue mt-1">17</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Calas ditugaskan</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-lepkom-blue flex items-center justify-center font-bold text-xl">
              📋
            </div>
          </div>
        </Card>
      </div>

      {/* ─── 3. CHART ─────────────────────────────────────────────────────────── */}
      <CalasClassChartCard />

      {/* ─── 4. TABEL ─────────────────────────────────────────────────────────── */}
      <CalasClassTableCard />
    </div>
  )
}