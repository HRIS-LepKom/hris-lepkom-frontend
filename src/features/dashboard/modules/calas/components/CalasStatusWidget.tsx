import { Card } from '@/components/ui/Card';
import { useCalasDashboardStore } from '../../../shared/store';
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

const STATUS_MAPPING: Record<string, { label: string, color: string, step: number }> = {
  'registrasi': { label: 'Tahap Registrasi', color: 'bg-blue-500', step: 1 },
  'screening': { label: 'Tahap Screening', color: 'bg-indigo-500', step: 2 },
  'ujian_praktek': { label: 'Ujian Praktek', color: 'bg-purple-500', step: 3 },
  'ujian_project': { label: 'Ujian Project', color: 'bg-orange-500', step: 4 },
  'wawancara': { label: 'Tahap Wawancara', color: 'bg-pink-500', step: 5 },
  'lulus': { label: 'Diterima', color: 'bg-lepkom-green', step: 6 },
  'tidak_lulus': { label: 'Tidak Lulus', color: 'bg-red-500', step: -1 },
};

export const CalasStatusWidget = ({ isLoading }: { isLoading: boolean }) => {
  const data = useCalasDashboardStore(state => state.calasStats);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse h-40" />
        <Card className="animate-pulse h-64" />
      </div>
    );
  }

  const status = data?.statusRekrutmen || 'registrasi';
  const statusInfo = STATUS_MAPPING[status] || STATUS_MAPPING['registrasi'];
  const upcomingExams = data?.upcomingExams || [];

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-2 h-full ${statusInfo.color}`} />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 font-medium">Status Rekrutmen Anda Saat Ini</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">{statusInfo.label}</h2>
          </div>
          {statusInfo.step > 0 && statusInfo.step < 6 && (
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
              Tahap {statusInfo.step} dari 5
            </div>
          )}
        </div>
        
        {/* Timeline Progress */}
        <div className="mt-8 relative pt-4">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full" />
          <div 
            className={`absolute top-1/2 left-0 h-1 transition-all duration-1000 ${status === 'tidak_lulus' ? 'bg-red-500' : 'bg-lepkom-green'} -translate-y-1/2 rounded-full`} 
            style={{ width: `${status === 'tidak_lulus' ? 100 : (statusInfo.step / 5) * 100}%` }}
          />
          <div className="relative flex justify-between w-full">
            {[1, 2, 3, 4, 5].map((step) => (
              <div 
                key={step} 
                className={`w-6 h-6 rounded-full border-4 shadow-sm flex items-center justify-center transition-colors duration-500 ${
                  status === 'tidak_lulus' 
                    ? (step <= (STATUS_MAPPING['registrasi']?.step || 1) ? 'bg-red-500 border-red-200' : 'bg-gray-200 border-white')
                    : (step <= statusInfo.step ? 'bg-lepkom-green border-green-200' : 'bg-gray-200 border-white')
                }`}
              />
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card header="Jadwal Mendatang">
          {upcomingExams.length === 0 ? (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <FiCalendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Belum ada jadwal ujian/kegiatan dalam waktu dekat.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingExams.map((exam: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-lepkom-green hover:shadow-md transition-all">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-green-50 rounded-lg text-lepkom-green shrink-0">
                    <span className="text-xs font-bold uppercase">{dayjs(exam.waktu).format('MMM')}</span>
                    <span className="text-2xl font-bold leading-none">{dayjs(exam.waktu).format('DD')}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg capitalize">Ujian {exam.jenisUjian}</h4>
                    <div className="flex flex-col gap-1 mt-1">
                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        <FiClock className="w-4 h-4" />
                        {dayjs(exam.waktu).format('HH:mm')} WIB
                      </span>
                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        <FiMapPin className="w-4 h-4" />
                        Ruangan {exam.ruangan}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card header="Tugas & Pengingat" bodyClassName="bg-gray-50">
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <span className="w-2 h-2 mt-1.5 rounded-full bg-lepkom-green shrink-0" />
              Pastikan Anda membawa kartu identitas (KTM) saat ujian berlangsung.
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <span className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0" />
              Datanglah 15 menit sebelum waktu ujian dimulai.
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <span className="w-2 h-2 mt-1.5 rounded-full bg-purple-500 shrink-0" />
              Pakaian hitam putih formal dengan almamater wajib dikenakan saat wawancara.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
