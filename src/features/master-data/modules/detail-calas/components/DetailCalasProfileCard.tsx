import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { FiDownload, FiFileText, FiMapPin, FiMail, FiPhone, FiUser, FiXCircle } from 'react-icons/fi';
import type { DetailCalas } from '../types/detailCalas.types';

const getRejectionReason = (alasan?: string) => {
  switch (alasan) {
    case 'tidak_lolos_screening': return 'Tidak Lolos Screening Dokumen';
    case 'tidak_hadir_ujian': return 'Tidak Hadir Ujian';
    case 'tidak_lolos_penilaian': return 'Tidak Lolos Penilaian Ujian';
    case 'ditolak_rapat_akhir': return 'Ditolak pada Rapat Keputusan Akhir';
    case 'lainnya': return 'Alasan Lainnya';
    default: return 'Tidak Lolos';
  }
};

interface Props {
  calas: DetailCalas;
}

const DetailCalasProfileCard: React.FC<Props> = ({ calas }) => {
  const getTahapBadge = (tahap: string) => {
    let variant: any = 'secondary';
    if (tahap === 'selesai') variant = 'success';
    else if (tahap === 'keputusan_akhir') variant = 'warning';
    else variant = 'info';
    return <Badge variant={variant} className="uppercase text-[10px] tracking-wider px-2 py-0.5">Tahap: {tahap.replace(/_/g, ' ')}</Badge>;
  };

  const getHasilBadge = (hasil: string) => {
    let variant: any = 'secondary';
    if (hasil === 'lolos') variant = 'success';
    else if (hasil === 'tidak_lolos') variant = 'destructive';
    else variant = 'warning';
    return <Badge variant={variant} className="uppercase text-[10px] tracking-wider px-2 py-0.5">Status: {hasil.replace(/_/g, ' ')}</Badge>;
  };

  const renderFileButton = (label: string, fileUrl?: string) => {
    const handleDownload = () => {
      if (fileUrl) window.open(fileUrl, '_blank');
    };

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        disabled={!fileUrl}
        className="w-full sm:w-auto flex items-center justify-center gap-2"
        title={!fileUrl ? 'File belum diunggah' : 'Unduh File'}
      >
        <FiDownload className="w-4 h-4" />
        {label}
      </Button>
    );
  };

  return (
    <Card className="w-full bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden" bodyClassName="p-0">
      {/* Header Banner */}
      <div className="h-32 bg-linear-to-r from-emerald-600 to-teal-700 w-full" />
      
      <div className="px-6 pb-6 pt-6 relative">
        {/* Info Area */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">
              {calas.namaCalas}
            </h1>
            <div className="text-sm font-medium text-gray-500 mt-3 space-y-1">
              <p>NPM: <span className="text-gray-900">{calas.npm}</span></p>
              <p>Kelas: <span className="text-gray-900">{calas.kelas}</span></p>
              <p>Jurusan: <span className="text-gray-900">{calas.jurusan}</span></p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end mt-2 sm:mt-0">
            {getTahapBadge(calas.statusRekrutmen?.tahapSaatIni || 'registrasi')}
            {getHasilBadge(calas.statusRekrutmen?.hasil || 'proses')}
            {typeof calas.skorAkhirNilai === 'number' && (
              <Badge variant="default" className="bg-indigo-600 hover:bg-indigo-700 uppercase text-[10px] tracking-wider px-2 py-0.5">
                Skor: {calas.skorAkhirNilai.toFixed(2)}
              </Badge>
            )}
          </div>
        </div>

        {/* Banner Penolakan */}
        {calas.statusRekrutmen?.hasil === 'tidak_lolos' && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-4">
            <div className="p-2.5 bg-red-100 rounded-full text-red-600 shrink-0">
              <FiXCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-red-900 mb-1">
                Calas Ditolak: {getRejectionReason(calas.statusRekrutmen?.alasanTidakLolos)}
              </h3>
              <p className="text-sm text-red-700 leading-relaxed">
                {calas.statusRekrutmen?.deskripsiPenolakan 
                  ? calas.statusRekrutmen.deskripsiPenolakan 
                  : "Calas ini tidak lolos dalam tahapan rekrutmen Asisten LEPKOM."}
              </p>
            </div>
          </div>
        )}

        {/* Demographics & Contact */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Informasi Personal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><FiMail className="w-4 h-4" /></div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email</p>
                <p className="text-sm font-medium text-gray-900 break-all">{calas.emailCalas}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><FiPhone className="w-4 h-4" /></div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">No. HP</p>
                <p className="text-sm font-medium text-gray-900">{calas.noHp || '-'}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><FiUser className="w-4 h-4" /></div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">TTL & Kelamin</p>
                <p className="text-sm font-medium text-gray-900">
                  {calas.tempatLahir}, {calas.tanggalLahir} <br/>
                  <span className="text-gray-500 text-xs">({calas.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}) - {calas.agama}</span>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-500"><FiMapPin className="w-4 h-4" /></div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Alamat</p>
                <p className="text-sm font-medium text-gray-900 line-clamp-2" title={calas.alamatLengkap}>{calas.alamatLengkap || '-'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Berkas & Dokumen */}
        <div className="mt-6 border-t border-gray-100 pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
            <FiFileText className="w-4 h-4 text-gray-500" />
            Berkas Dokumen
          </h3>
          <div className="flex flex-wrap gap-3">
            {renderFileButton('Unduh CV', calas.cv)}
            {renderFileButton('Unduh KRS', calas.krs)}
            {renderFileButton('Unduh Rangkuman Nilai', calas.rangkumanNilai)}
            {renderFileButton('Unduh Jawaban Praktek', calas.jawabanPraktek)}
            {renderFileButton('Unduh Jawaban Project', calas.jawabanProject)}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DetailCalasProfileCard;
